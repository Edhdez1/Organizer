# Capítulo 05 — Diseño responsive

> Tu sitio lo abre gente desde un teléfono pequeño, una tablet, una laptop y un monitor enorme.
> ¿Cómo logras que se vea bien en **todos**? Con **diseño responsive**. Cerramos el módulo de
> CSS con la pieza que hace tu web profesional en cualquier pantalla. (Tú mismo estás leyendo
> esto desde el teléfono: esto es justo lo que lo hace posible.)

---

## 1. Qué es el diseño responsive

> ### 🟦 ¿Qué significa? — *Diseño responsive (adaptable)*
> El **diseño responsive** ("que responde") es construir una página que **se adapta
> automáticamente** al tamaño de la pantalla: en el teléfono el contenido se apila en una
> columna; en el escritorio se reparte en varias columnas. No haces una web "para móvil" y otra
> "para escritorio": haces **una sola** que se reacomoda.

> ### 💡 Tip — Por qué importa tanto
> Más de la mitad del tráfico web mundial es desde móvil. Una página que en el teléfono se ve
> diminuta o descuadrada **pierde clientes**. Google incluso penaliza en sus resultados a los
> sitios que no son responsive. Para tu negocio, esto es dinero.

---

## 2. El cimiento: la etiqueta viewport (repaso del módulo 01)

> ### 🟦 ¿Qué significa? — *La meta-etiqueta viewport*
> Sin esta línea en el `<head>`, el móvil "miente" sobre su ancho y muestra la página como una
> versión diminuta de escritorio. La línea le dice "usa el ancho real del dispositivo":
> ```html
> <meta name="viewport" content="width=device-width, initial-scale=1.0">
> ```
> Es **el requisito número uno** del responsive. Sin ella, nada de lo demás funciona en móvil.
> Tu sitio la tiene; revísala con `F12`.

---

## 3. La herramienta estrella: las media queries

> ### 🟦 ¿Qué significa? — *Media query (consulta de medios)*
> Una **media query** es una regla CSS que **solo se aplica si se cumple una condición** sobre
> la pantalla, típicamente su ancho. Es como decir "si la pantalla mide menos de 600px, aplica
> *estos* estilos".
> ```css
> /* Estilos normales (para pantallas grandes) */
> .galeria { display: flex; gap: 16px; }
>
> /* Si la pantalla es de 600px o menos, cambia a columna */
> @media (max-width: 600px) {
>   .galeria { flex-direction: column; }
> }
> ```
> La parte `@media (max-width: 600px)` es la condición; las reglas dentro de sus llaves solo
> aplican cuando se cumple.

> ### 🟦 ¿Qué significa? — *Breakpoint (punto de quiebre)*
> Un **breakpoint** es el ancho en el que tu diseño "cambia de forma" (por ejemplo, 600px). No
> hay valores mágicos universales; se eligen según dónde *tu* diseño empieza a verse mal.
> Valores comunes de referencia: ~600px (móvil/tablet), ~900px (tablet/escritorio).

---

## 4. La estrategia recomendada: mobile-first

> ### 🟦 ¿Qué significa? — *Mobile-first ("primero el móvil")*
> Es una forma de trabajar: **escribe primero los estilos para móvil** (el caso más simple, una
> columna) y luego, con media queries de `min-width`, **añade** complejidad para pantallas
> grandes.
> ```css
> /* Base: móvil. Todo en una columna. */
> .galeria { display: flex; flex-direction: column; gap: 16px; }
>
> /* A partir de 700px (tablet/escritorio): ponlo en fila. */
> @media (min-width: 700px) {
>   .galeria { flex-direction: row; }
> }
> ```
> **¿Por qué mobile-first?** Porque es más fácil *añadir* lujo para pantallas grandes que
> *quitarlo* para las pequeñas. Además, te obliga a priorizar lo esencial. Es el estándar de la
> industria; tu sitio y tus apps lo siguen.

> ### 🟦 ¿Qué significa? — *`max-width` vs. `min-width`*
> - `@media (max-width: 600px)` → "de 600px **hacia abajo**" (pantallas pequeñas). Típico del
>   enfoque "escritorio primero".
> - `@media (min-width: 700px)` → "de 700px **hacia arriba**" (pantallas grandes). Típico del
>   enfoque "mobile-first".
> Elige uno y sé consistente. Mobile-first usa principalmente `min-width`.

---

## 5. Imágenes y medidas flexibles

Dos hábitos que hacen responsive casi cualquier cosa, sin media queries:

> ### 💡 Tip — Imágenes que nunca se desbordan
> Esta regla hace que ninguna imagen sea más ancha que su contenedor (clave en móvil):
> ```css
> img {
>   max-width: 100%;
>   height: auto;   /* mantiene la proporción */
> }
> ```

> ### 💡 Tip — Mide en relativo, no en absoluto
> Si pones `width: 1000px` a un bloque, en un teléfono de 360px se desborda. Mejor usa medidas
> relativas (`%`, o un `max-width` con `width: 100%`):
> ```css
> .contenedor { width: 100%; max-width: 1000px; margin: 0 auto; }
> ```
> Así ocupa hasta 1000px en pantallas grandes, pero se encoge solo en las pequeñas, y `margin:
> 0 auto` lo centra. Esta es la base del layout de casi cualquier sitio (incluida la hoja de
> estilos de este manual, con su `.contenedor`).

---

## 6. Cómo probar el responsive (sin tener mil dispositivos)

> ### 💡 Tip — El modo dispositivo de las DevTools
> En tu computadora, abre `F12` y busca el icono de **móvil/tablet** (suele estar arriba a la
> izquierda del panel). Activa el "modo dispositivo": puedes simular distintos tamaños de
> pantalla y ver cómo responde tu página, sin necesidad de un teléfono real. Es como tendrás que
> revisar tus diseños siempre.

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Entiendo qué es **responsive** y por qué importa (móvil = la mayoría del tráfico).
- [ ] Sé que la etiqueta **viewport** es el requisito base en el `<head>`.
- [ ] Puedo escribir una **media query** con una condición de ancho.
- [ ] Entiendo qué es un **breakpoint** y la diferencia `max-width` / `min-width`.
- [ ] Entiendo la estrategia **mobile-first** y por qué se recomienda.
- [ ] Sé hacer imágenes y contenedores **flexibles** (`max-width: 100%`, `%`).
- [ ] Sé probar el diseño con el **modo dispositivo** de las DevTools.

---

## 🧪 Ejercicios

1. **Lee la condición.** ¿Cuándo se aplican estos estilos? (a) `@media (max-width: 480px)`, (b)
   `@media (min-width: 1024px)`.
2. **Mobile-first.** Reescribe esta idea en mobile-first: "por defecto la galería va en fila;
   en móvil (≤600px) que vaya en columna". (Pista: invierte el enfoque con `min-width`.)
3. **Imagen.** ¿Qué dos líneas pones para que ninguna imagen se desborde en móvil y mantenga su
   proporción?
4. **Contenedor centrado.** Escribe el CSS de un `.contenedor` que ocupe el 100% del ancho pero
   nunca más de 800px, y quede centrado.
5. 💻 **Hazlo responsive.** Toma tu fila de tres tarjetas del capítulo anterior. Con una media
   query, haz que en pantallas de 600px o menos se apilen en columna. Pruébalo con el modo
   dispositivo de las DevTools.

---

🎉 **¡Terminaste el Módulo 02 — CSS!** Ahora controlas colores (con códigos exactos), tamaños,
tipografía, el modelo de cajas, Flexbox y el diseño responsive. Ya puedes dar órdenes precisas
de diseño *y* entender el `styles.css` de tu sitio. Tu casa ya tiene estructura (HTML) y
pintura (CSS). Falta darle vida.

➡️ Siguiente módulo: **[03 — JavaScript](../03-javascript/README.md)** *(en preparación)*.
