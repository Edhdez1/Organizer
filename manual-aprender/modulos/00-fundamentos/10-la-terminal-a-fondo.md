# Capítulo 10 — La terminal a fondo

> En el Capítulo 04 diste tus primeros pasos en la terminal: aprendiste a moverte entre carpetas y a crear archivos. Ahora vamos a convertir esa terminal en una herramienta de verdad poderosa. Aprenderás a **buscar dentro de archivos**, **encadenar comandos como tuberías de agua**, **guardar resultados en archivos**, entender qué son las **variables de entorno** y los **permisos** de Linux, y usar **comodines** para trabajar con muchos archivos a la vez. Todo esto importa porque tu servidor `polypaw-nas` corre Ubuntu Server **sin pantalla bonita**: la terminal es la única forma de administrarlo. Dominarla es la diferencia entre tener miedo a tocar el NAS y sentirte su dueño. Bit, nuestro ajolote, te acompaña: cuando veas algo nuevo, respira y prueba sin miedo.

---

## 1. Antes de empezar: el contrato de la terminal

La terminal es un programa donde escribes una orden (un **comando**) y la computadora la ejecuta. Cada comando suele tener esta forma:

```bash
comando opciones argumentos
```

- El **comando** es el verbo (qué quieres hacer).
- Las **opciones** (empiezan con `-`) cambian cómo lo hace.
- Los **argumentos** son sobre qué lo hace (normalmente archivos o carpetas).

Por ejemplo, en `ls -l carpeta`, el comando es `ls`, la opción es `-l` y el argumento es `carpeta`.

> ### 🟦 ¿Qué significa? — *Comando*
> Una orden escrita que le das a la computadora para que haga una tarea concreta, como listar archivos o copiar algo. Cada comando es en realidad un pequeño programa. En tu servidor `polypaw-nas` administrarás Samba, Docker y Tailscale escribiendo comandos, porque no hay ratón ni ventanas.

> ### 💡 Tip — Practica en una carpeta de juego
> Antes de tocar el NAS de verdad, crea una carpeta de pruebas en tu computadora: `mkdir ~/practica-terminal && cd ~/practica-terminal`. Ahí puedes equivocarte sin romper nada importante. El símbolo `~` significa "mi carpeta personal".

---

## 2. Leer archivos sin abrirlos: `cat`, `head` y `less`

Muchas veces solo quieres **ver el contenido de un archivo de texto** sin abrir un editor. Hay tres herramientas clásicas para eso.

### `cat` — muestra todo de golpe

`cat` (de *concatenate*, "concatenar") vuelca el contenido completo del archivo en la pantalla.

```bash
cat main.py
```

Esto te muestra todo el código de `main.py` de tu proyecto **PolyPaw**. Es genial para archivos cortos.

> ### 🟦 ¿Qué significa? — *cat*
> Comando que imprime en pantalla el contenido entero de uno o varios archivos de texto, uno tras otro. Sirve para echar un vistazo rápido. En **PolyPaw** podrías usar `cat polypaw_db.json` para ver tu base de datos en JSON, aunque si es muy larga te conviene `head` o `less`.

### `head` — solo el principio

Si el archivo es enorme, `cat` te llena la pantalla. `head` muestra solo las **primeras líneas** (por defecto 10).

```bash
head missions/mision-01.json
head -n 3 polypaw_db.json
```

La opción `-n 3` significa "muéstrame solo las primeras 3 líneas".

> ### 🟦 ¿Qué significa? — *head*
> Comando que muestra únicamente el comienzo de un archivo. Útil para revisar la cabecera de un archivo grande sin esperar a que se imprima todo. (Tiene un hermano gemelo, `tail`, que muestra el **final** del archivo; es buenísimo para ver los últimos mensajes de un registro o "log".)

### `less` — leer con calma, página por página

`less` abre el archivo en un visor donde puedes **desplazarte** con las flechas, buscar texto con `/` y salir pulsando la tecla `q`.

```bash
less worker.js
```

> ### 🟦 ¿Qué significa? — *less*
> Visor de archivos que te deja recorrer un texto largo poco a poco, sin cargarlo todo de golpe. Pulsas `q` para salir, las flechas o `barra espaciadora` para avanzar, y `/palabra` para buscar. Para revisar un registro largo en tu `polypaw-nas` (por ejemplo, los mensajes de Samba), `less` es tu mejor amigo.

> ### ⚠️ Cuidado — No uses `cat` con archivos binarios
> `cat` está pensado para **texto**. Si por accidente haces `cat` de una imagen o de un archivo de base de datos binario, verás un montón de símbolos raros y la terminal puede quedar "desconfigurada". Si eso pasa, escribe `reset` y pulsa Enter para arreglarla.

---

## 3. Contar cosas: `wc`

`wc` (de *word count*, "contar palabras") cuenta líneas, palabras y caracteres de un archivo.

```bash
wc main.py
```

Te devolverá tres números: líneas, palabras y caracteres (en ese orden), seguidos del nombre del archivo.

La opción más útil es `-l`, que cuenta **solo líneas**:

```bash
wc -l main.py
```

> ### 🟦 ¿Qué significa? — *wc*
> Herramienta que cuenta líneas, palabras y caracteres. Con `-l` cuentas líneas; con `-w`, palabras. ¿Para qué sirve? Para responder preguntas como "¿cuántas líneas tiene mi `main.py` de PolyPaw?" o, combinándolo con otros comandos (lo verás en la sección de tuberías), "¿cuántas misiones tengo?".

> ### 🔎 En tu código
> Imagina que quieres saber cuántas líneas de código tiene el archivo principal de **Faro**:
> ```bash
> wc -l src/lib/analizar.ts
> ```
> Un número grande te avisa de que ese archivo quizá conviene dividirlo en partes más pequeñas y manejables.

---

## 4. Buscar dentro de archivos: `grep`

Aquí viene uno de los comandos más útiles de toda tu vida en la terminal. `grep` **busca texto dentro de los archivos** y te muestra las líneas donde aparece.

```bash
grep "Claude" main.js
```

Esto busca la palabra `Claude` dentro de `main.js` de **tunal-digital** y te imprime cada línea que la contiene.

Opciones muy útiles:

- `-i` ignora mayúsculas/minúsculas (`grep -i "claude"` encuentra `Claude`, `CLAUDE` y `claude`).
- `-n` muestra el **número de línea** donde está cada coincidencia.
- `-r` busca de forma **recursiva** en todas las carpetas y subcarpetas.

```bash
grep -rni "supabase" src/
```

Ese comando busca la palabra `supabase` (sin importar mayúsculas, mostrando números de línea) en todo lo que haya dentro de la carpeta `src/`. Perfecto para **RachaSimple** o **Faro**, donde Supabase aparece en varios sitios.

> ### 🟦 ¿Qué significa? — *grep*
> Comando que busca un texto (o un patrón) dentro de archivos y muestra las líneas coincidentes. Su nombre viene de una vieja orden de edición, pero hoy lo usarás todo el tiempo para responder "¿en qué archivo escribí esto?". En **RachaSimple**, `grep -rn "useHabits" src/hooks` te dice exactamente dónde se usa tu hook de hábitos.

> ### 💡 Tip — `grep` para encontrar tu clave por error
> En tu servidor, antes de subir o compartir un archivo, puedes comprobar que no dejaste una contraseña visible:
> ```bash
> grep -rni "password" /srv/nas/configs
> ```
> Esto encaja con la regla de seguridad de **Faro**: los secretos nunca deben quedar a la vista. `grep` te ayuda a cazarlos.

---

## 5. Encontrar archivos: `find`

Mientras `grep` busca **dentro** de los archivos, `find` busca **los archivos en sí** por su nombre, tipo o fecha.

```bash
find . -name "*.json"
```

Lee esto así: "busca a partir de aquí (`.` significa la carpeta actual) todos los archivos cuyo nombre termine en `.json`". En **PolyPaw** te listaría todas tus misiones y la base de datos.

Algunos usos típicos:

```bash
find /srv/nas -name "*.mp4"          # todos los videos en el disco del NAS
find . -type d -name "components"    # carpetas (no archivos) llamadas components
find /srv/nas -size +500M            # archivos de más de 500 megabytes
```

> ### 🟦 ¿Qué significa? — *find*
> Comando que recorre carpetas buscando archivos según criterios: nombre, tipo, tamaño, fecha. El primer argumento es **dónde** empezar a buscar; luego van los filtros. En tu `polypaw-nas`, `find /srv/nas -size +500M` te ayuda a encontrar los archivos gigantes que están llenando el disco de 954 GB.

> ### ⚠️ Cuidado — `find` puede ser lento en discos grandes
> Buscar en todo `/srv/nas` (casi un terabyte) puede tardar. Si solo te interesa una subcarpeta, apunta `find` ahí directamente (`find /srv/nas/PolyPawNAS ...`) para que vaya más rápido y no revuelva todo el disco.

---

## 6. Tuberías: conectar comandos con `|`

Llegamos a una de las ideas más bonitas de la terminal. Cada comando produce una **salida** (lo que imprime en pantalla). Una **tubería**, escrita con la barra vertical `|`, toma esa salida y la entrega como **entrada** al siguiente comando. Es como conectar mangueras: el agua que sale de una entra en la siguiente.

```bash
cat polypaw_db.json | grep "racha"
```

Aquí `cat` saca todo el contenido del archivo y, en vez de mostrarlo, lo **pasa** a `grep`, que solo deja las líneas con la palabra `racha`. Bit lo imagina como una fábrica: cada máquina recibe la pieza, le hace algo y la pasa a la siguiente.

Ejemplos que de verdad usarás:

```bash
# ¿Cuántos archivos .json hay en PolyPaw?
find . -name "*.json" | wc -l

# Ver los procesos que tienen que ver con Samba en el NAS
ps aux | grep smbd

# Listar archivos y buscar solo los que mencionan "worker"
ls -l | grep worker
```

> ### 🟦 ¿Qué significa? — *Proceso* y *`ps aux`*
> Un **proceso** es un programa que está corriendo ahora mismo en la computadora (por ejemplo, Samba sirviendo tus archivos). El comando `ps` (de *process status*, "estado de procesos") los lista, y las opciones `aux` significan "muéstrame **todos** los procesos de **todos** los usuarios con detalle". Por eso `ps aux | grep smbd` se lee como: "lista todos los procesos y, de esa lista, déjame solo los de Samba (`smbd`)". Es la forma rápida de comprobar en tu `polypaw-nas` si un servicio está vivo.

> ### 🟦 ¿Qué significa? — *Tubería (pipe)*
> El símbolo `|` que conecta dos comandos, de modo que la salida del primero se convierte en la entrada del segundo. Sirve para combinar herramientas simples y resolver tareas complejas. En tu `polypaw-nas`, `ps aux | grep smbd` combina "lista todos los procesos" con "déjame solo los de Samba" para comprobar de un vistazo si tu servidor de archivos está corriendo.

> ### 💡 Tip — Encadena tantas como quieras
> Puedes poner varias tuberías seguidas. Por ejemplo, "lista archivos, filtra los `.json` y cuéntalos":
> ```bash
> ls | grep ".json" | wc -l
> ```
> La filosofía de Unix es: programas pequeños que hacen una sola cosa bien, unidos por tuberías.

---

## 7. Redirección: guardar la salida en un archivo con `>` y `>>`

Una tubería pasa la salida a otro **comando**. La **redirección** pasa la salida a un **archivo**.

- `>` crea (o **reemplaza**) un archivo con la salida.
- `>>` **añade** la salida al final del archivo, sin borrar lo que ya había.

```bash
# Guarda la lista de archivos .json en un archivo de texto
find . -name "*.json" > lista-misiones.txt

# Añade una línea de nota al final de un registro propio
echo "Respaldo hecho hoy" >> bitacora-nas.txt
```

(Aquí aparece `echo`, un comando que simplemente **imprime en pantalla** el texto que le des. Combinado con `>>`, en vez de mostrarlo lo guarda al final de un archivo. Lo volverás a ver en la sección de variables de entorno.)

> ### 🟦 ¿Qué significa? — *Redirección*
> Mecanismo para enviar la salida de un comando a un archivo en lugar de a la pantalla. Con `>` se sobrescribe el archivo; con `>>` se agrega al final. Sirve para guardar resultados y registros. En tu `polypaw-nas` podrías guardar la lista de archivos grandes en un informe: `find /srv/nas -size +500M > grandes.txt` y revisarlo con calma.

> ### ⚠️ Cuidado — `>` borra sin avisar
> Si el archivo ya existía, `>` lo **reemplaza por completo** y no hay papelera de reciclaje. Cuando dudes entre añadir o reemplazar, usa `>>` (añadir) que es más seguro. Para evitar sustos al administrar el NAS, primero ejecuta el comando sin la redirección, mira que la salida sea la correcta, y solo entonces agrega `> archivo.txt`.

> ### 🔎 En tu código
> En **tunal-digital**, supón que quieres un inventario rápido de tu sitio web. Puedes generar un archivo con todas las líneas que mencionan tu API:
> ```bash
> grep -rn "api" sitio-web backend > usos-api.txt
> ```
> Luego abres `usos-api.txt` con `less` y revisas cada lugar donde tu `worker.js` o tu `main.js` hablan con la API de Claude.

---

## 8. Comodines: trabajar con muchos archivos a la vez con `*`

El asterisco `*` es un **comodín**: significa "cualquier cosa". La terminal lo reemplaza por todos los nombres que encajen, **antes** de ejecutar el comando.

```bash
ls *.json          # todos los archivos que terminan en .json
ls mision-*.json   # mision-01.json, mision-02.json, mision-luna.json...
cp *.png imagenes/ # copia todas las imágenes png a la carpeta imagenes
```

> ### 🟦 ¿Qué significa? — *Comodín (wildcard)*
> Un símbolo, normalmente `*`, que representa "cualquier secuencia de caracteres". Permite aplicar un comando a un grupo de archivos sin escribirlos uno por uno. El `?` es otro comodín que representa **un solo** carácter. En **PolyPaw**, `ls missions/*.json` lista todas tus misiones de una sola vez, sin importar cómo se llame cada una.

> ### 💡 Tip — Mira antes de actuar
> Como `*` puede afectar a muchos archivos, primero pruébalo con `ls` (que solo muestra) y, cuando veas que selecciona exactamente lo que quieres, repítelo con el comando de verdad (`cp`, `mv`, `rm`). Así evitas borrar o mover archivos por error.

> ### ⚠️ Cuidado — El comodín más peligroso del mundo
> Nunca escribas `rm *` (ni mucho menos `rm -rf *`) sin estar absolutamente seguro de en qué carpeta estás. `rm` borra **sin papelera**, y el `*` lo aplica a todo. En tu `polypaw-nas` esto podría borrar archivos de la familia. Antes de cualquier `rm` con comodín, escribe `pwd` para confirmar tu ubicación y `ls` para ver qué hay.

---

## 9. Variables de entorno

Una **variable de entorno** es un dato con nombre que el sistema guarda en memoria y que muchos programas leen. Piensa en ella como una etiqueta: el sistema dice "mi carpeta personal es tal" o "mi nombre de usuario es cual", y los programas la consultan.

Para ver una, antepón `$` a su nombre con `echo` (que imprime texto):

```bash
echo $HOME      # tu carpeta personal, por ejemplo /home/edwar
echo $USER      # tu nombre de usuario
echo $PATH      # las carpetas donde el sistema busca los comandos
```

Para ver **todas** las variables:

```bash
env
```

Para crear una temporal (solo dura mientras la ventana esté abierta):

```bash
export MI_NOMBRE="Edwar"
echo $MI_NOMBRE
```

> ### 🟦 ¿Qué significa? — *Variable de entorno*
> Un valor con nombre que el sistema operativo mantiene disponible para los programas, como `$HOME` (tu carpeta) o `$PATH` (dónde buscar comandos). Sirve para guardar configuración **sin escribirla dentro del código**. Esto es clave en tus proyectos: **Faro** y **RachaSimple** guardan sus claves de Supabase y de OpenAI en variables de entorno (archivos `.env`), nunca dentro del código, exactamente como exige la regla de seguridad de Faro.

> ### 🟦 ¿Qué significa? — *PATH*
> Una variable de entorno especial que contiene la **lista de carpetas** donde el sistema busca los programas cuando escribes un comando. Por eso al escribir `ls` el sistema sabe dónde está el programa `ls`: lo encuentra recorriendo las carpetas de `$PATH`.

> ### 🔎 En tu código
> Cuando configuras la conexión a la base de datos en **Faro** (`src/lib`), el servidor lee algo como `process.env.SUPABASE_URL`. Ese `SUPABASE_URL` es una variable de entorno. En tu computadora vive en un archivo llamado `.env.local` que **nunca** se sube a GitHub. Así los secretos quedan solo en el servidor, como manda la guía del proyecto.

> ### 💡 Tip — Variables en el NAS
> En `polypaw-nas`, herramientas como Docker usan variables de entorno para configurarse. Por ejemplo, un contenedor de AdGuard Home podría recibir su configuración por variables. Saber leerlas con `echo $NOMBRE` te ayuda a depurar cuando algo "no toma" la configuración esperada.

---

## 10. Permisos en Linux: `rwx` y `chmod`

En Linux, **cada archivo y carpeta tiene permisos** que dicen quién puede leerlo, modificarlo o ejecutarlo. Esto es vital en un servidor compartido como tu NAS, donde varias personas o servicios acceden a los archivos.

### Los tres permisos: r, w, x

- **r** (*read*, leer): puedes ver el contenido.
- **w** (*write*, escribir): puedes modificar o borrar.
- **x** (*execute*, ejecutar): puedes correrlo como programa (o, en una carpeta, entrar en ella).

### Los tres grupos: dueño, grupo, otros

Esos permisos se asignan a tres conjuntos de personas:

1. El **dueño** del archivo (*user*).
2. El **grupo** al que pertenece.
3. **Todos los demás** (*others*).

Cuando haces `ls -l`, ves algo así al inicio de cada línea:

```
-rwxr-xr--
```

Se lee por bloques de tres, de izquierda a derecha (ignorando el primer guion, que indica si es archivo o carpeta):

- `rwx` → el **dueño** puede leer, escribir y ejecutar.
- `r-x` → el **grupo** puede leer y ejecutar, pero no escribir.
- `r--` → los **demás** solo pueden leer.

> ### 🟦 ¿Qué significa? — *Permisos (rwx)*
> Reglas que controlan quién puede leer (`r`), escribir (`w`) o ejecutar (`x`) cada archivo, separadas para el dueño, el grupo y el resto. Sirven para proteger los datos. En tu `polypaw-nas`, los permisos deciden si la familia que entra por Samba puede solo ver las fotos o también borrarlas. Bien configurados, evitan borrados accidentales.

### Cambiar permisos con `chmod`

`chmod` (de *change mode*, "cambiar modo") modifica los permisos. La forma más fácil de entenderla al principio es la **simbólica**:

```bash
chmod +x respaldo.sh      # añade permiso de ejecución (para correr un script)
chmod -w notas.txt        # quita permiso de escritura (lo vuelve solo lectura)
chmod g+r informe.txt     # da lectura al grupo
```

Donde `+` añade, `-` quita, y las letras `u` (dueño), `g` (grupo), `o` (otros) dicen a quién.

También existe la forma **numérica**, que verás mucho en tutoriales:

```bash
chmod 755 respaldo.sh
```

Cada dígito representa un grupo (dueño, grupo, otros) y se calcula sumando: leer = 4, escribir = 2, ejecutar = 1. Así, `7` es `4+2+1` (todo), `5` es `4+0+1` (leer y ejecutar). Por eso `755` significa "el dueño todo, los demás solo leer y ejecutar".

> ### 🟦 ¿Qué significa? — *chmod*
> Comando para cambiar los permisos de un archivo o carpeta. Puedes usar letras (`+x`, `g-w`) o números (`755`, `644`). Sirve, por ejemplo, para hacer ejecutable un script de respaldo en tu `polypaw-nas` con `chmod +x respaldo-nas.sh` antes de poder correrlo.

> ### ⚠️ Cuidado — No abras todo con `chmod 777`
> Verás gente recomendar `chmod 777` para "arreglar" problemas. Eso da permiso a **todo el mundo** para leer, escribir y ejecutar, y es un agujero de seguridad enorme. En un servidor con VPN y archivos de la familia como el tuyo, evítalo. Da solo los permisos necesarios. Si dudas, `644` (dueño lee/escribe, los demás solo leen) es seguro para archivos de datos, y `755` para programas y carpetas.

> ### 💡 Tip — `sudo` cuando el sistema te dice "permiso denegado"
> En el NAS, muchas acciones de administración requieren permisos de superusuario. Se antepone `sudo` al comando (por ejemplo `sudo systemctl restart smbd` para reiniciar Samba). `sudo` te pedirá tu contraseña. Úsalo con respeto: con `sudo` el sistema hace lo que le pidas, aunque sea un error.

---

## 11. Juntándolo todo: una sesión real en el NAS

Imagina que tu disco de 954 GB en `/srv/nas` se está llenando y quieres entender por qué. Con lo aprendido podrías hacer:

```bash
# 1. Confírmate dónde estás
pwd

# 2. Busca los archivos más grandes y guárdalos en un informe
find /srv/nas -size +500M > ~/grandes.txt

# 3. Cuenta cuántos son
wc -l ~/grandes.txt

# 4. Revisa el informe con calma
less ~/grandes.txt

# 5. ¿Cuántos son videos?
cat ~/grandes.txt | grep ".mp4" | wc -l
```

En cinco pasos combinaste `find`, redirección, `wc`, `less`, `cat`, una tubería y `grep`. Eso es administrar un servidor de verdad. Bit estaría orgulloso.

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Sé ver un archivo con `cat`, su principio con `head` y leerlo con calma con `less` (y salir con `q`).
- [ ] Puedo contar líneas de un archivo con `wc -l`.
- [ ] Busco texto dentro de archivos con `grep`, incluso recursivamente con `grep -rn`.
- [ ] Encuentro archivos por nombre o tamaño con `find`.
- [ ] Entiendo que `|` conecta la salida de un comando con la entrada de otro.
- [ ] Sé guardar la salida en un archivo con `>` (reemplaza) y `>>` (añade), y sé por qué `>` es peligroso.
- [ ] Uso el comodín `*` con cuidado, probando antes con `ls`.
- [ ] Puedo ver variables de entorno con `echo $HOME` y entiendo que las claves de Faro y RachaSimple viven ahí.
- [ ] Leo los permisos `rwx` de `ls -l` y sé qué hace `chmod` (y por qué `777` es mala idea).

---

## 🧪 Ejercicios

1. **Sin computadora.** Dibuja en papel qué hace esta tubería paso a paso: `cat polypaw_db.json | grep "racha" | wc -l`. Escribe en palabras qué entra y qué sale de cada comando.

2. **Sin computadora.** Un archivo muestra `-rw-r--r--` en `ls -l`. Explica, con tus palabras, qué puede hacer el dueño, qué puede hacer el grupo y qué pueden hacer los demás. ¿Cuál es su número equivalente en `chmod`?

3. 💻 **En tu carpeta de prácticas.** Crea tres archivos vacíos: `mision-01.json`, `mision-02.json` y `notas.txt`. Luego, usando un comodín, lista de una sola vez **solo** los archivos `.json`. Después cuenta cuántos `.json` hay combinando `ls`, una tubería y `wc -l`.

4. 💻 **En PolyPaw.** Entra en la carpeta del proyecto y usa `grep -rn` para encontrar en qué archivos aparece la palabra `mission` (o la que uses en tus misiones). Guarda el resultado en un archivo llamado `usos-mission.txt` con redirección y luego ábrelo con `less`.

5. 💻 **En Faro.** Usa `find` para listar todos los archivos `.ts` dentro de la carpeta `src/` y cuéntalos con una tubería hacia `wc -l`. Anota el número: te dará una idea del tamaño del proyecto.

6. 💻 **Pensando en el NAS (puedes simularlo en tu PC).** Crea un script de texto llamado `respaldo.sh` con la línea `echo "Respaldo iniciado"`. Hazlo ejecutable con `chmod +x respaldo.sh`, ejecútalo con `./respaldo.sh` y comprueba con `ls -l` que ahora tiene la `x` en sus permisos.
