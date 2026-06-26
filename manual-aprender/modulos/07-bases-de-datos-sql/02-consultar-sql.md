# Capítulo 02 — Consultar con SQL

<p align="center">
  <img src="../../recursos/imagenes/07-bases-de-datos-sql/cap02.png" alt="Ilustración del capítulo (pixel art con Bit)" width="640">
</p>


> SQL tiene una ventaja: se lee casi como una frase en inglés, así que se aprende deprisa. En
> este capítulo te centras en lo que más vas a hacer con una base de datos: **pedirle datos**.
> Con `SELECT`, `WHERE` y `ORDER BY` ya puedes sacar exactamente lo que necesitas, ni más ni menos.

---

## 1. `SELECT`: pedir datos

> ### 🟦 ¿Qué significa? — *`SELECT ... FROM`*
> `SELECT` indica **qué columnas** quieres ver; `FROM`, **de qué tabla** las sacas. Esta es la
> consulta de la que parte todo lo demás:
> ```sql
> SELECT nombre, color FROM habitos;
> ```
> Léelo tal cual: "dame las columnas nombre y color de la tabla habitos". Y si quieres **todas**
> las columnas de golpe, en lugar de nombrarlas una a una pones un asterisco `*`:
> ```sql
> SELECT * FROM habitos;
> ```

> ### 💡 Tip — La convención de SQL
> Verás que las palabras clave de SQL (`SELECT`, `FROM`, `WHERE`…) casi siempre van en
> **MAYÚSCULAS**. Es pura costumbre: ayuda a distinguirlas de un vistazo de los nombres de tus
> tablas y columnas. No es obligatorio (a SQL le da igual cómo escribas las palabras clave), pero
> de verdad se lee mejor. Una cosa más: cada consulta termina en `;`.

---

## 2. `WHERE`: filtrar filas

Lo normal es que no quieras **todas** las filas, sino solo las que cumplen cierta condición. Para
eso está `WHERE`.

> ### 🟦 ¿Qué significa? — *`WHERE`*
> `WHERE` filtra: te devuelve únicamente las filas que **cumplen una condición** (¿te suenan las
> condiciones del Módulo 03? Es la misma idea).
> ```sql
> SELECT * FROM habitos WHERE usuario_id = 7;
> ```
> "Dame los hábitos cuyo usuario_id sea 7." Estos son los operadores de comparación que puedes
> usar; varios ya los conoces:
> | Operador | Significa | Ejemplo |
> |---|---|---|
> | `=` | igual | `meta = 20` |
> | `<>` o `!=` | distinto | `color <> '#000000'` |
> | `>` `<` `>=` `<=` | mayor/menor | `meta >= 15` |
> | `BETWEEN` | en un rango | `meta BETWEEN 10 AND 30` |
> | `LIKE` | coincide con un patrón de texto | `nombre LIKE 'Le%'` |
> | `IN` | está en una lista | `usuario_id IN (7, 9)` |

> ### ⚠️ Cuidado — En SQL, la igualdad es UN solo `=`
> Si vienes de JavaScript, presta atención aquí: en SQL comparas con **un** solo `=`, nada de
> `===` ni `==`. Y el texto siempre va entre **comillas simples**: `WHERE nombre = 'Leer'`. Las
> comillas dobles no sirven para esto.

> ### 🟦 ¿Qué significa? — *`LIKE` y los comodines*
> `LIKE` busca por **patrón** de texto. El comodín `%` significa "aquí va cualquier cosa":
> - `'Le%'` → empieza por "Le" (Leer, Lectura…).
> - `'%ar'` → termina en "ar".
> - `'%jercicio%'` → contiene "jercicio".
> Es justo lo que necesitas cuando montas un buscador.

---

## 3. Combinar condiciones: `AND` / `OR`

> ### 🟦 ¿Qué significa? — *`AND` y `OR`*
> Son los `&&` y `||` del Módulo 03, pero escritos como palabras de toda la vida:
> ```sql
> SELECT * FROM habitos WHERE usuario_id = 7 AND meta > 15;
> SELECT * FROM habitos WHERE color = '#1B6B6B' OR color = '#D98A3D';
> ```
> Con `AND` se tienen que cumplir **las dos** condiciones; con `OR`, basta con que se cumpla
> **una**.

---

## 4. Ordenar y limitar: `ORDER BY` y `LIMIT`

> ### 🟦 ¿Qué significa? — *`ORDER BY`*
> Ordena los resultados según una columna, de menor a mayor (`ASC`, que es lo que hace por
> defecto) o de mayor a menor (`DESC`):
> ```sql
> SELECT * FROM habitos ORDER BY meta DESC;
> ```
> "Dame los hábitos ordenados por meta, de mayor a menor."

> ### 🟦 ¿Qué significa? — *`LIMIT`*
> Recorta cuántas filas te devuelve. Perfecto cuando solo quieres "los 5 primeros":
> ```sql
> SELECT * FROM habitos ORDER BY meta DESC LIMIT 5;
> ```

---

## 5. Contar y agrupar (un vistazo)

> ### 🟦 ¿Qué significa? — *Funciones de agregación y `COUNT`*
> A veces no te interesan las filas en sí, sino un **resumen** de ellas: cuántas hay, cuánto suman,
> cuál es el promedio. De eso se encargan las **funciones de agregación**. La que más vas a usar es
> `COUNT`, que cuenta:
> ```sql
> SELECT COUNT(*) FROM habitos WHERE usuario_id = 7;
> ```
> "¿Cuántos hábitos tiene el usuario 7?" Hay más en la misma familia: `SUM` (suma), `AVG`
> (promedio), `MAX` y `MIN`.

> ### 🟦 ¿Qué significa? — *`GROUP BY`*
> `GROUP BY` junta las filas para resumirlas **por categoría**. Por ejemplo, para saber cuántos
> hábitos tiene cada usuario:
> ```sql
> SELECT usuario_id, COUNT(*) FROM habitos GROUP BY usuario_id;
> ```
> No hace falta que lo domines todavía. Por ahora con que lo reconozcas como "resumir datos por
> grupos" es suficiente.

---

## 6. Cómo se ve esto en tus apps

> ### 🔎 En tu código
> En RachaSimple y en Faro casi nunca escribes SQL "a mano". En su lugar usas el **cliente de
> Supabase**, que se encarga de traducirlo a SQL por debajo. Mira este trozo de la app:
> ```js
> supabase.from('habitos').select('*').eq('usuario_id', 7)
> ```
> que, en el fondo, no es más que `SELECT * FROM habitos WHERE usuario_id = 7;`. Por eso vale la
> pena entender el SQL: te deja ver **qué está haciendo de verdad** ese código y arreglarlo cuando
> algo falla. (El cliente de Supabase lo vemos a fondo en el capítulo 04.) Y por si fuera poco,
> Supabase trae un **editor SQL** donde puedes lanzar consultas directas: ideal para practicar.

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
