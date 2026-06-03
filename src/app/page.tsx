import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui";

export const dynamic = "force-dynamic";

export default async function Home() {
  // Si Supabase está configurado y hay sesión, vamos directo al dashboard.
  if (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) redirect("/dashboard");
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="text-4xl font-bold tracking-tight">Organizer</h1>
      <p className="text-lg text-slate-600">
        Un solo lugar para ver el estado de todos tus proyectos: actividad real de
        GitHub, tus notas y un resumen con IA bajo demanda.
      </p>
      <Link href="/login">
        <Button>Entrar</Button>
      </Link>
    </main>
  );
}
