# Capítulo 03 — La estructura de un documento

<p align="center">
  <img src="../../recursos/imagenes/01-html/cap03.png" alt="Ilustración del capítulo (pixel art con Bit)" width="640">
</p>


> Hasta ahora hemos ido soltando contenido dentro del `<body>` sin más. En este capítulo le
> vamos a dar a la página una **estructura de verdad**: por un lado la cabecera invisible
> (`<head>`), donde viven los metadatos; por otro, un cuerpo **semántico** que tanto las máquinas
> como las personas puedan entender. Esto es justo lo que diferencia una página de práctica de
> una página real como la tuya.

---

## 1. Las dos mitades: `<head>` y `<body>`

Dentro de `<html>`, toda página se parte en dos:

```
<html>
├── <head>   →  información SOBRE la página (no se ve en pantalla)
└── <body>   →  el contenido que SÍ se ve
```

> ### 🟦 ¿Qué significa? — *`<head>` (la cabecera)*
> El `<head>` es la zona de los **metadatos**: datos *sobre* la página, no contenido que se vea.
> Ahí van el título de la pestaña, el idioma, la descripción para Google, los enlaces a los
> archivos de estilo (CSS) y de JavaScript, el ícono… El usuario nunca "ve" el `<head>`, pero sin
> él la página cojea.

> ### 🟦 ¿Qué significa? — *Metadato*
> Un **metadato** es "un dato sobre un dato". Aquí, información que describe a la página —su
> título, su autor, su idioma— en lugar de ser el contenido en sí. Es una palabra que vas a leer
> mucho; quédate con la idea de "datos *acerca de*".

---

## 2. Los metadatos esenciales del `<head>`

Mira un `<head>` completo y realista, y vamos línea por línea:

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tunal Digital — Desarrollo web e IA para tu negocio</title>
  <meta name="description" content="Creamos sitios web e integramos IA para pequeños negocios.">
  <link rel="stylesheet" href="styles.css">
  <link rel="icon" href="favicon.ico">
</head>
```

> ### 🔎 Línea por línea
> - `<meta charset="UTF-8">` → la codificación de caracteres (acentos, ñ, emojis). Esto ya lo
>   viste antes.
> - `<meta name="viewport" ...>` → **la línea clave para móviles**. Le dice al navegador que
>   ajuste el ancho al de la pantalla del dispositivo. Si la quitas, tu sitio se ve diminuto en el
>   teléfono. La verás con calma en el módulo 02 (responsive).
> - `<title>` → el texto que aparece en la pestaña y que Google usa como titular del resultado.
> - `<meta name="description">` → el resumen que Google muestra **bajo** el titular en sus
>   resultados. De él depende, en buena parte, cuánta gente hace clic.
> - `<link rel="stylesheet" href="styles.css">` → el que **conecta** tu archivo de estilos CSS.
>   Así es como el HTML y el CSS se dan la mano. Lo verás en el módulo 02.
> - `<link rel="icon" href="favicon.ico">` → el iconito de la pestaña (*favicon*).

> ### 🟦 ¿Qué significa? — *La etiqueta `<meta>`*
> `<meta>` es una etiqueta "vacía" (no lleva cierre) cuya misión es aportar un metadato. Su
> comportamiento cambia según los atributos que le pongas: `charset` para la codificación,
> `name`+`content` para describir la página. Existen muchos tipos de `<meta>`, pero con manejar
> `charset`, `viewport` y `description` vas de sobra para empezar.

> ### 💡 Tip — Open Graph: cómo se ve tu enlace al compartirlo
> ¿Te has fijado en que, al pegar un enlace en WhatsApp, salen una imagen y un título bonitos? De
> eso se encargan unas etiquetas `<meta property="og:...">` (Open Graph) que van en el `<head>`.
> Tu sitio tiene una imagen `og-image.png` justamente para esto. No hace falta que las domines
> ahora; basta con que sepas que viven en el `<head>`.

---

## 3. El cuerpo semántico: darle sentido al `<body>`

Durante años, las páginas se armaban metiéndolo todo en `<div>` (cajas genéricas). Funciona, sí,
pero no cuenta *qué es cada parte*. El HTML moderno trae etiquetas que **describen el papel** de
cada zona, y a eso lo llamamos **HTML semántico**.

> ### 🟦 ¿Qué significa? — *`<div>` (caja genérica)*
> Un `<div>` (*division*) es un **contenedor sin significado**: una caja para agrupar cosas. Sirve,
> pero por sí solo no aclara si lo de dentro es un menú, un artículo o un pie de página. Es
> "neutro".

> ### 🟦 ¿Qué significa? — *HTML semántico*
> **Semántico** quiere decir "que tiene significado". El HTML semántico usa etiquetas que
> **nombran el rol** de cada zona, en vez de cajas todas iguales. Estas son las principales:
> | Etiqueta | Qué representa |
> |---|---|
> | `<header>` | La cabecera visible (logo, menú superior) |
> | `<nav>` | La navegación (el menú de enlaces) |
> | `<main>` | El contenido principal y único de la página |
> | `<section>` | Una sección temática (servicios, precios…) |
> | `<article>` | Un contenido independiente (un post, una tarjeta) |
> | `<aside>` | Contenido lateral o secundario |
> | `<footer>` | El pie de página (contacto, derechos, redes) |

El mismo esqueleto, comparado lado a lado:

```html
<!-- ❌ Sin semántica: todo son cajas iguales -->
<div class="header">…</div>
<div class="content">…</div>
<div class="footer">…</div>

<!-- ✅ Con semántica: cada zona dice qué es -->
<header>…</header>
<main>…</main>
<footer>…</footer>
```

> ### 💡 Tip — ¿Por qué molestarse en ser semántico?
> Por tres razones bien concretas:
> 1. **Accesibilidad:** un lector de pantalla puede avisar "estás en la navegación" o "saltando al
>    contenido principal", porque las etiquetas se lo dicen.
> 2. **SEO:** Google entiende mejor tu página y la posiciona más arriba.
> 3. **Mantenimiento:** tú (y la IA) leéis el código y captáis la estructura de un solo vistazo.

> ### 🔎 En tu código
> Tu `tunal-digital/sitio-web/index.html` usa precisamente esta estructura semántica: un
> `<header>` con el menú, un `<main>` con las secciones de servicios y precios (cada una en su
> `<section>`), y un `<footer>` con el contacto. Cuando lo abras con `F12`, vas a reconocer estas
> etiquetas al instante.

---

## 4. Un esqueleto completo y semántico

Así se ve una página real, bien estructurada:

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi negocio</title>
    <meta name="description" content="Lo que hago y cómo contactarme.">
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <header>
      <h1>Mi negocio</h1>
      <nav>
        <ul>
          <li><a href="#servicios">Servicios</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
      </nav>
    </header>

    <main>
      <section id="servicios">
        <h2>Servicios</h2>
        <p>Esto es lo que ofrezco…</p>
      </section>
      <section id="contacto">
        <h2>Contacto</h2>
        <p>Escríbeme a…</p>
      </section>
    </main>

    <footer>
      <p>© 2026 Mi negocio. Todos los derechos reservados.</p>
    </footer>
  </body>
</html>
```

Fíjate en cómo el `id="servicios"` del `<section>` se enlaza con el ancla `href="#servicios"` del
menú: al hacer clic, la página salta justo a esa sección. Todo encaja como las piezas de un
rompecabezas.

> ### 🟦 ¿Qué significa? — *El atributo `id`*
> Un `id` es un **identificador único** que le pones a un elemento para poder señalarlo después:
> desde un enlace de ancla (`#servicios`), desde el CSS para darle estilo, o desde JavaScript para
> manipularlo. **Una regla de oro:** un `id` no se repite dentro de la misma página; es único, como
> el número de tu cédula.

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Distingo `<head>` (metadatos invisibles) de `<body>` (contenido visible).
- [ ] Sé para qué sirven `charset`, `viewport`, `title` y `description`.
- [ ] Entiendo cómo el `<head>` **conecta** el CSS con `<link rel="stylesheet">`.
- [ ] Sé qué es un `<div>` y por qué el **HTML semántico** es mejor.
- [ ] Reconozco `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`.
- [ ] Entiendo el atributo `id` y cómo conecta enlaces de ancla con secciones.

---

## 🧪 Ejercicios

1. **¿Head o body?** Clasifica dónde va cada cosa: el título de la pestaña; un párrafo de
   bienvenida; el enlace al CSS; el menú de navegación; la descripción para Google.
2. **Traduce a semántico.** Reescribe esto con etiquetas semánticas:
   ```html
   <div class="top">…</div>
   <div class="menu">…</div>
   <div class="principal">…</div>
   <div class="abajo">…</div>
   ```
3. **Conecta el ancla.** Tienes un menú con `<a href="#precios">Precios</a>`. ¿Qué atributo y
   valor debe tener la `<section>` de precios para que el salto funcione?
4. **Viewport.** Explica con tus palabras qué pasaría en un teléfono si **borras** la línea
   `<meta name="viewport" ...>`.
5. 💻 **Estructura real.** Crea una página nueva con el esqueleto semántico completo de la
   sección 4, cámbiale los textos por los de un negocio inventado, y comprueba en el navegador
   que el menú salta a cada sección.

➡️ Siguiente: **[Capítulo 04 — Formularios](04-formularios.md)**.
