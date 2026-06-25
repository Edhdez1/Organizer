# Capítulo 04 — La terminal

> La terminal asusta al principio (esa pantalla negra de las películas de "hackers"), pero es
> una de las herramientas más poderosas y, una vez entendida, **más simple** que existen. La
> vas a necesitar para Git, para Python, para tu NAS y para casi todo. Vamos paso a paso.

---

## 1. ¿Qué es la terminal y por qué existe?

> ### 🟦 ¿Qué significa? — *Terminal (o línea de comandos)*
> La **terminal** es un programa donde **le das órdenes a la computadora escribiéndolas con el
> teclado**, en lugar de hacer clics con el ratón. Escribes un **comando** (una orden), pulsas
> Enter, y la computadora lo ejecuta y te responde con texto.
> También se le llama *línea de comandos*, *consola* o *CLI* (*Command-Line Interface*,
> "interfaz de línea de comandos").

> ### 🟦 ¿Qué significa? — *Interfaz gráfica (GUI) vs. CLI*
> La forma normal de usar una computadora —ventanas, íconos, ratón— se llama **GUI**
> (*Graphical User Interface*, "interfaz gráfica de usuario"). La terminal es lo contrario:
> solo texto (**CLI**). Las dos sirven para lo mismo (dar órdenes), pero de forma distinta.

**¿Por qué usar texto si hay ratón?** Tres razones de peso:

1. **Precisión:** un comando hace *exactamente* una cosa, sin ambigüedad.
2. **Velocidad y repetición:** puedes hacer en una línea lo que con el ratón serían 50 clics,
   y **automatizar** tareas (repetirlas solas).
3. **Servidores sin pantalla:** tu NAS no tiene monitor ni ratón conectados; se administra
   **por terminal** (de hecho, así corre Ubuntu Server). Sin terminal, no hay servidor.

> ### 🟦 ¿Qué significa? — *Shell*
> El **shell** ("caparazón") es el **programa que interpreta** lo que escribes en la terminal y
> se lo ordena al sistema. Es la diferencia entre la *ventana* (terminal) y el *cerebro* que
> entiende los comandos (shell). Los más comunes son **bash** y **zsh** en Linux/macOS, y
> **PowerShell** en Windows. No te preocupes por el nombre todavía: solo sé que "shell" = el
> que entiende tus comandos.

---

## 2. Cómo abrir la terminal (en tu computadora)

- **Windows:** busca "PowerShell" o "Terminal" en el menú Inicio. (Para practicar comandos al
  estilo Linux, más adelante puedes instalar "WSL", pero no es necesario ahora.)
- **macOS:** abre "Terminal" (está en Aplicaciones → Utilidades, o búscala con Spotlight).
- **Linux / tu NAS:** la terminal *es* la forma principal de uso. A tu NAS te conectarás de
  forma remota (lo verás en el módulo 09).

Al abrirla verás algo como `usuario@maquina:~$` y un cursor parpadeando. Eso se llama el
**prompt**: la terminal te está diciendo "estoy lista, escribe una orden".

> ### 🟦 ¿Qué significa? — *Directorio de trabajo actual*
> La terminal siempre está "parada" dentro de **una carpeta** (un *directorio*). Es tu
> **ubicación actual**. Muchos comandos actúan sobre esa carpeta. El símbolo `~` significa "tu
> carpeta personal" (la de tu usuario).

---

## 3. Los comandos para sobrevivir (moverte y mirar)

Estos son los que usarás el 80% del tiempo. Pruébalos en orden cuando tengas tu computadora.

| Comando | Qué hace | Ejemplo |
|---|---|---|
| `pwd` | *Print Working Directory*: muestra **en qué carpeta estás** | `pwd` |
| `ls` | *List*: **lista** los archivos y carpetas de donde estás | `ls` |
| `cd` | *Change Directory*: **entra** a una carpeta | `cd Documentos` |
| `cd ..` | **sube** un nivel (a la carpeta de arriba) | `cd ..` |
| `mkdir` | *Make Directory*: **crea** una carpeta | `mkdir proyectos` |
| `touch` | **crea** un archivo vacío (Linux/macOS) | `touch notas.txt` |
| `cat` | muestra el **contenido** de un archivo | `cat notas.txt` |
| `cp` | *Copy*: **copia** un archivo | `cp notas.txt copia.txt` |
| `mv` | *Move*: **mueve** o **renombra** | `mv notas.txt diario.txt` |
| `rm` | *Remove*: **borra** un archivo | `rm copia.txt` |
| `clear` | **limpia** la pantalla | `clear` |

> ### ⚠️ Cuidado — `rm` no tiene papelera
> En la terminal, `rm` **borra de verdad**, sin pasar por la papelera de reciclaje. No hay
> "deshacer". Ten especial cuidado con `rm -r` (borra una carpeta y *todo* lo que contiene).
> Antes de borrar, usa `ls` para confirmar que estás donde crees.

> ### 🟦 ¿Qué significa? — *Argumento y opción (flag)*
> Un comando puede recibir extras:
> - Un **argumento** es *sobre qué* actúa: en `cd Documentos`, `Documentos` es el argumento.
> - Una **opción** o **flag** modifica *cómo* actúa, y suele empezar con `-`: en `ls -l`, la
>   opción `-l` pide el listado "largo" (con detalles). En `rm -r`, la `-r` significa
>   "recursivo" (incluye subcarpetas).
> **¿Dónde lo viste ya?** En este manual aparecieron comandos como `git push -u origin ...`:
> ahí `-u` es una opción y `origin ...` son argumentos. Pronto lo entenderás del todo.

---

## 4. Anatomía de un comando

Casi todos los comandos siguen este patrón:

```
nombre   [opciones]   [argumentos]
  │           │            │
  ls          -l        Documentos
"lista"   "en formato   "esta
          detallado"    carpeta"
```

Leído en español: *"lista, en formato detallado, la carpeta Documentos"*. Una vez ves este
patrón, los comandos dejan de parecer jeroglíficos.

> ### 💡 Tip — La tecla Tab es tu mejor amiga
> Empieza a escribir el nombre de un archivo o carpeta y pulsa **Tab**: la terminal lo
> **autocompleta**. Ahorra tiempo y evita errores de tipeo. Si hay varias opciones, pulsa Tab
> dos veces para verlas.

> ### 💡 Tip — Las flechas ↑ ↓ repiten comandos
> Pulsa la flecha **arriba** para traer el comando anterior (y volver a ejecutarlo o editarlo).
> No reescribas comandos largos: recíclalos.

---

## 5. Pedir ayuda y leer errores

Nadie memoriza todas las opciones. Para casi cualquier comando:

- `comando --help` → muestra un resumen de cómo se usa. Ej.: `ls --help`.
- `man comando` → abre el *manual* completo (en Linux/macOS). Ej.: `man ls`. Para salir,
  pulsa `q`.

> ### 🟦 ¿Qué significa? — *Mensaje de error en terminal*
> Cuando algo falla, la terminal **te dice qué pasó**. Por ejemplo:
> `cd: no such file or directory: Documantos` significa "no existe una carpeta llamada
> *Documantos*" (escribiste mal el nombre). **Leer el error literalmente** resuelve la mayoría
> de los problemas: casi siempre es un nombre mal escrito o estar en la carpeta equivocada.

---

## 6. Por qué esto te acerca a tu NAS

Tu NAS `polypaw-nas` corre **Ubuntu Server**, que **no tiene escritorio**: se administra
escribiendo comandos. Cuando en el módulo 09 te conectes a él, harás cosas como:

```
cd /srv/nas        # entrar a la carpeta de datos del NAS
ls -l              # ver qué archivos hay, con permisos y tamaños
df -h              # ver cuánto espacio libre queda en los discos
```

Todo lo que aprendas aquí —moverte, listar, leer— es **exactamente** lo que usarás para
administrar tu servidor. La terminal no es un tema aparte: es la llave de todo lo demás.

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Sé qué es la **terminal** y la diferencia entre **GUI** y **CLI**.
- [ ] Entiendo qué es el **shell** y el **prompt**.
- [ ] Puedo **moverme** (`cd`, `pwd`, `ls`) y **manipular** archivos (`mkdir`, `cp`, `mv`, `rm`).
- [ ] Reconozco la **anatomía** de un comando (nombre + opciones + argumentos).
- [ ] Sé pedir **ayuda** (`--help`, `man`) y **leer un error**.
- [ ] Entiendo por qué la terminal es clave para administrar mi NAS.

---

## 🧪 Ejercicios

Los marcados con 💻 son para tu computadora; los demás puedes razonarlos desde el teléfono.

1. **Traduce a español.** ¿Qué hace cada comando? (a) `ls -l`, (b) `cd ..`, (c) `mkdir fotos`,
   (d) `rm notas.txt`.
2. **Anatomía.** En `cp informe.txt respaldo.txt`, señala: nombre del comando, argumentos y
   qué hace en palabras.
3. 💻 **Tu primer recorrido.** Abre la terminal y, en orden: `pwd`, `ls`, crea una carpeta
   `practica` con `mkdir practica`, entra con `cd practica`, crea un archivo (`touch hola.txt`
   en Linux/macOS) y confirma con `ls`. Anota qué mostró cada paso.
4. 💻 **Lee un error a propósito.** Escribe `cd carpeta_que_no_existe` y copia el mensaje de
   error. Explica con tus palabras qué te está diciendo.
5. **Seguridad.** Explica por qué `rm -r practica` es más peligroso que `rm hola.txt`.

➡️ Siguiente: **[Capítulo 05 — Git y GitHub](05-git-y-github.md)**.
