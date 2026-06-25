# Capítulo 06 — Cadenas de texto a fondo

<p align="center">
  <img src="../../recursos/imagenes/04-python/cap06.png" alt="Ilustración del capítulo (pixel art con Bit)" width="640">
</p>


> Casi todo lo que ve un usuario es **texto**: el título de una misión, una pista, un mensaje de
> error, el nombre de un idioma. En Python ese texto vive en las **cadenas** (strings). Ya las
> usaste de pasada en capítulos anteriores; aquí las miramos a fondo, porque en **PolyPaw** los
> textos de las misiones (guardados en archivos `missions/*.json`) se leen, se limpian, se cortan
> y se arman constantemente. Bit, nuestro ajolote, dice que las cadenas son como el agua de su
> pecera: están en todas partes y conviene saber nadar en ellas.

---

## 1. Qué es una cadena y cómo se escribe

> ### 🟦 ¿Qué significa? — *Cadena (string)*
> Una **cadena** es un valor que representa **texto**: una secuencia de caracteres (letras,
> números, espacios, símbolos) en un orden concreto. Sirve para guardar cualquier cosa escrita:
> un nombre, una frase, una palabra de vocabulario.
> **¿Dónde se usa en tu proyecto?** En **PolyPaw**, el título de cada misión y cada palabra del
> idioma que se aprende son cadenas; viven dentro de los archivos `missions/*.json` y `main.py`
> las muestra en pantalla.

En Python escribes una cadena rodeando el texto con **comillas**. Tienes tres formas:

```python
simple = 'Hola, PolyPaw'
doble = "Hola, PolyPaw"
triple = """Hola,
PolyPaw"""
```

> ### 🟦 ¿Qué significa? — *Comillas simples y dobles*
> Las **comillas simples** (`'...'`) y las **comillas dobles** (`"..."`) hacen exactamente lo
> mismo: marcan dónde empieza y dónde termina el texto. Eliges una u otra según convenga.
> **¿Para qué sirve tener dos?** Para poder incluir el otro tipo de comilla **dentro** del texto
> sin romperlo:
> ```python
> frase = "Bit dijo: 'aprende una palabra al día'"
> otra = 'La palabra "casa" en inglés es "house"'
> ```
> Si usas comillas dobles por fuera, puedes escribir comillas simples por dentro, y viceversa.

> ### 🟦 ¿Qué significa? — *Comillas triples*
> Las **comillas triples** (`'''...'''` o `"""..."""`) permiten una cadena que ocupa **varias
> líneas**. Todo lo que escribas dentro, incluidos los saltos de línea, forma parte del texto.
> **¿Dónde se usa en tu proyecto?** Son perfectas para un texto largo de explicación de una
> misión, o para escribir un comentario largo dentro de `database_manager.py`:
> ```python
> instruccion = """Bienvenido a la misión.
> Escucha la palabra y elige la traducción correcta.
> ¡Tienes tres intentos!"""
> ```

> ### 💡 Tip
> En JavaScript (lo viste en el Módulo 03) usabas comillas o *backticks* `` ` `` para textos.
> En Python no hay backticks: para texto multilínea se usan las **comillas triples**.

---

## 2. f-strings: meter variables dentro del texto

Imagina que quieres saludar con el nombre del jugador. Podrías pegar trozos, pero hay una forma
mucho más limpia.

> ### 🟦 ¿Qué significa? — *f-string (cadena formateada)*
> Una **f-string** es una cadena que empieza con la letra `f` antes de la comilla. Dentro puedes
> poner **variables entre llaves `{}`** y Python las reemplaza por su valor.
> **¿Para qué sirve?** Para construir mensajes que cambian según los datos, sin pegar trozos a
> mano. Es la forma recomendada de armar texto en Python moderno.
> ```python
> nombre = "Edwar"
> aciertos = 3
> mensaje = f"¡Bien hecho, {nombre}! Llevas {aciertos} aciertos."
> print(mensaje)   # ¡Bien hecho, Edwar! Llevas 3 aciertos.
> ```

> ### 🟦 ¿Qué significa? — *Formateo*
> **Formatear** significa armar un texto combinando partes fijas con valores que cambian, y darle
> la forma que quieres. La f-string es la herramienta de formateo más usada.

Si conoces JavaScript, una f-string es el equivalente de las *template literals*: allí escribías
`` `Hola ${nombre}` ``; en Python es `f"Hola {nombre}"`. Misma idea, distinta sintaxis: `f` al
inicio y llaves `{}` en vez de `${}`.

> ### 💡 Tip
> Dentro de las llaves no solo caben variables: cabe cualquier expresión que produzca un valor.
> ```python
> precio = 5
> print(f"Total: {precio * 2} monedas")   # Total: 10 monedas
> ```

> ### 🔎 En tu código
> En **PolyPaw**, cuando una misión muestra "Pregunta 2 de 10", ese texto se arma con una f-string
> como `f"Pregunta {actual} de {total}"`, donde `actual` y `total` son números que cambian
> mientras juegas.

> ### ⚠️ Cuidado
> Si **olvidas la `f`**, las llaves no se reemplazan: el texto saldrá literal con las llaves.
> ```python
> nombre = "Bit"
> print("Hola {nombre}")    # Hola {nombre}   ← mal, faltó la f
> print(f"Hola {nombre}")   # Hola Bit        ← correcto
> ```

---

## 3. Concatenación: unir cadenas

> ### 🟦 ¿Qué significa? — *Concatenar*
> **Concatenar** es **pegar** dos o más cadenas para formar una sola, usando el signo `+`.
> **¿Para qué sirve?** Para juntar trozos de texto. Aunque las f-strings suelen ser más cómodas,
> verás `+` en mucho código:
> ```python
> saludo = "Hola"
> nombre = "Bit"
> completo = saludo + ", " + nombre + "!"
> print(completo)   # Hola, Bit!
> ```

También puedes **repetir** una cadena con `*`:

```python
linea = "-" * 20
print(linea)   # --------------------
```

> ### ⚠️ Cuidado
> Con `+` solo puedes unir cadena **con cadena**. Si intentas pegar una cadena y un número, Python
> da error. Primero convierte el número a texto con `str(...)`, o mejor usa una f-string:
> ```python
> aciertos = 3
> # print("Aciertos: " + aciertos)        # ❌ TypeError
> print("Aciertos: " + str(aciertos))     # ✅ Aciertos: 3
> print(f"Aciertos: {aciertos}")          # ✅ más limpio
> ```

> ### 🟦 ¿Qué significa? — *`str()` (conversión a cadena)*
> `str()` es una función que **convierte** cualquier valor (un número, por ejemplo) en su versión
> de texto. `str(3)` produce la cadena `"3"`. Sirve justo para casos como el de arriba.

---

## 4. Indexación: llegar a un carácter

Una cadena es una **secuencia ordenada**: cada carácter tiene una posición.

> ### 🟦 ¿Qué significa? — *Índice (index)*
> El **índice** es el **número de posición** de un carácter dentro de la cadena. Python empieza a
> contar **desde 0**: el primer carácter es el índice `0`, el segundo el `1`, y así.
> **¿Para qué sirve?** Para leer un carácter concreto.
> ```python
> palabra = "PolyPaw"
> print(palabra[0])   # P   (el primero)
> print(palabra[1])   # o
> print(palabra[3])   # y
> ```

> ### 🟦 ¿Qué significa? — *Índice negativo*
> Un **índice negativo** cuenta desde el **final**: `-1` es el último carácter, `-2` el penúltimo.
> **¿Para qué sirve?** Para tomar el final sin saber cuántos caracteres hay.
> ```python
> palabra = "PolyPaw"
> print(palabra[-1])   # w   (el último)
> print(palabra[-2])   # a
> ```

> ### ⚠️ Cuidado
> Si pides un índice que no existe (por ejemplo `palabra[50]` en una cadena corta), Python lanza
> el error `IndexError: string index out of range`. Asegúrate de que la posición exista.

> ### 💡 Tip
> Para saber cuántos caracteres tiene una cadena, usa `len()`:
> ```python
> print(len("PolyPaw"))   # 7
> ```
> El último índice válido siempre es `len(cadena) - 1` (aquí, `6`).

---

## 5. Slicing: cortar un trozo

A veces no quieres un carácter, sino **un pedazo** de la cadena.

> ### 🟦 ¿Qué significa? — *Slicing (rebanado)*
> El **slicing** es cortar una **porción** de la cadena indicando posiciones entre corchetes con
> la forma `[inicio:fin:paso]`. Te devuelve una nueva cadena con ese trozo.
> - **inicio**: posición donde empieza el corte (se incluye).
> - **fin**: posición donde termina (se **excluye**, no se incluye).
> - **paso**: de cuánto en cuánto avanza (opcional; por defecto 1).
> ```python
> texto = "PolyPaw"
> print(texto[0:4])    # Poly   (del 0 al 3; el 4 NO entra)
> print(texto[4:7])    # Paw
> ```

> ### ⚠️ Cuidado
> El **fin se excluye**. `texto[0:4]` toma los caracteres `0, 1, 2, 3` pero **no** el `4`. Esto
> confunde al principio; piénsalo como "hasta justo antes del fin".

Puedes omitir partes y Python asume valores razonables:

```python
texto = "PolyPaw"
print(texto[:4])     # Poly    (desde el inicio)
print(texto[4:])     # Paw     (hasta el final)
print(texto[:])      # PolyPaw (copia completa)
```

> ### 🟦 ¿Qué significa? — *Paso (step)*
> El **paso** dice cada cuántos caracteres tomar uno. Con `2` toma uno sí y uno no. Con `-1`
> recorre **al revés**, lo que sirve para invertir una cadena:
> ```python
> texto = "PolyPaw"
> print(texto[::2])    # PlPw   (de dos en dos)
> print(texto[::-1])   # waPyloP (invertida)
> ```

> ### 🔎 En tu código
> En **PolyPaw**, si un código de idioma viene como `"es-MX"` y solo necesitas el idioma base
> `"es"`, un slicing como `codigo[:2]` te lo entrega al instante.

---

## 6. Métodos esenciales de las cadenas

> ### 🟦 ¿Qué significa? — *Método*
> Un **método** es una función que **pertenece** a un valor y se llama con un punto: `valor.metodo()`.
> Las cadenas traen muchos métodos listos para transformarlas o consultarlas.
> **¿Dónde se usa en tu proyecto?** En **PolyPaw**, antes de comparar lo que escribe el usuario
> con la respuesta correcta, se limpian y normalizan ambos textos usando estos métodos.

### Cambiar mayúsculas y minúsculas

> ### 🟦 ¿Qué significa? — *`upper()` y `lower()`*
> `upper()` devuelve la cadena en **MAYÚSCULAS**; `lower()` la devuelve en **minúsculas**.
> **¿Para qué sirve?** Para comparar sin que importe cómo escribió el usuario.
> ```python
> print("PolyPaw".upper())   # POLYPAW
> print("PolyPaw".lower())   # polypaw
> ```

### Limpiar espacios

> ### 🟦 ¿Qué significa? — *`strip()`*
> `strip()` **quita los espacios** (y saltos de línea) que sobran al **inicio y al final** de la
> cadena. No toca los del medio.
> **¿Para qué sirve?** El usuario suele dejar un espacio de más al escribir; `strip()` lo elimina
> para que la comparación sea justa.
> ```python
> escrito = "   hola   "
> print(escrito.strip())   # 'hola'
> ```

### Partir y unir

> ### 🟦 ¿Qué significa? — *`split()`*
> `split()` **parte** una cadena en una **lista** de trozos, cortando por un separador (por
> defecto, los espacios).
> **¿Para qué sirve?** Para separar una frase en palabras, o un dato como `"es,en,fr"` en sus
> partes.
> ```python
> frase = "aprende una palabra"
> print(frase.split())          # ['aprende', 'una', 'palabra']
> print("es,en,fr".split(","))  # ['es', 'en', 'fr']
> ```

> ### 🟦 ¿Qué significa? — *`join()`*
> `join()` hace lo contrario de `split()`: **une** una lista de cadenas en una sola, poniendo un
> separador entre ellas. Se escribe `separador.join(lista)`.
> **¿Para qué sirve?** Para volver a armar texto a partir de partes.
> ```python
> palabras = ["aprende", "una", "palabra"]
> print(" ".join(palabras))    # aprende una palabra
> print("-".join(["es", "en"]))  # es-en
> ```

> ### 💡 Tip
> Fíjate en el orden: `join` se llama **sobre el separador**, no sobre la lista. Se lee como
> "con un espacio, une estas palabras": `" ".join(palabras)`.

### Reemplazar

> ### 🟦 ¿Qué significa? — *`replace()`*
> `replace(viejo, nuevo)` devuelve una cadena donde **todas** las apariciones de un texto se
> cambian por otro.
> **¿Para qué sirve?** Para corregir o sustituir partes de un texto.
> ```python
> print("Hola mundo".replace("mundo", "PolyPaw"))   # Hola PolyPaw
> ```

### Buscar y comprobar

> ### 🟦 ¿Qué significa? — *`find()`*
> `find(texto)` devuelve el **índice** donde empieza la primera aparición del texto buscado, o
> `-1` si no lo encuentra.
> **¿Para qué sirve?** Para saber si algo está dentro de una cadena y en qué posición.
> ```python
> print("PolyPaw".find("Paw"))   # 4
> print("PolyPaw".find("zzz"))   # -1  (no está)
> ```

> ### 🟦 ¿Qué significa? — *`startswith()`*
> `startswith(texto)` devuelve `True` o `False` según si la cadena **empieza** por ese texto.
> **¿Para qué sirve?** Para filtrar o clasificar. En **PolyPaw**, podrías saber si el nombre de un
> archivo de misión empieza por `"es-"` para detectar las misiones de español:
> ```python
> archivo = "es-saludos.json"
> print(archivo.startswith("es-"))   # True
> ```

> ### 💡 Tip
> Para preguntar simplemente "¿está este texto dentro?" sin importar la posición, Python tiene el
> operador `in`, aún más legible que `find`:
> ```python
> print("Paw" in "PolyPaw")   # True
> ```

> ### 🔎 En tu código
> Un flujo típico al revisar una respuesta en **PolyPaw**: tomar lo que escribió el usuario,
> aplicar `.strip().lower()` para limpiar y normalizar, y recién entonces compararlo con la
> respuesta correcta (también normalizada). Así "  Casa " y "casa" cuentan como iguales.
> ```python
> respuesta_usuario = "  Casa "
> correcta = "casa"
> print(respuesta_usuario.strip().lower() == correcta)   # True
> ```
> Observa el **encadenado**: `.strip()` limpia y, sobre el resultado, `.lower()` pasa a minúsculas.

---

## 7. Caracteres de escape

¿Cómo metes un salto de línea, o unas comillas dobles dentro de una cadena con comillas dobles?
Con un **carácter de escape**.

> ### 🟦 ¿Qué significa? — *Carácter de escape*
> Un **carácter de escape** es una combinación que empieza con la **barra invertida `\`** y
> representa un carácter especial difícil de teclear directamente.
> **¿Para qué sirve?** Para incluir saltos de línea, tabulaciones o comillas dentro del texto.
> Los más comunes:
> - `\n` → salto de línea (nueva línea).
> - `\t` → tabulación (un espacio grande).
> - `\"` → una comilla doble literal.
> - `\\` → una barra invertida literal.
> ```python
> print("Línea 1\nLínea 2")     # imprime en dos líneas
> print("Nombre:\tBit")         # Nombre:    Bit
> print("Dijo \"hola\"")        # Dijo "hola"
> ```

> ### 💡 Tip
> Si tu texto tiene **muchas** barras invertidas (por ejemplo, una ruta de Windows), puedes usar
> una cadena *cruda* poniendo `r` antes: `r"C:\carpeta\nombre"` evita que `\n` se interprete como
> salto de línea.

---

## 8. Inmutabilidad: las cadenas no se modifican

Este punto sorprende a muchos principiantes, así que vamos despacio.

> ### 🟦 ¿Qué significa? — *Inmutable*
> Que una cadena sea **inmutable** quiere decir que **no se puede cambiar por dentro** una vez
> creada. No puedes reemplazar un carácter suelto: lo que haces es **crear una cadena nueva** a
> partir de la original.
> ```python
> palabra = "polypaw"
> # palabra[0] = "P"        # ❌ TypeError: las cadenas no se modifican
> palabra = "P" + palabra[1:]   # ✅ creamos una nueva: 'Polypaw'
> print(palabra)
> ```

> ### ⚠️ Cuidado
> Métodos como `upper()`, `strip()` o `replace()` **no cambian** la cadena original: devuelven una
> **cadena nueva**. Si no la guardas, el cambio se pierde:
> ```python
> nombre = "bit"
> nombre.upper()          # produce 'BIT' pero NO se guarda en ninguna parte
> print(nombre)           # bit   ← sigue igual
> nombre = nombre.upper() # ahora sí lo guardamos
> print(nombre)           # BIT
> ```

> ### 💡 Tip
> Compara con las **listas** (Capítulo 03): las listas **sí** son mutables, puedes cambiar un
> elemento con `lista[0] = ...`. Las cadenas no. Es una diferencia importante a recordar.

> ### 🔎 En tu código
> En **PolyPaw**, cuando los textos de las misiones se cargan desde los archivos `missions/*.json`
> con ayuda de `database_manager.py`, esos textos llegan como cadenas. Cada vez que se "limpian" o
> "formatean" para mostrarlos, en realidad se generan cadenas nuevas; el dato original del JSON
> queda intacto hasta que decidas guardarlo de otra forma.

---

## 9. Un mini-ejemplo que junta todo

Veamos cómo una sola función de revisión usa varias piezas a la vez. Es el tipo de lógica que vive
detrás de las misiones de **PolyPaw**:

```python
def revisar_respuesta(escrito, correcta):
    # 1. Limpiamos y normalizamos lo que escribió el usuario
    limpio = escrito.strip().lower()
    correcta = correcta.strip().lower()

    # 2. Comparamos
    if limpio == correcta:
        return f"¡Correcto! '{escrito.strip()}' es la respuesta."
    else:
        return f"Casi. Escribiste '{limpio}', pero era '{correcta}'."

print(revisar_respuesta("  Casa ", "casa"))
print(revisar_respuesta("perro", "gato"))
```

Aquí ves juntos: métodos encadenados (`strip().lower()`), comparación, e f-strings para armar el
mensaje. Bit aplaude desde su pecera.

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Sé escribir cadenas con comillas simples, dobles y triples, y cuándo conviene cada una.
- [ ] Puedo meter variables dentro de un texto con una **f-string** (`f"... {variable} ..."`).
- [ ] Sé concatenar con `+` y entiendo por qué hay que convertir números con `str()`.
- [ ] Entiendo la **indexación** desde 0 y los índices negativos.
- [ ] Sé hacer **slicing** `[inicio:fin:paso]` y recuerdo que el fin se excluye.
- [ ] Conozco y uso `upper`, `lower`, `strip`, `split`, `join`, `replace`, `find`, `startswith`.
- [ ] Reconozco los caracteres de escape `\n`, `\t`, `\"`.
- [ ] Entiendo que las cadenas son **inmutables** y que los métodos devuelven cadenas nuevas.

---

## 🧪 Ejercicios

1. 💻 Crea una variable `nombre` con tu nombre y muestra con una **f-string** el mensaje
   `"¡Hola, NOMBRE! Bienvenido a PolyPaw."`.

2. 💻 Dada la cadena `palabra = "aprendizaje"`, imprime: su longitud con `len()`, su primer
   carácter, su último carácter (con índice negativo) y los primeros 7 caracteres con slicing.

3. 💻 Toma la cadena `"  Hola Mundo  "` y, encadenando métodos, conviértela en `"hola mundo"`
   (sin espacios sobrantes y en minúsculas). Imprime el resultado.

4. 💻 Parte la cadena `"es,en,fr,pt"` con `split(",")` para obtener una lista de idiomas y luego
   vuelve a unirlos con `join` usando `" - "` como separador, para imprimir `"es - en - fr - pt"`.

5. 💻 Escribe una función `es_mision_de(archivo, prefijo)` que devuelva `True` si el nombre del
   archivo **empieza** por el prefijo (usa `startswith`). Pruébala con `"es-saludos.json"` y el
   prefijo `"es-"`.

6. Sin ejecutar nada, predice qué imprime este código y explica por qué. Luego compruébalo:
   ```python
   texto = "PolyPaw"
   texto.upper()
   print(texto)
   ```
   (Pista: recuerda la **inmutabilidad** y que los métodos devuelven una cadena nueva.)
