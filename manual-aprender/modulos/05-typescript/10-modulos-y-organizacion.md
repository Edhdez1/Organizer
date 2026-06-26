# Capitulo 10 — Módulos, tipos compartidos y organización

<p align="center">
  <img src="../../recursos/imagenes/05-typescript/cap10.png" alt="Ilustración del capítulo (pixel art con Bit)" width="640">
</p>


> ¡Hola otra vez! Soy **Bit**, tu ajolote acompañante. Hasta ahora le pusiste tipos a variables, funciones, props y hooks, pero todo eso vivía dentro de un solo archivo imaginario. La realidad es otra: un proyecto de verdad tiene **decenas** de archivos, y un mismo tipo (qué es un `Habit`, qué es un `Project`) lo necesitan muchos a la vez. En este capítulo vas a aprender a **compartir tipos** entre archivos sin que se arme un lío: cómo exportarlos, cómo importarlos con un truco propio de TypeScript llamado `import type`, dónde guardarlos para no repetir lo mismo diez veces, y cómo `RachaSimple` y `Faro` acomodan sus carpetas para que nadie se pierda. Acuérdate de que TypeScript es JavaScript con tipos, así que `import` y `export` ya los viste en el Módulo 03; aquí solo añadimos la parte de los tipos. Vamos a ordenar la casa. 🪶

---

## 1. Repaso rápido: import y export

En el Módulo 03 viste que un **módulo** en JavaScript no es más que un archivo. Un archivo puede **exportar** cosas (compartirlas hacia afuera) y otro archivo puede **importarlas** (traerlas para usarlas). Esa es toda la idea.

> ### 🟦 ¿Que significa? — *Módulo*
> Un módulo es **un archivo** de código (`.ts` o `.tsx`) que comparte parte de su contenido con otros archivos. Sirve para partir un programa grande en pedazos pequeños y manejables, en lugar de tener todo amontonado en un archivo gigante. En `RachaSimple`, cada archivo dentro de `src/` es un módulo: `src/repositories/habits.ts` es el módulo que sabe leer y guardar hábitos en la base de datos.

> ### 🟦 ¿Que significa? — *export*
> `export` marca algo (una función, una constante, un tipo) como **disponible para otros archivos**. Sirve para que ese pedazo de código se pueda reutilizar desde fuera. En `Faro`, el archivo `src/lib/types.ts` empieza casi cada línea con `export`, porque su trabajo es justamente repartir tipos a todo el proyecto.

> ### 🟦 ¿Que significa? — *import*
> `import` **trae** a tu archivo algo que otro archivo exportó. Sirve para usar código que ya existe sin tener que copiarlo. En `RachaSimple`, el hook `useHabits` hace `import { habitsRepo } from '@/repositories/habits'` para usar las funciones que leen hábitos.

En TypeScript no solo exportamos funciones y valores: también podemos exportar e importar **tipos**. Y ahí empieza lo nuevo.

```typescript
// Esto ya lo conoces: exportar e importar VALORES
export const VERSION = "1.0";        // archivo A
import { VERSION } from "./config";  // archivo B
```

```typescript
// Esto es lo nuevo de TypeScript: exportar e importar TIPOS
export interface Habit { name: string }   // archivo A
import { Habit } from "./types/database"; // archivo B
```

---

## 2. Exportar tipos

Exportar un tipo funciona igual que exportar cualquier otra cosa: le pones `export` delante y listo. Así lo hace `RachaSimple` en su archivo `src/types/database.ts`:

```typescript
export type SupportTone = 'gentle' | 'practical' | 'encouraging' | 'direct';
export type HabitCategory = 'reading' | 'exercise' | 'study' | 'wellness' | 'other';

export interface Habit {
  id: string;
  name: string;
  category: HabitCategory;
  support_tone: SupportTone;
  streak: number;
  active: boolean;
  created_at: string;
}
```

Fíjate en dos detalles. Primero, cada `type` y cada `interface` lleva su `export`. Y segundo, **un tipo puede apoyarse en otro**: la interface `Habit` usa los tipos `HabitCategory` y `SupportTone`, que se declararon unas líneas más arriba en el mismo archivo. No hay que importarlos porque ya están ahí, al alcance de la mano.

> ### 🟦 ¿Que significa? — *Tipo exportado*
> Es un `type` o una `interface` que lleva `export` delante, listo para que otros archivos lo usen. Sirve para **describir una forma de dato una sola vez** y reutilizar esa descripción en todo el proyecto. En `Faro`, `export interface Project { ... }` describe cómo es un proyecto, y lo usan el dashboard, las tarjetas, el editor y la API.

> ### 💡 Tip
> Exporta un tipo en cuanto **dos o más archivos** lo necesiten. Si un tipo solo lo usa un archivo (por ejemplo, las props internas de un componente pequeño), déjalo ahí dentro sin exportar: no hace falta ensuciar el espacio compartido con cosas que son privadas.

---

## 3. Importar tipos con `import type`

A la hora de importar un tipo, tienes dos caminos. El normal:

```typescript
import { Habit } from "@/types/database";
```

Y el camino especial de TypeScript, que es el que usan `RachaSimple` y `Faro` **siempre** que importan tipos:

```typescript
import type { Habit, NewHabit } from "@/types/database";
```

¿La diferencia? Esa palabrita **`type`** justo después de `import`.

> ### 🟦 ¿Que significa? — *import type*
> Es una importación que le avisa a TypeScript: "lo que traigo aquí es **solo un tipo**, una etiqueta que existe únicamente mientras escribo el código; no es código de verdad que se ejecute". Sirve para que el compilador pueda **borrar esa línea entera** al generar el JavaScript final, porque los tipos no existen cuando el programa corre. En `RachaSimple`, el repositorio de hábitos hace `import type { Habit, NewHabit } from '@/types/database'`: trae las etiquetas para chequear formas, y al compilar esa línea desaparece sin dejar rastro.

Recuerda una cosa del Módulo 03: **los tipos no existen cuando tu programa se ejecuta**. El navegador y Node.js solo hablan JavaScript, y JavaScript no tiene idea de qué es una `interface`. TypeScript se apoya en los tipos mientras escribes, para avisarte de errores, y después los **borra**. Con `import type` eso queda clarísimo desde la propia línea de import.

Veámoslo en un caso real de `RachaSimple`, el repositorio de hábitos:

```typescript
import { supabase } from '@/lib/supabase';        // import normal: supabase ES código real
import type { Habit, NewHabit } from '@/types/database'; // import type: solo etiquetas

export const habitsRepo = {
  async listAll(): Promise<Habit[]> {
    const { data, error } = await supabase.from('habits').select('*');
    if (error) throw error;
    return (data ?? []) as Habit[];
  },
};
```

Mira los dos imports juntos. El primero (`supabase`) va **sin** `type`, porque `supabase` es un objeto real que se usa al ejecutar. El segundo (`Habit`, `NewHabit`) va **con** `type`, porque no son más que etiquetas para describir formas.

> ### 🟦 ¿Que significa? — *Promise<Habit[]>*
> Es el tipo de algo que tarda en llegar (una consulta a la base de datos) y que, cuando llega, será una **lista de hábitos** (`Habit[]`). Sirve para que TypeScript sepa qué forma tendrá el resultado de una función `async`. En `RachaSimple`, `listAll(): Promise<Habit[]>` promete devolver un arreglo de hábitos.

> ### 💡 Tip
> ¿Dudas entre `import` o `import type`? La regla es sencilla: si lo que traes aparece **solo en posiciones de tipo** (después de `:`, dentro de `<...>`, en un `as`, en un `extends`), usa `import type`. Si lo usas como **valor** (lo llamas, lo lees, se lo pasas a una función), usa `import` normal. Los dos repos la siguen al pie de la letra.

> ### ⚠️ Cuidado
> Cuidado con mezclarlos sin querer. Si haces `import type { celebrate }` y luego intentas **ejecutar** `celebrate()`, va a fallar: le dijiste a TypeScript que era una simple etiqueta, así que la borró del JavaScript. `import type` es exclusivamente para tipos, nunca para valores.

> ### 🔎 En tu codigo
> Abre cualquier archivo de `RachaSimple` o `Faro` y cuenta los imports. Vas a ver un patrón clarísimo: los valores (componentes, funciones, `supabase`, hooks) entran con `import` normal, y los tipos entran con `import type`. En `Faro`, `src/lib/phases.ts` arranca con `import type { GithubSnapshot, ProjectPhase } from "@/lib/types";`.

---

## 4. Un archivo de tipos compartidos: `types.ts`

¿Dónde guardas los tipos que usa medio proyecto? Ambos repos responden lo mismo: en **un archivo dedicado solo a tipos**. Así nadie tiene que andar adivinando dónde vive la definición de `Project` o de `Habit`.

> ### 🟦 ¿Que significa? — *Archivo de tipos compartidos*
> Es un archivo (como `types.ts` o `database.ts`) cuyo único trabajo es **declarar y exportar tipos** del dominio: los conceptos centrales de la app. Funciona como una **única fuente de la verdad**: si la forma de un dato cambia, se cambia ahí y todos los archivos que lo importan se enteran de golpe. En `Faro` ese archivo es `src/lib/types.ts`; en `RachaSimple` es `src/types/database.ts`.

Compara cómo lo nombra y dónde lo pone cada uno:

- **Faro** → `src/lib/types.ts`. Su primera línea es un comentario: `// Tipos compartidos del dominio de Organizer.` Define `Project`, `ProjectPhase`, `ProjectSource`, `AgendaDay`, `UserPrefs`, etc.
- **RachaSimple** → `src/types/database.ts`. Una carpeta `types/` con un archivo `database.ts`, porque sus tipos describen las tablas de la base de datos (Supabase). Define `Habit`, `UserProfile`, `DailyCheckin`, etc.

Son la misma idea con distinto nombre. Mira un trozo del de `Faro`:

```typescript
// src/lib/types.ts — Tipos compartidos del dominio de Organizer.

export type ProjectPhase =
  | "idea"
  | "en_progreso"
  | "en_pausa"
  | "bloqueado"
  | "terminado";

export interface RoadmapStep {
  title: string;
  done: boolean;
}

export interface Project {
  id: string;
  name: string;
  phase: ProjectPhase;
  progress_pct: number | null;
  roadmap: RoadmapStep[];
  created_at: string;
  updated_at: string;
}
```

Y desde ahí lo importan **un montón** de archivos de `Faro`:

```typescript
// src/components/phase-badge.tsx
import type { ProjectPhase } from "@/lib/types";

// src/components/projects-board.tsx
import type { ProjectPhase, ProjectWithSources } from "@/lib/types";

// src/app/api/github/refresh/route.ts
import type { GithubSnapshot, ProjectSource } from "@/lib/types";
```

> ### 🔎 En tu codigo
> En `Faro`, el tipo `ProjectPhase` (las fases de un proyecto: idea, en progreso, etc.) lo importan al menos seis archivos distintos: la insignia de fase, el tablero, el editor, la barra de progreso, la página de nuevo proyecto y alguno más. Si mañana se añade una fase nueva, **se edita un solo sitio** (`types.ts`) y TypeScript te marca en rojo todos los lugares que hay que actualizar. Esa es justo la ventaja de centralizar los tipos.

> ### 💡 Tip
> Mete en `types.ts` los tipos del **dominio**: las cosas de las que trata tu app (hábitos, proyectos, usuarios). Las props de un componente concreto **no** van ahí; viven junto a su componente. La idea es: comparte lo que de verdad se comparte, y guarda en privado lo que es de uno solo.

---

## 5. Tipos derivados: no te repitas

Hay un truco bonito que hace `RachaSimple`: en lugar de escribir un tipo nuevo desde cero para "crear un hábito", **deriva** uno a partir del `Habit` que ya tiene. Para eso usa `Pick` y `Partial`, esos ayudantes de TypeScript que ya viste en capítulos anteriores.

```typescript
// src/types/database.ts
export type NewHabit = Pick<
  Habit,
  'name' | 'daily_goal' | 'minimum_version' | 'category' | 'support_tone'
> & { active?: boolean; emoji?: string | null; accent_color?: string | null };
```

> ### 🟦 ¿Que significa? — *Tipo derivado*
> Es un tipo construido **a partir de otro** usando ayudantes como `Pick` (elige algunas propiedades) u `Omit` (quita algunas). Sirve para no repetir la misma lista de campos en varios sitios: si el original cambia, el derivado se ajusta solo. En `RachaSimple`, `NewHabit` es un `Habit` recortado (sin `id`, sin `streak`, sin fechas) porque esos campos los pone la base de datos, no el formulario de creación.

Lo que dice `NewHabit` es: "para crear un hábito, el usuario solo aporta el nombre, la meta diaria, la versión mínima, la categoría y el tono; lo demás (id, racha, fechas) lo añade el sistema". Y se exporta justo al lado de `Habit`, en el mismo `database.ts`. Después el repositorio y el hook lo importan juntos:

```typescript
// src/hooks/useHabits.ts
import type { Habit, NewHabit } from '@/types/database';
```

> ### 💡 Tip
> Tener el tipo original (`Habit`) y sus derivados (`NewHabit`) en el **mismo archivo** es una buena costumbre: quien busca uno encuentra el otro al lado, y la relación entre ambos salta a la vista.

---

## 6. Archivos de declaración `.d.ts` (a grandes rasgos)

De vez en cuando te topas con un archivo raro que termina en `.d.ts`. No te asustes: es un archivo **solo de tipos**, sin nada de código que se ejecute.

> ### 🟦 ¿Que significa? — *Archivo de declaración (.d.ts)*
> Es un archivo que **solo contiene tipos y declaraciones**, nunca lógica que corra. Su trabajo es describirle a TypeScript la forma de cosas que vienen de fuera (librerías, variables de entorno, herramientas) para que el chequeo de tipos funcione. La "d" es de *declaration* (declaración). En `RachaSimple` existe `src/vite-env.d.ts`; en `Faro`, `next-env.d.ts`.

Siendo principiante **casi nunca escribirás uno a mano**; lo habitual es que vengan con las herramientas. Mira el de `RachaSimple`, que describe las variables de entorno de Vite:

```typescript
// src/vite-env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_VAPID_PUBLIC_KEY: string;
}
```

Esto le enseña a TypeScript que, cuando escribas `import.meta.env.VITE_SUPABASE_URL`, eso es un `string`. Sin este `.d.ts`, TypeScript no tendría ni idea de qué forma tienen esas variables.

El de `Faro` es todavía más sencillo, y encima trae una advertencia escrita por la propia herramienta:

```typescript
// next-env.d.ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
```

> ### ⚠️ Cuidado
> Si ves `// This file should not be edited` (no editar), **hazle caso**. Archivos como `next-env.d.ts` los regenera la herramienta sola; si los modificas, tus cambios se perderán o terminarás rompiendo algo. Los `.d.ts` que vienen con el proyecto son territorio de las herramientas, no tuyo.

> ### 🔎 En tu codigo
> La línea `/// <reference types="vite/client" />` que aparece en `vite-env.d.ts` no es un comentario cualquiera: es una **directiva** que le dice a TypeScript "carga también los tipos de Vite". Gracias a ella `import.meta.env` funciona con autocompletado en `RachaSimple`. No la borres.

---

## 7. Barrel files: una puerta única a una carpeta

Cuando una carpeta junta muchos archivitos, a veces se crea un `index.ts` que **reexporta** todo, de modo que quien importe escriba una sola línea bonita en vez de varias.

> ### 🟦 ¿Que significa? — *Barrel file*
> Es un archivo `index.ts` que **junta y reexporta** lo que hay en una carpeta, para poder importar todo desde un único punto. "Barrel" significa "barril": metes muchas cosas en un barril y las sacas por un solo agujero. Sirve para acortar imports y esconder la estructura interna de una carpeta.

Un barrel file se vería así:

```typescript
// src/components/ui/index.ts  (un barrel file de ejemplo)
export { Button } from "./button";
export { Input } from "./input";
export { Label } from "./label";
```

Y con eso otro archivo puede traerse los tres en una sola línea:

```typescript
import { Button, Input, Label } from "@/components/ui";
```

> ### ⚠️ Cuidado
> Los barrel files son cómodos, pero tienen su trampa: si abusas, las herramientas tardan más en arrancar y a veces se cargan archivos que ni necesitabas. Por eso **ni `RachaSimple` ni `Faro` usan barrel files** para sus componentes: prefieren imports directos y explícitos como `import { Button } from '@/components/ui/button'`. Es perfectamente válido (y muchas veces mejor) **no** tener barrels. No te sientas obligado a crearlos.

> ### 💡 Tip
> Un sitio donde el barrel sí compensa es un archivo de tipos: `types.ts` ya funciona como un mini-barrel de tipos, porque junta muchas definiciones y todos importan desde un mismo `@/lib/types`. Ya estabas usando la idea sin darte cuenta.

---

## 8. Alias de import: `@/`

¿Te diste cuenta de que todos los imports dicen `@/algo` en vez de rutas llenas de `../../../`? Eso es un **alias**.

> ### 🟦 ¿Que significa? — *Alias de import (@/)*
> Es un atajo configurado para que `@/` signifique siempre "la carpeta `src/`", sin importar en qué archivo estés. Sirve para no escribir rutas relativas frágiles como `../../../lib/types`, que se rompen en cuanto mueves un archivo. En `RachaSimple` y `Faro`, `@/lib/types` siempre apunta a `src/lib/types`, estés donde estés.

El alias se configura en `tsconfig.json`. Mira el de `Faro`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

`RachaSimple` tiene casi lo mismo (`"@/*": ["src/*"]`). Esa línea `paths` es la que hace toda la magia: traduce `@/` a la carpeta `src/`.

Compara lo feo contra lo bonito:

```typescript
// 😖 Sin alias: ¿cuántos "../" eran? Y si muevo el archivo, se rompe
import type { Habit } from "../../../types/database";

// 😎 Con alias: claro, estable, igual desde cualquier carpeta
import type { Habit } from "@/types/database";
```

> ### 🔎 En tu codigo
> En `RachaSimple`, el componente `HabitCard.tsx` (que está bien hondo en `src/components/racha/`) importa así: `import type { CheckinStatus, DailyCheckin, Habit } from '@/types/database';`. Sin el alias, esa ruta sería un desfile de `../`. Con `@/`, da igual lo profundo que esté el archivo: el import se lee igual de claro.

> ### ⚠️ Cuidado
> El alias `@/` no es magia de JavaScript: hay que **configurarlo** en `tsconfig.json` (y a veces también en la herramienta de build, como Vite o Next). Si copias un import `@/...` a un proyecto nuevo que no tenga esa configuración, fallará. Los dos repos la tienen puesta; por eso funciona.

---

## 9. Cómo organizan sus carpetas RachaSimple y Faro

Juntemos todo mirando el **mapa de carpetas** de cada repo. Vas a notar que cada carpeta tiene un trabajo claro.

**RachaSimple** (React + Vite) ordena `src/` por *responsabilidad*:

```
src/
  types/        → database.ts (todos los tipos del dominio)
  repositories/ → habits.ts, checkins.ts... (hablan con Supabase)
  hooks/        → useHabits.ts... (estado con TanStack Query)
  components/   → racha/ y ui/ (piezas visuales)
  pages/        → Today.tsx, Settings.tsx... (pantallas)
  lib/          → utilidades (fechas, colores, supabase)
```

**Faro** (Next.js) ordena `src/` de forma parecida, con su propio estilo:

```
src/
  lib/          → types.ts, queries.ts, github.ts... (lógica y tipos)
  components/   → project-card.tsx, roadmap-view.tsx... (piezas visuales)
  app/          → páginas y API (estructura de Next.js)
```

> ### 🟦 ¿Que significa? — *Organización por responsabilidad*
> Es agrupar archivos según **qué trabajo hacen**, no según a qué función pertenecen. Sirve para encontrar las cosas rápido: ¿buscas un tipo? carpeta `types/`. ¿Una pantalla? carpeta `pages/`. En `RachaSimple`, todo lo que toca la base de datos vive en `repositories/`, y todo lo que es estado vive en `hooks/`.

Fíjate en el patrón que recorre todo el proyecto de `RachaSimple`: el tipo nace en `types/database.ts`, lo importa `repositories/habits.ts` (que lee y escribe), lo importa `hooks/useHabits.ts` (que maneja el estado), y al final lo importa `components/racha/HabitCard.tsx` (que lo pinta en pantalla). **Un solo tipo viaja por cuatro capas**, siempre con `import type` y siempre con el alias `@/`:

```typescript
// types/database.ts  →  define
export interface Habit { /* ... */ }

// repositories/habits.ts  →  lo usa para leer/escribir
import type { Habit, NewHabit } from '@/types/database';

// hooks/useHabits.ts  →  lo usa para el estado
import type { Habit, NewHabit } from '@/types/database';

// components/racha/HabitCard.tsx  →  lo usa en las props
import type { CheckinStatus, DailyCheckin, Habit } from '@/types/database';

interface HabitCardProps {
  habit: Habit;
  todayCheckin: DailyCheckin | undefined;
}
```

> ### 🔎 En tu codigo
> Ese `interface HabitCardProps` de `RachaSimple` es exactamente lo que viste en el capítulo de props: un tipo local, **no exportado**, que vive junto a su componente porque solo `HabitCard` lo usa. En cambio `Habit` sí viene de `@/types/database`, porque lo comparte medio proyecto. Ahí tienes, en código real, la diferencia entre un tipo compartido y uno privado.

> ### 💡 Tip
> No copies estas carpetas al pie de la letra en tu primer proyecto. Empieza simple: un `types.ts`, una carpeta `components/` y poco más. Cuando un archivo se te vuelva incómodo de tan grande, **ahí** lo partes. La estructura crece contigo, no al revés.

Los demás repos del manual viven sin nada de esto: `tunal-digital` es HTML/CSS/JS plano (sin tipos ni módulos de este estilo), `PolyPaw` es Python con JSON, y `polypaw-nas` es configuración de servidor. Por eso los ejemplos de organización de tipos salen siempre de `RachaSimple` y `Faro`: son los dos proyectos TypeScript, y los dos resuelven el mismo problema de manera casi idéntica. Y eso es buena señal: cuando dos proyectos distintos llegan por su cuenta al mismo patrón, suele ser porque ese patrón es sólido. 🪶

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Sé que un **módulo** es un archivo, y que `export`/`import` comparten cosas entre archivos.
- [ ] Puedo **exportar** un `type` o una `interface` poniéndole `export` delante.
- [ ] Entiendo qué hace **`import type`** y por qué se usa para tipos (se borran al compilar).
- [ ] Sé distinguir cuándo usar `import` normal (valores) y cuándo `import type` (tipos).
- [ ] Sé qué es un **archivo de tipos compartidos** (`types.ts` / `database.ts`) y qué poner en él.
- [ ] Entiendo qué es un **tipo derivado** con `Pick`/`Partial` (como `NewHabit`).
- [ ] Sé a grandes rasgos qué es un **archivo `.d.ts`** y que no debo editar los que dicen "do not edit".
- [ ] Entiendo qué es un **barrel file** y por qué a veces es mejor NO usarlo.
- [ ] Sé qué hace el **alias `@/`** y dónde se configura (`tsconfig.json`, sección `paths`).
- [ ] Reconozco el patrón de carpetas por responsabilidad de `RachaSimple` y `Faro`.

---

## 🧪 Ejercicios

1. **Sin computadora.** Mira esta línea de `RachaSimple`: `import type { Habit, NewHabit } from '@/types/database';`. Explica con tus palabras (a) por qué lleva `type`, (b) qué carpeta significa el `@/`, y (c) qué pasaría con esa línea en el JavaScript final tras compilar.

2. **Sin computadora.** Tienes dos imports en un archivo: uno trae `supabase` y otro trae `Habit`. ¿Cuál debe ser `import` normal y cuál `import type`? Justifica tu respuesta pensando en "¿esto se ejecuta o solo describe una forma?".

3. 💻 Crea un archivo `src/types/blog.ts`. Exporta una `interface Post` con `id` (string), `titulo` (string), `publicado` (boolean) y `creado_en` (string). Luego, en otro archivo, impórtala con `import type { Post } from "@/types/blog";` y declara una variable `ejemplo: Post`. Comprueba que el editor te autocompleta los campos.

4. 💻 Partiendo del `Post` del ejercicio anterior, crea un **tipo derivado** `NewPost` usando `Pick`, que tenga solo `titulo` y `publicado` (porque `id` y `creado_en` los pone el sistema). Exporta `NewPost` en el mismo `blog.ts`, al lado de `Post`. Pista: mira cómo `RachaSimple` define `NewHabit`.

5. 💻 Abre el `tsconfig.json` de cualquier proyecto TypeScript tuyo y busca (o añade) la sección `paths` con `"@/*": ["./src/*"]`. Luego cambia un import relativo con `../../` por uno con `@/` y verifica que sigue funcionando. Si no tienes proyecto, copia la config de `Faro` que aparece en la sección 8.

6. 💻 **Reto de organización.** En `RachaSimple`, abre `src/types/database.ts`, `src/repositories/habits.ts` y `src/hooks/useHabits.ts`. Sigue el tipo `Habit` por los tres archivos y dibuja en papel su recorrido (define → usa → usa). Marca en cada archivo si el import lleva `type` o no, y por qué.
