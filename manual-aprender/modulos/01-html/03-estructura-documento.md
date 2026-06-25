# Capítulo 03 — La estructura de un documento

> Hasta ahora pusimos contenido suelto en el `<body>`. En este capítulo aprenderás a darle a
> una página su **estructura profesional**: la cabecera invisible (`<head>`) con sus
> metadatos, y un cuerpo **semántico** que cualquier máquina y persona entienda. Esto es lo que
> separa una página de juguete de una página real como la tuya.

---

## 1. Las dos mitades: `<head>` y `<body>`

Toda página HTML se divide en dos partes dentro de `<html>`:

```
<html>
├── <head>   →  información SOBRE la página (no se ve en pantalla)
└── <body>   →  el contenido que SÍ se ve
```

> ### 🟦 ¿Qué significa? — *`<head>` (la cabecera)*
> El `<head>` es una zona de **metadatos**: datos *sobre* la página, no contenido visible. Ahí
> van el título de la pestaña, el idioma, la descripción para Google, los enlaces a los
> archivos de estilo (CSS) y de JavaScript, el ícono, etc. El usuario no "ve" el `<head>`, pero
> es vital.

> ### 🟦 ¿Qué significa? — *Metadato*
> Un **metadato** es "un dato sobre un dato". Aquí: información que describe la página (su
> título, su autor, su idioma) en lugar de ser el contenido de la página. La palabra aparecerá
> mucho; quédate con "datos *acerca de*".

---

## 2. Los metadatos esenciales del `<head>`

Veamos un `<head>` completo y realista, línea por línea:

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
> - `<meta charset="UTF-8">` → codificación de caracteres (acentos, ñ, emojis). Ya lo viste.
> - `<meta name="viewport" ...>` → **clave para móviles**. Le dice al navegador que adapte el
>   ancho a la pantalla del dispositivo. Sin esta línea, tu sitio se vería diminuto en el
>   teléfono. La estudiarás a fondo en el módulo 02 (responsive).
> - `<title>` → el texto de la pestaña y el que muestra Google como titular del resultado.
> - `<meta name="description">` → el resumen que Google muestra **bajo** el titular en los
>   resultados de búsqueda. Influye en cuánta gente hace clic.
> - `<link rel="stylesheet" href="styles.css">` → **conecta** tu archivo de estilos CSS. Así
>   es como el HTML y el CSS se unen. Lo verás en el módulo 02.
> - `<link rel="icon" href="favicon.ico">` → el iconito de la pestaña (*favicon*).

> ### 🟦 ¿Qué significa? — *La etiqueta `<meta>`*
> `<meta>` es una etiqueta "vacía" (no se cierra) que aporta un metadato. Cambia su
> comportamiento según sus atributos: `charset` para codificación, `name`+`content` para
> describir la página. Hay muchos tipos de `<meta>`; con conocer `charset`, `viewport` y
> `description` vas muy bien para empezar.

> ### 💡 Tip — Open Graph: cómo se ve tu enlace al compartirlo
> ¿Has notado que al pegar un enlace en WhatsApp aparece una imagen y un título bonitos? Eso
> lo controlan unas etiquetas `<meta property="og:...">` (Open Graph) en el `<head>`. Tu sitio
> tiene una imagen `og-image.png` justo para eso. No te preocupes por dominarlas ahora; solo
> reconoce que viven en el `<head>`.

---

## 3. El cuerpo semántico: darle sentido al `<body>`

Durante años, las páginas se construían llenando todo de `<div>` (cajas genéricas). Funciona,
pero no comunica *qué es cada parte*. HTML moderno tiene etiquetas que **describen el papel**
de cada sección. A eso se le llama **HTML semántico**.

> ### 🟦 ¿Qué significa? — *`<div>` (caja genérica)*
> Un `<div>` (*division*) es un **contenedor sin significado**: una caja para agrupar cosas. Es
> útil, pero por sí solo no dice si es un menú, un artículo o un pie de página. Es "neutro".

> ### 🟦 ¿Qué significa? — *HTML semántico*
> **Semántico** significa "que tiene significado". El HTML semántico usa etiquetas que
> **nombran el rol** de cada zona, en vez de cajas genéricas. Las principales:
> | Etiqueta | Qué representa |
> |---|---|
> | `<header>` | La cabecera visible (logo, menú superior) |
> | `<nav>` | La navegación (el menú de enlaces) |
> | `<main>` | El contenido principal y único de la página |
> | `<section>` | Una sección temática (servicios, precios…) |
> | `<article>` | Un contenido independiente (un post, una tarjeta) |
> | `<aside>` | Contenido lateral o secundario |
> | `<footer>` | El pie de página (contacto, derechos, redes) |

Comparación directa del mismo esqueleto:

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
> Tres razones concretas:
> 1. **Accesibilidad:** un lector de pantalla puede decir "estás en la navegación" o "saltando
>    al contenido principal" porque las etiquetas se lo dicen.
> 2. **SEO:** Google entiende mejor tu página y la posiciona mejor.
> 3. **Mantenimiento:** tú (y la IA) leen el código y entienden la estructura de un vistazo.

> ### 🔎 En tu código
> Tu `tunal-digital/sitio-web/index.html` usa esta estructura semántica: un `<header>` con el
> menú, un `<main>` con las secciones de servicios y precios (cada una un `<section>`), y un
> `<footer>` con el contacto. Cuando lo abras con `F12`, reconocerás estas etiquetas.

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

Fíjate cómo el `id="servicios"` del `<section>` conecta con el enlace de ancla
`href="#servicios"` del menú: al hacer clic, la página salta a esa sección. Todo encaja.

> ### 🟦 ¿Qué significa? — *El atributo `id`*
> Un `id` es un **identificador único** que le pones a un elemento para poder referirte a él:
> desde un enlace de ancla (`#servicios`), desde CSS para darle estilo, o desde JavaScript para
> manipularlo. **Regla:** un `id` no se repite en la misma página (es único, como una cédula).

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
