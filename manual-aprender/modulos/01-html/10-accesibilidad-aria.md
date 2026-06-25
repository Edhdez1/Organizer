# Capítulo 10 — Accesibilidad y ARIA a fondo

<p align="center">
  <img src="../../recursos/imagenes/01-html/cap10.png" alt="Ilustración del capítulo (pixel art con Bit)" width="640">
</p>


> En el capítulo anterior aprendiste a construir páginas con HTML semántico. Ahora vamos a dar un paso más: hacer que tus páginas funcionen para **todas** las personas, incluyendo quienes no ven la pantalla, no usan el ratón o tienen dificultades para distinguir colores. Bit, nuestro ajolote pixel art, te lo dice claro: una web bonita que solo funciona para algunos no está terminada. La accesibilidad no es un "extra" para el final; es parte de hacer las cosas bien. En este capítulo conocerás los lectores de pantalla, los roles ARIA, el foco del teclado, las "live regions" y el contraste de colores. Y descubrirás una regla de oro que te ahorrará mucho trabajo: si el HTML ya hace el trabajo, no uses ARIA.

## 1. ¿Para quién hacemos las páginas accesibles?

Cuando programas una página, es fácil imaginar a una sola persona usándola: alguien con buena vista, con ratón, mirando una pantalla grande. Pero la realidad es mucho más variada. Hay personas que:

- No ven la pantalla y escuchan la página con un programa que lee en voz alta.
- Ven poco y necesitan letras grandes o mucho contraste.
- No pueden usar el ratón y navegan **solo con el teclado**.
- No distinguen ciertos colores (por ejemplo, rojo y verde).
- Usan el teléfono con una mano, en la calle, con sol fuerte sobre la pantalla.

La buena noticia: casi todo lo que hace tu página accesible para una persona con discapacidad **también la mejora para todos los demás**.

> ### 🟦 ¿Qué significa? — *Accesibilidad (a11y)*
> La **accesibilidad** es la práctica de construir páginas que cualquier persona pueda usar, sin importar sus capacidades o el dispositivo que tenga. A veces verás la abreviatura **a11y**: es la palabra "accessibility" en inglés, con 11 letras entre la "a" y la "y". Sirve para que tu producto llegue a más gente y, en muchos países, también es un requisito legal.
> **¿Dónde se usa en tu proyecto?** En **tunal-digital** (`sitio-web/index.html`), tu sitio público lo puede visitar cualquier persona; hacerlo accesible significa que un cliente potencial que usa lector de pantalla también pueda leer tus servicios y contactarte.

> ### 🟦 ¿Qué significa? — *Lector de pantalla*
> Un **lector de pantalla** es un programa que lee en voz alta lo que hay en la pantalla, para personas ciegas o con baja visión. El usuario se mueve por la página con el teclado y el programa va anunciando: "encabezado nivel 1, Tunal Digital", "enlace, Contacto", "botón, Enviar". Ejemplos reales: **VoiceOver** (Mac/iPhone), **NVDA** y **JAWS** (Windows), **TalkBack** (Android).
> **¿Dónde se usa en tu proyecto?** Cuando alguien usa un lector de pantalla en **tunal-digital**, el programa recorre tu `index.html` etiqueta por etiqueta. Si tu HTML está bien escrito, la experiencia es ordenada; si no, la persona escucha un revoltijo.

> ### 💡 Tip — Pruébalo tú mismo
> No necesitas instalar nada raro para empezar. En Mac, activa **VoiceOver** con `Cmd + F5`. En Windows, **NVDA** es gratuito. Cierra los ojos un minuto y navega tu propia página solo con el teclado y el oído. Te sorprenderá lo que descubres.

## 2. El árbol de accesibilidad: lo que "ve" el lector de pantalla

Tu navegador no solo dibuja la página en pantalla. También construye, en paralelo, una versión "para programas de ayuda": una lista ordenada de elementos con su **nombre**, su **rol** y su **estado**. Eso es el **árbol de accesibilidad**.

> ### 🟦 ¿Qué significa? — *Árbol de accesibilidad*
> El **árbol de accesibilidad** es la representación de tu página que el navegador entrega a los lectores de pantalla. De cada elemento guarda tres cosas: su **rol** (qué es: botón, enlace, encabezado), su **nombre accesible** (cómo se llama: "Enviar", "Contacto") y su **estado** (cómo está: marcado, deshabilitado, expandido). Sirve para que el lector de pantalla pueda anunciar cada elemento correctamente.

La clave: el lector de pantalla **no lee tu CSS bonito**. Lee este árbol. Por eso un `<div>` que parece un botón (porque le pusiste color y bordes con CSS) no es un botón para el árbol de accesibilidad: es solo "un grupo de texto". Y aquí empieza a tener sentido ARIA.

> ### 🟦 ¿Qué significa? — *Rol*
> El **rol** es la palabra que describe qué función cumple un elemento: botón, enlace, encabezado, lista, casilla de verificación, etc. Muchos elementos HTML ya tienen un rol "de fábrica": `<button>` tiene rol de botón, `<a href>` tiene rol de enlace, `<h1>` tiene rol de encabezado. Sirve para que el lector de pantalla anuncie correctamente "botón" o "enlace".

> ### 🟦 ¿Qué significa? — *Nombre accesible*
> El **nombre accesible** es el texto con el que el lector de pantalla identifica un elemento en voz alta. En un botón, suele ser su texto: `<button>Enviar</button>` se anuncia como "Enviar, botón". En una imagen, el nombre viene del atributo `alt`. Sirve para que el usuario sepa qué hace cada cosa sin verla.

## 3. ARIA: qué es y la regla de oro

> ### 🟦 ¿Qué significa? — *ARIA*
> **ARIA** significa "Accessible Rich Internet Applications" (Aplicaciones de Internet Ricas y Accesibles). Es un conjunto de atributos especiales que puedes añadir a tus etiquetas HTML para darle información extra al árbol de accesibilidad: por ejemplo, `role="button"`, `aria-label="Cerrar"` o `aria-hidden="true"`. Sirve para describir componentes que el HTML solo no alcanza a explicar.

ARIA es poderoso, pero tiene una trampa: **ARIA no cambia cómo se ve ni cómo se comporta tu página; solo cambia lo que se le anuncia al lector de pantalla**. Si pones `role="button"` en un `<div>`, el lector dirá "botón"… pero ese div no responderá a la tecla Enter ni se podrá enfocar con el teclado, a menos que tú lo programes a mano. Has prometido un botón y entregado un disfraz.

Por eso existe la regla más importante de toda la accesibilidad web:

> ### ⚠️ Cuidado — La primera regla de ARIA: no uses ARIA
> Suena raro, pero es literal: **si existe un elemento HTML que ya hace lo que necesitas, úsalo en vez de inventarlo con ARIA**. Un `<button>` de verdad ya es enfocable, responde a Enter y Espacio, y se anuncia como botón, todo gratis. Un `<div role="button">` te obliga a reconstruir todo eso a mano, y casi siempre sale peor. ARIA es para cuando el HTML **no** tiene una solución, no para reemplazar al HTML que sí la tiene.

> ### 🔎 En tu código
> En **tunal-digital**, si en `main.js` o `index.html` tienes algo como `<div class="boton" onclick="...">`, cámbialo por `<button type="button">`. Ganas accesibilidad de teclado sin escribir una línea de ARIA. Misma idea en **RachaSimple**: en tus componentes `.tsx`, prefiere `<button>` antes que un `<div>` con `onClick`.

Un ejemplo de qué NO hacer y qué SÍ hacer:

```html
<!-- ❌ Mal: un div disfrazado de botón -->
<div class="btn" role="button" onclick="enviar()">Enviar</div>

<!-- ✅ Bien: el HTML ya lo resuelve todo -->
<button type="button" onclick="enviar()">Enviar</button>
```

Entonces, ¿cuándo SÍ usamos ARIA? Cuando construimos cosas que el HTML no tiene de fábrica (pestañas, ventanas emergentes, menús complejos) o cuando un elemento necesita un nombre que no aparece como texto visible. Veámoslo.

## 4. Dar nombre a las cosas: aria-label, aria-labelledby, aria-describedby

A veces un control no tiene texto visible. El caso clásico: un botón con solo un icono.

```html
<!-- Un botón de cerrar con una "X" -->
<button type="button">✕</button>
```

El lector de pantalla anunciaría "equis, botón" o incluso nada útil. Necesitamos darle un nombre claro.

> ### 🟦 ¿Qué significa? — *aria-label*
> `aria-label` es un atributo que le pone un **nombre accesible directamente, escrito por ti**, a un elemento. No se ve en pantalla; solo lo escucha el lector de pantalla. Sirve para botones de solo icono, enlaces sin texto o controles donde el texto visible no basta.
> **¿Dónde se usa en tu proyecto?** En **tunal-digital**, si tienes un icono de menú "hamburguesa" (las tres rayitas) que abre la navegación, ponle `aria-label="Abrir menú"` para que el lector lo anuncie con sentido.

```html
<!-- ✅ Ahora el lector dice "Cerrar, botón" -->
<button type="button" aria-label="Cerrar">✕</button>
```

> ### 🟦 ¿Qué significa? — *aria-labelledby*
> `aria-labelledby` toma el nombre accesible de **otro elemento que ya está en la página**, indicándolo por su `id`. En vez de escribir el texto otra vez, "apuntas" a un texto que ya existe. Sirve para no repetir contenido y mantener el nombre sincronizado con lo que se ve.

```html
<!-- El nombre de la sección viene del h2 con id="titulo-servicios" -->
<section aria-labelledby="titulo-servicios">
  <h2 id="titulo-servicios">Nuestros servicios</h2>
  <p>Diseño web, automatización y más.</p>
</section>
```

> ### 🟦 ¿Qué significa? — *aria-describedby*
> `aria-describedby` añade una **descripción extra** (no el nombre, sino una explicación adicional) que apunta al `id` de otro elemento. Sirve, por ejemplo, para asociar a un campo de formulario el texto que explica su formato o un mensaje de error.

```html
<label for="email">Correo</label>
<input id="email" type="email" aria-describedby="ayuda-email" />
<p id="ayuda-email">Usaremos tu correo solo para responderte.</p>
```

Cuando el usuario llega al campo, el lector anuncia: "Correo, campo de texto, Usaremos tu correo solo para responderte". El nombre viene del `<label>`; la descripción, del `aria-describedby`.

> ### 💡 Tip — Diferencia rápida
> `aria-label` = escribes el nombre a mano. `aria-labelledby` = el nombre lo da otro elemento de la página. `aria-describedby` = información adicional, no el nombre principal. Si dudas entre label y labelledby, recuerda: si el texto ya está visible en la página, prefiere `labelledby` para no duplicarlo.

## 5. Esconder cosas del lector: aria-hidden

A veces quieres que algo se vea en pantalla pero que el lector de pantalla lo **ignore**. El caso más común: iconos decorativos que no aportan información.

> ### 🟦 ¿Qué significa? — *aria-hidden*
> `aria-hidden="true"` le dice al lector de pantalla: "ignora este elemento y todo lo que tenga dentro". El elemento **sigue viéndose** en la pantalla; simplemente no se anuncia. Sirve para iconos decorativos o textos duplicados que solo añadirían ruido para quien escucha.

```html
<!-- El emoji es decorativo; el texto ya lo explica -->
<button type="button">
  <span aria-hidden="true">🚀</span>
  Lanzar proyecto
</button>
```

Aquí el lector dice solo "Lanzar proyecto, botón", sin intentar describir el cohete.

> ### ⚠️ Cuidado — Nunca escondas algo que el usuario necesita
> No pongas `aria-hidden="true"` en un botón, un enlace o un campo de formulario que sí sirve. Si lo haces, las personas que usan lector de pantalla **no podrán usarlo**: para ellas, simplemente no existe. Otra trampa: nunca pongas `aria-hidden="true"` en un elemento que contenga algo enfocable con el teclado, porque crea una situación confusa (el teclado llega ahí, pero el lector dice que no hay nada).

## 6. Foco y orden de tabulación

> ### 🟦 ¿Qué significa? — *Foco*
> El **foco** es el elemento que está "seleccionado" en este momento y que recibirá lo que escribas o la tecla que pulses. Cuando navegas con el teclado, el foco salta de un control a otro. Normalmente se ve con un borde o resaltado alrededor del elemento. Sirve para saber dónde estás dentro de la página sin usar el ratón.

> ### 🟦 ¿Qué significa? — *Orden de tabulación*
> El **orden de tabulación** es la secuencia en la que el foco salta cada vez que pulsas la tecla **Tab**. Por defecto sigue el orden en que escribiste los elementos en el HTML, de arriba hacia abajo. Sirve para que la navegación con teclado sea lógica y predecible.

La prueba más rápida de accesibilidad: pulsa **Tab** varias veces en tu página y observa. ¿El foco va de un sitio lógico al siguiente? ¿Se ve claramente dónde está? ¿Puedes llegar a todos los botones y enlaces?

> ### 🟦 ¿Qué significa? — *tabindex*
> `tabindex` es un atributo que controla si un elemento puede recibir foco con el teclado y en qué orden. Sus valores útiles son: `tabindex="0"` (el elemento entra en el orden normal de tabulación) y `tabindex="-1"` (no se llega con Tab, pero puedes enfocarlo desde JavaScript). Sirve para casos especiales; con HTML bien hecho casi no lo necesitas.

> ### ⚠️ Cuidado — Huye de tabindex con números positivos
> Verás por ahí cosas como `tabindex="3"`. **Evítalas.** Los números positivos fuerzan un orden artificial que casi siempre rompe la lógica natural de la página y es muy difícil de mantener. Si necesitas otro orden, reordena tu HTML. Solo usa `tabindex="0"` o `tabindex="-1"`.

> ### 🟦 ¿Qué significa? — *:focus-visible*
> `:focus-visible` es un "selector" de CSS (una forma de apuntar a elementos para darles estilo) que aplica solo cuando el navegador cree que mostrar el foco **ayuda de verdad**: típicamente cuando la persona navega con teclado, y no cuando hace clic con el ratón. Sirve para dibujar un borde de foco bonito y claro para quien usa teclado, sin que aparezca un recuadro "molesto" cada vez que alguien hace clic con el ratón. Es la forma moderna y recomendada de estilizar el foco.

> ### 🟦 ¿Qué significa? — *outline (contorno)*
> El **outline** ("contorno" en inglés) es una línea que el navegador dibuja **alrededor** de un elemento cuando recibe el foco. Es justo la pista visual que le dice a quien usa teclado "estás aquí". Por defecto suele ser un borde azul o punteado. Es distinto de `border`: el outline no ocupa espacio ni mueve el resto de la página. Sirve, sobre todo, para marcar el foco; por eso nunca debes hacerlo desaparecer sin poner otra cosa en su lugar.

> ### 💡 Tip — No borres el contorno del foco
> En CSS es tentador escribir `outline: none` porque el borde azul "afea" el botón. Si lo haces, dejas a la gente del teclado sin saber dónde está el foco. Si no te gusta el estilo por defecto, **reemplázalo** por uno bonito (con `:focus-visible`), no lo elimines. En **tunal-digital**, revisa tu `styles.css` por si hay algún `outline: none` huérfano.

```css
/* En tu styles.css de tunal-digital: un foco visible y con estilo */
:focus-visible {
  outline: 3px solid #2563eb;
  outline-offset: 2px;
}
```

## 7. Skip links: saltar lo repetitivo

Imagina que tu página tiene un menú con 10 enlaces arriba, igual en todas las secciones. Una persona con lector de pantalla tendría que escuchar esos 10 enlaces **en cada página** antes de llegar al contenido. Agotador. La solución es un **enlace de salto**.

> ### 🟦 ¿Qué significa? — *Skip link (enlace de salto)*
> Un **skip link** es un enlace, normalmente el primero de la página, que permite **saltar directamente al contenido principal** sin recorrer el menú. Suele estar oculto y aparece solo cuando recibe el foco con Tab. Sirve a quienes navegan con teclado o lector de pantalla para ahorrarse la navegación repetitiva.
> **¿Dónde se usa en tu proyecto?** En **tunal-digital**, añadir un skip link al principio de `index.html` hace que un visitante con teclado llegue a tus servicios en un solo Tab, en vez de recorrer todo el encabezado.

```html
<body>
  <a class="skip-link" href="#contenido">Saltar al contenido</a>

  <header>
    <nav><!-- muchos enlaces aquí --></nav>
  </header>

  <main id="contenido">
    <h1>Tunal Digital</h1>
    <!-- ... -->
  </main>
</body>
```

```css
/* Oculto hasta que recibe foco */
.skip-link {
  position: absolute;
  left: -9999px;
}
.skip-link:focus {
  left: 1rem;
  top: 1rem;
}
```

Fíjate en un detalle importante: el skip link apunta a `#contenido`, y ese `id="contenido"` está en `<main>`. El destino del salto debe existir, o el enlace no lleva a ningún sitio.

## 8. Live regions: anunciar cambios sin recargar

Aquí entramos en lo "rico" de ARIA, lo que el HTML solo no resuelve. Imagina que en tunal-digital pulsas "Enviar" en un formulario de contacto y, gracias a JavaScript, aparece un mensaje "Mensaje enviado con éxito" sin recargar la página. Una persona que ve, lo lee. Pero una persona con lector de pantalla… no se entera, porque su foco sigue en el botón. El cambio ocurrió en otra parte de la pantalla y nadie se lo anunció.

> ### 🟦 ¿Qué significa? — *Live region (región dinámica)*
> Una **live region** es una zona de la página marcada con `aria-live` para que el lector de pantalla **anuncie automáticamente** cualquier cambio de texto que ocurra dentro de ella, sin que el usuario tenga que ir a buscarlo. Sirve para mensajes que aparecen solos: confirmaciones, errores, notificaciones, resultados de una búsqueda.
> **¿Dónde se usa en tu proyecto?** En **tunal-digital**, cuando `main.js` muestra "Mensaje enviado", una live region hace que el lector lo diga en voz alta. En **Faro** (Organizer), cuando el análisis con IA termina y aparece "Análisis completado", una live region avisa sin que el usuario tenga que rastrear el cambio.

```html
<!-- Esta zona empieza vacía; JavaScript escribirá dentro -->
<p id="estado-form" aria-live="polite"></p>
```

```javascript
// En main.js, tras enviar el formulario:
document.getElementById("estado-form").textContent = "Mensaje enviado con éxito.";
// El lector de pantalla lo anunciará solo.
```

> ### 🟦 ¿Qué significa? — *aria-live*
> `aria-live` es el atributo que convierte una zona normal de la página en una **live region**. Lo escribes con un valor que indica la urgencia: `aria-live="polite"` o `aria-live="assertive"`. A partir de ahí, cada vez que cambie el texto dentro de esa zona, el lector de pantalla lo anunciará solo. Sirve para que las personas que no ven la pantalla se enteren de mensajes que aparecen sin recargar la página.

El valor de `aria-live` define la urgencia:

- `aria-live="polite"`: el lector lo dice **cuando termine** lo que estaba diciendo. Ideal para confirmaciones y la mayoría de los casos.
- `aria-live="assertive"`: el lector **interrumpe** lo que estaba diciendo para anunciarlo ya. Resérvalo para errores urgentes.

> ### ⚠️ Cuidado — assertive con moderación
> Usar `assertive` para todo es como gritar siempre: cansa y confunde. Interrumpir al usuario constantemente es molesto. Usa `polite` casi siempre; deja `assertive` solo para errores que de verdad no pueden esperar.

> ### 💡 Tip — La región debe existir desde el principio
> La live region tiene que estar **ya en el HTML** (aunque vacía) antes de que cambies su contenido. Si creas el `<p aria-live>` y le metes texto en el mismo instante, muchos lectores no lo anuncian. El truco: deja el contenedor vacío en tu HTML y luego solo escribe dentro de él.

## 9. Formularios accesibles

Los formularios son donde más se nota una buena (o mala) accesibilidad, porque el usuario tiene que entender qué le piden y qué se equivocó. Tres reglas que cubren casi todo:

**1. Toda entrada necesita su `<label>`.** Ya lo viste en el capítulo de formularios, pero aquí es vital. El `<label>` con `for` conectado al `id` del campo es lo que da el nombre accesible.

```html
<label for="nombre">Tu nombre</label>
<input id="nombre" type="text" />
```

**2. Marca lo obligatorio de forma clara, no solo con un asterisco rojo.** El color por sí solo no basta (recuerda a quien no distingue colores). Usa el atributo `required`, que además el lector anuncia.

```html
<label for="correo">Correo (obligatorio)</label>
<input id="correo" type="email" required />
```

**3. Los errores deben asociarse al campo.** No basta con poner el error en rojo arriba. Conéctalo con `aria-describedby` y, si quieres, marca el campo como inválido con `aria-invalid`.

> ### 🟦 ¿Qué significa? — *aria-invalid*
> `aria-invalid="true"` marca un campo de formulario como **incorrecto**. El lector de pantalla lo anuncia ("entrada inválida") para que el usuario sepa que ese campo concreto tiene un problema. Sirve para conectar el error con el campo exacto, no solo con un mensaje suelto.

```html
<label for="tel">Teléfono</label>
<input id="tel" type="tel" aria-invalid="true" aria-describedby="error-tel" />
<p id="error-tel">Escribe un número de 10 dígitos.</p>
```

> ### 🔎 En tu código
> En **RachaSimple** (componentes `.tsx`) y en **Faro**, donde tengas formularios de inicio de sesión o de datos, asegúrate de que cada `<input>` tenga su `<label>` real y de que los mensajes de error se conecten con `aria-describedby`. Es uno de los cambios de accesibilidad con más impacto y menos esfuerzo.

## 10. Contraste WCAG: que el texto se pueda leer

De nada sirve un texto perfecto si nadie puede leerlo porque es gris claro sobre fondo blanco. El contraste es la diferencia de luz entre el texto y su fondo.

> ### 🟦 ¿Qué significa? — *WCAG*
> **WCAG** significa "Web Content Accessibility Guidelines" (Pautas de Accesibilidad para el Contenido Web). Es el estándar internacional que define cómo hacer la web accesible: incluye reglas medibles sobre contraste, teclado, textos alternativos y más. Sirve como referencia oficial; cuando alguien dice "cumple WCAG AA", se refiere a este estándar.

> ### 🟦 ¿Qué significa? — *Ratio de contraste*
> El **ratio de contraste** es un número que mide cuánto se diferencia el texto de su fondo. Va desde 1:1 (texto invisible, mismo color que el fondo) hasta 21:1 (negro puro sobre blanco puro). WCAG pide al menos **4.5:1** para texto normal y **3:1** para texto grande. Sirve para garantizar que el texto se lea bajo el sol, con poca vista o en una pantalla barata.
> **¿Dónde se usa en tu proyecto?** En **tunal-digital**, revisa en `styles.css` los colores de texto sobre los fondos de color de marca; algún gris "elegante" puede quedar por debajo de 4.5:1 y costarte lectores reales.

> ### 💡 Tip — Cómo medir el contraste
> No lo adivines. Las herramientas de desarrollo del navegador (clic derecho → Inspeccionar) te muestran el ratio de contraste de cualquier texto. También hay verificadores en línea donde pegas los dos colores y te dicen si pasa AA. Apunta a 4.5:1 o más para texto de tamaño normal.

> ### ⚠️ Cuidado — El color no puede ser la única pista
> Si un enlace solo se distingue del texto normal porque es azul, quien no ve bien los colores no lo notará. Añade siempre una segunda señal: subrayado en los enlaces, un icono junto al error, la palabra "obligatorio" además del asterisco. La regla: **no comuniques nada solo con color**.

## 11. Juntando todo: un fragmento accesible de tunal-digital

Veamos cómo se ve un trozo de `index.html` aplicando casi todo lo del capítulo:

```html
<body>
  <a class="skip-link" href="#contenido">Saltar al contenido</a>

  <header>
    <nav aria-label="Principal">
      <button type="button" aria-label="Abrir menú">
        <span aria-hidden="true">☰</span>
      </button>
      <a href="#servicios">Servicios</a>
      <a href="#contacto">Contacto</a>
    </nav>
  </header>

  <main id="contenido">
    <h1>Tunal Digital</h1>

    <section aria-labelledby="titulo-contacto">
      <h2 id="titulo-contacto">Contacto</h2>

      <form>
        <label for="nombre">Tu nombre (obligatorio)</label>
        <input id="nombre" type="text" required />

        <label for="correo">Correo</label>
        <input id="correo" type="email" aria-describedby="ayuda-correo" />
        <p id="ayuda-correo">Te responderemos por aquí.</p>

        <button type="submit">Enviar</button>
      </form>

      <p id="estado-form" aria-live="polite"></p>
    </section>
  </main>
</body>
```

Fíjate en cuántas cosas trabajan juntas: skip link, `nav` con nombre, botón de icono etiquetado, emoji oculto al lector, sección nombrada por su título, labels reales, ayuda asociada y una live region lista para anunciar el resultado. Y casi todo es HTML normal: muy poco ARIA, justo donde el HTML no llegaba.

## ✅ Checklist — ¿ya domino esto?

- [ ] Entiendo qué hace un lector de pantalla y qué es el árbol de accesibilidad.
- [ ] Sé qué son rol, nombre accesible y estado de un elemento.
- [ ] Conozco la regla de oro: si el HTML ya lo hace, no uso ARIA.
- [ ] Sé usar `aria-label`, `aria-labelledby` y `aria-describedby`, y distingo cuándo cada uno.
- [ ] Sé cuándo usar `aria-hidden="true"` y qué NUNCA debo esconder.
- [ ] Puedo recorrer mi página con Tab y verificar el orden y la visibilidad del foco.
- [ ] Entiendo `tabindex="0"` y `tabindex="-1"`, y evito los números positivos.
- [ ] Sé añadir un skip link que apunte a un destino real.
- [ ] Entiendo las live regions y la diferencia entre `polite` y `assertive`.
- [ ] Hago formularios con label real, `required` y errores conectados con `aria-describedby`.
- [ ] Sé que el texto necesita al menos 4.5:1 de contraste y que el color no puede ser la única pista.

## 🧪 Ejercicios

1. **Sin computadora.** Explica con tus palabras, como si se lo contaras a un amigo, por qué un `<div role="button">` es peor que un `<button>` de verdad. Menciona al menos dos cosas que el `<button>` da gratis.

2. **Sin computadora.** Para cada caso, decide qué usarías y por qué: (a) un botón con solo un icono de papelera; (b) una sección cuyo título ya está en un `<h2>` visible; (c) un campo de contraseña que necesita la nota "mínimo 8 caracteres". Elige entre `aria-label`, `aria-labelledby` y `aria-describedby`.

3. **💻 En la computadora.** Abre tu `index.html` de **tunal-digital** y recórrelo entero solo con la tecla **Tab**, sin tocar el ratón. Anota: ¿se ve siempre dónde está el foco? ¿Hay algún botón o enlace al que no puedas llegar? Corrige al menos un problema que encuentres.

4. **💻 En la computadora.** Añade a tu `index.html` un **skip link** "Saltar al contenido" al principio del `<body>`, con su CSS para que se oculte y aparezca al recibir foco, y un `id="contenido"` en tu `<main>`. Pruébalo con Tab: el primer Tab debe mostrar el enlace y, al pulsar Enter, saltar al contenido.

5. **💻 En la computadora.** Crea una **live region** vacía con `aria-live="polite"` cerca de tu formulario de contacto y, desde `main.js`, escribe dentro "Mensaje enviado con éxito" al enviar. Si tienes un lector de pantalla a mano (VoiceOver o NVDA), comprueba que lo anuncia solo.

6. **💻 En la computadora.** Usa las herramientas de desarrollo del navegador (Inspeccionar) para medir el **contraste** de tres textos de tu sitio. Apunta el ratio de cada uno. Si alguno está por debajo de 4.5:1, ajusta el color en `styles.css` hasta que pase.
