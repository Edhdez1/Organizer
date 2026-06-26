# Capitulo 10 — Índices y rendimiento

<p align="center">
  <img src="../../recursos/imagenes/07-bases-de-datos-sql/cap10.png" alt="Ilustración del capítulo (pixel art con Bit)" width="640">
</p>


> Hola otra vez, soy **Bit**, tu ajolote guía. Hasta ahora hemos escrito tablas, filas y consultas, y todo ha funcionado rapidito porque teníamos pocos datos. Pero imagina que RachaSimple crece y de pronto hay 2 millones de registros de racha. Si cada vez que abres la app la base de datos tiene que *leer fila por fila* para encontrar las tuyas, la cosa se pone lenta y triste. En este capítulo vamos a aprender el truco que evita ese drama: los **índices**. Te prometo que es más sencillo de lo que suena, y al final vas a entender por qué casi todas las tablas de RachaSimple y Faro tienen un índice en la columna `usuario_id`. Vamos despacio y con muchos ejemplos. 🪼

## 1. El problema: buscar sin índice es como buscar sin glosario

Antes de hablar de la solución, necesitamos *sentir* el problema.

Piensa en un libro de cocina de 800 páginas, sin índice al final. Quieres la receta de “tamales”. ¿Qué te toca hacer? Abrir página por página hasta encontrarla. Eso es lento. Ahora imagina que el libro **sí** trae un índice alfabético: vas directo a la “T”, lees “tamales… página 512”, y saltas ahí. Eso es rápido.

Una base de datos relacional sufre exactamente lo mismo. Cuando le pides:

```sql
select * from registros_racha where usuario_id = 'a1b2c3';
```

…si no hay nada que la ayude, la base de datos hace un **escaneo secuencial**: revisa una por una *todas* las filas de la tabla para ver cuáles cumplen la condición. Con 50 filas no lo notas. Con 2 millones, sí.

> ### 🟦 ¿Que significa? — *Escaneo secuencial (sequential scan)*
> Es cuando la base de datos lee **todas** las filas de una tabla, de principio a fin, para encontrar las que cumplen tu condición. **Para qué sirve:** es la forma más simple de buscar, y a veces es la mejor cuando la tabla es chiquita. **Dónde aparece:** en RachaSimple, si consultaras `registros_racha` por una columna sin índice, Postgres haría un escaneo secuencial de toda la tabla.

> ### 🟦 ¿Que significa? — *Rendimiento (performance)*
> Es qué tan rápido y eficiente responde tu programa o tu base de datos. **Para qué sirve:** una buena performance significa que la app se siente ágil para el usuario. **Dónde aparece:** en Faro, cuando cargas el panel de proyectos, el rendimiento de las consultas a Postgres decide si la pantalla aparece al instante o se queda “pensando”.

## 2. La solución: ¿qué es un índice?

Un **índice** es justamente eso: una estructura extra que la base de datos guarda *aparte* de la tabla, ordenada de tal forma que encontrar un valor sea casi instantáneo. Igual que el índice alfabético del libro de cocina.

> ### 🟦 ¿Que significa? — *Índice (index)*
> Es una estructura de datos que la base de datos mantiene aparte de la tabla para encontrar filas rápidamente según el valor de una o varias columnas. **Para qué sirve:** convierte una búsqueda de “revisar todo” en “ir directo al dato”. **Dónde aparece:** en RachaSimple y Faro, las columnas por las que se filtra mucho (como `usuario_id`) suelen tener un índice para que las consultas vuelen.

¿Cómo se crea? Con la instrucción `CREATE INDEX`. Por ejemplo, en RachaSimple, para acelerar las búsquedas de los registros de racha de cada persona:

```sql
create index idx_registros_racha_usuario_id
  on registros_racha (usuario_id);
```

Vamos a leer esto despacio:

- `create index` → “oye Postgres, crea un índice”.
- `idx_registros_racha_usuario_id` → el **nombre** del índice. Es buena costumbre que el nombre diga sobre qué tabla y qué columna es.
- `on registros_racha (usuario_id)` → sobre la tabla `registros_racha`, usando la columna `usuario_id`.

A partir de ese momento, cuando filtres por `usuario_id`, Postgres puede usar el índice para saltar directo a las filas que te interesan, sin leer las demás.

> ### 💡 Tip
> El nombre del índice no cambia cómo escribes tus consultas. Tú sigues haciendo `select ... where usuario_id = ...` igual que siempre. El índice trabaja **detrás de cámaras**; la base de datos decide sola si lo usa. Tú solo lo creas una vez.

> ### 🟦 ¿Que significa? — *Estructura de datos*
> Es una forma organizada de guardar información para que ciertas operaciones (buscar, ordenar, insertar) sean más eficientes. **Para qué sirve:** elegir la estructura correcta hace la diferencia entre algo lento y algo rápido. **Dónde aparece:** un índice de Postgres por dentro suele ser un “árbol B” (una estructura de datos pensada para buscar ordenadamente); tú no la programas, Postgres la administra por ti.

### ¿Por qué un índice es tan rápido?

Sin entrar en matemáticas pesadas: un índice está **ordenado**. Buscar en algo ordenado es como buscar una palabra en el diccionario; no lees página por página, abres por la mitad, ves si te pasaste o te quedaste corto, y vuelves a partir a la mitad. En unos pocos saltos llegas. Por eso un índice puede encontrar una fila entre millones en una fracción de segundo, mientras que el escaneo secuencial tendría que mirarlas todas.

## 3. Las claves ya vienen con índice de regalo

Aquí viene una noticia que te va a gustar: **no todos los índices hay que crearlos a mano**. Algunos aparecen solos.

> ### 🟦 ¿Que significa? — *Clave primaria (primary key)*
> Es la columna (o columnas) que identifica de forma única a cada fila de una tabla; no se puede repetir ni quedar vacía. **Para qué sirve:** garantizar que cada fila tenga una “matrícula” única para no confundirla con otra. **Dónde aparece:** en Faro, la tabla `proyectos` tiene una columna `id` como clave primaria; cada proyecto tiene su propio `id` irrepetible.

Cuando declaras una columna como clave primaria, Postgres **crea automáticamente un índice** sobre ella. Tiene sentido: para asegurarse de que un `id` no se repita, Postgres necesita poder buscar rápido si ese valor ya existe. Y de paso, esa búsqueda rápida queda disponible para tus consultas.

```sql
create table proyectos (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  usuario_id uuid not null
);
```

En esa tabla, `id` ya tiene un índice sin que tú escribas `create index`. Pero ojo: `usuario_id` **no**. Esa la tendrías que indexar tú si filtras por ella (y en Faro, sí filtras por ella todo el tiempo).

> ### 🟦 ¿Que significa? — *Clave foránea (foreign key)*
> Es una columna que apunta a la clave primaria de **otra** tabla, para conectar datos entre ellas. **Para qué sirve:** mantener relaciones (este registro de racha pertenece a este hábito) y evitar datos “huérfanos”. **Dónde aparece:** en RachaSimple, la tabla `registros_racha` tiene una clave foránea `habito_id` que apunta al `id` de la tabla `habitos`.

> ### ⚠️ Cuidado
> A diferencia de la clave primaria, una **clave foránea NO crea un índice automáticamente** en Postgres. Mucha gente lo asume y luego se sorprende de que sus consultas que unen tablas vayan lentas. Si filtras o haces `join` por una clave foránea (como `habito_id` en RachaSimple), créale tú su índice.

## 4. Índices únicos: rápido *y* sin duplicados

A veces no solo quieres buscar rápido, sino también **prohibir valores repetidos**. Para eso existe el índice único.

> ### 🟦 ¿Que significa? — *Índice único (unique index)*
> Es un índice que, además de acelerar búsquedas, impide que dos filas tengan el mismo valor en esa columna. **Para qué sirve:** garantizar que algo no se repita (un correo, un nombre de usuario). **Dónde aparece:** en RachaSimple, la tabla `perfiles` podría tener un índice único en `username` para que no haya dos personas con el mismo nombre de usuario.

```sql
create unique index idx_perfiles_username_unico
  on perfiles (username);
```

Si alguien intenta registrar un `username` que ya existe, Postgres **rechaza** la inserción con un error. Dos pájaros de un tiro: búsquedas veloces por `username` y la garantía de que es único.

> ### 💡 Tip
> Una clave primaria es, por debajo, un índice único: por eso no se repite. La diferencia es que puedes tener **varios** índices únicos en una tabla (uno en `username`, otro en `email`), pero solo **una** clave primaria.

## 5. No todo es gratis: el costo en escritura

Llegamos a la parte que separa a quien “oyó hablar de índices” de quien “los entiende de verdad”. Los índices tienen un precio.

Piénsalo así: un índice es una copia ordenada de cierta información. Cada vez que **agregas, modificas o borras** una fila, Postgres tiene que actualizar **también** todos los índices de esa tabla para mantenerlos al día. Si tu tabla tiene 5 índices, cada inserción hace 1 trabajo en la tabla + 5 actualizaciones de índices.

> ### 🟦 ¿Que significa? — *Operación de escritura (INSERT / UPDATE / DELETE)*
> Es cualquier consulta que **cambia** los datos: insertar una fila nueva, modificar una existente o borrarla. **Para qué sirve:** mantener la base de datos al día con lo que pasa en la app. **Dónde aparece:** en RachaSimple, cada vez que marcas un hábito como hecho, se hace un `insert` en `registros_racha`.

> ### ⚠️ Cuidado
> Más índices = búsquedas (lecturas) más rápidas, pero escrituras más lentas y más espacio en disco. No es gratis crear índices “por si acaso”. Crea un índice cuando tengas una razón real: una consulta que se ejecuta seguido y filtra por esa columna.

Esto nos da una regla de oro muy práctica:

- ¿La tabla se **lee** mucho y por la misma columna? → buen candidato a índice.
- ¿La tabla se **escribe** muchísimo pero casi no se consulta por esa columna? → quizá el índice estorba más de lo que ayuda.

> ### 💡 Tip
> En RachaSimple, `registros_racha` se escribe seguido (cada vez que cumples un hábito), pero también se lee muchísimo (cada vez que ves tu progreso, filtrando por `usuario_id`). Como las lecturas pesan tanto, el índice en `usuario_id` vale totalmente la pena pese al pequeño costo de escritura.

## 6. ¿Cuándo crear un índice? Una guía sencilla

No hay que adivinar. Estas son las pistas típicas de que una columna se beneficia de un índice:

1. **Aparece mucho en `WHERE`.** Si filtras seguido por `usuario_id`, indéxala.
2. **Se usa en `JOIN`.** Las columnas que conectan tablas (claves foráneas como `habito_id`) suelen necesitar índice.
3. **Se usa en `ORDER BY`.** Si ordenas a menudo por `created_at`, un índice puede acelerar el ordenamiento.
4. **La tabla es grande.** En tablas con pocas filas el escaneo secuencial es tan rápido que el índice ni se nota.

Y las pistas de que **no** conviene:

- La tabla es pequeña (decenas o pocas cientos de filas).
- La columna casi nunca se usa para filtrar.
- La columna tiene poquísimos valores distintos (por ejemplo, una columna `activo` que solo es `true` o `false`); ahí el índice ayuda poco.

> ### 🟦 ¿Que significa? — *JOIN*
> Es una operación que combina filas de dos tablas relacionadas usando una columna en común. **Para qué sirve:** juntar datos que viven en tablas separadas (un hábito y sus registros de racha). **Dónde aparece:** en RachaSimple, para mostrar “cuántas veces cumpliste cada hábito” se hace un `join` entre `habitos` y `registros_racha` por `habito_id`.

## 7. EXPLAIN: pedirle a la base de datos que te cuente su plan

¿Cómo sabes si tu índice se está usando o si la consulta hace un escaneo secuencial? No adivines: **pregúntale a Postgres** con `EXPLAIN`.

> ### 🟦 ¿Que significa? — *EXPLAIN*
> Es una instrucción que le pide a la base de datos que te muestre el **plan** que usará para responder una consulta, sin ejecutarla del todo. **Para qué sirve:** ver si usará un índice o un escaneo secuencial, y entender por qué una consulta va lenta. **Dónde aparece:** en el editor SQL de Supabase (que usan RachaSimple y Faro) puedes escribir `explain` antes de tu `select` y leer el plan.

> ### 🟦 ¿Que significa? — *Plan de ejecución (query plan)*
> Es la “receta” paso a paso que la base de datos decide seguir para resolver tu consulta. **Para qué sirve:** la base de datos tiene varias formas de obtener el resultado y elige la que cree más rápida; el plan te muestra cuál eligió. **Dónde aparece:** lo ves cuando ejecutas `EXPLAIN` en el editor SQL de Supabase de Faro o RachaSimple.

Se usa así:

```sql
explain
select * from registros_racha where usuario_id = 'a1b2c3';
```

Postgres te devuelve un texto con su plan. No necesitas entender cada palabra; busca dos cosas clave:

- **`Seq Scan`** (escaneo secuencial) → está leyendo toda la tabla. Si la tabla es grande, esto es una bandera roja.
- **`Index Scan`** (escaneo por índice) → está usando un índice. ¡Bien!

Si ves `Seq Scan` en una consulta que corres muchísimo sobre una tabla grande, esa es tu señal para crear un índice en la columna del `WHERE`.

> ### 🔎 En tu codigo
> Abre el **editor SQL de Supabase** de RachaSimple y corre `explain select * from registros_racha where usuario_id = '<un id real>';`. Mira si dice `Seq Scan` o `Index Scan`. Luego crea el índice en `usuario_id`, vuelve a correr el `explain` y compara. Vas a ver el cambio con tus propios ojos. 👀

> ### 💡 Tip
> Existe `EXPLAIN ANALYZE`, que además **ejecuta** la consulta y te dice el tiempo real que tardó. Es muy útil, pero ten cuidado: como ejecuta de verdad, no lo uses con `UPDATE` o `DELETE` a la ligera, porque sí cambiará tus datos.

## 8. El caso estrella: por qué `usuario_id` casi siempre se indexa

Ya tienes todas las piezas para entender por qué RachaSimple y Faro indexan tanto la columna `usuario_id`. Hay **dos** razones que se juntan.

**Razón 1: cada usuario solo ve lo suyo.** En estas apps, prácticamente toda consulta es del tipo “dame los datos **de este usuario**”. En RachaSimple: tus hábitos, tus registros de racha, tu perfil. En Faro: tus proyectos, tus fases, tus conexiones. Eso significa que `usuario_id` aparece en el `WHERE` *constantemente*. Y ya sabemos: columna muy usada en `WHERE` = candidata perfecta a índice.

**Razón 2: la seguridad a nivel de fila también filtra por usuario.** Aquí entra un concepto importante de Supabase.

> ### 🟦 ¿Que significa? — *RLS (Row Level Security / Seguridad a nivel de fila)*
> Es una característica de Postgres que aplica reglas para decidir, fila por fila, qué puede ver o tocar cada usuario. **Para qué sirve:** que un usuario solo acceda a SUS filas aunque la consulta no lo pida explícitamente; la base de datos lo impone sola. **Dónde aparece:** RachaSimple y Faro usan RLS en sus tablas para que cada persona solo lea sus propios hábitos, proyectos y conexiones.

Una política de RLS típica dice, en palabras simples: “solo deja pasar las filas donde `usuario_id` sea igual al id de quien está conectado”. Esa comparación por `usuario_id` se aplica **a cada consulta, automáticamente**, en cada tabla protegida. O sea: aunque tu `select` no mencione `usuario_id`, la RLS sí lo hace por debajo.

Resultado: `usuario_id` se usa para filtrar **dos veces** (una por tu `WHERE`, otra por la RLS) en casi todas las consultas. Tener un índice ahí no es un lujo, es lo que mantiene la app rápida.

> ### 🔎 En tu codigo
> En Faro revisa las tablas `proyectos`, `fases` y `user_connections`. Todas tienen una columna que ata cada fila a un usuario y políticas de RLS que filtran por ella. Esa columna es justamente la que merece un índice. Confirma cuáles ya lo tienen con la lista de índices de la tabla en Supabase.

> ### 🟦 ¿Que significa? — *Cliente de Supabase*
> Es la librería que tu app usa para hablar con la base de datos sin escribir SQL a mano; tú llamas funciones en TypeScript y ella arma la consulta. **Para qué sirve:** consultar y modificar datos desde el código de la app de forma cómoda y segura. **Dónde aparece:** en Faro (Next.js) y RachaSimple, el frontend usa el cliente de Supabase para leer datos.

Así se ve una consulta de RachaSimple desde el cliente. Fíjate cómo filtra por `usuario_id`: justo la columna que conviene indexar.

```ts
// RachaSimple: traer los registros de racha del usuario actual
const { data, error } = await supabase
  .from("registros_racha")
  .select("*")
  .eq("usuario_id", usuario.id) // <- esto se traduce a WHERE usuario_id = ...
  .order("created_at", { ascending: false });
```

> ### 🟦 ¿Que significa? — *TanStack Query*
> Es una librería del frontend que pide datos al servidor, los guarda en una memoria temporal (caché) y evita volver a pedir lo mismo una y otra vez. **Para qué sirve:** que la app no repita consultas innecesarias y se sienta veloz. **Dónde aparece:** RachaSimple usa TanStack Query para manejar los datos que trae del cliente de Supabase.

> ### 💡 Tip
> Los índices y un buen caché como TanStack Query son **aliados**, no rivales. El índice hace que *cada* consulta a Postgres sea rápida; TanStack Query hace que *no tengas que repetir* la consulta. Juntos, la app vuela.

## 9. Buenas prácticas para consultas rápidas

Los índices ayudan, pero también importa **cómo** escribes tus consultas. Bit te deja sus consejos favoritos:

**a) Pide solo las columnas que necesitas.** `select *` trae todo, incluso lo que no vas a usar. Si solo necesitas la fecha y el hábito, pídelos:

```sql
select habito_id, created_at
from registros_racha
where usuario_id = 'a1b2c3';
```

> ### ⚠️ Cuidado
> `select *` es cómodo para probar, pero en producción puede traer columnas pesadas que no usas y gastar ancho de banda. En Faro, donde algunas filas guardan textos largos generados por IA, pedir solo lo necesario marca diferencia.

**b) Filtra del lado de la base de datos, no en el código.** No traigas 10.000 filas para luego quedarte con 10 en JavaScript. Deja que el `WHERE` (y el índice) hagan el filtrado:

```sql
-- bien: el filtro lo hace Postgres usando el índice
select * from proyectos where usuario_id = 'a1b2c3' and archivado = false;
```

**c) Limita los resultados.** Si solo muestras 20 registros, pide 20:

```sql
select * from registros_racha
where usuario_id = 'a1b2c3'
order by created_at desc
limit 20;
```

> ### 🟦 ¿Que significa? — *LIMIT*
> Es una cláusula que le dice a la consulta cuántas filas como máximo quieres recibir. **Para qué sirve:** evitar traer datos de más y hacer la consulta más liviana. **Dónde aparece:** en RachaSimple, para mostrar “tus últimos 20 registros” se usa `limit 20`.

**d) Cuidado con transformar la columna indexada.** Si envuelves la columna del `WHERE` en una función, el índice puede dejar de servir:

```sql
-- esto puede IGNORAR el índice de usuario_id:
select * from registros_racha where lower(usuario_id::text) = 'a1b2c3';
```

> ### ⚠️ Cuidado
> Cuando aplicas una función sobre la columna indexada (como `lower(...)`), Postgres a menudo ya no puede usar el índice normal y vuelve al escaneo secuencial. Procura comparar la columna “tal cual” siempre que puedas.

## 10. PolyPaw: el contraste sin base de datos

Para que aprecies todo esto, miremos un proyecto que **no** usa nada de lo anterior: **PolyPaw**, hecho en Python con Flet, guarda sus datos en **archivos JSON**.

> ### 🟦 ¿Que significa? — *JSON (archivo de datos)*
> Es un formato de texto para guardar datos estructurados (listas, objetos con campos). **Para qué sirve:** almacenar información de forma simple en un archivo, sin necesidad de un servidor de base de datos. **Dónde aparece:** PolyPaw guarda su información (como el progreso de misiones) en archivos JSON dentro del propio proyecto.

En PolyPaw **no hay índices, ni `CREATE INDEX`, ni `EXPLAIN`, ni RLS**. ¿Por qué? Porque no hay base de datos relacional. Para encontrar un dato, el programa carga el archivo JSON completo en memoria y lo recorre con código Python. Eso funciona perfecto cuando los datos son pocos y caben en memoria.

> ### ⚠️ Cuidado
> El enfoque de PolyPaw (datos en JSON) es genial para apps pequeñas y locales, pero **no escala** igual que una base de datos. Sin índices, buscar entre cientos de miles de elementos sería lento, y no tienes RLS para separar datos por usuario en un servidor. Por eso RachaSimple y Faro, que sí necesitan multiusuario y crecer, eligieron Postgres en Supabase.

Esto te ayuda a ver que **los índices son una herramienta de las bases de datos relacionales**. No son magia universal; son la respuesta de Postgres al problema de “buscar rápido entre muchísimas filas, para muchos usuarios a la vez”. Proyectos como tunal-digital (un sitio en HTML/CSS/JS sin backend de datos) o polypaw-nas (un servidor casero con Samba y Cockpit) tampoco tienen índices SQL, sencillamente porque su trabajo no es ese.

> ### 🔎 En tu codigo
> Compara mentalmente: en PolyPaw, “buscar la misión X” = leer el JSON y recorrerlo en Python. En RachaSimple, “buscar los registros del usuario X” = un `select` con `WHERE usuario_id = ...` que Postgres resuelve con un índice. Mismo objetivo, herramientas muy distintas según el tamaño del problema.

## ✅ Checklist — ¿ya domino esto?

- [ ] Entiendo qué es un **escaneo secuencial** y por qué es lento en tablas grandes.
- [ ] Sé explicar, con el ejemplo del libro de cocina, **por qué un índice acelera las búsquedas**.
- [ ] Puedo escribir un `CREATE INDEX` sobre una columna, como `usuario_id` en RachaSimple.
- [ ] Sé que la **clave primaria** trae índice automático, pero la **clave foránea NO**.
- [ ] Entiendo qué es un **índice único** y para qué sirve (búsqueda rápida + sin duplicados).
- [ ] Tengo claro el **costo en escritura**: cada índice hace los `INSERT/UPDATE/DELETE` un poco más lentos.
- [ ] Sé reconocer **cuándo conviene** crear un índice (WHERE/JOIN/ORDER BY en tablas grandes) y cuándo no.
- [ ] Puedo usar **EXPLAIN** y distinguir `Seq Scan` de `Index Scan`.
- [ ] Entiendo **por qué `usuario_id` se indexa** en RachaSimple y Faro (filtrado constante + RLS).
- [ ] Conozco buenas prácticas: pedir solo columnas necesarias, filtrar en la base, usar `LIMIT`, y no romper el índice con funciones.
- [ ] Sé por qué **PolyPaw** (datos en JSON) no usa índices y en qué se diferencia de Postgres.

## 🧪 Ejercicios

1. **En papel.** Explica con tus propias palabras, usando una analogía distinta a la del libro de cocina, por qué un índice hace las búsquedas más rápidas. (Pista: una guía telefónica, un archivero, una biblioteca…).

2. **En papel.** Tienes una tabla `habitos` con columnas `id` (clave primaria), `usuario_id` y `nombre`. ¿Cuáles columnas ya tienen índice automático y cuál crearías a mano? Justifica con la regla del `WHERE`.

3. 💻 **En el editor SQL de Supabase.** Crea (en una base de práctica) una tabla `registros_racha` con `id`, `usuario_id` y `habito_id`. Escribe el `CREATE INDEX` para `usuario_id`. Luego escribe el `CREATE UNIQUE INDEX` que evitaría que el mismo `usuario_id` y `habito_id` se repitan en el mismo día (índice sobre dos columnas).

4. 💻 **En el editor SQL de Supabase.** Corre `EXPLAIN` sobre un `select ... where usuario_id = ...` **antes** de crear el índice y guarda el resultado. Crea el índice. Vuelve a correr el `EXPLAIN`. Anota si cambió de `Seq Scan` a `Index Scan`.

5. 💻 **Buenas prácticas.** Toma una consulta tuya que use `select *` y reescríbela para pedir solo 2 o 3 columnas y agregar un `LIMIT`. Explica en una línea por qué la nueva versión es más liviana.

6. **De razonamiento.** Tu compañero quiere “crear índices en TODAS las columnas de TODAS las tablas, por si acaso”. Escríbele un mensaje corto explicándole por qué eso es mala idea, mencionando el costo en escritura y el espacio en disco.

> ¡Lo lograste! Ahora entiendes cómo Postgres encuentra una aguja en un pajar sin revisar toda la paja, y por qué `usuario_id` es la columna consentida de los índices en RachaSimple y Faro. En el próximo capítulo seguimos sumando. Nos vemos, soy **Bit**, y me voy a nadar un rato. 🪼
