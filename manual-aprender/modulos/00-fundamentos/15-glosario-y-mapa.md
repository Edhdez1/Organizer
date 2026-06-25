# Capítulo 15 — Glosario y mapa del módulo

> Llegaste al último capítulo del Módulo 00. Aquí no aprendes nada nuevo: aquí *ordenas* todo lo que ya viste. Este capítulo es tu diccionario de bolsillo (un glosario alfabético con cada palabra técnica del módulo explicada en una o dos líneas) y un mapa mental en texto que conecta los temas para que veas cómo encajan unos con otros. Importa porque la programación tiene un vocabulario propio: cuando dominas las palabras, dejas de "adivinar" y empiezas a *entender*. Bit, nuestro ajolote guía, dice que un buen glosario es como una linterna en un cuarto oscuro: no cambia el cuarto, pero ahora ves dónde pisas.

## 1. Cómo usar este capítulo

Este capítulo es distinto a los anteriores. No tiene una historia de principio a fin: es una **referencia**. Eso significa que está pensado para que vuelvas a él cuando una palabra se te olvide.

Te sugiero tres formas de aprovecharlo:

1. **Léelo entero una vez**, sin prisa, para refrescar todo el módulo.
2. **Vuelve cuando dudes.** Si en el Módulo 01 lees "haz un commit en tu rama" y se te fue qué era una rama, abre este capítulo y búscala.
3. **Tápate las definiciones.** Lee solo el término e intenta explicarlo con tus palabras. Si puedes, lo dominas.

> ### 💡 Tip — Explicar es la mejor prueba
> Si puedes explicarle un término a alguien que no programa (tu mamá, un amigo, hasta a Bit el ajolote), de verdad lo entendiste. Si solo puedes repetir la definición de memoria, todavía no.

El glosario está ordenado alfabéticamente para que lo busques rápido. Después del glosario viene el mapa mental, que es lo contrario: ahí los términos están ordenados *por cómo se relacionan*, no por su letra inicial.

## 2. Glosario alfabético

Cada término viene en su recuadro azul. La definición es corta a propósito: para qué sirve, en palabras simples, y dónde aparece en tus proyectos reales cuando aplica.

### A

> ### 🟦 ¿Qué significa? — *Algoritmo*
> Una lista de pasos ordenados para resolver un problema, como una receta de cocina. Programar es, en el fondo, escribir algoritmos que la computadora pueda seguir.

> ### 🟦 ¿Qué significa? — *API*
> Sigla de *Application Programming Interface* (interfaz de programación). Es la "ventanilla" por la que un programa le pide cosas a otro. **¿Dónde se usa en tu proyecto?** En `tunal-digital`, `backend/worker.js` llama a la **API de Claude** para generar texto; en Faro, `src/app/api` llama a la API de OpenAI.

> ### 🟦 ¿Qué significa? — *Archivo*
> Un conjunto de datos guardado con un nombre, dentro del disco. Tu código vive en archivos: `main.py`, `index.html`, `worker.js` son todos archivos.

### B

> ### 🟦 ¿Qué significa? — *Backend*
> La parte de una aplicación que corre en un servidor, lejos del usuario, y hace el trabajo "oculto" (datos, lógica, seguridad). **¿Dónde se usa en tu proyecto?** En `tunal-digital` el backend es `backend/worker.js`; en Faro es `src/app/api`.

> ### 🟦 ¿Qué significa? — *Bit*
> La unidad mínima de información en una computadora: vale 0 o 1, como un interruptor apagado o encendido. Todo lo digital, al final, son bits. (También es el nombre de tu ajolote guía.)

> ### 🟦 ¿Qué significa? — *Byte*
> Un grupo de 8 bits. Es la unidad con la que medimos el tamaño de archivos y memoria. Una letra suele ocupar 1 byte; mil bytes son un kilobyte (KB), un millón un megabyte (MB).

### C

> ### 🟦 ¿Qué significa? — *Cliente*
> El programa que *pide* algo: tu navegador, una app de celular, tu terminal. **¿Dónde se usa en tu proyecto?** El navegador que abre `sitio-web/index.html` de `tunal-digital` es el cliente.

> ### 🟦 ¿Qué significa? — *Commit*
> Una "foto" guardada de tu código en un momento dado, con un mensaje que explica qué cambiaste. Es la unidad básica del historial de Git. **¿Dónde se usa en tu proyecto?** Cada vez que guardas avances de Faro o RachaSimple en Git, haces un commit.

> ### 🟦 ¿Qué significa? — *CPU*
> Sigla de *Central Processing Unit* (unidad central de proceso). Es el "cerebro" de la computadora: ejecuta las instrucciones de tus programas, una tras otra, muy rápido.

### D

> ### 🟦 ¿Qué significa? — *Disco*
> La memoria que **no** se borra al apagar la computadora: ahí viven tus archivos y programas de forma permanente. Puede ser SSD (rápido) o HDD (más lento y barato). **¿Dónde se usa en tu proyecto?** Tu `polypaw-nas` tiene un SSD de 238 GB y un HDD de 954 GB montado en `/srv/nas`.

> ### 🟦 ¿Qué significa? — *DNS*
> Sigla de *Domain Name System*. Es la "agenda de contactos" de internet: traduce un nombre fácil de recordar (como `google.com`) a su número de IP. Sin DNS tendrías que memorizar números.

> ### 🟦 ¿Qué significa? — *Docker / Podman*
> Herramientas para empaquetar un programa con todo lo que necesita y correrlo aislado en un "contenedor", como una cajita portátil. **¿Dónde se usa en tu proyecto?** Tu `polypaw-nas` tiene Docker/Podman instalado para correr servicios.

### F

> ### 🟦 ¿Qué significa? — *Framework*
> Un conjunto de herramientas y reglas ya hechas que te ahorran trabajo al construir una app. **¿Dónde se usa en tu proyecto?** PolyPaw usa el framework **Flet** (Python); RachaSimple usa **React**; Faro usa **Next.js**.

> ### 🟦 ¿Qué significa? — *Frontend*
> La parte de la app que el usuario ve y toca: botones, textos, colores. **¿Dónde se usa en tu proyecto?** En RachaSimple, `src/components` es el frontend; en `tunal-digital` lo son `index.html`, `styles.css` y `main.js`.

### G

> ### 🟦 ¿Qué significa? — *Git*
> Un programa que guarda el historial de tu código: quién cambió qué y cuándo, y te deja volver atrás. Es la "máquina del tiempo" de tu proyecto. **¿Dónde se usa en tu proyecto?** Lo usas (o lo usarás) en los cuatro proyectos de código: tunal-digital, PolyPaw, RachaSimple y Faro.

### H

> ### 🟦 ¿Qué significa? — *Hardware*
> Las partes físicas de la computadora: las que puedes tocar (CPU, RAM, disco, pantalla). Lo opuesto al software.

> ### 🟦 ¿Qué significa? — *HTML*
> Sigla de *HyperText Markup Language*. Es el lenguaje que define la **estructura** de una página web (títulos, párrafos, botones). **¿Dónde se usa en tu proyecto?** En `tunal-digital`, el archivo `sitio-web/index.html`.

> ### 🟦 ¿Qué significa? — *HTTP*
> Sigla de *HyperText Transfer Protocol*. Es el "idioma" con el que el cliente y el servidor se hablan en la web: el cliente pide y el servidor responde. Su versión segura es **HTTPS**.

### I

> ### 🟦 ¿Qué significa? — *IP*
> Sigla de *Internet Protocol*. Es el número que identifica a cada dispositivo en una red, como la dirección de una casa. Sirve para que los datos lleguen al lugar correcto.

> ### 🟦 ¿Qué significa? — *JSON*
> Un formato de texto para guardar datos organizados en pares "nombre: valor". Lo leen igual de bien las personas y las máquinas. **¿Dónde se usa en tu proyecto?** PolyPaw guarda sus misiones y su base de datos en JSON: `missions/*.json` y `polypaw_db.json`.

### L

> ### 🟦 ¿Qué significa? — *Lenguaje de programación*
> El idioma en que le escribes instrucciones a la computadora. **¿Dónde se usa en tu proyecto?** Usas JavaScript (tunal-digital), Python (PolyPaw) y TypeScript (RachaSimple, Faro).

### O

> ### 🟦 ¿Qué significa? — *OAuth*
> Un sistema para iniciar sesión usando otra cuenta (como "Entrar con Google") sin compartir tu contraseña. **¿Dónde se usa en tu proyecto?** Faro usa OAuth (vía Supabase Auth) para conectarse a tu GitHub y Google Drive.

> ### 🟦 ¿Qué significa? — *OpenAI / Claude (modelos de IA)*
> Servicios de inteligencia artificial a los que tu app les pide texto generado. **¿Dónde se usa en tu proyecto?** `tunal-digital` usa la API de Claude; Faro usa OpenAI para escribir descripciones y roadmaps.

### P

> ### 🟦 ¿Qué significa? — *Programar*
> Escribir instrucciones (algoritmos) en un lenguaje que la computadora entiende, para que haga algo útil. Es lo que haces en cada uno de tus proyectos.

### R

> ### 🟦 ¿Qué significa? — *RAM*
> Sigla de *Random Access Memory*. Es la memoria rápida y temporal donde la computadora pone lo que está usando *ahora*. Se borra al apagar. **¿Dónde se usa en tu proyecto?** Tu `polypaw-nas` tiene 8 GB de RAM.

> ### 🟦 ¿Qué significa? — *Rama (branch)*
> Una línea de trabajo paralela en Git: te deja experimentar con cambios sin tocar la versión principal (`main`). Cuando funciona, la fusionas. **¿Dónde se usa en tu proyecto?** En Faro trabajas en una rama de sesión y abres un PR hacia `main`.

> ### 🟦 ¿Qué significa? — *Repositorio (repo)*
> La carpeta de un proyecto con todo su código y su historial de Git. **¿Dónde se usa en tu proyecto?** Cada uno de tus proyectos (tunal-digital, PolyPaw, RachaSimple, Faro) es un repositorio.

> ### 🟦 ¿Qué significa? — *Ruta (path)*
> La "dirección" que indica dónde está un archivo o carpeta dentro del disco, separada por barras. **¿Dónde se usa en tu proyecto?** `src/types/database.ts` en RachaSimple es una ruta; `/srv/nas` en tu NAS también.

### S

> ### 🟦 ¿Qué significa? — *Servidor*
> El programa (o la máquina) que *responde* a las peticiones del cliente: entrega páginas, datos o respuestas. **¿Dónde se usa en tu proyecto?** `backend/worker.js` de tunal-digital actúa como servidor; tu `polypaw-nas` es una máquina servidor.

> ### 🟦 ¿Qué significa? — *Shell*
> El programa que interpreta los comandos que escribes en la terminal y se los pasa al sistema operativo. La terminal es la ventana; el shell es quien "entiende" lo que tecleas.

> ### 🟦 ¿Qué significa? — *Sistema operativo (SO)*
> El programa principal que controla toda la computadora y hace de puente entre tú, los programas y el hardware. Ejemplos: Windows, macOS, Linux. **¿Dónde se usa en tu proyecto?** Tu `polypaw-nas` corre **Ubuntu Server 26.04**, una versión de Linux.

> ### 🟦 ¿Qué significa? — *Software*
> Los programas: las instrucciones que le dicen al hardware qué hacer. No lo puedes tocar; es lo opuesto al hardware.

### T

> ### 🟦 ¿Qué significa? — *Terminal*
> La ventana de texto donde escribes comandos para darle órdenes directas a la computadora, sin ratón. Dentro de ella corre un shell. **¿Dónde se usa en tu proyecto?** Administras tu `polypaw-nas` por terminal (vía Samba, Cockpit o SSH).

> ### 🟦 ¿Qué significa? — *TypeScript*
> Una versión de JavaScript que añade "tipos" (avisa qué clase de dato espera cada cosa) para atrapar errores antes de ejecutar. **¿Dónde se usa en tu proyecto?** RachaSimple y Faro están escritos en TypeScript; mira `src/types/database.ts`.

### V

> ### 🟦 ¿Qué significa? — *Variable*
> Una "caja con nombre" donde guardas un dato para usarlo después. El nombre te deja recuperar o cambiar lo que hay dentro. Las usas en todo tu código, en cualquier lenguaje.

> ### 🟦 ¿Qué significa? — *VPN*
> Sigla de *Virtual Private Network*. Crea un "túnel" privado y seguro entre dispositivos a través de internet, como si estuvieran en la misma red local. **¿Dónde se usa en tu proyecto?** Tu `polypaw-nas` usa **Tailscale** como VPN para conectarte de forma segura desde fuera de casa.

> ### 🟦 ¿Qué significa? — *Vanilla*
> Adjetivo que significa "sin frameworks ni librerías extra, puro lenguaje base". **¿Dónde se usa en tu proyecto?** `tunal-digital` usa JavaScript **vanilla**: `main.js` no depende de React ni nada parecido.

## 3. Términos del entorno de tu NAS

Tu `polypaw-nas` trajo varias palabras nuevas. Las junto aquí porque pertenecen al mismo mundo: el de administrar un servidor en casa.

> ### 🟦 ¿Qué significa? — *Samba*
> Un programa que permite compartir carpetas en red para que otras computadoras las abran como si fueran propias. **¿Dónde se usa en tu proyecto?** Tu NAS comparte la carpeta `PolyPawNAS` con Samba; el servicio se llama `smbd`.

> ### 🟦 ¿Qué significa? — *Cockpit*
> Un panel web para administrar un servidor Linux desde el navegador, sin memorizar comandos. **¿Dónde se usa en tu proyecto?** Lo abres en tu NAS por el puerto `:9090`.

> ### 🟦 ¿Qué significa? — *AdGuard Home*
> Un servidor de DNS que bloquea anuncios y rastreadores para toda tu red. **¿Dónde se usa en tu proyecto?** Corre en tu `polypaw-nas`.

> ### 🟦 ¿Qué significa? — *Puerto*
> Un número que identifica un servicio concreto dentro de una máquina, como la extensión telefónica de una oficina. **¿Dónde se usa en tu proyecto?** Cockpit responde en el puerto `9090` de tu NAS.

> ### 🟦 ¿Qué significa? — *Supabase*
> Un servicio que te da base de datos, autenticación y APIs listas para usar. **¿Dónde se usa en tu proyecto?** RachaSimple y Faro guardan datos y manejan login con Supabase.

> ### 🔎 En tu código
> Mira cómo una misma idea aparece distinta en cada proyecto. Todas son rutas de archivo, pero cuentan historias diferentes:
> ```text
> tunal-digital/sitio-web/main.js        ← JavaScript vanilla en el frontend
> PolyPaw/missions/mission-01.json       ← datos en JSON
> RachaSimple/src/repositories/...       ← TypeScript que habla con Supabase
> Organizer/src/app/api/...              ← el backend de Faro (Next.js)
> ```
> Leer una ruta ya te dice mucho: lenguaje, parte de la app y para qué sirve.

## 4. Mapa mental del módulo (en texto)

El glosario ordena las palabras por su letra. El mapa las ordena por *cómo se conectan*. Recórrelo de arriba hacia abajo: cada nivel se apoya en el anterior.

### Nivel 1 — La máquina física (hardware)

Todo empieza con una máquina. El **hardware** son las partes que tocas:

- La **CPU** ejecuta las instrucciones.
- La **RAM** guarda lo que se usa *ahora* (rápida, se borra al apagar).
- El **disco** guarda lo que se queda *para siempre* (más lento, no se borra).

> Recuerda con una imagen: la RAM es tu escritorio (lo que tienes a mano), el disco es el archivero (lo que guardas), la CPU eres tú trabajando.

### Nivel 2 — El software que manda: el SO

Sobre el hardware vive el **sistema operativo (SO)**, que reparte la CPU, la RAM y el disco entre los programas. Tu `polypaw-nas` corre Ubuntu (Linux). Para hablarle directo usas la **terminal**, donde un **shell** interpreta tus **comandos**, y navegas por **rutas** hasta tus **archivos**.

### Nivel 3 — Cómo se guarda todo: bits y bytes

Bajo los archivos, todo es información: **bits** (0 o 1) agrupados en **bytes** (8 bits). Con bytes medimos cuánto pesan tus archivos y cuánta RAM tienes (los 8 GB de tu NAS son miles de millones de bytes).

### Nivel 4 — Escribir instrucciones: programar

Aquí entras tú. **Programar** es escribir **algoritmos** (pasos ordenados) en un **lenguaje** (JavaScript, Python, TypeScript). Guardas datos en **variables** y organizas el código en **archivos** dentro de un **repositorio**.

```text
algoritmo  →  lenguaje  →  archivos  →  repositorio
 (la idea)    (el idioma)   (el texto)   (el proyecto entero)
```

### Nivel 5 — No perder tu trabajo: Git

Tu repositorio lo cuida **Git**, la máquina del tiempo. Guardas avances en **commits** (fotos con mensaje) y experimentas en **ramas** sin romper `main`. Esto conecta los cuatro proyectos de código: tunal-digital, PolyPaw, RachaSimple y Faro.

### Nivel 6 — Hablar con otras máquinas: la red

Tus programas no viven solos: se hablan por internet.

- El **cliente** pide; el **servidor** responde.
- Se entienden por **HTTP** (su versión segura, HTTPS).
- Cada máquina tiene una **IP** (su dirección); el **DNS** traduce nombres a IPs.
- Un servicio dentro de una máquina escucha en un **puerto**.
- Una **API** es la ventanilla por la que un programa le pide datos a otro.

> Une el hilo: tu navegador (**cliente**) pide por **HTTP** a la **IP** que el **DNS** encontró; el **servidor** (`worker.js`) responde y, por dentro, llama a una **API** (Claude). Toda la web es esta conversación, repetida millones de veces.

### Nivel 7 — Construir más rápido: frameworks y servicios

Para no empezar de cero usas **frameworks** (Flet, React, Next.js) y servicios externos (**Supabase** para datos y login, **OpenAI**/**Claude** para IA). Tu app se parte en **frontend** (lo que se ve) y **backend** (lo que trabaja oculto). El acceso seguro se maneja con **OAuth**, y los secretos viven en el servidor, nunca en el cliente.

### El mapa completo, de un vistazo

```text
HARDWARE (CPU · RAM · disco)
   └─ SISTEMA OPERATIVO (terminal · shell · rutas · archivos)
        └─ DATOS (bits → bytes)
             └─ PROGRAMAR (algoritmo · lenguaje · variable)
                  └─ GIT (repositorio · commit · rama)
                       └─ RED (cliente ↔ servidor · HTTP · IP · DNS · API)
                            └─ HERRAMIENTAS (frameworks · Supabase · IA · OAuth)
                                 └─ TUS PROYECTOS: tunal-digital · PolyPaw · RachaSimple · Faro
```

> ### 💡 Tip — De abajo hacia arriba
> Cuando algo falle en el futuro, recorre este mapa de abajo hacia arriba preguntando "¿en qué nivel está el problema?". ¿Es de red (no carga la página)? ¿De código (un error en tu archivo)? ¿De hardware (sin espacio en disco)? Ubicar el nivel es la mitad de la solución.

## 5. Tus cuatro proyectos vistos por el mapa

Para cerrar, mira cómo cada proyecto toca distintas partes del mapa. Esto te muestra que no aprendiste cosas sueltas: aprendiste un sistema.

> ### 🔎 En tu código
> ```text
> tunal-digital → HTML/CSS/JS vanilla (frontend) + Cloudflare Workers (servidor)
>                 + API de Claude. Toca: red, API, frontend, backend.
>
> PolyPaw       → Python + Flet + datos en JSON. Toca: lenguaje, framework,
>                 archivos, variables.
>
> RachaSimple   → React + TypeScript + Supabase. Toca: framework, tipos,
>                 frontend, base de datos.
>
> Faro          → Next.js + TypeScript + Supabase + OpenAI + OAuth.
>                 Toca: casi todo el mapa, de frontend a IA.
>
> polypaw-nas   → Ubuntu + Samba + Cockpit + Tailscale + Docker.
>                 Toca: hardware, SO, red, servidores, VPN.
> ```

Faro y tu NAS son los que más conceptos juntan: por eso, si los entiendes a ellos, entiendes el módulo entero.

> ### ⚠️ Cuidado — Los secretos no se comparten
> Hay una regla de oro del módulo que nunca debes olvidar: **las claves y contraseñas viven solo en el servidor**, en variables de entorno o protegidas con permisos. Nunca las escribas en el código que ve el cliente ni las subas a Git. En Faro, esto es una regla explícita del proyecto.

## ✅ Checklist — ¿ya domino esto?

- [ ] Puedo explicar, con mis palabras, la diferencia entre **RAM** y **disco**.
- [ ] Sé qué hace la **CPU** y por qué el **SO** está por encima del hardware.
- [ ] Entiendo que todo, al final, son **bits** agrupados en **bytes**.
- [ ] Sé qué es un **algoritmo** y por qué programar es escribir algoritmos.
- [ ] Distingo **cliente** de **servidor** y sé cómo se hablan por **HTTP**.
- [ ] Puedo explicar para qué sirven **IP** y **DNS** juntos.
- [ ] Sé qué es un **commit** y una **rama** en **Git**.
- [ ] Reconozco qué es una **API** y nombro una que usa un proyecto mío.
- [ ] Puedo leer una **ruta** de archivo y deducir qué contiene.
- [ ] Entiendo por qué los **secretos** nunca van en el cliente.

## 🔁 Repaso del módulo

Este capítulo es el cierre del Módulo 00, así que en vez de ejercicios nuevos te dejo un **repaso** que recorre todo lo que viste. No es para "estudiar de memoria": es para comprobar que las piezas encajan. Tómatelo como un paseo final por el mapa, con calma.

### Las diez ideas que no se te pueden olvidar

Si de todo el módulo solo te quedaras con diez frases, que sean estas:

1. La computadora es **hardware** (lo que tocas) gobernado por un **sistema operativo** (el software que reparte la CPU, la RAM y el disco).
2. La **RAM** es rápida y se borra al apagar; el **disco** es más lento pero guarda para siempre. Escritorio contra archivero.
3. Todo, al final, son **bits** (0 o 1) agrupados en **bytes** (8 bits). Con bytes medimos cuánto pesan las cosas.
4. **Programar** es escribir **algoritmos** (pasos ordenados) en un **lenguaje** que la máquina entiende.
5. Guardas datos en **variables** (cajas con nombre) y tu código vive en **archivos** dentro de un **repositorio**.
6. **Git** es la máquina del tiempo: guardas avances en **commits** y experimentas en **ramas** sin romper `main`.
7. En la red, el **cliente** pide y el **servidor** responde, hablándose por **HTTP/HTTPS**.
8. Cada máquina tiene una **IP**; el **DNS** traduce nombres a IPs; un servicio escucha en un **puerto**.
9. Una **API** es la ventanilla por la que un programa le pide datos a otro (como tu app a **Claude** u **OpenAI**).
10. Los **secretos** (claves, contraseñas) viven solo en el servidor. Nunca en el cliente, nunca en Git.

> ### 💡 Tip — El repaso de la patita
> Lee las diez frases tapando la segunda mitad de cada una. Si puedes completarla con tus palabras, dominas la idea. Bit el ajolote dice que repasar así, en voz alta, vale por diez relecturas silenciosas.

### Comprueba que conectaste los temas

El módulo no es una lista de palabras sueltas: es un sistema. Estas preguntas de repaso te ayudan a ver los hilos que unen unos temas con otros. Respóndelas mentalmente o en voz alta:

- ¿Por qué el **sistema operativo** tiene que estar *por encima* del hardware y no al revés?
- Cuando guardas un archivo de PolyPaw, ¿en qué pasa de estar en la **RAM** a quedarse en el **disco**?
- ¿Qué relación hay entre un **commit** y una **rama** en Git? ¿Cuál contiene a cuál?
- Si abres `tunal-digital` en el navegador, ¿quién es el **cliente** y quién el **servidor**?
- ¿Por qué `tunal-digital` usa JavaScript **vanilla** mientras RachaSimple usa un **framework** (React)? ¿Qué cambia?
- ¿Qué tienen en común la **API** de Claude y la **API** de OpenAI, aunque sean servicios distintos?

> ### 🔎 En tu código
> Para repasar con las manos, recorre estas cuatro rutas y di en voz alta qué término del glosario representa cada una:
> ```text
> tunal-digital/sitio-web/index.html     ← HTML (estructura del frontend)
> PolyPaw/missions/mission-01.json       ← JSON (datos)
> RachaSimple/src/types/database.ts      ← TypeScript (tipos)
> Faro/src/app/api/...                   ← backend + API (Next.js)
> ```
> Si puedes nombrar el término **y** explicar para qué sirve en ese proyecto, cerraste el círculo del módulo.

### Tu mapa, una última vez

Antes de pasar de página, recorre el mapa completo de abajo hacia arriba y comprueba que cada nivel se apoya en el de abajo: **hardware → SO → datos → programar → Git → red → herramientas → tus proyectos**. Si en algún salto sientes un hueco, ese es exactamente el capítulo al que conviene volver. Para eso existe este glosario: es tu linterna para cuando el cuarto vuelva a quedar oscuro.

> Y con esto cierras el Módulo 00. Bit te choca la patita: ya tienes el mapa y el vocabulario. En el Módulo 01 dejamos de hablar *sobre* programar y empezamos a programar de verdad.
