import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getProjectsWithSources } from "@/lib/queries";
import { Button } from "@/components/ui";
import { ProjectsBoard } from "@/components/projects-board";
import { SignOutButton } from "@/components/sign-out-button";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const projects = await getProjectsWithSources();

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Mis proyectos</h1>
          <p className="text-sm text-slate-500">{user.email}</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/projects/new">
            <Button>+ Añadir proyecto</Button>
          </Link>
          <SignOutButton />
        </div>
      </header>

      {projects.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 p-10 text-center">
          <p className="text-slate-600">Todavía no tienes proyectos.</p>
          <Link href="/projects/new" className="mt-3 inline-block">
            <Button>Añadir tu primer proyecto</Button>
          </Link>
        </div>
      ) : (
        <ProjectsBoard projects={projects} />
      )}
    </main>
  );
}
