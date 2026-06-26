# Capítulo 02 — Etiquetas de texto y enlaces

<p align="center">
  <img src="../../recursos/imagenes/01-html/cap02.png" alt="Ilustración del capítulo (pixel art con Bit)" width="640">
</p>


> Ya sabes qué es una etiqueta. Toca conocer las que vas a usar el 90% del tiempo: las de
> texto, listas, enlaces e imágenes. Con esto ya armas páginas con contenido de verdad.

---

## 1. Títulos: de `<h1>` a `<h6>`

Los títulos organizan el contenido por niveles, igual que los capítulos y subcapítulos de un
libro: primero lo grande, luego lo que cuelga de ahí.

> ### 🟦 ¿Qué significa? — *Encabezado (heading)*
> Un **encabezado** es un título. HTML tiene seis niveles, de `<h1>` (el más importante) a
> `<h6>` (el menos). La `h` viene de *heading*.
> ```html
> <h1>Título principal de la página</h1>
> <h2>Una sección</h2>
> <h3>Una subsección dentro de esa sección</h3>
> ```

> ### ⚠️ Cuidado — Los títulos NO son para "hacer letra grande"
> Da tentación usar `<h1>` solo porque se ve grande. **No caigas en eso.** Los encabezados
> hablan de *estructura*, no de tamaño: los buscadores (Google) y los lectores de pantalla los
> usan para entender de qué va la página. Si lo que quieres es cambiar el tamaño en pantalla,
> eso es trabajo de **CSS** (módulo 02). Una regla que funciona: **un solo `<h1>` por página**
> (el tema central), y debajo `<h2>`, `<h3>`… en orden, sin saltarte niveles.

> ### 🔎 En tu código
> En `tunal-digital/sitio-web/index.html`, el `<h1>` es el mensaje principal de tu negocio.
> Las secciones (servicios, precios, contacto) van como `<h2>`. Esa jerarquía es justamente la
> que Google lee para posicionar tu sitio.

---

## 2. Párrafos y texto

> ### 🟦 ¿Qué significa? — *Párrafo `<p>`*
> La etiqueta `<p>` (de *paragraph*) envuelve un bloque de texto. El navegador le deja espacio
> arriba y abajo solo, para separarlo de lo que tiene alrededor.

Dentro de un párrafo puedes resaltar palabras según lo que quieras transmitir:

> ### 🟦 ¿Qué significa? — *Énfasis semántico: `<strong>` y `<em>`*
> - `<strong>` marca algo **importante** (el navegador lo muestra en negrita).
> - `<em>` marca *énfasis* (lo muestra en cursiva; *em* = *emphasis*).
> ```html
> <p>Esto es <strong>muy importante</strong> y esto va con <em>énfasis</em>.</p>
> ```
> Aquí la palabra que importa es **semántico**: no usas `<strong>` "para poner negrita", lo usas
> "para decir que esto importa de verdad". Que salga en negrita es la consecuencia, no el
> objetivo. ¿Y por qué te debería importar la diferencia? Porque un lector de pantalla *cambia
> el tono de voz* al llegar a un `<strong>`, y así le transmite esa importancia a quien no ve la
> pantalla.

> ### 🟦 ¿Qué significa? — *Salto de línea `<br>` y línea divisoria `<hr>`*
> - `<br>` mete un **salto de línea** dentro de un texto (es un elemento "vacío", no se cierra).
>   Úsalo con cuentagotas: si quieres separar bloques, los párrafos lo hacen mejor.
> - `<hr>` dibuja una **línea horizontal** para separar temas (*horizontal rule*).

---

## 3. Listas

Hay dos tipos principales, y se usan a cada rato (los menús de navegación, sin ir más lejos,
son listas).

> ### 🟦 ¿Qué significa? — *Lista no ordenada `<ul>` y elementos `<li>`*
> Una **lista no ordenada** (*unordered list*) muestra viñetas (puntos). Cada ítem va dentro de
> un `<li>` (*list item*):
> ```html
> <ul>
>   <li>Diseño web</li>
>   <li>Automatización con IA</li>
>   <li>Marketing</li>
> </ul>
> ```
> Y se ve así:
> - Diseño web
> - Automatización con IA
> - Marketing

> ### 🟦 ¿Qué significa? — *Lista ordenada `<ol>`*
> Una **lista ordenada** (*ordered list*) numera sola. Es la misma estructura, pero con `<ol>`.
> La usas cuando el orden importa: los pasos de una receta, un ranking, ese tipo de cosas.
> ```html
> <ol>
>   <li>Calienta el agua</li>
>   <li>Agrega el café</li>
>   <li>Sirve</li>
> </ol>
> ```

> ### 🔎 En tu código
> El menú de navegación de tu sitio, por dentro, es una `<ul>` con un `<li>` por cada enlace
> ("Inicio", "Servicios", "Contacto"). Y está bien que así sea: un menú **es** una lista de
> opciones.

---

## 4. Enlaces: el corazón de la web

> ### 🟦 ¿Qué significa? — *Enlace `<a>` y el atributo `href`*
> La etiqueta `<a>` (*anchor*, ancla) crea un **enlace**: ese texto en el que haces clic para
> ir a otro lado. El atributo `href` dice **a dónde** te lleva.
> ```html
> <a href="https://tunaldigital.com">Visita mi sitio</a>
> ```

Por lo general apuntas a uno de estos tres destinos:

> ### 🟦 ¿Qué significa? — *Enlace externo, interno y ancla*
> - **Externo** (a otra web): la URL completa → `href="https://google.com"`.
> - **Interno** (a otra página de tu propio sitio): una ruta relativa →
>   `href="contacto.html"` (busca ese archivo en tu sitio).
> - **Ancla** (a una sección de la misma página): empieza con `#` →
>   `href="#precios"` salta a un elemento que tenga `id="precios"`.

> ### 💡 Tip — Abrir en una pestaña nueva
> Si quieres que un enlace externo abra en otra pestaña (para que el usuario no se vaya de tu
> sitio):
> ```html
> <a href="https://google.com" target="_blank" rel="noopener">Google</a>
> ```
> `target="_blank"` abre en pestaña nueva; `rel="noopener"` es una protección de seguridad que
> conviene poner siempre que uses `_blank` (evita que la página que se abre pueda manipular la
> tuya).

> ### 🟦 ¿Qué significa? — *URL absoluta vs. relativa*
> Una **URL absoluta** es la dirección completa (`https://tunaldigital.com/contacto.html`): te
> funciona desde donde sea. Una **URL relativa** (`contacto.html` o `./img/logo.png`) se
> entiende *según dónde estés parado ahora*. Para enlazar páginas de tu propio sitio usas
> relativas; para sitios ajenos, absolutas. Es exactamente la misma idea que viste con las
> *rutas* de archivos en el Módulo 00.

---

## 5. Imágenes

> ### 🟦 ¿Qué significa? — *Imagen `<img>` y sus atributos `src` y `alt`*
> La etiqueta `<img>` mete una imagen. Es un elemento "vacío" (no se cierra). Necesita dos
> atributos clave:
> - `src` (*source*, fuente): la **ruta** del archivo de imagen.
> - `alt` (*alternative text*): una **descripción en texto** de la imagen.
> ```html
> <img src="img/logo.png" alt="Logo de Tunal Digital">
> ```

> ### ⚠️ Cuidado — El `alt` no es opcional
> El texto `alt` cumple tres funciones que pesan bastante:
> 1. Lo **leen en voz alta** los lectores de pantalla para personas ciegas.
> 2. Aparece cuando la imagen **no carga** (conexión lenta, ruta mal escrita).
> 3. Lo usan los **buscadores** para entender qué hay en la imagen.
> Por eso descríbelo de forma útil ("Logo de Tunal Digital"), no "imagen1.png". Y si una imagen
> es puramente decorativa, le pones `alt=""` (vacío) para que el lector de pantalla la pase por
> alto.

---

## 6. Comentarios en HTML

> ### 🟦 ¿Qué significa? — *Comentario*
> Un **comentario** es una nota que escribes en el código **para ti o tu equipo**, y que el
> navegador **ignora** (no la muestra). En HTML se escribe así:
> ```html
> <!-- Esto es un comentario. No se ve en la página. -->
> <p>Esto sí se ve.</p>
> ```
> **¿Para qué te sirve?** Para dejarte recordatorios ("aquí va el formulario de contacto") o
> para "apagar" un trozo de código un rato sin tener que borrarlo. Todos los lenguajes tienen
> su manera de comentar; las irás conociendo sobre la marcha.

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Uso los **encabezados** `<h1>`–`<h6>` por jerarquía, no por tamaño.
- [ ] Escribo **párrafos** y resalto con `<strong>` / `<em>` de forma **semántica**.
- [ ] Construyo **listas** ordenadas (`<ol>`) y no ordenadas (`<ul>`) con `<li>`.
- [ ] Creo **enlaces** `<a href>` externos, internos y de ancla (`#`).
- [ ] Inserto **imágenes** con `src` y un **`alt`** descriptivo.
- [ ] Sé escribir **comentarios** y para qué sirven.

---

## 🧪 Ejercicios

1. **Jerarquía.** Estructura con encabezados (`h1`–`h3`) el índice de una página "Sobre mí":
   un título principal, dos secciones ("Mi historia", "Mis servicios") y dos subsecciones
   dentro de "Mis servicios".
2. **¿`<ul>` u `<ol>`?** Decide cuál usar para: (a) los pasos para instalar VS Code, (b) la
   lista de tecnologías que usa tu sitio, (c) el podio de un concurso.
3. **Tipos de enlace.** Escribe tres enlaces: uno a `https://github.com`, uno a una página
   `precios.html` de tu propio sitio, y uno que salte a una sección `#contacto` de la página
   actual.
4. **Arregla el `alt`.** ¿Qué tiene de malo `<img src="foto.jpg" alt="foto">` y cómo lo
   mejorarías para una foto del equipo de tu agencia?
5. 💻 **Página de contenido.** Amplía tu `index.html` del capítulo anterior: añade un `<h2>`,
   una lista `<ul>` con tres ítems, un enlace a tu sitio favorito y una imagen (puedes usar
   cualquier imagen que tengas, ajustando el `src`). Ábrela y revísala.

➡️ Siguiente: **[Capítulo 03 — La estructura de un documento](03-estructura-documento.md)**.
