# Capítulo 03 — Compartir archivos con Samba

> La función estrella de un NAS es **compartir archivos** por la red, para verlos desde tu
> teléfono, laptop o tele. En tu NAS, eso lo hace **Samba**, que ofrece el recurso compartido
> **`PolyPawNAS`**. Aquí entiendes cómo funciona y cómo conectarte.

---

## 1. El protocolo SMB: el idioma de "carpetas en red"

> ### 🟦 ¿Qué significa? — *SMB (el protocolo de archivos compartidos)*
> **SMB** (*Server Message Block*) es el **protocolo** (conjunto de reglas, como HTTP en el
> Módulo 00, pero para archivos) que usan Windows, Mac y Linux para **compartir carpetas por la
> red**. Cuando en Windows ves "carpetas de red" o en Mac "Conectar al servidor", por debajo es
> SMB. Es el estándar universal para esto.

> ### 🟦 ¿Qué significa? — *Samba*
> **Samba** es el programa que hace que un **Linux** "hable" SMB, es decir, que pueda compartir
> carpetas con equipos Windows/Mac/Linux como si fuera un servidor de archivos nativo. Tu Ubuntu,
> gracias a Samba, aparece en la red como un sitio del que sacar y guardar archivos.
> En tu NAS, el servicio se llama **`smbd`** y está activo (lo viste en el capítulo 02).

> ### 🟦 ¿Qué significa? — *Recurso compartido (share)*
> Un **share** (recurso compartido) es **una carpeta del servidor publicada en la red** con un
> nombre. Tu NAS publica el share **`PolyPawNAS`** (que apunta a una carpeta dentro de
> `/srv/nas`, tu disco de datos). Quien se conecte verá "PolyPawNAS" como una carpeta y podrá
> entrar (según sus permisos).

---

## 2. Cómo se configura Samba (el panorama)

No hace falta que lo configures ahora (ya está hecho), pero conviene entender las piezas:

> ### 🟦 ¿Qué significa? — *El archivo `smb.conf`*
> Samba se configura en un archivo de texto, **`/etc/smb/smb.conf`** (o `/etc/samba/smb.conf`).
> Ahí se definen los shares. Una entrada típica para tu recurso se vería así:
> ```ini
> [PolyPawNAS]
>    path = /srv/nas/compartido      # qué carpeta se comparte
>    read only = no                  # ¿se puede escribir? (no = sí se puede)
>    valid users = edwar             # quién puede entrar
> ```
> - `[PolyPawNAS]` → el **nombre** del share que ves en la red.
> - `path` → la carpeta real del servidor que se publica.
> - `valid users` / `read only` → **quién** entra y si puede **escribir** o solo leer.
> Tras editar `smb.conf`, se reinicia el servicio: `sudo systemctl restart smbd` (capítulo 02).

> ### 🟦 ¿Qué significa? — *Usuario de Samba*
> Samba tiene su **propia contraseña** por usuario (separada de la de Linux), que se crea con
> `sudo smbpasswd -a edwar`. Por eso, al conectarte desde otro dispositivo, te pide usuario y
> contraseña: es esa credencial la que valida quién puede ver tus archivos. Seguridad básica:
> **el share no está abierto a cualquiera**, pide identificarse.

> ### 💡 Tip — Permisos: dos capas
> El acceso a tus archivos pasa por **dos** controles: (1) los permisos de **Samba** (`valid
> users`, contraseña) y (2) los permisos de **Linux** del archivo (rwx, capítulo 02). Ambos deben
> permitir la acción. Si algo "no deja escribir", suele ser uno de los dos. Es defensa en capas.

---

## 3. Conectarte al NAS desde tus dispositivos

Esta es la parte práctica que usarás siempre. Necesitas la **dirección** del NAS en la red (su
IP o su nombre `polypaw-nas`) y tu usuario/contraseña de Samba.

> ### 💡 Tip — Conectarse según el dispositivo
> - **Windows:** en el Explorador de archivos, escribe en la barra de dirección
>   `\\polypaw-nas\PolyPawNAS` (o `\\IP-del-nas\PolyPawNAS`). Pide usuario y contraseña.
> - **Mac:** Finder → menú *Ir* → *Conectarse al servidor* → `smb://polypaw-nas/PolyPawNAS`.
> - **Teléfono (Android/iOS):** una app de archivos con soporte SMB (muchas lo traen) y la misma
>   dirección `smb://...`.
> - **Linux:** en el gestor de archivos, "Otras ubicaciones" → `smb://polypaw-nas/PolyPawNAS`.
> Una vez conectado, esa carpeta se comporta como cualquier otra: copias, abres y guardas
> archivos, pero **viven en el NAS**, no en tu dispositivo.

> ### 🟦 ¿Qué significa? — *Montar el recurso (acceso permanente)*
> "Montar" el share (como montabas un disco en el capítulo 02) hace que aparezca **siempre** como
> una unidad/carpeta fija en tu equipo, sin reconectarte cada vez. En Windows se llama "conectar a
> unidad de red"; en Mac/Linux, montar en una carpeta. Cómodo para usarlo a diario.

---

## 4. Por qué Samba y no otra cosa (NFS)

> ### 🟦 ¿Qué significa? — *SMB vs. NFS*
> Existe otro protocolo para compartir archivos en red: **NFS** (*Network File System*), más común
> entre equipos **solo-Linux**. SMB (Samba) es mejor cuando hay **mezcla** de Windows/Mac/Linux y
> teléfonos, que es el caso normal en una casa. **Tu NAS usa Samba y NFS está desactivado**:
> decisión correcta para máxima compatibilidad con todos tus aparatos.

> ### 🔎 En tu equipo
> Recapitulando tu configuración real de archivos: Ubuntu Server + servicio **`smbd`** activo +
> share **`PolyPawNAS`** sobre el disco de datos en **`/srv/nas`**. Eso es, exactamente, "tu nube
> privada" del capítulo 01, hecha funcionar por Samba.

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
