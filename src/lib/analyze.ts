import type { SupabaseClient } from "@supabase/supabase-js";
import { getProject } from "@/lib/queries";
import { getProviderToken } from "@/lib/connections";
import {
  fetchRepoContext,
  fetchRepoSnapshot,
  milestoneProgress,
} from "@/lib/github";
import { fetchDriveContext } from "@/lib/google-drive";
import { analyzeProject, type AnalyzeResult } from "@/lib/openai";
import { inferPhaseFromSnapshot } from "@/lib/phases";
import type { GithubSnapshot } from "@/lib/types";

// Analiza un proyecto leyendo el contenido de TODAS sus fuentes (GitHub + Drive)
// y guarda descripción, estado, progreso % y roadmap. Reutilizado por la ruta de
// análisis y por la creación automática.
export async function runAnalysis(
  supabase: SupabaseClient,
  userId: string,
  projectId: string
): Promise<AnalyzeResult | null> {
  const project = await getProject(projectId);
  if (!project) return null;

  const ghSource = project.sources.find((s) => s.type === "github_repo");
  const driveSource = project.sources.find((s) => s.type === "drive_folder");

  let repo: Parameters<typeof analyzeProject>[0]["repo"] = null;
  let drive: Parameters<typeof analyzeProject>[0]["drive"] = null;
  let mProgress: number | null = null;

  // GitHub
  if (ghSource) {
    const token = await getProviderToken(supabase, userId, "github");
    const ctx = await fetchRepoContext(token, ghSource.external_id);
    mProgress = milestoneProgress(ctx);

    let activity =
      (ghSource.snapshot?.data as GithubSnapshot | undefined) ?? null;
    if (!activity) {
      activity = await fetchRepoSnapshot(token, ghSource.external_id);
      await supabase
        .from("source_snapshots")
        .insert({ source_id: ghSource.id, data: activity });
    }
    repo = {
      description: ctx.description,
      languages: ctx.languages,
      topics: ctx.topics,
      readme: ctx.readme,
      files: ctx.files,
      activity,
    };
  }

  // Google Drive
  if (driveSource) {
    try {
      const gtoken = await getProviderToken(supabase, userId, "google");
      if (gtoken) {
        const dctx = await fetchDriveContext(gtoken, driveSource.external_id);
        await supabase.from("source_snapshots").insert({
          source_id: driveSource.id,
          data: {
            fileCount: dctx.fileCount,
            lastModified: dctx.lastModified,
            files: dctx.files,
          },
        });
        drive = { files: dctx.files, docs: dctx.docs };
      }
    } catch {
      // si Drive falla, analizamos solo con lo de GitHub
    }
  }

  const result = await analyzeProject({
    name: project.name,
    description: project.description,
    phase: project.phase,
    repo,
    drive,
    milestoneProgress: mProgress,
  });

  const update: Record<string, unknown> = {
    ai_description: result.description,
    ai_summary: result.summary,
    ai_summary_at: new Date().toISOString(),
    progress_pct: result.progress_pct,
    roadmap: result.roadmap,
  };
  // Corrige la fase si seguía en "idea" y hay actividad real en GitHub.
  if (project.phase === "idea" && repo?.activity) {
    const inferred = inferPhaseFromSnapshot(repo.activity);
    if (inferred !== "idea") update.phase = inferred;
  }

  await supabase
    .from("projects")
    .update(update)
    .eq("id", projectId)
    .eq("owner_id", userId);

  return result;
}
