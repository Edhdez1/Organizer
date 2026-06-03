import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Intercambia el código OAuth por una sesión y guarda el token del proveedor
// (Google / GitHub) para poder leer Drive y los repos en nombre del usuario.
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const provider = searchParams.get("provider");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.session) {
      const session = data.session;
      // Guardamos el token del proveedor recién autorizado.
      if (provider && session.provider_token && session.user) {
        // Google: caduca ~1h → guardamos expiry para refrescarlo luego.
        const expires_at =
          provider === "google"
            ? new Date(Date.now() + 3500 * 1000).toISOString()
            : null;
        await supabase.from("user_connections").upsert(
          {
            user_id: session.user.id,
            provider,
            access_token: session.provider_token,
            refresh_token: session.provider_refresh_token ?? null,
            expires_at,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "user_id,provider" }
        );
      }
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth`);
}
