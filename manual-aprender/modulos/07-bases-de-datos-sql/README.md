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
| 06 | [Diseñar tablas: tipos y esquema](06-disenar-tablas-y-tipos.md) | Tipos de Postgres, `NOT NULL`, `DEFAULT`, esquema |
| 07 | [Claves y relaciones](07-claves-y-relaciones.md) | Primary/foreign key, uno-a-muchos, `CASCADE` |
| 08 | [Consultas avanzadas y JOIN](08-consultas-avanzadas.md) | `INNER`/`LEFT JOIN`, subconsultas, paginación |
| 09 | [Agregaciones y GROUP BY](09-agregaciones-y-grupos.md) | `COUNT`/`SUM`/`AVG`, `GROUP BY`, `HAVING`, `CASE` |
| 10 | [Índices y rendimiento](10-indices-y-rendimiento.md) | Qué es un índice, cuándo crearlo, `EXPLAIN` |
| 11 | [Supabase a fondo](11-supabase-a-fondo.md) | `supabase-js`, `.from().select()`, filtros, claves |
| 12 | [Row-Level Security (RLS) a fondo](12-rls-a-fondo.md) | Políticas, `auth.uid()`, proteger datos por usuario |
| 13 | [Migraciones y cambios de esquema](13-migraciones-y-cambios.md) | `ALTER TABLE`, versionar el esquema, seeds |
| 14 | [Mini-proyecto: diseña una base de datos](14-mini-proyecto-bd.md) | La BD de una app de hábitos desde cero |
| 15 | [Glosario de bases de datos](15-glosario-sql.md) | Todos los términos + mapa mental |

> ✅ **Módulo 07 — versión ampliada (capítulos 01–15, ~100 páginas).**

➡️ Empieza por **[Capítulo 01 — ¿Qué es una base de datos?](01-que-es-base-de-datos.md)**.
