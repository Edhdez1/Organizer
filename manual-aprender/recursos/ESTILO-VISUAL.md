# Guía de estilo visual del manual

Documento que usan los "agentes de arte" para que TODAS las ilustraciones se vean como una
familia coherente. Define la marca, la mascota y los *prompts* (instrucciones de texto para la
IA de imágenes) listos para generar con **Higgsfield**.

> Estado: estilo y prompts **listos**. Las imágenes se generan cuando el permiso interactivo de
> Higgsfield quede aprobado en el cliente. Mientras tanto, el manual usa **diagramas de
> texto/ASCII** (con sabor "pixel/retro") para no frenar la lectura.

---

## 1. Dirección visual: PIXEL ART

- **Estilo:** **pixel art** (estética de videojuego retro de 16 bits). Píxeles marcados y
  nítidos, sin difuminado (*sin anti-aliasing*), paleta limitada, look de "sprite".
- **Aplica a TODO:** portadas, mascota y diagramas, todos en pixel art.
- **Paleta (colores en hexadecimal):**
  - Verde-azulado `#1B6B6B` (primario)
  - Coral / naranja atardecer `#D98A3D` (acento)
  - Crema `#FBF9F4` (fondo) / tinta `#1F2733`
  - Azul concepto `#9CC2EC` (acentos de diagramas)
- **Texto dentro de la imagen:** mínimo (el pixel art rinde mal con texto pequeño). Las
  explicaciones van fuera, en el manual.
- **Formato:** portadas `16:9`; diagramas `16:9` o `4:3`. Mascota suelta `1:1`.

---

## 2. Mascota única: "Bit", el ajolote

> Elegida al azar para este manual. **No** se usan Balam ni Andy.

- **Nombre:** **Bit** (porque un *bit* es la unidad mínima de información — guiño al Módulo 00).
- **Especie:** ajolote (axolotl), tierno y curioso.
- **Look:** cuerpo coral/salmón, branquias y detalles en teal `#1B6B6B`, ojos grandes
  amistosos; sprite de pixel art de ~32–48 px de alto, contorno limpio.
- **Personalidad:** curioso y alentador; **aprende junto al lector**. No es un experto que
  presume, es un compañero de viaje.
- **Poses por contexto** (mismo personaje, distinta expresión):
  - Definiciones (🟦): Bit pensativo, con un foco/idea.
  - Tips (💡): Bit emocionado, pulgar arriba.
  - Cuidado (⚠️): Bit con casco, señalando una alerta.
  - Celebración (🎉 fin de módulo): Bit saltando con confeti pixelado.

> Para mantener a Bit **idéntico** entre imágenes: primero generamos 1 *sprite sheet* de
> referencia, y con esas imágenes se entrena un **"Soul"** en Higgsfield (personaje reutilizable
> a partir de 5–20 imágenes). Luego cada portada usa ese Soul. Alternativa rápida de una sola
> vez: pasar el sprite de referencia como `media` a `nano_banana_pro`.

---

## 3. Modelos de Higgsfield a usar

| Necesidad | Modelo | Por qué |
|---|---|---|
| Sprite/portadas pixel art (one-off) | `nano_banana_pro` | Buen control de estilo y nitidez |
| Mascota reutilizable idéntica | `soul_2` + Soul entrenado de Bit | Mantiene el personaje constante |
| Diagramas técnicos en pixel art | `nano_banana_pro` | Maneja esquemas + algo de texto |

Antes de cada generación: `get_cost: true` para preflightear créditos.

---

## 4. Sufijo de estilo común (va al final de cada prompt)

> **STYLE:** *16-bit pixel art, retro video game sprite aesthetic, crisp chunky pixels, hard
> edges, no anti-aliasing, limited warm palette (teal #1B6B6B, coral/sunset orange #D98A3D,
> cream #FBF9F4 background), clean and friendly, high contrast.*

---

## 5. Prompts listos por módulo (con Bit el ajolote)

- **Mascota base (primero):** "Character reference sheet of 'Bit', a cute coral-pink axolotl
  with teal gills, big friendly eyes, several poses: idle, thumbs-up, thinking with a lightbulb,
  wearing a tiny hard hat, jumping happily."
- **00 Fundamentos:** "Bit the axolotl sitting in front of a big retro computer made of pixel
  blocks, a tiny pixel map of the internet glowing behind."
- **01 HTML:** "Bit building the pixel skeleton of a house from labeled blocks (header, main,
  footer), holding a blueprint." *(HTML = estructura)*
- **02 CSS:** "The same pixel house now painted with colors, Bit holding a paint roller, paint
  buckets labeled with hex colors." *(CSS = aspecto)*
- **03 JavaScript:** "The pixel house comes alive: lights on, gears turning, Bit pressing a big
  pixel button." *(JS = interactividad)*
- **04 Python:** "Bit next to a friendly pixel snake made of flowing code blocks building small
  app screens." 
- **05 TypeScript:** "Pixel JavaScript blocks wearing tiny safety helmets and type labels, a
  safety net below, Bit supervising." *(TS = JS con tipos/seguridad)*
- **06 React:** "A UI built from reusable LEGO-like pixel components snapping together, Bit
  assembling them." 
- **07 Bases de datos:** "A pixel database cylinder / filing cabinet with labeled drawers
  (usuarios, hábitos) and a padlock for security, Bit holding a key." 
- **08 APIs/OAuth/IA:** "Two pixel buildings joined by a bridge with a handshake (API), a key
  passing a guarded gate (OAuth), a small pixel robot brain (IA), Bit in the middle." 
- **09 NAS y servidores:** "An Acer gaming laptop reborn as a glowing pixel home-server tower,
  a small pixel shield (VPN) and a network of home devices, Bit as the sysadmin with a tiny
  wrench." 

---

## 6. Dónde se guardan

Las imágenes van a `recursos/imagenes/<modulo>/` (`portada.png`, `diagrama-*.png`, …) y la
mascota a `recursos/imagenes/mascota/`. Se embeben en el `.md` y el `.html`.
