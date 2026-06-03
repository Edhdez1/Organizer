import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Paleta provisional neutra. El branding (paleta/logo) se definirá después
        // con la skill director-creativo.
        brand: {
          DEFAULT: "#4f46e5",
          fg: "#ffffff",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
