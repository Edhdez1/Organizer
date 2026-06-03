import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getProject } from "@/lib/queries";
import { Card, CardBody } from "@/components/ui";
import { ProjectCard } from "@/components/project-card";
import { EditProject } from "@/components/edit-project";

export const dynamic = "force-dynamic";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const project = await getProject(id);
  if (!project) notFound();

  return (
    <main className="mx-auto max-w-xl px-4 py-8">
      <Link href="/dashboard" className="text-sm text-muted hover:underline">
        ← Volver al dashboard
      </Link>
      <h1 className="mb-4 mt-2 text-2xl font-bold">{project.name}</h1>

      <ProjectCard project={project} />

      <div className="mt-4">
        <EditProject project={project} />
      </div>

      <Card className="mt-4">
        <CardBody className="text-sm text-muted">
          <p>
            Creado: {new Date(project.created_at).toLocaleDateString("es")}
            {project.ai_summary_at && (
              <>
                {" · "}Resumen IA:{" "}
                {new Date(project.ai_summary_at).toLocaleString("es")}
              </>
            )}
          </p>
        </CardBody>
      </Card>
    </main>
  );
}
