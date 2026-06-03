"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, CardBody, Input } from "@/components/ui";
import { PHASES } from "@/lib/phases";
import type { ProjectPhase, ProjectWithSources } from "@/lib/types";

// Edición manual de los campos de un proyecto + eliminación.
export function EditProject({ project }: { project: ProjectWithSources }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description ?? "");
  const [phase, setPhase] = useState<ProjectPhase>(project.phase);
  const [nextAction, setNextAction] = useState(project.next_action ?? "");
  const [tags, setTags] = useState(project.tags.join(", "));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function save() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/projects", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: project.id,
          name,
          description: description || null,
          phase,
          next_action: nextAction || null,
          tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
        }),
      });
      if (!res.ok) throw new Error((await res.json()).error ?? "Error");
      setOpen(false);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (!confirm(`¿Eliminar "${project.name}"? Esta acción no se puede deshacer.`))
      return;
    setBusy(true);
    try {
      await fetch(`/api/projects?id=${project.id}`, { method: "DELETE" });
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
      setBusy(false);
    }
  }

  if (!open) {
    return (
      <div className="flex gap-2">
        <Button variant="secondary" onClick={() => setOpen(true)}>
          Editar
        </Button>
        <Button variant="ghost" onClick={remove} disabled={busy}>
          Eliminar
        </Button>
      </div>
    );
  }

  return (
    <Card>
      <CardBody className="space-y-3">
        <h3 className="font-semibold">Editar proyecto</h3>
        <Field label="Nombre">
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </Field>
        <Field label="Descripción">
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Fase">
            <select
              className="w-full rounded-xl border border-edge bg-ink px-3 py-2 text-sm text-cream"
              value={phase}
              onChange={(e) => setPhase(e.target.value as ProjectPhase)}
            >
              {PHASES.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Etiquetas (coma)">
            <Input value={tags} onChange={(e) => setTags(e.target.value)} />
          </Field>
        </div>
        <Field label="Siguiente acción">
          <Input
            value={nextAction}
            onChange={(e) => setNextAction(e.target.value)}
          />
        </Field>

        {error && <p className="text-sm text-danger">{error}</p>}

        <div className="flex gap-2">
          <Button onClick={save} disabled={busy}>
            {busy ? "Guardando…" : "Guardar"}
          </Button>
          <Button variant="ghost" onClick={() => setOpen(false)} disabled={busy}>
            Cancelar
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-1">
      <span className="text-sm font-medium text-cream">{label}</span>
      {children}
    </label>
  );
}
