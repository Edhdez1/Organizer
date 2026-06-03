import type { SupabaseClient } from "@supabase/supabase-js";
import { getProviderToken } from "@/lib/connections";
import {
  fetchRepoContext,
  fetchRepoSnapshot,
  milestoneProgress,
} from "@/lib/github";
import { fetchDriveContext } from "@/lib/google-drive";
import { analyzeProject, type AnalyzeResult } from "@/lib/openai";
import { inferPhaseFromSnapshot } from "@/lib/phases";
import type {
  GithubSnapshot,
  ProjectSource,
  ProjectWithSources,
  SourceSnapshot,
} from "@/lib/types";

// Carga un proyecto con sus fuentes y el último snapshot de cada una usando el
// cliente que se le pase (de usuario con RLS, o admin/service-role para el cron).
async function loadProject(
  supabase: SupabaseClient,
  projectId: string
): Promise<ProjectWithSources | null> {
  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", projectId)
    .maybeSingle();
  if (!project) return null;

  const { data: sources } = await supabase
    .from("project_sources")
    .select("*")
    .eq("project_id", projectId);

  const sourceIds = (sources ?? []).map((s: ProjectSource) => s.id);
  let snaps: SourceSnapshot[] = [];
  if (sourceIds.length > 0) {
    const { data } = await supabase
      .from("source_snapshots")
      .select("*")
      .in("source_id", sourceIds)
      .order("fetched_at", { ascending: false });
    snaps = (data ?? []) as SourceSnapshot[];
  }
  const latest = new Map<string, SourceSnapshot>();
  for (const s of snaps) if (!latest.has(s.source_id)) latest.set(s.source_id, s);

  return {
    ...(project as ProjectWithSources),
    sources: (sources ?? []).map((s: ProjectSource) => ({
      ...s,
      snapshot: latest.get(s.id) ?? null,
    })),
  };
}

// Analiza un proyecto leyendo el contenido de TODAS sus fuentes (GitHub + Drive)
// y guarda descripción, estado, progreso % y roadmap. Reutilizado por la ruta de
// análisis, la creación automática y el cron de re-análisis.
export async function runAnalysis(
  supabase: SupabaseClient,
  userId: string,
  projectId: string
): Promise<AnalyzeResult | null> {
  const project = await loadProject(supabase, projectId);
  if (!project) return null;

  const ghSource = project.sources.find((s) => s.type === "github_repo");
  const driveSources = project.sources.filter((s) => s.type === "drive_folder");

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

  // Google Drive: combina el contenido de TODAS las carpetas enlazadas.
  if (driveSources.length > 0) {
    try {
      const gtoken = await getProviderToken(supabase, userId, "google");
      if (gtoken) {
        const files: string[] = [];
        const docs: string[] = [];
        for (const ds of driveSources) {
          const dctx = await fetchDriveContext(gtoken, ds.external_id);
          await supabase.from("source_snapshots").insert({
            source_id: ds.id,
            data: {
              fileCount: dctx.fileCount,
              lastModified: dctx.lastModified,
              files: dctx.files,
            },
          });
          files.push(...dctx.files);
          docs.push(...dctx.docs);
        }
        if (files.length || docs.length) drive = { files, docs };
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
