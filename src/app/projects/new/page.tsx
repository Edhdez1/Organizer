"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button, Card, CardBody, Input } from "@/components/ui";
import { PHASES } from "@/lib/phases";
import type { ProjectPhase } from "@/lib/types";

interface RepoOption {
  full_name: string;
  html_url: string;
  description: string | null;
  private: boolean;
}
interface FolderOption {
  id: string;
  name: string;
}

export default function NewProjectPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [phase, setPhase] = useState<ProjectPhase>("idea");
  const [nextAction, setNextAction] = useState("");
  const [tags, setTags] = useState("");
  const [repo, setRepo] = useState("");
  const [folder, setFolder] = useState("");

  const [repos, setRepos] = useState<RepoOption[]>([]);
  const [reposError, setReposError] = useState<string | null>(null);
  const [folders, setFolders] = useState<FolderOption[]>([]);
  const [foldersError, setFoldersError] = useState<string | null>(null);

  const [saving, setSaving] = useState(false);
  const [savingLabel, setSavingLabel] = useState("Crear proyecto");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/github/repos")
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Error");
        setRepos(data.repos ?? []);
      })
      .catch((err) => setReposError(err.message));

    fetch("/api/drive/folders")
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Error");
        setFolders(data.folders ?? []);
      })
      .catch((err) => setFoldersError(err.message));
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const selected = repos.find((r) => r.full_name === repo);
      const selectedFolder = folders.find((f) => f.id === folder);
      setSavingLabel("Creando…");
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description: description || null,
          phase,
          next_action: nextAction || null,
          tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
          github_repo: repo || undefined,
          github_url: selected?.html_url,
          drive_folder_id: folder || undefined,
          drive_folder_name: selectedFolder?.name,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error");

      // Análisis automático si hay alguna fuente enlazada.
      if (data.project?.id && (repo || folder)) {
        setSavingLabel("Analizando con IA…");
        try {
          await fetch("/api/ai/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ project_id: data.project.id }),
          });
        } catch {
          // si el análisis falla, el proyecto ya está creado; se reintenta luego
        }
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
      setSaving(false);
      setSavingLabel("Crear proyecto");
    }
  }

  return (
    <main className="mx-auto max-w-xl px-4 py-8">
      <Link href="/dashboard" className="text-sm text-muted hover:underline">
        ← Volver
      </Link>
      <h1 className="mb-1 mt-2 text-2xl font-bold">Añadir proyecto</h1>
      <p className="mb-4 text-sm text-muted">
        Enlaza un repo de GitHub y/o una carpeta de Drive: Faro leerá su contenido
        y generará descripción, progreso y roadmap automáticamente.
      </p>

      <Card>
        <CardBody>
          <form onSubmit={submit} className="space-y-4">
            <Field label="Nombre del proyecto *">
              <Input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Mi proyecto"
              />
            </Field>

            <Field label="Descripción (opcional)">
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="De qué trata"
              />
            </Field>

            <Field label="Repositorio de GitHub (opcional)">
              {reposError ? (
                <p className="text-sm text-danger">{reposError}</p>
              ) : (
                <select
                  className="w-full rounded-xl border border-edge bg-ink px-3 py-2 text-sm text-cream"
                  value={repo}
                  onChange={(e) => setRepo(e.target.value)}
                >
                  <option value="">
                    {repos.length ? "— Sin repo —" : "Cargando repos…"}
                  </option>
                  {repos.map((r) => (
                    <option key={r.full_name} value={r.full_name}>
                      {r.full_name}
                      {r.private ? " (privado)" : ""}
                    </option>
                  ))}
                </select>
              )}
            </Field>

            <Field label="Carpeta de Google Drive (opcional)">
              {foldersError ? (
                <p className="text-sm text-danger">{foldersError}</p>
              ) : (
                <select
                  className="w-full rounded-xl border border-edge bg-ink px-3 py-2 text-sm text-cream"
                  value={folder}
                  onChange={(e) => setFolder(e.target.value)}
                >
                  <option value="">
                    {folders.length ? "— Sin carpeta —" : "Cargando carpetas…"}
                  </option>
                  {folders.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name}
                    </option>
                  ))}
                </select>
              )}
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Fase">
                <select
                  className="w-full rounded-xl border border-edge bg-ink px-3 py-2 text-sm text-cream"
                  value={phase}
                  onChange={(e) => setPhase(e.target.value as ProjectPhase)}
                >
                  {PHASES.map((p) => (
                    <option key={p.value} value={p.value}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Etiquetas (coma)">
                <Input
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="react, cliente"
                />
              </Field>
            </div>

            <Field label="Siguiente acción (opcional)">
              <Input
                value={nextAction}
                onChange={(e) => setNextAction(e.target.value)}
                placeholder="Qué toca hacer ahora"
              />
            </Field>

            {error && <p className="text-sm text-danger">{error}</p>}

            <Button type="submit" disabled={saving} className="w-full">
              {saving ? savingLabel : "Crear proyecto"}
            </Button>
          </form>
        </CardBody>
      </Card>
    </main>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-1">
      <span className="text-sm font-medium text-cream">{label}</span>
      {children}
    </label>
  );
}
