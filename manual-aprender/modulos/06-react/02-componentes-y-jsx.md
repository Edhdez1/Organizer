# Capítulo 02 — Componentes y JSX

> Ya sabes que un componente es "una función que devuelve interfaz". Ahora aprendamos a
> escribirlos de verdad, y a entender **JSX**: ese "HTML dentro de JavaScript" que da un poco de
> impresión al principio y se vuelve natural enseguida.

---

## 1. Un componente es una función con mayúscula

> ### 🟦 ¿Qué significa? — *Componente de función*
> Un componente es una **función de JavaScript que devuelve JSX** (la interfaz). Dos reglas:
> 1. Su nombre empieza con **mayúscula** (`Saludo`, `HabitCard`), para que React lo distinga de
>    una etiqueta HTML normal.
> 2. Devuelve **una** cosa (un solo elemento, que puede contener otros dentro).
> ```tsx
> function Saludo() {
>   return <h1>¡Hola, Edwar!</h1>;
> }
> ```
> Y se usa como si fuera una etiqueta nueva: `<Saludo />`.

> ### 💡 Tip — Componer componentes
> Como un componente puede usar otros dentro, construyes pantallas combinándolos, igual que
> bloques:
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
> Aquí `App` usa `Saludo` dos veces. Reutilización en acción.

---

## 2. Qué es JSX

> ### 🟦 ¿Qué significa? — *JSX*
> **JSX** (*JavaScript XML*) es una sintaxis que te deja escribir algo **parecido a HTML dentro
> de tu JavaScript/TypeScript**. No es HTML de verdad ni texto: es una forma cómoda de describir
> interfaz que luego React convierte en elementos reales.
> ```tsx
> const elemento = <h1 className="titulo">Hola</h1>;
> ```
> Parece HTML, pero vive dentro del código y puede mezclarse con variables y lógica. Por eso los
> archivos de React son `.jsx` o, con TypeScript, `.tsx`.

---

## 3. Las reglas de JSX (las que más confunden al inicio)

JSX se parece al HTML pero tiene **diferencias** que conviene conocer desde ya:

> ### 🟦 ¿Qué significa? — *`className` en vez de `class`*
> Para poner una clase CSS, en JSX se usa `className`, no `class` (porque `class` es una palabra
> reservada de JavaScript):
> ```tsx
> <div className="tarjeta">…</div>
> ```

> ### 🟦 ¿Qué significa? — *Un solo elemento raíz (y los Fragments)*
> Un componente debe devolver **un único elemento**. Si quieres devolver varios "hermanos", los
> envuelves: en un `<div>`, o en un **Fragment** vacío `<> </>` (que agrupa sin añadir un `<div>`
> extra al resultado):
> ```tsx
> return (
>   <>
>     <h1>Título</h1>
>     <p>Párrafo</p>
>   </>
> );
> ```

> ### 🟦 ¿Qué significa? — *Etiquetas que se autocierran*
> En JSX, los elementos sin contenido **deben** cerrarse con `/`: `<img />`, `<br />`,
> `<input />`. (En HTML era opcional; en JSX es obligatorio.)

---

## 4. Insertar JavaScript en el JSX con `{ }`

Aquí está la magia que diferencia JSX del HTML estático: puedes meter **cualquier valor de
JavaScript** usando llaves `{ }`.

> ### 🟦 ¿Qué significa? — *Las llaves `{ }` en JSX*
> Dentro del JSX, `{ }` significa "aquí va una expresión de JavaScript". Sirve para mostrar
> variables, hacer cálculos o llamar funciones:
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
> Esto es lo que hace a React tan potente: la interfaz se construye **con datos**, no con texto
> fijo. (¿Recuerdas los template strings y el operador ternario del Módulo 03? Reaparecen aquí.)

---

## 5. Mostrar listas: `.map()`

Una de las cosas más comunes: convertir una lista de datos en una lista de elementos. Se usa el
método `.map()` de los arrays (Módulo 03).

> ### 🟦 ¿Qué significa? — *Renderizar una lista con `.map()`*
> `.map()` transforma cada elemento de un array en un trozo de JSX:
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
> Esto genera un `<li>` por cada servicio. Es exactamente cómo RachaSimple muestra tu lista de
> hábitos y Faro tus proyectos: un array de datos → un componente por cada uno.

> ### 🟦 ¿Qué significa? — *La prop `key`*
> Cuando renderizas una lista, React pide una **`key`**: un identificador único por elemento
> (idealmente un `id`). Le sirve para saber qué cambió y actualizar solo lo necesario. Olvidarla
> da una advertencia. Por ahora: **en cada `.map()` que devuelva elementos, pon una `key` única**.

> ### ⚠️ Cuidado — `if` no va dentro del JSX, pero el ternario sí
> Dentro de `{ }` solo van **expresiones** (cosas que devuelven un valor), no un `if` completo.
> Para condicionar, usa el ternario (`condición ? a : b`) o el `&&`:
> ```tsx
> {cargando ? <Spinner /> : <Contenido />}
> {hayError && <p>Algo salió mal</p>}
> ```
> El patrón `condición && <Algo />` muestra `<Algo />` solo si la condición es verdadera.

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
