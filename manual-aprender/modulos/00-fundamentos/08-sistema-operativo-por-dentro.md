# Capítulo 08 — El sistema operativo por dentro

<p align="center">
  <img src="../../recursos/imagenes/00-fundamentos/cap08.png" alt="Ilustración del capítulo (pixel art con Bit)" width="640">
</p>


> En este capítulo vas a abrir la "caja negra" que hay debajo de todos tus programas: el **sistema operativo**. Aprenderás qué hace en realidad cuando abres una app, cómo reparte el cerebro (CPU) y la memoria (RAM) entre muchas tareas a la vez, cómo organiza tus archivos en carpetas y rutas, qué son los permisos y los drivers, y en qué se parecen y diferencian Windows, macOS y Linux. Importa porque **todo** lo que programas —tu sitio web, tu app de hábitos, tu NAS— corre encima de un sistema operativo, y entenderlo te da superpoderes para no perderte cuando algo falla. Bit, el ajolote, te acompaña.

## 1. ¿Qué es un sistema operativo y por qué existe?

Imagina que tu computadora es un edificio enorme lleno de máquinas potentísimas: el procesador, la memoria, el disco, la pantalla, el teclado, la tarjeta de red. Esas máquinas no saben hablar entre ellas ni saben repartirse el trabajo solas. Hace falta un **administrador del edificio** que abra puertas, asigne salas, evite peleas y haga que todo funcione en orden. Ese administrador es el sistema operativo.

> ### 🟦 ¿Qué significa? — *Sistema operativo (SO)*
> Es el **programa más importante** de una computadora: arranca antes que todo lo demás y se encarga de gestionar el hardware (CPU, memoria, disco, dispositivos) y de ofrecer servicios a los demás programas. Sin él, cada aplicación tendría que saber controlar el hardware por su cuenta, lo cual sería imposible. Para qué sirve: para que tú puedas usar el navegador, escribir código y escuchar música a la vez sin que nada choque.

El SO se sienta justo en medio: por debajo está el **hardware** (lo físico) y por encima están tus **aplicaciones** (el navegador, el editor de código, tus proyectos). Tú casi nunca hablas directamente con el hardware; le pides cosas al SO y él las traduce.

> ### 🟦 ¿Qué significa? — *Hardware y software*
> **Hardware** es todo lo que puedes tocar: el procesador, la memoria, el disco, el teclado. **Software** es todo lo que NO puedes tocar: programas, instrucciones, datos. El sistema operativo es software, pero un software especial que manda sobre el hardware. Tus proyectos (PolyPaw, Faro, RachaSimple) son software que corre sobre el SO.

> ### 🟦 ¿Qué significa? — *Kernel (núcleo)*
> Es el corazón del sistema operativo: la parte que de verdad toca el hardware, reparte la CPU y la memoria y controla los dispositivos. Todo lo demás del SO (la interfaz, las ventanas, las apps) le pide permiso al kernel. En tu NAS **polypaw-nas**, que usa Ubuntu Server, el kernel es el de **Linux**. Cuando lees "Linux" técnicamente se refiere a ese núcleo.

> ### 💡 Tip — El SO también es un programa
> Esto sorprende a muchos: el sistema operativo es *software*, igual que tu app. La diferencia es que arranca primero y tiene privilegios especiales para mandar sobre el hardware. No es magia; es código que alguien escribió.

## 2. Programa vs proceso: el corazón del asunto

Esta distinción confunde a casi todo el mundo al principio, así que vamos despacio.

> ### 🟦 ¿Qué significa? — *Programa*
> Es un archivo (o conjunto de archivos) guardado en el disco con instrucciones escritas. Está **quieto**, no hace nada por sí solo. Es como una receta de cocina impresa: existe, pero nadie está cocinando todavía. Tu archivo `main.py` de **PolyPaw** es un programa: instrucciones en reposo.

> ### 🟦 ¿Qué significa? — *Proceso*
> Es un programa **en ejecución**: ya lo cargaste en la memoria y la CPU está corriendo sus instrucciones. Es la receta *mientras alguien la cocina de verdad*, con sus ingredientes (datos en memoria) sobre la mesa. Cuando haces `python main.py` en PolyPaw, el archivo (programa) se convierte en un proceso vivo.

La diferencia clave:

- **Un programa** está en el disco, ocupa espacio, está dormido.
- **Un proceso** está en la memoria, está despierto, consume CPU y RAM, tiene un número de identificación.

> ### 🟦 ¿Qué significa? — *PID (Process ID)*
> Es el número único que el sistema operativo le pone a cada proceso para identificarlo, como una cédula. Si dos personas abren el mismo programa, hay **dos procesos** distintos con **dos PID** distintos, aunque la receta sea la misma. Sirve para que el SO sepa exactamente a quién darle CPU o a quién cerrar.

Un mismo programa puede generar muchos procesos a la vez. Si abres tres ventanas del navegador, hay un solo programa instalado pero varios procesos corriendo.

> ### 🔎 En tu código
> Cuando levantas **Faro** en tu computadora con `npm run dev`, el archivo de código (programa) arranca un **proceso** de Node.js que escucha en un puerto. Ese proceso tiene un PID. Si lo cierras con Ctrl+C, matas el proceso, pero los archivos (`src/app/api`, `src/lib`) siguen ahí intactos en el disco, listos para volver a arrancar.

```bash
# En el NAS (Ubuntu Server), ver los procesos vivos:
ps aux

# Buscar un proceso por nombre, por ejemplo el servidor de archivos Samba:
ps aux | grep smbd
# smbd es el programa; cada línea que aparece es un PROCESO con su PID
```

> ### 💡 Tip — Cuando una app "se cuelga"
> Lo que se cuelga es el *proceso*, no el programa. Por eso "cerrar y volver a abrir" funciona: matas el proceso defectuoso y arrancas uno nuevo y limpio desde el mismo programa intacto del disco.

## 3. Repartir la CPU: cómo se hacen mil cosas "a la vez"

> ### 🟦 ¿Qué significa? — *CPU (procesador)*
> Es el cerebro de la computadora: el chip que ejecuta las instrucciones de los programas, una tras otra, a velocidades enormes (miles de millones por segundo). Cada instrucción es algo diminuto, como "suma estos dos números" o "mueve este dato".

Aquí viene un secreto: tu computadora **no** hace de verdad cien cosas al mismo tiempo. Un núcleo de CPU solo puede ejecutar una instrucción a la vez. Entonces, ¿cómo es que el navegador, la música y el editor parecen funcionar simultáneamente?

> ### 🟦 ¿Qué significa? — *Multitarea (time-sharing)*
> Es el truco del sistema operativo para que parezca que todo corre a la vez: le da a cada proceso un **turno** brevísimo de CPU (milésimas de segundo), luego lo pausa, le da el turno a otro, y así rota tan rápido que tú no notas las pausas. Es como un cocinero que atiende cinco ollas dando vueltas tan rápido que parece estar en todas a la vez.

> ### 🟦 ¿Qué significa? — *Planificador (scheduler)*
> Es la parte del kernel que decide a qué proceso le toca CPU y por cuánto tiempo. Reparte los turnos con criterios de prioridad: lo urgente primero, lo que puede esperar después. Tú no lo ves nunca, pero está trabajando miles de veces por segundo.

> ### 🟦 ¿Qué significa? — *Núcleos (cores)*
> Los procesadores modernos traen varios "cerebros" dentro del mismo chip, llamados núcleos. Cada núcleo puede ejecutar instrucciones de forma independiente, así que un procesador de 4 núcleos sí puede hacer 4 cosas *realmente* a la vez, y combinado con la multitarea, parece hacer cientos.

> ### 🔎 En tu código
> Tu **polypaw-nas** es un Acer Nitro con varios núcleos. Mientras corre Samba (compartir archivos), AdGuard Home (filtrar publicidad), Tailscale (la VPN) y contenedores de Docker, el planificador de Ubuntu reparte la CPU entre todos esos procesos. Con 8 GB de RAM y varios núcleos, el SO hace malabares para que ningún servicio se quede sin turno.

```bash
# En el NAS, ver en vivo qué procesos consumen más CPU (como un "monitor de actividad"):
top
# o la versión más bonita, si está instalada:
htop
```

> ### ⚠️ Cuidado — Un proceso puede acaparar la CPU
> A veces un programa con un error entra en un bucle infinito y consume el 100% de un núcleo. El SO no lo puede adivinar como "malo", solo ve un proceso que pide mucho turno. Por eso a veces tu ventilador suena fuerte: hay un proceso comiéndose la CPU. Con `top` lo identificas por su PID y lo puedes cerrar.

## 4. Repartir la RAM: la mesa de trabajo

> ### 🟦 ¿Qué significa? — *RAM (memoria)*
> Es la **mesa de trabajo** de la computadora: una memoria rápida pero temporal donde se cargan los procesos y sus datos mientras se usan. Es rápida pero se borra al apagar. No confundir con el disco, que es lento pero permanente. Tu NAS tiene **8 GB de RAM**: esa es su mesa de trabajo total.

Cada proceso necesita un trozo de RAM para vivir: ahí guarda sus variables, sus datos abiertos, su estado. El sistema operativo reparte la RAM entre todos los procesos y, muy importante, **los aísla** unos de otros.

> ### 🟦 ¿Qué significa? — *Aislamiento de memoria*
> El SO le da a cada proceso su propio espacio de memoria privado, como cubículos separados. El proceso A no puede leer ni dañar la memoria del proceso B. Esto sirve para la **seguridad** (una app maliciosa no fisgonea a otra) y la **estabilidad** (si una app falla, no se lleva a las demás por delante).

> ### 🟦 ¿Qué significa? — *Memoria virtual y swap*
> Cuando la RAM se llena, el SO usa un truco: guarda en el disco los trozos de memoria que ahora no se están usando, y los trae de vuelta cuando hacen falta. Eso reservado en disco se llama **swap** (intercambio). Es como dejar platos en el fregadero para liberar la mesa: funciona, pero ir al fregadero es lento. Por eso, si tu NAS se queda sin RAM y tira mucho de swap, todo va más lento.

> ### ⚠️ Cuidado — Quedarse sin RAM
> Si los procesos piden más RAM de la que hay (y el swap también se agota), el SO tiene que tomar una decisión dura: en Linux, un guardián llamado **OOM killer** (Out Of Memory) cierra el proceso más glotón para salvar al sistema. En tu NAS con 8 GB, si levantas demasiados contenedores Docker a la vez, podrías toparte con esto. La solución suele ser limitar la memoria de cada contenedor.

> ### 💡 Tip — RAM vs disco, no los confundas
> Regla mental: la **RAM** es para lo que estás usando *ahorita* (rápida, temporal). El **disco** (SSD/HDD) es para guardar para siempre. Cuando guardas `polypaw_db.json`, eso va al disco. Cuando PolyPaw está corriendo y manipula esos datos, una copia vive en la RAM.

## 5. El sistema de archivos a fondo

Ahora bajemos al disco, donde viven tus proyectos de verdad.

> ### 🟦 ¿Qué significa? — *Sistema de archivos*
> Es la forma en que el SO organiza la información del disco en **archivos** y **carpetas** (también llamadas directorios), con nombres, fechas, tamaños y permisos. Sin él, el disco sería solo un mar de unos y ceros sin orden. Gracias a él, puedes tener tu carpeta `Organizer` con `src/` dentro, y dentro `app/`, y así.

Las carpetas se anidan formando un **árbol**: una carpeta dentro de otra, dentro de otra. Para llegar a un archivo, escribes el camino: la **ruta**.

### Rutas absolutas y relativas

> ### 🟦 ¿Qué significa? — *Ruta absoluta*
> Es la dirección **completa** de un archivo, desde la raíz del disco hasta él, sin ambigüedad. En Linux/macOS empieza con `/`; en Windows con algo como `C:\`. Es como dar tu dirección completa con país, ciudad, calle y número: funciona la escribas desde donde la escribas.

> ### 🟦 ¿Qué significa? — *Ruta relativa*
> Es la dirección de un archivo **desde donde estás parado ahora** (la carpeta actual). No empieza con `/`. Es como decir "dos puertas a la derecha": solo tiene sentido si se sabe desde dónde partes. `./` significa "aquí mismo" y `..` significa "la carpeta de arriba".

```bash
# Ruta ABSOLUTA del worker de tunal-digital (siempre apunta al mismo sitio):
/home/user/tunal-digital/backend/worker.js

# Ruta RELATIVA, si ya estás parado dentro de tunal-digital/:
backend/worker.js
./backend/worker.js

# Subir un nivel y entrar en otra carpeta:
../PolyPaw/main.py
```

> ### 🔎 En tu código
> En **RachaSimple** importas componentes con rutas relativas: desde un archivo dentro de `src/components` puedes escribir `../hooks/useRacha` o `../types/database`. Esos `..` significan "sal de esta carpeta y busca la hermana". Si movieras el archivo, esas rutas relativas podrían romperse, mientras que una ruta absoluta no.

> ### 💡 Tip — La raíz `/` y `C:\`
> En Linux y macOS, todo cuelga de una única raíz llamada `/`. En tu NAS, el segundo disco (HDD de 954 GB) está montado en `/srv/nas`: o sea, esa carpeta *es* la puerta de entrada al disco grande. En Windows hay varias raíces con letras: `C:\`, `D:\`. Esa es una de las diferencias más visibles entre sistemas.

### Permisos básicos

> ### 🟦 ¿Qué significa? — *Permisos de archivo*
> Son las reglas que dicen **quién puede hacer qué** con un archivo o carpeta. En Linux y macOS hay tres acciones —leer (r), escribir (w) y ejecutar (x)— y tres grupos de gente: el **dueño** del archivo, su **grupo** y **los demás** (todos). Sirven para la seguridad: que no cualquiera borre o lea cosas que no le tocan.

> ### 🟦 ¿Qué significa? — *Leer, escribir, ejecutar*
> **Leer (r)**: poder ver el contenido. **Escribir (w)**: poder modificar o borrar. **Ejecutar (x)**: poder *correr* el archivo como programa (o, en una carpeta, poder entrar en ella). Un script solo arranca si tiene permiso de ejecución.

```bash
# En el NAS, listar archivos mostrando sus permisos:
ls -l

# Ejemplo de salida:
# -rw-r--r--  1 edwar edwar  1240 jun 25 10:00 polypaw_db.json
#  └┬┘└┬┘└┬┘     └──┬──┘
#   │  │  └ los demás: solo leer (r--)
#   │  └─── el grupo: solo leer (r--)
#   └────── el dueño: leer y escribir (rw-)
```

Esos tres bloques de letras de la izquierda son los permisos. El primer carácter dice el tipo: `-` es un archivo normal, `d` es una carpeta (directory).

> ### 🔎 En tu código
> En tu **polypaw-nas**, los archivos compartidos por Samba en `/srv/nas` necesitan los permisos correctos para que tu usuario pueda escribir desde otra computadora. Si copias un archivo y no puedes borrarlo después, casi siempre es un tema de permisos: el dueño o el grupo no coinciden con tu usuario. Se arregla con `chmod` (cambiar permisos) o `chown` (cambiar dueño).

> ### ⚠️ Cuidado — El usuario root
> En Linux existe un superusuario llamado **root** que puede saltarse todos los permisos. En tu NAS, lo usas con `sudo` (ejecutar "como superusuario") para tareas administrativas. Es poderoso y peligroso: un `sudo rm` mal escrito puede borrar cosas importantes sin preguntar. Usa `sudo` solo cuando de verdad haga falta y lee dos veces antes de pulsar Enter.

## 6. Drivers: traductores hacia el hardware

> ### 🟦 ¿Qué significa? — *Driver (controlador)*
> Es un pequeño software que le enseña al sistema operativo a **hablar con un dispositivo concreto**: una impresora, una tarjeta de red, una webcam, un disco. Cada fabricante hace sus dispositivos a su manera, y el driver es el traductor que convierte las órdenes genéricas del SO ("imprime esto") en las señales exactas que ese aparato entiende.

Sin el driver correcto, el SO ve el dispositivo pero no sabe usarlo bien. Por eso a veces conectas algo y "no funciona hasta instalar el driver".

> ### 🔎 En tu código
> Tu **polypaw-nas** es un portátil Acer con tarjeta de red, Wi-Fi y discos. Ubuntu Server trae drivers para casi todo el hardware común ya incluidos en el kernel de Linux, por eso suele "funcionar de una". El SSD de 238 GB y el HDD de 954 GB se comunican con el sistema gracias a drivers de disco que Ubuntu maneja sin que tú hagas nada. Cuando un dispositivo raro no funciona en Linux, suele ser justamente porque falta su driver.

> ### 💡 Tip — Los drivers viven cerca del kernel
> Como los drivers tocan el hardware, corren con privilegios muy altos, casi como parte del kernel. Por eso un driver mal hecho puede tumbar todo el sistema (en Windows es la causa clásica de la "pantalla azul"). Mantenerlos actualizados es parte de la salud de cualquier computadora o servidor.

## 7. Windows, macOS y Linux: tres administradores distintos

Los tres son sistemas operativos: los tres gestionan procesos, RAM, archivos y drivers. Pero tienen filosofías, dueños y costumbres diferentes.

> ### 🟦 ¿Qué significa? — *Windows*
> El SO de Microsoft, el más usado en computadoras de escritorio del mundo. De pago, cerrado (su código no es público), pensado para máxima compatibilidad con programas comerciales y juegos. Usa rutas con `\` y unidades con letra (`C:\`).

> ### 🟦 ¿Qué significa? — *macOS*
> El SO de Apple, que solo corre en computadoras Apple (Mac). Por debajo es un pariente de Unix (la familia "abuela" de Linux), así que su terminal se parece mucho a la de Linux: rutas con `/`, comandos parecidos. Muy popular entre desarrolladores por esa razón.

> ### 🟦 ¿Qué significa? — *Linux*
> Una familia de sistemas operativos **libres y de código abierto**: cualquiera puede ver, modificar y distribuir su código. No hay un solo Linux, sino muchas **distribuciones** (Ubuntu, Debian, Fedora...) que comparten el mismo kernel pero empaquetan las cosas a su manera. Domina en servidores, nubes y dispositivos: tu NAS es Linux.

> ### 🟦 ¿Qué significa? — *Distribución (distro)*
> Es un "sabor" de Linux: el kernel de Linux más un conjunto de programas, herramientas y un instalador, empaquetados juntos por una comunidad o empresa. **Ubuntu** es una de las distros más populares y fáciles. Tu NAS usa **Ubuntu Server**, la variante sin escritorio gráfico, pensada para correr servicios.

> ### 🔎 En tu código
> Probablemente desarrollas **Faro**, **RachaSimple** y los demás en Windows o macOS, pero tu **polypaw-nas** corre **Ubuntu Server 26.04**, *sin pantalla ni mouse*: lo controlas por la red. Esto te obliga a conocer la línea de comandos de Linux, porque no hay ventanas donde hacer clic. Servicios como **smbd** (Samba), **Cockpit** (el panel web en el puerto :9090) y **Tailscale** son procesos de Linux que arrancan solos al encender el servidor.

> ### 🟦 ¿Qué significa? — *Servidor (server)*
> Una computadora (o programa) cuyo trabajo es **dar servicio** a otras a través de la red: guardar archivos, servir páginas web, filtrar publicidad. No necesita pantalla porque nadie se sienta frente a él; otros equipos le hacen peticiones por red. Tu NAS es un servidor casero de archivos.

> ### 💡 Tip — Por qué los servidores usan Linux
> Linux es gratis, estable, ligero (sin escritorio gasta poca RAM, ideal para tus 8 GB), seguro y se controla 100% por comandos, lo que permite automatizarlo. Por eso la inmensa mayoría de servidores del mundo —incluido el tuyo y los de Cloudflare donde corre tu `worker.js` de tunal-digital— usan Linux.

## 8. Cómo se ve todo esto junto

Juntemos las piezas con un recorrido. Cuando enciendes tu **polypaw-nas**:

1. El hardware arranca y carga el **kernel** de Linux en la RAM.
2. El kernel detecta los discos, la red y demás usando sus **drivers**.
3. El SO monta el sistema de archivos: la raíz `/` y el disco grande en `/srv/nas`.
4. Arranca los **procesos** de servicio: `smbd` (Samba), Cockpit, Tailscale, AdGuard, los contenedores de Docker. Cada uno recibe su PID y su trozo de RAM aislado.
5. El **planificador** empieza a repartir la CPU entre todos esos procesos, milésima a milésima.
6. Desde tu laptop, por la VPN de Tailscale, le pides un archivo a Samba: el SO comprueba **permisos**, lee del disco y te lo envía por la red.

Todo eso pasa en segundos, en silencio, sin que veas nada. Eso es el sistema operativo "por dentro".

> ### 💡 Tip — Esto aplica a TODOS tus proyectos
> No solo al NAS. Cuando corres **PolyPaw** (proceso de Python leyendo `missions/*.json` del disco), cuando levantas **Faro** (proceso de Node con su RAM), o cuando tu `worker.js` de **tunal-digital** corre en los servidores de Cloudflare: siempre hay un SO debajo gestionando procesos, memoria, archivos y permisos. Lo que aprendiste aquí te sirve en todas partes.

## ✅ Checklist — ¿ya domino esto?

- [ ] Sé explicar qué es un sistema operativo y dónde se sitúa (entre hardware y aplicaciones).
- [ ] Entiendo la diferencia entre **programa** (en disco, quieto) y **proceso** (en RAM, vivo) y qué es un PID.
- [ ] Sé por qué parece que la computadora hace varias cosas a la vez (multitarea y planificador).
- [ ] Entiendo para qué sirve la RAM, qué es el swap y qué pasa al quedarse sin memoria.
- [ ] Distingo una **ruta absoluta** (empieza en `/` o `C:\`) de una **relativa** (`./`, `..`).
- [ ] Sé leer los permisos básicos (lectura, escritura, ejecución; dueño, grupo, los demás).
- [ ] Sé qué es un driver y por qué hace falta para usar un dispositivo.
- [ ] Puedo nombrar las diferencias principales entre Windows, macOS y Linux, y por qué mi NAS usa Ubuntu Server.

## 🧪 Ejercicios

1. **Programa o proceso.** Sin computadora, clasifica cada uno como "programa" o "proceso": (a) el archivo `main.py` guardado en disco, (b) PolyPaw corriendo en tu pantalla, (c) tres ventanas del navegador abiertas, (d) `worker.js` sin ejecutar. Explica tu respuesta en una frase cada uno.

2. **Dibuja el árbol.** En papel, dibuja el árbol de carpetas desde la raíz `/` hasta el archivo `/home/user/tunal-digital/backend/worker.js`. Marca cuál es la ruta absoluta y escribe cómo sería la ruta relativa si estuvieras parado dentro de `tunal-digital/`.

3. **💻 Mira tus procesos.** En tu computadora abre el Monitor de Actividad (macOS), el Administrador de Tareas (Windows) o ejecuta `top` en una terminal (Linux/macOS). Identifica los tres procesos que más CPU y más RAM consumen ahora mismo. Anota sus nombres.

4. **💻 Lee permisos en el NAS.** Conéctate a tu **polypaw-nas** y ejecuta `ls -l` dentro de `/srv/nas`. Elige un archivo y traduce a palabras sus permisos: ¿quién puede leerlo?, ¿quién puede escribirlo? Apunta la línea completa.

5. **💻 Rutas relativas.** En cualquier carpeta de tu computadora, abre una terminal y prueba: `pwd` (te dice tu ruta absoluta actual), luego `cd ..` (subes un nivel) y `pwd` otra vez. Observa cómo cambió la ruta. Escribe qué hizo `..`.

6. **Comparación de SO.** En una tabla de tres columnas (Windows, macOS, Linux), llena al menos tres diferencias: cómo se escribe la raíz de las rutas, si es de pago o libre, y un ejemplo de para qué se usa más cada uno. Marca cuál usa tu NAS y por qué tiene sentido.
