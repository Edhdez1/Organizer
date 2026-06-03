import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui";
import { Logo } from "@/components/logo";

export const dynamic = "force-dynamic";

export default async function Home() {
  // Si hay sesión, directo al dashboard.
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
    <div className="min-h-screen">
      {/* Barra superior */}
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <Logo size={28} />
        <Link href="/login">
          <Button>Entrar</Button>
        </Link>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-3xl px-6 pb-10 pt-10 text-center sm:pt-20">
        <div className="mb-6 flex justify-center">
          <Logo size={72} showText={false} />
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Tus proyectos, siempre a la vista
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-muted">
          Faro reúne todos tus proyectos en un solo lugar. Conecta GitHub y Google
          Drive, y la IA te dice <strong className="text-cream">qué es</strong> cada
          proyecto, en qué <strong className="text-cream">fase</strong> está, su{" "}
          <strong className="text-cream">progreso</strong> y los{" "}
          <strong className="text-cream">siguientes pasos</strong>.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/login">
            <Button className="px-6 py-3 text-base">Empezar gratis</Button>
          </Link>
        </div>
        <p className="mt-3 text-xs text-muted">
          Entra con Google · conecta GitHub · sin tarjetas
        </p>
      </section>

      {/* Características */}
      <section className="mx-auto grid max-w-5xl gap-4 px-6 pb-12 sm:grid-cols-3">
        <Feature
          icon="🗺️"
          title="Roadmap visual"
          text="Ve en qué etapa está cada proyecto y un roadmap con hitos por proyecto."
        />
        <Feature
          icon="🤖"
          title="Resumen con IA"
          text="Lee el README, el código y tus documentos de Drive para describir y medir el avance."
        />
        <Feature
          icon="🔗"
          title="GitHub + Drive"
          text="Conecta tus repos (incluidos privados) y tus carpetas de Drive con un clic."
        />
      </section>

      {/* Cómo funciona */}
      <section className="mx-auto max-w-3xl px-6 pb-16">
        <h2 className="mb-6 text-center text-2xl font-bold">Cómo funciona</h2>
        <ol className="space-y-3">
          <Step n={1} text="Entra con tu cuenta de Google y conecta GitHub." />
          <Step
            n={2}
            text="Añade un proyecto: elige un repo y/o una carpeta de Drive."
          />
          <Step
            n={3}
            text="Faro lo analiza solo y te muestra descripción, progreso y siguientes pasos."
          />
        </ol>
        <div className="mt-8 text-center">
          <Link href="/login">
            <Button className="px-6 py-3 text-base">Entrar a Faro</Button>
          </Link>
        </div>
      </section>

      <footer className="border-t border-edge py-6 text-center text-xs text-muted">
        Faro · tus proyectos, siempre a la vista
      </footer>
    </div>
  );
}

function Feature({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-edge bg-panel p-5">
      <div className="text-2xl">{icon}</div>
      <h3 className="mt-2 font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted">{text}</p>
    </div>
  );
}

function Step({ n, text }: { n: number; text: string }) {
  return (
    <li className="flex items-start gap-3 rounded-xl border border-edge bg-panel/50 p-3">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand font-semibold text-brand-fg">
        {n}
      </span>
      <span className="pt-0.5 text-cream">{text}</span>
    </li>
  );
}
