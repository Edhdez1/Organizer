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

export default function NewProjectPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [phase, setPhase] = useState<ProjectPhase>("idea");
  const [nextAction, setNextAction] = useState("");
  const [tags, setTags] = useState("");
  const [repo, setRepo] = useState("");

  const [repos, setRepos] = useState<RepoOption[]>([]);
  const [reposError, setReposError] = useState<string | null>(null);
  const [loadingRepos, setLoadingRepos] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/github/repos")
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Error");
        setRepos(data.repos ?? []);
      })
      .catch((err) => setReposError(err.message))
      .finally(() => setLoadingRepos(false));
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const selected = repos.find((r) => r.full_name === repo);
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description: description || null,
          phase,
          next_action: nextAction || null,
          tags: tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
          github_repo: repo || undefined,
          github_url: selected?.html_url,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error");
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
      setSaving(false);
    }
  }

  return (
    <main className="mx-auto max-w-xl px-4 py-8">
      <Link href="/dashboard" className="text-sm text-slate-500 hover:underline">
        ← Volver
      </Link>
      <h1 className="mb-4 mt-2 text-2xl font-bold">Añadir proyecto</h1>

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

            <Field label="Descripción">
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="De qué trata"
              />
            </Field>

            <Field label="Repositorio de GitHub (opcional)">
              {loadingRepos ? (
                <p className="text-sm text-slate-500">Cargando repos…</p>
              ) : reposError ? (
                <p className="text-sm text-red-600">
                  No se pudieron cargar los repos: {reposError}
                </p>
              ) : (
                <select
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  value={repo}
                  onChange={(e) => setRepo(e.target.value)}
                >
                  <option value="">— Sin repo —</option>
                  {repos.map((r) => (
                    <option key={r.full_name} value={r.full_name}>
                      {r.full_name}
                      {r.private ? " (privado)" : ""}
                    </option>
                  ))}
                </select>
              )}
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Fase">
                <select
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
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

            <Field label="Siguiente acción">
              <Input
                value={nextAction}
                onChange={(e) => setNextAction(e.target.value)}
                placeholder="Qué toca hacer ahora"
              />
            </Field>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <Button type="submit" disabled={saving} className="w-full">
              {saving ? "Guardando…" : "Crear proyecto"}
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
      <span className="text-sm font-medium text-slate-700">{label}</span>
      {children}
    </label>
  );
}
