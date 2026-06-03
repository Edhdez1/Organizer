# Manual de Marca — Faro

> **Concepto:** *Una luz cálida en un panel oscuro.* Un dashboard técnico, en modo
> oscuro y con sensación de control, donde una luz ámbar guía hacia dónde está cada
> proyecto y qué sigue.

Faro es el organizador de proyectos: reúne el estado de todo en un solo lugar. La marca
nace de una tensión deliberada — estética **oscura / técnica** (herramienta de producto)
con personalidad **cálida y cercana** (la luz, las formas redondeadas, el tono humano).

- **Nombre:** Faro
- **Tagline:** *Tus proyectos, siempre a la vista.*

---

## Paleta

Modo oscuro **cálido** (carbón con punto cálido, nunca negros azulados fríos).
Verificada en contraste **WCAG AA** sobre el fondo base.

| Rol | Nombre | Hex | Token Tailwind |
|---|---|---|---|
| Fondo base | Carbón cálido | `#1B1815` | `ink` |
| Superficie (tarjetas) | Carbón claro | `#24201B` | `panel` |
| Borde / elevado | Marrón humo | `#342E26` | `edge` |
| Primario / acento | Ámbar faro | `#F4A340` | `brand` |
| Texto sobre ámbar | Carbón | `#1B1815` | `brand-fg` |
| Secundario | Terracota | `#E8765A` | `terracota` |
| Apoyo | Dorado suave | `#F3C969` | `gold` |
| Texto principal | Blanco cálido | `#F5EFE6` | `cream` |
| Texto secundario | Gris cálido | `#B3A998` | `muted` |
| Éxito | Verde cálido | `#6FBF8E` | `ok` |
| Error | Rojo cálido | `#E5604D` | `danger` |
| Advertencia | Ámbar fuerte | `#F4B740` | `warn` |

**Contraste verificado (AA, ≥4.5:1):** texto blanco cálido/fondo 15.5:1 · gris cálido
7.6:1 · ámbar 8.6:1 · terracota 6.0:1 · verde 8.0:1 · rojo 5.2:1.

---

## Tipografía (Google Fonts, gratis)

| Uso | Fuente | Token |
|---|---|---|
| Titulares | **Space Grotesk** | `font-display` |
| Texto corrido | **Plus Jakarta Sans** | `font-sans` (por defecto) |
| Datos / código | **JetBrains Mono** | `font-mono` |

JetBrains Mono se reserva para cifras y datos técnicos (issues, PRs, hashes de commit).

---

## Logo

- **Logomark:** un foco ámbar con su haz de luz hacia arriba (faro) y un resplandor
  cálido alrededor. Archivos: `src/components/logo.tsx` (inline, animado),
  `src/app/icon.svg` (favicon), `public/logo.svg` (lockup con texto).
- **Wordmark:** "Faro" en Space Grotesk bold.
- El foco usa un pulso lento (`.faro-glow`) como guiño a la luz del faro.

---

## Estilo visual

- Esquinas redondeadas (radio 12–16px) para suavizar lo técnico.
- Tarjetas sobre el fondo con borde sutil cálido (`edge`).
- "Luz de faro": resplandor ámbar (`shadow-glow`) en el botón primario y el logo.
- Iconografía lineal y redondeada; espaciado generoso; baja densidad.

## Movimiento

Nivel **CSS puro**: transiciones de hover, *fade-in* suave y el pulso ámbar discreto.
Nada de animaciones pesadas — la herramienta debe sentirse rápida.

## Voz y tono

Cálida, cercana y clara. Se habla de **tú**, frases cortas, cero jerga corporativa.

## Reglas de uso

- ✅ El ámbar es para **lo que importa** (una acción primaria por vista).
  ❌ No saturar de ámbar.
- ✅ Neutros cálidos y aire. ❌ Nada de azules/grises fríos.
- ✅ Texto en blanco cálido `#F5EFE6`. ❌ No blanco puro `#FFFFFF`.
