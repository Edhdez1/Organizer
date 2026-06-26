# Capitulo 06 — Linux a fondo para tu servidor

<p align="center">
  <img src="../../recursos/imagenes/09-nas-y-servidores/cap06.png" alt="Ilustración del capítulo (pixel art con Bit)" width="640">
</p>


> Hola de nuevo, soy **Bit**, tu ajolote acompañante. Hasta ahora hemos tratado a **polypaw-nas** como una cajita mágica que guarda archivos. En este capítulo vamos a abrir la caja. Vas a entender cómo piensa Linux por dentro: quién manda (root y sudo), quién puede tocar qué (usuarios, grupos y permisos), dónde guarda cada cosa (la estructura de carpetas) y cómo editar la configuración a mano sin romper nada (nano). Todo aplicado a tu laptop Acer Nitro convertido en servidor. Respira: no hay escritorio, no hay ratón, solo terminal por SSH... y eso es exactamente lo que un servidor necesita. Vamos despacio.

---

## 1. Por qué tu servidor no tiene escritorio (y está bien así)

Cuando instalaste **Ubuntu Server 26.04** en tu Acer Nitro AN515-54 (procesador Intel **i5-9300H** y 8 GB de RAM), no apareció un fondo de pantalla bonito ni iconos. Apareció una pantalla negra pidiendo usuario y contraseña. Eso no es un error: es la versión "Server" de Ubuntu, pensada para máquinas que trabajan sin que nadie las mire.

> ### 🟦 ¿Que significa? — *Ubuntu Server*
> Es una variante de Ubuntu (el sistema Linux) que viene **sin entorno gráfico de escritorio**: no hay ventanas ni ratón, solo una línea de comandos (la terminal).
> **Para qué sirve:** un escritorio gráfico consume memoria y procesador para dibujar cosas que nadie va a ver. Tu polypaw-nas solo tiene **8 GB de RAM**, así que cada megabyte cuenta. Sin escritorio, esa RAM queda libre para lo que importa: Samba, Docker, AdGuard Home.
> **Dónde aparece en tu NAS real:** es el sistema operativo que corre en el SSD de 238 GB. Lo administras siempre desde otra computadora, conectándote por SSH.

> ### 🟦 ¿Que significa? — *Terminal (línea de comandos)*
> Es una pantalla donde escribes órdenes de texto y el sistema las ejecuta. En vez de hacer clic en un botón, escribes una palabra y presionas Enter.
> **Para qué sirve:** es la forma más precisa y ligera de controlar un servidor. Una sola línea puede hacer lo que en una interfaz gráfica tomaría veinte clics.
> **Dónde aparece en tu NAS real:** es la pantalla negra que ves cuando entras por SSH a polypaw-nas.

> ### 🟦 ¿Que significa? — *SSH*
> Significa *Secure Shell* (caparazón seguro). Es una forma de **conectarte a la terminal de otra computadora a través de la red, de forma cifrada** (nadie puede espiar lo que escribes).
> **Para qué sirve:** te deja administrar polypaw-nas desde tu laptop principal sin estar físicamente frente al Acer. Escribes en tu teclado, pero los comandos se ejecutan en el servidor.
> **Dónde aparece en tu NAS real:** lo usas cada vez que abres una terminal y escribes algo como `ssh edwar@polypaw-nas`. Idealmente entras a través de **Tailscale**, no por internet abierto.

Así te conectas a tu servidor desde tu laptop principal:

```bash
# Conéctate a polypaw-nas por SSH (usuario "edwar")
ssh edwar@polypaw-nas

# Si usas Tailscale, puedes usar el nombre que te dio Tailscale
ssh edwar@polypaw-nas.tu-tailnet.ts.net
```

> ### 🔎 En tu servidor
> Tu laptop tiene una ventaja secreta que un servidor de verdad no tiene: **la batería funciona como una UPS natural**. Si se va la luz, polypaw-nas no se apaga de golpe; sigue con la batería. Eso protege tus datos de cortes eléctricos. Cuida esa batería: no la dejes siempre al 100% si puedes evitarlo.

> ### 💡 Tip
> Apunta el nombre y la IP de polypaw-nas en un papel o en una nota. Vas a escribir ese comando `ssh` muchas veces. Más adelante puedes configurar un alias para no repetir la dirección larga de Tailscale.

---

## 2. El superusuario: root y sudo

En Linux hay un usuario especial que **puede hacer absolutamente todo**: borrar cualquier archivo, instalar programas, apagar el sistema. Se llama **root**. Es el dueño total de la máquina.

> ### 🟦 ¿Que significa? — *root (superusuario)*
> Es la cuenta con **poder total** sobre el sistema. No tiene restricciones: puede leer, modificar y borrar cualquier cosa, incluido lo que haría que el servidor deje de arrancar.
> **Para qué sirve:** para tareas de administración que un usuario normal no puede hacer (instalar software, cambiar configuración del sistema, montar discos).
> **Dónde aparece en tu NAS real:** es el dueño de carpetas del sistema como `/etc`. Cuando un archivo "no te deja modificarlo", casi siempre es porque pertenece a root.

Usar root todo el tiempo es peligroso: un error tonto puede destruir el sistema sin preguntar. Por eso Linux moderno prefiere que uses tu cuenta normal y pidas permisos de root **solo cuando los necesites**, con la palabra `sudo`.

> ### 🟦 ¿Que significa? — *sudo*
> Significa *superuser do* (haz esto como superusuario). Pones `sudo` delante de un comando para ejecutarlo **con poderes de root solo por esta vez**, y normalmente te pide tu contraseña.
> **Para qué sirve:** te da el poder justo cuando lo necesitas, sin estar permanentemente como root. Es como pedir prestada la llave maestra para una sola puerta y devolverla.
> **Dónde aparece en tu NAS real:** lo usas para instalar Samba, editar configuración de AdGuard, reiniciar servicios, montar el HDD de datos... casi cualquier tarea administrativa.

```bash
# SIN sudo: intentas editar un archivo del sistema y te lo niega
nano /etc/samba/smb.conf
# Resultado: se abre en modo "solo lectura" o no te deja guardar

# CON sudo: ahora sí tienes permiso
sudo nano /etc/samba/smb.conf
```

> ### ⚠️ Cuidado
> Cada vez que escribas `sudo`, **piensa un segundo antes de presionar Enter**. Estás actuando como root. Un comando como `sudo rm -rf /` borraría TODO el sistema sin preguntar y sin posibilidad de recuperación. No hay papelera de reciclaje en la terminal. Lee siempre lo que escribiste antes de confirmar.

> ### 💡 Tip
> Cuando escribes tu contraseña tras un `sudo`, **no verás asteriscos ni puntos** mientras la tecleas. La terminal no muestra nada por seguridad. No está congelada: escribe tu contraseña y presiona Enter con confianza.

> ### 🔎 En tu servidor
> El usuario que creaste al instalar Ubuntu (por ejemplo `edwar`) ya tiene permiso para usar `sudo`. Eso significa que **tu contraseña personal es, en la práctica, la llave maestra de polypaw-nas**. Por eso debe ser una contraseña fuerte y única: si alguien la adivina, tiene root.

---

## 3. Usuarios y grupos: quién es quién en polypaw-nas

Linux fue diseñado para que muchas personas y muchos programas compartan la misma máquina sin pisarse. Para eso, todo pertenece a un **usuario** y a un **grupo**.

> ### 🟦 ¿Que significa? — *Usuario*
> Es una cuenta que identifica a una persona o a un programa dentro del sistema. Cada usuario tiene su propia carpeta personal, su contraseña y sus permisos.
> **Para qué sirve:** separa quién puede hacer qué. Tu cuenta `edwar` no es lo mismo que la cuenta `root` ni que las cuentas que crean Samba o Docker para funcionar.
> **Dónde aparece en tu NAS real:** tienes tu usuario personal para administrar, y existen usuarios "de servicio" (creados automáticamente) que usan Samba, AdGuard Home y Docker por debajo.

> ### 🟦 ¿Que significa? — *Grupo*
> Es un conjunto de usuarios que comparten ciertos permisos. En vez de dar permiso uno por uno, pones a varios usuarios en un grupo y le das permiso al grupo entero.
> **Para qué sirve:** facilita compartir. Por ejemplo, todos los usuarios que deben poder escribir en el recurso compartido de Samba pueden estar en un mismo grupo.
> **Dónde aparece en tu NAS real:** el grupo que controla quién accede a los datos del recurso **PolyPawNAS** en el HDD de `/srv/nas`.

Comandos básicos para ver y crear usuarios y grupos:

```bash
# ¿Quién soy yo ahora mismo?
whoami

# ¿A qué grupos pertenezco?
groups

# Ver tu usuario y grupos con detalle (números de identificación incluidos)
id

# Crear un usuario nuevo (por ejemplo, para tu pareja o un compañero)
sudo adduser ana

# Crear un grupo nuevo, por ejemplo para quien accede a los datos del NAS
sudo addgroup nas-datos

# Meter al usuario "ana" en el grupo "nas-datos"
sudo usermod -aG nas-datos ana
```

> ### 🟦 ¿Que significa? — *La opción -aG en usermod*
> `usermod` modifica un usuario. `-aG` significa "añadir (append) al grupo sin quitarlo de los demás".
> **Para qué sirve:** la `a` es vital. Si pones solo `-G` sin la `a`, sacas al usuario de TODOS sus otros grupos y lo dejas solo en el que indicaste. Eso puede romper accesos. Siempre usa `-aG` para añadir.
> **Dónde aparece en tu NAS real:** lo usarás para dar acceso a Samba o a la carpeta de datos sin afectar otros permisos del usuario.

> ### ⚠️ Cuidado
> No crees usuarios "de prueba" con contraseñas débiles (`1234`, `admin`) y luego los olvides. Cada cuenta activa es una puerta. Si creaste una cuenta para probar y ya no la usas, **bórrala** con `sudo deluser ana`. Menos puertas, menos riesgo.

---

## 4. Permisos de archivos: el corazón de la seguridad en Linux

Aquí está la idea más importante de todo el capítulo. En Linux, **cada archivo y cada carpeta tiene permisos** que definen tres cosas para tres grupos de personas.

Las tres acciones posibles son:

- **r** = read (leer): puedes ver el contenido.
- **w** = write (escribir): puedes modificar o borrar.
- **x** = execute (ejecutar): puedes correrlo como programa, o (en carpetas) entrar en ella.

Y esos permisos se definen por separado para tres "audiencias":

- **Usuario (owner / dueño):** la persona dueña del archivo.
- **Grupo (group):** los miembros del grupo asignado al archivo.
- **Otros (others):** todos los demás.

> ### 🟦 ¿Que significa? — *Permisos rwx*
> Son las tres letras que indican si se puede **leer (r), escribir (w) o ejecutar (x)** un archivo, repetidas para dueño, grupo y otros.
> **Para qué sirve:** controlan quién puede tocar cada cosa. Es la primera línea de defensa de tu servidor: aunque alguien entre con un usuario limitado, no podrá modificar archivos que no le pertenecen.
> **Dónde aparece en tu NAS real:** lo ves cada vez que listas archivos con `ls -l`. Esos guiones y letras del principio (`-rw-r--r--`) son los permisos.

Vamos a leer permisos reales. Escribe esto en polypaw-nas:

```bash
# Listar archivos con detalle (la "l" es de "long", largo)
ls -l /srv/nas
```

Una línea de salida se ve así:

```
-rw-r--r--  1 edwar nas-datos  1048576 jun 26 10:30 respaldo-faro.tar.gz
drwxr-xr-x  2 edwar nas-datos     4096 jun 26 10:31 PolyPaw
```

Vamos a descifrarla, carácter por carácter, en la primera línea:

- El primer carácter `-` significa "archivo normal". Si fuera `d`, sería un directorio (carpeta), como en la segunda línea.
- Luego vienen **tres bloques de rwx**:
  - `rw-` → el **dueño** (`edwar`) puede leer y escribir, pero no ejecutar.
  - `r--` → el **grupo** (`nas-datos`) solo puede leer.
  - `r--` → **otros** solo pueden leer.
- `edwar` es el dueño; `nas-datos` es el grupo.

> ### 🟦 ¿Que significa? — *Directorio*
> Es la palabra técnica de Linux para "carpeta". Una carpeta que contiene archivos y otras carpetas.
> **Para qué sirve:** organiza los datos. En un directorio, el permiso de ejecución (`x`) no significa "correr un programa", sino "poder entrar y atravesar la carpeta".
> **Dónde aparece en tu NAS real:** cada carpeta de tus respaldos en `/srv/nas` es un directorio. La `d` al inicio de la línea de `ls -l` te lo confirma.

### chmod: cambiar permisos

> ### 🟦 ¿Que significa? — *chmod*
> Significa *change mode* (cambiar modo). Es el comando para **cambiar los permisos** de un archivo o carpeta.
> **Para qué sirve:** ajustar quién puede leer, escribir o ejecutar algo. Por ejemplo, hacer que un script de respaldo sea ejecutable.
> **Dónde aparece en tu NAS real:** lo usarás al crear scripts de respaldo o al ajustar permisos de la carpeta de datos.

Hay dos formas de usar chmod. La fácil de recordar es la **simbólica**:

```bash
# Dar permiso de ejecución al dueño de un script de respaldo
chmod u+x respaldo.sh
# u = usuario/dueño, + = añadir, x = ejecutar

# Quitar el permiso de escritura a "otros" en un archivo importante
chmod o-w datos-importantes.txt
# o = otros, - = quitar, w = escribir

# Dar lectura al grupo
chmod g+r informe.txt
# g = grupo
```

La otra forma es la **numérica (octal)**, que verás mucho en guías de internet. Cada permiso vale un número: **r=4, w=2, x=1**. Se suman por audiencia:

```bash
# 7 = 4+2+1 (rwx) para el dueño
# 5 = 4+0+1 (r-x) para el grupo
# 5 = 4+0+1 (r-x) para otros
chmod 755 respaldo.sh

# 6 = 4+2 (rw-) para el dueño
# 4 = 4   (r--) para el grupo
# 4 = 4   (r--) para otros
chmod 644 informe.txt
```

> ### 💡 Tip
> Recuerda estos dos "clásicos": **755** para carpetas y programas (todos pueden entrar/ejecutar, solo el dueño modifica) y **644** para archivos normales (todos leen, solo el dueño escribe). Con esos dos cubres el 90% de los casos.

> ### ⚠️ Cuidado
> Nunca pongas `chmod 777` a algo "para que funcione de una vez". `777` significa que **cualquiera puede leer, escribir y ejecutar**, incluidos programas maliciosos. Es la solución perezosa que abre agujeros de seguridad. Si algo no funciona por permisos, ajusta el dueño o el grupo, no abras todo a todos.

### chown: cambiar el dueño

> ### 🟦 ¿Que significa? — *chown*
> Significa *change owner* (cambiar dueño). Cambia **quién es el dueño y/o el grupo** de un archivo o carpeta.
> **Para qué sirve:** transferir la propiedad. Por ejemplo, hacer que la carpeta de datos pertenezca al grupo que accede por Samba.
> **Dónde aparece en tu NAS real:** lo usarás al configurar `/srv/nas` para que el grupo correcto pueda escribir en el recurso compartido.

```bash
# Cambiar el dueño de un archivo a "ana"
sudo chown ana respaldo.tar.gz

# Cambiar dueño Y grupo a la vez (formato dueño:grupo)
sudo chown edwar:nas-datos /srv/nas/PolyPaw

# Aplicarlo a una carpeta y TODO su contenido (-R = recursivo)
sudo chown -R edwar:nas-datos /srv/nas
```

> ### 🟦 ¿Que significa? — *Recursivo (-R)*
> "Recursivo" significa "que se aplica también a todo lo que está dentro": la carpeta, sus archivos, sus subcarpetas y los archivos de esas subcarpetas.
> **Para qué sirve:** cambiar permisos o dueño de una carpeta entera de una sola vez, en lugar de archivo por archivo.
> **Dónde aparece en tu NAS real:** lo usarás sobre `/srv/nas` para arreglar el dueño de todos tus respaldos de golpe. Cuidado: con `-R` un error afecta MUCHOS archivos.

> ### 🔎 En tu servidor
> Cuando muevas un respaldo de **tunal-digital**, **RachaSimple** o **Faro/Organizer** al NAS, a veces queda con dueño `root` (porque lo copiaste con `sudo`). Si luego tu usuario o Samba no lo pueden tocar, el culpable suele ser el dueño. Un `sudo chown -R edwar:nas-datos /srv/nas/loquesea` lo arregla.

---

## 5. La estructura de carpetas de Linux: un mapa de polypaw-nas

En Windows todo cuelga de `C:\`. En Linux todo cuelga de una sola raíz llamada `/` (barra). Dentro hay carpetas con nombres estándar, cada una con un propósito. Conocerlas es como tener el mapa de tu servidor.

> ### 🟦 ¿Que significa? — *La raíz `/`*
> Es el punto de partida de TODO el sistema de archivos. No existe un "disco C" o "disco D"; todo (incluidos tus discos) aparece como carpetas dentro de `/`.
> **Para qué sirve:** unifica todo en un solo árbol. Tu SSD del sistema y tu HDD de datos están ambos dentro de `/`, solo que en lugares distintos.
> **Dónde aparece en tu NAS real:** el SSD de 238 GB es la raíz `/`; el HDD de 954 GB aparece "colgado" dentro de `/srv/nas`.

Las cuatro carpetas que más te importan como administrador de NAS:

> ### 🟦 ¿Que significa? — */etc*
> Es la carpeta de **configuración del sistema y los programas**. Casi todo lo que se ajusta vive aquí, en archivos de texto.
> **Para qué sirve:** centraliza la configuración. Si quieres cambiar cómo se comporta un servicio, su archivo casi siempre está en `/etc`.
> **Dónde aparece en tu NAS real:** la configuración de Samba está en `/etc/samba/smb.conf`, y la de AdGuard Home y otros servicios también tiene su lugar bajo `/etc`.

> ### 🟦 ¿Que significa? — */var*
> Viene de "variable". Guarda **datos que cambian constantemente**: registros (logs), colas, datos de algunos servicios.
> **Para qué sirve:** separar lo que cambia mucho de lo que es fijo. Aquí miras los "logs" cuando algo falla.
> **Dónde aparece en tu NAS real:** los registros del sistema viven en `/var/log`. Si Samba o Docker dan problemas, las pistas suelen estar ahí.

> ### 🟦 ¿Que significa? — */home*
> Es donde viven las **carpetas personales de cada usuario**. Tu usuario `edwar` tiene su carpeta en `/home/edwar`.
> **Para qué sirve:** dar a cada persona un espacio propio y privado para sus archivos y su configuración personal.
> **Dónde aparece en tu NAS real:** cuando entras por SSH, empiezas en `/home/edwar`. Es tu "casa" dentro del servidor.

> ### 🟦 ¿Que significa? — */srv*
> Viene de "serve" (servir). Es la carpeta pensada para **los datos que tu servidor ofrece a la red**: archivos compartidos, sitios web, etc.
> **Para qué sirve:** es el lugar "oficial" de Linux para guardar lo que un servidor sirve. Por eso es perfecta para tu NAS.
> **Dónde aparece en tu NAS real:** tu HDD de 954 GB está montado en `/srv/nas`, y ahí vive el recurso compartido **PolyPawNAS** de Samba. Todos tus respaldos y archivos compartidos están aquí.

```bash
# Pasear por el árbol de carpetas
ls /              # Ver la raíz: aquí están etc, var, home, srv...
ls /etc/samba     # Ver la configuración de Samba
ls /srv/nas       # Ver tus datos compartidos en el HDD
ls /home          # Ver qué usuarios tienen carpeta personal

# ¿Dónde estoy parado ahora?
pwd               # "print working directory" = imprime carpeta actual

# Moverme a la carpeta de datos
cd /srv/nas

# Ver cuánto espacio queda en cada disco (h = legible para humanos)
df -h
```

> ### 🟦 ¿Que significa? — *Montar un disco (mount)*
> "Montar" es **conectar un disco a una carpeta** para poder usarlo. El disco no tiene letra; aparece como el contenido de una carpeta que tú eliges.
> **Para qué sirve:** integrar discos al árbol único de Linux. Tu HDD de datos no es "el disco D": es lo que aparece dentro de `/srv/nas`.
> **Dónde aparece en tu NAS real:** tu HDD de 954 GB está **montado en `/srv/nas`**. Si por error no se monta al arrancar, `/srv/nas` aparecería vacío aunque el disco esté lleno.

> ### 🔎 En tu servidor
> Vigila el espacio con `df -h`. Tu SSD del sistema es de solo 238 GB; no guardes respaldos grandes ahí. Los datos pesados (respaldos de PolyPaw, tunal-digital, Faro) van al HDD en `/srv/nas`. Y vigila también la **RAM de 8 GB** con el comando `free -h` (`free` muestra la memoria libre y usada; la `-h` la presenta legible para humanos): si Docker, Samba y AdGuard juntos la llenan, el servidor se pone lento.

---

## 6. Editar archivos de configuración con nano

Como vimos, la configuración de Linux vive en archivos de texto dentro de `/etc`. Para cambiarla necesitas un editor de texto que funcione **dentro de la terminal**, sin ratón. El más amable para principiantes es **nano**.

> ### 🟦 ¿Que significa? — *nano*
> Es un editor de texto sencillo que funciona dentro de la terminal. Muestra los atajos de teclado en la parte de abajo, así que no hay que memorizar nada.
> **Para qué sirve:** editar archivos de configuración (como los de Samba) directamente en el servidor, sin entorno gráfico.
> **Dónde aparece en tu NAS real:** lo usas para tocar `/etc/samba/smb.conf`, ajustar configuraciones o escribir scripts.

```bash
# Abrir el archivo de configuración de Samba con permisos de root
sudo nano /etc/samba/smb.conf
```

Dentro de nano verás abajo una lista de atajos con el símbolo `^`, que significa la tecla **Ctrl**:

- **Ctrl + O** = guardar (la letra O, de "Output"). Te pregunta el nombre; pulsa Enter para confirmar.
- **Ctrl + X** = salir. Si no guardaste, te pregunta si quieres hacerlo.
- **Ctrl + W** = buscar texto dentro del archivo.
- **Ctrl + K** = cortar la línea actual.

> ### 💡 Tip
> Antes de modificar cualquier archivo de configuración importante, **haz una copia de seguridad** con un solo comando. Si rompes algo, restauras la copia y listo:
> ```bash
> sudo cp /etc/samba/smb.conf /etc/samba/smb.conf.respaldo
> ```
> El comando `cp` es "copy" (copiar). Así de fácil te proteges de tus propios errores.

> ### ⚠️ Cuidado
> Un archivo de configuración roto puede impedir que un servicio arranque. Por ejemplo, si dejas mal `smb.conf`, Samba podría no compartir nada. Por eso: copia primero, edita con calma, y guarda solo cuando estés seguro. Después reinicia el servicio y verifica que todo siga funcionando.

> ### 🔎 En tu servidor
> Tras editar la configuración de Samba, aplica los cambios reiniciando el servicio. Linux gestiona los servicios con `systemctl`:
> ```bash
> # Comprobar que la configuración de Samba no tiene errores
> testparm
>
> # Reiniciar Samba para aplicar cambios
> sudo systemctl restart smbd
>
> # Ver si quedó funcionando ("active (running)" = bien)
> sudo systemctl status smbd
> ```

> ### 🟦 ¿Que significa? — *Servicio y systemctl*
> Un **servicio** es un programa que corre en segundo plano todo el tiempo (Samba, AdGuard, Docker). `systemctl` es el comando para arrancarlos, pararlos, reiniciarlos y ver su estado.
> **Para qué sirve:** controlar lo que tu servidor mantiene activo sin que tú estés mirando.
> **Dónde aparece en tu NAS real:** Samba (`smbd`), Cockpit, Tailscale y AdGuard Home corren como servicios. Los administras todos con `systemctl`.

> ### 🟦 ¿Que significa? — *testparm*
> Es una pequeña herramienta de Samba que **revisa el archivo `smb.conf` y avisa si tiene errores** antes de reiniciar el servicio.
> **Para qué sirve:** evita que reinicies Samba con una configuración rota. Si `testparm` dice "Loaded services file OK", puedes reiniciar tranquilo.
> **Dónde aparece en tu NAS real:** lo corres justo después de editar `/etc/samba/smb.conf` y antes de `systemctl restart smbd`.

> ### 🟦 ¿Que significa? — *Docker y Podman (contenedores)*
> Un **contenedor** es una forma de empaquetar un programa con todo lo que necesita para correr, aislado del resto del sistema. **Docker** y **Podman** son dos herramientas que crean y gestionan esos contenedores; Podman es una alternativa a Docker que funciona sin un proceso permanente con permisos de root, lo que algunos consideran más seguro.
> **Para qué sirve:** instalar y ejecutar aplicaciones (como AdGuard Home u otros servicios) sin "ensuciar" el sistema, y poder borrarlas limpiamente. Cada app vive en su cajita.
> **Dónde aparece en tu NAS real:** puedes correr servicios de polypaw-nas dentro de contenedores. Las órdenes de Docker y Podman son casi idénticas, así que lo que aprendas de uno te sirve para el otro.

---

## 7. Seguridad: las reglas de oro de tu polypaw-nas

Ya tienes el poder de root, sabes cambiar permisos y editar configuraciones. Con ese poder viene responsabilidad. Estas son las reglas que protegen tu servidor y tus datos.

**Regla 1 — No abras puertos al internet sin necesidad.** Cada "puerto" abierto hacia internet es una puerta por la que pueden intentar entrar.

> ### 🟦 ¿Que significa? — *Puerto*
> Es un número que identifica un "canal" de comunicación en tu servidor. Cada servicio escucha en un puerto: Cockpit en el **9090**, SSH en el **22**, Samba en otros.
> **Para qué sirve:** permite que distintos servicios convivan en la misma máquina sin mezclarse.
> **Dónde aparece en tu NAS real:** Cockpit está en el puerto 9090. Si lo abres a internet abierto, cualquiera en el mundo podría intentar entrar a tu panel de administración.

> ### 🟦 ¿Que significa? — *Tailscale*
> Es una **VPN** (red privada virtual): crea un túnel cifrado y privado entre tus dispositivos, como si estuvieran en la misma red local aunque estén lejos.
> **Para qué sirve:** acceder a polypaw-nas desde fuera de casa **sin abrir ningún puerto a internet**. Solo tus dispositivos autorizados entran.
> **Dónde aparece en tu NAS real:** es tu forma recomendada de conectarte por SSH o de abrir Cockpit cuando no estás en casa. Mucho más seguro que abrir puertos en el router.

> ### 💡 Tip
> Regla de oro: **prefiere siempre Tailscale antes que abrir puertos en el router.** Con Tailscale, polypaw-nas es invisible para internet, pero tú lo alcanzas desde cualquier lado. Es lo mejor de los dos mundos: acceso remoto y cero exposición pública.

**Regla 2 — Contraseñas fuertes.** Tu usuario tiene `sudo`, o sea root. Una contraseña como `polypaw123` se adivina en segundos. Usa una larga, única, mezclando palabras que solo tú asociarías. Considera además autenticar SSH con llaves en vez de contraseña (lo veremos en otro capítulo).

**Regla 3 — Copias de respaldo.** Tu NAS guarda lo importante: respaldos de tunal-digital, PolyPaw, RachaSimple y Faro/Organizer. Pero **un NAS no es un respaldo por sí solo**: si se daña el HDD, pierdes todo. La regla clásica es **3-2-1**.

> ### 🟦 ¿Que significa? — *Regla de respaldo 3-2-1*
> **3** copias de tus datos, en **2** tipos de medios distintos, con **1** copia fuera de tu casa.
> **Para qué sirve:** sobrevivir a desastres. Si se quema la casa o falla un disco, una copia siempre se salva.
> **Dónde aparece en tu NAS real:** tus datos viven en el HDD de `/srv/nas` (copia 1). Deberías tener al menos otra copia en un disco externo (copia 2) y, idealmente, una en la nube o en otra ubicación (copia 3, fuera de casa).

> ### ⚠️ Cuidado
> No confundas "tener un NAS" con "estar respaldado". Tu polypaw-nas es excelente para centralizar y compartir, pero si es la **única** copia de tus repos y fotos, estás a un disco dañado de perderlo todo. Configura al menos una copia adicional cuanto antes.

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Entiendo por qué Ubuntu Server no tiene escritorio y por qué eso ahorra RAM en mis 8 GB.
- [ ] Sé conectarme a polypaw-nas por SSH (mejor a través de Tailscale).
- [ ] Entiendo qué es root y por qué uso `sudo` en lugar de actuar siempre como root.
- [ ] Pienso antes de presionar Enter en cualquier comando con `sudo`.
- [ ] Sé crear usuarios y grupos, y meter un usuario a un grupo con `usermod -aG`.
- [ ] Sé leer una línea de `ls -l` e identificar dueño, grupo y permisos rwx.
- [ ] Sé cambiar permisos con `chmod` (simbólico y numérico) y dueño con `chown`.
- [ ] Entiendo por qué `chmod 777` es peligroso y lo evito.
- [ ] Sé qué guardan `/etc`, `/var`, `/home` y `/srv` en mi servidor.
- [ ] Entiendo que mi HDD de 954 GB está montado en `/srv/nas`.
- [ ] Sé editar y guardar un archivo con nano (Ctrl+O, Ctrl+X).
- [ ] Hago copia de un archivo de configuración antes de editarlo.
- [ ] Sé reiniciar un servicio con `systemctl` y comprobar `smb.conf` con `testparm`.
- [ ] Entiendo qué es un contenedor (Docker/Podman) y por qué aísla las aplicaciones.
- [ ] Prefiero Tailscale a abrir puertos al internet.
- [ ] Uso contraseñas fuertes y tengo una estrategia de respaldo (3-2-1).

---

## 🧪 Ejercicios

1. 💻 **Reconocimiento.** Conéctate a polypaw-nas por SSH y ejecuta `whoami`, `id` y `groups`. Anota tu usuario, tus grupos y los números de identificación. ¿Apareces en algún grupo relacionado con `sudo`?

2. 💻 **Leer permisos.** Ejecuta `ls -l /srv/nas` y elige un archivo. Escribe en un papel: ¿es archivo o directorio?, ¿quién es el dueño?, ¿quién es el grupo?, y traduce los permisos rwx para dueño, grupo y otros. Verifica también el espacio del HDD con `df -h`.

3. 💻 **Practicar chmod en seguro.** En tu carpeta personal (`cd ~`), crea un archivo de prueba con `touch prueba.sh`. Dale permiso de ejecución al dueño con `chmod u+x prueba.sh` y comprueba con `ls -l` que apareció la `x`. Luego ponlo en `644` y observa el cambio. (Trabajas en tu carpeta, así que no rompes nada del sistema.)

4. 💻 **Explorar el mapa.** Recorre `/etc`, `/var/log`, `/home` y `/srv/nas` con `ls`. En `/etc/samba`, abre `smb.conf` en **solo lectura** (sin `sudo`) con nano, busca el bloque que menciona `PolyPawNAS` usando Ctrl+W, y sal con Ctrl+X **sin guardar**. Solo observa.

5. 💻 **Copia de seguridad de configuración.** Practica el reflejo de seguridad: haz `sudo cp /etc/samba/smb.conf /etc/samba/smb.conf.respaldo` y verifica con `ls -l /etc/samba` que existe la copia. Este es el paso que siempre debes dar antes de editar.

6. **Plan de respaldo en papel.** Sin tocar el servidor, escribe tu plan 3-2-1 para los respaldos de tunal-digital, PolyPaw, RachaSimple y Faro/Organizer: ¿dónde está la copia 1 (en `/srv/nas`)?, ¿qué disco externo será la copia 2?, ¿qué nube o ubicación externa será la copia 3? Define una fecha para montarlo.

---

> Lo lograste. Hoy dejaste de ver Linux como una pantalla negra intimidante y empezaste a verlo como una casa ordenada: sabes quién manda (root y sudo), quién puede entrar a cada cuarto (usuarios, grupos y permisos), dónde está cada cosa (/etc, /var, /home, /srv) y cómo arreglar la configuración sin romper nada (nano, con copia previa). Tu polypaw-nas ya no es magia: es una máquina que entiendes. Nos vemos en el siguiente capítulo. — Bit 🐾
