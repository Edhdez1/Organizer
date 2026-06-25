# Capítulo 05 — Usarlo y montar uno desde cero

> Cerramos el módulo (y el manual) con lo más práctico: **qué hacer con tu NAS** más allá de
> guardar archivos, y una **guía para montar uno desde cero** entendiendo cada decisión, no
> copiando comandos a ciegas. Es el paso final para dejar atrás el "vibe coding" también en el
> mundo de los servidores.

---

## 1. Self-hosting: tu NAS como plataforma de servicios

> ### 🟦 ¿Qué significa? — *Self-hosting (autoalojamiento)*
> **Self-hosting** es **correr tú mismo** los servicios que normalmente alquilarías a empresas:
> tu nube de archivos (en vez de Google Drive), tu bloqueador de anuncios (AdGuard, que ya
> tienes), tu servidor multimedia, tus respaldos, tus apps. Las ventajas: **privacidad** (tus
> datos en casa), **control** y **sin cuotas mensuales**. Tu NAS ya es una plataforma de
> self-hosting: corre AdGuard y tu compañía de agentes **OpenClaw**.

> ### 🟦 ¿Qué significa? — *Contenedores y Docker*
> Un **contenedor** es una forma de **empaquetar una aplicación con todo lo que necesita** para
> correr, aislada del resto del sistema, de modo que se instala y se quita limpiamente sin
> "ensuciar" el servidor. **Docker** (y su primo **Podman**) es la herramienta que crea y corre
> contenedores.
> Analogía: cada servicio va en su propia "caja" sellada con sus piezas; pones y quitas cajas sin
> que se estorben. Por eso el self-hosting moderno usa contenedores: instalar un servicio nuevo es
> "bajar su caja y encenderla".
> **Tu NAS tiene Docker/Podman instalados** (aunque inactivos por ahora): listos para cuando
> quieras añadir servicios en contenedor.

> ### 💡 Tip — Ideas de servicios para tu NAS (a futuro)
> Cuando quieras crecer (¡y con cuidado de la RAM!): un servidor multimedia (Jellyfin), una nube
> de archivos con interfaz (Nextcloud), gestión de fotos, respaldos automáticos de tus equipos. Se
> instalan como contenedores. Empieza con uno y observa cómo afecta a la RAM.

---

## 2. Respaldos: la regla más importante de todas

> ### ⚠️ Cuidado — Un NAS NO es un respaldo por sí solo
> Esto salva datos (y lágrimas): tener tus archivos **solo** en el NAS **no** es estar respaldado.
> Si se daña el disco del NAS, lo pierdes todo. Un NAS centraliza, pero hay que **respaldar el
> propio NAS**.

> ### 🟦 ¿Qué significa? — *La regla 3-2-1 de respaldo*
> Una guía clásica para no perder datos:
> - **3** copias de tus datos importantes,
> - en **2** medios distintos (ej. el HDD del NAS y un disco externo),
> - con **1** copia **fuera de casa** (otra ubicación o una nube), por si hay incendio/robo.
> No necesitas montarlo hoy, pero llévate la idea: **lo importante va por triplicado**. Tu disco
> de datos tiene 890 GB libres; sobra espacio para organizar respaldos de tus equipos hacia él, y
> luego una copia externa del NAS.

---

## 3. Montar un NAS desde cero (entendiendo cada paso)

Esta es la receta general que siguió tu `polypaw-nas`, explicada para que **entiendas** por qué
cada paso, no para copiar a ciegas. Sirve para cualquier servidor casero.

> ### 🟦 Guía conceptual — De laptop a NAS
> 1. **Elegir y preparar el hardware.** Un equipo que pueda estar encendido (un laptop viejo es
>    ideal: bajo consumo + batería-UPS). Idealmente un disco para el sistema y otro para datos
>    (como tu SSD + HDD).
> 2. **Instalar el sistema operativo.** Descargar **Ubuntu Server**, ponerlo en un USB de
>    arranque, e instalarlo. Sin escritorio (ahorra recursos). Aquí creas tu **usuario** y la
>    contraseña.
> 3. **Primeros ajustes.** Conectarte por **SSH** desde otro equipo, actualizar todo
>    (`sudo apt update && sudo apt upgrade`), y darle un **hostname** claro (`polypaw-nas`).
> 4. **Preparar el disco de datos.** Formatear el HDD y **montarlo** en una carpeta (`/srv/nas`),
>    con permisos correctos (`chown`/`chmod`) para tu usuario.
> 5. **Instalar Samba** (`sudo apt install samba`), definir el **share** en `smb.conf`
>    (`[PolyPawNAS]`, `path`, `valid users`), crear la **contraseña de Samba** (`smbpasswd`), y
>    reiniciar el servicio. → Ya compartes archivos.
> 6. **Instalar Cockpit** (`sudo apt install cockpit`) para administrar por web en el **9090**.
> 7. **Instalar Tailscale** en el NAS y tus dispositivos → acceso remoto **seguro** sin abrir
>    puertos.
> 8. **(Opcional) Servicios extra**: AdGuard Home (DNS/anti-anuncios), contenedores con
>    Docker/Podman, respaldos.
>
> Cada paso usa conceptos que ya conoces de este módulo: usuarios/permisos (cap. 02), Samba (cap.
> 03), redes/Cockpit/Tailscale (cap. 04). Eso es entender, no copiar: ahora podrías **dar
> instrucciones precisas** sobre tu servidor, justo la meta del manual.

> ### 💡 Tip — La regla de oro del administrador
> Cuando configures un servidor, **cambia una cosa a la vez y verifica** que sigue funcionando
> antes del siguiente paso. Si algo se rompe, sabrás exactamente qué lo causó. Y **anota lo que
> haces** (un archivo de notas): tu yo futuro lo agradecerá, igual que con los mensajes de commit
> (Módulo 00).

---

## 4. Servidores en general (más allá del NAS)

> ### 💡 Tip — Lo que aprendiste vale para CUALQUIER servidor
> Un NAS es un servidor especializado en archivos, pero los conceptos —Linux, usuarios/permisos,
> servicios con systemd, puertos, SSH, redes, seguridad— son los **mismos** para un servidor web,
> uno de base de datos, o uno en la nube (un "VPS" que alquilas por unos dólares al mes). Con este
> módulo tienes la base de la **administración de sistemas**. El siguiente paso natural, cuando
> quieras, es alquilar un pequeño servidor en la nube y practicar desplegando ahí una de tus apps:
> unirías la programación (módulos 00–08) con la infraestructura (este módulo).

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
Ahora entiendes, por dentro, tus cuatro proyectos **y** tu NAS, y —lo más importante— puedes dar
**órdenes precisas**: "este color en `#1B6B6B`", "esta parte hazla con un componente React tipado
así", "crea esta tabla con RLS", "comparte esta carpeta del NAS por Samba con estos permisos". Eso
era la meta: dejar el "vibe coding" y programar (y administrar) **con criterio**.

> 🦎 **Bit se despide… por ahora.** Lo que sigue es **practicar**: vuelve a los ejercicios con tu
> computadora, toca tus propios repos, rompe cosas y arréglalas. Aprender a programar no termina;
> apenas empieza. Y ya tienes la base para que cada nuevo tema te cueste menos. ¡Felicidades!

➡️ Vuelve al **[índice del manual](../../README.md)** para repasar cualquier módulo.
