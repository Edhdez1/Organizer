# Capítulo 03 — Compartir archivos con Samba

> Lo que hace de verdad útil a un NAS es poder **compartir archivos** por la red y abrirlos
> desde el teléfono, la laptop o la tele sin tener que copiarlos de un lado a otro. En tu NAS,
> de eso se encarga **Samba**, que pone a disposición el recurso compartido **`PolyPawNAS`**.
> En este capítulo vas a entender cómo funciona y cómo conectarte a él.

---

## 1. El protocolo SMB: el idioma de "carpetas en red"

> ### 🟦 ¿Qué significa? — *SMB (el protocolo de archivos compartidos)*
> **SMB** (*Server Message Block*) es el **protocolo** —el conjunto de reglas, igual que HTTP
> en el Módulo 00, pero esta vez para archivos— que usan Windows, Mac y Linux para **compartir
> carpetas por la red**. Cuando en Windows entras a las "carpetas de red" o en Mac usas
> "Conectar al servidor", lo que pasa por debajo es SMB. Es el estándar de toda la vida para
> esto.

> ### 🟦 ¿Qué significa? — *Samba*
> **Samba** es el programa que hace que un **Linux** sepa "hablar" SMB; es decir, que pueda
> compartir carpetas con equipos Windows, Mac o Linux como si fuera un servidor de archivos de
> los de siempre. Gracias a Samba, tu Ubuntu aparece en la red como un sitio del que sacar y
> guardar archivos. En tu NAS, ese servicio se llama **`smbd`** y ya está corriendo (lo viste
> en el capítulo 02).

> ### 🟦 ¿Qué significa? — *Recurso compartido (share)*
> Un **share** (recurso compartido) no es más que **una carpeta del servidor que se publica en
> la red** con un nombre. Tu NAS publica el share **`PolyPawNAS`**, que apunta a una carpeta
> dentro de `/srv/nas`, tu disco de datos. Quien se conecte verá "PolyPawNAS" como si fuera una
> carpeta normal y podrá entrar, siempre según sus permisos.

---

## 2. Cómo se configura Samba (el panorama)

No tienes que configurar nada ahora —ya está hecho—, pero vale la pena saber qué piezas hay
detrás:

> ### 🟦 ¿Qué significa? — *El archivo `smb.conf`*
> Samba se configura en un archivo de texto, **`/etc/smb/smb.conf`** (o `/etc/samba/smb.conf`).
> Ahí se definen los shares. Una entrada típica para tu recurso se vería así:
> ```ini
> [PolyPawNAS]
>    path = /srv/nas/compartido      # qué carpeta se comparte
>    read only = no                  # ¿se puede escribir? (no = sí se puede)
>    valid users = edwar             # quién puede entrar
> ```
> - `[PolyPawNAS]` → el **nombre** del share, tal como lo ves en la red.
> - `path` → la carpeta real del servidor que se publica.
> - `valid users` / `read only` → **quién** entra y si puede **escribir** o solo leer.
> Cada vez que editas `smb.conf`, hay que reiniciar el servicio: `sudo systemctl restart smbd`
> (capítulo 02).

> ### 🟦 ¿Qué significa? — *Usuario de Samba*
> Samba maneja su **propia contraseña** por cada usuario, distinta de la de Linux, y se crea con
> `sudo smbpasswd -a edwar`. Por eso, cuando te conectas desde otro dispositivo, te pide usuario
> y contraseña: es esa credencial la que decide quién puede ver tus archivos. Es la seguridad
> mínima razonable: **el share no queda abierto para cualquiera**, hay que identificarse.

> ### 💡 Tip — Permisos: dos capas
> El acceso a tus archivos pasa por **dos** controles distintos: (1) los permisos de **Samba**
> (`valid users`, la contraseña) y (2) los permisos de **Linux** del propio archivo (rwx,
> capítulo 02). Los dos tienen que dar luz verde para que la acción funcione. Cuando algo "no
> deja escribir", casi siempre el problema está en uno de esos dos sitios. Es defensa en capas.

---

## 3. Conectarte al NAS desde tus dispositivos

Esta es la parte que vas a usar todos los días. Solo necesitas dos cosas: la **dirección** del
NAS en la red (su IP o su nombre `polypaw-nas`) y tu usuario y contraseña de Samba.

> ### 💡 Tip — Conectarse según el dispositivo
> - **Windows:** en el Explorador de archivos, escribe en la barra de dirección
>   `\\polypaw-nas\PolyPawNAS` (o `\\IP-del-nas\PolyPawNAS`). Te pedirá usuario y contraseña.
> - **Mac:** Finder → menú *Ir* → *Conectarse al servidor* → `smb://polypaw-nas/PolyPawNAS`.
> - **Teléfono (Android/iOS):** una app de archivos con soporte SMB (muchas ya lo traen de
>   serie) y la misma dirección `smb://...`.
> - **Linux:** en el gestor de archivos, "Otras ubicaciones" → `smb://polypaw-nas/PolyPawNAS`.
> Una vez conectado, esa carpeta se porta como cualquier otra: copias, abres y guardas archivos
> con normalidad, solo que en realidad **viven en el NAS**, no en tu dispositivo.

> ### 🟦 ¿Qué significa? — *Montar el recurso (acceso permanente)*
> "Montar" el share —igual que montabas un disco en el capítulo 02— hace que aparezca
> **siempre** como una unidad o carpeta fija en tu equipo, sin tener que reconectarte cada vez.
> En Windows se llama "conectar a unidad de red"; en Mac y Linux, montar en una carpeta. Es lo
> más cómodo si lo vas a usar a diario.

---

## 4. Por qué Samba y no otra cosa (NFS)

> ### 🟦 ¿Qué significa? — *SMB vs. NFS*
> Hay otro protocolo para compartir archivos en red: **NFS** (*Network File System*), que es más
> habitual entre equipos **solo-Linux**. SMB (Samba) gana cuando tienes una **mezcla** de
> Windows, Mac, Linux y teléfonos, que es justo lo normal en una casa. **Tu NAS usa Samba y NFS
> está desactivado**, y es la decisión correcta: así te entiendes con todos tus aparatos.

> ### 🔎 En tu equipo
> Recapitulando cómo quedó tu configuración real de archivos: Ubuntu Server + el servicio
> **`smbd`** activo + el share **`PolyPawNAS`** montado sobre el disco de datos en
> **`/srv/nas`**. Eso es, ni más ni menos, "tu nube privada" del capítulo 01, puesta en marcha
> por Samba.

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Sé qué es **SMB** (protocolo de carpetas en red) y qué es **Samba** (que lo da en Linux).
- [ ] Entiendo qué es un **share** y que el tuyo se llama **`PolyPawNAS`** (sobre `/srv/nas`).
- [ ] Reconozco el papel de **`smb.conf`** (`path`, `valid users`, `read only`).
- [ ] Sé que Samba tiene su **propia contraseña** y que hay **dos capas** de permisos (Samba + Linux).
- [ ] Sé cómo **conectarme** desde Windows/Mac/teléfono (`\\` o `smb://`).
- [ ] Distingo **SMB** de **NFS** y por qué tu NAS usa Samba.

---

## 🧪 Ejercicios

1. **Protocolo.** Explica con tus palabras qué es SMB y por qué Samba es necesario en un servidor
   Linux.
2. **Anatomía del share.** En la entrada `[PolyPawNAS]` con `path = /srv/nas/compartido` y
   `read only = no`, ¿qué carpeta se comparte y se puede escribir en ella?
3. **Dos capas.** Si te conectas correctamente (Samba te deja entrar) pero no puedes **guardar**
   un archivo, ¿dónde podría estar el problema? (Pista: capítulo 02.)
4. **Conéctate (en papel).** Escribe la dirección exacta que usarías para conectarte al share
   desde Windows y desde Mac.
5. 💻 **Práctica real.** Conéctate al share `PolyPawNAS` desde tu teléfono o computadora, crea una
   carpeta de prueba y comprueba que aparece. (Acabas de usar tu NAS como nube privada.)

➡️ Siguiente: **[Capítulo 04 — Redes desde cero y acceso remoto](04-redes-y-acceso-remoto.md)**.
