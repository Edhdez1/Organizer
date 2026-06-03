"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input } from "@/components/ui";
import { PHASES } from "@/lib/phases";
import type { ProjectPhase, ProjectWithSources } from "@/lib/types";
import { ProjectCard } from "@/components/project-card";
import { RoadmapView } from "@/components/roadmap-view";

type View = "roadmap" | "cards";

export function ProjectsBoard({ projects }: { projects: ProjectWithSources[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [phase, setPhase] = useState<ProjectPhase | "all">("all");
  const [view, setView] = useState<View>("roadmap");
  const [analyzing, setAnalyzing] = useState<string | null>(null);

  // Re-analiza todos los proyectos con fuentes, uno a uno (cada petición con su
  // propio presupuesto de tiempo), mostrando el progreso.
  async function analyzeAll() {
    const targets = projects.filter((p) => p.sources.length > 0);
    if (targets.length === 0) return;
    for (let i = 0; i < targets.length; i++) {
      setAnalyzing(`Analizando ${i + 1}/${targets.length}…`);
      try {
        await fetch("/api/ai/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ project_id: targets[i].id }),
        });
      } catch {
        // seguimos con el resto
      }
    }
    setAnalyzing(null);
    router.refresh();
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      if (phase !== "all" && p.phase !== phase) return false;
      if (!q) return true;
      const haystack = [p.name, p.description ?? "", p.next_action ?? "", ...p.tags]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [projects, query, phase]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <div className="min-w-[200px] flex-1">
          <Input
            placeholder="Buscar por nombre, etiqueta o nota…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Button
          variant="secondary"
          onClick={analyzeAll}
          disabled={analyzing !== null}
        >
          {analyzing ?? "Analizar todo"}
        </Button>
        {/* Selector de vista */}
        <div className="flex rounded-xl border border-edge p-0.5">
          <ViewTab active={view === "roadmap"} onClick={() => setView("roadmap")} label="Roadmap" />
          <ViewTab active={view === "cards"} onClick={() => setView("cards")} label="Tarjetas" />
        </div>
      </div>

      {/* Filtros por fase (aplican a ambas vistas) */}
      <div className="flex flex-wrap gap-1">
        <FilterChip active={phase === "all"} onClick={() => setPhase("all")} label="Todos" />
        {PHASES.map((p) => (
          <FilterChip
            key={p.value}
            active={phase === p.value}
            onClick={() => setPhase(p.value)}
            label={p.label}
          />
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted">
          Ningún proyecto coincide con el filtro.
        </p>
      ) : view === "roadmap" ? (
        <RoadmapView projects={filtered} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      )}
    </div>
  );
}

function ViewTab({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={
        "rounded-lg px-3 py-1 text-xs font-semibold transition " +
        (active ? "bg-brand text-brand-fg" : "text-muted hover:text-cream")
      }
    >
      {label}
    </button>
  );
}

function FilterChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={
        "rounded-full px-3 py-1 text-xs font-semibold transition " +
        (active ? "bg-brand text-brand-fg" : "bg-edge text-muted hover:bg-edge/70")
      }
    >
      {label}
    </button>
  );
}
