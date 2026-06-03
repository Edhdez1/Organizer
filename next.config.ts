import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Permite que `next build` no falle por reglas de lint mientras iteramos el MVP.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
