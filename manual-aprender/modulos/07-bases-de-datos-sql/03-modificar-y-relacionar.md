# Capítulo 03 — Modificar y relacionar

> Ya sabes **leer** datos. Ahora aprendes a **crear, cambiar y borrar** filas, y a **combinar
> tablas relacionadas** con `JOIN`. Con esto cierras las cuatro operaciones básicas de cualquier
> base de datos, conocidas como **CRUD**.

---

## 1. CRUD: las cuatro operaciones

> ### 🟦 ¿Qué significa? — *CRUD*
> **CRUD** son las iniciales de las cuatro cosas que se hacen con datos:
> - **C**reate (crear) → `INSERT`
> - **R**ead (leer) → `SELECT` (capítulo anterior)
> - **U**pdate (actualizar) → `UPDATE`
> - **D**elete (borrar) → `DELETE`
> Toda app de datos, en el fondo, hace CRUD. RachaSimple crea hábitos, los lee, los actualiza y
> los borra: CRUD puro.

---

## 2. `INSERT`: crear filas

> ### 🟦 ¿Qué significa? — *`INSERT INTO`*
> Agrega una fila nueva a una tabla:
> ```sql
> INSERT INTO habitos (nombre, meta, color, usuario_id)
> VALUES ('Caminar', 25, '#2BB673', 7);
> ```
> Primero las **columnas**, luego los **valores** en el mismo orden. El `id` normalmente **no** se
> pone: la base de datos lo asigna sola (clave primaria autoincremental).

---

## 3. `UPDATE`: cambiar filas

> ### 🟦 ¿Qué significa? — *`UPDATE ... SET ... WHERE`*
> Cambia datos de filas existentes. `SET` indica qué columnas cambiar; `WHERE` **a cuáles filas**:
> ```sql
> UPDATE habitos SET meta = 30 WHERE id = 1;
> ```
> "En la tabla habitos, pon meta = 30, en la fila cuyo id sea 1."

> ### ⚠️ Cuidado — ¡NUNCA olvides el `WHERE` en UPDATE/DELETE!
> Esto es **crítico**. Si escribes `UPDATE habitos SET meta = 30;` **sin `WHERE`**, cambias la
> meta de **TODAS** las filas de la tabla. Lo mismo con `DELETE`. Es un error famoso que ha
> borrado bases de datos enteras en empresas reales. Regla de oro: **antes de un UPDATE/DELETE,
> escribe primero el `WHERE`**, y si dudas, pruébalo como `SELECT` para ver a qué filas afectará.

---

## 4. `DELETE`: borrar filas

> ### 🟦 ¿Qué significa? — *`DELETE FROM ... WHERE`*
> Borra filas que cumplen una condición:
> ```sql
> DELETE FROM habitos WHERE id = 3;
> ```
> "Borra de habitos la fila cuyo id sea 3." (Recuerda el aviso de arriba: sin `WHERE`, borra todo.)

> ### 💡 Tip — Borrado "suave" (soft delete)
> Muchas apps **no borran de verdad**: marcan la fila como inactiva (una columna `archivado = true`)
> para poder recuperarla. Es lo que hace RachaSimple para "no perder" tu progreso al pausar un
> hábito. Un `UPDATE` disfrazado de borrado, más seguro que un `DELETE`.

---

## 5. Relacionar tablas: `JOIN`

Aquí brilla lo "relacional". Recuerda: la tabla `habitos` guarda `usuario_id`, no el nombre del
usuario. Para mostrar "Leer — de Edwar", hay que **combinar** las dos tablas.

> ### 🟦 ¿Qué significa? — *`JOIN` (combinar tablas)*
> `JOIN` une filas de dos tablas **emparejándolas por una columna en común** (la clave foránea
> con la primaria). 
> ```sql
> SELECT habitos.nombre, usuarios.nombre
> FROM habitos
> JOIN usuarios ON habitos.usuario_id = usuarios.id;
> ```
> "Dame el nombre del hábito y el nombre del usuario, combinando habitos con usuarios donde el
> `usuario_id` del hábito coincida con el `id` del usuario." El resultado mezcla datos de ambas
> tablas en una sola respuesta.

> ### 🟦 ¿Qué significa? — *La cláusula `ON`*
> El `ON` dice **cómo emparejar** las filas: la condición de coincidencia (normalmente
> `tablaA.clave_foranea = tablaB.clave_primaria`). Es el "pegamento" del JOIN.

> ### 💡 Tip — Por qué no se duplican los datos
> Sin relaciones, tendrías que escribir el nombre del usuario en **cada** hábito; si cambia su
> nombre, tendrías que actualizarlo en mil sitios. Con relaciones + JOIN, el nombre vive **en un
> solo lugar** (la tabla usuarios) y lo "traes" cuando lo necesitas. Eso es **normalización**:
> guardar cada dato una sola vez. Una de las grandes ventajas de las bases de datos relacionales.

---

## 6. CRUD en tus apps

> ### 🔎 En tu código
> El cliente de Supabase de RachaSimple expone el CRUD así (y por debajo es SQL):
> | Acción | Cliente Supabase | SQL equivalente |
> |---|---|---|
> | Crear | `.insert({...})` | `INSERT INTO ...` |
> | Leer | `.select('*')` | `SELECT * FROM ...` |
> | Actualizar | `.update({...}).eq('id', 1)` | `UPDATE ... WHERE id = 1` |
> | Borrar | `.delete().eq('id', 3)` | `DELETE ... WHERE id = 3` |
> En la carpeta `RachaSimple/src/repositories/` cada archivo (`habits.ts`, `checkins.ts`)
> encapsula el CRUD de una tabla. Ahora entiendes qué hace cada uno por dentro.

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Sé qué es **CRUD** y qué comando SQL corresponde a cada letra.
- [ ] Creo filas con `INSERT INTO ... VALUES ...`.
- [ ] Actualizo con `UPDATE ... SET ... WHERE` y borro con `DELETE ... WHERE`.
- [ ] **Nunca** hago UPDATE/DELETE sin `WHERE` (y sé por qué es peligroso).
- [ ] Combino tablas con `JOIN ... ON ...` usando claves foránea/primaria.
- [ ] Entiendo la **normalización** (no duplicar datos).

---

## 🧪 Ejercicios

1. **Crea.** Escribe el `INSERT` para añadir un hábito "Dormir bien", meta 8, color '#7A5CFF',
   del usuario 9.
2. **Actualiza con cuidado.** Escribe el `UPDATE` que cambia el color del hábito con id 2 a
   '#FF5D8F'. ¿Qué pasaría si olvidas el `WHERE`?
3. **Borra.** Escribe el `DELETE` del hábito con id 5. Antes, ¿qué `SELECT` harías para confirmar
   qué vas a borrar?
4. **JOIN.** Escribe la consulta que devuelve el nombre de cada hábito junto al correo de su
   usuario (tablas `habitos` y `usuarios`).
5. **Normalización.** Explica por qué guardar el nombre del usuario dentro de cada hábito es mala
   idea, y cómo lo resuelven las relaciones.

➡️ Siguiente: **[Capítulo 04 — Supabase: Postgres en la nube](04-supabase.md)**.
