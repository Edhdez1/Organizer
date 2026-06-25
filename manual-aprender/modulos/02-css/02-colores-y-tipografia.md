# Capítulo 02 — Colores, unidades y tipografía

> Este es **el** capítulo que te da el superpoder que pediste: elegir colores con un código
> exacto y controlar tamaños con precisión. Cuando lo termines, podrás decir *"el fondo en
> `#1B6B6B`, el texto a `1.125rem`, el botón con `0.5rem` de espaciado"* y saber exactamente qué
> significa cada cosa.

---

## 1. Los colores en CSS: cuatro formas de nombrarlos

Hay varias maneras de escribir un color. Las verás todas en código real, así que conviene
entenderlas.

### a) Por nombre

> ### 🟦 ¿Qué significa? — *Colores con nombre*
> CSS entiende unos 140 nombres de color en inglés: `red`, `blue`, `white`, `tomato`,
> `teal`… Cómodos para pruebas, pero **limitados** (no puedes afinar el tono exacto).
> ```css
> h1 { color: teal; }
> ```

### b) Hexadecimal (el más usado) ⭐

> ### 🟦 ¿Qué significa? — *Color hexadecimal (hex)*
> Un color **hexadecimal** se escribe con `#` seguido de **6 caracteres**, en tres parejas que
> representan la cantidad de **R**ojo, **V**erde y **A**zul (en inglés RGB). Cada pareja va de
> `00` (nada) a `FF` (máximo).
> ```css
> color: #1B6B6B;
> /*       │ │ │
>          │ │ └─ azul:  6B
>          │ └─── verde: 6B
>          └───── rojo:  1B   → poco rojo, bastante verde y azul = verde-azulado */
> ```
> **¿Por qué "hexadecimal"?** Porque cuenta en base 16 (0-9 y luego A-F), no en base 10. No
> necesitas hacer las cuentas a mano: lo importante es **reconocer el formato** y saber copiarlo.

> ### 💡 Tip — Cómo elegir un hex exacto
> - En cualquier buscador escribe **"color picker"** (selector de color): te da una rueda donde
>   eliges visualmente y te entrega el código hex listo para copiar.
> - En las herramientas de desarrollador (`F12`), al lado de cualquier propiedad `color` hay un
>   cuadradito; haz clic y se abre un selector.
> - Atajo: un hex de 3 cifras es una abreviatura del de 6 (`#1B6` = `#11BB66`).
>
> Estos son los colores de **tu** manual, por ejemplo: `#1B6B6B` (teal), `#D98A3D` (naranja),
> `#FBF9F4` (crema), `#1F2733` (tinta).

### c) RGB y RGBA (con transparencia)

> ### 🟦 ¿Qué significa? — *RGB y el canal alfa (RGBA)*
> **RGB** dice lo mismo que el hex pero en números del 0 al 255: `rgb(27, 107, 107)` es igual
> que `#1B6B6B`. La ventaja viene con **RGBA**, que añade un cuarto valor, el **alfa**
> (transparencia), de 0 (invisible) a 1 (opaco):
> ```css
> background: rgba(27, 107, 107, 0.5);  /* el mismo teal, pero medio transparente */
> ```
> **¿Para qué sirve la transparencia?** Para superponer capas: un texto sobre una foto con un
> velo oscuro semitransparente detrás, por ejemplo.

### d) HSL (la más intuitiva para humanos)

> ### 🟦 ¿Qué significa? — *HSL*
> **HSL** describe el color como lo piensa una persona: **H**ue (tono, 0-360° en un círculo
> cromático), **S**aturation (saturación, 0-100%) y **L**ightness (luminosidad, 0-100%).
> ```css
> color: hsl(180, 60%, 27%);  /* tono cian, saturado, oscuro = parecido al teal */
> ```
> **¿Por qué es útil?** Porque para "el mismo color pero más claro" solo subes la L, sin tocar
> el tono. Muy práctico para crear variantes (un botón y su versión al pasar el cursor).

> ### 💡 Tip — ¿Cuál uso?
> En la práctica: **hexadecimal** para la mayoría (es lo que verás en todo código), **rgba**
> cuando necesites transparencia, y **hsl** cuando quieras generar variantes de un mismo tono.
> Los tres describen colores; elige según la tarea.

---

## 2. Unidades de tamaño: `px`, `rem`, `em`, `%`

Para tamaños de letra, espacios y anchos, CSS usa unidades. Estas son las cuatro clave.

> ### 🟦 ¿Qué significa? — *Píxel (`px`) — unidad absoluta*
> Un **píxel** es un punto en la pantalla. `font-size: 16px` significa "16 puntos de alto". Es
> **absoluta**: 16px son 16px pase lo que pase. Fácil de entender, pero **rígida**: no se adapta
> si el usuario cambia el tamaño de letra de su navegador (algo que hacen muchas personas
> mayores o con baja visión).

> ### 🟦 ¿Qué significa? — *`rem` — unidad relativa (la recomendada para texto)*
> Un **rem** es relativo al tamaño de letra **base** del navegador (por defecto `16px`). Así,
> `1rem = 16px`, `1.5rem = 24px`, `0.875rem = 14px`.
> **¿Por qué es mejor que px para texto?** Porque si el usuario agranda la letra base (por
> accesibilidad), **todo tu texto en rem crece proporcionalmente**. Respeta sus preferencias.
> Regla mental: divide los px deseados entre 16. ¿Quieres 18px? → `18/16 = 1.125rem`.

> ### 🟦 ¿Qué significa? — *`em` — relativa al elemento padre*
> Un **em** es relativo al tamaño de letra del **elemento que lo contiene**, no al del
> navegador. Es útil para espaciados que deben escalar con su texto, pero puede "acumularse"
> (un em dentro de otro em se multiplica), así que para texto general se prefiere `rem`.

> ### 🟦 ¿Qué significa? — *Porcentaje (`%`)*
> El **porcentaje** es relativo al **tamaño del contenedor**. `width: 50%` significa "la mitad
> del ancho de la caja que me contiene". Es la base del diseño que se adapta: un bloque al 100%
> ocupa todo el ancho disponible, sea una pantalla grande o un teléfono.

> ### 💡 Tip — Receta práctica de unidades
> - **Texto** → `rem` (respeta accesibilidad).
> - **Espaciados** (márgenes, padding) → `rem` o `px`, según gusto.
> - **Anchos que se adaptan** → `%` o unidades de pantalla (`vw`, que es "% del ancho de la
>   ventana").
> - Empieza usando `rem` para texto y `px` para detalles finos; con eso vas bien.

---

## 3. Tipografía: controlar la letra

> ### 🟦 ¿Qué significa? — *`font-family` (la fuente tipográfica)*
> La **fuente** o *tipografía* es el "estilo de letra". Se elige con `font-family`, y se da una
> **lista de respaldo** por si la primera no está disponible:
> ```css
> body {
>   font-family: "Hanken Grotesk", Helvetica, Arial, sans-serif;
> }
> ```
> El navegador intenta la primera; si no la tiene, baja a la siguiente, hasta `sans-serif`
> (una fuente genérica "de palo seco"). **¿Dónde se usa en tu proyecto?** Tu sitio usa
> **Fraunces** para títulos y **Hanken Grotesk** para el cuerpo (cargadas desde Google Fonts).

> ### 🟦 ¿Qué significa? — *Serif vs. sans-serif*
> - **Serif**: fuentes con "remates" (pequeños adornos en las puntas), como Times. Dan un aire
>   clásico/editorial. Tu sitio usa una serif (Fraunces) para los títulos.
> - **Sans-serif** ("sin serif"): fuentes limpias sin adornos, como Arial. Se leen muy bien en
>   pantalla; por eso se usan para el cuerpo de texto.

> ### 🟦 ¿Qué significa? — *Propiedades de texto más usadas*
> ```css
> p {
>   font-size: 1.125rem;     /* tamaño (18px) */
>   font-weight: 700;        /* grosor: 400 normal, 700 negrita */
>   line-height: 1.6;        /* altura de línea: espacio entre renglones */
>   text-align: center;      /* alineación: left, center, right, justify */
>   letter-spacing: 0.02em;  /* espacio entre letras */
> }
> ```
> - `line-height` (interlineado) es clave para la legibilidad: `1.5`–`1.7` es cómodo de leer.
> - `font-weight` usa números de 100 a 900; 400 es normal, 700 negrita.

> ### 🟦 ¿Qué significa? — *Fuentes web (Google Fonts)*
> Las computadoras solo traen unas pocas fuentes instaladas. Para usar una tipografía bonita que
> no todos tienen, se **carga desde internet**. **Google Fonts** es un servicio gratuito que
> aloja cientos de fuentes; añades un `<link>` en tu `<head>` y ya puedes usarlas en `font-family`.
> Así es como tu sitio usa Fraunces y Hanken Grotesk.

---

## 4. Variables CSS: define un color una vez, úsalo en todos lados

> ### 🟦 ¿Qué significa? — *Variables CSS (custom properties)*
> Una **variable CSS** guarda un valor (como un color) con un nombre, para reutilizarlo. Se
> definen (normalmente en `:root`, que representa toda la página) con `--nombre`, y se usan con
> `var(--nombre)`:
> ```css
> :root {
>   --color-primario: #1B6B6B;
>   --color-acento:   #D98A3D;
> }
> h1     { color: var(--color-primario); }
> .boton { background: var(--color-acento); }
> ```
> **¿Por qué es genial?** Si decides cambiar tu color primario, lo cambias **en un solo lugar** y
> se actualiza en todo el sitio. Es exactamente la técnica que usa la hoja de estilos de **este
> manual** (`site/estilos.css`) y la que permite los "temas" (claro/oscuro) de RachaSimple.

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Sé escribir colores en **hexadecimal**, y reconozco RGB/RGBA y HSL.
- [ ] Sé cómo obtener un hex exacto con un *color picker* o con `F12`.
- [ ] Entiendo `px` (absoluto) vs. `rem`/`em`/`%` (relativos) y cuándo usar cada uno.
- [ ] Controlo la tipografía: `font-family`, `font-size`, `font-weight`, `line-height`.
- [ ] Distingo **serif** de **sans-serif** y sé qué son las fuentes web (Google Fonts).
- [ ] Sé crear y usar **variables CSS** con `--nombre` y `var()`.

---

## 🧪 Ejercicios

1. **Convierte.** ¿Cuántos píxeles son `1.5rem` si la base es 16px? ¿Y `0.75rem`?
2. **Elige hex.** Usa un *color picker* y anota el código hexadecimal de: tu color favorito, un
   azul cielo y un gris oscuro para texto.
3. **Transparencia.** Escribe en RGBA un negro al 60% de opacidad (para un velo sobre una foto).
4. **Variables.** Define dos variables CSS (`--primario` y `--acento`) con colores a tu gusto y
   úsalas en una regla para `h1` y otra para `.boton`.
5. 💻 **Tipografía real.** En tu `styles.css`, dale al `body` un `font-family` con respaldo, un
   `font-size` en `rem` y un `line-height` de `1.6`. Cambia el color de los `<h1>` usando una
   variable CSS. Observa cómo cambia la legibilidad.

➡️ Siguiente: **[Capítulo 03 — El modelo de cajas](03-modelo-de-cajas.md)**.
