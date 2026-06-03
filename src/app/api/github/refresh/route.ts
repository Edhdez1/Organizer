import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { fetchRepoSnapshot } from "@/lib/github";
import type { ProjectSource } from "@/lib/types";

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
  for (const source of (sources ?? []) as ProjectSource[]) {
    try {
      const data = await fetchRepoSnapshot(source.external_id);
      await supabase.from("source_snapshots").insert({ source_id: source.id, data });
      results.push({ source_id: source.id, ok: true });
    } catch (err) {
      results.push({
        source_id: source.id,
        ok: false,
        error: err instanceof Error ? err.message : "Error",
      });
    }
  }

  return NextResponse.json({ results });
}
