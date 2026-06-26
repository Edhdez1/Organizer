# Capítulo 04 — Supabase: Postgres en la nube

> Ya sabes SQL y qué es Postgres. Pero queda una pregunta práctica: ¿quién aloja esa base de datos
> para que tu app la use desde internet, con login de usuarios y todo listo para funcionar? En tus
> proyectos, la respuesta es **Supabase**. En este capítulo verás qué es y cómo tus apps se
> comunican con él.

---

## 1. El problema que resuelve Supabase

Montar una base de datos Postgres "de verdad" no es solo crear tablas. Tienes que instalar un
servidor, mantenerlo seguro, hacer copias de seguridad por si algo se rompe, programar el sistema
de login… Es un montón de trabajo de infraestructura que poco tiene que ver con tu app. Supabase te
da todo eso ya **hecho**, en la nube, y gratis para empezar.

> ### 🟦 ¿Qué significa? — *Supabase*
> **Supabase** es una **plataforma** que te entrega, listos para usar, varios servicios que tendrías
> que montar por tu cuenta: una base de datos **Postgres** en la nube, un sistema de
> **autenticación** (login), almacenamiento de archivos y una **API automática** para que tu app lea
> y escriba datos sin que tú levantes ningún servidor. Suele presentarse como la alternativa de
> código abierto a Firebase.

> ### 🟦 ¿Qué significa? — *Backend-as-a-Service (BaaS)*
> Supabase es un **BaaS**, o "backend como servicio". Recuerda del Módulo 00 que el **backend** es la
> parte de servidor: los datos, el login, la lógica que el usuario no ve. Un BaaS te **alquila** ese
> backend ya montado, de modo que tú puedes dedicarte solo al **frontend** (tu app) sin programar ni
> mantener servidores. Gracias a esto, una persona sola —tú, sin un equipo detrás— puede tener apps
> con base de datos real y login funcionando. Supabase carga con todo el trabajo pesado.

---

## 2. Las piezas de Supabase que usan tus apps

> ### 🟦 ¿Qué significa? — *Las partes principales*
> - **Database**: la base de datos Postgres con tus tablas (`habitos`, `usuarios`…). Trae un
>   **Table Editor** que se ve y se usa como una hoja de cálculo, y un **SQL Editor** para escribir
>   SQL directo cuando lo necesites.
> - **Auth**: el sistema de **autenticación** (registro y login con correo, Google, GitHub…). Crea y
>   gestiona los usuarios por ti.
> - **API autogenerada**: por cada tabla, Supabase genera automáticamente una forma de leerla y
>   escribirla desde tu app, sin que programes el servidor.
> - **Storage**: el lugar donde guardas archivos, como imágenes.

> ### 🔎 En tu código
> El `README.md` de RachaSimple muestra los dos datos de conexión a Supabase: la **URL** del
> proyecto y una **clave pública** (`anon key`). Con esos dos valores, la app ya sabe a qué Supabase
> tiene que hablarle. Faro usa lo mismo, y le añade OAuth de Google y GitHub (Módulo 08).

---

## 3. Cómo se conecta la app: el cliente de Supabase

> ### 🟦 ¿Qué significa? — *El cliente de Supabase*
> El **cliente** es una librería de JavaScript (`@supabase/supabase-js`) que tu app usa para hablar
> con Supabase. Lo "creas" una sola vez, pasándole la URL y la clave, y a partir de ahí te ofrece
> métodos cómodos para el CRUD. Por debajo todo eso sigue siendo SQL, como ya viste:
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
> Fíjate en dos detalles. Devuelve `data` (los datos que pediste) y `error` (que te avisa si algo
> falló). Y usa `await`, porque hablar con la nube es **asíncrono** (Módulo 03): la respuesta no es
> instantánea. Ya reconoces todas las piezas.

> ### 🔎 En tu código
> En RachaSimple, el archivo `src/lib/supabase.ts` crea ese cliente, y los `src/repositories/*.ts` lo
> usan para el CRUD de cada tabla. Eso es el "patrón repositorio": una capa que aísla el acceso a los
> datos, de modo que el resto de la app no necesita conocer los detalles de Supabase. Si algún día
> quieres cambiar de base de datos, tocas esa capa y no tienes que reescribir media app.

---

## 4. La clave pública y la seguridad (puente al capítulo 05)

> ### 🟦 ¿Qué significa? — *La clave pública (anon key)*
> La `anon key` (clave anónima o pública) es la clave que **va en el frontend** y que, por estar ahí,
> **cualquiera puede ver**: está en el navegador del usuario, a la vista. Entonces… ¿no es peligroso?
> Aquí está lo importante: esa clave **por sí sola no da acceso a los datos de otros**. Lo que de
> verdad protege tus datos es **RLS**, la seguridad por filas, que es justo el tema del próximo
> capítulo.

> ### ⚠️ Cuidado — Clave pública sí, clave secreta NO
> Supabase también tiene una **clave de servicio** (`service_role`) que se **salta** toda la
> seguridad. Esa clave **JAMÁS** va en el frontend ni se sube a GitHub: vive solo en el servidor, en
> variables de entorno (`.env.local`, que el `.gitignore` deja fuera del repo). El `CLAUDE.md` de
> Faro lo recalca: *"Tokens y secretos solo en el servidor… nunca commitearlas."* Es exactamente lo
> que viste en el Módulo 00 sobre no subir secretos.

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
