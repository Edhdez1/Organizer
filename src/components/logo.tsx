// Logo de marca "Faro": una torre de faro con su luz ámbar y haces laterales.
export function Logo({
  showText = true,
  size = 28,
}: {
  showText?: boolean;
  size?: number;
}) {
  return (
    <span className="inline-flex items-center gap-2">
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="faroGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F4A340" stopOpacity="0.9" />
            <stop offset="55%" stopColor="#F4A340" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#F4A340" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* halo de la luz */}
        <circle cx="24" cy="14" r="13" fill="url(#faroGlow)" />
        {/* haces laterales */}
        <path d="M24 14 L6 8 L7 17 Z" fill="#F3C969" opacity="0.8" />
        <path d="M24 14 L42 8 L41 17 Z" fill="#F3C969" opacity="0.8" />
        {/* torre del faro */}
        <path d="M20 16 L28 16 L31 40 L17 40 Z" fill="#F5EFE6" />
        {/* franja */}
        <path d="M18.7 28 L29.3 28 L30 32 L18 32 Z" fill="#E8765A" />
        {/* base */}
        <rect x="15" y="39" width="18" height="4" rx="1.5" fill="#F5EFE6" />
        {/* foco con pulso */}
        <circle cx="24" cy="14" r="5" fill="#F4A340" className="faro-glow" />
      </svg>
      {showText && (
        <span className="font-display text-lg font-bold tracking-tight text-cream">
          Faro
        </span>
      )}
    </span>
  );
}
