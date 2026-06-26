# Capítulo 02 — Cómo funciona una computadora

<p align="center">
  <img src="../../recursos/imagenes/00-fundamentos/cap02.png" alt="Ilustración del capítulo (pixel art con Bit)" width="640">
</p>


> Programar se vuelve más fácil cuando tienes en la cabeza una imagen simple de qué hay
> "dentro" de una computadora. No hace falta que seas ingeniero de hardware; sí te conviene
> conocer estas piezas básicas, porque van a salir una y otra vez (sobre todo cuando lleguemos
> al módulo del NAS).

---

## 1. Hardware y software

> ### 🟦 ¿Qué significa? — *Hardware*
> El **hardware** es **todo lo físico**, lo que puedes tocar: la pantalla, el teclado, los
> chips, los discos. Tu Acer Nitro 5, por ejemplo, es hardware.

> ### 🟦 ¿Qué significa? — *Software*
> El **software** es justo lo contrario: **todo lo que no puedes tocar**. Los programas, el
> sistema operativo, tu propio código. Son instrucciones y datos, y son los que le dicen al
> hardware qué tiene que hacer.

Para que se entienda con una imagen: el hardware es el cuerpo; el software es lo que ese
cuerpo *sabe hacer* y *piensa*.

---

## 2. Las cuatro piezas que debes conocer

### a) El procesador (CPU)

> ### 🟦 ¿Qué significa? — *CPU (procesador)*
> La **CPU** (*Central Processing Unit*, "unidad central de procesamiento") es **el cerebro**
> de la máquina: va ejecutando las instrucciones de los programas, una tras otra, a una
> velocidad enorme.
> **¿Dónde se usa en tu proyecto?** Tu NAS tiene una CPU **Intel Core i5-9300H** con
> **4 núcleos / 8 hilos**.

> ### 🟦 ¿Qué significa? — *Núcleo (core) e hilo (thread)*
> Un **núcleo** es como un "cerebro" independiente dentro de la CPU. Tener 4 núcleos es tener
> 4 trabajadores capaces de hacer 4 tareas **a la vez**. Un **hilo** es una "línea de trabajo":
> gracias a una tecnología llamada *hyper-threading*, cada núcleo simula 2 hilos, y de ahí sale
> ese "4 núcleos / 8 hilos". La idea es simple: cuantos más núcleos e hilos, más cosas pueden
> ocurrir en paralelo.

### b) La memoria RAM

> ### 🟦 ¿Qué significa? — *RAM (memoria)*
> La **RAM** (*Random Access Memory*) es la **memoria de trabajo**: rapidísima, pero
> **temporal**. Guarda lo que la computadora está usando *en este preciso momento*, y cuando
> apagas el equipo, **se borra**.
> Piénsalo como tu **escritorio**: cuanto más grande sea, más papeles (programas) puedes tener
> abiertos al mismo tiempo sin que se te amontonen.
> **¿Dónde se usa en tu proyecto?** Tu NAS tiene **8 GB de RAM**. Por eso, en cuanto le sumas
> *muchos* servicios a la vez, ese escritorio se llena: hoy por hoy, la RAM es el principal
> límite de tu NAS.

### c) El almacenamiento (disco)

> ### 🟦 ¿Qué significa? — *Almacenamiento (disco): SSD y HDD*
> El **almacenamiento** guarda los datos de forma **permanente**: siguen ahí aunque apagues el
> equipo. Hay dos tipos que verás todo el tiempo:
> - **SSD** (*Solid State Drive*): rápido, sin partes móviles. Ideal para el sistema.
> - **HDD** (*Hard Disk Drive*): más lento y mecánico, pero más barato por espacio. Ideal
>   para guardar muchos archivos.
> Siguiendo la analogía anterior: si la RAM es tu escritorio, el disco es tu **archivero**.
> Grande y permanente, pero más lento de consultar.
> **¿Dónde se usa en tu proyecto?** Tu NAS usa un **SSD NVMe de 238 GB** para el sistema
> (Ubuntu) y un **HDD de 954 GB** para los datos (en la carpeta `/srv/nas`).

> ### 💡 Tip — RAM vs. disco, la confusión más común
> Hay una mezcla que casi todo el mundo hace al principio: creer que "quedarse sin memoria" y
> "quedarse sin espacio" son lo mismo. No lo son. **Memoria = RAM** (trabajo temporal) y
> **espacio = disco** (guardado permanente). Tu NAS tiene poco de lo primero (8 GB) y mucho de
> lo segundo (casi 1 TB, y casi vacío).

### d) La placa y lo demás

Hay más piezas dentro de una computadora (la placa base, que conecta todo; la tarjeta gráfica,
y unas cuantas más), pero para programar y administrar servidores hay tres nombres que vas a
repetir sin parar: **CPU + RAM + disco**.

---

## 3. El sistema operativo: el jefe que organiza todo

> ### 🟦 ¿Qué significa? — *Sistema operativo (SO)*
> El **sistema operativo** es el programa principal: **controla el hardware** y hace posible
> que el resto de programas funcione. Reparte la CPU y la RAM entre ellos, gestiona los
> archivos y los dispositivos. Sin un SO, tu computadora sería solo hardware inerte.
> Ejemplos que ya conoces: **Windows**, **macOS** (Apple) y **Linux** (que viene en muchas
> variantes, llamadas "distribuciones": Ubuntu, Debian…).
> **¿Dónde se usa en tu proyecto?** Tu computadora usa Windows o macOS; tu **NAS usa Linux**,
> en concreto **Ubuntu Server 26.04**. En el módulo 09 verás Linux desde cero.

> ### 🟦 ¿Qué significa? — *Programa vs. proceso*
> Un **programa** es el archivo con las instrucciones (por ejemplo, el navegador que tienes
> instalado). Un **proceso** es ese mismo programa **mientras se está ejecutando** en la
> memoria. Por eso un solo programa (Chrome) puede correr como varios procesos a la vez (cada
> pestaña, por ejemplo).

---

## 4. Archivos y carpetas (el sistema de archivos)

Todo lo que hay en una computadora se guarda como **archivos**, y esos archivos se organizan en
**carpetas** (también llamadas *directorios*). Una carpeta puede contener otras carpetas, y así
se va formando una especie de árbol.

> ### 🟦 ¿Qué significa? — *Ruta (path)*
> La **ruta** es la "dirección" de un archivo dentro de ese árbol de carpetas. Por ejemplo,
> `tunal-digital/sitio-web/main.js` se lee así: dentro de la carpeta `tunal-digital`, dentro de
> `sitio-web`, está el archivo `main.js`.
> - En Linux/macOS las rutas usan `/` (ej. `/srv/nas`).
> - En Windows usan `\` (ej. `C:\Usuarios\Edwar`).

> ### 🟦 ¿Qué significa? — *Extensión de archivo*
> La parte final del nombre, después del punto, te dice **qué tipo de archivo** es: `.html`,
> `.css`, `.js`, `.py`, `.json`, `.md`. No cambia por arte de magia el contenido, pero sí le
> indica a los programas (y a ti) cómo hay que interpretarlo. `main.js` es un archivo de
> JavaScript; `estilos.css`, uno de CSS.

> ### 🔎 En tu código
> Imagina por un momento `RachaSimple`: verás carpetas como `src/components/` (las piezas de la
> interfaz), `src/pages/` (las pantallas) y archivos `.tsx` (React con TypeScript). Esa forma de
> ordenar las carpetas **no es solo decoración**: es lo que te permite encontrar y mantener el
> código sin volverte loco. Lo veremos con calma.

---

## 5. Bits, bytes y por qué todo son números

En el fondo, una computadora solo entiende **dos estados**: encendido o apagado. Esos dos
estados los representamos con **1** y **0**, y de ahí sale absolutamente todo lo demás.

> ### 🟦 ¿Qué significa? — *Bit y byte*
> Un **bit** es la unidad mínima: un 1 o un 0. Un **byte** son 8 bits juntos, lo justo para
> representar, por ejemplo, una letra. A partir de ahí las medidas van creciendo:
> - **KB** (kilobyte) ≈ mil bytes
> - **MB** (megabyte) ≈ un millón
> - **GB** (gigabyte) ≈ mil millones
> - **TB** (terabyte) ≈ un billón
> Por eso, cuando hablamos de "8 GB de RAM" o "954 GB de disco", estamos diciendo **cuántos
> datos** caben dentro. Y al final todo (el texto, las imágenes, el video) no es más que
> combinaciones de bits dentro de la máquina.

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Distingo **hardware** (físico) de **software** (programas).
- [ ] Sé qué hacen **CPU**, **RAM** y **disco**, y la diferencia entre RAM y almacenamiento.
- [ ] Entiendo qué es un **sistema operativo** y que mi NAS usa **Linux (Ubuntu)**.
- [ ] Sé leer una **ruta** y reconocer **extensiones** de archivo.
- [ ] Tengo idea de qué es un **bit/byte** y por qué se mide en GB.

---

## 🧪 Ejercicios

Algunos puedes hacerlos hoy mismo desde el teléfono; otros llevan "💻" porque necesitas tu
computadora.

1. **Clasifica.** Haz dos columnas, *Hardware* y *Software*, y coloca: pantalla, Chrome,
   Ubuntu, RAM, tu código de PolyPaw, el teclado, un archivo `.json`.
2. **RAM vs. disco.** Explica con tus palabras por qué tu NAS puede tener "casi 1 TB libre"
   pero aun así "quedarse corto de memoria" si abres demasiados servicios.
3. **Lee rutas.** ¿Qué te dice la ruta `Faro/src/app/api/ai/analyze/`? Nómbrame cada carpeta
   de fuera hacia dentro.
4. 💻 **Explora tu árbol de archivos.** En tu computadora, abre el explorador de archivos y
   navega tres carpetas hacia dentro desde tu carpeta de usuario. Anota la **ruta** completa
   a la que llegaste.
5. **Mide.** Un mensaje de texto de 280 caracteres pesa aproximadamente 280 bytes. ¿Cuántos
   mensajes así, *más o menos*, cabrían en 1 MB? (Pista: 1 MB ≈ un millón de bytes.)

➡️ Siguiente: **[Capítulo 03 — Internet y la web](03-internet-y-la-web.md)** *(se genera en la siguiente tanda).*
