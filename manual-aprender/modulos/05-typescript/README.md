# Módulo 05 — TypeScript

<p align="center">
  <img src="../../recursos/imagenes/05-typescript/portada.png" alt="Bit supervisando bloques de código con cascos y etiquetas, con una red de seguridad debajo" width="640">
</p>

> **Objetivo del módulo:** aprender **TypeScript**, que es **JavaScript con seguridad de tipos**.
> No es un lenguaje nuevo desde cero: es JavaScript (que ya sabes) con una capa que **evita
> errores antes de que ocurran**. Es lo que usan RachaSimple y Faro.

Si ya dominas JavaScript (Módulo 03), TypeScript es un paso corto y muy rentable: con poco
esfuerzo, tu código se vuelve más seguro, más fácil de leer y más fácil de mantener.

---

## ¿De dónde sale esto en TUS proyectos?

`RachaSimple` y `Faro` están escritos en **TypeScript** (archivos `.ts` y `.tsx`), incluso en
modo "estricto". Veremos sus tipos reales, como los de `RachaSimple/src/types/database.ts`, que
describen cómo son un hábito, un usuario o un check-in.

---

## ¿Qué vas a poder hacer al terminar?

- Explicar qué problema resuelven los **tipos** y por qué TypeScript atrapa errores antes.
- Anotar variables y funciones con tipos (`string`, `number`, `boolean`, arrays…).
- Crear tus propios tipos con **`interface`** y **`type`** (como las "fichas" de tus datos).
- Entender los **tipos unión**, opcionales y la **inferencia** de tipos.
- Leer el TypeScript de RachaSimple/Faro con confianza.

---

## Capítulos

| # | Capítulo | Qué cubre |
|---|---|---|
| 01 | [¿Qué es TypeScript?](01-que-es-typescript.md) | Por qué tipos, superset de JS, compilación |
| 02 | [Tipos básicos y anotaciones](02-tipos-basicos.md) | Anotar variables, arrays, `any`, inferencia |
| 03 | [Interfaces y tipos propios](03-interfaces-y-tipos.md) | `interface`, `type`, opcionales, uniones |
| 04 | [Funciones tipadas y genéricos](04-funciones-y-genericos.md) | Tipar parámetros/retornos, intro a genéricos |
| 05 | [TypeScript en la práctica](05-typescript-en-practica.md) | `tsconfig` estricto, tipos reales de tus apps |

> Se publican por tandas. Empieza por el 01.

➡️ Empieza por **[Capítulo 01 — ¿Qué es TypeScript?](01-que-es-typescript.md)**.
