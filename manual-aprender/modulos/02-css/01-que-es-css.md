# Capítulo 01 — ¿Qué es CSS?

> En HTML aprendiste a poner contenido. Pero se veía sin gracia: texto negro, fondo blanco,
> todo apilado. CSS es lo que cambia eso. Aquí entenderás qué es, cómo se conecta a tu HTML y
> su sintaxis, que es sorprendentemente sencilla y lógica.

---

## 1. Qué es CSS y para qué sirve

> ### 🟦 ¿Qué significa? — *CSS*
> **CSS** significa *Cascading Style Sheets* ("hojas de estilo en cascada"). Es el lenguaje que
> describe **la presentación** de una página: colores, tamaños, tipografías, espacios,
> posiciones, animaciones.
> **¿Para qué sirve?** Para separar el **contenido** (HTML) de su **apariencia** (CSS). El
> mismo HTML puede verse de mil formas distintas con solo cambiar el CSS.

> ### 🟦 ¿Qué significa? — *"En cascada" y "hoja de estilos"*
> - **Hoja de estilos**: un archivo (normalmente `.css`) lleno de reglas de aspecto.
> - **En cascada**: cuando varias reglas afectan al mismo elemento, hay un sistema de
>   prioridades que decide cuál gana (la que "cae" con más fuerza). Lo verás en detalle más
>   adelante; por ahora quédate con que "cascada" = cómo se resuelven los conflictos de estilos.

> ### 💡 Tip — La gran idea: separar contenido y presentación
> Imagina una revista: el **texto de los artículos** es una cosa, y **el diseño** (tipografías,
> colores, columnas) es otra. En la web es igual: HTML es el texto/estructura, CSS es el diseño.
> Separarlos te permite rediseñar todo el sitio cambiando solo el CSS, sin tocar el contenido.

---

## 2. La sintaxis de CSS: regla, selector, propiedad, valor

CSS se escribe en **reglas**. Esta es la anatomía, que repetirás miles de veces:

```css
h1 {
  color: #1B6B6B;
  font-size: 32px;
}
```

> ### 🟦 ¿Qué significa? — *Las partes de una regla CSS*
> - **Selector** (`h1`): **a qué** elementos del HTML afecta esta regla (aquí, a todos los `<h1>`).
> - **Propiedad** (`color`, `font-size`): **qué** característica cambias.
> - **Valor** (`#1B6B6B`, `32px`): **cómo** queda esa característica.
> - **Declaración**: una pareja `propiedad: valor;` (¡termina siempre en punto y coma `;`!).
> - Las declaraciones van entre **llaves** `{ }`, que forman el **bloque** de la regla.

Leído en español: *"a todos los `<h1>`, ponles el color #1B6B6B y un tamaño de letra de 32 píxeles."*

```
selector    propiedad   valor
   │            │          │
  h1  {     color:    #1B6B6B;  }
              └── declaración ──┘
```

> ### ⚠️ Cuidado — Los dos errores más comunes de principiante
> 1. **Olvidar el `;`** al final de una declaración: la siguiente regla puede romperse.
> 2. **Confundir `:` con `=`**: en CSS se usa **dos puntos** (`color: red;`), no igual.
> El editor (VS Code) te marca estos errores en color, así que los detectarás rápido.

---

## 3. Las tres formas de aplicar CSS (y cuál usar)

Hay tres maneras de meter CSS en una página. Las explico todas, pero **una es la correcta** en
casi todos los casos.

> ### 🟦 ¿Qué significa? — *CSS en línea (inline)*
> Estilos escritos **dentro** de una etiqueta HTML, con el atributo `style`:
> ```html
> <h1 style="color: #1B6B6B;">Hola</h1>
> ```
> **Cuándo usarlo:** casi nunca. Mezcla contenido y aspecto, es difícil de mantener y no se
> reutiliza. Útil solo para pruebas rápidas.

> ### 🟦 ¿Qué significa? — *CSS interno (en el `<head>`)*
> Estilos dentro de una etiqueta `<style>` en el `<head>` de la página:
> ```html
> <head>
>   <style>
>     h1 { color: #1B6B6B; }
>   </style>
> </head>
> ```
> **Cuándo usarlo:** para páginas muy pequeñas de un solo archivo. Solo afecta a esa página.

> ### 🟦 ¿Qué significa? — *CSS externo (archivo .css) — ✅ el recomendado*
> Los estilos viven en un **archivo aparte** (ej. `styles.css`) que conectas desde el `<head>`
> con `<link>` (¿recuerdas el módulo 01?):
> ```html
> <head>
>   <link rel="stylesheet" href="styles.css">
> </head>
> ```
> ```css
> /* styles.css */
> h1 { color: #1B6B6B; }
> ```
> **Por qué es el mejor:** un solo archivo de estilos sirve para **todas** las páginas del sitio;
> cambias un color ahí y se actualiza en todo el sitio. Es lo que hace tu
> `tunal-digital/sitio-web/styles.css`.

---

## 4. Selectores: cómo apuntar a lo que quieres

El selector decide a qué elementos afecta tu regla. Estos son los esenciales:

> ### 🟦 ¿Qué significa? — *Selector de etiqueta, de clase y de id*
> - **Por etiqueta** (`p`, `h1`, `a`): afecta a **todos** los elementos de ese tipo.
>   ```css
>   p { color: gray; }   /* todos los párrafos */
>   ```
> - **Por clase** (`.destacado`): afecta a los elementos con ese atributo `class`. Se escribe
>   con un **punto** delante. Es el más usado.
>   ```css
>   .destacado { background: #FBF9F4; }
>   ```
>   ```html
>   <p class="destacado">Este párrafo resalta.</p>
>   ```
> - **Por id** (`#menu`): afecta al elemento con ese `id` único. Se escribe con **almohadilla**.
>   ```css
>   #menu { font-weight: bold; }
>   ```

> ### 🟦 ¿Qué significa? — *Clase (class) en HTML*
> Una **clase** es una "etiqueta de categoría" que le pones a uno o varios elementos HTML para
> poder darles estilo en grupo. Un elemento puede tener varias clases (separadas por espacios):
> ```html
> <button class="boton boton-primario">Enviar</button>
> ```
> **¿Por qué la clase es la estrella?** Porque puedes reutilizarla: defines `.boton` una vez y
> todos los botones con esa clase comparten estilo. Así trabajan tu sitio y, de forma extrema,
> Tailwind en RachaSimple/Faro (que es básicamente "muchas clases pequeñas").

> ### 💡 Tip — Clase vs. id, ¿cuándo cada uno?
> Usa **clases** para estilos que se repiten (botones, tarjetas, textos destacados). Reserva el
> **id** para algo único en la página (un ancla, un elemento que JavaScript controla). Para dar
> estilo, en la práctica casi siempre usarás **clases**.

---

## 5. Tu primer CSS, paso a paso

Vamos a estilizar la página HTML que hiciste en el módulo 01.

**Paso 1.** Junto a tu `index.html`, crea un archivo `styles.css`.

**Paso 2.** Conéctalo: en el `<head>` de tu HTML, añade:
```html
<link rel="stylesheet" href="styles.css">
```

**Paso 3.** En `styles.css`, escribe:
```css
body {
  background: #FBF9F4;
  color: #1F2733;
  font-family: sans-serif;
}

h1 {
  color: #1B6B6B;
}

.destacado {
  background: #D98A3D;
  color: white;
}
```

**Paso 4.** En tu HTML, ponle `class="destacado"` a algún párrafo. Guarda todo y recarga el
navegador: verás el fondo crema, el título en verde-azulado y el párrafo destacado en naranja.
**Acabas de controlar el aspecto de tu página.**

> ### 🟦 ¿Qué significa? — *Comentario en CSS*
> En CSS, los comentarios (notas que el navegador ignora) se escriben entre `/*` y `*/`:
> ```css
> /* Esto es un comentario en CSS */
> h1 { color: #1B6B6B; } /* también al final de una línea */
> ```
> (Recuerda: en HTML era `<!-- -->`. Cada lenguaje tiene su forma.)

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Entiendo que CSS controla la **apariencia** y por qué se separa del HTML.
- [ ] Reconozco la anatomía: **selector { propiedad: valor; }**.
- [ ] Sé las tres formas de incluir CSS y por qué la **externa** (`.css` + `<link>`) es la mejor.
- [ ] Uso selectores por **etiqueta**, **clase** (`.`) e **id** (`#`).
- [ ] Entiendo qué es una **clase** y por qué es la forma reutilizable de dar estilo.
- [ ] Pude conectar un `styles.css` y cambiar colores de mi página.

---

## 🧪 Ejercicios

1. **Lee una regla.** Traduce a español qué hace:
   ```css
   .tarjeta { background: #FBF9F4; font-size: 18px; }
   ```
2. **Encuentra los errores.** Corrige esta regla (tiene dos fallos):
   ```css
   h2 { color = #1B6B6B  font-size: 24px }
   ```
3. **Selector correcto.** ¿Qué selector usarías para: (a) todos los enlaces, (b) los elementos
   con `class="aviso"`, (c) el elemento con `id="cabecera"`?
4. **Clase reutilizable.** Escribe una clase `.boton` que dé fondo `#1B6B6B`, texto blanco y la
   aplique a dos botones distintos en HTML.
5. 💻 **Estiliza tu página.** Conecta un `styles.css` a tu `index.html` del módulo 01 y cambia:
   el color de fondo del `body`, el color de los `<h1>`, y crea una clase `.destacado` para un
   párrafo. Experimenta cambiando los valores de color y recargando.

➡️ Siguiente: **[Capítulo 02 — Colores, unidades y tipografía](02-colores-y-tipografia.md)**.
