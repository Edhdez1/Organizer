# Capítulo 15 — Glosario de CSS y mapa

<p align="center">
  <img src="../../recursos/imagenes/02-css/cap15.png" alt="Ilustración del capítulo (pixel art con Bit)" width="640">
</p>


> ¡Llegaste al final del módulo de CSS! 🎉 Bit, el ajolote, está flotando feliz en su pecera porque ya recorrieron juntos un montón de conceptos: selectores, cajas, colores, flexbox, grid, variables y más. Este capítulo es distinto a los demás: no aprenderás cosas nuevas, sino que **ordenarás** lo que ya sabes. Es como cuando terminas de armar un rompecabezas y por fin lo ves completo. Aquí tienes un **glosario alfabético** con cada término explicado en pocas líneas, un **mapa mental** para ver cómo se conecta todo, y un **repaso final** para confirmar que dominas el módulo. Tómalo con calma, como un café tranquilo: lee, asiente con la cabeza y date cuenta de cuánto avanzaste.

---

## 1. Cómo usar este glosario

Imagina que CSS es una ciudad y cada término es una calle. Durante el módulo caminaste por ellas una por una. Ahora vamos a colgar el mapa en la pared para que veas la ciudad entera desde arriba.

Cada entrada del glosario sigue esta forma:

- **Definición simple**: qué es, en palabras de todos los días.
- **Para qué sirve**: por qué te importa.
- **Dónde se usa en un repo real**: en cuál de tus proyectos (tunal-digital, RachaSimple, Faro/Organizer) aparece de verdad.

> ### 💡 Tip
> No intentes memorizar el glosario de golpe. Léelo hoy, vuelve mañana y fíjate cuántos términos ya te suenan familiares. La memoria de los conceptos de programación se construye por repetición espaciada, no por atracones.

> ### 🔎 En tu código
> Casi todos los ejemplos de este capítulo apuntan a `styles.css` de **tunal-digital**, que fue el archivo principal del módulo. Tenlo abierto en otra pestaña mientras lees: ver el término real en su contexto vale por mil definiciones.

---

## 2. Glosario alfabético

Vamos por orden alfabético, para que puedas volver a buscar cualquier palabra rápido, como en un diccionario.

### A — B

> ### 🟦 ¿Qué significa? — *Atributo (selector de atributo)*
> Un selector que apunta a elementos según un atributo HTML, como `[type="email"]` o `[href]`. Sirve para estilar elementos sin necesidad de ponerles una clase. En `styles.css` de **tunal-digital** podrías usar `input[type="text"]` para dar el mismo borde a todos los campos de texto del formulario de contacto.

> ### 🟦 ¿Qué significa? — *Border (borde)*
> Es la línea que rodea una caja, entre el padding y el margin. Sirve para separar visualmente elementos y darles forma. En **tunal-digital**, las tarjetas de servicios suelen llevar `border: 1px solid #ddd;` para que se note dónde empieza y termina cada una.

> ### 🟦 ¿Qué significa? — *Box model (modelo de cajas)*
> El modelo que dice que cada elemento es una caja con cuatro capas: contenido, padding, border y margin. Sirve para entender el espacio que ocupa cualquier cosa en la página. Es la base de **todo** el layout de `styles.css`: sin entenderlo, los espacios se vuelven un misterio.

> ### 🟦 ¿Qué significa? — *box-sizing*
> Una propiedad que decide si el ancho que escribes incluye el padding y el border (`border-box`) o no (`content-box`). Sirve para que las cajas no se "inflen" inesperadamente. En `styles.css` casi siempre se pone `box-sizing: border-box;` al inicio para que medir sea predecible.

```css
/* Patrón clásico al inicio de styles.css */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
```

### C

> ### 🟦 ¿Qué significa? — *Cascada (cascade)*
> Es el conjunto de reglas que decide qué estilo gana cuando varios apuntan al mismo elemento. Sirve para resolver conflictos de forma ordenada (importa el origen, la especificidad y el orden). La "C" de CSS viene justamente de "Cascading". En `styles.css` la cascada decide, por ejemplo, si gana el color del `body` o el de una clase más específica.

> ### 🟦 ¿Qué significa? — *Clase (class)*
> Un selector que empieza con punto, como `.boton`, y apunta a todos los elementos con ese `class` en el HTML. Sirve para reutilizar el mismo estilo en muchos sitios. En **tunal-digital**, `.tarjeta-servicio` se aplica a cada bloque de servicio repetido.

> ### 🟦 ¿Qué significa? — *Color*
> El valor que define tonos de texto, fondos y bordes. Se escribe con nombres (`red`), hex (`#3b82f6`), `rgb()` o `hsl()`. Sirve para dar identidad visual. En `styles.css` los colores de marca de **tunal-digital** suelen guardarse en variables para no repetir el hex por todos lados.

> ### 🟦 ¿Qué significa? — *Comentario*
> Texto que el navegador ignora, escrito entre `/* */`. Sirve para dejar notas a tu yo del futuro o a tu equipo. En cualquier `styles.css` ordenado verás comentarios como `/* Sección hero */` separando bloques.

### D — E

> ### 🟦 ¿Qué significa? — *Declaración*
> La pareja de una propiedad y su valor, como `color: blue;`. Sirve como la unidad mínima de estilo: una orden concreta. Cada línea dentro de las llaves `{ }` de `styles.css` es una declaración.

> ### 🟦 ¿Qué significa? — *display*
> La propiedad que decide cómo se comporta una caja: en bloque (`block`), en línea (`inline`), como contenedor flexible (`flex`) o de rejilla (`grid`). Sirve para controlar el flujo del layout. En `styles.css`, `display: flex;` en el `<nav>` de **tunal-digital** pone los enlaces en fila.

> ### 🟦 ¿Qué significa? — *Especificidad (specificity)*
> Un sistema de "puntos" que mide qué tan específico es un selector; el más específico gana en la cascada. Sirve para predecir qué estilo se aplica. Un id (`#hero`) pesa más que una clase (`.hero`), y esa pesa más que una etiqueta (`section`). Saber esto evita horas de pelea con `styles.css`.

```css
/* Más específico (id) gana sobre menos específico (etiqueta) */
section { color: gray; }   /* especificidad baja */
#hero   { color: black; }  /* especificidad alta: este gana */
```

### F

> ### 🟦 ¿Qué significa? — *Flexbox*
> Un sistema de layout en **una dimensión** (fila o columna) que reparte el espacio entre elementos. Sirve para alinear y distribuir cosas con facilidad, como una barra de navegación o una fila de botones. En **tunal-digital**, el menú superior usa flexbox; en **RachaSimple**, Tailwind lo expresa con clases como `flex items-center`.

> ### 🟦 ¿Qué significa? — *flex-direction*
> La propiedad de flexbox que decide si los hijos van en fila (`row`) o en columna (`column`). Sirve para cambiar la orientación sin tocar el HTML. En `styles.css`, cambiar a `flex-direction: column;` apila el menú en pantallas pequeñas.

> ### 🟦 ¿Qué significa? — *Fuente (font-family)*
> La propiedad que elige el tipo de letra. Sirve para darle voz y carácter al texto. En **tunal-digital** se suele definir `font-family` en el `body` para que toda la página herede la misma tipografía.

### G

> ### 🟦 ¿Qué significa? — *Grid (CSS Grid)*
> Un sistema de layout en **dos dimensiones** (filas y columnas a la vez). Sirve para construir cuadrículas completas, como una galería o un dashboard. En **tunal-digital**, la sección de servicios puede ser una rejilla con `display: grid; grid-template-columns: repeat(3, 1fr);`.

> ### 🟦 ¿Qué significa? — *gap*
> La propiedad que pone espacio **entre** los elementos de un flexbox o grid, sin afectar los bordes externos. Sirve para separar tarjetas o columnas limpiamente. Reemplaza el truco viejo de poner margin a cada hijo. En `styles.css`, `gap: 1rem;` separa las tarjetas de servicios.

```css
.servicios {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 columnas iguales */
  gap: 1.5rem;                            /* espacio entre tarjetas */
}
```

### H

> ### 🟦 ¿Qué significa? — *Herencia (inheritance)*
> El mecanismo por el que algunos estilos pasan de un elemento padre a sus hijos automáticamente (como `color` o `font-family`). Sirve para no repetir reglas. En `styles.css`, si pones `color` en el `body`, casi todo el texto de **tunal-digital** lo hereda sin que escribas nada más.

> ### 🟦 ¿Qué significa? — *Hex (color hexadecimal)*
> Una forma de escribir colores con `#` y seis dígitos, como `#3b82f6`. Sirve para precisar tonos exactos de marca. En las variables de color de **tunal-digital** los valores de marca casi siempre están en hex.

> ### 🟦 ¿Qué significa? — *hover (pseudo-clase :hover)*
> Un estado que se activa cuando el cursor pasa por encima de un elemento. Sirve para dar feedback al usuario, como cambiar el color de un botón al apuntarlo. En `styles.css`, `.boton:hover { background: #2563eb; }` hace que el botón reaccione al ratón.

### I — L

> ### 🟦 ¿Qué significa? — *id (selector de id)*
> Un selector que empieza con `#`, como `#hero`, y apunta a **un único** elemento. Sirve para estilar algo que aparece una sola vez. Pesa mucho en especificidad, así que se usa con cuidado en `styles.css`.

> ### 🟦 ¿Qué significa? — *inline (display inline)*
> Un comportamiento de caja que fluye dentro del texto, sin saltos de línea, como un `<span>` o un `<a>`. Sirve para resaltar palabras sin romper el párrafo. En `styles.css`, los enlaces dentro de un texto son inline por defecto.

> ### 🟦 ¿Qué significa? — *!important*
> Una marca que fuerza a que una declaración gane casi siempre, saltándose la especificidad normal. Sirve para emergencias, pero conviene evitarla porque ensucia la cascada. Si ves `!important` por todos lados en un `styles.css`, suele ser señal de problemas de orden.

### M

> ### 🟦 ¿Qué significa? — *Margin (margen)*
> El espacio **por fuera** del borde de una caja, que la separa de sus vecinas. Sirve para dar aire entre elementos. En `styles.css`, `margin: 0 auto;` es el truco clásico para centrar un contenedor horizontalmente en **tunal-digital**.

> ### 🟦 ¿Qué significa? — *Media query*
> Una regla `@media` que aplica estilos solo si se cumple una condición, como un ancho de pantalla. Sirve para hacer diseño **responsive** (que se adapte a móvil y escritorio). En `styles.css`, `@media (max-width: 600px)` reacomoda el menú de **tunal-digital** en celulares.

```css
/* Responsive: en pantallas pequeñas, una sola columna */
@media (max-width: 600px) {
  .servicios {
    grid-template-columns: 1fr;
  }
}
```

### O — P

> ### 🟦 ¿Qué significa? — *Padding (relleno)*
> El espacio **por dentro** de la caja, entre el contenido y el borde. Sirve para que el texto no quede pegado al borde. En `styles.css`, las tarjetas de **tunal-digital** llevan `padding: 1rem;` para respirar por dentro.

> ### 🟦 ¿Qué significa? — *position*
> La propiedad que controla cómo se ubica una caja: `static` (normal), `relative`, `absolute`, `fixed` o `sticky`. Sirve para sacar elementos del flujo o fijarlos en pantalla. En `styles.css`, un encabezado que se queda arriba al hacer scroll usa `position: sticky; top: 0;`.

> ### 🟦 ¿Qué significa? — *Propiedad*
> El nombre de la característica que quieres cambiar, como `color`, `margin` o `display`. Sirve como la "qué" de cada orden de estilo. En la declaración `color: blue;`, la propiedad es `color`.

> ### 🟦 ¿Qué significa? — *Pseudo-clase*
> Una palabra clave con `:` que apunta a un **estado** del elemento, como `:hover`, `:focus` o `:first-child`. Sirve para estilar según lo que ocurre o la posición. En `styles.css`, `:focus` mejora la accesibilidad de los campos del formulario de **tunal-digital**.

> ### 🟦 ¿Qué significa? — *Pseudo-elemento*
> Una palabra clave con `::` que apunta a una **parte** del elemento o crea contenido, como `::before`, `::after` o `::placeholder`. Sirve para decorar sin tocar el HTML. En `styles.css`, `::after` puede añadir un pequeño adorno a un título.

### R — S

> ### 🟦 ¿Qué significa? — *rem / em (unidades relativas)*
> Unidades de tamaño que dependen de la fuente: `rem` se basa en el tamaño raíz del documento, `em` en el del elemento. Sirven para escalar de forma consistente y accesible. En `styles.css`, usar `rem` para `padding` y tipografía mantiene **tunal-digital** proporcionado al cambiar el zoom.

> ### 🟦 ¿Qué significa? — *Regla (rule)*
> El bloque completo: un selector más sus declaraciones entre llaves. Sirve como la unidad que el navegador lee y aplica. Cada `selector { ... }` de `styles.css` es una regla.

> ### 🟦 ¿Qué significa? — *Selector*
> El patrón que decide **a qué** elementos se aplica un estilo, como `.boton`, `#hero` o `p`. Sirve para apuntar con precisión. Es el primer ingrediente de toda regla en `styles.css`.

### T

> ### 🟦 ¿Qué significa? — *Tailwind (CSS de utilidades)*
> Un framework que te da clases pequeñas listas para usar (`p-4`, `flex`, `text-blue-500`) que escribes directo en el HTML/JSX. Sirve para estilar rápido sin escribir CSS a mano. **RachaSimple** y **Faro/Organizer** lo usan; **tunal-digital** no (ahí escribes `styles.css` directo).

> ### 🟦 ¿Qué significa? — *transition*
> La propiedad que hace que un cambio de estilo ocurra de forma **gradual** en vez de instantánea. Sirve para suavizar efectos, como un botón que cambia de color despacio al pasar el cursor. En `styles.css`, `transition: background 0.2s;` hace que el `:hover` se sienta suave.

```css
.boton {
  background: #3b82f6;
  transition: background 0.2s ease; /* cambio suave */
}
.boton:hover {
  background: #2563eb;
}
```

### U — V

> ### 🟦 ¿Qué significa? — *Unidad*
> El sufijo que da medida a un número: `px`, `%`, `rem`, `em`, `vh`, `vw`. Sirve para decir "cuánto" de forma exacta o relativa. En `styles.css`, mezclas `px` para detalles finos y `%` o `rem` para tamaños que se adaptan.

> ### 🟦 ¿Qué significa? — *Valor*
> El "cuánto" o "cuál" de una declaración, como `blue` en `color: blue;` o `1rem` en `padding: 1rem;`. Sirve como la respuesta concreta a la propiedad. Cada propiedad acepta sus propios tipos de valor.

> ### 🟦 ¿Qué significa? — *Variable CSS (custom property)*
> Un valor con nombre que defines una vez (`--color-marca: #3b82f6;`) y reutilizas con `var(--color-marca)`. Sirve para cambiar toda la paleta desde un solo lugar y para hacer **temas** (claro/oscuro). El propio `estilos.css` de este manual usa variables para sus temas; en `styles.css` de **tunal-digital** guardan los colores de marca así.

```css
:root {
  --color-marca: #3b82f6;
  --espacio: 1rem;
}
.boton {
  background: var(--color-marca);
  padding: var(--espacio);
}
```

> ### 🟦 ¿Qué significa? — *vh / vw (viewport height/width)*
> Unidades relativas al tamaño de la **ventana**: `100vh` es toda la altura visible, `100vw` todo el ancho. Sirven para secciones a pantalla completa. En `styles.css`, una sección hero a `min-height: 100vh;` ocupa toda la pantalla al cargar **tunal-digital**.

### Z

> ### 🟦 ¿Qué significa? — *z-index*
> Un número que decide qué elemento queda **encima** de otro cuando se superponen. Sirve para controlar capas, como un menú que debe tapar el contenido. En `styles.css`, un encabezado `sticky` suele llevar un `z-index` alto para que nada lo cubra. Solo funciona en elementos con `position` distinto de `static`.

> ### ⚠️ Cuidado
> `z-index` solo tiene efecto si el elemento tiene `position: relative`, `absolute`, `fixed` o `sticky`. Si pones `z-index` sobre un elemento `static`, no pasa nada y te volverás loco buscando el porqué. Bit ya cayó en esa trampa varias veces. 🐾

---

## 3. Mapa mental de CSS

Aquí está la ciudad vista desde arriba. Léelo de arriba hacia abajo: las ramas grandes son los grandes temas del módulo, y las hojas son los términos que ya conoces.

```
                        ┌─────────────────────────┐
                        │           CSS           │
                        │ (dar estilo al HTML)     │
                        └────────────┬────────────┘
                                     │
        ┌────────────┬───────────────┼───────────────┬────────────────┐
        │            │               │               │                │
   ┌────▼────┐  ┌────▼─────┐   ┌─────▼──────┐  ┌──────▼──────┐  ┌──────▼──────┐
   │ SINTAXIS│  │ CÓMO GANA│   │   CAJAS    │  │   LAYOUT    │  │ DINÁMICO Y  │
   │         │  │ UN ESTILO│   │ (box model)│  │             │  │ REUTILIZAR  │
   └────┬────┘  └────┬─────┘   └─────┬──────┘  └──────┬──────┘  └──────┬──────┘
        │            │               │                │                │
   • selector   • cascada       • content        • display       • variables
   • propiedad  • especificidad • padding         • flexbox         (var/--)
   • valor      • herencia      • border          • grid          • transition
   • declaración• !important    • margin          • gap           • pseudo-clase
   • regla                      • box-sizing      • position        (:hover)
   • comentario                 • width/height    • z-index       • pseudo-elemento
                                                  • media query     (::before)
                                                                  • Tailwind
                                                                    (en RachaSimple/
                                                                     Faro)
```

> ### 💡 Tip
> Fíjate en cómo las cinco ramas cuentan una historia: primero **escribes** una regla (sintaxis), luego el navegador decide **cuál gana** (cascada), esa regla afecta una **caja**, las cajas se acomodan con **layout**, y finalmente le das vida y orden con cosas **dinámicas y reutilizables**. Si entiendes esa secuencia, entiendes CSS.

> ### 🔎 En tu código
> El mapa aplica igual aunque uses Tailwind. Cuando en **RachaSimple** escribes `class="flex gap-4 p-2 hover:bg-blue-600"`, estás usando display + gap + padding + pseudo-clase, exactamente los mismos conceptos del mapa, solo que con nombres cortos. Tailwind no reemplaza CSS: lo empaqueta.

---

## 4. Repaso final (en vez de teoría nueva)

En lugar de enseñarte algo nuevo, recorramos rápido los puntos clave del módulo, como quien repasa apuntes antes de cerrar el cuaderno.

**1. Toda regla tiene tres partes.** Selector, propiedad y valor. Si te pierdes, vuelve a esto: `¿a quién?` (selector), `¿qué le cambio?` (propiedad), `¿a cuánto?` (valor).

**2. Cuando dos estilos pelean, gana la combinación de cascada + especificidad + orden.** Lo más específico, y a igual especificidad, lo que aparece **después** en el archivo. La herencia rellena lo que no especificas.

**3. Todo es una caja.** Contenido, padding, border, margin. Con `box-sizing: border-box;` medir se vuelve sencillo.

**4. Para acomodar cajas usas flexbox (una dimensión) o grid (dos dimensiones).** Y `gap` para separarlas con elegancia.

**5. Para que se adapte a móvil, usas media queries.** Y para reutilizar valores y hacer temas, usas variables CSS.

> ### 🟦 ¿Qué significa? — *Responsive (diseño adaptable)*
> Un sitio que se ve bien en cualquier tamaño de pantalla, de celular a monitor grande. Se logra con media queries y unidades relativas. Sirve para no dejar fuera a quien navega desde el móvil, que hoy es la mayoría. En **tunal-digital**, el responsive es lo que hace que el menú se reacomode en pantallas pequeñas.

> ### ⚠️ Cuidado
> No confundas **padding** (espacio por dentro) con **margin** (espacio por fuera). Es el error más común al empezar. Truco de Bit: padding es el **acolchado dentro** de un sobre; margin es la **distancia entre dos sobres** en la mesa. ✉️

> ### 💡 Tip
> Si alguna vez un estilo "no funciona", revisa en este orden: (1) ¿el selector apunta bien? (2) ¿hay otra regla más específica ganándole? (3) ¿el elemento tiene el `display` o `position` correcto para lo que intentas? El 90% de los problemas de CSS están en uno de esos tres.

---

## 5. Lo que sigue

Cerraste el módulo de CSS con un mapa completo en la cabeza. Ya sabes escribir reglas, ganar peleas de cascada, construir layouts y reutilizar estilos. Cuando entres a frameworks como Tailwind en **RachaSimple** o **Faro/Organizer**, no estarás aprendiendo algo nuevo desde cero: estarás aplicando estos mismos conceptos con otra ropa. Y eso, créeme, es una ventaja enorme.

Bit te choca la patita. 🐾 Próxima parada: dar interactividad de verdad con JavaScript, donde el `main.js` de **tunal-digital** por fin tendrá su capítulo. Pero eso es otra historia.

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Sé nombrar las tres partes de una regla: selector, propiedad y valor.
- [ ] Puedo explicar con mis palabras qué es la cascada y la especificidad.
- [ ] Distingo padding de margin sin dudar.
- [ ] Entiendo el modelo de cajas y para qué sirve `box-sizing: border-box;`.
- [ ] Sé cuándo usar flexbox (una dimensión) y cuándo grid (dos dimensiones).
- [ ] Puedo escribir una media query básica para hacer un sitio responsive.
- [ ] Sé declarar y reutilizar una variable CSS con `var()`.
- [ ] Reconozco pseudo-clases (`:hover`) y pseudo-elementos (`::before`).
- [ ] Entiendo que Tailwind en RachaSimple y Faro usa estos mismos conceptos con clases cortas.
- [ ] Puedo dibujar de memoria el mapa mental de las cinco ramas de CSS.

---

## 🧪 Ejercicios

1. **Sin computadora.** En una hoja, escribe los cinco grandes temas del mapa mental (sintaxis, cascada, cajas, layout, dinámico) y cuelga al menos cuatro términos bajo cada uno, de memoria. Luego compara con el mapa del capítulo.

2. **Sin computadora.** Explícale a alguien (o a Bit en voz alta) la diferencia entre padding y margin usando tu propia analogía, distinta a la del sobre.

3. 💻 Abre `styles.css` de **tunal-digital** y busca un ejemplo real de cada uno de estos términos: una clase, una pseudo-clase, una media query y una variable CSS. Anota en qué línea está cada uno.

4. 💻 En `styles.css`, encuentra una regla y reescríbela en un comentario nombrando sus partes, así: `/* selector: .boton | propiedad: color | valor: white */`. Hazlo con tres reglas distintas.

5. 💻 Toma un componente de **RachaSimple** con clases de Tailwind (por ejemplo algo con `flex gap-4 p-2`) y, debajo, escribe en un comentario el CSS "tradicional" equivalente que harías en `styles.css`. Comprueba que entiendes la traducción.

6. 💻 Crea un archivo nuevo `repaso.css` y, sin mirar el manual, escribe de memoria: una variable en `:root`, una regla con `:hover` y `transition`, y una media query. Luego revisa el glosario para verificar que la sintaxis quedó bien.
