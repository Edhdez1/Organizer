# Capitulo 10 — Redes desde cero a fondo

<p align="center">
  <img src="../../recursos/imagenes/09-nas-y-servidores/cap10.png" alt="Ilustración del capítulo (pixel art con Bit)" width="640">
</p>


> Hasta ahora tu NAS **polypaw-nas** ha funcionado casi por arte de magia: enciendes el viejo Acer Nitro, abres Cockpit en el navegador y ahi esta, esperandote. Pero detras de esa magia hay una red, con sus reglas, sus direcciones y sus puertas. En este capitulo abrimos esa caja con calma. Vas a entender quien es quien en tu casa digital: que es una IP, por que tu NAS necesita una direccion fija, que hace exactamente el router, como funciona el DNS (y por que tu polypaw-nas tiene su propio servidor DNS con AdGuard Home), que son los puertos y por que abrir uno a internet sin pensarlo es como dejar la puerta de la calle de par en par. Bit, el ajolote, te acompana. Es chiquito, vive en el agua y tiene branquias rosas: el animal perfecto para recordarte que en redes todo respira tranquilo si no te apuras.

---

## 1. Tu casa tiene una red, aunque no la veas

Imagina tu casa. Dentro hay varios aparatos conectados: tu telefono, tu laptop personal, quizas una tele inteligente, y por supuesto **polypaw-nas**, ese Acer Nitro AN515-54 (procesador Intel Core i5-9300H, 8 GB de RAM, un SSD de 238 GB donde vive Ubuntu Server 26.04 y un HDD de 954 GB para los datos en `/srv/nas`) que descansa en un rincon respaldando tus archivos. Todos esos aparatos hablan entre si a traves de una **red local**.

> ### 🟦 ¿Que significa? — *Red local (LAN)*
> LAN viene de *Local Area Network*: red de area local. Es el conjunto de aparatos conectados entre si **dentro de tu casa** (por cable o WiFi), que pueden comunicarse sin salir a internet.
> **Para que sirve:** que tu laptop pueda ver la carpeta compartida de polypaw-nas, o que abras Cockpit desde el sofa, sin que esos datos pasen por internet.
> **Donde aparece en tu NAS:** tu polypaw-nas vive en tu LAN. Cuando copias archivos a la carpeta `PolyPawNAS` por Samba, los datos viajan solo por tu LAN: rapidos y privados.

Para que dos aparatos se hablen, cada uno necesita un nombre o numero unico, igual que en una calle cada casa tiene su numero. Ese numero es la **direccion IP**.

> ### 🟦 ¿Que significa? — *Direccion IP*
> IP viene de *Internet Protocol*. Una direccion IP es un numero que identifica a un aparato dentro de una red, como `192.168.1.42`. Son cuatro numeros del 0 al 255 separados por puntos.
> **Para que sirve:** para que los datos sepan a donde ir. Si tu laptop quiere hablar con polypaw-nas, necesita su IP.
> **Donde aparece en tu NAS:** cuando escribes algo como `\\192.168.1.42\PolyPawNAS` o `http://192.168.1.42:9090` para abrir Cockpit, ese numero **es** la IP de tu NAS en la LAN.

Para ver la IP de tu polypaw-nas, entra por SSH o sientate frente a el y ejecuta:

```bash
ip addr show
```

> ### 🟦 ¿Que significa? — *SSH*
> SSH viene de *Secure Shell*: caparazon seguro. Es una forma de abrir la terminal de otro equipo a distancia y de forma cifrada, para escribir comandos en polypaw-nas desde tu laptop sin sentarte frente al Acer.
> **Para que sirve:** administrar el servidor por consola sin tener teclado ni pantalla conectados a el; todo lo que escribes viaja cifrado por la LAN.
> **Donde aparece en tu NAS:** cuando haces `ssh tu-usuario@192.168.1.42` desde tu laptop, abres una sesion SSH en polypaw-nas. Por Tailscale puedes hacer lo mismo desde fuera de casa, sin abrir puertos.

Veras una linea parecida a `inet 192.168.1.42/24`. El numero antes de la barra es la IP. El `/24` lo explicamos en un momento, ten paciencia (Bit ya esta nadando hacia alla).

---

## 2. IP privada vs IP publica: la casa y el barrio

Aqui hay un detalle que confunde a casi todo el mundo al principio: tu NAS tiene **dos clases de direccion** segun desde donde lo mires.

> ### 🟦 ¿Que significa? — *IP privada*
> Es la direccion que tu aparato usa **dentro de tu LAN**. Son numeros reservados que solo valen puertas adentro: empiezan por `192.168.x.x`, `10.x.x.x` o `172.16.x.x` a `172.31.x.x`.
> **Para que sirve:** identificar aparatos dentro de tu casa. Millones de casas usan `192.168.1.x` al mismo tiempo y no chocan, porque cada una es su propio mundo cerrado.
> **Donde aparece en tu NAS:** la IP `192.168.1.42` (o la que sea) de polypaw-nas es privada. Solo sirve estando conectado a tu WiFi o cable de casa.

> ### 🟦 ¿Que significa? — *IP publica*
> Es la direccion que tu casa entera muestra **al mundo de internet**. Te la asigna tu proveedor de internet (la compania del cable o de la fibra). Toda tu casa comparte una sola IP publica.
> **Para que sirve:** que internet sepa devolver respuestas a tu hogar. Cuando ves un video, la pagina responde a tu IP publica.
> **Donde aparece en tu NAS:** NO aparece directamente. polypaw-nas no tiene IP publica propia. Y eso, te lo adelanto, es una **buena noticia para tu seguridad**.

La analogia: tu **IP publica** es la direccion de tu edificio, la que ve el cartero del mundo. Tus **IP privadas** son los numeros de apartamento de adentro. El cartero deja todo en la porteria (tu router) y la porteria reparte puertas adentro.

> ### 💡 Tip
> Para ver tu IP publica, desde polypaw-nas ejecuta `curl ifconfig.me`. Veras un numero distinto al `192.168.x.x`. Ese es el rostro de tu casa hacia internet, asi que no lo publiques por ahi sin razon.

> ### 🔎 En tu servidor
> Como polypaw-nas solo tiene IP privada, **nadie desde internet puede tocarlo directamente**. Para llegar a el de forma remota usas Tailscale, que te arma una red privada virtual segura sin abrir nada al mundo. Volveremos a esto en la seccion de seguridad: es el corazon de por que tu NAS esta tan tranquilo.

---

## 3. La mascara de red y el rango de tu LAN

Volvamos a aquel `192.168.1.42/24`. Ese `/24` es la **mascara de red**, y define hasta donde llega tu vecindario local.

> ### 🟦 ¿Que significa? — *Mascara de red*
> Es un valor que indica que parte de la IP identifica a **la red** (el barrio) y que parte identifica a **el aparato** (la casa). El `/24` significa que los primeros tres numeros (`192.168.1`) son el barrio, y el ultimo (`.42`) es la casa concreta.
> **Para que sirve:** que los aparatos sepan quien es vecino (misma red, se hablan directo) y quien esta afuera (hay que pasar por el router).
> **Donde aparece en tu NAS:** el `/24` que ves en la salida de `ip addr` de polypaw-nas. Tambien se escribe como `255.255.255.0`, que es lo mismo con otra notacion.

Con `/24`, tu rango de direcciones va de `192.168.1.1` a `192.168.1.254`. Eso te da sitio para unos 254 aparatos en casa: mas que de sobra.

> ### 🟦 ¿Que significa? — *Rango LAN*
> Es el conjunto de todas las direcciones validas de tu red local. Con mascara `/24` y red `192.168.1.x`, el rango util va de `.1` a `.254`.
> **Para que sirve:** saber que direcciones puedes repartir. Tu router suele quedarse con la `.1`, y reparte el resto entre los aparatos.
> **Donde aparece en tu NAS:** polypaw-nas vivira en alguna direccion dentro de ese rango. Mas adelante le daremos una fija para que nunca cambie.

> ### ⚠️ Cuidado
> Tu red podria no ser `192.168.1.x`. Muchos routers usan `192.168.0.x`, `192.168.100.x` o `10.0.0.x`. **No copies mis numeros a ciegas:** mira los reales de tu casa con `ip addr show` en polypaw-nas. Bit insiste: en redes, primero miras y despues escribes.

---

## 4. El router y la puerta de enlace (gateway)

En medio de toda tu red hay un aparato que es jefe, portero y traductor a la vez: el **router**.

> ### 🟦 ¿Que significa? — *Router*
> Es la caja que te dio tu proveedor de internet (o que compraste aparte). Conecta tu LAN con internet y reparte la conexion entre todos tus aparatos, por cable y por WiFi.
> **Para que sirve:** ser el punto por donde todo el trafico entra y sale de tu casa. Tambien reparte las IP privadas a los aparatos.
> **Donde aparece en tu NAS:** polypaw-nas se conecta a internet **a traves de tu router**. Cuando el NAS descarga una actualizacion de Ubuntu, le pide los datos al router y este los trae de internet.

Cuando un aparato quiere hablar con algo que NO esta en tu LAN (una pagina web, por ejemplo), no conoce el camino. Asi que entrega el paquete a una direccion especial: la **puerta de enlace**.

> ### 🟦 ¿Que significa? — *Puerta de enlace (gateway)*
> Es la IP del router dentro de tu LAN, casi siempre la `.1` (como `192.168.1.1`). Es la "salida del barrio": todo lo que va hacia afuera pasa por ahi.
> **Para que sirve:** ser la unica puerta hacia internet. Si un aparato no sabe a donde mandar algo, se lo entrega a la gateway y ella se encarga.
> **Donde aparece en tu NAS:** polypaw-nas tiene configurada una gateway. Cuando hace `apt update`, los datos salen por esa puerta.

Para ver cual es tu gateway desde polypaw-nas:

```bash
ip route show
```

La linea que empieza con `default via` te muestra la IP de tu router. Por ejemplo, `default via 192.168.1.1`. Esa es tu puerta de enlace.

> ### 💡 Tip
> Si conoces la IP de tu router (la gateway), puedes abrir su panel de configuracion escribiendola en el navegador: `http://192.168.1.1`. Ahi se hacen cosas importantes que veremos luego, como reservar la IP del NAS. Te pedira usuario y contrasena; suelen venir en una pegatina debajo del router.

---

## 5. DNS, con mucha calma

Llegamos al concepto que mas nervios provoca y menos razon tiene de provocarlos. Respira con Bit, que el DNS es facil cuando se cuenta bien.

Los humanos recordamos nombres: `google.com`, `github.com`. Las maquinas, en cambio, solo entienden numeros (IP). Hace falta una agenda telefonica que traduzca nombres a numeros, y esa agenda es el **DNS**.

> ### 🟦 ¿Que significa? — *DNS*
> DNS viene de *Domain Name System*: sistema de nombres de dominio. Es el servicio que traduce un nombre como `github.com` a una direccion IP como `140.82.121.4`.
> **Para que sirve:** que escribas nombres faciles en vez de numeros imposibles de recordar. Sin DNS tendrias que memorizar la IP de cada web.
> **Donde aparece en tu NAS:** polypaw-nas usa DNS para resolver nombres cuando descarga paquetes o cuando clonas un repo como `tunal-digital` o `Faro/Organizer` desde GitHub. Y, ademas, tu NAS **es** un servidor DNS gracias a AdGuard Home.

El proceso, paso a paso, cuando tu laptop quiere entrar a una web:

1. Tu laptop pregunta: "Quien es `ejemplo.com`?"
2. La pregunta va a un servidor DNS.
3. El servidor DNS responde: "Es la IP `93.184.x.x`".
4. Tu laptop ya puede conectarse a esa IP.

Todo esto pasa en milisegundos, cada vez que abres una pagina.

> ### 🟦 ¿Que significa? — *AdGuard Home*
> Es un programa que actua como tu servidor DNS personal y que, ademas de traducir nombres, **bloquea** los de los servidores conocidos de anuncios y rastreadores.
> **Para que sirve:** que la publicidad y los rastreadores no carguen, en todos los aparatos de tu casa a la vez, sin instalar nada en cada uno.
> **Donde aparece en tu NAS:** AdGuard Home corre en polypaw-nas. Cuando un aparato pide la IP de un servidor de anuncios, AdGuard responde "no existe" y el anuncio nunca aparece. Es DNS con superpoderes.

> ### 🔎 En tu servidor
> Para que AdGuard Home proteja toda tu casa, hay que decirle al **router** que el servidor DNS de la red es la IP de polypaw-nas. Asi todos los aparatos le preguntan al NAS, y el NAS filtra anuncios para todos. Si solo lo configuras en un aparato, solo ese queda protegido.

> ### ⚠️ Cuidado
> Si polypaw-nas se apaga y tu router lo tiene puesto como unico DNS, **toda la casa se queda sin internet** (nadie puede traducir nombres). Por eso, en el router conviene poner un DNS de respaldo, como `1.1.1.1` (Cloudflare) o `9.9.9.9` (Quad9), por si tu NAS descansa. Recuerda que la bateria interna del Acer Nitro hace de UPS natural (una *Uninterruptible Power Supply*, o fuente de alimentacion ininterrumpida: una bateria que mantiene el equipo vivo durante un corte de luz), asi que un apagon corto no lo tumba, pero un mantenimiento si.

Para comprobar que DNS usa tu polypaw-nas ahora mismo:

```bash
resolvectl status
```

Y para probar que la traduccion funciona:

```bash
nslookup github.com
```

Si te devuelve una IP, tu DNS esta vivo y trabajando.

---

## 6. Puertos: las puertas numeradas de cada servicio

Tu polypaw-nas hace muchas cosas a la vez: comparte archivos por Samba, muestra el panel Cockpit, resuelve DNS con AdGuard. Y todo eso en una sola IP. Como sabe el NAS a que servicio va cada peticion? Con los **puertos**.

> ### 🟦 ¿Que significa? — *Puerto*
> Es un numero (del 1 al 65535) que identifica a un servicio concreto dentro de un aparato. Si la IP es la direccion del edificio, el puerto es el numero de la oficina de adentro.
> **Para que sirve:** que un mismo aparato ofrezca varios servicios sin confundirlos. La peticion llega a "IP : puerto", y el sistema sabe a quien entregarla.
> **Donde aparece en tu NAS:** cada servicio de polypaw-nas escucha en su propio puerto. Cockpit en el 9090, Samba en el 445, AdGuard en el 53.

Estos son los puertos que viven en tu polypaw-nas:

> ### 🟦 ¿Que significa? — *Puerto 445 (Samba / SMB)*
> Es el puerto donde escucha **Samba**, el servicio que comparte carpetas en red. SMB es el protocolo (*Server Message Block*) que usan Windows, Mac y Linux para ver carpetas compartidas.
> **Para que sirve:** que desde tu laptop veas y uses la carpeta `PolyPawNAS` como si fuera un disco mas.
> **Donde aparece en tu NAS:** cuando te conectas a `\\192.168.1.42\PolyPawNAS`, tu aparato habla con el puerto 445 de polypaw-nas. Ahi viven, montados en el HDD de 954 GB en `/srv/nas`, tus respaldos.

> ### 🟦 ¿Que significa? — *Puerto 9090 (Cockpit)*
> Es el puerto del panel web de administracion **Cockpit**, desde donde ves la salud del servidor, los discos, la RAM y mas.
> **Para que sirve:** administrar polypaw-nas desde el navegador, sin memorizar comandos.
> **Donde aparece en tu NAS:** cuando abres `http://192.168.1.42:9090`, hablas con Cockpit en el puerto 9090. Ahi vigilas, por ejemplo, que los 8 GB de RAM no se queden cortos.

> ### 🟦 ¿Que significa? — *Puerto 53 (DNS)*
> Es el puerto estandar del servicio DNS. AdGuard Home escucha aqui las preguntas del tipo "que IP tiene este nombre?".
> **Para que sirve:** recibir y responder las consultas de nombres de toda tu casa.
> **Donde aparece en tu NAS:** AdGuard Home en polypaw-nas escucha en el puerto 53. Cada vez que un aparato traduce un nombre, toca esta puerta.

Para ver con tus propios ojos que puertos estan escuchando en tu polypaw-nas:

```bash
sudo ss -tulpn
```

Veras una tabla. Busca en la columna de direcciones los numeros `:445`, `:9090` y `:53`. A su lado aparece el programa que escucha (smbd, cockpit, AdGuardHome). Es como pasar lista de las puertas abiertas dentro de tu NAS.

> ### 💡 Tip
> La columna "State" mostrara `LISTEN` para los servicios que estan esperando conexiones. Si un servicio que esperabas no aparece, quiza no esta arrancado. Con Cockpit o con `systemctl status` puedes revisarlo y reiniciarlo.

---

## 7. Reservar una IP fija para tu NAS (DHCP reservation)

Tenemos un problema practico por resolver. Hasta ahora tu router reparte las IP automaticamente con un sistema llamado DHCP. Eso es comodo, pero trae un riesgo: la IP de polypaw-nas **podria cambiar** al reiniciar.

> ### 🟦 ¿Que significa? — *DHCP*
> DHCP viene de *Dynamic Host Configuration Protocol*. Es el sistema por el cual el router reparte automaticamente una IP a cada aparato que se conecta, sin que tu hagas nada.
> **Para que sirve:** que conectes aparatos sin configurar la IP a mano. Genial para el telefono y la tele.
> **Donde aparece en tu NAS:** cuando polypaw-nas arranca, le pide una IP al router por DHCP. El problema: el router podria darle hoy la `.42` y manana la `.57`.

Si la IP cambia, tus accesos guardados (`\\192.168.1.42\PolyPawNAS`, `http://192.168.1.42:9090`) dejan de funcionar de golpe. Un NAS necesita una direccion **estable**. La solucion mas limpia es la **reserva DHCP**.

> ### 🟦 ¿Que significa? — *Reserva DHCP (DHCP reservation)*
> Es decirle al router: "este aparato concreto siempre debe recibir esta misma IP". El router sigue repartiendo IP automaticamente al resto, pero a tu NAS le reserva siempre la misma.
> **Para que sirve:** que polypaw-nas tenga IP fija sin configurar nada en el propio NAS, y sin riesgo de choques con otros aparatos.
> **Donde aparece en tu NAS:** esto lo configuras en el panel del router, no en el NAS. Una vez hecho, la IP de polypaw-nas no vuelve a cambiar.

Para reservar la IP necesitas la **direccion MAC** de tu NAS, que es como su huella digital fisica.

> ### 🟦 ¿Que significa? — *Direccion MAC*
> Es un identificador unico de la tarjeta de red de un aparato, como `a4:b1:c2:d3:e4:f5`. Viene de fabrica y no cambia.
> **Para que sirve:** que el router reconozca a polypaw-nas sin importar que IP tenga en ese momento, para asignarle siempre la reservada.
> **Donde aparece en tu NAS:** la ves con `ip addr`, en la linea `link/ether`. Ese es el "nombre fisico" de la tarjeta de red de tu Acer Nitro.

Pasos:

```bash
ip addr show
```

Apunta la MAC (linea `link/ether`) y la IP actual. Luego entra al router (`http://192.168.1.1`), busca una seccion llamada "DHCP reservation", "Address reservation" o "IP estatica por MAC", y enlaza la MAC de polypaw-nas con la IP que quieras fijarle (idealmente la que ya tiene, para no romper nada).

> ### ⚠️ Cuidado
> Existe otra forma: dar la IP fija dentro del propio Ubuntu (con Netplan, la herramienta de Ubuntu Server 26.04 para configurar la red mediante archivos de texto). Funciona, pero es mas facil equivocarse y dejar el NAS sin red. **Para principiantes, la reserva DHCP en el router es mas segura:** si algo sale mal, lo deshaces desde el router sin tocar el servidor. Bit recomienda empezar por ahi.

> ### 🔎 En tu servidor
> Con la IP fija reservada, todo tu mundo se vuelve estable: los accesos de Samba a `PolyPawNAS`, la URL de Cockpit y el router apuntando a polypaw-nas como DNS de AdGuard. Una sola direccion, siempre la misma, sosteniendo todo.

---

## 8. Por que NO abrir puertos a internet a la ligera

Llegamos a la seccion mas importante del capitulo. Leela dos veces. Bit se pone serio un momento (lo cual en un ajolote es muy tierno, pero hablamos en serio).

Hasta aqui, todos esos puertos (445, 9090, 53) solo escuchan dentro de tu LAN. Desde internet **nadie** los ve, porque tu NAS no tiene IP publica. Eso es seguridad por defecto, y es excelente.

Para acceder a polypaw-nas desde fuera de casa existe una tentacion peligrosa: **abrir un puerto** en el router (lo llaman "port forwarding" o redireccion de puertos) para que internet pueda entrar.

> ### 🟦 ¿Que significa? — *Abrir un puerto (port forwarding)*
> Es configurar el router para que las peticiones que llegan de internet a un puerto se reenvien a un aparato concreto de tu LAN. En la practica, abres una puerta de tu casa hacia el mundo entero.
> **Para que sirve:** acceder a un servicio desde fuera de casa. Pero tiene un costo enorme en seguridad.
> **Donde aparece en tu NAS:** ojala **no** aparezca. Si abres el 445 o el 9090, los expones a todo internet, incluidos los robots que escanean dia y noche buscando puertas abiertas para atacar.

Por que es tan peligroso:

- En cuanto abres un puerto, **bots automaticos** lo encuentran en minutos. No hace falta que alguien te conozca; rastrean internet entero sin parar.
- Samba (445) expuesto a internet es una de las puertas mas atacadas de la historia. Por ahi entraron ataques famosos de secuestro de datos.
- Cockpit (9090) expuesto le da a quien sea acceso para **administrar tu servidor entero**. Si alguien adivina la contrasena, lo controla todo.
- DNS (53) abierto puede usarse para amplificar ataques contra terceros, y meterte en problemas sin que te enteres.

> ### ⚠️ Cuidado
> Nunca, jamas, abras los puertos 445, 9090 o 53 de polypaw-nas hacia internet "por probar". No es como dejar una ventana entornada: es como colgar la llave de tu casa en una valla de la carretera. Si necesitas acceso remoto, hay una forma segura, y ya la tienes instalada.

La forma correcta de llegar a tu NAS desde fuera es **Tailscale**, que ya esta en polypaw-nas.

> ### 🟦 ¿Que significa? — *Tailscale (VPN)*
> Es una VPN (*Virtual Private Network*, red privada virtual): crea un tunel cifrado entre tus aparatos, como si todos estuvieran en la misma LAN aunque esten en ciudades distintas.
> **Para que sirve:** acceder a polypaw-nas desde cualquier lugar **sin abrir ningun puerto** a internet. Solo tus propios aparatos, autenticados, pueden entrar al tunel.
> **Donde aparece en tu NAS:** Tailscale corre en polypaw-nas. Desde tu laptop con Tailscale, ves el NAS con una IP privada de Tailscale (algo como `100.x.x.x`) y usas Cockpit o Samba como si estuvieras en casa, sin exponer nada.

> ### 💡 Tip
> Con Tailscale puedes hacer todo lo remoto que quieras sin tocar el router: abres Cockpit, montas Samba, administras Docker o Podman. Es la diferencia entre un tunel privado y vigilado, y una puerta abierta a la calle. Siempre el tunel.

> ### 🔎 En tu servidor
> Repasa tu seguridad de red en polypaw-nas: cero puertos abiertos en el router hacia internet; Tailscale para lo remoto; contrasenas fuertes y distintas en Cockpit, Samba y AdGuard; y respaldos de lo importante (tus repos `PolyPaw`, `RachaSimple`, `tunal-digital`, `Faro/Organizer`) en el HDD de `/srv/nas`, y, si puedes, una copia tambien fuera del NAS. Un NAS sin respaldo externo es un solo disco que puede fallar.

> ### ⚠️ Cuidado
> Recuerda el limite de los 8 GB de RAM de tu Acer Nitro. Samba, Cockpit, AdGuard, Tailscale y los contenedores de Docker o Podman conviven en esa memoria. Vigila en Cockpit que no se sature: una red bien configurada no sirve de nada si el servidor se queda sin aire. Bit prefiere un NAS holgado a uno ahogado.

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Entiendo que es una LAN y por que polypaw-nas vive en ella.
- [ ] Distingo IP privada (puertas adentro) de IP publica (cara al internet) y se que mi NAS solo tiene privada.
- [ ] Se que es la mascara de red `/24` y cual es el rango de mi LAN.
- [ ] Se que el router es el portero y la gateway es la puerta de salida, y se ver su IP con `ip route show`.
- [ ] Entiendo que el DNS traduce nombres a numeros, y que AdGuard Home en mi NAS hace de DNS que bloquea anuncios.
- [ ] Se que es un puerto y reconozco el 445 (Samba), 9090 (Cockpit) y 53 (DNS) en mi servidor.
- [ ] Puedo listar los puertos a la escucha con `sudo ss -tulpn`.
- [ ] Entiendo la reserva DHCP y por que mi NAS necesita IP fija.
- [ ] Tengo clarisimo que NO debo abrir puertos al internet, y que Tailscale es la via segura para el acceso remoto.
- [ ] Mantengo contrasenas fuertes y respaldos, y vigilo los 8 GB de RAM.

---

## 🧪 Ejercicios

1. 💻 **Conoce tu IP.** En polypaw-nas, ejecuta `ip addr show`. Anota la IP privada (linea `inet`), la mascara (`/24` u otra) y la MAC (`link/ether`). Escribelas en un papel o nota; las usaras para la reserva DHCP.

2. 💻 **Encuentra tu puerta de enlace.** Ejecuta `ip route show` y localiza la linea `default via`. Esa es la IP de tu router. Anotala.

3. 💻 **Pasa lista a tus puertos.** Ejecuta `sudo ss -tulpn` y verifica que aparecen `:445`, `:9090` y `:53` en estado `LISTEN`. Identifica que programa esta detras de cada uno. Si falta alguno, investiga por que.

4. 💻 **Prueba tu DNS.** Ejecuta `nslookup github.com` y luego `resolvectl status`. Confirma que recibes una IP y observa que servidor DNS esta usando tu NAS. Si AdGuard Home es el DNS de tu red, intenta resolver un nombre de servidor de anuncios y comprueba que lo bloquea.

5. **Dibuja tu red.** En una hoja, dibuja: internet, tu router (con su gateway), y dentro de la LAN tu laptop y polypaw-nas con sus IP privadas y sus puertos (445, 9090, 53). Marca con una X grande que NINGUN puerto va abierto hacia internet. Tener el mapa en la cabeza vale oro.

6. 💻 **Plan de IP fija (sin ejecutar todavia si no estas seguro).** Entra al panel de tu router en `http://<tu-gateway>`, busca la seccion de reserva DHCP y localiza a polypaw-nas por su MAC. Anota los pasos que harias para reservarle su IP actual. Cuando te sientas comodo, hazlo de verdad y comprueba que el NAS conserva su direccion tras un reinicio.
