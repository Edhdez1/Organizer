# Capítulo 08 — useEffect a fondo

<p align="center">
  <img src="../../recursos/imagenes/06-react/cap08.png" alt="Ilustración del capítulo (pixel art con Bit)" width="640">
</p>


> En el Capítulo 05 viste `useEffect` por encima, casi de pasada: "ejecuta código como efecto". Ahora
> nos sentamos con calma y lo miramos de verdad. Vas a entender el **ciclo de vida** de un componente,
> el famoso **array de dependencias** (la parte que más asusta y la que peor se explica casi siempre),
> la **función de limpieza**, los **errores clásicos** (bucles infinitos, avisos de dependencias que
> faltan) y, sobre todo, **cuándo NO hace falta `useEffect`**. Todo con código de verdad, sacado de
> RachaSimple y Faro. Bit el ajolote viene contigo: él ya quemó un par de componentes con bucles
> infinitos, así que habla por experiencia. 🦎

---

## 1. Antes de los efectos: el ciclo de vida de un componente

Un componente de React no es una foto fija: **nace, vive y muere**. Ese recorrido es lo que llamamos
ciclo de vida, y entenderlo es ya la mitad de entender `useEffect`.

> ### 🟦 ¿Qué significa? — *Ciclo de vida (lifecycle)*
> El **ciclo de vida** es la secuencia de momentos por los que pasa un componente mientras la app está
> abierta. Tiene tres fases:
> 1. **Montar (mount):** el componente aparece por primera vez en la pantalla.
> 2. **Actualizar (update / re-render):** el componente se vuelve a dibujar porque cambió su estado o
>    sus props.
> 3. **Desmontar (unmount):** el componente desaparece de la pantalla (cambiaste de página, cerraste un
>    panel, etc.).
> Saber esto te dice **cuándo** hacer cada cosa: "carga los datos al montar", "para el temporizador al
> desmontar". En RachaSimple, cuando pasas de la pantalla de hábitos a la de ajustes, el componente de
> hábitos se **desmonta** y el de ajustes se **monta**.

> ### 🟦 ¿Qué significa? — *Render (renderizado)*
> **Renderizar** es que React ejecute tu función-componente para calcular qué interfaz dibujar: el
> `return` con el JSX. Pasa al montar y otra vez cada vez que algo cambia. Y ojo con esto: durante el
> render solo debes *calcular y devolver JSX*; nada de pedir datos ni tocar el navegador. Todo eso —los
> efectos— va aparte, en `useEffect`.

> ### 💡 Tip — Por qué React separa "dibujar" de "efectos"
> React quiere que tu `return` sea **puro**: con los mismos datos, dibuja siempre lo mismo, sin
> sorpresas. Por eso te empuja a sacar las "acciones hacia el mundo exterior" (pedir datos,
> temporizadores, escribir en el navegador) fuera del render, a `useEffect`. Así tu componente es
> predecible y mucho más fácil de probar.

---

## 2. `useEffect`: recordatorio rápido y anatomía

> ### 🟦 ¿Qué significa? — *Efecto secundario (side effect)*
> Un **efecto secundario** es algo que tu componente hace **además** de dibujar y que toca el mundo de
> fuera de React: pedir datos a una API, leer o escribir almacenamiento, poner un `setInterval`,
> suscribirse a un evento, consultar permisos del navegador. "Secundario" no significa poco importante;
> significa "aparte de dibujar".

> ### 🟦 ¿Qué significa? — *`useEffect`*
> `useEffect` es el hook que **ejecuta una función después** de que el componente se dibuja. Su forma es
> esta:
> ```tsx
> useEffect(() => {
>   // 1) el efecto: tu código que toca el mundo exterior
>   return () => {
>     // 2) la limpieza (opcional): deshacer lo del efecto
>   };
> }, [/* 3) array de dependencias */]);
> ```
> Son **tres piezas**: la función-efecto, una función de limpieza opcional que ella misma devuelve, y el
> array de dependencias. Vamos a verlas una por una.

Aquí lo tienes en RachaSimple, en `src/components/racha/ReminderCard.tsx` (la tarjeta de recordatorios),
en versión simplificada:

```tsx
import { useEffect, useState } from "react";

function ReminderCard() {
  const [permission, setPermission] = useState("default");

  useEffect(() => {
    setPermission(getReminderPermission()); // leer permiso del navegador
    setPushSupport(detectPushSupport());     // ver si el navegador soporta push
  }, []); // [] = solo al montar

  // …resto del componente…
}
```

> ### 🔎 En tu código
> Ese efecto es de manual: lee algo del navegador (los permisos de notificación) **una vez, al montar la
> tarjeta**, y guarda el resultado en estado. No puedes hacerlo durante el render porque "leer permisos
> del navegador" es un efecto secundario. Por eso vive dentro de `useEffect`.

---

## 3. El array de dependencias, despacio

Esta es la pieza que más confunde a quien empieza. Vamos con mucha calma, porque entenderla bien te
ahorra horas peleando con bugs.

> ### 🟦 ¿Qué significa? — *Array de dependencias*
> El **array de dependencias** es el segundo argumento de `useEffect`. Es una lista de valores con la que
> le dices a React: *"vuelve a ejecutar el efecto solo cuando alguno de estos valores cambie"*. React
> compara esos valores entre un render y el siguiente; si todos siguen iguales, **no** repite el efecto.

Hay exactamente **tres casos**, y conviene tenerlos grabados:

> ### 🟦 ¿Qué significa? — *Los tres casos del array*
> 1. **`[]` (array vacío):** el efecto se ejecuta **una sola vez**, al montar. Nunca se repite. Es el
>    caso más común: "carga datos al abrir la pantalla".
> 2. **`[valor]` (con dependencias):** el efecto se ejecuta al montar **y** cada vez que `valor` cambie.
>    Por ejemplo: "cuando cambie el `userId`, vuelve a cargar su perfil".
> 3. **Sin array (lo omites):** el efecto se ejecuta **después de cada render**. Casi nunca es lo que
>    quieres y suele ser síntoma de un error. Evítalo salvo que sepas muy bien lo que haces.

Veámoslos los tres con el mismo molde:

```tsx
// CASO 1 — una sola vez, al montar
useEffect(() => {
  cargarHabitos();
}, []);

// CASO 2 — cada vez que cambie 'reminderTime'
useEffect(() => {
  programarRecordatorio(reminderTime);
}, [reminderTime]);

// CASO 3 — tras CADA render (peligroso, casi nunca)
useEffect(() => {
  console.log("me ejecuté otra vez");
}); // <- sin array
```

Y aquí el caso 2 **en la práctica**, en `ReminderCard.tsx` de RachaSimple:

```tsx
useEffect(() => {
  if (profile.data?.reminder_time) setTime(profile.data.reminder_time);
}, [profile.data?.reminder_time]);
```

> ### 🔎 En tu código
> Léelo en voz alta: *"cuando cambie la hora de recordatorio del perfil, copia ese valor al estado local
> `time`"*. La dependencia es `profile.data?.reminder_time`. Si esa hora no cambia entre renders, el
> efecto se queda quieto. Si el usuario edita su hora y el perfil se actualiza, el valor cambia y el
> efecto vuelve a correr para sincronizar. Para **eso** sirve el array.

> ### 💡 Tip — Cómo decidir qué va en el array
> Hay un truco mental muy sencillo: **mira dentro del efecto qué variables del componente usa** (estado,
> props, valores derivados). Todas las que vengan "de fuera" del efecto y puedan cambiar deberían estar
> en el array. Si tu efecto usa `reminderTime`, entonces `reminderTime` va en el array. No adivines: lee
> el cuerpo del efecto y anota lo que toca.

> ### ⚠️ Cuidado — `[]` no significa "ignora todo para siempre"
> Mucha gente pone `[]` para que el efecto "solo corra una vez", aunque dentro use variables que sí
> cambian. Y ahí se esconden los bugs: el efecto se queda con el **primer** valor y no se entera de los
> cambios posteriores (esto se llama *stale closure*, un "valor congelado"). `[]` está bien **solo**
> cuando el efecto no depende de ningún valor que cambie. Si depende de alguno, ponlo en el array.

---

## 4. La función de limpieza (cleanup)

> ### 🟦 ¿Qué significa? — *Función de limpieza (cleanup)*
> La **función de limpieza** es una función que tu efecto **devuelve** (`return () => { … }`). React la
> ejecuta para **deshacer** lo que el efecto montó: parar un temporizador, cancelar una suscripción,
> cerrar una conexión. Se llama en dos momentos: **antes de volver a ejecutar el efecto** (si el array
> cambió) y **al desmontar** el componente.

La regla de oro es preciosa de lo simple que es:

> ### 💡 Tip — La regla "si lo abro, lo cierro"
> Si en el efecto **abres** algo que sigue vivo por su cuenta (un `setInterval`, un `addEventListener`,
> una suscripción a Supabase), tienes que **cerrarlo** en la limpieza. Si tu efecto solo lee un valor y
> guarda estado (como leer permisos), normalmente **no** necesita limpieza. ¿Encendiste algo? Acuérdate
> de apagarlo.

Un ejemplo clásico, un reloj:

```tsx
useEffect(() => {
  const id = setInterval(() => setHora(new Date()), 1000); // abro
  return () => clearInterval(id);                           // cierro
}, []);
```

Un caso real algo más jugoso: en `AuthProvider.tsx` de RachaSimple, el efecto se **suscribe** a los
cambios de sesión de Supabase (login y logout) y usa una bandera para no tocar el estado si el
componente ya desapareció:

```tsx
useEffect(() => {
  let mounted = true; // bandera: ¿sigo en pantalla?

  supabase.auth.getSession().then(({ data }) => {
    if (!mounted) return;        // si ya me desmonté, no toco estado
    setSession(data.session);
    setUser(data.session?.user ?? null);
    setLoading(false);
  });

  const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
    setSession(session);
    setUser(session?.user ?? null);
  });

  return () => {
    mounted = false;          // marco que ya no estoy
    sub.subscription.unsubscribe(); // cierro la suscripción
  };
}, []);
```

> ### 🔎 En tu código
> Fíjate en las dos cosas que deshace la limpieza: pone `mounted = false` (para que una petición que
> vuelve tarde no intente actualizar un componente que ya murió) y llama a `unsubscribe()` (para dejar de
> escuchar los cambios de sesión). Sin esa limpieza, RachaSimple iría acumulando **suscripciones zombi** y
> empezarían a salir avisos del tipo "no puedes actualizar el estado de un componente desmontado". La
> limpieza es justo lo que mantiene la app sana.

> ### ⚠️ Cuidado — Sin limpieza = fuga de memoria
> Una **fuga de memoria (memory leak)** es cuando algo que ya no se usa sigue ocupando recursos. Si abres
> un `setInterval` en cada visita a una pantalla y nunca lo cierras, los intervalos se van apilando y tu
> app se vuelve lenta o empieza a comportarse raro. La limpieza es lo que evita exactamente eso.

---

## 5. Cargar datos al montar (el patrón estrella)

El uso número uno de `useEffect`: **pedir datos cuando la pantalla aparece**. Aquí los tienes a los dos,
RachaSimple y Faro, en acción.

En Faro, `src/components/today-agenda.tsx` (la tarjeta "Hoy te toca…") carga la agenda al montar:

```tsx
import { useEffect, useState } from "react";
import type { AgendaDay, AgendaPlan } from "@/lib/types";

export function TodayAgenda() {
  const [today, setToday] = useState<AgendaDay | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/agenda")
      .then((r) => r.json())
      .then((d) => {
        const plan: AgendaPlan | undefined = d.agenda?.plan;
        if (plan?.days) {
          const iso = new Date().toLocaleDateString("en-CA");
          setToday(plan.days.find((x) => x.date === iso) ?? null);
        }
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []); // una sola vez, al montar
}
```

Reconoce las piezas (todas salen del manual):
- **estado** (`useState`): `today` para el dato, `loaded` para saber si ya terminó.
- **efecto** (`useEffect`): el bloque que pide los datos.
- **petición** (`fetch` del Módulo 03): habla con `/api/agenda`.
- **manejo de error** (`.catch`): si algo falla, no rompe la pantalla.
- **array `[]`**: cargar **una vez**, cuando aparece la tarjeta.

> ### 🟦 ¿Qué significa? — *Bandera de carga (loading flag)*
> Una **bandera de carga** es un booleano de estado (aquí `loaded`) que dice si los datos ya llegaron.
> Sirve para mostrar "Cargando…" mientras esperas y el contenido real cuando termina. Es el patrón con el
> que evitas que la pantalla se vea vacía o rota mientras la red responde.

> ### 🟦 ¿Qué significa? — *Función async dentro del efecto*
> El efecto en sí **no** debe ser `async` (React espera que devuelva una limpieza o nada, no una promesa).
> Por eso, cuando necesitas `await`, declaras una función `async` **dentro** y la llamas:
> ```tsx
> useEffect(() => {
>   async function cargar() {
>     const r = await fetch("/api/agenda");
>     setToday(await r.json());
>   }
>   cargar();
> }, []);
> ```
> Faro lo resuelve con `.then()` en vez de `await`; las dos formas valen igual. Lo único prohibido es
> poner `async` directamente en `useEffect(async () => …)`.

---

## 6. Errores clásicos (y cómo evitarlos)

Aquí es donde Bit lo ha pasado mal. Los tres errores que vas a ver una y otra vez.

### 6.1 El bucle infinito

> ### 🟦 ¿Qué significa? — *Bucle infinito de renders*
> Un **bucle infinito** aparece cuando el efecto **cambia un valor** que está en su **propio array de
> dependencias**. La cosa va así: el efecto corre → cambia el estado → eso re-renderiza → el array cambió
> → el efecto corre otra vez → cambia el estado → … y no para. La app se congela o el navegador protesta.

El error en vivo:

```tsx
// ❌ MAL: el efecto cambia 'count', y 'count' está en el array
const [count, setCount] = useState(0);
useEffect(() => {
  setCount(count + 1); // cambio count...
}, [count]);          // ...y reacciono a count -> ¡bucle infinito!
```

> ### ⚠️ Cuidado — Cómo reconocer un bucle infinito
> Síntomas: la pestaña se traba, el ventilador del portátil despega, o ves miles de `console.log`
> repetidos en cascada. La causa casi siempre es la misma: un `setX` dentro de un efecto cuya dependencia
> es la propia `x`. ¿La solución? O quitas `x` del array (si el efecto no debe reaccionar a `x`), o no
> llamas a `setX` ahí dentro (y, muy probablemente, ni siquiera necesitabas el efecto: lo verás en la
> sección 7).

### 6.2 Dependencias faltantes

> ### 🟦 ¿Qué significa? — *Dependencia faltante (missing dependency)*
> Una **dependencia faltante** es una variable que tu efecto usa pero que **olvidaste** poner en el array.
> El efecto se queda con un valor viejo y no reacciona a los cambios. El linter de React (la regla
> `react-hooks/exhaustive-deps`) te lo avisa con un *warning* amarillo.

```tsx
// ⚠️ El efecto usa 'userId' pero el array está vacío
useEffect(() => {
  cargarPerfil(userId);
}, []); // <- falta userId; el linter te avisa
```

> ### 💡 Tip — Hazle caso al linter, casi siempre
> Cuando salte el aviso "React Hook useEffect has a missing dependency", la respuesta correcta el 95% de
> las veces es **añadir esa dependencia al array**. RachaSimple y Faro tienen el linter activado
> precisamente para cazar estos despistes antes de que lleguen a producción. Silenciar el aviso con un
> comentario `// eslint-disable` debería ser la excepción, no la costumbre.

### 6.3 El efecto que no debía ser efecto

Es el error más sutil de los tres, y lo merece todo, así que le damos su propia sección.

---

## 7. Cuándo NO usar `useEffect`

Mucha gente que empieza mete *todo* dentro de `useEffect`. Y lo curioso es que **buena parte de esos
efectos sobran**. La guía oficial de React tiene un lema para esto: *"You Might Not Need an Effect"*
(puede que no necesites un efecto). Bit lo lleva tatuado. 🦎

> ### ⚠️ Cuidado — Tres casos en los que `useEffect` está de más
> **1) Calcular algo a partir del estado o las props.** Si puedes calcular un valor durante el render,
> hazlo ahí mismo; no lo guardes en un estado aparte sincronizado con un efecto.
> ```tsx
> // ❌ innecesario
> const [completos, setCompletos] = useState(0);
> useEffect(() => {
>   setCompletos(habitos.filter(h => h.hecho).length);
> }, [habitos]);
>
> // ✅ solo calcula al renderizar
> const completos = habitos.filter(h => h.hecho).length;
> ```
> **2) Responder a un evento del usuario.** Si algo pasa *porque el usuario hizo clic*, ponlo en el
> manejador del evento (`onClick`), no en un efecto. Los efectos son para sincronizar con sistemas
> externos, no para reaccionar a clics.
> ```tsx
> // ❌ no uses un efecto para reaccionar a un clic
> // ✅ hazlo en el manejador:
> function onComprar() { registrarCompra(); mostrarGracias(); }
> ```
> **3) Pedir datos del servidor cuando ya usas TanStack Query.** Si tu app tiene `useQuery`, no te montes
> el `useEffect`+`fetch`+`useState` a mano.

> ### 🟦 ¿Qué significa? — *Valor derivado (derived value)*
> Un **valor derivado** es un dato que **se calcula** a partir de otros que ya tienes (estado o props), no
> uno que guardas por separado. "Cuántos hábitos están hechos" se *deriva* de la lista de hábitos. Los
> valores derivados se calculan en el render, **no** necesitan ni `useState` ni `useEffect`. Guardarlos
> aparte es justo lo que crea esos bugs de "se me quedó desactualizado".

> ### 🔎 En tu código
> RachaSimple y Faro casi no traen datos del servidor con `useEffect`+`fetch` a pelo: usan **TanStack
> Query** con hooks como `useQuery`. Por eso, los efectos que sí quedan en RachaSimple son para cosas que
> Query no cubre: leer permisos del navegador, suscribirse a la sesión de Supabase, programar un
> recordatorio local. Eso **sí** es sincronizar con el mundo exterior, que es el trabajo legítimo de
> `useEffect`.

> ### 🟦 ¿Qué significa? — *TanStack Query (`useQuery`)*
> **TanStack Query** es una librería para traer y cachear datos del servidor. Su hook `useQuery` te
> entrega el dato, un `isLoading` y un `error` ya listos, y recarga solo cuando hace falta. Por dentro
> hace el mismo trabajo del `useEffect`+`fetch`+estados, pero mucho mejor (caché, reintentos, recarga
> automática). Si el dato vive en el servidor, prefiere `useQuery` antes que un efecto a mano.

> ### 💡 Tip — La pregunta que lo decide
> Antes de escribir un `useEffect`, hazte una pregunta: **"¿esto sincroniza mi componente con algo de
> fuera de React?"** (la red, el navegador, un temporizador, una suscripción). Si la respuesta es sí →
> efecto. Si es "solo estoy calculando algo" o "solo reacciono a un clic" → **no** es un efecto.

---

## 8. Un repaso visual del flujo

Así viaja un componente con efecto, de principio a fin:

```
MONTAR
  └─ render (calcula JSX)
       └─ useEffect corre  ──► abre cosas / pide datos

ACTUALIZAR (cambió estado o props)
  └─ ¿cambió el array de deps?
       ├─ sí ► limpieza del efecto anterior ──► useEffect corre de nuevo
       └─ no ► no pasa nada con el efecto

DESMONTAR (el componente se va)
  └─ limpieza final ──► cierra cosas / cancela suscripciones
```

Fíjate cómo encaja todo: la **limpieza** corre tanto entre repeticiones (porque el array cambió) como al
final (al desmontar). El **array** decide si hay repetición. El **efecto** hace el trabajo. Tres piezas,
un mismo baile.

> ### 💡 Tip — Lee tus propios efectos así
> Cuando abras un `useEffect` de RachaSimple o Faro, busca las tres piezas en orden: *(1) ¿qué hace el
> cuerpo? (2) ¿devuelve limpieza? (3) ¿qué hay en el array?*. Con esas tres respuestas entiendes cualquier
> efecto, por enrevesado que parezca a primera vista.

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Sé que un componente **monta, actualiza y desmonta**, y qué ocurre en cada fase.
- [ ] Entiendo que el **render** solo calcula JSX, y que los **efectos** van en `useEffect`.
- [ ] Distingo los **tres casos del array de dependencias**: `[]`, `[valor]` y sin array.
- [ ] Sé decidir **qué variables** poner en el array (las que el efecto usa y pueden cambiar).
- [ ] Aplico la regla **"si lo abro, lo cierro"** con la **función de limpieza**.
- [ ] Reconozco el patrón de **cargar datos al montar** (estado + efecto + `fetch` + bandera de carga).
- [ ] Sé qué es un **bucle infinito** y cómo evitarlo (no cambies en el efecto lo que está en su array).
- [ ] Entiendo el aviso de **dependencia faltante** y por qué casi siempre hay que hacerle caso.
- [ ] Sé **cuándo NO usar `useEffect`**: valores derivados, eventos de clic y datos que ya da `useQuery`.

---

## 🧪 Ejercicios

1. **Los tres casos.** Sin mirar, escribe de memoria qué hace `useEffect(fn, [])`,
   `useEffect(fn, [x])` y `useEffect(fn)` (sin array). Explica cada uno con una frase.

2. **Caza el valor derivado.** Tienes `const [n, setN] = useState(0)` y un efecto que hace
   `setN(habitos.length)` con array `[habitos]`. Reescríbelo **sin** efecto y explica por qué la
   versión nueva no puede quedarse desactualizada.

3. **💻 Reproduce un bucle infinito.** En un componente de práctica, escribe a propósito el efecto
   roto de la sección 6.1 (`setCount(count + 1)` con array `[count]`). Abre la consola, observa qué
   pasa y luego arréglalo. Apunta qué viste.

4. **💻 Reloj con limpieza.** Crea un componente `Reloj` con `setInterval` que actualice la hora cada
   segundo y su `clearInterval` en la limpieza. Después **borra** la línea de limpieza, monta y
   desmonta el reloj varias veces y describe qué empieza a fallar.

5. **Lee tu app.** Abre `RachaSimple/src/auth/AuthProvider.tsx` y localiza, en su `useEffect`, las
   tres piezas: el cuerpo, la limpieza y el array. ¿Qué cierra exactamente la limpieza y por qué
   importa?

6. **💻 ¿Efecto o no?** Para cada caso, decide si necesita `useEffect` y justifica: (a) calcular cuántos
   hábitos están hechos; (b) suscribirse a los cambios de sesión de Supabase; (c) mostrar un "gracias"
   al pulsar un botón; (d) cargar la agenda de hoy desde `/api/agenda` al abrir la pantalla.

---

🎉 Con `useEffect` a fondo cierras el corazón de los hooks de React. Ya entiendes el ciclo de vida, el
array de dependencias sin que te dé miedo, la limpieza, los errores que asustan y —lo más valioso de
todo— cuándo un efecto **sobra**. Cuando leas los componentes de RachaSimple y Faro, los efectos dejarán
de parecer magia: vas a ver las tres piezas y a saber exactamente qué hacen. Bit está orgulloso. 🦎
