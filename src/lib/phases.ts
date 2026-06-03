import type { ProjectPhase } from "@/lib/types";

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
