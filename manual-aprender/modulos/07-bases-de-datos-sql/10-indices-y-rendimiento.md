# Capitulo 10 — Índices y rendimiento

<p align="center">
  <img src="../../recursos/imagenes/07-bases-de-datos-sql/cap10.png" alt="Ilustración del capítulo (pixel art con Bit)" width="640">
</p>


> Hola otra vez, soy **Bit**, tu ajolote guía. Hasta ahora hemos creado tablas, llenado filas y escrito consultas, y todo respondió rapidísimo porque teníamos cuatro datos contados. El detalle es que las apps crecen. Imagina que RachaSimple se vuelve popular y un día tienes 2 millones de registros de racha guardados. Si cada vez que alguien abre la app la base de datos tiene que *leer fila por fila* hasta encontrar las suyas, la app se arrastra y nadie quiere eso. En este capítulo aprendemos el truco que evita ese drama: los **índices**. Suena técnico, pero te aseguro que es bastante sencillo, y al terminar vas a entender por qué casi todas las tablas de RachaSimple y Faro llevan un índice en la columna `usuario_id`. Lo vemos con calma y con hartos ejemplos. 🪼

## 1. El problema: buscar sin índice es como buscar sin glosario

Antes de presentar la solución, conviene *sentir* el problema en carne propia.

Piensa en un libro de cocina de 800 páginas que no trae índice al final. Quieres la receta de “tamales”. ¿Qué te toca? Pasar página tras página hasta dar con ella. Un suplicio. Ahora imagina que el mismo libro **sí** trae un índice alfabético: vas directo a la “T”, lees “tamales… página 512” y saltas ahí de un brinco. Eso es otra cosa.

Una base de datos relacional vive exactamente la misma diferencia. Cuando le pides algo como esto:

```sql
select * from registros_racha where usuario_id = 'a1b2c3';
```

…si no tiene ninguna ayuda, hace un **escaneo secuencial**: revisa una por una *todas* las filas de la tabla para ver cuáles cumplen la condición. Con 50 filas ni te enteras. Con 2 millones, lo sufres.

> ### 🟦 ¿Que significa? — *Escaneo secuencial (sequential scan)*
> Es cuando la base de datos lee **todas** las filas de una tabla, de la primera a la última, para quedarse con las que cumplen tu condición. **Para qué sirve:** es la forma más simple de buscar, y a veces hasta es la mejor cuando la tabla es chiquita. **Dónde aparece:** en RachaSimple, si consultaras `registros_racha` por una columna que no tiene índice, Postgres recorrería toda la tabla de un tirón.

> ### 🟦 ¿Que significa? — *Rendimiento (performance)*
> Es qué tan rápido y con qué pocos recursos responde tu programa o tu base de datos. **Para qué sirve:** un buen rendimiento se traduce en una app que se siente ágil para quien la usa. **Dónde aparece:** en Faro, cuando cargas el panel de proyectos, lo rápido que respondan las consultas a Postgres decide si la pantalla aparece al instante o se queda “pensando”.

## 2. La solución: ¿qué es un índice?

Un **índice** es justo eso que acabamos de imaginar: una estructura extra que la base de datos guarda *aparte* de la tabla, ordenada de tal forma que encontrar un valor sea casi instantáneo. El mismísimo índice alfabético del libro de cocina, pero para tus filas.

> ### 🟦 ¿Que significa? — *Índice (index)*
> Es una estructura de datos que la base de datos mantiene aparte de la tabla para encontrar filas rápido según el valor de una o varias columnas. **Para qué sirve:** convierte una búsqueda de “revisar todo” en “ir directo al dato”. **Dónde aparece:** en RachaSimple y Faro, las columnas por las que se filtra mucho (como `usuario_id`) suelen llevar un índice para que las consultas vuelen.

¿Y cómo se crea? Con la instrucción `CREATE INDEX`. Por ejemplo, en RachaSimple, para acelerar las búsquedas de los registros de racha de cada persona:

```sql
create index idx_registros_racha_usuario_id
  on registros_racha (usuario_id);
```

Leámoslo despacio, parte por parte:

- `create index` → “oye Postgres, créame un índice”.
- `idx_registros_racha_usuario_id` → el **nombre** del índice. Conviene que el nombre diga de qué tabla y de qué columna es; así, meses después, sabes de un vistazo para qué sirve.
- `on registros_racha (usuario_id)` → sobre la tabla `registros_racha`, usando la columna `usuario_id`.

De ahí en adelante, cuando filtres por `usuario_id`, Postgres puede apoyarse en el índice para saltar directo a las filas que te interesan, sin tocar las demás.

> ### 💡 Tip
> El nombre del índice no cambia para nada cómo escribes tus consultas. Tú sigues haciendo `select ... where usuario_id = ...` igual que siempre. El índice trabaja **detrás de cámaras**; es la base de datos la que decide sola si lo usa. Tú solo lo creas una vez y te olvidas.

> ### 🟦 ¿Que significa? — *Estructura de datos*
> Es una forma organizada de guardar información para que ciertas operaciones (buscar, ordenar, insertar) salgan más eficientes. **Para qué sirve:** elegir la estructura correcta es la diferencia entre algo lento y algo veloz. **Dónde aparece:** por dentro, un índice de Postgres suele ser un “árbol B” (una estructura pensada para buscar en orden); no la programas tú, Postgres la administra solo.

### ¿Por qué un índice es tan rápido?

Sin meternos en matemáticas pesadas: un índice está **ordenado**. Y buscar en algo ordenado es como buscar una palabra en el diccionario. No vas página por página: abres por la mitad, ves si te pasaste o te quedaste corto, y vuelves a partir lo que quedó por la mitad. En unos pocos saltos llegaste. Por eso un índice encuentra una fila entre millones en una fracción de segundo, mientras que el escaneo secuencial tendría que mirarlas todas, una por una.

## 3. Las claves ya vienen con índice de regalo

Y ahora una noticia que te va a caer bien: **no todos los índices hay que crearlos a mano**. Algunos aparecen solitos.

> ### 🟦 ¿Que significa? — *Clave primaria (primary key)*
> Es la columna (o columnas) que identifica de forma única a cada fila de una tabla; no se puede repetir ni quedar vacía. **Para qué sirve:** darle a cada fila una “matrícula” única para no confundirla con ninguna otra. **Dónde aparece:** en Faro, la tabla `proyectos` usa una columna `id` como clave primaria; cada proyecto tiene su `id` irrepetible.

Cuando declaras una columna como clave primaria, Postgres **crea automáticamente un índice** sobre ella. Y tiene toda la lógica: para asegurar que un `id` nunca se repita, Postgres necesita poder buscar rápido si ese valor ya existe. De paso, esa búsqueda veloz queda disponible también para tus consultas. Dos por uno sin que muevas un dedo.

```sql
create table proyectos (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  usuario_id uuid not null
);
```

En esa tabla, `id` ya trae índice sin que escribas `create index`. Pero ojo con `usuario_id`: esa **no**. Si filtras por ella, tendrás que indexarla tú. Y en Faro, créeme, filtras por `usuario_id` a todas horas.

> ### 🟦 ¿Que significa? — *Clave foránea (foreign key)*
> Es una columna que apunta a la clave primaria de **otra** tabla, para conectar datos entre las dos. **Para qué sirve:** mantener relaciones (este registro de racha pertenece a este hábito) y evitar datos “huérfanos” sin dueño. **Dónde aparece:** en RachaSimple, la tabla `registros_racha` tiene una clave foránea `habito_id` que apunta al `id` de la tabla `habitos`.

> ### ⚠️ Cuidado
> A diferencia de la clave primaria, una **clave foránea NO crea un índice automáticamente** en Postgres. Mucha gente lo da por hecho y después se rasca la cabeza porque sus consultas que unen tablas van lentas. Si filtras o haces `join` por una clave foránea (como `habito_id` en RachaSimple), créale tú su índice a mano.

## 4. Índices únicos: rápido *y* sin duplicados

A veces no solo quieres buscar rápido, sino además **prohibir valores repetidos**. Para ese par de cosas existe el índice único.

> ### 🟦 ¿Que significa? — *Índice único (unique index)*
> Es un índice que, además de acelerar las búsquedas, impide que dos filas tengan el mismo valor en esa columna. **Para qué sirve:** garantizar que algo no se repita (un correo, un nombre de usuario). **Dónde aparece:** en RachaSimple, la tabla `perfiles` podría tener un índice único en `username` para que no haya dos personas con el mismo nombre de usuario.

```sql
create unique index idx_perfiles_username_unico
  on perfiles (username);
```

Si alguien intenta registrar un `username` que ya existe, Postgres **rechaza** la inserción con un error y no lo deja pasar. Otra vez dos pájaros de un tiro: búsquedas veloces por `username` y la garantía de que cada uno es único.

> ### 💡 Tip
> Una clave primaria es, por debajo, un índice único: justo por eso nunca se repite. La diferencia está en la cantidad: puedes tener **varios** índices únicos en una misma tabla (uno en `username`, otro en `email`), pero solo **una** clave primaria.

## 5. No todo es gratis: el costo en escritura

Llegamos a la parte que separa a quien “oyó hablar de índices” de quien “los entiende de verdad”. Porque los índices, por buenos que sean, tienen su precio.

Piénsalo así: un índice es una copia ordenada de cierta información. Cada vez que **agregas, modificas o borras** una fila, Postgres tiene que actualizar **también** todos los índices de esa tabla para que no queden desfasados. Si tu tabla tiene 5 índices, cada inserción supone 1 trabajo en la tabla más 5 actualizaciones de índices. Se suma rápido.

> ### 🟦 ¿Que significa? — *Operación de escritura (INSERT / UPDATE / DELETE)*
> Es cualquier consulta que **cambia** los datos: insertar una fila nueva, modificar una que ya existe o borrarla. **Para qué sirve:** mantener la base de datos al día con lo que va pasando en la app. **Dónde aparece:** en RachaSimple, cada vez que marcas un hábito como hecho se dispara un `insert` en `registros_racha`.

> ### ⚠️ Cuidado
> Más índices = búsquedas (lecturas) más rápidas, pero escrituras más lentas y más espacio en disco gastado. Crear índices “por si acaso” no sale gratis. Crea un índice cuando tengas una razón concreta: una consulta que corres seguido y que filtra por esa columna.

De aquí sale una regla de oro muy fácil de recordar:

- ¿La tabla se **lee** mucho y siempre por la misma columna? → buen candidato a índice.
- ¿La tabla se **escribe** un montón pero casi nunca la consultas por esa columna? → puede que el índice estorbe más de lo que ayude.

> ### 💡 Tip
> En RachaSimple, `registros_racha` se escribe seguido (cada vez que cumples un hábito), pero también se lee muchísimo (cada vez que miras tu progreso, filtrando por `usuario_id`). Como las lecturas pesan tanto en el día a día, el índice en `usuario_id` vale por completo la pena, aun con su pequeño costo de escritura.

## 6. ¿Cuándo crear un índice? Una guía sencilla

No hace falta adivinar. Estas son las señales típicas de que una columna se beneficia de un índice:

1. **Aparece mucho en `WHERE`.** Si filtras seguido por `usuario_id`, indéxala.
2. **Se usa en `JOIN`.** Las columnas que conectan tablas (claves foráneas como `habito_id`) casi siempre piden índice.
3. **Se usa en `ORDER BY`.** Si ordenas a menudo por `created_at`, un índice puede acelerar ese ordenamiento.
4. **La tabla es grande.** En tablas con pocas filas, el escaneo secuencial es tan veloz que el índice ni se nota.

Y estas son las señales de que **no** conviene:

- La tabla es pequeña (decenas o unos pocos cientos de filas).
- La columna casi nunca se usa para filtrar.
- La columna tiene poquísimos valores distintos (por ejemplo, una columna `activo` que solo vale `true` o `false`); ahí el índice aporta muy poco.

> ### 🟦 ¿Que significa? — *JOIN*
> Es una operación que combina filas de dos tablas relacionadas usando una columna que tienen en común. **Para qué sirve:** juntar datos que viven en tablas separadas (un hábito y sus registros de racha). **Dónde aparece:** en RachaSimple, para mostrar “cuántas veces cumpliste cada hábito” se hace un `join` entre `habitos` y `registros_racha` por `habito_id`.

## 7. EXPLAIN: pedirle a la base de datos que te cuente su plan

¿Y cómo sabes si tu índice se está usando o si la consulta sigue haciendo escaneo secuencial? No lo adivines: **pregúntale a Postgres** directamente con `EXPLAIN`.

> ### 🟦 ¿Que significa? — *EXPLAIN*
> Es una instrucción que le pide a la base de datos que te muestre el **plan** que piensa seguir para responder una consulta, sin llegar a ejecutarla del todo. **Para qué sirve:** ver si usará un índice o un escaneo secuencial, y entender por qué una consulta va lenta. **Dónde aparece:** en el editor SQL de Supabase (que usan RachaSimple y Faro) puedes anteponer `explain` a tu `select` y leer el plan que sale.

> ### 🟦 ¿Que significa? — *Plan de ejecución (query plan)*
> Es la “receta” paso a paso que la base de datos decide seguir para resolver tu consulta. **Para qué sirve:** la base de datos tiene varias maneras de obtener el mismo resultado y elige la que cree más rápida; el plan te enseña cuál eligió. **Dónde aparece:** lo ves cuando ejecutas `EXPLAIN` en el editor SQL de Supabase de Faro o RachaSimple.

Se usa así de fácil:

```sql
explain
select * from registros_racha where usuario_id = 'a1b2c3';
```

Postgres te devuelve un texto con su plan. No necesitas entender cada palabra de ahí; basta con cazar dos cosas clave:

- **`Seq Scan`** (escaneo secuencial) → está leyendo la tabla entera. Si la tabla es grande, esto es una bandera roja.
- **`Index Scan`** (escaneo por índice) → está usando un índice. ¡Esa es la buena!

Si ves `Seq Scan` en una consulta que corres muchísimo sobre una tabla grande, ahí tienes tu señal para crear un índice en la columna del `WHERE`.

> ### 🔎 En tu codigo
> Abre el **editor SQL de Supabase** de RachaSimple y corre `explain select * from registros_racha where usuario_id = '<un id real>';`. Fíjate si dice `Seq Scan` o `Index Scan`. Después crea el índice en `usuario_id`, vuelve a correr el `explain` y compara los dos resultados. Vas a ver el cambio con tus propios ojos. 👀

> ### 💡 Tip
> Existe también `EXPLAIN ANALYZE`, que además de mostrar el plan **ejecuta** la consulta y te dice el tiempo real que tardó. Es utilísimo, pero ten cuidado: como ejecuta de verdad, no lo uses a la ligera con `UPDATE` o `DELETE`, porque sí va a cambiar tus datos.

## 8. El caso estrella: por qué `usuario_id` casi siempre se indexa

Ya tienes todas las piezas para entender por qué RachaSimple y Faro indexan tanto la columna `usuario_id`. En realidad son **dos** razones que se juntan y se refuerzan.

**Razón 1: cada usuario solo ve lo suyo.** En estas apps, prácticamente toda consulta es del tipo “dame los datos **de este usuario**”. En RachaSimple: tus hábitos, tus registros de racha, tu perfil. En Faro: tus proyectos, tus fases, tus conexiones. O sea que `usuario_id` aparece en el `WHERE` *todo el tiempo*. Y ya lo sabes: columna muy usada en `WHERE` = candidata perfecta a índice.

**Razón 2: la seguridad a nivel de fila también filtra por usuario.** Aquí entra un concepto importante de Supabase.

> ### 🟦 ¿Que significa? — *RLS (Row Level Security / Seguridad a nivel de fila)*
> Es una característica de Postgres que aplica reglas para decidir, fila por fila, qué puede ver o tocar cada usuario. **Para qué sirve:** que un usuario solo acceda a SUS filas aunque la consulta no lo pida en voz alta; la base de datos lo impone por su cuenta. **Dónde aparece:** RachaSimple y Faro usan RLS en sus tablas para que cada persona lea únicamente sus propios hábitos, proyectos y conexiones.

Una política de RLS típica dice, en cristiano: “solo deja pasar las filas donde `usuario_id` sea igual al id de quien está conectado”. Esa comparación por `usuario_id` se aplica **a cada consulta, de forma automática**, en cada tabla protegida. Es decir: aunque tu `select` ni mencione `usuario_id`, la RLS sí lo hace por debajo, sin que la veas.

¿El resultado? `usuario_id` se usa para filtrar **dos veces** (una por tu `WHERE`, otra por la RLS) en casi todas las consultas. Tener un índice ahí no es ningún lujo: es lo que mantiene la app rápida.

> ### 🔎 En tu codigo
> En Faro revisa las tablas `proyectos`, `fases` y `user_connections`. Todas tienen una columna que ata cada fila a un usuario, y políticas de RLS que filtran por ella. Esa columna es justo la que merece un índice. Confirma cuáles ya lo tienen mirando la lista de índices de la tabla en Supabase.

> ### 🟦 ¿Que significa? — *Cliente de Supabase*
> Es la librería que tu app usa para hablar con la base de datos sin escribir SQL a mano; tú llamas funciones en TypeScript y ella arma la consulta por ti. **Para qué sirve:** consultar y modificar datos desde el código de la app de forma cómoda y segura. **Dónde aparece:** en Faro (Next.js) y RachaSimple, el frontend usa el cliente de Supabase para leer datos.

Así se ve una consulta de RachaSimple hecha desde el cliente. Fíjate cómo filtra por `usuario_id`: precisamente la columna que conviene indexar.

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
> Los índices y un buen caché como TanStack Query son **aliados**, no rivales. El índice hace que *cada* consulta a Postgres salga rápida; TanStack Query hace que *no tengas que repetir* la consulta. Juntos, la app vuela.

## 9. Buenas prácticas para consultas rápidas

Los índices ayudan un montón, pero también importa **cómo** escribes tus consultas. Bit te deja aquí sus consejos favoritos:

**a) Pide solo las columnas que necesitas.** `select *` trae todo, incluso lo que no vas a mirar. Si solo necesitas la fecha y el hábito, pídelos y ya:

```sql
select habito_id, created_at
from registros_racha
where usuario_id = 'a1b2c3';
```

> ### ⚠️ Cuidado
> `select *` es comodísimo para probar, pero en producción puede arrastrar columnas pesadas que ni usas y desperdiciar ancho de banda. En Faro, donde algunas filas guardan textos largos generados por IA, pedir solo lo necesario marca una diferencia real.

**b) Filtra del lado de la base de datos, no en el código.** No traigas 10.000 filas para luego quedarte con 10 a punta de JavaScript. Deja que el `WHERE` (y el índice) hagan el filtrado donde corresponde:

```sql
-- bien: el filtro lo hace Postgres usando el índice
select * from proyectos where usuario_id = 'a1b2c3' and archivado = false;
```

**c) Limita los resultados.** Si en pantalla solo muestras 20 registros, pide 20, no mil:

```sql
select * from registros_racha
where usuario_id = 'a1b2c3'
order by created_at desc
limit 20;
```

> ### 🟦 ¿Que significa? — *LIMIT*
> Es una cláusula que le dice a la consulta cuántas filas como máximo quieres recibir. **Para qué sirve:** evitar traer datos de más y dejar la consulta más liviana. **Dónde aparece:** en RachaSimple, para mostrar “tus últimos 20 registros” se usa `limit 20`.

**d) Cuidado con transformar la columna indexada.** Si envuelves la columna del `WHERE` dentro de una función, el índice puede dejar de servirte:

```sql
-- esto puede IGNORAR el índice de usuario_id:
select * from registros_racha where lower(usuario_id::text) = 'a1b2c3';
```

> ### ⚠️ Cuidado
> Cuando aplicas una función sobre la columna indexada (como `lower(...)`), Postgres a menudo ya no puede usar el índice normal y se devuelve al escaneo secuencial. Procura comparar la columna “tal cual”, sin envolverla, siempre que puedas.

## 10. PolyPaw: el contraste sin base de datos

Para que aprecies de verdad todo esto, miremos un proyecto que **no** usa nada de lo anterior: **PolyPaw**, hecho en Python con Flet, guarda sus datos en **archivos JSON**.

> ### 🟦 ¿Que significa? — *JSON (archivo de datos)*
> Es un formato de texto para guardar datos estructurados (listas, objetos con campos). **Para qué sirve:** almacenar información de forma simple en un archivo, sin montar un servidor de base de datos. **Dónde aparece:** PolyPaw guarda su información (como el progreso de misiones) en archivos JSON dentro del propio proyecto.

En PolyPaw **no hay índices, ni `CREATE INDEX`, ni `EXPLAIN`, ni RLS**. ¿Por qué? Porque sencillamente no hay una base de datos relacional. Para encontrar un dato, el programa carga el archivo JSON completo en memoria y lo recorre con código Python. Y eso funciona perfecto cuando los datos son pocos y caben sin problema en memoria.

> ### ⚠️ Cuidado
> El enfoque de PolyPaw (datos en JSON) es genial para apps pequeñas y locales, pero **no escala** igual que una base de datos. Sin índices, buscar entre cientos de miles de elementos se volvería lento, y tampoco tienes RLS para separar datos por usuario en un servidor. Por eso RachaSimple y Faro, que sí necesitan ser multiusuario y crecer, eligieron Postgres en Supabase.

Esto te ayuda a ver una idea de fondo: **los índices son una herramienta de las bases de datos relacionales**. No son magia que sirva para todo; son la respuesta de Postgres al problema concreto de “buscar rápido entre muchísimas filas, para muchos usuarios a la vez”. Proyectos como tunal-digital (un sitio en HTML/CSS/JS sin backend de datos) o polypaw-nas (un servidor casero con Samba y Cockpit) tampoco tienen índices SQL, simplemente porque su trabajo no es ese.

> ### 🔎 En tu codigo
> Compara mentalmente los dos mundos: en PolyPaw, “buscar la misión X” = leer el JSON y recorrerlo en Python. En RachaSimple, “buscar los registros del usuario X” = un `select` con `WHERE usuario_id = ...` que Postgres resuelve con un índice. Mismo objetivo, herramientas muy distintas según el tamaño del problema.

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
