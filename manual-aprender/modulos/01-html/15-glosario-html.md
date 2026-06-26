# Capítulo 15 — Glosario de HTML y mapa del módulo

<p align="center">
  <img src="../../recursos/imagenes/01-html/cap15.png" alt="Ilustración del capítulo (pixel art con Bit)" width="640">
</p>


> ¡Lo lograste! Este es el último capítulo del Módulo 01. Por el camino aprendiste un montón de palabras nuevas, y es de lo más normal que algunas se te enreden en la cabeza, como fichas de un juego que todavía estás aprendiendo a ordenar. Piensa en este capítulo como un **diccionario** y un **mapa** a la vez: aquí tienes todos los términos del módulo, de la A a la Z, con definiciones cortitas para consultar cuando algo se te escape. Bit, el ajolote pixel art, se puso sus gafas de lectura para acompañarte en este repaso final. No vamos a meter conceptos nuevos; la idea es juntar todo lo que ya sabes y ver cómo encaja. Respira tranquilo: este capítulo es para celebrar lo que aprendiste.

## 1. ¿Para qué sirve un glosario?

Cuando aprendes un oficio nuevo, las palabras técnicas funcionan como las llaves de una casa. Si no sabes qué abre cada una, te quedas plantado en la puerta. Un **glosario** no es más que una lista de palabras con su significado, ordenadas por orden alfabético para que las encuentres en un segundo.

> ### 🟦 ¿Qué significa? — *Glosario*
> Una lista ordenada de palabras técnicas con su definición corta. Te permite consultar el significado de un término sin tener que releer el manual entero. Piénsalo como ese índice de palabras que viene al final de un libro de cocina.

Durante todo el módulo trabajaste con un proyecto real: **tunal-digital**, un sitio web hecho con HTML, CSS y JavaScript "vanilla" (o sea, sin frameworks), que vive en archivos como `sitio-web/index.html`, `styles.css` y `main.js`. Cada vez que en este glosario veas "¿Dónde se usa en tu proyecto?", te estaremos señalando dónde aparece ese concepto en código de verdad, casi siempre dentro de ese `index.html`.

> ### 💡 Tip — Cómo usar este capítulo
> No lo leas de corrido como si fuera una novela. Dale una pasada completa para refrescar y luego déjalo abierto en una pestaña, a mano, mientras programas. Cuando se te escape una palabra, vuelve aquí.

## 2. Glosario alfabético de HTML

Aquí los tienes, de la A a la Z, los términos que fueron saliendo en el módulo. Cada uno trae una definición de una o dos líneas y, cuando viene al caso, dónde lo viste en tu propio código.

### A

> ### 🟦 ¿Qué significa? — *Ancla / Enlace (`<a>`)*
> La etiqueta `<a>` crea un enlace: un texto o una imagen en los que puedes hacer clic para ir a otra página o a otra parte del mismo documento. "Ancla" viene del inglés *anchor*. Es lo que conecta tu sitio con el resto de la web. Necesita el atributo `href` para saber a dónde lleva.
> **¿Dónde se usa en tu proyecto?** Cada vez que en el `index.html` de tunal-digital escribes un enlace del menú o un botón "Visítanos", estás usando un `<a>`.

```html
<a href="#contacto">Contáctanos</a>
```

> ### 🟦 ¿Qué significa? — *Anidar*
> Meter un elemento dentro de otro, como muñecas rusas. Así se construyen las estructuras: una lista contiene sus elementos de lista, una sección contiene sus párrafos. La regla es sencilla: la etiqueta de adentro se cierra antes que la de afuera.

> ### 🟦 ¿Qué significa? — *ARIA*
> Un conjunto de atributos (todos empiezan por `aria-`) que dan información extra a los lectores de pantalla. Gracias a ellos, una persona con discapacidad visual entiende partes de la página que el HTML normal no explica del todo bien.
> **¿Dónde se usa en tu proyecto?** En tunal-digital puedes añadir `aria-label="Menú principal"` a la barra de navegación de `index.html` para que un lector de pantalla la anuncie con claridad.

> ### 🟦 ¿Qué significa? — *Atributo*
> Información extra que escribes dentro de la etiqueta de apertura, con la forma `nombre="valor"`. Sirve para configurar un elemento: a dónde lleva un enlace, qué imagen mostrar, en qué idioma está la página.
> **¿Dónde se usa en tu proyecto?** El `href` de un enlace y el `src` de una imagen en `index.html` son atributos.

```html
<a href="https://tunal.digital" class="boton">Visítanos</a>
```

En esa línea, `href` y `class` son atributos del elemento `<a>`.

### B

> ### 🟦 ¿Qué significa? — *Bloque (elemento de bloque)*
> Un elemento que, por defecto, ocupa todo el ancho disponible y arranca en una línea nueva. Es lo que usas para estructurar las piezas grandes del contenido. Ejemplos: `<div>`, `<p>`, `<section>`.

> ### 🟦 ¿Qué significa? — *Body*
> La etiqueta `<body>` contiene todo lo que el visitante VE en la página: textos, imágenes, botones. Lo que hace es separar el contenido visible de la configuración interna, que vive en el `<head>`.
> **¿Dónde se usa en tu proyecto?** Todo lo que se ve en la página de tunal-digital está dentro del `<body>` de `index.html`.

### C

> ### 🟦 ¿Qué significa? — *class (atributo)*
> El atributo `class` le pone a un elemento una "etiqueta de grupo" para que CSS o JavaScript puedan encontrarlo y darle estilo o comportamiento. Es lo que te deja reutilizar el mismo aspecto en muchos elementos: todos los que lleven `class="boton"` se verán igual. Y un mismo elemento puede pertenecer a varias clases a la vez.
> **¿Dónde se usa en tu proyecto?** En tunal-digital, cuando en `index.html` escribes `class="boton"`, tu `styles.css` usa ese nombre para pintar el botón con los colores de la marca.

> ### 🟦 ¿Qué significa? — *Comentario*
> Texto que escribes entre `<!-- -->` y que el navegador ignora por completo. Te sirve para dejarte notas a ti mismo o a otros programadores sin que aparezcan en la página.

```html
<!-- Aquí empieza la sección de servicios -->
```

> ### 🟦 ¿Qué significa? — *Contenedor*
> Un elemento cuya única tarea es agrupar a otros, normalmente un `<div>` o una etiqueta semántica. Lo usas para organizar y dar estilo a un grupo de cosas como si fueran una sola unidad.

### D

> ### 🟦 ¿Qué significa? — *DOCTYPE*
> La línea `<!DOCTYPE html>` que va al principio de todo archivo HTML. Le dice al navegador "esto es HTML moderno, muéstralo con las reglas actuales".
> **¿Dónde se usa en tu proyecto?** Es la primerísima línea de `index.html` en tunal-digital.

> ### 🟦 ¿Qué significa? — *DOM*
> Quiere decir "Document Object Model". Es la versión del HTML que el navegador arma en su memoria como un árbol de elementos. Gracias a él, JavaScript puede leer y cambiar la página mientras el usuario la está usando.
> **¿Dónde se usa en tu proyecto?** Tu `main.js` en tunal-digital toca el DOM cada vez que cambia un texto o muestra en pantalla una respuesta de la API de Claude.

> ### 🟦 ¿Qué significa? — *div*
> La etiqueta `<div>` es un contenedor genérico, sin significado propio. La usas para agrupar elementos cuando ninguna etiqueta semántica encaja mejor.

### E

> ### 🟦 ¿Qué significa? — *Elemento*
> El conjunto completo de una etiqueta de apertura, su contenido y su etiqueta de cierre. Por ejemplo, `<p>Hola</p>` es un elemento párrafo. Es la pieza básica con la que se construye toda la página.

> ### 🟦 ¿Qué significa? — *Entidad (entidad HTML)*
> Un código especial que empieza con `&` y termina con `;`, pensado para escribir símbolos que el HTML reserva para otra cosa. Te permite mostrar caracteres como `<`, `>` o `&` sin que el navegador se confunda. Por ejemplo, `&amp;` muestra `&` y `&lt;` muestra `<`.

```html
<p>Diseño &amp; desarrollo web</p>
```

> ### 🟦 ¿Qué significa? — *Etiqueta (tag)*
> El texto entre `<` y `>` que marca el inicio o el fin de un elemento, como `<p>` (apertura) y `</p>` (cierre). Le dice al navegador qué tipo de contenido viene a continuación.
> **¿Dónde se usa en tu proyecto?** Cada línea de `index.html` está hecha de etiquetas.

> ### ⚠️ Cuidado — Etiqueta no es lo mismo que elemento
> Mucha gente los usa como sinónimos, pero no lo son. La **etiqueta** es solo la marca (`<p>`). El **elemento** es la marca de apertura, el contenido y la marca de cierre, todo junto (`<p>Hola</p>`). Tener clara esta diferencia te ahorra confusiones más adelante.

### F

> ### 🟦 ¿Qué significa? — *Formulario*
> La etiqueta `<form>` agrupa los campos donde el usuario escribe o elige datos para enviarlos. Es la forma de recoger información: un nombre, un correo, un mensaje de contacto.
> **¿Dónde se usa en tu proyecto?** Si tunal-digital tiene una sección de contacto en `index.html`, sus campos van dentro de un `<form>`.

### H

> ### 🟦 ¿Qué significa? — *html (etiqueta raíz) y `lang`*
> La etiqueta `<html>` es la raíz del documento: dentro de ella vive todo lo demás, el `<head>` y el `<body>`. Su atributo `lang` indica el idioma de la página, por ejemplo `lang="es"` para español. Con eso, buscadores y lectores de pantalla saben en qué idioma leer.
> **¿Dónde se usa en tu proyecto?** En `index.html` de tunal-digital, la segunda línea es `<html lang="es">`, justo después del `<!DOCTYPE html>`.

> ### 🟦 ¿Qué significa? — *Head*
> La etiqueta `<head>` guarda la configuración de la página que el visitante NO ve directamente: el título de la pestaña, los metadatos, los enlaces a las hojas de estilo. Es donde se prepara la página antes de mostrarla.
> **¿Dónde se usa en tu proyecto?** En `index.html`, el `<head>` enlaza tu `styles.css` y define el título del sitio.

> ### 🟦 ¿Qué significa? — *Heading (encabezado h1–h6)*
> Las etiquetas `<h1>` a `<h6>` son los títulos y subtítulos, de mayor a menor importancia. Con ellas organizas el contenido por jerarquía. El `<h1>` es el título principal, y debería haber solo uno por página.

> ### 🟦 ¿Qué significa? — *href*
> El atributo que indica a dónde lleva un enlace `<a>`. Es lo que conecta páginas entre sí o te hace saltar a otra parte del documento. Viene de "hypertext reference".

### I

> ### 🟦 ¿Qué significa? — *id (atributo)*
> El atributo `id` le da a un elemento un nombre único en toda la página, como un número de cédula: no se puede repetir. Lo usas para apuntar a ese elemento exacto desde CSS, desde JavaScript o desde un enlace con `href="#nombre"`. Se diferencia de `class` en que `class` sí puede repetirse y el `id` no.
> **¿Dónde se usa en tu proyecto?** En el formulario de contacto de tunal-digital, el `<input id="correo">` se conecta con su `<label for="correo">` gracias a ese `id`.

> ### 🟦 ¿Qué significa? — *img*
> La etiqueta `<img>` muestra una imagen. La usas para meter fotos, logos o ilustraciones. Necesita dos atributos: `src` (de dónde sacar la imagen) y `alt` (texto descriptivo).

```html
<img src="logo-tunal.png" alt="Logo de Tunal Digital">
```

> ### 🟦 ¿Qué significa? — *Input*
> La etiqueta `<input>` es un campo donde el usuario escribe o elige un dato dentro de un formulario. Con ella recoges texto, correos, contraseñas, casillas y demás. Su atributo `type` define qué clase de campo es.
> **¿Dónde se usa en tu proyecto?** Un campo de correo en el formulario de contacto de tunal-digital sería `<input type="email">`.

### L

> ### 🟦 ¿Qué significa? — *Label*
> La etiqueta `<label>` es el texto que acompaña a un campo de formulario y explica qué hay que escribir ahí. Gracias a ella, el usuario (y también los lectores de pantalla) saben para qué sirve cada campo. Se conecta al campo con el atributo `for`.

```html
<label for="correo">Tu correo</label>
<input id="correo" type="email">
```

> ### 💡 Tip — Label siempre acompaña al input
> Un campo sin `<label>` es como una caja sin etiqueta: nadie sabe qué meter dentro. Conectar el `for` (del label) con el `id` (del input) hace que tu formulario sea accesible y se vea profesional.

> ### 🟦 ¿Qué significa? — *Lista*
> Las etiquetas `<ul>` (lista sin orden, con viñetas) y `<ol>` (lista ordenada, con números) agrupan elementos `<li>`. Las usas para enumerar cosas: servicios, pasos, características.

### M

> ### 🟦 ¿Qué significa? — *Meta (etiqueta meta)*
> La etiqueta `<meta>` va en el `<head>` y da información sobre la página: su codificación de caracteres, su descripción para los buscadores, cómo se ve en el móvil. Es lo que ayuda a navegadores y buscadores a entender el documento.
> **¿Dónde se usa en tu proyecto?** El `<meta charset="UTF-8">` y el `<meta name="viewport">` están en el `<head>` de `index.html`.

```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### N

> ### 🟦 ¿Qué significa? — *nav*
> La etiqueta `<nav>` marca una zona de navegación, normalmente el menú principal con sus enlaces. Con ella, navegadores y lectores de pantalla identifican cuál es el menú del sitio.
> **¿Dónde se usa en tu proyecto?** El menú superior de tunal-digital en `index.html` debería ir dentro de un `<nav>`.

### P

> ### 🟦 ¿Qué significa? — *Párrafo (`<p>`)*
> La etiqueta `<p>` marca un párrafo: un bloque de texto normal. La usas para escribir frases y descripciones; el navegador deja un espacio antes y después de cada párrafo para que el texto respire. Es el elemento de texto más común de cualquier página.
> **¿Dónde se usa en tu proyecto?** Cada descripción de servicio de tunal-digital en `index.html` va dentro de un `<p>`.

### S

> ### 🟦 ¿Qué significa? — *script*
> La etiqueta `<script>` carga o contiene código JavaScript dentro de la página. Es lo que le da comportamiento al sitio: responder a clics, validar formularios, pedir datos a una API. Suele ir al final del `<body>` para que el HTML cargue primero.
> **¿Dónde se usa en tu proyecto?** En `index.html` de tunal-digital, un `<script src="main.js">` enlaza tu archivo de JavaScript con la página.

> ### 🟦 ¿Qué significa? — *Semántico (HTML semántico)*
> Usar etiquetas cuyo nombre describe su contenido (`<header>`, `<nav>`, `<main>`, `<footer>`) en lugar de poner `<div>` para todo. El resultado es un código más claro, más accesible y que los buscadores entienden mejor.
> **¿Dónde se usa en tu proyecto?** Estructurar `index.html` con `<header>`, `<main>` y `<footer>`, en vez de un montón de `<div>`, hace que tunal-digital sea más semántico.

> ### 🟦 ¿Qué significa? — *src*
> El atributo que indica la fuente, es decir, la ubicación de un recurso como una imagen o un script. Le dice al navegador de dónde cargar ese archivo. Viene de "source".

### T

> ### 🟦 ¿Qué significa? — *Título (`<title>`)*
> La etiqueta `<title>` va dentro del `<head>` y define el nombre que aparece en la pestaña del navegador y en los resultados de búsqueda. Con él, el visitante y los buscadores saben de qué trata la página. No se ve dentro del contenido, solo en la pestaña.
> **¿Dónde se usa en tu proyecto?** En `index.html` de tunal-digital, el `<title>` es el texto que se lee en la pestaña cuando abres el sitio.

> ### 🟦 ¿Qué significa? — *type*
> Un atributo que define el tipo de algo. En un `<input>`, indica si es de texto, correo, contraseña o botón. Con eso, el navegador ofrece el teclado y la validación adecuados.

### V

> ### 🟦 ¿Qué significa? — *Vanilla (HTML/CSS/JS "vanilla")*
> "Vanilla" significa usar HTML, CSS y JavaScript puros, sin frameworks ni librerías extra que escriban el código por ti. Es la mejor manera de entender bien los fundamentos: lo que aprendes en este módulo es exactamente "HTML vanilla".
> **¿Dónde se usa en tu proyecto?** tunal-digital está hecho con tecnología vanilla: `index.html`, `styles.css` y `main.js` sin frameworks, justo lo contrario de RachaSimple o Faro, que sí usan React.

### Bit te recuerda

> ### 🔎 En tu código
> Si abres `sitio-web/index.html` de tunal-digital, casi todo lo que ves está en este glosario: el `<!DOCTYPE html>` del inicio, el `<head>` con sus `<meta>`, el `<body>` con su `<nav>`, los encabezados, los párrafos, las imágenes y, quizá, un `<form>`. Léelo de arriba a abajo nombrando cada pieza. Si puedes nombrarlas todas, ya dominas el módulo.

## 3. Mapa mental: cómo se conecta todo

Las palabras sueltas no sirven de mucho si no ves cómo encajan unas con otras. Aquí tienes un mapa que conecta los grandes temas del módulo. Léelo como un árbol que crece de arriba hacia abajo.

```
DOCUMENTO HTML (index.html de tunal-digital)
│
├── <!DOCTYPE html>  → "esto es HTML moderno"
│
└── <html lang="es">
    │
    ├── <head>  → configuración invisible
    │   ├── <meta charset>     → codificación
    │   ├── <meta viewport>    → adaptación a móviles
    │   ├── <title>            → nombre de la pestaña
    │   └── <link styles.css>  → estilos
    │
    └── <body>  → contenido visible
        │
        ├── <header> / <nav>   → menú (semántico, puede usar ARIA)
        │
        ├── <main>             → contenido principal
        │   ├── encabezados h1–h6
        │   ├── párrafos <p> (con entidades &amp;)
        │   ├── imágenes <img src alt>
        │   ├── enlaces <a href>
        │   ├── listas <ul>/<ol>/<li>
        │   └── formulario <form>
        │       ├── <label for>
        │       └── <input type>
        │
        └── <footer>           → pie de página
```

Y por debajo de todo esto, cuando el navegador lee el archivo, construye el **DOM**: el árbol vivo que tu `main.js` puede cambiar. Así se enlazan las tres capas, HTML (la estructura), CSS (el estilo, en `styles.css`) y JavaScript (el comportamiento, en `main.js`): tres archivos para un mismo sitio.

> ### 💡 Tip — La regla de oro de las tres capas
> **HTML** es el esqueleto (qué hay). **CSS** es la ropa (cómo se ve). **JavaScript** es el movimiento (qué hace). En tunal-digital, eso son `index.html`, `styles.css` y `main.js`. Cada uno tiene su trabajo; no los mezcles sin un buen motivo.

## 4. Cómo encaja HTML en tus otros proyectos

Aunque este módulo es de HTML puro, vale la pena ver que esta base aparece por todas partes. No vamos a usar conceptos nuevos: solo señalamos dónde reaparece lo que ya sabes.

- En **RachaSimple** (React + TypeScript + Vite + Tailwind + Supabase), los archivos `.tsx` escriben algo muy parecido a HTML dentro del propio código. Las etiquetas, los atributos y la idea de anidar son las mismas que aquí.
- En **Faro** (la carpeta Organizer, hecha con Next.js + React + TypeScript) ocurre lo mismo: detrás de cada pantalla hay etiquetas HTML que React genera por ti.
- En **PolyPaw** (Python + Flet + JSON) y en **polypaw-nas** (tu Acer Nitro con Ubuntu Server, Samba, Cockpit, Tailscale y AdGuard) no escribes HTML a mano, pero las pantallas que ves en el navegador (como la de Cockpit) están hechas, por dentro, con el mismo HTML que estudiaste.

> ### 🔎 En tu código
> El proyecto donde aplicas este módulo de la forma más directa es **tunal-digital**, porque ahí escribes HTML a mano en `index.html`. Los demás lo usan "por debajo", pero entender este módulo te ayuda a leerlos mucho mejor.

## 5. Errores comunes (repaso rápido)

Antes de cerrar, Bit te recuerda los tropiezos más típicos del módulo para que no caigas en ellos.

> ### ⚠️ Cuidado — Olvidar cerrar etiquetas
> Casi todas las etiquetas necesitan su cierre: `<p>...</p>`. Si te olvidas del `</p>`, el navegador se lía y la página se ve rara. Las pocas que no se cierran (como `<img>` o `<meta>`) son la excepción, no la regla.

> ### ⚠️ Cuidado — Anidar mal
> Si abres `<a>` y luego `<strong>`, tienes que cerrar primero `<strong>` y después `<a>`. Cerrar en desorden rompe el árbol. Acuérdate de las muñecas rusas: la última que abres es la primera que cierras.

> ### ⚠️ Cuidado — Imágenes sin alt
> Una `<img>` sin atributo `alt` deja fuera a quien usa lector de pantalla y, encima, no muestra nada si la imagen no carga. Pon siempre una descripción corta y útil.

## ✅ Checklist — ¿ya domino esto?

- [ ] Sé explicar la diferencia entre **etiqueta** y **elemento**.
- [ ] Sé qué es un **atributo** y puedo nombrar tres (`href`, `src`, `class`).
- [ ] Entiendo qué hace el **`<head>`** y qué hace el **`<body>`**, y por qué se separan.
- [ ] Sé qué es **anidar** y respeto el orden de cierre de las etiquetas.
- [ ] Puedo explicar qué es el **DOM** y por qué le importa a JavaScript.
- [ ] Distingo el **HTML semántico** (`<header>`, `<nav>`, `<main>`, `<footer>`) del `<div>` genérico.
- [ ] Sé para qué sirven `<form>`, `<input>` y `<label>`, y cómo se conectan con `for` e `id`.
- [ ] Reconozco una **entidad HTML** como `&amp;` y sé por qué se usa.
- [ ] Sé qué hace una etiqueta **`<meta>`** y puedo nombrar `charset` y `viewport`.
- [ ] Entiendo qué aporta **ARIA** a la accesibilidad.
- [ ] Sé qué es un **enlace `<a>`** y para qué sirve su atributo `href`.
- [ ] Distingo **`class`** (se puede repetir) de **`id`** (es único en la página).
- [ ] Sé qué hace la etiqueta **`<title>`** y dónde aparece su texto.
- [ ] Entiendo qué significa que tunal-digital sea **vanilla** (sin frameworks).
- [ ] Puedo abrir `index.html` de tunal-digital y nombrar cada pieza que veo.

## 🧪 Ejercicios

1. **Sin computadora.** Escribe en una hoja, de memoria, la definición de estas cinco palabras: *etiqueta*, *elemento*, *atributo*, *anidar*, *DOM*. Luego compáralas con este glosario y corrige lo que falte.

2. **Sin computadora.** Dibuja en papel el mapa mental de la sección 3 a tu manera, sin copiarlo. Empieza por `<html>` y baja hasta los `<input>`. La idea es comprobar si recuerdas dónde va cada cosa.

3. 💻 Abre `sitio-web/index.html` de **tunal-digital** y haz una lista escrita de todas las etiquetas distintas que encuentres. Junto a cada una, anota una frase corta de qué hace, apoyándote en este glosario.

4. 💻 En ese mismo `index.html`, busca una imagen `<img>` y revisa si tiene atributo `alt`. Si no lo tiene, añádele una descripción corta y útil. Si sí lo tiene, fíjate si la descripción es clara.

5. 💻 Crea un archivo nuevo llamado `repaso.html` y escribe, de memoria, la estructura mínima de una página: `<!DOCTYPE html>`, `<html lang="es">`, un `<head>` con `<meta charset>` y `<title>`, y un `<body>` con un `<h1>` y un `<p>`. Ábrelo en el navegador para confirmar que funciona.

6. 💻 Reto opcional. En tu `repaso.html`, añade un pequeño formulario de contacto con un `<label>`, un `<input type="email">` y un botón. Conecta el `label` y el `input` con `for` e `id`. Si lo consigues sin mirar el glosario, ¡ya dominas el módulo!

> Bit el ajolote te da un abrazo pixelado. Terminaste el Módulo 01 de HTML. Aprendiste a leer y a escribir el esqueleto de cualquier página web, y ahora puedes mirar `index.html` de tunal-digital y entender qué dice cada línea. Guarda este glosario cerca: será tu mapa cada vez que te sientas perdido. Nos vemos en el siguiente módulo. 🐾
