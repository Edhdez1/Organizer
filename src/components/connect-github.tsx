"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui";

// Conecta la cuenta de GitHub del usuario (identidad adicional sobre el login de
// Google), con permiso de lectura de repos (incl. privados).
export function ConnectGithub({ connected }: { connected: boolean }) {
  const [error, setError] = useState<string | null>(null);

  async function connect() {
    setError(null);
    const supabase = createClient();
    const { data, error } = await supabase.auth.linkIdentity({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?provider=github&next=/dashboard`,
        scopes: "repo read:user",
      },
    });
    if (error) {
      setError(error.message);
      return;
    }
    // Algunos flujos devuelven la URL para redirigir manualmente.
    if (data?.url) window.location.href = data.url;
  }

  if (connected) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-edge px-2.5 py-1 text-xs text-cream">
        <span className="text-ok">●</span> GitHub conectado
      </span>
    );
  }

  return (
    <div className="inline-flex flex-col items-end gap-1">
      <Button variant="secondary" onClick={connect}>
        Conectar GitHub
      </Button>
      {error && <span className="text-xs text-danger">{error}</span>}
    </div>
  );
}
