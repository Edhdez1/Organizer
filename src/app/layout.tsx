import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Organizer",
  description: "Organizador de proyectos: estado consolidado desde GitHub y Drive.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
