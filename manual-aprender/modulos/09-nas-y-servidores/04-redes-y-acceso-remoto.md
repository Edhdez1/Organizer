# Capítulo 04 — Redes desde cero y acceso remoto

> Para usar tu NAS necesitas entender un poco de **redes**: cómo se encuentran los dispositivos,
> qué es una IP, un puerto, y —lo más jugoso— cómo entrar a tu NAS de forma **segura desde fuera
> de casa**. Tu equipo ya lo resuelve con **Tailscale** y administra con **Cockpit**. Aquí lo
> entiendes todo desde cero.

---

## 1. Tu red de casa (LAN)

> ### 🟦 ¿Qué significa? — *Red local (LAN)*
> Una **LAN** (*Local Area Network*, "red de área local") es la red **de tu casa**: todos los
> dispositivos conectados a tu router (por wifi o cable) forman una LAN y pueden hablar entre sí.
> Tu NAS, tu teléfono y tu laptop están en la misma LAN; por eso el teléfono ve los archivos del
> NAS sin pasar por internet.

> ### 🟦 ¿Qué significa? — *IP local y el router*
> Recuerda la **IP** del Módulo 00 (la "dirección" de cada dispositivo). Dentro de tu casa, el
> **router** le da a cada aparato una **IP local** (suelen verse como `192.168.1.x`). El router es
> el "director de tráfico" de tu LAN y la puerta hacia internet. Tu NAS tiene una IP local fija (o
> casi) por la que lo encuentran los demás.

> ### 🟦 ¿Qué significa? — *Nombre de host (hostname)*
> Recordar IPs es incómodo, así que cada equipo tiene un **nombre** (hostname). El de tu servidor
> es **`polypaw-nas`**. En muchas redes puedes usar el nombre en vez de la IP (`\\polypaw-nas` en
> vez de `\\192.168.1.50`). Más fácil de recordar.

---

## 2. Puertos: las "puertas" de un servidor (repaso aplicado)

> ### 🟦 ¿Qué significa? — *Puerto (aplicado a tu NAS)*
> Como viste en el Módulo 00, si la IP es el edificio, el **puerto** es el apartamento: indica
> **qué servicio** atiende. Un mismo servidor ofrece varios servicios en puertos distintos:
> - Samba (archivos) usa los puertos 445/139.
> - **Cockpit** (panel web) usa el **9090** → por eso entras a `https://polypaw-nas:9090`.
> - AdGuard usa el suyo para su panel y el 53 (DNS).
> Cada servicio escucha en su puerto; el puerto enruta cada petición al programa correcto.

---

## 3. Administrar con Cockpit (sin terminal)

> ### 🟦 ¿Qué significa? — *Cockpit (panel web de administración)*
> **Cockpit** es una **interfaz web** para administrar tu servidor Linux **sin** escribir
> comandos: ves el uso de CPU/RAM, los discos, la red, los servicios, los logs, e incluso tienes
> una terminal dentro del navegador. Entras desde otro equipo a **`https://polypaw-nas:9090`** con
> tu usuario de Linux.
> Es el complemento perfecto a la terminal: la terminal da control total; Cockpit da una vista
> cómoda y visual. Para el día a día (¿cuánta RAM uso?, ¿está vivo este servicio?), Cockpit es
> ideal.

> ### 💡 Tip — HTTPS y el aviso de "no seguro"
> Cockpit usa **HTTPS** (Módulo 00) con un certificado **autofirmado** (hecho por tu propio
> servidor, no por una autoridad pública). Por eso el navegador muestra un aviso de "conexión no
> privada" la primera vez. **Dentro de tu red, es normal y seguro**: el aviso es porque el
> certificado no lo emitió una empresa externa, no porque haya peligro. Aceptas y entras.

---

## 4. El reto: entrar desde FUERA de casa (de forma segura)

Dentro de casa es fácil (misma LAN). Pero ¿y si quieres tus archivos desde el trabajo? Tu NAS
está detrás del router, "escondido" de internet. Hay dos caminos:

> ### ⚠️ Cuidado — El camino peligroso: abrir puertos
> La forma "antigua" es **abrir puertos** en el router (*port forwarding*): decirle "las
> peticiones de internet al puerto X mándalas al NAS". El problema: eso **expone tu NAS a TODO
> internet**, y los bots escanean constantemente buscando servidores expuestos para atacarlos. Es
> arriesgado y desaconsejado para principiantes. **Tu NAS NO hace esto** (bien hecho).

> ### 🟦 ¿Qué significa? — *VPN (red privada virtual)*
> Una **VPN** (*Virtual Private Network*) crea una **red privada y cifrada** que conecta tus
> dispositivos **como si estuvieran en la misma LAN**, aunque estén en lugares distintos del
> mundo. En vez de abrir tu NAS a internet, tus dispositivos entran a una "red privada" donde
> **solo ellos** se ven. Es como un túnel secreto entre tu teléfono y tu NAS.

> ### 🟦 ¿Qué significa? — *Tailscale (tu solución real)*
> **Tailscale** es una VPN modernísima y fácil: instalas su app en tu NAS y en tus dispositivos,
> inicias sesión con la misma cuenta, y todos quedan en una **red privada** entre ellos, sin abrir
> ni un puerto del router. Desde el trabajo, tu teléfono ve al `polypaw-nas` como si estuvieras en
> casa, **cifrado** y **sin exponerlo** a desconocidos.
> **Tu NAS usa Tailscale**: por eso te conectas a él de forma segura desde donde sea. Es, con
> diferencia, la forma recomendada hoy para acceso remoto casero. (Por debajo usa una tecnología
> llamada WireGuard; no necesitas dominarla, solo saber que Tailscale = "VPN fácil y segura".)

---

## 5. AdGuard Home: tu NAS como filtro de la red

> ### 🟦 ¿Qué significa? — *DNS (repaso) y AdGuard Home*
> Recuerda el **DNS** del Módulo 00: la "agenda" que traduce nombres (`google.com`) a IPs.
> **AdGuard Home** es un **servidor DNS** que instalas en tu NAS y que, además de traducir,
> **bloquea** los dominios de anuncios y rastreadores: cuando una web pide cargar un anuncio,
> AdGuard responde "ese dominio no existe" y el anuncio no aparece.
> Si configuras tu router para que use el AdGuard de tu NAS como DNS, **todos** los dispositivos de
> la casa navegan sin gran parte de los anuncios, sin instalar nada en cada uno. Tu NAS deja de ser
> solo "almacenamiento" y se vuelve **infraestructura útil de tu hogar**. Es un primer paso
> buenísimo en el mundo del *self-hosting* (capítulo 05).

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
