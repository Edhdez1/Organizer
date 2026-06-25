# Capítulo 02 — Consultar con SQL

> SQL se aprende rápido porque se lee casi como inglés. En este capítulo dominas la operación
> más usada de todas: **pedir datos** (consultar). Con `SELECT`, `WHERE` y `ORDER BY` ya puedes
> sacar de una base de datos justo lo que necesitas.

---

## 1. `SELECT`: pedir datos

> ### 🟦 ¿Qué significa? — *`SELECT ... FROM`*
> `SELECT` elige **qué columnas** quieres; `FROM` dice **de qué tabla**. Es la consulta base:
> ```sql
> SELECT nombre, color FROM habitos;
> ```
> "Dame las columnas nombre y color, de la tabla habitos." Para pedir **todas** las columnas se
> usa el asterisco `*`:
> ```sql
> SELECT * FROM habitos;
> ```

> ### 💡 Tip — La convención de SQL
> Las palabras clave de SQL (`SELECT`, `FROM`, `WHERE`…) suelen escribirse en **MAYÚSCULAS** por
> costumbre, para distinguirlas de los nombres de tus tablas/columnas. No es obligatorio (SQL no
> distingue mayúsculas en las palabras clave), pero se lee mejor. Cada consulta termina en `;`.

---

## 2. `WHERE`: filtrar filas

Casi nunca quieres **todas** las filas; quieres las que cumplen una condición.

> ### 🟦 ¿Qué significa? — *`WHERE`*
> `WHERE` filtra: solo devuelve las filas que **cumplen una condición** (¿recuerdas las
> condiciones del Módulo 03?). 
> ```sql
> SELECT * FROM habitos WHERE usuario_id = 7;
> ```
> "Dame los hábitos cuyo usuario_id sea 7." Operadores de comparación (parecidos a los que ya
> conoces):
> | Operador | Significa | Ejemplo |
> |---|---|---|
> | `=` | igual | `meta = 20` |
> | `<>` o `!=` | distinto | `color <> '#000000'` |
> | `>` `<` `>=` `<=` | mayor/menor | `meta >= 15` |
> | `BETWEEN` | en un rango | `meta BETWEEN 10 AND 30` |
> | `LIKE` | coincide con un patrón de texto | `nombre LIKE 'Le%'` |
> | `IN` | está en una lista | `usuario_id IN (7, 9)` |

> ### ⚠️ Cuidado — En SQL, la igualdad es UN solo `=`
> Ojo con esto si vienes de JavaScript: en SQL, comparar es con **un** `=` (no `===` ni `==`).
> Y el texto va entre **comillas simples**: `WHERE nombre = 'Leer'` (no comillas dobles).

> ### 🟦 ¿Qué significa? — *`LIKE` y los comodines*
> `LIKE` busca por **patrón** de texto. El comodín `%` representa "cualquier cosa":
> - `'Le%'` → empieza por "Le" (Leer, Lectura…).
> - `'%ar'` → termina en "ar".
> - `'%jercicio%'` → contiene "jercicio".
> Útil para buscadores.

---

## 3. Combinar condiciones: `AND` / `OR`

> ### 🟦 ¿Qué significa? — *`AND` y `OR`*
> Igual que `&&` y `||` del Módulo 03, pero escritos como palabras:
> ```sql
> SELECT * FROM habitos WHERE usuario_id = 7 AND meta > 15;
> SELECT * FROM habitos WHERE color = '#1B6B6B' OR color = '#D98A3D';
> ```
> `AND` exige que se cumplan **ambas**; `OR`, que se cumpla **al menos una**.

---

## 4. Ordenar y limitar: `ORDER BY` y `LIMIT`

> ### 🟦 ¿Qué significa? — *`ORDER BY`*
> Ordena los resultados por una columna, ascendente (`ASC`, por defecto) o descendente (`DESC`):
> ```sql
> SELECT * FROM habitos ORDER BY meta DESC;
> ```
> "Dame los hábitos ordenados por meta, de mayor a menor."

> ### 🟦 ¿Qué significa? — *`LIMIT`*
> Limita cuántas filas devuelve. Útil para "los 5 primeros":
> ```sql
> SELECT * FROM habitos ORDER BY meta DESC LIMIT 5;
> ```

---

## 5. Contar y agrupar (un vistazo)

> ### 🟦 ¿Qué significa? — *Funciones de agregación y `COUNT`*
> A veces no quieres las filas, sino un **resumen**: cuántas hay, el promedio, el total. Eso son
> las **funciones de agregación**. La más común es `COUNT` (contar):
> ```sql
> SELECT COUNT(*) FROM habitos WHERE usuario_id = 7;
> ```
> "¿Cuántos hábitos tiene el usuario 7?" Otras: `SUM` (suma), `AVG` (promedio), `MAX`, `MIN`.

> ### 🟦 ¿Qué significa? — *`GROUP BY`*
> `GROUP BY` agrupa filas para resumir **por categoría**. Por ejemplo, "cuántos hábitos tiene
> cada usuario":
> ```sql
> SELECT usuario_id, COUNT(*) FROM habitos GROUP BY usuario_id;
> ```
> No necesitas dominarlo ahora; reconócelo como "resumir datos por grupos".

---

## 6. Cómo se ve esto en tus apps

> ### 🔎 En tu código
> En RachaSimple y Faro no escribes SQL "a mano" en la mayoría de sitios: usas el **cliente de
> Supabase**, que traduce a SQL por debajo. Por ejemplo, esto de la app:
> ```js
> supabase.from('habitos').select('*').eq('usuario_id', 7)
> ```
> es, en el fondo, `SELECT * FROM habitos WHERE usuario_id = 7;`. Entender el SQL te permite
> saber **qué hace realmente** ese código y depurarlo. (El cliente de Supabase lo verás en el
> capítulo 04.) Además, Supabase tiene un **editor SQL** donde puedes escribir consultas
> directas, ideal para practicar.

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Uso `SELECT columnas FROM tabla;` y `SELECT *`.
- [ ] Filtro con `WHERE` y los operadores (`=`, `>`, `LIKE`, `IN`, `BETWEEN`).
- [ ] Recuerdo que en SQL la igualdad es **un** `=` y el texto va en **comillas simples**.
- [ ] Combino condiciones con `AND` / `OR`.
- [ ] Ordeno con `ORDER BY ... ASC/DESC` y limito con `LIMIT`.
- [ ] Reconozco `COUNT`/agregaciones y `GROUP BY` para resumir.

---

## 🧪 Ejercicios

Usa la tabla `habitos` del capítulo anterior (id, nombre, meta, color, usuario_id).

1. **SELECT básico.** Escribe la consulta que devuelve solo el `nombre` de todos los hábitos.
2. **Filtra.** Escribe la consulta de los hábitos del usuario 7 con `meta` mayor o igual a 20.
3. **LIKE.** Escribe la consulta de los hábitos cuyo nombre empiece por "M".
4. **Ordena y limita.** Los 3 hábitos con mayor `meta`, de mayor a menor.
5. **Traduce al cliente.** Escribe el equivalente en SQL de
   `supabase.from('habitos').select('nombre').eq('color', '#1B6B6B')`.
6. 💻 **Practica de verdad.** Si tienes cuenta de Supabase (la de RachaSimple), entra al **SQL
   Editor** y prueba un `SELECT * FROM ... LIMIT 5;` sobre una tabla real. (Solo lectura, sin
   miedo.)

➡️ Siguiente: **[Capítulo 03 — Modificar y relacionar](03-modificar-y-relacionar.md)**.
