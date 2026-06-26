# Capitulo 11 — Acceso remoto seguro con Tailscale

<p align="center">
  <img src="../../recursos/imagenes/09-nas-y-servidores/cap11.png" alt="Ilustración del capítulo (pixel art con Bit)" width="640">
</p>


> Hasta ahora has manejado tu NAS estando en casa, conectado a la misma red Wi-Fi o cable que **polypaw-nas**. Pero, ¿qué pasa cuando sales? ¿Y si estás en la cafetería, en casa de un amigo o de viaje y necesitas un archivo guardado en tu HDD de 954 GB, o quieres entrar a Cockpit para revisar la RAM? En este capítulo aprenderás a llegar a tu laptop Acer Nitro desde cualquier parte del mundo, de forma segura, sin abrir tu casa a internet. Bit, el ajolote, te acompaña: él odia las puertas abiertas (es un anfibio muy precavido) y va a celebrar que aquí casi no abrimos ninguna.

## 1. El problema: tu NAS vive detrás de un muro

Tu servidor **polypaw-nas** (ese laptop Acer Nitro AN515-54 con Ubuntu Server 26.04) está conectado a tu router de casa. Dentro de tu red local todo es fácil: escribes la IP del NAS y entras a Samba o a Cockpit. Pero esa red local es como una casa con muros: desde la calle (internet) no se ve lo que hay dentro.

Esto lo hace tu router con una técnica llamada NAT.

> ### 🟦 ¿Que significa? — *NAT (Network Address Translation)*
> Es la función del router que comparte una sola dirección de internet entre todos los aparatos de tu casa (laptop, teléfono, NAS, tele). Por dentro cada aparato tiene una IP privada que **solo es válida dentro de tu casa**; por fuera todos salen con la misma IP pública del router.
> **Para qué sirve:** permite que muchos dispositivos compartan una conexión y, de paso, los esconde de internet.
> **Dónde aparece en tu NAS real:** **polypaw-nas** tiene una IP privada (algo como `192.168.x.x`) que solo funciona en tu casa. Desde la cafetería, esa dirección no lleva a ninguna parte.

> ### 🟦 ¿Que significa? — *IP pública vs IP privada*
> La **IP pública** es la dirección de tu casa vista desde internet (te la asigna tu proveedor). La **IP privada** es la dirección interna de cada aparato dentro de tu red.
> **Para qué sirve:** la pública es como la dirección de tu calle; la privada es como el número de habitación dentro de la casa. Desde fuera solo se ve la calle, no las habitaciones.
> **Dónde aparece en tu NAS real:** **polypaw-nas** vive en una "habitación" (IP privada) detrás de la "puerta de la calle" (IP pública de tu router).

El problema es claro: desde fuera no hay forma directa de tocar a polypaw-nas. La tentación clásica es abrir un "agujero" en el muro para colarte. A eso se le llama abrir puertos, y es justo lo que **no** vamos a hacer.

> ### ⚠️ Cuidado
> "Abrir un puerto" significa decirle al router que deje entrar tráfico de internet directo hacia un aparato de tu casa. Suena práctico, pero es como dejar una ventana de tu casa abierta de par en par para que entre un repartidor... y también cualquier ladrón que pase. Internet está lleno de robots que escanean ventanas abiertas día y noche. Más adelante verás la alternativa segura.

## 2. Qué es una VPN

La solución elegante no es abrir el muro, sino construir un túnel secreto entre tu teléfono y tu NAS. Ese túnel es una VPN.

> ### 🟦 ¿Que significa? — *VPN (Red Privada Virtual)*
> Es una conexión cifrada que une dos o más dispositivos como si estuvieran en la misma red local, aunque estén en ciudades distintas. "Virtual" porque la red no existe físicamente: se monta por software sobre internet. "Privada" porque solo tus dispositivos entran.
> **Para qué sirve:** te deja hablar con tu NAS desde fuera como si estuvieras sentado en casa, sin exponer nada a internet.
> **Dónde aparece en tu NAS real:** instalarás una VPN llamada Tailscale en **polypaw-nas** y en tu teléfono/laptop; ambos quedarán en la misma "red mágica".

> ### 🟦 ¿Que significa? — *Cifrado*
> Es convertir la información en un texto ilegible para cualquiera que no tenga la llave correcta. Si alguien intercepta los datos en el camino, solo ve basura.
> **Para qué sirve:** que tus archivos y contraseñas viajen protegidos por internet.
> **Dónde aparece en tu NAS real:** todo lo que pase entre tu teléfono y polypaw-nas por la VPN va cifrado, incluso en una Wi-Fi pública insegura.

Piensa en la VPN como un tubo neumático privado, de esos de los bancos antiguos, que conecta solo tu mano con la ventanilla del NAS. Nadie más puede meter la mano en el tubo.

## 3. Tailscale y WireGuard a grandes rasgos

Montar una VPN tradicional a mano es complicado: claves, configuraciones, IPs, cortafuegos. Tailscale nació para que eso sea casi automático.

> ### 🟦 ¿Que significa? — *Cortafuegos (firewall)*
> Es un guardián que decide qué tráfico de red puede entrar o salir de un equipo. Bloquea las conexiones no permitidas y deja pasar solo las que tú autorizas.
> **Para qué sirve:** proteger tu NAS filtrando quién puede tocarlo, como un portero que solo deja pasar a los invitados.
> **Dónde aparece en tu NAS real:** Ubuntu Server trae un cortafuegos integrado; combinado con Tailscale, **polypaw-nas** mantiene cerrado todo lo que mira a internet y abre solo el túnel cifrado de tu tailnet.

> ### 🟦 ¿Que significa? — *Tailscale*
> Es un servicio que crea una VPN privada entre tus dispositivos con muy poca configuración. Tú instalas un programa, inicias sesión con una cuenta, y Tailscale se encarga de conectar todo de forma segura.
> **Para qué sirve:** tener acceso remoto a tu NAS sin ser experto en redes.
> **Dónde aparece en tu NAS real:** ya está instalado en **polypaw-nas** y es la pieza que te deja entrar a Cockpit y Samba desde fuera de casa.

> ### 🟦 ¿Que significa? — *WireGuard*
> Es la tecnología (el "motor") que Tailscale usa por debajo para crear los túneles cifrados. WireGuard es moderno, rápido y con muy poco código, lo que lo hace difícil de atacar.
> **Para qué sirve:** es el cifrado y el transporte real de los datos; Tailscale solo le pone una cara fácil de usar.
> **Dónde aparece en tu NAS real:** no lo verás directamente, pero cada vez que tu teléfono habla con polypaw-nas por Tailscale, WireGuard está moviendo los datos.

> ### 💡 Tip
> Una forma sencilla de recordarlo: **WireGuard es el motor; Tailscale es el coche completo** con volante, asientos y llave fácil. Tú conduces el coche y no necesitas armar el motor pieza por pieza.

Hay un detalle importante de seguridad que tranquiliza a Bit: Tailscale ayuda a que tus dispositivos se encuentren, pero **tus archivos no pasan por los servidores de Tailscale**. Lo normal es que tu teléfono y polypaw-nas se conecten directamente entre sí, de punta a punta, cifrados con WireGuard.

## 4. La tailnet: tu red privada personal

Cuando instalas Tailscale en varios dispositivos con la misma cuenta, todos juntos forman tu red privada. Esa red tiene un nombre: tailnet.

> ### 🟦 ¿Que significa? — *Tailnet*
> Es el conjunto de todos tus dispositivos conectados a tu cuenta de Tailscale. Es tu "red mágica" privada: tu teléfono, tu laptop personal y polypaw-nas viven dentro de ella aunque estén en lugares distintos.
> **Para qué sirve:** agrupar tus equipos para que se vean entre sí, sin que nadie de fuera pueda entrar.
> **Dónde aparece en tu NAS real:** **polypaw-nas** es uno de los miembros de tu tailnet; los demás (tu móvil, tu portátil) se conectan a él dentro de esa red.

> ### 💡 Tip
> Tu tailnet es **tuya y solo tuya**. Por defecto nadie más que los dispositivos con tu cuenta puede entrar. Es como un grupo de chat privado: si no estás invitado, no existe para ti.

## 5. Instalar Tailscale en polypaw-nas

En tu NAS real ya está instalado, pero conviene que sepas cómo se hace, porque algún día reinstalarás el sistema o añadirás un dispositivo nuevo. El proceso en Ubuntu Server 26.04 es directo.

Primero, instala Tailscale con el script oficial:

```bash
curl -fsSL https://tailscale.com/install.sh | sh
```

> ### 🟦 ¿Que significa? — *curl*
> Es una herramienta de terminal que descarga cosas de internet (páginas, archivos, scripts). El `| sh` que ves después le dice "lo que descargues, ejecútalo".
> **Para qué sirve:** aquí, bajar e instalar Tailscale de un solo paso.
> **Dónde aparece en tu NAS real:** lo usarás muchas veces en polypaw-nas para instalar programas o scripts oficiales.

> ### ⚠️ Cuidado
> Ejecutar `curl ... | sh` corre código de internet directamente en tu servidor. Hazlo **solo** con fuentes de confianza absoluta, como la web oficial de Tailscale (`tailscale.com`). Nunca con un enlace que no reconozcas. Bit revisa siempre de dónde viene el tubo antes de meter la mano.

Una vez instalado, levantas el servicio y vinculas la máquina a tu cuenta:

```bash
sudo tailscale up
```

Esto te mostrará un enlace. Lo abres en cualquier navegador (en tu teléfono o portátil), inicias sesión con tu cuenta (Google, GitHub, etc.) y autorizas a polypaw-nas. Desde ese momento, el NAS forma parte de tu tailnet.

> ### 🟦 ¿Que significa? — *sudo*
> Es el prefijo que da permisos de administrador a un comando. Sin él, muchas tareas de sistema fallan por falta de permisos.
> **Para qué sirve:** ejecutar acciones que tocan el sistema completo, como arrancar un servicio de red.
> **Dónde aparece en tu NAS real:** lo usas constantemente en polypaw-nas para administrar Samba, Cockpit, Docker, etc.

Para ver el estado de la conexión:

```bash
tailscale status
```

Esto te lista todos los dispositivos de tu tailnet, sus nombres y sus direcciones especiales. Justo de esas direcciones hablamos ahora.

> ### 🟦 ¿Que significa? — *systemctl y systemd*
> **systemd** es el "director de orquesta" de Ubuntu: el programa que arranca y vigila todos los servicios del sistema al encender. **systemctl** es el comando con el que tú le das órdenes a ese director (arrancar, parar o consultar un servicio). El servicio de Tailscale se llama `tailscaled` (la `d` final significa *daemon*, un programa que corre en segundo plano sin que lo veas).
> **Para qué sirve:** comprobar y controlar que un servicio, como Tailscale, está corriendo.
> **Dónde aparece en tu NAS real:** en **polypaw-nas** usas `systemctl` para revisar Tailscale, Samba, Cockpit o Docker, y para que arranquen solos al encender el laptop.

> ### 🟦 ¿Que significa? — *UPS (Sistema de Alimentación Ininterrumpida)*
> Es una batería de emergencia que mantiene encendido un equipo durante un corte de luz, dándole tiempo de seguir funcionando o de apagarse sin perder datos.
> **Para qué sirve:** que un microcorte eléctrico no tumbe el servidor de golpe.
> **Dónde aparece en tu NAS real:** **polypaw-nas** es un laptop Acer Nitro, así que su propia batería interna actúa como UPS natural: ante un microcorte, sigue en línea sin apagarse.

> ### 🔎 En tu servidor
> En **polypaw-nas** puedes comprobar que Tailscale arranca solo al encender el laptop:
> ```bash
> systemctl status tailscaled
> ```
> Si dice `active (running)`, tu NAS estará disponible en la tailnet cada vez que lo enciendas, sin que tengas que tocar nada. Recuerda que su batería actúa como UPS natural, así que ante un microcorte de luz seguirá en línea.

## 6. La IP 100.x: la dirección dentro de la tailnet

Cuando un dispositivo entra a tu tailnet, Tailscale le da una dirección nueva, distinta de su IP de casa. Esas direcciones empiezan por `100.`

> ### 🟦 ¿Que significa? — *IP 100.x (dirección de la tailnet)*
> Es una IP privada que Tailscale asigna a cada dispositivo de tu red mágica, dentro del rango `100.64.x.x` a `100.127.x.x`. Es estable: a polypaw-nas le toca siempre la misma mientras esté en tu cuenta.
> **Para qué sirve:** identificar a cada equipo dentro de la tailnet, sin importar dónde esté físicamente.
> **Dónde aparece en tu NAS real:** **polypaw-nas** tiene una IP como `100.x.y.z`. Escribiéndola desde tu teléfono (con Tailscale activo) llegas al NAS desde cualquier parte del mundo.

Para ver la IP 100.x de tu propia máquina:

```bash
tailscale ip -4
```

> ### 💡 Tip
> La gracia de la IP 100.x es que **no cambia aunque te muevas de red**. Tu casa cambia de IP pública cada cierto tiempo, pero la `100.x` de polypaw-nas es estable. Apúntala o, mejor aún, usa MagicDNS para no tener que memorizarla (siguiente sección).

## 7. MagicDNS: llamar a tu NAS por su nombre

Memorizar números como `100.84.31.7` es incómodo. Tailscale tiene una función para llamar a tus equipos por su nombre.

> ### 🟦 ¿Que significa? — *DNS*
> Es la "agenda de contactos" de internet: traduce nombres fáciles (como `google.com`) a las direcciones IP numéricas que entienden las máquinas.
> **Para qué sirve:** que tú escribas nombres en vez de números difíciles de recordar.
> **Dónde aparece en tu NAS real:** ya conoces el DNS porque en polypaw-nas corre **AdGuard Home**, que es un DNS que además bloquea anuncios.

> ### 🟦 ¿Que significa? — *MagicDNS*
> Es la función de Tailscale que pone nombres automáticos a los dispositivos de tu tailnet. En vez de la IP `100.x`, puedes escribir directamente el nombre del equipo, por ejemplo `polypaw-nas`.
> **Para qué sirve:** acceder a tus equipos por nombre, sin memorizar números.
> **Dónde aparece en tu NAS real:** con MagicDNS activado, escribir `polypaw-nas` en tu navegador o explorador de archivos lleva directo a tu laptop Acer, esté donde esté.

MagicDNS se activa con un clic en el panel web de Tailscale (en `login.tailscale.com`, sección DNS). Una vez activo, puedes probar desde otro dispositivo de tu tailnet:

```bash
ping polypaw-nas
```

> ### 🟦 ¿Que significa? — *ping*
> Es un comando que envía un pequeño mensaje a otro equipo y espera respuesta, como decir "¿estás ahí?" y escuchar un "sí". Si contesta, hay conexión; si no, algo falla en el camino.
> **Para qué sirve:** comprobar de forma rápida si un dispositivo está accesible en la red.
> **Dónde aparece en tu NAS real:** lo usas para verificar que **polypaw-nas** responde por su nombre de MagicDNS desde otro equipo de tu tailnet.

Si responde, el nombre ya funciona y olvidaste para siempre la IP numérica.

> ### 💡 Tip
> A partir de aquí, en todos los ejemplos puedes usar indistintamente la IP `100.x` o el nombre `polypaw-nas`. El nombre es más cómodo; la IP es el plan B si MagicDNS no estuviera activo.

## 8. Por qué Tailscale es más seguro que abrir puertos

Esta es la sección que más le importa a Bit. Comparemos las dos formas de llegar a tu NAS desde fuera.

**Abrir puertos (lo que NO debes hacer):** le dices al router que cualquiera de internet pueda tocar el puerto de Cockpit (9090) o de Samba de tu casa. Resultado: tu NAS queda visible y expuesto a todo internet. Robots automáticos lo encontrarán en minutos y probarán contraseñas sin parar. Una sola debilidad y entran.

**Usar Tailscale (lo recomendado):** tu NAS **no abre ninguna puerta a internet**. Solo es accesible para los dispositivos de tu tailnet, ya autenticados con tu cuenta y cifrados con WireGuard. Para el resto de internet, polypaw-nas es invisible: no existe.

> ### 🟦 ¿Que significa? — *Puerto*
> Es un "número de canal" dentro de un dispositivo de red. Cada servicio escucha en su puerto: Cockpit usa el 9090, Samba usa los suyos, un servidor web el 80 o el 443.
> **Para qué sirve:** distinguir varios servicios en una misma máquina, como apartados distintos en un mismo edificio.
> **Dónde aparece en tu NAS real:** en **polypaw-nas**, Cockpit escucha en el puerto **9090**. Con Tailscale, ese puerto solo es alcanzable desde tu tailnet, nunca desde internet abierto.

> ### 🟦 ¿Que significa? — *Superficie de ataque*
> Es la cantidad de "puertas y ventanas" que un atacante podría intentar forzar. Cuantas menos, más seguro.
> **Para qué sirve:** medir tu riesgo. Menos puertos abiertos = menos superficie = menos riesgo.
> **Dónde aparece en tu NAS real:** al no abrir puertos y usar solo Tailscale, la superficie de ataque de polypaw-nas hacia internet es prácticamente cero.

> ### ⚠️ Cuidado
> Aunque uses Tailscale, **las contraseñas fuertes siguen siendo obligatorias**. Tailscale protege el camino, pero la cuenta de tu usuario en polypaw-nas, la de Samba y la de Cockpit deben tener contraseñas largas y únicas. Y protege con celo el acceso a tu cuenta de Tailscale (activa verificación en dos pasos): quien entre a tu cuenta entra a tu tailnet.

## 9. Acceder a Cockpit por Tailscale

Cockpit es el panel web con el que administras polypaw-nas desde el navegador. Recordemos qué es.

> ### 🟦 ¿Que significa? — *Cockpit*
> Es un panel de administración con interfaz web para gestionar un servidor Linux: ver uso de CPU y RAM, discos, servicios, actualizaciones, todo desde el navegador.
> **Para qué sirve:** administrar el NAS sin escribir comandos, de forma visual.
> **Dónde aparece en tu NAS real:** en **polypaw-nas** corre en el puerto **9090** y es donde vigilas, por ejemplo, que la RAM de 8 GB no se quede corta.

Estando fuera de casa, con Tailscale activo en tu teléfono o portátil, abre el navegador y escribe:

```
https://polypaw-nas:9090
```

O, si prefieres la IP de la tailnet:

```
https://100.x.y.z:9090
```

Y listo: entras a Cockpit como si estuvieras en el salón de tu casa. Inicias sesión con tu usuario de Ubuntu y administras el NAS desde donde estés.

> ### 🟦 ¿Que significa? — *Docker / Podman*
> Son herramientas de **contenedores**: empaquetan una aplicación con todo lo que necesita para funcionar, de forma aislada del resto del sistema. Docker es el más conocido; Podman hace lo mismo y es compatible, pero sin un servicio central corriendo siempre.
> **Para qué sirve:** instalar y mover programas sin que se peleen entre sí ni ensucien el sistema; ideal para un NAS donde conviven varios servicios.
> **Dónde aparece en tu NAS real:** en **polypaw-nas** puedes correr servicios como AdGuard Home dentro de contenedores Docker o Podman, cada uno en su propia "caja".

> ### 🔎 En tu servidor
> Desde Cockpit en **polypaw-nas**, lo primero que conviene revisar al entrar de forma remota es el panel de **Overview**: ahí ves la RAM. Como solo tienes 8 GB, si AdGuard Home, Cockpit, Docker/Podman y Samba coinciden con un análisis pesado, la memoria puede apretarse. Detectarlo a tiempo desde la cafetería te evita un susto.

> ### 🟦 ¿Que significa? — *Certificado autofirmado*
> Un **certificado** es el carnet digital que usa una web para demostrar su identidad y cifrar la conexión `https`. Normalmente lo valida una autoridad externa de confianza. Uno **autofirmado** es el que el propio servidor se emite a sí mismo: el cifrado funciona igual, pero el navegador no conoce a quién lo firmó y por eso muestra un aviso.
> **Para qué sirve:** cifrar la conexión a Cockpit sin depender de una autoridad externa de pago.
> **Dónde aparece en tu NAS real:** Cockpit en **polypaw-nas** usa un certificado autofirmado; el aviso del navegador es esperable y, dentro de tu tailnet, la conexión sigue cifrada y segura.

> ### 💡 Tip
> Si el navegador te avisa de que el certificado no es de confianza al entrar por `https`, es normal: Cockpit usa un certificado propio (autofirmado) y la conexión va de todos modos cifrada y protegida dentro de tu tailnet. Acepta la excepción y continúa.

## 10. Acceder a Samba por Tailscale

Samba es el servicio que comparte tu carpeta de archivos en la red. Recordemos.

> ### 🟦 ¿Que significa? — *Samba*
> Es el software que permite compartir carpetas entre computadoras como si fueran una unidad de red. Funciona con Windows, macOS y Linux.
> **Para qué sirve:** acceder a archivos del NAS desde otros equipos, arrastrar y soltar como en una carpeta normal.
> **Dónde aparece en tu NAS real:** en **polypaw-nas** tienes el recurso compartido **PolyPawNAS**, apuntado a tu HDD de 954 GB montado en `/srv/nas`.

> ### 🟦 ¿Que significa? — *Recurso compartido (share)*
> Es una carpeta concreta que el servidor publica para que otros la usen por la red. Tiene un nombre y permisos.
> **Para qué sirve:** decidir qué parte del disco se comparte y quién puede entrar.
> **Dónde aparece en tu NAS real:** tu share se llama **PolyPawNAS** y vive en `/srv/nas`, en el HDD de 954 GB (no en el SSD de 238 GB del sistema).

Desde fuera de casa, con Tailscale activo, conectas a Samba usando el nombre o la IP de la tailnet. En el explorador de archivos:

- **Windows:** en la barra de direcciones escribe `\\polypaw-nas\PolyPawNAS`
- **macOS:** menú Ir → Conectar al servidor → `smb://polypaw-nas/PolyPawNAS`
- **Linux:** en el gestor de archivos → `smb://polypaw-nas/PolyPawNAS`

Si MagicDNS no estuviera activo, sustituye `polypaw-nas` por la IP `100.x.y.z`.

> ### 💡 Tip
> Esto es justo lo que necesitas para respaldar y mover datos de tus proyectos. Por ejemplo, copiar a `/srv/nas` una versión de **tunal-digital**, **PolyPaw**, **RachaSimple** o **Faro/Organizer** mientras estás fuera, o recuperar un archivo que olvidaste. Todo viaja cifrado por la tailnet.

> ### ⚠️ Cuidado
> Samba por Tailscale es seguro porque va por el túnel cifrado y solo desde tu tailnet. Pero nunca, jamás, expongas Samba directamente a internet abriendo sus puertos en el router. Samba abierto a internet es de las cosas más peligrosas que puedes hacer con un NAS. Bit se desmaya solo de pensarlo.

## 11. Buenas costumbres de seguridad y respaldos

Tailscale resuelve el acceso remoto, pero la seguridad es un conjunto de hábitos, no un solo botón.

> ### 💡 Tip
> Repasa esta lista mental cada cierto tiempo:
> - **Contraseñas fuertes y únicas** para tu usuario de Ubuntu, Samba y Cockpit.
> - **Verificación en dos pasos** en tu cuenta de Tailscale.
> - **Nada de puertos abiertos** en el router salvo que sea estrictamente necesario y sepas exactamente qué haces.
> - **Actualiza** polypaw-nas con regularidad (`sudo apt update && sudo apt upgrade`).
> - **Respaldos:** tener los datos en `/srv/nas` no es un respaldo si solo existen ahí. Un HDD puede fallar. Mantén copias en otro disco o en la nube.

> ### 🔎 En tu servidor
> Si algún dispositivo se pierde o lo dejas de usar (un teléfono viejo, por ejemplo), entra al panel de Tailscale en `login.tailscale.com`, busca ese equipo y elimínalo de la tailnet. Así nadie podrá usar ese dispositivo robado o desechado para entrar a **polypaw-nas**. Mantener limpia la lista de dispositivos es parte de la higiene de seguridad.

## ✅ Checklist — ¿ya domino esto?

- [ ] Entiendo por qué desde fuera de casa no puedo llegar a polypaw-nas por su IP privada (por el NAT del router).
- [ ] Sé qué es una VPN y por qué crea un túnel cifrado entre mis dispositivos.
- [ ] Puedo explicar, a grandes rasgos, la relación entre Tailscale (el coche) y WireGuard (el motor).
- [ ] Sé qué es mi tailnet y qué dispositivos la forman.
- [ ] Reconozco la IP `100.x` y sé que es la dirección de polypaw-nas dentro de la tailnet.
- [ ] Entiendo qué hace MagicDNS y puedo llamar a mi NAS por el nombre `polypaw-nas`.
- [ ] Puedo explicar por qué Tailscale es más seguro que abrir puertos en el router.
- [ ] Sé acceder a Cockpit (puerto 9090) desde fuera de casa por Tailscale.
- [ ] Sé conectar al recurso compartido PolyPawNAS de Samba por Tailscale.
- [ ] Tengo presente que necesito contraseñas fuertes y respaldos aunque use Tailscale.

## 🧪 Ejercicios

1. 💻 **Comprueba el estado de Tailscale en polypaw-nas.** Ejecuta `tailscale status` y `systemctl status tailscaled`. Anota cuántos dispositivos hay en tu tailnet y confirma que el servicio aparece como `active (running)`.

2. 💻 **Encuentra tu IP 100.x.** En polypaw-nas ejecuta `tailscale ip -4` y apunta la dirección. Luego comprueba con `tailscale status` que coincide con la que figura junto al nombre del NAS.

3. 💻 **Prueba MagicDNS desde otro dispositivo.** Con Tailscale activo en tu teléfono o portátil, ejecuta `ping polypaw-nas` (o intenta abrir `https://polypaw-nas:9090` en el navegador). Verifica que el nombre resuelve sin escribir la IP numérica.

4. 💻 **Entra a Cockpit como si estuvieras fuera.** Apaga el Wi-Fi de tu teléfono y usa solo datos móviles (para simular que estás en la calle). Con Tailscale activo, abre `https://polypaw-nas:9090`, inicia sesión y revisa la RAM de polypaw-nas en el panel Overview. ¿Cuánta memoria de los 8 GB está libre?

5. 💻 **Conecta a Samba por la tailnet.** Desde fuera de la red de casa (o simulándolo con datos móviles), conecta al recurso compartido `PolyPawNAS` usando `\\polypaw-nas\PolyPawNAS` o `smb://polypaw-nas/PolyPawNAS`. Copia un archivo pequeño de uno de tus repos (por ejemplo, de RachaSimple o Faro) a `/srv/nas` para practicar un respaldo remoto.

6. **Explica con tus palabras** (sin terminal): a un amigo que quiere "abrir el puerto 9090 de su router para entrar a su NAS desde el trabajo", convéncelo de usar Tailscale en su lugar. Menciona superficie de ataque, cifrado y qué pasa con los robots que escanean internet.
