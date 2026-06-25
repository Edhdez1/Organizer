# Módulo 07 — Bases de datos y SQL

<p align="center">
  <img src="../../recursos/imagenes/07-bases-de-datos-sql/portada.png" alt="Bit como archivista organizando una base de datos pixel art con cajones etiquetados y un candado de seguridad" width="640">
</p>

> **Objetivo del módulo:** entender **dónde y cómo se guardan los datos** de una app. Aprenderás
> qué es una base de datos, el lenguaje **SQL** para hablar con ella, y **Supabase** (la base de
> datos en la nube que usan RachaSimple y Faro), incluida la seguridad con **RLS**.

Hasta ahora tus datos vivían en variables que **desaparecen** al recargar. Una base de datos los
guarda **para siempre** y los comparte entre dispositivos y usuarios. Es la "memoria a largo
plazo" de una app.

---

## ¿De dónde sale esto en TUS proyectos?

`RachaSimple` y `Faro` guardan todo en **Supabase** (una base de datos **Postgres**). Tus
hábitos, check-ins, proyectos y fuentes viven en tablas, protegidas por **RLS** (cada usuario
solo ve lo suyo). PolyPaw, en cambio, usa un archivo JSON local (Módulo 04): aquí verás la
diferencia entre "guardar en un archivo" y "guardar en una base de datos de verdad".

---

## ¿Qué vas a poder hacer al terminar?

- Explicar qué es una base de datos relacional: **tablas, filas y columnas**.
- Escribir **SQL** para consultar (`SELECT`), filtrar (`WHERE`) y ordenar datos.
- Insertar, actualizar y borrar datos (`INSERT`, `UPDATE`, `DELETE`).
- Entender las **relaciones** entre tablas (claves primaria y foránea, `JOIN`).
- Saber qué es **Supabase** y cómo tus apps hablan con él.
- Entender **RLS** (seguridad por usuario) y por qué es vital.

---

## Capítulos

| # | Capítulo | Qué cubre |
|---|---|---|
| 01 | [¿Qué es una base de datos?](01-que-es-base-de-datos.md) | Tablas/filas/columnas, relacional, por qué SQL |
| 02 | [Consultar con SQL](02-consultar-sql.md) | `SELECT`, `WHERE`, `ORDER BY`, filtrar |
| 03 | [Modificar y relacionar](03-modificar-y-relacionar.md) | `INSERT`/`UPDATE`/`DELETE`, claves, `JOIN` |
| 04 | [Supabase: Postgres en la nube](04-supabase.md) | Qué es, tablas, cómo la app se conecta |
| 05 | [Seguridad: RLS y autenticación](05-rls-y-auth.md) | Row-Level Security, login, por qué importa |

> Se publican por tandas. Empieza por el 01.

➡️ Empieza por **[Capítulo 01 — ¿Qué es una base de datos?](01-que-es-base-de-datos.md)**.
