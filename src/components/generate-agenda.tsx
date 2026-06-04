"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, CardBody } from "@/components/ui";

interface ProjectOption {
  id: string;
  name: string;
}

export function GenerateAgenda({ projects }: { projects: ProjectOption[] }) {
  const router = useRouter();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function toggle(id: string) {
    setSelected((s) => {
      const n = new Set(s);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  }

  async function generate() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/agenda", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectIds: [...selected] }),
      });
      if (!res.ok) throw new Error((await res.json()).error ?? "Error");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Card>
      <CardBody className="space-y-3">
        <h3 className="font-semibold">Generar agenda de esta semana</h3>
        <p className="text-xs text-muted">
          Elige los proyectos en los que quieres trabajar esta semana. La IA repartirá el
          tiempo según tus días y dispositivos.
        </p>

        {projects.length === 0 ? (
          <p className="text-sm text-muted">No tienes proyectos todavía.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {projects.map((p) => {
              const on = selected.has(p.id);
              return (
                <button
                  key={p.id}
                  onClick={() => toggle(p.id)}
                  className={
                    "rounded-full px-3 py-1.5 text-sm transition " +
                    (on
                      ? "bg-brand text-brand-fg"
                      : "bg-edge text-muted hover:text-cream")
                  }
                >
                  {on ? "✓ " : ""}
                  {p.name}
                </button>
              );
            })}
          </div>
        )}

        {error && <p className="text-sm text-danger">{error}</p>}

        <Button onClick={generate} disabled={busy || selected.size === 0}>
          {busy ? "Generando…" : "Generar agenda"}
        </Button>
      </CardBody>
    </Card>
  );
}
