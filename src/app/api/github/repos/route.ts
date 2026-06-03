import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { listRepos } from "@/lib/github";
import { getProviderToken } from "@/lib/connections";

export const dynamic = "force-dynamic";

// Lista los repos accesibles por el usuario (incl. privados), para el selector.
export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const token = await getProviderToken(supabase, user.id, "github");
  if (!token) {
    return NextResponse.json(
      { error: "Conecta tu cuenta de GitHub para ver tus repositorios." },
      { status: 400 }
    );
  }

  try {
    const repos = await listRepos(token);
    return NextResponse.json({ repos });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error al leer GitHub";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
