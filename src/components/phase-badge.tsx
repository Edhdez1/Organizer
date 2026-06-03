import { Badge } from "@/components/ui";
import { phaseConfig } from "@/lib/phases";
import type { ProjectPhase } from "@/lib/types";

export function PhaseBadge({ phase }: { phase: ProjectPhase }) {
  const cfg = phaseConfig(phase);
  return <Badge className={cfg.className}>{cfg.label}</Badge>;
}
