# Capitulo 12 — Errores y excepciones

<p align="center">
  <img src="../../recursos/imagenes/04-python/cap12.png" alt="Ilustración del capítulo (pixel art con Bit)" width="640">
</p>


> Hola otra vez. Soy **Bit**, tu ajolote guia. Hoy toca un tema que pone nerviosos a casi todos cuando empiezan: los errores. Esas letras rojas que aparecen justo cuando algo se rompe. Pero quiero contarte algo que cambia todo: un error no es un castigo, es un **mensaje**. Es Python hablandote. Te dice "oye, aqui hay un problema, y mira, es exactamente este". El dia que aprendas a leer esos mensajes vas a dejar de temerles y vas a empezar a tratarlos como las pistas de un detective. Lo haremos despacio, con calma, y usando nuestra app **PolyPaw** como ejemplo de principio a fin.

## 1. Un error no es el fin del mundo

Programa lo que programes, los errores van a aparecer. Siempre. Le pasa al que abre Python por primera vez y le pasa al que lleva veinte anios viviendo de esto. La diferencia esta en otra parte: el experto **lee el error** y lo arregla en segundos, mientras que el principiante se asusta y cierra todo de golpe. Lo que busco en este capitulo es justamente eso, llevarte del segundo grupo al primero.

PolyPaw, nuestra app de aprendizaje de idiomas hecha **enteramente en Python** con el framework Flet, guarda sus datos en archivos JSON dentro de la carpeta `missions/`. Piensa en este escenario: un dia el archivo `missions/saludos.json` no aparece. Alguien lo borro, o el nombre quedo mal escrito. Si no preparamos la app para ese caso, se **cae** y el usuario se queda mirando una pantalla rota. Justo ahi esta la diferencia entre una app fragil y una que encaja los golpes y sigue de pie.

Antes de seguir, conviene dejar claro el termino mas importante del capitulo.

> ### 🟦 ¿Que significa? — *Excepcion*
> Una **excepcion** es un evento que interrumpe el flujo normal de tu programa porque algo salio mal. El nombre viene de "situacion excepcional", es decir, algo con lo que no contabas. Cuando Python se topa con un problema (dividir entre cero, abrir un archivo que no existe, sumar un numero con un texto), **lanza** una excepcion.
> **Para que sirve:** te avisa exactamente que paso y donde, para que puedas reaccionar.
> **Donde se usa en un repo real:** en PolyPaw, cuando `database_manager.py` intenta leer una mision que no esta, Python lanza una excepcion del tipo `FileNotFoundError`. Si la atrapamos, podemos mostrar un mensaje amable en vez de que la app explote.

> ### 💡 Tip
> En JavaScript (que viste en el Modulo 03) a esto se le llama "throw / try / catch". En Python el concepto es identico, solo cambian las palabras: en vez de `catch` se usa `except`. Si ya entendiste el manejo de errores en JS, aqui solo cambias el vocabulario.

## 2. Los tipos de error mas comunes

Python tiene un monton de tipos de error, pero como principiante te vas a cruzar una y otra vez con los mismos seis. Vamos a verlos de uno en uno. Cada uno tiene un **nombre**, y ese nombre ya te adelanta de que va la cosa.

> ### 🟦 ¿Que significa? — *SyntaxError*
> Un **SyntaxError** (error de sintaxis) significa que escribiste algo que Python ni siquiera puede entender, porque rompe las reglas de gramatica del lenguaje. La "sintaxis" son las reglas de como se escribe el codigo.
> **Para que sirve:** te avisa que el codigo esta mal **escrito** antes incluso de ejecutarse.
> **Donde se usa en un repo real:** si en `main.py` de PolyPaw olvidas un parentesis o los dos puntos de un `if`, Python ni arranca y te muestra un SyntaxError.

Ejemplo de SyntaxError (falta el cierre del parentesis):

```python
print("Bienvenido a PolyPaw"
```

Python te responde algo parecido a `SyntaxError: '(' was never closed`. En cristiano: "abriste un parentesis y nunca lo cerraste".

> ### 🟦 ¿Que significa? — *NameError*
> Un **NameError** (error de nombre) ocurre cuando usas un nombre (una variable o funcion) que Python no conoce, porque nunca lo creaste o lo escribiste mal.
> **Para que sirve:** atrapa errores de tipeo en nombres de variables.
> **Donde se usa en un repo real:** en PolyPaw, si escribes `mison` cuando la variable se llama `mision`, salta un NameError.

```python
mision = "saludos"
print(mison)   # escribimos mal el nombre
```

Resultado: `NameError: name 'mison' is not defined`. Traduccion: "no se que es 'mison', nunca me lo presentaste".

> ### 🟦 ¿Que significa? — *TypeError*
> Un **TypeError** (error de tipo) sucede cuando intentas hacer una operacion con un tipo de dato que no la permite. Por ejemplo, sumar un numero con un texto.
> **Para que sirve:** evita que mezcles peras con manzanas sin darte cuenta.
> **Donde se usa en un repo real:** en PolyPaw, si el puntaje de una mision viene como texto `"10"` y tratas de sumarle `5`, Python protesta con TypeError.

```python
puntos = "10"      # esto es texto, no numero
total = puntos + 5  # error: no se puede sumar texto + numero
```

Resultado: `TypeError: can only concatenate str (not "int") to str`.

> ### 🟦 ¿Que significa? — *KeyError*
> Un **KeyError** (error de clave) aparece cuando pides una **clave** que no existe en un diccionario. Recuerda del Capitulo anterior que un diccionario guarda pares "clave: valor", y la clave es el nombre con el que buscas un dato.
> **Para que sirve:** te avisa que el dato que buscas no esta en el diccionario.
> **Donde se usa en un repo real:** en PolyPaw, cada mision JSON es un diccionario. Si pides `mision["titulo"]` pero el JSON no tiene "titulo", salta KeyError.

```python
mision = {"id": "saludos", "idioma": "nahuatl"}
print(mision["titulo"])   # "titulo" no existe en este diccionario
```

Resultado: `KeyError: 'titulo'`.

> ### 🟦 ¿Que significa? — *IndexError*
> Un **IndexError** (error de indice) ocurre cuando pides una posicion de una lista que no existe. El "indice" es el numero de posicion; recuerda que en Python las listas empiezan en 0.
> **Para que sirve:** evita que leas mas alla del final de una lista.
> **Donde se usa en un repo real:** en PolyPaw, si una mision tiene 3 ejercicios (posiciones 0, 1, 2) y pides el ejercicio en la posicion 5, salta IndexError.

```python
ejercicios = ["hola", "adios", "gracias"]
print(ejercicios[5])   # solo hay posiciones 0, 1 y 2
```

Resultado: `IndexError: list index out of range`.

> ### 🟦 ¿Que significa? — *ValueError*
> Un **ValueError** (error de valor) pasa cuando el **tipo** de dato es correcto pero el **valor** no tiene sentido para la operacion. Por ejemplo, convertir el texto `"hola"` a numero: es texto (tipo correcto para `int()`), pero su valor no es un numero.
> **Para que sirve:** atrapa datos que se ven bien pero no sirven.
> **Donde se usa en un repo real:** en PolyPaw, si el usuario escribe su edad como "doce" y tu haces `int("doce")`, salta ValueError.

```python
edad = int("doce")   # "doce" no se puede convertir a numero
```

Resultado: `ValueError: invalid literal for int() with base 10: 'doce'`.

> ### 💡 Tip
> No intentes memorizar los seis de un tiron. Lo que de verdad importa es captar que **cada error lleva un nombre que describe el problema**. Cuando te aparezca uno nuevo, leelo en voz alta y separalo: "Key... Error... error de clave... ah, pedi una clave que no existe". Con la practica los vas a reconocer al vuelo.

## 3. Leer el traceback (la pila de error)

Cuando algo falla, Python no se conforma con una linea: te suelta un bloque entero de texto rojo. Eso es el **traceback**, y leerlo bien es tu superpoder secreto.

> ### 🟦 ¿Que significa? — *Traceback*
> El **traceback** (en espanol, "rastreo" o "pila de error") es el reporte completo que Python imprime cuando ocurre una excepcion. Muestra el camino que recorrio el programa hasta llegar al error, archivo por archivo y linea por linea.
> **Para que sirve:** te dice **donde** ocurrio el error y **que paso**, como las migas de pan de un cuento.
> **Donde se usa en un repo real:** cuando PolyPaw falla al cargar una mision, la terminal muestra un traceback que apunta a la linea exacta de `database_manager.py` donde se rompio todo.

Mira un traceback real (simplificado) de PolyPaw:

```python
Traceback (most recent call last):
  File "main.py", line 42, in <module>
    cargar_mision("saludos")
  File "database_manager.py", line 18, in cargar_mision
    with open(ruta) as f:
FileNotFoundError: [Errno 2] No such file or directory: 'missions/saludos.json'
```

Vamos a leerlo como detectives. Hay un truco de oro:

> ### 💡 Tip
> **Lee el traceback de ABAJO hacia ARRIBA.** La ultima linea te dice **que** error fue (`FileNotFoundError`) y el mensaje (`No such file or directory: 'missions/saludos.json'`). Justo encima te dice **donde** paso (archivo `database_manager.py`, linea 18, en la funcion `cargar_mision`). Lo de mas arriba es el camino que llevo hasta alli.

Asi, en cuestion de segundos, ese traceback nos cuenta tres cosas:
1. **El tipo:** `FileNotFoundError` (no se encontro un archivo).
2. **El mensaje:** falta el archivo `missions/saludos.json`.
3. **El lugar:** linea 18 de `database_manager.py`, dentro de `cargar_mision`.

Con eso en la mano ya sabemos que tocar: o el archivo no existe, o el nombre quedo mal escrito.

> ### ⚠️ Cuidado
> Que no te asuste la cantidad de texto. El traceback se ve largo y aterrador, pero el 90% de lo util esta en la **ultima linea**. Empieza siempre por ahi.

> ### 🔎 En tu codigo
> Abre la terminal donde corre PolyPaw, provoca un error a proposito (por ejemplo, pide una mision que no existe) y practica leer el traceback de abajo hacia arriba. Identifica el tipo, el mensaje y la linea. Hazlo tres veces y veras que ya no te intimida.

## 4. Atrapar errores con try / except

Hasta aqui hemos dejado que el error tumbe el programa. Pero podemos hacer algo mucho mejor: **atraparlo** y reaccionar con calma. Para eso estan `try` y `except`.

> ### 🟦 ¿Que significa? — *try / except*
> El bloque **try** ("intentar") contiene el codigo que **podria** fallar. El bloque **except** ("excepto") contiene lo que haremos **si** falla. Python intenta correr el `try`; si todo va bien, ignora el `except`; si hay una excepcion, salta al `except` y la maneja.
> **Para que sirve:** evita que un error tumbe toda la app; te da la oportunidad de responder con elegancia.
> **Donde se usa en un repo real:** en `database_manager.py` de PolyPaw, envolvemos la apertura del JSON en un `try/except` para que, si el archivo no esta, la app muestre "Mision no disponible" en vez de caerse.

```python
import json

def cargar_mision(nombre):
    ruta = f"missions/{nombre}.json"
    try:
        with open(ruta, encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"No encontre la mision '{nombre}'. Usare una vacia.")
        return {}
```

Lo que le estamos diciendo a Python es: "intenta abrir y leer el JSON; **si** resulta que el archivo no existe (`FileNotFoundError`), no te caigas: avisa y devuelve un diccionario vacio".

> ### 💡 Tip
> Compara con JavaScript: en JS escribirias `try { ... } catch (e) { ... }`. En Python es `try: ... except ...: ...`. Mismo concepto, solo cambia `catch` por `except` y se usan dos puntos e indentacion en lugar de llaves.

> ### ⚠️ Cuidado
> Huye del `except` "pelado", es decir, un `except:` que no dice que error atrapa. Ese captura **cualquier** cosa, hasta errores que ni sospechabas, y te tapa los problemas de verdad. Siempre que puedas, di **que** error esperas, como `except FileNotFoundError:`.

Otro tropiezo muy comun que vale la pena atrapar es dividir entre cero:

> ### 🟦 ¿Que significa? — *ZeroDivisionError*
> Un **ZeroDivisionError** (error de division por cero) ocurre cuando intentas dividir un numero entre `0`. En matematicas dividir entre cero no tiene sentido, asi que Python se detiene y lanza esta excepcion.
> **Para que sirve:** te avisa que una division es imposible antes de seguir con un resultado invalido.
> **Donde se usa en un repo real:** en PolyPaw, si calculas el promedio de aciertos de una mision dividiendo entre el numero de ejercicios y esa lista esta vacia (cero ejercicios), salta ZeroDivisionError. Por eso lo atrapamos con `try/except`.

```python
ejercicios = 0
promedio = 100 / ejercicios   # no se puede dividir entre cero
```

Resultado: `ZeroDivisionError: division by zero`. Se maneja igual que cualquier otro: `except ZeroDivisionError:`.

### Atrapar varios tipos de error

Nada te impide poner varios `except`, uno por cada error distinto:

```python
def cargar_mision(nombre):
    ruta = f"missions/{nombre}.json"
    try:
        with open(ruta, encoding="utf-8") as f:
            datos = json.load(f)
        return datos["titulo"]
    except FileNotFoundError:
        return "Mision no disponible"
    except KeyError:
        return "Esta mision no tiene titulo"
```

Si el archivo no esta, entra el primer `except`. Si el archivo existe pero le falta la clave `"titulo"`, entra el segundo. A cada problema, su respuesta.

> ### 🟦 ¿Que significa? — *json.load / JSONDecodeError*
> `json.load()` lee un archivo JSON y lo convierte en un diccionario de Python. Si el archivo existe pero esta **mal escrito** (le falta una coma, una llave), Python lanza un **JSONDecodeError**.
> **Para que sirve:** `json.load` traduce el texto del archivo a datos que Python puede usar; el error te avisa si el JSON esta corrupto.
> **Donde se usa en un repo real:** en PolyPaw, si alguien edita a mano `missions/saludos.json` y deja una coma de mas, `json.load` lanza JSONDecodeError al cargar la mision.

## 5. else y finally: los otros dos bloques

`try/except` viene con dos companeros opcionales: `else` y `finally`.

> ### 🟦 ¿Que significa? — *else (en try)*
> El bloque **else** dentro de un `try` se ejecuta **solo si NO hubo error**. Es decir, "si todo salio bien, haz esto tambien".
> **Para que sirve:** separa claramente el codigo que puede fallar (en `try`) del codigo que solo corre cuando todo fue bien (en `else`).
> **Donde se usa en un repo real:** en PolyPaw, podemos poner la apertura del archivo en `try` y el registro de "mision cargada con exito" en `else`.

> ### 🟦 ¿Que significa? — *finally*
> El bloque **finally** ("finalmente") se ejecuta **siempre**, haya error o no. Es el bloque de "limpieza": pase lo que pase, esto corre.
> **Para que sirve:** cerrar archivos, liberar recursos, o avisar "termine el intento" sin importar el resultado.
> **Donde se usa en un repo real:** en PolyPaw, un `finally` puede registrar en consola "intento de carga finalizado" cada vez, exito o fracaso.

Ejemplo completo con los cuatro bloques:

```python
def cargar_mision(nombre):
    ruta = f"missions/{nombre}.json"
    try:
        with open(ruta, encoding="utf-8") as f:
            datos = json.load(f)
    except FileNotFoundError:
        print(f"No existe '{ruta}'")
        return {}
    else:
        print("Mision cargada correctamente")
        return datos
    finally:
        print("Intento de carga finalizado")
```

El orden en que lo lee Python es asi: primero **intenta** (`try`); si falla, va al `except`; si NO falla, va al `else`; y **siempre**, para cerrar, corre el `finally`.

> ### 💡 Tip
> Al principio con `try` y `except` te alcanza de sobra. `else` y `finally` son herramientas que iras sacando mas adelante, cuando tu codigo crezca. No te sientas obligado a usarlos todos siempre.

## 6. Lanzar tus propios errores con raise

Hay veces en que eres **tu** quien quiere provocar un error a proposito, porque te das cuenta de que algo no cuadra. Para eso esta `raise`.

> ### 🟦 ¿Que significa? — *raise*
> **raise** ("lanzar" o "levantar") es la instruccion para que **tu** dispares una excepcion manualmente. Le dices a Python "esto esta mal, detente y avisa".
> **Para que sirve:** validar reglas de tu programa y cortar de inmediato cuando algo es invalido, en vez de seguir con datos malos.
> **Donde se usa en un repo real:** en PolyPaw, si una mision viene sin ejercicios, lanzamos `raise ValueError("La mision no tiene ejercicios")` para no mostrar una pantalla vacia y confusa.

```python
def validar_mision(mision):
    if "ejercicios" not in mision:
        raise ValueError("La mision no tiene ejercicios")
    if len(mision["ejercicios"]) == 0:
        raise ValueError("La lista de ejercicios esta vacia")
    return True
```

Aqui, si la mision no cumple las reglas, el error lo lanzamos **nosotros**. Y quien llame a esta funcion podra atraparlo con `try/except`.

> ### 💡 Tip
> En JavaScript esto se hace con `throw new Error("mensaje")`. En Python es `raise ValueError("mensaje")`. La idea es la misma: interrumpir y avisar.

## 7. Validar entradas antes de que truenen

Una de las mejores manias que puedes adoptar es **validar** los datos antes de tocarlos. Asi previenes el error de raiz en lugar de atraparlo cuando ya estallo.

> ### 🟦 ¿Que significa? — *Validar entradas*
> **Validar entradas** significa revisar que los datos que recibes (de un archivo, del usuario, de internet) cumplan lo que esperas **antes** de trabajar con ellos. "Entrada" es cualquier dato que entra a tu programa desde afuera.
> **Para que sirve:** evita errores y datos basura; tu app se vuelve mas robusta y confiable.
> **Donde se usa en un repo real:** en PolyPaw, antes de mostrar una mision validamos que tenga `titulo`, `idioma` y al menos un ejercicio. Si falta algo, avisamos en vez de romper la pantalla.

Fijate en la diferencia. En lugar de pedir directo una clave que quiza no exista:

```python
# Arriesgado: si no existe "titulo", truena con KeyError
titulo = mision["titulo"]
```

Validamos primero, o usamos `.get()`, que devuelve un valor por defecto cuando la clave no esta:

```python
# Seguro: si no existe "titulo", usamos un texto por defecto
titulo = mision.get("titulo", "Sin titulo")
```

> ### 💡 Tip
> El metodo `.get()` de los diccionarios es tu mejor amigo contra el KeyError. `mision.get("titulo")` devuelve `None` si la clave no esta, y `mision.get("titulo", "Sin titulo")` devuelve el segundo valor como respaldo. Nada de errores.

Validar entradas tambien vale para lo que teclea el usuario. Piensa en pedir un numero:

```python
respuesta = input("Cuantos puntos? ")
try:
    puntos = int(respuesta)
except ValueError:
    print("Eso no es un numero valido. Usare 0.")
    puntos = 0
```

De esta forma, si el usuario escribe "diez" en vez de "10", no se rompe nada: avisamos y seguimos adelante.

## 8. Errores tipicos de principiante (y como resolverlos)

Hay dos errores que TODO principiante de Python comete una y otra vez. Te los presento para que los reconozcas al instante.

### 8.1 Error de sangria (indentacion)

> ### 🟦 ¿Que significa? — *Indentacion (sangria)*
> La **indentacion** (en espanol, "sangria") es el espacio en blanco al inicio de una linea. En Python **no es decorativa**: define que lineas pertenecen a un bloque (un `if`, un `for`, una funcion). Otros lenguajes usan llaves `{}`; Python usa sangria.
> **Para que sirve:** le dice a Python que codigo va "dentro" de que. Es estructura, no estilo.
> **Donde se usa en un repo real:** en todo `main.py` de PolyPaw, cada funcion y cada `if` se define por su sangria. Una sangria mal puesta rompe el archivo entero.

Ejemplo malo (la segunda linea no esta indentada):

```python
def saludar():
print("Hola")   # ERROR: deberia estar indentada
```

Resultado: `IndentationError: expected an indented block`. La solucion es agregar 4 espacios al inicio:

```python
def saludar():
    print("Hola")   # correcto: 4 espacios de sangria
```

> ### ⚠️ Cuidado
> No mezcles espacios y tabuladores (la tecla Tab). Python se confunde y lanza `TabError`. Configura tu editor para que la tecla Tab inserte **4 espacios**. La mayoria lo hace por defecto.

### 8.2 Dos puntos faltantes

En Python, las lineas que abren un bloque (`if`, `for`, `while`, `def`, `else`) **terminan en dos puntos** `:`. Olvidarlos es un clasico de clasicos.

```python
def cargar()      # ERROR: falta el : al final
    print("listo")
```

Resultado: `SyntaxError: expected ':'`. La solucion:

```python
def cargar():     # correcto, con los dos puntos
    print("listo")
```

> ### 💡 Tip
> Si ves un SyntaxError y la linea senalada termina en una palabra como `if`, `for`, `def`, `else` o `while`, lo primero que debes revisar es: **falta el `:`**. Es la causa numero uno.

> ### ⚠️ Cuidado
> A veces el SyntaxError aparece en una linea que **se ve perfecta**. Eso suele significar que el error real esta en la linea **anterior** (por ejemplo, un parentesis sin cerrar arriba). Cuando la linea senalada parezca correcta, mira siempre la de arriba.

## 9. Todo junto: manejar un JSON que no existe en PolyPaw

Vamos a juntar todo en un caso real de PolyPaw: cargar una mision desde `missions/` cubriendo cada cosa que podria salir mal. Este es exactamente el tipo de funcion que vivira en `database_manager.py`.

```python
import json

def cargar_mision(nombre):
    """Carga una mision desde missions/<nombre>.json de forma segura."""
    ruta = f"missions/{nombre}.json"
    try:
        with open(ruta, encoding="utf-8") as f:
            datos = json.load(f)
    except FileNotFoundError:
        print(f"[PolyPaw] No existe la mision '{nombre}'.")
        return None
    except json.JSONDecodeError:
        print(f"[PolyPaw] El archivo '{ruta}' esta mal formado.")
        return None

    # Validamos las entradas antes de devolver
    if "titulo" not in datos:
        raise ValueError(f"La mision '{nombre}' no tiene titulo")
    if not datos.get("ejercicios"):
        raise ValueError(f"La mision '{nombre}' no tiene ejercicios")

    return datos
```

Esta funcion contempla cuatro escenarios:
1. **El archivo no existe** → atrapamos `FileNotFoundError`, avisamos y devolvemos `None`.
2. **El JSON esta corrupto** → atrapamos `json.JSONDecodeError`, avisamos y devolvemos `None`.
3. **Falta el titulo o los ejercicios** → lanzamos nosotros un `ValueError` claro.
4. **Todo bien** → devolvemos los datos de la mision.

Y asi se usa, sin que la app se caiga nunca:

```python
mision = cargar_mision("saludos")
if mision is None:
    print("Mostrando pantalla: 'Mision no disponible'")
else:
    print(f"Cargando: {mision['titulo']}")
```

> ### 🔎 En tu codigo
> En PolyPaw, prueba esta funcion con tres casos: (1) un nombre que existe, como `"saludos"` si ese JSON esta; (2) un nombre inventado como `"xyz123"`; y (3) un JSON al que le quites el titulo a proposito. Observa como cada caso se maneja sin tumbar la app. Eso es codigo robusto.

> ### 💡 Tip
> Fijate en el detalle: devolvemos `None` cuando el problema es "esperable" (un archivo que falta) pero usamos `raise` cuando es un error de **datos** que alguien tiene que arreglar (una mision sin titulo no deberia existir jamas). Saber distinguir esos dos casos es cosa de programador con experiencia, y ya lo entiendes.

## ✅ Checklist — ¿ya domino esto?

- [ ] Entiendo que una **excepcion** es un aviso de que algo salio mal, no un castigo.
- [ ] Reconozco los seis errores comunes: `SyntaxError`, `NameError`, `TypeError`, `KeyError`, `IndexError` y `ValueError`.
- [ ] Se leer un **traceback** de abajo hacia arriba: tipo, mensaje y linea.
- [ ] Se usar `try` y `except` para atrapar un error sin que la app se caiga.
- [ ] Entiendo para que sirven `else` y `finally`.
- [ ] Se lanzar mis propios errores con `raise`.
- [ ] Uso `.get()` y validaciones para prevenir el `KeyError`.
- [ ] Reconozco los errores de **sangria** y de **dos puntos faltantes** y se corregirlos.
- [ ] Puedo cargar un JSON inexistente en PolyPaw sin que la app explote.

## 🧪 Ejercicios

1. 💻 **Lee el traceback.** Provoca a proposito un `KeyError` en un diccionario pequenio (pide una clave que no exista). Copia el traceback y subraya: el tipo de error, el mensaje y la linea. Explica con tus palabras que paso.

2. 💻 **Atrapa el error.** Escribe una funcion `dividir(a, b)` que devuelva `a / b`. Usa `try/except` para atrapar el caso en que `b` sea 0 (`ZeroDivisionError`) y devuelve el texto `"No se puede dividir entre cero"`.

3. 💻 **JSON inexistente en PolyPaw.** Adapta la funcion `cargar_mision` de la seccion 9. Pruebala con un nombre de mision que NO exista en `missions/` y confirma que devuelve `None` en lugar de caerse.

4. 💻 **Valida entradas.** Escribe una funcion `validar_edad(texto)` que use `int(texto)`. Si el usuario escribe algo que no es numero, atrapa el `ValueError` y devuelve `"Edad invalida"`. Pruebala con `"15"` y con `"quince"`.

5. **Encuentra el error a ojo.** Sin ejecutarlo, di que esta mal en este codigo y de que tipo seria el error:
   ```python
   def saludar(nombre)
       print("Hola " + nombre)
   ```

6. 💻 **Lanza tu propio error.** Escribe una funcion `registrar_puntos(puntos)` que use `raise ValueError("Los puntos no pueden ser negativos")` si `puntos` es menor que 0. Atrapa ese error desde fuera con un `try/except` y muestra un mensaje amable.

> Lo lograste. Hoy aprendiste a leer el lenguaje secreto de los errores y a convertir una app fragil en una que aguanta. La proxima vez que veas letras rojas, respira, lee la ultima linea del traceback, y resuelvelo como el detective que ya eres. Nos vemos en el siguiente capitulo. — Bit 🐾
```
