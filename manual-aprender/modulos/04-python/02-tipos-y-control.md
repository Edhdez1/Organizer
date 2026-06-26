# Capítulo 02 — Tipos y control de flujo

<p align="center">
  <img src="../../recursos/imagenes/04-python/cap02.png" alt="Ilustración del capítulo (pixel art con Bit)" width="640">
</p>


> Vamos a ver los tipos de dato de Python y cómo tomar decisiones y repetir cosas. Como ya
> pasaste por esto en JavaScript, el capítulo irá ligero: lo que de verdad nos interesa son
> **las diferencias** a la hora de escribirlo. Quédate con una idea de fondo: *mismos
> conceptos, distinta forma*.

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
> Una diferencia que conviene tener clara: Python separa los **enteros** (`int`) de los
> **decimales** (`float`), mientras que JavaScript los metía todos en el mismo saco de
> "number". Las listas y los diccionarios los dejamos para el próximo capítulo.

> ### 🟦 ¿Qué significa? — *Saber el tipo de algo: `type()`*
> Cuando tengas dudas de qué es un valor, `type(valor)` te lo dice:
> ```python
> print(type(25))        # <class 'int'>
> print(type("hola"))    # <class 'str'>
> print(type(True))      # <class 'bool'>
> ```

> ### 🟦 ¿Qué significa? — *Convertir entre tipos (casting)*
> Habrá momentos en que necesites pasar un texto a número, o al revés:
> ```python
> int("25")      # 25  (texto a entero)
> str(25)        # "25" (número a texto)
> float("3.14")  # 3.14
> ```
> **¿Por qué importa?** Porque todo lo que el usuario teclea llega como **texto**. Si le pides
> la edad y luego quieres compararla con un número, primero tienes que convertirla:
> `edad = int(entrada)`.

---

## 2. Texto en Python: f-strings

> ### 🟦 ¿Qué significa? — *f-string (texto con variables)*
> Es el equivalente a los *template strings* de JavaScript. Pones una `f` justo antes de las
> comillas y metes las variables entre llaves `{ }`:
> ```python
> nombre = "Edwar"
> edad = 25
> print(f"{nombre} tiene {edad} años.")   # Edwar tiene 25 años.
> ```
> | Idea | JavaScript | Python |
> |---|---|---|
> | Texto con variables | `` `Hola ${nombre}` `` | `f"Hola {nombre}"` |
> En el Python de hoy, esta es la forma normal y recomendada de armar textos.

---

## 3. Operadores: casi iguales, con dos diferencias

Los operadores aritméticos (`+`, `-`, `*`, `/`, `%`, `**`) y los de comparación (`==`, `!=`,
`<`, `>`, `<=`, `>=`) funcionan **igual** que en JavaScript. Solo cambian dos cosas, pero son
importantes:

> ### ⚠️ Cuidado — En Python la igualdad es `==` (¡no `===`!)
> En JS te pedíamos usar `===` (tres iguales) para comparar bien. En **Python no existe `===`**:
> comparas con `==` (dos iguales) y ya funciona como debe, sin la "comparación laxa" tramposa
> que tenía JS. Para que quede claro:
> | | Comparar igualdad | Distinto |
> |---|---|---|
> | JavaScript | `===` | `!==` |
> | Python | `==` | `!=` |

> ### 🟦 ¿Qué significa? — *Los lógicos se escriben con palabras*
> Donde JavaScript usaba símbolos, Python prefiere **palabras en inglés**:
> | Idea | JavaScript | Python |
> |---|---|---|
> | Y | `&&` | `and` |
> | O | `\|\|` | `or` |
> | NO | `!` | `not` |
> ```python
> if edad >= 18 and tiene_entrada:
>     print("Bienvenido")
> ```
> Es justo este tipo de detalle el que hace que Python "se lea casi como inglés".

---

## 4. Decisiones: `if`, `elif`, `else`

> ### 🟦 ¿Qué significa? — *`if/elif/else`*
> Es lo mismo que en JavaScript, pero con tres cambios de forma: la condición va **sin
> paréntesis** (son opcionales), se cierra con **dos puntos `:`**, el cuerpo va con **sangría**
> en lugar de llaves, y se escribe `elif` en vez de `else if`:
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
> Si lo pones al lado del JavaScript del Módulo 03, verás que la lógica es la misma; lo único
> que cambió fue la "puntuación".

---

## 5. Bucles en Python

### El bucle `for` (recorre una secuencia)

> ### 🟦 ¿Qué significa? — *`for` en Python*
> El `for` de Python no se parece al de JavaScript: en lugar de llevar un contador con una
> condición, **recorre directamente los elementos** de una lista (o de cualquier secuencia):
> ```python
> servicios = ["Diseño web", "IA", "Marketing"]
> for servicio in servicios:
>     print(servicio)
> # imprime cada servicio en una línea
> ```
> Se lee tal cual: "para cada servicio en la lista de servicios, imprímelo". Mucho más directo
> que el `for (let i = 0; ...)` al que estabas acostumbrado en JavaScript.

> ### 🟦 ¿Qué significa? — *`range()` (repetir N veces)*
> Cuando lo que quieres es repetir un número fijo de veces (como el `for` clásico), echas mano
> de `range()`:
> ```python
> for i in range(5):       # 0, 1, 2, 3, 4
>     print(i)
> for i in range(1, 6):    # 1, 2, 3, 4, 5
>     print(i)
> ```
> `range(5)` te da los números del 0 al 4: empieza en 0, como casi todo en programación.

### El bucle `while`

> ### 🟦 ¿Qué significa? — *`while` en Python*
> En concepto es idéntico al de JavaScript (repite mientras la condición siga siendo verdadera),
> solo que escrito a la manera de Python, con dos puntos y sangría:
> ```python
> saldo = 100
> while saldo > 0:
>     print(f"Saldo: {saldo}")
>     saldo -= 25
> ```
> Y el aviso de siempre: asegúrate de que algo dentro del bucle vaya acercando el final, o
> acabarás con un **bucle infinito**.

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

Es **exactamente el mismo programa** que cerraba el capítulo de funciones en JavaScript, ahora
escrito en Python. Fíjate en lo limpio que queda: sin llaves, sin `;` y con el `for` recorriendo
la lista de un tirón. (Las funciones con `def` las trabajamos a fondo en el próximo capítulo.)

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
