# Capítulo 01 — ¿Qué es un servidor y un NAS?

> Cambiamos de tema: de escribir apps a las **máquinas que las hacen funcionar**. Lo bueno es que
> tú ya tienes un servidor de verdad (tu `polypaw-nas`), así que esto no será teoría abstracta:
> entenderás exactamente qué tienes en casa y por qué es tan útil.

---

## 1. Qué es un servidor (de verdad, sin misterio)

Ya viste la palabra en el Módulo 00. Recapitulemos y profundicemos.

> ### 🟦 ¿Qué significa? — *Servidor*
> Un **servidor** es una computadora (o un programa) que está **encendida y a la espera**, lista
> para **dar un servicio** a otras computadoras que se lo pidan: entregar páginas web, archivos,
> datos, correo… "Servidor" viene de *servir*. No es un tipo especial de máquina: es un **papel**.
> Cualquier computadora puede ser servidor si tiene un programa que "sirve" algo y está disponible
> para otros.

> ### 💡 Tip — Servidor ≠ caja misteriosa en una sala fría
> Solemos imaginar los servidores como armarios llenos de luces en un centro de datos. Algunos lo
> son, pero un servidor también puede ser **un laptop viejo en tu casa**. La diferencia con tu
> computadora normal no es el hardware, sino **el papel**: tu laptop normal *consume* servicios
> (cliente); un servidor *los ofrece*. Tu Acer Nitro pasó de cliente (jugar) a servidor (servir
> archivos y agentes).

> ### 🟦 ¿Qué significa? — *Cliente y servidor (repaso aplicado)*
> Cuando desde tu teléfono abres un archivo guardado en el NAS: tu teléfono es el **cliente**
> (pide), el NAS es el **servidor** (responde con el archivo). Es el mismo modelo del Módulo 00,
> ahora **dentro de tu casa**, no por internet.

---

## 2. Qué es un NAS

> ### 🟦 ¿Qué significa? — *NAS (Network Attached Storage)*
> Un **NAS** (*Network Attached Storage*, "almacenamiento conectado a la red") es un **servidor
> especializado en guardar archivos** y compartirlos con todos los dispositivos de tu red. En vez
> de tener tus fotos en una memoria USB que pasas de un aparato a otro, viven en el NAS, y tu
> teléfono, laptop y tele las ven **a la vez**, por la red de tu casa.
> Piensa en él como **tu propia "nube" privada en casa**: como Google Drive o Dropbox, pero el
> disco es tuyo, está en tu hogar, y no pagas mensualidad ni dependes de una empresa.

> ### 💡 Tip — Por qué un NAS es tan útil
> - **Centraliza**: todos tus archivos en un solo lugar, accesibles desde cualquier dispositivo.
> - **Respalda**: copias de seguridad automáticas de tus equipos.
> - **Comparte**: varias personas (familia) usan los mismos archivos.
> - **Privacidad y costo**: tus datos en tu casa; sin cuotas mensuales de almacenamiento.
> - **Más que archivos**: puede correr otros servicios (como hace el tuyo con AdGuard y OpenClaw).

---

## 3. Tu NAS concreto: un Acer Nitro reconvertido

Veamos por qué tu equipo es un buen servidor, pieza por pieza (¿recuerdas el hardware del Módulo
00?):

> ### 🔎 En tu equipo — `polypaw-nas`
> - **CPU Intel i5-9300H (4 núcleos / 8 hilos)**: suficiente "cerebro" para servir archivos y
>   correr varios servicios a la vez. (Núcleos/hilos = cuántas tareas en paralelo, Módulo 00.)
> - **8 GB de RAM**: su memoria de trabajo. Es el **límite principal** a futuro: cada servicio
>   que sumes consume RAM, y 8 GB se llenan si pones muchos. (RAM = escritorio, Módulo 00.)
> - **SSD NVMe 238 GB (sistema) + HDD 954 GB (datos en `/srv/nas`)**: el SSD, rápido, para que
>   Ubuntu arranque ágil; el HDD, grande y barato, para guardar los archivos. División clásica y
>   acertada. El disco de datos está casi vacío (~890 GB libres): espacio de sobra.

> ### 💡 Tip — La batería como UPS (un detalle genial)
> Un **UPS** (*Uninterruptible Power Supply*, "fuente de alimentación ininterrumpida") es una
> batería que mantiene un equipo encendido unos minutos si se va la luz, evitando apagones
> bruscos que pueden corromper datos. Los servidores serios usan uno. **Tu laptop ya trae batería
> integrada**: funciona como UPS gratis. Si parpadea la luz, tu NAS no se apaga ni se corrompe.
> Una ventaja real de usar un laptop como servidor.

---

## 4. ¿NAS dedicado o "hecho a mano"? El caso de tu equipo

> ### 🟦 ¿Qué significa? — *NAS "appliance" vs. servidor genérico*
> Hay dos caminos para tener un NAS:
> - **Aparato dedicado** (Synology, QNAP) o sistemas como **TrueNAS / OpenMediaVault**: traen una
>   interfaz lista para NAS, fácil pero más cerrada.
> - **Servidor genérico hecho a mano**: una computadora con un Linux normal (como tu **Ubuntu
>   Server**) al que tú le instalas las piezas (Samba para compartir, Cockpit para administrar).
>   **Más flexible y educativo** (aprendes de verdad cómo funciona), aunque requiere configurarlo.
> **Tu NAS es del segundo tipo**: Ubuntu Server + Samba + Cockpit, armado a mano. Por eso este
> módulo te enseña tanto: cada pieza la entiendes porque está puesta a propósito, no escondida.

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Explico qué es un **servidor** y que es un **papel** (servir), no un hardware especial.
- [ ] Sé qué es un **NAS** y por qué es "tu nube privada en casa".
- [ ] Entiendo las piezas de **tu** NAS (CPU, RAM como límite, SSD sistema + HDD datos).
- [ ] Sé qué es un **UPS** y por qué la batería del laptop cumple ese papel.
- [ ] Distingo un **NAS dedicado** de un **servidor genérico** (el tuyo) y por qué el tuyo enseña más.

---

## 🧪 Ejercicios

Este módulo es práctico-conceptual; varios ejercicios los harás **conectándote a tu NAS** (lo
verás cómo en los próximos capítulos). Por ahora, de razonamiento:

1. **Cliente o servidor.** En estas escenas, di quién es cliente y quién servidor: (a) ves una
   película guardada en el NAS desde la tele; (b) tu NAS le pide una página a Google.
2. **Por qué NAS.** Da tres ventajas de tener tus fotos en el NAS en lugar de en una memoria USB.
3. **El límite.** ¿Por qué decimos que los **8 GB de RAM** son el principal límite de tu NAS y no
   el disco (que tiene 890 GB libres)? (Repasa RAM vs. disco del Módulo 00.)
4. **UPS.** Explica con tus palabras por qué un apagón brusco es peligroso para un servidor y cómo
   ayuda la batería del laptop.
5. **Dedicado vs. a mano.** Menciona una ventaja y una desventaja de haber montado el NAS "a mano"
   con Ubuntu en lugar de comprar un Synology.

➡️ Siguiente: **[Capítulo 02 — Linux y la terminal del servidor](02-linux-servidor.md)**.
