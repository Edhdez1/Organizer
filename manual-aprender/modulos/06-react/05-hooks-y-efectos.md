# Capítulo 05 — Hooks y efectos

> Cierras React con los **hooks**: ya usaste `useState`; ahora verás `useEffect` (para
> "efectos" como cargar datos) y la idea de los **hooks personalizados**, que es como están
> organizados RachaSimple y Faro. Con esto entiendes el motor completo de tus apps.

---

## 1. Repaso: qué es un hook

> ### 🟦 ¿Qué significa? — *Hook (recordatorio)*
> Un **hook** es una función de React que empieza por `use...` y le añade capacidades a un
> componente. Ya conoces `useState` (recordar datos). Hay varios más; aquí ves el segundo más
> importante, `useEffect`.

> ### ⚠️ Cuidado — Las reglas de los hooks
> Dos reglas que React exige:
> 1. Los hooks se llaman **siempre arriba** del componente, no dentro de `if`, bucles ni
>    funciones anidadas.
> 2. Solo se usan **dentro de componentes** (o de otros hooks).
> Si las rompes, React avisa con un error. Por ahora: pon tus `useState`/`useEffect` al
> principio del componente y listo.

---

## 2. `useEffect`: ejecutar código "como efecto"

> ### 🟦 ¿Qué significa? — *Efecto secundario (side effect)*
> Un **efecto secundario** es algo que tu componente hace **además** de dibujar la interfaz, y
> que toca el "mundo exterior": pedir datos a una API, leer/escribir en el almacenamiento,
> poner un temporizador, suscribirse a algo. React separa "dibujar" (el `return` del componente)
> de "efectos" (con `useEffect`).

> ### 🟦 ¿Qué significa? — *`useEffect`*
> `useEffect` ejecuta una función **después** de que el componente se dibuja, y la repite según
> una lista de **dependencias**:
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
> El segundo argumento de `useEffect` (`[]` arriba) controla **cuándo** se repite el efecto:
> - `[]` (vacío) → se ejecuta **una sola vez**, cuando el componente aparece ("se monta").
> - `[algo]` → se repite cada vez que `algo` cambia.
> - sin array → se ejecuta tras **cada** render (rara vez lo quieres).
> El caso más común es `[]`: "haz esto una vez al cargar" (por ejemplo, pedir datos).

> ### 🟦 ¿Qué significa? — *La función de limpieza*
> Si tu efecto "engancha" algo (un temporizador, una suscripción), debe **desengancharlo** al
> desaparecer el componente. Para eso, el efecto **devuelve una función** de limpieza (el
> `return () => clearInterval(id)` de arriba). React la llama al "desmontar". Evita fugas y
> errores. Por ahora, recuerda: *si abro algo en el efecto, lo cierro en el return*.

---

## 3. Cargar datos: el patrón clásico

El uso más típico de `useEffect`: pedir datos a una API al cargar (uniendo el `fetch`/`async`
del Módulo 03).

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

Aquí ves casi todo el manual junto: estado (`useState`), efecto (`useEffect`), petición
asíncrona (`fetch`/`await`), renderizado condicional (`if (cargando)`). **Eso es una pantalla
real.**

---

## 4. Hooks personalizados: tu propia lógica reutilizable

> ### 🟦 ¿Qué significa? — *Hook personalizado (custom hook)*
> Un **hook personalizado** es una función tuya que **empieza por `use`** y agrupa lógica con
> hooks, para **reutilizarla** en varios componentes. Si tienes que "cargar los hábitos" en tres
> pantallas, no copias el código: lo metes en un `useHabitos()` y lo usas en las tres.
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
> Esto es **exactamente** cómo está organizado RachaSimple: la carpeta `src/hooks/` tiene
> `useHabits.ts`, `useCheckins.ts`, etc. Cada uno encapsula "cómo obtener y cambiar" un tipo de
> dato. Los componentes solo llaman al hook y reciben los datos, sin saber los detalles. Es orden
> y reutilización al máximo.

> ### 💡 Tip — TanStack Query: hooks para datos del servidor
> RachaSimple y Faro usan una librería, **TanStack Query**, que ofrece hooks como `useQuery` para
> pedir datos con súper poderes (caché, recarga automática, estados de carga/error) sin escribir
> todo el `useEffect`/`useState` a mano. No la necesitas para aprender; solo reconoce que
> `useQuery(...)` es "un hook para traer datos del servidor de forma inteligente". Aquí cierra el
> círculo con los genéricos de TypeScript: `useQuery<Habito[]>(...)`.

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

Con esto puedes **leer y entender** los componentes de RachaSimple y Faro, y empezar a construir
los tuyos. React no era un monstruo: era funciones (que ya sabías) que devuelven interfaz, con
props (parámetros), estado (memoria) y efectos (acciones al mundo exterior).

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
