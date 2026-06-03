import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { fetchRepoSnapshot } from "@/lib/github";
import { inferPhaseFromSnapshot } from "@/lib/phases";
import type { GithubSnapshot, ProjectSource } from "@/lib/types";

export const dynamic = "force-dynamic";

// Refresca (bajo demanda) el estado de las fuentes de GitHub de un proyecto.
export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { project_id } = (await request.json()) ?? {};
  if (!project_id)
    return NextResponse.json({ error: "Falta project_id" }, { status: 400 });

  // RLS garantiza que solo veamos fuentes de proyectos del usuario.
  const { data: sources, error } = await supabase
    .from("project_sources")
    .select("*")
    .eq("project_id", project_id)
    .eq("type", "github_repo");

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  const results: { source_id: string; ok: boolean; error?: string }[] = [];
  let lastData: GithubSnapshot | null = null;
  for (const source of (sources ?? []) as ProjectSource[]) {
    try {
      const data = await fetchRepoSnapshot(source.external_id);
      await supabase.from("source_snapshots").insert({ source_id: source.id, data });
      lastData = data;
      results.push({ source_id: source.id, ok: true });
    } catch (err) {
      results.push({
        source_id: source.id,
        ok: false,
        error: err instanceof Error ? err.message : "Error",
      });
    }
  }

  // Deducción de fase a partir de la actividad. Si el proyecto seguía en "idea"
  // (valor por defecto, sin tocar), la corregimos sola; si el usuario ya eligió
  // una fase, solo la devolvemos como sugerencia para que decida.
  let suggested_phase: string | null = null;
  let applied = false;
  if (lastData) {
    suggested_phase = inferPhaseFromSnapshot(lastData);
    const { data: proj } = await supabase
      .from("projects")
      .select("phase")
      .eq("id", project_id)
      .single();
    if (proj?.phase === "idea" && suggested_phase !== "idea") {
      await supabase
        .from("projects")
        .update({ phase: suggested_phase })
        .eq("id", project_id)
        .eq("owner_id", user.id);
      applied = true;
    }
  }

  return NextResponse.json({ results, suggested_phase, applied });
}
