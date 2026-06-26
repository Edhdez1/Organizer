# Capítulo 06 — Cadenas de texto a fondo

<p align="center">
  <img src="../../recursos/imagenes/04-python/cap06.png" alt="Ilustración del capítulo (pixel art con Bit)" width="640">
</p>


> Piénsalo un momento: casi todo lo que un usuario ve en pantalla es **texto**. El título de una
> misión, una pista, un mensaje de error, el nombre de un idioma. En Python ese texto vive en las
> **cadenas** (strings). Ya las tocaste de refilón en capítulos anteriores, pero aquí nos
> detenemos a mirarlas con calma, porque en **PolyPaw** los textos de las misiones (guardados en
> archivos `missions/*.json`) se leen, se limpian, se cortan y se rearman todo el tiempo. Bit,
> nuestro ajolote, dice que las cadenas son como el agua de su pecera: están en todas partes, y
> más vale aprender a nadar en ellas.

---

## 1. Qué es una cadena y cómo se escribe

> ### 🟦 ¿Qué significa? — *Cadena (string)*
> Una **cadena** es un valor que guarda **texto**: una secuencia de caracteres (letras, números,
> espacios, símbolos) puestos en un orden concreto. Sirve para almacenar cualquier cosa escrita,
> desde un nombre hasta una frase entera o una palabra de vocabulario.
> **¿Dónde se usa en tu proyecto?** En **PolyPaw**, el título de cada misión y cada palabra del
> idioma que se aprende son cadenas; viven dentro de los archivos `missions/*.json` y `main.py`
> las muestra en pantalla.

Para escribir una cadena en Python, rodeas el texto con **comillas**. Hay tres formas de hacerlo:

```python
simple = 'Hola, PolyPaw'
doble = "Hola, PolyPaw"
triple = """Hola,
PolyPaw"""
```

> ### 🟦 ¿Qué significa? — *Comillas simples y dobles*
> Las **comillas simples** (`'...'`) y las **comillas dobles** (`"..."`) hacen exactamente lo
> mismo: marcan dónde empieza y dónde termina el texto. Usas una u otra según te convenga.
> **¿Para qué sirve tener dos?** Para poder meter el otro tipo de comilla **dentro** del texto sin
> que se rompa:
> ```python
> frase = "Bit dijo: 'aprende una palabra al día'"
> otra = 'La palabra "casa" en inglés es "house"'
> ```
> Si por fuera usas comillas dobles, dentro puedes escribir simples sin problema, y al revés.

> ### 🟦 ¿Qué significa? — *Comillas triples*
> Las **comillas triples** (`'''...'''` o `"""..."""`) permiten que una cadena ocupe **varias
> líneas**. Todo lo que pongas dentro, incluidos los saltos de línea, forma parte del texto.
> **¿Dónde se usa en tu proyecto?** Van perfectas para un texto largo que explica una misión, o
> para dejar un comentario extenso dentro de `database_manager.py`:
> ```python
> instruccion = """Bienvenido a la misión.
> Escucha la palabra y elige la traducción correcta.
> ¡Tienes tres intentos!"""
> ```

> ### 💡 Tip
> En JavaScript (lo viste en el Módulo 03) usabas comillas o *backticks* `` ` `` para los textos.
> En Python no existen los backticks: cuando necesites texto de varias líneas, echa mano de las
> **comillas triples**.

---

## 2. f-strings: meter variables dentro del texto

Supón que quieres saludar al jugador por su nombre. Podrías ir pegando trozos de texto, pero hay
una manera mucho más limpia de hacerlo.

> ### 🟦 ¿Qué significa? — *f-string (cadena formateada)*
> Una **f-string** es una cadena que lleva una `f` justo antes de la comilla de apertura. Dentro
> puedes meter **variables entre llaves `{}`** y Python las cambia por su valor al imprimir.
> **¿Para qué sirve?** Para construir mensajes que cambian según los datos, sin andar pegando
> trozos a mano. Es la manera que se recomienda para armar texto en Python moderno.
> ```python
> nombre = "Edwar"
> aciertos = 3
> mensaje = f"¡Bien hecho, {nombre}! Llevas {aciertos} aciertos."
> print(mensaje)   # ¡Bien hecho, Edwar! Llevas 3 aciertos.
> ```

> ### 🟦 ¿Qué significa? — *Formateo*
> **Formatear** es armar un texto mezclando partes fijas con valores que cambian, dándole la forma
> que quieres. La f-string es la herramienta de formateo que más vas a usar.

Si vienes de JavaScript, una f-string es lo mismo que las *template literals*: allí escribías
`` `Hola ${nombre}` ``; en Python queda `f"Hola {nombre}"`. La idea es idéntica, solo cambia la
sintaxis: una `f` al principio y llaves `{}` en lugar de `${}`.

> ### 💡 Tip
> Dentro de las llaves no solo entran variables: cabe cualquier expresión que produzca un valor.
> ```python
> precio = 5
> print(f"Total: {precio * 2} monedas")   # Total: 10 monedas
> ```

> ### 🔎 En tu código
> En **PolyPaw**, cuando una misión muestra "Pregunta 2 de 10", ese texto se arma con una f-string
> como `f"Pregunta {actual} de {total}"`, donde `actual` y `total` son números que van cambiando
> mientras juegas.

> ### ⚠️ Cuidado
> Si **se te olvida la `f`**, las llaves no se reemplazan y el texto sale literal, con llaves y
> todo.
> ```python
> nombre = "Bit"
> print("Hola {nombre}")    # Hola {nombre}   ← mal, faltó la f
> print(f"Hola {nombre}")   # Hola Bit        ← correcto
> ```

---

## 3. Concatenación: unir cadenas

> ### 🟦 ¿Qué significa? — *Concatenar*
> **Concatenar** es **pegar** dos o más cadenas para formar una sola, con el signo `+`.
> **¿Para qué sirve?** Para juntar trozos de texto. Aunque las f-strings suelen ser más cómodas,
> el `+` lo vas a encontrar en muchísimo código:
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
> Con `+` solo unes cadena **con cadena**. Si intentas pegar una cadena y un número, Python se
> queja con un error. Primero conviertes el número a texto con `str(...)`, o mejor todavía, usas
> una f-string:
> ```python
> aciertos = 3
> # print("Aciertos: " + aciertos)        # ❌ TypeError
> print("Aciertos: " + str(aciertos))     # ✅ Aciertos: 3
> print(f"Aciertos: {aciertos}")          # ✅ más limpio
> ```

> ### 🟦 ¿Qué significa? — *`str()` (conversión a cadena)*
> `str()` es una función que **convierte** cualquier valor (un número, por ejemplo) en su versión
> de texto. `str(3)` te devuelve la cadena `"3"`. Es justo lo que necesitas en el caso de arriba.

---

## 4. Indexación: llegar a un carácter

Una cadena es una **secuencia ordenada**, así que cada carácter ocupa una posición.

> ### 🟦 ¿Qué significa? — *Índice (index)*
> El **índice** es el **número de posición** de un carácter dentro de la cadena. Python cuenta
> **desde 0**: el primer carácter es el índice `0`, el segundo el `1`, y así sucesivamente.
> **¿Para qué sirve?** Para leer un carácter concreto.
> ```python
> palabra = "PolyPaw"
> print(palabra[0])   # P   (el primero)
> print(palabra[1])   # o
> print(palabra[3])   # y
> ```

> ### 🟦 ¿Qué significa? — *Índice negativo*
> Un **índice negativo** cuenta desde el **final**: `-1` es el último carácter, `-2` el penúltimo.
> **¿Para qué sirve?** Para agarrar el final sin tener que saber cuántos caracteres hay.
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

A veces no quieres un solo carácter, sino **un pedazo** de la cadena.

> ### 🟦 ¿Qué significa? — *Slicing (rebanado)*
> El **slicing** es cortar una **porción** de la cadena indicando posiciones entre corchetes, con
> la forma `[inicio:fin:paso]`. Te devuelve una cadena nueva con ese trozo.
> - **inicio**: posición donde empieza el corte (se incluye).
> - **fin**: posición donde termina (se **excluye**, no entra en el resultado).
> - **paso**: de cuánto en cuánto avanza (opcional; por defecto 1).
> ```python
> texto = "PolyPaw"
> print(texto[0:4])    # Poly   (del 0 al 3; el 4 NO entra)
> print(texto[4:7])    # Paw
> ```

> ### ⚠️ Cuidado
> El **fin se excluye**. `texto[0:4]` agarra los caracteres `0, 1, 2, 3` pero **no** el `4`. Esto
> despista al principio; te ayuda pensarlo como "hasta justo antes del fin".

Puedes omitir partes y Python asume valores razonables:

```python
texto = "PolyPaw"
print(texto[:4])     # Poly    (desde el inicio)
print(texto[4:])     # Paw     (hasta el final)
print(texto[:])      # PolyPaw (copia completa)
```

> ### 🟦 ¿Qué significa? — *Paso (step)*
> El **paso** indica cada cuántos caracteres tomar uno. Con `2` toma uno sí y uno no. Con `-1`
> recorre la cadena **al revés**, que es justo lo que necesitas para invertirla:
> ```python
> texto = "PolyPaw"
> print(texto[::2])    # PlPw   (de dos en dos)
> print(texto[::-1])   # waPyloP (invertida)
> ```

> ### 🔎 En tu código
> En **PolyPaw**, si un código de idioma te llega como `"es-MX"` y solo necesitas el idioma base
> `"es"`, un slicing como `codigo[:2]` te lo deja servido al instante.

---

## 6. Métodos esenciales de las cadenas

> ### 🟦 ¿Qué significa? — *Método*
> Un **método** es una función que **pertenece** a un valor y se llama con un punto: `valor.metodo()`.
> Las cadenas vienen con un montón de métodos listos para transformarlas o consultarlas.
> **¿Dónde se usa en tu proyecto?** En **PolyPaw**, antes de comparar lo que escribe el usuario con
> la respuesta correcta, ambos textos se limpian y se normalizan usando estos métodos.

### Cambiar mayúsculas y minúsculas

> ### 🟦 ¿Qué significa? — *`upper()` y `lower()`*
> `upper()` te devuelve la cadena en **MAYÚSCULAS**; `lower()`, en **minúsculas**.
> **¿Para qué sirve?** Para comparar dos textos sin que importe cómo los escribió el usuario.
> ```python
> print("PolyPaw".upper())   # POLYPAW
> print("PolyPaw".lower())   # polypaw
> ```

### Limpiar espacios

> ### 🟦 ¿Qué significa? — *`strip()`*
> `strip()` **quita los espacios** (y saltos de línea) que sobran al **inicio y al final** de la
> cadena. Lo del medio no lo toca.
> **¿Para qué sirve?** El usuario casi siempre deja algún espacio de más al escribir; `strip()` lo
> elimina para que la comparación sea justa.
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
> `join()` hace justo lo contrario de `split()`: **une** una lista de cadenas en una sola, metiendo
> un separador entre ellas. Se escribe `separador.join(lista)`.
> **¿Para qué sirve?** Para volver a armar texto a partir de sus partes.
> ```python
> palabras = ["aprende", "una", "palabra"]
> print(" ".join(palabras))    # aprende una palabra
> print("-".join(["es", "en"]))  # es-en
> ```

> ### 💡 Tip
> Fíjate bien en el orden: `join` se llama **sobre el separador**, no sobre la lista. Se lee como
> "con un espacio, une estas palabras": `" ".join(palabras)`.

### Reemplazar

> ### 🟦 ¿Qué significa? — *`replace()`*
> `replace(viejo, nuevo)` te devuelve una cadena en la que **todas** las apariciones de un texto
> quedan cambiadas por otro.
> **¿Para qué sirve?** Para corregir o sustituir partes de un texto.
> ```python
> print("Hola mundo".replace("mundo", "PolyPaw"))   # Hola PolyPaw
> ```

### Buscar y comprobar

> ### 🟦 ¿Qué significa? — *`find()`*
> `find(texto)` te devuelve el **índice** donde empieza la primera aparición del texto que buscas,
> o `-1` si no lo encuentra.
> **¿Para qué sirve?** Para saber si algo está dentro de una cadena, y en qué posición.
> ```python
> print("PolyPaw".find("Paw"))   # 4
> print("PolyPaw".find("zzz"))   # -1  (no está)
> ```

> ### 🟦 ¿Qué significa? — *`startswith()`*
> `startswith(texto)` te devuelve `True` o `False` según si la cadena **empieza** por ese texto.
> **¿Para qué sirve?** Para filtrar o clasificar. En **PolyPaw**, podrías comprobar si el nombre de
> un archivo de misión empieza por `"es-"` para detectar las misiones de español:
> ```python
> archivo = "es-saludos.json"
> print(archivo.startswith("es-"))   # True
> ```

> ### 💡 Tip
> Si solo quieres preguntar "¿está este texto dentro?" y la posición te da igual, Python tiene el
> operador `in`, que se lee todavía mejor que `find`:
> ```python
> print("Paw" in "PolyPaw")   # True
> ```

> ### 🔎 En tu código
> Así suele ir el flujo cuando se revisa una respuesta en **PolyPaw**: tomas lo que escribió el
> usuario, le aplicas `.strip().lower()` para limpiarlo y normalizarlo, y solo entonces lo comparas
> con la respuesta correcta (también normalizada). De ese modo "  Casa " y "casa" cuentan como
> iguales.
> ```python
> respuesta_usuario = "  Casa "
> correcta = "casa"
> print(respuesta_usuario.strip().lower() == correcta)   # True
> ```
> Mira el **encadenado**: `.strip()` limpia y, sobre ese resultado, `.lower()` pasa a minúsculas.

---

## 7. Caracteres de escape

¿Cómo metes un salto de línea, o unas comillas dobles dentro de una cadena que ya va entre comillas
dobles? Para eso están los **caracteres de escape**.

> ### 🟦 ¿Qué significa? — *Carácter de escape*
> Un **carácter de escape** es una combinación que arranca con la **barra invertida `\`** y
> representa un carácter especial que cuesta teclear directamente.
> **¿Para qué sirve?** Para incluir saltos de línea, tabulaciones o comillas dentro del texto. Los
> más habituales son:
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
> Si tu texto tiene **muchas** barras invertidas (una ruta de Windows, por ejemplo), te conviene
> una cadena *cruda*: pones una `r` antes y listo. Así, `r"C:\carpeta\nombre"` evita que `\n` se
> interprete como salto de línea.

---

## 8. Inmutabilidad: las cadenas no se modifican

Este punto suele pillar desprevenidos a quienes empiezan, así que vamos con calma.

> ### 🟦 ¿Qué significa? — *Inmutable*
> Que una cadena sea **inmutable** quiere decir que, una vez creada, **no se puede cambiar por
> dentro**. No puedes reemplazar un carácter suelto: lo que haces es **crear una cadena nueva** a
> partir de la original.
> ```python
> palabra = "polypaw"
> # palabra[0] = "P"        # ❌ TypeError: las cadenas no se modifican
> palabra = "P" + palabra[1:]   # ✅ creamos una nueva: 'Polypaw'
> print(palabra)
> ```

> ### ⚠️ Cuidado
> Métodos como `upper()`, `strip()` o `replace()` **no cambian** la cadena original: te devuelven
> una **cadena nueva**. Si no la guardas, el cambio se pierde:
> ```python
> nombre = "bit"
> nombre.upper()          # produce 'BIT' pero NO se guarda en ninguna parte
> print(nombre)           # bit   ← sigue igual
> nombre = nombre.upper() # ahora sí lo guardamos
> print(nombre)           # BIT
> ```

> ### 💡 Tip
> Compáralo con las **listas** (Capítulo 03): las listas **sí** son mutables, puedes cambiar un
> elemento con `lista[0] = ...`. Las cadenas no. Es una diferencia que conviene tener bien clara.

> ### 🔎 En tu código
> En **PolyPaw**, cuando los textos de las misiones se cargan desde los archivos `missions/*.json`
> con ayuda de `database_manager.py`, esos textos te llegan como cadenas. Cada vez que se "limpian"
> o se "formatean" para mostrarlos, lo que ocurre por debajo es que se generan cadenas nuevas; el
> dato original del JSON sigue intacto hasta que decidas guardarlo de otra manera.

---

## 9. Un mini-ejemplo que junta todo

Veamos cómo una sola función de revisión usa varias piezas a la vez. Es justo el tipo de lógica que
vive detrás de las misiones de **PolyPaw**:

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

Aquí tienes todo junto: métodos encadenados (`strip().lower()`), una comparación y f-strings para
armar el mensaje. Bit aplaude desde su pecera.

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
