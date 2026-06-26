# Capitulo 09 — Funciones a fondo

<p align="center">
  <img src="../../recursos/imagenes/04-python/cap09.png" alt="Ilustración del capítulo (pixel art con Bit)" width="640">
</p>


> Tus primeras funciones ya las escribiste en el Capitulo 03, asi que la idea de fondo te suena: una funcion es una "maquinita" con nombre que hace una tarea. Lo que pasa es que en un programa de verdad las funciones dan mucho mas de si. Reciben datos de varias maneras, devuelven resultados, manejan sus propias variables privadas y, cuando hace falta, caben en una sola linea. PolyPaw, nuestra app de idiomas escrita por completo en Python, se sostiene sobre funciones: cada vez que pierdes una vida, compras un escudo o subes de nivel, por debajo se esta llamando a una funcion de `database_manager.py`. En este capitulo destapamos esa caja y miramos como estan hechas por dentro. Bit, nuestro ajolote, se calzo los lentes de mecanico: hoy desarmamos el motor pieza por pieza.

---

## 1. `def` a fondo: anatomia de una funcion

Empecemos por refrescar la forma basica. Una funcion se *define* con la palabra `def`, le das un nombre, abres parentesis para sus entradas y debajo va un bloque indentado.

```python
def perder_vida():
    print("¡Perdiste una vida!")
```

Mas simple que eso, imposible. Pero antes de avanzar conviene fijar algo de vocabulario, porque lo vamos a usar durante todo el capitulo.

> ### 🟦 ¿Que significa? — *Definir vs. llamar una funcion*
> **Definir** una funcion es escribir su receta con `def`: le explicas a Python *como* se hace la tarea, pero todavia no la ejecutas. **Llamar** (o invocar) una funcion es usarla de verdad, escribiendo su nombre con parentesis: `perder_vida()`.
> **Para que sirve:** separar el *escribir una vez* (definir) del *usar muchas veces* (llamar). Defines una sola vez y llamas donde quieras.
> **Donde se usa en un repo real:** en PolyPaw, `perder_vida()` se *define* una sola vez en `database_manager.py`, pero se *llama* cada vez que el usuario falla un ejercicio, sin importar la pantalla.

> ### 🟦 ¿Que significa? — *Parametro y argumento*
> Un **parametro** es el nombre que aparece entre los parentesis cuando *defines* la funcion: piensalo como un hueco vacio esperando un valor. Un **argumento** es el valor concreto que pones al *llamarla* y que rellena ese hueco.
> **Para que sirve:** los parametros permiten que una misma funcion trabaje con datos distintos en cada llamada.
> **Donde se usa en un repo real:** en `gastar_gemas(cantidad)`, `cantidad` es el parametro; cuando la tienda llama `gastar_gemas(50)`, el `50` es el argumento.

Asi se ve la funcion real `gastar_gemas` de PolyPaw, recortada:

```python
def gastar_gemas(cantidad):       # "cantidad" es un parametro (hueco vacio)
    u = _usuario_mutable()
    gemas = int(u.get("gemas", 0))
    if gemas < cantidad:
        return False               # no alcanza: la tienda no cobra
    u["gemas"] = gemas - cantidad
    _persistir(u)
    return True                    # alcanzo: gemas descontadas
```

Y desde la tienda se llama asi:

```python
gastar_gemas(50)   # 50 es el argumento que entra en "cantidad"
```

Si vienes del modulo de JavaScript, esto te va a resultar familiar: alla escribias `function gastarGemas(cantidad) { ... }`. El concepto es identico; en Python cambias `function` por `def`, las llaves `{ }` por dos puntos `:` y dejas que la indentacion marque el bloque.

---

## 2. Parametros posicionales y por nombre (keyword)

Hay dos formas de pasarle argumentos a una funcion: por *posicion* o por *nombre*.

> ### 🟦 ¿Que significa? — *Argumento posicional*
> Un **argumento posicional** se entrega segun su *orden*: el primer valor va al primer parametro, el segundo al segundo, y asi sucesivamente. Python los empareja por posicion, no por nombre.
> **Para que sirve:** es la forma mas corta y comun de pasar datos cuando el orden se entiende solo.
> **Donde se usa en un repo real:** `save_user("Spanish", 25)` en PolyPaw: `"Spanish"` va a `l1_language` y `25` va a `age`, unicamente por el orden.

> ### 🟦 ¿Que significa? — *Argumento por nombre (keyword)*
> Un **argumento por nombre** (en ingles *keyword argument*) se entrega diciendo de forma explicita a que parametro pertenece, con la forma `nombre=valor`. Asi el orden deja de importar.
> **Para que sirve:** hacer el codigo mas legible y evitar liarte con el orden cuando hay muchos parametros.
> **Donde se usa en un repo real:** PolyPaw llama `establecer_perfil("teen", edad_estimada=15)`: ese `edad_estimada=15` deja clarisimo que el 15 es la edad.

Miremos la funcion real `save_user`:

```python
def save_user(l1_language, age):
    ...

# Las tres llamadas hacen lo MISMO:
save_user("Spanish", 25)                       # ambos posicionales
save_user("Spanish", age=25)                   # el segundo por nombre
save_user(l1_language="Spanish", age=25)       # ambos por nombre
```

> ### 💡 Tip
> Una regla comoda: usa argumentos posicionales cuando son pocos y obvios (`perder_vida()`), y por nombre cuando un valor suelto no se explica por si mismo. `comprar_cosmetico("sombrero_rojo", 200)` cuesta mas de leer que `comprar_cosmetico("sombrero_rojo", precio_gemas=200)`.

> ### ⚠️ Cuidado
> Si mezclas los dos estilos en una misma llamada, **los posicionales van siempre primero**. Esto es valido: `save_user("Spanish", age=25)`. Esto es un error: `save_user(l1_language="Spanish", 25)` — Python se queja con `SyntaxError`.

---

## 3. Valores por defecto: parametros que ya vienen rellenos

A veces quieres que un parametro traiga un valor "de fabrica" cuando quien llama no lo especifica.

> ### 🟦 ¿Que significa? — *Valor por defecto*
> Un **valor por defecto** es el valor que un parametro toma de forma automatica cuando la llamada no le pasa argumento. Se escribe en la definicion con `parametro=valor`.
> **Para que sirve:** hacer parametros opcionales. Quien llama solo escribe lo que de verdad quiere cambiar.
> **Donde se usa en un repo real:** en PolyPaw, `save_onboarding_inicial(...)` tiene `target_lang=None`: si no se indica el idioma a aprender, queda en `None` y la funcion no lo toca.

```python
def saludar(nombre, idioma="es"):
    if idioma == "es":
        print(f"¡Hola, {nombre}!")
    else:
        print(f"Hello, {nombre}!")

saludar("Bit")              # ¡Hola, Bit!     (usa el idioma por defecto "es")
saludar("Bit", "en")        # Hello, Bit!     (sobrescribe el defecto)
saludar("Bit", idioma="en") # Hello, Bit!     (igual, pero por nombre)
```

En PolyPaw esto se ve en firmas reales como esta (recortada):

```python
def save_onboarding_inicial(l1_language, age, target_lang=None):
    u = _usuario_mutable()
    u["l1_language"] = l1_language
    u["age"] = max(0, int(age))
    if target_lang is not None:        # solo lo guarda si lo pasaron
        u["target_lang"] = target_lang
    _persistir(u)
```

> ### ⚠️ Cuidado
> **Nunca pongas una lista o un diccionario vacios como valor por defecto** (`def f(items=[])`). Python crea esa lista *una sola vez* y la comparte entre todas las llamadas: se va llenando a tus espaldas. El truco correcto es poner `items=None` y crear la lista dentro:
> ```python
> def f(items=None):
>     if items is None:
>         items = []
>     ...
> ```
> Por eso en `database_manager.py` veras `target_lang=None` y jamas `target_lang=[]`.

> ### 🟦 ¿Que significa? — *Parametros solo por nombre (el `*` suelto)*
> Cuando ves un `*` solo (sin nombre) en la lista de parametros, todo lo que venga *despues* de el hay que pasarlo obligatoriamente por nombre, nunca por posicion.
> **Para que sirve:** forzar llamadas claras cuando hay muchos opcionales parecidos, para que no se confundan entre si.
> **Donde se usa en un repo real:** `save_onboarding_inicial(l1_language, age, target_lang=None, *, pais=None, conexion_tipo=None, ...)`. El `*` obliga a escribir `pais="CO"` y no solo `"CO"`, asi no confundes el pais con el tipo de conexion.

---

## 4. `*args` y `**kwargs`: recibir una cantidad indefinida

¿Y si no sabes cuantos argumentos te van a pasar? Para eso existen dos sintaxis con asteriscos.

> ### 🟦 ¿Que significa? — *`*args`*
> `*args` (un asterisco) recoge *todos los argumentos posicionales sobrantes* y los mete en una **tupla**. El nombre `args` es una convencion; lo que de verdad manda es el `*`.
> **Para que sirve:** escribir funciones que aceptan "uno o muchos" valores sin obligarte a empaquetarlos en una lista a mano.
> **Donde se usa en un repo real:** viene de perlas para utilidades de logging en PolyPaw, cuando quieres imprimir cualquier cantidad de mensajes en una sola llamada.

```python
def registrar(*args):
    # args es una tupla con todo lo que entro
    for mensaje in args:
        print("LOG:", mensaje)

registrar("inicio")
registrar("vidas=3", "gemas=120", "racha=5")   # 3 valores, ningun problema
```

> ### 🟦 ¿Que significa? — *`**kwargs`*
> `**kwargs` (dos asteriscos) recoge *todos los argumentos por nombre sobrantes* y los mete en un **diccionario**, donde la clave es el nombre y el valor es lo que pasaron.
> **Para que sirve:** aceptar opciones con nombre que no conoces de antemano, o reenviarlas a otra funcion.
> **Donde se usa en un repo real:** patrones de configuracion donde PolyPaw pasa "extras" opcionales sin tener que listarlos uno por uno.

```python
def crear_perfil(nombre, **kwargs):
    print("Perfil de", nombre)
    for clave, valor in kwargs.items():
        print(f"  {clave} = {valor}")

crear_perfil("Bit", edad=3, pais="CO", nivel="A1")
# Perfil de Bit
#   edad = 3
#   pais = CO
#   nivel = A1
```

> ### 💡 Tip
> El orden en la definicion siempre es el mismo: parametros normales, luego `*args`, luego `**kwargs`. Asi: `def f(a, b, *args, **kwargs)`. Memorizalo con una frase: "primero lo fijo, despues el monton posicional, al final el monton con nombre".

> ### 🔎 En tu codigo
> En JavaScript usabas `function f(...args)` (rest) para lo mismo que `*args`, y para `**kwargs` solias pasar un objeto de opciones (`function f(opts)`). Python separa los dos casos con `*` y `**`, y eso suele dejar las firmas mas explicitas.

---

## 5. El `return`: lo que la funcion te devuelve

Una funcion puede *imprimir* cosas, claro, pero lo realmente util es que *devuelva* un valor para que tu sigas usandolo.

> ### 🟦 ¿Que significa? — *`return`*
> `return` es la palabra que hace que una funcion *entregue* un valor a quien la llamo y termine ahi mismo. Lo que escribas despues de `return` en esa rama ya no se ejecuta.
> **Para que sirve:** que el resultado de una funcion alimente otra parte del programa: una condicion, otra funcion, la pantalla.
> **Donde se usa en un repo real:** `puede_iniciar_leccion()` en PolyPaw hace `return int(u.get("vidas", 0)) > 0`: devuelve `True` o `False`, y la app decide si deja entrar al usuario.

```python
def puede_iniciar_leccion():
    u = _usuario_mutable()
    return int(u.get("vidas", 0)) > 0

# El resultado se usa directamente en un if:
if puede_iniciar_leccion():
    print("¡Adelante!")
else:
    print("Sin vidas. Espera o compra un refill.")
```

Una funcion puede tener **varios `return`** en distintos caminos. `gastar_gemas` es un buen ejemplo: devuelve `False` si no alcanza y `True` si pago.

> ### 🟦 ¿Que significa? — *Devolver una tupla (varios valores a la vez)*
> Una funcion puede devolver **mas de un valor** separandolos con comas tras el `return`; Python los empaqueta en una **tupla** y quien llama puede desempacarlos en varias variables.
> **Para que sirve:** entregar un resultado *y* una explicacion en una sola llamada.
> **Donde se usa en un repo real:** `comprar_escudo()` devuelve `(éxito, razón)`. Asi la pantalla sabe si fallo y *por que* (sin gemas, ya lo tenia, etc.).

```python
def comprar_escudo():
    usuario = _usuario_mutable()
    if usuario.get("escudo_activo", False):
        return False, "owned"          # ya lo tenia
    if int(usuario.get("gemas", 0)) < PRECIO_ESCUDO:
        return False, "no_gemas"       # no alcanza
    usuario["escudo_activo"] = True
    _persistir(usuario)
    return True, "ok"

# Quien llama desempaca los dos valores de golpe:
exito, razon = comprar_escudo()
if not exito and razon == "no_gemas":
    print("Te faltan gemas para el escudo.")
```

> ### ⚠️ Cuidado
> Si una funcion no tiene `return` (o tiene un `return` pelado), devuelve `None`, que viene a significar "nada". Por eso `perder_vida()` *si* hace `return v` (te da las vidas que quedan), pero `guardar_nivel(nivel)` no devuelve nada: solo guarda. Ojo con escribir `x = guardar_nivel("B1")`: `x` se quedaria en `None`.

---

## 6. Ambito (scope): variables locales vs. globales

Aqui aparece un concepto que confunde a mucha gente al principio, pero que es la base de unas funciones limpias.

> ### 🟦 ¿Que significa? — *Ambito (scope)*
> El **ambito** (en ingles *scope*) es la zona del programa donde una variable existe y se puede usar. Una variable creada *dentro* de una funcion solo vive ahi; fuera no existe.
> **Para que sirve:** evitar que las variables de una funcion choquen con las de otra. Cada funcion tiene su propio "cuarto privado".
> **Donde se usa en un repo real:** en cada funcion de `database_manager.py`, la variable `u` (el usuario) es local: nace al cargar al usuario y muere al terminar la funcion, sin contaminar nada del resto.

> ### 🟦 ¿Que significa? — *Variable local*
> Una **variable local** es la que se crea dentro de una funcion. Solo existe mientras esa funcion corre y solo se ve ahi adentro.
> **Para que sirve:** guardar resultados temporales sin afectar al resto del programa.
> **Donde se usa en un repo real:** `gemas = int(u.get("gemas", 0))` dentro de `gastar_gemas`: esa `gemas` es local y desaparece en cuanto sales.

> ### 🟦 ¿Que significa? — *Variable global*
> Una **variable global** es la que se define *fuera* de toda funcion, en el nivel principal del archivo. Cualquier funcion del archivo puede *leerla*.
> **Para que sirve:** guardar constantes compartidas que no cambian: precios, limites, rutas.
> **Donde se usa en un repo real:** en `database_manager.py`, `PRECIO_REFILL_VIDAS = 50`, `VIDAS_MAX_DEFAULT = 5` y `PRECIO_ESCUDO = 200` son globales que muchas funciones leen.

```python
PRECIO_ESCUDO = 200          # global: vive en todo el archivo

def comprar_escudo():
    usuario = _usuario_mutable()        # usuario: variable local
    if int(usuario.get("gemas", 0)) < PRECIO_ESCUDO:   # lee la global
        return False, "no_gemas"
    ...
```

Fijate en el contraste: dentro de la funcion *leemos* `PRECIO_ESCUDO` sin problema, pero `usuario` es local y afuera no existe. Si intentaras `print(usuario)` despues de la funcion, Python te soltaria `NameError: name 'usuario' is not defined`.

> ### 🟦 ¿Que significa? — *La palabra `global`*
> `global nombre` dentro de una funcion le dice a Python: "no crees una variable local; quiero *modificar* la global con ese nombre". Sin esto, asignar a una variable dentro de una funcion siempre crea una local nueva.
> **Para que sirve:** cambiar una global desde dentro de una funcion. Se usa poco, y a proposito.
> **Donde se usa en un repo real:** PolyPaw *evita* `global`: en lugar de cambiar variables sueltas, guarda todo el estado en el JSON con `_persistir(u)`. Esa decision hace el codigo mas seguro.

> ### ⚠️ Cuidado
> Abusar de `global` lleva a bugs durisimos de cazar: cualquier funcion puede cambiar la variable y nunca sabes quien fue. Por eso las constantes globales de PolyPaw (`PRECIO_ESCUDO`) solo se *leen*, nunca se reasignan dentro de funciones. Si necesitas que una funcion "recuerde" algo entre llamadas, mejor devuelvelo con `return` o guardalo en disco, tal como hace PolyPaw.

> ### 🔎 En tu codigo
> En JavaScript ya viviste algo parecido con `let`/`const` y el scope de bloque. La gran diferencia: en Python, asignar dentro de una funcion crea de forma automatica una variable *local*, aunque exista una global con el mismo nombre, salvo que declares `global`.

---

## 7. Funciones lambda: funciones de una sola linea

A veces necesitas una funcion tan pequeña que ponerle nombre con `def` parece demasiado. Para esos casos esta `lambda`.

> ### 🟦 ¿Que significa? — *Funcion lambda*
> Una **funcion lambda** es una funcion anonima (sin nombre) que cabe en una sola linea. Se escribe `lambda parametros: expresion`, y lo que devuelve es el resultado de esa expresion.
> **Para que sirve:** entregar una mini-funcion "al vuelo" a otra funcion que la necesita, sobre todo para ordenar o filtrar.
> **Donde se usa en un repo real:** para ordenar la lista de logros de PolyPaw por su color o su nombre, podrias pasarle una `lambda` a `sorted(...)` sin definir una funcion aparte.

```python
# Una lambda guardada en una variable (didactico):
doble = lambda n: n * 2
print(doble(21))      # 42

# Lo MISMO con def:
def doble(n):
    return n * 2
```

Donde de verdad se luce es como argumento de `sorted`, para indicar *por que campo* ordenar:

```python
logros = [
    {"id": "acumulador", "color": "#06B6D4"},
    {"id": "dedicado",   "color": "#10B981"},
    {"id": "constante",  "color": "#F59E0B"},
]

# Ordenar por el campo "id" alfabeticamente:
ordenados = sorted(logros, key=lambda x: x["id"])
print([a["id"] for a in ordenados])   # ['acumulador', 'constante', 'dedicado']
```

Ese `key=lambda x: x["id"]` se lee asi: "para comparar dos logros, fijate en su campo `id`". La lambda recibe un logro (`x`) y devuelve el valor por el que se va a ordenar.

> ### 💡 Tip
> Si tu lambda empieza a llenarse de `if` largos o de varias lineas, ya no es trabajo para una lambda: define una funcion normal con `def`. Las lambdas son para una expresion corta y nada mas.

> ### 🔎 En tu codigo
> En JavaScript usabas las *arrow functions*: `array.sort((a, b) => a.id - b.id)`. La `lambda` de Python es el equivalente directo para casos cortos, y se la pasas a `sorted(..., key=...)`.

---

## 8. Type hints: anotaciones de tipo basicas

Si abriste `database_manager.py`, te habras topado con cosas como `def gastar_gemas(cantidad: int) -> bool:`. Esos `: int` y `-> bool` son *type hints*.

> ### 🟦 ¿Que significa? — *Type hint (anotacion de tipo)*
> Un **type hint** es una nota que escribes en la firma de una funcion para indicar *que tipo* de dato esperas en cada parametro (`cantidad: int`) y que tipo devuelve la funcion (`-> bool`). Son **opcionales** y Python *no* los obliga en tiempo de ejecucion: son una ayuda para ti y para el editor.
> **Para que sirve:** documentar la funcion, ayudar al editor a autocompletar y avisarte de errores antes de correr el programa.
> **Donde se usa en un repo real:** casi todas las funciones de `database_manager.py` los usan, por ejemplo `def perder_vida() -> int:` (devuelve las vidas restantes) y `def save_user(l1_language: str, age: int) -> None:`.

Compara la version con anotaciones y sin ellas:

```python
# Sin type hints:
def gastar_gemas(cantidad):
    ...
    return True

# Con type hints (asi esta en PolyPaw):
def gastar_gemas(cantidad: int) -> bool:
    ...
    return True
```

Lee `cantidad: int` como "cantidad, que deberia ser un entero" y `-> bool` como "esta funcion devuelve un booleano (True/False)". El `-> None` significa "no devuelve nada util", como en `guardar_nivel(nivel: str) -> None`.

> ### 🟦 ¿Que significa? — *`Optional` y el tipo `None`*
> `Optional[str]` (o la forma moderna `str | None`) anuncia que un valor puede ser un texto *o* `None` (ausente). `None` es el valor especial de Python para "nada / vacio".
> **Para que sirve:** dejar claro que un parametro o un resultado a veces no trae dato.
> **Donde se usa en un repo real:** `target_lang: str | None = None` en `save_onboarding_inicial`: el idioma a aprender puede venir o no.

> ### ⚠️ Cuidado
> Los type hints **no validan nada por si solos**. Si declaras `cantidad: int` y alguien llama `gastar_gemas("hola")`, Python *no* protesta al correr; el error saltara mas adentro. Por eso PolyPaw, ademas de anotar, *convierte de verdad* con `int(...)` dentro de la funcion. La anotacion documenta; la conversion protege.

> ### 💡 Tip
> Al principio de `database_manager.py` veras la linea `from typing import Any, Optional`. Eso importa los nombres `Any` (cualquier tipo) y `Optional` para poder usarlos en las anotaciones. Es de lo mas normal y no cambia en nada como corre el programa.

---

## 9. Funciones puras: el secreto de un codigo confiable

Llegamos a una idea que suena teorica pero que, en la practica, te ahorra horas de bugs.

> ### 🟦 ¿Que significa? — *Funcion pura*
> Una **funcion pura** cumple dos reglas: (1) con las mismas entradas devuelve *siempre* la misma salida, y (2) no cambia nada de fuera de ella (no escribe archivos, no toca variables globales, no imprime). Solo recibe, calcula y devuelve.
> **Para que sirve:** son faciles de probar, faciles de entender y nunca te dan sorpresas, porque su resultado depende solo de lo que les pasas.
> **Donde se usa en un repo real:** `calcular_age_tier(age)` en PolyPaw es casi pura: le das una edad y te devuelve `"teen"`, `"adult"` o `"senior"`, sin tocar nada mas.

```python
def calcular_age_tier(age):
    try:
        n = int(age)
    except (TypeError, ValueError):
        return "adult"
    if 13 <= n <= 17:
        return "teen"
    if n >= 50:
        return "senior"
    return "adult"
```

Llamala mil veces con `15` y siempre te devuelve `"teen"`. No guarda nada, no imprime, no depende del disco. Eso es una funcion pura, y resulta facilisima de probar:

```python
print(calcular_age_tier(15))   # teen
print(calcular_age_tier(70))   # senior
print(calcular_age_tier(30))   # adult
```

> ### 🟦 ¿Que significa? — *Efecto secundario*
> Un **efecto secundario** es cualquier cosa que una funcion hace *ademas* de devolver un valor: escribir un archivo, imprimir, cambiar una variable global o un dato compartido. No son malos; pero conviene tener claro cuales funciones los tienen.
> **Para que sirve:** distinguir las funciones que solo calculan (puras) de las que cambian el mundo (con efectos), para razonar mejor sobre el programa.
> **Donde se usa en un repo real:** `guardar_nivel(nivel)` *tiene* efecto secundario: escribe en el disco con `_persistir(u)`. `calcular_age_tier(age)` *no* tiene ninguno.

Compara dos funciones reales de PolyPaw:

```python
# PURA: solo calcula. La llamas y nada cambia afuera.
def calcular_age_tier(age): ...

# CON EFECTO SECUNDARIO: cambia las vidas y escribe en disco.
def perder_vida():
    u = _usuario_mutable()
    v = max(0, int(u.get("vidas", 0)) - 1)
    u["vidas"] = v
    _persistir(u)          # <- efecto secundario: toca el archivo
    return v
```

> ### 💡 Tip
> Hay una receta que PolyPaw aplica sin anunciarlo: *separa el calculo del guardado*. Las funciones puras como `calcular_age_tier` o `canonizar_nivel_cefr_almacenado` deciden el "que"; funciones como `perder_vida` o `guardar_nivel` se ocupan del "guardar". Mantener esa frontera te deja probar la logica sin tocar el disco.

---

## 10. Un recorrido por `database_manager.py`

Ya tienes el vocabulario en la mochila. Demos una vuelta por funciones reales del archivo y vayamos poniendo nombre a lo que aparece.

```python
def comprar_refill_vidas() -> bool:
    u = _usuario_mutable()                 # variable LOCAL
    gemas = int(u.get("gemas", 0))         # variable LOCAL
    if gemas < PRECIO_REFILL_VIDAS:        # lee una GLOBAL (50)
        return False                       # primer RETURN: no alcanzo
    mx = int(u.get("vidas_max") or VIDAS_MAX_DEFAULT)   # lee otra GLOBAL
    u["gemas"] = gemas - PRECIO_REFILL_VIDAS
    u["vidas"] = mx
    u["total_compras"] = int(u.get("total_compras", 0)) + 1
    _persistir(u)                          # EFECTO SECUNDARIO: guarda en disco
    return True                            # segundo RETURN: compra exitosa
```

En esas pocas lineas se asoman casi todos los conceptos del capitulo: variables locales (`u`, `gemas`, `mx`), lectura de globales (`PRECIO_REFILL_VIDAS`, `VIDAS_MAX_DEFAULT`), varios `return` y un efecto secundario bien visible (`_persistir`).

Otra, esta con type hints y devolucion de tupla:

```python
def comprar_una_vida() -> tuple[bool, str]:
    u = _usuario_mutable()
    vidas = int(u.get("vidas", 0))
    mx = int(u.get("vidas_max") or VIDAS_MAX_DEFAULT)
    gemas = int(u.get("gemas", 0))
    if vidas >= mx:
        return False, "full"        # ya estaba lleno
    if gemas < PRECIO_REFILL_VIDAS:
        return False, "no_gemas"    # no alcanza
    u["gemas"] = gemas - PRECIO_REFILL_VIDAS
    u["vidas"] = vidas + 1
    _persistir(u)
    return True, "ok"
```

El `-> tuple[bool, str]` te lo cuenta de un vistazo: "devuelvo dos cosas, un booleano y un texto". Quien llama hace `exito, razon = comprar_una_vida()` y ya sabe que paso *y* por que. Ahi esta la elegancia de las funciones bien diseñadas de PolyPaw: la firma cuenta la historia antes de que leas el cuerpo.

> ### 🔎 En tu codigo
> Fijate en un patron: muchas funciones de PolyPaw arrancan con `u = _usuario_mutable()` y terminan con `_persistir(u)`. Es la receta de siempre: "carga el estado, modificalo en una variable local, guardalo". Reconocer ese sandwich te deja leer cualquier funcion del archivo en segundos.

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Distingo *definir* una funcion (`def`) de *llamarla* (`nombre()`).
- [ ] Se la diferencia entre *parametro* (hueco en la definicion) y *argumento* (valor en la llamada).
- [ ] Puedo pasar argumentos por posicion y por nombre (`age=25`), y se que los posicionales van primero.
- [ ] Se poner valores por defecto y entiendo por que `None` es mas seguro que `[]` como defecto.
- [ ] Entiendo `*args` (tupla de posicionales) y `**kwargs` (diccionario de nombrados).
- [ ] Uso `return` para entregar un valor, incluyendo varios a la vez como tupla.
- [ ] Distingo una variable local de una global y se por que PolyPaw evita `global`.
- [ ] Puedo escribir una `lambda` corta y pasarla a `sorted(..., key=...)`.
- [ ] Leo type hints como `cantidad: int`, `-> bool`, `-> None` y `str | None`.
- [ ] Reconozco una funcion pura y un efecto secundario en codigo real.

---

## 🧪 Ejercicios

1. **(En papel)** Para la funcion `def establecer_perfil(tipo, *, edad_estimada=None):`, di cual de estas llamadas es valida y cual no, y por que: (a) `establecer_perfil("teen", 15)`, (b) `establecer_perfil("teen", edad_estimada=15)`, (c) `establecer_perfil(tipo="teen")`.

2. **(En papel)** Mira `comprar_una_vida()`. Si un usuario tiene 5 vidas (el maximo) y 200 gemas, ¿que tupla devuelve la funcion y por que? ¿Y si tiene 2 vidas pero 10 gemas?

3. 💻 Escribe una funcion pura `nivel_a_emoji(nivel)` que reciba un nivel CEFR (`"A1"`, `"B2"`, etc.) y devuelva un emoji segun la letra: `"🌱"` para los `A`, `"🌿"` para los `B`, `"🌳"` para los `C`. Anotala con type hints (`nivel: str -> str`). Pruebala con tres niveles distintos. Verifica que no imprime ni guarda nada (que es realmente pura).

4. 💻 Escribe una funcion `resumen_usuario(nombre, **datos)` que imprima el nombre y luego, en lineas separadas, cada dato extra que reciba por nombre (`gemas=120`, `racha=5`, ...). Pruebala pasando tres datos distintos. Pista: recorre `datos.items()`.

5. 💻 Crea una lista de diccionarios de logros como la de la seccion 7 (cada uno con `"id"` y un campo `"xp"` numerico). Usa `sorted` con una `lambda` para ordenarlos de mayor a menor `xp` (pista: `reverse=True`). Imprime solo los `id` ordenados.

6. 💻 **Reto.** Escribe `def saludo(nombre, *, idioma="es"):` que devuelva (con `return`, no `print`) `"¡Hola, X!"` si el idioma es `"es"` y `"Hello, X!"` si es `"en"`. Luego escribe un mini-programa que llame a la funcion para Bit en ambos idiomas y *imprima afuera* lo que devuelve. Explica en un comentario por que esta funcion es pura aunque el programa que la usa si imprima.

---

Con esto las funciones dejaron de ser cajas negras para ti. Sabes como entran los datos (posicion, nombre, defaults, `*args`, `**kwargs`), como salen (`return`, tuplas), donde viven las variables (scope) y por que las funciones puras son tus mejores amigas. Bit guarda los lentes de mecanico, satisfecho: ya entiendes el motor de PolyPaw por dentro. En el proximo capitulo subimos un escalon mas.
