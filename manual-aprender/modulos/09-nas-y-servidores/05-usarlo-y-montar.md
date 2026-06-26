# Capítulo 05 — Usarlo y montar uno desde cero

> Cerramos el módulo (y el manual) con la parte más práctica: **qué hacer con tu NAS**
> aparte de guardar archivos, y una **guía para montar uno desde cero** entendiendo cada
> decisión en lugar de copiar comandos a ciegas. Es el paso final para dejar atrás el "vibe
> coding" también en el mundo de los servidores.

---

## 1. Self-hosting: tu NAS como plataforma de servicios

> ### 🟦 ¿Qué significa? — *Self-hosting (autoalojamiento)*
> **Self-hosting** significa **correr tú mismo** los servicios que normalmente le alquilarías
> a una empresa: tu nube de archivos (en lugar de Google Drive), tu bloqueador de anuncios
> (AdGuard, que ya tienes), tu servidor multimedia, tus respaldos, tus apps. ¿Qué ganas?
> **Privacidad** (tus datos están en casa), **control** y **cero cuotas mensuales**. Tu NAS
> ya es, de hecho, una plataforma de self-hosting: corre AdGuard y tu compañía de agentes
> **OpenClaw**.

> ### 🟦 ¿Qué significa? — *Contenedores y Docker*
> Un **contenedor** es una manera de **empaquetar una aplicación junto con todo lo que necesita**
> para funcionar, aislada del resto del sistema. Así se instala y se quita de forma limpia, sin
> "ensuciar" el servidor. **Docker** (y su primo **Podman**) es la herramienta que crea y corre
> esos contenedores.
> Para que se entienda: cada servicio va en su propia "caja" sellada con todas sus piezas dentro;
> pones y quitas cajas sin que una estorbe a la otra. Por eso el self-hosting moderno se apoya en
> contenedores: instalar un servicio nuevo es, básicamente, "bajar su caja y encenderla".
> **Tu NAS ya trae Docker/Podman instalados** (aunque por ahora estén inactivos): listos para el
> día que quieras añadir servicios en contenedor.

> ### 💡 Tip — Ideas de servicios para tu NAS (a futuro)
> Cuando quieras crecer (¡y vigilando la RAM!): un servidor multimedia (Jellyfin), una nube de
> archivos con interfaz (Nextcloud), gestión de fotos, respaldos automáticos de tus equipos. Todo
> eso se instala como contenedor. Empieza con uno solo y mira cómo le afecta a la RAM antes de
> sumar el siguiente.

---

## 2. Respaldos: la regla más importante de todas

> ### ⚠️ Cuidado — Un NAS NO es un respaldo por sí solo
> Esto te salva datos (y lágrimas): tener tus archivos **solo** en el NAS **no** es estar
> respaldado. Si el disco del NAS se daña, lo pierdes todo. El NAS centraliza, sí, pero al propio
> NAS también hay que **respaldarlo**.

> ### 🟦 ¿Qué significa? — *La regla 3-2-1 de respaldo*
> Una guía clásica para no perder datos:
> - **3** copias de tus datos importantes,
> - en **2** medios distintos (por ejemplo, el HDD del NAS y un disco externo),
> - con **1** copia **fuera de casa** (otra ubicación o una nube), por si hay un incendio o un robo.
> No hace falta que lo montes hoy, pero quédate con la idea: **lo importante va por triplicado**.
> Tu disco de datos tiene 890 GB libres, así que espacio te sobra para organizar ahí los respaldos
> de tus equipos y, más adelante, una copia externa del NAS.

---

## 3. Montar un NAS desde cero (entendiendo cada paso)

Esta es la receta general que siguió tu `polypaw-nas`, contada para que **entiendas** el porqué de
cada paso, no para copiarla a ciegas. Sirve igual para cualquier servidor casero.

> ### 🟦 Guía conceptual — De laptop a NAS
> 1. **Elegir y preparar el hardware.** Un equipo que pueda quedarse encendido (un laptop viejo es
>    ideal: consume poco y su batería hace de UPS). Lo mejor es tener un disco para el sistema y
>    otro para los datos (como tu SSD + HDD).
> 2. **Instalar el sistema operativo.** Descargar **Ubuntu Server**, ponerlo en un USB de arranque
>    e instalarlo. Sin escritorio, para ahorrar recursos. Aquí es donde creas tu **usuario** y su
>    contraseña.
> 3. **Primeros ajustes.** Conectarte por **SSH** desde otro equipo, actualizar todo
>    (`sudo apt update && sudo apt upgrade`) y ponerle un **hostname** claro (`polypaw-nas`).
> 4. **Preparar el disco de datos.** Formatear el HDD y **montarlo** en una carpeta (`/srv/nas`),
>    con los permisos correctos (`chown`/`chmod`) para tu usuario.
> 5. **Instalar Samba** (`sudo apt install samba`), definir el **share** en `smb.conf`
>    (`[PolyPawNAS]`, `path`, `valid users`), crear la **contraseña de Samba** (`smbpasswd`) y
>    reiniciar el servicio. → Ya compartes archivos.
> 6. **Instalar Cockpit** (`sudo apt install cockpit`) para administrarlo desde el navegador en el
>    **9090**.
> 7. **Instalar Tailscale** en el NAS y en tus dispositivos → acceso remoto **seguro** sin abrir
>    puertos.
> 8. **(Opcional) Servicios extra**: AdGuard Home (DNS/anti-anuncios), contenedores con
>    Docker/Podman, respaldos.
>
> Fíjate en que cada paso usa conceptos que ya viste en este módulo: usuarios y permisos (cap. 02),
> Samba (cap. 03), redes, Cockpit y Tailscale (cap. 04). Eso es entender en lugar de copiar: ahora
> podrías **dar instrucciones precisas** sobre tu propio servidor, que es justo la meta del manual.

> ### 💡 Tip — La regla de oro del administrador
> Cuando configures un servidor, **cambia una sola cosa a la vez y verifica** que todo sigue
> funcionando antes de pasar al siguiente paso. Si algo se rompe, sabrás exactamente qué lo causó. Y
> **anota lo que haces** en un archivo de notas: tu yo del futuro lo agradecerá, igual que pasa con
> los mensajes de commit (Módulo 00).

---

## 4. Servidores en general (más allá del NAS)

> ### 💡 Tip — Lo que aprendiste vale para CUALQUIER servidor
> Un NAS es un servidor especializado en archivos, pero los conceptos —Linux, usuarios y permisos,
> servicios con systemd, puertos, SSH, redes, seguridad— son **los mismos** para un servidor web,
> uno de base de datos o uno en la nube (un "VPS" que alquilas por unos pocos dólares al mes). Con
> este módulo ya tienes la base de la **administración de sistemas**. El siguiente paso natural,
> cuando te apetezca, es alquilar un servidor pequeño en la nube y practicar desplegando ahí una de
> tus apps: ahí unirías la programación (módulos 00–08) con la infraestructura (este módulo).

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Entiendo qué es **self-hosting** y qué es un **contenedor/Docker**.
- [ ] Sé que **un NAS no es un respaldo** por sí solo y conozco la regla **3-2-1**.
- [ ] Puedo explicar, paso a paso, **cómo se monta** un NAS y por qué cada paso.
- [ ] Reconozco que los conceptos sirven para **cualquier servidor**, no solo un NAS.
- [ ] Me llevo la regla del administrador: **un cambio a la vez, verifica y anota**.

---

## 🧪 Ejercicios

1. **Self-hosting.** Nombra dos servicios que podrías autoalojar en tu NAS y qué empresa
   reemplazarían.
2. **Respaldo.** Aplica la regla 3-2-1 a tus fotos: describe concretamente 3 copias, 2 medios y 1
   fuera de casa, usando tu NAS.
3. **El peligro.** Explica por qué tener tus archivos **solo** en el NAS es arriesgado.
4. **Ordena el montaje.** Pon en orden: instalar Samba, instalar Ubuntu Server, montar el disco de
   datos, instalar Tailscale. Explica por qué ese orden.
5. 💻 **Tu primer servicio (a futuro).** Cuando te animes, investiga cómo correr **un** contenedor
   sencillo con Docker en tu NAS, vigila la RAM en Cockpit antes y después, y anota qué cambió.

---

## 🎉 ¡Terminaste el Módulo 09 y TODO el manual!

Has recorrido el camino completo: desde "qué es programar" hasta administrar tu propio servidor.
Ahora entiendes, por dentro, tus cuatro proyectos **y** tu NAS, y —lo más importante— ya puedes dar
**órdenes precisas**: "este color en `#1B6B6B`", "esta parte hazla con un componente React tipado
así", "crea esta tabla con RLS", "comparte esta carpeta del NAS por Samba con estos permisos". Esa
era la meta: dejar el "vibe coding" y programar (y administrar) **con criterio**.

> 🦎 **Bit se despide… por ahora.** Lo que viene ahora es **practicar**: vuelve a los ejercicios con
> tu computadora, mete mano en tus propios repos, rompe cosas y vuelve a arreglarlas. Aprender a
> programar no se termina nunca; apenas empieza. Y ya tienes la base para que cada tema nuevo te
> cueste menos que el anterior. ¡Felicidades!

➡️ Vuelve al **[índice del manual](../../README.md)** para repasar cualquier módulo.
