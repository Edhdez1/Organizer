import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { runAnalysis } from "@/lib/analyze";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

// Analiza un proyecto a fondo (GitHub + Drive) y guarda descripción, estado,
// progreso % y roadmap. Devuelve también next_action como sugerencia.
export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { project_id } = (await request.json()) ?? {};
  if (!project_id)
    return NextResponse.json({ error: "Falta project_id" }, { status: 400 });

  try {
    const result = await runAnalysis(supabase, user.id, project_id);
    if (!result)
      return NextResponse.json({ error: "Proyecto no encontrado" }, { status: 404 });
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Error al analizar" },
      { status: 500 }
    );
  }
}
