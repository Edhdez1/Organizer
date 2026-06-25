# Capítulo 13 — Buenas prácticas y errores comunes

<p align="center">
  <img src="../../recursos/imagenes/01-html/cap13.png" alt="Ilustración del capítulo (pixel art con Bit)" width="640">
</p>


> Ya sabes escribir HTML que funciona. Ahora vamos a dar un paso más: escribir HTML que funciona **bien**. En este capítulo Bit, nuestro ajolote pixelado, te enseñará a revisar tu código con el validador W3C, a ordenarlo para que cualquiera (incluido tu yo del futuro) lo entienda, a elegir buenos nombres y a esquivar los errores que tropiezan a casi todos los principiantes. Nada de magia: solo costumbres pequeñas que, juntas, hacen una diferencia enorme. Usaremos como ejemplo principal tu propio sitio **tunal-digital** (el archivo `index.html`).

## 1. ¿Por qué "buenas prácticas"?

Un sitio puede verse perfecto en tu navegador y, aun así, estar lleno de problemas escondidos: etiquetas mal cerradas, código imposible de leer, imágenes que nadie puede entender. El navegador es muy paciente y "perdona" muchos errores: intenta mostrar la página de todos modos. El problema es que ese perdón es engañoso. El día que algo se rompe, no sabes por qué.

Las **buenas prácticas** son acuerdos que la comunidad de programadores ha ido puliendo durante años para que el código sea:

- **Correcto**: cumple las reglas oficiales de HTML.
- **Legible**: una persona lo entiende de un vistazo.
- **Accesible**: lo pueden usar también personas con discapacidad.
- **Mantenible**: lo puedes cambiar mañana sin miedo.

> ### 🟦 ¿Qué significa? — *Mantenible*
> Un código es **mantenible** cuando es fácil de modificar más adelante sin romper nada. Sirve para que, cuando vuelvas a tocar tu proyecto dentro de tres meses, no tengas que adivinar qué hace cada línea.
> **¿Dónde se usa en tu proyecto?** En **tunal-digital**, si tu `index.html` está ordenado, agregar una sección nueva mañana será cuestión de minutos en lugar de una tarde entera de pelea.

Bit lo resume así: *"El navegador te perdona; tu yo del futuro, no tanto."*

## 2. Validar tu HTML con el validador W3C

La primera buena práctica es **validar**. Validar significa pasar tu archivo por una herramienta oficial que revisa si cumple las reglas del lenguaje.

> ### 🟦 ¿Qué significa? — *Validar HTML*
> **Validar** es comprobar de forma automática que tu HTML respeta las reglas oficiales: que las etiquetas estén bien escritas, bien cerradas y bien anidadas. Sirve para encontrar errores que el navegador esconde.
> **¿Dónde se usa en tu proyecto?** Pasarías `sitio-web/index.html` de **tunal-digital** por el validador para cazar errores antes de publicarlo en Cloudflare.

> ### 🟦 ¿Qué significa? — *W3C*
> El **W3C** (World Wide Web Consortium) es la organización internacional que define los estándares de la web, incluido HTML. Es como la institución que decide "las reglas del juego" para todos los navegadores.

La herramienta se llama **W3C Markup Validation Service** y vive en `https://validator.w3.org`. Tiene tres modos:

1. **Validate by URI**: le das la dirección de un sitio ya publicado.
2. **Validate by File Upload**: le subes tu archivo `index.html`.
3. **Validate by Direct Input**: pegas tu código en una caja de texto.

Para tunal-digital, mientras trabajas en tu computadora, lo más cómodo es **subir el archivo** o **pegar el código**.

> ### 🟦 ¿Qué significa? — *URI*
> Una **URI** es, en la práctica, una dirección que identifica un recurso en la web (puedes pensarla como un primo de la URL). Sirve para que el validador sepa qué página visitar.

Cuando validas, recibes dos tipos de avisos:

> ### 🟦 ¿Qué significa? — *Error vs. Warning (advertencia)*
> Un **error** es algo que rompe las reglas y deberías arreglar siempre. Un **warning** (advertencia) es algo que no está prohibido, pero que podría mejorarse o que es sospechoso. Sirve para que priorices: primero los errores, luego las advertencias.

Mira este HTML con un error típico:

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8">
    <title>Tunal Digital</title>
  </head>
  <body>
    <h1>Bienvenido a Tunal Digital
    <p>Creamos sitios web para tu negocio.</p>
  </body>
</html>
```

El validador te diría algo como: *"Unclosed element h1"* (elemento `h1` sin cerrar). Falta el `</h1>`. Corregido:

```html
<h1>Bienvenido a Tunal Digital</h1>
<p>Creamos sitios web para tu negocio.</p>
```

> ### 💡 Tip — Valida temprano y seguido
> No esperes a tener 300 líneas para validar. Hazlo cada vez que termines una sección. Encontrar un error entre 20 líneas es fácil; entre 300, es una pesadilla.

> ### ⚠️ Cuidado — El idioma de la página
> Fíjate en `<html lang="es">`. El atributo `lang` le dice al navegador y a los lectores de pantalla que la página está en español. Si lo omites, el validador lo marca y la accesibilidad empeora. En tunal-digital, como el contenido es en español, debe ser `lang="es"`.

## 3. Indentación y legibilidad

**Indentar** es dejar espacios al principio de cada línea para mostrar qué etiqueta está dentro de cuál. El navegador ignora esos espacios, pero para tus ojos hacen toda la diferencia.

> ### 🟦 ¿Qué significa? — *Indentación (sangría)*
> La **indentación** es el espacio en blanco al inicio de una línea que indica el nivel de anidamiento. Sirve para ver de un vistazo qué elementos están "dentro" de otros.
> **¿Dónde se usa en tu proyecto?** En `index.html` de **tunal-digital**, cada vez que metes una etiqueta dentro de otra (por ejemplo un `<p>` dentro de una `<section>`), la corres un nivel más a la derecha.

Compara. Sin indentar es un muro ilegible:

```html
<section>
<h2>Servicios</h2>
<ul>
<li>Diseño web</li>
<li>Mantenimiento</li>
</ul>
</section>
```

Indentado, la estructura se "ve":

```html
<section>
  <h2>Servicios</h2>
  <ul>
    <li>Diseño web</li>
    <li>Mantenimiento</li>
  </ul>
</section>
```

La regla más común es **2 espacios por nivel** (también se usan 4 o un tabulador; lo importante es ser **consistente**: elige uno y no lo mezcles).

> ### 🟦 ¿Qué significa? — *Anidamiento*
> **Anidar** es colocar una etiqueta dentro de otra, como cajas dentro de cajas. La etiqueta de afuera es la "madre" y la de adentro es la "hija". Sirve para construir la estructura de la página.

> ### 💡 Tip — Deja que el editor te ayude
> Editores como VS Code formatean tu HTML automáticamente. Busca la opción *"Format Document"* (suele estar en `Shift + Alt + F`). Extensiones como **Prettier** lo hacen al guardar. Así nunca peleas con la indentación a mano.

> ### 🔎 En tu código
> Abre `sitio-web/index.html` de tunal-digital y, si lo ves desordenado, ejecuta *Format Document*. Verás cómo las secciones quedan alineadas y de pronto entiendes la estructura de toda la página.

Otras costumbres de legibilidad:

- **Una etiqueta de bloque por línea** (no amontones diez `<div>` en una sola línea).
- **Líneas en blanco** para separar secciones grandes (la cabecera, el menú, el contenido).
- **Minúsculas** en nombres de etiquetas y atributos: `<section>`, no `<SECTION>`.
- **Comillas siempre** en los valores de atributos: `class="boton"`, no `class=boton`.

## 4. Buenos nombres de clases

Las **clases** son etiquetas que les pones a tus elementos para luego darles estilo con CSS o seleccionarlos con JavaScript. El nombre que elijas importa muchísimo.

> ### 🟦 ¿Qué significa? — *Clase (class)*
> Una **clase** es un nombre que asignas a uno o varios elementos con el atributo `class`. Sirve para agruparlos y aplicarles el mismo estilo o comportamiento. Por ejemplo, todos los botones con `class="boton-principal"` pueden compartir color y forma.
> **¿Dónde se usa en tu proyecto?** En **tunal-digital**, `styles.css` aplica reglas a las clases que pongas en `index.html`, y `main.js` puede buscar elementos por su clase para hacerlos interactivos.

Un buen nombre describe **qué es** el elemento o **qué papel cumple**, no cómo se ve hoy:

```html
<!-- ❌ Nombres que envejecen mal -->
<button class="azul-grande">Contáctanos</button>

<!-- ✅ Nombres que describen el papel -->
<button class="boton-contacto">Contáctanos</button>
```

¿Por qué? Si mañana decides que el botón sea verde, `class="azul-grande"` se vuelve una mentira. `boton-contacto` sigue siendo verdad.

Convenciones útiles:

- Usa **minúsculas** y separa palabras con **guiones**: `tarjeta-servicio`, `menu-principal`. Este estilo se llama *kebab-case* (como palabras unidas por guiones, igual que las brochetas).
- Sé **específico pero corto**: `precio-plan` es mejor que `el-texto-que-muestra-el-precio`.
- Sé **consistente**: si usas español, usa español en todas. No mezcles `boton` y `button`.

> ### 🟦 ¿Qué significa? — *kebab-case*
> **kebab-case** es una forma de escribir nombres compuestos usando minúsculas y guiones entre palabras, por ejemplo `menu-principal`. Sirve para que los nombres de clase sean legibles y compatibles con CSS.

> ### 💡 Tip — Piensa en el componente, no en la página
> En **RachaSimple** (React + TypeScript) trabajas con componentes `.tsx`. Aunque ahí el estilo se hace con Tailwind, la idea de nombrar por función y no por apariencia es la misma que en HTML puro. Buen hábito que viaja entre proyectos.

## 5. HTML semántico vs. "divitis"

Esta es, quizá, la práctica que más distingue a un principiante de alguien con oficio.

> ### 🟦 ¿Qué significa? — *HTML semántico*
> **HTML semántico** es usar etiquetas que describen el **significado** del contenido, no solo su apariencia. Por ejemplo `<nav>` para el menú, `<header>` para la cabecera, `<footer>` para el pie. Sirve para que el navegador, Google y los lectores de pantalla entiendan tu página.
> **¿Dónde se usa en tu proyecto?** En **tunal-digital**, tu `index.html` debería usar `<header>`, `<main>`, `<section>` y `<footer>` en vez de un mar de `<div>`.

> ### 🟦 ¿Qué significa? — *"Divitis"*
> **Divitis** es el apodo (medio en broma) para la mala costumbre de construir toda la página solo con etiquetas `<div>`, sin usar etiquetas semánticas. Se llama así porque parece una "enfermedad" de tantos `<div>`. El problema: nadie entiende qué es cada parte.

Mira el mismo encabezado de dos formas. Con divitis:

```html
<div class="cabecera">
  <div class="logo">Tunal Digital</div>
  <div class="menu">
    <div class="enlace"><a href="#servicios">Servicios</a></div>
    <div class="enlace"><a href="#contacto">Contacto</a></div>
  </div>
</div>
```

Con HTML semántico:

```html
<header>
  <h1>Tunal Digital</h1>
  <nav>
    <ul>
      <li><a href="#servicios">Servicios</a></li>
      <li><a href="#contacto">Contacto</a></li>
    </ul>
  </nav>
</header>
```

La segunda versión le dice a todo el mundo: "esto es la cabecera, esto es la navegación, esto es una lista de enlaces". La primera solo dice "div, div, div".

> ### 🟦 ¿Qué significa? — *Lector de pantalla*
> Un **lector de pantalla** es un programa que lee en voz alta el contenido de la página para personas con discapacidad visual. Sirve para que tu sitio sea usable por todos. El HTML semántico le permite anunciar "menú de navegación", "encabezado", etc.

> ### 💡 Tip — Pregúntate "¿qué es esto?"
> Antes de escribir `<div>`, pregúntate qué papel cumple. ¿Es el menú? `<nav>`. ¿El contenido principal? `<main>`. ¿Un bloque temático? `<section>`. Solo usa `<div>` cuando de verdad sea una caja genérica sin significado especial (por ejemplo, para agrupar cosas solo por motivos de diseño).

> ### 🔎 En tu código
> Revisa el `index.html` de tunal-digital y cuenta cuántos `<div>` tienes. Cada uno que puedas reemplazar por una etiqueta semántica mejora el SEO, la accesibilidad y la legibilidad de un solo golpe.

> ### 🟦 ¿Qué significa? — *SEO*
> **SEO** (Search Engine Optimization, optimización para motores de búsqueda) es el conjunto de prácticas que ayudan a que tu sitio aparezca mejor posicionado en buscadores como Google. El HTML semántico ayuda al SEO porque Google entiende mejor tu contenido.

## 6. Los errores más frecuentes (y cómo evitarlos)

Bit ha visto estos cuatro errores miles de veces. Si los conoces, ya vas un paso adelante.

### 6.1 Etiquetas sin cerrar

La mayoría de las etiquetas vienen en pareja: apertura y cierre. Olvidar el cierre descoloca toda la página.

```html
<!-- ❌ Falta cerrar el <a> -->
<p>Visita nuestra <a href="#contacto">página de contacto.</p>

<!-- ✅ Correcto -->
<p>Visita nuestra <a href="#contacto">página de contacto</a>.</p>
```

> ### 🟦 ¿Qué significa? — *Etiqueta de cierre*
> Una **etiqueta de cierre** es la versión con barra (`</p>`, `</a>`) que marca dónde termina un elemento. Sirve para que el navegador sepa hasta dónde llega su contenido.

Hay etiquetas que **no se cierran** porque no tienen contenido dentro, como `<img>`, `<br>` y `<meta>`. Se llaman elementos vacíos y eso es normal, no un error.

### 6.2 Atributo `alt` faltante en imágenes

Toda imagen debería llevar un atributo `alt` con una descripción de lo que muestra.

> ### 🟦 ¿Qué significa? — *Atributo alt*
> El atributo **alt** (texto alternativo) es una descripción de la imagen en palabras. Sirve para tres cosas: lo lee el lector de pantalla, se muestra si la imagen no carga, y ayuda al SEO.
> **¿Dónde se usa en tu proyecto?** Cada `<img>` del `index.html` de **tunal-digital** (un logo, una foto de un servicio) debe tener su `alt`.

```html
<!-- ❌ Sin alt: invisible para quien no ve la imagen -->
<img src="logo.png">

<!-- ✅ Con alt descriptivo -->
<img src="logo.png" alt="Logo de Tunal Digital">
```

> ### ⚠️ Cuidado — `alt` vacío sí existe, pero con criterio
> Si una imagen es puramente decorativa (un adorno sin información), se usa `alt=""` (vacío) para que el lector de pantalla la ignore. Pero ese vacío debe ser una decisión, no un olvido. Si la imagen comunica algo, el `alt` describe ese algo.

### 6.3 `id` duplicados

Un **id** es un identificador único para un elemento. La palabra clave es **único**: no puede repetirse en la misma página.

> ### 🟦 ¿Qué significa? — *id*
> Un **id** es un nombre único que identifica a un solo elemento de la página, usando el atributo `id`. Sirve para enlazar (por ejemplo `<a href="#contacto">` salta al elemento con `id="contacto"`) y para que JavaScript lo encuentre.
> **¿Dónde se usa en tu proyecto?** En **tunal-digital**, `main.js` puede buscar un elemento por su `id` para hacerlo interactivo; si hay dos `id` iguales, JavaScript solo encuentra el primero y el segundo queda "muerto".

```html
<!-- ❌ Dos elementos con el mismo id -->
<section id="servicios">...</section>
<section id="servicios">...</section>

<!-- ✅ ids únicos -->
<section id="servicios">...</section>
<section id="servicios-premium">...</section>
```

> ### 💡 Tip — id único, class repetible
> Recuerda la diferencia: el **id** es para uno solo (como tu número de cédula). La **class** se puede repetir en muchos elementos (como "estudiante", que describe a muchas personas). Si necesitas marcar varios elementos parecidos, usa `class`.

### 6.4 Anidamiento inválido

Algunas etiquetas no pueden ir dentro de otras. El caso clásico: un elemento de bloque dentro de un `<p>`.

> ### 🟦 ¿Qué significa? — *Elemento de bloque vs. en línea*
> Un **elemento de bloque** (como `<div>`, `<section>`, `<ul>`) ocupa todo el ancho disponible y empieza en una línea nueva. Un **elemento en línea** (como `<a>`, `<span>`, `<strong>`) fluye dentro del texto. Sirve saber la diferencia porque ciertas combinaciones de anidamiento están prohibidas.

```html
<!-- ❌ Una <ul> (bloque) dentro de un <p> es inválido -->
<p>Nuestros servicios:
  <ul>
    <li>Diseño</li>
    <li>Soporte</li>
  </ul>
</p>

<!-- ✅ Saca la lista fuera del párrafo -->
<p>Nuestros servicios:</p>
<ul>
  <li>Diseño</li>
  <li>Soporte</li>
</ul>
```

El validador W3C caza estos errores enseguida. Por eso la sección 2 y esta van de la mano: validar es tu red de seguridad contra el anidamiento inválido.

> ### ⚠️ Cuidado — Cierra en orden inverso al que abriste
> Si abres `<p><strong>`, debes cerrar `</strong></p>`, no `</p></strong>`. Lo último que abres es lo primero que cierras. Como ponerte y quitarte ropa: primero la camisa, después la chaqueta; al quitarte, primero la chaqueta.

## 7. Rendimiento básico desde el HTML

El **rendimiento** es qué tan rápido carga y responde tu página. Aunque mucho del rendimiento se afina con CSS y JavaScript, hay decisiones que se toman ya en el HTML.

> ### 🟦 ¿Qué significa? — *Rendimiento*
> El **rendimiento** mide qué tan rápido tu página se carga y funciona. Sirve porque una página lenta espanta visitantes. En **tunal-digital**, publicado en Cloudflare, un HTML liviano carga más rápido para tus clientes.

Cosas sencillas que ayudan:

- **Imágenes con tamaño adecuado**: no subas una foto de 4000 píxeles si se va a mostrar a 400. Pesa de más y carga lento.
- **Carga diferida de imágenes**: el atributo `loading="lazy"` le dice al navegador que cargue una imagen solo cuando el usuario esté a punto de verla.

```html
<img src="foto-servicio.jpg" alt="Equipo trabajando" loading="lazy">
```

> ### 🟦 ¿Qué significa? — *Carga diferida (lazy loading)*
> La **carga diferida** retrasa la carga de un recurso (como una imagen) hasta que de verdad se necesita. Sirve para que la página aparezca más rápido al inicio, porque no descarga de golpe todo lo que está más abajo.

- **Coloca los scripts al final** del `<body>` o usa el atributo `defer`, para que el contenido visible aparezca antes de cargar el JavaScript.

```html
<script src="main.js" defer></script>
```

> ### 🔎 En tu código
> En **tunal-digital**, revisa cómo cargas `main.js`. Si lo incluyes con `defer` o justo antes de `</body>`, el texto de tu página aparece sin esperar a que el JavaScript termine de descargarse. Pequeño cambio, sensación de velocidad mucho mayor.

> ### 💡 Tip — Menos es más
> El HTML más rápido es el que no tiene basura: etiquetas vacías que no sirven, capas y capas de `<div>` innecesarios, comentarios viejos. Limpiar tu HTML también lo hace más liviano.

## 8. Comentarios útiles

Un **comentario** es texto en tu código que el navegador ignora; sirve solo para que los humanos lean.

> ### 🟦 ¿Qué significa? — *Comentario en HTML*
> Un **comentario** es una nota dentro del código, escrita entre `<!--` y `-->`, que el navegador no muestra. Sirve para explicar partes del código o marcar secciones.
> **¿Dónde se usa en tu proyecto?** En el `index.html` de **tunal-digital** puedes marcar dónde empieza cada sección para orientarte rápido.

```html
<!-- ===== Cabecera y menú ===== -->
<header>
  ...
</header>

<!-- ===== Sección de servicios ===== -->
<section id="servicios">
  ...
</section>
```

Pero ojo: un buen comentario explica **por qué**, no **qué**. El código ya dice qué hace; el comentario aporta cuando explica una decisión.

```html
<!-- ❌ Comentario inútil: repite lo obvio -->
<!-- Aquí hay un título -->
<h1>Tunal Digital</h1>

<!-- ✅ Comentario útil: explica una decisión -->
<!-- Este bloque se llena desde main.js con la respuesta de la API de Claude -->
<div id="respuesta-ia"></div>
```

> ### ⚠️ Cuidado — Los comentarios se ven en el código fuente
> Cualquiera puede ver tus comentarios HTML con "Ver código fuente" en el navegador. **Nunca** escribas en ellos contraseñas, claves de API ni información privada. Recuerda la regla de tu propio proyecto Faro: los secretos van solo en el servidor, jamás en el cliente.

> ### 💡 Tip — Borra los comentarios "zombi"
> Cuando comentas un bloque de código para "probarlo desactivado" y luego lo dejas ahí para siempre, se convierte en ruido. Si ya no lo usas, bórralo. Tu archivo estará más limpio y liviano.

## ✅ Checklist — ¿ya domino esto?

- [ ] Sé pasar mi `index.html` por el validador W3C y distinguir un error de una advertencia.
- [ ] Indento mi código con un número de espacios consistente y sé usar *Format Document*.
- [ ] Pongo `<html lang="es">` en mis páginas en español.
- [ ] Nombro mis clases por su función (no por su color) y uso kebab-case.
- [ ] Reconozco la "divitis" y la cambio por etiquetas semánticas (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).
- [ ] Cierro todas mis etiquetas y las cierro en el orden correcto.
- [ ] Pongo `alt` descriptivo en cada imagen con información.
- [ ] Uso `id` únicos y entiendo cuándo conviene `class` en su lugar.
- [ ] Evito el anidamiento inválido (por ejemplo, listas dentro de `<p>`).
- [ ] Conozco trucos básicos de rendimiento: tamaño de imágenes, `loading="lazy"`, `defer`.
- [ ] Escribo comentarios que explican el porqué y nunca pongo secretos en ellos.

## 🧪 Ejercicios

1. **💻 Valida tu sitio.** Toma el `index.html` de tunal-digital, pégalo en `https://validator.w3.org` (modo *Direct Input*) y anota todos los errores y advertencias que aparezcan. Haz una lista de cuántos hay de cada tipo.

2. **💻 Corrige y revalida.** Arregla al menos tres de los errores que encontraste en el ejercicio anterior y vuelve a validar. Tu meta: bajar el número de errores. Apunta cuántos eliminaste.

3. **💻 Caza la divitis.** Cuenta cuántos `<div>` tiene tu `index.html`. Reemplaza al menos dos por etiquetas semánticas (`<header>`, `<nav>`, `<section>` o `<footer>`) y comprueba que la página se sigue viendo igual.

4. **💻 Imágenes accesibles.** Revisa todas las etiquetas `<img>` de tu sitio. Asegúrate de que cada imagen con información tenga un `alt` descriptivo y de que las decorativas tengan `alt=""`. Añade `loading="lazy"` a las que estén más abajo en la página.

5. **Detective de errores.** Sin usar la computadora, escribe en papel qué está mal en este fragmento y cómo lo arreglarías: `<p>Bienvenido <a href="#">aquí<p>` y `<img src="banner.jpg">` y dos secciones con `id="info"`.

6. **💻 Comentarios con criterio.** Añade comentarios de sección a tu `index.html` (cabecera, servicios, contacto, pie) y borra cualquier comentario "zombi" o código comentado que ya no uses. Verifica que no haya quedado ningún dato sensible en ellos.
