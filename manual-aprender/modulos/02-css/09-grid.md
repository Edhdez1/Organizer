# Capítulo 09 — CSS Grid a fondo

<p align="center">
  <img src="../../recursos/imagenes/02-css/cap09.png" alt="Ilustración del capítulo (pixel art con Bit)" width="640">
</p>


> ¡Hola de nuevo! Soy **Bit**, tu ajolote acompañante. 🦎 En el capítulo anterior aprendimos a alinear cosas en una sola dirección con Flexbox. Hoy subimos de nivel: vamos a dibujar **cuadrículas de verdad**, con filas *y* columnas al mismo tiempo. Imagina papel cuadriculado: tú decides cuántas casillas hay y dónde se coloca cada cosa. Eso es **CSS Grid**, y es la herramienta más potente que tiene CSS para maquetar páginas. Respira hondo, sirve agua, y vamos despacio. No hay prisa: cada concepto lo veremos con calma y con ejemplos de tus propios proyectos.

---

## 1. ¿Por qué existe CSS Grid?

Antes de Grid, maquetar una página en dos dimensiones (filas y columnas a la vez) era un dolor de cabeza. Se usaban trucos con `float`, con tablas o con cálculos manuales de porcentajes. Funcionaba... a medias, y se rompía con facilidad.

CSS Grid llegó para resolver justo eso: **organizar el espacio en dos dimensiones** de forma clara y predecible. Tú defines una rejilla (la cuadrícula) y luego dices qué va en cada casilla.

> ### 🟦 ¿Qué significa? — *CSS Grid*
> Es un sistema de diseño (layout) de CSS que organiza elementos en **filas y columnas** al mismo tiempo, como una cuadrícula. Sirve para crear la estructura general de una página: cabecera, menú lateral, contenido y pie; o para distribuir un conjunto de tarjetas de forma ordenada. En tu proyecto **tunal-digital**, la sección de servicios con varias tarjetas alineadas es un caso perfecto para Grid: una rejilla de tarjetas que se reacomoda sola según el ancho de la pantalla.

> ### 🟦 ¿Qué significa? — *Layout (maquetación)*
> "Layout" es simplemente la **distribución de los elementos** en la pantalla: dónde va cada bloque, cuánto espacio ocupa y cómo se relaciona con los demás. Cuando hablamos de "maquetar", nos referimos a construir ese layout. Grid y Flexbox son las dos herramientas principales de CSS para maquetar.

La idea central de Grid es esta: hay un **contenedor** (el elemento padre, al que le pones `display: grid`) y dentro están los **ítems** (los hijos directos, que se acomodan en la cuadrícula). Todo lo que vamos a ver gira en torno a esos dos roles.

---

## 2. Tu primera cuadrícula: `display: grid`

Empecemos con lo mínimo. Tienes un contenedor con varios hijos:

```html
<div class="tarjetas">
  <div class="tarjeta">Uno</div>
  <div class="tarjeta">Dos</div>
  <div class="tarjeta">Tres</div>
  <div class="tarjeta">Cuatro</div>
</div>
```

Y en tu `styles.css`:

```css
.tarjetas {
  display: grid;
}
```

> ### 🟦 ¿Qué significa? — *`display: grid`*
> Es la propiedad que **convierte un elemento en contenedor de cuadrícula**. En cuanto la pones, sus hijos directos pasan a ser ítems de la rejilla y obedecen las reglas de Grid. Sirve para "activar" todo el sistema. En el manual, la clase `.tarjetas` usa exactamente esto para colocar las tarjetas de contenido en cuadrícula.

Si solo pones `display: grid`, por defecto verás una sola columna con cada hijo en su propia fila (uno debajo de otro). No es muy emocionante todavía: falta decirle **cuántas columnas** queremos. Eso lo hacemos en la siguiente sección.

> ### 💡 Tip
> `display: grid` afecta solo a los **hijos directos** del contenedor, no a los nietos. Si una tarjeta tiene cosas dentro, esas cosas no entran en la cuadrícula del padre; siguen sus propias reglas. Grid organiza un nivel a la vez.

---

## 3. Definir columnas con `grid-template-columns`

Aquí empieza la magia. Le decimos a la cuadrícula cuántas columnas tiene y de qué ancho:

```css
.tarjetas {
  display: grid;
  grid-template-columns: 200px 200px 200px;
}
```

Eso crea **tres columnas de 200 píxeles cada una**. Los ítems se reparten de izquierda a derecha y, cuando se llenan las tres columnas, salta a una fila nueva.

> ### 🟦 ¿Qué significa? — *`grid-template-columns`*
> Define **cuántas columnas tiene la cuadrícula y qué ancho tiene cada una**. Le das una lista de medidas separadas por espacios; cada medida es una columna. Sirve para controlar la estructura horizontal del diseño. En **tunal-digital**, podrías usarlo para que la sección de servicios siempre muestre, por ejemplo, tres tarjetas por fila en pantallas grandes.

Cada valor que escribes es una columna. `200px 200px 200px` son tres columnas; `100px 300px` serían dos columnas (una angosta y una ancha). Puedes mezclar unidades:

```css
grid-template-columns: 150px 300px 150px;
```

Eso da una columna central más ancha, rodeada de dos angostas. Útil para layouts tipo "barra lateral + contenido + barra lateral".

> ### ⚠️ Cuidado
> Si pones medidas fijas en píxeles y la suma de columnas es más ancha que la pantalla, el contenido se desbordará (saldrá de la pantalla y aparecerá una barra de desplazamiento horizontal). Por eso casi nunca usamos solo píxeles fijos para el layout completo. Enseguida veremos una unidad mucho más amigable: `fr`.

---

## 4. La unidad mágica: `fr`

Las medidas fijas (como `200px`) tienen un problema: no se adaptan. Si la pantalla es más grande, sobra espacio; si es más pequeña, falta. CSS Grid trae una unidad pensada para esto: `fr`.

> ### 🟦 ¿Qué significa? — *`fr` (fracción)*
> Es una unidad que representa **una fracción del espacio disponible** dentro de la cuadrícula. No es un tamaño fijo: reparte el espacio sobrante de forma proporcional. Sirve para que las columnas crezcan o se encojan solas según el ancho de la pantalla. Es la unidad estrella de Grid para diseños fluidos.

Mira la diferencia:

```css
.tarjetas {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
```

Esto crea **tres columnas iguales** que juntas ocupan todo el ancho disponible. Si la pantalla mide 900px, cada columna mide 300px; si mide 600px, cada una mide 200px. Se adapta sola. ✨

El número antes de `fr` es la **proporción**. Por ejemplo:

```css
grid-template-columns: 2fr 1fr;
```

Aquí la primera columna recibe **el doble de espacio** que la segunda. Si hay 900px disponibles, la primera mide 600px y la segunda 300px. Piensa en `fr` como "partes de una torta": `2fr 1fr` son tres partes en total, dos para una columna y una para la otra.

> ### 💡 Tip
> Puedes mezclar `fr` con medidas fijas. Por ejemplo `grid-template-columns: 250px 1fr` crea una barra lateral fija de 250px y un área de contenido que ocupa todo el resto. Este patrón es clásico para dashboards, y se parece mucho a la estructura de **Faro/Organizer**: un menú lateral de ancho fijo y un área principal flexible.

---

## 5. Espacios entre celdas: `gap`

Hasta ahora nuestras tarjetas están pegadas unas a otras. Para separarlas usamos `gap`.

> ### 🟦 ¿Qué significa? — *`gap`*
> Define el **espacio (el hueco) entre las celdas** de la cuadrícula, tanto entre columnas como entre filas. Sirve para dar aire al diseño sin tener que poner márgenes a cada ítem. En cualquier rejilla de tarjetas (como la `.tarjetas` del manual) es lo que separa una tarjeta de otra de forma uniforme.

```css
.tarjetas {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
}
```

Eso pone 16px de separación entre todas las tarjetas, tanto horizontal como verticalmente. Limpio y consistente.

Si quieres separaciones distintas para filas y columnas, puedes dar dos valores:

```css
gap: 24px 16px; /* 24px entre filas, 16px entre columnas */
```

El primer valor es para las filas (vertical), el segundo para las columnas (horizontal).

> ### 💡 Tip
> `gap` solo crea espacio **entre** celdas, nunca en los bordes externos de la cuadrícula. Para separar la rejilla del borde de la página usa `padding` en el contenedor. Así controlas por separado el "aire interno" (gap) y el "aire alrededor" (padding).

> ### 🔎 En tu código
> Si tu proyecto **RachaSimple** usa Tailwind, esta misma idea aparece con clases como `grid grid-cols-3 gap-4`. `grid` es `display: grid`, `grid-cols-3` es tres columnas iguales y `gap-4` es el `gap`. ¡Es exactamente lo mismo que estás aprendiendo, solo con nombres más cortos! Entender Grid "puro" te hace entender Tailwind al instante.

---

## 6. Menos repetición: `repeat()`

Escribir `1fr 1fr 1fr 1fr` para cuatro columnas funciona, pero imagina doce columnas. Sería tedioso. Para eso existe `repeat()`.

> ### 🟦 ¿Qué significa? — *`repeat()`*
> Es una función de CSS que **repite un patrón de columnas (o filas) un número de veces**, para no tener que escribirlo a mano. Sirve para acortar y hacer más legible la definición de la cuadrícula. Cuanto más grande es la rejilla, más útil es.

```css
.tarjetas {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
```

`repeat(3, 1fr)` significa "repite `1fr` tres veces", o sea, es idéntico a `1fr 1fr 1fr` pero más corto. La sintaxis es `repeat(cuántas-veces, qué-medida)`.

También puedes repetir patrones más complejos:

```css
grid-template-columns: repeat(2, 200px 1fr);
```

Eso repite el patrón `200px 1fr` dos veces, dando cuatro columnas en total: `200px 1fr 200px 1fr`. Pero no te compliques al principio; el uso más común y más útil es `repeat(N, 1fr)`.

> ### 💡 Tip
> `repeat()` no es solo para columnas: también funciona en `grid-template-rows` para repetir filas. La lógica es exactamente la misma.

---

## 7. Columnas que se adaptan: `minmax()`, `auto-fill` y `auto-fit`

Aquí llegamos a una de las partes más bonitas de Grid: **rejillas que se reacomodan solas** según el espacio, sin escribir media query para cada tamaño de pantalla. Vamos por partes.

> ### 🟦 ¿Qué significa? — *media query (consulta de medios)*
> Es una regla de CSS que aplica estilos **solo cuando se cumple una condición**, normalmente el ancho de la pantalla (por ejemplo: "si la pantalla mide menos de 600px, haz esto"). Tradicionalmente se usaban para cambiar el número de columnas según el dispositivo. Lo interesante de lo que vas a ver ahora es que Grid puede lograr ese mismo efecto responsivo **sin escribir ni una sola media query**, lo que ahorra muchísimo código.

### `minmax()`

> ### 🟦 ¿Qué significa? — *`minmax()`*
> Es una función que define un **rango de tamaño**: un mínimo y un máximo. Le dices "esta columna nunca debe ser más angosta que X ni más ancha que Y". Sirve para que las columnas se adapten pero sin volverse ni demasiado pequeñas ni demasiado grandes.

```css
grid-template-columns: minmax(200px, 1fr);
```

Esto dice: "la columna mide como mínimo 200px y como máximo 1fr (todo el espacio disponible)". Es decir, nunca baja de 200px, pero si hay espacio de sobra, crece.

### `auto-fill` y `auto-fit`

Ahora combinamos `repeat()` con `minmax()` y una palabra clave especial. Este es **el patrón estrella** para rejillas de tarjetas responsivas:

```css
.tarjetas {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}
```

¡Vamos a desmenuzarlo despacio porque es importante! 🦎

> ### 🟦 ¿Qué significa? — *`auto-fit`*
> Es una palabra clave que va dentro de `repeat()` en lugar de un número. Le dice a Grid: **"crea tantas columnas como quepan"** en el espacio disponible, y haz que las columnas existentes **se estiren** para llenar todo el ancho. Sirve para rejillas que cambian de número de columnas solas, sin media queries.

> ### 🟦 ¿Qué significa? — *`auto-fill`*
> Es muy parecido a `auto-fit`, pero con una diferencia: cuando sobra espacio, `auto-fill` **deja columnas vacías** (huecos invisibles) en lugar de estirar las que tienen contenido. `auto-fit`, en cambio, colapsa esos huecos y estira las tarjetas. Para galerías de tarjetas, casi siempre querrás `auto-fit`.

Leído en español, `repeat(auto-fit, minmax(220px, 1fr))` significa:

> "Crea tantas columnas como quepan, donde cada una mide mínimo 220px y máximo 1fr; y estira las que haya para llenar el ancho."

El resultado: en una pantalla ancha verás 4 o 5 tarjetas por fila; en una tablet, 2 o 3; en un móvil, 1. **Todo automático**, sin escribir ni una sola media query. Esto es lo que hace que la `.tarjetas` del manual se vea bien en cualquier dispositivo.

> ### ⚠️ Cuidado
> La diferencia entre `auto-fit` y `auto-fill` solo se nota cuando hay **pocas tarjetas y mucho espacio**. Con `auto-fit`, dos tarjetas se estiran para ocupar toda la fila. Con `auto-fill`, esas dos tarjetas se quedan de su tamaño mínimo y dejan el resto de la fila vacío. Si tu galería se ve con tarjetas "demasiado estiradas", quizá quieres `auto-fill`; si se ven "apretadas a la izquierda con hueco a la derecha", quieres `auto-fit`.

> ### 🔎 En tu código
> Este patrón es ideal para la lista de proyectos de **Faro/Organizer**, donde cada proyecto es una tarjeta y no sabes cuántos habrá. Una sola línea de Grid y la rejilla se acomoda sola tenga 2 proyectos o 20. En Tailwind harías algo similar con utilidades de grid responsivas, pero saber el CSS de base te permite entender qué está pasando por debajo.

---

## 8. Definir filas con `grid-template-rows`

Hasta ahora nos enfocamos en columnas porque las filas suelen crecer solas según el contenido. Pero a veces quieres controlar la altura de las filas explícitamente.

> ### 🟦 ¿Qué significa? — *`grid-template-rows`*
> Es el equivalente vertical de `grid-template-columns`: define **cuántas filas tiene la cuadrícula y qué altura tiene cada una**. Sirve cuando necesitas filas de altura específica, por ejemplo una cabecera de 80px, un cuerpo flexible y un pie de 60px.

```css
.layout {
  display: grid;
  grid-template-rows: 80px 1fr 60px;
  min-height: 100vh;
}
```

Eso crea una página con tres filas: cabecera de 80px arriba, contenido que ocupa todo el espacio sobrante (`1fr`) en medio, y pie de 60px abajo. El `min-height: 100vh` hace que la cuadrícula ocupe al menos toda la altura de la ventana.

> ### 🟦 ¿Qué significa? — *`vh` (viewport height)*
> Es una unidad donde `100vh` equivale al **100% de la altura visible de la ventana** del navegador. `50vh` sería la mitad de la pantalla. Sirve para que un elemento ocupe la altura de la pantalla sin importar el tamaño del dispositivo. Es muy común en cabeceras "a pantalla completa".

> ### 💡 Tip
> Existe también `grid-template-areas`, una forma de nombrar zonas de la cuadrícula con palabras. Lo veremos en la sección 10. Por ahora, recuerda: columnas con `grid-template-columns`, filas con `grid-template-rows`. Mismo concepto, distinto eje.

---

## 9. Colocar elementos a mano: `grid-column` y `grid-row`

Hasta ahora dejábamos que Grid colocara las tarjetas automáticamente, en orden. Pero a veces quieres que **un ítem en concreto ocupe más de una columna o fila**, o que vaya a una posición específica. Para eso usamos `grid-column` y `grid-row` en el ítem (no en el contenedor).

Para entenderlo necesitamos un concepto clave: las **líneas de la cuadrícula**.

> ### 🟦 ¿Qué significa? — *Líneas de la cuadrícula (grid lines)*
> Son las **líneas imaginarias que separan las columnas y filas**, numeradas empezando en 1. En una rejilla de 3 columnas hay 4 líneas verticales: la línea 1 está antes de la primera columna, la 2 entre la primera y la segunda, y así hasta la 4 al final. Para colocar un ítem, le dices entre qué líneas debe ir. Sirve para posicionar elementos con precisión.

Imagina una rejilla de 3 columnas. Las líneas verticales se numeran 1, 2, 3, 4:

```
1   2   3   4
| A | B | C |
```

Si quiero que un ítem ocupe **desde la línea 1 hasta la línea 3** (es decir, las dos primeras columnas), escribo:

```css
.tarjeta-destacada {
  grid-column: 1 / 3;
}
```

> ### 🟦 ¿Qué significa? — *`grid-column`*
> Indica **en qué columnas se coloca un ítem**, usando los números de línea: `inicio / fin`. `1 / 3` significa "empieza en la línea 1 y termina en la línea 3", ocupando todo lo que haya en medio (dos columnas). Sirve para que un elemento abarque varias columnas o se ubique en una posición concreta. Útil, por ejemplo, para una tarjeta destacada que ocupe el doble de ancho.

> ### 🟦 ¿Qué significa? — *`grid-row`*
> Es lo mismo que `grid-column` pero en vertical: indica **en qué filas se coloca un ítem**, también con `inicio / fin`. `grid-row: 1 / 3` haría que el ítem ocupe dos filas de alto. Sirve para elementos altos, como una barra lateral que abarca varias filas.

Hay un atajo muy cómodo con `span`:

```css
.tarjeta-destacada {
  grid-column: span 2; /* ocupa 2 columnas, empezando donde toque */
}
```

> ### 🟦 ¿Qué significa? — *`span`*
> Es una palabra clave que significa **"abarca esta cantidad de celdas"** sin tener que pensar en números de línea exactos. `span 2` quiere decir "ocupa 2 columnas (o filas) a partir de donde el ítem caiga naturalmente". Sirve para hacer que un elemento sea más ancho o más alto sin calcular líneas.

```css
.layout {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.banner {
  grid-column: span 4; /* ocupa las 4 columnas: ancho completo */
}

.principal {
  grid-column: span 3; /* ocupa 3 de las 4 columnas */
}

.lateral {
  grid-column: span 1; /* ocupa 1 columna */
}
```

> ### 🔎 En tu código
> En **tunal-digital**, podrías hacer que el primer servicio (el más importante) ocupe el doble de ancho que los demás con `grid-column: span 2`. Es una forma de crear jerarquía visual sin tocar el HTML: solo CSS. El contenido manda, la presentación la decide la hoja de estilos.

---

## 10. Zonas con nombre: `grid-template-areas`

Esta es, para mí, la forma más bonita y legible de maquetar páginas completas. En vez de pensar en números de línea, **dibujas el layout con palabras**.

> ### 🟦 ¿Qué significa? — *`grid-template-areas`*
> Es una propiedad que te deja **nombrar zonas de la cuadrícula y dibujar su disposición** como si fuera un mapa de texto. Cada palabra es una celda; palabras repetidas significan que esa zona se extiende. Sirve para definir layouts complejos de forma muy visual y fácil de leer. Es ideal para la estructura general de una app como **Faro/Organizer**.

Primero, en cada ítem le das un nombre con `grid-area`:

```css
.cabecera { grid-area: cabecera; }
.menu     { grid-area: menu; }
.contenido { grid-area: contenido; }
.pie      { grid-area: pie; }
```

Y luego, en el contenedor, dibujas el mapa:

```css
.app {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: 80px 1fr 60px;
  grid-template-areas:
    "cabecera cabecera"
    "menu     contenido"
    "pie      pie";
  min-height: 100vh;
}
```

Lee ese bloque de comillas como un dibujo:

- Fila 1: `cabecera cabecera` → la cabecera ocupa las **dos columnas** (ancho completo).
- Fila 2: `menu contenido` → el menú a la izquierda (200px), el contenido a la derecha (1fr).
- Fila 3: `pie pie` → el pie ocupa las dos columnas.

> ### 🟦 ¿Qué significa? — *`grid-area`*
> Es la propiedad que le pone un **nombre a un ítem** para que `grid-template-areas` sepa dónde colocarlo. El nombre que escribas aquí debe coincidir con el que uses en el mapa de zonas. Sirve para conectar cada elemento con su lugar en la cuadrícula.

¿No es precioso? Cualquiera que lea ese CSS entiende de un vistazo cómo se ve la página. Es prácticamente un dibujo en texto.

> ### 💡 Tip
> Si quieres dejar una celda **vacía** en el mapa, usa un punto `.` en su lugar. Por ejemplo `"menu ."` deja la zona de la derecha vacía en esa fila. Y recuerda: todas las filas del mapa deben tener el **mismo número de columnas**, o el navegador ignorará la regla.

> ### ⚠️ Cuidado
> Los nombres en `grid-template-areas` no llevan comillas individuales ni comas: cada fila completa va entre comillas dobles, y las filas se ponen una debajo de otra. Un error común es olvidar las comillas o poner comas entre palabras. Si tu layout "no hace nada", revisa primero la sintaxis del mapa.

---

## 11. Grid vs Flexbox: ¿cuándo uso cada uno?

Esta es la pregunta del millón, y la respuesta es más sencilla de lo que parece. 🦎

> ### 🟦 ¿Qué significa? — *Flexbox*
> Es el otro gran sistema de layout de CSS (lo viste en el capítulo anterior). Organiza elementos en **una sola dirección a la vez**: una fila *o* una columna. Sirve para alinear y distribuir un grupo de elementos en línea, como los botones de una barra o los ítems de un menú.

La regla mental que te recomiendo:

- **Flexbox = una dimensión.** Una fila o una columna. Ideal para: barras de navegación, alinear un icono junto a un texto, distribuir botones, centrar una cosa en su contenedor.
- **Grid = dos dimensiones.** Filas y columnas a la vez. Ideal para: la estructura general de la página, galerías de tarjetas, dashboards, cualquier cosa que sea una "cuadrícula" de verdad.

| Situación | Mejor herramienta |
|---|---|
| Barra de navegación horizontal | Flexbox |
| Centrar un botón dentro de una caja | Flexbox |
| Galería de tarjetas que se reacomoda | Grid |
| Layout cabecera + menú + contenido + pie | Grid |
| Lista de etiquetas (tags) en línea | Flexbox |
| Tablero con muchas zonas | Grid |

> ### 💡 Tip
> No es "Grid contra Flexbox": **se usan juntos todo el tiempo**. Es muy común usar Grid para la estructura grande de la página y, dentro de cada tarjeta o celda, usar Flexbox para alinear su contenido interno. Piensa en Grid como los planos de la casa y en Flexbox como cómo acomodas los muebles dentro de cada habitación.

> ### 🔎 En tu código
> En **RachaSimple** (React + Tailwind), verás muchísimo esta combinación: una rejilla de tarjetas con clases de grid, y dentro de cada tarjeta un `flex` para alinear el título, el icono y el botón. Saber distinguir cuándo toca uno u otro te hará escribir mucho menos CSS y más limpio.

---

## 12. Juntándolo todo: la cuadrícula `.tarjetas`

Vamos a reconstruir paso a paso la rejilla de tarjetas que usa este manual, para que veas todas las piezas trabajando juntas:

```css
.tarjetas {
  display: grid;                                       /* activa Grid */
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); /* columnas adaptables */
  gap: 1rem;                                           /* aire entre tarjetas */
  padding: 1rem;                                       /* aire alrededor de la rejilla */
}

.tarjeta {
  background: var(--color-tarjeta);                    /* color según el tema */
  border-radius: 8px;
  padding: 1rem;
}
```

Repasemos qué hace cada línea, ahora que ya conoces todos los conceptos:

1. `display: grid` activa la cuadrícula.
2. `repeat(auto-fit, minmax(220px, 1fr))` crea tantas columnas como quepan, de mínimo 220px, estirándose para llenar el ancho.
3. `gap: 1rem` separa las tarjetas entre sí.
4. `padding: 1rem` separa la rejilla del borde del contenedor.

> ### 🟦 ¿Qué significa? — *`var(--color-tarjeta)`*
> Es una **variable CSS**: un valor guardado bajo un nombre (que empieza con `--`) y reutilizado con `var()`. Sirve para no repetir el mismo color en mil sitios y para cambiar de tema (claro/oscuro) modificando una sola línea. El propio `estilos.css` de este manual usa variables CSS justo para sus temas, igual que aquí.

Con esas pocas líneas tienes una galería profesional, responsiva y que se adapta sola a cualquier pantalla. **Esa es la elegancia de Grid.** Antes esto requería decenas de líneas y trucos frágiles; hoy son cuatro propiedades bien elegidas.

> ### 🔎 En tu código
> Si abres el `styles.css` de **tunal-digital** y tienes una sección con varias cajas alineadas a mano (con floats o porcentajes), este es el momento perfecto para reemplazarla por una rejilla `auto-fit`. Menos código, más robusto y responsivo desde el primer momento. Pruébalo y verás cuántas líneas borras.

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Sé que `display: grid` convierte un elemento en contenedor de cuadrícula y afecta a sus hijos directos.
- [ ] Entiendo que `grid-template-columns` define el número y ancho de las columnas.
- [ ] Sé qué es la unidad `fr` y cómo reparte el espacio disponible de forma proporcional.
- [ ] Puedo usar `gap` para separar las celdas entre sí.
- [ ] Sé acortar definiciones con `repeat(N, 1fr)`.
- [ ] Entiendo `minmax()` y el patrón `repeat(auto-fit, minmax(220px, 1fr))` para rejillas responsivas.
- [ ] Distingo `auto-fit` de `auto-fill`.
- [ ] Puedo colocar un ítem con `grid-column` / `grid-row` y con `span`.
- [ ] Sé dibujar un layout con `grid-template-areas` y `grid-area`.
- [ ] Tengo claro cuándo usar Grid (dos dimensiones) y cuándo Flexbox (una dimensión).

---

## 🧪 Ejercicios

1. **En papel (sin computadora).** Dibuja una rejilla de 3 columnas y 2 filas. Numera todas las líneas verticales y horizontales. Luego marca qué celdas ocuparía un ítem con `grid-column: 1 / 3` y `grid-row: 1 / 2`. Esto entrena tu intuición sobre las líneas de la cuadrícula.

2. **💻 Primera rejilla.** En un archivo HTML con un `<div class="tarjetas">` que contenga 6 `<div class="tarjeta">`, escribe en CSS una cuadrícula de 3 columnas iguales con `repeat(3, 1fr)` y `gap: 16px`. Observa cómo se acomodan las 6 tarjetas en dos filas de tres.

3. **💻 Rejilla responsiva.** Cambia el ejercicio anterior a `grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))`. Redimensiona la ventana del navegador (hazla angosta y luego ancha) y observa cómo cambia el número de columnas **sin tocar nada más**. Anota cuántas tarjetas por fila ves en cada tamaño.

4. **💻 Tarjeta destacada.** Sobre la rejilla del ejercicio 2, haz que la primera tarjeta ocupe dos columnas usando `grid-column: span 2`. Comprueba cómo el resto se reacomoda alrededor.

5. **💻 Layout completo con áreas.** Crea una página con cuatro zonas: `cabecera`, `menu`, `contenido` y `pie`. Usa `grid-template-areas` para que la cabecera y el pie ocupen todo el ancho, y el menú quede a la izquierda del contenido. Pista: revisa el ejemplo de la sección 10.

6. **💻 Grid + Flexbox juntos.** Toma cualquier tarjeta de tu rejilla y, dentro de ella, usa Flexbox (`display: flex`) para alinear un título arriba y un botón abajo del todo. Así practicas la combinación real que verás en proyectos como **RachaSimple** y **Faro/Organizer**.

---

> ¡Lo lograste! 🦎 Hoy aprendiste la herramienta más poderosa de CSS para maquetar. Si al principio `repeat(auto-fit, minmax(...))` te pareció un trabalenguas, no te preocupes: con dos o tres ejercicios se vuelve tu mejor amiga. La próxima vez que veas una galería de tarjetas perfectamente alineada en cualquier web, sabrás exactamente cómo está hecha. Descansa, hidrátate, y nos vemos en el siguiente capítulo. — Bit
