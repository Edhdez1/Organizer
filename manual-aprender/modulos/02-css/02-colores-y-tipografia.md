# Capítulo 02 — Colores, unidades y tipografía

> Este es **el** capítulo que te da el superpoder que pediste: elegir colores con un código
> exacto y controlar tamaños con precisión. Cuando lo termines, podrás decir *"el fondo en
> `#1B6B6B`, el texto a `1.125rem`, el botón con `0.5rem` de espaciado"* y saber exactamente qué
> significa cada cosa.

---

## 1. Los colores en CSS: cuatro formas de nombrarlos

Resulta que un mismo color se puede escribir de varias maneras. Las cuatro aparecen en código
real todo el tiempo, así que vale la pena conocerlas para no quedarte mirando una pantalla sin
entender qué dice.

### a) Por nombre

> ### 🟦 ¿Qué significa? — *Colores con nombre*
> CSS reconoce unos 140 nombres de color escritos en inglés: `red`, `blue`, `white`, `tomato`,
> `teal`… Son cómodos para salir del paso y hacer pruebas rápidas, pero se quedan **cortos**: no
> hay forma de afinar el tono exacto que tienes en la cabeza.
> ```css
> h1 { color: teal; }
> ```

### b) Hexadecimal (el más usado) ⭐

> ### 🟦 ¿Qué significa? — *Color hexadecimal (hex)*
> Un color **hexadecimal** se escribe con `#` seguido de **6 caracteres**, en tres parejas que
> indican cuánto hay de **R**ojo, **V**erde y **A**zul (en inglés RGB). Cada pareja va desde
> `00` (nada) hasta `FF` (al máximo).
> ```css
> color: #1B6B6B;
> /*       │ │ │
>          │ │ └─ azul:  6B
>          │ └─── verde: 6B
>          └───── rojo:  1B   → poco rojo, bastante verde y azul = verde-azulado */
> ```
> **¿Por qué "hexadecimal"?** Porque cuenta en base 16 (del 0 al 9 y luego de la A a la F), no en
> base 10 como estamos acostumbrados. Tranquilo, nadie hace estas cuentas a mano: basta con
> **reconocer el formato** y saber copiarlo.

> ### 💡 Tip — Cómo elegir un hex exacto
> - En cualquier buscador escribe **"color picker"** (selector de color): aparece una rueda donde
>   eliges el tono a ojo y te entrega el código hex listo para copiar.
> - En las herramientas de desarrollador (`F12`), junto a cualquier propiedad `color` verás un
>   cuadradito de color; haz clic y se abre el selector.
> - Un atajo útil: un hex de 3 cifras es la abreviatura de uno de 6 (`#1B6` equivale a `#11BB66`).
>
> Por ejemplo, estos son los colores de **tu** manual: `#1B6B6B` (teal), `#D98A3D` (naranja),
> `#FBF9F4` (crema), `#1F2733` (tinta).

### c) RGB y RGBA (con transparencia)

> ### 🟦 ¿Qué significa? — *RGB y el canal alfa (RGBA)*
> **RGB** dice exactamente lo mismo que el hex, pero con números del 0 al 255: `rgb(27, 107, 107)`
> es el mismo color que `#1B6B6B`. Lo interesante llega con **RGBA**, que suma un cuarto valor, el
> **alfa** (la transparencia), que va de 0 (invisible) a 1 (totalmente opaco):
> ```css
> background: rgba(27, 107, 107, 0.5);  /* el mismo teal, pero medio transparente */
> ```
> **¿Para qué sirve la transparencia?** Para superponer capas. Piensa en un texto sobre una foto
> con un velo oscuro semitransparente detrás para que se lea bien: justo eso.

### d) HSL (la más intuitiva para humanos)

> ### 🟦 ¿Qué significa? — *HSL*
> **HSL** describe el color de la forma en que lo piensa una persona: **H**ue (el tono, de 0 a 360°
> en un círculo cromático), **S**aturation (la saturación, de 0 a 100%) y **L**ightness (la
> luminosidad, de 0 a 100%).
> ```css
> color: hsl(180, 60%, 27%);  /* tono cian, saturado, oscuro = parecido al teal */
> ```
> **¿Por qué es útil?** Porque para conseguir "el mismo color pero más claro" basta con subir la L,
> sin tocar nada más. Es comodísimo para crear variantes, como un botón y su versión cuando pasas
> el cursor por encima.

> ### 💡 Tip — ¿Cuál uso?
> En el día a día la cosa es así: **hexadecimal** para casi todo (es lo que vas a ver por todas
> partes), **rgba** cuando necesites transparencia, y **hsl** cuando quieras sacar variantes de un
> mismo tono. Los tres describen colores; elige según lo que vayas a hacer.

---

## 2. Unidades de tamaño: `px`, `rem`, `em`, `%`

Para los tamaños de letra, los espacios y los anchos, CSS trabaja con unidades. Hay muchas, pero
con estas cuatro te mueves en casi cualquier situación.

> ### 🟦 ¿Qué significa? — *Píxel (`px`) — unidad absoluta*
> Un **píxel** es un punto en la pantalla. `font-size: 16px` quiere decir "16 puntos de alto". Es
> una unidad **absoluta**: 16px son 16px y punto, pase lo que pase. Es fácil de entender, pero
> también **rígida**: no se ajusta si el usuario cambia el tamaño de letra de su navegador, algo
> que hace mucha gente mayor o con poca visión.

> ### 🟦 ¿Qué significa? — *`rem` — unidad relativa (la recomendada para texto)*
> Un **rem** se mide en relación con el tamaño de letra **base** del navegador (por defecto, `16px`).
> Así que `1rem = 16px`, `1.5rem = 24px` y `0.875rem = 14px`.
> **¿Por qué es mejor que px para texto?** Porque si el usuario agranda la letra base por
> accesibilidad, **todo tu texto en rem crece con ella**, de forma proporcional. En otras palabras,
> respeta lo que esa persona prefiere. La regla mental es simple: divide los px que quieres entre 16.
> ¿Buscas 18px? → `18/16 = 1.125rem`.

> ### 🟦 ¿Qué significa? — *`em` — relativa al elemento padre*
> Un **em** se mide en relación con el tamaño de letra del **elemento que lo contiene**, no con el
> del navegador. Va bien para espaciados que deben crecer junto a su texto, pero tiene una trampa:
> se "acumula" (un em dentro de otro em se multiplica), así que para el texto en general es más
> seguro tirar de `rem`.

> ### 🟦 ¿Qué significa? — *Porcentaje (`%`)*
> El **porcentaje** se mide en relación con el **tamaño del contenedor**. `width: 50%` significa
> "la mitad del ancho de la caja que me contiene". Es la base de cualquier diseño que se adapta: un
> bloque al 100% ocupa todo el ancho disponible, lo mismo en una pantalla grande que en un teléfono.

> ### 💡 Tip — Receta práctica de unidades
> - **Texto** → `rem` (respeta la accesibilidad).
> - **Espaciados** (márgenes, padding) → `rem` o `px`, según prefieras.
> - **Anchos que se adaptan** → `%` o unidades de pantalla (`vw`, que es "% del ancho de la
>   ventana").
> - Para arrancar, usa `rem` en el texto y `px` en los detalles finos; con eso vas más que bien.

---

## 3. Tipografía: controlar la letra

> ### 🟦 ¿Qué significa? — *`font-family` (la fuente tipográfica)*
> La **fuente** o *tipografía* es el "estilo de letra". Se elige con `font-family`, y conviene dar
> una **lista de respaldo** por si la primera opción no está disponible en el equipo del usuario:
> ```css
> body {
>   font-family: "Hanken Grotesk", Helvetica, Arial, sans-serif;
> }
> ```
> El navegador prueba con la primera; si no la encuentra, pasa a la siguiente, y así hasta llegar a
> `sans-serif` (una fuente genérica "de palo seco"). **¿Dónde se usa en tu proyecto?** Tu sitio usa
> **Fraunces** para los títulos y **Hanken Grotesk** para el cuerpo (ambas cargadas desde Google
> Fonts).

> ### 🟦 ¿Qué significa? — *Serif vs. sans-serif*
> - **Serif**: fuentes con "remates" (esos pequeños adornos en las puntas de las letras), como
>   Times. Transmiten un aire clásico, de libro o periódico. Tu sitio usa una serif (Fraunces) para
>   los títulos.
> - **Sans-serif** ("sin serif"): fuentes limpias, sin esos adornos, como Arial. Se leen muy bien en
>   pantalla, y por eso suelen reservarse para el cuerpo de texto.

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
> - El `line-height` (el interlineado) marca una diferencia enorme en la legibilidad: un valor entre
>   `1.5` y `1.7` se lee con comodidad.
> - El `font-weight` va con números del 100 al 900; 400 es el grosor normal y 700 la negrita.

> ### 🟦 ¿Qué significa? — *Fuentes web (Google Fonts)*
> Los equipos solo traen instaladas unas pocas fuentes. Cuando quieres usar una tipografía bonita
> que no todo el mundo tiene, la solución es **cargarla desde internet**. **Google Fonts** es un
> servicio gratuito que aloja cientos de fuentes: añades un `<link>` en tu `<head>` y a partir de ahí
> ya puedes nombrarlas en `font-family`. Así es exactamente como tu sitio usa Fraunces y Hanken
> Grotesk.

---

## 4. Variables CSS: define un color una vez, úsalo en todos lados

> ### 🟦 ¿Qué significa? — *Variables CSS (custom properties)*
> Una **variable CSS** guarda un valor (un color, por ejemplo) bajo un nombre, para poder reutilizarlo
> cuantas veces quieras. Se definen normalmente en `:root` (que representa toda la página) con la
> sintaxis `--nombre`, y se usan con `var(--nombre)`:
> ```css
> :root {
>   --color-primario: #1B6B6B;
>   --color-acento:   #D98A3D;
> }
> h1     { color: var(--color-primario); }
> .boton { background: var(--color-acento); }
> ```
> **¿Por qué es genial?** Porque el día que decidas cambiar tu color primario, lo cambias **en un
> solo sitio** y se actualiza en toda la página de golpe. Es justo la técnica que usa la hoja de
> estilos de **este manual** (`site/estilos.css`), y también la que hace posibles los "temas"
> (claro/oscuro) de RachaSimple.

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
