# Capitulo 15 — Glosario de React y mapa

<p align="center">
  <img src="../../recursos/imagenes/06-react/cap15.png" alt="Ilustración del capítulo (pixel art con Bit)" width="640">
</p>


> Llegaste al final del modulo de React. Catorce capitulos de componentes, hooks, estado, props y rutas. Es mucho, y es normal que algunos terminos se hayan mezclado en tu cabeza como ingredientes en una licuadora. Este capitulo no enseña nada nuevo: es un **diccionario de bolsillo**. Cada palabra importante del modulo, con su definicion en una o dos lineas, para que sirve y donde la viste en un proyecto real (RachaSimple y Faro). Al final hay un **mapa mental** que conecta todo, un repaso y un adelanto del Modulo 07. Bit, nuestro ajolote, se sento encima de una pila de fichas ordenadas alfabeticamente: hoy hace de bibliotecario. Si en cualquier capitulo futuro olvidas que era un "hook" o un "componente controlado", vuelve aqui.

---

## 1. Como usar este glosario

No leas esto de corrido como una novela. Usalo asi:

- **Cuando olvides un termino**, busca su recuadro 🟦 y lee las dos lineas. Suele bastar.
- **Cuando quieras ver el termino vivo**, mira el recuadro 🔎 "En tu codigo": te dice en que archivo de RachaSimple o Faro aparece.
- **Cuando confundas dos parecidos** (props vs estado, useMemo vs useCallback), lee los dos recuadros seguidos y compara.

Los terminos estan agrupados por tema para que las ideas relacionadas queden juntas.

> ### 💡 Tip
> Un glosario es una herramienta de **repaso activo**: tapa la definicion con la mano, lee solo el titulo del termino e intenta explicarlo en voz alta. Si puedes, lo dominas. Eso fija mucho mas que releer pasivo.

---

## 2. Las piezas basicas: componente, JSX, props, estado

Estos cuatro son el abecedario de React. Sin ellos no hay nada.

> ### 🟦 ¿Que significa? — *Componente*
> Es una funcion de JavaScript/TypeScript que devuelve un trozo de interfaz (JSX). Sirve para construir tu app por piezas reutilizables en vez de una pagina gigante. En RachaSimple, `HabitCard.tsx` es un componente que pinta una tarjeta de habito; en Faro, `project-card.tsx` pinta la tarjeta de un proyecto.

> ### 🟦 ¿Que significa? — *JSX*
> Es la sintaxis que mezcla HTML dentro de JavaScript: `return <button>Hola</button>`. Sirve para describir como se ve un componente de forma legible. Cada componente `.tsx` de RachaSimple y Faro esta lleno de JSX; la `x` de `.tsx` es literalmente por "JSX + TypeScript".

> ### 🟦 ¿Que significa? — *Props (propiedades)*
> Son los datos que un componente **recibe desde fuera**, como los argumentos de una funcion. Sirven para que un componente sea reutilizable con distintos valores. En RachaSimple, `HabitCard` recibe por props el habito a mostrar: `<HabitCard habit={h} />`.

> ### 🟦 ¿Que significa? — *Estado (state)*
> Es la memoria interna de un componente: datos que pueden cambiar y que, al cambiar, **vuelven a dibujar** la pantalla. Sirve para reaccionar a lo que hace el usuario. En RachaSimple, si un input guarda lo que escribes, eso vive en estado con `useState`.

La diferencia clave, que Bit subraya con su patita:

- **Props** entran desde el padre y el hijo **no las modifica** (son de solo lectura).
- **Estado** nace dentro del componente y **si** lo modifica (con su funcion `set...`).

> ### 🔎 En tu codigo
> Abre `src/components/HabitCard.tsx` de RachaSimple. Lo que llega entre parentesis a la funcion (`{ habit }`) son **props**. Si dentro hubiera un `useState`, eso seria **estado**. Misma tarjeta, dos tipos de datos con reglas distintas.

> ### ⚠️ Cuidado
> No confundas "no cambia nunca" con "props". Las props **pueden** cambiar: cambian cuando el padre les pasa un valor distinto. Lo que no puede es que el hijo las reescriba por su cuenta. El estado vive y cambia dentro; las props vienen y se respetan.

---

## 3. Hooks: el corazon de React moderno

Un "hook" suena a gancho, y la metafora ayuda: te "engancha" a capacidades de React.

> ### 🟦 ¿Que significa? — *Hook*
> Es una funcion especial de React cuyo nombre empieza por `use` y que da superpoderes a un componente (memoria, efectos, contexto...). Sirve para usar estado y otras funciones de React dentro de funciones. Todos los `useState`, `useEffect` y `useQuery` de RachaSimple y Faro son hooks.

> ### 🟦 ¿Que significa? — *useState*
> Es el hook para tener **estado** en un componente. Devuelve el valor actual y una funcion para cambiarlo: `const [n, setN] = useState(0)`. En RachaSimple lo usan los formularios para recordar lo que el usuario escribe antes de guardar.

> ### 🟦 ¿Que significa? — *useEffect*
> Es el hook para ejecutar codigo **despues de pintar**, como reaccion a cambios: pedir datos, suscribirse, sincronizar con el navegador. Sirve para "efectos secundarios" (todo lo que no sea calcular el JSX). En RachaSimple aparece para sincronizar cosas con la sesion de Supabase.

> ### 🟦 ¿Que significa? — *Dependencias (de un efecto)*
> Es el array al final de `useEffect(fn, [a, b])` que le dice a React **cuando** volver a ejecutar el efecto: solo si `a` o `b` cambiaron. Sirve para no repetir trabajo de mas. Si lo dejas vacio `[]`, el efecto corre una sola vez al montar.

> ### 🟦 ¿Que significa? — *Montar / desmontar*
> "Montar" es cuando un componente aparece por primera vez en pantalla; "desmontar" es cuando se quita. Sirve para saber cuando arranca y termina su ciclo de vida. Un `useEffect` con `[]` corre al **montar**; su funcion de limpieza corre al **desmontar**.

> ### 🟦 ¿Que significa? — *Custom hook (hook propio)*
> Es un hook que **tu** escribes combinando otros hooks, para reutilizar logica entre componentes. Su nombre tambien empieza por `use`. En RachaSimple, algo como `useHabits()` agruparia la logica de cargar y tocar habitos en un solo lugar reutilizable.

> ### 💡 Tip
> Hay solo **dos reglas de los hooks** y conviene tenerlas tatuadas: (1) llamalos siempre en el nivel superior del componente, nunca dentro de un `if` o un bucle; (2) llamalos solo desde componentes o desde otros hooks. Romper esto es la causa numero uno de errores raros con hooks.

> ### 🔎 En tu codigo
> En RachaSimple busca cualquier archivo que empiece su nombre con `use` (por ejemplo en `src/hooks/`). Ese prefijo no es decoracion: es el contrato que le dice a React y a ti "esto es un hook, respeta sus reglas".

---

## 4. Renderizado: como React dibuja

Estas palabras describen **el acto de pintar** la interfaz.

> ### 🟦 ¿Que significa? — *Renderizar (render)*
> Es el proceso por el que React ejecuta tu componente y produce el JSX que se vera en pantalla. Sirve para convertir tus datos en interfaz. Cada vez que cambia el estado o las props, React **vuelve a renderizar** ese componente.

> ### 🟦 ¿Que significa? — *Re-render (re-renderizado)*
> Es cuando React vuelve a ejecutar un componente porque algo de lo que depende cambio. Sirve para mantener la pantalla sincronizada con los datos. Si tocas un habito en RachaSimple, su tarjeta hace re-render para mostrar el nuevo estado.

> ### 🟦 ¿Que significa? — *Renderizado condicional*
> Es mostrar una cosa u otra segun una condicion: `{cargando ? <Spinner/> : <Lista/>}`. Sirve para pantallas que cambian segun el momento (cargando, vacio, con datos, error). En RachaSimple lo ves cuando muestra un mensaje de "sin habitos" o la lista.

> ### 🟦 ¿Que significa? — *Lista (renderizar listas)*
> Es pintar muchos elementos a partir de un array con `.map()`: `habits.map(h => <HabitCard ... />)`. Sirve para mostrar colecciones (habitos, proyectos, tareas). En Faro, la cuadricula de proyectos se arma mapeando un array a muchos `project-card`.

> ### 🟦 ¿Que significa? — *key (clave)*
> Es un identificador unico que pones en cada elemento de una lista: `<HabitCard key={h.id} />`. Sirve para que React sepa cual es cual y actualice solo lo que cambio. Usa un `id` real, nunca el indice del array si la lista puede reordenarse.

> ### ⚠️ Cuidado
> El error de `key` mas comun es usar el indice (`map((x, i) => ... key={i})`). Funciona "de milagro" hasta que reordenas, insertas o borras elementos en medio: ahi React se confunde y mezcla estados. Si tus datos tienen `id`, usa el `id`.

```tsx
// Lista + key + renderizado condicional juntos (estilo RachaSimple)
{habits.length === 0 ? (
  <p>Aun no tienes habitos.</p>
) : (
  habits.map((h) => <HabitCard key={h.id} habit={h} />)
)}
```

---

## 5. Eventos, formularios y componentes controlados

Aqui es donde el usuario **interactua** con tu app.

> ### 🟦 ¿Que significa? — *Evento*
> Es algo que ocurre en la interfaz: un clic, una tecla, un envio de formulario. Sirve para reaccionar a lo que hace el usuario. En React lo manejas con props como `onClick={...}` u `onSubmit={...}`.

> ### 🟦 ¿Que significa? — *Manejador (handler)*
> Es la funcion que respondes a un evento, normalmente nombrada `handleAlgo`: `onClick={handleSave}`. Sirve para decir "cuando pase esto, haz aquello". En RachaSimple, marcar un habito dispara un handler que actualiza el estado.

> ### 🟦 ¿Que significa? — *Componente controlado*
> Es un input cuyo valor lo manda **React** (vive en estado) y no el navegador: `<input value={texto} onChange={...} />`. Sirve para que tu codigo sea la unica fuente de verdad del formulario. Los formularios de RachaSimple usan inputs controlados.

> ### 🟦 ¿Que significa? — *Componente no controlado*
> Es lo contrario: el input guarda su propio valor en el DOM y tu lo lees solo cuando lo necesitas (con una ref). Sirve para formularios simples sin reaccion en cada tecla. En React moderno se usa menos; lo normal es controlado.

> ### 🔎 En tu codigo
> En un formulario de RachaSimple (por ejemplo crear un habito), el `value` del input viene de un `useState` y el `onChange` llama a su `setEstado`. Ese par `value` + `onChange` es la firma de un **componente controlado**: si quitas el `onChange`, el input se queda "congelado".

> ### 💡 Tip
> Regla de oro de formularios: **un trozo de estado por campo** (o un objeto con todos los campos). Si el input no se actualiza al escribir, casi siempre es porque pusiste `value` pero olvidaste el `onChange`.

---

## 6. Compartir datos: contexto y prop drilling

Cuando un dato lo necesitan muchos componentes lejanos, entran estos terminos.

> ### 🟦 ¿Que significa? — *Prop drilling*
> Es pasar una prop de padre a hijo a nieto a bisnieto solo para que llegue al fondo, aunque los del medio no la usen. "Drilling" = taladrar capa tras capa. Es una molestia, no un error: el contexto suele ser la cura.

> ### 🟦 ¿Que significa? — *Contexto (Context)*
> Es un mecanismo de React para compartir un dato con **todos** los componentes de un arbol sin pasarlo por props uno a uno. Sirve para datos globales: usuario logueado, tema, idioma. En RachaSimple, la sesion del usuario (Supabase Auth) encaja perfecto en un contexto.

> ### 🟦 ¿Que significa? — *Provider (proveedor)*
> Es el componente que **envuelve** una parte del arbol y reparte el valor del contexto hacia abajo: `<AuthContext.Provider value={...}>`. Sirve para definir desde donde y con que valor esta disponible el contexto. Suele ir cerca de la raiz de la app.

> ### 🟦 ¿Que significa? — *useContext*
> Es el hook para **leer** un contexto desde cualquier componente de adentro: `const { user } = useContext(AuthContext)`. Sirve para consumir el dato global sin recibirlo por props. Es la otra mitad del Provider.

> ### 💡 Tip
> No metas **todo** en contexto por miedo al prop drilling. Pasar una prop uno o dos niveles esta perfectamente bien. El contexto brilla cuando el dato es de verdad global y profundo (sesion, tema). Para datos del servidor, mejor TanStack Query (seccion siguiente).

> ### 🔎 En tu codigo
> En RachaSimple, busca un `createContext` y su `Provider` cerca de `App.tsx`. Ese patron (crear contexto + envolver + leer con `useContext`) es como la app sabe en cualquier pantalla quien es el usuario sin arrastrarlo por props.

---

## 7. Datos del servidor: TanStack Query

Cuando los datos viven en una base de datos (Supabase), no los manejas como estado normal.

> ### 🟦 ¿Que significa? — *TanStack Query (React Query)*
> Es una libreria que gestiona los datos que vienen del servidor: los pide, los guarda en cache, los refresca y conoce los estados de carga y error. Sirve para no escribir a mano toda la fontaneria de pedir datos. RachaSimple la usa con Supabase.

> ### 🟦 ¿Que significa? — *useQuery*
> Es el hook de TanStack Query para **leer** datos del servidor. Le das una clave y una funcion que pide los datos, y te devuelve `data`, `isLoading`, `error`. En RachaSimple, cargar la lista de habitos del usuario es un `useQuery`.

> ### 🟦 ¿Que significa? — *useMutation*
> Es el hook para **cambiar** datos en el servidor (crear, editar, borrar). A diferencia de `useQuery`, no se dispara solo: tu lo llamas cuando el usuario actua. En RachaSimple, marcar un habito como hecho seria una `useMutation`.

> ### 🟦 ¿Que significa? — *Cache (cache de datos)*
> Es la copia en memoria que TanStack Query guarda de lo ya pedido, para no volver a pedirlo cada vez. Sirve para que la app se sienta instantanea. Si vuelves a una pantalla ya visitada, los datos aparecen al instante desde la cache.

> ### 🟦 ¿Que significa? — *queryKey (clave de consulta)*
> Es la etiqueta unica que identifica cada consulta en la cache: `['habits', userId]`. Sirve para que TanStack Query sepa que es cada cosa y cuando refrescarla. Dos componentes con la misma `queryKey` comparten los mismos datos.

> ### 🟦 ¿Que significa? — *Invalidar (invalidate)*
> Es marcar una consulta como "vieja" para que TanStack Query la vuelva a pedir. Sirve para refrescar la pantalla tras un cambio: tras marcar un habito, invalidas `['habits']` y la lista se actualiza sola.

> ### ⚠️ Cuidado
> No mezcles `useState` con datos del servidor. Guardar la lista de habitos en `useState` y sincronizarla a mano es una fuente infinita de bugs (datos desincronizados, cargas duplicadas). Para datos del servidor: TanStack Query. Para estado de la UI (un input, un modal abierto): `useState`.

---

## 8. Rendimiento: memo, useMemo, useCallback

Estos tres existen para que React **no trabaje de mas**. Son optimizaciones, no obligaciones.

> ### 🟦 ¿Que significa? — *memo (React.memo)*
> Es una funcion que envuelve un componente para que **no se re-renderice** si sus props no cambiaron. Sirve para evitar redibujos inutiles en componentes pesados. Se usa con medida: solo donde de verdad notas lentitud.

> ### 🟦 ¿Que significa? — *useMemo*
> Es el hook que **recuerda un valor calculado** y solo lo recalcula si cambian sus dependencias: `useMemo(() => calculoCaro(x), [x])`. Sirve para no repetir calculos costosos en cada render. Memoiza un **valor**.

> ### 🟦 ¿Que significa? — *useCallback*
> Es el hook que **recuerda una funcion** para que no se cree nueva en cada render: `useCallback(fn, [deps])`. Sirve para que componentes con `memo` no se re-rendericen por recibir "otra" funcion cada vez. Memoiza una **funcion**.

La forma facil de no confundir `useMemo` y `useCallback`, segun Bit:

- `useMemo` guarda **lo que una funcion devuelve** (un valor).
- `useCallback` guarda **la funcion misma**.

> ### 🟦 ¿Que significa? — *Memoizar*
> Es guardar el resultado de un calculo para reutilizarlo en vez de recalcularlo. Sirve para ahorrar trabajo. Es la idea detras de `memo`, `useMemo` y `useCallback`.

> ### ⚠️ Cuidado
> No salpiques tu codigo de `useMemo` y `useCallback` "por si acaso". Memoizar tambien cuesta (memoria y complejidad). La regla: primero escribe codigo claro; optimiza solo cuando midas un problema real. Optimizar de forma prematura ensucia mas de lo que ayuda.

> ### 🔎 En tu codigo
> Ni RachaSimple ni Faro estan llenos de estos hooks, y eso es **buena señal**: significa que el rendimiento por defecto de React les alcanza. Cuando los veas, estaran en una lista grande o un calculo pesado concreto, no por todos lados.

---

## 9. Rutas, estructura y stacks

Como se organiza una app de varias pantallas y con que herramientas.

> ### 🟦 ¿Que significa? — *Enrutado (routing)*
> Es el mecanismo que decide **que pantalla mostrar segun la URL**. Sirve para tener varias paginas navegables con boton de atras y enlaces. RachaSimple lo hace con React Router; Faro con el enrutado de Next.js.

> ### 🟦 ¿Que significa? — *React Router*
> Es la libreria que añade enrutado a una app React de Vite. Le declaras "esta ruta muestra este componente". En RachaSimple es `react-router-dom`, con `BrowserRouter`, `Routes` y `Route`.

> ### 🟦 ¿Que significa? — *Componente de pagina*
> Es el componente que representa una **pantalla completa** a la que se llega por una URL. En RachaSimple viven en `src/pages/` (`Today.tsx`, `Login.tsx`); en Faro, en carpetas dentro de `app/`.

> ### 🟦 ¿Que significa? — *Vite*
> Es la herramienta que arranca y empaqueta una app React rapido. `npm run dev` en RachaSimple lo levanta Vite. No decide rutas: solo construye y sirve.

> ### 🟦 ¿Que significa? — *Next.js*
> Es un framework sobre React que trae enrutado, renderizado en servidor y mas, ya integrado. Faro esta construido con Next.js 15 y React 19. Las pantallas se definen por la estructura de carpetas en `app/`.

> ### 🟦 ¿Que significa? — *Server Component / Client Component*
> En Next.js, un **Server Component** se ejecuta en el servidor (ideal para leer datos con secretos); un **Client Component** corre en el navegador (lleva `'use client'` y puede usar hooks de estado). Faro mezcla ambos: tokens y claves solo en el servidor.

> ### 🟦 ¿Que significa? — *TypeScript*
> Es JavaScript con tipos (lo viste en el Modulo 05). Sirve para cazar errores antes de ejecutar. Tanto RachaSimple como Faro son 100% TypeScript: cada `.tsx` tipa sus props y su estado.

> ### 🟦 ¿Que significa? — *Tailwind CSS*
> Es una forma de dar estilos escribiendo clases utilitarias directamente en el JSX (`className="flex gap-2"`). Sirve para maquetar rapido sin archivos CSS aparte. RachaSimple y Faro usan Tailwind.

> ### 🟦 ¿Que significa? — *shadcn/ui*
> Es una coleccion de componentes de UI ya hechos (botones, tarjetas, dialogos) que copias a tu proyecto y personalizas. Sirve para no reinventar la rueda visual. RachaSimple lo usa sobre Tailwind.

> ### 🟦 ¿Que significa? — *Supabase*
> Es una plataforma que da base de datos, autenticacion (Auth) y mas, accesible desde el cliente. Sirve como "backend" sin montar servidor propio. RachaSimple y Faro guardan datos y sesiones de usuario en Supabase.

> ### 🔎 En tu codigo
> Compara el `package.json` de RachaSimple (veras `vite`, `react-router-dom`, `@tanstack/react-query`, `tailwindcss`, `@supabase/supabase-js`) con el de Faro (veras `next`, `react@19`, `openai`). Mismo lenguaje (React + TypeScript), dos stacks distintos. Saber leer un `package.json` es saber leer el ADN de un proyecto.

---

## 10. Mapa mental de React

Bit dibujo este mapa para que veas como encaja todo. Leelo de arriba (lo basico) hacia abajo (lo avanzado):

```text
                          COMPONENTE
                     (funcion que devuelve JSX)
                              │
          ┌───────────────────┼───────────────────┐
        PROPS               ESTADO               HOOKS
   (entran de fuera)   (memoria interna)    (funciones use...)
                              │              ┌──────┼──────┐
                          useState      useEffect  useContext  custom hooks

   RENDERIZADO ── al cambiar estado/props → RE-RENDER
       ├── condicional ({cond ? A : B})
       ├── listas (.map) + key
       └── eventos (onClick/onSubmit) → handlers → cambian estado

   DATOS DEL SERVIDOR ── TanStack Query
       └── useQuery (leer) · useMutation (escribir) · cache · queryKey · invalidar

   RENDIMIENTO ── memo · useMemo (valor) · useCallback (funcion)
   ESTRUCTURA  ── enrutado (React Router / Next.js) · paginas vs UI

   STACKS REALES
       ├── RachaSimple: Vite + React 18 + TS + Tailwind + shadcn/ui + Supabase + TanStack Query
       └── Faro:        Next.js 15 + React 19 + TS + Tailwind + Supabase + OpenAI
```

La idea central: **todo gira alrededor del componente**. Las props lo alimentan, el estado le da memoria, los hooks le dan poderes, el renderizado lo dibuja, los eventos lo cambian, y las herramientas (Query, Router, los stacks) lo conectan al mundo real.

---

## 11. Repaso final del modulo

Cierra los ojos un segundo (despues de leer esto) y recuerda el viaje:

1. **Empezaste** entendiendo que React arma interfaces por **componentes** que devuelven **JSX**.
2. **Aprendiste** a alimentarlos con **props** y a darles memoria con **estado** (`useState`).
3. **Descubriste los hooks**: `useEffect` para efectos, **custom hooks** para reutilizar logica.
4. **Pintaste listas** con `.map` y `key`, y **renderizado condicional** para distintos momentos.
5. **Conectaste al usuario** con **eventos**, **handlers** y **componentes controlados** en formularios.
6. **Compartiste datos** evitando **prop drilling**: con **contexto** (`useContext`, `Provider`).
7. **Trajiste datos reales** con **TanStack Query** (`useQuery`, `useMutation`, cache, invalidar) sobre **Supabase**.
8. **Cuidaste el rendimiento** con `memo`, `useMemo` y `useCallback`, sin abusar.
9. **Organizaste la app** en pantallas con **enrutado** (React Router en RachaSimple, Next.js en Faro).

Todo eso aplicado a **proyectos reales**: RachaSimple (una app de habitos) y Faro (un organizador de proyectos). No fueron ejemplos de juguete: son repos de verdad con su `package.json`, sus `.tsx` y sus stacks.

> ### 💡 Tip
> Si tuvieras que quedarte con **una sola idea** de todo el modulo: *los datos fluyen hacia abajo (props) y los eventos suben (handlers); cuando el estado cambia, React redibuja*. Casi todo React es una variacion de esa frase.

---

## 12. Como sigue: Modulo 07 — Bases de datos y SQL

A lo largo del modulo dijimos muchas veces "los datos vienen de Supabase" y "esto se guarda en la base de datos", pero siempre por encima. **Nunca abrimos esa caja.** Eso es justo el Modulo 07.

Hasta ahora, cuando RachaSimple cargaba tus habitos o Faro listaba tus proyectos, alguien al otro lado guardaba esos datos en **tablas**. Aprenderas:

- **Que es una base de datos relacional** y por que los datos viven en tablas con filas y columnas.
- **SQL**, el lenguaje para hablarle a la base de datos: `SELECT` para leer, `INSERT` para crear, `UPDATE` para cambiar, `DELETE` para borrar. Vas a reconocer enseguida el parecido con `useQuery` (leer) y `useMutation` (escribir): React pide, SQL responde.
- **Relaciones** entre tablas: un usuario tiene muchos habitos; un proyecto tiene muchas fases. Eso es la "R" de relacional.
- **Como Supabase** (que ya usaste desde React) es por dentro una base de datos **PostgreSQL** con reglas de seguridad (RLS) para que cada usuario solo vea lo suyo.

Cuando termines el Modulo 07, vas a entender **las dos orillas**: el frente (React, este modulo) y el fondo (la base de datos). Y empezaras a ver que una app no es magia, sino dos mundos conversando.

> ### 🔎 En tu codigo
> Antes de empezar el Modulo 07, echa un ultimo vistazo a RachaSimple y Faro buscando las llamadas a Supabase (algo como `supabase.from('habits').select()`). Esa palabra `select` no es casualidad: es **SQL disfrazado**. En el proximo modulo le quitamos el disfraz.

Bit guarda sus fichas, se estira (los ajolotes tambien se estiran) y te espera en el Modulo 07 con una tabla bajo el brazo. Buen trabajo: terminaste React.

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Distingo **props** (entran de fuera, solo lectura) de **estado** (memoria interna que cambia).
- [ ] Explico que es un **componente**, **JSX** y un **hook** en una frase cada uno.
- [ ] Se para que sirven `useState` y `useEffect`, y que son las **dependencias** de un efecto.
- [ ] Entiendo **renderizado condicional**, listas con `.map` y por que cada item necesita **key**.
- [ ] Reconozco un **componente controlado** por su par `value` + `onChange`.
- [ ] Se que problema resuelve el **contexto** frente al **prop drilling**.
- [ ] Distingo `useQuery` (leer) de `useMutation` (escribir) en **TanStack Query**.
- [ ] No confundo `useMemo` (memoiza un **valor**) con `useCallback` (memoiza una **funcion**).
- [ ] Se que el **enrutado** elige pantalla segun la URL (React Router / Next.js).
- [ ] Puedo nombrar el stack de **RachaSimple** y el de **Faro** sin mirar.

---

## 🧪 Ejercicios

1. **Sin computadora.** Tapa las definiciones de la seccion 11 y, leyendo solo el termino, explica en voz alta: *componente, props, estado, hook, key*. Marca cuales te costaron y reléelos.

2. **Sin computadora.** Dibuja en una hoja tu propia version del mapa mental de la seccion 10, pero de memoria. Compara con el del capitulo: ¿que ramas olvidaste? Esas son tus puntos debiles.

3. 💻 **En RachaSimple.** Abre `package.json` y haz una lista de cada dependencia que reconozcas del glosario (`react`, `react-router-dom`, `@tanstack/react-query`, `tailwindcss`, `@supabase/supabase-js`). Escribe al lado de cada una, en una linea, que hace.

4. 💻 **En RachaSimple.** Abre `src/components/HabitCard.tsx` (o cualquier componente). Señala con un comentario `// props` lo que llega de fuera y `// estado` si hay un `useState`. Confirma que entiendes la diferencia mirando codigo real.

5. 💻 **En Faro.** Abre el `package.json` y compara con el de RachaSimple. Escribe tres diferencias de stack (por ejemplo: Faro usa `next` y `openai`; RachaSimple usa `vite` y `react-router-dom`). ¿Que tienen en comun?

6. 💻 **Reto de busqueda.** En RachaSimple o Faro, busca con tu editor una llamada a Supabase que contenga `.select(` o `.from(`. Anota el archivo y la linea. Guardala: la vas a entender del todo en el Modulo 07.
