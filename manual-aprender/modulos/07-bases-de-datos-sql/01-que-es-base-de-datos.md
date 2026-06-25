# Capítulo 01 — ¿Qué es una base de datos?

> Toda app seria necesita **recordar** cosas entre sesiones: tus hábitos, tus proyectos, tu
> perfil. Ese "recuerdo permanente" es la base de datos. Empecemos por la idea, que es más
> sencilla de lo que suena: en el fondo, es **una tabla** (como las de una hoja de cálculo).

---

## 1. El problema: los datos que no se pierden

En el Módulo 03, una variable guardaba un dato… hasta que recargabas la página y **se borraba**.
Para que tus hábitos sigan ahí mañana, en otro dispositivo, se necesita guardarlos en un lugar
permanente y central.

> ### 🟦 ¿Qué significa? — *Base de datos*
> Una **base de datos** es un sistema para **guardar, organizar y consultar** información de
> forma permanente y eficiente. No es un simple archivo: está pensada para manejar muchísimos
> datos, buscarlos rápido, y que varias personas los usen a la vez sin pisarse.

> ### 🟦 ¿Qué significa? — *Persistencia*
> **Persistir** un dato es guardarlo de forma que **sobreviva** al cierre del programa. La RAM
> (Módulo 00) es temporal; la base de datos es persistente. "Persistencia" = que los datos
> permanezcan.

---

## 2. La idea central: tablas, filas y columnas

La base de datos más común es la **relacional**, y su unidad es la **tabla**. Si has visto una
hoja de cálculo (Excel, Google Sheets), ya entiendes el 80%.

> ### 🟦 ¿Qué significa? — *Tabla, fila y columna*
> - Una **tabla** guarda datos de **un tipo de cosa** (una tabla de hábitos, otra de usuarios).
> - Las **columnas** son los **campos** (atributos): nombre, color, meta…
> - Las **filas** (o **registros**) son **cada elemento concreto**: un hábito específico.
>
> Tabla `habitos`:
> | id | nombre     | meta | color   | usuario_id |
> |----|------------|------|---------|------------|
> | 1  | Leer       | 20   | #1B6B6B | 7          |
> | 2  | Ejercicio  | 30   | #D98A3D | 7          |
> | 3  | Meditar    | 10   | #7A5CFF | 9          |
>
> Cada **fila** es un hábito; cada **columna** un dato de ese hábito. ¿Te suena? Es como la
> **interface `Habito`** del Módulo 05, pero guardada de forma permanente. Esa conexión es clave:
> una fila de la tabla ≈ un objeto en tu código.

> ### 🟦 ¿Qué significa? — *Esquema (schema)*
> El **esquema** es la **definición** de la tabla: qué columnas tiene y de qué **tipo** es cada
> una (texto, número, fecha, booleano). Es el "molde". Define el esquema una vez, y la tabla solo
> aceptará datos que encajen. (Igual que una interface de TypeScript, pero en la base de datos.)

---

## 3. Relacional: tablas que se conectan

> ### 🟦 ¿Qué significa? — *Base de datos relacional*
> "Relacional" significa que las tablas se **relacionan** entre sí. En vez de repetir datos, una
> tabla **apunta** a otra. Ejemplo: en lugar de guardar el nombre del usuario en cada hábito,
> guardas su `usuario_id` (un número que apunta a la fila de ese usuario en la tabla `usuarios`).
> Así, los datos no se duplican y se mantienen coherentes.

> ### 🟦 ¿Qué significa? — *Clave primaria y clave foránea*
> - La **clave primaria** (*primary key*) es la columna que **identifica de forma única** cada
>   fila, normalmente un `id`. No se repite: como una cédula.
> - La **clave foránea** (*foreign key*) es una columna que **apunta a la clave primaria de otra
>   tabla**. El `usuario_id` de la tabla `habitos` es una clave foránea hacia `usuarios.id`.
> Esto crea la "relación". Lo verás a fondo en el capítulo 03.

---

## 4. SQL: el idioma para hablar con la base de datos

> ### 🟦 ¿Qué significa? — *SQL*
> **SQL** (*Structured Query Language*, "lenguaje de consulta estructurado") es el **idioma
> estándar** para hablar con bases de datos relacionales: pedir datos, agregarlos, cambiarlos,
> borrarlos. Se pronuncia "ese-cu-ele" o "síquel". Casi todas las bases de datos relacionales lo
> entienden (Postgres, MySQL, SQLite…).
> Una consulta SQL se lee casi como inglés:
> ```sql
> SELECT nombre FROM habitos WHERE usuario_id = 7;
> ```
> "Selecciona el nombre, de la tabla hábitos, donde el usuario_id sea 7." Lo aprenderás en el
> próximo capítulo.

> ### 🟦 ¿Qué significa? — *Postgres (PostgreSQL)*
> **Postgres** es uno de los sistemas de base de datos relacional más potentes y queridos, y es
> **gratis y de código abierto**. Es el que usa **Supabase** por debajo, así que es el que
> alimenta a RachaSimple y Faro. Cuando aprendes SQL con Postgres, aprendes algo que vale en casi
> cualquier trabajo.

---

## 5. Base de datos vs. archivo (PolyPaw vs. RachaSimple)

> ### 🔎 En tu código
> Tus apps muestran las dos formas de guardar datos:
> - **PolyPaw** guarda en un **archivo JSON** local (`polypaw_db.json`). Simple y suficiente para
>   empezar, pero: vive en un solo dispositivo, no maneja bien muchos usuarios a la vez, y buscar
>   es lento si crece.
> - **RachaSimple / Faro** guardan en una **base de datos** (Supabase/Postgres): permanente,
>   central, multiusuario, con búsquedas rápidas y seguridad por usuario.
> Por eso un proyecto que crece suele **migrar** de "archivo" a "base de datos". Entender ambos te
> deja elegir la herramienta correcta según el caso.

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
