import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Faro — tus proyectos, siempre a la vista";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Marca del faro como SVG embebido (sin depender de fuentes para el símbolo).
const mark = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 48 48">
  <defs><radialGradient id="g" cx="50%" cy="50%" r="50%">
  <stop offset="0%" stop-color="#F4A340" stop-opacity="0.95"/>
  <stop offset="55%" stop-color="#F4A340" stop-opacity="0.22"/>
  <stop offset="100%" stop-color="#F4A340" stop-opacity="0"/></radialGradient></defs>
  <circle cx="24" cy="15" r="13" fill="url(#g)"/>
  <path d="M24 15 L8 9 L9 17 Z" fill="#F3C969" opacity="0.8"/>
  <path d="M24 15 L40 9 L39 17 Z" fill="#F3C969" opacity="0.8"/>
  <path d="M20 17 L28 17 L31 40 L17 40 Z" fill="#F5EFE6"/>
  <path d="M18.7 28 L29.3 28 L30 32 L18 32 Z" fill="#E8765A"/>
  <rect x="15" y="39" width="18" height="4" rx="1.5" fill="#F5EFE6"/>
  <circle cx="24" cy="15" r="5" fill="#F4A340"/></svg>`;

export default function OpengraphImage() {
  const markUri = `data:image/svg+xml,${encodeURIComponent(mark)}`;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#1B1815",
          color: "#F5EFE6",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={markUri} width={180} height={180} alt="" />
        <div style={{ fontSize: 92, fontWeight: 700, marginTop: 12 }}>Faro</div>
        <div style={{ fontSize: 34, color: "#B3A998", marginTop: 8 }}>
          Tus proyectos, siempre a la vista
        </div>
      </div>
    ),
    size
  );
}
