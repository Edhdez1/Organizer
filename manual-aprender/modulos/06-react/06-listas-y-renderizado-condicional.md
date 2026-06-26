# Capítulo 06 — Listas y renderizado condicional

<p align="center">
  <img src="../../recursos/imagenes/06-react/cap06.png" alt="Ilustración del capítulo (pixel art con Bit)" width="640">
</p>


> Hasta ahora dibujaste cosas **fijas**: un componente, un texto, un botón. Pero las apps
> de verdad muestran **muchas** cosas que vienen de datos: la lista de hábitos de
> **RachaSimple**, la lista de proyectos de **Faro**. En este capítulo aprendes a convertir
> un array en pantalla con `.map()`, a darle a cada elemento su `key`, y a mostrar u ocultar
> partes de la interfaz según condiciones (`&&`, el ternario, devolver `null`) y a agrupar sin
> ensuciar el HTML con **fragmentos**. Bit, el ajolote, te acompaña: él odia repetir cosas a
> mano, así que las listas son su parte favorita.

---

## 1. El problema: tengo un array, quiero pintarlo

Imagina que en RachaSimple tienes los hábitos del usuario guardados en un array, como aprendiste
en el módulo 03 de JavaScript:

```ts
const habitos = [
  { id: "a1", nombre: "Beber agua", racha: 5 },
  { id: "a2", nombre: "Leer 10 min", racha: 12 },
  { id: "a3", nombre: "Salir a caminar", racha: 0 },
];
```

No quieres escribir tres bloques de JSX a mano, porque mañana habrá cinco hábitos, o ninguno.
Quieres una regla: **"por cada hábito del array, dibuja una tarjeta"**. Eso es justo lo que hace
`.map()` dentro de JSX.

> ### 🟦 ¿Qué significa? — *Renderizar una lista*
> **Renderizar una lista** es transformar un array de datos en un array de elementos de interfaz
> (una tarjeta, una fila, un `<li>`...), uno por cada dato. En vez de escribir el HTML repetido a
> mano, le das a React el array y una "plantilla", y React dibuja tantos elementos como datos
> haya. Es el patrón más común de toda app: en RachaSimple pinta los hábitos, en Faro pinta los
> proyectos.

---

## 2. `.map()` dentro de JSX

Ya conoces `.map()` de JavaScript: recorre un array y devuelve un array **nuevo**, con cada
elemento transformado. En React lo usamos para transformar **datos** en **JSX**.

> ### 🟦 ¿Qué significa? — *`.map()` (recordatorio del módulo 03)*
> `.map()` es un método de los arrays. Recibe una función y la aplica a cada elemento, devolviendo
> un array nuevo con los resultados. `[1, 2, 3].map(n => n * 2)` da `[2, 4, 6]`. En React, la función
> devuelve **un trozo de JSX** por cada elemento, así que terminas con un array de elementos que
> React sabe dibujar.

Mira cómo se vería la lista de hábitos de RachaSimple. Recuerda que RachaSimple usa **React 18 +
TypeScript**, así que cada componente es un archivo `.tsx`:

```tsx
function ListaHabitos() {
  const habitos = [
    { id: "a1", nombre: "Beber agua", racha: 5 },
    { id: "a2", nombre: "Leer 10 min", racha: 12 },
    { id: "a3", nombre: "Salir a caminar", racha: 0 },
  ];

  return (
    <ul>
      {habitos.map((habito) => (
        <li key={habito.id}>
          {habito.nombre} — racha de {habito.racha} días
        </li>
      ))}
    </ul>
  );
}
```

Fíjate en tres cosas:

1. El `.map()` va **dentro de llaves** `{ }`, porque es JavaScript metido en JSX (lo viste en el
   capítulo 02).
2. La función del `.map()` **devuelve JSX** (`<li>...</li>`). Aquí usamos paréntesis `( )` después
   de la flecha para devolver el JSX directamente, sin escribir `return`.
3. Cada `<li>` tiene una prop rara llamada `key`. Esa `key` es tan importante que tiene su propia
   sección entera más abajo.

> ### 🟦 ¿Qué significa? — *La "plantilla" del map*
> La **plantilla** es el trozo de JSX que escribes dentro del `.map()` y que se repite por cada
> dato. Escribes la tarjeta **una sola vez** y React la clona con los datos de cada elemento. Si
> mañana cambias el diseño de la tarjeta, lo cambias en un solo lugar.

> ### 💡 Tip — Paréntesis para "devolver sin return"
> En una flecha, `(habito) => (<li>...</li>)` devuelve el `<li>` automáticamente. Si en cambio usas
> llaves `(habito) => { ... }` estás abriendo un **cuerpo de función**, y entonces **sí** necesitas
> escribir `return`. Olvidar el `return` cuando usas llaves es uno de los errores más comunes de
> principiante: el map devuelve `undefined` y no aparece nada.

> ### 🔎 En tu código
> En RachaSimple casi todas las pantallas que listan algo (los hábitos del día, el historial)
> nacen de un `.map()` sobre un array que viene de Supabase. En Faro, la cuadrícula de tarjetas de
> proyectos es exactamente esto: un `.map()` sobre el array de proyectos del usuario.

---

## 3. La prop `key`: por qué React te la pide

Si ejecutas un `.map()` sin `key`, React funciona... pero te grita en la consola con un aviso
amarillo: *"Each child in a list should have a unique key prop"* ("cada hijo de una lista debería
tener una prop key única"). No es un capricho.

> ### 🟦 ¿Qué significa? — *La prop `key`*
> `key` es una prop especial que le das a cada elemento de una lista para que React pueda
> **identificarlo de forma única** entre renders. No la usa tu componente; la usa React por
> dentro. Sirve para que, cuando la lista cambie (se añade, se borra o se reordena algo), React
> sepa **qué elemento es cuál** y actualice solo lo que cambió, en vez de redibujar todo.

Piénsalo así: imagina que tienes tres hábitos y borras el del medio. Sin `key`, React ve "antes
había 3, ahora hay 2" y no está seguro de **cuál** desapareció, así que puede confundirse y dejar
datos viejos (por ejemplo, un checkbox marcado) en la tarjeta equivocada. Con `key`, React dice
"ah, desapareció el de `key="a2"`, dejo intactos los otros dos". Rápido y sin errores.

> ### 🟦 ¿Qué significa? — *Una key "única y estable"*
> - **Única**: dos elementos de la misma lista no pueden tener la misma `key`.
> - **Estable**: la `key` de un elemento no debe cambiar entre renders. El mismo hábito debe tener
>   siempre la misma `key`.
> El candidato perfecto es el **`id`** que ya viene de la base de datos. En RachaSimple cada hábito
> tiene un `id` de Supabase; en Faro cada proyecto tiene su `id`. Úsalos.

```tsx
{habitos.map((habito) => (
  <HabitCard key={habito.id} habito={habito} />
))}
```

> ### ⚠️ Cuidado — No uses el índice como key (casi nunca)
> Es tentador escribir `habitos.map((habito, indice) => <li key={indice}>...)`. El `indice` es la
> posición (0, 1, 2...). Funciona si la lista **nunca** se reordena ni se borra del medio. Pero en
> cuanto borras o reordenas, los índices se "corren" y la `key` deja de ser estable: el elemento 1
> pasa a ser el 0, y React vuelve a confundirse. Resultado: bugs raros con inputs y checkboxes.
> Regla simple: **si tienes un `id`, usa el `id`**. El índice es el último recurso.

> ### ⚠️ Cuidado — La key va en el elemento de más afuera del map
> La `key` se pone en el elemento **raíz** que devuelve el `.map()`, no dentro. Si tu plantilla es
> `<HabitCard key={...} ... />`, la `key` va en `<HabitCard>`. Ponerla en algo de adentro no sirve.

> ### 💡 Tip — La key no llega como prop normal
> Si dentro de `HabitCard` intentas leer `props.key`, te dará `undefined`. `key` es una palabra
> reservada que React se queda para sí mismo. Si necesitas el `id` también dentro del componente,
> pásalo aparte: `<HabitCard key={habito.id} id={habito.id} habito={habito} />`.

---

## 4. Renderizado condicional: mostrar u ocultar partes

A veces no quieres dibujar algo **siempre**, sino **solo si** se cumple una condición. Por
ejemplo: mostrar "¡Vas en racha!" solo si la racha es mayor que cero, o mostrar un mensaje de
"todavía no tienes hábitos" solo si la lista está vacía.

> ### 🟦 ¿Qué significa? — *Renderizado condicional*
> **Renderizado condicional** es decidir, según una condición (un `if` disfrazado), **qué** se
> dibuja o **si** se dibuja algo. Es el equivalente en interfaz de un `if/else` de JavaScript:
> "si el usuario está cargado, muestra su nombre; si no, muestra un spinner".

Hay tres herramientas principales. Vamos una por una.

### 4.1 El operador `&&` ("muestra esto solo si...")

> ### 🟦 ¿Qué significa? — *El operador `&&` en JSX*
> `condicion && <Algo />` significa **"si `condicion` es verdadera, dibuja `<Algo />`; si no, no
> dibujes nada"**. Funciona porque en JavaScript `&&` devuelve el segundo valor solo si el primero
> es verdadero. React, cuando recibe `false`, simplemente no pinta nada.

```tsx
function HabitCard({ habito }: { habito: { nombre: string; racha: number } }) {
  return (
    <div>
      <h3>{habito.nombre}</h3>
      {habito.racha > 0 && <span>🔥 Racha de {habito.racha} días</span>}
    </div>
  );
}
```

Si `habito.racha` es 0, la condición es falsa y el `<span>` simplemente no aparece. Es el patrón
perfecto para "muestra esto **solo cuando** haga falta", sin un "si no" alternativo.

> ### ⚠️ Cuidado — El bug del cero con `&&`
> Hay una trampa famosa. Si escribes `{habito.racha && <span>...</span>}` y `racha` vale `0`,
> JavaScript trata el `0` como falso... pero `&&` devuelve ese `0`, y React **lo dibuja como
> texto**: aparece un "0" suelto en pantalla. Por eso conviene escribir una condición que dé un
> verdadero/falso real: `habito.racha > 0 && ...`. Lo mismo pasa con listas: usa
> `habitos.length > 0 && ...`, no `habitos.length && ...`.

### 4.2 El operador ternario ("esto o aquello")

> ### 🟦 ¿Qué significa? — *El operador ternario `? :`*
> El **ternario** es un `if/else` que cabe en una línea: `condicion ? valorSiVerdadero :
> valorSiFalso`. En JSX lo usas cuando quieres dibujar **una cosa u otra** según la condición (no
> "algo o nada", que es lo del `&&`, sino "A o B").

```tsx
function EstadoRacha({ racha }: { racha: number }) {
  return (
    <p>
      {racha > 0
        ? `Llevas ${racha} días seguidos 🔥`
        : "Hoy empieza tu racha 🌱"}
    </p>
  );
}
```

Lo lees como una frase: *"si racha es mayor que cero, muestra los días; si no, muestra 'hoy
empieza tu racha'"*. Es el patrón ideal para **cargando / cargado**, **vacío / con datos**,
**logueado / invitado**.

> ### 💡 Tip — `&&` vs ternario, ¿cuál uso?
> - ¿Quieres mostrar algo **o nada**? Usa `&&`.
> - ¿Quieres mostrar **una cosa u otra**? Usa el ternario `? :`.
> Si te encuentras escribiendo `condicion ? <Algo /> : null`, eso es un `&&` disfrazado; mejor
> `condicion && <Algo />`.

### 4.3 Devolver `null`: "no dibujes nada"

> ### 🟦 ¿Qué significa? — *Devolver `null` desde un componente*
> Si un componente hace `return null;`, React no dibuja **nada** para ese componente. Es la forma
> limpia de decir "en este caso no quiero aparecer en pantalla". Se usa mucho al principio de un
> componente, como un portero: "si todavía no hay datos, no muestres nada".

```tsx
function AvisoRacha({ habito }: { habito: { racha: number } | null }) {
  if (!habito) return null;          // sin datos todavía: no dibujo nada
  if (habito.racha === 0) return null; // racha en cero: tampoco

  return <p>¡Sigue así! Vas con {habito.racha} días.</p>;
}
```

> ### 💡 Tip — El "return temprano" ordena el componente
> Poner los `if (...) return null;` (o `return <Spinner/>`) **al principio** del componente, antes
> del JSX principal, se llama *early return* ("retorno temprano"). Deja el `return` grande del
> final limpio, sin anidar mil ternarios. Es el estilo que verás tanto en RachaSimple como en Faro.

---

## 5. Fragmentos: agrupar sin ensuciar el HTML

Un componente solo puede devolver **un** elemento raíz. Si quieres devolver dos cosas hermanas
(un título y un párrafo, sin un contenedor común), tienes un problema... a menos que uses un
**fragmento**.

> ### 🟦 ¿Qué significa? — *Fragmento (`<>...</>`)*
> Un **fragmento** es un envoltorio **invisible**: agrupa varios elementos para devolverlos juntos,
> pero **no genera ninguna etiqueta** en el HTML final. Se escribe con la sintaxis corta `<>` ...
> `</>`. Sirve cuando necesitas devolver varios elementos hermanos pero no quieres meter un `<div>`
> extra que ensucie el diseño (y que pueda romper tu CSS de Tailwind).

```tsx
function CabeceraHabito({ nombre, racha }: { nombre: string; racha: number }) {
  return (
    <>
      <h2>{nombre}</h2>
      <p>Racha actual: {racha} días</p>
    </>
  );
}
```

Sin el fragmento, esto sería un error: *"JSX expressions must have one parent element"* ("las
expresiones JSX deben tener un solo elemento padre"). Con `<>...</>` devuelves los dos como un
grupo, y en el HTML final solo aparecen el `<h2>` y el `<p>`, sin envoltorio.

> ### 🟦 ¿Qué significa? — *El fragmento con `key`*
> La forma corta `<>...</>` no acepta props. Si necesitas un fragmento **con `key`** (por ejemplo,
> dentro de un `.map()` donde cada elemento devuelve dos hermanos), tienes que usar la forma larga:
> `<React.Fragment key={algo}>...</React.Fragment>`. Es el único caso donde no puedes usar `<>`.

> ### 💡 Tip — ¿Div o fragmento?
> Si vas a poner clases de Tailwind, un `onClick`, o cualquier estilo, necesitas un elemento real
> como `<div>`. Si **solo** quieres agrupar para cumplir la regla del "un solo padre" y no añadir
> nada visual, usa un fragmento. Menos `<div>` basura = HTML más limpio.

---

## 6. Juntándolo: una lista que viene de Supabase

Aquí es donde todo se conecta. En la vida real, el array de hábitos no está escrito a mano: viene
de la base de datos. RachaSimple y Faro usan **Supabase** para guardar los datos, y los piden con
un hook de **TanStack Query** (lo viste asomar en el capítulo de hooks). No te preocupes por los
detalles de la consulta; concéntrate en cómo el componente reacciona a los tres estados:
**cargando**, **vacío** y **con datos**.

> ### 🟦 ¿Qué significa? — *Supabase (recordatorio)*
> **Supabase** es el servicio que guarda los datos de la app en una base de datos en la nube
> (lo verás a fondo en los módulos 07 y 08). Por ahora basta saber que le pides una "tabla" (por
> ejemplo `habits` o `projects`) y te devuelve un **array** de filas. Ese array es el que pintas
> con `.map()`.

> ### 🟦 ¿Qué significa? — *Los estados de una carga de datos*
> Pedir datos a Supabase no es instantáneo. Mientras tanto, tu componente pasa por estados:
> - **cargando** (`isLoading`): todavía esperando la respuesta.
> - **con datos**: el array llegó y tiene elementos.
> - **vacío**: el array llegó pero está vacío (el usuario aún no creó nada).
> Tu interfaz debe manejar los tres. Esto se llama, informalmente, cubrir los "estados de
> carga, vacío y lleno".

Así se ve la lista de hábitos de RachaSimple combinando todo lo del capítulo:

```tsx
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

type Habito = {
  id: string;
  nombre: string;
  racha: number;
};

function ListaHabitos() {
  const { data: habitos, isLoading } = useQuery({
    queryKey: ["habitos"],
    queryFn: async (): Promise<Habito[]> => {
      const { data } = await supabase.from("habits").select("*");
      return data ?? [];
    },
  });

  // 1) Estado: cargando → return temprano
  if (isLoading) {
    return <p>Cargando tus hábitos…</p>;
  }

  // 2) Estado: vacío → mensaje amable
  if (!habitos || habitos.length === 0) {
    return <p>Todavía no tienes hábitos. ¡Crea el primero! 🌱</p>;
  }

  // 3) Estado: con datos → la lista
  return (
    <ul>
      {habitos.map((habito) => (
        <li key={habito.id}>
          {habito.nombre}
          {habito.racha > 0 && <span> · 🔥 {habito.racha} días</span>}
        </li>
      ))}
    </ul>
  );
}
```

Repasa lo que reconoces de este capítulo en ese componente:

- Dos **return tempranos** con `if` para cargando y vacío.
- El `.map()` para la lista, con `key={habito.id}` (un `id` real de Supabase, único y estable).
- Un `&&` para mostrar la racha **solo si** es mayor que cero (con `> 0`, evitando el bug del cero).

> ### 🔎 En tu código
> En RachaSimple, el componente que lista los hábitos del día sigue exactamente esta forma: pide a
> Supabase con TanStack Query, muestra un estado de carga, un mensaje si no hay hábitos, y un
> `.map()` con `key` cuando hay datos. Si entiendes este patrón, entiendes el 80% de las pantallas
> de la app.

---

## 7. El mismo patrón en Faro: lista de proyectos

Faro usa **Next.js 15 + React 19**, pero el patrón de listas es idéntico: cambia el dato (un
proyecto en vez de un hábito) y los detalles de cada tarjeta. Faro pinta una **cuadrícula de
proyectos** que lee de GitHub y Google Drive y guarda en Supabase.

```tsx
type Proyecto = {
  id: string;
  nombre: string;
  estado: "activo" | "pausado" | "archivado";
  progreso: number; // 0–100
};

function CuadriculaProyectos({ proyectos }: { proyectos: Proyecto[] }) {
  if (proyectos.length === 0) {
    return <p>Conecta GitHub o Drive para ver tus proyectos aquí.</p>;
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {proyectos.map((proyecto) => (
        <article key={proyecto.id} className="rounded-lg border p-4">
          <h3>{proyecto.nombre}</h3>

          {/* ternario: una cosa u otra según el estado */}
          <p>
            {proyecto.estado === "activo"
              ? "🟢 En marcha"
              : proyecto.estado === "pausado"
              ? "🟡 En pausa"
              : "⚪ Archivado"}
          </p>

          {/* && : muestra la barra solo si hay algo de progreso */}
          {proyecto.progreso > 0 && (
            <progress value={proyecto.progreso} max={100}>
              {proyecto.progreso}%
            </progress>
          )}
        </article>
      ))}
    </div>
  );
}
```

> ### 🟦 ¿Qué significa? — *Ternarios encadenados*
> Cuando hay **más de dos** opciones (aquí: activo / pausado / archivado), puedes **encadenar**
> ternarios: `A ? "x" : B ? "y" : "z"`. Se lee "si A, x; si no, si B, y; si no, z". Funciona, pero
> si encadenas muchos se vuelve difícil de leer; en ese caso muchos prefieren una función aparte o
> un objeto que mapee estado → texto. Para dos o tres opciones, el ternario encadenado está bien.

> ### 💡 Tip — Comentarios dentro de JSX
> ¿Viste los `{/* ... */}`? Así se escribe un comentario **dentro** del JSX: va entre llaves y con
> la sintaxis de comentario de bloque. Un `// comentario` suelto dentro del JSX no funciona y rompe
> el render.

> ### 🔎 En tu código
> La diferencia entre RachaSimple (React 18) y Faro (React 19) **no afecta** nada de este capítulo:
> `.map()`, `key`, `&&`, ternarios y fragmentos funcionan igual en ambas versiones. Es la base de
> React, no cambia.

---

## 8. Errores típicos (y cómo los detecta Bit)

Bit el ajolote ya pisó todos estos charcos por ti. Memoriza la lista:

> ### ⚠️ Cuidado — Resumen de trampas
> - **Olvidar `key`** → aviso amarillo en consola y bugs al borrar/reordenar. Usa el `id`.
> - **`key` con índice** en una lista que cambia → bugs con inputs y checkboxes.
> - **`{lista.length && ...}`** → si la longitud es `0`, dibuja un "0" suelto. Usa `> 0`.
> - **Olvidar `return`** dentro de un `.map()` con llaves `{ }` → no aparece nada.
> - **Dos elementos hermanos sin envoltorio** → error de "un solo padre". Mete un fragmento `<>`.
> - **`// comentario`** suelto dentro del JSX → usa `{/* ... */}`.

> ### 💡 Tip — Cuando "no aparece nada"
> Si tu lista no se dibuja, revisa en orden: (1) ¿el array tiene elementos? (haz un `console.log`),
> (2) ¿el `.map()` está dentro de llaves `{ }`?, (3) ¿devuelves el JSX (paréntesis) o te falta el
> `return` (llaves)? El 90% de las veces es una de esas tres.

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Sé convertir un array en JSX usando `.map()` dentro de llaves.
- [ ] Entiendo **por qué** React pide la prop `key` y qué pasa sin ella.
- [ ] Uso el `id` de la base de datos como `key`, y sé por qué el índice es mala idea.
- [ ] Distingo cuándo usar `&&` (algo o nada) y cuándo el ternario `? :` (una cosa u otra).
- [ ] Sé evitar el bug del `0` con `&&` escribiendo condiciones como `length > 0`.
- [ ] Sé devolver `null` para no dibujar nada en un caso concreto.
- [ ] Sé qué es un fragmento `<>...</>` y cuándo lo necesito en vez de un `<div>`.
- [ ] Sé manejar los tres estados de una carga: cargando, vacío y con datos.
- [ ] Reconozco este patrón en la lista de hábitos de RachaSimple y la de proyectos de Faro.

---

## 🧪 Ejercicios

1. **En papel.** Tienes el array `[{id:1, texto:"A"}, {id:2, texto:"B"}]`. Escribe a mano el
   `.map()` que produce un `<li>` por elemento, con su `key`. Luego explica con tus palabras qué
   pasaría si borras el primer elemento y usaste el índice como `key` en vez del `id`.

2. 💻 **Lista simple.** Crea un componente `ListaTareas` que reciba por props un array de objetos
   `{ id, titulo }` y los pinte en un `<ul>` con `.map()` y `key={t.id}`. Pruébalo pasándole tres
   tareas.

3. 💻 **El bug del cero.** Crea un componente que reciba `cantidad: number` y escribe a propósito
   `{cantidad && <p>Tienes {cantidad}</p>}`. Pásale `0` y observa qué se dibuja en pantalla. Luego
   arréglalo con `cantidad > 0 && ...` y compara.

4. 💻 **Ternario de estado.** Inspirándote en Faro, crea `BadgeEstado` que reciba
   `estado: "activo" | "pausado" | "archivado"` y muestre un texto distinto para cada uno usando
   un ternario encadenado. Bonus: reescríbelo con un objeto `{ activo: "...", pausado: "..." }` en
   vez de ternarios y decide cuál te gusta más.

5. 💻 **Tres estados.** Crea `ListaHabitos` que reciba dos props: `cargando: boolean` y
   `habitos: { id: string; nombre: string }[]`. Maneja con return tempranos el estado cargando, el
   vacío (array de longitud 0) y, si hay datos, pinta la lista con `.map()`. Imita la estructura de
   RachaSimple del apartado 6 (pero sin Supabase: los datos te llegan por props).

6. 💻 **Fragmento.** Crea un componente `Encabezado` que devuelva un `<h2>` y un `<p>` hermanos
   **sin** ningún `<div>` que los envuelva. Hazlo fallar primero (devolviendo los dos sin
   envoltorio) para ver el error, y luego arréglalo con un fragmento `<>...</>`.

---

> Bit cierra el capítulo con su frase favorita: *"si lo estás copiando y pegando diez veces, es un
> `.map()`; y si dudas si mostrarlo, es un `&&`."* Con listas, condicionales y fragmentos ya puedes
> construir pantallas reales que respiran con tus datos. En los próximos módulos vas a llenar esas
> listas con datos de verdad desde Supabase. ¡Nos vemos ahí!
