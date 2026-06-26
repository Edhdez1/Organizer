# Capitulo 12 — Rendimiento: memo, useMemo y useCallback

<p align="center">
  <img src="../../recursos/imagenes/06-react/cap12.png" alt="Ilustración del capítulo (pixel art con Bit)" width="640">
</p>


> Hola otra vez. Soy **Bit**, tu ajolote de bolsillo. Hasta ahora hemos hecho que React funcione: componentes que pintan cosas, estado que cambia, props que viajan. En este capitulo vamos a hablar de algo distinto: que React funcione **rapido** y, sobre todo, que tu sepas *cuando* preocuparte por eso y cuando NO. Spoiler de ajolote: la mayoria de las veces React ya es lo bastante rapido y meterte a "optimizar" sin medir solo ensucia el codigo. Aprenderemos `React.memo`, `useMemo` y `useCallback` con ejemplos de **RachaSimple** (app de habitos) y **Faro** (organizador de proyectos). Respira: esto es mas facil de lo que suena.

---

## 1. Primero: ¿que es "re-renderizar" y por que pasa?

Antes de optimizar nada, hay que entender el "problema". Y empieza por una palabra que vas a oir mil veces.

> ### 🟦 ¿Que significa? — *Render (renderizado)*
> Un **render** es cuando React **ejecuta tu funcion de componente** para averiguar que debe mostrar en pantalla. Tu componente es literalmente una funcion que devuelve JSX; "renderizar" = llamar a esa funcion. Sirve para que React calcule el aspecto actual de la interfaz. En **RachaSimple**, cada vez que se renderiza `HabitCard`, React vuelve a ejecutar el cuerpo de esa funcion `.tsx` para saber que pintar.

> ### 🟦 ¿Que significa? — *Re-render (re-renderizado)*
> Un **re-render** es renderizar **otra vez** un componente que ya estaba en pantalla, porque algo pudo haber cambiado. No significa "borrar y volver a dibujar todo" de cero: React solo aplica al navegador las diferencias. Sirve para mantener la pantalla sincronizada con el estado. En **Faro**, cuando marcas una fase de un proyecto como hecha, el componente que muestra el progreso se re-renderiza para mostrar el nuevo porcentaje.

React decide re-renderizar un componente por **tres razones** principales:

1. **Cambia su estado** (`useState` / `useReducer`).
2. **Cambian sus props** (lo que le pasa el componente padre).
3. **Se re-renderiza su padre** — y esto es la clave del capitulo: cuando un componente se re-renderiza, **por defecto** React tambien re-renderiza a *todos sus hijos*, aunque sus props no hayan cambiado.

```tsx
// RachaSimple — version simplificada
function Dashboard() {
  const [filtro, setFiltro] = useState("todos");

  return (
    <div>
      <FiltroBarra valor={filtro} onChange={setFiltro} />
      <ListaHabitos />   {/* se re-renderiza aunque no use 'filtro' */}
    </div>
  );
}
```

Cuando cambias `filtro`, `Dashboard` se re-renderiza. Y como `Dashboard` es el padre, **`ListaHabitos` tambien se re-renderiza**, aunque `ListaHabitos` no reciba `filtro` ni le importe. Asi funciona React por diseno.

> ### 💡 Tip
> Re-renderizar **no es malo por defecto**. React es muy rapido ejecutando funciones de componentes. Un re-render de mas no se nota. El problema aparece solo cuando re-renderizas *muchas veces* algo que hace *mucho trabajo*. Recuerda esa frase: **muchas veces × mucho trabajo**.

---

## 2. ¿Cuando es un problema de verdad?

Bit te lo dice claro: la mayoria de tus componentes **no necesitan** optimizacion. Vas a saber que tienes un problema real cuando se cumpla una de estas:

- La interfaz **se siente lenta** al escribir, hacer scroll o arrastrar (hay un retraso visible).
- Renderizas **listas largas** (cientos de elementos) que se re-pintan en cada tecla.
- Un componente hace un **calculo pesado** (ordenar, filtrar, recorrer mucho dato) en cada render.

En **RachaSimple**, una app de habitos de uso personal, normalmente tienes pocas tarjetas en pantalla: no hay problema de rendimiento real. En **Faro**, si listaras decenas de proyectos y cada uno recalculara su progreso con logica pesada en cada render, *ahi* empezaria a tener sentido medir.

> ### 🟦 ¿Que significa? — *Optimizacion prematura*
> **Optimizar prematuramente** es agregar trucos de rendimiento *antes* de comprobar que existe un problema. Es un anti-patron: complica el codigo, esconde bugs y casi nunca mejora nada perceptible. La regla sana es **primero medir, despues optimizar**. En **RachaSimple**, envolver cada componentito en `memo` "por si acaso" seria optimizacion prematura.

> ### 🟦 ¿Que significa? — *Profiler (de React DevTools)*
> El **Profiler** es una pestana de la extension **React Developer Tools** del navegador que **graba** lo que se renderiza y te dice *que componentes* se renderizaron y *cuanto tardo* cada uno. Sirve para medir antes de optimizar, en vez de adivinar. Lo usarias abriendo **RachaSimple** o **Faro** en `localhost`, grabando mientras interactuas, y mirando que tarjeta aparece costosa.

> ### ⚠️ Cuidado
> No optimices "a ojo". Si no has abierto el Profiler y visto un componente lento de verdad, probablemente no tienes un problema de rendimiento — tienes un problema imaginario. Bit ha visto codigo lleno de `useMemo` que no aceleraba nada y solo hacia el archivo mas dificil de leer.

---

## 3. Una pieza que falta: igualdad por referencia

Para entender `memo`, `useMemo` y `useCallback` necesitas una idea de JavaScript (la viste en el modulo 03) que ahora cobra todo su sentido.

> ### 🟦 ¿Que significa? — *Igualdad por referencia*
> En JavaScript, los **objetos**, **arrays** y **funciones** se comparan por **referencia** (su "direccion en memoria"), no por su contenido. Dos objetos con los mismos datos NO son iguales si son objetos distintos. Sirve para entender por que React cree que "algo cambio" aunque a tus ojos sea lo mismo. Esto es la causa de casi todos los re-renders "raros" en **Faro** y **RachaSimple**.

```ts
// Numeros y textos: se comparan por valor
5 === 5            // true
"hola" === "hola"  // true

// Objetos, arrays y funciones: se comparan por referencia
{ a: 1 } === { a: 1 }     // false! son dos objetos distintos
[1, 2] === [1, 2]         // false!
(() => {}) === (() => {}) // false!
```

¿Por que importa? Porque **cada vez que tu componente se renderiza**, las funciones y objetos que escribes *dentro* de el se **crean de nuevo**. Son nuevas referencias en cada render:

```tsx
function ListaHabitos({ habitos }) {
  // 'onToggle' es una funcion NUEVA en cada render
  const onToggle = (id: string) => marcarHecho(id);

  // 'estilos' es un objeto NUEVO en cada render
  const estilos = { padding: 8 };

  return habitos.map((h) => (
    <HabitCard key={h.id} habito={h} onToggle={onToggle} estilos={estilos} />
  ));
}
```

Para *ti*, `onToggle` "es la misma funcion". Para React, es una referencia distinta en cada render. Y eso, como veras, anula los trucos de memorizacion si no tienes cuidado. Guarda esta idea: vamos a volver a ella.

---

## 4. `React.memo` — memorizar un componente

> ### 🟦 ¿Que significa? — *Memorizar (memoization)*
> **Memorizar** es **guardar un resultado** para reutilizarlo cuando las entradas no cambian, en vez de calcularlo otra vez. Es como cuando anotas el resultado de una suma dificil en un papel para no repetirla. En React, las tres herramientas de este capitulo son formas de memorizar: un componente, un calculo o una funcion.

> ### 🟦 ¿Que significa? — *`React.memo`*
> **`React.memo`** envuelve un componente y le dice a React: "si las **props** de este componente no cambiaron, **no lo re-renderices** aunque su padre si se haya re-renderizado". Sirve para evitar re-renders inutiles de hijos. Lo aplicarias en **RachaSimple** a una `HabitCard` que aparece muchas veces en una lista y cuyas props casi nunca cambian.

```tsx
// RachaSimple — components/HabitCard.tsx
import { memo } from "react";

interface HabitCardProps {
  habito: { id: string; nombre: string; racha: number };
  onToggle: (id: string) => void;
}

function HabitCard({ habito, onToggle }: HabitCardProps) {
  return (
    <div className="rounded-lg border p-4">
      <h3 className="font-medium">{habito.nombre}</h3>
      <p>Racha: {habito.racha} dias</p>
      <button onClick={() => onToggle(habito.id)}>Marcar hoy</button>
    </div>
  );
}

// La envolvemos: ahora solo se re-renderiza si 'habito' u 'onToggle' cambian
export default memo(HabitCard);
```

Sin `memo`, cada vez que `Dashboard` se re-renderiza (por ejemplo al cambiar un filtro), **todas** las `HabitCard` se re-renderizan. Con `memo`, React compara las props nuevas con las anteriores; si son iguales, **se salta** el render de esa tarjeta.

> ### ⚠️ Cuidado
> `React.memo` compara las props **por referencia** (lo que vimos en la seccion 3). Si le pasas a la tarjeta una funcion `onToggle` que se crea nueva en cada render del padre, `memo` vera "una prop distinta" cada vez y **no servira de nada**. Por eso `memo` casi siempre necesita la ayuda de `useCallback` y `useMemo` para las props que sean funciones u objetos. Esto es lo que mas confunde a la gente — y la razon de las siguientes secciones.

> ### 🔎 En tu codigo
> En **RachaSimple**, una `HabitCard` dentro de una lista es buena candidata a `memo` *si* la lista es larga y el padre se re-renderiza seguido. Si solo tienes 4 habitos, `memo` no aporta nada notable: dejalo simple.

---

## 5. `useCallback` — memorizar una funcion

Ahora resolvamos el problema que dejo `memo`: las funciones que se crean nuevas en cada render.

> ### 🟦 ¿Que significa? — *`useCallback`*
> **`useCallback`** es un Hook que **guarda la misma referencia de una funcion** entre renders, mientras sus dependencias no cambien. Asi, en vez de crear una funcion nueva cada vez, React te devuelve la *misma* de antes. Sirve para que las funciones que pasas como props a un hijo con `memo` no rompan la memorizacion. En **RachaSimple** lo usarias para el `onToggle` que pasas a cada `HabitCard`.

```tsx
// RachaSimple — Dashboard.tsx
import { useCallback, useState } from "react";

function Dashboard() {
  const [filtro, setFiltro] = useState("todos");

  // SIN useCallback: 'onToggle' es nueva en cada render -> memo de HabitCard inutil
  // CON useCallback: misma referencia mientras 'marcarHecho' no cambie
  const onToggle = useCallback((id: string) => {
    marcarHecho(id);
  }, []); // [] = nunca cambia (asumiendo que marcarHecho es estable)

  return (
    <div>
      <FiltroBarra valor={filtro} onChange={setFiltro} />
      {habitos.map((h) => (
        <HabitCard key={h.id} habito={h} onToggle={onToggle} />
      ))}
    </div>
  );
}
```

> ### 🟦 ¿Que significa? — *Array de dependencias*
> El **array de dependencias** es el segundo argumento de `useCallback` (y de `useMemo` y `useEffect`): la lista de valores que, si cambian, hacen que React **vuelva a crear** la funcion/calculo. Si pones `[]`, nunca se recrea. Si pones `[filtro]`, se recrea cuando `filtro` cambie. Sirve para decirle a React *de que depende* tu funcion. En **Faro**, una funcion que filtra proyectos por estado tendria `[estado]` en su array.

> ### ⚠️ Cuidado
> El array de dependencias debe incluir **todo** lo que la funcion use de fuera (props, estado, otras variables). Si lo dejas incompleto, tu funcion puede quedarse usando un valor **viejo** (un bug llamado *stale closure*, "cierre rancio"). El plugin de ESLint `react-hooks` te avisa de dependencias faltantes — hazle caso. En **Faro** esto importa porque un filtro con dependencias mal puestas mostraria proyectos equivocados.

> ### 💡 Tip
> `useCallback` **solo vale la pena** cuando esa funcion se pasa como prop a un componente memorizado (`memo`) o es dependencia de otro Hook. Envolver en `useCallback` una funcion que solo usa un `onClick` normal de un boton no aporta nada — es ruido. Recuerda: `useCallback` existe *para no romper* a `memo`.

---

## 6. `useMemo` — memorizar un calculo

> ### 🟦 ¿Que significa? — *`useMemo`*
> **`useMemo`** es un Hook que **guarda el resultado de un calculo** entre renders, y solo lo vuelve a calcular si sus dependencias cambian. Sirve para dos cosas: (1) evitar repetir un calculo **pesado** en cada render, y (2) mantener **estable la referencia** de un objeto o array que pasas como prop. En **Faro** lo usarias para no recalcular en cada render la lista ordenada de proyectos o un porcentaje de progreso costoso.

```tsx
// Faro — components/ListaProyectos.tsx (Next.js + React 19)
import { useMemo } from "react";

function ListaProyectos({ proyectos, busqueda }: Props) {
  // Calculo que recorre y ordena: lo memorizamos
  const visibles = useMemo(() => {
    return proyectos
      .filter((p) => p.nombre.toLowerCase().includes(busqueda.toLowerCase()))
      .sort((a, b) => b.progreso - a.progreso);
  }, [proyectos, busqueda]); // recalcula solo si cambian estos

  return (
    <ul>
      {visibles.map((p) => (
        <ProyectoCard key={p.id} proyecto={p} />
      ))}
    </ul>
  );
}
```

Sin `useMemo`, ese `filter` + `sort` se ejecutaria en **cada** render de `ListaProyectos`, aunque solo hubiera cambiado algo sin relacion. Con `useMemo`, si `proyectos` y `busqueda` siguen igual, React **reutiliza** la lista calculada antes.

El segundo uso de `useMemo` es sutil pero util: **estabilizar referencias de objetos/arrays** que pasas a un hijo con `memo`.

```tsx
// Faro — sin useMemo, 'config' es un objeto nuevo cada render
const config = { tema: "claro", compacto: true }; // ❌ nueva referencia

// con useMemo, misma referencia mientras nada cambie
const config = useMemo(() => ({ tema: "claro", compacto: true }), []); // ✅
```

> ### 💡 Tip
> Diferencia rapida para no confundirte: **`useMemo` memoriza un VALOR** (lo que devuelve la funcion) y **`useCallback` memoriza la FUNCION en si**. De hecho, `useCallback(fn, deps)` es lo mismo que `useMemo(() => fn, deps)`. Si lo recuerdas asi, nunca los mezclas.

> ### 🔎 En tu codigo
> En **Faro**, el progreso de un proyecto es "hibrido" (milestones + IA). Si calcularlo implica recorrer milestones y combinar con datos del analisis, ese calculo dentro del componente de la tarjeta es un candidato natural a `useMemo` con dependencias `[milestones, analisisIA]`. Si solo es una resta de dos numeros, **no** lo memorices: no vale el costo.

---

## 7. TanStack Query y Server Components: ya optimizan por ti

Bit quiere que ahorres trabajo. Tus dos repos ya tienen herramientas que reducen muchos renders sin que toques `memo`.

> ### 🟦 ¿Que significa? — *Cache (de datos)*
> Una **cache** es un almacen temporal de resultados ya obtenidos para no volver a pedirlos. En **RachaSimple**, **TanStack Query** mantiene en cache los habitos que trajo de Supabase: si vuelves a la pantalla, te los da de su memoria en vez de re-consultar, y solo re-renderiza cuando los datos *de verdad* cambian. Eso ya te evita renders innecesarios sin que escribas `useMemo`.

> ### 🟦 ¿Que significa? — *Server Component*
> Un **Server Component** es un componente de React que se ejecuta **en el servidor** y nunca se re-renderiza en el navegador del usuario. **Faro** (Next.js 15 + React 19) los usa por defecto. Como no viven en el cliente, no tienen el "problema" de re-renders que trata este capitulo: `memo`/`useMemo`/`useCallback` solo aplican a los componentes de cliente (los que llevan `"use client"`). Sirve para mover trabajo fuera del navegador.

> ### 💡 Tip
> Antes de alcanzar `useMemo` en **Faro**, pregunta: ¿este componente necesita ser de cliente? Mucho codigo que parece "necesitar optimizacion" simplemente no deberia ejecutarse en el navegador. En **RachaSimple**, antes de memorizar, confia en que TanStack Query ya esta evitando consultas y renders de mas.

> ### ⚠️ Cuidado
> `useMemo`, `useCallback` y los Hooks en general **solo funcionan en componentes de cliente**. Si intentas usarlos en un Server Component de **Faro** sin `"use client"` arriba del archivo, tendras un error. No es un detalle de rendimiento: es una regla de donde corre el codigo.

---

## 8. Reglas practicas (el resumen que Bit pegaria en la pared)

1. **No optimices sin medir.** Abre el Profiler. Si no se siente lento, no lo esta.
2. **`memo` para componentes** que se repiten en listas largas y cuyo padre se re-renderiza seguido.
3. **`useCallback` para funciones** que pasas como prop a un componente con `memo` o que son dependencia de otro Hook. No para cada `onClick`.
4. **`useMemo` para calculos pesados** (filtrar, ordenar, recorrer mucho) o para **estabilizar** objetos/arrays que pasas a hijos con `memo`. No para sumas triviales.
5. **`memo` necesita aliados:** si pasas funciones u objetos a un hijo con `memo`, casi siempre tambien necesitas `useCallback`/`useMemo`, o `memo` no sirve.
6. **Llena bien las dependencias.** Usa el linter de Hooks; dependencias incompletas = bugs de datos viejos.
7. **Aprovecha lo que ya tienes:** TanStack Query en RachaSimple y Server Components en Faro te ahorran muchisima optimizacion manual.

> ### 💡 Tip
> Un truco mental: las tres herramientas tienen un **costo** (memoria + comparaciones). Solo valen la pena cuando lo que evitan cuesta **mas** que ese costo. Para trabajo barato, memorizar es como pagar por guardar algo que no te importaba perder.

> ### 🔎 En tu codigo
> Revisa **RachaSimple** y **Faro** con esta pregunta honesta: "¿hay algo que se sienta lento *de verdad*?". Si la respuesta es no, el mejor uso de este capitulo es **entender** los conceptos y *no* tocar nada. Saber cuando NO optimizar es tan valioso como saber optimizar.

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Se explicar que es un render y nombrar las tres razones por las que un componente se re-renderiza.
- [ ] Entiendo que un componente padre re-renderiza a sus hijos por defecto, aunque sus props no cambien.
- [ ] Se que objetos, arrays y funciones se comparan por **referencia** y que se crean nuevos en cada render.
- [ ] Puedo explicar que hace `React.memo` y por que suele necesitar `useCallback`/`useMemo`.
- [ ] Distingo `useMemo` (memoriza un **valor**) de `useCallback` (memoriza una **funcion**).
- [ ] Se que el **array de dependencias** controla cuando se recalcula y que dejarlo incompleto causa bugs.
- [ ] Reconozco la **optimizacion prematura** y se que primero hay que **medir** con el Profiler.
- [ ] Se que los Hooks de memorizacion solo aplican a componentes de **cliente** (no a Server Components de Faro).

---

## 🧪 Ejercicios

1. **Sin computadora.** Explica con tus palabras, como si se lo contaras a Bit, la diferencia entre `useMemo` y `useCallback`. Pista: una memoriza un valor, la otra una funcion.

2. **Sin computadora.** Mira este codigo y di por que `memo` en `HabitCard` *no* va a funcionar:
   ```tsx
   function Lista({ habitos }) {
     return habitos.map((h) => (
       <HabitCard key={h.id} habito={h} onToggle={() => marcar(h.id)} />
     ));
   }
   ```
   (Pista: la prop `onToggle`.)

3. **💻 Computadora.** En **RachaSimple**, instala la extension **React Developer Tools**, abre la app en `localhost`, ve a la pestana **Profiler**, graba mientras interactuas con un habito y observa que componentes se re-renderizan. Anota cual tarda mas.

4. **💻 Computadora.** Toma una `HabitCard` de **RachaSimple** y envuelvela en `memo`. Pasa su `onToggle` desde el padre con `useCallback`. Vuelve a grabar con el Profiler y compara: ¿se redujeron los re-renders de las tarjetas?

5. **💻 Computadora.** En **Faro** (o en una copia local), crea una `ListaProyectos` con un `filter` + `sort` y envuelvelo en `useMemo` con dependencias `[proyectos, busqueda]`. Agrega un `console.log("recalculando")` dentro del `useMemo` y comprueba que solo aparece cuando cambian las dependencias.

6. **💻 Computadora (reto).** Busca en **RachaSimple** o **Faro** un `useCallback` o `useMemo` que *no* aporte nada (una funcion que no se pasa a un componente con `memo`, o un calculo trivial). Quitalo, verifica con `npm run build` que todo sigue compilando y observa que la app funciona igual. Acabas de practicar la mejor optimizacion: borrar la que sobraba.

---

> Lo lograste. Lo mas importante que te llevas no es como escribir `memo`, sino **cuando** hacerlo: muchas veces × mucho trabajo, y siempre despues de medir. Un buen desarrollador de React escribe codigo simple primero y optimiza solo donde el Profiler le pide. Nos vemos en el siguiente capitulo. — Bit 🐾
