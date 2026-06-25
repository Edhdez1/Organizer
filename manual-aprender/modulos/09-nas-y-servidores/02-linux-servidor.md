# Capítulo 02 — Linux y la terminal del servidor

> Tu NAS corre **Ubuntu Server**, una versión de Linux **sin escritorio**: se maneja escribiendo
> comandos. Ya viste la terminal en el Módulo 00; aquí la aplicas a administrar un servidor de
> verdad: usuarios, permisos, discos y servicios. Es la base de toda la administración de sistemas.

---

## 1. Por qué Linux y por qué "sin escritorio"

> ### 🟦 ¿Qué significa? — *Linux y "distribución"*
> **Linux** es un sistema operativo (Módulo 00) gratuito, de código abierto y muy estable, que
> domina el mundo de los servidores (la mayoría de internet corre sobre Linux). Viene en muchas
> variantes llamadas **distribuciones** ("distros"): **Ubuntu**, Debian, Fedora… **Ubuntu** es de
> las más populares y fáciles. Tu NAS usa **Ubuntu Server 26.04**.

> ### 🟦 ¿Qué significa? — *Ubuntu Server (sin interfaz gráfica)*
> **Ubuntu Server** es Ubuntu **sin escritorio** (sin ventanas ni ratón): solo terminal. ¿Por
> qué? Porque un servidor no necesita pantalla bonita —nadie está sentado frente a él—, y quitar
> el escritorio **ahorra RAM y recursos** para lo importante: servir. Por eso administras tu NAS
> **por terminal**, normalmente conectándote desde otro equipo (lo verás abajo).

> ### 🟦 ¿Qué significa? — *SSH (conexión remota segura)*
> **SSH** (*Secure Shell*) es la forma estándar de **conectarte a la terminal de un servidor a
> distancia**, de forma cifrada. Desde tu laptop escribes algo como `ssh usuario@polypaw-nas` y
> obtienes la terminal del NAS como si estuvieras frente a él. Es la herramienta nº 1 de cualquier
> administrador. (En tu caso, además, te conectas a través de Tailscale, capítulo 04, lo que lo
> hace seguro incluso desde fuera de casa.)

---

## 2. Usuarios y permisos: el corazón de la seguridad en Linux

Linux fue diseñado para que **muchos usuarios** compartan una máquina sin pisarse ni espiarse.
Eso se basa en usuarios y permisos.

> ### 🟦 ¿Qué significa? — *Usuario y el superusuario `root`*
> Cada persona (o servicio) tiene un **usuario**. Hay uno especial, **`root`**, que es el
> **administrador total**: puede hacer absolutamente todo. Por eso `root` es peligroso: un error
> como `root` puede romper el sistema. Regla de oro: **no trabajes como `root`** a diario.

> ### 🟦 ¿Qué significa? — *`sudo` (hacer algo como administrador)*
> `sudo` ("*superuser do*") ejecuta **un solo comando** con permisos de administrador, pidiéndote
> tu contraseña. Así trabajas como usuario normal (seguro) y solo "subes" a administrador para
> tareas concretas:
> ```bash
> sudo apt update      # actualizar la lista de programas (necesita permisos)
> ```
> Verás `sudo` delante de casi todo comando administrativo. Es el equilibrio entre poder y
> seguridad.

> ### 🟦 ¿Qué significa? — *Permisos de archivos (lectura, escritura, ejecución)*
> Cada archivo y carpeta en Linux tiene permisos que dicen **quién puede leerlo (r), escribirlo
> (w) o ejecutarlo (x)**, para tres grupos: el **dueño**, su **grupo** y **los demás**. Cuando
> haces `ls -l` ves algo así:
> ```
> drwxr-xr-x  edwar  edwar  /srv/nas
> ```
> Esa cadena `rwxr-xr-x` son los permisos. No necesitas memorizarla ahora; lo importante es la
> idea: **Linux controla, archivo por archivo, quién puede hacer qué**. Es lo que evita que un
> usuario lea los datos de otro. (¿Te suena? Es el primo de la RLS del Módulo 07, pero para
> archivos.)

> ### 🟦 ¿Qué significa? — *`chmod` y `chown`*
> - `chmod` cambia los **permisos** de un archivo (quién puede leer/escribir/ejecutar).
> - `chown` cambia el **dueño** de un archivo.
> Se usan al configurar, por ejemplo, qué carpeta puede compartir Samba y quién puede escribir en
> ella. Reconócelos cuando los veas; los detalles se buscan al momento.

---

## 3. Servicios: programas que corren solos en segundo plano

> ### 🟦 ¿Qué significa? — *Servicio (demonio) y `systemd`*
> Un **servicio** (o *daemon*, "demonio") es un programa que corre **en segundo plano**, sin que
> nadie lo abra, atendiendo peticiones: Samba (compartir archivos), AdGuard (DNS), etc. En Ubuntu,
> los servicios los gestiona **`systemd`**, el "director de orquesta" que los arranca al encender
> y los mantiene vivos.
> Se controlan con `systemctl`:
> ```bash
> systemctl status smbd     # ¿está corriendo Samba?
> sudo systemctl restart smbd   # reiniciarlo
> ```
> En tu NAS, `smbd` (Samba) está **activo** como servicio: por eso comparte archivos siempre, sin
> que tengas que "abrirlo".

---

## 4. Ver y entender los discos (los tuyos)

> ### 🟦 ¿Qué significa? — *Sistema de archivos y puntos de montaje*
> En Linux **todo cuelga de una sola raíz `/`** (no hay "C:" ni "D:" como en Windows). Cada disco
> se **"monta"** en una carpeta. Tu HDD de datos está montado en **`/srv/nas`**: entrar a esa
> carpeta es entrar al disco grande. "Montar" = conectar un disco a un punto del árbol de carpetas.

> ### 🟦 ¿Qué significa? — *Comandos para ver discos*
> ```bash
> df -h            # espacio libre/usado por disco, en formato legible
> lsblk            # lista los discos y sus particiones, en árbol
> ```
> `df -h` en tu NAS mostraría el SSD del sistema (~98 GB, 12% usado) y el HDD en `/srv/nas`
> (954 GB, casi vacío). Son los comandos que usas para responder "¿cuánto espacio me queda?".

> ### 🟦 ¿Qué significa? — *LVM (gestión flexible de discos)*
> **LVM** (*Logical Volume Manager*) es una capa que permite manejar el espacio de forma
> **flexible**: agrandar o combinar "volúmenes" sin reparticionar todo. Tu Ubuntu usa LVM para el
> sistema. Por ahora basta saber que existe y que da flexibilidad para crecer; sus detalles se
> aprenden cuando necesitas ampliar espacio.

---

## 5. Mantener el servidor: actualizaciones

> ### 🟦 ¿Qué significa? — *Gestor de paquetes (`apt`)*
> En Linux no descargas instaladores de webs: usas un **gestor de paquetes** que instala programas
> desde repositorios oficiales, con un comando. En Ubuntu es **`apt`**:
> ```bash
> sudo apt update           # refresca la lista de versiones disponibles
> sudo apt upgrade          # actualiza los programas instalados
> sudo apt install programa # instala algo nuevo
> ```
> Mantener el servidor **actualizado** (`update` + `upgrade`) es la tarea de mantenimiento más
> importante: corrige fallos de seguridad. Es como aplicar las actualizaciones del teléfono, pero
> por terminal.

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Sé qué es **Linux**, una **distribución** y por qué **Ubuntu Server** no tiene escritorio.
- [ ] Entiendo **SSH** (conectarme a la terminal del servidor a distancia).
- [ ] Distingo un **usuario** normal de **`root`**, y uso **`sudo`** para tareas administrativas.
- [ ] Entiendo los **permisos** de archivos (rwx, dueño/grupo/otros) y para qué sirven.
- [ ] Sé qué es un **servicio/demonio** y que **`systemd`/`systemctl`** los gestiona (ej. `smbd`).
- [ ] Veo discos con `df -h`/`lsblk` y entiendo el **montaje** (`/srv/nas`) y, a grandes rasgos, LVM.
- [ ] Mantengo el sistema con **`apt update && apt upgrade`**.

---

## 🧪 Ejercicios

Marcados 💻 si requieren conectarte a tu NAS (cuando sepas cómo, capítulo 04) o cualquier Linux.

1. **root y sudo.** Explica por qué es mala idea trabajar siempre como `root` y qué problema
   resuelve `sudo`.
2. **Permisos.** En `rwxr-xr-x`, ¿qué puede hacer el **dueño** y qué pueden hacer **los demás**?
3. **Servicio.** ¿Qué significa que `smbd` esté "activo" como servicio? ¿Por qué no tienes que
   "abrir" Samba cada vez?
4. **Montaje.** Explica qué quiere decir que tu HDD esté "montado en `/srv/nas`".
5. 💻 **Comandos reales.** Cuando te conectes al NAS, ejecuta `df -h` y `lsblk` y anota: ¿cuánto
   espacio libre tiene `/srv/nas`? ¿Cuántos discos ves?
6. 💻 **Actualiza.** Ejecuta `sudo apt update` y observa qué reporta (no hace falta `upgrade` si no
   quieres).

➡️ Siguiente: **[Capítulo 03 — Compartir archivos con Samba](03-samba.md)**.
