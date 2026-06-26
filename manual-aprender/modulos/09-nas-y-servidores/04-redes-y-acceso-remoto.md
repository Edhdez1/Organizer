# Capítulo 04 — Redes desde cero y acceso remoto

<p align="center">
  <img src="../../recursos/imagenes/09-nas-y-servidores/cap04.png" alt="Ilustración del capítulo (pixel art con Bit)" width="640">
</p>


> Para sacarle partido a tu NAS hace falta entender algo de **redes**: cómo se encuentran los
> dispositivos entre sí, qué es una IP, qué es un puerto y, lo más divertido, cómo entrar a tu NAS
> de forma **segura cuando estás fuera de casa**. Tu equipo ya tiene esto resuelto: usa **Tailscale**
> para el acceso remoto y **Cockpit** para administrarlo. En este capítulo lo vas a entender todo,
> partiendo de cero.

---

## 1. Tu red de casa (LAN)

> ### 🟦 ¿Qué significa? — *Red local (LAN)*
> Una **LAN** (*Local Area Network*, "red de área local") es, sencillamente, la red **de tu casa**.
> Todo lo que está conectado a tu router (por wifi o por cable) forma esa LAN y puede hablar entre
> sí. Tu NAS, tu teléfono y tu laptop están en la misma LAN, y por eso el teléfono ve los archivos
> del NAS sin necesidad de salir a internet.

> ### 🟦 ¿Qué significa? — *IP local y el router*
> ¿Te acuerdas de la **IP** del Módulo 00, esa "dirección" que tiene cada dispositivo? Dentro de tu
> casa, quien reparte esas direcciones es el **router**: a cada aparato le asigna una **IP local**
> (las verás casi siempre con la forma `192.168.1.x`). El router es a la vez el director de tráfico
> de tu LAN y la puerta de salida hacia internet. Tu NAS tiene una IP local fija, o casi fija, y es
> por ahí por donde lo encuentran los demás equipos.

> ### 🟦 ¿Qué significa? — *Nombre de host (hostname)*
> Memorizar IPs es un fastidio, así que cada equipo lleva también un **nombre** (hostname). El de tu
> servidor es **`polypaw-nas`**. En muchas redes puedes escribir el nombre directamente en lugar de
> la IP: `\\polypaw-nas` en vez de `\\192.168.1.50`. Mucho más cómodo de recordar.

---

## 2. Puertos: las "puertas" de un servidor (repaso aplicado)

> ### 🟦 ¿Qué significa? — *Puerto (aplicado a tu NAS)*
> Ya lo viste en el Módulo 00: si la IP es el edificio, el **puerto** es el número de apartamento,
> es decir, **qué servicio** concreto responde. Un mismo servidor ofrece varias cosas a la vez, cada
> una en su propio puerto:
> - Samba (archivos) usa los puertos 445/139.
> - **Cockpit** (el panel web) usa el **9090**, y por eso entras a `https://polypaw-nas:9090`.
> - AdGuard tiene un puerto para su panel y usa el 53 para el DNS.
> Cada servicio se queda escuchando en su puerto, y el puerto se encarga de llevar cada petición al
> programa que le toca.

---

## 3. Administrar con Cockpit (sin terminal)

> ### 🟦 ¿Qué significa? — *Cockpit (panel web de administración)*
> **Cockpit** es una **interfaz web** desde la que administras tu servidor Linux **sin** teclear ni
> un solo comando. Ves de un vistazo el uso de CPU y RAM, los discos, la red, los servicios, los
> logs, e incluso tienes una terminal dentro del propio navegador por si la necesitas. Entras desde
> otro equipo a **`https://polypaw-nas:9090`** con tu usuario de Linux.
> Es el acompañante ideal de la terminal: la terminal te da control total, y Cockpit te da una vista
> cómoda y visual. Para las preguntas del día a día (¿cuánta RAM estoy usando?, ¿sigue vivo este
> servicio?), Cockpit te lo resuelve en segundos.

> ### 💡 Tip — HTTPS y el aviso de "no seguro"
> Cockpit funciona con **HTTPS** (Módulo 00), pero usa un certificado **autofirmado**, es decir,
> generado por tu propio servidor y no por una autoridad pública. Por eso la primera vez el navegador
> te suelta el aviso de "conexión no privada". **Dentro de tu red, eso es normal y seguro**: salta
> porque el certificado no lo emitió una empresa externa, no porque exista ningún peligro real. Lo
> aceptas y entras tranquilo.

---

## 4. El reto: entrar desde FUERA de casa (de forma segura)

Dentro de casa todo es sencillo, porque estás en la misma LAN. ¿Pero qué pasa cuando quieres tus
archivos desde el trabajo? Tu NAS vive detrás del router, oculto del resto de internet. Para llegar
a él desde fuera hay dos caminos posibles.

> ### ⚠️ Cuidado — El camino peligroso: abrir puertos
> El método "de toda la vida" es **abrir puertos** en el router (lo que se llama *port forwarding*):
> básicamente le dices "las peticiones que lleguen de internet al puerto X mándaselas al NAS". El
> problema es que así **dejas tu NAS expuesto a TODO internet**, y por ahí pululan bots que escanean
> sin parar buscando servidores abiertos para atacarlos. Es arriesgado y no es nada recomendable para
> quien empieza. **Tu NAS NO hace esto**, y hace bien.

> ### 🟦 ¿Qué significa? — *VPN (red privada virtual)*
> Una **VPN** (*Virtual Private Network*) levanta una **red privada y cifrada** que conecta tus
> dispositivos **como si estuvieran en la misma LAN**, aunque en realidad estén en puntos distintos
> del mundo. En vez de abrir tu NAS a internet, lo que haces es meter tus dispositivos en una red
> privada donde **solo ellos** se ven entre sí. Imagínalo como un túnel secreto entre tu teléfono y
> tu NAS.

> ### 🟦 ¿Qué significa? — *Tailscale (tu solución real)*
> **Tailscale** es una VPN moderna y muy fácil de usar: instalas su app en el NAS y en tus
> dispositivos, inicias sesión con la misma cuenta en todos, y de pronto quedan formando una **red
> privada** entre ellos, sin que tengas que abrir ni un solo puerto del router. Desde el trabajo, tu
> teléfono ve al `polypaw-nas` como si estuvieras sentado en casa, todo **cifrado** y **sin
> exponerlo** a desconocidos.
> **Tu NAS usa Tailscale**, y por eso te conectas a él de forma segura estés donde estés. Hoy por hoy
> es, de lejos, la forma recomendada para el acceso remoto casero. (Por debajo funciona con una
> tecnología llamada WireGuard, pero no necesitas dominarla; te basta con saber que Tailscale es la
> "VPN fácil y segura".)

---

## 5. AdGuard Home: tu NAS como filtro de la red

> ### 🟦 ¿Qué significa? — *DNS (repaso) y AdGuard Home*
> Recupera el **DNS** del Módulo 00: esa "agenda" que traduce nombres como `google.com` a IPs.
> **AdGuard Home** es un **servidor DNS** que instalas en tu NAS y que, además de traducir, también
> **bloquea** los dominios de anuncios y rastreadores. Cuando una web intenta cargar un anuncio,
> AdGuard responde "ese dominio no existe" y el anuncio sencillamente no aparece.
> Si configuras tu router para que use el AdGuard de tu NAS como DNS, **todos** los dispositivos de
> la casa navegan sin buena parte de los anuncios, y sin tener que instalar nada en cada uno. Ahí tu
> NAS deja de ser solo "almacenamiento" y pasa a ser **infraestructura útil para tu hogar**. Es un
> primerísimo paso, y de los buenos, dentro del mundo del *self-hosting* (capítulo 05).

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Entiendo qué es una **LAN**, la **IP local**, el **router** y el **hostname** (`polypaw-nas`).
- [ ] Sé que cada servicio escucha en un **puerto** (Samba, Cockpit `9090`, AdGuard/DNS).
- [ ] Sé qué es **Cockpit** y para qué sirve, y por qué su HTTPS da un aviso (certificado autofirmado).
- [ ] Entiendo por qué **abrir puertos es arriesgado** y por qué una **VPN** es mejor.
- [ ] Sé qué es **Tailscale** y cómo te deja entrar al NAS desde fuera **sin exponerlo**.
- [ ] Sé qué es **AdGuard Home** (DNS que bloquea anuncios para toda la casa).

---

## 🧪 Ejercicios

1. **LAN.** Explica por qué tu teléfono puede ver los archivos del NAS sin usar internet cuando
   ambos están en casa.
2. **Puertos.** ¿Por qué entras a Cockpit como `polypaw-nas:9090` y no solo `polypaw-nas`? ¿Qué
   indica el `9090`?
3. **El aviso de Cockpit.** Explica por qué el navegador avisa "no seguro" al entrar a Cockpit y
   por qué, en tu red, está bien aceptar.
4. **Puertos vs. VPN.** Compara abrir puertos en el router con usar Tailscale: ¿por qué la VPN es
   más segura?
5. **AdGuard.** Explica cómo un servidor DNS puede **bloquear anuncios** para todos los
   dispositivos de la casa a la vez.
6. 💻 **Explora.** Entra a `https://polypaw-nas:9090` (Cockpit) y revisa el uso de RAM. ¿Cuánta de
   tus 8 GB está libre?

➡️ Siguiente: **[Capítulo 05 — Usarlo y montar uno desde cero](05-usarlo-y-montar.md)**.
