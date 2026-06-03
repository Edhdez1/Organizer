"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, CardBody } from "@/components/ui";
import { PhaseBadge } from "@/components/phase-badge";
import { PhaseProgress } from "@/components/phase-progress";
import { PHASES } from "@/lib/phases";
import type {
  GithubSnapshot,
  ProjectPhase,
  ProjectWithSources,
} from "@/lib/types";

function timeAgo(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  const diff = Date.now() - d.getTime();
  const days = Math.floor(diff / 86_400_000);
  if (days <= 0) return "hoy";
  if (days === 1) return "ayer";
  if (days < 30) return `hace ${days} d`;
  const months = Math.floor(days / 30);
  if (months < 12) return `hace ${months} mes${months > 1 ? "es" : ""}`;
  return `hace ${Math.floor(months / 12)} año(s)`;
}

export function ProjectCard({ project }: { project: ProjectWithSources }) {
  const router = useRouter();
  const [busy, setBusy] = useState<null | "refresh" | "summary" | "phase">(null);
  const [error, setError] = useState<string | null>(null);
  const [suggestion, setSuggestion] = useState<string | null>(null);

  async function refresh() {
    setBusy("refresh");
    setError(null);
    try {
      const res = await fetch("/api/github/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ project_id: project.id }),
      });
      if (!res.ok) throw new Error((await res.json()).error ?? "Error");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setBusy(null);
    }
  }

  async function summarize() {
    setBusy("summary");
    setError(null);
    setSuggestion(null);
    try {
      const res = await fetch("/api/ai/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ project_id: project.id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error");
      if (data.next_action) setSuggestion(data.next_action);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setBusy(null);
    }
  }

  async function changePhase(phase: ProjectPhase) {
    setBusy("phase");
    setError(null);
    try {
      await fetch("/api/projects", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: project.id, phase }),
      });
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setBusy(null);
    }
  }

  async function applySuggestion() {
    if (!suggestion) return;
    await fetch("/api/projects", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: project.id, next_action: suggestion }),
    });
    setSuggestion(null);
    router.refresh();
  }

  const githubSources = project.sources.filter((s) => s.type === "github_repo");

  return (
    <Card>
      <CardBody className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display font-semibold text-cream">{project.name}</h3>
            {project.description && (
              <p className="mt-0.5 text-sm text-muted">{project.description}</p>
            )}
          </div>
          <PhaseBadge phase={project.phase} />
        </div>

        {/* Roadmap visual del proyecto */}
        <div className="rounded-xl border border-edge bg-ink/60 px-3 py-2">
          <PhaseProgress phase={project.phase} />
        </div>

        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {project.tags.map((t) => (
              <span
                key={t}
                className="rounded bg-edge px-1.5 py-0.5 text-xs text-muted"
              >
                #{t}
              </span>
            ))}
          </div>
        )}

        {/* Señales de estado desde GitHub */}
        {githubSources.map((s) => {
          const snap = s.snapshot?.data as GithubSnapshot | undefined;
          return (
            <div key={s.id} className="rounded-xl bg-ink p-2 text-xs text-muted">
              <a
                href={s.external_url ?? "#"}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-brand hover:underline"
              >
                {s.label ?? s.external_id}
              </a>
              {snap ? (
                <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 font-mono">
                  <span>● {snap.open_issues} issues</span>
                  <span>● {snap.open_pull_requests} PRs</span>
                  {snap.last_commit && (
                    <span title={snap.last_commit.message}>
                      ● commit {timeAgo(snap.last_commit.date)}
                    </span>
                  )}
                  <span>● activo {timeAgo(snap.pushed_at)}</span>
                </div>
              ) : (
                <p className="mt-1 italic">
                  Sin datos aún. Pulsa &quot;Actualizar estado&quot;.
                </p>
              )}
            </div>
          );
        })}

        {project.next_action && (
          <p className="text-sm text-cream">
            <span className="font-semibold text-brand">Siguiente acción:</span>{" "}
            {project.next_action}
          </p>
        )}

        {project.ai_summary && (
          <div className="rounded-xl border border-brand/30 bg-brand/10 p-2 text-sm text-cream">
            <span className="font-semibold text-brand">Resumen IA:</span>{" "}
            {project.ai_summary}
          </div>
        )}

        {suggestion && (
          <div className="rounded-xl border border-gold/40 bg-gold/10 p-2 text-sm">
            <p className="text-cream">
              <span className="font-semibold text-gold">Siguiente acción sugerida:</span>{" "}
              {suggestion}
            </p>
            <Button variant="secondary" className="mt-2" onClick={applySuggestion}>
              Usar como siguiente acción
            </Button>
          </div>
        )}

        {error && <p className="text-xs text-danger">{error}</p>}

        {/* Acciones */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <Button
            variant="secondary"
            onClick={refresh}
            disabled={busy !== null || githubSources.length === 0}
          >
            {busy === "refresh" ? "Actualizando…" : "Actualizar estado"}
          </Button>
          <Button variant="secondary" onClick={summarize} disabled={busy !== null}>
            {busy === "summary" ? "Resumiendo…" : "Resumir con IA"}
          </Button>
          <select
            className="rounded-xl border border-edge bg-ink px-2 py-2 text-sm text-cream"
            value={project.phase}
            disabled={busy !== null}
            onChange={(e) => changePhase(e.target.value as ProjectPhase)}
          >
            {PHASES.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
      </CardBody>
    </Card>
  );
}
