# Capitulo 12 — Row-Level Security (RLS) a fondo

<p align="center">
  <img src="../../recursos/imagenes/07-bases-de-datos-sql/cap12.png" alt="Ilustración del capítulo (pixel art con Bit)" width="640">
</p>


> Hola, soy Bit, tu ajolote guia. En el capitulo anterior aprendiste a guardar datos en tablas de Postgres. Pero ahora viene la pregunta incomoda: si **todos** los usuarios de RachaSimple comparten la misma tabla de habitos... ¿que impide que Ana vea los habitos de Beto? La respuesta es **Row-Level Security**, y es, sin exagerar, la pieza mas importante de seguridad de toda app con Supabase. Acompañame, que esto lo vamos a entender de verdad, ladrillo por ladrillo.

## 1. El problema: una sola tabla, muchos dueños

Imagina la tabla `habitos` de **RachaSimple** (la app de habitos hecha con Supabase/Postgres). No hay una tabla por persona; hay **una sola tabla** donde caen los habitos de todo el mundo. Cada fila tiene una columna que dice de quien es:

```sql
-- Asi luce (simplificada) la tabla de habitos en RachaSimple
create table habitos (
  id uuid primary key default gen_random_uuid(),
  usuario_id uuid not null references auth.users (id),
  nombre text not null,
  creado_en timestamptz default now()
);
```

Sin proteccion, cualquier consulta `select * from habitos` devolveria **todo**: los tuyos y los de los demas. En una app web, donde el cliente (el navegador) habla casi directo con la base de datos a traves de la API de Supabase, eso seria un desastre de privacidad.

Aqui es donde **PolyPaw** nos sirve de contraste. PolyPaw guarda sus datos en **archivos JSON** locales, no en una base de datos relacional compartida. Cada instalacion tiene su propio archivo: no hay "filas de otros usuarios" mezcladas, asi que el problema de "quien ve que fila" ni siquiera existe alli. RLS es una herramienta para el mundo de **tablas compartidas** (RachaSimple, Faro), no para el mundo de **archivos por usuario** (PolyPaw).

> ### 🟦 ¿Que significa? — *Fila (row)*
> Una **fila** es un registro individual dentro de una tabla: una sola linea con todos sus campos. En la tabla `habitos`, cada fila es **un** habito (con su id, su dueño, su nombre). Sirve para representar una "cosa" concreta. En RachaSimple, una fila = un habito de una persona; en **Faro**, una fila de la tabla `proyectos` = un proyecto concreto de un usuario.

> ### 🟦 ¿Que significa? — *Row-Level Security (RLS)*
> **Row-Level Security** (seguridad a nivel de fila) es una funcion de Postgres que decide, **fila por fila**, si un usuario puede verla o tocarla. En lugar de "puedes leer la tabla o no", dice "puedes leer **estas** filas". Sirve para que muchos usuarios compartan una tabla sin verse entre si. En RachaSimple y Faro, RLS es lo que hace que cada quien solo vea **sus** datos.

## 2. RLS empieza apagado: hay que encenderlo

Esto es clave y mucha gente lo aprende por las malas: cuando creas una tabla, **RLS viene desactivado**. Eso significa que la tabla esta abierta de par en par para quien tenga acceso a la API. El primer paso siempre es **habilitarlo**:

```sql
-- Encender RLS en la tabla de habitos de RachaSimple
alter table habitos enable row level security;
```

Cuando ejecutas esto pasa algo que sorprende a los principiantes: la tabla queda **cerrada para todos**. Sin politicas, RLS bloquea **todo** acceso (salvo el del dueño de la tabla y la `service_role`, que veremos luego). Es decir: activar RLS no abre nada, lo **cierra**. Tu tarea despues es abrir, con cuidado, solo lo justo mediante **politicas**.

> ### 🟦 ¿Que significa? — *Habilitar RLS (enable row level security)*
> Es el interruptor que **activa** la revision fila por fila en una tabla. Mientras este apagado, las politicas que escribas **no se aplican** (la tabla esta abierta). Sirve como el "candado maestro". En RachaSimple, cada tabla sensible (`habitos`, `registros`, `perfiles`) tiene RLS habilitado; en Faro lo mismo con `proyectos`, `fases` y `user_connections`.

> ### ⚠️ Cuidado
> El error de seguridad mas comun en Supabase es **crear una tabla y olvidar encender RLS**. La tabla parece funcionar perfecto en tu app... y mientras tanto esta visible para cualquiera con la clave publica. Supabase incluso te muestra una advertencia ("RLS disabled in public") por esto. Cada vez que crees una tabla con datos de usuarios, tu reflejo debe ser: `enable row level security`.

> ### 🔎 En tu codigo
> En **Faro**, la regla de seguridad del proyecto (ver `CLAUDE.md`) dice que los tokens y secretos viven en el servidor o en `user_connections` **con RLS**. Esa frase "con RLS" no es decorativa: es lo unico que impide que un usuario lea las conexiones OAuth de otro. Sin RLS, esa tabla expondria tokens ajenos.

## 3. Politicas: las reglas que abren la puerta

Una vez encendido RLS, la tabla esta cerrada. Para dejar pasar a la gente correcta usamos **politicas** (policies). Una politica es una regla escrita en SQL que responde: "para **esta** operacion (leer, insertar, actualizar, borrar), ¿que filas puede tocar este usuario?".

Cada politica se asocia a un **comando**: `SELECT`, `INSERT`, `UPDATE` o `DELETE`. Y usa una de dos clausulas:

- **`USING`**: filtra **que filas existentes** ve o toca el usuario (para SELECT, UPDATE, DELETE).
- **`WITH CHECK`**: valida **que filas nuevas o modificadas** tiene permitido escribir (para INSERT, UPDATE).

> ### 🟦 ¿Que significa? — *Politica (policy)*
> Una **politica** es una condicion SQL que Postgres añade automaticamente a cada consulta sobre una tabla con RLS. Si la condicion da verdadero para una fila, el usuario puede tocarla; si da falso, esa fila es **invisible** para el. Sirve para definir "quien puede que". En RachaSimple, la politica de `habitos` dice, en esencia: "solo si la fila es tuya".

> ### 🟦 ¿Que significa? — *Comando (SELECT / INSERT / UPDATE / DELETE)*
> Son las cuatro operaciones basicas sobre datos: **SELECT** lee, **INSERT** crea filas nuevas, **UPDATE** modifica filas existentes, **DELETE** las borra. Cada una puede tener su propia politica. Sirve para dar permisos finos (por ejemplo, dejar leer pero no borrar). En Faro, un usuario puede **leer** y **editar** sus proyectos, pero las politicas controlan cada caso por separado.

> ### 🟦 ¿Que significa? — *USING vs WITH CHECK*
> **USING** mira filas que **ya existen** y decide si las dejas ver/cambiar/borrar. **WITH CHECK** mira el dato que **vas a escribir** y decide si lo dejas guardar. La diferencia es "lo que ya hay" vs "lo que entra". Sirve, por ejemplo, para impedir que alguien inserte una fila a nombre de **otro** usuario (eso lo bloquea `WITH CHECK`).

## 4. La pieza magica: `auth.uid()`

Todas las politicas de RachaSimple y Faro giran alrededor de una funcion: `auth.uid()`. Devuelve el **identificador (UUID)** del usuario que esta haciendo la peticion en este momento, sacado de su token de sesion. Es la forma que tiene la base de datos de preguntar: "¿quien eres tu, ahora mismo?".

> ### 🟦 ¿Que significa? — *UUID*
> Un **UUID** es un identificador unico larguisimo, tipo `8f3b1c2a-...-d4e5`. Se usa como "numero de serie" imposible de adivinar para cada usuario o fila. Sirve para identificar sin ambiguedad. En RachaSimple y Faro, tanto el usuario (`auth.users.id`) como cada habito o proyecto se identifican con UUID.

> ### 🟦 ¿Que significa? — *`auth.uid()`*
> Es una funcion de Supabase que, dentro de una politica, devuelve el **UUID del usuario autenticado** que hace la consulta. Si nadie inicio sesion, devuelve `null`. Sirve para comparar "el dueño de la fila" contra "quien pregunta". Es el corazon de cada politica en RachaSimple y Faro.

> ### 🟦 ¿Que significa? — *Autenticado (authenticated)*
> Un usuario **autenticado** es el que ya inicio sesion y tiene un token valido. Lo contrario es **anonimo** (`anon`), sin sesion. Sirve para distinguir visitantes de usuarios reales. En Supabase, las politicas suelen dirigirse al rol `authenticated`; un `anon` simplemente no pasa porque su `auth.uid()` es `null`.

## 5. El patron de oro: `usuario_id = auth.uid()`

Junta las piezas y obtienes el patron que protege practicamente toda app de Supabase, incluidas RachaSimple y Faro:

```sql
-- Comparar el dueño de la fila con quien pregunta
usuario_id = auth.uid()
```

Esto se lee: "la columna `usuario_id` de esta fila debe ser igual al id del usuario que esta consultando". Si coincide, la fila es tuya y la ves; si no, es invisible. Veamos las **cuatro** politicas reales de la tabla `habitos` de RachaSimple:

```sql
-- 1) SELECT: solo veo mis habitos
create policy "ver mis habitos"
  on habitos
  for select
  using ( usuario_id = auth.uid() );

-- 2) INSERT: solo puedo crear habitos a mi nombre
create policy "crear mis habitos"
  on habitos
  for insert
  with check ( usuario_id = auth.uid() );

-- 3) UPDATE: solo edito los mios, y no puedo cambiarlos de dueño
create policy "editar mis habitos"
  on habitos
  for update
  using ( usuario_id = auth.uid() )
  with check ( usuario_id = auth.uid() );

-- 4) DELETE: solo borro los mios
create policy "borrar mis habitos"
  on habitos
  for delete
  using ( usuario_id = auth.uid() );
```

Fijate en el detalle del UPDATE: lleva **las dos** clausulas. `USING` asegura que solo puedas tocar filas que ya son tuyas; `WITH CHECK` asegura que, despues de editar, la fila **siga** siendo tuya (que no le pongas el `usuario_id` de otra persona). Sin el `WITH CHECK`, un usuario malicioso podria "regalarle" su fila a otro o, peor, robar la de alguien.

> ### 🟦 ¿Que significa? — *El patron `usuario_id = auth.uid()`*
> Es la comparacion que pregunta: "¿el dueño guardado en la fila es la misma persona que consulta?". Solo deja pasar las filas propias. Sirve como muralla de privacidad multiusuario. En RachaSimple aparece en `habitos`, `registros` y `perfiles`; en Faro, en `proyectos`, `fases` y `user_connections` (a veces con el nombre de columna `user_id`).

> ### 💡 Tip
> Para que el patron funcione, la columna de dueño **debe** rellenarse con el usuario correcto. Buena practica: ponle un valor por defecto en la tabla, asi nunca queda vacio:
> ```sql
> alter table habitos
>   alter column usuario_id set default auth.uid();
> ```
> Asi, aunque el cliente no envie `usuario_id`, Postgres pone el del usuario actual y el `WITH CHECK` siempre cuadra.

> ### 🔎 En tu codigo
> En **Faro**, la tabla `fases` pertenece a un `proyecto`, y el proyecto pertenece a un usuario. Su politica no compara contra `auth.uid()` directo, sino que comprueba que la fase cuelgue de un proyecto **tuyo**, usando una subconsulta. Ese patron "la fila hija es mia si su padre es mio" lo veremos enseguida.

## 6. Cuando el dueño esta en otra tabla (Faro: proyectos y fases)

En Faro, una **fase** no guarda directamente el `user_id`; guarda el `proyecto_id`. El dueño esta en la tabla `proyectos`. Para saber si una fase es tuya, hay que mirar su proyecto. La politica usa una subconsulta `exists`:

```sql
-- Politica SELECT de fases en Faro:
-- veo una fase solo si su proyecto es mio
create policy "ver fases de mis proyectos"
  on fases
  for select
  using (
    exists (
      select 1
      from proyectos p
      where p.id = fases.proyecto_id
        and p.user_id = auth.uid()
    )
  );
```

Se lee: "deja ver esta fase **si existe** un proyecto con el id que apunta la fase **y** ese proyecto es mio". Asi, la pertenencia se hereda del padre. Esto es muy comun cuando tienes tablas relacionadas (proyecto → fases, habito → registros).

> ### 🟦 ¿Que significa? — *Subconsulta (subquery) / `exists`*
> Una **subconsulta** es una consulta dentro de otra. `exists (...)` devuelve verdadero si la subconsulta encuentra **al menos una** fila. Sirve para preguntar cosas como "¿existe un proyecto mio que sea dueño de esta fase?". En Faro, `exists` conecta `fases` con `proyectos` para heredar la pertenencia.

> ### 🟦 ¿Que significa? — *Llave foranea (foreign key)*
> Es una columna que **apunta** a la fila de otra tabla (por ejemplo, `fases.proyecto_id` apunta a `proyectos.id`). Sirve para relacionar datos y garantizar que no apunten a la nada. En Faro, esa llave foranea es justo lo que la politica usa para rastrear quien es el dueño real de una fase.

> ### 💡 Tip
> Si una tabla hija (como `registros` en RachaSimple) tambien guarda su propio `usuario_id`, puedes evitar la subconsulta y usar el patron simple `usuario_id = auth.uid()`. Es mas rapido (no hace falta consultar otra tabla) a cambio de duplicar el dato del dueño. Muchas apps eligen esto a proposito por rendimiento.

## 7. El peligro mayuscula: la `service_role`

Supabase te da varias claves. Dos importan ahora:

- La clave **`anon` / publishable**: va en el navegador, es publica, y **respeta RLS**. Con ella, las politicas mandan.
- La clave **`service_role`**: es secreta, de servidor, y **se salta TODO RLS**. Con ella, las politicas no existen: ves y tocas cualquier fila de cualquier usuario.

La `service_role` es como una llave maestra del edificio. Util para tareas de servidor (migraciones, trabajos administrativos, el backend que llama a OpenAI en Faro). Pero si **se filtra** —si la pones en el cliente, la subes a un repo o la dejas en una variable expuesta al navegador— cualquiera puede leer y borrar la base de datos entera. RLS deja de protegerte por completo.

> ### 🟦 ¿Que significa? — *`service_role`*
> Es una clave de Supabase con **privilegios totales** que **ignora RLS**. Sirve para operaciones de servidor que necesitan acceso completo. Es peligrosisima si se expone. En Faro, el backend que habla con OpenAI o gestiona datos puede usar `service_role`, pero **solo** en el servidor, nunca en el cliente.

> ### 🟦 ¿Que significa? — *Clave `anon` / publishable*
> Es la clave **publica** que va en el navegador. Identifica a tu proyecto pero **no** otorga poderes: todo lo que pase con ella esta sujeto a RLS y al usuario autenticado. Sirve para que el front hable con Supabase de forma segura. RachaSimple y Faro la usan en el cliente sin riesgo, porque RLS la mantiene a raya.

> ### ⚠️ Cuidado
> **Nunca** pongas la `service_role` en codigo del cliente ni la commitees. En Next.js (Faro), una variable con prefijo `NEXT_PUBLIC_` se envia al navegador: jamas metas la `service_role` ahi. La regla de seguridad de Faro lo dice claro: *"Tokens y secretos solo en el servidor. Nunca exponer claves en el cliente ni commitearlas."* La `service_role` es el ejemplo numero uno de esa regla.

> ### 🔎 En tu codigo
> Asi luce el cliente **seguro** que usa el navegador en RachaSimple/Faro (con la clave publica, sujeto a RLS):
> ```ts
> import { createClient } from '@supabase/supabase-js'
>
> // Estas dos variables SI pueden ir al cliente
> const supabase = createClient(
>   process.env.NEXT_PUBLIC_SUPABASE_URL!,
>   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
> )
> // Con este cliente, select solo devuelve TUS filas: RLS manda.
> ```
> El `service_role` jamas aparece en un archivo asi.

## 8. Probar las politicas (no confies, verifica)

Una politica mal escrita puede dejar la puerta abierta sin que te des cuenta: la app "funciona" igual. Por eso hay que **probar** activamente. Tres formas, de menos a mas realista:

**a) Probar como un usuario concreto desde el editor SQL de Supabase.** Puedes simular el rol y el id de un usuario y ver que devuelve una consulta:

```sql
-- Simular que soy el usuario authenticated con cierto id
set local role authenticated;
set local request.jwt.claims = '{"sub": "ID-DE-ANA-AQUI"}';

-- Ahora auth.uid() devuelve el id de Ana.
-- Esto SOLO debe traer los habitos de Ana:
select * from habitos;
```

**b) La prueba del intruso.** Pon el id de Ana en la sesion y pide explicitamente un habito de Beto. El resultado correcto es **cero filas** (no un error: simplemente la fila es invisible):

```sql
-- Sigo "siendo" Ana. Intento ver un habito de Beto:
select * from habitos where id = 'ID-DE-UN-HABITO-DE-BETO';
-- Esperado: 0 filas. Si aparece algo, tu politica tiene un hueco.
```

**c) Probar desde la app real con dos cuentas.** Crea dos usuarios de prueba, inicia sesion con cada uno y confirma que ninguno ve lo del otro. Como RachaSimple usa **TanStack Query** para traer datos, asegurate de que los datos cacheados de una cuenta no se mezclen al cambiar de usuario.

> ### 🟦 ¿Que significa? — *Editor SQL de Supabase*
> Es una pantalla dentro del panel de Supabase donde escribes y ejecutas SQL directamente contra tu base de datos. Sirve para crear tablas, escribir politicas y **probarlas**. Es el lugar ideal para hacer la "prueba del intruso" sin tocar tu app.

> ### 🟦 ¿Que significa? — *JWT / claims*
> Un **JWT** es el token que prueba que iniciaste sesion; dentro lleva **claims** (datos), como `sub`, que es tu id de usuario. Sirve para que la base de datos sepa quien eres. `auth.uid()` justamente lee el claim `sub` de tu JWT.

> ### 🟦 ¿Que significa? — *TanStack Query*
> Es una libreria del lado del cliente que **trae, cachea y refresca** datos de una API (en RachaSimple, de Supabase). Sirve para no recargar de mas y mantener la UI al dia. Ojo: cachea por usuario; al cerrar sesion conviene **limpiar** su cache para que el siguiente no vea datos viejos.

> ### 💡 Tip
> Una manera rapida de detectar tablas sin proteger: en el panel de Supabase, abre **Advisors** (o la pestaña de seguridad). Te lista las tablas con RLS apagado. Si ves ahi `proyectos`, `fases`, `habitos` o `user_connections`, corre a encenderlo.

> ### ⚠️ Cuidado
> Que tu app muestre solo tus datos **no** prueba que RLS funcione. Quiza tu codigo añade un `.eq('usuario_id', miId)` y por eso ves solo lo tuyo. Pero si RLS esta apagado, un atacante puede ignorar tu codigo y pedir todo por la API. **El filtro en el front es comodidad; RLS es la seguridad real.** Siempre prueba a nivel de base de datos.

## 9. Resumen mental

- RLS decide, fila por fila, quien puede ver o tocar que.
- Viene **apagado**; al encenderlo, la tabla se **cierra** hasta que escribas politicas.
- Cada operacion (SELECT/INSERT/UPDATE/DELETE) puede tener su politica, con `USING` (filas existentes) y `WITH CHECK` (filas que entran).
- El patron estrella es `usuario_id = auth.uid()` (o, via `exists`, heredar el dueño del padre).
- La `service_role` se salta RLS: vive **solo** en el servidor.
- **Prueba** siempre con la "prueba del intruso", no confies en el filtro del front.

PolyPaw, recuerda, no necesita nada de esto: con datos en JSON por instalacion, no hay tabla compartida que proteger. RLS es el guardian del mundo multiusuario de RachaSimple y Faro. Bit aprueba.

## ✅ Checklist — ¿ya domino esto?

- [ ] Explico con mis palabras que es RLS y por que una tabla compartida lo necesita.
- [ ] Se que al crear una tabla en Supabase, RLS viene **apagado** y debo encenderlo.
- [ ] Entiendo que `enable row level security` **cierra** la tabla hasta que haya politicas.
- [ ] Distingo politicas de SELECT, INSERT, UPDATE y DELETE.
- [ ] Se la diferencia entre `USING` (filas existentes) y `WITH CHECK` (filas que entran).
- [ ] Explico que devuelve `auth.uid()` y por que `null` para un anonimo.
- [ ] Escribo de memoria el patron `usuario_id = auth.uid()` y se cuando usar `exists`.
- [ ] Entiendo por que la `service_role` se salta RLS y por que nunca va en el cliente.
- [ ] Se hacer la "prueba del intruso" en el editor SQL de Supabase.
- [ ] Comprendo que un filtro en el front **no** sustituye a RLS.

## 🧪 Ejercicios

1. **Sin computadora.** Con tus palabras, explicale a alguien por que activar RLS *cierra* la tabla en vez de abrirla, y que pasa entonces con las consultas si no escribes ninguna politica.

2. 💻 En el editor SQL de Supabase, crea una tabla de prueba `notas (id, usuario_id, texto)` y **enciende** RLS. Sin escribir politicas todavia, intenta `select * from notas` como usuario autenticado y confirma que devuelve **cero filas**. Anota que viste.

3. 💻 Escribe las **cuatro** politicas (SELECT, INSERT, UPDATE, DELETE) para tu tabla `notas` usando el patron `usuario_id = auth.uid()`. No olvides el `WITH CHECK` doble en el UPDATE. Verifica que ahora si puedes crear y leer tus propias notas.

4. 💻 **La prueba del intruso.** Inserta una nota como un usuario A, luego simula ser un usuario B (`set local request.jwt.claims`) e intenta leer y borrar la nota de A. Confirma que obtienes **cero filas** en ambos casos. Si alguna pasa, encuentra el hueco en tu politica.

5. 💻 Para la tabla `fases` de Faro (que depende de `proyectos`), escribe la politica de **INSERT** con `WITH CHECK` usando `exists`, de modo que un usuario solo pueda crear una fase si el `proyecto_id` apunta a un proyecto **suyo**. Explica que pasaria sin esa comprobacion.

6. **Sin computadora (caza del error).** Un compañero pone la `service_role` en una variable `NEXT_PUBLIC_SUPABASE_SERVICE_KEY` en Faro para "que el front pueda leer todos los proyectos". Describe que tres cosas malas pueden pasar y cita la regla de seguridad de Faro que esto viola.
