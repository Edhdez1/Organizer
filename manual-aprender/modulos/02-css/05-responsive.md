# Capítulo 05 — Diseño responsive

> Tu sitio lo abre gente desde un teléfono pequeño, una tablet, una laptop y un monitor enorme.
> ¿Cómo haces que se vea bien en **todos**? Con **diseño responsive**. Cerramos el módulo de
> CSS justo con la pieza que hace que tu web se vea profesional en cualquier pantalla. (De hecho,
> tú mismo estás leyendo esto desde el teléfono: esto es exactamente lo que lo hace posible.)

---

## 1. Qué es el diseño responsive

> ### 🟦 ¿Qué significa? — *Diseño responsive (adaptable)*
> El **diseño responsive** ("que responde") consiste en construir una página que **se adapta
> sola** al tamaño de la pantalla: en el teléfono el contenido se apila en una columna; en el
> escritorio se reparte en varias. No haces una web "para móvil" y otra distinta "para escritorio":
> haces **una sola** que se reacomoda según el espacio que tenga.

> ### 💡 Tip — Por qué importa tanto
> Más de la mitad del tráfico web del mundo viene del móvil. Una página que en el teléfono se ve
> diminuta o descuadrada **pierde clientes**, así de simple. Google incluso baja en sus resultados
> a los sitios que no son responsive. Para tu negocio, esto se traduce en dinero.

---

## 2. El cimiento: la etiqueta viewport (repaso del módulo 01)

> ### 🟦 ¿Qué significa? — *La meta-etiqueta viewport*
> Sin esta línea en el `<head>`, el móvil "miente" sobre su ancho y muestra la página como una
> versión encogida de escritorio. La línea le dice "usa el ancho real del dispositivo":
> ```html
> <meta name="viewport" content="width=device-width, initial-scale=1.0">
> ```
> Es **el requisito número uno** del responsive. Sin ella, nada de lo demás funciona en móvil.
> Tu sitio ya la tiene; compruébalo con `F12`.

---

## 3. La herramienta estrella: las media queries

> ### 🟦 ¿Qué significa? — *Media query (consulta de medios)*
> Una **media query** es una regla CSS que **solo se aplica si se cumple una condición** sobre
> la pantalla, normalmente su ancho. Viene a ser como decir "si la pantalla mide menos de 600px,
> aplica *estos* estilos".
> ```css
> /* Estilos normales (para pantallas grandes) */
> .galeria { display: flex; gap: 16px; }
>
> /* Si la pantalla es de 600px o menos, cambia a columna */
> @media (max-width: 600px) {
>   .galeria { flex-direction: column; }
> }
> ```
> La parte `@media (max-width: 600px)` es la condición; las reglas que van dentro de sus llaves
> solo se activan cuando esa condición se cumple.

> ### 🟦 ¿Qué significa? — *Breakpoint (punto de quiebre)*
> Un **breakpoint** es el ancho en el que tu diseño "cambia de forma" (por ejemplo, 600px). No
> existen valores mágicos que sirvan para todo; los eliges según dónde *tu* diseño empieza a verse
> mal. Como referencia, se suelen usar ~600px (móvil/tablet) y ~900px (tablet/escritorio).

---

## 4. La estrategia recomendada: mobile-first

> ### 🟦 ¿Qué significa? — *Mobile-first ("primero el móvil")*
> Es una forma de trabajar: **escribe primero los estilos para móvil** (el caso más sencillo, todo
> en una columna) y después, con media queries de `min-width`, **vas añadiendo** complejidad para
> las pantallas grandes.
> ```css
> /* Base: móvil. Todo en una columna. */
> .galeria { display: flex; flex-direction: column; gap: 16px; }
>
> /* A partir de 700px (tablet/escritorio): ponlo en fila. */
> @media (min-width: 700px) {
>   .galeria { flex-direction: row; }
> }
> ```
> **¿Por qué mobile-first?** Porque cuesta menos *añadir* lujo para pantallas grandes que
> *quitarlo* para las pequeñas. De paso, te obliga a decidir qué es lo esencial. Es el estándar de
> la industria, y tanto tu sitio como tus apps lo siguen.

> ### 🟦 ¿Qué significa? — *`max-width` vs. `min-width`*
> - `@media (max-width: 600px)` → "de 600px **hacia abajo**" (pantallas pequeñas). Es lo típico del
>   enfoque "escritorio primero".
> - `@media (min-width: 700px)` → "de 700px **hacia arriba**" (pantallas grandes). Es lo típico del
>   enfoque "mobile-first".
> Elige uno y mantente fiel a él. En mobile-first usarás sobre todo `min-width`.

---

## 5. Imágenes y medidas flexibles

Hay dos hábitos que vuelven responsive casi cualquier cosa, y ni siquiera necesitan media queries:

> ### 💡 Tip — Imágenes que nunca se desbordan
> Esta regla hace que ninguna imagen sea más ancha que su contenedor (algo clave en móvil):
> ```css
> img {
>   max-width: 100%;
>   height: auto;   /* mantiene la proporción */
> }
> ```

> ### 💡 Tip — Mide en relativo, no en absoluto
> Si le pones `width: 1000px` a un bloque, en un teléfono de 360px se desborda sin remedio. Mejor
> usa medidas relativas (`%`, o un `max-width` junto a `width: 100%`):
> ```css
> .contenedor { width: 100%; max-width: 1000px; margin: 0 auto; }
> ```
> Así ocupa hasta 1000px en pantallas grandes, pero se encoge solo en las pequeñas, y el `margin:
> 0 auto` lo deja centrado. Esta es la base del layout de casi cualquier sitio (incluida la hoja de
> estilos de este manual, con su `.contenedor`).

---

## 6. Cómo probar el responsive (sin tener mil dispositivos)

> ### 💡 Tip — El modo dispositivo de las DevTools
> En tu computadora, abre `F12` y busca el icono de **móvil/tablet** (suele estar arriba a la
> izquierda del panel). Al activar el "modo dispositivo" puedes simular distintos tamaños de
> pantalla y ver cómo responde tu página, sin necesidad de un teléfono real. Así es como vas a
> revisar tus diseños de aquí en adelante.

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
