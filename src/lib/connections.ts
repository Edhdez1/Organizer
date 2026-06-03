import type { SupabaseClient } from "@supabase/supabase-js";

export type Provider = "google" | "github";

interface Connection {
  access_token: string | null;
  refresh_token: string | null;
  expires_at: string | null;
}

// Refresca un access_token de Google usando el refresh_token (los tokens de
// Google caducan en ~1h; los de GitHub no caducan).
async function refreshGoogle(
  refreshToken: string
): Promise<{ access_token: string; expires_in: number } | null> {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientId || !clientSecret) return null;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });
  if (!res.ok) return null;
  return res.json();
}

// Devuelve un access_token válido para el proveedor, refrescándolo si hace falta.
// Para GitHub, si el usuario no ha conectado su cuenta, cae al GITHUB_TOKEN de
// entorno (compatibilidad con la fase anterior).
export async function getProviderToken(
  supabase: SupabaseClient,
  userId: string,
  provider: Provider
): Promise<string | null> {
  const { data: row } = await supabase
    .from("user_connections")
    .select("access_token, refresh_token, expires_at")
    .eq("user_id", userId)
    .eq("provider", provider)
    .maybeSingle();
  const data = row as Connection | null;

  if (!data) {
    return provider === "github" ? process.env.GITHUB_TOKEN ?? null : null;
  }

  // Google: refresca si está por caducar.
  if (provider === "google" && data.refresh_token && data.expires_at) {
    const soon = Date.now() + 60_000;
    if (new Date(data.expires_at).getTime() <= soon) {
      const refreshed = await refreshGoogle(data.refresh_token);
      if (refreshed) {
        const expires_at = new Date(
          Date.now() + refreshed.expires_in * 1000
        ).toISOString();
        await supabase
          .from("user_connections")
          .update({ access_token: refreshed.access_token, expires_at })
          .eq("user_id", userId)
          .eq("provider", "google");
        return refreshed.access_token;
      }
    }
  }

  return data.access_token ?? (provider === "github" ? process.env.GITHUB_TOKEN ?? null : null);
}

// Lista qué proveedores tiene conectados el usuario (para la UI).
export async function getConnections(
  supabase: SupabaseClient,
  userId: string
): Promise<Record<Provider, boolean>> {
  const { data } = await supabase
    .from("user_connections")
    .select("provider")
    .eq("user_id", userId);
  const set = new Set((data ?? []).map((r: { provider: Provider }) => r.provider));
  return { google: set.has("google"), github: set.has("github") };
}
