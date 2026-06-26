# Capítulo 05 — Hooks y efectos

<p align="center">
  <img src="../../recursos/imagenes/06-react/cap05.png" alt="Ilustración del capítulo (pixel art con Bit)" width="640">
</p>


> Llegamos al último tramo de React: los **hooks**. Ya trabajaste con `useState`, así que la
> mitad del camino la tienes andada. Ahora toca `useEffect` (el que usas para "efectos" como
> cargar datos) y la idea de los **hooks personalizados**, que es justo la forma en que están
> organizados RachaSimple y Faro por dentro. Cuando termines esto, vas a entender el motor
> completo de tus apps.

---

## 1. Repaso: qué es un hook

> ### 🟦 ¿Qué significa? — *Hook (recordatorio)*
> Un **hook** es una función de React que empieza por `use...` y le suma capacidades a un
> componente. Ya conoces `useState`, que sirve para recordar datos. Hay varios más, pero aquí
> nos centramos en el segundo en importancia: `useEffect`.

> ### ⚠️ Cuidado — Las reglas de los hooks
> React te pide cumplir dos reglas con los hooks:
> 1. Se llaman **siempre arriba** del componente. Nunca dentro de un `if`, de un bucle ni de
>    funciones anidadas.
> 2. Solo se usan **dentro de componentes** (o dentro de otros hooks).
> Si rompes alguna, React te lo dirá con un error bien claro. La regla de oro mientras te
> acostumbras: pon tus `useState` y tus `useEffect` al principio del componente y ya está.

---

## 2. `useEffect`: ejecutar código "como efecto"

> ### 🟦 ¿Qué significa? — *Efecto secundario (side effect)*
> Un **efecto secundario** es todo lo que tu componente hace **aparte** de dibujar la interfaz,
> y que toca el "mundo exterior": pedir datos a una API, leer o escribir en el almacenamiento,
> arrancar un temporizador, suscribirse a algo. React mantiene separadas dos cosas: dibujar (eso
> es el `return` del componente) y los efectos (eso va en `useEffect`).

> ### 🟦 ¿Qué significa? — *`useEffect`*
> `useEffect` corre una función **después** de que el componente se dibuja, y la vuelve a correr
> según lo que le digas en una lista de **dependencias**:
> ```tsx
> import { useState, useEffect } from "react";
>
> function Reloj() {
>   const [hora, setHora] = useState(new Date());
>
>   useEffect(() => {
>     const id = setInterval(() => setHora(new Date()), 1000);
>     return () => clearInterval(id);   // limpieza
>   }, []);   // [] = ejecutar solo una vez, al montar
>
>   return <p>Son las {hora.toLocaleTimeString()}</p>;
> }
> ```

> ### 🟦 ¿Qué significa? — *El array de dependencias*
> El segundo argumento de `useEffect` (ese `[]` de arriba) decide **cuándo** se repite el efecto:
> - `[]` (vacío) → corre **una sola vez**, cuando el componente aparece, lo que llamamos "montar".
> - `[algo]` → se repite cada vez que `algo` cambia.
> - sin array → corre tras **cada** render, algo que rara vez quieres.
> El caso que más vas a usar es `[]`: "haz esto una vez al cargar", por ejemplo pedir datos.

> ### 🟦 ¿Qué significa? — *La función de limpieza*
> Cuando tu efecto "engancha" algo (un temporizador, una suscripción), tiene que
> **desengancharlo** cuando el componente desaparece. Para eso el efecto **devuelve una función**
> de limpieza, que es ese `return () => clearInterval(id)` del ejemplo. React la ejecuta al
> "desmontar" el componente, y así evitas fugas de memoria y errores raros. Quédate con la idea:
> *si abro algo en el efecto, lo cierro en el return*.

---

## 3. Cargar datos: el patrón clásico

El trabajo más habitual de `useEffect` es justamente pedir datos a una API en cuanto la pantalla
carga. Aquí se juntan el `fetch` y el `async` que viste en el Módulo 03.

```tsx
function Perfil() {
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function cargar() {
      const r = await fetch("https://api.github.com/users/Edhdez1");
      setDatos(await r.json());
      setCargando(false);
    }
    cargar();
  }, []);   // una vez al montar

  if (cargando) return <p>Cargando…</p>;
  return <h2>{datos.name} — {datos.public_repos} repos</h2>;
}
```

Fíjate en lo que cabe en este pedacito: estado (`useState`), efecto (`useEffect`), una petición
asíncrona (`fetch`/`await`) y renderizado condicional (`if (cargando)`). Casi todo el manual
junto. **Esto ya es una pantalla de verdad.**

---

## 4. Hooks personalizados: tu propia lógica reutilizable

> ### 🟦 ¿Qué significa? — *Hook personalizado (custom hook)*
> Un **hook personalizado** es una función tuya que **empieza por `use`** y junta lógica con
> otros hooks, para que puedas **reutilizarla** en varios componentes. Imagina que tienes que
> "cargar los hábitos" en tres pantallas distintas: en lugar de copiar y pegar el mismo código
> tres veces, lo metes en un `useHabitos()` y lo llamas en las tres.
> ```tsx
> function useHabitos() {
>   const [habitos, setHabitos] = useState([]);
>   useEffect(() => { /* …cargar de la base de datos… */ }, []);
>   return habitos;
> }
> // en cualquier componente:
> const habitos = useHabitos();
> ```

> ### 🔎 En tu código
> Así, tal cual, está montado RachaSimple: la carpeta `src/hooks/` tiene `useHabits.ts`,
> `useCheckins.ts` y otros. Cada archivo encierra el "cómo obtener y cambiar" un tipo de dato.
> Los componentes solo llaman al hook y reciben los datos ya listos, sin enterarse de los
> detalles de por medio. Orden y reutilización al máximo.

> ### 💡 Tip — TanStack Query: hooks para datos del servidor
> Tanto RachaSimple como Faro usan una librería llamada **TanStack Query**, que trae hooks como
> `useQuery` para pedir datos con superpoderes: caché, recarga automática, estados de carga y de
> error… todo sin que tengas que escribir a mano el `useEffect`/`useState` de cada petición. No
> hace falta que la domines para aprender; con que reconozcas que `useQuery(...)` es "un hook
> para traer datos del servidor de forma inteligente" basta. Y de paso cierra el círculo con los
> genéricos de TypeScript: `useQuery<Habito[]>(...)`.

---

## 5. Cierre del módulo

```
React
├── Componentes: funciones que devuelven interfaz  (cap. 01)
├── JSX: HTML en JS, {}, .map()/key                 (cap. 02)
├── Props: datos de padre a hijo (tipados)          (cap. 03)
├── Estado: useState, re-render, eventos            (cap. 04)
└── Efectos y hooks: useEffect, custom hooks         (cap. 05)
```

Con esto ya puedes **leer y entender** los componentes de RachaSimple y Faro, y empezar a armar
los tuyos. Al final React no era ningún monstruo: eran funciones (que ya sabías) que devuelven
interfaz, con props (parámetros), estado (memoria) y efectos (acciones hacia el mundo exterior).

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Recuerdo qué es un **hook** y sus dos **reglas** (arriba del componente, solo en componentes).
- [ ] Sé qué es un **efecto secundario** y uso **`useEffect`**.
- [ ] Entiendo el **array de dependencias** (`[]` = una vez) y la **función de limpieza**.
- [ ] Reconozco el patrón de **cargar datos** con `useEffect` + `fetch` + estado.
- [ ] Entiendo qué es un **hook personalizado** y por qué `src/hooks/` organiza así tu app.
- [ ] Sé, a grandes rasgos, qué es `useQuery` de TanStack Query.

---

## 🧪 Ejercicios

1. **Dependencias.** ¿Qué diferencia hay entre `useEffect(fn, [])` y `useEffect(fn, [cuenta])`?
2. **Limpieza.** ¿Por qué el efecto del reloj devuelve `() => clearInterval(id)`? ¿Qué pasaría
   sin esa línea?
3. **Identifica las piezas.** En el componente `Perfil` de la sección 3, señala dónde está: el
   estado, el efecto, la petición asíncrona y el renderizado condicional.
4. **Custom hook.** Explica con tus palabras por qué `useHabitos()` es mejor que copiar el mismo
   `useEffect` en tres componentes.
5. **Lee tu app.** Mira los nombres en `RachaSimple/src/hooks/`. ¿Qué crees que hace `useCheckins`
   y por qué es un hook y no un componente?

---

🎉 **¡Terminaste el Módulo 06 — React!** Y con él, los tres lenguajes del frontend moderno
(JavaScript, TypeScript, React). Ya entiendes por dentro RachaSimple y la parte visual de Faro.
Lo que falta es **dónde viven los datos**: las bases de datos. Eso es lo siguiente.

➡️ Siguiente módulo: **[07 — Bases de datos y SQL](../07-bases-de-datos-sql/README.md)** *(en preparación)*.
