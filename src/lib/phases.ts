import type { ProjectPhase } from "@/lib/types";

// Configuración visual de cada fase. Editable: si quieres otras fases, se cambian
// aquí y en la migración SQL (enum project_phase).
export const PHASES: { value: ProjectPhase; label: string; className: string }[] = [
  { value: "idea", label: "Idea", className: "bg-slate-100 text-slate-700" },
  { value: "en_progreso", label: "En progreso", className: "bg-blue-100 text-blue-700" },
  { value: "en_pausa", label: "En pausa", className: "bg-amber-100 text-amber-700" },
  { value: "bloqueado", label: "Bloqueado", className: "bg-red-100 text-red-700" },
  { value: "terminado", label: "Terminado", className: "bg-green-100 text-green-700" },
];

export function phaseConfig(phase: ProjectPhase) {
  return PHASES.find((p) => p.value === phase) ?? PHASES[0];
}
