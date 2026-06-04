import type { SupabaseClient } from "@supabase/supabase-js";
import { generateWeeklyAgenda } from "@/lib/openai";
import type { AgendaInput } from "@/lib/openai";
import type {
  AgendaPlan,
  DayConfig,
  DeviceKind,
  Project,
  RoadmapStep,
  UserPrefs,
  Weekday,
} from "@/lib/types";

const WEEKDAYS: Weekday[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

export const DEFAULT_PREFS: UserPrefs = {
  timezone: "America/Tegucigalpa",
  days: {
    mon: { device: "computer", hours: 2 },
    tue: { device: "computer", hours: 2 },
    wed: { device: "computer", hours: 2 },
    thu: { device: "computer", hours: 2 },
    fri: { device: "computer", hours: 2 },
    sat: { device: "off", hours: 0 },
    sun: { device: "off", hours: 0 },
  },
  devices: {
    phone: {
      label: "Teléfono",
      capabilities:
        "Claude Code (app y navegador) disponible; sin app de escritorio ni entorno local. Bueno para planificar, generar/editar código con Claude Code, prompts, revisar y documentar.",
    },
    computer: {
      label: "Computadora",
      capabilities:
        "Acceso completo, incluida la app de escritorio y el entorno local de desarrollo.",
    },
  },
};

// Lunes de la semana de la fecha dada (en UTC, formato YYYY-MM-DD).
export function mondayOf(date = new Date()): string {
  const d = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  );
  const day = d.getUTCDay(); // 0 dom .. 6 sáb
  const diff = day === 0 ? -6 : 1 - day;
  d.setUTCDate(d.getUTCDate() + diff);
  return d.toISOString().slice(0, 10);
}

function addDays(iso: string, n: number): string {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

export async function getPrefs(
  supabase: SupabaseClient,
  userId: string
): Promise<UserPrefs> {
  const { data } = await supabase
    .from("user_prefs")
    .select("timezone, days, devices")
    .eq("user_id", userId)
    .maybeSingle();
  if (!data) return DEFAULT_PREFS;
  return {
    timezone: data.timezone ?? DEFAULT_PREFS.timezone,
    days: { ...DEFAULT_PREFS.days, ...(data.days ?? {}) },
    devices: { ...DEFAULT_PREFS.devices, ...(data.devices ?? {}) },
  };
}

// Genera la agenda de la semana con los proyectos elegidos y la guarda (upsert).
export async function generateAndStoreAgenda(
  supabase: SupabaseClient,
  userId: string,
  opts: { weekStart?: string; projectIds: string[] }
): Promise<AgendaPlan> {
  const weekStart = opts.weekStart ?? mondayOf();
  const prefs = await getPrefs(supabase, userId);

  // Proyectos elegidos (RLS garantiza que son del usuario).
  const { data: projects } = await supabase
    .from("projects")
    .select("id, name, phase, progress_pct, next_action, ai_description, roadmap")
    .in("id", opts.projectIds.length ? opts.projectIds : ["00000000-0000-0000-0000-000000000000"]);

  const days: AgendaInput["days"] = WEEKDAYS.map((wd, i) => {
    const cfg: DayConfig = prefs.days[wd] ?? { device: "off", hours: 0 };
    const device: DeviceKind = cfg.device;
    const caps =
      device === "phone"
        ? prefs.devices.phone.capabilities
        : device === "computer"
          ? prefs.devices.computer.capabilities
          : "Día libre, sin trabajo.";
    return {
      date: addDays(weekStart, i),
      weekday: wd,
      device,
      hours: cfg.hours ?? 0,
      deviceCapabilities: caps,
    };
  });

  const plan = await generateWeeklyAgenda({
    weekStart,
    days,
    projects: (projects ?? []).map(
      (p: Pick<
        Project,
        "id" | "name" | "phase" | "progress_pct" | "next_action" | "ai_description" | "roadmap"
      >) => ({
        id: p.id,
        name: p.name,
        phase: p.phase,
        progress_pct: p.progress_pct,
        next_action: p.next_action,
        description: p.ai_description,
        pending: (p.roadmap ?? [])
          .filter((s: RoadmapStep) => !s.done)
          .map((s: RoadmapStep) => s.title),
      })
    ),
  });

  await supabase.from("agendas").upsert(
    {
      user_id: userId,
      week_start: weekStart,
      plan,
      project_ids: opts.projectIds,
      generated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,week_start" }
  );

  return plan;
}
