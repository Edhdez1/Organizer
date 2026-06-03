import Link from "next/link";
import { cn } from "@/components/ui";
import { PHASES } from "@/lib/phases";
import type { GithubSnapshot, ProjectWithSources } from "@/lib/types";

// Vista roadmap: una columna por fase con los proyectos que están en ella.
// Da una lectura visual de en qué punto está cada proyecto del portafolio.
export function RoadmapView({ projects }: { projects: ProjectWithSources[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {PHASES.map((ph) => {
        const items = projects.filter((p) => p.phase === ph.value);
        return (
          <div
            key={ph.value}
            className="rounded-2xl border border-edge bg-panel/50 p-3"
          >
            <div className="mb-3 flex items-center justify-between">
              <span
                className={cn(
                  "rounded-full px-2.5 py-0.5 text-xs font-semibold",
                  ph.className
                )}
              >
                {ph.label}
              </span>
              <span className="text-xs text-muted">{items.length}</span>
            </div>

            <div className="space-y-2">
              {items.map((p) => {
                const gh = p.sources.find((s) => s.type === "github_repo");
                const snap = gh?.snapshot?.data as GithubSnapshot | undefined;
                return (
                  <Link
                    key={p.id}
                    href={`/projects/${p.id}`}
                    className="block rounded-xl border border-edge bg-ink p-2.5 transition hover:border-brand/50"
                  >
                    <p className="text-sm font-medium text-cream">{p.name}</p>
                    {p.next_action && (
                      <p className="mt-1 line-clamp-2 text-xs text-muted">
                        → {p.next_action}
                      </p>
                    )}
                    {typeof p.progress_pct === "number" && (
                      <div className="mt-1.5 flex items-center gap-1.5">
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-edge">
                          <div
                            className="h-full rounded-full bg-brand"
                            style={{ width: `${p.progress_pct}%` }}
                          />
                        </div>
                        <span className="font-mono text-[10px] text-muted">
                          {p.progress_pct}%
                        </span>
                      </div>
                    )}
                    {snap && (
                      <p className="mt-1 font-mono text-[10px] text-muted">
                        {snap.open_issues}i · {snap.open_pull_requests}PR
                      </p>
                    )}
                  </Link>
                );
              })}
              {items.length === 0 && (
                <p className="text-xs italic text-muted/60">—</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
