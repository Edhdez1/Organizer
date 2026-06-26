# Capítulo 10 — Estado global y Context

<p align="center">
  <img src="../../recursos/imagenes/06-react/cap10.png" alt="Ilustración del capítulo (pixel art con Bit)" width="640">
</p>


> Hasta ahora cada componente guardaba su propio estado con `useState` y, cuando un dato
> tenía que viajar, lo pasabas por **props** de padre a hijo. Eso funciona genial para
> distancias cortas. Pero ¿qué pasa cuando el dato —por ejemplo *quién está conectado*—
> lo necesitan veinte componentes repartidos por toda la app, en rincones muy lejanos del
> árbol? Pasarlo por props uno a uno se vuelve un suplicio. En este capítulo conocerás la
> **Context API** de React: la forma oficial de compartir un dato con toda la app sin tener
> que pasarlo a mano de nivel en nivel. Lo verás con el `AuthContext` real de RachaSimple,
> el que sabe en todo momento qué usuario tiene la sesión abierta. Bit, nuestro ajolote,
> está cansado de pasarse el mismo cubito de agua de mano en mano: hoy aprende a abrir
> un grifo para todos.

---

## 1. Repaso rápido: props van de padre a hijo

En el Capítulo 03 aprendiste las **props**. Recordemos el término, porque es la base de todo
lo que viene.

> ### 🟦 ¿Qué significa? — *Prop*
> Una **prop** (de *property*, propiedad) es un dato que un componente padre le entrega a un
> componente hijo cuando lo dibuja. Sirve para **configurar** al hijo desde fuera: el padre
> decide qué información recibe. En RachaSimple, `HabitCard` recibe por props el hábito que
> debe mostrar; la página `Today` se lo pasa. Las props siempre fluyen en una sola dirección:
> **de arriba (padre) hacia abajo (hijo)**, nunca al revés.

Esa dirección única es una virtud: hace que el flujo de datos sea predecible. Si un dato se
ve mal, sabes que vino del padre. Pero esa misma regla tiene una cara incómoda cuando el
camino de arriba a abajo es muy largo.

> ### 🟦 ¿Qué significa? — *Árbol de componentes*
> El **árbol de componentes** es la forma de pensar tu app: un componente raíz arriba (en
> RachaSimple es `App`), que dibuja otros componentes dentro, que a su vez dibujan más, como
> las ramas de un árbol. Sirve para **entender quién contiene a quién**. En RachaSimple,
> `App` contiene `AppRoutes`, que contiene la página `Today`, que contiene varias `HabitCard`.
> Cuando un dato vive arriba y se necesita muy abajo, tiene que "bajar" rama por rama.

---

## 2. El problema: prop drilling

Imagina que el dato `user` (el usuario que inició sesión) nace en `App`, pero quien de verdad
lo necesita es un botón de "cerrar sesión" que vive cinco niveles más abajo. Con solo props,
tendrías que pasar `user` a cada componente intermedio, aunque a esos componentes el dato no
les importe para nada: solo lo reciben para **pasarlo al siguiente**. A eso se le llama
*prop drilling*.

> ### 🟦 ¿Qué significa? — *Prop drilling (perforación de props)*
> El **prop drilling** es el problema de tener que pasar una prop a través de muchos
> componentes intermedios que no la usan, solo para que llegue a un componente lejano que sí
> la necesita. *Drill* es "taladrar": vas perforando nivel tras nivel. Sirve para nombrar un
> dolor muy concreto. En código se ve así:

```tsx
// Versión SUFRIDA con prop drilling (esto NO está en RachaSimple, es para ilustrar)
function App() {
  const user = obtenerUsuario();
  return <Layout user={user} />;
}

function Layout({ user }) {
  // Layout no usa user para nada... solo lo pasa hacia abajo
  return <Sidebar user={user} />;
}

function Sidebar({ user }) {
  // Sidebar tampoco lo usa... solo lo pasa
  return <ProfileMenu user={user} />;
}

function ProfileMenu({ user }) {
  // ¡Por fin! Aquí sí se usa
  return <span>Hola, {user.email}</span>;
}
```

Fíjate en lo absurdo: `Layout` y `Sidebar` no hacen nada con `user`, pero están obligados a
declararlo y reenviarlo. Si mañana `ProfileMenu` necesita otro dato, vuelves a tocar *todos*
los intermedios. Es frágil y cansa.

> ### ⚠️ Cuidado
> El prop drilling no siempre es malo. Pasar una prop uno o dos niveles es perfectamente
> normal y suele ser **más claro** que montar un contexto. El problema aparece cuando el dato
> atraviesa **muchos** niveles o lo necesita **media app**. No saltes a Context al primer
> nivel: es como usar una grúa para mover una silla.

---

## 3. La solución: la Context API

React tiene una herramienta diseñada exactamente para esto: el **contexto**.

> ### 🟦 ¿Qué significa? — *Contexto (Context)*
> Un **contexto** es un canal que React crea para compartir un dato con todos los componentes
> que estén "por debajo" de cierto punto del árbol, **sin pasarlo por props**. Sirve para que
> un dato global (el usuario, el idioma, el tema visual) esté disponible en cualquier rincón
> de la app sin perforar nada. En RachaSimple existe el `AuthContext`, que comparte quién es
> el usuario conectado con toda la aplicación.

La metáfora de Bit: en vez de pasar el cubito de agua de mano en mano, abres un **grifo**
arriba del árbol. Cualquier componente que esté debajo solo tiene que acercar su vaso y
servirse. No importa cuán lejos esté del grifo.

El contexto tiene **tres piezas** y vamos a verlas una a una con el código real de
RachaSimple.

### 3.1. `createContext`: crear el canal

> ### 🟦 ¿Qué significa? — *`createContext`*
> `createContext` es la función de React que **crea un contexto nuevo**. Le pasas un valor
> por defecto y te devuelve un objeto de contexto que luego usarás para entregar y leer datos.
> Sirve para declarar "voy a compartir este tipo de información". En RachaSimple vive en
> `src/auth/AuthContext.ts`:

```ts
// src/auth/AuthContext.ts (RachaSimple)
import { createContext } from 'react';
import type { Session, User } from '@supabase/supabase-js';

export interface AuthContextValue {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signInWithPassword: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
```

Vamos despacio, porque aquí hay TypeScript del Módulo 05.

> ### 🟦 ¿Qué significa? — *Interface (`AuthContextValue`)*
> Una **interface** en TypeScript describe la **forma** que tiene un objeto: qué propiedades
> tiene y de qué tipo es cada una. Sirve para que el editor te avise si te equivocas. Aquí
> `AuthContextValue` dice: "todo lo que viaje por este contexto tendrá un `user`, una `session`,
> un `loading`, y cuatro funciones para entrar y salir". Es el **contrato** del canal.

Fíjate en `createContext<AuthContextValue | null>(null)`. Eso significa: "este contexto
transporta un valor de tipo `AuthContextValue`, o bien `null`". El valor por defecto es `null`.

> ### 🟦 ¿Qué significa? — *Valor por defecto del contexto*
> El **valor por defecto** es lo que un componente recibirá si lee el contexto **sin que nadie
> se lo haya entregado** arriba. Sirve como red de seguridad. En RachaSimple es `null` a
> propósito: significa "todavía nadie ha encendido el grifo". Más adelante verás que esto
> permite detectar errores de configuración.

> ### 💡 Tip
> Date cuenta de un detalle muy ordenado de RachaSimple: este archivo es `.ts`, no `.tsx`.
> Es porque **solo define** el contexto y su tipo, no dibuja nada de interfaz. Separar la
> *definición* del contexto de quien *entrega* los valores mantiene el código limpio.

### 3.2. El `Provider`: encender el grifo

Crear el contexto no basta: hay que **entregar** un valor real. Eso lo hace el *Provider*.

> ### 🟦 ¿Qué significa? — *Provider (proveedor)*
> El **Provider** es un componente especial que viene dentro de cada contexto (se escribe
> `AuthContext.Provider`). Envuelve a una parte del árbol y le entrega un `value`: el dato que
> todos los hijos podrán leer. Sirve para **decidir qué valor circula** por el canal y **hasta
> dónde llega**. Solo los componentes que estén *dentro* del Provider verán ese valor.

En RachaSimple, el Provider está en `src/auth/AuthProvider.tsx`. Es un componente que guarda
el usuario en estado, escucha a Supabase y entrega todo por el contexto:

```tsx
// src/auth/AuthProvider.tsx (RachaSimple) — versión resumida
import { useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { AuthContext, type AuthContextValue } from './AuthContext';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Al montar, le preguntamos a Supabase si ya hay sesión guardada
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    // Y nos suscribimos a futuros cambios (login / logout)
    const { data: sub } = supabase.auth.onAuthStateChange((event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
      setLoading(false);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      session,
      loading,
      async signInWithPassword(email, password) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      },
      async signInWithGoogle() {
        const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
        if (error) throw error;
      },
      async signUp(email, password) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
      },
      async signOut() {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
      },
    }),
    [user, session, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
```

Hay varias cosas que ya conoces de capítulos anteriores y una nueva. Vamos por partes.

> ### 🟦 ¿Qué significa? — *`children`*
> `children` es una prop especial: representa **lo que pongas dentro** del componente cuando
> lo uses. Si escribes `<AuthProvider><App /></AuthProvider>`, entonces `children` es `<App />`.
> Sirve para que un componente envuelva a otros sin saber de antemano quiénes son. Su tipo es
> `ReactNode`, que significa "cualquier cosa que React pueda dibujar".

> ### 🟦 ¿Qué significa? — *`useMemo`*
> `useMemo` es un hook que **memoriza** (guarda en caché) el resultado de un cálculo y solo lo
> vuelve a calcular cuando cambian las dependencias que le indicas. Sirve para no rehacer
> trabajo caro en cada render. Aquí RachaSimple lo usa para que el objeto `value` solo se
> reconstruya cuando cambien `user`, `session` o `loading` —no en cada parpadeo de la pantalla.

> ### ⚠️ Cuidado
> ¿Por qué tanto cuidado con memorizar el `value`? Porque **cada vez que el `value` del Provider
> cambia, TODOS los componentes que leen ese contexto se vuelven a dibujar**. Si crearas el
> objeto nuevo en cada render (`value={{ user, ... }}` directo), React pensaría "cambió" cada
> vez y redibujaría media app sin necesidad. El `useMemo` evita ese desperdicio.

Fíjate en la última línea: `return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>`.
Ahí es donde se **enciende el grifo**: todo lo que esté dentro de `{children}` podrá servirse
del `value`.

### 3.3. Envolver la app con el Provider

Para que el contexto cubra **toda** la app, el Provider se coloca bien arriba. En RachaSimple,
en `src/App.tsx`:

```tsx
// src/App.tsx (RachaSimple) — el árbol de Providers
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <I18nProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </I18nProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
```

> ### 🔎 En tu código
> Mira el orden de las muñecas rusas: primero `QueryClientProvider` (para TanStack Query, los
> datos del servidor), luego `AuthProvider` (el usuario), luego `I18nProvider` (idioma y tema)
> y por último el enrutador. Cada Provider envuelve al siguiente. Como `AppRoutes` está en el
> centro de todo, **cualquier página** de RachaSimple puede leer el usuario, el idioma o las
> consultas. Eso es exactamente lo que queríamos: un grifo arriba, vasos abajo.

### 3.4. `useContext`: servirse del grifo

Ya tenemos el canal creado y el valor entregado. Falta lo más rico: **leerlo** desde un
componente lejano.

> ### 🟦 ¿Qué significa? — *`useContext`*
> `useContext` es el hook que **lee el valor actual de un contexto**. Le pasas el objeto de
> contexto (`AuthContext`) y te devuelve lo que el Provider más cercano esté entregando. Sirve
> para que cualquier componente, sin importar lo profundo que esté, acceda al dato compartido
> en una sola línea. Es el "acercar el vaso al grifo".

RachaSimple no llama `useContext` directamente en cada página. Hace algo más elegante: lo
envuelve en un **hook personalizado** (¿recuerdas el Capítulo 09?). Está en `src/auth/useAuth.ts`:

```ts
// src/auth/useAuth.ts (RachaSimple)
import { useContext } from 'react';
import { AuthContext } from './AuthContext';

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
```

Aquí se entiende por fin para qué servía aquel valor por defecto `null`. Si un componente llama
`useAuth()` pero **no está dentro del `AuthProvider`**, `useContext` devuelve `null`, y este
hook lanza un error claro: *"useAuth debe usarse dentro de un AuthProvider"*. En vez de un
fallo misterioso más adelante, recibes un mensaje que te dice exactamente qué arreglar.

> ### 💡 Tip
> Este patrón —un contexto + un hook `useX` que lo lee y verifica— es oro puro. Los
> componentes nunca tocan `useContext` ni `AuthContext` directamente: solo llaman `useAuth()`.
> Así el contexto queda escondido como un detalle interno, y si mañana cambias cómo funciona
> la autenticación, solo tocas estos tres archivos pequeñitos.

---

## 4. Usar el contexto en componentes reales

Veamos cómo se sirve del grifo media RachaSimple. La página de **login** usa las funciones del
contexto para entrar:

```tsx
// src/pages/Login.tsx (RachaSimple) — extracto
import { useAuth } from '@/auth/useAuth';

export function LoginPage() {
  const { signInWithPassword, signInWithGoogle, signUp } = useAuth();
  // ...y dentro de un botón:
  // await signInWithGoogle();
}
```

Y el **guardián de rutas**, que decide si te deja pasar a una página privada, lee `user` y
`loading` del mismo contexto:

```tsx
// src/App.tsx (RachaSimple)
function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <LoadingScreen />;        // aún preguntando a Supabase
  if (!user) return <Navigate to="/login" replace />; // no hay sesión → fuera
  return <>{children}</>;                        // hay usuario → adelante
}
```

> ### 🔎 En tu código
> Busca con tu editor todas las veces que aparece `useAuth()` en RachaSimple: lo verás en
> `Login`, `Today`, `Settings`, `ShareCard`, `ProPlan`, `Feedback` y dentro de hooks como
> `useHabits`, `useCheckins` y `useUserProfile`. Imagina pasar `user` por props hasta cada uno
> de esos lugares. El contexto borra ese sufrimiento de un plumazo.

Fíjate en `useUserProfile`: un hook que llama a otro hook. `useUserProfile` hace
`const { user } = useAuth()` para saber de quién pedir el perfil. Los contextos y los hooks
personalizados encajan como piezas de Lego.

---

## 5. ¿Cuándo usar contexto y cuándo estado local?

Esta es la pregunta del millón. La respuesta corta: **usa el estado local por defecto, y
sube a contexto solo cuando un dato lo necesita mucha gente.**

> ### 🟦 ¿Qué significa? — *Estado local*
> El **estado local** es el `useState` que vive **dentro de un solo componente** y solo le
> importa a él (y quizá a un par de hijos directos vía props). Sirve para cosas pasajeras y
> acotadas. En `Login.tsx`, los campos `email`, `password` y `mode` son estado local: solo el
> formulario de login los necesita; nadie más en la app.

> ### 🟦 ¿Qué significa? — *Estado global*
> El **estado global** es un dato que **muchos componentes lejanos** comparten: el usuario
> conectado, el idioma elegido, el tema claro/oscuro. Sirve para información que define el
> estado de *toda* la app. En RachaSimple, el usuario (`AuthContext`) y el idioma/tema
> (`I18nContext`) son globales; por eso viven en contextos.

Una guía práctica para decidir:

- **Estado local (`useState`)** → si el dato solo le importa a un componente o a sus hijos
  inmediatos. Ejemplo: el texto que escribes en un input, si un menú está abierto.
- **Props** → si el dato baja uno o dos niveles a un hijo concreto. Ejemplo: pasarle un hábito
  a `HabitCard`.
- **Contexto** → si el dato lo necesita gente repartida por toda la app y pasarlo por props
  sería prop drilling. Ejemplo: el usuario, el idioma, el tema.

> ### ⚠️ Cuidado
> No metas en un contexto datos que cambian **muchísimo** y muy rápido (como la posición del
> ratón o cada letra de un input grande). Recuerda: cambiar el `value` del Provider redibuja a
> todos sus lectores. Para datos que parpadean sin parar, el estado local o herramientas
> especializadas son mejores. El contexto brilla con datos que cambian **de vez en cuando**:
> entras, sales, cambias de idioma.

> ### 💡 Tip
> RachaSimple separa bien dos tipos de "global": los **datos del servidor** (hábitos,
> check-ins) van por TanStack Query (`QueryClientProvider`), y los **datos de sesión y
> preferencias** (usuario, idioma, tema) van por contextos propios. No todo lo global tiene
> que ser un contexto que escribas tú; a veces una librería ya resuelve esa parte.

---

## 6. Un segundo ejemplo: `I18nContext`

Para que veas que el patrón se repite igualito, mira el contexto de idioma y tema de
RachaSimple, en `src/i18n/I18nContext.ts`:

```ts
// src/i18n/I18nContext.ts (RachaSimple)
import { createContext } from 'react';
import type { LanguagePref, VisualTheme } from '@/types/database';

export interface I18nContextValue {
  language: 'es' | 'en';
  languagePreference: LanguagePref;
  setLanguagePreference: (pref: LanguagePref) => void;
  theme: VisualTheme;
  setTheme: (theme: VisualTheme) => void;
  t: (key: TranslationKey) => string;
}

export const I18nContext = createContext<I18nContextValue | null>(null);
```

Misma receta de tres pasos: `createContext` con un tipo y `null` por defecto, un `I18nProvider`
que entrega el `value`, y un hook `useI18n()` que lo lee con verificación. La función `t` que
ves ahí traduce textos; cualquier componente la usa con `const { t } = useI18n()` y luego
`t('common_error')`. Cuando aprendes el patrón una vez, lo reconoces en cualquier parte.

> ### 🔎 En tu código
> En `Login.tsx` de RachaSimple conviven **dos** contextos en la misma línea de arriba:
> `const { t } = useI18n();` y `const { signInWithPassword, ... } = useAuth();`. Una sola
> página se sirve de dos grifos distintos a la vez sin despeinarse. Esa es la elegancia de
> tener cada dato global en su propio contexto bien separado.

---

## 7. ¿Y Faro? El contexto en Next.js

Faro está hecho con Next.js 15 y React 19, y maneja la autenticación de forma algo distinta:
buena parte de la lógica de sesión vive en el **servidor** (con Supabase y `middleware.ts`),
no en un contexto del navegador. Esto no contradice nada de lo aprendido; simplemente, en
Next.js algunos datos se resuelven antes de llegar al navegador.

> ### 🟦 ¿Qué significa? — *Componente de servidor vs. de cliente (Next.js)*
> En Next.js, un **componente de servidor** se ejecuta en el servidor antes de enviarse al
> navegador, y un **componente de cliente** (marcado con `'use client'`) corre en el navegador
> y puede usar hooks como `useState` o `useContext`. Sirve para repartir el trabajo. La regla
> de oro: **`createContext` y `useContext` solo funcionan dentro de componentes de cliente**,
> porque el contexto vive en la memoria del navegador.

> ### 💡 Tip
> Cuando en Faro o cualquier app de Next.js quieras montar un contexto al estilo del
> `AuthContext` de RachaSimple, el archivo del Provider debe empezar con `'use client'` en su
> primera línea. Si lo olvidas, Next.js te dirá que `createContext` no está disponible. Es el
> error de novato más típico al mezclar contextos con Next.js.

Y un recordatorio de las reglas de Faro: el contexto del navegador es ideal para datos
**públicos** del usuario (su email, su nombre). Pero **los tokens y secretos jamás** se ponen
en un contexto del cliente: viven solo en el servidor, en variables de entorno o en la tabla
`user_connections` protegida con RLS. Un contexto es visible para todo el navegador; un secreto
en un contexto es un secreto regalado.

> ### ⚠️ Cuidado
> Que un dato sea "global" no significa que sea seguro ponerlo en un contexto. El email del
> usuario, vale. El token de acceso de GitHub, **nunca**. Pregúntate siempre: "si esto viaja
> por el navegador, ¿pasa algo si alguien lo ve?". Si la respuesta te incomoda, va al servidor,
> no al contexto.

---

## 8. El patrón completo, de un vistazo

Para grabarlo, aquí está la receta de RachaSimple en cuatro pasos, que puedes copiar para
cualquier dato global tuyo:

1. **Definir** el contexto y su tipo en un archivo `.ts` con `createContext` (→ `AuthContext.ts`).
2. **Crear** un `Provider` que guarda el estado y entrega el `value` con `useMemo` (→ `AuthProvider.tsx`).
3. **Envolver** la app con ese Provider, bien arriba (→ `App.tsx`).
4. **Leer** el contexto desde un hook `useX()` que verifica que haya Provider (→ `useAuth.ts`).

Tres archivos pequeños y un componente raíz que envuelve. Con eso, todo el árbol tiene acceso
al dato sin una sola prop perforada. Bit guarda su cubito: ya hay grifo para todos.

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Sé explicar qué es el **prop drilling** y por qué molesta.
- [ ] Entiendo que las **props** van siempre de padre a hijo, en una sola dirección.
- [ ] Conozco las tres piezas de un contexto: `createContext`, `Provider` y `useContext`.
- [ ] Sé que el `Provider` entrega un `value` y que solo los componentes **dentro** de él lo ven.
- [ ] Entiendo por qué RachaSimple memoriza el `value` con `useMemo`.
- [ ] Sé leer un contexto con `useContext`, y por qué es mejor envolverlo en un hook como `useAuth()`.
- [ ] Puedo decidir entre **estado local**, **props** y **contexto** según cuánta gente necesite el dato.
- [ ] Reconozco que en Next.js (Faro) el contexto solo vive en componentes de cliente (`'use client'`).
- [ ] Tengo claro que los **secretos nunca** van en un contexto del navegador.

---

## 🧪 Ejercicios

1. **En papel.** Dibuja un árbol de componentes de cinco niveles. Marca con una flecha roja el
   recorrido que haría una prop `user` desde la raíz hasta el componente más profundo si usaras
   prop drilling. Luego dibuja, en verde, cómo lo resolvería un contexto. Compara cuántas flechas
   tiene cada versión.

2. **En papel.** Para cada dato, decide si sería **estado local**, **props** o **contexto** y
   justifícalo en una frase: (a) el texto de un buscador, (b) el usuario conectado, (c) un hábito
   que se pasa a `HabitCard`, (d) el idioma de la app, (e) si un menú desplegable está abierto.

3. 💻 Abre `src/auth/AuthContext.ts`, `AuthProvider.tsx` y `useAuth.ts` de RachaSimple. Localiza
   en cada archivo, respectivamente: la llamada a `createContext`, la línea que devuelve el
   `<AuthContext.Provider>`, y la llamada a `useContext`. Escribe un comentario tuyo encima de
   cada una explicando con tus palabras qué hace.

4. 💻 Crea un contexto nuevo desde cero llamado `ThemeContext` que comparta un valor `theme`
   (`'claro'` o `'oscuro'`) y una función `toggleTheme`. Sigue la receta de cuatro pasos:
   archivo del contexto, `ThemeProvider` con `useState` y `useMemo`, envolver la app, y un hook
   `useTheme()` que verifique el Provider. No necesita ser bonito; solo tiene que funcionar.

5. 💻 En tu `ThemeContext` del ejercicio anterior, crea dos componentes hermanos muy separados en
   el árbol: uno que **muestre** el tema actual y otro, en otra rama, que tenga un botón que llame
   a `toggleTheme`. Comprueba que pulsar el botón en un lado cambia el texto en el otro **sin pasar
   ninguna prop entre ellos**. Eso es el poder del contexto en acción.

6. 💻 Provoca el error a propósito: usa tu hook `useTheme()` en un componente que **no** esté
   dentro del `ThemeProvider`. Observa el mensaje de error que lanza tu verificación. Luego mete
   el componente dentro del Provider y confirma que el error desaparece. Acabas de entender por
   qué RachaSimple pone ese `if (!ctx) throw new Error(...)`.
