// Logo de marca "Faro": un punto de luz ámbar con su haz, sobre fondo oscuro.
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
          <radialGradient id="faroGlow" cx="50%" cy="55%" r="50%">
            <stop offset="0%" stopColor="#F4A340" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#F4A340" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#F4A340" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* resplandor */}
        <circle cx="24" cy="26" r="22" fill="url(#faroGlow)" />
        {/* haz de luz */}
        <path d="M24 26 L10 6 L20 6 Z" fill="#F3C969" opacity="0.85" />
        <path d="M24 26 L38 6 L28 6 Z" fill="#F3C969" opacity="0.85" />
        {/* foco */}
        <circle cx="24" cy="26" r="6" fill="#F4A340" className="faro-glow" />
      </svg>
      {showText && (
        <span className="font-display text-lg font-bold tracking-tight text-cream">
          Faro
        </span>
      )}
    </span>
  );
}
