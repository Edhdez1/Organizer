# Capitulo 08 — Consultas avanzadas y JOIN a fondo

<p align="center">
  <img src="../../recursos/imagenes/07-bases-de-datos-sql/cap08.png" alt="Ilustración del capítulo (pixel art con Bit)" width="640">
</p>


> Hola otra vez, soy **Bit**, tu ajolote acompañante. En el capitulo pasado aprendiste a sacar filas de una sola tabla con `SELECT`. El problema es que la vida real casi nunca cabe en una tabla sola: un habito acumula muchos registros de racha, un proyecto tiene varias fases. ¿Como juntamos todo eso sin volvernos locos? Con `JOIN`. Aqui vamos con calma, usando las tablas de verdad de **RachaSimple** (la app de habitos) y de **Faro/Organizer** (el organizador de proyectos), las dos en Supabase/Postgres. Respira, mueve las branquias, y arrancamos.

## 1. Por que necesitamos unir tablas

En una base de datos relacional la informacion **no va toda junta en un mismo sitio**. La repartimos en tablas y las conectamos con referencias. En **RachaSimple** tienes una tabla `habitos` y otra `registros` (un registro por cada dia que cumples un habito). En **Faro/Organizer** tienes `proyectos` por un lado y `fases` por otro.

¿Y por que no meterlo todo en una tabla enorme? Porque acabarias repitiendote sin parar. Si guardaras el nombre del habito dentro de cada registro de racha, lo escribirias mil veces. Es mucho mas limpio que el habito viva una sola vez en su tabla y que cada registro **apunte** a el con su `id`.

> ### 🟦 ¿Que significa? — *Tabla relacional*
> Una tabla es una rejilla de filas y columnas, igual que una hoja de calculo. Lo de "relacional" quiere decir que las tablas se **conectan** entre si a traves de valores que comparten (un id). Sirve para no repetir datos y tener todo en orden. En **RachaSimple**, `habitos` y `registros` son dos tablas relacionadas: cada registro pertenece a un habito.

> ### 🟦 ¿Que significa? — *Clave foranea (foreign key)*
> Es una columna que guarda el `id` de una fila de **otra** tabla, y asi tiende un puente entre las dos. Su trabajo es decir "este registro pertenece a este habito". En **Faro/Organizer**, la tabla `fases` tiene una columna `proyecto_id` que es clave foranea hacia `proyectos.id`: gracias a ella cada fase sabe de que proyecto es.

> ### 🔎 En tu codigo
> En **PolyPaw** (Python/Flet) los datos viven en archivos **JSON**, sin tablas ni claves foraneas. Para enlazar una mascota con sus misiones tienes que abrir el archivo y recorrerlo a mano con Python. En **RachaSimple** y **Faro**, en cambio, ese enlace lo resuelve la propia base de datos con un `JOIN`. Ahi esta la diferencia de fondo entre "datos en archivos" y "base de datos relacional".

## 2. INNER JOIN: lo que coincide en ambas tablas

Arranquemos con el `JOIN` que mas vas a usar. La idea es traer cada registro de racha **junto con** el nombre de su habito.

> ### 🟦 ¿Que significa? — *JOIN*
> `JOIN` es la instruccion de SQL para **combinar filas de dos tablas** segun una condicion (lo normal es que coincida un id). Sirve para contestar preguntas que cruzan tablas, del tipo "¿que registros pertenecen a este habito?". En **RachaSimple** lo usamos para mostrar la lista de dias cumplidos con el nombre del habito al lado.

> ### 🟦 ¿Que significa? — *INNER JOIN*
> Es el tipo de `JOIN` que devuelve **solo las filas que tienen pareja en las dos tablas**. Si un registro se quedo sin habito (o un habito sin registros), no sale. Te sirve cuando solo te importan las coincidencias. En **Faro** lo usariamos para listar fases que de verdad tienen un proyecto valido asociado.

```sql
SELECT registros.fecha, habitos.nombre
FROM registros
INNER JOIN habitos
  ON registros.habito_id = habitos.id;
```

Veamoslo linea por linea, sin prisa:

- `FROM registros`: arrancamos por la tabla de registros.
- `INNER JOIN habitos`: queremos pegarle la tabla de habitos.
- `ON registros.habito_id = habitos.id`: aqui esta la regla de union. Empareja cada registro con el habito cuyo `id` coincide con su `habito_id`.
- `SELECT registros.fecha, habitos.nombre`: elegimos que columnas mostrar de cada tabla.

> ### 🟦 ¿Que significa? — *ON (la condicion de union)*
> Es la palabra que dice **como** se emparejan las filas de las dos tablas. Casi siempre significa "esta columna de aqui es igual a esta de alla". Sirve para que la base sepa que fila va con cual. Sin `ON`, Postgres no tiene forma de saber como casar `registros` con `habitos`.

> ### ⚠️ Cuidado
> Si te olvidas del `ON`, Postgres puede acabar combinando **cada fila con todas las demas** (un producto cartesiano). Con 100 registros y 10 habitos te quedarian 1000 filas sin ningun sentido. Pon siempre tu condicion de union.

> ### 🟦 ¿Que significa? — *Producto cartesiano*
> Es lo que ocurre cuando unes dos tablas **sin** condicion `ON`: cada fila de una se combina con **todas** las filas de la otra. Con 100 registros y 10 habitos salen 100 × 10 = 1000 filas, casi todas inutiles. Solo tiene sentido en casos muy raros; en el dia a dia de **RachaSimple** y **Faro** es un error que se evita poniendo siempre tu `ON`.

> ### 💡 Tip
> "Inner" significa "interno": imagina la **interseccion** de dos circulos, solo lo que cae en los dos a la vez. Y un detalle util: si escribes solo `JOIN`, Postgres entiende que quieres un `INNER JOIN`.

## 3. Alias de tabla: escribir menos y leer mejor

Escribir `registros.fecha` y `habitos.nombre` una y otra vez termina cansando. Justo para eso existen los **alias**.

> ### 🟦 ¿Que significa? — *Alias de tabla*
> Es un **apodo corto** que le pones a una tabla dentro de la consulta. Sirve para escribir menos y para que la consulta se lea con mas claridad, sobre todo cuando juntas varias tablas. En las consultas de **Faro** resulta comodo escribir `p` para `proyectos` y `f` para `fases`.

```sql
SELECT r.fecha, h.nombre
FROM registros AS r
INNER JOIN habitos AS h
  ON r.habito_id = h.id;
```

Le pusimos `r` a `registros` y `h` a `habitos`. La palabra `AS` es opcional: `FROM registros r` funciona exactamente igual. En **Faro** es lo mismo:

```sql
SELECT p.nombre AS proyecto, f.titulo AS fase, f.estado
FROM proyectos AS p
INNER JOIN fases AS f
  ON f.proyecto_id = p.id;
```

Aqui ademas usamos `AS` para renombrar **columnas** en el resultado: `p.nombre` saldra bajo el encabezado `proyecto` y `f.titulo` como `fase`. La tabla de salida se lee mucho mejor asi.

> ### 💡 Tip
> Elige alias que tengan sentido: `p` para proyectos, `f` para fases, `h` para habitos. Una sola letra va bien en consultas cortas. Cuando la cosa se complica, `proj` o `fase` pueden quedar mas claros.

## 4. LEFT JOIN: incluir tambien lo que no tiene pareja

El `INNER JOIN` esconde lo que no coincide. Pero hay veces en que eso es precisamente lo que queremos ver: **habitos que todavia no tienen ningun registro** (esos dias que prometiste y no cumpliste, que te estoy mirando, Bit). Para eso esta el `LEFT JOIN`.

> ### 🟦 ¿Que significa? — *LEFT JOIN*
> Devuelve **todas las filas de la tabla de la izquierda** (la que va en el `FROM`), y las de la derecha solo cuando hay coincidencia. Donde no hay pareja, las columnas de la derecha quedan en `NULL`. Sirve para no perder filas por el camino. En **RachaSimple** lo usariamos para mostrar todos los habitos, incluso los que el usuario nunca llego a registrar.

```sql
SELECT h.nombre, r.fecha
FROM habitos AS h
LEFT JOIN registros AS r
  ON r.habito_id = h.id;
```

Aqui `habitos` es la tabla "izquierda" (la del `FROM`). Salen **todos** los habitos. Si alguno no tiene registros, aparecera con `r.fecha` en `NULL`.

> ### 🟦 ¿Que significa? — *NULL*
> `NULL` quiere decir "no hay valor / dato ausente". No es un cero ni un texto vacio: es **la nada**. Sirve para representar "aqui falta informacion". En un `LEFT JOIN`, las columnas de la tabla derecha salen en `NULL` cuando no hubo coincidencia.

Si lo que buscas son justamente los habitos **sin** registros (los abandonados), filtras por ese `NULL`:

```sql
SELECT h.nombre
FROM habitos AS h
LEFT JOIN registros AS r
  ON r.habito_id = h.id
WHERE r.id IS NULL;
```

> ### ⚠️ Cuidado
> Para comparar con `NULL` se usa `IS NULL` / `IS NOT NULL`, **nunca** `= NULL`. Escribir `WHERE r.id = NULL` no da error, pero **no encuentra nada jamas**, porque `NULL` no es igual a nada, ni siquiera a si mismo. Es uno de los tropiezos mas tipicos.

## 5. RIGHT JOIN: el espejo del LEFT

> ### 🟦 ¿Que significa? — *RIGHT JOIN*
> Es el reverso del `LEFT JOIN`: devuelve **todas las filas de la tabla de la derecha** y las de la izquierda solo si coinciden. Hace lo mismo que un `LEFT JOIN`, pero mirando desde el otro lado. En la practica se ve poco, porque casi siempre puedes reescribirlo como `LEFT JOIN` cambiando el orden de las tablas.

```sql
SELECT h.nombre, r.fecha
FROM registros AS r
RIGHT JOIN habitos AS h
  ON r.habito_id = h.id;
```

Este `RIGHT JOIN` da el mismo resultado que el `LEFT JOIN` del apartado anterior: trae todos los habitos. La tabla "completa" es `habitos`, que esta vez queda a la derecha.

> ### 💡 Tip
> Casi todos los desarrolladores tiran de `LEFT JOIN` y rara vez escriben `RIGHT JOIN`, porque cuesta menos pensar "empiezo por esta tabla y le voy pegando las demas". Si el `RIGHT` te lia, dale la vuelta al orden y usa `LEFT`: misma respuesta, mente mas tranquila.

## 6. Unir tres tablas a la vez

Los `JOIN` se pueden encadenar. En **RachaSimple** existe una tabla `perfiles` (un perfil por usuario). Imagina que queremos el nombre del usuario, el nombre del habito y la fecha del registro, todo de una vez.

> ### 🟦 ¿Que significa? — *Encadenar JOINs*
> Es poner varios `JOIN` seguidos para combinar tres o mas tablas en una misma consulta. Cada `JOIN` suma una tabla mas con su propia condicion `ON`. Sirve para responder preguntas que cruzan muchas tablas. En **Faro** lo usariamos para traer el dueño del proyecto, el proyecto y sus fases en una sola consulta.

```sql
SELECT pe.nombre AS usuario, h.nombre AS habito, r.fecha
FROM registros AS r
INNER JOIN habitos AS h
  ON r.habito_id = h.id
INNER JOIN perfiles AS pe
  ON h.user_id = pe.id;
```

Leelo como una cadena: empiezo por `registros`, le pego `habitos` (por `habito_id`) y a `habitos` le pego `perfiles` (por `user_id`). Cada `JOIN` viene con su `ON`.

> ### ⚠️ Cuidado
> Cuando trabajes con varias tablas, **antepon siempre el alias** a la columna (`h.nombre`, `pe.nombre`). Si `habitos` y `perfiles` tienen las dos una columna `nombre` y escribes solo `nombre`, Postgres protesta con un error de "columna ambigua" porque no sabe a cual te refieres.

## 7. Subconsultas: una consulta dentro de otra

A veces necesitas un resultado intermedio para usarlo dentro de otra consulta. Eso es una **subconsulta**.

> ### 🟦 ¿Que significa? — *Subconsulta*
> Es un `SELECT` metido **dentro** de otro, casi siempre entre parentesis. La interna se ejecuta primero y la externa aprovecha su resultado. Sirve para preguntas que se resuelven en dos pasos. En **Faro** podriamos pedir "las fases de los proyectos que estan activos" averiguando primero cuales proyectos lo estan.

Ejemplo en **Faro**: traer las fases que pertenecen a proyectos en estado `'activo'`.

```sql
SELECT f.titulo, f.estado
FROM fases AS f
WHERE f.proyecto_id IN (
  SELECT p.id
  FROM proyectos AS p
  WHERE p.estado = 'activo'
);
```

Lo de dentro del parentesis corre primero: devuelve una lista de `id` de proyectos activos. Despues la consulta de fuera trae las fases cuyo `proyecto_id` aparece **en** esa lista.

> ### 🟦 ¿Que significa? — *IN*
> `IN` comprueba si un valor esta **dentro de una lista** de valores. Sirve para filtrar por varias opciones de golpe. Le puedes dar valores fijos (`WHERE estado IN ('activo','pausado')`) o una subconsulta que genera la lista, como en el ejemplo de **Faro** de arriba.

> ### 💡 Tip
> Muchas subconsultas con `IN` se pueden reescribir como `JOIN`, y a menudo corren mas rapido. Pero la subconsulta a veces se **lee** mas clara ("dame las fases de proyectos activos"). Empieza por lo que entiendas mejor; ya optimizaras despues.

## 8. EXISTS: ¿hay al menos uno?

Hay otra manera de preguntar "¿existe algo relacionado?": con `EXISTS`.

> ### 🟦 ¿Que significa? — *EXISTS*
> `EXISTS` recibe una subconsulta y devuelve verdadero si esa subconsulta produce **al menos una fila**. Da igual cuantas, solo importa si hay alguna. Sirve para preguntar "¿existe relacion?". En **RachaSimple** lo usariamos para traer los habitos que tienen **al menos un** registro de racha.

```sql
SELECT h.nombre
FROM habitos AS h
WHERE EXISTS (
  SELECT 1
  FROM registros AS r
  WHERE r.habito_id = h.id
);
```

Fijate en que la subconsulta menciona `h.id`, que viene de la consulta externa. Por cada habito, Postgres revisa si hay **algun** registro con ese `habito_id`. Si lo hay, el habito pasa el filtro.

> ### 💡 Tip
> Lo del `SELECT 1` de dentro es una costumbre: a `EXISTS` no le importa **que** seleccionas, solo si hay filas. Puedes poner `SELECT 1`, `SELECT *` o lo que quieras; el resultado no cambia. `SELECT 1` deja claro el mensaje: "no me interesa el contenido, solo si existe".

> ### 🔎 En tu codigo
> `IN` vs `EXISTS`: los dos contestan "¿hay relacion?", pero `EXISTS` suele rendir mejor cuando la subconsulta usa una columna de la consulta externa (como ese `h.id` de arriba), mientras que `IN` brilla cuando comparas contra una lista fija o pequeña. En **Faro** y **RachaSimple**, para "¿este proyecto tiene fases?" o "¿este habito tiene registros?", `EXISTS` encaja de maravilla.

## 9. DISTINCT: eliminar duplicados

Al unir tablas, un mismo valor puede repetirse varias veces. Si un habito tiene 30 registros y unes las dos tablas, su nombre aparece 30 veces. Para quedarte solo con valores **unicos** existe `DISTINCT`.

> ### 🟦 ¿Que significa? — *DISTINCT*
> Es una palabra que pones tras `SELECT` para que el resultado **no repita filas iguales**. Sirve para obtener la lista de valores unicos. En **RachaSimple**, para responder "¿de que habitos hay registros?" sin que cada nombre salga decenas de veces.

```sql
SELECT DISTINCT h.nombre
FROM registros AS r
INNER JOIN habitos AS h
  ON r.habito_id = h.id;
```

Sin `DISTINCT` el nombre se repetiria una vez por cada registro. Con `DISTINCT`, cada nombre sale una sola vez.

> ### ⚠️ Cuidado
> `DISTINCT` mira **todas** las columnas del `SELECT` a la vez. `SELECT DISTINCT h.nombre, r.fecha` toma como unica cada **combinacion** nombre+fecha, no solo el nombre. Si esperabas un nombre por fila y te salen repetidos, casi seguro hay otra columna metiendo variedad.

## 10. Ordenar por varias columnas

Ya conoces `ORDER BY` para ordenar. Lo nuevo: puedes ordenar por **varias columnas**, usando una como desempate de la otra.

> ### 🟦 ¿Que significa? — *ORDER BY con varias columnas*
> Ordena el resultado por la primera columna y, cuando hay empates, recurre a la segunda para desempatar, luego a la tercera, y asi. `ASC` es ascendente (de menor a mayor) y `DESC` descendente. Sirve para listados ordenados con criterio fino. En **Faro**, ordenar las fases por proyecto y, dentro de cada proyecto, por su orden.

```sql
SELECT p.nombre AS proyecto, f.titulo, f.orden
FROM proyectos AS p
INNER JOIN fases AS f
  ON f.proyecto_id = p.id
ORDER BY p.nombre ASC, f.orden ASC;
```

Primero te agrupa visualmente por nombre de proyecto (A→Z) y, dentro de cada uno, ordena las fases por su columna `orden`. En **RachaSimple**, con los registros mas recientes primero:

```sql
SELECT h.nombre, r.fecha
FROM registros AS r
INNER JOIN habitos AS h
  ON r.habito_id = h.id
ORDER BY r.fecha DESC, h.nombre ASC;
```

> ### 💡 Tip
> El orden de las columnas en `ORDER BY` importa: `fecha DESC, nombre ASC` no es lo mismo que `nombre ASC, fecha DESC`. La primera manda; las demas solo deciden los empates.

## 11. LIMIT y OFFSET: paginacion

Una tabla puede tener miles de filas, y no quieres traerlas todas de golpe. Aqui entran `LIMIT` y `OFFSET`, la base de la **paginacion** (mostrar los resultados de a pocos, pagina por pagina).

> ### 🟦 ¿Que significa? — *LIMIT*
> `LIMIT n` dice que quieres **como mucho n filas**. Sirve para no traer mas de lo que necesitas. En **RachaSimple**, para enseñar en pantalla solo los ultimos 10 registros de racha.

> ### 🟦 ¿Que significa? — *OFFSET*
> `OFFSET m` indica **cuantas filas saltarte** desde el principio antes de empezar a devolver. Junto con `LIMIT`, te deja avanzar de pagina en pagina. En **Faro**, para la "pagina 2" de un listado de proyectos.

```sql
SELECT h.nombre, r.fecha
FROM registros AS r
INNER JOIN habitos AS h
  ON r.habito_id = h.id
ORDER BY r.fecha DESC
LIMIT 10 OFFSET 0;
```

Esa es la **pagina 1**: las primeras 10 filas. Para la **pagina 2**, te saltas 10:

```sql
... ORDER BY r.fecha DESC
LIMIT 10 OFFSET 10;
```

El patron general es: `OFFSET = (numero_de_pagina - 1) * tamaño_de_pagina`. La pagina 3 con paginas de 10 te da `OFFSET 20`.

> ### ⚠️ Cuidado
> Acompaña **siempre** `LIMIT`/`OFFSET` con un `ORDER BY`. Sin un orden fijo, Postgres puede devolver las filas como le venga en gana, y "las primeras 10" cambiarian de una llamada a otra. El resultado seria filas repetidas o saltadas al pasar de pagina. El `ORDER BY` ancla la lista.

> ### 🔎 En tu codigo
> En **RachaSimple** y **Faro** muchas veces no escribes este SQL a mano: tiras del **cliente de Supabase** desde TypeScript. La libreria traduce tus llamadas a un `SELECT ... JOIN ... LIMIT ...` por debajo. Asi se ve traer un habito con sus registros:

```ts
// Cliente de Supabase en RachaSimple (TypeScript)
const { data, error } = await supabase
  .from("habitos")
  .select("id, nombre, registros(fecha)") // trae el habito y sus registros relacionados
  .order("created_at", { ascending: false })
  .range(0, 9); // equivale a LIMIT 10 OFFSET 0 (filas 0 a 9)
```

> ### 🟦 ¿Que significa? — *Cliente de Supabase*
> Es una libreria de JavaScript/TypeScript que habla con tu base de datos Postgres sin que tengas que escribir SQL a mano. Tu pides datos con metodos (`.select()`, `.order()`, `.range()`) y ella arma la consulta. En **RachaSimple** y **Faro** se combina con **TanStack Query** para guardar los resultados en cache y refrescarlos cuando toca.

> ### 🟦 ¿Que significa? — *TanStack Query*
> Es una libreria que **guarda en cache** los datos que ya pediste y decide cuando conviene volver a pedirlos, para no golpear la base de datos en cada pantalla. Sirve para que la app vaya rapida y muestre datos frescos sin repetir consultas. En **RachaSimple** y **Faro** envuelve las llamadas del cliente de Supabase: si dos pantallas piden los mismos habitos, la consulta viaja una sola vez.

> ### 🟦 ¿Que significa? — *Cache*
> Es una copia temporal de datos que guardas "a mano" para reusarla sin volver a buscarla en la fuente original. Sirve para ahorrar trabajo y tiempo. En **RachaSimple** y **Faro**, TanStack Query mantiene en cache los habitos o proyectos ya cargados, asi al volver a una pantalla se ven al instante.

> ### 🔎 En tu codigo
> En el `.select("id, nombre, registros(fecha)")` de arriba, Supabase detecta la **clave foranea** entre `registros` y `habitos` y monta el `JOIN` por ti. Por eso es tan importante que la relacion exista en la base: sin ella, no sabria como unir las tablas. Y gracias a las **politicas RLS**, cada usuario recibe solo **sus** habitos y registros, aunque tu no escribas ningun filtro de usuario.

> ### 🟦 ¿Que significa? — *RLS (Row Level Security)*
> Es una funcion de Postgres que filtra **automaticamente** las filas segun reglas de seguridad, casi siempre "cada usuario solo ve sus propias filas". Sirve para que ningun usuario llegue a los datos de otro. En **RachaSimple** y **Faro** protege habitos, registros, proyectos, fases y conexiones de usuario, incluso cuando tus consultas no mencionan al usuario.

## 12. Juntando todo: un proyecto con sus fases, paginado

Cerremos con una consulta que mezcla casi todo lo del capitulo, esta vez sobre **Faro**:

```sql
SELECT DISTINCT
  p.nombre AS proyecto,
  f.titulo AS fase,
  f.estado
FROM proyectos AS p
LEFT JOIN fases AS f
  ON f.proyecto_id = p.id
WHERE p.estado IN ('activo', 'pausado')
ORDER BY p.nombre ASC, f.titulo ASC
LIMIT 20 OFFSET 0;
```

En palabras, lo que hace es: trae los proyectos `activo` o `pausado` (`IN`), les pega sus fases sin dejar fuera a los proyectos que no tienen ninguna (`LEFT JOIN`), descarta filas duplicadas (`DISTINCT`), lo ordena por proyecto y luego por fase, y devuelve solo las primeras 20 filas (`LIMIT`/`OFFSET`). Una sola consulta contesta una pregunta muy concreta. Eso es lo que te da el SQL avanzado.

> ### 💡 Tip
> No intentes escribir consultas asi de un tiron. Construyelas por capas: primero el `JOIN` solo, miras el resultado; luego le añades el `WHERE`, miras; despues el `ORDER BY`; y al final el `LIMIT`. En el **editor SQL de Supabase** puedes ejecutar cada version y ver como va cambiando. Equivocarse pronto y en poca cosa es mucho mas facil de arreglar.

## ✅ Checklist — ¿ya domino esto?

- [ ] Entiendo por que separamos los datos en varias tablas y como una clave foranea las conecta.
- [ ] Se hacer un `INNER JOIN` con su condicion `ON` y explicar que solo trae coincidencias.
- [ ] Puedo poner alias de tabla (`r`, `h`, `p`, `f`) y de columna con `AS`.
- [ ] Distingo `LEFT JOIN` de `INNER JOIN` y se que el `LEFT` conserva la tabla de la izquierda con `NULL` donde falta pareja.
- [ ] Se que `RIGHT JOIN` es el espejo del `LEFT` y que casi siempre puedo usar `LEFT` dandole la vuelta.
- [ ] Comparo con `NULL` usando `IS NULL` / `IS NOT NULL`, nunca `= NULL`.
- [ ] Puedo encadenar dos o tres `JOIN` y antepongo el alias a cada columna para evitar ambiguedad.
- [ ] Se usar una subconsulta con `IN` y entiendo cuando conviene `EXISTS`.
- [ ] Uso `DISTINCT` para quitar duplicados y se que mira todas las columnas del `SELECT`.
- [ ] Ordeno por varias columnas y entiendo que la primera manda y las demas desempatan.
- [ ] Pagino con `LIMIT` y `OFFSET` y siempre acompaño con `ORDER BY`.

## 🧪 Ejercicios

1. 💻 En el **editor SQL de Supabase** (o en papel si todavia no tienes acceso), escribe un `INNER JOIN` que traiga el `titulo` de cada fase junto con el `nombre` de su proyecto en **Faro**. Usa alias `p` y `f`.

2. 💻 Convierte el ejercicio 1 en un `LEFT JOIN` partiendo de `proyectos`. Despues añade `WHERE f.id IS NULL` para encontrar los **proyectos sin ninguna fase**. Explica con tus palabras por que aparece `NULL`.

3. 💻 En **RachaSimple**, escribe una consulta que traiga los `nombre` **unicos** (con `DISTINCT`) de los habitos que tienen al menos un registro, usando un `JOIN` entre `registros` y `habitos`.

4. Sin computadora: reescribe el ejercicio 3 usando `EXISTS` en lugar de `JOIN`. Pista: la subconsulta debe comparar `r.habito_id = h.id`. ¿Cual de las dos versiones te resulta mas clara?

5. 💻 Escribe una consulta paginada sobre los `registros` de **RachaSimple**: ordena por `fecha DESC` y trae la **pagina 2** con paginas de 5 filas. ¿Que `LIMIT` y que `OFFSET` necesitas?

6. Reto: en **Faro**, combina todo en una sola consulta — trae proyecto y fase con un `LEFT JOIN`, filtra proyectos cuyo `estado` este `IN ('activo','pausado')`, ordena por `p.nombre ASC, f.titulo ASC` y limita a las primeras 10 filas. Compara tu respuesta con la consulta de la seccion 12.

> ¡Lo lograste! Pasaste de mirar una tabla a cruzar varias como un detective de datos. Los `JOIN` al principio parecen magia, pero ya viste que en el fondo son solo "pega esta tabla con aquella donde los ids coincidan". Practica en el editor de Supabase, equivocate sin miedo, y nos vemos en el siguiente capitulo. — Bit 🪸
