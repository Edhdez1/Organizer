"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardBody } from "@/components/ui";
import type { AgendaDay, AgendaPlan } from "@/lib/types";

// Tarjeta "Hoy te toca…": muestra los bloques de hoy de la agenda de la semana.
export function TodayAgenda() {
  const [today, setToday] = useState<AgendaDay | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/agenda")
      .then((r) => r.json())
      .then((d) => {
        const plan: AgendaPlan | undefined = d.agenda?.plan;
        if (plan?.days) {
          const iso = new Date().toLocaleDateString("en-CA");
          setToday(plan.days.find((x) => x.date === iso) ?? null);
        }
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  if (!loaded || !today) return null;

  return (
    <Card className="mb-6 border-brand/40">
      <CardBody className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-semibold text-cream">Hoy te toca…</h2>
          <Link href="/agenda" className="text-xs text-brand hover:underline">
            Ver agenda →
          </Link>
        </div>
        {today.blocks.length === 0 ? (
          <p className="text-sm text-muted">
            {today.device === "off" ? "Hoy es día libre 🌴" : "Sin bloques para hoy."}
          </p>
        ) : (
          <ul className="space-y-1.5">
            {today.blocks.map((b, i) => (
              <li
                key={i}
                className="flex items-center justify-between rounded-lg bg-ink p-2 text-sm"
              >
                <span className="text-cream">
                  <span className="font-medium">{b.project_name}</span>
                  <span className="text-muted"> — {b.task}</span>
                </span>
                <span className="ml-2 shrink-0 font-mono text-xs text-brand">
                  {b.start}–{b.end}
                </span>
              </li>
            ))}
          </ul>
        )}
      </CardBody>
    </Card>
  );
}
