# Capítulo 01 — ¿Qué es una base de datos?

<p align="center">
  <img src="../../recursos/imagenes/07-bases-de-datos-sql/cap01.png" alt="Ilustración del capítulo (pixel art con Bit)" width="640">
</p>


> Cualquier app que se tome en serio tiene que **recordar** cosas de una sesión a otra: tus
> hábitos, tus proyectos, tu perfil. Ese "recuerdo permanente" es la base de datos. Y antes de
> que te asuste la palabra, te adelanto algo: la idea de fondo es bastante simple. En el fondo,
> es **una tabla**, como las de una hoja de cálculo.

---

## 1. El problema: los datos que no se pierden

¿Te acuerdas del Módulo 03? Allí una variable guardaba un dato… pero recargabas la página y
**se borraba**. Para que tus hábitos sigan ahí mañana, y para que aparezcan también cuando abras
la app en otro dispositivo, hace falta guardarlos en un sitio permanente y central.

> ### 🟦 ¿Qué significa? — *Base de datos*
> Una **base de datos** es un sistema para **guardar, organizar y consultar** información de
> forma permanente y eficiente. No es un simple archivo: está pensada para manejar cantidades
> enormes de datos, encontrarlos rápido y dejar que varias personas trabajen con ellos a la vez
> sin pisarse.

> ### 🟦 ¿Qué significa? — *Persistencia*
> **Persistir** un dato es guardarlo de manera que **sobreviva** al cierre del programa. La RAM
> (Módulo 00) es temporal: se vacía al apagar. La base de datos es lo contrario, permanente.
> Cuando alguien dice "persistencia", se refiere justo a eso: a que los datos se queden.

---

## 2. La idea central: tablas, filas y columnas

La base de datos más común es la **relacional**, y su pieza básica es la **tabla**. Si alguna vez
has trasteado con una hoja de cálculo (Excel, Google Sheets), ya tienes el 80% andado.

> ### 🟦 ¿Qué significa? — *Tabla, fila y columna*
> - Una **tabla** guarda datos de **un tipo de cosa**: una tabla para los hábitos, otra para los
>   usuarios.
> - Las **columnas** son los **campos** (los atributos): nombre, color, meta…
> - Las **filas** (o **registros**) son **cada elemento concreto**: un hábito específico.
>
> Tabla `habitos`:
> | id | nombre     | meta | color   | usuario_id |
> |----|------------|------|---------|------------|
> | 1  | Leer       | 20   | #1B6B6B | 7          |
> | 2  | Ejercicio  | 30   | #D98A3D | 7          |
> | 3  | Meditar    | 10   | #7A5CFF | 9          |
>
> Cada **fila** es un hábito; cada **columna**, un dato de ese hábito. ¿No te resulta familiar?
> Es justo como la **interface `Habito`** del Módulo 05, solo que guardada para siempre. Quédate
> con esta conexión, porque es la clave de todo: una fila de la tabla ≈ un objeto de tu código.

> ### 🟦 ¿Qué significa? — *Esquema (schema)*
> El **esquema** es la **definición** de la tabla: qué columnas tiene y de qué **tipo** es cada
> una (texto, número, fecha, booleano). Piénsalo como el "molde". Lo defines una sola vez, y a
> partir de ahí la tabla solo aceptará datos que encajen en él. Viene a ser una interface de
> TypeScript, pero viviendo dentro de la base de datos.

---

## 3. Relacional: tablas que se conectan

> ### 🟦 ¿Qué significa? — *Base de datos relacional*
> "Relacional" quiere decir que las tablas se **relacionan** unas con otras. En lugar de repetir
> los mismos datos una y otra vez, una tabla **apunta** a otra. Por ejemplo: en vez de guardar el
> nombre del usuario en cada hábito, guardas su `usuario_id`, un número que apunta a la fila de
> ese usuario en la tabla `usuarios`. Así los datos no se duplican y se mantienen coherentes.

> ### 🟦 ¿Qué significa? — *Clave primaria y clave foránea*
> - La **clave primaria** (*primary key*) es la columna que **identifica de forma única** cada
>   fila, casi siempre un `id`. Nunca se repite: funciona como una cédula.
> - La **clave foránea** (*foreign key*) es una columna que **apunta a la clave primaria de otra
>   tabla**. El `usuario_id` de la tabla `habitos` es una clave foránea que apunta a `usuarios.id`.
> Esa es exactamente la "relación" de la que hablábamos. Lo verás con calma en el capítulo 03.

---

## 4. SQL: el idioma para hablar con la base de datos

> ### 🟦 ¿Qué significa? — *SQL*
> **SQL** (*Structured Query Language*, "lenguaje de consulta estructurado") es el **idioma
> estándar** para hablar con las bases de datos relacionales: pedir datos, añadirlos, cambiarlos
> o borrarlos. Se pronuncia "ese-cu-ele" o "síquel", como prefieras. Lo entienden casi todas las
> bases de datos relacionales (Postgres, MySQL, SQLite…).
> Una consulta SQL se lee casi como una frase en inglés:
> ```sql
> SELECT nombre FROM habitos WHERE usuario_id = 7;
> ```
> "Selecciona el nombre, de la tabla hábitos, donde el usuario_id sea 7." Le dedicamos el
> próximo capítulo entero.

> ### 🟦 ¿Qué significa? — *Postgres (PostgreSQL)*
> **Postgres** es uno de los sistemas de base de datos relacional más capaces y queridos que
> existen, y encima es **gratis y de código abierto**. Es el que usa **Supabase** por debajo, o
> sea que es el motor que alimenta a RachaSimple y a Faro. Lo bueno: cuando aprendes SQL con
> Postgres, aprendes algo que te va a servir en casi cualquier trabajo.

---

## 5. Base de datos vs. archivo (PolyPaw vs. RachaSimple)

> ### 🔎 En tu código
> Tus propias apps enseñan las dos maneras de guardar datos:
> - **PolyPaw** guarda en un **archivo JSON** local (`polypaw_db.json`). Es simple y le sobra
>   para empezar, pero tiene sus límites: vive en un único dispositivo, se atasca cuando hay
>   muchos usuarios a la vez y buscar se vuelve lento a medida que crece.
> - **RachaSimple / Faro** guardan en una **base de datos** (Supabase/Postgres): permanente,
>   central, multiusuario, con búsquedas rápidas y seguridad por usuario.
> Por eso, cuando un proyecto crece, lo normal es **migrar** del "archivo" a la "base de datos".
> Conocer las dos opciones es lo que te permite elegir la herramienta adecuada en cada caso.

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Entiendo qué es una **base de datos** y la **persistencia**.
- [ ] Sé qué son **tabla**, **fila** y **columna**, y que una fila ≈ un objeto de mi código.
- [ ] Entiendo qué es un **esquema**.
- [ ] Sé qué significa **relacional** y qué son **clave primaria** y **clave foránea**.
- [ ] Sé qué es **SQL** y qué es **Postgres**.
- [ ] Distingo guardar en **archivo** (PolyPaw) de guardar en **base de datos** (RachaSimple).

---

## 🧪 Ejercicios

1. **Hoja de cálculo.** Dibuja una tabla `usuarios` con columnas `id`, `nombre`, `correo` y dos
   filas de ejemplo. Señala cuál sería la **clave primaria**.
2. **Fila ≈ objeto.** Toma la fila del hábito "Leer" de la tabla del texto y escríbela como un
   objeto de JavaScript/TypeScript (Módulo 05).
3. **Relación.** En la tabla `habitos`, ¿qué columna es una **clave foránea** y a qué tabla
   apunta? ¿Por qué es mejor que repetir el nombre del usuario en cada hábito?
4. **Lee SQL.** Traduce a español: `SELECT color FROM habitos WHERE meta > 15;`
5. **Decide.** Para una app de notas personales de un solo usuario sin conexión, ¿archivo o base
   de datos? ¿Y para una red social? Justifica.

➡️ Siguiente: **[Capítulo 02 — Consultar con SQL](02-consultar-sql.md)**.
