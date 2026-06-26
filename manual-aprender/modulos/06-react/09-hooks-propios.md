# Capítulo 09 — Hooks personalizados

<p align="center">
  <img src="../../recursos/imagenes/06-react/cap09.png" alt="Ilustración del capítulo (pixel art con Bit)" width="640">
</p>


> Ya manejas los hooks que vienen con React: `useState`, `useEffect`, `useContext`.
> Ahora toca el salto grande: **fabricar los tuyos**. Vas a aprender a coger esa lógica que se
> repite por media app —pedir datos, saber quién está conectado, guardar un hábito— y
> encerrarla en una función reutilizable cuyo nombre empieza por `use`. Así, exactamente así,
> están armados RachaSimple y Faro por dentro. Bit, nuestro ajolote, ya tiene el frasco listo
> para guardar lógica.

---

## 1. El problema: lógica que se repite

Pongamos que en RachaSimple hay cinco componentes que necesitan la lista de hábitos del
usuario. Cada uno tendría que pedir los datos a Supabase, llevar un estado de "cargando",
manejar el error por si algo falla y volver a pedir cuando los datos cambien. Es bastante
código, y copiarlo cinco veces se convierte en un problema: el día que arregles un fallo en
uno, tienes que acordarte de arreglarlo también en los otros cuatro.

React tiene una respuesta con nombre propio para esto: el **hook personalizado**.

> ### 🟦 ¿Qué significa? — *Hook personalizado (custom hook)*
> Un **hook personalizado** es una función que escribes tú, cuyo nombre empieza por `use`, y
> que por dentro usa otros hooks (`useState`, `useEffect`, `useQuery`...). Su razón de ser es
> **empaquetar lógica reutilizable** para compartirla entre varios componentes sin andar
> copiando y pegando. En RachaSimple, el archivo `src/hooks/useHabits.ts` es un hook
> personalizado: cualquier componente que quiera la lista de hábitos solo llama `useHabits()`
> y listo.

La diferencia que conviene fijar: un componente sirve para **dibujar** interfaz; un hook
personalizado sirve para **compartir lógica** (datos, cálculos, conexiones). No dibuja nada.
Devuelve información y funciones para que el componente las use a su gusto.

> ### 💡 Tip
> Si te pillas copiando el mismo bloque de `useState` + `useEffect` en dos componentes, esa es
> la señal de "aquí cabe un hook personalizado". No lo extraigas a la primera copia; espera a
> la segunda o la tercera, que es cuando de verdad lo necesitas.

---

## 2. La convención `use*`: por qué el nombre importa

Tu hook personalizado **tiene que** empezar por `use`. No es manía estética: React lee los
nombres para aplicar sus reglas.

> ### 🟦 ¿Qué significa? — *Convención `use*`*
> Es la **regla de nombrado** de los hooks: toda función que use hooks por dentro debe llamarse
> `useAlgo` (`useHabits`, `useAuth`, `useCheckins`). React y las herramientas de análisis (el
> linter) se fijan en ese prefijo para saber que ahí dentro hay hooks y comprobar que los
> llamas como toca. Si bautizaras la función `getHabits` en lugar de `useHabits`, React no la
> trataría como hook y podrías saltarte las reglas sin que nadie te avisara.

> ### ⚠️ Cuidado — Las reglas de los hooks siguen vigentes
> Un hook personalizado es un hook de verdad, así que arrastra las dos reglas que ya conoces:
> 1. Se llama **siempre arriba** del componente, nunca dentro de un `if`, un bucle o una
>    función anidada.
> 2. Solo se usa **dentro de componentes o dentro de otros hooks**.
> Por eso `useHabits()` no puede ir dentro de un `onClick`, por ejemplo. Si necesitas datos en
> un evento, llamas el hook arriba y usas su resultado dentro del evento.

> ### 🔎 En tu código
> Echa un ojo a los nombres reales de RachaSimple: `useHabits`, `useActiveHabits`, `useHabit`,
> `useCheckins`, `useUpsertCheckin`, `useAuth`, `useI18n`. Todos empiezan por `use`. Ningún
> archivo de hooks se sale de la convención: es la firma visual de "esto comparte lógica".

---

## 3. Tu primer hook personalizado, paso a paso

Vamos a construir uno sencillo desde cero, sin librerías, para que veas el esqueleto. Será un
hook que guarda un contador; la mecánica es idéntica para cosas más serias.

```tsx
import { useState } from 'react';

// Un hook personalizado: empieza por "use" y usa otros hooks por dentro.
export function useContador(inicial: number) {
  const [valor, setValor] = useState(inicial);

  const subir = () => setValor((v) => v + 1);
  const bajar = () => setValor((v) => v - 1);
  const reiniciar = () => setValor(inicial);

  // Devuelve el dato y las funciones para tocarlo.
  return { valor, subir, bajar, reiniciar };
}
```

Y así lo usa un componente:

```tsx
function Marcador() {
  const { valor, subir, bajar, reiniciar } = useContador(0);

  return (
    <div>
      <p>Llevas {valor}</p>
      <button onClick={subir}>+1</button>
      <button onClick={bajar}>-1</button>
      <button onClick={reiniciar}>Reiniciar</button>
    </div>
  );
}
```

Fíjate en lo que pasó: el componente `Marcador` **no tiene** ni un `useState` a la vista. Toda
esa lógica vive dentro de `useContador`. Si mañana quieres otro marcador en otra pantalla,
llamas `useContador(10)` y ya está, sin copiar nada.

> ### 🟦 ¿Qué significa? — *Extraer lógica*
> **Extraer** es sacar un trozo de código del sitio donde estaba mezclado y ponerlo en su
> propia función con nombre, para reutilizarlo y leerlo mejor. Cuando mueves el `useState` y
> las funciones del componente hacia `useContador`, estás "extrayendo lógica a un hook". El
> componente se queda limpio: solo se ocupa de dibujar.

> ### 💡 Tip
> Cada vez que **llamas** un hook personalizado, obtienes un estado **independiente**. Si en
> una pantalla pones `useContador(0)` dos veces, son dos contadores separados; no comparten el
> número. Un hook es una receta, no una caja única compartida.

---

## 4. Qué devuelve un hook: valores y funciones

Un hook personalizado puede devolver lo que quieras. Lo habitual son dos estilos:

- **Un objeto** (`{ valor, subir, bajar }`): cuando devuelves varias cosas con nombre. Es lo
  más legible y lo que más se ve en RachaSimple y Faro.
- **Un array** (`[valor, setValor]`): cuando son pocas cosas y prefieres elegir el nombre al
  recibirlas. Es el estilo de `useState`, que devuelve `[estado, setEstado]`.

> ### 🟦 ¿Qué significa? — *Valor de retorno (return)*
> El **valor de retorno** es lo que la función entrega cuando termina, con la palabra `return`.
> En un hook, ese retorno es el "menú" que le ofreces al componente: los datos que puede leer y
> las funciones que puede llamar. Tú decides qué sacas a la luz y qué dejas escondido dentro
> del hook.

> ### 💡 Tip — Objeto vs array
> Devuelve un **objeto** cuando hay tres o más cosas, o cuando algunas son opcionales: así el
> componente toma solo lo que necesita (`const { valor } = useContador(0)`) y le da igual el
> orden. Guarda el **array** para pares como `[estado, setEstado]`, donde el orden canta solo.

Un detalle que importa: las funciones que devuelves (como `subir`) son las que el componente
pondrá en un `onClick`. Por eso el hook resulta tan cómodo: te da el **dato** para mostrar y la
**acción** para cambiarlo, todo en el mismo paquete.

---

## 5. Caso real: `useAuth` en RachaSimple

El hook más pequeño y elegante de RachaSimple vive en `src/auth/useAuth.ts`. Su trabajo es
darte el usuario que está conectado, leyéndolo del contexto de autenticación (ese `Context`
que viste en el capítulo anterior). Este es el código **real**, entero:

```tsx
import { useContext } from 'react';
import { AuthContext } from './AuthContext';

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
```

Ocho líneas. Y, aun así, hace dos cosas que valen oro:

1. **Esconde** el `useContext(AuthContext)`. Los componentes no tienen que saber qué contexto
   leer ni importarlo; solo llaman `useAuth()`.
2. **Protege** con un error claro. Si alguien usa `useAuth()` fuera del `AuthProvider`, en vez
   de toparse con un fallo confuso recibe el mensaje "useAuth must be used within an
   AuthProvider".

> ### 🟦 ¿Qué significa? — *Encapsular*
> **Encapsular** es esconder los detalles internos de algo detrás de una interfaz simple. Quien
> usa `useAuth()` no sabe (ni le importa) que por dentro hay un `useContext` y una comprobación
> de error: solo recibe el usuario. Si mañana cambias cómo guardas la sesión, tocas un único
> archivo y nadie más se entera. Eso es encapsular.

> ### 🔎 En tu código
> En RachaSimple, `useHabits.ts` y `useCheckins.ts` llaman `useAuth()` por dentro para saber de
> quién son los hábitos: `const { user } = useAuth();`. Así, un hook usa a otro hook. Y eso te
> deja en la puerta de la siguiente idea: componer hooks.

---

## 6. Componer hooks: un hook que usa otros hooks

Aquí está lo bueno. Como un hook personalizado puede usar hooks por dentro, también puede usar
**otros hooks personalizados tuyos**. A eso se le llama **componer**.

> ### 🟦 ¿Qué significa? — *Componer hooks*
> **Componer** es construir un hook usando otros hooks como piezas. Igual que montas un mueble
> con tornillos y tablas ya fabricados, montas `useHabits` con `useQuery` (de TanStack Query) y
> `useAuth` (tuyo) por dentro. Cada pieza hace una cosa; al juntarlas obtienes algo más grande
> sin reinventar lo de abajo. En RachaSimple, `useCreateHabit` compone `useAuth`, `useMutation`
> y `useQueryClient`.

Mira `useCreateHabit`, el hook **real** de RachaSimple que crea un hábito nuevo:

```tsx
export function useCreateHabit() {
  const qc = useQueryClient();         // pieza 1: el "cliente" de la caché de datos
  const { user } = useAuth();          // pieza 2: tu hook, para saber quién está conectado
  return useMutation({                 // pieza 3: hook de TanStack Query para "escribir" datos
    mutationFn: (input: NewHabit) => {
      if (!user) throw new Error('Not authenticated');
      return habitsRepo.create(user.id, input);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  });
}
```

Tres hooks distintos trabajando juntos dentro de uno. El componente que crea un hábito no ve
nada de este lío: solo llama `useCreateHabit()` y obtiene una función para guardar.

> ### 🟦 ¿Qué significa? — *TanStack Query (`useQuery` / `useMutation`)*
> **TanStack Query** es una librería que RachaSimple usa para pedir y guardar datos del
> servidor. Trae sus propios hooks: `useQuery` (para **leer** datos, como la lista de hábitos)
> y `useMutation` (para **escribir**: crear, editar, borrar). Ella sola se encarga del estado
> de "cargando", de los errores y de recordar los datos. RachaSimple no la usa a pelo en sus
> componentes: la envuelve en hooks propios como `useHabits` y `useCreateHabit`.

> ### 🟦 ¿Qué significa? — *`queryKey` e `invalidateQueries`*
> La **`queryKey`** (en RachaSimple, `const KEY = ['habits']`) es la **etiqueta** que identifica
> un conjunto de datos en la caché. **`invalidateQueries`** le dice a TanStack Query "estos
> datos quedaron viejos, vuelve a pedirlos". Por eso, tras crear un hábito, `onSuccess` invalida
> la clave `['habits']`: así la lista se refresca sola en toda la app sin que tú muevas un dedo.

---

## 7. Caso real: la familia `useHabits` de RachaSimple

El archivo `src/hooks/useHabits.ts` no guarda un solo hook: guarda **una familia** de hooks
pequeños, cada uno con su tarea bien definida. Estos son los de **lectura** (versión real):

```tsx
const KEY = ['habits'] as const;

export function useHabits() {
  return useQuery({ queryKey: KEY, queryFn: () => habitsRepo.listAll() });
}

export function useActiveHabits() {
  return useQuery({ queryKey: [...KEY, 'active'], queryFn: () => habitsRepo.listActive() });
}

export function useHabit(id: string | undefined) {
  return useQuery({
    queryKey: [...KEY, id],
    queryFn: () => habitsRepo.getById(id!),
    enabled: !!id,
  });
}
```

En `useCheckins.ts` se repite el mismo patrón para los registros diarios: `useCheckins`,
`useCheckinsByDate`, `useCheckinsForHabit`, `useUpsertCheckin`. La lección de diseño es esta:
**muchos hooks pequeños y enfocados** rinden mejor que uno gigante que pretende hacerlo todo.

> ### 🟦 ¿Qué significa? — *`queryFn` y la capa de repositorios (`habitsRepo`)*
> La **`queryFn`** es la función que de verdad va a buscar los datos. Fíjate en que no lleva SQL
> ni llamadas a Supabase a la vista: llama a `habitsRepo.listAll()`. Ese `habitsRepo` es la
> **capa de repositorios**, otro archivo que guarda toda la conversación con la base de datos.
> Así el hook se ocupa de la lógica de React (caché, recarga) y el repositorio se ocupa de los
> datos. Cada cosa en su sitio.

> ### 💡 Tip — Un hook, una responsabilidad
> `useHabit(id)` recibe un `id` y trae **un** hábito; `enabled: !!id` significa "no pidas nada
> si todavía no hay id". Esa precisión es justo lo que hace reutilizable un hook: hace una cosa,
> la hace bien, y el componente elige cuál de la familia necesita.

> ### ⚠️ Cuidado — No metas dibujo dentro de un hook
> Un hook personalizado **no devuelve JSX**. Si te ves escribiendo `return <div>...` dentro de
> un `useAlgo`, eso ya no es un hook: es un componente. Los hooks devuelven datos y funciones;
> los componentes devuelven interfaz. No borres esa línea.

---

## 8. Cómo lo usa el componente (lo bonito del resultado)

Después de todo el trabajo de los apartados anteriores, así de simple queda un componente que
muestra y crea hábitos en RachaSimple (versión ilustrativa, basada en sus hooks reales):

```tsx
function PantallaHabitos() {
  const { data: habitos, isLoading } = useHabits();
  const crear = useCreateHabit();

  if (isLoading) return <p>Cargando...</p>;

  return (
    <div>
      <ul>
        {habitos?.map((h) => <li key={h.id}>{h.name}</li>)}
      </ul>
      <button onClick={() => crear.mutate({ name: 'Beber agua' })}>
        Añadir hábito
      </button>
    </div>
  );
}
```

Cero `useEffect`, cero estado de "cargando" hecho a mano, cero llamadas a Supabase. Toda esa
complejidad vive en los hooks. El componente se lee casi como una frase suelta: "trae los
hábitos, si están cargando muéstrame 'Cargando', si no píntalos, y este botón crea uno". Esa
claridad es el premio de los hooks personalizados.

> ### 🟦 ¿Qué significa? — *`data`, `isLoading` y `.mutate()`*
> Cuando llamas un hook de TanStack Query obtienes un objeto con campos ya servidos: **`data`**
> son los datos cargados (aquí, los hábitos) y **`isLoading`** es `true` mientras llegan. En las
> mutaciones, **`.mutate(...)`** es la función que dispara la acción (crear el hábito). Esos
> nombres no los programaste tú: vienen de la librería, y tus hooks te los pasan tal cual.

> ### 🔎 En tu código
> Faro (Next.js 15 + React 19) va por el mismo camino: encierra su lógica de análisis de
> proyectos en módulos propios para que los componentes `.tsx` se dediquen a mostrar la
> descripción, el progreso y el roadmap, y no a hablar con OpenAI o Supabase. Mismo principio
> que RachaSimple: el componente dibuja, el hook o el servicio piensa.

---

## 9. ¿React o algo más sencillo? Saber cuándo NO usar un hook

No todo merece un hook, ni toda app es React. PolyPaw está hecho en Python con Flet, y
tunal-digital es HTML/CSS/JavaScript puro: ahí los hooks ni existen. Y dentro de React, una
lógica que **no usa otros hooks** (un cálculo simple, por ejemplo "sumar dos números") no
necesita ser un hook: con una función normal te basta y te sobra.

> ### ⚠️ Cuidado — Un hook solo si usa hooks
> La regla práctica: crea un hook personalizado **únicamente** si por dentro vas a usar
> `useState`, `useEffect`, `useContext`, `useQuery` u otro hook. Si tu función solo recibe datos
> y devuelve datos sin tocar estado de React, hazla **función normal** (sin el prefijo `use`) y
> guárdala en un archivo de utilidades. Reservar `use` para lo que de verdad es un hook te
> ahorra confundir a React y a tu yo del futuro.

> ### 💡 Tip
> Bit lo resume así: *"si tu lógica necesita memoria de React o efectos, frasco con etiqueta
> `use`; si es solo un cálculo, una función normal y a otra cosa"*.

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Explico con mis palabras qué es un hook personalizado y para qué sirve.
- [ ] Sé por qué su nombre **tiene que** empezar por `use`.
- [ ] Distingo un hook (comparte lógica, devuelve datos y funciones) de un componente (dibuja, devuelve JSX).
- [ ] Sé crear un hook simple con `useState` por dentro y devolver un objeto con valor y funciones.
- [ ] Entiendo la diferencia entre devolver un objeto y devolver un array, y cuándo usar cada uno.
- [ ] Reconozco en `useAuth` de RachaSimple cómo un hook **encapsula** y protege con un error.
- [ ] Entiendo qué es **componer** hooks y veo cómo `useCreateHabit` usa `useAuth`, `useMutation` y `useQueryClient`.
- [ ] Sé por qué RachaSimple prefiere muchos hooks pequeños (`useHabits`, `useHabit`, `useActiveHabits`) a uno gigante.
- [ ] Tengo claro cuándo NO hacer un hook (lógica sin hooks dentro = función normal).

---

## 🧪 Ejercicios

1. **En papel.** Define con tus palabras "hook personalizado" y escribe tres razones por las
   que RachaSimple extrae su lógica de datos a archivos como `useHabits.ts` en vez de ponerla
   dentro de cada componente.

2. **En papel.** Mira el `useAuth` real (las 8 líneas del apartado 5) y señala: ¿qué hook de
   React usa por dentro? ¿Qué pasaría si quitaras la línea del `throw new Error`? ¿Por qué ese
   error es de ayuda para quien programa?

3. 💻 **Crea `useContador`.** Escribe el hook `useContador` del apartado 3 y un componente
   `Marcador` que lo use. Comprueba en pantalla que `+1`, `-1` y `Reiniciar` funcionan. Luego
   pon **dos** `<Marcador />` en la pantalla y confirma que cada uno lleva su propia cuenta.

4. 💻 **Hook `useToggle`.** Crea un hook `useToggle(inicial: boolean)` que guarde un valor
   verdadero/falso con `useState` y devuelva `{ activo, alternar }`, donde `alternar` cambia
   `activo` de `true` a `false` y al revés. Úsalo en un componente para mostrar/ocultar un
   párrafo con un botón.

5. 💻 **Devuelve un array.** Reescribe `useToggle` para que devuelva un **array**
   `[activo, alternar]` al estilo de `useState`, en vez de un objeto. Úsalo así:
   `const [visible, alternarVisible] = useToggle(false)`. Anota qué versión te parece más clara
   y por qué.

6. 💻 **Componer (reto).** Sin librerías, crea un hook `useSaludo()` que por dentro use tu
   `useContador` y devuelva un texto: `{ mensaje, saludarMas }`, donde `mensaje` sea
   `Hola x${valor}` y `saludarMas` suba el contador. Esto te hace **componer** un hook propio
   dentro de otro, igual que `useCreateHabit` compone `useAuth` en RachaSimple.

---

> Cierre de Bit: *los hooks personalizados son frascos con etiqueta. Cada vez que veas la misma
> lógica repetida, échala en un frasco que empiece por `use`, ponle nombre claro, y deja que tus
> componentes solo dibujen. Así están hechos RachaSimple y Faro por dentro, y así de ordenada
> quedará tu app.* 🪼
