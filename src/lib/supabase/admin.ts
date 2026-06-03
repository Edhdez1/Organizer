import { createClient } from "@supabase/supabase-js";

// Cliente con service-role (sin sesión de usuario, ignora RLS). Solo para uso
// en el servidor en tareas de fondo como el cron de re-análisis. NUNCA usar en
// el navegador. Requiere SUPABASE_SERVICE_ROLE_KEY.
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}
