import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

// Verifica que el proyecto pertenece al usuario autenticado.
async function ownsProject(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string,
  projectId: string
) {
  const { data } = await supabase
    .from("projects")
    .select("id")
    .eq("id", projectId)
    .eq("owner_id", userId)
    .maybeSingle();
  return !!data;
}

// Añade una fuente (repo de GitHub o carpeta de Drive) a un proyecto existente.
export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { project_id, type, external_id, external_url, label } =
    (await request.json()) ?? {};

  if (!project_id || !type || !external_id) {
    return NextResponse.json({ error: "Faltan datos de la fuente" }, { status: 400 });
  }
  if (type !== "github_repo" && type !== "drive_folder") {
    return NextResponse.json({ error: "Tipo de fuente inválido" }, { status: 400 });
  }
  if (!(await ownsProject(supabase, user.id, project_id))) {
    return NextResponse.json({ error: "Proyecto no encontrado" }, { status: 404 });
  }

  const { error } = await supabase.from("project_sources").insert({
    project_id,
    type,
    external_id,
    external_url:
      external_url ??
      (type === "github_repo"
        ? `https://github.com/${external_id}`
        : `https://drive.google.com/drive/folders/${external_id}`),
    label: label ?? external_id,
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ ok: true }, { status: 201 });
}

// Quita una fuente del proyecto (sus snapshots caen en cascada).
export async function DELETE(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Falta id" }, { status: 400 });

  // RLS asegura que solo borre fuentes de proyectos del usuario.
  const { error } = await supabase.from("project_sources").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ ok: true });
}
