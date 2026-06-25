# Capítulo 05 — TypeScript en la práctica

> Cerramos el módulo viendo cómo TypeScript vive en un proyecto real: su archivo de
> configuración, el modo "estricto" que usan tus apps, y cómo todo lo aprendido se junta en
> `RachaSimple` y `Faro`. Menos sintaxis nueva, más "ver el bosque".

---

## 1. El archivo de configuración: `tsconfig.json`

> ### 🟦 ¿Qué significa? — *`tsconfig.json`*
> Es el archivo donde se configura **cómo** se comporta TypeScript en un proyecto: qué tan
> estricto es, a qué versión de JavaScript compila, qué carpetas revisa. Cada uno de tus repos
> con TypeScript (RachaSimple, Faro) tiene el suyo en la raíz.

> ### 🟦 ¿Qué significa? — *El modo estricto (`strict`)*
> La opción `"strict": true` activa las comprobaciones **más severas** de TypeScript: te obliga
> a manejar los casos `null`/`undefined`, no permite `any` implícitos, etc. Es más exigente al
> escribir, pero atrapa muchísimos más errores. **Tus dos proyectos lo usan** (RachaSimple
> incluso añade `noUncheckedIndexedAccess`, una comprobación extra para accesos a listas).
> ```json
> {
>   "compilerOptions": {
>     "strict": true,
>     "target": "ES2022"
>   }
> }
> ```

> ### 💡 Tip — Estricto desde el día 1
> Empezar un proyecto con `strict: true` es como ponerte el cinturón antes de arrancar: molesta
> un segundo, pero te protege todo el viaje. Activarlo después, en un proyecto grande, es mucho
> trabajo. Por eso es buena práctica nacer estricto.

---

## 2. Cómo se compila y revisa en tus apps

No ejecutas el compilador a mano: las herramientas lo hacen por ti.

> ### 🟦 ¿Qué significa? — *El flujo en RachaSimple (Vite)*
> - Mientras desarrollas, **Vite** (la herramienta de construcción) y tu editor revisan los
>   tipos al vuelo: ves los errores subrayados al instante.
> - Al construir para producción, el comando `tsc` (el compilador de TypeScript) revisa **todo**
>   el proyecto y falla si hay errores de tipo, evitando publicar código roto.
> ```
>   escribes .ts/.tsx  →  Vite/editor avisan en vivo  →  build con tsc revisa todo  →  .js final
> ```

> ### 🔎 En tu código
> El `package.json` de RachaSimple tiene comandos como `"typecheck": "tsc --noEmit"` (revisa los
> tipos sin generar archivos) y un `"build"` que corre `tsc` antes de empaquetar. Es una **red de
> seguridad automática**: nada con errores de tipo llega a tus usuarios.

---

## 3. El panorama: cómo encaja todo

Repasa el viaje. Un dato en RachaSimple vive así, con TypeScript cuidándolo en cada paso:

```
types/database.ts          →  define la forma:  interface Habito { ... }
        │
repositories/habits.ts     →  funciones tipadas que leen/escriben hábitos en Supabase
        │
hooks/useHabits.ts         →  entrega los hábitos a la interfaz (con TanStack Query)
        │
components/HabitCard.tsx    →  un componente que recibe un 'Habito' y lo muestra
```

En cada flecha, TypeScript verifica que la "forma" del hábito se respete. Si alguien cambia la
interface `Habito` (por ejemplo, renombra `nombre` a `titulo`), TypeScript marca **todos** los
lugares que hay que actualizar. Esa es la magia: el tipo es un contrato que mantiene coherente
toda la app, y por eso equipos y proyectos serios lo usan.

> ### 💡 Tip — Por qué esto te empodera (tu meta original)
> Ahora puedes dar órdenes precisas como: *"añade a la interface `Habito` un campo opcional
> `recordatorio` de tipo `string`, y actualiza el repositorio y la tarjeta para usarlo"*. Eso es
> hablar el idioma de tus apps con propiedad, no "hazme algo con los hábitos". Justo el salto que
> buscabas al empezar este manual.

---

## 4. Resumen del módulo

```
TypeScript = JavaScript + tipos
├── Por qué: atrapar errores antes (estático, no dinámico)   (cap. 01)
├── Tipos básicos, inferencia, arrays, any/unknown, uniones  (cap. 02)
├── interface y type: describir la forma de tus datos        (cap. 03)
├── Funciones tipadas y, de lejos, los genéricos             (cap. 04)
└── tsconfig estricto y cómo encaja en RachaSimple/Faro      (cap. 05)
```

Lo esencial: **TypeScript no es un lenguaje nuevo, es JavaScript con una red de seguridad**. Con
poco esfuerzo extra, tu código se vuelve más seguro, más claro y más fácil de mantener.

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Sé qué es `tsconfig.json` y qué hace el modo **`strict`** (que usan tus apps).
- [ ] Entiendo que Vite/el editor revisan tipos en vivo y `tsc` revisa todo al construir.
- [ ] Veo cómo una **interface** mantiene coherente toda la app (de `database.ts` a los componentes).
- [ ] Puedo formular una orden precisa de cambio sobre los tipos de mis apps.

---

## 🧪 Ejercicios

1. **Estricto.** Explica con la analogía del cinturón por qué conviene activar `strict` desde el
   inicio de un proyecto.
2. **¿Qué hace tsc?** ¿Qué revisa el comando `tsc --noEmit` y por qué es útil en el `build`?
3. **El contrato.** Si renombras una propiedad en la `interface Habito`, ¿qué hará TypeScript en
   el resto del proyecto? ¿Por qué es una ventaja y no una molestia?
4. **Orden precisa.** Escribe, en una frase, una instrucción precisa para añadir un campo nuevo a
   un tipo de tu app y actualizar dónde se usa.
5. 💻 **Explora tu app.** Cuando tengas la computadora, abre `RachaSimple/src/types/database.ts`
   y lee una interface completa (por ejemplo `Habit`). Anota sus propiedades y tipos: ya puedes
   entenderla toda.

---

🎉 **¡Terminaste el Módulo 05 — TypeScript!** Sumaste seguridad de tipos a tu JavaScript y ahora
puedes leer el código de RachaSimple y Faro. Lo que viene es el módulo más esperado para esas
apps: **React**, donde se construyen las interfaces con componentes.

➡️ Siguiente módulo: **[06 — React](../06-react/README.md)** *(en preparación)*.
