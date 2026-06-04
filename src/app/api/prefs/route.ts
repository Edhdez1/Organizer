import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getPrefs } from "@/lib/agenda";

export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const prefs = await getPrefs(supabase, user.id);
  return NextResponse.json({ prefs });
}

export async function PUT(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { timezone, days, devices } = (await request.json()) ?? {};

  const update: Record<string, unknown> = {
    user_id: user.id,
    updated_at: new Date().toISOString(),
  };
  if (timezone) update.timezone = timezone;
  if (days) update.days = days;
  if (devices) update.devices = devices;

  const { error } = await supabase
    .from("user_prefs")
    .upsert(update, { onConflict: "user_id" });
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  const prefs = await getPrefs(supabase, user.id);
  return NextResponse.json({ prefs });
}
