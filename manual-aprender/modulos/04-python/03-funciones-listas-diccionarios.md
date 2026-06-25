# Capítulo 03 — Funciones, listas y diccionarios

> Tres herramientas que usarás en cada programa Python: **funciones** (para organizar), **listas**
> (colecciones ordenadas) y **diccionarios** (datos con etiquetas). Son la base de cómo PolyPaw
> guarda sus misiones y el perfil del usuario.

---

## 1. Funciones con `def`

> ### 🟦 ¿Qué significa? — *Definir una función con `def`*
> En Python las funciones se crean con la palabra `def`, dos puntos y el cuerpo sangrado:
> ```python
> def saludar(nombre):
>     print(f"¡Hola, {nombre}!")
>
> saludar("Edwar")    # ¡Hola, Edwar!
> ```
> | Idea | JavaScript | Python |
> |---|---|---|
> | Definir función | `function saludar(n) { ... }` | `def saludar(n):` |
> | Devolver valor | `return x;` | `return x` |
> Los **parámetros**, **argumentos** y `return` funcionan igual que en JavaScript (Módulo 03);
> solo cambia la forma de escribirlos.

> ### 🟦 ¿Qué significa? — *Valores por defecto en parámetros*
> Python permite dar un valor **por defecto** a un parámetro, que se usa si no pasas argumento:
> ```python
> def saludar(nombre, saludo="Hola"):
>     print(f"{saludo}, {nombre}")
>
> saludar("Edwar")              # Hola, Edwar
> saludar("Ana", "Buenas")      # Buenas, Ana
> ```
> Muy útil para opciones que casi siempre son iguales.

---

## 2. Listas

> ### 🟦 ¿Qué significa? — *Lista (`list`)*
> Una **lista** es una colección **ordenada** de elementos, entre corchetes `[ ]`. Es el
> equivalente al *array* de JavaScript:
> ```python
> servicios = ["Diseño web", "IA", "Marketing"]
> servicios[0]        # "Diseño web"  (índice desde 0)
> len(servicios)      # 3  (cantidad de elementos)
> ```
> Nota: para la longitud, Python usa `len(lista)`, no `lista.length`.

> ### 🟦 ¿Qué significa? — *Métodos comunes de lista*
> ```python
> servicios.append("SEO")     # añade al final  (como push en JS)
> servicios.remove("IA")      # quita un elemento por valor
> "IA" in servicios           # True/False: ¿está? (como includes en JS)
> for s in servicios:         # recorrer (lo viste en el cap. anterior)
>     print(s)
> ```

> ### 🟦 ¿Qué significa? — *Rebanadas (slicing)*
> Python permite tomar "trozos" de una lista con `[inicio:fin]`:
> ```python
> numeros = [10, 20, 30, 40, 50]
> numeros[1:3]    # [20, 30]  (del índice 1 hasta antes del 3)
> numeros[:2]     # [10, 20]  (desde el principio)
> numeros[-1]     # 50  (el último; los negativos cuentan desde el final)
> ```
> El slicing es una de las cosas más cómodas de Python. Por ahora reconócelo; lo dominarás con
> la práctica.

---

## 3. Diccionarios (la pieza clave de PolyPaw)

> ### 🟦 ¿Qué significa? — *Diccionario (`dict`)*
> Un **diccionario** guarda datos como pares **clave: valor**, entre llaves `{ }`. Es el
> equivalente al *objeto* de JavaScript, y la estructura más importante para datos:
> ```python
> usuario = {
>     "nombre": "Edwar",
>     "edad": 25,
>     "activo": True
> }
> usuario["nombre"]      # "Edwar"  (se accede con corchetes y la clave)
> usuario["edad"] = 26   # cambiar un valor
> usuario["ciudad"] = "San Salvador"   # añadir una clave nueva
> ```
> | Idea | JavaScript (objeto) | Python (dict) |
> |---|---|---|
> | Acceder | `usuario.nombre` | `usuario["nombre"]` |
> | Crear | `{ nombre: "Edwar" }` | `{"nombre": "Edwar"}` |
> Diferencia visible: en Python las **claves van entre comillas** y se accede con **corchetes**,
> no con punto.

> ### 🟦 ¿Qué significa? — *Recorrer un diccionario*
> ```python
> for clave, valor in usuario.items():
>     print(f"{clave}: {valor}")
> # nombre: Edwar
> # edad: 26
> # ...
> ```
> `.items()` te da cada par clave-valor. También existen `.keys()` (solo claves) y `.values()`
> (solo valores).

---

## 4. Listas de diccionarios: cómo se guardan los datos de verdad

La combinación más potente —y la que usan tus proyectos— es una **lista de diccionarios**:

```python
habitos = [
    {"nombre": "Leer",      "hecho": True},
    {"nombre": "Ejercicio", "hecho": False},
]

for h in habitos:
    estado = "✅" if h["hecho"] else "⬜"
    print(f'{estado} {h["nombre"]}')
```

> ### 🔎 En tu código
> Así es **exactamente** cómo PolyPaw guarda su contenido. Abre `missions/a1_identity_es_en.json`:
> es una **lista de diccionarios**, donde cada misión es un diccionario con claves como
> `mission_id`, `scenario`, `answer_key`, `tokens`. Y `polypaw_db.json` es un diccionario con el
> perfil del usuario (nombre, nivel, XP, racha). Entender listas y diccionarios es entender el
> corazón de los datos de tu app.

> ### 💡 Tip — `if` en una línea (expresión condicional)
> En el ejemplo viste `"✅" if h["hecho"] else "⬜"`: es un `if/else` compacto que **devuelve un
> valor**. Se lee "✅ si está hecho, si no ⬜". Útil para asignaciones cortas; el equivalente del
> operador ternario `condición ? a : b` de JavaScript.

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Defino funciones con `def`, con parámetros y valores por defecto.
- [ ] Uso **listas** (`[ ]`), `len()`, `append`, `remove`, `in` y recorro con `for`.
- [ ] Entiendo el **slicing** básico (`lista[1:3]`, `lista[-1]`).
- [ ] Uso **diccionarios** (`{"clave": valor}`), accedo y modifico con corchetes.
- [ ] Recorro diccionarios con `.items()`.
- [ ] Entiendo una **lista de diccionarios** y dónde aparece en PolyPaw.

---

## 🧪 Ejercicios

1. **Función con defecto.** Escribe `def potencia(base, exp=2)` que devuelva `base ** exp`.
   ¿Qué da `potencia(5)`? ¿Y `potencia(5, 3)`?
2. **Lista.** Crea una lista `colores`, añade uno con `append`, y comprueba con `in` si "rojo"
   está.
3. **Diccionario.** Crea un dict `libro` con `titulo`, `autor` y `paginas`. Accede al autor y
   cambia las páginas.
4. **Recorre.** Dada `habitos` (lista de diccionarios del ejemplo), escribe un `for` que imprima
   solo los nombres de los hábitos **no** hechos.
5. 💻 **Mini base de datos.** Crea una lista de 3 diccionarios "producto" (con `nombre` y
   `precio`). Recórrela e imprime el nombre y precio de cada uno con una f-string. Suma todos los
   precios en una variable y muéstrala al final.

➡️ Siguiente: **[Capítulo 04 — Archivos y JSON](04-archivos-y-json.md)**.
