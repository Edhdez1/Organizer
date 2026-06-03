import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getProviderToken } from "@/lib/connections";
import { listDriveFolders } from "@/lib/google-drive";

export const dynamic = "force-dynamic";

// Lista las carpetas de Google Drive del usuario (para el selector al enlazar).
export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const token = await getProviderToken(supabase, user.id, "google");
  if (!token) {
    return NextResponse.json(
      { error: "Conecta Google (entra con Google) para ver tus carpetas de Drive." },
      { status: 400 }
    );
  }

  try {
    const folders = await listDriveFolders(token);
    return NextResponse.json({ folders });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Error al leer Drive" },
      { status: 500 }
    );
  }
}
