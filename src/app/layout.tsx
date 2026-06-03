import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Faro — tus proyectos, siempre a la vista",
  description:
    "Faro: el estado de todos tus proyectos en un solo lugar, con actividad real de GitHub y un resumen con IA bajo demanda.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        {/* Fuentes de marca (Google Fonts). Se cargan en el navegador; en el
            despliegue (Vercel) y en local funcionan sin pasos extra. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
