# Capítulo 12 — Cómo se unen HTML, CSS y JavaScript

<p align="center">
  <img src="../../recursos/imagenes/01-html/cap12.png" alt="Ilustración del capítulo (pixel art con Bit)" width="640">
</p>


> Hasta ahora has trabajado el HTML por su cuenta: etiquetas, texto, formularios, tablas, accesibilidad. Pero una página de verdad nunca anda sola. El HTML es solo uno de tres compañeros que trabajan en equipo. En este capítulo vas a ver cómo el HTML llama al CSS para vestir la página y al JavaScript para darle vida, en qué orden carga cada cosa, y qué es ese "DOM" que aparece por todos lados. Bit, el ajolote pixelado, dice que este es el capítulo donde por fin se arma "la foto completa". Respira, que vamos sin prisa.

## 1. Tres amigos, tres trabajos

Imagina que construyes una casa. Necesitas tres cosas que no tienen nada que ver entre sí: los **muros y las habitaciones** (la estructura), la **pintura y los muebles** (el aspecto), y los **interruptores y la puerta automática** (lo que reacciona cuando alguien toca algo). En una página web esos tres papeles tienen nombre:

- **HTML** = la estructura. Qué hay en la página: títulos, párrafos, botones, imágenes.
- **CSS** = el estilo. Cómo se ve: colores, tamaños, espacios, tipografías.
- **JavaScript** = el comportamiento. Qué pasa cuando el usuario hace algo: clics, menús que se abren, cambios de idioma.

> ### 🟦 ¿Qué significa? — *CSS*
> CSS son las siglas de *Cascading Style Sheets* ("hojas de estilo en cascada"). Es un lenguaje aparte del HTML que sirve para decir **cómo se ve** cada cosa: este texto en naranja, este recuadro con bordes redondeados, esta sección con fondo oscuro.
> **¿Para qué sirve?** Para separar el aspecto del contenido. El HTML dice "esto es un título"; el CSS dice "los títulos van grandes y en color crema".
> **¿Dónde se usa en tu proyecto?** En **tunal-digital** vive en el archivo `sitio-web/styles.css`. Ahí, lo primero que hace es definir los colores de marca: el "carbón" oscuro del fondo, el naranja del amanecer.

> ### 🟦 ¿Qué significa? — *JavaScript (JS)*
> JavaScript es un lenguaje de programación que el navegador entiende y ejecuta. Mientras el HTML y el CSS solo "describen", JavaScript **actúa**: cambia textos, abre y cierra menús, reacciona a clics.
> **¿Para qué sirve?** Para que la página haga cosas en vivo, sin recargarse.
> **¿Dónde se usa en tu proyecto?** En **tunal-digital**, el archivo `sitio-web/main.js` cambia el idioma del sitio entre español e inglés, abre el menú de navegación y hace que el fondo reaccione al cursor.

> ### 💡 Tip — La regla de oro de la separación
> Una página bien hecha mantiene los tres por separado: el **qué** en el HTML, el **cómo se ve** en el CSS, el **qué hace** en el JS. Si mezclas todo en un solo archivo, funciona, sí, pero después cambiar cualquier cosa se vuelve un dolor de cabeza. Por eso tunal-digital tiene tres archivos distintos: `index.html`, `styles.css` y `main.js`.

Lo bonito es que **el HTML es el jefe de la reunión**: es el archivo que el navegador abre primero, y es él quien dice "oye, también carga este CSS y este JavaScript". Veamos cómo lo hace.

## 2. Cómo el HTML llama al CSS

El HTML enlaza una hoja de estilos con la etiqueta `<link>`, que ya viste de pasada en el capítulo del `<head>`. Aquí la tienes, sacada del archivo real de tunal-digital:

```html
<link rel="stylesheet" href="styles.css?v=20260605">
```

Vamos palabra por palabra, porque cada parte cuenta.

> ### 🟦 ¿Qué significa? — *etiqueta `<link>`*
> `<link>` es una etiqueta de HTML que conecta el documento con un archivo externo. Por sí misma no muestra nada en pantalla; solo dice "tráete este recurso".
> **¿Para qué sirve?** Su uso más común es enlazar la hoja de estilos CSS. También sirve para íconos, fuentes, etc.
> **¿Dónde se usa en tu proyecto?** En `sitio-web/index.html` de tunal-digital hay varios `<link>`: uno para el ícono de la pestaña, otros para las fuentes de Google, y el de `styles.css`.

> ### 🟦 ¿Qué significa? — *atributo `rel`*
> Un **atributo** es información extra que va dentro de una etiqueta. `rel` viene de *relation* (relación) y explica **qué tipo de conexión** es. Cuando vale `rel="stylesheet"`, le dice al navegador: "este link es una hoja de estilos, aplícala".
> **¿Para qué sirve?** Para que el navegador sepa qué hacer con el archivo enlazado. Sin `rel="stylesheet"`, no entendería que ese CSS hay que aplicarlo.

> ### 🟦 ¿Qué significa? — *atributo `href`*
> `href` viene de *hypertext reference* (referencia de hipertexto). Es **la dirección del archivo** que quieres traer: aquí, `styles.css`, que vive junto al `index.html`.
> **¿Para qué sirve?** Para indicar dónde está el recurso. Ya lo conocías de los enlaces `<a href="...">`; aquí hace lo mismo: apunta a un destino.

¿Y ese `?v=20260605` del final? Es un truco la mar de útil.

> ### 🟦 ¿Qué significa? — *cache-buster (rompe-caché)*
> El navegador **guarda copias** de los archivos para no descargarlos cada vez (eso es la *caché*, su memoria temporal). El problema viene cuando cambias el CSS: el usuario puede seguir viendo la copia vieja. Añadir `?v=20260605` (una "versión") hace que el navegador crea que es un archivo nuevo y lo descargue otra vez.
> **¿Para qué sirve?** Para forzar que los visitantes vean tus cambios de estilo recientes.
> **¿Dónde se usa en tu proyecto?** En tunal-digital se usa en `styles.css?v=20260605` y también en los scripts: `main.js?v=20260607`. Cada vez que Edwar toca el archivo, sube ese número.

> ### ⚠️ Cuidado — `<link>` no se cierra
> `<link>` es una etiqueta **vacía**: no lleva contenido dentro ni etiqueta de cierre `</link>`. Va sola. Lo mismo pasaba con `<img>` y `<meta>`. Si la cierras igual, no rompe nada, pero es de más.

### ¿Dónde va el `<link>` del CSS?

Va **dentro del `<head>`**, antes de que empiece el `<body>`. ¿Por qué tan arriba? Porque quieres que los estilos estén listos **antes** de que el navegador dibuje el contenido. Si el CSS llegara tarde, por un instante verías la página "desnuda" (texto negro sobre blanco) antes de que se vista. A eso, en jerga, se le llama "flash de contenido sin estilo", y queda feo.

```html
<head>
  <meta charset="UTF-8">
  <title>Tunal Digital</title>
  <link rel="stylesheet" href="styles.css?v=20260605">
</head>
```

> ### 🔎 En tu código
> Abre `sitio-web/index.html` de tunal-digital y busca la línea del `<link rel="stylesheet">`. Verás que está dentro del `<head>`, junto a los `<meta>` y al `<title>`. Justo arriba hay otros `<link>` que traen las fuentes de Google (la tipografía Fraunces para los títulos y Hanken Grotesk para el cuerpo). Todo el "vestuario" se carga aquí.

## 3. Cómo el HTML llama al JavaScript

El JavaScript se enlaza con la etiqueta `<script>`. En tunal-digital la línea real es esta:

```html
<script defer src="main.js?v=20260607"></script>
```

> ### 🟦 ¿Qué significa? — *etiqueta `<script>`*
> `<script>` es la etiqueta que carga y ejecuta código JavaScript en la página. Puede llevar el código escrito dentro, o (lo más común y ordenado) apuntar a un archivo externo con el atributo `src`.
> **¿Para qué sirve?** Para darle comportamiento a la página: que reaccione a clics, cambie textos, valide formularios.
> **¿Dónde se usa en tu proyecto?** En `index.html` de tunal-digital hay un `<script defer src="main.js">` que trae toda la lógica del sitio (menú, cambio de idioma, animaciones).

> ### 🟦 ¿Qué significa? — *atributo `src`*
> `src` viene de *source* (fuente, origen). Es **la dirección del archivo de código** que quieres cargar, igual que `href` lo era para el CSS. Aquí apunta a `main.js`.
> **¿Para qué sirve?** Para no escribir todo el JavaScript dentro del HTML, sino tenerlo en su propio archivo, ordenado y reutilizable.

> ### ⚠️ Cuidado — `<script src>` SÍ se cierra
> A diferencia de `<link>`, la etiqueta `<script>` **sí lleva cierre**: `</script>`. Aunque uses `src` y no escribas nada dentro, debes ponerlo: `<script src="main.js"></script>`. Si lo olvidas, el navegador se lía y a veces "se come" el resto de la página. Bit ha visto a más de un principiante pelearse una hora con esto.

### El problema del orden y la solución `defer`

Aquí viene la parte más importante del capítulo, así que vamos con calma. El navegador lee el HTML **de arriba hacia abajo**, línea por línea. Cuando se topa con un `<script>` normal (sin nada especial), se **detiene**, descarga el archivo, lo ejecuta, y solo entonces sigue leyendo el resto del HTML.

Eso trae dos problemas:

1. **Lentitud:** mientras el script descarga, el usuario ve una página congelada.
2. **Elementos que aún no existen:** si tu JavaScript intenta tocar un botón que está más abajo en el HTML y el script corrió antes de que ese botón existiera... no lo encuentra, y falla.

Aquí entra `defer`, que es la solución limpia.

> ### 🟦 ¿Qué significa? — *atributo `defer`*
> `defer` significa "aplazar". Le dice al navegador: "descarga este script en segundo plano mientras sigues leyendo el HTML, y **ejecútalo al final**, cuando toda la página ya esté construida".
> **¿Para qué sirve?** Para dos cosas a la vez: que la página no se congele, y que cuando tu código corra, **todos los elementos ya existan** y los pueda encontrar.
> **¿Dónde se usa en tu proyecto?** En tunal-digital, `main.js` se carga con `defer`. Por eso su código puede buscar el botón del menú o los enlaces de idioma sin miedo: para cuando corre, ya están todos ahí.

`defer` tiene un primo llamado `async`. Conviene saber qué hace, aunque casi siempre vayas a querer `defer`.

> ### 🟦 ¿Qué significa? — *atributo `async`*
> `async` significa "asíncrono". También descarga el script en segundo plano sin congelar la página, **pero lo ejecuta apenas termina de descargar**, sin esperar a nada ni respetar el orden con otros scripts.
> **¿Para qué sirve?** Para scripts **independientes**, que no dependen del resto de la página ni de otros scripts: por ejemplo, herramientas de medición o estadísticas.
> **¿Dónde se usa en tu proyecto?** En tunal-digital, el script de estadísticas de Cloudflare se carga con `async` (línea `<script defer src='...beacon.min.js' ...>` para las analíticas): no toca tu contenido, así que da igual cuándo corra.

Esta tablita mental resume la diferencia:

| Cómo lo escribes | ¿Congela la página? | ¿Cuándo se ejecuta? |
|---|---|---|
| `<script src="...">` (normal) | Sí, se detiene a esperarlo | En el momento, antes de seguir el HTML |
| `<script defer src="...">` | No | Al final, con la página ya completa, en orden |
| `<script async src="...">` | No | Apenas termina de descargar, sin orden |

> ### 💡 Tip — Tu regla por defecto
> Para tu propio código (como `main.js`), usa **`defer`**. Es el que respeta el orden y te asegura que la página esté lista. Deja `async` para scripts ajenos que no dependan de tu HTML. Y huye del `<script>` normal sin nada: es el más lento de los tres.

> ### 🔎 En tu código
> En `index.html` de tunal-digital, los scripts de marca van al final del `<body>`, ambos con `defer`:
>
> ```html
> <script defer src="lib/manifest.js?v=20260607"></script>
> <script defer src="main.js?v=20260607"></script>
> ```
>
> Fíjate que `manifest.js` (los datos de la marca) va **antes** que `main.js` (la lógica que los usa). Con `defer`, el orden en que los escribes se respeta: primero corre uno, luego el otro. Si los hubieran cargado con `async`, ese orden no estaría garantizado y la cosa podría romperse.

### ¿Al final del `<body>` o con `defer`?

Históricamente, mucha gente ponía los `<script>` justo antes de `</body>` (al fondo de la página) para que el HTML cargara primero. Sigue siendo válido. Pero con `defer` ese truco ya no hace falta: puedes ponerlo donde quieras y se portará bien. tunal-digital combina las dos costumbres: pone los scripts al final **y** les agrega `defer`, por seguridad y por claridad. No es contradictorio, es ser cuidadoso.

## 4. El DOM: el puente entre los tres

Llegamos al concepto que conecta todo. Cuando el navegador lee tu HTML, no se queda con el texto plano: construye en memoria una versión "viva" de la página, un árbol de cajitas donde cada etiqueta es un nodo. A eso se le llama **DOM**.

> ### 🟦 ¿Qué significa? — *DOM (Document Object Model)*
> El DOM es la representación **en memoria** de tu página: el navegador convierte tu HTML en un árbol de objetos que puede consultar y modificar mientras la página está abierta. *Document Object Model* significa "modelo de objetos del documento".
> **¿Para qué sirve?** Es **el puente**. El CSS mira el DOM para saber qué pintar de qué color. El JavaScript mira y **modifica** el DOM para cambiar la página en vivo: cambiar un texto, abrir un menú, ocultar una sección.
> **¿Dónde se usa en tu proyecto?** Todo `main.js` de tunal-digital trabaja sobre el DOM. Por ejemplo, busca elementos con `document.querySelector(...)` y los cambia. Cuando cambias el idioma, JavaScript recorre el DOM y reemplaza los textos de español a inglés.

Piénsalo así: el HTML es la **receta escrita**; el DOM es el **plato ya servido en la mesa**, que todavía puedes condimentar. El JavaScript es el cocinero que se acerca con la sal.

### Cómo JavaScript "encuentra" un elemento

Para que JavaScript pueda cambiar algo, primero tiene que **encontrarlo** en el DOM. Y para encontrarlo, el elemento HTML suele llevar un `id` o una `class` que le sirve de etiqueta de identificación.

> ### 🟦 ¿Qué significa? — *atributo `id`*
> Un `id` es un nombre **único** que le pones a un elemento HTML para identificarlo, como el número de cédula de una persona. No debe repetirse en la página.
> **¿Para qué sirve?** Para que el CSS o el JavaScript puedan apuntar exactamente a ese elemento.
> **¿Dónde se usa en tu proyecto?** En `index.html` de tunal-digital, el menú de navegación es `<nav id="navLinks">`. Desde `main.js`, JavaScript busca ese `id` para abrir y cerrar el menú en el celular.

> ### 🟦 ¿Qué significa? — *atributo `class`*
> Una `class` ("clase") es también un nombre que le pones a un elemento HTML, pero a diferencia del `id`, **se puede repetir** en muchos elementos a la vez. Es como una etiqueta de grupo: "todos los que lleven esta clase pertenecen al mismo conjunto".
> **¿Para qué sirve?** Para aplicar el mismo estilo o el mismo comportamiento a varios elementos de un golpe. Por ejemplo: "todas las tarjetas con `class="glass"` van con fondo translúcido".
> **¿Dónde se usa en tu proyecto?** En tunal-digital, muchísimos bloques comparten `class="glass"` para verse como tarjetas de vidrio. El CSS las apunta a todas juntas escribiendo `.glass` (con un punto delante, igual que el `#` apunta a un `id`).

Mira cómo se enganchan las tres piezas alrededor de un mismo elemento. Primero el HTML define un botón con un `id`:

```html
<button id="menuBtn">Menú</button>
```

El CSS lo viste usando ese mismo `id` con una almohadilla `#`:

```css
#menuBtn {
  background: orange;
  border-radius: 8px;
}
```

Y el JavaScript lo encuentra en el DOM y le añade comportamiento (esto ya es código JS, lo verás de verdad en el módulo siguiente; aquí solo para que veas la unión):

```javascript
const boton = document.querySelector("#menuBtn");
boton.addEventListener("click", abrirMenu);
```

Tres archivos, tres lenguajes, **un solo botón**. El `id="menuBtn"` es el hilo que los cose a los tres. Esa es, en una imagen, toda la integración.

> ### 💡 Tip — `id` para JavaScript, `class` para estilos repetidos
> Como el `id` es único, viene perfecto cuando hay **un solo** elemento (un botón concreto, una sección concreta). Cuando quieres aplicar el mismo estilo a **muchos** elementos (todas las tarjetas, todos los botones de un tipo), se usa `class`, que sí se puede repetir. tunal-digital usa muchísimas clases para sus tarjetas de "vidrio" (`class="glass"`).

## 5. La foto completa, paso a paso

Juntemos todo en el orden real en que ocurre cuando alguien abre tunal-digital en su navegador. Bit te lo cuenta como una pequeña película:

1. El navegador **pide y recibe el `index.html`**. Empieza a leerlo de arriba abajo.
2. Dentro del `<head>` encuentra el `<link rel="stylesheet" href="styles.css">` y **descarga el CSS**.
3. También ve los `<script defer>` y los **empieza a descargar en segundo plano**, sin detenerse (gracias a `defer`).
4. Sigue leyendo el `<body>` y **construye el DOM**: el árbol de cajitas con header, secciones, botones.
5. Con el DOM listo, **aplica el CSS**: pinta el fondo oscuro, el naranja de marca, las tipografías.
6. Cuando el HTML termina de leerse, recién ahí **ejecuta los scripts `defer`**, en orden: primero `manifest.js`, luego `main.js`.
7. `main.js` **recorre el DOM**, conecta los botones, prepara el cambio de idioma y las animaciones. La página queda viva.

Aquí tienes el esqueleto mínimo que une los tres mundos, uno que podrías escribir tú mismo:

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Mi página</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <h1 id="saludo">Hola</h1>
  <button id="menuBtn">Menú</button>

  <script defer src="main.js"></script>
</body>
</html>
```

Estructura (HTML), estilo enlazado en el `<head>` (CSS), comportamiento enlazado al final con `defer` (JS). Ese patrón, idéntico, es el que usa tunal-digital, solo que con muchísimo más contenido.

> ### ⚠️ Cuidado — Rutas: ¿dónde está el archivo?
> En `href="styles.css"` y `src="main.js"` no aparece ninguna carpeta, y eso quiere decir "el archivo está **al lado** del HTML, en la misma carpeta". Si tu CSS estuviera en una subcarpeta `css/`, escribirías `href="css/styles.css"`. En tunal-digital, `manifest.js` está en una subcarpeta, y por eso se escribe `src="lib/manifest.js"`. Si la ruta está mal, el navegador no encuentra el archivo y la página sale sin estilos o sin funcionar, y no te avisa en voz alta. Revisa siempre las rutas.

## 6. Un vistazo a tus otros proyectos (sin asustarte)

Lo que acabas de ver es la forma "clásica" o **vanilla**, la base de todo. Tus otros proyectos hacen lo mismo por debajo, aunque lo escondan tras herramientas más modernas.

> ### 🟦 ¿Qué significa? — *vanilla*
> "Vanilla" (vainilla, el sabor más básico) describe usar HTML, CSS y JavaScript **puros**, sin librerías ni herramientas que automaticen el enlazado. Es justo lo que hace tunal-digital.
> **¿Para qué sirve?** Para entender lo que de verdad pasa. Las herramientas modernas hacen este mismo trabajo por ti, pero conviene conocer el fondo.

En **RachaSimple** y **Faro** (la carpeta Organizer) no escribes el `<link>` y el `<script>` a mano: usas React, que reparte la página en piezas llamadas componentes (archivos `.tsx`), y una herramienta (Vite en RachaSimple, Next.js en Faro) se encarga de inyectar el CSS y el JS por ti en un HTML que genera sola. Y para los estilos, RachaSimple usa Tailwind, que es CSS organizado de otra manera. Pero lo que finalmente llega al navegador es siempre lo mismo: un HTML que enlaza CSS y JS, y un DOM que JavaScript manipula. **Lo que aprendiste aquí no caduca: es el cimiento de todo lo demás.**

> ### 💡 Tip — No corras todavía
> No necesitas entender React, Vite ni Next.js ahora mismo. Quédate solo con la idea: por mucho que cambie la herramienta, los tres amigos (HTML, CSS, JS) y el puente (DOM) siempre están. Cuando llegues a esos módulos, reconocerás el patrón al instante.

## ✅ Checklist — ¿ya domino esto?

- [ ] Sé que HTML es estructura, CSS es estilo y JavaScript es comportamiento.
- [ ] Sé enlazar una hoja de estilos con `<link rel="stylesheet" href="...">` dentro del `<head>`.
- [ ] Sé enlazar un script con `<script src="..."></script>` y que **sí** se cierra.
- [ ] Entiendo qué hace `defer` y por qué lo prefiero para mi propio código.
- [ ] Sé la diferencia entre `defer` (espera y respeta el orden) y `async` (corre apenas baja, sin orden).
- [ ] Entiendo que el DOM es la página "viva" en memoria y que JavaScript lo modifica.
- [ ] Sé que un `id` único cose el mismo elemento entre HTML, CSS y JavaScript.
- [ ] Entiendo por qué una ruta mal escrita deja la página sin estilos o sin función.

## 🧪 Ejercicios

1. **Sin computadora.** Explica con tus palabras, a un amigo imaginario, qué hace cada uno de los tres: HTML, CSS y JavaScript. Usa la metáfora de la casa (muros, pintura, interruptores).

2. **Sin computadora.** Mira esta línea y di qué está mal: `<script src="main.js">`. Pista: piensa en lo que aprendiste sobre cerrar la etiqueta.

3. 💻 Abre `sitio-web/index.html` de **tunal-digital** en tu editor. Busca el `<link rel="stylesheet">` y los dos `<script defer>`. Anota en qué parte del archivo está cada uno: ¿el CSS está en el `<head>`? ¿Los scripts están al final del `<body>`?

4. 💻 Crea una carpeta nueva con tres archivos: `index.html`, `styles.css` y `main.js`. En el HTML, enlaza el CSS en el `<head>` y el JS al final con `defer`. Pon en el HTML un `<h1 id="titulo">Hola</h1>`. En el CSS, escribe `#titulo { color: orange; }`. Abre el HTML en el navegador y comprueba que el título sale naranja: acabas de unir HTML y CSS tú mismo.

5. 💻 En el mismo `main.js` del ejercicio anterior, escribe esta única línea: `document.querySelector("#titulo").textContent = "Hola desde JavaScript";`. Recarga la página. Si el texto cambió, ¡JavaScript ya está tocando tu DOM! Si no cambió, revisa que el `<script defer>` esté bien escrito y que el `id` coincida.

6. 💻 Experimento del `defer`. En el ejercicio anterior, quita el `defer` del `<script>` y **muévelo al `<head>`**, antes del `<h1>`. Recarga. Lo más probable es que el texto **ya no cambie**, porque el script corre antes de que el `<h1>` exista en el DOM. Vuelve a poner `defer` (o devuelve el script al final) y verás que funciona otra vez. Acabas de comprobar, con tus propias manos, por qué `defer` importa.
