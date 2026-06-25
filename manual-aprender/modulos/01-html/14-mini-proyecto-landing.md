# Capítulo 14 — Mini-proyecto: una landing page completa

<p align="center">
  <img src="../../recursos/imagenes/01-html/cap14.png" alt="Ilustración del capítulo (pixel art con Bit)" width="640">
</p>


> Llegaste al gran momento del módulo de HTML: vas a construir, con tus propias manos y solo con HTML, una **landing page** completa para un negocio. Nada de copiar y pegar a ciegas: vamos paso a paso, etiqueta por etiqueta, entendiendo *por qué* va cada cosa donde va. Al terminar tendrás una página de verdad, con su menú, sus secciones y hasta un formulario de contacto. Bit, nuestro ajolote pixel art, va a estar a tu lado dándote ánimos (y de vez en cuando moviendo sus branquias de la emoción). ¿List@? Respira, abre tu editor y vamos. 💻

> ### 🟦 ¿Qué significa? — *Landing page*
> Es una **página web pensada para recibir a quien llega** (en inglés *to land* es "aterrizar"). Suele ser una sola página que cuenta quién eres, qué ofreces y cómo te pueden contactar. **¿Para qué sirve?** Para dar una primera impresión clara y hacer que la persona haga algo: escribirte, comprar, registrarse.
> **¿Dónde se usa en tu proyecto?** En **tunal-digital** justamente: el archivo `sitio-web/index.html` es la landing del negocio. En este capítulo construimos una versión mínima de esa idea.

---

## 1. Qué vamos a construir (mirar el plano antes de clavar el primer clavo)

Antes de escribir código, imaginemos la página como una casa vista de frente. De arriba hacia abajo tendrá cuatro grandes piezas:

1. Un **header** (encabezado) con el nombre del negocio y un **menú de navegación**.
2. Un **main** (contenido principal) con tres secciones: **servicios**, **sobre nosotros** y **contacto** (con formulario).
3. Un **footer** (pie de página) con un mensajito y el año.

Vamos a llamar al negocio **"Tunal Digital"**, igual que tu proyecto real, para que se sienta cercano. Pero todo lo que aprendas aquí sirve para cualquier negocio: una panadería, un salón de uñas, un taller mecánico.

> ### 💡 Tip — Dibuja antes de teclear
> Tomar una hoja y dibujar rectángulos (header arriba, secciones en medio, footer abajo) te ahorra muchísimo tiempo. Programar es, en buena parte, *pensar antes de escribir*. A esto se le llama **maquetar** o **bosquejar**.

> ### 🟦 ¿Qué significa? — *Semántica (HTML semántico)*
> "Semántico" quiere decir que cada etiqueta **describe lo que contiene**, no solo cómo se ve. Usar `<header>` en vez de un `<div>` cualquiera le dice al navegador (y a Google, y a los lectores de pantalla) "esto es el encabezado". **¿Para qué sirve?** Para que tu página sea más fácil de entender por máquinas y por personas con discapacidad. Es buena educación digital.

---

## 2. El esqueleto base (la plantilla mínima de toda página)

Empecemos por el cascarón. Crea un archivo nuevo llamado `index.html` y escribe esto:

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Tunal Digital — Sitios web para tu negocio</title>
  </head>
  <body>
    <!-- Aquí irá todo lo que se ve -->
  </body>
</html>
```

Repasemos rapidito, porque ya viste estas piezas en capítulos anteriores:

> ### 🟦 ¿Qué significa? — *`<!DOCTYPE html>`*
> Es la **primera línea** que le avisa al navegador "esto es HTML moderno". **¿Para qué sirve?** Para que el navegador no entre en un modo viejo y raro. Va siempre arriba del todo, una sola vez.

> ### 🟦 ¿Qué significa? — *Atributo `lang="es"`*
> Un **atributo** es información extra que le ponemos a una etiqueta. Aquí `lang="es"` significa "el idioma de esta página es español". **¿Para qué sirve?** Ayuda a buscadores y a lectores de pantalla a pronunciar bien. Como tu manual y tus proyectos son en español, esto es lo correcto.

> ### 🟦 ¿Qué significa? — *`<meta charset="UTF-8">`*
> Define el **juego de caracteres**: el conjunto de letras y símbolos que la página entiende. UTF-8 incluye tildes, ñ, ¿, ¡ y emojis. **¿Para qué sirve?** Para que "diseño", "niño" o "café" no salgan con símbolos rotos.

> ### 🟦 ¿Qué significa? — *`<meta name="viewport" ...>`*
> El **viewport** es el área visible de la pantalla. Esta línea le dice "ajústate al ancho del dispositivo". **¿Para qué sirve?** Para que la página se vea bien en el celular y no diminuta. Es la base de lo que se llama diseño *responsive* (adaptable).

> ### ⚠️ Cuidado — Lo del `<head>` no se ve, pero importa
> Todo lo de adentro de `<head>` es información **para el navegador**, no para el visitante. Si olvidas el `charset`, tu página *parece* funcionar... hasta que aparece "Diseño" en vez de "Diseño". Pequeños detalles, grandes dolores de cabeza.

A partir de aquí, todo lo que escribamos va **dentro de `<body>`**, donde dice el comentario `<!-- ... -->`.

---

## 3. El header con navegación (la bienvenida y el menú)

El **header** es lo primero que ve quien llega. Pondremos el nombre del negocio y un menú para saltar a las secciones.

```html
<header>
  <h1>Tunal Digital</h1>
  <p>Creamos sitios web para pequeños negocios.</p>

  <nav aria-label="Menú principal">
    <ul>
      <li><a href="#servicios">Servicios</a></li>
      <li><a href="#sobre">Sobre nosotros</a></li>
      <li><a href="#contacto">Contacto</a></li>
    </ul>
  </nav>
</header>
```

Hay varias cosas nuevas. Vamos despacio.

> ### 🟦 ¿Qué significa? — *`<header>`*
> Es la etiqueta semántica del **encabezado** de la página: lo de arriba, la presentación. Suele llevar el título y el menú. **¿Para qué sirve?** Para agrupar de forma clara la "portada" de tu sitio.

> ### 🟦 ¿Qué significa? — *`<nav>`*
> Viene de *navigation* (navegación). Marca el bloque que contiene los **enlaces del menú**. **¿Para qué sirve?** Para que el navegador y los lectores de pantalla sepan "este es el menú principal" y puedan saltar directo a él.

> ### 🟦 ¿Qué significa? — *`<ul>` y `<li>`*
> `<ul>` es una **lista sin orden** (*unordered list*) y cada `<li>` es un **elemento de la lista** (*list item*). **¿Para qué sirve?** Un menú es, en el fondo, una lista de opciones; por eso se construye así. Es la forma correcta y accesible de hacer menús.

> ### 🟦 ¿Qué significa? — *Enlace interno con `#` (ancla)*
> Cuando un enlace apunta a `href="#servicios"`, no va a otra página: **salta a un trozo de esta misma página** que tenga `id="servicios"`. A ese punto se le llama **ancla**. **¿Para qué sirve?** Para que al hacer clic en "Servicios" la pantalla baje sola hasta esa sección. Pura comodidad.

> ### 🟦 ¿Qué significa? — *Atributo `aria-label`*
> `aria-label` le da un **nombre invisible** a un elemento para las personas que usan lectores de pantalla. Aquí dice "este `nav` es el Menú principal". **¿Para qué sirve?** Para **accesibilidad**: alguien que no ve la pantalla escucha "Menú principal" y entiende qué es. No cambia nada visualmente.

> ### 🟦 ¿Qué significa? — *Accesibilidad*
> Es hacer que tu página la pueda usar **todo el mundo**, incluidas personas ciegas, con baja visión o que navegan solo con teclado. **¿Para qué sirve?** Porque la web es para todos, y además los buscadores premian las páginas accesibles. No cuesta más; solo es escribir con cuidado.

> ### ⚠️ Cuidado — Un solo `<h1>` por página
> El `<h1>` es el **título más importante** de la página, como el titular de un periódico. Pon **solo uno** y que sea el nombre del sitio. Para los títulos de cada sección usaremos `<h2>`, que es el segundo nivel.

> ### 🔎 En tu código
> En **tunal-digital** (`sitio-web/index.html`) hay un header parecido con el logo y el menú. Más adelante ese menú se "activa" con `main.js` (JavaScript) para abrirse en el celular, pero la **estructura** —el `<nav>` con su lista— nace aquí, en HTML puro. Lo que estás aprendiendo es el cimiento real de tu propio sitio.

---

## 4. El main y la primera sección: Servicios

Ahora el corazón de la página. Todo el contenido principal vive dentro de `<main>`.

> ### 🟦 ¿Qué significa? — *`<main>`*
> Marca el **contenido principal y único** de la página: lo que de verdad importa, sin contar el header, el menú ni el footer. **¿Para qué sirve?** Para que el lector de pantalla pueda decir "saltar al contenido principal" y para dejar el código ordenado. Solo debe haber **un** `<main>` por página.

> ### 🟦 ¿Qué significa? — *`<section>`*
> Es un **bloque temático** de la página: un grupo de contenido sobre un mismo tema (servicios, sobre nosotros, contacto). **¿Para qué sirve?** Para dividir el contenido en partes con sentido. Cada `<section>` suele empezar con su propio `<h2>`.

Escribe esto **dentro de `<body>`, justo debajo del `</header>`**:

```html
<main>
  <section id="servicios">
    <h2>Servicios</h2>
    <p>Esto es lo que podemos hacer por tu negocio:</p>

    <ul>
      <li>
        <h3>Sitio web a medida</h3>
        <p>Una página rápida y bonita, hecha para ti.</p>
      </li>
      <li>
        <h3>Tienda en línea</h3>
        <p>Vende tus productos por internet sin complicaciones.</p>
      </li>
      <li>
        <h3>Mantenimiento</h3>
        <p>Cuidamos tu sitio para que siempre funcione.</p>
      </li>
    </ul>
  </section>
</main>
```

> ### 🟦 ¿Qué significa? — *Atributo `id`*
> El `id` es un **nombre único** que le ponemos a un elemento, como una etiqueta con su nombre pegada. Aquí `id="servicios"`. **¿Para qué sirve?** Es el destino al que apunta el enlace `href="#servicios"` del menú. El `id` y el `#` del enlace deben escribirse **igualito** (mayúsculas, tildes, todo).

> ### 🟦 ¿Qué significa? — *`<h3>` (y la jerarquía de títulos)*
> Los títulos van por niveles: `<h1>` el más importante, luego `<h2>`, luego `<h3>`, como los capítulos y subcapítulos de un libro. **¿Para qué sirve?** Cada servicio es un sub-tema dentro de la sección "Servicios" (que es `<h2>`), así que su título es `<h3>`. Respetar el orden ayuda a la accesibilidad y al buscador.

> ### 💡 Tip — No te saltes niveles
> Después de un `<h2>` viene un `<h3>`, no directamente un `<h4>`. Es como contar 1, 2, 3 sin brincarte el 2. Mantener el orden hace que tu página sea más clara para todos.

¡Mira lo que ya tienes! Bit aplaude con sus manitas pixeladas: tu página ya tiene encabezado, menú y una sección real con tres servicios. 🎉

---

## 5. La sección "Sobre nosotros"

Esta es más cortita. Sirve para contar quién eres y generar confianza.

```html
<section id="sobre">
  <h2>Sobre nosotros</h2>
  <p>
    Somos un equipo pequeño que ayuda a negocios locales a tener
    presencia en internet. Creemos en lo simple, lo claro y lo bien hecho.
  </p>
  <p>
    Trabajamos contigo de cerca, sin tecnicismos raros, hasta que tu
    sitio quede como lo imaginaste.
  </p>
</section>
```

Esta sección va **dentro de `<main>`**, justo después de cerrar la sección de servicios (`</section>`). Fíjate que ya no hay etiquetas nuevas: solo `<section>`, `<h2>` y `<p>`. Esa es la belleza de HTML: con pocas piezas, repitiéndolas con cabeza, construyes páginas enteras.

> ### 💡 Tip — Texto real, no "Lorem ipsum" para siempre
> Está bien empezar con texto de relleno mientras maquetas, pero cuando puedas escribe texto **de verdad**: qué hace el negocio, por qué confiar en él. El texto auténtico es lo que de verdad convence a quien visita.

> ### 🔎 En tu código
> Cada uno de tus proyectos podría tener una sección "Sobre": **PolyPaw** contaría que es una app de mascotas hecha en Python; **RachaSimple** explicaría que ayuda a mantener rachas de hábitos; **Faro** (carpeta Organizer) diría que organiza tus proyectos leyendo GitHub y Drive. La etiqueta es la misma `<section>`; solo cambia lo que escribes dentro.

---

## 6. La sección de Contacto con formulario

Aquí viene la estrella del capítulo: un **formulario**. Es el lugar donde el visitante deja sus datos para que lo contactes.

> ### 🟦 ¿Qué significa? — *Formulario (`<form>`)*
> Un formulario es un **conjunto de campos** donde la persona escribe información (nombre, correo, mensaje) y luego la envía. **¿Para qué sirve?** Para recibir mensajes, registros o pedidos. La etiqueta que lo envuelve todo es `<form>`.

```html
<section id="contacto">
  <h2>Contacto</h2>
  <p>¿Quieres tu sitio web? Escríbenos y te respondemos pronto.</p>

  <form action="#" method="post">
    <p>
      <label for="nombre">Tu nombre</label>
      <input type="text" id="nombre" name="nombre" required />
    </p>

    <p>
      <label for="correo">Tu correo</label>
      <input type="email" id="correo" name="correo" required />
    </p>

    <p>
      <label for="mensaje">Tu mensaje</label>
      <textarea id="mensaje" name="mensaje" rows="4" required></textarea>
    </p>

    <p>
      <button type="submit">Enviar mensaje</button>
    </p>
  </form>
</section>
```

Vamos campo por campo, que aquí hay mucho que aprender.

> ### 🟦 ¿Qué significa? — *Atributos `action` y `method`*
> `action` dice **a dónde se mandan** los datos cuando se envía el formulario; `method` dice **cómo** se mandan (`post` es lo normal para enviar datos). **¿Para qué sirve?** Por ahora pusimos `action="#"` (no va a ningún lado de verdad) porque con solo HTML no podemos procesar el envío todavía. Eso se hace después con un servidor o un servicio.

> ### 🟦 ¿Qué significa? — *`<label>` y su atributo `for`*
> `<label>` es la **etiqueta de texto** que describe un campo ("Tu nombre"). El atributo `for="nombre"` la **conecta** con el campo que tiene `id="nombre"`. **¿Para qué sirve?** Para accesibilidad: al hacer clic en el texto, el cursor salta al campo, y los lectores de pantalla leen el campo con su nombre. El `for` y el `id` deben coincidir exactamente.

> ### 🟦 ¿Qué significa? — *`<input>`*
> Es una **casilla donde se escribe** un dato. Es una etiqueta que se cierra sola (no lleva `</input>`). **¿Para qué sirve?** Para recoger texto corto: un nombre, un correo, un teléfono.

> ### 🟦 ¿Qué significa? — *Atributo `type` del input*
> `type` dice **qué clase de dato** espera el campo. `type="text"` es texto normal; `type="email"` es un correo (el navegador revisa que tenga forma de correo). **¿Para qué sirve?** Para ayudar a quien escribe y para evitar errores. Hay muchos: `password`, `number`, `date`...

> ### 🟦 ¿Qué significa? — *Atributo `name`*
> `name` es el **nombre con el que viaja el dato** cuando se envía el formulario. **¿Para qué sirve?** El servidor que reciba el formulario verá "nombre = Edwar", "correo = ...". Sin `name`, el dato no se envía. Es distinto del `id` (el `id` es para conectar con el `label`; el `name` es para el envío).

> ### 🟦 ¿Qué significa? — *Atributo `required`*
> `required` significa **"obligatorio"**: el formulario no se envía si ese campo está vacío. **¿Para qué sirve?** Para no recibir mensajes sin nombre o sin correo. El navegador muestra solito un aviso "completa este campo".

> ### 🟦 ¿Qué significa? — *`<textarea>`*
> Es una **caja de texto grande**, de varias líneas, para mensajes largos. El atributo `rows="4"` dice que se muestre con 4 líneas de alto. **¿Para qué sirve?** Para que la persona escriba su mensaje cómodamente. Ojo: sí lleva cierre `</textarea>`.

> ### 🟦 ¿Qué significa? — *`<button type="submit">`*
> Es el **botón de enviar**. `type="submit"` significa "al pulsarme, envía el formulario". **¿Para qué sirve?** Es la acción final: el visitante hace clic y sus datos se mandan.

> ### ⚠️ Cuidado — `id` único, siempre
> Cada `id` de la página tiene que ser **único**: no puede haber dos `id="nombre"`. Si repites un `id`, los enlaces y los `label` se confunden y dejan de funcionar bien. Piensa en el `id` como el número de cédula de cada elemento.

> ### 🔎 En tu código
> En **tunal-digital**, cuando alguien envía el formulario de contacto, el dato no se queda en el HTML: viaja a un **Cloudflare Worker** (un pequeño programa en la nube) que incluso usa la **API de Claude** para procesar el mensaje. Pero todo ese viaje **empieza aquí**, en este `<form>` de HTML. Sin este formulario bien hecho, no hay nada que enviar. Por eso este capítulo es tan importante.

---

## 7. El footer (el pie de página)

Para cerrar, el pie: un mensajito y el año.

```html
<footer>
  <p>Tunal Digital — Hecho con cariño.</p>
  <p>&copy; 2026 Todos los derechos reservados.</p>
</footer>
```

Esta va **dentro de `<body>`, después de cerrar `</main>`**.

> ### 🟦 ¿Qué significa? — *`<footer>`*
> Es la etiqueta semántica del **pie de página**: lo de abajo del todo. Suele llevar el aviso de derechos, contacto secundario o enlaces legales. **¿Para qué sirve?** Para cerrar la página con la información "de cierre" de forma ordenada y reconocible.

> ### 🟦 ¿Qué significa? — *`&copy;` (entidad HTML)*
> `&copy;` es un **código especial** que el navegador dibuja como el símbolo de copyright ©. **¿Para qué sirve?** Algunos símbolos no se escriben directo y se ponen con estas "entidades". Otra muy usada es `&amp;` para el símbolo `&`.

> ### 💡 Tip — Que el año no envejezca
> Escribir "2026" a mano funciona hoy, pero el año que viene quedará viejo. Con solo HTML no podemos poner el año automático (eso pide JavaScript), así que por ahora recuerda actualizarlo. Es un detalle pequeño que demuestra cuidado.

---

## 8. Todo junto: la landing completa

Aquí está tu página entera, de principio a fin. Copia esto en `index.html`, guárdalo y **ábrelo con doble clic** en tu navegador. 💻

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Tunal Digital — Sitios web para tu negocio</title>
  </head>
  <body>
    <header>
      <h1>Tunal Digital</h1>
      <p>Creamos sitios web para pequeños negocios.</p>
      <nav aria-label="Menú principal">
        <ul>
          <li><a href="#servicios">Servicios</a></li>
          <li><a href="#sobre">Sobre nosotros</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
      </nav>
    </header>

    <main>
      <section id="servicios">
        <h2>Servicios</h2>
        <p>Esto es lo que podemos hacer por tu negocio:</p>
        <ul>
          <li>
            <h3>Sitio web a medida</h3>
            <p>Una página rápida y bonita, hecha para ti.</p>
          </li>
          <li>
            <h3>Tienda en línea</h3>
            <p>Vende tus productos por internet sin complicaciones.</p>
          </li>
          <li>
            <h3>Mantenimiento</h3>
            <p>Cuidamos tu sitio para que siempre funcione.</p>
          </li>
        </ul>
      </section>

      <section id="sobre">
        <h2>Sobre nosotros</h2>
        <p>
          Somos un equipo pequeño que ayuda a negocios locales a tener
          presencia en internet. Creemos en lo simple, lo claro y lo bien hecho.
        </p>
        <p>
          Trabajamos contigo de cerca, sin tecnicismos raros, hasta que tu
          sitio quede como lo imaginaste.
        </p>
      </section>

      <section id="contacto">
        <h2>Contacto</h2>
        <p>¿Quieres tu sitio web? Escríbenos y te respondemos pronto.</p>
        <form action="#" method="post">
          <p>
            <label for="nombre">Tu nombre</label>
            <input type="text" id="nombre" name="nombre" required />
          </p>
          <p>
            <label for="correo">Tu correo</label>
            <input type="email" id="correo" name="correo" required />
          </p>
          <p>
            <label for="mensaje">Tu mensaje</label>
            <textarea id="mensaje" name="mensaje" rows="4" required></textarea>
          </p>
          <p>
            <button type="submit">Enviar mensaje</button>
          </p>
        </form>
      </section>
    </main>

    <footer>
      <p>Tunal Digital — Hecho con cariño.</p>
      <p>&copy; 2026 Todos los derechos reservados.</p>
    </footer>
  </body>
</html>
```

> ### 💡 Tip — Pruébala de verdad
> Al abrirla, haz clic en los enlaces del menú: la pantalla debería **saltar** a cada sección. Escribe en el formulario y pulsa "Enviar mensaje" dejando un campo vacío: verás el aviso de campo obligatorio. ¡Eso es tu HTML funcionando! Se ve sencillo (todavía sin colores) porque el **diseño visual** llega en el módulo de CSS. Aquí construimos los **huesos**; el CSS pone la piel y la ropa.

> ### ⚠️ Cuidado — Cierra cada etiqueta que abriste
> Si abres `<section>` y olvidas `</section>`, la página se desordena. Un truco: cada vez que escribas una etiqueta de apertura, escribe **enseguida** la de cierre y luego rellena el medio. Así nunca se te olvida ninguna.

---

## 9. Lo que lograste (en serio, párate a verlo)

Hace catorce capítulos no sabías qué era una etiqueta. Hoy acabas de construir, **tú solit@**, una landing page con:

- Un documento HTML bien formado, con su `<head>` correcto.
- Un **header** con título y menú de navegación accesible.
- Un **main** con tres secciones temáticas.
- Un **formulario** real con etiquetas, campos obligatorios y botón.
- Un **footer** con derechos de autor.
- Y todo con HTML **semántico y accesible**, hecho con criterio profesional.

Bit está dando saltitos pixelados de orgullo. Esto no es un ejercicio de juguete: es la misma estructura que sostiene sitios reales como tu **tunal-digital**. Lo que sigue (CSS para los colores, JavaScript para la magia) se monta **encima** de estos cimientos que ya dominas. Celebra: te lo ganaste. 🎉

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Sé qué es una **landing page** y para qué sirve.
- [ ] Puedo escribir el **esqueleto base** de HTML de memoria (`<!DOCTYPE>`, `<html>`, `<head>`, `<body>`).
- [ ] Entiendo y uso las etiquetas semánticas `<header>`, `<nav>`, `<main>`, `<section>` y `<footer>`.
- [ ] Sé crear un **menú** con `<nav>`, `<ul>`, `<li>` y enlaces internos con `#`.
- [ ] Conecto un enlace `#servicios` con su sección usando el atributo `id`.
- [ ] Respeto la **jerarquía de títulos** (un solo `<h1>`, luego `<h2>`, luego `<h3>`).
- [ ] Construyo un **formulario** con `<form>`, `<label>`, `<input>`, `<textarea>` y `<button>`.
- [ ] Sé la diferencia entre el atributo `id` (para `label` y enlaces) y `name` (para enviar el dato).
- [ ] Uso `required` para campos obligatorios y `type="email"` para correos.
- [ ] Entiendo qué es la **accesibilidad** y por qué uso `aria-label` y `<label for>`.

---

## 🧪 Ejercicios

1. **💻 Cambia el negocio.** Toma la página completa y conviértela en la landing de **otro** negocio (una panadería, una barbería, lo que quieras). Cambia el `<h1>`, los textos y los tres servicios. Guarda y ábrela en el navegador.

2. **💻 Añade una cuarta sección.** Agrega una sección nueva llamada "Preguntas frecuentes" con `id="faq"`, su `<h2>` y al menos dos preguntas con `<h3>` y su respuesta en un `<p>`. **Importante:** añade también su enlace en el menú (`<nav>`) y comprueba que el salto funciona.

3. **💻 Mejora el formulario.** Agrega un campo nuevo de **teléfono** usando `type="tel"`. Recuerda ponerle su `<label>`, su `id`, su `name` y conectarlos bien. Decide si lo quieres obligatorio (`required`) o no.

4. **💻 Caza el error.** Pídele a alguien (o a ti mism@ después de un rato) que borre **a propósito** una etiqueta de cierre o un `id` de tu página. Abre el archivo, encuentra el fallo y arréglalo. Aprender a depurar es una superhabilidad.

5. **Sin computadora — explica.** Sin mirar el código, explícale a alguien (o escríbelo en una hoja) la diferencia entre el atributo `id` y el atributo `name` de un `<input>`. Si puedes explicarlo con tus palabras, lo dominas.

6. **Sin computadora — dibuja el plano.** Elige uno de tus proyectos reales (PolyPaw, RachaSimple o Faro) e imagina su landing. Dibuja en una hoja los rectángulos: ¿qué iría en el header? ¿qué secciones tendría el main? ¿qué pondrías en el footer? Maquetar a mano es el primer paso de toda gran página.
