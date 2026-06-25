# Módulo 06 — React

<p align="center">
  <img src="../../recursos/imagenes/06-react/portada.png" alt="Bit ensamblando bloques de componentes tipo LEGO para construir la pantalla de una app" width="640">
</p>

> **Objetivo del módulo:** aprender **React**, la herramienta con la que se construyen
> interfaces modernas a base de **componentes** (piezas reutilizables). Es el corazón de
> RachaSimple y de Faro. Con todo lo que ya sabes (JavaScript y TypeScript), aquí por fin
> entiendes cómo se arman tus apps "de verdad".

React puede parecer el módulo más grande, pero se apoya en todo lo anterior: un componente es,
en esencia, **una función de JavaScript que devuelve interfaz**. Vamos pieza por pieza.

---

## ¿De dónde sale esto en TUS proyectos?

`RachaSimple` y `Faro` están hechos con React. Sus carpetas `src/components/` (`HabitCard.tsx`,
`ProjectCard.tsx`…) son componentes; sus `src/pages/` son las pantallas. Los archivos `.tsx`
son React + TypeScript. Iremos abriéndolos.

---

## ¿Qué vas a poder hacer al terminar?

- Explicar qué es un **componente** y por qué React organiza así las interfaces.
- Leer y escribir **JSX** (HTML dentro de JavaScript).
- Pasar datos a los componentes con **props** (tipadas con TypeScript).
- Manejar **estado** con `useState` para que la interfaz reaccione.
- Entender los **hooks** (`useEffect` y los personalizados) y cómo se cargan datos.
- Leer un componente real de RachaSimple/Faro y entender qué hace.

---

## Capítulos

| # | Capítulo | Qué cubre |
|---|---|---|
| 01 | [¿Qué es React?](01-que-es-react.md) | Componentes, declarativo, por qué existe |
| 02 | [Componentes y JSX](02-componentes-y-jsx.md) | Función que devuelve interfaz, reglas de JSX |
| 03 | [Props](03-props.md) | Pasar datos a componentes, props tipadas, listas |
| 04 | [Estado con useState](04-estado-usestate.md) | Estado, re-render, eventos, formularios |
| 05 | [Hooks y efectos](05-hooks-y-efectos.md) | `useEffect`, hooks propios, cargar datos |

> Se publican por tandas. Empieza por el 01.

➡️ Empieza por **[Capítulo 01 — ¿Qué es React?](01-que-es-react.md)**.
