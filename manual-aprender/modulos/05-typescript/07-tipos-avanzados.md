# Capítulo 07 — Tipos avanzados y utilitarios

> Hasta ahora creaste tus propios tipos con `interface` y `type`. En este capítulo Bit te enseña
> a **derivar** tipos nuevos a partir de los que ya tienes, sin copiar y pegar. Es la diferencia
> entre escribir un tipo "a mano" diez veces y decir "este tipo es como aquel, pero **sin** el
> `id`". RachaSimple y Faro hacen esto todo el tiempo: tienen un puñado de tipos base (un hábito,
> un proyecto) y de ahí sacan decenas de variantes. Menos repetición, menos errores, y cuando
> cambias el tipo base, **todo lo demás se actualiza solo**.

---

## 1. El problema: repetir tipos a mano

Imagina que en RachaSimple tienes el tipo de un hábito tal como vive en la base de datos:

```typescript
interface Habito {
  id: string;
  user_id: string;
  nombre: string;
  color: string;
  creado_en: string;
}
```

Ahora necesitas un tipo para el **formulario** de crear un hábito. Ahí todavía no hay `id` (lo
pone la base de datos), ni `user_id` (lo pone el servidor), ni `creado_en`. Solo `nombre` y
`color`. La tentación del principiante es escribir **otra interface** a mano:

```typescript
// 😩 repetido: si mañana renombras "nombre" a "titulo", tienes que cambiarlo en DOS sitios
interface NuevoHabito {
  nombre: string;
  color: string;
}
```

El problema no es escribirlo una vez: es que ahora tienes **dos fuentes de la verdad**. Si el
campo `nombre` cambia de tipo, o agregas `icono`, tienes que acordarte de tocar las dos. Tarde o
temprano se desincronizan. La solución de TypeScript: **derivar** `NuevoHabito` *a partir de*
`Habito`. Eso es lo que veremos.

> ### 💡 Tip — Una sola fuente de la verdad
> La idea grande de todo este capítulo es **DRY** (*Don't Repeat Yourself*, "no te repitas").
> Defines el tipo importante **una vez** y los demás se construyen sobre él. Cuando cambias el
> original, los derivados cambian con él. Bit lo resume así: "un tipo manda, los otros obedecen".

---

## 2. Tipos utilitarios: herramientas que vienen incluidas

> ### 🟦 ¿Qué significa? — *Tipo utilitario*
> Un **tipo utilitario** (en inglés *utility type*) es una herramienta que **ya viene dentro de
> TypeScript** y que toma un tipo y te devuelve **otro tipo modificado**. Funciona parecido a una
> función, pero en vez de operar sobre datos, opera sobre **tipos**: le das un tipo de entrada y
> te da un tipo de salida.
>
> Se usan con la sintaxis `Utilitario<TuTipo>` (el tipo entre los signos `<` y `>`, igual que con
> los genéricos del capítulo 04). No tienes que instalar nada: están siempre disponibles.

Los seis más útiles para empezar son `Partial`, `Required`, `Pick`, `Omit`, `Record` y
`Readonly`. Vamos uno por uno.

### 2.1 `Partial<T>` — "todo opcional"

> ### 🟦 ¿Qué significa? — *`Partial<T>`*
> `Partial<T>` toma un tipo `T` y devuelve una copia donde **todas las propiedades pasan a ser
> opcionales** (les pone el `?` que viste en el capítulo 03). Sirve para cuando vas a **actualizar
> solo algunos campos** de un objeto, no todos.

Donde brilla: una función de **editar**. Cuando editas un hábito, quizá solo cambias el color, no
todo. Así que el objeto de cambios puede traer cualquier subconjunto de campos:

```typescript
// Partial<Habito> = un Habito donde cada campo puede venir o no
function actualizarHabito(id: string, cambios: Partial<Habito>) {
  // cambios podría ser { color: "azul" } o { nombre: "Leer", color: "rojo" }
}

actualizarHabito("h1", { color: "azul" });        // ✅ solo el color
actualizarHabito("h1", { nombre: "Meditar" });     // ✅ solo el nombre
```

> ### 🔎 En tu código — RachaSimple
> Las mutaciones de TanStack Query que actualizan un hábito en `RachaSimple` reciben justo esto:
> un `Partial` del tipo del hábito. Así una sola función sirve para cambiar el nombre, el color o
> lo que sea, sin escribir un tipo distinto por cada combinación posible.

### 2.2 `Required<T>` — "todo obligatorio"

> ### 🟦 ¿Qué significa? — *`Required<T>`*
> Es el **opuesto** de `Partial`: toma un tipo y le **quita el `?` a todas las propiedades**, es
> decir, las vuelve **obligatorias**. Sirve cuando tienes un tipo con campos opcionales pero, en
> cierto punto del programa, ya sabes que **todos** deben estar presentes.

```typescript
interface Config {
  tema?: string;
  idioma?: string;
}

// Aquí ya validamos todo: exigimos que ningún campo falte
function aplicarConfig(config: Required<Config>) {
  console.log(config.tema, config.idioma); // ambos seguro existen
}
```

### 2.3 `Pick<T, K>` — "elige solo estos campos"

> ### 🟦 ¿Qué significa? — *`Pick<T, K>`*
> `Pick` (en inglés, "escoger") toma un tipo `T` y una lista de nombres de propiedades `K`, y
> devuelve un tipo **con solo esas propiedades**. Las demás se descartan. Los nombres se escriben
> como **uniones de texto**: `"nombre" | "color"`.

```typescript
// Solo quiero el nombre y el color del Habito
type ResumenHabito = Pick<Habito, "nombre" | "color">;
// Equivale a: { nombre: string; color: string }
```

### 2.4 `Omit<T, K>` — "todo menos estos campos"

> ### 🟦 ¿Qué significa? — *`Omit<T, K>`*
> `Omit` ("omitir") es el complemento de `Pick`: toma un tipo `T` y devuelve una copia **sin** las
> propiedades que le indicas en `K`. En vez de decir "quiero estos", dices "quiero todos **menos**
> estos".

Aquí resolvemos por fin el problema del inicio del capítulo. El formulario de crear un hábito es
el `Habito` **sin** los campos que pone el sistema:

```typescript
// Un Habito sin id, sin user_id y sin creado_en → lo que llena el usuario
type NuevoHabito = Omit<Habito, "id" | "user_id" | "creado_en">;
// Resultado automático: { nombre: string; color: string }
```

Si mañana agregas `icono` a `Habito`, `NuevoHabito` lo incluirá **solo**. Una fuente de la verdad.

> ### 💡 Tip — ¿`Pick` u `Omit`? Elige el más corto
> Si te quedas con **pocos** campos de muchos, usa `Pick`. Si descartas **pocos** de muchos, usa
> `Omit`. El resultado es el mismo tipo; escoge el que se lea más claro. En la práctica, para
> "quitar las columnas que pone la base de datos" casi siempre se usa `Omit`.

### 2.5 `Record<K, V>` — "un diccionario tipado"

> ### 🟦 ¿Qué significa? — *`Record<K, V>`*
> `Record` ("registro") construye un tipo de **objeto-diccionario**: un objeto cuyas **claves** son
> del tipo `K` y cuyos **valores** son del tipo `V`. Es la forma tipada de decir "un objeto donde
> cada clave es un texto y cada valor es un número", por ejemplo.

```typescript
// Un mapa de color → cuántos hábitos hay de ese color
type ConteoPorColor = Record<string, number>;

const conteo: ConteoPorColor = {
  azul: 3,
  rojo: 1,
};
```

Puedes restringir las claves a un conjunto fijo usando una unión de texto:

```typescript
type Estado = "activo" | "pausado" | "archivado";

// Una etiqueta legible por cada estado posible
const etiquetas: Record<Estado, string> = {
  activo: "Activo",
  pausado: "En pausa",
  archivado: "Archivado",
};
```

> ### 🔎 En tu código — Faro
> En `Faro`, los proyectos tienen un **estado** (`activo`, `en pausa`, etc.). Un `Record<Estado,
> string>` como el de arriba es perfecto para mapear cada estado a su texto o a su color de
> insignia en la interfaz, y TypeScript te obliga a **cubrir todos los estados**: si olvidas uno,
> error. Cuando agregas un estado nuevo a la unión, te avisa en cada `Record` que faltó.

### 2.6 `Readonly<T>` — "solo lectura"

> ### 🟦 ¿Qué significa? — *`Readonly<T>`*
> `Readonly` ("solo lectura") toma un tipo y marca **todas sus propiedades como inmutables**: una
> vez creado el objeto, TypeScript **no te deja reasignar** ninguna propiedad. Sirve para datos que
> no deberían cambiar después de crearse, como la configuración o las props que llegan a un
> componente.

```typescript
const habito: Readonly<Habito> = obtenerHabito();
habito.nombre = "Otro"; // ❌ Error: no se puede asignar, es de solo lectura
```

> ### ⚠️ Cuidado — Es una protección de tipos, no del dato real
> `Readonly` solo actúa **mientras escribes** (en la fase de tipos). En el JavaScript final el
> objeto sigue siendo modificable; nadie lo "congela" de verdad. Es un seguro contra errores
> tuyos al programar, no una cerradura en tiempo de ejecución. Para eso último existe
> `Object.freeze()`, que es otra cosa.

---

## 3. Intersección: combinar tipos con `&`

> ### 🟦 ¿Qué significa? — *Intersección (`A & B`)*
> La **intersección** combina dos (o más) tipos en uno solo que tiene **todas las propiedades de
> ambos a la vez**. Se escribe con el signo `&` ("y"). Un valor de tipo `A & B` debe cumplir lo de
> `A` **y** lo de `B`.

Ojo con la intuición: aunque `&` se lee "y", el resultado es un objeto **más grande** (suma de
campos), no más pequeño. Es como pegar dos fichas en una.

```typescript
interface Identificable {
  id: string;
}

interface DatosHabito {
  nombre: string;
  color: string;
}

// Un objeto que tiene id + nombre + color, todo junto
type Habito = Identificable & DatosHabito;

const h: Habito = { id: "h1", nombre: "Leer", color: "azul" }; // ✅
```

> ### 💡 Tip — `&` para props de React
> En React (Módulo 06) verás mucho la intersección para **props**. Por ejemplo, combinar tus
> propias props con las de un botón HTML estándar: `type Props = MisProps &
> React.ButtonHTMLAttributes<HTMLButtonElement>`. Así tu componente acepta tanto tus campos como
> todos los atributos normales de un `<button>`. No te asustes cuando lo veas: es solo "esto **y**
> aquello".

> ### ⚠️ Cuidado — No confundas `&` con `|`
> Ya viste la **unión** `|` ("o") en el capítulo 03: `string | number` es "texto **o** número".
> La **intersección** `&` ("y") es lo contrario: junta. `A | B` = "uno de los dos"; `A & B` =
> "los dos a la vez". Bit lo recuerda así: la barra `|` divide, el `&` ("ampersand") amontona.

---

## 4. `keyof`: las claves de un tipo como valores

> ### 🟦 ¿Qué significa? — *`keyof T`*
> `keyof` toma un tipo de objeto y devuelve una **unión de texto con los nombres de sus
> propiedades** (sus "llaves"). Si `Habito` tiene `id`, `nombre` y `color`, entonces `keyof
> Habito` es el tipo `"id" | "nombre" | "color"`. Sirve para escribir funciones que reciben "el
> **nombre** de un campo" y garantizar que sea uno que existe de verdad.

```typescript
interface Habito {
  id: string;
  nombre: string;
  color: string;
}

type ClaveHabito = keyof Habito; // "id" | "nombre" | "color"

const campo: ClaveHabito = "nombre"; // ✅
const malo: ClaveHabito = "precio";  // ❌ "precio" no es una clave de Habito
```

El gran valor de `keyof` es que si **renombras** un campo en la interface, la unión cambia sola.
Nunca quedan "nombres mágicos" escritos a mano que apuntan a campos que ya no existen.

---

## 5. Indexar tipos: `T[K]`, el tipo de un campo concreto

> ### 🟦 ¿Qué significa? — *Indexar un tipo (`T[K]`)*
> Igual que en JavaScript accedes al **valor** de una propiedad con `objeto["campo"]`, en
> TypeScript accedes al **tipo** de una propiedad con `Tipo["campo"]`. Es "dame el tipo que tiene
> ese campo dentro de aquel tipo". Se llama *indexed access* (acceso indexado).

```typescript
interface Habito {
  id: string;
  nombre: string;
  veces: number;
}

type TipoDelId = Habito["id"];       // string
type TipoDeVeces = Habito["veces"];  // number
```

Esto evita repetir tipos: si el `id` cambiara de `string` a `number`, `TipoDelId` cambiaría con
él. Combinado con `keyof`, es la base de funciones genéricas muy potentes:

```typescript
// Lee un campo cualquiera de un objeto y devuelve EXACTAMENTE su tipo
function leerCampo<T, K extends keyof T>(objeto: T, campo: K): T[K] {
  return objeto[campo];
}

const h: Habito = { id: "h1", nombre: "Leer", veces: 3 };
const n = leerCampo(h, "nombre"); // TypeScript sabe que n es string
const v = leerCampo(h, "veces");  // y que v es number
```

> ### 💡 Tip — Léelo despacio, no lo memorices
> `K extends keyof T` significa "`K` es **alguna de las claves** de `T`". Y `T[K]` es "el tipo de
> esa clave". Junto: "dame un campo que exista en el objeto y te devuelvo su tipo exacto". No
> necesitas escribir funciones así todavía; basta con **entender** la idea cuando la leas en
> código de librerías o de tus apps.

---

## 6. `typeof` a nivel de tipo: del valor al tipo

> ### 🟦 ¿Qué significa? — *`typeof` (a nivel de tipo)*
> En JavaScript ya conociste `typeof valor`, que en tiempo de ejecución devuelve un **texto** como
> `"string"`. En TypeScript existe **otro** `typeof`, que se usa **en posición de tipo** y hace
> algo distinto: toma una **variable** y te da **su tipo**. Sirve para no escribir un tipo a mano
> cuando ya tienes un valor de ejemplo.

```typescript
// Un objeto de configuración por defecto
const configPorDefecto = {
  tema: "claro",
  notificaciones: true,
  maxHabitos: 20,
};

// En vez de escribir la interface a mano, la derivo del objeto:
type Config = typeof configPorDefecto;
// Config = { tema: string; notificaciones: boolean; maxHabitos: number }
```

> ### 🔎 En tu código — Faro y constantes compartidas
> En `Faro` es común tener un objeto con **constantes** (por ejemplo, los nombres de las fuentes:
> GitHub, Google Drive) y derivar su tipo con `typeof` en lugar de duplicarlo. Así el objeto real
> y su tipo nunca se desincronizan: el tipo **es** un reflejo del valor.

> ### ⚠️ Cuidado — Son dos `typeof` distintos
> `typeof` dentro de una expresión normal (un `if`, una variable) es el de JavaScript y devuelve
> texto. `typeof` dentro de un `type ... =` o de una anotación es el de TypeScript y devuelve un
> **tipo**. Mismo nombre, contextos distintos. Si estás "del lado de los tipos" (después de `:` o
> en un `type`), es el segundo.

---

## 7. Alias de tipo reutilizables: ponle nombre a tus combinaciones

> ### 🟦 ¿Qué significa? — *Alias de tipo*
> Un **alias de tipo** es simplemente darle un **nombre** a un tipo con la palabra `type`, para
> poder reutilizarlo. Ya lo viste en el capítulo 03, pero ahora cobra sentido: cuando empiezas a
> combinar utilitarios, intersecciones y `keyof`, los tipos se vuelven largos. Un alias los
> guarda bajo un nombre claro y los reutilizas en todo el proyecto.

```typescript
// Sin alias: ilegible y repetido en cada función
function guardar(h: Omit<Habito, "id" | "user_id" | "creado_en">) { /* ... */ }

// Con alias: claro y reutilizable
type NuevoHabito = Omit<Habito, "id" | "user_id" | "creado_en">;

function guardar(h: NuevoHabito) { /* ... */ }
function validar(h: NuevoHabito) { /* ... */ }
```

> ### 🔎 En tu código — RachaSimple y Faro
> Tanto `RachaSimple` (en sus archivos de `src/types/`) como `Faro` definen **un puñado de tipos
> base** y, a partir de ellos, una familia de alias: el tipo de la fila en la base de datos, el
> tipo "para insertar" (sin `id`), el tipo "para actualizar" (`Partial`), el tipo "resumido para
> la lista" (`Pick`). Todos cuelgan del mismo origen. Por eso cambiar un campo en el modelo se
> propaga a toda la app sin cacería de errores manual.

> ### 💡 Tip — Supabase genera tipos por ti
> En proyectos con `Supabase` (RachaSimple y Faro) hay una herramienta que **lee tu base de
> datos** y genera un archivo de tipos automáticamente (algo como `database.types.ts`). De ahí
> sale el tipo base de cada tabla, y tú aplicas `Pick`, `Omit` y `Partial` encima. Es la forma más
> pura de "una sola fuente de la verdad": la verdad es la **base de datos**, y los tipos la
> reflejan sin que escribas nada a mano.

---

## 8. Todo junto: un caso real

Veamos cómo encajan estas piezas para modelar un hábito en una app como RachaSimple, partiendo de
**un solo** tipo base:

```typescript
// 1. El tipo base (idealmente generado desde Supabase)
interface Habito {
  id: string;
  user_id: string;
  nombre: string;
  color: string;
  creado_en: string;
}

// 2. Para CREAR: sin los campos que pone el sistema
type NuevoHabito = Omit<Habito, "id" | "user_id" | "creado_en">;

// 3. Para ACTUALIZAR: cualquier subconjunto de los campos editables
type CambiosHabito = Partial<NuevoHabito>;

// 4. Para la LISTA: solo lo que se muestra en pantalla
type HabitoEnLista = Pick<Habito, "id" | "nombre" | "color">;

// 5. Para ORDENAR: el nombre de una columna válida
type ColumnaHabito = keyof Habito; // "id" | "user_id" | "nombre" | ...
```

Cinco tipos, una sola fuente. Si agregas `icono` a `Habito`, `NuevoHabito` lo pide,
`CambiosHabito` lo permite y `ColumnaHabito` lo incluye, **todo automáticamente**. Eso es derivar
tipos sin repetir. Bit aplaude con sus cuatro patitas.

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Entiendo qué es un **tipo utilitario** y que viene incluido en TypeScript.
- [ ] Sé para qué sirven `Partial`, `Required`, `Pick`, `Omit`, `Record` y `Readonly`.
- [ ] Distingo la **intersección** `&` ("los dos a la vez") de la **unión** `|` ("uno u otro").
- [ ] Sé que `keyof T` da la **unión de los nombres** de las propiedades de un tipo.
- [ ] Entiendo `T[K]` como "el **tipo** del campo `K` dentro de `T`".
- [ ] Reconozco el `typeof` **a nivel de tipo** (deriva un tipo desde una variable).
- [ ] Uso **alias** (`type`) para nombrar y reutilizar tipos derivados.
- [ ] Comprendo por qué derivar tipos = **una sola fuente de la verdad**.

---

## 🧪 Ejercicios

1. **Elige la herramienta.** Para cada caso, di qué utilitario usarías: (a) un objeto para
   *editar* un producto donde todos los campos son opcionales; (b) un tipo con *solo* `nombre` y
   `precio` de una interface más grande; (c) un diccionario de `string` a `number`.

2. **💻 Deriva con `Omit`.** Dada `interface Usuario { id: string; email: string; password: string;
   creado_en: string }`, crea un alias `UsuarioPublico` que sea `Usuario` **sin** `password` ni
   `creado_en`. Comprueba en el editor que el tipo resultante es el esperado.

3. **💻 `Partial` para actualizar.** Escribe una función `actualizarUsuario(id: string, cambios:
   ___)` cuyo segundo parámetro acepte **cualquier subconjunto** de los campos de `UsuarioPublico`.
   Llámala pasando solo `{ email: "nuevo@correo.com" }`.

4. **💻 `Record` con claves fijas.** Crea un tipo `Estado = "activo" | "pausado" | "archivado"` y
   un objeto `colores: Record<Estado, string>` que asigne un color a cada estado. Borra una de las
   tres claves y observa el error que aparece.

5. **`keyof` a mano.** Si `interface Proyecto { id: string; nombre: string; progreso: number }`,
   ¿qué tipo exacto es `keyof Proyecto`? Escríbelo.

6. **💻 `typeof` de un objeto.** Crea un objeto `const ajustes = { idioma: "es", oscuro: true }` y
   un alias `type Ajustes = typeof ajustes`. Pasa el cursor por encima de `Ajustes` en el editor y
   anota qué tipo infirió TypeScript.

---

🎉 Con esto sabes **derivar** tipos en vez de repetirlos: la marca de un código TypeScript maduro,
como el de RachaSimple y Faro. En el siguiente módulo todo esto se vuelve indispensable: en
**React**, las props de los componentes y los hooks tipados se apoyan constantemente en `Pick`,
`Omit`, intersecciones y `keyof`.

➡️ Siguiente módulo: **[06 — React](../06-react/README.md)** *(en preparación)*.
