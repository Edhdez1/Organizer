"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui";
import { PHASES } from "@/lib/phases";
import type { ProjectPhase, ProjectWithSources } from "@/lib/types";
import { ProjectCard } from "@/components/project-card";

export function ProjectsBoard({ projects }: { projects: ProjectWithSources[] }) {
  const [query, setQuery] = useState("");
  const [phase, setPhase] = useState<ProjectPhase | "all">("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      if (phase !== "all" && p.phase !== phase) return false;
      if (!q) return true;
      const haystack = [
        p.name,
        p.description ?? "",
        p.next_action ?? "",
        ...p.tags,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [projects, query, phase]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <div className="min-w-[220px] flex-1">
          <Input
            placeholder="Buscar por nombre, etiqueta o nota…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-1">
          <FilterChip
            active={phase === "all"}
            onClick={() => setPhase("all")}
            label="Todos"
          />
          {PHASES.map((p) => (
            <FilterChip
              key={p.value}
              active={phase === p.value}
              onClick={() => setPhase(p.value)}
              label={p.label}
            />
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted">
          Ningún proyecto coincide con el filtro.
        </p>
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
        (active
          ? "bg-brand text-brand-fg"
          : "bg-edge text-muted hover:bg-edge/70")
      }
    >
      {label}
    </button>
  );
}
