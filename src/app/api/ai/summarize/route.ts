import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { summarizeProject } from "@/lib/openai";
import { getProject } from "@/lib/queries";

export const dynamic = "force-dynamic";
// Damos margen al modelo (en Vercel Hobby el límite es 10s).
export const maxDuration = 30;

// Genera, bajo demanda, un resumen del estado + siguiente acción sugerida.
export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { project_id } = (await request.json()) ?? {};
  if (!project_id)
    return NextResponse.json({ error: "Falta project_id" }, { status: 400 });

  const project = await getProject(project_id);
  if (!project)
    return NextResponse.json({ error: "Proyecto no encontrado" }, { status: 404 });

  try {
    const result = await summarizeProject({
      name: project.name,
      description: project.description,
      phase: project.phase,
      snapshots: project.sources
        .filter((s) => s.snapshot)
        .map((s) => ({ label: s.label ?? s.external_id, data: s.snapshot!.data })),
    });

    // Guardamos el resumen. La "siguiente acción" se devuelve como SUGERENCIA;
    // el usuario decide si la aplica (control manual).
    await supabase
      .from("projects")
      .update({ ai_summary: result.summary, ai_summary_at: new Date().toISOString() })
      .eq("id", project_id)
      .eq("owner_id", user.id);

    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error al resumir";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
