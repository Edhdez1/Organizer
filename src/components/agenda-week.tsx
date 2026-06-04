"use client";

import { Card, CardBody, cn } from "@/components/ui";
import type { AgendaPlan, DeviceKind, Weekday } from "@/lib/types";

const WEEKDAY_LABEL: Record<Weekday, string> = {
  mon: "Lunes",
  tue: "Martes",
  wed: "Miércoles",
  thu: "Jueves",
  fri: "Viernes",
  sat: "Sábado",
  sun: "Domingo",
};

function deviceIcon(d: DeviceKind): string {
  return d === "phone" ? "📱" : d === "computer" ? "💻" : "⏸️";
}

export function AgendaWeek({ plan }: { plan: AgendaPlan }) {
  // Hoy en fecha local del navegador (YYYY-MM-DD).
  const today = new Date().toLocaleDateString("en-CA");

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {plan.days.map((day) => {
        const isToday = day.date === today;
        return (
          <Card
            key={day.date}
            className={cn(isToday && "border-brand shadow-glow")}
          >
            <CardBody className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-display font-semibold text-cream">
                  {deviceIcon(day.device)} {WEEKDAY_LABEL[day.weekday]}
                  {isToday && (
                    <span className="ml-2 rounded-full bg-brand px-2 py-0.5 text-xs text-brand-fg">
                      Hoy
                    </span>
                  )}
                </span>
                <span className="text-xs text-muted">{day.date.slice(5)}</span>
              </div>

              {day.blocks.length === 0 ? (
                <p className="text-xs italic text-muted">
                  {day.device === "off" ? "Día libre" : "Sin bloques"}
                </p>
              ) : (
                <ul className="space-y-1.5">
                  {day.blocks.map((b, i) => (
                    <li key={i} className="rounded-lg bg-ink p-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-cream">
                          {b.project_name}
                        </span>
                        <span className="font-mono text-xs text-brand">
                          {b.start}–{b.end}
                        </span>
                      </div>
                      <p className="text-xs text-muted">{b.task}</p>
                    </li>
                  ))}
                </ul>
              )}
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
}
