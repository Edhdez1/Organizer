# Capítulo 08 — Genéricos a fondo

<p align="center">
  <img src="../../recursos/imagenes/05-typescript/cap08.png" alt="Ilustración del capítulo (pixel art con Bit)" width="640">
</p>


> Llegamos al tema que más asusta de TypeScript: los **genéricos**, esos `<T>` con
> picos que aparecen por todos lados. Bit, nuestro ajolote, los miraba de reojo como
> quien mira una araña en la pared. Pero respira: un genérico es solo una **forma de
> escribir un tipo que todavía no conoces** y dejar que TypeScript lo descubra cuando
> usas la función. No hay magia negra por ningún lado. Aquí los vamos a desarmar con
> calma, pieza por pieza: funciones genéricas, interfaces y tipos genéricos,
> restricciones con `extends`, valores por defecto, arrays y promesas. Y para el final
> vas a entender por qué `useState<T>` y `useQuery<T>` de RachaSimple **necesitan** un
> genérico para hacer su trabajo. Ten siempre presente una cosa: TypeScript es
> JavaScript con tipos. Lo único que añadimos aquí es un hueco con nombre.

---

## 1. El problema que resuelven los genéricos

Empecemos por una función bien sencilla en JavaScript, una que devuelve el primer elemento de una lista:

```typescript
function primero(lista) {
  return lista[0];
}
```

En JavaScript esto traga lo que sea: números, textos, proyectos de Faro. Pero en cuanto
intentas tiparla en TypeScript te asalta la duda: ¿de qué tipo es la lista? ¿Y qué
devuelve?

El primer intento, un poco torpe, sería tirar de `any` (el "tipo comodín que apaga las revisiones"):

```typescript
function primero(lista: any[]): any {
  return lista[0];
}
```

Funciona, sí, pero **tira a la basura** todo lo que TypeScript sabía. Si le pasas una
lista de `Project` y guardas el resultado, TypeScript ya no sabe que es un `Project`: te
deja escribir `proyecto.cualquierTonteria` sin protestar. Adiós a la red de seguridad.

El otro camino sería escribir una función distinta por cada tipo: `primeroProyecto`,
`primeroFuente`, `primeroNumero`... Aburrido, repetitivo y un imán para los errores.

Los genéricos son la salida elegante: una **sola** función que conserva el tipo, sea cual sea.

> ### 🟦 ¿Qué significa? — *Genérico*
> Un genérico es un **tipo con un hueco etiquetado** que se rellena en el momento de
> usar la función, interfaz o tipo. Ese hueco se escribe entre picos `<...>` y, por
> convención, se llama `T` (de *Type*, tipo). Sirve para escribir código que funciona
> con **muchos tipos a la vez sin perder la información** de cuál es. En RachaSimple
> aparece cada vez que escribes `useState<Habito[]>` o `useQuery<Habito[]>`: ese `<T>`
> le dice al hook con qué tipo de dato va a trabajar.

---

## 2. Tu primera función genérica

Reescribamos `primero`, ahora como genérica:

```typescript
function primero<T>(lista: T[]): T {
  return lista[0];
}
```

Vamos a leerlo por partes, sin prisa:

- `<T>` justo después del nombre → "voy a usar un tipo al que llamo `T`, todavía sin
  decidir cuál".
- `lista: T[]` → "el parámetro es un **array de ese tipo `T`**".
- `: T` después de los paréntesis → "y **devuelvo un valor de ese mismo tipo `T`**".

Y lo bonito: TypeScript **rellena `T` solo** según lo que le pases.

```typescript
const numeros = [10, 20, 30];
const n = primero(numeros);   // T se vuelve number → n es number

const nombres = ["Ana", "Luis"];
const s = primero(nombres);   // T se vuelve string → s es string
```

Fíjate en que no tuviste que escribir `primero<number>(...)`. TypeScript lo **dedujo**
mirando el argumento. A eso se le llama *inferencia*.

> ### 🟦 ¿Qué significa? — *Parámetro de tipo (`T`)*
> Es el nombre del hueco que pones entre los picos. `T` es solo una **variable, pero de
> tipos en vez de valores**: igual que `precio` guarda un número, `T` guarda un tipo.
> Puedes llamarlo como quieras (`T`, `U`, `Item`, `Dato`), aunque `T` es lo habitual.
> ¿Para qué sirve? Para referirte al mismo tipo varias veces dentro de la función (en el
> parámetro y en el retorno) y mantenerlos sincronizados.

> ### 💡 Tip — Genérico = "déjame que TypeScript lo adivine"
> En el 90 % de los casos **no escribes** el tipo entre picos al llamar la función; lo
> infiere por ti. Solo lo escribes a mano cuando TypeScript no puede adivinarlo (lo
> veremos con `useState` más abajo). Si sale solo, no lo fuerces.

> ### ⚠️ Cuidado — `T` no es una cadena de texto
> `T` nunca aparece en tiempo de ejecución. Es una etiqueta que vive **solo durante la
> revisión de tipos** y desaparece al compilar a JavaScript. No puedes hacer
> `if (T === "number")`; eso no existe. `T` es para el corrector, no para tu programa.

---

## 3. Por qué `useState<T>` necesita un genérico

Vamos al corazón del capítulo. En RachaSimple, un componente de React guarda su estado
con el hook `useState`. Mira esta línea, de las que ves a diario:

```typescript
const [habitos, setHabitos] = useState<Habito[]>([]);
```

¿Por qué el `<Habito[]>`? Para entenderlo, métete dentro de `useState`. El hook recibe
un **valor inicial** y te devuelve dos cosas: el valor actual y una función para
cambiarlo. El problema es que aquí el valor inicial es `[]`, un **array vacío**.

Un array vacío no le cuenta a TypeScript nada sobre lo que vendrá dentro. ¿Será un array
de hábitos? ¿De números? ¿De textos? Mirando solo `[]`, TypeScript no tiene cómo
adivinarlo: lo más que deduce es `never[]` (un array que no admite nada útil). Y entonces
esto, más adelante, reventaría:

```typescript
const [habitos, setHabitos] = useState([]);     // TypeScript cree: never[]
setHabitos([{ id: "1", nombre: "Leer" }]);       // ❌ no encaja con never[]
```

Al escribir `useState<Habito[]>([])` le das tú el dato que le faltaba: "este estado es un
**array de `Habito`**, aunque ahora mismo esté vacío". A partir de ahí todo encaja:
`habitos` es `Habito[]` y `setHabitos` solo acepta arrays de `Habito`.

> ### 🔎 En tu código — La firma de `useState` por dentro
> React define `useState` (muy simplificado) así:
> ```typescript
> function useState<T>(inicial: T): [T, (nuevo: T) => void];
> ```
> Es una función genérica, igual que las del punto 2. El `<T>` es lo que conecta el valor
> inicial con el valor que devuelve y con la función `set`. Por eso, cuando el inicial es
> ambiguo (`[]`, `null`), **tú** rellenas el `<T>` a mano. Y cuando el inicial es claro
> (`useState(0)` o `useState("")`), React lo infiere y no necesitas escribir nada.

> ### 💡 Tip — La regla práctica del `useState`
> Si el valor inicial **ya dice su tipo** (`useState(0)`, `useState("")`,
> `useState(false)`), no escribas genérico. Si el inicial es **vacío o nulo**
> (`useState<Habito[]>([])`, `useState<string | null>(null)`), pon el `<T>` para que
> TypeScript sepa qué vas a guardar luego.

---

## 4. Interfaces y tipos genéricos

Los genéricos no son cosa solo de funciones. También una **interface** o un **type**
pueden tener su hueco `<T>`. Esto viene de perlas para describir "una caja que envuelve
algún tipo".

El caso clásico: una respuesta de API que por fuera siempre tiene la misma forma, pero por dentro lleva datos distintos.

```typescript
interface Respuesta<T> {
  ok: boolean;
  data: T;
  error: string | null;
}
```

Aquí `Respuesta` es una **plantilla**: el `data` será del tipo que tú indiques al usarla.

```typescript
type RespuestaProyectos = Respuesta<Project[]>;   // data es Project[]
type RespuestaUsuario  = Respuesta<UserPrefs>;     // data es UserPrefs
```

Una misma estructura, rellenada con dos contenidos distintos. Sin genéricos tendrías que
duplicar la interface entera por cada tipo de `data`.

> ### 🟦 ¿Qué significa? — *Interface genérica*
> Es una `interface` que recibe uno o más parámetros de tipo entre picos
> (`interface Caja<T>`). Sirve para describir estructuras que **tienen siempre la misma
> forma pero envuelven distintos contenidos**: respuestas de API, listas, resultados de
> consultas. Cuando la usas, rellenas el `<T>` con un tipo concreto, como
> `Respuesta<Project[]>`.

> ### 🔎 En tu código — Los genéricos que ya usas sin saberlo
> En `src/lib/types.ts` de Faro hay un genérico que viene de fábrica con TypeScript:
> ```typescript
> data: GithubSnapshot | Record<string, unknown>;
> ```
> `Record<K, V>` es un **tipo genérico de la librería estándar**: describe un objeto
> cuyas claves son del tipo `K` y sus valores del tipo `V`. Aquí `Record<string,
> unknown>` significa "un objeto con claves de texto y valores de tipo desconocido".
> Lleva **dos** parámetros de tipo, separados por coma. Y más abajo, en `UserPrefs`,
> aparece `Record<Weekday, DayConfig>`: un objeto cuyas claves son los días de la semana
> y cuyos valores son configuraciones de día.

---

## 5. Restricciones con `extends`

A veces `T` no puede ser *cualquier* cosa. Quieres aceptar muchos tipos, vale, pero todos
deben **tener algo en común**. Para eso está `extends` dentro de los picos.

Imagina una función que ordena cualquier lista de objetos que tengan `sort_order`, como
los proyectos de Faro:

```typescript
function ordenar<T extends { sort_order: number }>(items: T[]): T[] {
  return [...items].sort((a, b) => a.sort_order - b.sort_order);
}
```

Lee `T extends { sort_order: number }` así: "`T` puede ser cualquier tipo **siempre que
tenga al menos** una propiedad `sort_order` de tipo número". Eso es justo lo que te
permite escribir `a.sort_order` dentro con tranquilidad, porque la restricción lo
garantiza.

```typescript
ordenar(proyectos);                       // ✅ Project tiene sort_order
ordenar([{ sort_order: 1 }, { sort_order: 0 }]);  // ✅
ordenar([1, 2, 3]);                       // ❌ los números no tienen sort_order
```

> ### 🟦 ¿Qué significa? — *Restricción de tipo (`extends`)*
> Es la condición que le pones a un genérico para limitar qué tipos admite:
> `T extends Algo`. Significa "`T` debe ser compatible con `Algo`" (tener sus
> propiedades). Sirve para poder **usar dentro** de la función propiedades que sabes que
> van a existir. Sin la restricción, TypeScript no te dejaría leer `a.sort_order`, porque
> un `T` libre podría no tenerla.

> ### ⚠️ Cuidado — `extends` aquí no es herencia
> En las clases, `extends` significa "hereda de". Dentro de los picos de un genérico
> significa otra cosa: "**está restringido a** / debe encajar con". No estás creando una
> subclase, solo poniéndole una condición al hueco. Misma palabra, idea distinta.

> ### 🔎 En tu código — Una restricción real disfrazada
> En `src/lib/queries.ts` de Faro, la función `getProjectsWithSources` devuelve
> `Promise<ProjectWithSources[]>`, y `ProjectWithSources` se define así en `types.ts`:
> ```typescript
> export interface ProjectWithSources extends Project {
>   sources: (ProjectSource & { snapshot: SourceSnapshot | null })[];
> }
> ```
> Ese `extends Project` es herencia de interfaces (hereda todos los campos de `Project`),
> no un genérico. Lo traemos aquí justo para que veas el contraste: la **misma palabra**
> `extends`, dos usos. Cuando está dentro de `<...>` es restricción; cuando está entre dos
> nombres de interface, es herencia.

---

## 6. Valores por defecto de tipo

Igual que un parámetro de función puede tener un valor por defecto (`saludo = "Hola"`), un
parámetro de tipo puede tener un **tipo por defecto**. Se escribe con `=` dentro de los
picos.

```typescript
interface Respuesta<T = unknown> {
  ok: boolean;
  data: T;
  error: string | null;
}
```

Ahora, si usas `Respuesta` **sin** decir el tipo, `T` cae a `unknown`:

```typescript
type R1 = Respuesta;            // data es unknown (usó el valor por defecto)
type R2 = Respuesta<Project[]>; // data es Project[] (lo especificaste)
```

Esto es comodísimo cuando la mayoría de las veces te sirve un tipo, pero quieres dejar la
puerta abierta a afinarlo.

> ### 🟦 ¿Qué significa? — *Valor por defecto de tipo*
> Es el tipo que toma un parámetro genérico **cuando no se lo das tú**, escrito con
> `<T = TipoPorDefecto>`. Sirve para que un genérico sea **cómodo de usar sin
> argumentos** pero siga permitiendo personalizarlo. Es la misma idea que un parámetro
> con valor por defecto en una función, solo que a nivel de tipos.

> ### 💡 Tip — Lo verás mucho en librerías, poco en tu código
> Los valores por defecto de tipo abundan en librerías como React o TanStack Query (sus
> tipos internos los usan a montones), pero en el código de RachaSimple y Faro casi
> siempre **pasas el tipo explícito** porque lo conoces. Tu meta es reconocerlos al
> leerlos; no te obsesiones con escribirlos.

---

## 7. Genéricos en arrays y promesas

Aquí viene una revelación que tranquiliza: **ya llevas capítulos usando genéricos sin
enterarte**. Los arrays y las promesas son genéricos por dentro.

### Arrays

Escribir `Project[]` es, en realidad, un atajo de `Array<Project>`:

```typescript
const a: Project[] = [];        // forma corta
const b: Array<Project> = [];   // forma larga, idéntica
```

`Array<T>` es un tipo genérico de la librería estándar. Aquel `[]` que ponías desde el
capítulo de tipos básicos **ya estaba rellenando un `<T>`**. En `types.ts` de Faro lo ves
a cada paso: `tags: string[]`, `roadmap: RoadmapStep[]`, `blocks: AgendaBlock[]`. Todos
son `Array<algo>` disfrazados.

> ### 🟦 ¿Qué significa? — *`Array<T>`*
> Es el tipo genérico que describe una **lista de elementos del tipo `T`**. `Project[]` y
> `Array<Project>` son exactamente lo mismo; la sintaxis con corchetes es solo más corta
> y más popular. Sirve para que TypeScript sepa qué hay dentro de cada lista y te
> autocomplete, por ejemplo, `proyecto.name` al recorrerla.

### Promesas

Cuando una función es `async`, devuelve una **promesa**, y la promesa también lleva su
genérico: `Promise<T>`, donde `T` es lo que tendrás **cuando termine** la espera.

```typescript
export async function getProjectsWithSources(): Promise<ProjectWithSources[]> {
  // ...
  return projects.map(/* ... */);
}
```

Esa firma real de Faro se lee así: "esta función es asíncrona y, cuando resuelva,
entregará un **array de `ProjectWithSources`**". Por eso, al llamarla, el `await` te
devuelve justo ese tipo:

```typescript
const proyectos = await getProjectsWithSources();
// proyectos es ProjectWithSources[], totalmente tipado
```

> ### 🟦 ¿Qué significa? — *`Promise<T>`*
> Es el tipo genérico de un valor que **todavía no está listo pero llegará** (el
> resultado de una operación asíncrona, como una consulta a Supabase). El `<T>` dice de
> qué tipo será ese resultado final. Cuando haces `await unaPromise`, recuperas un valor
> de tipo `T`. En Faro, casi toda función que habla con la base de datos devuelve
> `Promise<algo>`.

> ### 🔎 En tu código — `Map<K, V>`, otro genérico de la estándar
> En esa misma `queries.ts` de Faro aparece:
> ```typescript
> const latestBySource = new Map<string, SourceSnapshot>();
> ```
> `Map<K, V>` es un genérico con **dos** huecos: el tipo de las **claves** (`K`, aquí
> `string`) y el de los **valores** (`V`, aquí `SourceSnapshot`). Gracias a eso,
> `latestBySource.get(id)` devuelve `SourceSnapshot | undefined`, perfectamente tipado,
> sin que tengas que acordarte tú.

---

## 8. Por qué `useQuery<T>` de RachaSimple necesita un genérico

Ya tienes todas las piezas en la mano. RachaSimple usa **TanStack Query** para traer
datos de Supabase. Su hook estrella es `useQuery`, y se usa así:

```typescript
const { data, isLoading, error } = useQuery<Habito[]>({
  queryKey: ["habitos"],
  queryFn: cargarHabitos,
});
```

¿Por qué el `<Habito[]>`? Por la misma razón que en `useState`, pero un nivel más arriba.
`useQuery` no tiene forma de saber qué va a devolver tu `queryFn` con solo mirar la clave
`["habitos"]`. El genérico se lo aclara: "lo que esta consulta traerá es un **array de
`Habito`**".

Con eso, `data` queda tipado como `Habito[] | undefined` (es `undefined` mientras carga, y
`Habito[]` cuando llega). Entonces, al pintar la lista en pantalla, TypeScript te
autocompleta cada campo:

```typescript
{data?.map((h) => <Racha key={h.id} nombre={h.nombre} racha={h.racha_actual} />)}
```

Si te equivocas y escribes `h.rachaActual` (mal el nombre), el error salta **antes** de
ejecutar. Ese es todo el premio: el genérico convierte una respuesta "desconocida" de la
red en datos con forma conocida y vigilada.

> ### 🟦 ¿Qué significa? — *Hook genérico (`useQuery<T>`, `useState<T>`)*
> Es un hook de React que recibe un parámetro de tipo entre picos para saber **con qué
> tipo de dato trabaja**. `useState<T>` lo necesita cuando el valor inicial es ambiguo;
> `useQuery<T>` lo necesita porque el dato viene de fuera (la red) y no se puede inferir.
> Sirve para que el estado y los datos remotos de RachaSimple estén **tan tipados como el
> resto del código**, con autocompletado y errores tempranos.

> ### 💡 Tip — TanStack Query a veces lo infiere por ti
> Si tu `queryFn` ya está bien tipada (devuelve `Promise<Habito[]>`), las versiones
> modernas de TanStack Query pueden **inferir** el tipo de `data` sin que escribas
> `<Habito[]>`. Aun así, mucha gente lo escribe explícito por claridad. Las dos formas son
> correctas; lo que importa es que `data` termine tipado.

> ### ⚠️ Cuidado — No confundas la clave con el tipo
> En `useQuery({ queryKey: ["habitos"] })`, el `["habitos"]` es un **texto identificador**
> para la caché, no el tipo de dato. El tipo va **entre los picos**: `useQuery<Habito[]>`.
> Son dos cosas distintas que conviven en la misma llamada.

---

## 9. Juntándolo todo: una función genérica de verdad

Para cerrar, una funcioncita que combina restricción y array, del estilo que bien podrías
escribir en Faro para encontrar un proyecto por su `id`:

```typescript
function buscarPorId<T extends { id: string }>(
  items: T[],
  id: string,
): T | null {
  return items.find((item) => item.id === id) ?? null;
}
```

- `<T extends { id: string }>` → acepta cualquier tipo que tenga un `id` de texto
  (`Project`, `ProjectSource`, `Habito`...).
- `items: T[]` → una lista de esos.
- `: T | null` → devuelve uno de ellos, o `null` si no aparece (con `??`, el operador de
  coalescencia nula que ya conoces).

Y al usarla, el tipo se conserva intacto:

```typescript
const proyecto = buscarPorId(proyectos, "abc"); // proyecto es Project | null
```

Una sola función, segura, reutilizable con cualquier tipo que tenga `id`. Eso es un
genérico bien usado: menos repetición, cero pérdida de tipos. Bit, que empezó el capítulo
escondido tras una piedra, ahora asoma la cabeza y aplaude con sus branquias.

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Sé explicar con mis palabras qué problema resuelve un genérico (vs. usar `any`).
- [ ] Entiendo que `<T>` es un hueco de tipo que se rellena al usar la función.
- [ ] Sé escribir una función genérica como `primero<T>(lista: T[]): T`.
- [ ] Entiendo por qué `useState<Habito[]>([])` necesita el genérico (inicial ambiguo).
- [ ] Reconozco una interface genérica como `Respuesta<T>` y sé rellenarla.
- [ ] Sé qué hace `T extends { id: string }` y por qué me deja leer `item.id`.
- [ ] Distingo el `extends` dentro de `<...>` (restricción) del `extends` entre
      interfaces (herencia).
- [ ] Entiendo que `Project[]`, `Array<T>`, `Promise<T>`, `Map<K, V>` y `Record<K, V>`
      son genéricos.
- [ ] Sé por qué `useQuery<Habito[]>` necesita el tipo y dónde va (entre los picos, no
      en la `queryKey`).
- [ ] Reconozco un valor de tipo por defecto: `<T = unknown>`.

---

## 🧪 Ejercicios

1. **Sin computadora.** Explica en una frase, como si se lo contaras a un amigo que solo
   sabe JavaScript, qué significa la `<T>` en `function primero<T>(lista: T[]): T`. Evita
   la palabra "genérico" para forzarte a explicar la idea.

2. **Sin computadora.** Mira esta línea de RachaSimple:
   `const [meta, setMeta] = useState<number | null>(null);`. ¿Por qué hace falta el
   `<number | null>` y no basta con `useState(null)`? Responde en dos renglones.

3. 💻 Escribe una función genérica `ultimo<T>(lista: T[]): T` que devuelva el **último**
   elemento de un array. Pruébala con un array de números y con un array de textos, y
   comprueba en el editor que el tipo del resultado cambia solo.

4. 💻 Define una interface genérica `Caja<T>` con dos campos: `valor: T` y
   `etiqueta: string`. Luego crea `const c: Caja<Project>` (puedes usar un objeto de
   prueba) y verifica que `c.valor.name` autocompleta.

5. 💻 Escribe `buscarPorId<T extends { id: string }>(items: T[], id: string): T | null`
   (como en la sección 9). Pruébala con un array de objetos que tengan `id` y luego
   intenta pasarle un array de números (`[1, 2, 3]`): observa el error de TypeScript y
   escribe en un comentario por qué aparece.

6. 💻 **Reto.** Tipa una función `async function cargar<T>(url: string): Promise<T>` que
   simule traer datos (puede devolver un valor falso con `as T`). Llámala dos veces:
   `cargar<Habito[]>("/habitos")` y `cargar<Project>("/proyecto/1")`, y comprueba con el
   `await` que cada resultado sale con el tipo correcto. Anota qué pasaría si quitaras el
   `<T>` al llamarla.
