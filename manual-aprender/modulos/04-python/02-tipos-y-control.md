# Capítulo 02 — Tipos y control de flujo

> Aquí verás los tipos de dato de Python y cómo tomar decisiones y repetir. Como ya lo viviste
> en JavaScript, irá rápido: nos centramos en **las diferencias** de escritura. Ten a mano la
> idea: *mismos conceptos, distinta forma*.

---

## 1. Tipos de dato en Python

> ### 🟦 ¿Qué significa? — *Los tipos básicos*
> | Tipo | Qué es | Ejemplo | En JS era |
> |---|---|---|---|
> | `str` | texto (string) | `"Hola"` | string |
> | `int` | número entero | `25` | number |
> | `float` | número decimal | `3.14` | number |
> | `bool` | verdadero/falso | `True` / `False` | boolean |
> | `None` | sin valor | `None` | null |
> | `list` | lista ordenada | `[1, 2, 3]` | array |
> | `dict` | datos con etiquetas | `{"nombre": "Edwar"}` | object |
> Python distingue **enteros** (`int`) de **decimales** (`float`); JavaScript los mezclaba en
> "number". Listas y diccionarios los vemos en el próximo capítulo.

> ### 🟦 ¿Qué significa? — *Saber el tipo de algo: `type()`*
> La función `type(valor)` te dice de qué tipo es:
> ```python
> print(type(25))        # <class 'int'>
> print(type("hola"))    # <class 'str'>
> print(type(True))      # <class 'bool'>
> ```

> ### 🟦 ¿Qué significa? — *Convertir entre tipos (casting)*
> A veces necesitas pasar un texto a número o viceversa:
> ```python
> int("25")      # 25  (texto a entero)
> str(25)        # "25" (número a texto)
> float("3.14")  # 3.14
> ```
> **¿Por qué importa?** Lo que el usuario escribe siempre llega como **texto**. Si pide una
> edad y vas a comparar números, debes convertir: `edad = int(entrada)`.

---

## 2. Texto en Python: f-strings

> ### 🟦 ¿Qué significa? — *f-string (texto con variables)*
> El equivalente a los *template strings* de JavaScript. Pones una `f` antes de las comillas y
> metes variables entre llaves `{ }`:
> ```python
> nombre = "Edwar"
> edad = 25
> print(f"{nombre} tiene {edad} años.")   # Edwar tiene 25 años.
> ```
> | Idea | JavaScript | Python |
> |---|---|---|
> | Texto con variables | `` `Hola ${nombre}` `` | `f"Hola {nombre}"` |
> Es la forma recomendada de armar textos en Python moderno.

---

## 3. Operadores: casi iguales, con dos diferencias

Los operadores aritméticos (`+`, `-`, `*`, `/`, `%`, `**`) y de comparación (`==`, `!=`, `<`,
`>`, `<=`, `>=`) son **iguales** que en JavaScript, con dos diferencias clave:

> ### ⚠️ Cuidado — En Python la igualdad es `==` (¡no `===`!)
> Recuerda que en JS usábamos `===` (tres iguales) para comparar bien. **Python no tiene `===`**:
> usa `==` (dos iguales) para comparar, y funciona correctamente (no tiene la "comparación laxa"
> problemática de JS). Resumen:
> | | Comparar igualdad | Distinto |
> |---|---|---|
> | JavaScript | `===` | `!==` |
> | Python | `==` | `!=` |

> ### 🟦 ¿Qué significa? — *Los lógicos se escriben con palabras*
> Donde JavaScript usaba símbolos, Python usa **palabras en inglés**:
> | Idea | JavaScript | Python |
> |---|---|---|
> | Y | `&&` | `and` |
> | O | `\|\|` | `or` |
> | NO | `!` | `not` |
> ```python
> if edad >= 18 and tiene_entrada:
>     print("Bienvenido")
> ```
> Esto refuerza por qué Python "se lee como inglés".

---

## 4. Decisiones: `if`, `elif`, `else`

> ### 🟦 ¿Qué significa? — *`if/elif/else`*
> Igual que en JavaScript, pero con tres diferencias de forma: **sin paréntesis** en la
> condición (opcionales), **dos puntos `:`** al final, **sangría** en vez de llaves, y
> `elif` en lugar de `else if`:
> ```python
> nota = 85
>
> if nota >= 90:
>     print("Excelente")
> elif nota >= 70:
>     print("Aprobado")
> else:
>     print("Reprobado")
> ```
> Compáralo con el JavaScript del Módulo 03: la lógica es idéntica; solo cambió la "puntuación".

---

## 5. Bucles en Python

### El bucle `for` (recorre una secuencia)

> ### 🟦 ¿Qué significa? — *`for` en Python*
> El `for` de Python es distinto al de JavaScript: en vez de un contador con condición, **recorre
> directamente los elementos** de una lista (o secuencia):
> ```python
> servicios = ["Diseño web", "IA", "Marketing"]
> for servicio in servicios:
>     print(servicio)
> # imprime cada servicio en una línea
> ```
> Se lee: "para cada servicio en la lista de servicios, imprímelo". Mucho más directo que el
> `for (let i = 0; ...)` de JavaScript.

> ### 🟦 ¿Qué significa? — *`range()` (repetir N veces)*
> Si quieres repetir un número de veces (como el `for` clásico), usas `range()`:
> ```python
> for i in range(5):       # 0, 1, 2, 3, 4
>     print(i)
> for i in range(1, 6):    # 1, 2, 3, 4, 5
>     print(i)
> ```
> `range(5)` genera los números de 0 a 4 (empieza en 0, como siempre).

### El bucle `while`

> ### 🟦 ¿Qué significa? — *`while` en Python*
> Idéntico en concepto a JavaScript (repite mientras la condición sea verdadera), con la forma
> de Python (dos puntos y sangría):
> ```python
> saldo = 100
> while saldo > 0:
>     print(f"Saldo: {saldo}")
>     saldo -= 25
> ```
> El mismo cuidado de siempre: que algo dentro acerque el fin, o tendrás un **bucle infinito**.

---

## 6. Un ejemplo con todo (compáralo con el de JS)

```python
def clasificar(nota):
    if nota >= 90:
        return "Excelente"
    if nota >= 70:
        return "Aprobado"
    return "Reprobado"

notas = [95, 82, 60, 75]

for nota in notas:
    resultado = clasificar(nota)
    print(f"Nota {nota}: {resultado}")
```

Es el **mismo programa** que cerró el capítulo de funciones en JavaScript, ahora en Python.
Nota lo limpio que se ve: sin llaves, sin `;`, el `for` recorre la lista directamente.
(Las funciones con `def` las vemos a fondo en el próximo capítulo.)

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Conozco los tipos `str`, `int`, `float`, `bool`, `None`, `list`, `dict` y uso `type()`.
- [ ] Convierto tipos con `int()`, `str()`, `float()` y sé por qué (la entrada llega como texto).
- [ ] Uso **f-strings** (`f"...{var}..."`).
- [ ] Comparo con `==`/`!=` (¡no `===`!) y uso `and`/`or`/`not`.
- [ ] Escribo `if/elif/else` con `:` y sangría.
- [ ] Uso `for ... in ...` para recorrer listas y `range()` para repetir N veces.

---

## 🧪 Ejercicios

1. **Traduce.** Pasa a Python este JavaScript:
   ```javascript
   if (edad >= 18 && tieneEntrada) { console.log("Pasa"); } else { console.log("No pasa"); }
   ```
2. **Casting.** El usuario escribió `"30"` (texto). Escribe el código para convertirlo a número
   y comprobar si es mayor que 18.
3. **for con lista.** Escribe un `for` que recorra `["rojo", "verde", "azul"]` e imprima cada uno.
4. **range.** ¿Qué números imprime `for i in range(2, 7)`?
5. 💻 **FizzBuzz sencillo.** Recorre del 1 al 20 con `range`; por cada número, si es divisible
   entre 3 (`i % 3 == 0`) imprime "Fizz", si no, imprime el número. (Un clásico para practicar
   bucles y condiciones.)

➡️ Siguiente: **[Capítulo 03 — Funciones, listas y diccionarios](03-funciones-listas-diccionarios.md)**.
