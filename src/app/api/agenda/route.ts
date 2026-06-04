import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateAndStoreAgenda, mondayOf } from "@/lib/agenda";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

// Devuelve la agenda de la semana actual (si existe).
export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const week_start = mondayOf();
  const { data } = await supabase
    .from("agendas")
    .select("plan, project_ids, generated_at, week_start")
    .eq("user_id", user.id)
    .eq("week_start", week_start)
    .maybeSingle();

  return NextResponse.json({ agenda: data ?? null, week_start });
}

// Genera (y guarda) la agenda de la semana con los proyectos elegidos.
export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { projectIds, weekStart } = (await request.json()) ?? {};
  if (!Array.isArray(projectIds) || projectIds.length === 0) {
    return NextResponse.json(
      { error: "Elige al menos un proyecto." },
      { status: 400 }
    );
  }

  try {
    const plan = await generateAndStoreAgenda(supabase, user.id, {
      weekStart,
      projectIds,
    });
    return NextResponse.json({ plan });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Error al generar la agenda" },
      { status: 500 }
    );
  }
}
