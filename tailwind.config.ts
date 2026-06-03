import type { Config } from "tailwindcss";

// Marca "Faro": luz cálida en un panel oscuro. Paleta verificada WCAG AA.
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1B1815", // fondo base (carbón cálido)
        panel: "#24201B", // superficie / tarjetas
        edge: "#342E26", // bordes / elevado
        brand: { DEFAULT: "#F4A340", fg: "#1B1815" }, // ámbar faro + texto sobre él
        terracota: "#E8765A",
        gold: "#F3C969",
        cream: "#F5EFE6", // texto principal (blanco cálido)
        muted: "#B3A998", // texto secundario
        ok: "#6FBF8E",
        danger: "#E5604D",
        warn: "#F4B740",
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
        display: ['"Space Grotesk"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      boxShadow: {
        // Resplandor cálido tipo "luz de faro" para elementos destacados.
        glow: "0 0 0 1px rgba(244,163,64,0.25), 0 8px 30px -8px rgba(244,163,64,0.35)",
      },
    },
  },
  plugins: [],
} satisfies Config;
