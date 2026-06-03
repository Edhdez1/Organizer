import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { summarizeProject } from "@/lib/openai";
import { getProject } from "@/lib/queries";
import { fetchRepoSnapshot } from "@/lib/github";
import { inferPhaseFromSnapshot } from "@/lib/phases";
import type { GithubSnapshot } from "@/lib/types";

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

  let project = await getProject(project_id);
  if (!project)
    return NextResponse.json({ error: "Proyecto no encontrado" }, { status: 404 });

  // Si alguna fuente de GitHub no tiene datos aún, los traemos ahora para que el
  // resumen se base en actividad real (evita el "no hay actividad" cuando sí la hay).
  const stale = project.sources.filter(
    (s) => s.type === "github_repo" && !s.snapshot
  );
  if (stale.length > 0) {
    for (const s of stale) {
      try {
        const data = await fetchRepoSnapshot(s.external_id);
        await supabase.from("source_snapshots").insert({ source_id: s.id, data });
      } catch {
        // Si GitHub falla, seguimos con lo que haya.
      }
    }
    project = (await getProject(project_id)) ?? project;
  }

  // Fase deducida de la actividad, como pista para el modelo.
  const ghSnap = project.sources.find(
    (s) => s.type === "github_repo" && s.snapshot
  )?.snapshot?.data as GithubSnapshot | undefined;
  const inferredPhase = ghSnap ? inferPhaseFromSnapshot(ghSnap) : null;

  try {
    const result = await summarizeProject({
      name: project.name,
      description: project.description,
      phase: project.phase,
      inferredPhase,
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
