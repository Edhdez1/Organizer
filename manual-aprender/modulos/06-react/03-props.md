# Capítulo 03 — Props

> Un componente reutilizable necesita poder mostrar **datos distintos** cada vez: la misma
> `HabitCard` sirve para "Leer", "Ejercicio" o "Meditar". Eso se logra con **props**, los datos
> que un componente recibe de quien lo usa. Es el segundo concepto más importante de React.

---

## 1. Qué son las props

> ### 🟦 ¿Qué significa? — *Props (propiedades)*
> Las **props** (abreviatura de *properties*) son los **datos que un componente recibe** de su
> "padre" (el componente que lo usa), para personalizar lo que muestra. Funcionan como los
> **parámetros de una función** (¡que ya conoces!): el componente es la función, las props son
> sus argumentos.
> Se pasan como si fueran **atributos** de una etiqueta:
> ```tsx
> <Saludo nombre="Edwar" />
> <Saludo nombre="Ana" />
> ```
> Aquí `nombre` es una prop, con valor distinto cada vez.

---

## 2. Recibir props en el componente

> ### 🟦 ¿Qué significa? — *Recibir y usar props*
> El componente recibe las props como un **objeto** (su primer parámetro). Lo común es
> "desestructurarlas" (sacar las que necesitas por su nombre):
> ```tsx
> function Saludo({ nombre }) {
>   return <h1>¡Hola, {nombre}!</h1>;
> }
> ```
> `{ nombre }` saca la prop `nombre` del objeto de props. Luego se usa dentro del JSX con `{ }`.
> Resultado: `<Saludo nombre="Edwar" />` muestra "¡Hola, Edwar!".

> ### 🟦 ¿Qué significa? — *Desestructuración (destructuring)*
> Es una forma de **sacar valores** de un objeto o lista directamente en variables. En vez de
> `props.nombre`, escribes `{ nombre }` y ya tienes la variable `nombre`. Lo verás por todo el
> código de React; es JavaScript moderno (también funciona fuera de React).

---

## 3. Props tipadas con TypeScript (como en tus apps)

Aquí se unen los Módulos 05 y 06: en RachaSimple y Faro, las props se **tipan** con una
interface, para saber exactamente qué recibe cada componente.

```tsx
interface SaludoProps {
  nombre: string;
  edad?: number;        // opcional
}

function Saludo({ nombre, edad }: SaludoProps) {
  return (
    <div>
      <h1>¡Hola, {nombre}!</h1>
      {edad && <p>Tienes {edad} años</p>}
    </div>
  );
}
```

> ### 🔎 En tu código
> Así es **exactamente** como están escritos los componentes de RachaSimple. Por ejemplo,
> `HabitCard.tsx` define algo como `interface HabitCardProps { habit: Habit; ... }` y recibe un
> objeto `Habit` (¡la interface del Módulo 05!). Por eso, al escribir `habit.`, el editor te
> ofrece `nombre`, `meta`, `color`… TypeScript y React trabajando juntos.

> ### 💡 Tip — Las props son de "solo lectura"
> Un componente **no debe cambiar** sus props; solo las recibe y las muestra. Si algo tiene que
> cambiar con el tiempo (como un contador), eso es **estado**, no props (lo ves en el próximo
> capítulo). Regla: *props = lo que me dan desde afuera (no lo toco); estado = lo mío que cambia
> adentro*.

---

## 4. El flujo de datos: de padres a hijos

> ### 🟦 ¿Qué significa? — *Flujo unidireccional (de arriba hacia abajo)*
> En React, los datos fluyen en **una dirección**: del componente padre a sus hijos, vía props.
> El padre tiene los datos y los reparte; los hijos los reciben y los muestran. Esto hace la app
> **predecible**: para saber qué muestra un componente, miras qué props le pasan.
> ```tsx
> function ListaHabitos({ habitos }) {
>   return (
>     <ul>
>       {habitos.map((h) => (
>         <HabitCard key={h.id} habit={h} />
>       ))}
>     </ul>
>   );
> }
> ```
> El padre `ListaHabitos` recibe un array y le pasa **a cada** `HabitCard` un hábito por la prop
> `habit`. Juntas, las piezas del Módulo: `.map()` (cap. 02), `key`, props tipadas. Esto es,
> literalmente, una pantalla de RachaSimple.

> ### 🟦 ¿Qué significa? — *La prop especial `children`*
> Si pones contenido **entre** las etiquetas de apertura y cierre de un componente, ese contenido
> llega como una prop llamada `children`:
> ```tsx
> function Tarjeta({ children }) {
>   return <div className="tarjeta">{children}</div>;
> }
> // uso:
> <Tarjeta><h2>Título</h2><p>Texto</p></Tarjeta>
> ```
> `children` es lo que envuelve la tarjeta. Es como hacen `AppShell` o `SoftCard` en RachaSimple:
> componentes "contenedores" que envuelven a otros.

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Entiendo que las **props** son los datos que un componente recibe (como parámetros).
- [ ] Las paso como atributos (`<Saludo nombre="Edwar" />`) y las recibo desestructurando.
- [ ] Sé **tipar** las props con una `interface` (uniendo TypeScript y React).
- [ ] Entiendo que las props son **de solo lectura** y la diferencia con el estado.
- [ ] Comprendo el **flujo de datos** de padres a hijos.
- [ ] Sé qué es la prop **`children`**.

---

## 🧪 Ejercicios

1. **Pasa props.** Escribe un componente `Boton` que reciba una prop `texto` y la muestre dentro
   de un `<button>`. Úsalo dos veces con textos distintos.
2. **Desestructura.** Reescribe `function Boton(props) { return <button>{props.texto}</button> }`
   usando desestructuración.
3. **Tipa.** Crea una `interface BotonProps` para el componente anterior (`texto: string` y un
   `primario?: boolean`).
4. **Padre e hijo.** Dado un array `productos` (cada uno con `id` y `nombre`), escribe un
   componente `ListaProductos` que renderice una `<TarjetaProducto>` por cada uno, pasándole el
   producto por props.
5. **Lee tu app.** Abre (mentalmente) `HabitCard.tsx`: ¿qué prop crees que recibe y de qué tipo
   (del Módulo 05)? ¿Qué propiedades de esa prop usaría para mostrarse?

➡️ Siguiente: **[Capítulo 04 — Estado con useState](04-estado-usestate.md)**.
