# Capítulo 11 — Entidades, símbolos y texto

<p align="center">
  <img src="../../recursos/imagenes/01-html/cap11.png" alt="Ilustración del capítulo (pixel art con Bit)" width="640">
</p>


> Hasta ahora has escrito texto normal en HTML y todo ha ido sobre ruedas. Pero llega el momento en que quieres mostrar el símbolo `<` en pantalla, o el signo de copyright ©, o un emoji 🐾, y la cosa se complica. Resulta que algunos caracteres tienen un significado especial para el navegador y no puedes escribirlos a secas. En este capítulo vas a ver las **entidades HTML** (esos "códigos de escape" del texto), cómo colocar símbolos y emojis, y un puñado de etiquetas de texto poco conocidas pero la mar de útiles para escribir páginas más claras y honestas. Bit, nuestro ajolote pixelado, viene con su mochila de símbolos raros.

---

## 1. ¿Por qué algunos caracteres dan problemas?

Imagina que en tu sitio **tunal-digital** quieres escribir un texto que diga, literalmente:

> Para crear un párrafo se usa la etiqueta `<p>`.

Si lo escribes así de directo dentro de tu `index.html`:

```html
<p>Para crear un párrafo se usa la etiqueta <p>.</p>
```

El navegador se lía. Ve `<p>` y piensa: "¡Ajá, aquí se abre otro párrafo!". No tiene forma de saber que tú solo querías **mostrar** esas letras en la pantalla. El símbolo `<` funciona como una palabra reservada: en cuanto el navegador lo encuentra, da por hecho que empieza una etiqueta.

Con el símbolo `&` (ampersand, el "y comercial") pasa exactamente lo mismo: el navegador lo entiende como el arranque de un código especial. Para mostrar estos caracteres **tal cual**, sin que el navegador se ponga a interpretarlos, echamos mano de las **entidades HTML**.

> ### 🟦 ¿Qué significa? — *Entidad HTML*
> Una **entidad HTML** es un código corto que escribes en lugar de un carácter especial, para que el navegador lo muestre como texto normal en vez de interpretarlo. Siempre empieza con `&` (ampersand) y termina con `;` (punto y coma). Por ejemplo, en lugar de escribir `<` escribes `&lt;`.
> **¿Para qué sirve?** Para mostrar en pantalla símbolos que, escritos directamente, el navegador entendería como parte del código HTML (o que el teclado no tiene a mano).

> ### 💡 Tip — La fórmula de toda entidad
> Toda entidad sigue el mismo molde: **`&` + un nombre o número + `;`**. Si se te escapa el punto y coma del final, la entidad no funciona y verás el código crudo en pantalla. El `;` es como el punto final de la frase mágica: sin él, no hay hechizo.

---

## 2. Las cinco entidades que sí o sí debes conocer

Existen cientos de entidades, pero en el día a día siempre se repiten las mismas cuatro o cinco. Estas son las imprescindibles:

| Quieres mostrar | Escribes | Nombre |
|-----------------|----------|--------|
| `&` | `&amp;` | ampersand (y comercial) |
| `<` | `&lt;` | "less than" (menor que) |
| `>` | `&gt;` | "greater than" (mayor que) |
| `©` | `&copy;` | copyright |
| (un espacio que no se rompe) | `&nbsp;` | espacio duro |

Mira los nombres en inglés, que son la mejor pista para recordarlos: `lt` = *less than* (menor que), `gt` = *greater than* (mayor que), `amp` = *ampersand*, `copy` = *copyright*.

### `&amp;` — para el símbolo &

```html
<p>HTML &amp; CSS son la base de la web.</p>
```

En la pantalla se lee: *HTML & CSS son la base de la web.*

### `&lt;` y `&gt;` — para mostrar etiquetas como texto

Volvamos al ejemplo del principio. Escrito así, ahora sí funciona:

```html
<p>Para crear un párrafo se usa la etiqueta &lt;p&gt;.</p>
```

En pantalla se lee tal cual lo querías: *Para crear un párrafo se usa la etiqueta `<p>`.* El navegador pinta los símbolos `<` y `>` como texto y no se confunde.

> ### 🔎 En tu código
> En el pie de página (footer) de **tunal-digital** seguramente tienes un aviso de derechos. Es el sitio ideal para `&copy;`:
> ```html
> <footer>
>   <p>&copy; 2026 Tunal Digital. Todos los derechos reservados.</p>
> </footer>
> ```
> En pantalla se ve: *© 2026 Tunal Digital. Todos los derechos reservados.* Si pones el año a mano, acuérdate de actualizarlo cada enero (más adelante, en el módulo de JavaScript, aprenderás a ponerlo de forma automática).

### `&nbsp;` — el espacio que no se rompe

> ### 🟦 ¿Qué significa? — *`&nbsp;` (espacio de no separación)*
> `&nbsp;` viene de *non-breaking space*, "espacio que no se rompe". A la vista es un espacio de lo más normal, pero esconde una regla especial: el navegador **nunca** parte la línea justo ahí.
> **¿Para qué sirve?** Para mantener pegadas dos palabras (o una cifra y su unidad) que quedarían feas separadas en líneas distintas. Por ejemplo, evitar que "10 km" se quede con el "10" al final de una línea y "km" al principio de la siguiente.

```html
<p>El plan cuesta 50&nbsp;USD al mes.</p>
```

Así "50" y "USD" viajan siempre juntos, sin que la línea los separe.

> ### ⚠️ Cuidado — No abuses de `&nbsp;` para "empujar" texto
> Es tentador encadenar varios `&nbsp;&nbsp;&nbsp;` para mover algo a la derecha o dejar un hueco. **No caigas en eso.** Para separar, alinear y dar aire a los elementos está CSS (lo verás en el Módulo 02). Llenar todo de espacios duros es como apilar libros para nivelar una mesa coja: tira un rato, pero se nota el apaño.

---

## 3. Caracteres especiales y emojis

Más allá de las cinco básicas, hay entidades para acentos, símbolos de moneda, flechas y un largo etcétera. Algunos ejemplos que te sacarán de apuros:

| Muestra | Entidad | Para qué |
|---------|---------|----------|
| `€` | `&euro;` | euro |
| `«` `»` | `&laquo;` `&raquo;` | comillas angulares |
| `—` | `&mdash;` | raya larga |
| `→` | `&rarr;` | flecha derecha |
| `★` | `&starf;` | estrella rellena |

También están las entidades **numéricas**, que en lugar de un nombre usan un número precedido de `#`. Por ejemplo, `&#169;` es exactamente lo mismo que `&copy;` (el © otra vez). Sirven para cualquier carácter, incluidos los que no tienen un nombre propio.

> ### 🟦 ¿Qué significa? — *Entidad numérica*
> Una **entidad numérica** es una entidad que, en vez de un nombre fácil de recordar (como `copy` o `lt`), usa el **número** que identifica a ese carácter dentro del estándar de texto. Se escribe `&#` + el número + `;`. Por ejemplo, `&#169;` es el copyright ©.
> **¿Para qué sirve?** Para escribir cualquier símbolo, hasta los más raros que no tienen un nombre con letras. Si das con el número de un carácter, puedes mostrarlo aunque no exista una entidad con nombre para él. En el día a día casi siempre tirarás de las de nombre, que se leen mucho mejor.

> ### 💡 Tip — Si tu archivo es UTF-8, los acentos van directos
> En el Capítulo 02 viste la etiqueta `<meta charset="UTF-8">`. Mientras la tengas en tu `<head>` y guardes el archivo como UTF-8 (lo habitual hoy), puedes escribir acentos y la **ñ** sin más rodeos: *programación*, *niño*, *café*. Para eso no necesitas entidades. Las entidades te las guardas para los caracteres de verdad reservados (`<`, `>`, `&`) o para símbolos raros que no tienes en el teclado.

### ¿Y los emojis?

Buena noticia: los emojis no son más que caracteres de texto. Si tu archivo es UTF-8, los pegas directamente y listo:

```html
<p>¡Bienvenido a Tunal Digital! 🚀</p>
<p>Sígueme en redes 📸 y escríbeme ✉️</p>
```

Aquí no hace falta ninguna entidad. Cópialos del teclado de emojis (en Windows, tecla Windows + punto; en Mac, Control + Comando + Espacio) y pégalos donde quieras.

> ### ⚠️ Cuidado — Un emoji no reemplaza al texto para todos
> Una persona ciega navega con un **lector de pantalla** (un programa que lee la página en voz alta). Un emoji 📞 se lee como "teléfono", lo cual puede venir bien, pero un emoji decorativo suelto puede sonar raro o despistar. Úsalos para acompañar el texto, nunca para sustituirlo. Un botón que solo diga 🗑️ es menos claro que uno que diga 🗑️ Eliminar.

> ### 🟦 ¿Qué significa? — *Lector de pantalla*
> Un **lector de pantalla** es un programa que lee en voz alta lo que hay en pantalla para personas con poca o ninguna visión. Recorre tu HTML y va narrando los textos, los enlaces y los botones.
> **¿Para qué sirve?** Es la razón por la que escribimos HTML claro y con buen significado (texto en los enlaces, `alt` en las imágenes, etiquetas correctas): para que tu página la pueda usar todo el mundo, no solo quien ve la pantalla.

---

## 4. Etiquetas de texto menos comunes (pero muy útiles)

Ya conoces `<p>`, `<strong>`, `<em>` y los títulos `<h1>`-`<h6>`. Ahora vamos con un grupo de etiquetas más especializadas. Cada una le da un **significado** preciso a un trozo de texto, y eso ayuda al navegador, a los buscadores y a los lectores de pantalla a entender mejor tu contenido.

> ### 🟦 ¿Qué significa? — *Significado semántico*
> Que una etiqueta tenga **significado semántico** quiere decir que no solo cambia cómo se ve el texto, sino que explica **qué es** ese texto. Por ejemplo, `<time>` no solo muestra una fecha: le dice a la máquina "esto es una fecha".
> **¿Para qué sirve?** Para que buscadores como Google, los navegadores y las herramientas de accesibilidad entiendan tu contenido y puedan hacer cosas inteligentes con él.

### `<abbr>` — abreviaturas con su explicación

```html
<p>Mi sitio usa la <abbr title="Application Programming Interface">API</abbr> de Claude.</p>
```

La etiqueta `<abbr>` marca una abreviatura o sigla. El atributo `title` guarda el significado completo, y cuando el usuario pasa el ratón por encima aparece un globito con la explicación.

> ### 🔎 En tu código
> En **tunal-digital** manejas siglas como **API**, **HTML**, **CSS** o **JS**. Marcarlas con `<abbr title="...">` la primera vez que aparecen en un texto hace tu página más profesional y más fácil de seguir para quien no conoce el término.

### `<time>` — fechas y horas que la máquina entiende

```html
<p>Publicado el <time datetime="2026-06-25">25 de junio de 2026</time>.</p>
```

El texto visible lo escribes como te dé la gana ("25 de junio de 2026"), pero el atributo `datetime` guarda la fecha en un formato estándar (`AAAA-MM-DD`) que las máquinas leen sin pestañear. Viene de perlas para artículos de blog, eventos o avisos.

### `<mark>` — resaltar como con marcador fluorescente

```html
<p>Recuerda: <mark>nunca subas tus claves secretas a GitHub</mark>.</p>
```

`<mark>` resalta texto, como si pasaras un marcador amarillo por encima. Sirve para destacar lo importante de un fragmento, por ejemplo una palabra que el usuario acaba de buscar.

### `<code>` — texto que es código

```html
<p>Para un párrafo se usa la etiqueta <code>&lt;p&gt;</code>.</p>
```

`<code>` indica que un trozo de texto es **código de programación**. El navegador suele mostrarlo con una tipografía monoespaciada (todas las letras del mismo ancho, como las máquinas de escribir de antes). Fíjate en cómo combinamos `<code>` con las entidades `&lt;` y `&gt;` para enseñar la etiqueta sin que se interprete.

> ### 💡 Tip — En este manual usas `<code>` todo el tiempo
> Cada vez que en estos capítulos ves una palabra como `<p>` o `&amp;` con fondo gris y letra de "máquina de escribir", por debajo hay un `<code>`. Es la forma estándar de decir "esto es código, no prosa normal".

### `<kbd>` — teclas que el usuario debe pulsar

```html
<p>Para guardar, pulsa <kbd>Ctrl</kbd> + <kbd>S</kbd>.</p>
```

`<kbd>` (de *keyboard*, teclado) marca teclas o atajos que el usuario tiene que presionar. Es un imprescindible en manuales y tutoriales.

### `<blockquote>` y `<cite>` — citas largas con su fuente

> ### 🟦 ¿Qué significa? — *`<blockquote>` (cita en bloque)*
> `<blockquote>` envuelve una **cita larga**: un párrafo o varios que tomas de otra fuente. El navegador suele mostrarlo separado y con sangría (un poco más adentro). Para indicar de dónde sale la cita, usas `<cite>`, que marca el **título de la obra o el nombre de la fuente**.
> **¿Para qué sirve?** Para citar a alguien o algo de forma clara y honesta, dejando ver que esas palabras no son tuyas sino de la fuente que indicas.

```html
<blockquote>
  <p>La simplicidad es la máxima sofisticación.</p>
  <footer>— <cite>Leonardo da Vinci</cite></footer>
</blockquote>
```

> ### ⚠️ Cuidado — No confundas `<blockquote>` con `<q>`
> `<blockquote>` es para citas **largas**, en bloque, separadas del texto. Para una cita **corta dentro de una frase** existe `<q>`, que añade las comillas solo: `Bit dijo <q>¡el código es poesía!</q>`. Una va en bloque, la otra va en línea.

### `<sup>` y `<sub>` — texto encima y debajo

```html
<p>El área es de 20 m<sup>2</sup>.</p>
<p>La fórmula del agua es H<sub>2</sub>O.</p>
```

`<sup>` (de *superscript*, superíndice) sube el texto, ideal para potencias o para el "º" de los ordinales. `<sub>` (de *subscript*, subíndice) lo baja, perfecto para fórmulas químicas. En pantalla verás *20 m²* y *H₂O*.

---

## 5. Idioma y dirección del texto: `lang` y `dir`

Estos dos atributos no se ven, pero le cuentan al navegador cosas muy importantes: **en qué idioma** y **en qué dirección** está tu texto.

### El atributo `lang` — en qué idioma está la página

> ### 🟦 ¿Qué significa? — *Atributo `lang`*
> `lang` (de *language*, idioma) declara el idioma del contenido. Normalmente se pone en la etiqueta `<html>`, al principio del documento, con un código corto: `es` para español, `en` para inglés, `fr` para francés.
> **¿Para qué sirve?** Para que los lectores de pantalla pronuncien bien (con acento español, no inglés), para que el navegador ofrezca traducir como toca, y para que los buscadores sepan a quién mostrar tu página.

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8">
    <title>Tunal Digital</title>
  </head>
  <body>
    <p>Hola, este texto está en español.</p>
  </body>
</html>
```

> ### 🔎 En tu código
> Como Tunal Digital es un proyecto en **español**, la etiqueta de apertura en `sitio-web/index.html` tiene que ser `<html lang="es">`. Es una línea pequeñita, pero importa: comprueba que la tienes. Y si algún día metes una sección suelta en inglés, puedes marcar solo ese trozo: `<span lang="en">free trial</span>`, y el lector de pantalla cambiará el acento únicamente ahí.

### El atributo `dir` — la dirección de la escritura

> ### 🟦 ¿Qué significa? — *Atributo `dir`*
> `dir` (de *direction*, dirección) indica hacia qué lado se escribe el texto. El valor `ltr` significa *left to right* (de izquierda a derecha, como el español o el inglés). El valor `rtl` significa *right to left* (de derecha a izquierda, como el árabe o el hebreo).
> **¿Para qué sirve?** Para que el texto en idiomas que se leen al revés se muestre y se alinee como debe.

Casi nunca tendrás que escribir `dir`, porque los navegadores dan por hecho `ltr`. Solo lo usas si incluyes contenido en árabe, hebreo u otro idioma de derecha a izquierda:

```html
<p dir="rtl" lang="ar">مرحبا بكم في تونال</p>
```

> ### 💡 Tip — `lang` y `dir` viajan juntos
> Cuando metas un texto en otro idioma con dirección distinta, pon los dos atributos a la vez: el `lang` para que se pronuncie bien y el `dir` para que se alinee bien. Hacen buena pareja.

---

## 6. Juntando todo en tunal-digital

Veamos cómo quedaría un fragmento real combinando lo de este capítulo:

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8">
    <title>Tunal Digital — Blog</title>
  </head>
  <body>
    <article>
      <h1>Cómo mostramos código en el sitio</h1>
      <p>Publicado el <time datetime="2026-06-25">25 de junio de 2026</time>.</p>

      <p>
        Para escribir una etiqueta como texto, usamos las entidades
        <code>&amp;lt;</code> y <code>&amp;gt;</code>. Así
        <code>&lt;p&gt;</code> se ve sin romper la página.
      </p>

      <p>
        <mark>Nunca subas tus claves de la
        <abbr title="Application Programming Interface">API</abbr> a GitHub.</mark>
        Guárdalas siempre en el servidor.
      </p>

      <blockquote>
        <p>El buen código se explica solo.</p>
        <footer>— <cite>Bit, el ajolote</cite></footer>
      </blockquote>

      <p>Para recargar la página pulsa <kbd>F5</kbd>.</p>
    </article>

    <footer>
      <p>&copy; 2026 Tunal Digital. Hecho con HTML &amp; CSS.</p>
    </footer>
  </body>
</html>
```

Hay un detalle curioso en ese bloque. Para mostrar `&lt;` como texto literal (la entidad misma, no su resultado), tuvimos que escribir `&amp;lt;`. Es como un eco: para enseñar el `&` de una entidad, escapamos ese `&` con `&amp;`. No te agobies si te marea un poco; es un caso rarísimo que solo asoma cuando explicas entidades... justo como aquí.

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Entiendo por qué `<`, `>` y `&` no se pueden escribir directamente como texto.
- [ ] Conozco las cinco entidades clave: `&amp;`, `&lt;`, `&gt;`, `&copy;`, `&nbsp;`.
- [ ] Sé que toda entidad empieza con `&` y termina con `;`.
- [ ] Sé que con `<meta charset="UTF-8">` puedo escribir acentos, ñ y emojis directamente.
- [ ] Sé que un emoji acompaña al texto, no lo reemplaza (por accesibilidad).
- [ ] Distingo `<abbr>`, `<time>`, `<mark>`, `<code>`, `<kbd>`, `<blockquote>`, `<cite>`, `<sup>` y `<sub>` y para qué sirve cada una.
- [ ] Pongo `lang="es"` en mi etiqueta `<html>`.
- [ ] Sé qué significan `ltr` y `rtl` en el atributo `dir`.
- [ ] No abuso de `&nbsp;` para "empujar" o alinear (eso es trabajo de CSS).

---

## 🧪 Ejercicios

1. **💻 Las cinco básicas.** Crea un archivo `entidades.html` y escribe un párrafo que muestre en pantalla, como texto literal, lo siguiente: *El operador && y la etiqueta `<div>` con © incluido.* Usa las entidades correctas para `&`, `<`, `>` y `©`.

2. **💻 Footer con copyright.** Abre tu `sitio-web/index.html` de tunal-digital (o una copia) y añade en el `<footer>` una línea con `&copy;`, el año y el nombre del sitio. Comprueba en el navegador que se ve el símbolo © y no el código crudo.

3. **💻 Galería de etiquetas de texto.** En un archivo nuevo, escribe un ejemplo de cada una de estas etiquetas usándolas de verdad: `<abbr>`, `<time>`, `<mark>`, `<code>`, `<kbd>`, `<sup>` y `<sub>`. Abre la página y observa cómo el navegador muestra cada una distinta.

4. **💻 Una cita con su fuente.** Crea un `<blockquote>` con una frase que te guste sobre programación y marca a su autor con `<cite>`. Fíjate en la sangría que el navegador le da automáticamente.

5. **💻 Idioma mixto.** En una página con `<html lang="es">`, añade una frase corta en inglés y enciérrala en un `<span lang="en">...</span>`. (Extra: si tienes un lector de pantalla disponible, escucha cómo cambia la pronunciación.)

6. **Sin computadora.** Sin mirar la tabla, escribe de memoria la entidad de: el símbolo `&`, el símbolo menor que, el símbolo mayor que, el copyright y el espacio duro. Luego revisa cuántas acertaste. Bit te aplaude por cada una. 🎉
