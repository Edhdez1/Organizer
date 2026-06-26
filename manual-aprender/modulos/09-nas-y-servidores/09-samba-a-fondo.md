# Capitulo 09 — Samba a fondo: compartir archivos

<p align="center">
  <img src="../../recursos/imagenes/09-nas-y-servidores/cap09.png" alt="Ilustración del capítulo (pixel art con Bit)" width="640">
</p>


> Hasta ahora tu servidor **polypaw-nas** (el laptop Acer Nitro AN515-54 con Ubuntu Server 26.04) ha estado encendido haciendo cosas por dentro. En este capitulo le damos su trabajo mas importante: convertirse en un disco gigante que toda tu casa puede usar. Vas a arrastrar un archivo desde tu Windows, soltarlo en una carpeta de red, y que ese archivo aterrice en el HDD de 954 GB montado en `/srv/nas`. Sin cables USB, sin pasarte una memoria de mano en mano. Bit, nuestro ajolote, ya tiene las branquias puestas para nadar entre carpetas compartidas. Vamos con calma, definiendo cada palabra rara antes de usarla.

## 1. ¿Que es Samba y por que lo necesitas?

Imagina que tu HDD de 954 GB es un almacen enorme dentro de polypaw-nas. El problema es que ese almacen esta **dentro** del laptop, y tu PC de escritorio, tu Mac o tu telefono no pueden meter la mano ahi por arte de magia. Necesitan una puerta, un idioma comun y un guardia que decida quien entra. Eso, en conjunto, es lo que ofrece Samba.

> ### 🟦 ¿Que significa? — *Samba*
> Samba es un programa que hace que las carpetas de tu servidor Linux aparezcan como **carpetas de red** que cualquier dispositivo de la casa puede abrir, como si fueran una unidad mas. **Para que sirve:** compartir archivos entre computadoras sin pasar memorias USB. **Donde aparece en tu NAS:** ya esta instalado en polypaw-nas; su recurso compartido se llama **PolyPawNAS** y apunta a `/srv/nas`.

> ### 🟦 ¿Que significa? — *SMB (protocolo)*
> SMB (Server Message Block) es el **idioma** que hablan las computadoras para pedirse archivos por la red: "dame este archivo", "guarda este otro", "lista esta carpeta". **Para que sirve:** es el estandar que usa Windows desde hace decadas para compartir carpetas. **Donde aparece en tu NAS:** Samba es la version libre de ese idioma; cuando escribes `\\polypaw-nas\PolyPawNAS` en Windows, estas hablando SMB con tu servidor.

> ### 🟦 ¿Que significa? — *Protocolo*
> Un protocolo es un conjunto de reglas acordadas para que dos maquinas se entiendan, igual que dos personas acuerdan hablar espanol antes de conversar. **Para que sirve:** sin reglas comunes, una computadora enviaria datos que la otra no sabria leer. **Donde aparece en tu NAS:** SMB, SSH, DNS y HTTP son todos protocolos que viven en polypaw-nas.

> ### 🟦 ¿Que significa? — *Recurso compartido (share)*
> Un recurso compartido es una carpeta especifica que decides ofrecer a la red, con un nombre publico. **Para que sirve:** no compartes todo el disco, solo la carpeta que tu eliges. **Donde aparece en tu NAS:** tu recurso se llama **PolyPawNAS** y por dentro es la carpeta `/srv/nas`.

> ### 💡 Tip
> "Samba" es el programa instalado en el servidor; "SMB" es el idioma que habla. La gente usa ambos nombres como sinonimos en conversaciones, pero ahora tu sabes la diferencia fina: Samba *implementa* SMB.

Antes de tocar nada, comprueba que Samba esta vivo en tu servidor:

```bash
systemctl status smbd
```

> ### 🟦 ¿Que significa? — *smbd*
> `smbd` es el **demonio** (el programa de fondo) de Samba que atiende las peticiones de archivos. La "d" final significa *daemon*. **Para que sirve:** es el que realmente entrega y recibe los archivos. **Donde aparece en tu NAS:** corre permanentemente en polypaw-nas; si esta detenido, nadie puede acceder a PolyPawNAS.

> ### 🟦 ¿Que significa? — *Demonio (daemon)*
> Un demonio es un programa que corre en segundo plano, sin ventana ni interaccion directa, esperando para hacer su trabajo cuando se le necesita. **Para que sirve:** servicios como Samba, SSH o el cortafuegos viven asi, siempre listos pero invisibles. **Donde aparece en tu NAS:** `smbd` es uno de los muchos demonios que conviven en polypaw-nas junto a los de Docker, Tailscale y AdGuard.

> ### 🟦 ¿Que significa? — *systemctl*
> `systemctl` es el comando con el que enciendes, apagas, reinicias o consultas el estado de los servicios (demonios) del sistema en Ubuntu. **Para que sirve:** controlar Samba y cualquier otro servicio sin tener que reiniciar el laptop entero. **Donde aparece en tu NAS:** lo usas con `smbd` (`systemctl status smbd`, `systemctl restart smbd`) y tambien con Docker, Tailscale o el cortafuegos.

Si ves la palabra `active (running)` en verde, Samba esta despierto. Si ves `inactive` o `failed`, lo arrancamos asi:

```bash
sudo systemctl enable --now smbd
```

> ### 🔎 En tu servidor
> Como polypaw-nas solo tiene **8 GB de RAM** (es un Acer Nitro AN515-54 con procesador Intel i5-9300H), conviene saber que Samba es ligero: en reposo consume muy poca memoria. No es Samba lo que te va a apretar la RAM, sino Docker/Podman, Cockpit (el panel web en el puerto **:9090**) y AdGuard sumados. Aun asi, vigila el conjunto con `free -h` de vez en cuando, o mira los graficos de RAM y CPU directamente en Cockpit, entrando a `https://polypaw-nas:9090`.

## 2. El disco de datos: por que `/srv/nas`

Tu laptop tiene dos discos: el SSD de 238 GB donde vive Ubuntu (el sistema) y el HDD de 954 GB para datos. **No** queremos compartir carpetas del sistema; queremos compartir el disco grande, que esta montado en `/srv/nas`.

> ### 🟦 ¿Que significa? — *Montar (mount)*
> Montar es conectar un disco a una carpeta para poder usarlo. En Linux los discos no tienen letra (como `D:` en Windows); en cambio "aparecen" dentro de una carpeta. **Para que sirve:** asi tu HDD de 954 GB se ve y se usa como si fuera la carpeta `/srv/nas`. **Donde aparece en tu NAS:** tu HDD esta montado en `/srv/nas`; todo lo que guardes ahi va al disco de 954 GB, no al SSD del sistema.

> ### 🟦 ¿Que significa? — *`/srv`*
> `/srv` es una carpeta estandar de Linux pensada para "datos servidos a la red" (de ahi la "srv" de *serve*). **Para que sirve:** es el lugar logico y ordenado para los datos que tu NAS sirve. **Donde aparece en tu NAS:** ahi colgaste tu disco de datos como `/srv/nas`.

Confirma que el disco grande esta montado donde crees:

```bash
df -h /srv/nas
```

> ### 🟦 ¿Que significa? — *`df -h`*
> `df` (disk free) muestra cuanto espacio libre y usado tiene cada disco; la `-h` lo pone en formato humano (GB en vez de numeros enormes). **Para que sirve:** saber cuanto te queda en el HDD. **Donde aparece en tu NAS:** la linea de `/srv/nas` debe mostrar cerca de 954G de tamano total.

> ### ⚠️ Cuidado
> Si `df -h /srv/nas` muestra un tamano pequeno (como 238G, el del SSD del sistema), significa que el HDD **no esta montado** y estarias compartiendo una carpeta vacia en el SSD del sistema. En ese caso, revisa `/etc/fstab` antes de seguir. Compartir sin que el disco este montado llena el SSD de 238 GB del sistema sin querer.

> ### 🟦 ¿Que significa? — *`/etc/fstab`*
> `/etc/fstab` es el archivo que le dice a Linux que discos montar automaticamente al arrancar, y en que carpeta. **Para que sirve:** que tu HDD de 954 GB aparezca solo en `/srv/nas` cada vez que enciendes polypaw-nas, sin montarlo a mano. **Donde aparece en tu NAS:** si tras un reinicio `/srv/nas` se ve vacio o pequeno, casi siempre es porque falta o esta mal su linea en `/etc/fstab`.

Crea la carpeta de datos si aun no existe y deja un archivo de prueba:

```bash
sudo mkdir -p /srv/nas
sudo touch /srv/nas/hola-desde-polypaw.txt
ls -l /srv/nas
```

## 3. El corazon: `/etc/samba/smb.conf`

Toda la configuracion de Samba vive en un solo archivo de texto. Aprender a leerlo es el 80% de dominar Samba.

> ### 🟦 ¿Que significa? — *`/etc/samba/smb.conf`*
> Es el archivo de configuracion de Samba. `/etc` es la carpeta de Linux donde viven los archivos de ajustes de los programas. **Para que sirve:** ahi defines que carpetas compartes, quien puede entrar y con que permisos. **Donde aparece en tu NAS:** es el unico archivo que editaras para crear o cambiar el recurso PolyPawNAS.

Antes de tocarlo, **siempre** haz una copia de seguridad. Si rompes este archivo, Samba no arranca.

```bash
sudo cp /etc/samba/smb.conf /etc/samba/smb.conf.bak
```

> ### 💡 Tip
> El `.bak` es una convencion para "copia de respaldo" (*backup*). Si algo sale mal, restauras con `sudo cp /etc/samba/smb.conf.bak /etc/samba/smb.conf`. Bit dice: nadie ha lamentado nunca tener una copia de mas.

Ahora abre el archivo con un editor de terminal:

```bash
sudo nano /etc/samba/smb.conf
```

> ### 🟦 ¿Que significa? — *nano*
> nano es un editor de texto sencillo dentro de la terminal. **Para que sirve:** modificar archivos de configuracion sin salir de la terminal. **Donde aparece en tu NAS:** lo usaras cada vez que ajustes Samba. Para guardar pulsas `Ctrl+O` y `Enter`; para salir, `Ctrl+X`.

El archivo tiene dos partes: una seccion `[global]` (ajustes generales) y luego una seccion por cada recurso compartido, entre corchetes.

### La seccion global

```ini
[global]
   workgroup = WORKGROUP
   server string = polypaw-nas
   server role = standalone server
   map to guest = never
   log file = /var/log/samba/log.%m
   max log size = 1000
```

> ### 🟦 ¿Que significa? — *`[global]`*
> Es la seccion donde pones ajustes que afectan a **todo** Samba, no a un recurso en concreto. **Para que sirve:** definir el nombre del grupo de trabajo, los registros y el comportamiento general. **Donde aparece en tu NAS:** es la primera seccion de tu `smb.conf`.

> ### 🟦 ¿Que significa? — *workgroup (grupo de trabajo)*
> Es un nombre que agrupa computadoras de una red casera para que se vean entre si en Windows. **Para que sirve:** que tu PC encuentre el servidor en el explorador de red. **Donde aparece en tu NAS:** por defecto es `WORKGROUP`, el mismo que usa Windows de fabrica; dejalo asi salvo que lo hayas cambiado en tus PCs.

> ### 🟦 ¿Que significa? — *`map to guest = never`*
> Le dice a Samba: nunca dejes entrar a un "invitado" anonimo; siempre exige usuario y contrasena. **Para que sirve:** seguridad. **Donde aparece en tu NAS:** en `[global]`; es la diferencia entre que cualquiera de la red lea tus archivos o solo quien tu autorices.

> ### ⚠️ Cuidado
> Hay tutoriales viejos que ponen `guest ok = yes` para "facilitar" el acceso. Eso significa **abrir tus archivos a cualquiera** que se conecte a tu red, sin contrasena. En polypaw-nas no lo hagas: tus respaldos de **Faro/Organizer**, **PolyPaw** o **tunal-digital** merecen una contrasena de verdad.

### La seccion del recurso PolyPawNAS

Ahora, al final del archivo, define tu recurso:

```ini
[PolyPawNAS]
   comment = Disco de datos de polypaw-nas
   path = /srv/nas
   browseable = yes
   read only = no
   valid users = edwar
   create mask = 0664
   directory mask = 0775
```

Vamos linea por linea, porque cada una importa:

> ### 🟦 ¿Que significa? — *`[PolyPawNAS]`*
> El texto entre corchetes es el **nombre publico** del recurso, el que veras en la red. **Para que sirve:** identificar la carpeta compartida. **Donde aparece en tu NAS:** es exactamente lo que escribes en `\\polypaw-nas\PolyPawNAS` desde Windows.

> ### 🟦 ¿Que significa? — *`path`*
> Es la carpeta real del servidor que se comparte. **Para que sirve:** conecta el nombre publico (PolyPawNAS) con la carpeta fisica. **Donde aparece en tu NAS:** apunta a `/srv/nas`, es decir, tu HDD de 954 GB.

> ### 🟦 ¿Que significa? — *`browseable`*
> Con `yes`, el recurso aparece listado cuando alguien explora la red; con `no`, existe pero esta "escondido" (hay que escribir su nombre a mano). **Para que sirve:** comodidad o discrecion. **Donde aparece en tu NAS:** en `yes` para que lo veas facil al empezar.

> ### 🟦 ¿Que significa? — *`read only = no`*
> Controla si la gente solo puede **leer** o tambien **escribir/borrar**. `no` significa "no es solo lectura", o sea, **si** se puede escribir. **Para que sirve:** decidir si el recurso es de consulta o tambien para guardar. **Donde aparece en tu NAS:** en `no` para poder subir tus respaldos al HDD.

> ### 🟦 ¿Que significa? — *`valid users`*
> La lista de usuarios autorizados a entrar a este recurso. **Para que sirve:** que solo tu (o quien decidas) acceda. **Donde aparece en tu NAS:** pon tu usuario real (en estos ejemplos uso `edwar`; cambialo por el tuyo).

> ### 🟦 ¿Que significa? — *`create mask` y `directory mask`*
> Definen los permisos que tendran los archivos (`0664`) y carpetas (`0775`) nuevos que se creen por la red. Son los numeros de permisos de Linux. **Para que sirve:** que los archivos subidos queden con permisos sensatos. **Donde aparece en tu NAS:** en tu recurso; `0664` = el dueno y su grupo escriben, los demas leen.

Guarda con `Ctrl+O`, `Enter`, y sal con `Ctrl+X`.

### Comprueba que no rompiste nada

Samba trae una herramienta que revisa el archivo en busca de errores **antes** de reiniciar:

```bash
testparm
```

> ### 🟦 ¿Que significa? — *testparm*
> Es un verificador de la configuracion de Samba. Lee tu `smb.conf` y avisa si hay errores de sintaxis. **Para que sirve:** evitar reiniciar Samba con un archivo roto. **Donde aparece en tu NAS:** ejecutalo siempre tras editar; si dice "Loaded services file OK", vas bien.

> ### 💡 Tip
> `testparm` no solo valida: tambien te muestra como Samba interpreta tu archivo. Si pulsas `Enter` cuando lo pida, lista todas las secciones. Deberias ver tu `[PolyPawNAS]` con su `path = /srv/nas`.

Si todo esta bien, recarga Samba:

```bash
sudo systemctl restart smbd
```

## 4. Usuarios y contrasenas de Samba

Aqui viene una sutileza que confunde a todos los principiantes: el usuario de Linux y el usuario de Samba **no son lo mismo**, aunque se llamen igual.

> ### 🟦 ¿Que significa? — *Usuario de Samba*
> Es una cuenta con su propia contrasena que Samba guarda aparte, solo para acceder a los recursos compartidos. **Para que sirve:** poder pedir contrasena por la red sin usar la contrasena de inicio de sesion de Linux. **Donde aparece en tu NAS:** la creas con `smbpasswd`; el nombre debe coincidir con un usuario de Linux que ya exista (como `edwar`).

El usuario de Linux ya existe (es con el que inicias sesion en polypaw-nas). Lo que falta es darle una contrasena **de Samba**:

```bash
sudo smbpasswd -a edwar
```

> ### 🟦 ¿Que significa? — *smbpasswd*
> Es el comando para crear o cambiar contrasenas de usuarios de Samba. La `-a` significa "anadir" (*add*) un usuario nuevo a Samba. **Para que sirve:** registrar quien puede conectarse y con que clave. **Donde aparece en tu NAS:** lo usas una vez por cada persona autorizada.

Te pedira la contrasena dos veces. **Aqui es donde la seguridad empieza de verdad.**

> ### ⚠️ Cuidado
> Esta contrasena es la unica barrera entre tus datos y cualquiera que entre a tu red. Usa una contrasena **larga y unica**, no la misma de tu correo. Una frase de 4 palabras al azar (tipo "ajolote-techo-naranja-22") es facil de recordar y dificil de adivinar. Nunca la guardes en texto plano en un repo como **Faro/Organizer**.

Una vez creado, puedes listar y activar el usuario:

```bash
sudo pdbedit -L -v
sudo smbpasswd -e edwar
```

> ### 🟦 ¿Que significa? — *`smbpasswd -e`*
> La `-e` *activa* (*enable*) un usuario de Samba. **Para que sirve:** asegurarte de que la cuenta esta habilitada para conectarse. **Donde aparece en tu NAS:** util si alguna vez deshabilitas (`-d`) un usuario temporalmente.

> ### 🟦 ¿Que significa? — *pdbedit*
> `pdbedit` es la herramienta que lista y administra la base de datos de usuarios de Samba. Con `-L` muestra la lista; con `-L -v`, los detalles de cada uno. **Para que sirve:** comprobar que tu usuario quedo bien registrado en Samba. **Donde aparece en tu NAS:** lo usas para verificar que `edwar` existe como usuario de Samba antes de pelearte con una conexion rechazada.

## 5. Permisos del recurso: el guardia del almacen

Samba puede decir "este usuario puede entrar", pero el **sistema de archivos de Linux** tiene la ultima palabra. Si la carpeta `/srv/nas` no le pertenece a tu usuario, podras conectarte pero no escribir. Son dos guardias que deben estar de acuerdo.

> ### 🟦 ¿Que significa? — *Permisos de archivos*
> En Linux cada carpeta y archivo tiene un dueno, un grupo y reglas de quien puede leer, escribir o ejecutar. **Para que sirve:** controlar quien toca que, incluso por fuera de Samba. **Donde aparece en tu NAS:** `/srv/nas` debe ser propiedad de tu usuario para que puedas escribir.

Dale la propiedad de la carpeta de datos a tu usuario:

```bash
sudo chown -R edwar:edwar /srv/nas
sudo chmod -R 0775 /srv/nas
```

> ### 🟦 ¿Que significa? — *chown*
> `chown` (change owner) cambia el **dueno** de archivos y carpetas. La `-R` lo aplica de forma recursiva (a todo lo de adentro). **Para que sirve:** que tu usuario sea el propietario de `/srv/nas`. **Donde aparece en tu NAS:** lo corres una vez tras montar el disco.

> ### 🟦 ¿Que significa? — *chmod*
> `chmod` (change mode) cambia los **permisos**. `0775` significa: dueno y grupo pueden leer/escribir/entrar; los demas solo leer/entrar. **Para que sirve:** ajustar finamente quien hace que. **Donde aparece en tu NAS:** lo combinas con `chown` para preparar `/srv/nas`.

> ### 🔎 En tu servidor
> Si planeas que polypaw-nas reciba respaldos automaticos de **RachaSimple** o **tunal-digital**, conviene crear subcarpetas ordenadas: `/srv/nas/respaldos`, `/srv/nas/multimedia`, `/srv/nas/documentos`. Asi el HDD de 954 GB no se vuelve un cajon de sastre, y puedes compartir solo la carpeta que necesites mas adelante creando recursos separados.

## 6. El cortafuegos: dejar pasar a Samba (y solo en casa)

Si tienes el cortafuegos activado (muy recomendable), Samba podria estar bloqueado. Pero ojo: lo abriremos **solo para tu red local**, jamas para internet.

> ### 🟦 ¿Que significa? — *Cortafuegos (firewall)*
> Es un filtro que decide que conexiones de red entran y salen del servidor. **Para que sirve:** bloquear accesos no deseados. **Donde aparece en tu NAS:** en Ubuntu suele gestionarse con `ufw`.

> ### 🟦 ¿Que significa? — *ufw*
> ufw (Uncomplicated Firewall) es la forma sencilla de manejar el cortafuegos en Ubuntu. **Para que sirve:** abrir o cerrar puertos con comandos faciles. **Donde aparece en tu NAS:** lo usas para permitir Samba solo en tu red de casa.

```bash
sudo ufw allow from 192.168.0.0/16 to any app Samba
sudo ufw status
```

> ### 🟦 ¿Que significa? — *`192.168.0.0/16`*
> Es un rango de direcciones IP **privadas**, las que usan las redes caseras. **Para que sirve:** decir "permite solo a las computadoras de mi propia red". **Donde aparece en tu NAS:** ajusta el rango a tu red real (mira tu IP con `ip a`; si es `192.168.1.x`, ese rango cubre).

> ### 🟦 ¿Que significa? — *Puerto*
> Un puerto es como una **ventanilla numerada** dentro de la direccion IP del servidor: por cada ventanilla entra y sale un tipo de servicio. **Para que sirve:** que en una sola IP convivan muchos servicios sin mezclarse (Samba en sus puertos, Cockpit en el 9090, etc.). **Donde aparece en tu NAS:** Samba usa los puertos 137, 138, 139 y 445; Cockpit el 9090. Abrir un puerto "al internet" significa dejar esa ventanilla accesible desde cualquier parte del mundo, no solo desde tu casa.

> ### ⚠️ Cuidado — la regla de oro de la seguridad
> **Nunca** abras los puertos de Samba (137, 138, 139, 445) hacia internet en tu router. SMB ha sido blanco de ataques famosos (como el ransomware WannaCry, que en 2017 secuestro cientos de miles de equipos saltando precisamente por SMB expuesto). Para acceder a tus archivos **fuera de casa**, usa **Tailscale**, que ya tienes instalado en polypaw-nas. Tailscale crea un tunel privado y cifrado: tu telefono entra como si estuviera en casa, sin exponer ni un puerto al mundo. Regla simple: si dudas entre abrir un puerto o usar Tailscale, **siempre Tailscale**.

> ### 🟦 ¿Que significa? — *Ransomware*
> Ransomware es un tipo de programa malicioso que **cifra (secuestra) tus archivos** y exige un pago para devolvertelos. **Para que sirve (a los atacantes):** extorsionar; suele entrar por servicios mal protegidos expuestos a internet. **Donde aparece en tu NAS:** es exactamente el riesgo que evitas al **no** abrir los puertos de Samba al mundo y al usar Tailscale en su lugar.

> ### 🟦 ¿Que significa? — *VPN (red privada virtual)*
> Una VPN es un **tunel cifrado** que une tus dispositivos por una red privada, como si estuvieran todos enchufados al mismo router aunque esten en ciudades distintas. **Para que sirve:** llegar a tu servidor desde fuera de casa sin exponerlo al internet abierto. **Donde aparece en tu NAS:** Tailscale es la VPN que usas; por dentro funciona con tecnologia WireGuard, pero tu solo enciendes la app y listo.

> ### 🟦 ¿Que significa? — *Tailscale*
> Tailscale es una VPN (red privada virtual) que conecta tus dispositivos entre si de forma segura, estes donde estes. **Para que sirve:** acceder a polypaw-nas desde fuera de casa sin abrir puertos peligrosos. **Donde aparece en tu NAS:** ya esta instalado; tus dispositivos con Tailscale ven al servidor por su IP de Tailscale (algo como `100.x.x.x`).

## 7. Conectarte desde cada dispositivo

Necesitas saber la direccion de tu servidor. Averigua su IP local:

```bash
ip a | grep inet
```

> ### 🟦 ¿Que significa? — *IP (direccion IP)*
> Es el "numero de telefono" de tu servidor en la red. **Para que sirve:** que otros dispositivos sepan a donde conectarse. **Donde aparece en tu NAS:** algo como `192.168.1.50`. Tambien puedes usar el nombre `polypaw-nas` si tu red resuelve nombres.

Supongamos que tu IP es `192.168.1.50`. Vamos dispositivo por dispositivo.

### Desde Windows

1. Abre el Explorador de archivos.
2. En la barra de direcciones escribe: `\\192.168.1.50\PolyPawNAS` (o `\\polypaw-nas\PolyPawNAS`).
3. Pulsa Enter. Te pedira usuario y contrasena: pon `edwar` y tu contrasena de Samba.

> ### 💡 Tip
> En Windows, la barra invertida `\` es la que se usa para rutas de red. Marca la casilla "Recordar mis credenciales" solo si la PC es de confianza. Para que la unidad aparezca siempre, haz clic derecho y "Conectar a unidad de red".

### Desde Mac

1. En Finder, menu **Ir** -> **Conectarse al servidor** (o `Cmd+K`).
2. Escribe: `smb://192.168.1.50/PolyPawNAS`.
3. Conectar, y pon tu usuario y contrasena.

> ### 🟦 ¿Que significa? — *`smb://`*
> Es la forma de escribir una direccion SMB en Mac, Linux y telefonos, igual que `https://` es para webs. **Para que sirve:** decirle al sistema "conectate por SMB a esta direccion". **Donde aparece en tu NAS:** `smb://192.168.1.50/PolyPawNAS` apunta a tu recurso.

### Desde Linux (otro equipo)

En el explorador de archivos (Nautilus, Dolphin), busca "Otras ubicaciones" o "Conectar a servidor" y escribe `smb://192.168.1.50/PolyPawNAS`. O desde terminal:

```bash
sudo apt install cifs-utils
sudo mkdir -p /mnt/polypaw
sudo mount -t cifs //192.168.1.50/PolyPawNAS /mnt/polypaw -o username=edwar
```

> ### 🟦 ¿Que significa? — *CIFS / cifs-utils*
> CIFS es otro nombre para una version de SMB; `cifs-utils` son las herramientas de Linux para montar recursos SMB como si fueran carpetas locales. **Para que sirve:** que `/mnt/polypaw` sea tu recurso de red, accesible como una carpeta normal. **Donde aparece en tu NAS:** del lado del cliente Linux, no del servidor.

### Desde el telefono (Android / iPhone)

Instala una app de archivos con soporte SMB. En Android sirven "Files by Google" (con la opcion de red) o "CX File Explorer"; en iPhone, la app **Archivos** ya trae "Conectar al servidor". Escribe `smb://192.168.1.50/PolyPawNAS` y tus credenciales.

> ### 🔎 En tu servidor
> Cuando estes fuera de casa, primero enciende Tailscale en el telefono y luego usa la **IP de Tailscale** de polypaw-nas (la `100.x.x.x`) en lugar de la `192.168.x.x`. Mismo recurso, misma contrasena, pero ahora viajando por el tunel cifrado. Asi accedes a tus archivos desde la calle sin abrir nada en el router.

## 8. Problemas comunes (y como salir de ellos)

**"No puedo ver el servidor en la red."**
- Revisa que `smbd` este `active (running)`.
- Prueba con la IP directa (`\\192.168.1.50\PolyPawNAS`) en vez del nombre.
- Confirma que el cortafuegos deja pasar Samba (`sudo ufw status`).

**"Me pide usuario y contrasena pero los rechaza."**
- ¿Creaste el usuario con `sudo smbpasswd -a edwar`? El usuario de Linux por si solo no basta.
- ¿El usuario esta en `valid users` del recurso?
- Verifica con `sudo pdbedit -L` que el usuario existe en Samba.

**"Entro pero no puedo escribir / 'permiso denegado'."**
- Revisa `read only = no` en el recurso.
- Revisa que `/srv/nas` le pertenezca a tu usuario (`ls -ld /srv/nas`) y corrige con `chown`.

**"Escribi `\\polypaw-nas` y no resuelve."**
- Tu red puede no traducir el nombre a IP. Usa la IP directa, o configura AdGuard Home (que ya tienes) para que resuelva nombres locales.

> ### 🟦 ¿Que significa? — *Registro (log)*
> Un registro o *log* es un archivo donde un programa va anotando lo que hace y los errores que encuentra, con fecha y hora. **Para que sirve:** averiguar **por que** algo fallo, leyendo lo que el propio programa apunto. **Donde aparece en tu NAS:** Samba escribe sus logs en `/var/log/samba/`; el de conexiones de archivos suele ser `log.smbd`.

> ### 💡 Tip
> El registro (*log*) de Samba es tu mejor amigo cuando algo falla. Revisa los ultimos errores con `sudo tail -n 40 /var/log/samba/log.smbd`. Casi siempre la causa exacta esta ahi escrita en una linea.

> ### ⚠️ Cuidado
> Samba comparte archivos, pero **no** es un respaldo. Si el HDD de 954 GB se daña, pierdes lo que tenga. Manten una copia de lo importante (tus repos **PolyPaw**, **Faro/Organizer**, fotos) en otro disco o en la nube. Compartir y respaldar son cosas distintas; necesitas ambas.

## ✅ Checklist — ¿ya domino esto?

- [ ] Entiendo que Samba es el programa y SMB el protocolo (idioma) que habla.
- [ ] Se que el recurso PolyPawNAS apunta a `/srv/nas`, mi HDD de 954 GB.
- [ ] Verifique con `df -h /srv/nas` que el disco de datos esta montado de verdad.
- [ ] Hice una copia `.bak` de `smb.conf` antes de editarlo.
- [ ] Defini el recurso `[PolyPawNAS]` con `path`, `valid users` y `read only = no`.
- [ ] Valide la config con `testparm` antes de reiniciar Samba.
- [ ] Cree mi usuario de Samba con `smbpasswd -a` y una contrasena fuerte y unica.
- [ ] Ajuste el dueno de `/srv/nas` con `chown` para poder escribir.
- [ ] Abri Samba en el cortafuegos **solo** para mi red local, nunca a internet.
- [ ] Me conecte al menos desde un dispositivo (Windows/Mac/Linux/telefono).
- [ ] Se que para acceder desde fuera de casa uso Tailscale, no abro puertos.
- [ ] Tengo claro que Samba comparte, pero no reemplaza un respaldo.

## 🧪 Ejercicios

1. 💻 **El check de salud.** Ejecuta `systemctl status smbd` y `df -h /srv/nas`. Escribe en una nota si Samba esta `running` y cuanto espacio libre te queda en el HDD de 954 GB.

2. 💻 **Crea tu primer recurso.** Si no existe aun, define `[PolyPawNAS]` en `smb.conf` apuntando a `/srv/nas`, valida con `testparm`, reinicia con `systemctl restart smbd` y crea tu usuario con `smbpasswd -a`. Sube un archivo de prueba desde otra computadora.

3. 💻 **Permisos a prueba.** Desde tu PC, intenta crear una carpeta nueva dentro de PolyPawNAS. Si falla, usa `ls -ld /srv/nas` en el servidor para ver el dueno y corrige con `chown` hasta que puedas escribir.

4. 💻 **El tunel seguro.** Enciende Tailscale en tu telefono, averigua la IP `100.x.x.x` de polypaw-nas y conectate a `smb://100.x.x.x/PolyPawNAS` desde fuera de tu wifi (usa datos moviles). Comprueba que ves tus archivos sin haber abierto ningun puerto en el router.

5. **Auditoria de seguridad.** Sin tocar el servidor, escribe en tu cuaderno las respuestas: ¿esta `map to guest = never`? ¿Tu contrasena de Samba es unica y larga? ¿Algun puerto de SMB esta abierto en tu router hacia internet (deberia ser NO)? ¿Cuando hiciste el ultimo respaldo del HDD?

6. 💻 **Lee los registros.** Provoca un error a proposito (intenta entrar con una contrasena equivocada desde otro equipo) y luego revisa `sudo tail -n 40 /var/log/samba/log.smbd` para encontrar la linea que registra el intento fallido. Aprender a leer logs te salvara mil veces.

> Bit el ajolote te felicita: acabas de convertir un laptop con bateria-UPS en un disco de red de toda la casa. La proxima vez que arrastres una foto a `\\polypaw-nas\PolyPawNAS`, recuerda que viaja por SMB hasta el HDD de 954 GB, pasando por el guardia de permisos y el de usuarios. Y si alguien te dice "abre el puerto 445 al internet para entrar desde fuera", ya sabes que la respuesta es: no, para eso esta Tailscale. Nada nada tranquilo, tus archivos estan en buenas branquias.
