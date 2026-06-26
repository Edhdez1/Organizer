# Capitulo 11 — Acceso remoto seguro con Tailscale

<p align="center">
  <img src="../../recursos/imagenes/09-nas-y-servidores/cap11.png" alt="Ilustración del capítulo (pixel art con Bit)" width="640">
</p>


> Hasta ahora siempre has manejado tu NAS desde casa, pegado a la misma red Wi-Fi o al mismo cable que **polypaw-nas**. Pero, ¿qué haces cuando sales? Imagina que estás en la cafetería, en casa de un amigo o de viaje, y de repente necesitas un archivo que dejaste en tu HDD de 954 GB, o quieres abrir Cockpit para echarle un ojo a la RAM. En este capítulo vas a aprender a llegar a tu laptop Acer Nitro desde cualquier rincón del mundo, sin riesgos y sin abrirle tu casa a internet. Bit, el ajolote, viene contigo: detesta las puertas abiertas (es un anfibio de lo más precavido) y se va a poner muy contento de que aquí casi no abramos ninguna.

## 1. El problema: tu NAS vive detrás de un muro

Tu servidor **polypaw-nas** (ese laptop Acer Nitro AN515-54 con Ubuntu Server 26.04) cuelga del router de tu casa. Dentro de la red local todo es comodísimo: escribes la IP del NAS y entras a Samba o a Cockpit sin pensarlo. El detalle es que esa red local funciona como una casa amurallada: desde la calle, o sea desde internet, nadie ve lo que hay dentro.

Quien levanta ese muro es tu router, con una técnica que se llama NAT.

> ### 🟦 ¿Que significa? — *NAT (Network Address Translation)*
> Es la función del router que reparte una sola dirección de internet entre todos los aparatos de tu casa: laptop, teléfono, NAS, tele. Por dentro, cada uno tiene una IP privada que **solo vale dentro de tu casa**; por fuera, todos salen disfrazados con la misma IP pública del router.
> **Para qué sirve:** permite que muchos dispositivos compartan una sola conexión y, de paso, los mantiene escondidos de internet.
> **Dónde aparece en tu NAS real:** **polypaw-nas** tiene una IP privada (algo del estilo `192.168.x.x`) que solo funciona puertas adentro. Desde la cafetería, esa dirección no te lleva a ningún lado.

> ### 🟦 ¿Que significa? — *IP pública vs IP privada*
> La **IP pública** es la dirección de tu casa tal como la ve internet (te la asigna tu proveedor). La **IP privada** es la dirección interna de cada aparato dentro de tu red.
> **Para qué sirve:** piénsalo así: la pública es el nombre de tu calle; la privada es el número de habitación dentro de la casa. Desde fuera solo se ve la calle, nunca las habitaciones.
> **Dónde aparece en tu NAS real:** **polypaw-nas** ocupa una "habitación" (su IP privada) detrás de la "puerta de la calle" (la IP pública de tu router).

El problema, entonces, es bien concreto: desde fuera no hay manera directa de tocar a polypaw-nas. La tentación de toda la vida es hacerle un boquete al muro para colarte. Eso se llama abrir puertos, y es justo lo que **no** vamos a hacer.

> ### ⚠️ Cuidado
> "Abrir un puerto" es pedirle al router que deje pasar tráfico de internet directo hacia un aparato concreto de tu casa. Suena cómodo, pero equivale a dejar una ventana de par en par para que entre el repartidor... y de paso cualquier ladrón que pase por ahí. Internet está plagado de robots que escanean ventanas abiertas a todas horas, día y noche. Más adelante verás la alternativa segura.

## 2. Qué es una VPN

La solución elegante no pasa por agujerear el muro, sino por tender un túnel secreto entre tu teléfono y tu NAS. Ese túnel es una VPN.

> ### 🟦 ¿Que significa? — *VPN (Red Privada Virtual)*
> Es una conexión cifrada que une dos o más dispositivos como si compartieran la misma red local, aunque en realidad estén en ciudades distintas. Es "virtual" porque la red no existe físicamente: se monta por software encima de internet. Y es "privada" porque solo entran tus dispositivos.
> **Para qué sirve:** te permite hablar con tu NAS desde fuera como si estuvieras sentado en casa, sin tener que exponer nada a internet.
> **Dónde aparece en tu NAS real:** instalarás una VPN llamada Tailscale en **polypaw-nas** y en tu teléfono o tu laptop; todos quedarán dentro de la misma "red mágica".

> ### 🟦 ¿Que significa? — *Cifrado*
> Es convertir la información en un texto ilegible para quien no tenga la llave correcta. Si alguien intercepta los datos por el camino, solo encuentra basura sin sentido.
> **Para qué sirve:** que tus archivos y tus contraseñas viajen protegidos cuando cruzan internet.
> **Dónde aparece en tu NAS real:** todo lo que circule entre tu teléfono y polypaw-nas por la VPN va cifrado, incluso si estás en una Wi-Fi pública de dudosa fiabilidad.

Imagina la VPN como uno de esos tubos neumáticos de los bancos antiguos, un conducto privado que conecta únicamente tu mano con la ventanilla del NAS. Nadie más puede meter la mano en ese tubo.

## 3. Tailscale y WireGuard a grandes rasgos

Montar una VPN tradicional a mano es un suplicio: claves, configuraciones, IPs, cortafuegos por todos lados. Tailscale nació justamente para que todo eso sea casi automático.

> ### 🟦 ¿Que significa? — *Cortafuegos (firewall)*
> Es un guardián que decide qué tráfico de red entra o sale de un equipo. Bloquea las conexiones que no toca y deja pasar solo las que tú autorizas.
> **Para qué sirve:** proteger tu NAS filtrando quién puede tocarlo, como un portero que solo deja entrar a los invitados.
> **Dónde aparece en tu NAS real:** Ubuntu Server trae su propio cortafuegos integrado; junto con Tailscale, **polypaw-nas** mantiene cerrado todo lo que da a internet y abre únicamente el túnel cifrado de tu tailnet.

> ### 🟦 ¿Que significa? — *Tailscale*
> Es un servicio que crea una VPN privada entre tus dispositivos con muy poca configuración. Instalas un programa, inicias sesión con una cuenta, y Tailscale se ocupa de conectarlo todo de forma segura.
> **Para qué sirve:** acceder a tu NAS de forma remota sin tener que ser experto en redes.
> **Dónde aparece en tu NAS real:** ya está instalado en **polypaw-nas** y es la pieza que te permite entrar a Cockpit y a Samba desde fuera de casa.

> ### 🟦 ¿Que significa? — *WireGuard*
> Es la tecnología (el "motor") que Tailscale usa por debajo para crear los túneles cifrados. WireGuard es moderno, rápido y tiene muy poco código, lo que lo vuelve difícil de atacar.
> **Para qué sirve:** es lo que de verdad cifra y transporta los datos; Tailscale solo le pone una cara amable.
> **Dónde aparece en tu NAS real:** no lo verás directamente, pero cada vez que tu teléfono habla con polypaw-nas por Tailscale, es WireGuard el que está moviendo los datos.

> ### 💡 Tip
> Para que se te quede grabado: **WireGuard es el motor; Tailscale es el coche completo**, con volante, asientos y una llave fácil de usar. Tú conduces el coche y te olvidas de armar el motor pieza por pieza.

Hay un detalle de seguridad que deja muy tranquilo a Bit: Tailscale ayuda a que tus dispositivos se encuentren, pero **tus archivos no pasan por los servidores de Tailscale**. Lo habitual es que tu teléfono y polypaw-nas se conecten directamente, de punta a punta, cifrados con WireGuard.

## 4. La tailnet: tu red privada personal

Cuando instalas Tailscale en varios dispositivos con la misma cuenta, todos ellos forman una red privada. Esa red tiene nombre propio: tailnet.

> ### 🟦 ¿Que significa? — *Tailnet*
> Es el conjunto de todos tus dispositivos conectados a tu cuenta de Tailscale. Es tu "red mágica" privada: tu teléfono, tu laptop personal y polypaw-nas conviven dentro de ella aunque estén en lugares distintos.
> **Para qué sirve:** juntar tus equipos para que se vean entre sí, sin que nadie de fuera pueda entrar.
> **Dónde aparece en tu NAS real:** **polypaw-nas** es uno más de los miembros de tu tailnet; el resto (tu móvil, tu portátil) se conecta a él dentro de esa misma red.

> ### 💡 Tip
> Tu tailnet es **tuya y solo tuya**. De entrada, nadie que no sea un dispositivo con tu cuenta puede entrar. Es como un grupo de chat privado: si no te invitaron, para ti ni siquiera existe.

## 5. Instalar Tailscale en polypaw-nas

En tu NAS real ya está instalado, pero conviene que sepas cómo se hace, porque tarde o temprano reinstalarás el sistema o querrás sumar un dispositivo nuevo. En Ubuntu Server 26.04 el proceso es bastante directo.

Lo primero es instalar Tailscale con el script oficial:

```bash
curl -fsSL https://tailscale.com/install.sh | sh
```

> ### 🟦 ¿Que significa? — *curl*
> Es una herramienta de terminal que descarga cosas de internet: páginas, archivos, scripts. El `| sh` que ves a continuación le dice "lo que descargues, ejecútalo".
> **Para qué sirve:** aquí, bajar e instalar Tailscale de un solo golpe.
> **Dónde aparece en tu NAS real:** lo usarás un montón de veces en polypaw-nas para instalar programas o scripts oficiales.

> ### ⚠️ Cuidado
> Ejecutar `curl ... | sh` corre código de internet directamente en tu servidor. Hazlo **solo** con fuentes en las que confíes por completo, como la web oficial de Tailscale (`tailscale.com`). Nunca con un enlace que no reconozcas. Bit siempre revisa de dónde viene el tubo antes de meter la mano.

Con Tailscale ya instalado, levantas el servicio y enganchas la máquina a tu cuenta:

```bash
sudo tailscale up
```

Esto te devuelve un enlace. Lo abres en cualquier navegador (el del teléfono o el del portátil, da igual), inicias sesión con tu cuenta (Google, GitHub, lo que prefieras) y autorizas a polypaw-nas. A partir de ahí, el NAS ya forma parte de tu tailnet.

> ### 🟦 ¿Que significa? — *sudo*
> Es el prefijo que le da permisos de administrador a un comando. Sin él, muchas tareas de sistema fallan porque no tienen permiso suficiente.
> **Para qué sirve:** ejecutar acciones que tocan el sistema entero, como arrancar un servicio de red.
> **Dónde aparece en tu NAS real:** lo usas a cada rato en polypaw-nas para administrar Samba, Cockpit, Docker y compañía.

Para ver cómo va la conexión:

```bash
tailscale status
```

Esto te enumera todos los dispositivos de tu tailnet, con sus nombres y sus direcciones especiales. Y precisamente de esas direcciones vamos a hablar ahora.

> ### 🟦 ¿Que significa? — *systemctl y systemd*
> **systemd** es el "director de orquesta" de Ubuntu: el programa que arranca y vigila todos los servicios del sistema en cuanto enciendes. **systemctl** es el comando con el que tú le das órdenes a ese director (arrancar, parar o consultar un servicio). El servicio de Tailscale se llama `tailscaled`; esa `d` final significa *daemon*, un programa que corre en segundo plano sin que lo veas.
> **Para qué sirve:** comprobar y controlar que un servicio, como Tailscale, esté corriendo.
> **Dónde aparece en tu NAS real:** en **polypaw-nas** usas `systemctl` para revisar Tailscale, Samba, Cockpit o Docker, y para que arranquen solos cada vez que enciendes el laptop.

> ### 🟦 ¿Que significa? — *UPS (Sistema de Alimentación Ininterrumpida)*
> Es una batería de emergencia que mantiene encendido un equipo durante un corte de luz, dándole margen para seguir funcionando o apagarse sin perder datos.
> **Para qué sirve:** que un microcorte eléctrico no te tumbe el servidor de golpe.
> **Dónde aparece en tu NAS real:** **polypaw-nas** es un laptop Acer Nitro, así que su propia batería interna hace de UPS natural: ante un microcorte, sigue en línea sin apagarse.

> ### 🔎 En tu servidor
> En **polypaw-nas** puedes confirmar que Tailscale arranca solo al encender el laptop:
> ```bash
> systemctl status tailscaled
> ```
> Si te dice `active (running)`, tu NAS estará disponible en la tailnet cada vez que lo enciendas, sin que tengas que mover un dedo. Y recuerda que su batería hace de UPS natural, así que ante un microcorte de luz seguirá en línea.

## 6. La IP 100.x: la dirección dentro de la tailnet

En cuanto un dispositivo entra a tu tailnet, Tailscale le asigna una dirección nueva, distinta de su IP de casa. Todas esas direcciones empiezan por `100.`

> ### 🟦 ¿Que significa? — *IP 100.x (dirección de la tailnet)*
> Es una IP privada que Tailscale le da a cada dispositivo de tu red mágica, dentro del rango que va de `100.64.x.x` a `100.127.x.x`. Es estable: a polypaw-nas le toca siempre la misma mientras siga en tu cuenta.
> **Para qué sirve:** identificar a cada equipo dentro de la tailnet, sin importar dónde esté físicamente.
> **Dónde aparece en tu NAS real:** **polypaw-nas** tiene una IP del tipo `100.x.y.z`. Si la escribes desde tu teléfono (con Tailscale activo), llegas al NAS estés donde estés.

Para ver la IP 100.x de tu propia máquina:

```bash
tailscale ip -4
```

> ### 💡 Tip
> Lo bueno de la IP 100.x es que **no cambia aunque te muevas de red**. Tu casa va cambiando de IP pública cada cierto tiempo, pero la `100.x` de polypaw-nas se queda fija. Apúntala o, mejor todavía, usa MagicDNS para no tener que memorizarla (lo vemos en la siguiente sección).

## 7. MagicDNS: llamar a tu NAS por su nombre

Memorizar números como `100.84.31.7` es un fastidio. Por suerte, Tailscale tiene una función para llamar a tus equipos por su nombre.

> ### 🟦 ¿Que significa? — *DNS*
> Es la "agenda de contactos" de internet: traduce nombres fáciles (como `google.com`) a las direcciones IP numéricas que entienden las máquinas.
> **Para qué sirve:** que tú escribas nombres en vez de números imposibles de recordar.
> **Dónde aparece en tu NAS real:** el DNS ya te suena, porque en polypaw-nas corre **AdGuard Home**, que es un DNS que además te bloquea los anuncios.

> ### 🟦 ¿Que significa? — *MagicDNS*
> Es la función de Tailscale que les pone nombres automáticos a los dispositivos de tu tailnet. En lugar de la IP `100.x`, escribes directamente el nombre del equipo, por ejemplo `polypaw-nas`.
> **Para qué sirve:** entrar a tus equipos por nombre, sin tener que memorizar números.
> **Dónde aparece en tu NAS real:** con MagicDNS activado, escribir `polypaw-nas` en el navegador o en el explorador de archivos te lleva directo a tu laptop Acer, esté donde esté.

MagicDNS se enciende con un clic desde el panel web de Tailscale (en `login.tailscale.com`, en la sección DNS). Ya activo, lo puedes probar desde cualquier otro dispositivo de tu tailnet:

```bash
ping polypaw-nas
```

> ### 🟦 ¿Que significa? — *ping*
> Es un comando que manda un mensajito a otro equipo y espera respuesta, como decir "¿estás ahí?" y oír un "sí". Si contesta, hay conexión; si no, algo se rompió por el camino.
> **Para qué sirve:** comprobar rápido si un dispositivo está accesible en la red.
> **Dónde aparece en tu NAS real:** lo usas para verificar que **polypaw-nas** responde por su nombre de MagicDNS desde otro equipo de tu tailnet.

Si responde, el nombre ya funciona y te puedes olvidar para siempre de la IP numérica.

> ### 💡 Tip
> De aquí en adelante, en todos los ejemplos puedes usar tanto la IP `100.x` como el nombre `polypaw-nas`, lo que más te guste. El nombre es más cómodo; la IP es tu plan B por si MagicDNS no estuviera activo.

## 8. Por qué Tailscale es más seguro que abrir puertos

Esta es la sección que más le importa a Bit. Pongamos lado a lado las dos formas de llegar a tu NAS desde fuera.

**Abrir puertos (lo que NO debes hacer):** le dices al router que cualquiera en internet pueda tocar el puerto de Cockpit (9090) o el de Samba de tu casa. ¿Resultado? Tu NAS queda a la vista y expuesto a todo internet. Los robots automáticos lo encuentran en cuestión de minutos y se ponen a probar contraseñas sin descanso. Basta una sola debilidad y entran.

**Usar Tailscale (lo recomendado):** tu NAS **no abre ninguna puerta a internet**. Solo lo alcanzan los dispositivos de tu tailnet, ya autenticados con tu cuenta y cifrados con WireGuard. Para el resto de internet, polypaw-nas es invisible: sencillamente, no existe.

> ### 🟦 ¿Que significa? — *Puerto*
> Es un "número de canal" dentro de un dispositivo de red. Cada servicio escucha en el suyo: Cockpit usa el 9090, Samba los suyos, un servidor web el 80 o el 443.
> **Para qué sirve:** distinguir varios servicios en una misma máquina, como apartados separados dentro de un mismo edificio.
> **Dónde aparece en tu NAS real:** en **polypaw-nas**, Cockpit escucha en el puerto **9090**. Con Tailscale, a ese puerto solo se llega desde tu tailnet, jamás desde internet abierto.

> ### 🟦 ¿Que significa? — *Superficie de ataque*
> Es la cantidad de "puertas y ventanas" que un atacante podría intentar forzar. Cuantas menos, más seguro estás.
> **Para qué sirve:** medir tu riesgo. Menos puertos abiertos = menos superficie = menos riesgo.
> **Dónde aparece en tu NAS real:** al no abrir ningún puerto y apoyarte solo en Tailscale, la superficie de ataque de polypaw-nas hacia internet es prácticamente cero.

> ### ⚠️ Cuidado
> Aunque uses Tailscale, **las contraseñas fuertes siguen siendo obligatorias**. Tailscale protege el camino, pero la cuenta de tu usuario en polypaw-nas, la de Samba y la de Cockpit tienen que tener contraseñas largas y únicas. Y cuida con celo el acceso a tu cuenta de Tailscale (activa la verificación en dos pasos): quien entre a tu cuenta, entra a tu tailnet.

## 9. Acceder a Cockpit por Tailscale

Cockpit es el panel web con el que administras polypaw-nas desde el navegador. Vale la pena recordar de qué se trata.

> ### 🟦 ¿Que significa? — *Cockpit*
> Es un panel de administración con interfaz web para gestionar un servidor Linux: ver el uso de CPU y RAM, los discos, los servicios, las actualizaciones, todo desde el navegador.
> **Para qué sirve:** administrar el NAS sin escribir comandos, de forma visual.
> **Dónde aparece en tu NAS real:** en **polypaw-nas** corre en el puerto **9090** y es donde vigilas, por ejemplo, que la RAM de 8 GB no se quede corta.

Estando fuera de casa, con Tailscale activo en tu teléfono o tu portátil, abre el navegador y escribe:

```
https://polypaw-nas:9090
```

O, si prefieres tirar de la IP de la tailnet:

```
https://100.x.y.z:9090
```

Y ya está: entras a Cockpit como si estuvieras sentado en el salón de tu casa. Inicias sesión con tu usuario de Ubuntu y administras el NAS desde donde te encuentres.

> ### 🟦 ¿Que significa? — *Docker / Podman*
> Son herramientas de **contenedores**: empaquetan una aplicación con todo lo que necesita para funcionar, aislada del resto del sistema. Docker es el más famoso; Podman hace lo mismo y es compatible, pero sin un servicio central corriendo todo el tiempo.
> **Para qué sirve:** instalar y mover programas sin que se peleen entre sí ni ensucien el sistema; ideal para un NAS donde conviven varios servicios.
> **Dónde aparece en tu NAS real:** en **polypaw-nas** puedes correr servicios como AdGuard Home dentro de contenedores Docker o Podman, cada uno en su propia "caja".

> ### 🔎 En tu servidor
> Desde Cockpit en **polypaw-nas**, lo primero que conviene mirar cuando entras de forma remota es el panel de **Overview**: ahí ves la RAM. Como solo tienes 8 GB, si AdGuard Home, Cockpit, Docker/Podman y Samba coinciden con un análisis pesado, la memoria puede apretarse. Detectarlo a tiempo desde la cafetería te ahorra más de un susto.

> ### 🟦 ¿Que significa? — *Certificado autofirmado*
> Un **certificado** es el carnet digital con el que una web demuestra su identidad y cifra la conexión `https`. Lo normal es que lo valide una autoridad externa de confianza. Uno **autofirmado** es el que el propio servidor se emite a sí mismo: el cifrado funciona igual de bien, pero el navegador no conoce a quién lo firmó y por eso te muestra un aviso.
> **Para qué sirve:** cifrar la conexión a Cockpit sin depender de una autoridad externa de pago.
> **Dónde aparece en tu NAS real:** Cockpit en **polypaw-nas** usa un certificado autofirmado; el aviso del navegador es de esperar y, dentro de tu tailnet, la conexión sigue cifrada y segura.

> ### 💡 Tip
> Si el navegador te avisa de que el certificado no es de confianza al entrar por `https`, no te asustes: es normal. Cockpit usa un certificado propio (autofirmado) y la conexión va cifrada y protegida de todos modos dentro de tu tailnet. Acepta la excepción y sigue adelante.

## 10. Acceder a Samba por Tailscale

Samba es el servicio que comparte tu carpeta de archivos por la red. Vale la pena recordarlo.

> ### 🟦 ¿Que significa? — *Samba*
> Es el software que te deja compartir carpetas entre computadoras como si fueran una unidad de red. Funciona con Windows, macOS y Linux.
> **Para qué sirve:** acceder a los archivos del NAS desde otros equipos, arrastrar y soltar como en una carpeta cualquiera.
> **Dónde aparece en tu NAS real:** en **polypaw-nas** tienes el recurso compartido **PolyPawNAS**, apuntando a tu HDD de 954 GB montado en `/srv/nas`.

> ### 🟦 ¿Que significa? — *Recurso compartido (share)*
> Es una carpeta concreta que el servidor publica para que otros la usen por la red. Tiene su nombre y sus permisos.
> **Para qué sirve:** decidir qué parte del disco se comparte y quién puede entrar.
> **Dónde aparece en tu NAS real:** tu share se llama **PolyPawNAS** y vive en `/srv/nas`, en el HDD de 954 GB (no en el SSD de 238 GB del sistema).

Desde fuera de casa, con Tailscale activo, te conectas a Samba usando el nombre o la IP de la tailnet. En el explorador de archivos:

- **Windows:** en la barra de direcciones escribe `\\polypaw-nas\PolyPawNAS`
- **macOS:** menú Ir → Conectar al servidor → `smb://polypaw-nas/PolyPawNAS`
- **Linux:** en el gestor de archivos → `smb://polypaw-nas/PolyPawNAS`

Si MagicDNS no estuviera activo, cambia `polypaw-nas` por la IP `100.x.y.z`.

> ### 💡 Tip
> Esto es exactamente lo que necesitas para respaldar y mover datos de tus proyectos. Por ejemplo, copiar a `/srv/nas` una versión de **tunal-digital**, **PolyPaw**, **RachaSimple** o **Faro/Organizer** mientras andas fuera, o rescatar un archivo que se te olvidó. Todo viaja cifrado por la tailnet.

> ### ⚠️ Cuidado
> Samba por Tailscale es seguro porque va por el túnel cifrado y solo desde tu tailnet. Pero nunca, jamás, expongas Samba directamente a internet abriendo sus puertos en el router. Samba abierto a internet es de las cosas más peligrosas que puedes hacer con un NAS. Bit se desmaya de solo imaginarlo.

## 11. Buenas costumbres de seguridad y respaldos

Tailscale te resuelve el acceso remoto, pero la seguridad es un conjunto de hábitos, no un único botón mágico.

> ### 💡 Tip
> Repasa esta lista mental cada cierto tiempo:
> - **Contraseñas fuertes y únicas** para tu usuario de Ubuntu, Samba y Cockpit.
> - **Verificación en dos pasos** en tu cuenta de Tailscale.
> - **Nada de puertos abiertos** en el router, salvo que sea estrictamente necesario y sepas exactamente qué estás haciendo.
> - **Actualiza** polypaw-nas con regularidad (`sudo apt update && sudo apt upgrade`).
> - **Respaldos:** tener los datos en `/srv/nas` no es un respaldo si solo existen ahí. Un HDD puede fallar. Mantén copias en otro disco o en la nube.

> ### 🔎 En tu servidor
> Si pierdes algún dispositivo o dejas de usarlo (un teléfono viejo, por ejemplo), entra al panel de Tailscale en `login.tailscale.com`, busca ese equipo y bórralo de la tailnet. Así nadie podrá aprovechar ese dispositivo robado o desechado para entrar a **polypaw-nas**. Mantener limpia la lista de dispositivos también es parte de la higiene de seguridad.

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
