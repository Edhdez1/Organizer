import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { fetchRepoSnapshot } from "@/lib/github";
import { inferPhaseFromSnapshot } from "@/lib/phases";

export const dynamic = "force-dynamic";

// Crea un proyecto y, opcionalmente, una fuente de GitHub asociada.
export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const body = await request.json();
  const {
    name,
    description = null,
    phase = "idea",
    next_action = null,
    tags = [],
    github_repo, // 'owner/repo' (opcional)
    github_url, // html_url del repo (opcional)
  } = body ?? {};

  if (!name || typeof name !== "string") {
    return NextResponse.json({ error: "El nombre es obligatorio" }, { status: 400 });
  }

  const { data: project, error } = await supabase
    .from("projects")
    .insert({ owner_id: user.id, name, description, phase, next_action, tags })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  if (github_repo) {
    const { data: source, error: srcErr } = await supabase
      .from("project_sources")
      .insert({
        project_id: project.id,
        type: "github_repo",
        external_id: github_repo,
        external_url: github_url ?? `https://github.com/${github_repo}`,
        label: github_repo,
      })
      .select()
      .single();
    if (srcErr) return NextResponse.json({ error: srcErr.message }, { status: 400 });

    // Trae el estado inicial del repo y deduce la fase real de la actividad.
    // Si el usuario dejó la fase por defecto ("idea"), la ajustamos a lo que
    // diga GitHub; si eligió otra a mano, se respeta.
    try {
      const data = await fetchRepoSnapshot(github_repo);
      await supabase.from("source_snapshots").insert({ source_id: source.id, data });
      if (phase === "idea") {
        const inferred = inferPhaseFromSnapshot(data);
        if (inferred !== "idea") {
          await supabase
            .from("projects")
            .update({ phase: inferred })
            .eq("id", project.id)
            .eq("owner_id", user.id);
          project.phase = inferred;
        }
      }
    } catch {
      // Si GitHub falla, el proyecto igual se crea; se refresca luego a mano.
    }
  }

  return NextResponse.json({ project }, { status: 201 });
}

// Actualiza campos editables a mano de un proyecto.
export async function PATCH(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const body = await request.json();
  const { id, ...fields } = body ?? {};
  if (!id) return NextResponse.json({ error: "Falta id" }, { status: 400 });

  // Solo permitimos editar estos campos.
  const allowed = ["name", "description", "phase", "next_action", "tags", "sort_order"];
  const update: Record<string, unknown> = {};
  for (const key of allowed) {
    if (key in fields) update[key] = fields[key];
  }

  const { data: project, error } = await supabase
    .from("projects")
    .update(update)
    .eq("id", id)
    .eq("owner_id", user.id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ project });
}

// Elimina un proyecto (sus fuentes y snapshots caen en cascada).
export async function DELETE(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Falta id" }, { status: 400 });

  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", id)
    .eq("owner_id", user.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}
