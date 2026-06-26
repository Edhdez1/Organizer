# Capitulo 10 — Módulos, paquetes y entornos virtuales

<p align="center">
  <img src="../../recursos/imagenes/04-python/cap10.png" alt="Ilustración del capítulo (pixel art con Bit)" width="640">
</p>


> Hola de nuevo, soy **Bit**, tu ajolote favorito. 🐾 Hasta ahora escribiste todo tu código en un solo archivo, como quien guarda toda la ropa en una sola maleta enorme. En este capítulo aprenderás a repartir tu código en varios archivos (módulos), a usar herramientas que otras personas ya escribieron (la biblioteca estándar y los paquetes de `pip`), y a crear una "burbuja" para tu proyecto (un entorno virtual) para que no se mezclen las cosas. Es exactamente lo que hace **PolyPaw**, la app de aprendizaje de idiomas hecha enteramente en Python, así que la usaremos de ejemplo todo el rato. ¡Vamos!

## 1. ¿Por qué partir el código en varios archivos?

Imagina que **PolyPaw** tuviera TODO en un único archivo de 5000 líneas: la pantalla, las misiones, el acceso a los datos, los puntos del usuario... Buscar algo ahí sería una pesadilla. 😱

La solución es separar el código en **archivos `.py`** según lo que hace cada uno. Cada archivo `.py` es un **módulo**.

> ### 🟦 ¿Que significa? — *Módulo*
> Un **módulo** es simplemente un archivo de Python (`.py`) que contiene código (funciones, variables, clases) y que puede ser usado desde otro archivo. Sirve para **organizar** y **reutilizar** código sin copiarlo y pegarlo.
> **Dónde se usa en un repo real:** en **PolyPaw**, el archivo `database_manager.py` es un módulo que se encarga de leer y guardar los datos; `main.py` es otro módulo que arranca la app. `main.py` *usa* a `database_manager.py`.

En **JavaScript** (que viste en el módulo 03) hacías algo parecido con `import` y `export` entre archivos. En Python la idea es la misma, pero la palabra clave y las reglas cambian un poco. Eso es justo lo que veremos ahora.

> ### 💡 Tip
> Una buena regla para principiantes: **un archivo, una responsabilidad**. Si un archivo empieza a hacer demasiadas cosas distintas, probablemente toca partirlo en dos módulos.

## 2. `import`: traer un módulo completo

Para usar el código de otro módulo, lo **importas**. La palabra clave es `import`.

> ### 🟦 ¿Que significa? — *`import`*
> `import` es la instrucción que **trae** un módulo a tu archivo actual para poder usar su código. Sirve para no reinventar la rueda: aprovechas funciones que ya existen.
> **Dónde se usa en un repo real:** en `main.py` de **PolyPaw** se importa el framework con `import flet` para poder dibujar la interfaz.

> ### 🟦 ¿Que significa? — *Framework*
> Un **framework** es un paquete grande que te da una estructura y herramientas ya hechas para construir cierto tipo de programa (por ejemplo, interfaces de usuario), de modo que tú solo escribes la parte propia de tu app y no todo desde cero. Sirve para avanzar más rápido apoyándote en una base sólida que otros mantienen.
> **Dónde se usa en un repo real:** **Flet** es el framework con el que está construido **PolyPaw**: él se encarga de dibujar botones, textos y pantallas, y tú solo le dices qué mostrar.

Veamos un ejemplo con un módulo que ya viene incluido en Python, `random` (sirve para generar cosas al azar):

```python
import random

# Elegir una palabra al azar de una lista de vocabulario
vocabulario = ["perro", "gato", "casa", "agua"]
palabra = random.choice(vocabulario)
print("Practica esta palabra:", palabra)
```

Fíjate en el patrón: primero `import random`, y luego usas sus funciones poniendo el **nombre del módulo, un punto, y la función**: `random.choice(...)`. Ese punto significa "dame `choice`, que está *dentro* de `random`".

> ### 🔎 En tu codigo
> En **PolyPaw**, una misión podría elegir al azar qué pregunta mostrar primero. Con `random.shuffle(preguntas)` se "barajan" las preguntas como si fueran cartas, para que cada repaso se sienta distinto.

## 3. `from ... import`: traer solo una parte

A veces no quieres todo el módulo, solo una función concreta. Para eso existe `from ... import`.

> ### 🟦 ¿Que significa? — *`from ... import`*
> `from MODULO import NOMBRE` trae **solo una pieza** (una función, una clase o una variable) de un módulo, en vez de todo el módulo. Sirve para escribir menos y dejar más claro qué estás usando.
> **Dónde se usa en un repo real:** en **PolyPaw**, `main.py` usa cosas como `from database_manager import DatabaseManager` para traer solo esa clase del módulo de datos.

Compara las dos formas con el módulo `random`:

```python
# Forma 1: importar todo el módulo
import random
palabra = random.choice(vocabulario)

# Forma 2: importar solo lo que necesito
from random import choice
palabra = choice(vocabulario)   # ¡ya no escribo "random." delante!
```

Las dos hacen lo mismo. La diferencia es que con `from random import choice` ya puedes escribir `choice(...)` directo, sin el prefijo `random.`.

> ### 💡 Tip
> Si solo usas una o dos funciones de un módulo, `from ... import` queda más limpio. Si usas muchas, `import modulo` completo evita confusiones sobre de dónde salió cada función.

> ### ⚠️ Cuidado
> Evita escribir `from random import *` (el asterisco trae **todo** de golpe). Parece cómodo, pero después es imposible saber de qué módulo vino cada nombre, y dos módulos pueden tener funciones que se llamen igual y se "pisen". Importa solo lo que necesitas, por su nombre.

> ### 🟦 ¿Que significa? — *Importar con alias (`as`)*
> Puedes renombrar lo que importas con la palabra `as`, por ejemplo `import datetime as dt`. Sirve para acortar nombres largos o evitar choques de nombres.
> **Dónde se usa en un repo real:** es muy común en proyectos Python; en **PolyPaw** podrías ver algo como `import flet as ft` para escribir `ft.Text(...)` en vez de `flet.Text(...)`.

```python
import flet as ft   # ahora "ft" es un apodo de "flet"

# En PolyPaw, crear un texto en pantalla queda más corto:
titulo = ft.Text("¡Bienvenido a PolyPaw!")
```

## 4. La biblioteca estándar: pilas incluidas 🔋

Python viene con un montón de módulos **ya instalados**, listos para usar. A ese conjunto se le llama la **biblioteca estándar**.

> ### 🟦 ¿Que significa? — *Biblioteca estándar*
> La **biblioteca estándar** es el grupo de módulos que vienen incluidos con Python desde que lo instalas, sin tener que descargar nada extra. Sirve para tareas comunes: fechas, archivos, azar, leer datos en formato JSON, etc.
> **Dónde se usa en un repo real:** **PolyPaw** guarda sus misiones en archivos como `missions/*.json`, y para leerlos usa el módulo `json` de la biblioteca estándar.

Vamos a conocer cuatro módulos muy útiles que verás todo el tiempo.

### 4.1 `json` — leer y escribir datos estructurados

> ### 🟦 ¿Que significa? — *JSON*
> **JSON** (JavaScript Object Notation) es un formato de texto para guardar datos organizados en pares "clave: valor" y listas. Sirve para que un programa guarde datos y los vuelva a leer fácilmente. Es legible tanto para máquinas como para humanos.
> **Dónde se usa en un repo real:** TODAS las misiones de **PolyPaw** viven en archivos `.json` dentro de la carpeta `missions/`. El programa los lee para saber qué preguntas mostrar.

Si vienes de **JavaScript**, JSON te sonará muchísimo: ¡el nombre viene precisamente de los objetos de JavaScript! La buena noticia es que en Python un objeto JSON se convierte en un diccionario (que viste en capítulos anteriores).

```python
import json

# Leer un archivo de misión, como hace PolyPaw
with open("missions/saludos.json", encoding="utf-8") as archivo:
    mision = json.load(archivo)   # convierte el texto JSON en un diccionario de Python

print(mision["titulo"])           # acceder como cualquier diccionario
print("Preguntas:", len(mision["preguntas"]))
```

- `json.load(archivo)` lee un archivo y lo convierte en datos de Python (diccionarios y listas).
- `json.dump(datos, archivo)` hace lo contrario: guarda datos de Python en un archivo JSON.

> ### 🔎 En tu codigo
> En **PolyPaw**, cuando se crea una misión nueva, el contenido se escribe como un archivo `.json` en `missions/`. Así el contenido (las preguntas) queda **separado del código** (`main.py`): puedes añadir misiones sin tocar la lógica del programa. 👏

### 4.2 `os` — hablar con el sistema operativo

> ### 🟦 ¿Que significa? — *`os`*
> El módulo **`os`** te deja interactuar con el sistema operativo: ver carpetas, listar archivos, construir rutas, leer variables de entorno. Sirve para que tu programa encuentre y maneje archivos sin importar en qué computadora corra.
> **Dónde se usa en un repo real:** **PolyPaw** necesita recorrer la carpeta `missions/` para encontrar todos los `.json` disponibles; eso se hace con `os`.

```python
import os

# Listar todos los archivos de misiones en la carpeta "missions"
for nombre in os.listdir("missions"):
    if nombre.endswith(".json"):
        print("Misión encontrada:", nombre)
```

> ### ⚠️ Cuidado
> Para unir partes de una ruta (carpeta + archivo), usa `os.path.join("missions", "saludos.json")` en vez de pegar textos con `"missions/" + nombre`. ¿Por qué? Porque Windows usa `\` y Linux/Mac usan `/`. `os.path.join` pone el separador correcto según el sistema, y así tu código funciona en cualquier lado (incluido el servidor **polypaw-nas** con Ubuntu).

### 4.3 `random` — el azar

Ya lo usamos arriba, pero démosle su recuadro oficial.

> ### 🟦 ¿Que significa? — *`random`*
> El módulo **`random`** genera resultados al azar: números aleatorios, elegir un elemento de una lista, barajar elementos. Sirve para añadir variedad o sorpresa.
> **Dónde se usa en un repo real:** en **PolyPaw**, para mostrar las preguntas de una misión en orden distinto cada vez y que el repaso no sea siempre igual.

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
> El módulo **`datetime`** maneja fechas y horas: saber qué día es hoy, cuánto tiempo pasó, dar formato a una fecha. Sirve para registrar cuándo ocurrió algo.
> **Dónde se usa en un repo real:** en **PolyPaw**, para registrar la fecha en que el usuario completó una misión y poder calcular su racha de días seguidos.

```python
from datetime import datetime

ahora = datetime.now()                 # fecha y hora de este momento
print(ahora)                           # ej. 2026-06-25 14:30:05.123456

# Darle un formato bonito
print(ahora.strftime("%d/%m/%Y"))      # 25/06/2026
```

> ### 💡 Tip
> La idea de "racha de días seguidos" no es exclusiva de PolyPaw: el proyecto **RachaSimple** (hecho en React + TypeScript + Supabase) gira justo alrededor de eso. Aunque esté en otro lenguaje, el concepto de comparar fechas con `datetime` es el mismo razonamiento.

## 5. Paquetes: cuando agrupas varios módulos

> ### 🟦 ¿Que significa? — *Paquete*
> Un **paquete** es una carpeta que agrupa varios módulos relacionados, para organizarlos juntos. Sirve para que proyectos grandes no sean un montón de archivos sueltos, sino carpetas con sentido.
> **Dónde se usa en un repo real:** `flet`, el framework con el que está construido **PolyPaw**, es un paquete: por dentro tiene muchísimos módulos (textos, botones, columnas...), pero tú lo usas con un solo `import flet`.

No te preocupes por crear paquetes complejos todavía. Por ahora basta con que sepas: **módulo = un archivo**, **paquete = una carpeta de módulos**. Cuando instalas algo con `pip` (lo vemos ahora), normalmente instalas un paquete.

## 6. `pip`: instalar código que otros escribieron

La biblioteca estándar es genial, pero no trae *todo*. Por ejemplo, **Flet** (el framework de interfaces de PolyPaw) **no** viene incluido en Python. Hay que instalarlo. Para eso existe `pip`.

> ### 🟦 ¿Que significa? — *`pip`*
> **`pip`** es el instalador de paquetes de Python. Sirve para descargar e instalar paquetes que otras personas publicaron (en un repositorio público llamado PyPI) para que los uses en tu proyecto.
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
> Si vienes del módulo 03 de **JavaScript**, `pip` es el equivalente de `npm` (el que usan **RachaSimple** y **Faro/Organizer** con sus paquetes). `pip install flet` se parece a `npm install`: bajas código que alguien ya escribió y lo usas. Mismo concepto, distinto ecosistema.

> ### ⚠️ Cuidado
> Cuando instalas un paquete con `pip`, lo descargas de internet y va a correr en tu máquina. Instala solo paquetes conocidos y bien mantenidos. Revisa que el nombre esté bien escrito: a veces hay paquetes falsos con nombres parecidos a los populares. 🕵️

## 7. Entornos virtuales: una burbuja por proyecto

Aquí viene un problema real. Imagina que tienes **PolyPaw**, que necesita `flet` versión 0.21, y otro proyecto que necesita `flet` versión 0.10. Si instalas todo "globalmente" en tu computadora, una versión pisa a la otra y algo se rompe. 💥

La solución es el **entorno virtual**.

> ### 🟦 ¿Que significa? — *Entorno virtual*
> Un **entorno virtual** es una carpeta aislada que contiene su propia copia de Python y sus propios paquetes, separada del resto del sistema. Sirve para que cada proyecto tenga **sus** dependencias en **sus** versiones, sin chocar con otros proyectos.
> **Dónde se usa en un repo real:** **PolyPaw** se desarrolla dentro de su propio entorno virtual, donde se instala `flet` sin afectar a nada más de la computadora.

> ### 🟦 ¿Que significa? — *Dependencia*
> Una **dependencia** es un paquete externo que tu proyecto **necesita** para funcionar. Sirve para reutilizar trabajo ya hecho. Si falta una dependencia, el programa no arranca.
> **Dónde se usa en un repo real:** `flet` es la dependencia principal de **PolyPaw**: sin ella, no hay interfaz.

> ### 🟦 ¿Que significa? — *`venv`*
> **`venv`** es la herramienta incluida en Python para crear entornos virtuales. Sirve para generar esa "burbuja" aislada con un solo comando.
> **Dónde se usa en un repo real:** cualquier proyecto Python serio (como **PolyPaw**) empieza creando un `venv`.

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

Cuando el entorno está activado, normalmente verás `(venv)` al inicio de la línea de tu terminal. Eso te avisa: "estás dentro de la burbuja". Todo lo que instales con `pip` ahí dentro **solo** existe en ese proyecto.

> ### ⚠️ Cuidado
> La carpeta `venv` **no se sube** al repositorio de GitHub. Ocupa mucho y es específica de tu máquina. En su lugar se sube una **lista** de lo que hay que instalar (lo vemos en la siguiente sección). Por eso los proyectos incluyen un archivo `.gitignore` que ignora la carpeta `venv`.

> ### 💡 Tip
> La burbuja del entorno virtual es a tu proyecto lo que el aislamiento de red de **polypaw-nas** (con Tailscale) es a tu servidor casero: cada cosa en su lugar, sin que se mezcle con lo de afuera. Aislar = menos sorpresas.

## 8. `requirements.txt`: la lista de la compra 🛒

Si no subimos la carpeta `venv`, ¿cómo sabe otra persona (¡o tú en otra computadora!) qué instalar? Con un archivo de lista llamado `requirements.txt`.

> ### 🟦 ¿Que significa? — *`requirements.txt`*
> **`requirements.txt`** es un archivo de texto que lista todas las dependencias del proyecto y sus versiones, una por línea. Sirve para que cualquiera pueda recrear el mismo entorno con un solo comando.
> **Dónde se usa en un repo real:** en la raíz de **PolyPaw** vive su `requirements.txt`, donde aparece `flet` con su versión. Quien clone el proyecto solo tiene que instalar esa lista.

Un `requirements.txt` se ve así de simple:

```python
# Contenido de requirements.txt (PolyPaw)
flet==0.21.0
```

Y para usarlo, dos comandos clave en la terminal:

```python
# Generar el archivo a partir de lo que tienes instalado:
pip freeze > requirements.txt

# Instalar TODO lo de la lista de golpe (al clonar el proyecto):
pip install -r requirements.txt
```

Es como una **lista de la compra**: `pip freeze` la escribe anotando lo que tienes, y `pip install -r` la lee y compra todo lo que falta.

> ### 💡 Tip
> Si vienes de JavaScript, `requirements.txt` cumple el mismo papel que el `package.json` de **Faro/Organizer** o **RachaSimple**: declarar qué necesita el proyecto para funcionar. El comando `pip install -r requirements.txt` es el primo de `npm install`.

> ### 🔎 En tu codigo
> El flujo completo para alguien que clona **PolyPaw** desde cero sería: `python -m venv venv` → `source venv/bin/activate` → `pip install -r requirements.txt` → `python main.py`. Cuatro pasos y la app arranca. Sin entorno virtual ni `requirements.txt`, ese proceso sería un caos de versiones. 🐾

## 9. Cómo encaja todo en PolyPaw

Pongamos las piezas juntas. **PolyPaw** está hecho **enteramente en Python** con el framework **Flet**, y su código está repartido en varios módulos. Una versión simplificada de su organización:

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

Mira cuántas ideas de este capítulo aparecen juntas:

- `import flet as ft` → importar un **paquete** instalado con `pip`, con **alias**.
- `from database_manager import DatabaseManager` → importar una clase de **otro módulo** propio.
- `import os` y `import json` → módulos de la **biblioteca estándar**.
- `missions/*.json` → datos separados del código, leídos con `json`.

Cada archivo tiene **una responsabilidad clara**: `main.py` arma la pantalla, `database_manager.py` maneja los datos, y las misiones viven como datos en `missions/*.json`. Esa separación es lo que hace que un proyecto crezca sin volverse un nudo.

> ### 🔎 En tu codigo
> Compara con **tunal-digital**, que es un sitio en HTML/CSS/JS vanilla: ahí no hay `pip`, ni `venv`, ni `requirements.txt`, porque no es Python. Cada stack tiene sus herramientas. Lo que aprendiste aquí (`import`, biblioteca estándar, `pip`, `venv`, `requirements.txt`) es el "kit de organización" propio del mundo Python, y es exactamente el que sostiene a **PolyPaw**. 🐾

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
