# Capitulo 11 — Supabase a fondo

<p align="center">
  <img src="../../recursos/imagenes/07-bases-de-datos-sql/cap11.png" alt="Ilustración del capítulo (pixel art con Bit)" width="640">
</p>


> Hola, soy Bit, tu ajolote guia. Hasta ahora hablamos de SQL y de Postgres como si vivieran en una computadora misteriosa y lejana. En este capitulo le ponemos cara a esa computadora: **Supabase**. Es lo que **RachaSimple** y **Faro** usan para guardar habitos, rachas, proyectos y fases. Veremos que es, como se habla con ella desde el navegador y por que hay dos llaves que jamas debes confundir. Tranquilo: esto es mucho mas amigable de lo que suena.

## 1. ¿Que es Supabase?

Piensa en Postgres, la base de datos que ya conoces, como un almacen enorme con estanterias muy ordenadas. El detalle es que un almacen, por si solo, no atiende a nadie: hace falta puertas, mostradores, guardias y un telefono para pedir cosas. **Supabase** es justamente todo ese servicio alrededor del almacen, ya montado y listo para usar.

> ### 🟦 ¿Que significa? — *Supabase*
> Una plataforma que te entrega una base de datos **Postgres** ya instalada y administrada (no tienes que mantener tu el servidor) y, encima, una serie de **APIs** automaticas para leer y escribir esos datos desde tu aplicacion. Tambien trae login de usuarios, almacenamiento de archivos y mas.
> **Para que sirve:** te quita de encima montar y cuidar un servidor de base de datos; tu te dedicas a tu app.
> **Donde se usa en un repo real:** **RachaSimple** guarda sus habitos y rachas en Supabase; **Faro** guarda proyectos, fases y conexiones de usuario en Supabase.

> ### 🟦 ¿Que significa? — *Postgres gestionado*
> "Gestionado" significa que otra persona (aqui, Supabase) se encarga de las copias de seguridad, las actualizaciones y de que el servidor siga encendido. Tu te limitas a usar la base de datos.
> **Para que sirve:** tener Postgres de verdad sin necesidad de ser experto en administrar servidores.
> **Donde se usa en un repo real:** tanto **RachaSimple** como **Faro** corren sobre Postgres gestionado por Supabase.

> ### 🟦 ¿Que significa? — *API*
> Siglas de *Application Programming Interface*. Es un conjunto de "puertas" con reglas claras por donde tu programa pide o envia datos a otro sistema. Es como el mostrador de un restaurante: pides por el menu, no entras a la cocina.
> **Para que sirve:** que tu app (el navegador) pueda decirle a Supabase "dame los habitos de este usuario" sin tocar Postgres directamente.
> **Donde se usa en un repo real:** el frontend de **RachaSimple** llama a la API de Supabase para traer las rachas.

> ### 🟦 ¿Que significa? — *frontend*
> La parte de la app con la que el usuario trata de forma directa: lo que se ve y se toca en el navegador (botones, listas, pantallas). Es lo contrario del *servidor*, la parte oculta que guarda secretos y hace el trabajo pesado.
> **Para que sirve:** mostrar los datos y recoger las acciones del usuario.
> **Donde se usa en un repo real:** el frontend de **RachaSimple** y de **Faro** corre en el navegador y usa la llave `anon`; lo secreto se queda en el servidor.

Para que se vea el contraste: **PolyPaw** NO usa nada de esto. PolyPaw guarda sus datos en **archivos JSON** dentro del propio programa (Python/Flet). No hay un almacen central ni un mostrador: cada quien lee y escribe su archivo. Eso funciona de maravilla para una app de escritorio, pero se queda corto cuando muchas personas necesitan ver y actualizar los mismos datos a la vez. Ahi es donde Supabase brilla.

> ### 🟦 ¿Que significa? — *JSON*
> Un formato de texto para guardar datos organizados en parejas "nombre: valor" y en listas, facil de leer tanto para personas como para programas. Un archivo JSON es solo texto: se abre, se lee y se escribe sin necesidad de un servidor.
> **Para que sirve:** guardar o intercambiar datos estructurados de forma sencilla.
> **Donde se usa en un repo real:** **PolyPaw** guarda sus misiones y su progreso en archivos JSON locales, sin base de datos ni servidor.

> ### 🟦 ¿Que significa? — *Python / Flet*
> **Python** es un lenguaje de programacion muy legible, muy usado para apps de escritorio y para tareas de datos. **Flet** es una herramienta que te deja construir interfaces graficas (ventanas, botones) escribiendo Python.
> **Para que sirve:** crear una app de escritorio con su propia ventana sin tener que pasar por un navegador web.
> **Donde se usa en un repo real:** **PolyPaw** esta hecho en Python con Flet, y por eso guarda sus datos en archivos locales en vez de en Supabase.

> ### 💡 Tip
> Una regla mental que ayuda: si tus datos viven en un **archivo** que se abre junto con el programa (como en PolyPaw), tienes "datos locales". Si viven en un **servidor** al que muchos clientes se conectan (como en RachaSimple y Faro), tienes "datos en base de datos". Supabase es lo segundo.

## 2. El cliente supabase-js

Para hablar con Supabase desde JavaScript o TypeScript usamos una libreria oficial.

> ### 🟦 ¿Que significa? — *JavaScript / TypeScript*
> **JavaScript** es el lenguaje que corre en los navegadores y le da vida a las paginas web. **TypeScript** es JavaScript con "etiquetas de tipo" añadidas (texto, numero, etc.) que ayudan a cazar errores antes de ejecutar; al final se convierte en JavaScript normal.
> **Para que sirve:** escribir la logica de la app web, tanto en el frontend como en el servidor.
> **Donde se usa en un repo real:** **RachaSimple** y **Faro** estan escritos en TypeScript; **PolyPaw**, en cambio, usa Python.

> ### 🟦 ¿Que significa? — *supabase-js*
> La libreria oficial de Supabase para JavaScript/TypeScript. Te da un objeto (el "cliente") con metodos comodos para leer y escribir en tu base de datos sin escribir SQL a mano.
> **Para que sirve:** traer y guardar datos desde el navegador con codigo corto y legible.
> **Donde se usa en un repo real:** **RachaSimple** y **Faro** importan `@supabase/supabase-js` para hablar con sus tablas.

> ### 🟦 ¿Que significa? — *cliente (de Supabase)*
> El objeto que creas una sola vez con tu URL y tu llave, y que luego reutilizas en todas tus consultas. Es como un telefono ya configurado: marcas y del otro lado contesta tu base de datos.
> **Para que sirve:** centralizar la conexion para no repetir la configuracion en cada pantalla.
> **Donde se usa en un repo real:** Faro crea un cliente de Supabase y lo reutiliza en sus pantallas de Next.js.

Asi se crea el cliente:

```ts
import { createClient } from '@supabase/supabase-js'

// La URL y la llave vienen de variables de entorno (nunca escritas a mano en el codigo)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
```

> ### 🟦 ¿Que significa? — *variables de entorno*
> Valores de configuracion (como una URL o una llave) que NO se escriben dentro del codigo, sino que se guardan aparte, fuera del programa, y este los lee al arrancar. Asi el mismo codigo funciona en tu maquina y en el servidor sin cambiar nada, y los secretos no terminan dentro del codigo que se sube a GitHub.
> **Para que sirve:** separar los secretos y la configuracion del codigo, para no exponerlos ni repetirlos.
> **Donde se usa en un repo real:** **Faro** lee la URL de Supabase, la llave `anon` y la llave de OpenAI desde variables de entorno; las publicas llevan el prefijo `NEXT_PUBLIC_` y las secretas no.

> ### 🟦 ¿Que significa? — *Next.js*
> Un marco de trabajo (framework) construido sobre **React** para crear aplicaciones web que corren en parte en el navegador y en parte en un servidor. Trae reglas listas para rutas, paginas y manejo de secretos.
> **Para que sirve:** levantar una app web moderna con frontend y servidor en un solo proyecto.
> **Donde se usa en un repo real:** **Faro** esta hecho en Next.js; por eso usa el prefijo `NEXT_PUBLIC_` para marcar que variables puede ver el navegador.

> ### 🔎 En tu codigo
> En **Faro** (Next.js) las variables que empiezan con `NEXT_PUBLIC_` son las unicas que el navegador llega a ver. La URL del proyecto y la llave `anon` llevan ese prefijo precisamente porque es seguro exponerlas. Cualquier secreto de verdad (como la llave de OpenAI o la `service_role`) NO lleva ese prefijo y se queda en el servidor.

## 3. Leer datos: .from().select()

Toda consulta arranca eligiendo una tabla con `.from(...)` y luego diciendo que columnas quieres con `.select(...)`.

> ### 🟦 ¿Que significa? — *.from()*
> Metodo que indica sobre **que tabla** vas a trabajar. El nombre entre comillas es el nombre real de la tabla en Postgres.
> **Para que sirve:** apuntar tu consulta a la tabla correcta (habitos, rachas, proyectos...).
> **Donde se usa en un repo real:** RachaSimple usa `.from('habitos')` para empezar a leer la lista de habitos.

> ### 🟦 ¿Que significa? — *.select()*
> Metodo que dice **que columnas** quieres traer. Con `'*'` traes todas; con `'id, nombre'` solo esas dos. Es el equivalente al `SELECT` de SQL.
> **Para que sirve:** pedir solo los datos que necesitas (menos datos = mas rapido).
> **Donde se usa en un repo real:** Faro hace `.from('proyectos').select('*')` para listar los proyectos del usuario.

```ts
// Traer todos los habitos del usuario, en RachaSimple
const { data, error } = await supabase
  .from('habitos')
  .select('*')
```

Fijate en `{ data, error }`: Supabase siempre te devuelve un objeto con esos dos campos. Si todo salio bien, `data` trae tus filas y `error` queda en `null`. Si algo fallo, es al reves: `error` trae el problema y `data` queda en `null`. Por eso revisa SIEMPRE el error.

> ### 🟦 ¿Que significa? — *fila*
> Cada registro de una tabla: un habito, una racha, un proyecto. Si imaginas la tabla como una hoja de calculo, una fila es un renglon.
> **Para que sirve:** representar una "cosa" individual de tu app.
> **Donde se usa en un repo real:** en RachaSimple, cada fila de `habitos` es un habito concreto como "Leer 20 minutos".

Si tradujeramos al SQL puro que esa consulta ejecuta por debajo, quedaria algo asi:

```sql
select * from habitos;
```

> ### 💡 Tip
> El cliente `supabase-js` no sustituye al SQL: lo **traduce**. Cada cadena de metodos que escribes acaba convertida en una consulta SQL real contra Postgres. Por eso vale la pena entender SQL: te ayuda a saber que esta pasando "del otro lado del telefono".

## 4. Filtros: afinar lo que pides

Casi nunca quieres TODAS las filas. Quieres las de un usuario, las completadas hoy, las mas recientes. Para eso estan los filtros, que vas encadenando despues del `.select()`.

> ### 🟦 ¿Que significa? — *.eq()*
> Filtro de igualdad: "donde tal columna sea **igual a** tal valor". `eq` viene de *equal*.
> **Para que sirve:** quedarte solo con las filas que coinciden exactamente (por ejemplo, las de un solo usuario).
> **Donde se usa en un repo real:** Faro usa `.eq('proyecto_id', id)` para traer solo las fases de un proyecto concreto.

> ### 🟦 ¿Que significa? — *.gt()*
> Filtro "mayor que" (*greater than*). Tambien tienes `.gte` (mayor o igual), `.lt` (menor que) y `.lte` (menor o igual).
> **Para que sirve:** filtrar por rangos, como rachas mayores a cierto numero de dias.
> **Donde se usa en un repo real:** en RachaSimple podrias listar registros con `.gt('dias_seguidos', 7)` para ver rachas de mas de una semana.

> ### 🟦 ¿Que significa? — *.order()*
> Ordena los resultados por una columna. Con `{ ascending: false }` los pones de mayor a menor (o de mas nuevo a mas viejo).
> **Para que sirve:** mostrar primero lo mas reciente o lo mas alto.
> **Donde se usa en un repo real:** RachaSimple ordena los registros de racha por fecha para mostrar los ultimos arriba.

> ### 🟦 ¿Que significa? — *.limit()*
> Limita cuantas filas te devuelve. `.limit(5)` trae como mucho 5.
> **Para que sirve:** no traer miles de filas cuando solo necesitas unas pocas (mas rapido y mas barato).
> **Donde se usa en un repo real:** Faro puede limitar cuantos proyectos recientes muestra en el panel.

Veamos un ejemplo encadenando varios filtros, sobre los registros de racha de RachaSimple:

```ts
// Ultimos 10 registros de racha de un usuario, del mas nuevo al mas viejo
const { data, error } = await supabase
  .from('registros_racha')
  .select('id, fecha, dias_seguidos')
  .eq('usuario_id', usuarioId)
  .gt('dias_seguidos', 0)
  .order('fecha', { ascending: false })
  .limit(10)
```

Ese mismo pedido, en SQL puro, se parece a esto:

```sql
select id, fecha, dias_seguidos
from registros_racha
where usuario_id = '...'
  and dias_seguidos > 0
order by fecha desc
limit 10;
```

> ### 🔎 En tu codigo
> Mira como el orden de los metodos en `supabase-js` (primero `.eq`, luego `.gt`, luego `.order`, luego `.limit`) calca las clausulas de SQL (`where`, `order by`, `limit`). No es casualidad: cada metodo le va sumando una pieza a la misma consulta.

> ### ⚠️ Cuidado
> Si se te olvida un filtro como `.eq('usuario_id', ...)`, podrias estar pidiendo filas que no son tuyas. En RachaSimple y Faro eso no rompe la seguridad porque hay **RLS** (lo vemos en la seccion 8), pero aun asi es mala costumbre traer mas de lo que necesitas. Pide poco y especifico.

## 5. .single(): cuando esperas una sola fila

A veces no quieres una lista, sino UN solo registro: un perfil, un proyecto por su id.

> ### 🟦 ¿Que significa? — *.single()*
> Metodo que le avisa a Supabase "espero exactamente una fila". En lugar de devolverte una lista con un elemento dentro, te entrega directo el objeto. Si hay cero filas o mas de una, te da un error.
> **Para que sirve:** trabajar comodo con `data.nombre` en lugar de `data[0].nombre`.
> **Donde se usa en un repo real:** RachaSimple lo usa al traer el **perfil** del usuario actual, que siempre es uno solo.

```ts
// Traer el perfil del usuario actual en RachaSimple
const { data: perfil, error } = await supabase
  .from('perfiles')
  .select('id, nombre, avatar')
  .eq('id', usuarioId)
  .single()

// Ahora puedes usar perfil.nombre directamente (no perfil[0].nombre)
```

> ### 💡 Tip
> Tambien existe `.maybeSingle()`. Funciona como `.single()`, pero **no** da error si no hay ninguna fila: simplemente te devuelve `null`. Es util cuando no tienes la certeza de que el registro exista todavia (por ejemplo, un perfil que aun no se ha creado).

## 6. Escribir datos: insert, update y delete

Leer es la mitad del trabajo. La otra mitad es crear, modificar y borrar.

> ### 🟦 ¿Que significa? — *.insert()*
> Metodo para **crear** filas nuevas. Le pasas un objeto (o una lista de objetos) con los valores de cada columna.
> **Para que sirve:** guardar algo nuevo: un habito, el registro de racha de hoy, un proyecto.
> **Donde se usa en un repo real:** RachaSimple hace `.insert(...)` cuando el usuario marca un habito como cumplido y se crea un registro de racha.

```ts
// Crear un nuevo habito en RachaSimple
const { data, error } = await supabase
  .from('habitos')
  .insert({ nombre: 'Leer 20 minutos', usuario_id: usuarioId })
  .select()   // devuelve la fila recien creada
```

> ### 🟦 ¿Que significa? — *.update()*
> Metodo para **modificar** filas que ya existen. Casi siempre va con un filtro (como `.eq`) para decir CUALES filas cambiar.
> **Para que sirve:** editar datos: renombrar un habito, cambiar el estado de un proyecto.
> **Donde se usa en un repo real:** Faro usa `.update(...)` para cambiar el estado o el progreso de un proyecto despues de un analisis.

```ts
// Actualizar el progreso de un proyecto en Faro
const { error } = await supabase
  .from('proyectos')
  .update({ progreso: 60, estado: 'en curso' })
  .eq('id', proyectoId)
```

> ### 🟦 ¿Que significa? — *.delete()*
> Metodo para **borrar** filas. Igual que update, va con un filtro para indicar cuales.
> **Para que sirve:** eliminar lo que ya no quieres: un habito abandonado, una fase de mas.
> **Donde se usa en un repo real:** RachaSimple usa `.delete()` cuando el usuario elimina un habito.

```ts
// Borrar un habito en RachaSimple
const { error } = await supabase
  .from('habitos')
  .delete()
  .eq('id', habitoId)
```

> ### ⚠️ Cuidado
> Un `.update()` o un `.delete()` **sin filtro** afecta a TODAS las filas de la tabla. Imagina borrar de un golpe los habitos de todos los usuarios. Por eso, siempre, siempre acompaña update y delete con un `.eq(...)` (u otro filtro). Bit ha visto ajolotes llorar por olvidar el `where`.

En SQL puro, esas tres operaciones se ven asi:

```sql
insert into habitos (nombre, usuario_id) values ('Leer 20 minutos', '...');

update proyectos set progreso = 60, estado = 'en curso' where id = '...';

delete from habitos where id = '...';
```

## 7. TanStack Query: leer y escribir sin que la pantalla se atore

RachaSimple no llama a Supabase "a pelo" en cada pantalla. Se apoya en una libreria que pone orden en esas llamadas.

> ### 🟦 ¿Que significa? — *React*
> Una libreria de JavaScript para construir interfaces de usuario por piezas reutilizables llamadas "componentes" (un boton, una lista, una pantalla). Cuando los datos cambian, React vuelve a dibujar solo lo necesario.
> **Para que sirve:** armar el frontend de una app web de forma ordenada y que se actualice solo cuando cambian los datos.
> **Donde se usa en un repo real:** **RachaSimple** y **Faro** (vía Next.js) usan React para sus pantallas; sobre React montan TanStack Query.

> ### 🟦 ¿Que significa? — *TanStack Query*
> Una libreria de React que se ocupa de los datos que vienen de un servidor: los guarda en memoria (cache), sabe cuando estan "viejos" y los vuelve a pedir, y maneja por ti los estados de "cargando" y "error".
> **Para que sirve:** no pedir lo mismo mil veces y mostrar spinners y errores sin escribir tanto codigo.
> **Donde se usa en un repo real:** RachaSimple envuelve sus consultas a Supabase con TanStack Query para que la lista de habitos se refresque sola y no parpadee.

> ### 🟦 ¿Que significa? — *cache*
> Una copia temporal de datos que ya pediste, guardada cerca para no tener que volver a pedirla. Es como tener una foto de la pizarra en vez de ir a la pizarra cada vez.
> **Para que sirve:** que la app se sienta instantanea y gaste menos llamadas a Supabase.
> **Donde se usa en un repo real:** TanStack Query cachea los habitos en RachaSimple; al volver a la pantalla, se ven al instante.

> ### 🔎 En tu codigo
> En RachaSimple, un "query" de TanStack Query envuelve un `await supabase.from('habitos').select('*')`. La reparticion es clara: TanStack Query se ocupa del *cuando* y del *como guardar*; Supabase se ocupa del *de donde vienen* los datos. Trabajan en equipo.

## 8. Seguridad: las llaves anon y service_role, y RLS

Aqui viene lo mas importante de todo el capitulo. Presta atencion, ajolote.

> ### 🟦 ¿Que significa? — *llave anon (anon key)*
> La llave "publica" de tu proyecto Supabase. Es la que puede vivir en el navegador. Por si sola NO da permisos especiales: quien la tenga solo puede hacer lo que tus reglas de seguridad le permitan.
> **Para que sirve:** que el frontend se conecte a Supabase de forma segura, sin abrir la puerta a todo.
> **Donde se usa en un repo real:** Faro y RachaSimple usan la llave `anon` en el navegador para todas las consultas normales del usuario.

> ### 🟦 ¿Que significa? — *llave service_role*
> La llave "maestra" que se **salta** todas las reglas de seguridad y puede leer y escribir cualquier fila de cualquier usuario. Es peligrosisima.
> **Para que sirve:** tareas de servidor que de verdad necesitan permisos totales (por ejemplo, un proceso administrativo).
> **Donde se usa en un repo real:** en Faro vive SOLO en el servidor, en variables de entorno sin `NEXT_PUBLIC_`. Nunca llega al navegador.

> ### ⚠️ Cuidado
> NUNCA pongas la llave `service_role` en codigo del navegador ni la subas a GitHub. Si se filtra, cualquiera puede leer y borrar todos los datos de todos tus usuarios. La regla de seguridad de Faro lo deja clarisimo: tokens y secretos solo en el servidor, jamas en el cliente ni commiteados.

Pero si la llave `anon` esta en el navegador y cualquiera puede verla, ¿que impide que un curioso lea los habitos de otra persona? La respuesta es **RLS**.

> ### 🟦 ¿Que significa? — *RLS (Row Level Security)*
> "Seguridad a nivel de fila". Son reglas que Postgres aplica para decidir, fila por fila, si un usuario puede verla o tocarla. La regla tipica: "solo puedes ver las filas donde `usuario_id` sea igual a tu propio id".
> **Para que sirve:** que aunque todos compartan la misma llave `anon`, cada quien acceda solo a SUS datos.
> **Donde se usa en un repo real:** RachaSimple protege habitos, registros de racha y perfiles con RLS; Faro protege proyectos, fases y conexiones de usuario con RLS.

> ### 🟦 ¿Que significa? — *autenticacion (Supabase Auth)*
> El sistema de login de Supabase. Cuando un usuario inicia sesion (por ejemplo con OAuth de Google o GitHub), Supabase sabe quien es y le entrega una identidad que RLS usa para decidir que filas le tocan.
> **Para que sirve:** saber QUIEN esta pidiendo datos, para luego aplicarle las reglas de RLS correctas.
> **Donde se usa en un repo real:** Faro usa Supabase Auth con OAuth para leer GitHub y Google Drive del usuario; el id de ese usuario alimenta el RLS de la tabla `conexiones_usuario`.

> ### 🟦 ¿Que significa? — *OAuth*
> Un metodo estandar para iniciar sesion en una app usando tu cuenta de otro servicio (Google, GitHub) sin entregarle tu contraseña a esa app. El servicio externo confirma quien eres y te da un permiso temporal (un *token*).
> **Para que sirve:** que el usuario entre con "Iniciar sesion con Google" y que la app reciba permiso para leer ciertos datos sin conocer su contraseña.
> **Donde se usa en un repo real:** **Faro** usa OAuth (a traves de Supabase Auth) para conectarse a la cuenta de GitHub y Google Drive del usuario y leer sus proyectos.

> ### 🟦 ¿Que significa? — *token*
> Una "ficha" temporal que un servicio te entrega tras un login con OAuth. Funciona como permiso: la presentas en cada peticion para demostrar quien eres, y puede vencer o revocarse. No es tu contraseña.
> **Para que sirve:** dejar que la app actue en tu nombre por un rato, sin guardar tu contraseña.
> **Donde se usa en un repo real:** **Faro** guarda los tokens de GitHub y Google Drive solo en el servidor, en la tabla `conexiones_usuario` protegida con RLS, nunca en el navegador.

Una politica de RLS, en SQL, se ve asi (este es el estilo de regla que protege los proyectos de Faro):

```sql
-- Solo el dueño puede ver sus propios proyectos
create policy "leer mis proyectos"
on proyectos
for select
using ( auth.uid() = usuario_id );
```

> ### 🟦 ¿Que significa? — *auth.uid()*
> Una funcion de Supabase que, dentro de una consulta, devuelve el id del usuario que esta autenticado en ese momento. RLS la compara contra la columna `usuario_id` de cada fila.
> **Para que sirve:** escribir reglas como "esta fila es tuya si tu id coincide con el de su dueño".
> **Donde se usa en un repo real:** las politicas de RachaSimple y Faro comparan `auth.uid()` con `usuario_id` para dejar pasar solo lo propio.

> ### 💡 Tip
> Piensa en la llave `anon` como la llave de la entrada de un edificio de apartamentos: te deja pasar al edificio, pero no a cualquier apartamento. RLS es la cerradura de cada apartamento: solo abre el tuyo. La `service_role` seria la llave maestra del conserje, que abre todo... y por eso la guardas bajo siete llaves.

## 9. Realtime y Storage, a grandes rasgos

Supabase ofrece dos extras que conviene conocer, aunque no entremos en detalle.

> ### 🟦 ¿Que significa? — *Realtime*
> Una funcion que avisa a tu app **en el momento** en que un dato cambia en la base, sin que tengas que estar preguntando una y otra vez. Te "suscribes" a una tabla y Supabase te empuja los cambios.
> **Para que sirve:** que dos personas vean lo mismo actualizado al instante, o que una pantalla refleje cambios sin recargar.
> **Donde se usa en un repo real:** RachaSimple podria usar Realtime para que una racha registrada en el telefono aparezca al toque en otra pantalla. (En la practica, buena parte del refresco lo resuelve TanStack Query.)

> ### 🟦 ¿Que significa? — *Storage*
> El servicio de Supabase para guardar **archivos** (imagenes, PDFs) en vez de filas de texto y numeros. Es como un Google Drive pegado a tu base de datos, con sus propias reglas de acceso.
> **Para que sirve:** subir avatares, fotos o documentos sin meterlos dentro de las tablas.
> **Donde se usa en un repo real:** un avatar de perfil en RachaSimple es un buen candidato a vivir en Storage, mientras la tabla `perfiles` guarda solo la URL.

> ### 🔎 En tu codigo
> Faro tiene su propia filosofia de "refresco bajo demanda": el usuario dispara el analisis cuando quiere. Por eso no abusa de Realtime; prefiere pedir datos cuando hacen falta. Conocer una herramienta no te obliga a usarla siempre: cada proyecto elige.

## 10. Juntando todo: el viaje de un dato

Recapitulemos con el caso de Faro cuando muestra un proyecto:

1. El usuario inicia sesion con **Supabase Auth** (OAuth). Supabase sabe quien es.
2. El navegador, usando la llave **anon** y el cliente **supabase-js**, pide `from('proyectos').select('*')`.
3. Postgres recibe la consulta y, antes de responder, aplica **RLS**: solo deja pasar las filas donde `auth.uid() = usuario_id`.
4. Vuelve `{ data, error }`. Faro pinta los proyectos del usuario, y de NADIE mas.
5. Si el usuario edita el estado, el navegador hace `.update(...).eq('id', ...)`, RLS vuelve a comprobar que sea su fila, y Postgres guarda el cambio.
6. Para tareas con permisos totales (como un proceso de servidor con OpenAI), Faro usa la llave **service_role**, que vive solo en el servidor.

> ### 🟦 ¿Que significa? — *OpenAI*
> Una empresa que ofrece modelos de inteligencia artificial (IA) a los que tu app puede pedirle, por una API, que genere o resuma texto. Se le habla con una llave secreta, igual que a Supabase.
> **Para que sirve:** añadir funciones de IA a una app, como generar una descripcion o un resumen automatico.
> **Donde se usa en un repo real:** **Faro** llama a la API de OpenAI (desde el servidor, con su llave secreta) para generar la descripcion, el estado, el progreso y el roadmap de cada proyecto.

Y PolyPaw, mientras tanto, sigue tan feliz leyendo su archivo JSON local: sin llaves, sin RLS, sin servidor. Cada herramienta para su mundo.

> ### 💡 Tip
> Si de este capitulo te llevas una sola idea, que sea esta: **anon + RLS** es la pareja que mantiene seguro el frontend; **service_role** se queda en el servidor y no sale de ahi nunca. Confundir esas dos llaves es el error de seguridad numero uno con Supabase.

## ✅ Checklist — ¿ya domino esto?

- [ ] Puedo explicar que es Supabase y por que es "Postgres gestionado + APIs".
- [ ] Se crear un cliente con `createClient(url, anonKey)`.
- [ ] Entiendo la cadena `.from().select()` y que devuelve `{ data, error }`.
- [ ] Se filtrar con `.eq`, `.gt`, ordenar con `.order` y recortar con `.limit`.
- [ ] Se cuando usar `.single()` (y `.maybeSingle()`).
- [ ] Distingo `.insert()`, `.update()` y `.delete()`, y se que update/delete necesitan filtro.
- [ ] Puedo explicar la diferencia entre la llave `anon` y la `service_role`.
- [ ] Entiendo que RLS protege fila por fila usando `auth.uid()`.
- [ ] Se a grandes rasgos para que sirven Realtime y Storage.
- [ ] Puedo explicar por que PolyPaw (JSON local) no necesita nada de esto.

## 🧪 Ejercicios

1. 💻 En el **editor SQL de Supabase**, crea una tabla sencilla llamada `habitos` con columnas `id`, `nombre` y `usuario_id`. Inserta dos filas con `insert` y luego haz un `select * from habitos;` para verlas.

2. 💻 Sobre esa tabla, escribe en SQL una consulta que traiga solo los habitos de un `usuario_id` concreto, ordenados por `nombre`. Luego traduce esa misma consulta a `supabase-js` usando `.from().select().eq().order()`.

3. Sin computadora: explica con tus palabras (a un amigo o a Bit) por que la llave `service_role` NUNCA debe ir en el navegador. Inventa un ejemplo de que pasaria si se filtrara.

4. 💻 Escribe una llamada de `supabase-js` que actualice el `progreso` de un proyecto de Faro a `100` y su `estado` a `'completado'`, filtrando por `id`. Confirma que incluiste el `.eq(...)` y explica que pasaria si lo olvidaras.

5. 💻 En el editor SQL, escribe una **politica de RLS** para una tabla `perfiles` que solo permita a cada usuario hacer `select` de su propia fila (pista: usa `auth.uid()`).

6. Reto de comparacion: PolyPaw guarda sus datos en JSON local y RachaSimple en Postgres con RLS. Lista dos ventajas de cada enfoque y di en que situacion elegirias cada uno.

> Lo lograste. Ya sabes hablarle a Supabase desde el frente, leer y escribir con cuidado, y sobre todo cuidar las llaves. Nos vemos en el siguiente capitulo, donde seguiremos haciendo crecer estas bases. — Bit 🐾
