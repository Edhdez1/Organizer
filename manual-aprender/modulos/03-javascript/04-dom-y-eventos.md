# Capítulo 04 — El DOM y los eventos

> Hasta ahora JavaScript hablaba con la consola. Ahora hará lo que de verdad importa en una web:
> **cambiar la página en vivo** y **reaccionar a lo que hace el usuario** (clics, escritura). Aquí
> es donde HTML, CSS y JavaScript por fin trabajan juntos.

---

## 1. Recordando el DOM

> ### 🟦 ¿Qué significa? — *DOM (repaso del Módulo 01)*
> El **DOM** (*Document Object Model*) es el **árbol** que el navegador construye a partir de tu
> HTML, donde cada etiqueta es un "nodo". JavaScript puede **leer y modificar** ese árbol: cambiar
> un texto, ocultar un elemento, añadir una clase de CSS, crear elementos nuevos. Cuando una web
> "cambia sin recargar", es JavaScript manipulando el DOM.

---

## 2. Seleccionar elementos: encontrar lo que quieres cambiar

Antes de cambiar algo, hay que **agarrarlo**. Para eso se usan los selectores (¡los mismos de
CSS!).

> ### 🟦 ¿Qué significa? — *`document` y `querySelector`*
> `document` representa toda la página. `document.querySelector("...")` **busca y devuelve el
> primer** elemento que coincida con un selector CSS:
> ```javascript
> const titulo = document.querySelector("h1");        // el primer <h1>
> const boton  = document.querySelector(".boton");    // el primer elemento con class="boton"
> const menu   = document.querySelector("#menu");     // el elemento con id="menu"
> ```
> Para obtener **todos** los que coincidan (no solo el primero), se usa `querySelectorAll`, que
> devuelve una lista.

> ### 🔎 En tu código
> Tu `tunal-digital/sitio-web/main.js` define unas funciones de atajo, `$` y `$$`, que son
> exactamente `querySelector` y `querySelectorAll` con nombre corto. Es un truco común; ahora
> sabes qué hacen por dentro.

---

## 3. Cambiar elementos: leer y modificar

Una vez tienes el elemento en una variable, puedes cambiar sus propiedades.

> ### 🟦 ¿Qué significa? — *`textContent` e `innerHTML`*
> - `elemento.textContent` → lee o cambia el **texto** de un elemento.
> - `elemento.innerHTML` → lee o cambia el **HTML interno** (puede incluir etiquetas).
> ```javascript
> const titulo = document.querySelector("h1");
> titulo.textContent = "¡Texto cambiado por JavaScript!";
> ```
> ⚠️ Prefiere `textContent` cuando solo metes texto: `innerHTML` con datos del usuario puede
> abrir un agujero de seguridad (inyección de código). Por eso tu `main.js` tiene una función
> `escHTML` para "limpiar" texto antes de mostrarlo.

> ### 🟦 ¿Qué significa? — *Cambiar estilos y clases*
> ```javascript
> elemento.style.color = "#1B6B6B";          // cambia un estilo directo
> elemento.classList.add("activo");          // añade una clase CSS
> elemento.classList.remove("oculto");       // quita una clase
> elemento.classList.toggle("abierto");      // la pone si no está, la quita si está
> ```
> **`classList.toggle`** es oro: con una línea muestras/ocultas un menú. Así funciona el botón
> del menú móvil de tu sitio: alterna una clase, y el CSS hace el resto.

> ### 💡 Tip — La división del trabajo
> Fíjate en el patrón ideal: **JavaScript añade o quita una clase**, y **el CSS define cómo se
> ve esa clase**. JS decide *cuándo*, CSS decide *cómo*. No metas diseño en el JavaScript: solo
> cambia clases. Esto mantiene todo ordenado.

---

## 4. Eventos: reaccionar al usuario

> ### 🟦 ¿Qué significa? — *Evento*
> Un **evento** es **algo que ocurre** en la página: un clic, mover el ratón, escribir en un
> campo, enviar un formulario, cargar la página. JavaScript puede "escuchar" estos eventos y
> ejecutar código cuando ocurren.

> ### 🟦 ¿Qué significa? — *`addEventListener`*
> `elemento.addEventListener("evento", función)` dice: "cuando a este elemento le pase *evento*,
> ejecuta *función*". Es la base de toda la interactividad.
> ```javascript
> const boton = document.querySelector(".boton");
>
> boton.addEventListener("click", function () {
>   console.log("¡Me hicieron clic!");
> });
> ```
> La función que pasas se llama **callback**: no se ejecuta ahora, sino **cuando ocurra** el
> evento. Eventos comunes: `"click"`, `"input"` (al escribir), `"submit"` (al enviar formulario),
> `"mouseover"` (al pasar el ratón).

> ### 🟦 ¿Qué significa? — *Callback (función de retorno)*
> Un **callback** es una función que entregas a otra para que la ejecute **más tarde**, cuando
> algo suceda. "Llámame cuando pase X". Es un concepto que reaparece en `fetch` (próximo
> capítulo) y en React.

---

## 5. Un ejemplo completo: un botón que muestra y oculta

Juntando selección, eventos y clases:

```html
<button class="abrir">Mostrar/ocultar menú</button>
<nav class="menu oculto">…enlaces…</nav>
```
```css
.oculto { display: none; }   /* el CSS define qué significa "oculto" */
```
```javascript
const boton = document.querySelector(".abrir");
const menu  = document.querySelector(".menu");

boton.addEventListener("click", () => {
  menu.classList.toggle("oculto");   // alterna: muestra u oculta
});
```

Eso es, en esencia, **el menú de tu propio sitio**. Un clic → alternar una clase → el CSS
muestra u oculta. Tres tecnologías, un resultado.

> ### 🟦 ¿Qué significa? — *El objeto del evento y `preventDefault`*
> El callback recibe un dato con información del evento (por convención `e`). Una de sus
> funciones más útiles es `e.preventDefault()`, que **evita el comportamiento por defecto** del
> navegador. El caso típico: al enviar un formulario, el navegador recarga la página; con
> `e.preventDefault()` lo impides para manejar el envío tú mismo con JavaScript.
> ```javascript
> formulario.addEventListener("submit", (e) => {
>   e.preventDefault();          // no recargues la página
>   // …aquí tu código para procesar el formulario…
> });
> ```
> Tu sitio usa esto para enviar el formulario de contacto sin recargar.

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Entiendo que el **DOM** es la página que JavaScript puede modificar en vivo.
- [ ] Selecciono elementos con `querySelector` / `querySelectorAll` (selectores CSS).
- [ ] Cambio contenido con `textContent` (y sé el riesgo de `innerHTML`).
- [ ] Cambio apariencia con `classList.add/remove/toggle` (JS decide, CSS define).
- [ ] Reacciono al usuario con `addEventListener` y entiendo qué es un **callback**.
- [ ] Sé para qué sirve `e.preventDefault()`.

---

## 🧪 Ejercicios

1. **Selector.** Escribe la línea que guarda en una variable el elemento con `id="titulo"`.
2. **Clase vs. estilo.** ¿Por qué es mejor `elemento.classList.add("activo")` que cambiar
   muchos `elemento.style....` desde JavaScript?
3. **Evento.** Escribe el código para que, al hacer clic en un botón con `class="saludar"`,
   aparezca en consola "¡Hola!".
4. **toggle.** Explica con tus palabras qué hace `menu.classList.toggle("oculto")` si la clase
   ya está y si no está.
5. 💻 **Contador de clics.** Crea una página con un botón y un `<p>` que muestre un número.
   Cada vez que se haga clic en el botón, súmale 1 al número (usa una variable, un evento y
   `textContent`).

➡️ Siguiente: **[Capítulo 05 — Datos, JSON y fetch](05-datos-json-fetch.md)**.
