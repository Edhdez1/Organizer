# Capitulo 08 — systemd y los servicios

<p align="center">
  <img src="../../recursos/imagenes/09-nas-y-servidores/cap08.png" alt="Ilustración del capítulo (pixel art con Bit)" width="640">
</p>


> Hasta ahora has tratado a tu NAS como si fuera una caja que "simplemente funciona": prendes el laptop **polypaw-nas** y, como por arte de magia, aparece el recurso compartido en la red, el panel web de Cockpit responde en el puerto 9090, Tailscale te deja entrar desde fuera de casa y AdGuard bloquea anuncios. Pero nada de eso es magia: detras hay un director de orquesta llamado **systemd** que enciende, vigila y reinicia cada uno de esos programas. En este capitulo vas a conocer a ese director, aprender a darle ordenes y, sobre todo, a entender que pasa cuando algo no arranca. Bit, el ajolote, te acompaña con su cara de "yo tambien me confundo a veces".

---

## 1. ¿Que es un servicio (un daemon)?

Cuando abres un editor de texto en tu computadora, lo ves: hay una ventana, tu interactuas con el y, cuando terminas, lo cierras. Un **servicio** es lo contrario: es un programa que vive en segundo plano, sin ventana, esperando peticiones y haciendo su trabajo en silencio. Samba espera a que alguien pida archivos. AdGuard espera a que alguien pregunte "¿cual es la direccion de tal pagina?". Ninguno tiene pantalla; trabajan por debajo.

> ### 🟦 ¿Que significa? — *Servicio (daemon)*
> Un **servicio** (en ingles *service* o *daemon*, que se pronuncia "diimon") es un programa que se ejecuta en segundo plano de forma continua, sin que nadie tenga que abrirlo a mano cada vez. Sirve para tareas que deben estar siempre disponibles: compartir archivos, responder DNS, atender un panel web.
> **Donde aparece en polypaw-nas:** practicamente todo lo importante de tu NAS es un servicio. Samba es el servicio `smbd`, AdGuard es `AdGuardHome`, la VPN es `tailscaled`, el panel web es `cockpit`. Tu laptop puede estar con la tapa cerrada y todos esos servicios siguen trabajando.

La palabra "daemon" viene del griego y se refiere a un espiritu que trabaja sin que lo veas. Por eso muchos nombres de servicios en Linux terminan en la letra **d**: `smbd`, `tailscaled`, `sshd`. Esa "d" final significa "daemon".

> ### 💡 Tip
> Si ves un comando o programa que termina en "d" (como `dockerd`, `sshd`, `containerd`), casi seguro estas viendo un servicio que corre en segundo plano. Es una pista visual muy util.

---

## 2. systemd: el director de orquesta

Linux necesita *algo* que arranque todos esos servicios cuando enciendes el equipo, que los apague de forma ordenada cuando lo reinicias, y que decida en que orden empiezan (no tiene sentido arrancar Samba antes de que la red este lista). Ese "algo" es **systemd**.

> ### 🟦 ¿Que significa? — *systemd*
> **systemd** es el primer programa que Linux arranca al encender (tiene el numero 1, el "proceso padre" de todos los demas) y se encarga de iniciar, detener, vigilar y ordenar todos los servicios del sistema. Sirve como gestor central: en lugar de que cada programa se las arregle por su cuenta, systemd los coordina a todos.
> **Donde aparece en polypaw-nas:** es el corazon invisible de tu Ubuntu Server 26.04. Cada vez que tu NAS arranca, systemd lee una lista de servicios que debe encender (Samba, Cockpit, Tailscale, AdGuard, Docker) y los pone en marcha en el orden correcto.

Cada servicio que systemd gestiona se describe en un archivito de texto llamado **unidad** (en ingles, *unit*). Ese archivo dice cosas como "el programa a ejecutar es tal", "si se cae, reincialo", "no arranques hasta que la red este lista".

> ### 🟦 ¿Que significa? — *Unidad (unit)*
> Una **unidad** es un archivo de configuracion que le dice a systemd como gestionar un servicio: que programa ejecutar, cuando arrancarlo, que hacer si falla. Los servicios usan unidades que terminan en `.service`. Sirve para que toda la informacion de un servicio este en un solo lugar ordenado.
> **Donde aparece en polypaw-nas:** el servicio de Samba vive en una unidad llamada `smbd.service`; el de Tailscale en `tailscaled.service`. Tu rara vez editas estos archivos a mano, pero saber que existen te ayuda a entender los mensajes de error.

> ### 🔎 En tu servidor
> Antes de Ubuntu hubo otros sistemas de arranque (uno famoso se llamaba `init` o `SysVinit`). Hoy casi todas las distribuciones grandes —Ubuntu, Debian, Fedora— usan systemd. Asi que lo que aprendas aqui te servira en cualquier servidor moderno, no solo en polypaw-nas.

---

## 3. systemctl: tu control remoto de servicios

`systemd` es el director; **`systemctl`** es el control remoto con el que tu le das ordenes. Es el comando que mas vas a usar en este capitulo. Su forma general es:

```bash
sudo systemctl ACCION nombre-del-servicio
```

> ### 🟦 ¿Que significa? — *systemctl*
> **`systemctl`** (de "system control") es el comando de terminal con el que controlas a systemd: arrancar un servicio, detenerlo, ver si esta vivo, o pedir que arranque solo al encender. Sirve como tu interfaz principal para administrar todo lo que corre en el NAS.
> **Donde aparece en polypaw-nas:** cuando entras a tu NAS por SSH y escribes `sudo systemctl status smbd`, estas usando systemctl para preguntarle a systemd como esta Samba.

### Las cuatro ordenes basicas

**Ver el estado** de un servicio (la orden que mas usaras):

```bash
sudo systemctl status smbd
```

**Arrancar** un servicio que esta apagado:

```bash
sudo systemctl start smbd
```

**Detener** un servicio:

```bash
sudo systemctl stop smbd
```

**Reiniciar** un servicio (detener y volver a arrancar; util tras cambiar su configuracion):

```bash
sudo systemctl restart smbd
```

> ### 🟦 ¿Que significa? — *sudo*
> **`sudo`** significa "hazlo como super-usuario" (el administrador del sistema, llamado *root*). Arrancar o detener servicios afecta a todo el equipo, asi que Linux exige permisos de administrador. Sirve para evitar que cualquiera, o un programa cualquiera, apague servicios sin permiso.
> **Donde aparece en polypaw-nas:** casi todos los comandos de servicios de este capitulo llevan `sudo` delante. Te pedira tu contraseña la primera vez.

> ### 💡 Tip
> Para preguntar el estado (`status`) muchas veces *no* necesitas `sudo`. Pero para arrancar, detener o reiniciar, casi siempre si. Si un comando te responde "Access denied" o "permission denied", lo primero que debes probar es ponerle `sudo` delante.

### Leyendo la salida de `status`

Cuando ejecutas `systemctl status smbd`, lo importante esta en dos lineas. Algo asi:

```
● smbd.service - Samba SMB Daemon
     Loaded: loaded (/usr/lib/systemd/system/smbd.service; enabled)
     Active: active (running) since Fri 2026-06-26 09:14:02 -05; 3h ago
```

- El **circulo verde (●)** y la palabra **`active (running)`** significan "esta vivo y trabajando". Es lo que quieres ver.
- **`enabled`** (lo veremos en la seccion 5) significa que arrancara solo al encender el NAS.
- Si en lugar de `running` vieras `failed` o `dead`, ahi tienes el problema.

> ### 🟦 ¿Que significa? — *active (running) / dead / failed*
> Son los estados en que puede estar un servicio. **`active (running)`** = vivo y funcionando. **`inactive (dead)`** = apagado, pero sin error (alguien lo detuvo o nunca arranco). **`failed`** = intento arrancar y se cayo: algo salio mal. Sirven para diagnosticar de un vistazo.
> **Donde aparece en polypaw-nas:** si un dia no puedes ver tu carpeta compartida, lo primero es `sudo systemctl status smbd`; si dice `failed`, ya sabes por donde empezar a investigar.

---

## 4. journalctl: el cuaderno de bitacora

`systemctl status` te dice *si* un servicio esta bien o mal, pero no siempre te dice *por que*. Para eso esta el diario (el "log") que systemd guarda de todo lo que pasa. Se lee con **`journalctl`**.

> ### 🟦 ¿Que significa? — *Registro / Log*
> Un **registro** (o *log*) es un cuaderno donde los programas van anotando lo que hacen y los errores que encuentran, con fecha y hora. Sirve para investigar problemas: si algo fallo a las 3 de la mañana, el log lo cuenta aunque tu estuvieras dormido.
> **Donde aparece en polypaw-nas:** cada servicio de tu NAS escribe sus mensajes en el diario de systemd. Cuando AdGuard no responde, sus quejas estan ahi esperando que las leas.

> ### 🟦 ¿Que significa? — *journalctl*
> **`journalctl`** (de "journal control", control del diario) es el comando para leer los registros que systemd guarda de todos los servicios. Sirve para investigar por que algo fallo, ver mensajes de arranque y seguir lo que un servicio esta haciendo en tiempo real.
> **Donde aparece en polypaw-nas:** es tu herramienta numero uno de diagnostico. Cuando un servicio dice `failed`, journalctl te muestra las palabras exactas del error.

### Ver el registro de un servicio concreto

La forma mas util: pedir el log de **un solo servicio**, con `-u` (de *unit*, unidad):

```bash
sudo journalctl -u smbd
```

Eso puede ser largo. Para ver solo las ultimas lineas (lo mas reciente, que suele ser donde esta el problema), usa `-n`:

```bash
sudo journalctl -u smbd -n 50
```

Ese comando muestra las **ultimas 50 lineas** del registro de Samba.

### Seguir el registro en vivo

Si quieres ver los mensajes aparecer en tiempo real —por ejemplo, mientras intentas conectarte desde otro equipo— usa `-f` (de *follow*, seguir):

```bash
sudo journalctl -u tailscaled -f
```

La terminal se quedara "escuchando" y mostrara cada mensaje nuevo. Para salir, presiona **Ctrl + C**.

> ### 💡 Tip
> Combinacion ganadora para diagnosticar: primero `systemctl status nombre` para ver el estado, y si esta `failed`, enseguida `journalctl -u nombre -n 50` para leer el error. Casi siempre la causa esta en esas ultimas lineas, escrita con todas sus letras.

> ### 🟦 ¿Que significa? — *Booteo / Boot*
> El **booteo** (o *boot*) es el proceso de encendido del equipo, desde que pulsas el boton hasta que el sistema esta listo. Sirve para referirse a "este arranque" frente a arranques anteriores.
> **Donde aparece en polypaw-nas:** con `sudo journalctl -b` ves solo los mensajes del arranque actual de tu NAS, util para revisar si algo fallo al encender.

```bash
sudo journalctl -b -p err
```

Ese comando muestra solo los mensajes de **error** (`-p err`, de *priority error*) del arranque actual. Es un buen chequeo rapido de salud: si sale poco o nada, tu NAS arranco limpio.

---

## 5. Que un servicio arranque solo al encender

Hay una diferencia que confunde a mucha gente al principio, asi que vamos despacio.

- `systemctl start smbd` arranca Samba **ahora**, pero solo por esta vez. Si reinicias el NAS, Samba podria no volver.
- `systemctl enable smbd` no arranca nada ahora: le dice a systemd **"de ahora en adelante, arranca Samba sola cada vez que el equipo encienda"**.

> ### 🟦 ¿Que significa? — *enable / disable*
> **`enable`** marca un servicio para que arranque automaticamente cada vez que el NAS se enciende. **`disable`** quita esa marca (el servicio ya no arranca solo, aunque puedes arrancarlo a mano). Sirven para decidir que servicios son permanentes.
> **Donde aparece en polypaw-nas:** quieres que Samba, AdGuard, Tailscale y Cockpit esten *enabled*, porque tu NAS debe ofrecer esos servicios siempre, incluso despues de un corte de luz que lo obligue a reiniciar.

Para que un servicio quede activado de forma permanente **y** arranque ahora mismo, hay un atajo muy comodo: `enable --now`:

```bash
sudo systemctl enable --now smbd
```

Eso hace las dos cosas: lo marca para futuros arranques *y* lo enciende en este momento. Su opuesto:

```bash
sudo systemctl disable --now smbd
```

> ### 🔎 En tu servidor
> Tu laptop polypaw-nas tiene una ventaja escondida: **su bateria funciona como una UPS natural**. Si se va la luz en casa, el laptop sigue encendido con su bateria y tus servicios no se interrumpen. Aun asi, conviene tener todo en `enabled`: cuando la bateria se agote del todo o reinicies por una actualizacion, los servicios deben volver solos sin que tu tengas que tocar nada.

> ### 🟦 ¿Que significa? — *UPS*
> Una **UPS** (del ingles *Uninterruptible Power Supply*, fuente de alimentacion ininterrumpida) es una bateria que mantiene un equipo encendido durante un apagon. Sirve para que el servidor no se apague de golpe (lo cual puede corromper archivos).
> **Donde aparece en polypaw-nas:** no compraste una UPS aparte; la bateria interna del Acer Nitro hace ese papel mientras este sana. Tenlo presente: una bateria de laptop no dura para siempre.

> ### ⚠️ Cuidado
> Tu NAS tiene dos discos: el **SSD de 238 GB** donde vive Ubuntu Server (el sistema y los servicios) y el **HDD de 954 GB** montado en `/srv/nas`, donde guardas los datos compartidos. Ese HDD se monta solo al arrancar, y ese montaje tambien depende de systemd. Si ese disco no se monta, **Samba puede arrancar pero compartir una carpeta vacia**. Por eso, si "desaparecieron" tus archivos, revisa primero que el disco este montado (`df -h` y busca `/srv/nas`) antes de culpar a Samba.

---

## 6. Los servicios reales de tu NAS

Vamos uno por uno con los protagonistas de polypaw-nas. Te doy el nombre exacto de cada servicio para que puedas usar `systemctl` y `journalctl` con el.

### 6.1 Samba — `smbd`

> ### 🟦 ¿Que significa? — *Samba (smbd)*
> **Samba** es el programa que permite compartir carpetas en la red para que Windows, Mac, Linux y tu telefono las vean como una unidad de red. Su servicio se llama `smbd`. Sirve para que tu NAS sea, literalmente, un disco compartido en casa.
> **Donde aparece en polypaw-nas:** es el que ofrece tu recurso compartido **PolyPawNAS**, apoyado en el HDD montado en `/srv/nas`. Ahi guardas respaldos de tus proyectos como tunal-digital, PolyPaw, RachaSimple y Faro/Organizer.

```bash
sudo systemctl status smbd
sudo systemctl restart smbd   # tras cambiar la config de Samba
```

### 6.2 Cockpit — `cockpit`

> ### 🟦 ¿Que significa? — *Cockpit*
> **Cockpit** es un panel de administracion que abres en el navegador y te deja ver y manejar el servidor (uso de RAM, discos, servicios, registros) sin escribir comandos. Su servicio principal usa el puerto 9090. Sirve para administrar el NAS con clics en vez de terminal.
> **Donde aparece en polypaw-nas:** lo abres en `https://polypaw-nas:9090` desde tu navegador. Curiosamente, dentro de Cockpit veras estos mismos servicios con botones de start/stop: es systemctl con cara bonita.

```bash
sudo systemctl status cockpit
```

> ### 💡 Tip
> Cockpit usa un mecanismo de "arranque bajo demanda": el puerto 9090 esta escuchando, pero el servicio solo se despierta del todo cuando alguien abre la pagina. No te asustes si en `status` aparece como inactivo mientras nadie lo usa: eso es normal y ahorra esos preciados 8 GB de RAM.

### 6.3 Tailscale — `tailscaled`

> ### 🟦 ¿Que significa? — *Tailscale (tailscaled) y VPN*
> Una **VPN** (red privada virtual) crea un tunel cifrado que conecta tus dispositivos como si estuvieran en la misma red local, aunque esten en ciudades distintas. **Tailscale** es una VPN facil de usar; su servicio es `tailscaled`. Sirve para entrar a tu NAS desde fuera de casa **sin abrir puertos al internet**.
> **Donde aparece en polypaw-nas:** gracias a tailscaled, desde tu telefono en la calle puedes llegar a PolyPawNAS y a Cockpit como si estuvieras en tu sala, de forma segura.

```bash
sudo systemctl status tailscaled
sudo tailscale status   # ver que dispositivos estan conectados a tu red privada
```

### 6.4 AdGuard Home — `AdGuardHome`

> ### 🟦 ¿Que significa? — *AdGuard Home y DNS*
> El **DNS** es la "guia telefonica" de internet: traduce nombres (como `ejemplo.com`) a direcciones numericas. **AdGuard Home** es un servidor DNS que ademas bloquea las direcciones de anuncios y rastreadores. Sirve para que toda tu casa navegue con menos publicidad.
> **Donde aparece en polypaw-nas:** AdGuard responde las consultas DNS de tus dispositivos. Si un dia *toda* la casa se queda sin internet, sospecha de este servicio: si el DNS no responde, parece que "no hay internet" aunque la conexion este bien.

```bash
sudo systemctl status AdGuardHome
```

> ### ⚠️ Cuidado
> AdGuard es un punto unico de fallo para el internet de tu casa: si lo configuraste como el DNS de tu router y el servicio se cae, **nadie podra navegar**. Por eso es buena idea configurar un DNS secundario en el router (por ejemplo `1.1.1.1`) como red de seguridad, y tener mucho cuidado al reiniciar este servicio.

### 6.5 Docker / Podman — `docker`

> ### 🟦 ¿Que significa? — *Docker / Podman (contenedores)*
> Un **contenedor** es una cajita aislada que empaqueta un programa con todo lo que necesita para correr, sin ensuciar el resto del sistema. **Docker** y **Podman** son herramientas para correr contenedores. Sirven para instalar aplicaciones de forma limpia y desmontarlas sin dejar rastro.
> **Donde aparece en polypaw-nas:** los tienes instalados para alojar aplicaciones futuras. El servicio de Docker es `docker`; Podman, en cambio, puede correr sin un servicio permanente, asi que no siempre veras un `podman.service` activo.

> ### ⚠️ Cuidado
> Con solo **8 GB de RAM**, cada contenedor que enciendas come memoria. Vigila con `free -h` o desde Cockpit cuanta RAM queda libre antes de levantar algo nuevo. Si la RAM se agota, Linux empieza a matar servicios al azar para sobrevivir (lo llaman "OOM killer", *Out Of Memory*), y podrias encontrar a Samba o AdGuard `failed` sin causa aparente. La RAM es tu recurso mas escaso en este equipo.

---

## 7. Diagnosticar por que un servicio no arranca

Esta es la parte que de verdad te hace administrador de tu NAS. Cuando algo falla, sigue esta rutina ordenada en lugar de reiniciar a ciegas.

**Paso 1 — Mira el estado.** Empieza siempre aqui:

```bash
sudo systemctl status AdGuardHome
```

Si dice `active (running)`, el servicio esta bien y el problema esta en otro lado (red, router, disco). Si dice `failed` o `dead`, sigue.

**Paso 2 — Lee el error en el diario.** Las ultimas lineas suelen decir la causa exacta:

```bash
sudo journalctl -u AdGuardHome -n 50
```

Busca palabras como `error`, `failed`, `permission denied`, `address already in use` o `no such file`. No tienes que entender cada linea: con encontrar la frase del error suele bastar.

**Paso 3 — Reconoce las causas tipicas.** La mayoria de los fallos caen en una de estas:

- **Puerto ocupado** (`address already in use`): otro programa ya usa ese puerto. Por ejemplo, si Ubuntu tiene su propio resolvedor DNS escuchando en el puerto 53, AdGuard no podra arrancar porque quiere ese mismo puerto.

> ### 🟦 ¿Que significa? — *Puerto*
> Un **puerto** es como una puerta numerada por la que un servicio recibe conexiones. Cada servicio escucha en su puerto: Cockpit en el 9090, el DNS en el 53, Samba en el 445. Sirve para que muchos servicios convivan en una sola direccion sin pisarse.
> **Donde aparece en polypaw-nas:** si dos servicios quieren el mismo puerto, el segundo falla. Por eso conviene saber que puerto usa cada uno.

- **Permisos** (`permission denied`): el servicio no puede leer o escribir un archivo o carpeta que necesita.
- **Configuracion con error de tipeo**: cambiaste un archivo de config y dejaste un error. Suele aparecer como `error parsing config` o similar.
- **Disco no montado**: el servicio depende de `/srv/nas` y el HDD no se monto. Comprueba con `df -h`.

**Paso 4 — Comprueba si esta `enabled`.** A veces el "fallo" es que el servicio simplemente no estaba puesto para arrancar solo:

```bash
sudo systemctl is-enabled AdGuardHome
```

Si responde `disabled`, no es que se rompiera: es que nunca le dijiste que arrancara solo. Solucion: `sudo systemctl enable --now AdGuardHome`.

**Paso 5 — Intenta de nuevo y vuelve a mirar.** Tras corregir la causa:

```bash
sudo systemctl restart AdGuardHome
sudo systemctl status AdGuardHome
```

> ### 💡 Tip
> ¿Que puerto esta ocupado y por quien? Este comando lo dice (con `ss`, una herramienta de red):
> ```bash
> sudo ss -tulpn | grep 53
> ```
> Te muestra que programa esta escuchando en el puerto 53. Cambia el numero para investigar otros puertos.

> ### 🔎 En tu servidor
> Bit el ajolote te recuerda su regla de oro: **nunca reinicies el NAS entero solo porque un servicio falla.** Reiniciar tapa el sintoma pero no enseña nada, y si el problema era de configuracion, volvera. Diagnostica primero el servicio concreto; reiniciar el equipo completo es el ultimo recurso, no el primero.

---

## 8. Seguridad: la parte que no debes saltarte

Administrar servicios es tambien decidir *quien puede llegar a ellos*. Tres reglas que valen mas que cualquier comando:

> ### ⚠️ Cuidado — No abras puertos al internet sin necesidad
> Es tentador "abrir el puerto 9090 en el router" para entrar a Cockpit desde fuera. **No lo hagas.** Un puerto abierto al internet es una puerta que los atacantes de todo el mundo intentaran forzar a toda hora. En vez de eso, usa **Tailscale**: te da acceso remoto seguro y cifrado sin exponer ni un solo puerto. Tailscale primero, abrir puertos casi nunca.

> ### 💡 Tip — Contraseñas fuertes en cada servicio
> Cada servicio tiene su propia puerta: el usuario de Samba, el login de Cockpit, el panel de AdGuard. Ponle a cada uno una contraseña larga y distinta. Un gestor de contraseñas te quita el trabajo de recordarlas. La contraseña "12345" en AdGuard es una invitacion abierta.

> ### ⚠️ Cuidado — Las copias de respaldo no son opcionales
> Tu NAS guarda los respaldos de tunal-digital, PolyPaw, RachaSimple y Faro/Organizer. Pero un NAS **no es un respaldo en si mismo**: si el HDD de 954 GB se daña, lo pierdes todo. La regla clasica es 3-2-1: tres copias, en dos medios distintos, una de ellas fuera de casa. Que polypaw-nas sea tu copia local, no tu unica copia.

> ### 💡 Tip
> Manten Ubuntu Server al dia con `sudo apt update && sudo apt upgrade`. Muchas vulnerabilidades de servicios como Samba se arreglan con actualizaciones. Un servidor sin actualizar es un servidor mas facil de atacar.

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Entiendo que un **servicio (daemon)** es un programa que corre en segundo plano sin ventana.
- [ ] Se que **systemd** es quien arranca y coordina todos los servicios de polypaw-nas.
- [ ] Puedo usar `systemctl status`, `start`, `stop` y `restart` con un servicio.
- [ ] Distingo entre **`start`** (arrancar ahora) y **`enable`** (arrancar solo en cada encendido).
- [ ] Se usar `enable --now` para activar un servicio de forma permanente y encenderlo de una vez.
- [ ] Puedo leer el registro de un servicio con `journalctl -u nombre -n 50`.
- [ ] Conozco los nombres reales de mis servicios: `smbd`, `cockpit`, `tailscaled`, `AdGuardHome`, `docker`.
- [ ] Tengo una rutina para diagnosticar un servicio que no arranca (status → journalctl → causa → reintentar).
- [ ] Entiendo que **8 GB de RAM** es un limite y que quedarme sin memoria puede tumbar servicios.
- [ ] Tengo claro que prefiero **Tailscale** antes que abrir puertos al internet.

---

## 🧪 Ejercicios

1. 💻 **Pasa lista a tus servicios.** Ejecuta `sudo systemctl status` para cada uno: `smbd`, `cockpit`, `tailscaled`, `AdGuardHome`. Anota cual aparece como `active (running)` y cual no. ¿Alguno te sorprende?

2. 💻 **Verifica el arranque automatico.** Con `sudo systemctl is-enabled smbd` (y repitelo con los demas), comprueba que tus servicios clave esten `enabled`. Si alguno importante esta `disabled`, decide si deberia arrancar solo y, si es asi, actualizalo con `enable`.

3. 💻 **Lee un diario en vivo.** Ejecuta `sudo journalctl -u tailscaled -f` y, mientras tanto, conecta o desconecta otro dispositivo de tu red Tailscale (por ejemplo tu telefono). Observa que mensajes aparecen. Sal con Ctrl + C.

4. 💻 **Investiga los puertos.** Usa `sudo ss -tulpn` para ver que servicios estan escuchando y en que puertos. Localiza el 9090 (Cockpit), el 445 (Samba) y el 53 (AdGuard). ¿Que programa aparece en cada uno?

5. 💻 **Simula y diagnostica un fallo controlado.** Detén un servicio no critico (por ejemplo `sudo systemctl stop cockpit`), comprueba con `status` que quedo `inactive`, intenta abrir su pagina web (no cargara) y luego revivelo con `sudo systemctl start cockpit`. Acabas de vivir el ciclo completo de caida y recuperacion sin riesgo. **No** hagas esto con AdGuard si es el DNS de toda tu casa.

6. **Sin computadora — el plan de respaldo.** Escribe en una hoja la regla 3-2-1 aplicada a tus datos: ¿cual es tu copia 1 (polypaw-nas), cual seria la copia 2 y donde estaria la copia 3 fuera de casa? No necesitas ejecutarlo todavia, pero tener el plan por escrito ya es medio camino andado.

---

> Lo lograste. Ahora cuando alguien diga "se cayo el servidor", tu sabras que casi nunca se cae *el servidor*: se cae *un servicio*, y tu ya tienes las tres herramientas para encontrarlo y revivirlo: `systemctl`, `journalctl` y la calma de seguir los pasos en orden. Bit hace un gesto de aprobacion con sus branquias: de usuario de NAS pasaste a administrador de NAS. — Bit 🐾
