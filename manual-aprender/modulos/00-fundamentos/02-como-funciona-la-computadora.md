# Capítulo 02 — Cómo funciona una computadora

> Para programar bien ayuda tener un modelo mental simple de qué hay "dentro" de una
> computadora. No necesitas ser ingeniero de hardware; sí necesitas estas piezas básicas,
> porque aparecerán todo el tiempo (sobre todo en el módulo del NAS).

---

## 1. Hardware y software

> ### 🟦 ¿Qué significa? — *Hardware*
> El **hardware** es **todo lo físico** que puedes tocar: la pantalla, el teclado, los chips,
> los discos. En tu caso, tu Acer Nitro 5 es hardware.

> ### 🟦 ¿Qué significa? — *Software*
> El **software** es **todo lo que no puedes tocar**: los programas, el sistema operativo, tu
> código. Son instrucciones y datos. El software le dice al hardware qué hacer.

Analogía: el hardware es el cuerpo; el software es lo que el cuerpo *sabe hacer* y *piensa*.

---

## 2. Las cuatro piezas que debes conocer

### a) El procesador (CPU)

> ### 🟦 ¿Qué significa? — *CPU (procesador)*
> La **CPU** (*Central Processing Unit*, "unidad central de procesamiento") es **el cerebro**:
> ejecuta las instrucciones de los programas, una tras otra, a enorme velocidad.
> **¿Dónde se usa en tu proyecto?** Tu NAS tiene una CPU **Intel Core i5-9300H** con
> **4 núcleos / 8 hilos**.

> ### 🟦 ¿Qué significa? — *Núcleo (core) e hilo (thread)*
> Un **núcleo** es como un "cerebro" independiente dentro de la CPU. Tener 4 núcleos es como
> tener 4 trabajadores que pueden hacer 4 tareas **a la vez**. Un **hilo** es una "línea de
> trabajo": con tecnología de *hyper-threading*, cada núcleo simula 2 hilos, por eso "4
> núcleos / 8 hilos". Más núcleos/hilos = más cosas en paralelo.

### b) La memoria RAM

> ### 🟦 ¿Qué significa? — *RAM (memoria)*
> La **RAM** (*Random Access Memory*) es la **memoria de trabajo**, rapidísima pero
> **temporal**: guarda lo que la computadora está usando *ahora mismo*. Cuando apagas el
> equipo, **se borra**.
> Analogía: es tu **escritorio**. Cuanto más grande, más papeles (programas) puedes tener
> abiertos a la vez sin amontonarte.
> **¿Dónde se usa en tu proyecto?** Tu NAS tiene **8 GB de RAM**. Por eso, si le sumas
> *muchos* servicios a la vez, ese escritorio se llena: la RAM es el principal límite de tu
> NAS hoy.

### c) El almacenamiento (disco)

> ### 🟦 ¿Qué significa? — *Almacenamiento (disco): SSD y HDD*
> El **almacenamiento** guarda los datos de forma **permanente**: sigue ahí aunque apagues el
> equipo. Hay dos tipos comunes:
> - **SSD** (*Solid State Drive*): rápido, sin partes móviles. Ideal para el sistema.
> - **HDD** (*Hard Disk Drive*): más lento y mecánico, pero más barato por espacio. Ideal
>   para guardar muchos archivos.
> Analogía: si la RAM es tu escritorio, el disco es tu **archivero**: grande y permanente,
> pero más lento de consultar.
> **¿Dónde se usa en tu proyecto?** Tu NAS usa un **SSD NVMe de 238 GB** para el sistema
> (Ubuntu) y un **HDD de 954 GB** para los datos (en la carpeta `/srv/nas`).

> ### 💡 Tip — RAM vs. disco, la confusión más común
> Mucha gente cree que "quedarse sin memoria" y "quedarse sin espacio" son lo mismo. No lo
> son: **memoria = RAM** (trabajo temporal), **espacio = disco** (guardado permanente). Tu
> NAS tiene poco de lo primero (8 GB) y mucho de lo segundo (casi 1 TB casi vacío).

### d) La placa y lo demás

Hay más piezas (la placa base que conecta todo, la tarjeta gráfica, etc.), pero para
programar y administrar servidores, **CPU + RAM + disco** son las tres que más vas a nombrar.

---

## 3. El sistema operativo: el jefe que organiza todo

> ### 🟦 ¿Qué significa? — *Sistema operativo (SO)*
> El **sistema operativo** es el programa principal que **controla el hardware** y permite que
> los demás programas funcionen. Reparte la CPU y la RAM entre programas, gestiona archivos y
> dispositivos. Sin SO, tu computadora sería hardware inerte.
> Ejemplos: **Windows**, **macOS** (Apple), **Linux** (con muchas variantes, llamadas
> "distribuciones": Ubuntu, Debian…).
> **¿Dónde se usa en tu proyecto?** Tu computadora usa Windows o macOS; tu **NAS usa Linux**,
> concretamente **Ubuntu Server 26.04**. El módulo 09 te enseña Linux desde cero.

> ### 🟦 ¿Qué significa? — *Programa vs. proceso*
> Un **programa** es el archivo con las instrucciones (ej.: el navegador instalado). Un
> **proceso** es ese programa **mientras se está ejecutando** en la memoria. Puedes tener un
> programa (Chrome) corriendo como varios procesos (varias pestañas) a la vez.

---

## 4. Archivos y carpetas (el sistema de archivos)

Todo en una computadora se guarda como **archivos**, organizados en **carpetas** (también
llamadas *directorios*), que pueden contener otras carpetas, formando un árbol.

> ### 🟦 ¿Qué significa? — *Ruta (path)*
> La **ruta** es la "dirección" de un archivo dentro del árbol de carpetas. Por ejemplo:
> `tunal-digital/sitio-web/main.js` significa: dentro de la carpeta `tunal-digital`, dentro de
> `sitio-web`, el archivo `main.js`.
> - En Linux/macOS las rutas usan `/` (ej. `/srv/nas`).
> - En Windows usan `\` (ej. `C:\Usuarios\Edwar`).

> ### 🟦 ¿Qué significa? — *Extensión de archivo*
> La parte final del nombre tras el punto indica **qué tipo de archivo** es: `.html`, `.css`,
> `.js`, `.py`, `.json`, `.md`. No cambia mágicamente el contenido, pero le dice a los
> programas (y a ti) cómo interpretarlo. `main.js` es un archivo de JavaScript; `estilos.css`
> es de CSS.

> ### 🔎 En tu código
> Abre mentalmente `RachaSimple`: verás carpetas como `src/components/` (piezas de interfaz),
> `src/pages/` (las pantallas) y archivos `.tsx` (React con TypeScript). Esa organización en
> carpetas **no es decorativa**: ayuda a encontrar y mantener el código. Lo estudiaremos.

---

## 5. Bits, bytes y por qué todo son números

En el fondo, la computadora solo entiende **dos estados**: encendido o apagado, que
representamos como **1** y **0**.

> ### 🟦 ¿Qué significa? — *Bit y byte*
> Un **bit** es la unidad mínima: un 1 o un 0. Un **byte** son 8 bits juntos, y alcanza para
> representar, por ejemplo, una letra. A partir de ahí:
> - **KB** (kilobyte) ≈ mil bytes
> - **MB** (megabyte) ≈ un millón
> - **GB** (gigabyte) ≈ mil millones
> - **TB** (terabyte) ≈ un billón
> Por eso "8 GB de RAM" o "954 GB de disco" son medidas de **cuántos datos** caben. Texto,
> imágenes, video… todo, dentro de la máquina, son combinaciones de bits.

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Distingo **hardware** (físico) de **software** (programas).
- [ ] Sé qué hacen **CPU**, **RAM** y **disco**, y la diferencia entre RAM y almacenamiento.
- [ ] Entiendo qué es un **sistema operativo** y que mi NAS usa **Linux (Ubuntu)**.
- [ ] Sé leer una **ruta** y reconocer **extensiones** de archivo.
- [ ] Tengo idea de qué es un **bit/byte** y por qué se mide en GB.

---

## 🧪 Ejercicios

Algunos puedes hacerlos hoy desde el teléfono; otros se marcan "💻" para tu computadora.

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
