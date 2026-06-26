# Capítulo 07 — Multimedia: imágenes, audio y video

<p align="center">
  <img src="../../recursos/imagenes/01-html/cap07.png" alt="Ilustración del capítulo (pixel art con Bit)" width="640">
</p>


> Una página solo con texto es como un cuento sin dibujos: se entiende, pero no enamora. Aquí vas a aprender a poner imágenes que cargan rápido y se ven bien en cualquier pantalla, a meter audio y video con sus botones de play, y a incrustar mapas o videos de YouTube con un `iframe`. Bit, nuestro ajolote pixelado, te acompaña en el camino: él es, literalmente, una imagen, así que de esto sabe un rato.

## 1. La etiqueta `<img>`: tu primera imagen

Para mostrar una imagen en HTML usas la etiqueta `<img>`. Es una etiqueta *vacía* (no lleva cierre `</img>`) y le hacen falta dos cosas como mínimo: de dónde sale la imagen (`src`) y qué describe (`alt`).

```html
<img src="bit.png" alt="Bit, el ajolote de pixel art, saludando con la patita">
```

> ### 🟦 ¿Qué significa? — *atributo*
> Un **atributo** es información extra que le das a una etiqueta. Se escribe dentro de la etiqueta de apertura con la forma `nombre="valor"`. En `<img src="bit.png">`, `src` es un atributo y `"bit.png"` es su valor.
> **¿Para qué sirve?** Para configurar cómo se comporta una etiqueta o qué muestra.

> ### 🟦 ¿Qué significa? — *`src` (source / fuente)*
> El atributo **`src`** indica la ruta o dirección del archivo de imagen que quieres mostrar. Puede ser un archivo de tu propio proyecto (`src="imagenes/bit.png"`) o una dirección de internet (`src="https://..."`).
> **¿Para qué sirve?** Le dice al navegador *qué* imagen cargar y *desde dónde*.

> ### 🟦 ¿Qué significa? — *`alt` (texto alternativo)*
> El atributo **`alt`** es un texto que describe la imagen con palabras. Aparece cuando la imagen no carga, y lo leen en voz alta los lectores de pantalla que usan las personas con discapacidad visual.
> **¿Para qué sirve?** Para accesibilidad (que todo el mundo entienda la página) y como respaldo si la imagen falla. Google también lo usa para entender de qué trata la imagen.

> ### ⚠️ Cuidado — El `alt` no es opcional
> Toda imagen con significado debe tener `alt`. Describe lo que la imagen *comunica*, y no empieces con "imagen de..." (el lector de pantalla ya avisa que es una imagen). Si la imagen es pura decoración (un adorno sin información), deja el atributo vacío: `alt=""`. Así el lector de pantalla la ignora en lugar de leer el nombre del archivo.

> ### 🔎 En tu código
> En **tunal-digital** (`sitio-web/index.html`) cada logo, ícono o foto del sitio debería llevar su `alt`. Es lo primero que mira cualquier auditoría de accesibilidad: una página con imágenes sin `alt` pierde puntos al instante.

### Rutas: ¿dónde está la imagen?

La **ruta** es el "camino" hasta el archivo. Hay dos tipos que verás todo el tiempo:

- **Ruta relativa**: parte desde donde está tu archivo HTML. `src="imagenes/bit.png"` significa "entra a la carpeta `imagenes` y busca `bit.png`". Y `src="../logo.png"` significa "sube una carpeta y busca `logo.png`" (los dos puntos `..` quieren decir "carpeta de arriba").
- **Ruta absoluta**: una dirección completa de internet. `src="https://tunal.digital/logo.png"`.

> ### 💡 Tip — Tamaño con `width` y `height`
> Vale la pena decirle al navegador el tamaño de la imagen con `width` (ancho) y `height` (alto) en píxeles:
> ```html
> <img src="bit.png" alt="Bit saludando" width="200" height="200">
> ```
> Así el navegador reserva ese hueco *antes* de que la imagen cargue, y la página no "salta" mientras se descarga. Ese salto molesto tiene nombre técnico: *layout shift* (desplazamiento de diseño).

## 2. Los formatos de imagen: jpg, png, webp y svg

No todas las imágenes son iguales. El **formato** (la extensión del archivo: `.jpg`, `.png`, etc.) decide cuánto pesa, si tiene transparencia y para qué sirve mejor.

> ### 🟦 ¿Qué significa? — *formato de imagen*
> Un **formato** es la forma en que el archivo guarda la imagen por dentro. Lo reconoces por la extensión del nombre: `foto.jpg`, `logo.png`, `imagen.webp`, `dibujo.svg`. Cada formato comprime y guarda los colores a su manera.

Aquí va la guía rápida:

- **JPG** (o `.jpeg`): ideal para **fotografías** (paisajes, retratos). Comprime mucho y pesa poco, pero **no admite transparencia** y, si lo comprimes demasiado, se ve "sucio" (con manchas). Úsalo para fotos reales.
- **PNG**: admite **transparencia** (fondos transparentes) y se ve nítido. Pesa más que JPG. Va perfecto para **logos, íconos y capturas de pantalla** con texto.
- **WebP**: un formato moderno que pesa **menos** que JPG y PNG manteniendo buena calidad, y *sí* admite transparencia. Lo entienden todos los navegadores actuales. Hoy por hoy, es la mejor opción por defecto.
- **SVG**: es **diferente**. No guarda píxeles, guarda *instrucciones de dibujo* (líneas, curvas, colores). Por eso se puede agrandar infinitamente sin pixelarse. Ideal para **logos, íconos y gráficos** de formas planas.

> ### 🟦 ¿Qué significa? — *píxel*
> Un **píxel** es cada puntito de color de una pantalla. Una imagen "de píxeles" (jpg, png, webp) es una rejilla de puntitos: si la agrandas mucho, los puntos se hacen visibles y la imagen se ve "cuadriculada" o borrosa.

> ### 🟦 ¿Qué significa? — *transparencia*
> Una imagen con **transparencia** tiene zonas "vacías" que dejan ver lo que hay detrás. Por ejemplo, el logo de Tunal Digital con fondo transparente se ve bien sobre cualquier color de página, sin un recuadro blanco alrededor.

> ### 🟦 ¿Qué significa? — *vectorial (SVG)*
> Una imagen **vectorial** está hecha de fórmulas matemáticas (puntos y líneas) en vez de píxeles. Por eso un SVG se ve perfecto en una pantalla pequeña y en una pantalla gigante con el mismo archivo, sin pesar más.
> **¿Dónde se usa en tu proyecto?** Los íconos de la interfaz de **RachaSimple** (React + TypeScript) suelen ser SVG: nítidos en cualquier pantalla y muy livianos.

> ### 💡 Tip — ¿Cuál elijo? Regla de bolsillo de Bit
> - ¿Es una **foto**? → WebP (o JPG si necesitas máxima compatibilidad).
> - ¿Es un **logo o ícono** de formas planas? → SVG.
> - ¿Necesitas **transparencia** en algo con muchos detalles? → PNG o WebP.
> Bit, al ser pixel art, vive feliz como **PNG** con fondo transparente.

> ### ⚠️ Cuidado — El peso importa
> Una foto de 5 MB sacada del celular hace que tu página tarde *segundos* en cargar. Antes de subir una imagen, redúcela: que mida lo que de verdad va a ocupar en pantalla y guárdala en WebP. Una página rápida retiene visitantes; una lenta los espanta.

## 3. Imágenes responsive: `srcset` y `<picture>`

> ### 🟦 ¿Qué significa? — *responsive (adaptable)*
> Una página **responsive** se *adapta* al tamaño de la pantalla: se ve bien en el celular, en la tablet y en el computador. En el caso de las imágenes, ser responsive significa enviar una imagen pequeña a pantallas pequeñas y una grande a pantallas grandes, sin desperdiciar datos.

Mandarle una foto enorme a un celular gasta los datos del usuario y carga lento. La solución es darle al navegador **varias versiones** de la misma imagen y dejar que él elija la mejor. Para eso existe `srcset`.

### `srcset`: varias resoluciones de la misma imagen

```html
<img
  src="bit-800.png"
  srcset="bit-400.png 400w, bit-800.png 800w, bit-1200.png 1200w"
  sizes="(max-width: 600px) 100vw, 50vw"
  alt="Bit, el ajolote de pixel art">
```

> ### 🟦 ¿Qué significa? — *`srcset`*
> El atributo **`srcset`** es una lista de versiones de la imagen, cada una con su ancho real en píxeles seguido de la letra `w` (de *width*, ancho). En el ejemplo, `bit-400.png 400w` quiere decir "esta versión mide 400 píxeles de ancho".
> **¿Para qué sirve?** El navegador mira la pantalla del usuario y descarga *solo* la versión que mejor le sirve. Ahorra datos y carga más rápido.

> ### 🟦 ¿Qué significa? — *`sizes`*
> El atributo **`sizes`** le dice al navegador *cuánto espacio* va a ocupar la imagen en pantalla, para que elija bien de la lista `srcset`. `100vw` significa "el 100% del ancho de la ventana"; `50vw`, "la mitad".

> ### 🟦 ¿Qué significa? — *`vw` (viewport width)*
> **`vw`** es una unidad de medida: `1vw` es el 1% del ancho de la ventana del navegador. Así, `100vw` es todo el ancho visible y `50vw` la mitad. La ventana visible se llama *viewport*.

No te agobies si `sizes` te parece raro al principio: el `src` normal siempre funciona como respaldo. `srcset` y `sizes` son una mejora que va encima.

### `<picture>`: imágenes distintas según el caso

A veces no quieres solo *otro tamaño*, sino *otra imagen* o *otro formato*. Para eso está `<picture>`.

```html
<picture>
  <source srcset="hero.webp" type="image/webp">
  <source srcset="hero.jpg" type="image/jpeg">
  <img src="hero.jpg" alt="Equipo de Tunal Digital trabajando">
</picture>
```

> ### 🟦 ¿Qué significa? — *`<picture>`*
> La etiqueta **`<picture>`** envuelve varias opciones de imagen. Dentro pones varias etiquetas `<source>` (las opciones) y *siempre* un `<img>` al final como respaldo obligatorio. El navegador prueba las `<source>` de arriba hacia abajo y usa la primera que entienda.
> **¿Para qué sirve?** Para servir WebP a quien lo soporte y JPG a quien no, o para cambiar de imagen según el tamaño de pantalla (una foto horizontal en computador y una cuadrada en móvil, por ejemplo).

> ### 🔎 En tu código
> La portada de **tunal-digital** (la imagen grande de arriba, el *hero*) es candidata perfecta para `<picture>`: WebP optimizado para quien lo soporte, con un JPG de respaldo en el `<img>`. Resultado: carga rápida sin dejar a nadie fuera.

> ### 💡 Tip — `<picture>` vs `srcset`
> - Si solo cambias **tamaño** de la *misma* imagen → usa `srcset` + `sizes` en un `<img>`.
> - Si cambias de **formato** o de **imagen** según el caso → usa `<picture>` con varias `<source>`.

## 4. Lazy loading: cargar imágenes cuando se necesitan

> ### 🟦 ¿Qué significa? — *lazy loading (carga perezosa)*
> **Lazy loading** significa que el navegador *no descarga* una imagen hasta que el usuario está a punto de verla al hacer scroll. Las imágenes de más abajo esperan su turno.
> **¿Para qué sirve?** Para que la página cargue rápido al principio: solo baja lo que se ve, no las 30 imágenes que están metros más abajo.

Activarlo es cuestión de una sola palabra:

```html
<img src="foto-galeria.webp" alt="Caso de éxito de un cliente" loading="lazy">
```

> ### ⚠️ Cuidado — No uses `lazy` en la imagen principal
> A la imagen grande de arriba del todo (el *hero*, lo primero que se ve) **no** le pongas `loading="lazy"`. Esa la quieres cargar de inmediato. El lazy loading es para las imágenes que están *más abajo*, fuera de la pantalla inicial.

> ### 🔎 En tu código
> En **Faro** (la carpeta *Organizer*, hecho con Next.js) y en **RachaSimple** notarás que el framework trae su propio componente de imagen optimizada (`next/image` en el caso de Next.js) que aplica lazy loading, `srcset` y formatos modernos casi solo. Aun así, entender qué hace por debajo (esto que acabas de aprender) te vuelve mucho mejor a la hora de depurar cuando algo se ve mal.

## 5. Audio con `<audio>`

Para reproducir sonido se usa la etiqueta `<audio>`.

```html
<audio src="bienvenida.mp3" controls></audio>
```

> ### 🟦 ¿Qué significa? — *`controls`*
> El atributo **`controls`** le dice al navegador que muestre los botones de reproducción (play, pausa, volumen, barra de avance). Sin `controls`, el reproductor existe pero queda invisible.
> **¿Para qué sirve?** Para que el usuario pueda controlar el sonido. Casi siempre lo vas a querer.

Como no todos los navegadores entienden los mismos formatos de audio, puedes ofrecer varias opciones con `<source>` dentro:

```html
<audio controls>
  <source src="bienvenida.mp3" type="audio/mpeg">
  <source src="bienvenida.ogg" type="audio/ogg">
  Tu navegador no soporta audio. <a href="bienvenida.mp3">Descárgalo aquí.</a>
</audio>
```

El texto del final solo aparece si el navegador no entiende `<audio>`: es un respaldo amable.

> ### 🟦 ¿Qué significa? — *`type` (en source)*
> El atributo **`type`** le dice al navegador qué tipo de archivo es *antes* de descargarlo (`audio/mpeg` para MP3, `audio/ogg` para OGG). Así elige el primero que sepa reproducir sin malgastar descarga.

> ### ⚠️ Cuidado — `autoplay` molesta
> Existe el atributo `autoplay`, que arranca el sonido solo al cargar la página. **Evítalo.** Que una página empiece a sonar sin permiso es de las cosas que más irritan a la gente, y los navegadores modernos suelen bloquearlo de todos modos. Deja que el usuario apriete play.

## 6. Video con `<video>`

El video funciona casi igual que el audio, con la etiqueta `<video>`:

```html
<video controls width="640" poster="portada-video.webp">
  <source src="demo.mp4" type="video/mp4">
  <source src="demo.webm" type="video/webm">
  Tu navegador no soporta video.
</video>
```

> ### 🟦 ¿Qué significa? — *`poster`*
> El atributo **`poster`** es la imagen que se muestra *antes* de darle play al video (como la "carátula"). Sin `poster`, lo normal es ver un cuadro negro o el primer fotograma.
> **¿Para qué sirve?** Para que el video se vea atractivo aunque todavía no haya empezado a reproducirse.

Atributos útiles del video:

- `controls`: muestra los botones (igual que en audio).
- `width` / `height`: tamaño del reproductor.
- `muted`: arranca sin sonido.
- `loop`: lo repite en bucle al terminar.
- `playsinline`: en móviles, lo reproduce dentro de la página en vez de a pantalla completa.

> ### 💡 Tip — El truco del video de fondo
> ¿Has visto webs con un video de fondo silencioso que se repite solo? El secreto es combinar `autoplay muted loop playsinline`. La clave es **`muted`**: los navegadores *sí* permiten autoplay si el video va en silencio (porque entonces no molesta). Sin `muted`, el autoplay se bloquea.

> ### ⚠️ Cuidado — El video pesa, y mucho
> Un video tuyo alojado en tu propio servidor puede pesar decenas de megas y dispararte el ancho de banda. Si es un video largo o importante, casi siempre conviene subirlo a YouTube o Vimeo e **incrustarlo** (lo vemos ahora) en vez de servirlo tú mismo.

## 7. `iframe`: incrustar mapas y videos de YouTube

> ### 🟦 ¿Qué significa? — *`iframe` (marco en línea)*
> Un **`iframe`** es una "ventana" dentro de tu página que muestra *otra* página web completa por dentro. Como un cuadro que abre otro sitio.
> **¿Para qué sirve?** Para incrustar contenido externo: un mapa de Google Maps, un video de YouTube, un formulario, etc., sin tener que construirlo tú.

Un video de YouTube incrustado se ve así (YouTube te da este código en su botón "Compartir → Insertar"):

```html
<iframe
  width="560" height="315"
  src="https://www.youtube.com/embed/VIDEO_ID"
  title="Video de presentación de Tunal Digital"
  loading="lazy"
  allowfullscreen></iframe>
```

> ### 🟦 ¿Qué significa? — *`allowfullscreen`*
> El atributo **`allowfullscreen`** permite que el contenido del iframe (el video) pueda ponerse a pantalla completa cuando el usuario aprieta ese botón. Sin él, el botón no funciona.

Un mapa de Google Maps se incrusta igual: copias el código de "Compartir → Insertar un mapa" y pegas el `<iframe>` que te dan. La estructura es la misma; lo único que cambia es el `src`.

### Los riesgos del `iframe`

Incrustar contenido de *otros* tiene su lado peligroso, porque estás metiendo código ajeno en tu página.

> ### ⚠️ Cuidado — Solo incrusta fuentes en las que confíes
> El contenido de un iframe viene de otro sitio. Si ese sitio es malicioso o lo hackean, puedes acabar mostrando algo dañino a tus visitantes. Incrusta solo de fuentes serias y conocidas (YouTube, Google Maps, Vimeo). Nunca pegues un `<iframe>` de una web random que no conoces.

> ### 🟦 ¿Qué significa? — *`sandbox` (caja de arena)*
> El atributo **`sandbox`** encierra el iframe en una "caja de arena": limita lo que el contenido externo puede hacer (por ejemplo, le impide abrir ventanas emergentes o ejecutar ciertos scripts).
> **¿Para qué sirve?** Para protegerte: aunque el contenido incrustado intente algo raro, queda restringido. Es una capa de seguridad cuando incrustas algo en lo que no confías al 100%.

> ### 💡 Tip — `loading="lazy"` también en iframes
> Un iframe de YouTube descarga *mucho* (el reproductor entero). Ponerle `loading="lazy"` hace que no se cargue hasta que el usuario haga scroll hasta él. Tu página agradecerá la velocidad.

## 8. La imagen que nunca se ve en la página: `og:image`

Hay una imagen importantísima que el visitante **no ve dentro de tu web**, pero que aparece cuando alguien comparte tu enlace en WhatsApp, Facebook, LinkedIn o X: es la imagen de la **tarjeta de previsualización**. Esa imagen se define con `og:image`.

> ### 🟦 ¿Qué significa? — *`og:image` (Open Graph image)*
> **`og:image`** es una etiqueta especial que pones en el `<head>` (la cabeza del documento) para decir qué imagen mostrar cuando tu enlace se comparte en redes sociales. "Open Graph" es el sistema que usan Facebook y otras redes para leer estos datos.
> **¿Para qué sirve?** Para que tu enlace, al compartirse, salga con una imagen atractiva en vez de un recuadro vacío. Da confianza y atrae clics.

Se define así, dentro del `<head>`:

```html
<head>
  <meta property="og:title" content="Tunal Digital — Sitios web para tu negocio">
  <meta property="og:description" content="Creamos páginas rápidas y modernas.">
  <meta property="og:image" content="https://tunal.digital/og-image.png">
  <meta property="og:url" content="https://tunal.digital">
</head>
```

> ### 🟦 ¿Qué significa? — *`<meta>` (metadato)*
> Una etiqueta **`<meta>`** guarda información *sobre* la página que no se muestra en pantalla: para buscadores, redes sociales o el navegador. La pareja `property="..."` + `content="..."` dice "esta propiedad vale esto".

> ### 🔎 En tu código
> En **tunal-digital** (`sitio-web/index.html`), el `og:image` es el que define cómo se ve el sitio cuando lo compartes. Recomendaciones reales:
> - Tamaño ideal: **1200 × 630 píxeles**.
> - Formato: PNG o JPG (las redes no siempre leen WebP en esta etiqueta).
> - Usa una **URL absoluta completa** (`https://tunal.digital/og-image.png`), no una ruta relativa: las redes la leen desde sus propios servidores y necesitan la dirección entera.
> - Que la imagen tenga el logo y un mensaje claro: es la primera impresión de tu marca en el chat de alguien.

> ### 💡 Tip — Pruébalo antes de presumir
> Antes de compartir tu enlace por todos lados, comprueba cómo se verá la tarjeta con un "depurador" (por ejemplo el *Sharing Debugger* de Facebook o el *Post Inspector* de LinkedIn). Pegas tu URL y te muestran exactamente la previsualización. Así no te llevas sorpresas.

## ✅ Checklist — ¿ya domino esto?

- [ ] Sé poner una imagen con `<img>` usando `src` y `alt`, y entiendo por qué el `alt` es obligatorio.
- [ ] Distingo cuándo usar JPG, PNG, WebP y SVG.
- [ ] Entiendo qué es una imagen responsive y para qué sirven `srcset` y `sizes`.
- [ ] Sé cuándo usar `<picture>` en vez de `srcset` solo.
- [ ] Aplico `loading="lazy"` a las imágenes de abajo, pero no al *hero*.
- [ ] Puedo insertar audio y video con `<audio>` y `<video>`, con `controls` y `<source>` de respaldo.
- [ ] Sé por qué `autoplay` con sonido es mala idea y cómo hacer un video de fondo con `muted`.
- [ ] Entiendo qué es un `iframe`, cómo incrustar YouTube/Maps y los riesgos de incrustar fuentes desconocidas.
- [ ] Sé qué es `og:image` y por qué importa para compartir el enlace de tunal-digital.

## 🧪 Ejercicios

1. **💻 Galería responsive.** Crea un archivo `galeria.html`. Mete tres imágenes diferentes, cada una con su `alt` descriptivo y `width`/`height`. Ponle `loading="lazy"` a la segunda y la tercera. Ábrelo en el navegador y verifica que se ven.

2. **💻 El reto del formato.** Toma una foto tuya (jpg) y un logo o ícono. Para cada uno, escribe en un comentario HTML (`<!-- ... -->`) qué formato sería el mejor y por qué. Si puedes, convierte la foto a WebP con una herramienta online y compara cuánto bajó de peso.

3. **💻 Picture con respaldo.** Escribe un bloque `<picture>` que ofrezca una versión `.webp` y una `.jpg` de la misma imagen, con su `<img>` de respaldo. No necesitas tener los dos archivos reales para escribir la estructura correctamente.

4. **💻 Video con carátula.** Inserta un `<video>` con `controls` y un `poster`. Añade dos `<source>` (un `.mp4` y un `.webm`) y un texto de respaldo por si el navegador no soporta video.

5. **💻 Incrusta un mapa.** Ve a Google Maps, busca un lugar, usa "Compartir → Insertar un mapa", copia el `<iframe>` y pégalo en una página. Añádele `title` y `loading="lazy"`. Reflexiona: ¿confías en la fuente? (Sí: es Google).

6. **Diseña tu `og:image`.** En papel o en una herramienta de diseño, esboza la tarjeta de previsualización de tunal-digital en 1200 × 630: ¿qué logo, qué frase y qué colores pondrías para que alguien quiera hacer clic al verla en un chat?

> Bit te despide moviendo sus branquias rosas: «Una imagen bien hecha pesa poco, dice mucho y se ve en cualquier pantalla. ¡Esa es la magia! Nos vemos en el próximo capítulo. 🐾»
