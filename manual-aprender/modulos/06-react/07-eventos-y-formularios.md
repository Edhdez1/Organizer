# Capítulo 07 — Eventos y formularios controlados

> Hasta ahora tus componentes mostraban datos y los cambiaban con botones de juguete. Pero una app
> de verdad **escucha al usuario**: clics, teclas, texto que se escribe, formularios que se envían.
> En este capítulo aprenderás a manejar **eventos** en React (`onClick`, `onChange`, `onSubmit`) y a
> construir **formularios controlados**, donde el **estado** es la única fuente de verdad de lo que
> hay escrito en cada campo. Terminaremos armando, paso a paso, el formulario de **crear hábito** de
> **RachaSimple**. Bit el ajolote viene contigo, con sus branquias rosadas y muchas ganas de teclear.

<p align="center">
  <img src="../../recursos/imagenes/06-react/formulario-controlado.png" alt="Bit el ajolote escribe en un input mientras una flecha conecta lo que teclea con una caja de estado que dice la verdad sobre el valor del campo" width="640">
</p>

---

## 1. Eventos: cómo React escucha al usuario

Una **interfaz** está muerta hasta que reacciona. Que reaccione significa que, cuando ocurre algo
(un clic, una tecla), se ejecuta una función tuya. Esa "cosa que ocurre" es un **evento**.

> ### 🟦 ¿Qué significa? — *Evento*
> Un **evento** es algo que pasa en la página y que el navegador te avisa: el usuario hizo clic,
> movió el ratón, escribió una letra, envió un formulario. En el Módulo 03 (JavaScript) los
> escuchabas con `addEventListener`. En React no usas `addEventListener` a mano: pones la función
> directamente en el JSX y React se encarga del resto.

> ### 🟦 ¿Qué significa? — *Manejador de evento (event handler)*
> Un **manejador de evento** es la **función que se ejecuta cuando el evento ocurre**. Tú la
> escribes y se la pasas a React; React la llama en el momento justo. Por costumbre se nombran
> empezando por `handle...` (`handleClick`, `handleSubmit`, `handleChange`), para que al leerlas
> sepas de inmediato que son respuestas a eventos.

En JSX, los eventos se escriben como **atributos en camelCase** que empiezan por `on`: `onClick`,
`onChange`, `onSubmit`. Les pasas una **función** (no el resultado de llamarla).

```tsx
function BotonSaludo() {
  function handleClick() {
    alert("¡Hola desde React!");
  }

  return <button onClick={handleClick}>Saluda</button>;
}
```

> ### ⚠️ Cuidado
> Fíjate que es `onClick={handleClick}` y **no** `onClick={handleClick()}`. Con paréntesis,
> JavaScript **ejecuta la función al renderizar** y le pasa a `onClick` lo que esa función devuelva
> (normalmente `undefined`). Sin paréntesis, le pasas la función **para que React la llame luego**,
> cuando ocurra el clic. Esta confusión es uno de los errores más comunes de quien empieza.

Si necesitas pasarle argumentos al manejador, lo envuelves en una **función flecha**:

```tsx
<button onClick={() => borrarHabito(habito.id)}>Borrar</button>
```

Aquí `() => borrarHabito(habito.id)` es una función que **todavía no se ejecuta**: se ejecutará
cuando alguien haga clic, y entonces sí llamará a `borrarHabito` con el `id` correcto.

> ### 🟦 ¿Qué significa? — *Función flecha*
> Una **función flecha** (`() => { ... }`) es una forma corta de escribir una función, que viste en
> el Módulo 03. En React se usan muchísimo como manejadores rápidos: `onClick={() => setAbierto(true)}`.
> El `() =>` es "una función que recibe esto y hace aquello".

> ### 🔎 En tu código
> En **RachaSimple**, los componentes de tarjeta de hábito usan exactamente este patrón: el botón de
> completar lleva algo como `onClick={() => marcarHecho(habito.id)}` y el de eliminar
> `onClick={() => eliminar(habito.id)}`. La flecha es la que "recuerda" de qué hábito hablamos.

---

## 2. El objeto del evento

Cuando React llama a tu manejador, le pasa un **objeto del evento** con información sobre lo que
pasó: qué elemento lo disparó, qué tecla se pulsó, qué texto hay escrito, etc.

> ### 🟦 ¿Qué significa? — *Objeto del evento (`event` / `e`)*
> Es un objeto que React entrega a tu manejador con los **datos del evento**. Por costumbre se llama
> `e` o `event`. Los más útiles son `e.target` (el elemento HTML que disparó el evento) y, dentro de
> él, `e.target.value` (el texto que tiene un input en ese momento).

> ### 🟦 ¿Qué significa? — *`e.target.value`*
> `e.target` es el **elemento del DOM** que originó el evento (por ejemplo, el `<input>` donde
> escribiste). `e.target.value` es **el texto que ese input tiene escrito** en ese instante. Es la
> pieza con la que sabrás "qué acaba de teclear el usuario".

En TypeScript (Módulo 05) conviene **tipar** el evento para que el editor te ayude. Para un cambio
en un input, el tipo es `React.ChangeEvent<HTMLInputElement>`:

```tsx
function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
  console.log("Lo que hay escrito ahora:", e.target.value);
}
```

> ### 💡 Tip
> No memorices todos los tipos de evento. Empieza a escribir `(e) =>` dentro de un `onChange` y tu
> editor (VS Code) te dirá el tipo correcto. Los tres que usarás casi siempre son
> `ChangeEvent<HTMLInputElement>` (inputs de texto), `ChangeEvent<HTMLTextAreaElement>` (áreas de
> texto) y `FormEvent<HTMLFormElement>` (envío de formulario).

---

## 3. Inputs no controlados vs. controlados

Aquí está el concepto central del capítulo. Hay dos formas de manejar un campo de texto en React.

> ### 🟦 ¿Qué significa? — *Input no controlado*
> Un **input no controlado** es un campo donde **el navegador guarda el texto por su cuenta** y React
> no sabe lo que hay escrito hasta que lo va a buscar. Es como en HTML puro (Módulo 01): el `<input>`
> tiene su propio valor interno. Sirve para casos simples, pero React no "ve" el valor en cada
> momento.

> ### 🟦 ¿Qué significa? — *Input controlado (componente controlado)*
> Un **input controlado** es un campo cuyo valor **vive en el estado de React** (`useState`, del
> Módulo 06-cap.04). El `<input>` no decide nada por su cuenta: muestra lo que dice el estado, y cada
> tecleo actualiza el estado. Así el estado es **la fuente de verdad**: lo que está en pantalla y lo
> que hay en tu variable son siempre lo mismo.

> ### 🟦 ¿Qué significa? — *Fuente de verdad (source of truth)*
> La **fuente de verdad** es **el único lugar donde un dato vive de forma oficial**. Si quieres saber
> qué hay escrito en el campo, miras el estado, no el DOM. Tener una sola fuente de verdad evita que
> la pantalla y tus datos se contradigan, que es una fuente clásica de bugs.

La receta de un input controlado tiene **dos cables** conectados al mismo estado:

```tsx
import { useState } from "react";

function CampoNombre() {
  const [nombre, setNombre] = useState("");

  return (
    <input
      value={nombre}                                  // 1) muestra el estado
      onChange={(e) => setNombre(e.target.value)}     // 2) cada tecla actualiza el estado
      placeholder="Tu nombre"
    />
  );
}
```

Lee despacio los dos cables:

1. **`value={nombre}`** → el input **siempre muestra** lo que dice el estado `nombre`. El estado
   manda sobre la pantalla.
2. **`onChange={(e) => setNombre(e.target.value)}`** → cada vez que el usuario teclea, leemos
   `e.target.value` (el texto nuevo) y lo guardamos con `setNombre`. Eso provoca un **re-render** y el
   input vuelve a mostrar el estado, ya actualizado.

> ### 🟦 ¿Qué significa? — *`value` y `onChange` (el bucle controlado)*
> En un input controlado, `value` y `onChange` trabajan en pareja. `value` **lee** del estado y
> `onChange` **escribe** en el estado. Juntos forman un pequeño bucle: tecleo → `onChange` →
> `setEstado` → re-render → nuevo `value`. Si pones `value` pero olvidas `onChange`, el campo queda
> **bloqueado** (no puedes escribir), porque el estado nunca cambia.

> ### ⚠️ Cuidado
> El error "A component is changing an uncontrolled input to be controlled" en la consola casi siempre
> significa que tu `value` empezó siendo `undefined` (no inicializaste el estado) y luego pasó a tener
> texto. Solución: inicializa siempre el estado con un string vacío `useState("")`, no `useState()`.

> ### 💡 Tip
> ¿Por qué tanto lío para escribir en un campo? Porque cuando el estado es la fuente de verdad puedes
> hacer cosas potentes: validar mientras se escribe, transformar el texto (pasar a mayúsculas, recortar
> espacios), deshabilitar el botón si el campo está vacío, o rellenar el campo desde código. Todo eso
> sería incómodo con un input no controlado.

---

## 4. `onChange`: reaccionar a cada tecla

`onChange` se dispara **cada vez que cambia el contenido del campo**. En React, eso es prácticamente
en cada tecla (a diferencia del HTML clásico, donde `change` esperaba a que el campo perdiera el
foco).

```tsx
function ContadorLetras() {
  const [texto, setTexto] = useState("");

  return (
    <div>
      <input value={texto} onChange={(e) => setTexto(e.target.value)} />
      <p>Llevas {texto.length} caracteres</p>
    </div>
  );
}
```

Como el estado cambia con cada tecla y la app se re-renderiza, el contador `texto.length` se actualiza
en vivo. Esa es la "reactividad" del Módulo 06-cap.01 en acción.

> ### 🔎 En tu código
> En **Faro/Organizer** (Next.js 15 + React 19), las cajas de búsqueda y filtrado de proyectos son
> inputs controlados: lo que escribes vive en estado y la lista de proyectos se filtra en vivo. El
> mismo patrón `value` + `onChange` que acabas de ver, a mayor escala.

> ### 🟦 ¿Qué significa? — *`textarea` y `select` controlados*
> Un `<textarea>` (caja de texto multilínea) y un `<select>` (lista desplegable) se controlan **igual**
> que un `<input>`: con `value` y `onChange`. Ojo: en HTML puro el `<textarea>` ponía su contenido
> entre etiquetas; en React se usa `value={...}` como en cualquier input. Más consistente, menos cosas
> que recordar.

---

## 5. `onSubmit` y prevenir el envío por defecto

Un `<form>` se envía cuando el usuario pulsa Enter o un botón de tipo `submit`. Por defecto, el
navegador **recarga la página entera** y manda los datos a una URL, comportamiento heredado de la web
de los años 90. En una app React **no queremos eso**: queremos manejar el envío con JavaScript sin
recargar.

> ### 🟦 ¿Qué significa? — *Comportamiento por defecto del formulario*
> Es lo que el navegador hace **automáticamente** al enviar un `<form>`: recargar la página y navegar a
> otra URL. En una **SPA** (aplicación de una sola página, como RachaSimple) eso borraría todo el
> estado y rompería la experiencia. Por eso lo cancelamos.

> ### 🟦 ¿Qué significa? — *`e.preventDefault()`*
> `e.preventDefault()` es un método del objeto del evento que le dice al navegador: **"no hagas tu
> comportamiento automático"**. En un formulario, evita la recarga de la página, dejándote a ti el
> control total de qué hacer con los datos.

> ### 🟦 ¿Qué significa? — *`onSubmit`*
> `onSubmit` es el manejador del evento de **envío del formulario**. Se pone en el `<form>`, no en el
> botón. Así capturas tanto el clic en el botón "Enviar" como cuando el usuario pulsa Enter dentro de
> un campo. Casi siempre, lo primero que hace su manejador es `e.preventDefault()`.

```tsx
function FormularioMini() {
  const [nombre, setNombre] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();                 // 1) no recargues la página
    console.log("Enviando:", nombre);   // 2) haz lo tuyo con los datos
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={nombre} onChange={(e) => setNombre(e.target.value)} />
      <button type="submit">Guardar</button>
    </form>
  );
}
```

> ### ⚠️ Cuidado
> Pon `onSubmit` en el `<form>` y deja el botón como `type="submit"`. Un error frecuente es poner un
> `onClick` en el botón en vez de `onSubmit` en el form: así pierdes el envío con la tecla Enter, que
> muchos usuarios esperan. Y recuerda: si olvidas `e.preventDefault()`, verás la página parpadear y
> recargarse al enviar.

> ### 💡 Tip
> El botón de enviar dentro de un `<form>` es `type="submit"` por defecto. Si dentro del mismo form
> tienes **otros** botones que NO deben enviar (por ejemplo "Cancelar"), márcalos explícitamente como
> `type="button"`. Si no, harán submit sin querer.

---

## 6. Validación básica

**Validar** es comprobar que lo que escribió el usuario tiene sentido **antes** de aceptarlo: que el
nombre no esté vacío, que no sea absurdamente largo, etc.

> ### 🟦 ¿Qué significa? — *Validación*
> **Validar** es revisar que los datos cumplen unas reglas antes de usarlos o guardarlos. Si no las
> cumplen, le avisas al usuario con un mensaje y no envías. Evita guardar basura en la base de datos
> (Supabase, Módulo 07) y mejora la experiencia.

> ### 🟦 ¿Qué significa? — *`.trim()`*
> `.trim()` es un método de los strings (Módulo 03) que **quita los espacios** sobrantes al principio y
> al final. Sirve para que `"   "` (solo espacios) no cuente como un nombre válido: tras `.trim()`
> queda `""`, y `""` es vacío.

```tsx
function FormularioConValidacion() {
  const [nombre, setNombre] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const limpio = nombre.trim();
    if (limpio === "") {
      setError("El nombre no puede estar vacío");
      return;                      // cortamos: no seguimos
    }
    if (limpio.length > 40) {
      setError("Máximo 40 caracteres");
      return;
    }

    setError("");                  // todo bien: limpiamos el error
    console.log("Guardando:", limpio);
    setNombre("");                 // y vaciamos el campo
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={nombre} onChange={(e) => setNombre(e.target.value)} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Guardar</button>
    </form>
  );
}
```

> ### 🟦 ¿Qué significa? — *`return` temprano (early return)*
> Es usar `return` para **salir de la función antes de tiempo** cuando algo no cuadra. En el ejemplo,
> si el nombre está vacío, mostramos el error y hacemos `return`: el código de guardar nunca se
> ejecuta. Es más limpio que anidar muchos `if/else`.

> ### 🟦 ¿Qué significa? — *Renderizado condicional con `&&`*
> `{error && <p>...</p>}` significa "si `error` tiene contenido, muestra el `<p>`; si está vacío, no
> muestres nada". Lo viste en el Módulo 06-cap.02: cuando lo de la izquierda de `&&` es falso (un
> string vacío cuenta como falso), React no dibuja nada. Es el truco para mostrar mensajes solo cuando
> hacen falta.

> ### 💡 Tip
> Además de validar en `handleSubmit`, puedes **deshabilitar el botón** mientras el campo esté vacío:
> `<button type="submit" disabled={nombre.trim() === ""}>`. Así el usuario ve de inmediato que aún no
> puede enviar. Las dos cosas se complementan: el `disabled` guía, la validación protege.

---

## 7. Formularios con varios campos

Un formulario real tiene más de un campo. Tienes dos estrategias:

**Opción A — un `useState` por campo.** Sencilla y clarísima de leer cuando son pocos campos:

```tsx
const [nombre, setNombre] = useState("");
const [meta, setMeta] = useState("");
```

**Opción B — un solo `useState` con un objeto.** Útil cuando hay muchos campos:

```tsx
const [form, setForm] = useState({ nombre: "", meta: "" });

function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
  const { name, value } = e.target;          // name = "nombre" o "meta"
  setForm((prev) => ({ ...prev, [name]: value }));
}
```

> ### 🟦 ¿Qué significa? — *El atributo `name` del input*
> `name` es un atributo del `<input>` que le da una **etiqueta** al campo (`name="nombre"`). Con un
> solo `handleChange` puedes leer `e.target.name` para saber **qué campo** cambió y `e.target.value`
> para saber su nuevo texto. Así un único manejador sirve para todos los campos.

> ### 🟦 ¿Qué significa? — *El operador spread `...prev`*
> `{ ...prev, [name]: value }` significa "copia **todo** lo que ya había en el objeto `prev` y, encima,
> cambia solo el campo `[name]`". El `...` (spread, Módulo 03) clona el objeto. Es importante porque el
> estado en React **no se debe mutar**: creas un objeto nuevo en vez de modificar el viejo.

> ### 🟦 ¿Qué significa? — *Clave dinámica `[name]`*
> `[name]` entre corchetes dentro de un objeto significa "usa el **valor** de la variable `name` como
> nombre de la propiedad". Si `name` vale `"meta"`, entonces `{ [name]: value }` equivale a
> `{ meta: value }`. Permite escribir un solo manejador que sirva para cualquier campo.

> ### ⚠️ Cuidado
> Nunca hagas `form.nombre = "x"` para cambiar el estado: eso es **mutar** el objeto y React no se
> entera (no re-renderiza). Siempre crea un objeto nuevo con `setForm({ ...prev, ... })`. La regla de
> oro del estado, ya vista en el cap.04, es: **trata el estado como inmutable**.

---

## 8. El formulario de crear hábito en RachaSimple

Pongamos todo junto en el caso real: el formulario que crea un hábito en **RachaSimple** (React 18 +
TypeScript + Vite + Tailwind + shadcn/ui + Supabase + TanStack Query). El usuario escribe el nombre
del hábito y una pequeña meta, y al enviar se guarda. Aquí una versión didáctica, fiel al patrón del
proyecto:

```tsx
import { useState } from "react";

// El tipo del nuevo hábito (lenguaje del Módulo 05: TypeScript)
type NuevoHabito = {
  nombre: string;
  meta: string;
};

type Props = {
  onCrear: (habito: NuevoHabito) => void;   // función que el padre nos pasa por props
};

export function FormCrearHabito({ onCrear }: Props) {
  const [nombre, setNombre] = useState("");
  const [meta, setMeta] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const nombreLimpio = nombre.trim();
    if (nombreLimpio === "") {
      setError("Ponle un nombre a tu hábito");
      return;
    }

    onCrear({ nombre: nombreLimpio, meta: meta.trim() });

    // limpiamos el formulario para el siguiente hábito
    setNombre("");
    setMeta("");
    setError("");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Ej: Beber agua"
        className="w-full rounded border px-3 py-2"
      />
      <input
        value={meta}
        onChange={(e) => setMeta(e.target.value)}
        placeholder="Ej: 8 vasos al día"
        className="w-full rounded border px-3 py-2"
      />

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={nombre.trim() === ""}
        className="rounded bg-emerald-600 px-4 py-2 text-white disabled:opacity-50"
      >
        Crear hábito
      </button>
    </form>
  );
}
```

Repasa las piezas que ya conoces, ahora juntas:

- **Dos inputs controlados** (`nombre`, `meta`): cada uno con su `value` + `onChange`.
- **`onSubmit` con `e.preventDefault()`**: nada de recargar la página.
- **Validación**: si falta el nombre, mostramos error y `return` temprano.
- **`onCrear(...)`**: en vez de hablar con Supabase aquí dentro, este componente **avisa al padre**
  pasándole el hábito por una función recibida en props (Módulo 06-cap.03). Separa "el formulario" de
  "guardar en la base de datos".
- **Limpieza** del formulario tras crear, y **`disabled`** mientras falte el nombre.

> ### 🟦 ¿Qué significa? — *Levantar el estado / avisar al padre (`onCrear`)*
> En vez de que el formulario sepa cómo guardar en Supabase, recibe una función `onCrear` por **props**
> y la llama cuando el usuario envía. El componente padre decide qué hacer (guardar, refrescar la
> lista…). Esto se llama **levantar el estado** y mantiene al formulario simple y reutilizable.

> ### 🔎 En tu código
> En **RachaSimple**, ese `onCrear` del padre normalmente dispara una **mutación de TanStack Query**
> que inserta el hábito en **Supabase** y luego refresca la lista de hábitos en pantalla. TanStack
> Query lo verás más adelante; por ahora quédate con la idea: el formulario **recoge y valida**, el
> padre **persiste**. Cada uno hace una cosa.

> ### 💡 Tip
> Las `className` largas (`w-full rounded border px-3 py-2`) son utilidades de **Tailwind**, el sistema
> de estilos de RachaSimple y de Faro. No te asustes: cada palabra es un pequeño estilo (ancho
> completo, bordes redondeados, padding…). Lo importante de este capítulo es la **lógica** de eventos y
> estado, no las clases de estilo.

> ### 🔎 En tu código
> Compara con tus otros proyectos: en **tunal-digital** (HTML/CSS/JS vanilla) un formulario usaría
> `addEventListener("submit", ...)` y `e.preventDefault()` igual que aquí, pero leyendo el valor del
> DOM directamente; en **PolyPaw** (Python + Flet) los campos se manejan con widgets de Flet y sus
> propios eventos. El patrón "evento → leer dato → validar → guardar" es universal; lo que cambia es
> **dónde vive la fuente de verdad**. En React, vive en el estado.

---

## 9. Resumen del flujo

Cada formulario controlado de React sigue el mismo ciclo, sin importar cuántos campos tenga:

1. El estado guarda lo que hay en cada campo (`useState`).
2. `value` muestra el estado; `onChange` lo actualiza en cada tecla.
3. `onSubmit` captura el envío y empieza con `e.preventDefault()`.
4. Validas; si algo falla, muestras error y haces `return`.
5. Si todo va bien, usas los datos (avisas al padre, guardas en Supabase…) y limpias el formulario.

Domina ese ciclo y habrás dominado el 90% de los formularios que escribirás. Bit ya está aplaudiendo
con sus patitas: tu UI por fin escucha.

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Sé escribir un manejador de evento y pasarlo a `onClick` **sin** los paréntesis.
- [ ] Entiendo la diferencia entre `onClick={fn}` y `onClick={fn()}`.
- [ ] Sé leer lo que el usuario escribe con `e.target.value`.
- [ ] Puedo explicar qué es un **input controlado** y por qué el estado es la **fuente de verdad**.
- [ ] Conozco los dos cables de un input controlado: `value` (lee) y `onChange` (escribe).
- [ ] Sé poner `onSubmit` en el `<form>` y empezar con `e.preventDefault()`.
- [ ] Puedo validar un campo con `.trim()` y un `return` temprano, y mostrar el error con `&&`.
- [ ] Sé manejar varios campos, con un `useState` por campo o con un objeto y `...prev`.
- [ ] Entiendo cómo el formulario de RachaSimple **avisa al padre** con `onCrear` en lugar de guardar él mismo.

---

## 🧪 Ejercicios

1. 💻 **Saludo en vivo.** Crea un componente con un input controlado para el nombre y un `<p>` que
   diga "Hola, {nombre} 👋" actualizándose con cada tecla. Si el campo está vacío, que el `<p>` diga
   "Escribe tu nombre".

2. 💻 **Botón con argumento.** Renderiza tres botones de colores ("rojo", "verde", "azul"). Cada uno,
   al hacer clic, debe llamar a un mismo manejador `elegirColor(color)` y guardar el color elegido en
   estado, mostrándolo abajo. Usa funciones flecha para pasar el argumento.

3. 💻 **Formulario de hábito mínimo.** Reproduce `FormCrearHabito` con un solo campo (`nombre`).
   Valida con `.trim()` que no esté vacío, muestra un error en rojo si lo está, deshabilita el botón
   mientras el campo esté vacío y, al enviar bien, haz `console.log` del nombre y limpia el campo.

4. 💻 **Dos campos con un objeto.** Convierte el formulario del ejercicio 3 para que use un solo
   `useState({ nombre: "", meta: "" })` y un único `handleChange` que use `e.target.name` y el spread
   `...prev`. Añade el atributo `name` a cada input.

5. **Caza del error (sin computadora).** Un compañero escribió `<input value={nombre} />` y se queja
   de que "no puede escribir nada en el campo". Explica por escrito por qué pasa y cómo se arregla en
   una sola línea.

6. 💻 **Contador con límite.** Haz un `<textarea>` controlado que muestre debajo "X/120 caracteres" y
   ponga el contador en rojo cuando pase de 120. Deshabilita el botón "Publicar" si se supera el
   límite. (Pista: `value.length` y un `&&` para el color.)
