# Capítulo 02 — Componentes y JSX

> Ya sabes que un componente es "una función que devuelve interfaz". Toca aprender a
> escribirlos en serio y a entender **JSX**: ese "HTML dentro de JavaScript" que al principio
> echa un poco para atrás y, en cuanto le coges el truco, se vuelve de lo más natural.

---

## 1. Un componente es una función con mayúscula

> ### 🟦 ¿Qué significa? — *Componente de función*
> Un componente es una **función de JavaScript que devuelve JSX** (la interfaz). Tiene dos reglas:
> 1. Su nombre empieza con **mayúscula** (`Saludo`, `HabitCard`), para que React lo distinga de
>    una etiqueta HTML normal.
> 2. Devuelve **una sola** cosa: un único elemento, que por dentro puede contener todos los que quieras.
> ```tsx
> function Saludo() {
>   return <h1>¡Hola, Edwar!</h1>;
> }
> ```
> Y lo usas como si fuera una etiqueta recién inventada: `<Saludo />`.

> ### 💡 Tip — Componer componentes
> Como un componente puede meter otros por dentro, montas pantallas combinándolos, igual que
> quien encaja piezas:
> ```tsx
> function App() {
>   return (
>     <main>
>       <Saludo />
>       <Saludo />
>     </main>
>   );
> }
> ```
> Aquí `App` usa `Saludo` dos veces. Reutilización en estado puro.

---

## 2. Qué es JSX

> ### 🟦 ¿Qué significa? — *JSX*
> **JSX** (*JavaScript XML*) es una sintaxis que te permite escribir algo **muy parecido a HTML,
> pero dentro de tu JavaScript/TypeScript**. No es HTML de verdad ni una cadena de texto: es una
> manera cómoda de describir la interfaz que después React traduce a elementos reales.
> ```tsx
> const elemento = <h1 className="titulo">Hola</h1>;
> ```
> A la vista parece HTML, pero vive dentro del código y se mezcla sin problema con variables y
> lógica. Por eso los archivos de React llevan extensión `.jsx` o, cuando usas TypeScript, `.tsx`.

---

## 3. Las reglas de JSX (las que más confunden al inicio)

JSX se parece al HTML, pero tiene unas cuantas **diferencias** que vale la pena tener claras desde el primer día:

> ### 🟦 ¿Qué significa? — *`className` en vez de `class`*
> Para asignar una clase CSS, en JSX se escribe `className`, no `class` (la palabra `class` ya está
> reservada en JavaScript y no puedes reutilizarla):
> ```tsx
> <div className="tarjeta">…</div>
> ```

> ### 🟦 ¿Qué significa? — *Un solo elemento raíz (y los Fragments)*
> Un componente tiene que devolver **un único elemento**. Si necesitas devolver varios "hermanos",
> los envuelves: dentro de un `<div>`, o dentro de un **Fragment** vacío `<> </>`, que los agrupa
> sin colar un `<div>` de más en el resultado final:
> ```tsx
> return (
>   <>
>     <h1>Título</h1>
>     <p>Párrafo</p>
>   </>
> );
> ```

> ### 🟦 ¿Qué significa? — *Etiquetas que se autocierran*
> En JSX, los elementos que no tienen contenido **tienen que** cerrarse con `/`: `<img />`, `<br />`,
> `<input />`. En HTML esto era opcional; aquí no te lo puedes saltar.

---

## 4. Insertar JavaScript en el JSX con `{ }`

Llegamos a lo que de verdad separa al JSX del HTML estático: puedes colar **cualquier valor de
JavaScript** entre llaves `{ }`.

> ### 🟦 ¿Qué significa? — *Las llaves `{ }` en JSX*
> Dentro del JSX, `{ }` quiere decir "aquí va una expresión de JavaScript". Te sirven para mostrar
> variables, hacer cuentas o llamar a funciones:
> ```tsx
> function Saludo() {
>   const nombre = "Edwar";
>   const hora = 14;
>   return (
>     <div>
>       <h1>Hola, {nombre}</h1>
>       <p>Tienes {2 + 3} mensajes</p>
>       <p>{hora < 12 ? "Buenos días" : "Buenas tardes"}</p>
>     </div>
>   );
> }
> ```
> Aquí está la gracia de React: la interfaz se arma **a partir de los datos**, no con texto clavado
> a mano. (¿Te acuerdas de los template strings y el operador ternario del Módulo 03? Pues vuelven a aparecer.)

---

## 5. Mostrar listas: `.map()`

Una tarea que harás mil veces: tomar una lista de datos y convertirla en una lista de elementos.
Para eso está el método `.map()` de los arrays (Módulo 03).

> ### 🟦 ¿Qué significa? — *Renderizar una lista con `.map()`*
> `.map()` convierte cada elemento de un array en un trozo de JSX:
> ```tsx
> function ListaServicios() {
>   const servicios = ["Diseño web", "IA", "Marketing"];
>   return (
>     <ul>
>       {servicios.map((servicio) => (
>         <li key={servicio}>{servicio}</li>
>       ))}
>     </ul>
>   );
> }
> ```
> El resultado es un `<li>` por cada servicio. Es justo así como RachaSimple pinta tu lista de
> hábitos y Faro tus proyectos: un array de datos y, por cada dato, un componente.

> ### 🟦 ¿Qué significa? — *La prop `key`*
> Cuando renderizas una lista, React te pide una **`key`**: un identificador único para cada
> elemento (lo ideal es un `id`). Le sirve para saber qué cambió y actualizar solo lo que hace
> falta. Si la olvidas, te suelta una advertencia. De momento quédate con esto: **en cada `.map()`
> que devuelva elementos, pon una `key` única**.

> ### ⚠️ Cuidado — `if` no va dentro del JSX, pero el ternario sí
> Dentro de `{ }` solo caben **expresiones**, es decir, cosas que devuelven un valor; un `if`
> completo no entra. Para condicionar, tira del ternario (`condición ? a : b`) o del `&&`:
> ```tsx
> {cargando ? <Spinner /> : <Contenido />}
> {hayError && <p>Algo salió mal</p>}
> ```
> El patrón `condición && <Algo />` muestra `<Algo />` únicamente cuando la condición es verdadera.

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Escribo un componente: función con **mayúscula** que **devuelve JSX**.
- [ ] Entiendo qué es **JSX** y que no es HTML literal.
- [ ] Conozco sus reglas: `className`, un solo elemento raíz (o Fragment `<>`), autocierre.
- [ ] Inserto valores y lógica con **`{ }`**.
- [ ] Renderizo listas con **`.map()`** y pongo una **`key`** única.
- [ ] Condiciono con ternario o `&&`, no con `if` dentro del JSX.

---

## 🧪 Ejercicios

1. **Forma.** Escribe un componente `Bienvenida` que devuelva un `<h1>` con un saludo.
2. **Llaves.** Modifícalo para que muestre el valor de una variable `nombre` dentro del `<h1>`.
3. **Arregla el JSX.** ¿Qué errores tiene? `function X() { return <h1 class="t">Hola<h1> <p>Hey</p> }`
   (pista: hay tres problemas: clase, cierre y elemento raíz).
4. **Lista.** Dada `const colores = ["rojo", "verde"]`, escribe el JSX que los muestre como una
   lista `<ul>` con `key`.
5. **Condicional.** Escribe un JSX que muestre "Cargando…" si `cargando` es `true`, y `<p>Listo</p>`
   si no.

➡️ Siguiente: **[Capítulo 03 — Props](03-props.md)**.
