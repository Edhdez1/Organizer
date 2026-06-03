"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button, Card, CardBody, Input } from "@/components/ui";
import { Logo } from "@/components/logo";

// Scopes de Google: identidad + lectura de Google Drive.
const GOOGLE_SCOPES = [
  "https://www.googleapis.com/auth/drive.readonly",
].join(" ");

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [error, setError] = useState<string | null>(null);

  async function signInWithGoogle() {
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?provider=google&next=/dashboard`,
        scopes: GOOGLE_SCOPES,
        queryParams: { access_type: "offline", prompt: "consent" },
      },
    });
    if (error) setError(error.message);
  }

  async function sendMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
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
              Entra con Google para conectar tu Drive. Después podrás conectar
              GitHub para ver tus proyectos (incluidos los privados).
            </p>
          </div>

          <Button onClick={signInWithGoogle} className="w-full">
            Continuar con Google
          </Button>

          <div className="flex items-center gap-2 text-xs text-muted">
            <span className="h-px flex-1 bg-edge" /> o enlace mágico{" "}
            <span className="h-px flex-1 bg-edge" />
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
                variant="secondary"
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
