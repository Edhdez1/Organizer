# Capítulo 04 — Supabase: Postgres en la nube

> Ya sabes SQL y qué es Postgres. Pero ¿quién aloja esa base de datos para que tu app la use
> desde internet, con login de usuarios y todo listo? En tus proyectos, **Supabase**. Aquí
> entiendes qué es y cómo tus apps hablan con él.

---

## 1. El problema que resuelve Supabase

Tener una base de datos Postgres "de verdad" implica: instalar un servidor, mantenerlo seguro,
hacer copias de seguridad, programar el sistema de login… mucho trabajo de infraestructura.
Supabase te da todo eso **hecho**, en la nube, gratis para empezar.

> ### 🟦 ¿Qué significa? — *Supabase*
> **Supabase** es una **plataforma** que te da, listos para usar: una base de datos **Postgres**
> en la nube, un sistema de **autenticación** (login), almacenamiento de archivos, y una **API
> automática** para que tu app lea y escriba datos sin montar un servidor propio. Se describe como
> una alternativa de código abierto a Firebase.

> ### 🟦 ¿Qué significa? — *Backend-as-a-Service (BaaS)*
> Supabase es un **BaaS**: "backend como servicio". Recuerda del Módulo 00 que el **backend** es
> la parte de servidor (datos, login, lógica). Un BaaS te **alquila** ese backend ya montado, así
> tú te concentras en el **frontend** (tu app) sin programar ni mantener servidores. Por eso una
> persona sola (como tú) puede tener apps con base de datos real y login: Supabase hace el trabajo
> pesado.

---

## 2. Las piezas de Supabase que usan tus apps

> ### 🟦 ¿Qué significa? — *Las partes principales*
> - **Database**: la base de datos Postgres, con tus tablas (`habitos`, `usuarios`…). Tiene un
>   **Table Editor** (como una hoja de cálculo) y un **SQL Editor** (para escribir SQL directo).
> - **Auth**: el sistema de **autenticación** (registro/login con correo, Google, GitHub…). Crea y
>   gestiona los usuarios por ti.
> - **API autogenerada**: por cada tabla, Supabase crea automáticamente una forma de leerla y
>   escribirla desde tu app, sin que programes el servidor.
> - **Storage**: para guardar archivos (imágenes, etc.).

> ### 🔎 En tu código
> El `README.md` de RachaSimple muestra sus dos datos de conexión a Supabase: una **URL** del
> proyecto y una **clave pública** (`anon key`). Con esos dos valores, la app sabe a qué Supabase
> hablar. Faro usa lo mismo, más OAuth de Google/GitHub (Módulo 08).

---

## 3. Cómo se conecta la app: el cliente de Supabase

> ### 🟦 ¿Qué significa? — *El cliente de Supabase*
> El **cliente** es una librería de JavaScript (`@supabase/supabase-js`) que tu app usa para
> hablar con Supabase. Se "crea" una vez con la URL y la clave, y luego ofrece métodos cómodos
> para el CRUD (que por debajo es SQL, como viste):
> ```ts
> import { createClient } from '@supabase/supabase-js';
> const supabase = createClient(URL, CLAVE_PUBLICA);
>
> // Leer (SELECT)
> const { data, error } = await supabase
>   .from('habitos')
>   .select('*')
>   .eq('usuario_id', 7);
> ```
> Fíjate: devuelve `data` (los datos) y `error` (si algo falló) — y usa `await`, porque hablar
> con la nube es **asíncrono** (Módulo 03). Ya reconoces todas las piezas.

> ### 🔎 En tu código
> En RachaSimple, `src/lib/supabase.ts` crea ese cliente, y `src/repositories/*.ts` lo usan para
> el CRUD de cada tabla. Es el "patrón repositorio": una capa que aísla el acceso a datos, para
> que el resto de la app no sepa los detalles de Supabase (y se pueda cambiar de base de datos en
> el futuro sin reescribir todo).

---

## 4. La clave pública y la seguridad (puente al capítulo 05)

> ### 🟦 ¿Qué significa? — *La clave pública (anon key)*
> La `anon key` (clave anónima/pública) es una clave que **va en el frontend** y, por tanto,
> **cualquiera puede ver** (está en el navegador del usuario). Entonces… ¿no es peligroso? Aquí
> viene lo importante: esa clave **por sí sola no da acceso a los datos de otros**. Lo que protege
> tus datos es **RLS** (la seguridad por filas), que es el tema del próximo capítulo.

> ### ⚠️ Cuidado — Clave pública sí, clave secreta NO
> Supabase también tiene una **clave de servicio** (`service_role`) que **salta** toda la
> seguridad. Esa **JAMÁS** va en el frontend ni se sube a GitHub: solo en el servidor, en
> variables de entorno (`.env.local`, que el `.gitignore` excluye). Lo recalca el `CLAUDE.md` de
> Faro: *"Tokens y secretos solo en el servidor… nunca commitearlas."* Es justo lo que viste en
> el Módulo 00 sobre no subir secretos.

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Sé qué es **Supabase** y qué te da hecho (DB, Auth, API, Storage).
- [ ] Entiendo qué es un **BaaS** y por qué permite a una persona tener apps con backend real.
- [ ] Conozco sus partes: Database (Table/SQL Editor), Auth, API autogenerada, Storage.
- [ ] Entiendo cómo el **cliente** conecta la app (URL + clave) y devuelve `{ data, error }`.
- [ ] Sé qué es la **clave pública** y por qué la **clave de servicio** nunca va al frontend.

---

## 🧪 Ejercicios

1. **BaaS.** Explica con tus palabras qué significa "backend como servicio" y por qué te ahorra
   trabajo.
2. **Las partes.** Empareja: (a) login de usuarios, (b) escribir SQL directo, (c) guardar una
   imagen → con Auth / SQL Editor / Storage.
3. **Cliente.** ¿Qué dos datos necesita `createClient(...)` para conectarse a tu Supabase?
4. **data y error.** ¿Por qué una llamada a Supabase devuelve tanto `data` como `error`, y por
   qué usa `await`?
5. **Seguridad.** Tu amigo quiere poner la `service_role key` en el código del frontend "para que
   sea más fácil". ¿Qué le adviertes y qué clave debería usar ahí?

➡️ Siguiente: **[Capítulo 05 — Seguridad: RLS y autenticación](05-rls-y-auth.md)**.
