# Capitulo 15 — Glosario de TypeScript y mapa

<p align="center">
  <img src="../../recursos/imagenes/05-typescript/cap15.png" alt="Ilustración del capítulo (pixel art con Bit)" width="640">
</p>


> Hola otra vez, soy **Bit**, tu ajolote programador favorito. Llegamos al final del Modulo 05 y, antes de saltar a React, quiero dejarte algo util: un **diccionario de bolsillo**. Todas esas palabras raras que fuimos aprendiendo, ordenadas de la A a la Z, cada una explicada en una o dos lineas y con un ejemplo de codigo real sacado de **RachaSimple** o de **Faro**. Si en algun capitulo te trabaste con un termino, este es el sitio al que volver. Y no pierdas de vista la idea que sostiene todo el modulo: **TypeScript es JavaScript con tipos**. Nada de lo que aprendiste en el Modulo 03 se borro; solo le pusimos etiquetas para que la computadora nos avise cuando metemos la pata. Vamos despacio, que para eso somos ajolotes.

---

## 1. Como usar este glosario

Este capitulo no esta pensado para leerlo de corrido y memorizar, aunque nada te lo impide. Funciona mejor como un **mapa al que regresar**. Cada termino vive en su propio recuadro azul con tres partes: que significa en palabras simples, para que sirve, y donde aparece en un repo de verdad. Si mientras programas te topas con una palabra que no recuerdas, busca su letra aqui y listo.

Los repos que citamos en los ejemplos son reales y los venimos viendo a lo largo del modulo:

- **RachaSimple** — app de habitos en **React 18 + TypeScript + Vite + Tailwind + Supabase + TanStack Query**. De aqui salen casi todos los ejemplos de tipos de datos y hooks tipados.
- **Faro/Organizer** — organizador de proyectos en **Next.js 15 + React 19 + TypeScript + Supabase + OpenAI**. De aqui salen los tipos del dominio (proyectos, fuentes, snapshots).

> ### 💡 Tip
> Los otros repos del manual (**tunal-digital** en HTML/CSS/JS vanilla, **PolyPaw** en Python/Flet/JSON, **polypaw-nas** en Ubuntu/Samba) **no usan TypeScript**. Por eso aqui solo veras RachaSimple y Faro: son los unicos donde tiene sentido ir a buscar archivos `.ts` y `.tsx`.

---

## 2. Glosario alfabetico

Este es el corazon del capitulo. Cada termino tecnico tiene su recuadro y ninguno se queda sin explicar.

### A

> ### 🟦 ¿Que significa? — *Anotacion (de tipo)*
> Es escribir, despues de los dos puntos, **que tipo** tiene una variable, un parametro o un resultado: `nombre: string`. Le sirve para decirle a TypeScript lo que esperas, de modo que te corrija si te equivocas. En RachaSimple, cada campo de `UserProfile` lleva su anotacion, por ejemplo `referral_code: string | null`.

> ### 🟦 ¿Que significa? — *`as` (asercion de tipo)*
> Es tu forma de decirle a TypeScript "confia en mi, esto es de este tipo", aunque el no pueda comprobarlo por su cuenta. Sirve para esos casos en que tu sabes mas que el compilador. En RachaSimple aparece como `const KEY = ['habits'] as const`, que congela el arreglo para que sea un tipo exacto y no un `string[]` cualquiera.

> ### ⚠️ Cuidado
> `as` no convierte nada en tiempo de ejecucion: lo unico que hace es callar al compilador. Si le mientes (`valor as Habit` cuando no lo es), el error estallara mas tarde y costara mucho mas encontrarlo. Usalo poco y solo con buena razon.

### C

> ### 🟦 ¿Que significa? — *Compilador (`tsc`)*
> Es el programa que lee tu TypeScript, revisa todos los tipos y lo traduce a JavaScript normal, ese que el navegador entiende. Sirve para atrapar errores **antes** de ejecutar nada. En RachaSimple lo invoca el `build`: `"build": "tsc -b && vite build"`.

> ### 🟦 ¿Que significa? — *Restriccion (constraint) de un generico*
> Es ponerle un limite a un tipo generico con `extends`, para exigir que cumpla cierta forma. Sirve para que el generico no acepte "cualquier cosa" sino "cualquier cosa que al menos tenga esto". Por ejemplo, `function primero<T extends { id: string }>(lista: T[])` exige que cada elemento traiga su `id`.

### D

> ### 🟦 ¿Que significa? — *`.d.ts` (archivo de declaracion)*
> Es un archivo que **solo describe tipos**, sin codigo que llegue a ejecutarse. Sirve para contarle a TypeScript que forma tienen cosas que vienen de fuera, como librerias o variables de entorno. RachaSimple tiene su `src/vite-env.d.ts`, donde Vite declara los tipos de `import.meta.env`.

### E

> ### 🟦 ¿Que significa? — *`extends`*
> Una palabra clave con dos usos. En interfaces, para **heredar** los campos de otra; en genericos, para **restringir** un tipo. En Faro, `interface ProjectWithSources extends Project` viene a decir "tiene todo lo de `Project` y, ademas, lo suyo".

### G

> ### 🟦 ¿Que significa? — *Generico*
> Es un tipo "con un hueco" que se rellena al usarlo, y se escribe entre `<>`. Sirve para escribir codigo reutilizable que funciona con muchos tipos sin perder la seguridad. `Array<string>` es un generico: la caja `Array` rellenada con `string`. En RachaSimple, TanStack Query devuelve `UseQueryResult<Habit[]>` para que sepas con exactitud que trae dentro.

### I

> ### 🟦 ¿Que significa? — *Inferencia (de tipos)*
> Es cuando TypeScript **adivina solo** el tipo, sin que lo escribas, mirando el valor que le das. Sirve para escribir menos y conservar la seguridad. En `const KEY = ['habits']`, TypeScript deduce que `KEY` es `string[]` sin que tu digas nada.

> ### 💡 Tip
> Una buena regla para empezar: **deja que infiera lo obvio** (variables con un valor claro) y **anota lo importante** (parametros de funciones y resultados de API). Asi el codigo queda limpio por dentro y bien protegido en las fronteras.

> ### 🟦 ¿Que significa? — *`import type`*
> Es una importacion que trae **solo un tipo**, no codigo ejecutable. Sirve para que el compilador entienda que esa importacion desaparece al traducir a JavaScript. En RachaSimple es pan de cada dia: `import type { Habit, NewHabit } from '@/types/database'`.

> ### 🟦 ¿Que significa? — *Interface*
> Es una manera de describir la **forma de un objeto**: que campos tiene y de que tipo es cada uno. Sirve para ponerle nombre a una estructura y reutilizarla. En Faro, `interface Project` describe un proyecto completo: `id`, `name`, `phase`, `progress_pct`, etcetera.

```typescript
// Faro · src/lib/types.ts
export interface RoadmapStep {
  title: string;
  done: boolean;
}
```

### K

> ### 🟦 ¿Que significa? — *`keyof`*
> Es un operador que toma un tipo objeto y te devuelve la **union de sus nombres de campo** como tipo. Sirve para escribir funciones que reciben "alguna clave valida de este objeto", no cualquier texto suelto. Si tienes `interface Project`, entonces `keyof Project` es `"id" | "name" | "phase" | ...`.

### L

> ### 🟦 ¿Que significa? — *Tipo literal*
> Es un tipo que vale **un valor exacto**, no toda una categoria: no `string`, sino `"free"`. Sirve para acotar las opciones validas. En RachaSimple, `UserPlan` solo puede ser `'free'` o `'pro'`, nunca un texto cualquiera.

```typescript
// RachaSimple · src/types/database.ts
export type UserPlan = 'free' | 'pro';
export type CheckinStatus = 'completed' | 'minimum' | 'recovery' | 'not_done';
```

### M

> ### 🟦 ¿Que significa? — *Modulo*
> En TypeScript, cada archivo `.ts` que usa `import` o `export` es un modulo: una cajita con sus propias cosas. Sirve para organizar y compartir solo lo que hace falta. `src/types/database.ts` de RachaSimple es un modulo que exporta tipos para todo el proyecto.

### N

> ### 🟦 ¿Que significa? — *Narrowing (estrechamiento)*
> Es cuando TypeScript **reduce** un tipo amplio a uno mas preciso dentro de un `if`. Sirve para trabajar seguro con uniones. Si `id` es `string | undefined`, dentro de `if (id) { ... }` TypeScript ya sabe que ahi `id` es `string`. RachaSimple lo aprovecha en `useHabit`: chequea `enabled: !!id` y mas adelante usa `id!`.

> ### 🟦 ¿Que significa? — *`null` y `undefined`*
> Son los dos "valores vacios" de JavaScript. Con `strict` activado, TypeScript te obliga a contemplar que algo pueda estar vacio. En Faro, `description: string | null` te avisa: "el texto puede no existir, asi que ten ese caso en cuenta".

### O

> ### 🟦 ¿Que significa? — *`Omit<T, K>`*
> Es un tipo utilitario que toma un tipo `T` y te devuelve una copia **sin** los campos `K`. Sirve para reutilizar un tipo quitandole lo que sobra; por ejemplo, sacar `id` para un objeto que todavia no se guardo. Es el primo opuesto de `Pick`.

> ### 🟦 ¿Que significa? — *`as const` (asercion const)*
> Es un `as` especial que congela un valor para que su tipo sea lo mas exacto posible y de solo lectura. RachaSimple lo usa en `const KEY = ['habits'] as const`, asi la clave de cache queda como un tipo fijo y no como un arreglo que se pueda modificar.

### P

> ### 🟦 ¿Que significa? — *`Partial<T>`*
> Es un tipo utilitario que toma `T` y vuelve **opcionales todos sus campos**. Sirve para actualizaciones, esas donde solo mandas lo que cambia. RachaSimple lo usa para editar habitos: `changes: Partial<Habit>` quiere decir "puedes mandar uno, varios o ningun campo de `Habit`".

```typescript
// RachaSimple · src/hooks/useHabits.ts
mutationFn: ({ id, changes }: { id: string; changes: Partial<Habit> }) =>
  habitsRepo.update(id, changes),
```

> ### 🟦 ¿Que significa? — *`Pick<T, K>`*
> Es un tipo utilitario que toma `T` y te devuelve una copia con **solo** los campos `K`. Sirve para armar un tipo nuevo a partir de unos pocos campos de otro. RachaSimple lo usa para definir lo minimo que necesita un habito nuevo.

```typescript
// RachaSimple · src/types/database.ts
export type NewHabit = Pick<
  Habit,
  'name' | 'daily_goal' | 'minimum_version' | 'category' | 'support_tone'
> & { active?: boolean; emoji?: string | null };
```

> ### 🟦 ¿Que significa? — *Props (tipadas)*
> En React, las props son los datos que recibe un componente. Tiparlas es describir, con un `type` o una `interface`, que props acepta. Sirve para que TypeScript te avise si olvidas pasar alguna o la pasas del tipo equivocado. En Faro, componentes `.tsx` como `phase-progress.tsx` declaran sus props para no recibir basura.

### R

> ### 🟦 ¿Que significa? — *`Record<K, V>`*
> Es un tipo utilitario para un objeto cuyas **claves son de tipo `K` y cuyos valores son de tipo `V`**. Sirve para diccionarios. En Faro aparece `Record<string, unknown>` (un objeto con claves de texto y valores desconocidos) y tambien `Record<Weekday, DayConfig>` (un dia de la semana mapeado a su configuracion).

### S

> ### 🟦 ¿Que significa? — *`strict` (modo estricto)*
> Es una opcion del `tsconfig.json` que enciende de golpe todas las revisiones serias de TypeScript, entre ellas la de vigilar los `null`. Sirve para que el lenguaje te proteja de verdad. Tanto RachaSimple como Faro tienen `"strict": true`. RachaSimple suma ademas `"noUncheckedIndexedAccess": true`, que es aun mas cuidadoso.

> ### ⚠️ Cuidado
> Arrancar un proyecto sin `strict` y activarlo despues suele soltarte decenas de errores de un tiron. Es mejor nacer con `strict: true` desde el primer dia, como hicieron estos dos repos. Duele bastante menos.

### T

> ### 🟦 ¿Que significa? — *Tipo*
> Es la **categoria** de un valor: que clase de dato es y que puedes hacer con el (`string`, `number`, `boolean`, un objeto, una funcion). Es el concepto base de todo el modulo. JavaScript ya tenia tipos por dentro; TypeScript simplemente los hace visibles y revisables.

> ### 🟦 ¿Que significa? — *`type` (alias de tipo)*
> Es una palabra clave para **ponerle nombre a un tipo**, ya sea un objeto, una union o lo que sea. Sirve para no repetirte y para dar significado a las cosas. RachaSimple define `type SupportTone = 'gentle' | 'practical' | 'encouraging' | 'direct'` y despues lo usa por su nombre en todos lados.

> ### 💡 Tip
> ¿`type` o `interface`? Para la forma de un objeto, ambos te sirven. Una regla sencilla: usa `interface` para objetos que podrian crecer o heredar, y `type` para uniones, literales y combinaciones. Faro usa `interface Project` (un objeto) y `type ProjectPhase` (una union). Aprende imitando esa eleccion.

> ### 🟦 ¿Que significa? — *`tsconfig.json`*
> Es el archivo de configuracion que le dice al compilador como comportarse: que tan estricto ser, a que version de JavaScript traducir, donde buscar los archivos. Sirve para que todo el equipo comparta las mismas reglas. Cada proyecto TypeScript tiene el suyo, y RachaSimple y Faro no son la excepcion.

### U

> ### 🟦 ¿Que significa? — *Union (tipo union)*
> Es un tipo que puede ser **una cosa u otra**, y se escribe con la barra `|`. Sirve para valores que tienen varias formas posibles. En Faro, `ProjectPhase` es la union de cinco fases; y un snapshot puede ser `GithubSnapshot | Record<string, unknown>`.

```typescript
// Faro · src/lib/types.ts
export type ProjectPhase =
  | "idea"
  | "en_progreso"
  | "en_pausa"
  | "bloqueado"
  | "terminado";
```

> ### 🟦 ¿Que significa? — *`unknown`*
> Es el tipo "no se que es esto todavia". Sirve para datos que llegan de fuera (una API, un JSON) y que debes **revisar antes de usar**. Es el primo seguro de `any`: con `unknown`, TypeScript te obliga a comprobar el tipo antes de tocarlo. Faro lo usa en `Record<string, unknown>` para datos de snapshot que aun no se han validado.

> ### ⚠️ Cuidado
> No confundas `unknown` con `any`. `any` apaga todas las revisiones, lo cual es peligroso; `unknown` las deja encendidas y te exige verificar primero. Cuando dudes, quedate con `unknown`.

> ### 🟦 ¿Que significa? — *Tipo utilitario (utility type)*
> Son tipos que ya vienen incluidos en TypeScript para **transformar otros tipos**: `Partial`, `Pick`, `Omit`, `Record`, `Required`, `Readonly`. Sirven para no andar escribiendo tipos repetidos a mano. RachaSimple los combina sin miedo: `Pick<...> & Partial<Pick<...>>` para definir cada tipo "Nuevo".

```typescript
// RachaSimple · src/types/database.ts
export type NewFeedback = Pick<Feedback, 'message'> &
  Partial<Pick<Feedback, 'mood' | 'contact_email'>>;
```

### V

> ### 🟦 ¿Que significa? — *Variable de entorno (tipada)*
> Son valores secretos o de configuracion que viven fuera del codigo (claves, URLs). Tiparlas (en un `.d.ts`) ayuda a que TypeScript sepa cuales existen. RachaSimple lo prepara en `src/vite-env.d.ts`. Y no olvides la regla de Faro: los secretos van solo en el servidor, nunca en el cliente.

---

## 3. Mapa mental de TypeScript

Una imagen vale mas que mil definiciones. Aqui tienes como se conecta todo lo que aprendiste, en forma de arbol. Leelo desde la raiz hacia las ramas.

```text
                         TYPESCRIPT
                  (JavaScript + tipos)
                            |
   ┌────────────┬───────────┼────────────┬──────────────┐
   |            |           |            |              |
 TIPOS       FORMAS      COMBINAR     SEGURIDAD       HERRAMIENTAS
   |            |           |            |              |
 string      interface   union (|)    strict        tsconfig.json
 number      type        literal      null/undefined compilador (tsc)
 boolean     props       narrowing    unknown        .d.ts
 array       (objetos)   keyof        as / as const  import type
   |            |           |            |              |
   └── INFERENCIA: TS adivina solo lo obvio ──────────┘
                            |
                  GENERICOS  <T>
                  (tipos con hueco)
                            |
              ┌─────────────┴─────────────┐
        restriccion (extends)      utilitarios
                                Partial · Pick · Omit · Record
```

> ### 🔎 En tu codigo
> Abre cualquier archivo de RachaSimple o Faro y veras estas ramas mezcladas en una sola linea. Mira `changes: Partial<Habit>`: ahi conviven un **utilitario** (`Partial`), un **generico** (los `<>`) y una **interface/objeto** (`Habit`). No son temas separados; son piezas del mismo lego.

---

## 4. Las cuatro ideas que de verdad importan

Si se te olvida todo lo demas, quedate con esto, dice Bit moviendo sus branquias:

1. **TypeScript es JavaScript con etiquetas.** El codigo corre igual; los tipos solo viven mientras programas y desaparecen al traducir.
2. **Los tipos describen la forma de tus datos.** `interface Project`, `type UserPlan`: son fotos de como lucen tus datos para que la computadora vigile que no se deformen.
3. **Las fronteras necesitan cuidado.** Donde entran datos de fuera (API, formularios, env), ahi anota bien y usa `unknown` + revision. Hacia adentro, deja que la inferencia trabaje.
4. **`strict: true` es tu amigo gruñon.** Te molesta hoy para que no llores manana con un `undefined` en produccion.

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Puedo explicar con mis palabras la diferencia entre **tipo**, **anotacion** e **inferencia**.
- [ ] Se cuando usar `type` y cuando `interface` (y por que da casi igual para objetos).
- [ ] Entiendo que es una **union** (`|`) y un **tipo literal**, y reconozco ambos en `ProjectPhase`.
- [ ] Se que hace el **narrowing** dentro de un `if` y por que TypeScript "se vuelve mas listo" ahi.
- [ ] Puedo leer un **generico** como `UseQueryResult<Habit[]>` y decir que tipo lleva dentro.
- [ ] Reconozco los **utilitarios** `Partial`, `Pick`, `Omit` y `Record` cuando aparecen.
- [ ] Se para que sirve `keyof`, `as`, `as const` y `unknown`, y por que `unknown` es mas seguro que `any`.
- [ ] Entiendo que hace `import type` y por que se usa tanto en los hooks de RachaSimple.
- [ ] Se que es `strict` en el `tsconfig.json` y por que ambos repos lo tienen encendido.
- [ ] Se que es un archivo `.d.ts` y que ahi viven declaraciones de tipos sin codigo ejecutable.

---

## 🧪 Ejercicios

No son ejercicios de programar funciones nuevas, sino de **repasar y reconocer**. Asi cerramos el modulo afianzando el vocabulario. Los marcados con 💻 piden abrir el editor.

1. **Diccionario sin mirar.** Tapa este capitulo y escribe en una hoja la definicion de estos cinco terminos en una linea cada uno: *inferencia*, *union*, *narrowing*, *generico*, *utilitario*. Luego destapa y compara. ¿Cuales se te resistieron?

2. **Caza de literales.** Sin abrir el editor, lista cuatro tipos literales que viste en RachaSimple (pista: planes, tonos, estados de check-in, temas). ¿Por que crees que el autor uso literales en vez de `string` suelto?

3. 💻 **Safari de tipos.** Abre `RachaSimple/src/types/database.ts`. Encuentra y senala una **interface**, un **alias `type`**, una **union literal** y un uso de **`Pick`**. Anota la linea de cada uno.

4. 💻 **El detective del `strict`.** Abre `RachaSimple/tsconfig.json` y `Organizer/tsconfig.json`. Confirma que ambos tienen `"strict": true`. Luego busca en RachaSimple la opcion extra `noUncheckedIndexedAccess` y, con tus palabras, escribe que crees que protege.

5. 💻 **Lee un hook tipado.** Abre `RachaSimple/src/hooks/useHabits.ts`. Encuentra la linea `import type { Habit, NewHabit }`. ¿Por que `import type` y no un `import` normal? Luego ubica el `Partial<Habit>` y explica que permite hacer.

6. **Dibuja tu mapa.** Cierra este capitulo y dibuja de memoria el mapa mental de la seccion 3, aunque te salga torcido. El objetivo no es que quede bonito, sino que las ramas (tipos, formas, combinar, seguridad, herramientas) te broten solas.

---

## 5. Como sigue: rumbo al Modulo 06 (React)

Lo lograste, dice Bit dando una vuelta de campana en el agua. Terminaste TypeScript. Pero fijate en un detalle: casi todos los ejemplos salian de **RachaSimple** y **Faro**, que son apps de **React**. No fue casualidad. TypeScript brilla de verdad cuando tipas **componentes y props**.

En el **Modulo 06** vamos a juntarlo todo:

- Construiremos **componentes** que reciben **props tipadas** (te acordaras de `Project` y de los `.tsx` de Faro).
- Usaremos **hooks** como `useState` y `useQuery`, que por dentro son **genericos** (ya viste `UseQueryResult<Habit[]>`).
- Modelaremos los datos de la pantalla con las mismas **interfaces** y **uniones** de este modulo.

Dicho de otro modo: no empezamos de cero. **Cada termino de este glosario reaparece en React**, ahora con botones y pantallas. Ten este capitulo a mano: sera tu diccionario el dia que una prop te salte en rojo.

> ### 💡 Tip
> Antes de pasar al Modulo 06, vuelve a leer una vez la seccion 4 ("Las cuatro ideas que de verdad importan"). Si esas cuatro te quedan claras, estas mas que listo para React. Nos vemos alla. — Bit 🦎
