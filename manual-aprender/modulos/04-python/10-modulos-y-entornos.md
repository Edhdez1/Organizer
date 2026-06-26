# Capitulo 10 — Módulos, paquetes y entornos virtuales

<p align="center">
  <img src="../../recursos/imagenes/04-python/cap10.png" alt="Ilustración del capítulo (pixel art con Bit)" width="640">
</p>


> Hola de nuevo, soy **Bit**, tu ajolote favorito. 🐾 Hasta ahora has metido todo tu código en un solo archivo, como quien guarda toda la ropa en una única maleta gigante. En este capítulo vas a aprender a repartirlo en varios archivos (los módulos), a usar herramientas que otra gente ya escribió por ti (la biblioteca estándar y los paquetes de `pip`) y a montar una "burbuja" para tu proyecto: un entorno virtual donde las cosas no se mezclan. Es justo lo que hace **PolyPaw**, la app de aprendizaje de idiomas escrita enteramente en Python, así que la tendremos de ejemplo de principio a fin. ¡Empecemos!

## 1. ¿Por qué partir el código en varios archivos?

Imagina que **PolyPaw** tuviera TODO metido en un solo archivo de 5000 líneas: la pantalla, las misiones, el acceso a los datos, los puntos del usuario... Encontrar cualquier cosa ahí dentro sería una tortura. 😱

La salida es repartir el código en **archivos `.py`** según lo que hace cada uno. Cada archivo `.py` es un **módulo**.

> ### 🟦 ¿Que significa? — *Módulo*
> Un **módulo** es, sencillamente, un archivo de Python (`.py`) con código dentro (funciones, variables, clases) que puede usarse desde otro archivo. Te sirve para **organizar** y **reutilizar** código sin andar copiando y pegando.
> **Dónde se usa en un repo real:** en **PolyPaw**, el archivo `database_manager.py` es un módulo que se ocupa de leer y guardar los datos; `main.py` es otro módulo que arranca la app. `main.py` *usa* a `database_manager.py`.

En **JavaScript** (que viste en el módulo 03) hacías algo parecido con `import` y `export` entre archivos. La idea de fondo en Python es la misma, solo que la palabra clave y las reglas cambian un poco. Y eso es exactamente lo que vamos a ver ahora.

> ### 💡 Tip
> Una regla muy útil cuando empiezas: **un archivo, una responsabilidad**. Si notas que un archivo empieza a hacer demasiadas cosas distintas, casi seguro toca partirlo en dos módulos.

## 2. `import`: traer un módulo completo

Para usar el código de otro módulo, lo **importas**. La palabra clave es `import`.

> ### 🟦 ¿Que significa? — *`import`*
> `import` es la instrucción que **trae** un módulo a tu archivo para que puedas usar su código. Te sirve para no reinventar la rueda: aprovechas funciones que ya existen.
> **Dónde se usa en un repo real:** en el `main.py` de **PolyPaw** se importa el framework con `import flet` para poder dibujar la interfaz.

> ### 🟦 ¿Que significa? — *Framework*
> Un **framework** es un paquete grande que te da una estructura y un montón de herramientas ya hechas para construir cierto tipo de programa (interfaces de usuario, por ejemplo), de modo que tú solo escribes la parte que es propia de tu app y no todo desde cero. Te sirve para avanzar más rápido apoyándote en una base sólida que otros mantienen.
> **Dónde se usa en un repo real:** **Flet** es el framework sobre el que está construido **PolyPaw**. Él se ocupa de dibujar botones, textos y pantallas, y tú solo le dices qué mostrar.

Veamos un ejemplo con un módulo que ya viene de fábrica en Python, `random` (sirve para generar cosas al azar):

```python
import random

# Elegir una palabra al azar de una lista de vocabulario
vocabulario = ["perro", "gato", "casa", "agua"]
palabra = random.choice(vocabulario)
print("Practica esta palabra:", palabra)
```

Fíjate en el patrón: primero `import random`, y luego usas sus funciones escribiendo el **nombre del módulo, un punto, y la función**: `random.choice(...)`. Ese punto viene a decir "dame `choice`, que vive *dentro* de `random`".

> ### 🔎 En tu codigo
> En **PolyPaw**, una misión podría elegir al azar qué pregunta mostrar primero. Con `random.shuffle(preguntas)` las preguntas se "barajan" como si fueran cartas, para que cada repaso se sienta distinto.

## 3. `from ... import`: traer solo una parte

A veces no quieres el módulo entero, solo una función concreta. Para eso existe `from ... import`.

> ### 🟦 ¿Que significa? — *`from ... import`*
> `from MODULO import NOMBRE` trae **solo una pieza** (una función, una clase o una variable) de un módulo, en lugar de todo el módulo. Te sirve para escribir menos y dejar más a la vista qué estás usando.
> **Dónde se usa en un repo real:** en **PolyPaw**, `main.py` usa cosas como `from database_manager import DatabaseManager` para traer únicamente esa clase del módulo de datos.

Compara las dos formas con el módulo `random`:

```python
# Forma 1: importar todo el módulo
import random
palabra = random.choice(vocabulario)

# Forma 2: importar solo lo que necesito
from random import choice
palabra = choice(vocabulario)   # ¡ya no escribo "random." delante!
```

Las dos hacen lo mismo. La diferencia está en que con `from random import choice` puedes escribir `choice(...)` directo, sin arrastrar el prefijo `random.`.

> ### 💡 Tip
> Si solo vas a usar una o dos funciones de un módulo, `from ... import` queda más limpio. Si vas a usar muchas, el `import modulo` completo te evita líos sobre de dónde salió cada función.

> ### ⚠️ Cuidado
> Evita escribir `from random import *` (el asterisco trae **todo** de golpe). Parece cómodo, pero luego es imposible saber de qué módulo vino cada nombre, y si dos módulos tienen funciones que se llaman igual, una "pisa" a la otra. Mejor importa solo lo que necesitas, por su nombre.

> ### 🟦 ¿Que significa? — *Importar con alias (`as`)*
> Puedes renombrar lo que importas con la palabra `as`, por ejemplo `import datetime as dt`. Te sirve para acortar nombres largos o esquivar choques de nombres.
> **Dónde se usa en un repo real:** es algo muy habitual en proyectos Python; en **PolyPaw** podrías ver algo como `import flet as ft` para escribir `ft.Text(...)` en vez de `flet.Text(...)`.

```python
import flet as ft   # ahora "ft" es un apodo de "flet"

# En PolyPaw, crear un texto en pantalla queda más corto:
titulo = ft.Text("¡Bienvenido a PolyPaw!")
```

## 4. La biblioteca estándar: pilas incluidas 🔋

Python trae un montón de módulos **ya instalados**, listos para usar sin más. A ese conjunto se le llama la **biblioteca estándar**.

> ### 🟦 ¿Que significa? — *Biblioteca estándar*
> La **biblioteca estándar** es el grupo de módulos que vienen incluidos con Python desde el momento en que lo instalas, sin descargar nada extra. Te sirve para tareas de todos los días: fechas, archivos, azar, leer datos en formato JSON, etc.
> **Dónde se usa en un repo real:** **PolyPaw** guarda sus misiones en archivos como `missions/*.json`, y para leerlos echa mano del módulo `json` de la biblioteca estándar.

Vamos a conocer cuatro módulos muy útiles que te vas a encontrar todo el rato.

### 4.1 `json` — leer y escribir datos estructurados

> ### 🟦 ¿Que significa? — *JSON*
> **JSON** (JavaScript Object Notation) es un formato de texto para guardar datos ordenados en pares "clave: valor" y listas. Te sirve para que un programa guarde datos y los vuelva a leer sin complicaciones. Lo lee bien tanto una máquina como una persona.
> **Dónde se usa en un repo real:** TODAS las misiones de **PolyPaw** viven en archivos `.json` dentro de la carpeta `missions/`. El programa los lee para saber qué preguntas mostrar.

Si vienes de **JavaScript**, JSON te va a sonar muchísimo: ¡el nombre sale precisamente de los objetos de JavaScript! Y lo bueno es que en Python un objeto JSON se convierte en un diccionario, esos que viste en capítulos anteriores.

```python
import json

# Leer un archivo de misión, como hace PolyPaw
with open("missions/saludos.json", encoding="utf-8") as archivo:
    mision = json.load(archivo)   # convierte el texto JSON en un diccionario de Python

print(mision["titulo"])           # acceder como cualquier diccionario
print("Preguntas:", len(mision["preguntas"]))
```

- `json.load(archivo)` lee un archivo y lo convierte en datos de Python (diccionarios y listas).
- `json.dump(datos, archivo)` hace el camino inverso: guarda datos de Python en un archivo JSON.

> ### 🔎 En tu codigo
> En **PolyPaw**, cuando se crea una misión nueva, su contenido se escribe como un archivo `.json` en `missions/`. Así el contenido (las preguntas) queda **separado del código** (`main.py`): puedes añadir misiones sin tocar para nada la lógica del programa. 👏

### 4.2 `os` — hablar con el sistema operativo

> ### 🟦 ¿Que significa? — *`os`*
> El módulo **`os`** te deja hablar con el sistema operativo: ver carpetas, listar archivos, armar rutas, leer variables de entorno. Te sirve para que tu programa encuentre y maneje archivos sin importar en qué computadora corra.
> **Dónde se usa en un repo real:** **PolyPaw** necesita recorrer la carpeta `missions/` para dar con todos los `.json` disponibles; eso se hace con `os`.

```python
import os

# Listar todos los archivos de misiones en la carpeta "missions"
for nombre in os.listdir("missions"):
    if nombre.endswith(".json"):
        print("Misión encontrada:", nombre)
```

> ### ⚠️ Cuidado
> Para unir las partes de una ruta (carpeta + archivo), usa `os.path.join("missions", "saludos.json")` en lugar de pegar textos con `"missions/" + nombre`. ¿Por qué? Porque Windows usa `\` y Linux/Mac usan `/`. `os.path.join` coloca el separador que toca según el sistema, y así tu código funciona en cualquier lado, incluido el servidor **polypaw-nas** con Ubuntu.

### 4.3 `random` — el azar

Ya lo usamos más arriba, pero démosle su recuadro oficial.

> ### 🟦 ¿Que significa? — *`random`*
> El módulo **`random`** produce resultados al azar: números aleatorios, elegir un elemento de una lista, barajar una colección. Te sirve para meter variedad o sorpresa.
> **Dónde se usa en un repo real:** en **PolyPaw**, para mostrar las preguntas de una misión en orden distinto cada vez y que el repaso no se sienta siempre igual.

```python
import random

print(random.randint(1, 6))        # un número entero entre 1 y 6 (como un dado)
print(random.choice(["A", "B"]))   # elige uno al azar

preguntas = ["p1", "p2", "p3"]
random.shuffle(preguntas)          # baraja la lista "en su sitio"
print(preguntas)
```

### 4.4 `datetime` — fechas y horas

> ### 🟦 ¿Que significa? — *`datetime`*
> El módulo **`datetime`** maneja fechas y horas: saber qué día es hoy, cuánto tiempo ha pasado, dar formato a una fecha. Te sirve para registrar cuándo ocurrió algo.
> **Dónde se usa en un repo real:** en **PolyPaw**, para anotar la fecha en que el usuario terminó una misión y poder calcular su racha de días seguidos.

```python
from datetime import datetime

ahora = datetime.now()                 # fecha y hora de este momento
print(ahora)                           # ej. 2026-06-25 14:30:05.123456

# Darle un formato bonito
print(ahora.strftime("%d/%m/%Y"))      # 25/06/2026
```

> ### 💡 Tip
> La idea de "racha de días seguidos" no es exclusiva de PolyPaw: el proyecto **RachaSimple** (hecho en React + TypeScript + Supabase) gira justamente en torno a eso. Aunque esté en otro lenguaje, el razonamiento de comparar fechas con `datetime` es el mismo.

## 5. Paquetes: cuando agrupas varios módulos

> ### 🟦 ¿Que significa? — *Paquete*
> Un **paquete** es una carpeta que reúne varios módulos relacionados para tenerlos juntos. Te sirve para que un proyecto grande no sea un montón de archivos sueltos, sino carpetas con sentido.
> **Dónde se usa en un repo real:** `flet`, el framework sobre el que está construido **PolyPaw**, es un paquete: por dentro tiene muchísimos módulos (textos, botones, columnas...), pero tú lo usas con un solo `import flet`.

No hace falta que te pongas a crear paquetes complicados todavía. Por ahora te basta con quedarte con esto: **módulo = un archivo**, **paquete = una carpeta de módulos**. Cuando instalas algo con `pip` (lo vemos enseguida), lo que instalas suele ser un paquete.

## 6. `pip`: instalar código que otros escribieron

La biblioteca estándar está muy bien, pero no trae *todo*. Por ejemplo, **Flet** (el framework de interfaces de PolyPaw) **no** viene incluido en Python: hay que instalarlo. Y para eso existe `pip`.

> ### 🟦 ¿Que significa? — *`pip`*
> **`pip`** es el instalador de paquetes de Python. Te sirve para descargar e instalar paquetes que otras personas publicaron (en un repositorio público llamado PyPI) y usarlos en tu proyecto.
> **Dónde se usa en un repo real:** para que **PolyPaw** funcione, lo primero que se hace es instalar su framework con `pip install flet`.

Se usa desde la **terminal** (no dentro de un archivo `.py`):

```python
# Esto se escribe en la TERMINAL, no en un archivo Python.
# Instalar el framework de PolyPaw:
pip install flet

# Instalar una versión concreta:
pip install flet==0.21.0

# Ver qué tienes instalado:
pip list
```

> ### 💡 Tip
> Si vienes del módulo 03 de **JavaScript**, `pip` es el equivalente de `npm` (el que usan **RachaSimple** y **Faro/Organizer** con sus paquetes). `pip install flet` es el pariente cercano de `npm install`: bajas código que alguien ya escribió y lo usas. Mismo concepto, otro ecosistema.

> ### ⚠️ Cuidado
> Cuando instalas un paquete con `pip`, lo estás descargando de internet para que corra en tu máquina. Instala solo paquetes conocidos y bien mantenidos. Y revisa que el nombre esté bien escrito: a veces circulan paquetes falsos con nombres parecidos a los populares. 🕵️

## 7. Entornos virtuales: una burbuja por proyecto

Aquí aparece un problema bien real. Imagina que tienes **PolyPaw**, que necesita `flet` versión 0.21, y otro proyecto que necesita `flet` versión 0.10. Si instalas todo "globalmente" en tu computadora, una versión pisa a la otra y algo termina rompiéndose. 💥

La salida es el **entorno virtual**.

> ### 🟦 ¿Que significa? — *Entorno virtual*
> Un **entorno virtual** es una carpeta aislada con su propia copia de Python y sus propios paquetes, separada del resto del sistema. Te sirve para que cada proyecto tenga **sus** dependencias en **sus** versiones, sin chocar con los demás.
> **Dónde se usa en un repo real:** **PolyPaw** se desarrolla dentro de su propio entorno virtual, donde se instala `flet` sin tocar nada más de la computadora.

> ### 🟦 ¿Que significa? — *Dependencia*
> Una **dependencia** es un paquete externo que tu proyecto **necesita** para funcionar. Te sirve para reaprovechar trabajo ya hecho. Si falta una dependencia, el programa ni arranca.
> **Dónde se usa en un repo real:** `flet` es la dependencia principal de **PolyPaw**: sin ella, no hay interfaz.

> ### 🟦 ¿Que significa? — *`venv`*
> **`venv`** es la herramienta que viene incluida en Python para crear entornos virtuales. Te sirve para generar esa "burbuja" aislada con un solo comando.
> **Dónde se usa en un repo real:** cualquier proyecto Python que se tome en serio (como **PolyPaw**) arranca creando un `venv`.

Así se crea y se usa, paso a paso, desde la terminal:

```python
# 1) Crear el entorno virtual (crea una carpeta llamada "venv")
python -m venv venv

# 2) Activarlo en Linux o Mac:
source venv/bin/activate

#    Activarlo en Windows:
venv\Scripts\activate

# 3) Ya activado, instalar las dependencias DENTRO de la burbuja:
pip install flet

# 4) Cuando termines, salir de la burbuja:
deactivate
```

Con el entorno activado, normalmente verás `(venv)` al principio de la línea de tu terminal. Es la señal de "estás dentro de la burbuja". Todo lo que instales con `pip` ahí dentro **solo** existe en ese proyecto.

> ### ⚠️ Cuidado
> La carpeta `venv` **no se sube** al repositorio de GitHub. Pesa mucho y es específica de tu máquina. En su lugar se sube una **lista** de lo que hay que instalar (lo vemos en la siguiente sección). Por eso los proyectos incluyen un archivo `.gitignore` que deja fuera la carpeta `venv`.

> ### 💡 Tip
> La burbuja del entorno virtual es a tu proyecto lo que el aislamiento de red de **polypaw-nas** (con Tailscale) es a tu servidor casero: cada cosa en su sitio, sin mezclarse con lo de afuera. Aislar = menos sorpresas.

## 8. `requirements.txt`: la lista de la compra 🛒

Si no subimos la carpeta `venv`, ¿cómo sabe otra persona (¡o tú mismo en otra computadora!) qué instalar? Con un archivo de lista llamado `requirements.txt`.

> ### 🟦 ¿Que significa? — *`requirements.txt`*
> **`requirements.txt`** es un archivo de texto que anota todas las dependencias del proyecto y sus versiones, una por línea. Te sirve para que cualquiera pueda recrear el mismo entorno con un solo comando.
> **Dónde se usa en un repo real:** en la raíz de **PolyPaw** vive su `requirements.txt`, donde aparece `flet` con su versión. Quien clone el proyecto solo tiene que instalar esa lista.

Un `requirements.txt` se ve así de simple:

```python
# Contenido de requirements.txt (PolyPaw)
flet==0.21.0
```

Y para manejarlo, dos comandos clave en la terminal:

```python
# Generar el archivo a partir de lo que tienes instalado:
pip freeze > requirements.txt

# Instalar TODO lo de la lista de golpe (al clonar el proyecto):
pip install -r requirements.txt
```

Es como una **lista de la compra**: `pip freeze` la escribe anotando lo que tienes, y `pip install -r` la lee y compra todo lo que falta.

> ### 💡 Tip
> Si vienes de JavaScript, `requirements.txt` cumple el mismo papel que el `package.json` de **Faro/Organizer** o **RachaSimple**: declarar qué necesita el proyecto para funcionar. Y `pip install -r requirements.txt` es el primo de `npm install`.

> ### 🔎 En tu codigo
> El recorrido completo para alguien que clona **PolyPaw** desde cero sería: `python -m venv venv` → `source venv/bin/activate` → `pip install -r requirements.txt` → `python main.py`. Cuatro pasos y la app arranca. Sin entorno virtual ni `requirements.txt`, ese proceso sería un caos de versiones. 🐾

## 9. Cómo encaja todo en PolyPaw

Pongamos las piezas juntas. **PolyPaw** está hecho **enteramente en Python** con el framework **Flet**, y su código está repartido en varios módulos. Esta es una versión simplificada de cómo se organiza:

```python
# main.py  — arranca la app y usa los demás módulos
import flet as ft
from database_manager import DatabaseManager

def main(page: ft.Page):
    db = DatabaseManager()                 # usa el módulo de datos
    misiones = db.cargar_misiones()        # lee los .json de missions/
    page.add(ft.Text(f"Tienes {len(misiones)} misiones disponibles"))

ft.app(target=main)                        # Flet pone todo en marcha
```

```python
# database_manager.py  — se encarga SOLO de los datos
import os
import json

class DatabaseManager:
    def cargar_misiones(self):
        misiones = []
        carpeta = "missions"
        for nombre in os.listdir(carpeta):          # módulo os
            if nombre.endswith(".json"):
                ruta = os.path.join(carpeta, nombre)
                with open(ruta, encoding="utf-8") as f:
                    misiones.append(json.load(f))   # módulo json
        return misiones
```

Mira cuántas ideas de este capítulo aparecen juntas aquí:

- `import flet as ft` → importar un **paquete** instalado con `pip`, con **alias**.
- `from database_manager import DatabaseManager` → importar una clase de **otro módulo** propio.
- `import os` y `import json` → módulos de la **biblioteca estándar**.
- `missions/*.json` → datos separados del código, leídos con `json`.

Cada archivo tiene **una responsabilidad clara**: `main.py` arma la pantalla, `database_manager.py` maneja los datos, y las misiones viven como datos en `missions/*.json`. Esa separación es lo que permite que un proyecto crezca sin convertirse en un nudo imposible.

> ### 🔎 En tu codigo
> Compáralo con **tunal-digital**, que es un sitio en HTML/CSS/JS vanilla: ahí no hay `pip`, ni `venv`, ni `requirements.txt`, porque no es Python. Cada stack trae sus propias herramientas. Lo que aprendiste aquí (`import`, biblioteca estándar, `pip`, `venv`, `requirements.txt`) es el "kit de organización" del mundo Python, y es justo el que sostiene a **PolyPaw**. 🐾

## ✅ Checklist — ¿ya domino esto?

- [ ] Entiendo que un **módulo** es un archivo `.py` y un **paquete** es una carpeta de módulos.
- [ ] Sé la diferencia entre `import modulo` y `from modulo import algo`.
- [ ] Sé renombrar lo que importo con `as` (por ejemplo `import flet as ft`).
- [ ] Conozco para qué sirven `json`, `os`, `random` y `datetime` de la biblioteca estándar.
- [ ] Entiendo que `pip install` descarga paquetes externos (como `flet`).
- [ ] Sé qué es un **entorno virtual** y por qué aísla las dependencias de cada proyecto.
- [ ] Sé crear y activar un `venv` (`python -m venv venv` y `source venv/bin/activate`).
- [ ] Entiendo qué hace `requirements.txt` y los comandos `pip freeze` y `pip install -r`.
- [ ] Entiendo cómo **PolyPaw** separa `main.py`, `database_manager.py` y `missions/*.json`.

## 🧪 Ejercicios

1. **Sin computadora.** Explica con tus palabras la diferencia entre `import random` y `from random import choice`. ¿En cuál tienes que escribir `random.` delante y en cuál no?

2. **Sin computadora.** Tu amiga te pasa un proyecto Python sin la carpeta `venv` pero con un `requirements.txt`. Escribe, en orden, los comandos que usarías para dejarlo funcionando en tu máquina.

3. 💻 Crea dos archivos. En `saludos.py` escribe una función `saludar(nombre)` que devuelva `"Hola, " + nombre`. En `main.py` haz `from saludos import saludar` y muestra por pantalla `saludar("Bit")`. Ejecuta `python main.py` y comprueba que imprime `Hola, Bit`.

4. 💻 Usando el módulo `json`, crea un archivo `mision.json` (a mano o desde Python) con una clave `"titulo"` y una lista `"preguntas"`. Luego, en un script de Python, ábrelo con `json.load` y muestra el título y cuántas preguntas tiene. (Es justo lo que hace PolyPaw con `missions/*.json`.)

5. 💻 Crea un entorno virtual con `python -m venv venv`, actívalo, instala `flet` con `pip install flet` y luego ejecuta `pip freeze > requirements.txt`. Abre el `requirements.txt` y observa qué quedó escrito dentro.

6. 💻 Usando `os` y `random`: lista los archivos de una carpeta con `os.listdir`, filtra solo los que terminan en `.json`, y elige uno al azar con `random.choice`. Imprime cuál salió elegido. ¡Acabas de simular cómo PolyPaw podría escoger una misión sorpresa! 🐾
