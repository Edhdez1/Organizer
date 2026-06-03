import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getProject } from "@/lib/queries";
import { getProviderToken } from "@/lib/connections";
import {
  fetchRepoContext,
  fetchRepoSnapshot,
  milestoneProgress,
} from "@/lib/github";
import { analyzeProject } from "@/lib/openai";
import { inferPhaseFromSnapshot } from "@/lib/phases";
import type { GithubSnapshot } from "@/lib/types";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

// Analiza un proyecto a fondo: lee el CONTENIDO del repo (README, archivos,
// lenguajes, milestones) + actividad, y genera descripción, estado, siguiente
// acción, progreso % (híbrido) y roadmap. Drive se añadirá como fuente extra.
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

  const githubSource = project.sources.find((s) => s.type === "github_repo");

  let repo: Parameters<typeof analyzeProject>[0]["repo"] = null;
  let mProgress: number | null = null;

  if (githubSource) {
    try {
      const token = await getProviderToken(supabase, user.id, "github");
      const ctx = await fetchRepoContext(token, githubSource.external_id);
      mProgress = milestoneProgress(ctx);

      // Actividad: usa el último snapshot o trae uno fresco.
      let activity =
        (githubSource.snapshot?.data as GithubSnapshot | undefined) ?? null;
      if (!activity) {
        activity = await fetchRepoSnapshot(token, githubSource.external_id);
        await supabase
          .from("source_snapshots")
          .insert({ source_id: githubSource.id, data: activity });
      }

      repo = {
        description: ctx.description,
        languages: ctx.languages,
        topics: ctx.topics,
        readme: ctx.readme,
        files: ctx.files,
        activity,
      };
    } catch (err) {
      return NextResponse.json(
        { error: err instanceof Error ? err.message : "Error leyendo GitHub" },
        { status: 500 }
      );
    }
  }

  try {
    const result = await analyzeProject({
      name: project.name,
      description: project.description,
      phase: project.phase,
      repo,
      drive: null, // se añadirá al enlazar carpeta de Drive
      milestoneProgress: mProgress,
    });

    // Guardamos lo que es "propiedad de la IA". next_action se devuelve como
    // sugerencia (el usuario decide aplicarla). Si la fase seguía en "idea" y hay
    // actividad, la corregimos.
    const update: Record<string, unknown> = {
      ai_description: result.description,
      ai_summary: result.summary,
      ai_summary_at: new Date().toISOString(),
      progress_pct: result.progress_pct,
      roadmap: result.roadmap,
    };
    if (project.phase === "idea" && repo?.activity) {
      const inferred = inferPhaseFromSnapshot(repo.activity);
      if (inferred !== "idea") update.phase = inferred;
    }

    await supabase
      .from("projects")
      .update(update)
      .eq("id", project_id)
      .eq("owner_id", user.id);

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Error al analizar" },
      { status: 500 }
    );
  }
}
