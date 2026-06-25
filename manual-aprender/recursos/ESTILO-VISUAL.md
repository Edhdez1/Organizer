# Guía de estilo visual del manual

Documento que usan los "agentes de arte" para que TODAS las ilustraciones del manual se vean
como una familia coherente. Define la marca, las mascotas y los *prompts* (instrucciones de
texto para la IA de imágenes) listos para generar con **Higgsfield**.

> Estado: los **prompts están listos**; las imágenes se generan en lote cuando el permiso de
> Higgsfield esté aprobado. Mientras tanto, el manual usa **diagramas de texto/ASCII** para no
> frenar la lectura ni gastar créditos.

---

## 1. Identidad visual

- **Tono:** cálido, amable, "amanecer". Hereda la marca *Tunal Amanecer* de PolyPaw.
- **Paleta (colores en hexadecimal):**
  - Verde-azulado calmado `#1B6B6B` (primario)
  - Naranja atardecer `#D98A3D` (acento)
  - Fondo crema `#FBF9F4` / tinta `#1F2733`
  - Azul concepto `#9CC2EC` (para diagramas/definiciones)
- **Estilo de dibujo:** ilustración plana ("flat"), líneas suaves, esquinas redondeadas,
  sombras mínimas. **Nada de fotorrealismo.** Tipo infografía educativa.
- **Texto dentro de la imagen:** el mínimo posible (mejor en español, palabras sueltas). El
  texto explicativo va siempre fuera, en el manual.
- **Formato:** portadas en `16:9`; diagramas en `16:9` o `4:3` según contenido.

---

## 2. Mascotas guía: Balam y Andy

Reutilizamos los jaguares de PolyPaw como personajes que "explican":

- **Balam** — jaguar mentor, tranquilo y sabio. Aparece en definiciones y conceptos serios.
- **Andy** — jaguar extrovertido y energético. Aparece en tips, retos y celebraciones.

> Para mantenerlos idénticos entre imágenes, lo ideal es entrenar un **"Soul"** en Higgsfield
> (un personaje reutilizable a partir de 5–20 imágenes de referencia) usando los sprites ya
> aprobados en `PolyPaw/polypaw_characters/`. Alternativa de una sola vez: `nano_banana_pro`
> pasando un sprite como referencia.

---

## 3. Modelos de Higgsfield a usar

| Necesidad | Modelo recomendado | Por qué |
|---|---|---|
| Diagramas con algo de texto / esquemas técnicos | `nano_banana_pro` | Bueno con texto y 4K |
| Portadas con mascotas (personaje reutilizable) | `soul_2` + Soul entrenado | Mantiene al personaje igual |
| Portada/personaje de una sola vez | `nano_banana_pro` o `soul_2` | Rápido sin entrenar |

Antes de cada generación se usa `get_cost: true` para preflightear créditos.

---

## 4. Prompts listos por módulo

> Idioma del prompt: inglés (los modelos rinden mejor), pero el texto visible que pidamos
> dentro de la imagen va en español. Todos comparten el sufijo de estilo:
> **STYLE:** *flat educational infographic illustration, soft rounded shapes, warm sunrise
> palette (teal #1B6B6B, sunset orange #D98A3D, cream #FBF9F4), minimal text, friendly, clean,
> no photorealism, vector-like.*

- **00 Fundamentos — portada:** "A friendly jaguar mentor (Balam) standing next to a giant
  glowing computer made of simple blocks, a small map of the internet in the background."
- **00 — diagrama cliente/servidor:** "Two simple computers connected by an arrow labeled
  'pide' going right and 'responde' going left, one drawn as a laptop (client) and one as a
  server tower."
- **01 HTML — portada:** "A house being built from labeled skeleton blocks (header, nav, main,
  footer), jaguar Andy holding a blueprint." *(HTML = la estructura/esqueleto)*
- **02 CSS — portada:** "The same house now painted with colors and decorated, paint buckets
  labeled with hex colors, jaguar Andy with a paint roller." *(CSS = el aspecto)*
- **03 JavaScript — portada:** "The house comes alive: lights turning on, a doorbell, gears
  turning, jaguar Balam pressing a button." *(JS = la interactividad)*
- **04 Python — portada:** "A friendly cartoon python snake (not scary) shaped like flowing
  code, building small app screens, jaguars watching." 
- **05 TypeScript — portada:** "JavaScript blocks wearing safety helmets and labels (types),
  a safety net under a tightrope." *(TS = JS con seguridad de tipos)*
- **06 React — portada:** "A user interface built from reusable LEGO-like components clicking
  together, each block a small card." 
- **07 Bases de datos — portada:** "A friendly filing cabinet / database cylinder with labeled
  drawers (usuarios, hábitos), a lock icon for security (RLS)." 
- **08 APIs/OAuth/IA — portada:** "Two buildings connected by a bridge with a contract/handshake
  (API), a key passing through a guarded gate (OAuth), a small robot brain (IA)." 
- **09 NAS y servidores — portada:** "An Acer gaming laptop reborn as a home server tower with
  glowing drives, a small shield (Tailscale VPN) and a network of home devices around it."

---

## 5. Dónde se guardan

Las imágenes generadas van a `recursos/imagenes/<modulo>/` con nombres descriptivos
(`portada.png`, `diagrama-cliente-servidor.png`, …) y se embeben en el `.md` y el `.html`.
