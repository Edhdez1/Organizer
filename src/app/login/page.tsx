"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button, Card, CardBody, Input } from "@/components/ui";
import { Logo } from "@/components/logo";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [error, setError] = useState<string | null>(null);

  async function sendMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Error desconocido");
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6">
      <div className="mb-5 flex justify-center">
        <Logo size={40} />
      </div>
      <Card>
        <CardBody className="space-y-4">
          <div>
            <h1 className="text-2xl font-bold">Entrar a Faro</h1>
            <p className="mt-1 text-sm text-muted">
              Te enviamos un enlace mágico a tu correo. Sin contraseñas.
            </p>
          </div>

          {status === "sent" ? (
            <p className="rounded-lg border border-ok/30 bg-ok/10 p-3 text-sm text-ok">
              Revisa tu correo ({email}) y abre el enlace para entrar.
            </p>
          ) : (
            <form onSubmit={sendMagicLink} className="space-y-3">
              <Input
                type="email"
                required
                placeholder="tu@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Enviando…" : "Enviar enlace mágico"}
              </Button>
            </form>
          )}

          {error && <p className="text-sm text-danger">{error}</p>}
        </CardBody>
      </Card>
    </main>
  );
}
