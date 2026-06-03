import { createClient } from "@/lib/supabase/server";
import type {
  Project,
  ProjectSource,
  ProjectWithSources,
  SourceSnapshot,
} from "@/lib/types";

// Carga los proyectos del usuario con sus fuentes y el último snapshot de cada una.
export async function getProjectsWithSources(): Promise<ProjectWithSources[]> {
  const supabase = await createClient();

  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) throw error;
  if (!projects || projects.length === 0) return [];

  const ids = projects.map((p: Project) => p.id);
  const { data: sources } = await supabase
    .from("project_sources")
    .select("*")
    .in("project_id", ids);

  const sourceIds = (sources ?? []).map((s: ProjectSource) => s.id);
  let snapshots: SourceSnapshot[] = [];
  if (sourceIds.length > 0) {
    const { data: snaps } = await supabase
      .from("source_snapshots")
      .select("*")
      .in("source_id", sourceIds)
      .order("fetched_at", { ascending: false });
    snapshots = (snaps ?? []) as SourceSnapshot[];
  }

  // Último snapshot por fuente.
  const latestBySource = new Map<string, SourceSnapshot>();
  for (const snap of snapshots) {
    if (!latestBySource.has(snap.source_id)) latestBySource.set(snap.source_id, snap);
  }

  return projects.map((p: Project) => ({
    ...p,
    sources: (sources ?? [])
      .filter((s: ProjectSource) => s.project_id === p.id)
      .map((s: ProjectSource) => ({
        ...s,
        snapshot: latestBySource.get(s.id) ?? null,
      })),
  }));
}

export async function getProject(id: string): Promise<ProjectWithSources | null> {
  const all = await getProjectsWithSources();
  return all.find((p) => p.id === id) ?? null;
}
