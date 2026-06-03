"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, CardBody } from "@/components/ui";
import type { ProjectWithSources } from "@/lib/types";

interface RepoOption {
  full_name: string;
  html_url: string;
  private: boolean;
}
interface FolderOption {
  id: string;
  name: string;
}

// Normaliza texto para comparar (sin acentos, minúsculas, solo alfanumérico).
function norm(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function ManageSources({ project }: { project: ProjectWithSources }) {
  const router = useRouter();
  const [repos, setRepos] = useState<RepoOption[]>([]);
  const [folders, setFolders] = useState<FolderOption[]>([]);
  const [foldersError, setFoldersError] = useState<string | null>(null);
  const [repo, setRepo] = useState("");
  const [folder, setFolder] = useState("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const hasGithub = project.sources.some((s) => s.type === "github_repo");
  const linkedFolderIds = useMemo(
    () =>
      new Set(
        project.sources
          .filter((s) => s.type === "drive_folder")
          .map((s) => s.external_id)
      ),
    [project.sources]
  );

  useEffect(() => {
    fetch("/api/drive/folders")
      .then(async (r) => {
        const d = await r.json();
        if (!r.ok) throw new Error(d.error ?? "Error");
        setFolders(d.folders ?? []);
      })
      .catch((e) => setFoldersError(e.message));
    if (!hasGithub) {
      fetch("/api/github/repos")
        .then((r) => r.json())
        .then((d) => setRepos(d.repos ?? []))
        .catch(() => {});
    }
  }, [hasGithub]);

  // Tokens del proyecto (nombre + repo) para sugerir carpetas por similitud.
  const tokens = useMemo(() => {
    const parts: string[] = [norm(project.name)];
    const gh = project.sources.find((s) => s.type === "github_repo");
    if (gh) parts.push(norm(gh.external_id.split("/").pop() ?? ""));
    return parts
      .flatMap((p) => p.split(" "))
      .filter((t) => t.length >= 4);
  }, [project]);

  const available = folders.filter((f) => !linkedFolderIds.has(f.id));
  const suggested = available.filter((f) => {
    const nf = norm(f.name);
    return tokens.some((t) => nf.includes(t));
  });

  async function link(
    type: "github_repo" | "drive_folder",
    external_id: string,
    label: string,
    external_url?: string
  ) {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/sources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ project_id: project.id, type, external_id, label, external_url }),
      });
      if (!res.ok) throw new Error((await res.json()).error ?? "Error");
      setFolder("");
      setRepo("");
      // Re-analiza automáticamente con la nueva fuente (incluye Drive).
      setStatus("Analizando con la nueva fuente…");
      await fetch("/api/ai/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ project_id: project.id }),
      });
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setBusy(false);
      setStatus(null);
    }
  }

  async function removeSource(id: string) {
    setBusy(true);
    setError(null);
    try {
      await fetch(`/api/sources?id=${id}`, { method: "DELETE" });
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setBusy(false);
    }
  }

  async function analyze() {
    setBusy(true);
    setError(null);
    setStatus("Analizando con IA…");
    try {
      const res = await fetch("/api/ai/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ project_id: project.id }),
      });
      if (!res.ok) throw new Error((await res.json()).error ?? "Error");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setBusy(false);
      setStatus(null);
    }
  }

  return (
    <Card>
      <CardBody className="space-y-3">
        <h3 className="font-semibold">Fuentes del proyecto</h3>

        {/* Fuentes actuales */}
        {project.sources.length > 0 ? (
          <ul className="space-y-1">
            {project.sources.map((s) => (
              <li
                key={s.id}
                className="flex items-center justify-between rounded-lg bg-ink px-2 py-1.5 text-sm"
              >
                <span className="text-cream">
                  {s.type === "github_repo" ? "🐙" : "📁"} {s.label ?? s.external_id}
                </span>
                <button
                  onClick={() => removeSource(s.id)}
                  disabled={busy}
                  className="text-xs text-muted hover:text-danger"
                >
                  Quitar
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted">Sin fuentes enlazadas todavía.</p>
        )}

        {/* Carpetas sugeridas (coinciden con el nombre del proyecto/repo) */}
        {suggested.length > 0 && (
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted">
              Carpetas de Drive sugeridas
            </p>
            <div className="flex flex-wrap gap-2">
              {suggested.map((f) => (
                <button
                  key={f.id}
                  disabled={busy}
                  onClick={() => link("drive_folder", f.id, f.name)}
                  className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs text-cream hover:bg-gold/20"
                >
                  + 📁 {f.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Añadir cualquier carpeta de Drive */}
        <div className="space-y-1">
          <p className="text-sm font-medium text-cream">Enlazar carpeta de Drive</p>
          {foldersError ? (
            <p className="text-xs text-danger">{foldersError}</p>
          ) : (
            <div className="flex gap-2">
              <select
                className="min-w-0 flex-1 rounded-xl border border-edge bg-ink px-3 py-2 text-sm text-cream"
                value={folder}
                onChange={(e) => setFolder(e.target.value)}
              >
                <option value="">
                  {folders.length ? "Elige una carpeta…" : "Cargando carpetas…"}
                </option>
                {available.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name}
                  </option>
                ))}
              </select>
              <Button
                disabled={busy || !folder}
                onClick={() => {
                  const f = available.find((x) => x.id === folder);
                  if (f) link("drive_folder", f.id, f.name);
                }}
              >
                Enlazar
              </Button>
            </div>
          )}
        </div>

        {/* Añadir repo de GitHub (si no hay) */}
        {!hasGithub && repos.length > 0 && (
          <div className="space-y-1">
            <p className="text-sm font-medium text-cream">Enlazar repo de GitHub</p>
            <div className="flex gap-2">
              <select
                className="min-w-0 flex-1 rounded-xl border border-edge bg-ink px-3 py-2 text-sm text-cream"
                value={repo}
                onChange={(e) => setRepo(e.target.value)}
              >
                <option value="">Elige un repo…</option>
                {repos.map((r) => (
                  <option key={r.full_name} value={r.full_name}>
                    {r.full_name}
                    {r.private ? " (privado)" : ""}
                  </option>
                ))}
              </select>
              <Button
                disabled={busy || !repo}
                onClick={() => {
                  const r = repos.find((x) => x.full_name === repo);
                  if (r) link("github_repo", r.full_name, r.full_name, r.html_url);
                }}
              >
                Enlazar
              </Button>
            </div>
          </div>
        )}

        {/* Re-analizar con todas las fuentes */}
        {project.sources.length > 0 && (
          <Button variant="secondary" onClick={analyze} disabled={busy} className="w-full">
            {status ?? "Analizar con IA (todas las fuentes)"}
          </Button>
        )}

        {error && <p className="text-sm text-danger">{error}</p>}
      </CardBody>
    </Card>
  );
}
