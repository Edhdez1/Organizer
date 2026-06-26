# Capítulo 11 — Unidades modernas y funciones

<p align="center">
  <img src="../../recursos/imagenes/02-css/cap11.png" alt="Ilustración del capítulo (pixel art con Bit)" width="640">
</p>


> ¡Hola otra vez! Soy Bit, tu ajolote guía. 🐾 En los capítulos pasados aprendimos a dar color, poner márgenes y colocar cajas. Pero seguro te diste cuenta de algo: cuando escribíamos `width: 300px` o `font-size: 16px`, todo quedaba **fijo como una estatua**. En una pantalla grande se veía bien; en un teléfono, apretado; en un monitor enorme, perdido en una esquina. Hoy vamos a darle vida a esos números. Vas a conocer unidades que **respiran** con la pantalla y funciones que calculan tamaños por su cuenta, para que tu diseño se adapte sin que escribas mil `@media` queries. Respira hondo, porque esto es de lo más útil que vas a ver en CSS. ¡Arrancamos!

---

## 1. El problema de los píxeles fijos

Hasta ahora medíamos casi todo en **píxeles** (`px`). Un píxel es como un ladrillito: siempre mide lo mismo, lo pongas donde lo pongas. Eso viene bien para cosas que de verdad no deben moverse (el grosor de un borde, por ejemplo), pero se vuelve un estorbo para textos y espacios que deberían crecer o encoger según el dispositivo.

> ### 🟦 ¿Qué significa? — *Píxel (px)*
> Un **píxel** es la unidad más pequeña y fija de CSS. Sirve para medir longitudes que no deben escalar: bordes finos, sombras, separaciones milimétricas. Lo usas un montón en el `styles.css` de **tunal-digital**, por ejemplo en `border: 1px solid` o en sombras. El lado flojo es que un texto fijado en `px` ignora las preferencias de accesibilidad de la persona: si alguien con baja visión agranda la letra del navegador, tu `16px` no se inmuta.

Imagina que en **tunal-digital** pusiste todos los títulos en `font-size: 32px`. En un celular pequeño esos 32px se comen el ancho de la pantalla. Y si un usuario configuró su navegador para letra más grande, tu sitio lo ignora por completo. Eso no es accesible ni cómodo. La salida son las unidades **relativas**, que se calculan a partir de otra cosa: el tamaño de letra base, el ancho de la ventana, el contenedor padre…

> ### 💡 Tip
> Regla práctica de Bit: usa `px` para detalles que **nunca** deberían escalar (bordes, líneas finas) y unidades relativas para **todo lo que el usuario lee o toca** (textos, espacios, anchos de columna). Así tu sitio respeta a la persona que lo está usando.

---

## 2. `rem` y `em`: medir en relación al texto

Estas dos unidades se miden a partir del **tamaño de la fuente**, no en píxeles absolutos. Son las reinas de la tipografía moderna.

> ### 🟦 ¿Qué significa? — *rem*
> `rem` viene de "root em": mide en relación al tamaño de letra **del elemento raíz**, la etiqueta `<html>`. Por defecto, los navegadores ponen `html` en `16px`, así que `1rem = 16px`, `1.5rem = 24px` y `0.5rem = 8px`. Te sirve para definir tamaños que escalen todos juntos desde un único lugar. Si en el `styles.css` de **tunal-digital** cambias el tamaño base del `html`, **todo** lo medido en `rem` se reajusta de golpe. Es perfecta para tipografía y espaciados coherentes.

> ### 🟦 ¿Qué significa? — *em*
> `em` mide en relación al tamaño de letra **del propio elemento** (o el que herede de su padre). Si un párrafo tiene `font-size: 20px`, entonces dentro de él `1em = 20px`. Sirve para tamaños que dependen del contexto local: por ejemplo, un `padding` de botón que crezca de forma proporcional cuando el botón tiene letra más grande. La usas cuando quieres que algo escale **junto con su propio texto**.

La diferencia es sutil, pero importa:

```css
html {
  font-size: 16px; /* base: 1rem = 16px */
}

h1 {
  font-size: 2rem;    /* 2 × 16 = 32px, SIEMPRE referido a html */
}

.tarjeta {
  font-size: 1.25rem; /* 20px */
  padding: 1em;       /* 1 × 20 = 20px, referido a ESTA tarjeta */
}
```

En `.tarjeta`, el `padding: 1em` vale 20px porque `em` mira el `font-size` local, que son 20px. Si mañana subes la letra de la tarjeta a 24px, su padding crecerá solo hasta 24px. El `h1` con `2rem`, en cambio, siempre será el doble del tamaño raíz, lo coloques donde lo coloques.

> ### ⚠️ Cuidado
> `em` se **acumula** cuando hay elementos anidados. Si un `<div>` con `font-size: 1.5em` contiene otro `<div>` también en `1.5em`, el segundo termina siendo `1.5 × 1.5 = 2.25` veces el tamaño base. Esto puede irse de las manos. Por eso, para tipografía general se prefiere `rem` (siempre apunta a la raíz y no se multiplica), y se deja `em` para casos puntuales como el padding interno de un componente.

> ### 🔎 En tu código
> En **RachaSimple** y **Faro** usas Tailwind. Cuando escribes `text-lg` o `p-4`, Tailwind genera por debajo valores en `rem` (`text-lg` es `1.125rem`, `p-4` es `1rem`). O sea: aunque no escribas `rem` a mano, ya lo estás usando. Entender `rem` te ayuda a saber *por qué* la escala de Tailwind se ve tan armónica: todo se construye sobre la misma raíz.

> ### 💡 Tip
> Hay un truco famoso: poner `html { font-size: 62.5%; }` hace que `1rem = 10px` (porque el 62.5% de 16 es 10). Así las cuentas salen redondas: `1.6rem = 16px`, `2.4rem = 24px`. Mucha gente lo usa para "pensar en píxeles" sin perder las ventajas de escalado de `rem`. No es obligatorio, pero está bueno conocerlo.

---

## 3. `%`: relativo al contenedor padre

El porcentaje (`%`) mide en relación al **elemento padre**, aunque con una trampa: a qué propiedad del padre depende de qué estés midiendo.

> ### 🟦 ¿Qué significa? — *Porcentaje (%)*
> El `%` expresa una fracción de una medida del **contenedor padre**. En `width`, es un porcentaje del ancho del padre; en `height`, del alto; en `padding` y `margin`, casi siempre del **ancho** del padre (¡incluso para arriba y abajo!). Sirve para que un elemento ocupe una parte proporcional de su contenedor. En el `styles.css` de **tunal-digital** lo usarías para que una columna ocupe el `50%` del ancho disponible y se reacomode sola en pantallas distintas.

```css
.contenedor {
  width: 600px;
}

.columna {
  width: 50%;   /* 300px, la mitad del padre */
  padding: 5%;  /* 5% de 600px = 30px en TODOS los lados */
}
```

> ### ⚠️ Cuidado
> Que `padding-top` en porcentaje se calcule sobre el **ancho** sorprende a todo el mundo al principio. No es un error tuyo: CSS funciona así. (Más adelante veremos `aspect-ratio`, que resuelve de forma limpia lo que antes la gente conseguía con ese truco raro del `padding` en porcentaje.)

---

## 4. Unidades de ventana: `vw`, `vh`, `vmin`, `vmax`

Ahora subimos un escalón. Estas unidades no miran al padre ni a la fuente, sino a **la ventana completa del navegador**, lo que se llama *viewport*.

> ### 🟦 ¿Qué significa? — *Viewport*
> El **viewport** es el área visible de la página dentro del navegador: el "marco" por el que te asomas. Su tamaño cambia según el dispositivo y según si el usuario agranda o achica la ventana. Conocer ese tamaño nos permite crear diseños que reaccionan al espacio real disponible. Es la base de todo lo "responsive".

> ### 🟦 ¿Qué significa? — *vw (viewport width)*
> `1vw` es el **1% del ancho** del viewport. Si la ventana mide 1000px de ancho, `1vw = 10px` y `100vw` es todo el ancho. Sirve para tamaños que deben escalar con el ancho de pantalla, como un título gigante en una portada (*hero*) que se ve enorme en desktop y razonable en móvil. En una landing de **tunal-digital**, un `font-size: 5vw` haría que el titular crezca y encoja solo según el ancho.

> ### 🟦 ¿Qué significa? — *vh (viewport height)*
> `1vh` es el **1% del alto** del viewport. `100vh` es toda la altura visible. Sirve para secciones que deben ocupar la pantalla completa de alto, como una portada de pantalla entera. En **tunal-digital**, una sección con `min-height: 100vh` ocuparía todo el alto al cargar.

> ### 🟦 ¿Qué significa? — *vmin y vmax*
> `vmin` es el 1% de la dimensión **más pequeña** del viewport (ancho o alto, el menor de los dos); `vmax`, el 1% de la **más grande**. Sirven para elementos que deben caber bien tanto en pantallas anchas (horizontal) como altas (vertical). Por ejemplo, un cuadrado decorativo con `width: 50vmin` siempre cabe, gire como gire el teléfono, porque se apoya en el lado más corto.

```css
.portada {
  min-height: 100vh;      /* pantalla completa de alto */
  font-size: 4vw;         /* el texto crece con el ancho */
}

.cuadro-deco {
  width: 50vmin;          /* siempre cabe, en vertical u horizontal */
  height: 50vmin;
}
```

> ### ⚠️ Cuidado
> Usar `vw` *solo* para tipografía es jugar con fuego: en pantallas muy pequeñas el texto queda diminuto y en pantallas gigantes, descomunal. Encima no respeta el zoom del usuario. Por eso casi nunca usamos `vw` desnudo para texto: lo combinamos con `rem` dentro de `clamp()`, que veremos en la sección 6. Bit te lo avisa para que no te lleves un susto. 🐾

> ### 💡 Tip
> Hay un detalle con `100vh` en móviles: la barra de direcciones del navegador puede tapar parte de la pantalla y provocar saltos molestos. Para eso aparecieron unidades más nuevas como `dvh` (*dynamic viewport height*), `svh` y `lvh`, que tienen en cuenta esa barra. Si notas que tu sección de `100vh` "salta" en el celular, prueba con `100dvh`.

---

## 5. `ch`: medir en caracteres

Esta unidad es curiosa y resulta muy útil para la legibilidad.

> ### 🟦 ¿Qué significa? — *ch*
> `1ch` es el ancho aproximado del carácter "0" (cero) en la fuente actual. Es decir, mide en "caracteres". Su uso estrella es controlar el **ancho de los bloques de texto**: hay estudios que dicen que una línea cómoda de leer ronda los 45 a 75 caracteres. Con `max-width: 65ch` consigues justo eso de forma elegante. En el sitio del propio manual o en un artículo de **tunal-digital**, limitar el ancho del texto con `ch` mejora la lectura una barbaridad.

```css
.articulo {
  max-width: 65ch;   /* líneas de ~65 caracteres, fáciles de leer */
  margin: 0 auto;    /* centra el bloque */
}
```

> ### 💡 Tip
> Cuando un párrafo se estira por todo el ancho de un monitor grande, el ojo se cansa al saltar de una línea a otra. `max-width` en `ch` es la forma más natural de evitarlo, porque piensas en términos de lectura ("cuántas letras por línea") en vez de en píxeles arbitrarios.

---

## 6. Funciones de cálculo: `calc()`, `min()`, `max()`, `clamp()`

Aquí está la magia del capítulo. CSS sabe hacer cuentas. Estas cuatro funciones te dejan combinar unidades distintas y crear tamaños **fluidos** que se adaptan solos.

### 6.1 `calc()`: mezcla y combina

> ### 🟦 ¿Qué significa? — *calc()*
> `calc()` hace una **operación matemática** (suma, resta, multiplicación, división) dentro de un valor de CSS, y te deja **mezclar unidades distintas**. Sirve para cosas que a mano serían imposibles, como "el 100% del ancho menos 40px de margen". Lo usarías en el `styles.css` de **tunal-digital** para que un panel ocupe todo el ancho menos un sidebar fijo.

```css
.contenido {
  width: calc(100% - 250px);  /* todo el ancho menos el menú lateral */
}

.seccion {
  padding: calc(1rem + 2vw);  /* espacio que crece un poco con la pantalla */
}
```

> ### ⚠️ Cuidado
> Dentro de `calc()`, los signos `+` y `-` **necesitan espacios** alrededor: `calc(100% - 20px)` funciona, pero `calc(100%-20px)` se rompe sin avisar. Es el tropiezo más común de todos. La multiplicación `*` y la división `/` no exigen espacios, pero ponlos igual por claridad.

### 6.2 `min()` y `max()`: elige el menor o el mayor

> ### 🟦 ¿Qué significa? — *min()*
> `min()` recibe varios valores y usa el **más pequeño** de ellos en cada momento. Suena al revés que "min" sirva para poner un máximo, pero míralo así: `width: min(90%, 600px)` significa "usa el 90% del ancho, pero **nunca pases de 600px**". En pantallas chicas gana el 90%; en grandes, gana 600px. Sirve para poner topes de tamaño sin media queries. Ideal para un contenedor central en **tunal-digital**.

> ### 🟦 ¿Qué significa? — *max()*
> `max()` recibe varios valores y usa el **más grande**. `width: max(50%, 300px)` significa "al menos 300px, pero crece hasta el 50% si hay espacio". Sirve para garantizar un tamaño mínimo. Viene bien para que un botón o una tarjeta nunca queden demasiado pequeños.

```css
.contenedor {
  width: min(90%, 600px);   /* tope de 600px, pero respira en móvil */
  margin: 0 auto;
}

.tarjeta {
  width: max(300px, 30%);   /* nunca más estrecha de 300px */
}
```

> ### 💡 Tip
> `min()` y `max()` aceptan más de dos valores: `min(90%, 600px, 50vw)` elige el menor de los tres. Y puedes meter `calc()` dentro: `min(100% - 2rem, 600px)`. Son piezas que encajan unas con otras como bloques de Lego.

### 6.3 `clamp()`: el tres en uno para tamaños fluidos

> ### 🟦 ¿Qué significa? — *clamp()*
> `clamp(mínimo, ideal, máximo)` "abraza" un valor entre un piso y un techo. Toma el valor **ideal** (que suele ser fluido, en `vw`) pero nunca baja del **mínimo** ni sube del **máximo**. Es la herramienta estrella para la **tipografía fluida**: el texto crece con la pantalla, pero con límites sensatos. Sirve para no tener que escribir media queries solo por cambiar tamaños de letra.

```css
h1 {
  /* mínimo 1.5rem, ideal que escale con el ancho, máximo 3rem */
  font-size: clamp(1.5rem, 1rem + 3vw, 3rem);
}

.seccion {
  /* padding fluido entre 1rem y 4rem */
  padding: clamp(1rem, 5vw, 4rem);
}
```

¿Cómo se lee `clamp(1.5rem, 1rem + 3vw, 3rem)`? En una pantalla muy pequeña, `1rem + 3vw` daría un número bajo, así que gana el **mínimo** (1.5rem) y el título no se vuelve ilegible. En una pantalla mediana, manda el valor ideal y el texto crece con suavidad. En una pantalla enorme, `1rem + 3vw` sería gigante, pero el **máximo** (3rem) lo frena. ¿El resultado? Un título que se adapta solo, con una sola línea de CSS y **cero** media queries.

> ### 🔎 En tu código
> En **Faro** (Next.js + Tailwind), el Tailwind moderno admite tamaños arbitrarios como `text-[clamp(1.5rem,1rem+3vw,3rem)]`. Saber qué hace `clamp()` te deja escribir titulares fluidos en el dashboard de proyectos sin pelearte con los breakpoints. Y en **tunal-digital**, donde escribes CSS a mano en `styles.css`, `clamp()` reemplaza varias `@media` que antes necesitabas solo para ajustar tamaños de letra.

> ### 💡 Tip
> Fórmula mental para el `clamp()` tipográfico: el segundo valor (el ideal) casi siempre tiene la forma `algo_rem + algo_vw`. La parte en `rem` es la "base" que respeta el zoom; la parte en `vw` es el "crecimiento" con la pantalla. Empieza con `clamp(1rem, 0.5rem + 2vw, 2rem)` y ajusta los números a ojo hasta que se vea bien en móvil y en desktop.

---

## 7. `aspect-ratio`: proporciones sin trucos

Antes, mantener una caja con una proporción fija (como un video 16:9) pedía un truco horrible con `padding` en porcentaje. Hoy hay una propiedad dedicada y limpia.

> ### 🟦 ¿Qué significa? — *aspect-ratio*
> `aspect-ratio` fija la **proporción entre ancho y alto** de un elemento. Escribes `aspect-ratio: 16 / 9` y, si defines el ancho, el alto se calcula solo para mantener esa relación (y al revés también). Sirve para imágenes, videos, miniaturas y tarjetas que no deben deformarse al cambiar de pantalla. En **tunal-digital**, una galería de miniaturas cuadradas (`aspect-ratio: 1 / 1`) se mantendría prolija en cualquier ancho.

```css
.video {
  width: 100%;
  aspect-ratio: 16 / 9;   /* alto calculado solo, formato panorámico */
}

.miniatura {
  width: 100%;
  aspect-ratio: 1 / 1;    /* siempre cuadrada */
  object-fit: cover;      /* la imagen llena sin deformarse */
}
```

> ### 🟦 ¿Qué significa? — *object-fit*
> `object-fit` decide **cómo se acomoda una imagen (o un video) dentro de la caja que la contiene** cuando sus proporciones no coinciden con las de la caja. El valor `cover` recorta lo que sobra y llena todo el espacio **sin deformar** la imagen; `contain` muestra la imagen entera dejando huecos; `fill` (el de por defecto) la estira y la deforma. Va casi siempre de la mano de `aspect-ratio`: tú fijas la proporción de la caja con `aspect-ratio` y dejas que `object-fit: cover` meta la foto dentro sin estirarla. En una galería de miniaturas de **tunal-digital**, sin `object-fit` las fotos se verían achatadas; con `cover` se ven prolijas y uniformes.

> ### 💡 Tip
> `aspect-ratio` se lleva de maravilla con los grids responsivos. Si tienes una galería con columnas que cambian de ancho, darle `aspect-ratio: 1 / 1` a cada celda mantiene todas las miniaturas cuadradas, haya las columnas que haya. Y `object-fit: cover` evita que las fotos se estiren.

> ### 🔎 En tu código
> En **RachaSimple** (React + Tailwind) puedes usar la clase `aspect-square` o `aspect-video`, que son exactamente `aspect-ratio: 1/1` y `16/9`. Entender la propiedad de fondo te ayuda a saber cuándo aplicarla a las tarjetas de rachas para que se vean uniformes en la cuadrícula.

---

## 8. Juntando todo: menos media queries, más fluidez

La gran idea del capítulo es que muchas adaptaciones que antes pedían `@media (max-width: ...)` hoy se resuelven con unidades relativas y funciones. Veamos un mini ejemplo realista para el `styles.css` de **tunal-digital**:

```css
:root {
  font-size: 16px; /* base para rem */
}

.contenedor {
  width: min(92%, 1100px);   /* centrado, con tope */
  margin-inline: auto;
  padding-inline: clamp(1rem, 4vw, 3rem);
}

.titulo {
  font-size: clamp(1.75rem, 1rem + 4vw, 3.5rem);
  max-width: 20ch;           /* títulos que no se estiran de más */
}

.parrafo {
  font-size: clamp(1rem, 0.9rem + 0.5vw, 1.25rem);
  max-width: 65ch;           /* lectura cómoda */
}

.galeria-item {
  aspect-ratio: 4 / 3;
  object-fit: cover;
}
```

Fíjate: no hay ni una sola media query, y aun así el diseño se porta bien desde un teléfono hasta un monitor 4K. El contenedor se topa en 1100px, los títulos y párrafos escalan con sus límites, las líneas de texto se mantienen legibles y las imágenes guardan su proporción. A esto lo llamamos **diseño fluido**.

> ### 🟦 ¿Qué significa? — *margin-inline / padding-inline*
> Son propiedades **lógicas** que aplican margen o relleno a los **dos lados del eje de la línea de texto** a la vez (en español, izquierda y derecha). `margin-inline: auto` es la forma moderna de centrar un bloque horizontalmente (equivale al clásico `margin: 0 auto`, pero solo en el eje horizontal); `padding-inline: clamp(1rem, 4vw, 3rem)` pone ese relleno fluido a izquierda y derecha sin tocar arriba ni abajo. Se llaman "lógicas" porque se adaptan solas si el idioma se escribe de derecha a izquierda. Las menciono aquí porque las verás cada vez más en el CSS moderno y en lo que genera Tailwind.

> ### 💡 Tip
> Las media queries **no desaparecen**: siguen haciendo falta cuando quieres **reorganizar** el layout, por ejemplo pasar de dos columnas a una. Lo que cambia es que ya no las necesitas para ajustar *tamaños*. Usa funciones fluidas para los tamaños y guarda las `@media` para los cambios estructurales de verdad.

> ### ⚠️ Cuidado
> No abuses de `vw` por todos lados. Si pones `vw` sin límites en demasiados sitios, perderás el control y el zoom del usuario dejará de funcionar bien (un problema de accesibilidad). La regla de Bit: `vw` casi siempre va **dentro** de un `clamp()` con un mínimo en `rem`. Así escala, pero sin faltarle el respeto a las personas. 🐾

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Entiendo por qué `px` es fijo y cuándo conviene usarlo (bordes, líneas finas).
- [ ] Sé la diferencia entre `rem` (referido a la raíz `html`) y `em` (referido al elemento).
- [ ] Sé que `em` se acumula al anidar y por eso prefiero `rem` para tipografía general.
- [ ] Entiendo que `%` se refiere al padre, y que `padding`/`margin` en `%` usan el ancho.
- [ ] Distingo `vw`, `vh`, `vmin` y `vmax` y para qué sirve cada una.
- [ ] Uso `ch` para limitar el ancho de los bloques de texto y mejorar la lectura.
- [ ] Sé escribir `calc()` con espacios alrededor de `+` y `-`.
- [ ] Entiendo que `min()` pone un techo y `max()` pone un piso.
- [ ] Puedo leer y escribir un `clamp(mínimo, ideal, máximo)` para tipografía fluida.
- [ ] Uso `aspect-ratio` para mantener proporciones sin trucos de `padding`.
- [ ] Sé cuándo NO necesito media queries gracias a las funciones fluidas.

---

## 🧪 Ejercicios

1. **(papel y lápiz)** Convierte estos tamaños a `rem` suponiendo `1rem = 16px`: 24px, 8px, 40px, 12px. Luego di cuánto vale `2em` dentro de un elemento con `font-size: 18px`.

2. **(papel y lápiz)** Explica con tus palabras qué hace `width: min(90%, 700px)` en una pantalla de 400px de ancho y en otra de 1400px. ¿Qué valor gana en cada caso?

3. 💻 En el `styles.css` de **tunal-digital** (o un archivo de práctica), crea un `.contenedor` con `width: min(92%, 1000px)` y `margin-inline: auto`. Mete dentro un título y un párrafo. Abre el navegador y redimensiona la ventana: observa cómo el contenedor se topa en 1000px pero respira en móvil.

4. 💻 Aplica `font-size: clamp(1.5rem, 1rem + 3vw, 3rem)` a un `<h1>`. Cambia el ancho de la ventana lentamente y anota en qué momento deja de crecer el texto (cuando toca el máximo) y cuándo deja de encoger (cuando toca el mínimo).

5. 💻 Crea una galería de 3 imágenes con `aspect-ratio: 1 / 1` y `object-fit: cover` en cada una. Comprueba que se mantienen cuadradas aunque las imágenes originales tengan formas distintas.

6. 💻 (Reto) Limita un párrafo largo con `max-width: 60ch` y céntralo con `margin: 0 auto`. Compara la legibilidad antes y después en una pantalla ancha. ¿Notas la diferencia al saltar de línea?

> ¡Lo lograste! 🎉 Ahora tus tamaños saben adaptarse solos. La próxima vez que veas un sitio que se ve perfecto en cualquier pantalla, sabrás que detrás hay `rem`, `clamp()` y `aspect-ratio` haciendo su magia silenciosa. Nos vemos en el siguiente capítulo. — Bit 🐾
