# Capítulo 07 — La cascada y la herencia

<p align="center">
  <img src="../../recursos/imagenes/02-css/cap07.png" alt="Ilustración del capítulo (pixel art con Bit)" width="640">
</p>


> Qué bueno verte de nuevo. Hoy vamos a entender el corazón de CSS: por qué lleva ese nombre (la "C" es de *Cascading*, en cascada) y cómo el navegador decide qué regla manda cuando dos se pelean por el mismo elemento. Te adelanto algo: no hay magia ni suerte de por medio. Son reglas claras, y cuando las conoces, puedes predecir el resultado. Bit, nuestro ajolote, lo compara con ordenar la fila del recreo: hace falta saber quién va primero. Lo vamos a ver con calma.

---

## 1. Por qué CSS se llama "cascada"

**CSS** son las siglas de *Cascading Style Sheets*: "Hojas de estilo en cascada". Y esa palabra, **cascada**, no es decorativa. Describe justo cómo funciona la herramienta: los estilos caen desde varias fuentes (el propio navegador, tu archivo `styles.css`, los atributos que escribes en el HTML) y se apilan como el agua que baja por una escalera, hasta que cada propiedad de cada elemento se queda con **un único valor ganador**.

> ### 🟦 ¿Qué significa? — *Cascada*
> La **cascada** es el proceso por el que el navegador junta todas las reglas CSS que existen y, cuando varias quieren cambiar lo mismo (por ejemplo, el color de un párrafo), escoge una sola siguiendo criterios de prioridad. Gracias a eso nunca hay empate ni confusión: siempre queda un ganador definido.
> En `tunal-digital`, tu archivo `styles.css` entra en la cascada junto con los estilos por defecto del navegador. Por eso un enlace `<a>` aparece azul aunque tú no escribas nada: ese azul lo trae el navegador, y tu CSS puede cambiarlo.

Supón que tienes estas dos reglas en el `styles.css` de tunal-digital:

```css
p {
  color: gray;
}

p {
  color: navy;
}
```

Las dos apuntan al mismo elemento (`p`) y a la misma propiedad (`color`). No pueden ganar las dos a la vez. Ahí entra la cascada: como tienen la **misma importancia** y la **misma especificidad** (enseguida vemos qué es eso), gana **la que aparece después**. Así que los párrafos saldrán `navy`, azul marino.

> ### 💡 Tip
> Cuando algo "no se aplica" en tu CSS, casi nunca es culpa del navegador. Es la cascada haciendo su trabajo: hay otra regla ganando la partida. Entender este capítulo te va a ahorrar muchas horas de frustración.

---

## 2. Los tres criterios que deciden el ganador

Cuando dos o más reglas tocan la misma propiedad del mismo elemento, el navegador aplica **tres criterios en orden**. Y solo pasa al siguiente si el anterior termina en empate:

1. **Importancia** (¿alguna regla usa `!important`?).
2. **Especificidad** (¿qué tan "específico" es el selector?).
3. **Orden de aparición** (¿cuál se escribió después?).

Vamos uno por uno.

### 2.1 Importancia

> ### 🟦 ¿Qué significa? — *!important*
> `!important` es una marca que pones al final de una declaración para decirle al navegador: "esta gana, pase lo que pase". Sirve para forzar un estilo por encima de todos los demás. Se usa muy poco a propósito, porque rompe el funcionamiento normal de la cascada.
> En `tunal-digital` quizá sientas la tentación de poner `!important` para "arreglar" algo rápido, pero casi siempre es la señal de que conviene revisar el orden o el selector.

```css
p {
  color: red !important; /* esta gana aunque otra regla diga otra cosa */
}

p {
  color: green; /* pierde, aunque esté después */
}
```

Aquí los párrafos salen **rojos**, porque `!important` se salta la regla habitual del orden. Por eso decimos que la importancia se mira **primero** de todo.

> ### ⚠️ Cuidado
> `!important` es como gritar en una conversación: si todos gritan, nadie se entiende. Resérvalo para casos muy puntuales, por ejemplo sobrescribir un estilo de una librería que no puedes editar. En tus propios archivos, casi siempre existe una salida más limpia.

### 2.2 Especificidad

Si ninguna regla usa `!important` (que es lo normal), el navegador pasa a la **especificidad**: qué tan preciso es el selector. Un selector más específico le gana a uno más general.

> ### 🟦 ¿Qué significa? — *Especificidad*
> La **especificidad** es un puntaje que el navegador calcula para cada selector según los "ingredientes" que use. A más puntaje, más prioridad. Así, un estilo dirigido a un elemento concreto pesa más que uno genérico.
> En el `styles.css` de tunal-digital, una regla `.boton-cta` (clase) le gana a una regla `button` (etiqueta), porque la clase es más específica.

La especificidad se calcula con tres "columnas", que puedes imaginar como un marcador `(A, B, C)`:

- **A — IDs**: cuántos `#identificador` hay en el selector.
- **B — clases, atributos y pseudo-clases**: cuántos `.clase`, `[type="text"]`, `:hover` aparecen.
- **C — etiquetas y pseudo-elementos**: cuántos `p`, `div`, `::before` aparecen.

> ### 🟦 ¿Qué significa? — *Pseudo-clase y pseudo-elemento*
> Una **pseudo-clase** es una palabra que se añade a un selector con dos puntos (`:`) para apuntar a un elemento cuando está en cierto **estado**: `:hover` (el ratón encima), `:focus` (tiene el foco del teclado), `:first-child` (es el primer hijo). Un **pseudo-elemento** se escribe con dos puntos dobles (`::`) y apunta a una **parte virtual** del elemento que no existe como etiqueta propia: `::before` y `::after` (contenido generado antes o después), `::first-line` (la primera línea de texto). Sirven para estilar estados y trozos sin tener que crear más HTML.
> En el `styles.css` de tunal-digital, `.boton-cta:hover { background: navy; }` cambia el fondo del botón solo mientras el visitante pasa el ratón por encima. Para la especificidad, una pseudo-clase cuenta como clase (columna B) y un pseudo-elemento como etiqueta (columna C).

La comparación va de izquierda a derecha. Quien tenga más en la columna A gana; si empatan en A, se mira B; si también empatan en B, decide C.

| Selector | IDs (A) | Clases (B) | Etiquetas (C) | Marcador |
|---|---|---|---|---|
| `p` | 0 | 0 | 1 | (0,0,1) |
| `.intro` | 0 | 1 | 0 | (0,1,0) |
| `p.intro` | 0 | 1 | 1 | (0,1,1) |
| `#cabecera` | 1 | 0 | 0 | (1,0,0) |
| `#cabecera .intro` | 1 | 1 | 0 | (1,1,0) |

Veámoslo con un fragmento al estilo de tunal-digital:

```css
/* C = 1 etiqueta → (0,0,1) */
a {
  color: gray;
}

/* B = 1 clase → (0,1,0), gana a lo anterior */
.menu a {
  color: white;
}

/* A = 1 id → (1,0,0), gana a todo lo anterior */
#nav-principal a {
  color: gold;
}
```

Un enlace dentro de `#nav-principal` saldrá **dorado**, porque `(1,0,0)` le gana a `(0,1,0)` y a `(0,0,1)`. Y aunque la regla `a { color: gray }` esté escrita después, pierde igual: el orden solo decide cuando la especificidad ya está empatada.

> ### 💡 Tip
> Para comparar dos selectores, no sumes los números de las columnas como si fueran un total. `(1,0,0)` siempre le gana a `(0,9,9)`. Un solo ID pesa más que un montón de clases juntas. Por eso conviene no abusar de los IDs en CSS: dejan los estilos muy difíciles de sobrescribir más adelante.

### 2.3 Orden de aparición

Si dos reglas tienen la **misma importancia** y la **misma especificidad**, entonces —y solo entonces— gana **la última que aparece**. Esto cuenta tanto para el orden dentro de un archivo como para el orden en que cargas varios archivos en el HTML.

```css
.boton {
  background: blue;
}

.boton {
  background: orange; /* misma especificidad, está después → gana */
}
```

El botón queda **naranja**. Y este es justo el criterio que usaste sin darte cuenta en el primer ejemplo del capítulo.

> ### 🔎 En tu código
> En `tunal-digital`, el orden en que enlazas tus hojas dentro del `<head>` importa. Si tienes `<link rel="stylesheet" href="reset.css">` antes de `<link rel="stylesheet" href="styles.css">`, las reglas de `styles.css` pueden sobrescribir a las de `reset.css` cuando empatan en especificidad. Por eso los "reset" o "normalize" se cargan siempre **primero**.

---

## 3. Cómo Tailwind se relaciona con la cascada

En `RachaSimple` (React + TS + Tailwind) y en `Faro/Organizer` (Next.js + Tailwind) no escribes selectores como en tunal-digital, sino **clases utilitarias** directamente en el HTML/JSX: `class="text-blue-600 bg-white p-4"`. Pero por debajo eso sigue siendo CSS, y sigue obedeciendo la cascada.

> ### 🟦 ¿Qué significa? — *Clase utilitaria (utility class)*
> Una **clase utilitaria** es una clase de CSS pequeñita que hace una sola cosa: `p-4` añade padding, `text-center` centra el texto. Tailwind te trae cientos de ellas listas para usar. Así estilas sin salir del HTML/JSX y sin tener que inventar nombres de clases.
> En `RachaSimple`, un botón puede ser `<button className="bg-green-500 text-white rounded">`. Cada utilidad es, por debajo, una regla CSS normal con su especificidad.

Aquí surge una duda muy habitual: si pongo `class="text-red-500 text-blue-500"`, ¿de qué color queda el texto? Mucha gente piensa que gana el que escribe **último en el HTML**. Pues no. Gana el que aparece **último en el archivo CSS que genera Tailwind**, no el orden en que tú escribiste las clases dentro del atributo.

> ### ⚠️ Cuidado
> En Tailwind, el orden de las clases en el atributo `class`/`className` **no decide** quién gana, porque todas comparten la misma especificidad y lo que manda es el orden en la hoja de estilos final. Si necesitas asegurar que una utilidad gane (por ejemplo, en estados como `hover:` o `md:`), apóyate en los prefijos y variantes que trae Tailwind, no reordenes clases al azar.

---

## 4. La herencia: cuando los hijos copian a los padres

Hasta aquí hablamos de conflictos entre reglas. Ahora viene la otra mitad bonita de CSS: la **herencia**. Es la razón de que pongas un `color` en `body` y, de golpe, **todo el texto de la página** cambie sin que toques cada elemento uno por uno.

> ### 🟦 ¿Qué significa? — *Herencia*
> La **herencia** es el mecanismo por el que ciertos elementos hijos toman automáticamente el valor de una propiedad de su padre, siempre que tú no se lo definas a mano. Te ahorra repetir estilos en cada etiqueta. Funciona como un apellido: lo recibes de tu familia sin pedirlo.
> En el `styles.css` de tunal-digital, si pones `body { color: #333; font-family: sans-serif; }`, todos los `<p>`, `<h1>`, `<li>`, etc., heredan ese gris oscuro y esa tipografía. No tienes que escribirlo cien veces.

### 4.1 Padre e hijo: el árbol del HTML

Para entender la herencia, piensa en el HTML como un árbol genealógico. Cada elemento vive dentro de otro:

```html
<body>            <!-- abuelo -->
  <article>       <!-- padre -->
    <p>Hola</p>   <!-- hijo -->
  </article>
</body>
```

Aquí `body` es ancestro de `article`, y `article` es el padre directo de `p`. Las propiedades que se heredan **bajan** por ese árbol, de arriba hacia abajo.

```css
body {
  color: #2c3e50;          /* heredable */
  font-family: Georgia, serif; /* heredable */
}
```

El `<p>Hola</p>` saldrá con texto color `#2c3e50` y fuente Georgia, **aunque nunca le escribiste una regla propia**, porque heredó esos valores bajando por `article` y `body`.

> ### 💡 Tip
> Poner las propiedades de texto (color, fuente, tamaño base, interlineado) en `body` es una práctica buenísima. Defines el "tono general" una sola vez y dejas que la herencia lo reparta. Después solo sobrescribes las excepciones: un título más grande, un aviso en rojo, lo que haga falta.

### 4.2 Qué se hereda y qué no

No todas las propiedades se heredan. Y hay una lógica detrás:

- **Se heredan** sobre todo las propiedades de **texto**: `color`, `font-family`, `font-size`, `font-weight`, `line-height`, `text-align`, `letter-spacing`, `visibility`, `cursor`.
- **NO se heredan** las propiedades de **caja y layout**: `margin`, `padding`, `border`, `width`, `height`, `background`, `display`, `position`.

¿Por qué esa separación? Imagina que `border` se heredara: pones un borde en `body` y, de repente, cada párrafo, cada palabra envuelta y cada lista tendría su propio borde. Un caos. En cambio, que el color del texto se herede es comodísimo. Quienes diseñaron CSS eligieron heredar lo que casi siempre quieres compartir, y dejar fuera lo que casi nunca quieres repetir.

> ### ⚠️ Cuidado
> `background` no se hereda, pero a veces *parece* que sí. Si pones `background: yellow` en `body`, los párrafos se ven amarillos porque su fondo es **transparente** por defecto y deja ver el amarillo del padre. No es herencia: simplemente no tienen fondo propio. Es un matiz sutil, pero importante.

> ### 🔎 En tu código
> En `PolyPaw` (Python/Flet) no escribes CSS, pero la idea de heredar el estilo de un contenedor padre a sus hijos existe igual: defines propiedades en un control contenedor y los controles de dentro las toman. Y en `RachaSimple`/`Faro` con Tailwind, también puedes apoyarte en la herencia: si pones `text-gray-800` en un contenedor, el texto de los hijos que no tengan clase de color la hereda igual que en CSS puro.

---

## 5. Las palabras clave: inherit, initial, unset (y revert)

CSS te ofrece unas palabras especiales para **controlar la herencia a mano**. Sirven para forzar que algo herede, o para borrarle lo heredado y dejarlo "de fábrica".

### 5.1 inherit

> ### 🟦 ¿Qué significa? — *inherit*
> `inherit` le dice a una propiedad: "toma el mismo valor que tenga mi padre, sea cual sea". Sirve para forzar la herencia incluso en propiedades que normalmente no se heredan, o para reconectar un hijo con su padre.
> En `tunal-digital`, los `<button>` no heredan el color del texto del padre (los navegadores les ponen el suyo). Con `button { color: inherit; }` haces que el botón use el mismo color que el texto que lo rodea.

```css
article {
  color: darkgreen;
}

article button {
  color: inherit; /* el botón se vuelve darkgreen como su contexto */
}
```

### 5.2 initial

> ### 🟦 ¿Qué significa? — *initial*
> `initial` reinicia una propiedad a su **valor inicial de fábrica**, el que define la especificación de CSS (no el navegador ni tu CSS). Sirve para "limpiar" un valor heredado o anterior y volver al punto de partida.
> En `Faro`, si un componente hereda un `color` que no quieres, `color: initial` lo devuelve a su valor por defecto del estándar (que para `color` es negro).

```css
.aviso {
  color: initial; /* ignora lo heredado, vuelve al valor de fábrica */
}
```

> ### 💡 Tip
> Ojo con un detalle: el valor `initial` es el del **estándar CSS**, que no siempre coincide con lo que ves en el navegador por defecto. Por ejemplo, el `display` inicial de cualquier elemento es `inline`, aunque un `<div>` se muestre como bloque por la hoja de estilos del navegador. Por eso `display: initial` en un `div` te puede dejar con cara de sorpresa.

### 5.3 unset

> ### 🟦 ¿Qué significa? — *unset*
> `unset` es un comodín inteligente: si la propiedad **es heredable**, se comporta como `inherit`; si **no es heredable**, se comporta como `initial`. Sirve para "quitar tu intervención" y dejar que la propiedad haga lo que haría de forma natural.
> En `RachaSimple`, si una librería te metió un `color` o un `border` que no quieres, `unset` deja a cada uno en su comportamiento natural sin que tengas que recordar cuál hereda y cuál no.

```css
.reiniciado {
  color: unset;  /* color hereda → actúa como inherit */
  border: unset; /* border no hereda → actúa como initial (sin borde) */
}
```

### 5.4 revert (mención rápida)

> ### 🟦 ¿Qué significa? — *revert*
> `revert` devuelve la propiedad al valor que tendría según la **hoja de estilos del navegador** (no la del estándar puro). Sirve cuando quieres "deshacer tus reglas" pero conservar lo que el navegador hace por defecto, como el aspecto normal de un `<button>` o un `<h1>`.

```css
h1 {
  font-size: revert; /* vuelve al tamaño grande por defecto del navegador */
}
```

> ### ⚠️ Cuidado
> `inherit`, `initial`, `unset` y `revert` se parecen y es fácil mezclarlas. Te dejo una guía mental: `inherit` = "como mi padre"; `initial` = "como el estándar de fábrica"; `unset` = "lo natural según si hereda o no"; `revert` = "como lo deja el navegador". No las vas a usar a diario, pero saber que existen te saca de más de un apuro.

---

## 6. Juntándolo todo: un ejemplo que pelea

Veamos un caso completo, parecido a lo que tendrías en el `styles.css` de tunal-digital, donde la cascada y la herencia trabajan juntas:

```css
/* (0,0,1) — texto general por herencia desde body */
body {
  color: #333;
  font-family: system-ui, sans-serif;
}

/* (0,0,1) — los enlaces normales */
a {
  color: #0066cc;
}

/* (0,1,0) — enlaces dentro del menú: más específico, gana sobre 'a' */
.menu a {
  color: #ffffff;
}

/* (0,1,1) — el enlace activo del menú: aún más específico */
.menu a.activo {
  color: #ffd166;
}
```

Sigamos qué le pasa a un párrafo y a tres enlaces:

- Un `<p>` cualquiera: no tiene regla propia de color, así que **hereda** `#333` desde `body`. La herencia resuelve el caso sin conflicto.
- Un `<a>` suelto en el contenido: gana `a { color: #0066cc }` → azul.
- Un `<a>` dentro de `.menu`: compiten `a` `(0,0,1)` y `.menu a` `(0,1,0)`. Gana la clase → blanco.
- Un `<a class="activo">` dentro de `.menu`: compiten `.menu a` `(0,1,0)` y `.menu a.activo` `(0,1,1)`. Gana la última, más específica → amarillo dorado.

Fíjate en que **en ningún momento hubo azar**: cada decisión salió de los tres criterios (importancia → especificidad → orden) o de la herencia. Eso es CSS bajo control.

> ### 🔎 En tu código
> El propio sitio de este manual (`site/estilos.css`) usa **variables CSS** y temas. Las variables CSS (como `--color-texto`) también se apoyan en la herencia: una variable definida en `:root` (que representa el `<html>`, el ancestro de todo) queda disponible para todos los descendientes. Cuando cambias el tema, cambias la variable en un ancestro y la cascada/herencia la reparte sola a todos los hijos. Es la herencia trabajando a tu favor.

> Bit asoma la cabeza entre tus pestañas del navegador y comenta: "¿Ves? La cascada no es un río salvaje. Es más bien una escalera de agua bien ordenada. Si sabes en qué escalón está cada regla, siempre adivinas dónde cae la gota." Luego se va a tomar una siesta sobre tu teclado, justo encima de la tecla Enter.

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Sé que CSS significa "hojas de estilo en cascada" y qué quiere decir "cascada".
- [ ] Conozco los **tres criterios** para resolver conflictos: importancia → especificidad → orden.
- [ ] Entiendo qué hace `!important` y por qué conviene evitarlo.
- [ ] Sé calcular la especificidad como un marcador `(IDs, clases, etiquetas)` y comparar dos selectores.
- [ ] Recuerdo que el **orden de aparición** solo decide cuando hay empate de especificidad e importancia.
- [ ] Entiendo qué es la **herencia** y por qué un `color` en `body` afecta a toda la página.
- [ ] Distingo propiedades que se heredan (texto) de las que no (caja/layout).
- [ ] Sé qué hacen `inherit`, `initial`, `unset` y `revert`, aunque sea en líneas generales.
- [ ] Entiendo que en Tailwind el orden de las clases en el atributo no decide el ganador.

---

## 🧪 Ejercicios

1. **En papel (sin compu):** calcula el marcador de especificidad `(A,B,C)` de estos selectores y ordénalos de menor a mayor prioridad: `p`, `.intro`, `#main .intro`, `ul li a`, `a.activo:hover`. Explica con tus palabras por qué `#main .intro` le gana a `a.activo:hover`.

2. **En papel (sin compu):** dibuja un árbol HTML con `body > section > p` y, dado `body { color: teal; font-size: 18px; }`, escribe qué color y tamaño tendrá el `<p>` si no le defines ninguna regla. Justifica usando la palabra "herencia".

3. 💻 En el `styles.css` de **tunal-digital** (o un archivo de práctica), escribe dos reglas para `p` con colores distintos y misma especificidad. Confirma en el navegador que gana la última. Luego cambia el orden y verifica que cambia el resultado.

4. 💻 Crea un `.menu` con varios `<a>`. Dale color con `a`, luego con `.menu a`, y observa cómo la clase gana sobre la etiqueta. Añade un `<a class="activo">` con regla `.menu a.activo` y comprueba que ese gana a todos.

5. 💻 Pon un `background: #fffae6` en `body` y comprueba que los párrafos "se ven" amarillos sin tener fondo propio. Luego dale a un `<p>` su propio `background: white` y observa la diferencia. Explica por qué esto NO es herencia.

6. 💻 Toma un `<button>` dentro de un contenedor con `color: crimson`. Verás que el botón no toma ese color. Añade `button { color: inherit; }` y observa cómo ahora sí lo hereda. Bonus: prueba `unset` en `border` y `color` del botón y describe qué pasa con cada uno.
