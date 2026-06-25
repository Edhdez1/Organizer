# Capítulo 05 — Seguridad: RLS y autenticación

> Si la clave pública de Supabase está a la vista de cualquiera, ¿qué impide que un usuario lea
> los hábitos de otro? La respuesta es **RLS**, y es uno de los conceptos de seguridad más
> importantes que aprenderás. Cerramos el módulo entendiendo cómo tus datos se mantienen privados.

---

## 1. Autenticación: ¿quién eres?

> ### 🟦 ¿Qué significa? — *Autenticación (auth)*
> La **autenticación** es el proceso de **comprobar quién es** un usuario (que es quien dice
> ser): el **login**. Tras autenticarse (con correo y contraseña, o con Google/GitHub), Supabase
> sabe qué usuario es y le da una **sesión**.

> ### 🟦 ¿Qué significa? — *Autenticación vs. autorización*
> Dos palabras que se confunden:
> - **Autenticación** = *¿quién eres?* (login).
> - **Autorización** = *¿qué tienes permitido hacer?* (permisos).
> Primero te autenticas (demuestras tu identidad), luego el sistema decide qué estás autorizado a
> ver/hacer. RLS (lo que sigue) es **autorización**: una vez sé quién eres, decido qué filas
> puedes tocar.

> ### 🟦 ¿Qué significa? — *Sesión y token*
> Al iniciar sesión, Supabase te entrega un **token**: una credencial temporal (un texto cifrado)
> que tu app envía en cada petición para demostrar "soy el usuario 7, ya autenticado". La
> **sesión** es ese estado de "estás dentro". El token caduca y se renueva solo. Por eso no
> tienes que poner la contraseña en cada clic.

---

## 2. El concepto estrella: Row-Level Security (RLS)

> ### 🟦 ¿Qué significa? — *RLS (seguridad a nivel de fila)*
> **RLS** (*Row-Level Security*, "seguridad a nivel de fila") es una característica de Postgres
> que decide, **fila por fila**, quién puede verla o modificarla. En vez de "este usuario puede
> entrar a la tabla habitos", dice: "este usuario solo puede ver las **filas** de la tabla
> habitos **cuyo `usuario_id` sea el suyo**".
> Es lo que hace que, aunque todos usen la misma clave pública y la misma tabla, **cada quien solo
> vea lo suyo**. Sin RLS bien puesta, cualquiera podría leer los datos de todos: es el error de
> seguridad más grave (y común) en apps con Supabase.

> ### 🟦 ¿Qué significa? — *Política (policy)*
> Una **política** es una **regla SQL** que define el permiso. Se lee casi como una condición
> `WHERE` que la base de datos añade **automáticamente** a cada consulta de ese usuario. Ejemplo:
> ```sql
> -- "Un usuario solo puede LEER sus propios hábitos"
> CREATE POLICY "ver_mis_habitos"
> ON habitos FOR SELECT
> USING ( usuario_id = auth.uid() );
> ```
> - `auth.uid()` → el `id` del usuario **actualmente autenticado** (lo da Supabase).
> - `USING ( usuario_id = auth.uid() )` → la condición que cada fila debe cumplir para ser
>   visible. Si no la cumple, **para ese usuario es como si la fila no existiera**.
> Se crean políticas para cada acción (SELECT, INSERT, UPDATE, DELETE).

> ### ⚠️ Cuidado — RLS hay que ACTIVARLA
> En Postgres/Supabase, RLS está **apagada** por defecto en una tabla nueva. Hay que activarla
> explícitamente y escribir las políticas. Una tabla con RLS apagada y clave pública = datos de
> todos expuestos. Activar RLS y revisar las políticas es lo **primero** que se audita en una app
> Supabase. Supabase incluso te avisa con "advisors" (avisos de seguridad) si una tabla quedó sin
> proteger.

---

## 3. Cómo encaja todo junto

El viaje completo de una petición segura en RachaSimple:

```
1. Te logueas        → Supabase Auth comprueba tu identidad y te da una sesión + token.
2. Pides tus hábitos → el cliente envía: "SELECT * FROM habitos" + tu token.
3. RLS entra en acción→ Postgres añade en automático: "...WHERE usuario_id = auth.uid()".
4. Recibes SOLO       → las filas que son tuyas. Las de otros ni se asoman.
```

> ### 🔎 En tu código
> La carpeta `supabase/migrations/` de Faro contiene el SQL que **crea las tablas Y sus políticas
> RLS**. Por eso, aunque la clave pública esté en el navegador, tus proyectos en Faro y tus
> hábitos en RachaSimple son privados: la base de datos misma los protege fila por fila. Es
> seguridad **en el lugar correcto** (el servidor/BD), no confiando en el frontend.

> ### 💡 Tip — La regla de seguridad que te llevas
> *Nunca confíes en el frontend para la seguridad.* El navegador es del usuario; puede
> manipularlo. La verdad y los permisos viven en el **servidor/base de datos** (RLS, validación
> en el backend). El frontend valida por **comodidad** (avisar rápido), el backend por
> **seguridad** (de verdad). Lo viste con los formularios (Módulo 01) y aquí se confirma.

---

## 4. Cierre del módulo

```
Bases de datos y SQL
├── Qué es: tablas/filas/columnas, relacional, claves     (cap. 01)
├── Consultar: SELECT/WHERE/ORDER BY                       (cap. 02)
├── Modificar y relacionar: CRUD, INSERT/UPDATE/DELETE, JOIN (cap. 03)
├── Supabase: Postgres en la nube, el cliente, BaaS        (cap. 04)
└── Seguridad: autenticación, RLS y políticas             (cap. 05)
```

Ya sabes **dónde viven los datos** de tus apps y cómo se mantienen privados. Te falta una pieza
para cerrar el círculo de cómo se comunican las apps con el mundo: las **APIs** (y cómo se
integran servicios externos como la IA). Ese es el siguiente módulo.

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Distingo **autenticación** (quién eres) de **autorización** (qué puedes hacer).
- [ ] Entiendo qué es una **sesión** y un **token**.
- [ ] Sé qué es **RLS** y por qué permite que cada usuario solo vea lo suyo.
- [ ] Entiendo qué es una **política** y el papel de `auth.uid()`.
- [ ] Sé que **RLS hay que activarla** y que olvidarlo expone los datos.
- [ ] Me llevo la regla: **la seguridad vive en el servidor/BD, no en el frontend**.

---

## 🧪 Ejercicios

1. **Auth vs. authz.** Clasifica como autenticación o autorización: (a) iniciar sesión con
   Google; (b) que solo puedas editar tus propios hábitos; (c) escribir tu contraseña.
2. **Lee la política.** Explica en español qué permite esta política:
   `CREATE POLICY ... ON checkins FOR SELECT USING ( usuario_id = auth.uid() );`
3. **El agujero.** Una tabla `notas` tiene la clave pública expuesta y RLS **apagada**. ¿Qué
   problema hay y cómo se arregla?
4. **El flujo.** Describe los 4 pasos desde que un usuario se loguea hasta que recibe solo sus
   datos, nombrando dónde actúa RLS.
5. **La regla de oro.** Explica por qué validar "solo en el frontend" no es seguro, con un
   ejemplo de cómo alguien podría saltárselo.

---

🎉 **¡Terminaste el Módulo 07 — Bases de datos y SQL!** Ahora entiendes dónde y cómo se guardan
los datos de tus apps, el lenguaje SQL, Supabase y la seguridad con RLS. Solo quedan dos módulos:
conectar con servicios externos (APIs, OAuth, IA) y tu servidor NAS.

➡️ Siguiente módulo: **[08 — APIs, OAuth e IA](../08-apis-oauth-ia/README.md)** *(en preparación)*.
