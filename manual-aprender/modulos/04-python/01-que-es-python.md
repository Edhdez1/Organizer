# Capítulo 01 — ¿Qué es Python?

> Buenas noticias: ya sabes programar. En el Módulo 03 aprendiste los conceptos (variables,
> decisiones, bucles, funciones). Python usa **los mismos conceptos**, solo que escritos de
> forma distinta —y, para muchos, más clara—. Este módulo será más rápido porque construyes
> sobre lo que ya tienes.

---

## 1. Qué es Python y por qué es tan querido

> ### 🟦 ¿Qué significa? — *Python*
> **Python** es un lenguaje de programación de propósito general, famoso por ser **fácil de
> leer y escribir**. Su código se parece al inglés y evita símbolos innecesarios. Se usa para
> casi todo: aplicaciones, páginas web (en el servidor), automatización de tareas, análisis de
> datos, ciencia y, muy especialmente, **inteligencia artificial**.

> ### 💡 Tip — ¿Por qué aprender Python si ya sé JavaScript?
> Porque cada lenguaje brilla en cosas distintas:
> - **JavaScript** domina el navegador y la web.
> - **Python** domina la automatización, los datos y la IA, y es el lenguaje de apps como
>   PolyPaw (con Flet).
> Saber ambos te da un rango enorme. Y como comparten conceptos, el segundo lenguaje siempre
> cuesta mucho menos que el primero.

> ### ⚠️ Cuidado — El nombre viene de un grupo de comedia, no de la serpiente
> Python se llama así por *Monty Python* (humoristas británicos), no por la serpiente. Aun así,
> el logo es una serpiente y se ha vuelto su símbolo. Curiosidad inofensiva.

---

## 2. Cómo se ejecuta Python (y cómo instalarlo)

A diferencia de JavaScript (que vive en el navegador), Python se ejecuta con un programa
llamado **intérprete** que instalas en tu computadora.

> ### 🟦 ¿Qué significa? — *Intérprete*
> Un **intérprete** es el programa que **lee tu código y lo ejecuta** línea por línea. Para
> Python, ese programa también se llama `python`. Lo instalas una vez y luego puedes correr
> cualquier archivo `.py`.

**Instalación (cuando tengas tu computadora):**
1. Descarga Python desde <https://python.org> (botón "Download"). En Windows, marca la casilla
   **"Add Python to PATH"** durante la instalación (importante para usarlo desde la terminal).
2. Comprueba en la terminal: `python --version` (o `python3 --version`) debe mostrar un número.

> ### 🟦 ¿Qué significa? — *REPL (la consola interactiva)*
> Si escribes solo `python` en la terminal, entras al **REPL** (*Read-Eval-Print Loop*): una
> consola donde escribes una línea de Python y ves el resultado al instante, como la consola
> del navegador para JS. Ideal para probar. Sales con `exit()`.

**Ejecutar un archivo:** guardas tu código en un archivo, por ejemplo `hola.py`, y en la
terminal escribes:
```
python hola.py
```

---

## 3. Tu primer programa: `print`

> ### 🟦 ¿Qué significa? — *`print()`*
> `print(...)` **muestra algo en la pantalla** (en la terminal). Es el equivalente al
> `console.log` de JavaScript:
> ```python
> print("¡Hola, mundo!")
> print(2 + 3)
> ```
> Crea un archivo `hola.py` con esas líneas, ejecútalo con `python hola.py`, y verás la salida.

> ### 💡 Tip — Compara para aprender más rápido
> A lo largo del módulo verás recuadros "JS vs. Python". Aprovéchalos: ver el mismo concepto en
> dos idiomas refuerza el entendimiento.
> | Idea | JavaScript | Python |
> |---|---|---|
> | Mostrar en pantalla | `console.log("hola")` | `print("hola")` |

---

## 4. Variables: sin `let` ni `const`

> ### 🟦 ¿Qué significa? — *Variables en Python*
> En Python **no** se usan `let`, `const` ni `var`: simplemente escribes el nombre y le asignas
> un valor. Tampoco se ponen `;` al final.
> ```python
> nombre = "Edwar"
> edad = 25
> es_programador = True
> ```
> | Idea | JavaScript | Python |
> |---|---|---|
> | Crear variable | `const nombre = "Edwar";` | `nombre = "Edwar"` |
> | Verdadero/falso | `true` / `false` | `True` / `False` (¡con mayúscula!) |
> | Nada / vacío | `null` | `None` |

> ### 💡 Tip — Estilo de nombres en Python
> Mientras en JavaScript se usa `camelCase` (`esProgramador`), en Python la convención es
> `snake_case`: todo en minúsculas y palabras unidas por guion bajo (`es_programador`). Cada
> lenguaje tiene su costumbre; respétala para que tu código "hable como un nativo".

---

## 5. LA regla de Python: la sangría (indentación)

Esta es la característica que más sorprende al venir de otros lenguajes, y la más importante.

> ### 🟦 ¿Qué significa? — *Sangría / indentación*
> La **sangría** es el espacio en blanco al inicio de una línea (normalmente 4 espacios). En la
> mayoría de lenguajes la sangría es solo estética; **en Python es obligatoria y tiene
> significado**: define qué líneas pertenecen a un bloque.
>
> En JavaScript, los bloques se marcan con **llaves** `{ }`:
> ```javascript
> if (edad >= 18) {
>   console.log("Adulto");
> }
> ```
> En Python, se marcan con **dos puntos `:` y sangría** (sin llaves):
> ```python
> if edad >= 18:
>     print("Adulto")
> ```
> Las líneas "dentro" del `if` van **sangradas** (4 espacios). Cuando la sangría termina, el
> bloque termina. Es más limpio, pero **estricto**.

> ### ⚠️ Cuidado — La sangría inconsistente rompe el programa
> Si mezclas cantidades de espacios o usas tabuladores y espacios a la vez, Python lanza un
> error (`IndentationError`). Regla: usa **4 espacios** siempre. Los editores como VS Code lo
> hacen automáticamente al pulsar Tab. Es la fuente de error nº 1 de los principiantes en
> Python; una vez te acostumbras, se vuelve natural y hasta agradable.

> ### 🔎 En tu código
> Abre cualquier archivo de PolyPaw, como `main.py`: verás que NO hay llaves `{ }` para los
> bloques, solo dos puntos y sangría. Esa es la firma visual de Python.

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Sé qué es Python y para qué destaca (automatización, datos, IA, apps con Flet).
- [ ] Entiendo qué es el **intérprete** y cómo ejecutar un `.py` (`python archivo.py`).
- [ ] Sé usar `print()` y el **REPL** para probar.
- [ ] Creo variables sin `let`/`const` y sin `;`, en `snake_case`.
- [ ] Conozco `True`/`False`/`None` (con mayúscula).
- [ ] **Entiendo la sangría**: bloques con `:` y 4 espacios, sin llaves.

---

## 🧪 Ejercicios

1. **Traduce a Python.** Pasa esto de JavaScript a Python:
   `const ciudad = "San Salvador"; console.log(ciudad);`
2. **Mayúsculas.** ¿Qué tiene de malo, en Python, escribir `activo = true`? Corrígelo.
3. **Sangría.** Explica qué marca el final de un bloque en Python (si en JS son las llaves, en
   Python es…).
4. **Encuentra el error.** ¿Por qué falla esto?
   ```python
   if edad >= 18:
   print("Adulto")
   ```
5. 💻 **Primer programa.** Cuando tengas Python, crea `hola.py` con un `print` que muestre tu
   nombre y, en otra línea, el resultado de `7 * 6`. Ejecútalo con `python hola.py`.

➡️ Siguiente: **[Capítulo 02 — Tipos y control de flujo](02-tipos-y-control.md)**.
