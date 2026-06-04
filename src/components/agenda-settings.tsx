"use client";

import { useState } from "react";
import { Button, Card, CardBody, Input } from "@/components/ui";
import type { DeviceKind, UserPrefs, Weekday } from "@/lib/types";

const WEEKDAYS: { key: Weekday; label: string }[] = [
  { key: "mon", label: "Lunes" },
  { key: "tue", label: "Martes" },
  { key: "wed", label: "Miércoles" },
  { key: "thu", label: "Jueves" },
  { key: "fri", label: "Viernes" },
  { key: "sat", label: "Sábado" },
  { key: "sun", label: "Domingo" },
];

export function AgendaSettings({ initial }: { initial: UserPrefs }) {
  const [prefs, setPrefs] = useState<UserPrefs>(initial);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function setDay(day: Weekday, patch: Partial<{ device: DeviceKind; hours: number }>) {
    setPrefs((p) => ({
      ...p,
      days: { ...p.days, [day]: { ...p.days[day], ...patch } },
    }));
  }

  async function save() {
    setSaving(true);
    setSaved(false);
    await fetch("/api/prefs", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        timezone: prefs.timezone,
        days: prefs.days,
        devices: prefs.devices,
      }),
    });
    setSaving(false);
    setSaved(true);
  }

  return (
    <Card>
      <CardBody className="space-y-3">
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-center justify-between text-left"
        >
          <span className="font-semibold">⚙️ Configurar mis días y dispositivos</span>
          <span className="text-muted">{open ? "▲" : "▼"}</span>
        </button>

        {open && (
          <div className="space-y-4">
            <p className="text-xs text-muted">
              Marca, por día, desde qué dispositivo trabajarás y cuántas horas. La IA usará
              esto (y las capacidades de cada dispositivo) para asignarte tareas adecuadas.
            </p>

            <div className="space-y-2">
              {WEEKDAYS.map(({ key, label }) => (
                <div key={key} className="flex items-center gap-2">
                  <span className="w-24 text-sm text-cream">{label}</span>
                  <select
                    className="rounded-lg border border-edge bg-ink px-2 py-1.5 text-sm text-cream"
                    value={prefs.days[key].device}
                    onChange={(e) =>
                      setDay(key, { device: e.target.value as DeviceKind })
                    }
                  >
                    <option value="off">⏸️ Libre</option>
                    <option value="phone">📱 Teléfono</option>
                    <option value="computer">💻 Computadora</option>
                  </select>
                  <Input
                    type="number"
                    min={0}
                    max={16}
                    className="w-20"
                    value={prefs.days[key].hours}
                    onChange={(e) =>
                      setDay(key, { hours: Number(e.target.value) })
                    }
                  />
                  <span className="text-xs text-muted">h</span>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <DeviceCaps
                label="📱 Capacidades del teléfono"
                value={prefs.devices.phone.capabilities}
                onChange={(v) =>
                  setPrefs((p) => ({
                    ...p,
                    devices: { ...p.devices, phone: { ...p.devices.phone, capabilities: v } },
                  }))
                }
              />
              <DeviceCaps
                label="💻 Capacidades de la computadora"
                value={prefs.devices.computer.capabilities}
                onChange={(v) =>
                  setPrefs((p) => ({
                    ...p,
                    devices: {
                      ...p.devices,
                      computer: { ...p.devices.computer, capabilities: v },
                    },
                  }))
                }
              />
            </div>

            <div className="flex items-center gap-3">
              <Button onClick={save} disabled={saving}>
                {saving ? "Guardando…" : "Guardar"}
              </Button>
              {saved && <span className="text-sm text-ok">Guardado ✓</span>}
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
}

function DeviceCaps({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block space-y-1">
      <span className="text-xs font-medium text-cream">{label}</span>
      <textarea
        className="w-full rounded-xl border border-edge bg-ink px-3 py-2 text-sm text-cream"
        rows={2}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
