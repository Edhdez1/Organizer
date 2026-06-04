import OpenAI from "openai";
import type {
  AgendaPlan,
  DeviceKind,
  GithubSnapshot,
  ProjectPhase,
  Weekday,
} from "@/lib/types";

// La API key vive SOLO en el servidor (OPENAI_API_KEY).
function client() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("Falta OPENAI_API_KEY. Configura tu clave de OpenAI.");
  }
  return new OpenAI({ apiKey });
}

export interface SummarizeInput {
  name: string;
  description: string | null;
  phase: ProjectPhase;
  // Fase deducida de la actividad real (commits/PRs/fechas), como pista para el modelo.
  inferredPhase?: ProjectPhase | null;
  snapshots: { label: string; data: GithubSnapshot | Record<string, unknown> }[];
}

export interface SummarizeResult {
  summary: string;
  next_action: string;
}

// Genera, bajo demanda, un resumen del estado + una siguiente acción sugerida.
// Modelo económico por defecto (gpt-4o-mini); se respeta el límite de 10s de Vercel
// pidiendo una respuesta corta en JSON.
export async function summarizeProject(
  input: SummarizeInput
): Promise<SummarizeResult> {
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
  const openai = client();

  const context = JSON.stringify(input, null, 2);

  const completion = await openai.chat.completions.create({
    model,
    temperature: 0.3,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content:
          "Eres un asistente que resume el estado de proyectos de software a partir " +
          "de su actividad real en GitHub. Responde en español, conciso y concreto. " +
          "IMPORTANTE: basa el estado en la ACTIVIDAD real (commits, PRs abiertas, " +
          "fecha del último commit y de la última actividad), NO en la etiqueta de fase. " +
          "Si hay commits y PRs recientes, el proyecto está EN DESARROLLO activo, aunque " +
          "la etiqueta diga 'idea'. No afirmes que no hay actividad si los datos muestran " +
          "commits o PRs. " +
          'Devuelve SOLO un JSON con las claves "summary" (2-3 frases sobre el estado ' +
          'real) y "next_action" (una sola siguiente acción recomendada y accionable).',
      },
      {
        role: "user",
        content: `Datos del proyecto y su actividad reciente:\n${context}`,
      },
    ],
  });

  const raw = completion.choices[0]?.message?.content ?? "{}";
  let parsed: Partial<SummarizeResult> = {};
  try {
    parsed = JSON.parse(raw);
  } catch {
    parsed = { summary: raw, next_action: "" };
  }

  return {
    summary: parsed.summary?.trim() || "No se pudo generar el resumen.",
    next_action: parsed.next_action?.trim() || "",
  };
}

// ── Análisis completo del proyecto (Fase B) ─────────────────────────────────
// Lee el CONTENIDO real (README, archivos, lenguajes, Drive) para describir QUÉ
// es el proyecto, su estado, siguiente acción, progreso % y roadmap.
export interface AnalyzeInput {
  name: string;
  description: string | null;
  phase: ProjectPhase;
  repo?: {
    description: string | null;
    languages: string[];
    topics: string[];
    readme: string | null;
    files: string[];
    activity: GithubSnapshot | null;
  } | null;
  drive?: { files: string[]; docs: string[] } | null;
  // Progreso por milestones (si existe, la IA debe usarlo como ancla).
  milestoneProgress?: number | null;
}

export interface AnalyzeResult {
  description: string;
  summary: string;
  next_action: string;
  progress_pct: number;
  roadmap: { title: string; done: boolean }[];
}

export async function analyzeProject(
  input: AnalyzeInput
): Promise<AnalyzeResult> {
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
  const openai = client();
  const context = JSON.stringify(input, null, 2);

  const completion = await openai.chat.completions.create({
    model,
    temperature: 0.3,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content:
          "Eres un analista de proyectos. A partir del README, archivos, lenguajes, " +
          "actividad de GitHub y documentos de Drive, describe QUÉ ES el proyecto y en " +
          "qué punto está. Responde en español, concreto, sin relleno. " +
          "Devuelve SOLO un JSON con estas claves: " +
          '"description" (1-2 frases: qué es y para qué sirve el proyecto, basado en el ' +
          'README/contenido, NO en métricas), ' +
          '"summary" (2-3 frases sobre el estado actual real), ' +
          '"next_action" (una siguiente acción concreta), ' +
          '"progress_pct" (entero 0-100 de avance hacia un producto terminado; si te paso ' +
          'milestoneProgress, úsalo como base), ' +
          '"roadmap" (4 a 6 hitos en orden, cada uno {"title": string, "done": boolean}; ' +
          "marca done=true los que el contenido indique completados).",
      },
      { role: "user", content: `Datos del proyecto:\n${context}` },
    ],
  });

  const raw = completion.choices[0]?.message?.content ?? "{}";
  let p: Partial<AnalyzeResult> = {};
  try {
    p = JSON.parse(raw);
  } catch {}

  const pct =
    typeof p.progress_pct === "number"
      ? Math.max(0, Math.min(100, Math.round(p.progress_pct)))
      : input.milestoneProgress ?? 0;

  return {
    description: p.description?.trim() || input.description || "",
    summary: p.summary?.trim() || "No se pudo generar el análisis.",
    next_action: p.next_action?.trim() || "",
    progress_pct: pct,
    roadmap: Array.isArray(p.roadmap)
      ? p.roadmap
          .filter((s) => s && typeof s.title === "string")
          .map((s) => ({ title: s.title, done: !!s.done }))
      : [],
  };
}

// ── Agenda semanal por dispositivo (Fase Agenda) ────────────────────────────
export interface AgendaInput {
  weekStart: string; // "YYYY-MM-DD" (lunes)
  days: {
    date: string;
    weekday: Weekday;
    device: DeviceKind;
    hours: number;
    deviceCapabilities: string; // perfil de capacidades del dispositivo del día
  }[];
  projects: {
    id: string;
    name: string;
    phase: ProjectPhase;
    progress_pct: number | null;
    next_action: string | null;
    description: string | null;
    pending: string[]; // hitos pendientes del roadmap
  }[];
}

// Genera un plan semanal repartiendo los proyectos elegidos entre los días, con
// tareas que encajen en las capacidades del dispositivo de cada día.
export async function generateWeeklyAgenda(
  input: AgendaInput
): Promise<AgendaPlan> {
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
  const openai = client();
  const context = JSON.stringify(input, null, 2);

  const completion = await openai.chat.completions.create({
    model,
    temperature: 0.4,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content:
          "Eres un planificador personal. Repartes el tiempo de la semana entre los " +
          "proyectos dados para que ninguno quede olvidado. Respondes en español. " +
          "REGLAS: (1) Cada día tiene un dispositivo y un número de horas disponibles; " +
          "no superes esas horas. (2) Asigna a cada día SOLO tareas que encajen con las " +
          "'deviceCapabilities' de ese día (p. ej. con Claude Code en el teléfono SÍ se " +
          "puede programar; evita tareas que requieran app de escritorio/entorno local si " +
          "el perfil lo indica). (3) En días con device 'off' no programes nada (blocks vacío). " +
          "(4) Rota entre los proyectos para equilibrar; elige la tarea concreta según " +
          "'next_action' y los hitos 'pending'. (5) Bloques realistas de 1-2 horas con horas " +
          "de inicio razonables. " +
          'Devuelve SOLO un JSON: {"days":[{"date","weekday","device","blocks":[{"start"(HH:MM),' +
          '"end"(HH:MM),"project_id","project_name","task","device"}]}]}. Usa exactamente las ' +
          "fechas, weekday y device que te paso para cada día.",
      },
      { role: "user", content: `Semana y proyectos:\n${context}` },
    ],
  });

  const raw = completion.choices[0]?.message?.content ?? "{}";
  let parsed: { days?: unknown } = {};
  try {
    parsed = JSON.parse(raw);
  } catch {
    parsed = {};
  }
  const days = Array.isArray(parsed.days) ? (parsed.days as AgendaPlan["days"]) : [];
  return { days };
}
