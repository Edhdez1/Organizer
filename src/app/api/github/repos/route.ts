import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { listRepos } from "@/lib/github";

export const dynamic = "force-dynamic";

// Lista los repos accesibles por el token, para el selector al añadir proyecto.
export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  try {
    const repos = await listRepos();
    return NextResponse.json({ repos });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error al leer GitHub";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
