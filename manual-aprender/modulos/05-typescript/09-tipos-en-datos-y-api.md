# Capítulo 09 — Tipar datos y respuestas de API

<p align="center">
  <img src="../../recursos/imagenes/05-typescript/cap09.png" alt="Ilustración del capítulo (pixel art con Bit)" width="640">
</p>


> Hasta aquí tus tipos describían cosas que vivían **dentro** de tu programa: un hábito, un
> proyecto, una función. Pero las apps de verdad respiran datos que vienen de **afuera**: una
> respuesta de Supabase, el JSON que devuelve la API de Claude, el cuerpo de un `fetch`. Y ahí
> hay una trampa que atrapa a todos los principiantes: **TypeScript no sabe qué forma tiene un
> dato que llega de afuera, y tampoco lo comprueba cuando el programa corre.** Bit (tu ajolote
> de confianza) te va a enseñar a tipar esos datos con cuidado, a usar `unknown` en vez de `any`,
> a usar `as` solo cuando de verdad toca, y —lo más importante— a entender por qué TS te protege
> *mientras escribes* pero **no** te protege *mientras se ejecuta*. Ese matiz es la diferencia
> entre un bug tranquilo y un bug que te despierta a las 3 de la mañana.

---

## 1. El problema: TypeScript desaparece en tiempo de ejecución

Lo primero que tienes que grabarte a fuego: **TypeScript es JavaScript con tipos, y los tipos
solo existen mientras programas.** Cuando tu código se compila (o se transpila), TS **borra**
todos los tipos y deja JavaScript puro. El navegador y el servidor ejecutan JavaScript; no saben
ni les importa qué tipos escribiste.

> ### 🟦 ¿Qué significa? — *Tiempo de compilación vs. tiempo de ejecución*
> **Tiempo de compilación** es el momento en que TypeScript revisa tu código (mientras escribes,
> o cuando corres `npm run build`). **Tiempo de ejecución** (en inglés *runtime*) es cuando el
> programa ya está corriendo de verdad, recibiendo datos y respondiendo a usuarios. **Para qué
> sirve la distinción:** los tipos de TS solo trabajan en tiempo de compilación; en tiempo de
> ejecución ya no están. **Dónde se ve:** en Faro (Next.js), `npm run build` revisa los tipos;
> cuando un usuario abre el dashboard, lo que corre es JavaScript sin tipos.

Mira este ejemplo. Le decimos a TypeScript que `datos` es un objeto con `nombre`:

```typescript
interface Usuario {
  nombre: string;
}

function saludar(usuario: Usuario) {
  // TS confía en que usuario.nombre es un string
  return "Hola, " + usuario.nombre.toUpperCase();
}
```

Esto compila sin un solo error. Pero si en tiempo de ejecución llega un objeto que **no** tiene
`nombre` (porque la API cambió, porque hubo un error, porque el dato vino vacío), `usuario.nombre`
será `undefined`, y `undefined.toUpperCase()` revienta con un error de verdad, en producción,
delante del usuario.

> ### ⚠️ Cuidado
> TypeScript **no genera código que valide** que tus datos cumplen el tipo. Si tú *afirmas* que
> algo es `Usuario`, TS te cree. Si mentiste (o si la realidad cambió), el error aparece en runtime,
> donde TS ya no puede ayudarte. Tipar bien reduce muchísimo los bugs, pero **no** los elimina
> cuando los datos vienen de afuera.

---

## 2. Datos de afuera: el `fetch` no sabe qué te devuelve

Cuando pides datos con `fetch` (la función de JavaScript para hablar con APIs), el resultado de
`response.json()` tiene un tipo muy honesto: `any`. Es decir, "puede ser cualquier cosa". Y eso
es peligroso.

> ### 🟦 ¿Qué significa? — *`fetch`*
> `fetch` es una función nativa de JavaScript (la viste en el módulo 03) que hace una petición de
> red a una URL y devuelve una promesa con la respuesta. **Para qué sirve:** pedir datos a una API
> y mandar datos a una API. **Dónde se usa:** Faro la usa para llamar a GitHub y a sus propias
> rutas internas; tunal-digital (el sitio en HTML/CSS/JS) la usa para hablar con servicios externos.

> ### 🟦 ¿Qué significa? — *JSON*
> JSON (*JavaScript Object Notation*) es un formato de texto para representar datos: objetos,
> listas, strings, números y booleanos. **Para qué sirve:** es el idioma común con el que las APIs
> mandan y reciben datos. **Dónde se usa:** la API de Claude responde en JSON; Supabase devuelve
> filas que tu cliente convierte en objetos JSON; PolyPaw (la app de Python) guarda su contenido
> en archivos `.json`.

Cuando haces `await response.json()`, JavaScript te da un objeto, pero TypeScript no tiene forma
de saber **qué forma** tiene ese objeto. Mira:

```typescript
const response = await fetch("https://api.ejemplo.com/proyecto");
const datos = await response.json();
// datos es de tipo `any`: TS te deja hacer CUALQUIER cosa con él
datos.lo_que_sea.que_se_te_ocurra; // ✅ compila... y revienta en runtime
```

El tipo `any` apaga por completo el corrector de TypeScript para esa variable. Es como decirle
"confía en mí, no revises nada". Y ya sabemos cómo termina eso.

---

## 3. `unknown`: el "no sé qué es, oblígame a comprobarlo"

La alternativa correcta a `any` es `unknown`. Significa lo mismo a primera vista ("no sé qué tipo
es"), pero con una diferencia enorme: **TypeScript no te deja usar un `unknown` hasta que
demuestres qué es.**

> ### 🟦 ¿Qué significa? — *`unknown`*
> `unknown` es un tipo que representa "un valor del que no sé nada todavía". **Para qué sirve:**
> es la puerta de entrada segura para datos externos; te obliga a comprobar la forma del dato
> antes de tocarlo. **Dónde se usa:** en Faro, el tipo `SourceSnapshot` guarda datos cuya forma
> puede variar como `Record<string, unknown>` — un objeto del que solo sabemos que sus claves son
> strings, pero no qué valores tienen.

> ### 🟦 ¿Qué significa? — *`any`*
> `any` es un tipo que desactiva todas las comprobaciones de TypeScript para ese valor. **Para qué
> sirve:** para casi nada bueno; es una válvula de escape que te quita la red de seguridad. **Dónde
> se usa:** lo ideal es que aparezca lo menos posible. Cada `any` es un huequito por donde se cuela
> un bug.

La diferencia en código:

```typescript
const conAny: any = await response.json();
conAny.nombre.toUpperCase(); // ✅ compila (peligroso: TS no revisa nada)

const conUnknown: unknown = await response.json();
conUnknown.nombre; // ❌ ERROR de compilación: "El objeto es de tipo 'unknown'"
```

Con `unknown`, TypeScript te frena. Te dice: "antes de tocar `.nombre`, demuéstrame que esto es
un objeto con `nombre`". Y eso te empuja a hacer lo correcto: **validar**.

> ### 💡 Tip
> Regla de oro de Bit: cuando recibas datos de afuera (`fetch`, `JSON.parse`, una librería sin
> tipos), escríbelos como `unknown`, no como `any`. `unknown` es el portero estricto; `any` es la
> puerta sin portero.

---

## 4. Aserciones de tipo (`as`): el "yo sé más que TypeScript"

A veces tú sí sabes con seguridad qué forma tiene un dato, aunque TS no pueda deducirlo. Para esos
casos existe la **aserción de tipo** con la palabra `as`.

> ### 🟦 ¿Qué significa? — *Aserción de tipo (`as`)*
> Una aserción de tipo es decirle a TypeScript "trata este valor como si fuera de **este** tipo,
> confía en mí". Se escribe con `as` seguido del tipo. **Para qué sirve:** convencer al corrector
> cuando tú tienes información que él no tiene. **Dónde se usa:** en RachaSimple, los repositorios
> de Supabase usan `as Habit[]` para decirle a TS que las filas que devolvió la consulta son
> hábitos.

Así se ve en el repositorio real de hábitos de RachaSimple (`src/repositories/habits.ts`):

```typescript
async listAll(): Promise<Habit[]> {
  const { data, error } = await supabase
    .from('habits')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as Habit[]; // ← aserción: "esto es un arreglo de Habit"
}
```

Supabase devuelve `data` con un tipo genérico; el `as Habit[]` le dice a TypeScript "lo que llegó
son hábitos". Fíjate también en el `data ?? []`: el operador `??` (que viste en el módulo 03)
dice "si `data` es `null` o `undefined`, usa un arreglo vacío en su lugar". Así nunca devuelves
`null` cuando prometiste un arreglo.

> ### ⚠️ Cuidado
> `as` **no convierte ni valida nada**. No transforma el dato, no comprueba que de verdad sea un
> `Habit`. Solo le dice a TypeScript "cállate y créeme". Si te equivocas, TS no te avisa, y el bug
> aparece en runtime. Por eso `as` se usa **con cuidado** y solo cuando de verdad sabes más que el
> compilador. Si dudas, no uses `as`: **valida**.

> ### 💡 Tip
> Una pista para distinguir: `as` es una **promesa que tú le haces a TypeScript**. Validar en
> runtime es una **comprobación que tu programa hace de verdad**. La promesa puede ser falsa; la
> comprobación no miente. En código que toca datos externos, prefiere comprobar.

---

## 5. Tipar las filas de Supabase (RachaSimple y Faro)

Las dos apps con TypeScript de tu portafolio usan Supabase, y las dos definen tipos para sus
filas en un archivo aparte. En RachaSimple ese archivo es `src/types/database.ts`. Empieza
declarando **uniones de strings literales** para los valores fijos (que viste en el capítulo 06):

```typescript
export type SupportTone = 'gentle' | 'practical' | 'encouraging' | 'direct';
export type HabitCategory =
  | 'reading' | 'exercise' | 'study' | 'wellness'
  | 'finance' | 'health' | 'other';
export type CheckinStatus = 'completed' | 'minimum' | 'recovery' | 'not_done';
```

Y luego usa esos tipos dentro de la `interface` que describe una fila de la tabla `habits`:

```typescript
export interface Habit {
  id: string;
  user_id: string | null;
  name: string;
  daily_goal: string;
  category: HabitCategory;     // ← solo puede ser una de las 7 categorías
  support_tone: SupportTone;   // ← solo uno de los 4 tonos
  emoji: string | null;        // ← puede no existir
  active: boolean;
  streak: number;
  best_streak: number;
}
```

> ### 🔎 En tu código
> Mira los `| null` repartidos por la interface: `user_id`, `emoji`. Eso refleja la realidad de la
> base de datos, donde esas columnas **pueden estar vacías**. Tipar el `null` te obliga a manejar
> el caso "no hay valor" en vez de olvidarlo. Es TypeScript diciéndote "ojo, esto a veces no está".

Faro hace exactamente lo mismo en `src/lib/types.ts`, pero para proyectos:

```typescript
export type ProjectPhase =
  | "idea" | "en_progreso" | "en_pausa" | "bloqueado" | "terminado";

export interface Project {
  id: string;
  owner_id: string;
  name: string;
  description: string | null;
  phase: ProjectPhase;
  progress_pct: number | null;
  roadmap: RoadmapStep[];    // ← una lista de pasos, cada uno con su propio tipo
  created_at: string;
}
```

> ### 🟦 ¿Qué significa? — *Tipo de fila de base de datos*
> Es una `interface` que describe la forma exacta de una fila tal como vive en la base de datos:
> qué columnas tiene, de qué tipo es cada una, y cuáles pueden ser `null`. **Para qué sirve:** para
> que cuando leas datos de Supabase, TypeScript te avise si tratas una columna como si fuera de un
> tipo que no es. **Dónde se usa:** `Habit` en RachaSimple, `Project` en Faro.

Ahora, la parte incómoda y honesta: cuando RachaSimple hace `return (data ?? []) as Habit[]`, está
**afirmando** que las filas cumplen `Habit`, pero **no lo está comprobando**. Supabase normalmente
devuelve lo correcto (porque la tabla tiene esa forma), así que la aserción es razonable. Pero si
alguien cambia la tabla y olvida actualizar el tipo, TypeScript no se entera: el `as` mentiría en
silencio. Por eso el tipo y la tabla **tienen que mantenerse sincronizados a mano** (o con
generadores de tipos, tema de capítulos más avanzados).

> ### 💡 Tip
> Supabase puede **generar** estos tipos automáticamente a partir de tu base de datos. Cuando lo
> hace, el `as` deja de ser una promesa a ciegas y pasa a basarse en la forma real de las tablas.
> Mientras tanto, mantener `database.ts` al día con la base de datos es responsabilidad tuya.

---

## 6. Tipar la respuesta de la API de Claude (tunal-digital)

Pasemos a una API externa de verdad: la de Claude (de Anthropic). Cuando le pides al modelo que
genere texto, te responde con un JSON que **siempre tiene la misma forma**. Si vas a consumir esa
respuesta desde tunal-digital, te conviene tiparla para no andar adivinando dónde está el texto.

La respuesta de la API de Mensajes de Claude trae, entre otras cosas, un arreglo `content` (donde
viene lo que el modelo escribió), un campo `stop_reason` (por qué se detuvo) y un objeto `usage`
(cuántos tokens gastó). Una versión simplificada del tipo se ve así:

```typescript
// Tipo del bloque de texto que devuelve Claude dentro de "content".
interface BloqueTexto {
  type: "text";
  text: string;
}

// Tipo (simplificado) de la respuesta completa de la API de Claude.
interface RespuestaClaude {
  id: string;
  model: string;
  content: BloqueTexto[];           // ← el texto vive dentro de este arreglo
  stop_reason: "end_turn" | "max_tokens" | "tool_use" | "refusal";
  usage: {
    input_tokens: number;
    output_tokens: number;
  };
}
```

> ### 🟦 ¿Qué significa? — *Bloque de contenido (`content`)*
> En la API de Claude, `content` no es un string suelto: es un **arreglo de bloques**. El bloque
> más común tiene `type: "text"` y un campo `text` con lo que el modelo escribió. **Para qué
> sirve:** permite que una respuesta mezcle texto, llamadas a herramientas, etc. **Dónde se usa:**
> al consumir Claude desde tunal-digital, lees `content[0].text` para sacar el texto generado.

Fíjate en `stop_reason`: lo tipamos como una **unión de literales** (capítulo 06). Eso significa
que TypeScript sabe que solo puede valer uno de esos cuatro strings, y te ayudará a manejarlos
todos. Especialmente importante es `"refusal"`: si el modelo se negó a responder, el `content`
puede venir vacío.

> ### ⚠️ Cuidado
> Antes de leer `content[0].text`, comprueba `stop_reason`. Si fue `"refusal"`, `content` puede
> estar vacío, y `content[0]` sería `undefined`. Leer `.text` de `undefined` revienta en runtime.
> TypeScript te tipó la forma, pero **no garantiza que el arreglo tenga elementos**: eso lo
> compruebas tú.

Así se consume la respuesta con cuidado, validando antes de tocar:

```typescript
const datos = (await response.json()) as RespuestaClaude;

// Comprobamos en runtime, no solo confiamos en el tipo:
if (datos.stop_reason === "refusal" || datos.content.length === 0) {
  throw new Error("Claude no devolvió texto.");
}

const texto = datos.content[0].text; // ahora sí es seguro
```

> ### 🔎 En tu código
> Faro hace justo este patrón con la API de OpenAI en `src/lib/openai.ts`: pide la respuesta,
> intenta `JSON.parse`, y si algo falla, usa un valor de respaldo en vez de reventar. La idea es la
> misma sea Claude u OpenAI: **tipas la forma esperada, pero validas en runtime antes de confiar.**

---

## 7. Validar en runtime: el cinturón de seguridad de verdad

Ya lo dijimos varias veces, pero merece su propia sección porque es **la lección más importante
del capítulo**: el tipo describe lo que *esperas*; la validación comprueba lo que *de verdad
llegó*.

> ### 🟦 ¿Qué significa? — *Validar en runtime*
> Es escribir código que comprueba, mientras el programa corre, que un dato tiene la forma que
> esperas: que existe, que es un objeto, que tiene las propiedades correctas, que el arreglo no
> está vacío. **Para qué sirve:** atrapar datos malformados *antes* de que provoquen un error feo
> más adelante. **Dónde se usa:** Faro valida la respuesta de la IA antes de guardarla; tu código
> de Claude valida `stop_reason` y `content.length` antes de leer el texto.

Mira cómo Faro valida su respuesta de IA en `src/lib/openai.ts`. El modelo debe devolver un JSON
con `summary` y `next_action`, pero Faro no lo da por sentado:

```typescript
const raw = completion.choices[0]?.message?.content ?? "{}";
let parsed: Partial<SummarizeResult> = {};
try {
  parsed = JSON.parse(raw);          // puede fallar si el texto no es JSON válido
} catch {
  parsed = { summary: raw, next_action: "" }; // respaldo si no se pudo parsear
}

return {
  summary: parsed.summary?.trim() || "No se pudo generar el resumen.",
  next_action: parsed.next_action?.trim() || "",
};
```

Hay tres cinturones de seguridad aquí, y vale la pena nombrarlos:

1. **`?.` (encadenamiento opcional):** `completion.choices[0]?.message?.content` no revienta si
   `choices[0]` o `message` no existen; devuelve `undefined`.
2. **`?? "{}"`:** si todo lo anterior fue `undefined`, usa `"{}"` (un JSON vacío) en vez de
   intentar parsear `undefined`.
3. **`try / catch`:** si `JSON.parse` falla (porque el modelo devolvió texto que no es JSON
   válido), el `catch` da un valor de respaldo en vez de tumbar el programa.

> ### 🟦 ¿Qué significa? — *`Partial<T>`*
> `Partial<T>` es un tipo que toma otro tipo `T` y hace **todas** sus propiedades opcionales (lo
> viste en el capítulo 07 de tipos utilitarios). **Para qué sirve:** describir un objeto que
> *quizás* tenga las propiedades de `T`, pero quizás no todas. **Dónde se usa:** aquí Faro escribe
> `Partial<SummarizeResult>` porque, hasta validar, no sabe si `parsed` trae `summary` y
> `next_action` o si vino incompleto.

> ### 💡 Tip
> El patrón "tipo + validación" se resume así: usa **tipos** para que TypeScript te guíe mientras
> escribes, y usa **validación en runtime** (comprobaciones, `try/catch`, `?.`, `??`) para
> protegerte de la realidad cuando el programa corre. Los tipos son el mapa; la validación es mirar
> por dónde caminas.

Para validaciones más serias (comprobar campo por campo que un objeto cumple un tipo entero),
existen librerías como Zod, que sí generan comprobaciones reales en runtime. Eso es tema de
capítulos posteriores; por ahora te basta con entender **por qué** hace falta validar y **qué
herramientas básicas** (`?.`, `??`, `try/catch`, comprobar `.length`) ya tienes para hacerlo.

---

## 8. Juntando todo: el flujo seguro de datos externos

Recapitulando el camino correcto para cualquier dato que venga de afuera:

1. Recíbelo como `unknown` (o tipa la forma esperada con una `interface`).
2. Evita `any`: te quita la red de seguridad.
3. Usa `as` solo cuando de verdad sabes más que TypeScript, y con plena conciencia de que **no
   valida nada**.
4. **Valida en runtime** antes de confiar: comprueba existencia, longitud, `stop_reason`, lo que
   haga falta.
5. Recuerda siempre: TypeScript te protege al **escribir**, no al **ejecutar**.

```typescript
async function obtenerResumen(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) throw new Error("La API respondió con error.");

  const datos = (await response.json()) as RespuestaClaude; // afirmo la forma...
  // ...pero compruebo en runtime antes de confiar:
  if (datos.stop_reason === "refusal" || datos.content.length === 0) {
    throw new Error("No hubo texto que mostrar.");
  }
  return datos.content[0].text;
}
```

> ### 🔎 En tu código
> Este es exactamente el espíritu de los repositorios de RachaSimple (`if (error) throw error;`
> antes de devolver datos) y de la capa de IA de Faro (validar y dar respaldos). Distintas APIs,
> mismo hábito: **nunca confíes a ciegas en un dato de afuera.**

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Sé explicar por qué TypeScript **no protege en tiempo de ejecución** (los tipos se borran al compilar).
- [ ] Entiendo la diferencia entre tiempo de compilación y tiempo de ejecución.
- [ ] Sé por qué `await response.json()` devuelve `any` y por qué eso es peligroso.
- [ ] Sé la diferencia entre `unknown` y `any`, y por qué `unknown` es más seguro.
- [ ] Entiendo que `as` es una **promesa** a TypeScript que **no valida ni convierte** nada.
- [ ] Puedo escribir una `interface` que tipe una fila de Supabase, con `| null` donde toque.
- [ ] Sé tipar la respuesta de la API de Claude (`content`, `stop_reason`, `usage`).
- [ ] Sé validar en runtime con `?.`, `??`, `try/catch` y comprobando `.length` antes de leer datos.
- [ ] Reconozco el patrón "tipo + validación" en el código real de RachaSimple y Faro.

---

## 🧪 Ejercicios

1. **(En papel)** Explica con tus palabras, como si se lo contaras a alguien que recién aprendió
   JavaScript, por qué este código compila sin errores pero puede reventar cuando el programa
   corre: `const u = await res.json() as Usuario; u.nombre.toUpperCase();`.

2. **(En papel)** Dada la `interface Habit` de RachaSimple, ¿cuáles propiedades **podrían ser
   `null`** y por qué tiparlas así te obliga a manejar el caso "no hay valor"? Escribe la lista.

3. 💻 Crea un archivo `practica.ts`. Declara una variable `dato: unknown` y asígnale
   `JSON.parse('{"nombre":"Bit"}')`. Intenta hacer `dato.nombre` directamente: observa el error de
   TypeScript. Luego comprueba con un `if` que `dato` es un objeto con `nombre` antes de usarlo.

4. 💻 Escribe la `interface RespuestaClaude` (con `content`, `stop_reason` y `usage`) y una función
   `sacarTexto(datos: RespuestaClaude): string` que **valide** que `content` no está vacío y que
   `stop_reason` no es `"refusal"` antes de devolver `content[0].text`. Lanza un `Error` si la
   validación falla.

5. 💻 Toma este JSON imperfecto y escribe código que lo parsee con `try/catch` y use valores de
   respaldo (al estilo de Faro): `'{"summary": "Listo"}'` (le falta `next_action`). Tu código debe
   devolver un objeto `{ summary, next_action }` donde `next_action` sea `""` si no vino.

6. 💻 **(Reto)** Escribe una función `traerProyectos(url: string): Promise<Project[]>` que haga
   `fetch`, compruebe `response.ok`, reciba el cuerpo como `unknown`, y solo lo devuelva como
   `Project[]` (con `as`) **después** de comprobar que es un arreglo con `Array.isArray(datos)`.
   Si no es un arreglo, devuelve `[]`. Explica en un comentario por qué el `as` aquí es más seguro
   que ponerlo sin la comprobación previa.
