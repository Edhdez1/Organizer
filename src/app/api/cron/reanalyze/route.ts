import { NextResponse, type NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { runAnalysis } from "@/lib/analyze";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

// Re-análisis programado (Vercel Cron, a diario). Re-analiza los proyectos con
// fuentes cuyo análisis es más antiguo, en lotes pequeños para no exceder el
// límite de tiempo. Protegido por CRON_SECRET (Vercel lo envía como Bearer).
export async function GET(request: NextRequest) {
  const auth = request.headers.get("authorization");
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const admin = createAdminClient();
  if (!admin) {
    return NextResponse.json(
      { error: "Falta SUPABASE_SERVICE_ROLE_KEY para el cron." },
      { status: 500 }
    );
  }

  // Proyectos ordenados por análisis más antiguo (los nunca analizados primero).
  const { data: projects } = await admin
    .from("projects")
    .select("id, owner_id, ai_summary_at")
    .order("ai_summary_at", { ascending: true, nullsFirst: true })
    .limit(5);

  let analyzed = 0;
  for (const p of projects ?? []) {
    // Solo proyectos con al menos una fuente.
    const { count } = await admin
      .from("project_sources")
      .select("id", { count: "exact", head: true })
      .eq("project_id", p.id);
    if (!count) continue;
    try {
      await runAnalysis(admin, p.owner_id, p.id);
      analyzed++;
    } catch {
      // continuamos con el resto si uno falla
    }
  }

  return NextResponse.json({ analyzed });
}
