# Capítulo 03 — Modificar y relacionar

> Ya sabes **leer** datos. Toca el otro lado: **crear, cambiar y borrar** filas, y también
> **combinar tablas relacionadas** con `JOIN`. Cuando termines este capítulo habrás visto las
> cuatro operaciones básicas que hace cualquier base de datos, las que se conocen como **CRUD**.

---

## 1. CRUD: las cuatro operaciones

> ### 🟦 ¿Qué significa? — *CRUD*
> **CRUD** son las iniciales de las cuatro cosas que puedes hacer con datos:
> - **C**reate (crear) → `INSERT`
> - **R**ead (leer) → `SELECT` (lo viste en el capítulo anterior)
> - **U**pdate (actualizar) → `UPDATE`
> - **D**elete (borrar) → `DELETE`
> Rasca cualquier app que maneje datos y, debajo, solo encontrarás CRUD. RachaSimple crea hábitos,
> los lee, los actualiza y los borra. No hay más misterio: CRUD puro.

---

## 2. `INSERT`: crear filas

> ### 🟦 ¿Qué significa? — *`INSERT INTO`*
> Mete una fila nueva en una tabla:
> ```sql
> INSERT INTO habitos (nombre, meta, color, usuario_id)
> VALUES ('Caminar', 25, '#2BB673', 7);
> ```
> Primero nombras las **columnas** y después pasas los **valores** en ese mismo orden. El `id`
> casi nunca lo escribes tú: la base de datos lo asigna sola, porque es una clave primaria que se
> autoincrementa.

---

## 3. `UPDATE`: cambiar filas

> ### 🟦 ¿Qué significa? — *`UPDATE ... SET ... WHERE`*
> Modifica datos de filas que ya existen. Con `SET` dices qué columnas cambiar; con `WHERE`, **en
> qué filas**:
> ```sql
> UPDATE habitos SET meta = 30 WHERE id = 1;
> ```
> Léelo tal cual suena: "en la tabla habitos, pon meta = 30 en la fila cuyo id sea 1."

> ### ⚠️ Cuidado — ¡NUNCA olvides el `WHERE` en UPDATE/DELETE!
> Esto es de lo más serio del capítulo. Si escribes `UPDATE habitos SET meta = 30;` **sin `WHERE`**,
> le cambias la meta a **TODAS** las filas de la tabla, no solo a la que querías. Con `DELETE` pasa
> igual, pero peor: borras todo. Es un error famoso, de los que han vaciado bases de datos enteras
> en empresas de verdad. Quédate con la regla de oro: **antes de un UPDATE o un DELETE, escribe
> primero el `WHERE`**. Y si tienes la menor duda de a qué filas vas a afectar, pruébalo como
> `SELECT` y míralo con tus propios ojos antes de tocar nada.

---

## 4. `DELETE`: borrar filas

> ### 🟦 ¿Qué significa? — *`DELETE FROM ... WHERE`*
> Borra las filas que cumplen una condición:
> ```sql
> DELETE FROM habitos WHERE id = 3;
> ```
> "Borra de habitos la fila cuyo id sea 3." Y recuerda el aviso de arriba: sin `WHERE`, se va todo.

> ### 💡 Tip — Borrado "suave" (soft delete)
> Muchas apps **no borran nada de verdad**. En vez de eso, marcan la fila como inactiva (una columna
> `archivado = true`) para poder recuperarla más adelante. Es justo lo que hace RachaSimple cuando
> pausas un hábito: así no pierdes el progreso. En el fondo es un `UPDATE` disfrazado de borrado, y
> resulta mucho más seguro que un `DELETE` de verdad.

---

## 5. Relacionar tablas: `JOIN`

Aquí es donde lo "relacional" cobra sentido. Acuérdate de que la tabla `habitos` guarda el
`usuario_id`, no el nombre del usuario. Así que para mostrar algo como "Leer — de Edwar" no te
queda otra que **combinar** las dos tablas.

> ### 🟦 ¿Qué significa? — *`JOIN` (combinar tablas)*
> `JOIN` une filas de dos tablas **emparejándolas por una columna que tienen en común** (la clave
> foránea de una con la primaria de la otra).
> ```sql
> SELECT habitos.nombre, usuarios.nombre
> FROM habitos
> JOIN usuarios ON habitos.usuario_id = usuarios.id;
> ```
> "Dame el nombre del hábito y el nombre del usuario, combinando habitos con usuarios donde el
> `usuario_id` del hábito coincida con el `id` del usuario." En una sola respuesta te llegan datos
> mezclados de las dos tablas.

> ### 🟦 ¿Qué significa? — *La cláusula `ON`*
> El `ON` es donde explicas **cómo emparejar** las filas: la condición de coincidencia, que casi
> siempre tiene la forma `tablaA.clave_foranea = tablaB.clave_primaria`. Piensa en él como el
> pegamento que mantiene unido al JOIN.

> ### 💡 Tip — Por qué no se duplican los datos
> Si no hubiera relaciones, tendrías que copiar el nombre del usuario en **cada** hábito. Y el día
> que esa persona cambie de nombre, te tocaría corregirlo en mil sitios a la vez. Con relaciones más
> JOIN, el nombre vive **en un único lugar** (la tabla usuarios) y lo "traes" solo cuando lo
> necesitas. A eso se le llama **normalización**: guardar cada dato una sola vez. Es una de las
> grandes razones por las que existen las bases de datos relacionales.

---

## 6. CRUD en tus apps

> ### 🔎 En tu código
> El cliente de Supabase de RachaSimple te ofrece el CRUD con esta pinta (y por debajo no es más
> que SQL):
> | Acción | Cliente Supabase | SQL equivalente |
> |---|---|---|
> | Crear | `.insert({...})` | `INSERT INTO ...` |
> | Leer | `.select('*')` | `SELECT * FROM ...` |
> | Actualizar | `.update({...}).eq('id', 1)` | `UPDATE ... WHERE id = 1` |
> | Borrar | `.delete().eq('id', 3)` | `DELETE ... WHERE id = 3` |
> En la carpeta `RachaSimple/src/repositories/`, cada archivo (`habits.ts`, `checkins.ts`)
> se encarga del CRUD de una tabla. Ahora que sabes SQL, entiendes qué hace cada uno por dentro.

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
