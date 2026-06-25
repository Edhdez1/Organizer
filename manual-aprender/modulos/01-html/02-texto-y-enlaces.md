# Capítulo 02 — Etiquetas de texto y enlaces

> Ya sabes qué es una etiqueta. Ahora vamos a conocer las que usarás el 90% del tiempo: las de
> texto, listas, enlaces e imágenes. Con estas ya puedes construir páginas de contenido real.

---

## 1. Títulos: de `<h1>` a `<h6>`

Los títulos organizan el contenido en una jerarquía, como los capítulos y subcapítulos de un
libro.

> ### 🟦 ¿Qué significa? — *Encabezado (heading)*
> Un **encabezado** es un título. HTML tiene seis niveles, de `<h1>` (el más importante) a
> `<h6>` (el menos). La `h` es de *heading*.
> ```html
> <h1>Título principal de la página</h1>
> <h2>Una sección</h2>
> <h3>Una subsección dentro de esa sección</h3>
> ```

> ### ⚠️ Cuidado — Los títulos NO son para "hacer letra grande"
> Es tentador usar `<h1>` solo porque se ve grande. **No lo hagas.** Los encabezados comunican
> *estructura*, no tamaño: los buscadores (Google) y los lectores de pantalla los usan para
> entender de qué trata la página. Para cambiar el tamaño visual se usa **CSS** (módulo 02).
> Regla práctica: **un solo `<h1>` por página** (el tema principal), y debajo `<h2>`, `<h3>`…
> en orden, sin saltarte niveles.

> ### 🔎 En tu código
> En `tunal-digital/sitio-web/index.html`, el `<h1>` es el mensaje principal de tu negocio.
> Las secciones (servicios, precios, contacto) son `<h2>`. Esa jerarquía es la que Google lee
> para posicionar tu sitio.

---

## 2. Párrafos y texto

> ### 🟦 ¿Qué significa? — *Párrafo `<p>`*
> La etiqueta `<p>` (de *paragraph*) envuelve un bloque de texto. El navegador le pone espacio
> arriba y abajo automáticamente para separarlo de lo demás.

Dentro de un párrafo puedes resaltar palabras con significado:

> ### 🟦 ¿Qué significa? — *Énfasis semántico: `<strong>` y `<em>`*
> - `<strong>` marca algo **importante** (el navegador lo muestra en negrita).
> - `<em>` marca *énfasis* (lo muestra en cursiva; *em* = *emphasis*).
> ```html
> <p>Esto es <strong>muy importante</strong> y esto va con <em>énfasis</em>.</p>
> ```
> La palabra clave es **semántico**: no usas `<strong>` "para poner negrita", sino "para decir
> que esto importa". El aspecto (negrita/cursiva) es una consecuencia, no el objetivo. ¿Por
> qué importa la distinción? Porque un lector de pantalla *cambia el tono de voz* en un
> `<strong>`, comunicando la importancia a quien no ve la pantalla.

> ### 🟦 ¿Qué significa? — *Salto de línea `<br>` y línea divisoria `<hr>`*
> - `<br>` fuerza un **salto de línea** dentro de un texto (es un elemento "vacío", no se
>   cierra). Úsalo con moderación: para separar bloques, mejor usa párrafos.
> - `<hr>` dibuja una **línea horizontal** que separa temas (*horizontal rule*).

---

## 3. Listas

Hay dos tipos principales, y se usan muchísimo (¡los menús de navegación son listas!).

> ### 🟦 ¿Qué significa? — *Lista no ordenada `<ul>` y elementos `<li>`*
> Una **lista no ordenada** (*unordered list*) muestra viñetas (puntos). Cada ítem va en un
> `<li>` (*list item*):
> ```html
> <ul>
>   <li>Diseño web</li>
>   <li>Automatización con IA</li>
>   <li>Marketing</li>
> </ul>
> ```
> Se ve como:
> - Diseño web
> - Automatización con IA
> - Marketing

> ### 🟦 ¿Qué significa? — *Lista ordenada `<ol>`*
> Una **lista ordenada** (*ordered list*) numera automáticamente. Misma estructura, pero con
> `<ol>`. Úsala cuando el orden importa (pasos de una receta, un ranking).
> ```html
> <ol>
>   <li>Calienta el agua</li>
>   <li>Agrega el café</li>
>   <li>Sirve</li>
> </ol>
> ```

> ### 🔎 En tu código
> El menú de navegación de tu sitio es, por dentro, una `<ul>` con un `<li>` por cada enlace
> ("Inicio", "Servicios", "Contacto"). Eso es lo correcto: un menú **es** una lista de opciones.

---

## 4. Enlaces: el corazón de la web

> ### 🟦 ¿Qué significa? — *Enlace `<a>` y el atributo `href`*
> La etiqueta `<a>` (*anchor*, ancla) crea un **enlace**: texto en el que se hace clic para ir
> a otro sitio. El atributo `href` indica **a dónde** lleva.
> ```html
> <a href="https://tunaldigital.com">Visita mi sitio</a>
> ```

Hay tres destinos típicos:

> ### 🟦 ¿Qué significa? — *Enlace externo, interno y ancla*
> - **Externo** (a otra web): URL completa → `href="https://google.com"`.
> - **Interno** (a otra página de tu propio sitio): ruta relativa →
>   `href="contacto.html"` (busca ese archivo en tu sitio).
> - **Ancla** (a una sección de la misma página): empieza con `#` →
>   `href="#precios"` salta a un elemento con `id="precios"`.

> ### 💡 Tip — Abrir en una pestaña nueva
> Para que un enlace externo abra en otra pestaña (y el usuario no abandone tu sitio):
> ```html
> <a href="https://google.com" target="_blank" rel="noopener">Google</a>
> ```
> `target="_blank"` abre en pestaña nueva; `rel="noopener"` es una protección de seguridad
> recomendada al usar `_blank` (evita que la página abierta manipule la tuya).

> ### 🟦 ¿Qué significa? — *URL absoluta vs. relativa*
> Una **URL absoluta** es la dirección completa (`https://tunaldigital.com/contacto.html`):
> funciona desde cualquier lugar. Una **URL relativa** (`contacto.html` o `./img/logo.png`) se
> interpreta *respecto a dónde estás ahora*. Para enlazar páginas de tu propio sitio se usan
> relativas; para sitios ajenos, absolutas. (Esto es lo mismo que viste con las *rutas* de
> archivos en el Módulo 00.)

---

## 5. Imágenes

> ### 🟦 ¿Qué significa? — *Imagen `<img>` y sus atributos `src` y `alt`*
> La etiqueta `<img>` inserta una imagen. Es un elemento "vacío" (no se cierra). Necesita dos
> atributos clave:
> - `src` (*source*, fuente): la **ruta** del archivo de imagen.
> - `alt` (*alternative text*): una **descripción en texto** de la imagen.
> ```html
> <img src="img/logo.png" alt="Logo de Tunal Digital">
> ```

> ### ⚠️ Cuidado — El `alt` no es opcional
> El texto `alt` cumple tres funciones importantísimas:
> 1. Lo **leen en voz alta** los lectores de pantalla para personas ciegas.
> 2. Se muestra si la imagen **no carga** (conexión lenta, ruta mal escrita).
> 3. Lo usan los **buscadores** para entender la imagen.
> Descríbelo de forma útil ("Logo de Tunal Digital"), no "imagen1.png". Si una imagen es
> puramente decorativa, se pone `alt=""` (vacío) para que el lector de pantalla la ignore.

---

## 6. Comentarios en HTML

> ### 🟦 ¿Qué significa? — *Comentario*
> Un **comentario** es una nota que escribes en el código **para ti o tu equipo**, que el
> navegador **ignora** (no se muestra). En HTML se escribe así:
> ```html
> <!-- Esto es un comentario. No se ve en la página. -->
> <p>Esto sí se ve.</p>
> ```
> **¿Para qué sirve?** Para dejar recordatorios ("aquí va el formulario de contacto") o para
> "apagar" temporalmente un trozo de código sin borrarlo. Todos los lenguajes tienen su forma
> de comentar; la irás viendo.

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
