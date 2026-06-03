import { Fragment } from "react";
import { cn } from "@/components/ui";
import type { ProjectPhase } from "@/lib/types";

// Roadmap lineal del proyecto: Idea → En curso → Terminado.
// Los estados "en pausa" y "bloqueado" se quedan en el punto "En curso" pero
// pintan el punto con su color (terracota / rojo) para comunicar el estado.
const STEPS = [
  { key: "idea", label: "Idea" },
  { key: "curso", label: "En curso" },
  { key: "fin", label: "Terminado" },
] as const;

function stepIndex(phase: ProjectPhase): number {
  if (phase === "idea") return 0;
  if (phase === "terminado") return 2;
  return 1; // en_progreso, en_pausa, bloqueado
}

function activeColor(phase: ProjectPhase): string {
  switch (phase) {
    case "en_pausa":
      return "bg-terracota";
    case "bloqueado":
      return "bg-danger";
    case "terminado":
      return "bg-ok";
    default:
      return "bg-brand"; // idea, en_progreso
  }
}

export function PhaseProgress({ phase }: { phase: ProjectPhase }) {
  const active = stepIndex(phase);
  const color = activeColor(phase);

  return (
    <div className="flex w-full items-center">
      {STEPS.map((s, i) => (
        <Fragment key={s.key}>
          {i > 0 && (
            <div
              className={cn(
                "mx-1 h-0.5 flex-1 rounded",
                i <= active ? "bg-brand/60" : "bg-edge"
              )}
            />
          )}
          <div className="flex flex-col items-center gap-1">
            <div
              className={cn(
                "h-3 w-3 rounded-full",
                i === active ? color : i < active ? "bg-brand/70" : "bg-edge"
              )}
            />
            <span
              className={cn(
                "text-[10px]",
                i === active ? "text-cream" : "text-muted"
              )}
            >
              {s.label}
            </span>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
