# Capitulo 14 — Respaldos, mantenimiento y seguridad

<p align="center">
  <img src="../../recursos/imagenes/09-nas-y-servidores/cap14.png" alt="Ilustración del capítulo (pixel art con Bit)" width="640">
</p>


> Hasta ahora montaste tu `polypaw-nas`, compartiste carpetas con Samba, abriste Cockpit y entraste desde lejos con Tailscale. Felicidades: tienes un servidor casero de verdad. Pero un servidor es como una mascota (hola, Bit el ajolote): no basta con adoptarlo, hay que cuidarlo. En este capitulo vamos a darle de comer respaldos, peinarle las actualizaciones, ponerle un collar de seguridad y enseñarle a aguantar un apagon. Nada de magia: comandos sencillos, explicados uno por uno, para que tu Acer Nitro siga vivo y sano por años.

---

## 1. Por que importa cuidar tu NAS

Tu `polypaw-nas` es un laptop Acer Nitro AN515-54 con un SSD de 238 GB para Ubuntu Server 26.04 y un HDD de 954 GB montado en `/srv/nas` para tus datos. Ahi viven cosas que te importan: copias de tus repos como `tunal-digital`, `PolyPaw`, `RachaSimple` y `Faro/Organizer`, fotos, documentos, lo que sea que guardes por Samba en el recurso `PolyPawNAS`.

Un disco duro se puede morir sin avisar. Un dedo torpe puede borrar la carpeta equivocada. Un corte de luz puede dañar archivos a medio escribir. Y si dejas tu servidor mal cerrado, alguien en internet podria meterse. Cuidarlo es barato; recuperarse de un desastre, no.

> ### 🟦 ¿Que significa? — *NAS*
> NAS son las siglas en ingles de *Network Attached Storage*: "almacenamiento conectado a la red". Es un equipo encendido siempre que guarda archivos y los comparte con otros dispositivos de tu casa.
> **Para que sirve:** tener tus datos centralizados y accesibles desde el celular, la tele o tu PC.
> **Donde aparece en tu NAS real:** tu `polypaw-nas` *es* el NAS. El HDD de 954 GB en `/srv/nas` es donde guarda los datos compartidos.

> ### 🟦 ¿Que significa? — *Respaldo (backup)*
> Una copia de tus datos guardada en otro lugar, para recuperarla si el original se pierde o se daña.
> **Para que sirve:** no llorar cuando un disco falle o borres algo por error.
> **Donde aparece en tu NAS real:** harás copias de `/srv/nas` hacia un disco externo y, si quieres, hacia la nube.

---

## 2. La regla 3-2-1: el mandamiento de los respaldos

Si solo te llevas una idea de este capitulo, que sea esta. La regla 3-2-1 es un resumen sencillo de como NO perder tus datos:

- **3** copias de tus datos (el original + 2 respaldos).
- **2** tipos de medio distintos (por ejemplo, el HDD interno + un disco USB externo).
- **1** copia fuera de casa (en otro lugar fisico o en la nube).

¿Por que tanto? Porque cada copia protege contra un desastre diferente. Si el HDD de tu Nitro muere, tienes el disco USB. Si un robo o un incendio se lleva el laptop *y* el disco USB juntos, tienes la copia que esta fuera de casa.

> ### 🟦 ¿Que significa? — *Medio (de almacenamiento)*
> El soporte fisico donde se guardan los datos: un SSD, un disco duro (HDD), una memoria USB, la nube, etc.
> **Para que sirve:** entender que dos copias en el *mismo* disco no son dos copias de verdad; si el disco muere, mueren las dos.
> **Donde aparece en tu NAS real:** tu Nitro ya tiene dos medios (el SSD de 238 GB y el HDD de 954 GB), pero ambos estan dentro del mismo laptop.

> ### ⚠️ Cuidado
> Tener los datos en el SSD y en el HDD del *mismo* laptop NO cumple la regla 3-2-1. Si se cae el laptop, se moja o se lo roban, pierdes ambos discos de golpe. El respaldo de verdad vive *afuera*.

> ### 🔎 En tu servidor
> Plan realista para `polypaw-nas`:
> - **Copia 1 (original):** `/srv/nas` en el HDD de 954 GB.
> - **Copia 2:** un disco USB externo que conectas una vez por semana.
> - **Copia 3 (fuera de casa):** lo mas crítico (tus repos, documentos importantes) sincronizado a la nube o a un disco que guardas en casa de un familiar.

---

## 3. Copiar datos con `rsync`

`rsync` es la herramienta clasica de Linux para copiar carpetas de forma inteligente. No es como arrastrar archivos a mano: la primera vez copia todo, y las siguientes veces copia *solo lo que cambio*. Eso hace que un respaldo diario tarde segundos en vez de horas.

> ### 🟦 ¿Que significa? — *rsync*
> Un programa de terminal que sincroniza carpetas, copiando solo las diferencias entre origen y destino.
> **Para que sirve:** hacer respaldos rapidos y mantener dos carpetas identicas.
> **Donde aparece en tu NAS real:** lo usarás para copiar `/srv/nas` a tu disco USB externo.

Primero, conecta tu disco USB externo. Ubuntu lo suele montar bajo `/media/`. Para verlo:

```bash
lsblk
```

`lsblk` ("list block devices") lista tus discos y donde estan montados. Imagina que tu disco USB aparece montado en `/media/edwar/RespaldoUSB`. La copia se hace asi:

```bash
sudo rsync -av --delete /srv/nas/ /media/edwar/RespaldoUSB/
```

Veamos cada parte sin miedo:

- `sudo`: ejecutar como administrador, porque `/srv/nas` puede tener archivos protegidos.
- `rsync`: el programa.
- `-a` (archivo): copia conservando permisos, fechas y subcarpetas. Es el modo "copialo tal cual".
- `-v` (verbose): muestra en pantalla lo que va copiando, para que veas que pasa.
- `--delete`: si borraste algo en el origen, lo borra también en el destino, para que sean idénticos.
- `/srv/nas/`: el origen (¡ojo con la `/` final!).
- `/media/edwar/RespaldoUSB/`: el destino.

> ### ⚠️ Cuidado
> La barra `/` al final del origen importa mucho. `/srv/nas/` (con barra) copia el *contenido* de la carpeta. `/srv/nas` (sin barra) copia la carpeta *entera dentro* del destino, creando `/media/edwar/RespaldoUSB/nas/`. Decide cual quieres y se consistente. Si dudas, prueba primero con `--dry-run`, que simula la copia sin tocar nada:
> ```bash
> sudo rsync -av --delete --dry-run /srv/nas/ /media/edwar/RespaldoUSB/
> ```

> ### 💡 Tip
> El parametro `--delete` es poderoso pero filoso: borra en el destino lo que ya no esta en el origen. Si por accidente vacias `/srv/nas` y luego corres el respaldo, ¡vacias también el respaldo! Por eso es buena idea tener mas de una copia y, para datos muy valiosos, respaldos que NO borren (sin `--delete`).

> ### 🟦 ¿Que significa? — *Verbose*
> Modo "hablador": el programa explica en pantalla lo que va haciendo, paso a paso.
> **Para que sirve:** ver el progreso y detectar errores mientras corre.
> **Donde aparece en tu NAS real:** la `-v` de tus comandos `rsync`.

---

## 4. Tareas programadas con `cron`

Un respaldo que dependes de recordar hacer "algún día" no es un respaldo: es una buena intención. Lo que queremos es que el servidor se respalde *solo*. Para eso existe `cron`.

> ### 🟦 ¿Que significa? — *cron*
> El programador de tareas de Linux. Ejecuta comandos automaticamente en horarios que tu defines (cada hora, todos los dias a las 3am, etc.).
> **Para que sirve:** automatizar tareas repetitivas como respaldos o limpieza.
> **Donde aparece en tu NAS real:** lo configurarás para que `polypaw-nas` respalde solo, de madrugada.

Cada usuario tiene su propia lista de tareas, llamada *crontab*. Para editarla:

```bash
crontab -e
```

> ### 🟦 ¿Que significa? — *crontab*
> La tabla de tareas programadas de un usuario: un archivo de texto donde cada linea es "cuando" + "que comando ejecutar".
> **Para que sirve:** guardar tus tareas automaticas.
> **Donde aparece en tu NAS real:** el archivo que editas con `crontab -e` en tu Nitro.

Cada linea de cron tiene cinco campos de tiempo seguidos del comando:

```
┌─ minuto (0-59)
│ ┌─ hora (0-23)
│ │ ┌─ dia del mes (1-31)
│ │ │ ┌─ mes (1-12)
│ │ │ │ ┌─ dia de la semana (0-7, 0 y 7 = domingo)
│ │ │ │ │
* * * * *  comando-a-ejecutar
```

Para respaldar `/srv/nas` todos los dias a las 3:30 de la madrugada (cuando nadie usa el NAS), añade esta linea:

```bash
30 3 * * * rsync -a --delete /srv/nas/ /media/edwar/RespaldoUSB/ >> /var/log/respaldo-nas.log 2>&1
```

Desglosemos lo nuevo:

- `30 3 * * *`: minuto 30, hora 3, cualquier dia, cualquier mes, cualquier dia de la semana → 03:30 cada dia.
- `>> /var/log/respaldo-nas.log`: guarda la salida en un archivo de registro, para revisar despues si todo salio bien.
- `2>&1`: manda también los errores a ese mismo registro.

> ### 💡 Tip
> Si necesitas `sudo` para el respaldo, edita el crontab del root con `sudo crontab -e` en vez del tuyo. Asi se ejecuta con permisos de administrador sin pedir contraseña a las 3:30am (cuando estarás dormido).

> ### ⚠️ Cuidado
> Cron NO encenderá tu laptop si esta apagado, ni lo despertará si esta suspendido. Para un NAS conviene que el Nitro este configurado para no suspenderse con la tapa cerrada. Eso ya lo viste en capitulos anteriores; aqui solo recuerda: si el equipo duerme, los respaldos no corren.

---

## 5. Actualizaciones del sistema con `apt`

Ubuntu recibe parches de seguridad casi cada semana. Aplicarlos es la forma mas barata de tapar agujeros antes de que alguien los aproveche.

> ### 🟦 ¿Que significa? — *apt*
> El gestor de paquetes de Ubuntu (*Advanced Package Tool*). Instala, actualiza y elimina programas del sistema.
> **Para que sirve:** mantener tu software al dia con un par de comandos.
> **Donde aparece en tu NAS real:** lo usas para actualizar Ubuntu Server 26.04 y todos sus programas en `polypaw-nas`.

El ritual de actualizacion son dos comandos:

```bash
sudo apt update
sudo apt upgrade
```

- `apt update`: refresca la *lista* de paquetes disponibles. No actualiza nada todavía; solo se entera de que hay novedades. Piensa en mirar el catalogo nuevo.
- `apt upgrade`: ahora si descarga e instala las versiones nuevas de lo que ya tienes.

> ### 🟦 ¿Que significa? — *Paquete*
> La forma en que Linux empaqueta un programa (con sus archivos y dependencias) para instalarlo limpio.
> **Para que sirve:** instalar y actualizar software sin armar rompecabezas a mano.
> **Donde aparece en tu NAS real:** Samba, Cockpit, AdGuard Home... casi todo en tu NAS llego como paquetes.

Cada cierto tiempo, limpia paquetes viejos que ya nadie usa:

```bash
sudo apt autoremove
```

> ### 💡 Tip
> Para que las actualizaciones *de seguridad* se instalen solas, instala el paquete `unattended-upgrades`:
> ```bash
> sudo apt install unattended-upgrades
> ```
> Aplicará parches criticos sin que tengas que acordarte. Aun asi, entra de vez en cuando a revisar manualmente.

> ### ⚠️ Cuidado
> A veces una actualizacion del *kernel* (el nucleo de Linux) pide reiniciar para tener efecto. Si ves un mensaje sobre "reinicio requerido", reinicia tu NAS en un momento en que nadie lo este usando. Reiniciar es seguro; dejar parches a medio aplicar, no tanto.

---

## 6. Monitorear espacio, memoria y temperatura

Un NAS sano es uno que no se queda sin disco, sin memoria ni se recalienta. Tu Nitro tiene un limite importante a vigilar: **solo 8 GB de RAM**. Si lo llenas de servicios, se pondra lento.

### Espacio en disco

```bash
df -h
```

`df` ("disk free") muestra cuanto espacio te queda en cada disco. La `-h` lo pone en formato humano (GB en vez de bloques). Busca tu HDD de datos: si `/srv/nas` se acerca al 90% lleno, es hora de borrar cosas o ampliar.

> ### 🟦 ¿Que significa? — *RAM*
> Memoria de trabajo del equipo (*Random Access Memory*). Es rapida pero temporal: se borra al apagar. Distinta del disco, que guarda datos de forma permanente.
> **Para que sirve:** ejecutar los programas que estan corriendo *ahora mismo*.
> **Donde aparece en tu NAS real:** tu Nitro tiene 8 GB. Cada contenedor Docker, AdGuard, Samba y Cockpit consumen un pedacito.

### Memoria

```bash
free -h
```

`free` te dice cuanta RAM esta usada y cuanta libre. Si la columna de memoria libre esta casi en cero y el *swap* se usa mucho, tu Nitro esta sufriendo.

> ### 🟦 ¿Que significa? — *Swap*
> Un espacio en el disco que Linux usa como RAM "de emergencia" cuando se le acaba la memoria real.
> **Para que sirve:** evitar que el sistema se cuelgue cuando falta RAM, a costa de ir mas lento (el disco es mucho mas lento que la RAM).
> **Donde aparece en tu NAS real:** con solo 8 GB, si abres demasiados contenedores tu Nitro tirará de swap y se notará lento.

### Temperatura

Como tu NAS es un laptop gamer (Acer Nitro), tiene buenos ventiladores, pero conviene vigilar el calor. Instala `lm-sensors`:

```bash
sudo apt install lm-sensors
sudo sensors-detect
sensors
```

`sensors` te muestra la temperatura del CPU i5-9300H. En reposo deberia estar fresca (40-55°C); bajo carga puede subir, pero si pasa de los 85-90°C de forma sostenida, revisa que no este tapado de polvo o ahogado en una superficie blanda.

> ### 🔎 En tu servidor
> Cockpit (el panel web en el puerto 9090) te muestra disco, memoria y carga del CPU en graficas, sin teclear comandos. Para una mirada rapida, abre `https://polypaw-nas:9090` desde tu navegador. Para revisar a fondo o desde scripts, usa los comandos de terminal.

> ### 💡 Tip
> El comando `htop` (instalalo con `sudo apt install htop`) te da una vista en vivo, colorida y ordenable de procesos, RAM y CPU. Es perfecto para cazar al programa que se esta comiendo tus 8 GB.

---

## 7. Contraseñas fuertes y SSH con llave

Aqui empieza la parte de seguridad de verdad. La puerta de entrada a tu NAS por terminal se llama SSH, y como cualquier puerta, conviene un buen candado.

> ### 🟦 ¿Que significa? — *SSH*
> *Secure Shell*: el protocolo que usas para conectarte a la terminal de tu NAS desde otra computadora, de forma cifrada.
> **Para que sirve:** administrar `polypaw-nas` a distancia escribiendo comandos.
> **Donde aparece en tu NAS real:** cada vez que haces `ssh edwar@polypaw-nas`.

### Primero, contraseñas fuertes

Una contraseña fuerte es larga (12+ caracteres), unica y dificil de adivinar. Mejor aun: una *frase* de varias palabras que solo tu recuerdes. Nunca reutilices la del correo en el servidor.

> ### 💡 Tip
> Usa un gestor de contraseñas (como Bitwarden o KeePassXC) para generar y guardar claves largas que ni tu memorizas. Asi cada servicio tiene su propia clave imposible de adivinar.

### Mejor que contraseña: llaves SSH

Una *llave SSH* es un par de archivos: una clave **privada** que se queda en TU computadora (jamas se comparte) y una **pública** que copias al servidor. Para entrar, ambas tienen que encajar, como una cerradura y su llave fisica. Es muchisimo mas seguro que una contraseña, porque nadie puede adivinar una llave.

> ### 🟦 ¿Que significa? — *Llave SSH (par de claves)*
> Dos archivos matematicamente ligados: la clave privada (secreta, en tu PC) y la pública (se instala en el servidor). Solo quien tiene la privada puede entrar.
> **Para que sirve:** entrar al NAS sin escribir contraseña y de forma mucho mas segura.
> **Donde aparece en tu NAS real:** la pública vivirá en `~/.ssh/authorized_keys` dentro de `polypaw-nas`.

Desde TU computadora (no desde el NAS), genera el par:

```bash
ssh-keygen -t ed25519 -C "edwar-laptop"
```

`-t ed25519` elige un tipo de llave moderno y seguro; `-C` solo le pone una etiqueta para que recuerdes de que equipo es. Acepta la ruta por defecto y, opcionalmente, ponle una frase de paso a la llave.

Ahora copia la llave pública a tu NAS:

```bash
ssh-copy-id edwar@polypaw-nas
```

Te pedirá tu contraseña *esta última vez*. A partir de ahora entrarás sin contraseña, con la llave.

### Apagar el acceso por contraseña

Cuando confirmes que entras con la llave, desactiva el ingreso por contraseña para que nadie pueda intentar adivinarla. Edita la configuracion de SSH:

```bash
sudo nano /etc/ssh/sshd_config
```

Busca y deja estas lineas asi (quita el `#` si lo tienen delante):

```
PasswordAuthentication no
PermitRootLogin no
```

`PermitRootLogin no` impide entrar directo como el superusuario root, otra puerta que conviene cerrar. Guarda y reinicia el servicio:

```bash
sudo systemctl restart ssh
```

> ### ⚠️ Cuidado
> NO desactives `PasswordAuthentication` antes de comprobar que tu llave funciona. Abre una segunda terminal y verifica que entras sin contraseña *antes* de cerrar la sesion actual. Si te equivocas y cierras todo, podrias quedarte fuera de tu propio NAS. (Tranquilo: siempre puedes conectar pantalla y teclado al laptop para arreglarlo.)

> ### 🔎 En tu servidor
> Como tu Nitro es fisicamente accesible (lo tienes en casa), si algo sale mal con SSH siempre puedes abrir la tapa, conectar teclado y entrar localmente. Esa es una ventaja de un NAS casero sobre uno en la nube.

---

## 8. Un firewall basico con `ufw`

Un firewall decide que conexiones entran y salen de tu NAS. Por defecto Ubuntu Server no trae uno activo de forma sencilla; `ufw` lo hace facil.

> ### 🟦 ¿Que significa? — *Firewall (cortafuegos)*
> Un guardia que revisa cada conexion que intenta entrar o salir y la deja pasar o la bloquea segun tus reglas.
> **Para que sirve:** cerrar puertas que no usas para que nadie se cuele por ellas.
> **Donde aparece en tu NAS real:** lo activarás en `polypaw-nas` para permitir solo lo necesario (SSH, Samba en tu red, Cockpit, AdGuard).

> ### 🟦 ¿Que significa? — *ufw*
> *Uncomplicated Firewall*: una forma sencilla de configurar el firewall de Linux con comandos en español llano (allow = permitir, deny = denegar).
> **Para que sirve:** poner reglas de firewall sin pelearte con la sintaxis complicada de `iptables`.
> **Donde aparece en tu NAS real:** sera tu cortafuegos en el Nitro.

> ### 🟦 ¿Que significa? — *Puerto*
> Un numero que identifica un servicio dentro de un equipo. Como las puertas numeradas de un edificio: SSH usa la 22, Cockpit la 9090, etc.
> **Para que sirve:** dirigir cada tipo de conexion al programa correcto.
> **Donde aparece en tu NAS real:** Cockpit escucha en el 9090, SSH en el 22, AdGuard en el 53 (el puerto del DNS, el sistema que traduce nombres de webs a direcciones; lo viste en el capitulo de AdGuard), Samba en 139 y 445.

Configuracion paso a paso. Primero define la politica por defecto: bloquear todo lo que entra, permitir todo lo que sale.

```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
```

Ahora abre solo lo que de verdad necesitas. Importante: limita Samba y Cockpit a tu red local de casa (suponiendo que sea `192.168.1.0/24`; ajusta el rango al tuyo):

```bash
sudo ufw allow ssh
sudo ufw allow from 192.168.1.0/24 to any port 445 proto tcp
sudo ufw allow from 192.168.1.0/24 to any port 9090 proto tcp
```

La primera linea permite SSH. Las otras dos permiten Samba (445) y Cockpit (9090) **solo desde dispositivos de tu casa**, no desde internet. Finalmente, activa el firewall:

```bash
sudo ufw enable
sudo ufw status verbose
```

`ufw status verbose` te muestra todas las reglas activas para revisar que quedaron bien.

> ### ⚠️ Cuidado — la regla de oro de la seguridad
> **NO abras puertos hacia internet a menos que sea absolutamente necesario.** Cada puerto abierto al mundo es una puerta que alguien puede tocar. Para acceder a tu NAS desde fuera de casa, usa **Tailscale**, no abras puertos en tu router. Tailscale crea un tunel privado y cifrado sin exponer nada al internet abierto.

> ### 🟦 ¿Que significa? — *Tailscale (VPN)*
> Una VPN (red privada virtual) que conecta tus dispositivos entre si como si estuvieran en la misma red local, aunque esten en lugares distintos, sin abrir puertos en el router.
> **Para que sirve:** acceder a tu NAS desde el celular o el trabajo de forma segura, sin exponerlo a internet.
> **Donde aparece en tu NAS real:** ya tienes Tailscale instalado en `polypaw-nas`. Por eso puedes llegar a Cockpit y Samba desde lejos sin tocar el router.

> ### 💡 Tip
> Si usas Tailscale para todo el acceso remoto, tu firewall puede ser muy estricto de cara a internet: no necesitas abrir Cockpit ni Samba al mundo *en absoluto*. Tailscale te lleva por dentro. Es la combinacion mas segura y comoda para un NAS casero.

---

## 9. Que hacer si se va la luz: la bateria como UPS

Un corte de luz mientras el servidor escribe en disco puede corromper archivos. Por eso los NAS profesionales usan una UPS.

> ### 🟦 ¿Que significa? — *UPS*
> *Uninterruptible Power Supply*, en español "sistema de alimentacion ininterrumpida". Una bateria que mantiene encendido el equipo unos minutos cuando se corta la luz, dando tiempo a apagarlo bien.
> **Para que sirve:** evitar apagones bruscos que dañan datos y discos.
> **Donde aparece en tu NAS real:** ¡tu Nitro ya tiene una! La bateria del laptop *es* tu UPS natural.

Esta es una de las grandes ventajas de usar un laptop como NAS: si se va la luz, el Nitro sigue funcionando con su bateria, mientras una PC de escritorio se apagaria de golpe. Tu servidor aguanta el bajon sin perder ni un byte.

> ### 💡 Tip
> Revisa la salud de la bateria de tu Nitro de vez en cuando:
> ```bash
> upower -i $(upower -e | grep BAT)
> ```
> Busca la linea `capacity`: te dice cuanta vida le queda a la bateria comparada con cuando era nueva. Si baja mucho con los años, durará menos en un apagon.

> ### ⚠️ Cuidado
> Una bateria de laptop encendida 24/7 y siempre al 100% se desgasta. Si tu modelo de Acer Nitro lo permite (revisa la BIOS o herramientas de Acer), puedes limitar la carga maxima al 80% para alargar la vida de la bateria. No es obligatorio, pero ayuda.

> ### 🔎 En tu servidor
> Aunque tu bateria aguante el corte, configura un apagado limpio si la bateria baja de cierto nivel durante un apagon largo. El paquete `upower` ya monitorea la bateria; en capitulos avanzados puedes crear una regla que ejecute `sudo shutdown` automaticamente cuando quede poca carga. Por ahora, con saber que tu Nitro sobrevive a los cortes cortos vas muy bien.

---

## 10. Una rutina de mantenimiento sencilla

No necesitas hacer todo a diario. Aqui una rutina realista para `polypaw-nas`:

- **Diario (automatico):** respaldo con cron a las 3:30am; actualizaciones de seguridad con `unattended-upgrades`.
- **Semanal (5 minutos):** conectar el disco USB y confirmar que el respaldo corrio (revisa `/var/log/respaldo-nas.log`); mirar Cockpit para ver disco, RAM y temperatura.
- **Mensual (15 minutos):** `sudo apt update && sudo apt upgrade` a mano por si algo quedo pendiente; `df -h` para vigilar el espacio; `sudo apt autoremove` para limpiar; revisar la salud de la bateria.
- **Cada tanto:** verificar que de verdad puedes *restaurar* un respaldo (un respaldo que nunca probaste a recuperar no es un respaldo confiable).

> ### 💡 Tip
> Bit el ajolote dice: "Un respaldo que nunca probaste es como un paracaidas que nunca empacaste bien: te enteras de que falla justo cuando lo necesitas." Una vez al mes, copia un archivo desde tu respaldo de vuelta y abrelo, solo para confirmar que todo esta sano.

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Entiendo la regla 3-2-1 y por que dos copias en el mismo laptop no cuentan.
- [ ] Se hacer una copia de `/srv/nas` con `rsync` y entiendo que hacen `-a`, `-v` y `--delete`.
- [ ] Se programar un respaldo automatico con `cron` (`crontab -e`).
- [ ] Se actualizar Ubuntu con `apt update` y `apt upgrade`, y se que a veces hay que reiniciar.
- [ ] Puedo revisar espacio (`df -h`), memoria (`free -h`) y temperatura (`sensors`), y se que 8 GB de RAM es mi limite.
- [ ] Cree una llave SSH y entro a mi NAS sin contraseña.
- [ ] Se desactivar el login por contraseña y por root con cuidado (probando la llave primero).
- [ ] Active `ufw` permitiendo solo lo necesario y limitando Samba/Cockpit a mi red local.
- [ ] Entiendo por que NO debo abrir puertos a internet y prefiero Tailscale para el acceso remoto.
- [ ] Se que la bateria de mi Nitro funciona como UPS y como revisar su salud.

---

## 🧪 Ejercicios

1. **💻 Tu primer respaldo manual.** Conecta un disco USB a tu `polypaw-nas`, averigua con `lsblk` donde quedo montado y haz una copia de prueba de una subcarpeta de `/srv/nas` con `rsync -av` (sin `--delete` la primera vez). Verifica que los archivos llegaron al destino.

2. **💻 Simulacion antes de borrar.** Repite el respaldo anterior pero añadiendo `--dry-run` y `--delete`. Lee la salida con calma: ¿que archivos *borraria* en el destino? Asegurate de entender el resultado antes de correrlo de verdad.

3. **💻 Respaldo automatico.** Abre tu crontab con `crontab -e` y programa el respaldo de `/srv/nas` todos los dias a una hora en que no uses el NAS. Guarda la salida en un log. Al dia siguiente, revisa el log para confirmar que corrio.

4. **💻 Llave SSH.** Desde tu computadora personal genera una llave con `ssh-keygen -t ed25519`, copiala al NAS con `ssh-copy-id` y comprueba que entras sin contraseña. (No desactives todavia el login por contraseña hasta estar 100% seguro.)

5. **💻 Firewall a tu medida.** Averigua el rango de tu red local de casa (algo como `192.168.x.0/24`) y configura `ufw` para permitir SSH, y Samba/Cockpit solo desde esa red. Activa el firewall y revisa las reglas con `sudo ufw status verbose`.

6. **Plan 3-2-1 en papel.** Sin tocar la terminal, escribe en una nota tu plan de respaldo concreto: ¿cuales son tus 3 copias?, ¿que 2 medios usas?, ¿cual copia esta fuera de casa? Piensa que repos y carpetas (`tunal-digital`, `Faro/Organizer`, fotos...) son los mas valiosos y merecen la copia fuera de casa.

---

> Y con esto, tu `polypaw-nas` no solo funciona: esta cuidado. Respaldos automaticos, sistema al dia, llaves en vez de contraseñas, un firewall que cierra las puertas que no usas, Tailscale en vez de exponerlo al internet, y una bateria que lo protege de los apagones. Bit el ajolote esta orgulloso: un NAS sano es un NAS feliz, y un dueño que duerme tranquilo sabiendo que sus datos estan a salvo. En el proximo capitulo seguiremos sumando capas a tu servidor casero.
