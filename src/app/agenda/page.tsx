import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getPrefs, mondayOf } from "@/lib/agenda";
import { Logo } from "@/components/logo";
import { AgendaSettings } from "@/components/agenda-settings";
import { GenerateAgenda } from "@/components/generate-agenda";
import { AgendaWeek } from "@/components/agenda-week";
import type { AgendaPlan } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AgendaPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const week_start = mondayOf();
  const [prefs, projectsRes, agendaRes] = await Promise.all([
    getPrefs(supabase, user.id),
    supabase.from("projects").select("id, name").order("created_at"),
    supabase
      .from("agendas")
      .select("plan")
      .eq("user_id", user.id)
      .eq("week_start", week_start)
      .maybeSingle(),
  ]);

  const projects = projectsRes.data ?? [];
  const plan = (agendaRes.data?.plan ?? null) as AgendaPlan | null;

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <Logo size={26} />
          <h1 className="mt-1 text-2xl font-bold">Mi agenda</h1>
          <p className="text-sm text-muted">Semana del {week_start}</p>
        </div>
        <Link href="/dashboard" className="text-sm text-muted hover:underline">
          ← Volver al dashboard
        </Link>
      </header>

      <div className="space-y-4">
        <AgendaSettings initial={prefs} />
        <GenerateAgenda projects={projects} />

        {plan && plan.days.length > 0 ? (
          <AgendaWeek plan={plan} />
        ) : (
          <p className="py-8 text-center text-sm text-muted">
            Aún no has generado la agenda de esta semana. Elige proyectos arriba y pulsa
            &quot;Generar agenda&quot;.
          </p>
        )}
      </div>
    </main>
  );
}
