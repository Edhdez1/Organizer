import type { GithubSnapshot, ProjectPhase } from "@/lib/types";

// Configuración visual de cada fase, mapeada a la paleta de marca "Faro".
// Texto oscuro sobre fondo de color (verificado para contraste AA).
export const PHASES: { value: ProjectPhase; label: string; className: string }[] = [
  { value: "idea", label: "Idea", className: "bg-gold text-ink" },
  { value: "en_progreso", label: "En progreso", className: "bg-brand text-ink" },
  { value: "en_pausa", label: "En pausa", className: "bg-terracota text-ink" },
  { value: "bloqueado", label: "Bloqueado", className: "bg-danger text-ink" },
  { value: "terminado", label: "Terminado", className: "bg-ok text-ink" },
];

export function phaseConfig(phase: ProjectPhase) {
  return PHASES.find((p) => p.value === phase) ?? PHASES[0];
}

// Deduce una fase a partir de la actividad real del repo en GitHub.
// Reglas (las fases "bloqueado" y "terminado" NO se deducen: son decisión humana):
//   - sin commits          → idea
//   - actividad > 180 días  → en_pausa
//   - con commits recientes → en_progreso
export function inferPhaseFromSnapshot(snap: GithubSnapshot): ProjectPhase {
  if (!snap.last_commit) return "idea";
  const pushed = snap.pushed_at ? Date.parse(snap.pushed_at) : NaN;
  if (!Number.isNaN(pushed)) {
    const days = (Date.now() - pushed) / 86_400_000;
    if (days > 180) return "en_pausa";
  }
  return "en_progreso";
}

