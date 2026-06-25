# Capítulo 03 — Internet y la web

> Tus cuatro proyectos viven en internet o se conectan a él. Aquí entenderás, sin magia, qué
> pasa exactamente desde que escribes una dirección hasta que aparece una página. Este capítulo
> es la base del módulo de NAS y redes (09) y de todo lo "web".

---

## 1. Internet no es lo mismo que "la web"

Se usan como sinónimos, pero no lo son.

> ### 🟦 ¿Qué significa? — *Internet*
> **Internet** es la **red física** que conecta millones de computadoras de todo el mundo
> mediante cables, fibra óptica, antenas y satélites. Es la "carretera". Por ella viajan
> muchas cosas: correos, videollamadas, juegos, mensajes… **y** páginas web.

> ### 🟦 ¿Qué significa? — *La web (World Wide Web)*
> La **web** es **uno de los servicios** que funcionan *sobre* internet: el de las páginas
> que ves en un navegador, enlazadas entre sí. La web usa internet como la carretera, pero no
> es la carretera. WhatsApp, por ejemplo, también usa internet, pero no es "la web".

Analogía: internet es el **sistema de carreteras**; la web es **uno de los servicios** que
circulan por ellas (como el correo postal usa las carreteras pero no *es* la carretera).

---

## 2. El modelo cliente–servidor (la idea más importante del capítulo)

Casi todo en la web funciona con dos papeles: **cliente** y **servidor**.

> ### 🟦 ¿Qué significa? — *Cliente*
> El **cliente** es quien **pide** algo. En la web, el cliente más común es tu **navegador**
> (Chrome, Firefox…). Cuando abres una página, tu navegador *pide* esa página.

> ### 🟦 ¿Qué significa? — *Servidor*
> El **servidor** es la computadora (siempre encendida) que **recibe la petición y responde**
> enviando lo pedido: el texto, las imágenes, los datos.
> **¿Dónde se usa en tu proyecto?** Cuando alguien entra a `tunaldigital.com`, el servidor de
> **Cloudflare** le envía tu `index.html`, `styles.css` y `main.js`. Tu **NAS** `polypaw-nas`
> también es un servidor: responde cuando le pides archivos por Samba.

> ### 💡 Tip — Una misma computadora puede ser cliente y servidor
> Tu laptop es **cliente** cuando navega, pero puede ser **servidor** si instalas algo que
> "sirva" a otros (como tu Acer Nitro convertido en NAS). El papel depende de qué hace en
> cada momento, no del aparato.

El flujo básico es siempre: **el cliente pide → el servidor responde**. A esto se le llama
*petición y respuesta* (en inglés, *request* y *response*).

---

## 3. Direcciones: IP, dominios y DNS

Para que una carta llegue, necesitas una dirección. En internet pasa igual.

> ### 🟦 ¿Qué significa? — *Dirección IP*
> Una **IP** (*Internet Protocol address*) es el **número que identifica** a cada dispositivo
> en una red, como `192.168.1.50` (en tu casa) o `172.67.12.34` (en internet). Sirve para que
> los datos sepan a qué máquina ir.
> **¿Dónde se usa en tu proyecto?** Tu NAS tiene una IP dentro de tu red local; por ella lo
> encuentran tus otros dispositivos.

> ### 🟦 ¿Qué significa? — *Dominio*
> Un **dominio** es el **nombre fácil de recordar** que usamos en lugar del número IP, como
> `tunaldigital.com` o `google.com`. Las personas recordamos nombres, no números.

> ### 🟦 ¿Qué significa? — *DNS (sistema de nombres de dominio)*
> El **DNS** (*Domain Name System*) es la **"agenda de contactos" de internet**: traduce un
> dominio (nombre) a su IP (número). Cuando escribes `tunaldigital.com`, tu computadora le
> pregunta a un servidor DNS "¿cuál es la IP de esto?", y con esa IP ya sabe a dónde ir.
> **¿Dónde se usa en tu proyecto?** **AdGuard Home**, instalado en tu NAS, es precisamente un
> servidor DNS: traduce nombres a IPs y, de paso, **bloquea** los dominios de anuncios
> (responde "no existe" para ellos). Lo verás a fondo en el módulo 09.

> ### 🟦 ¿Qué significa? — *Puerto*
> Si la IP es la dirección de un edificio, el **puerto** es **el número de apartamento**: un
> número que indica *qué servicio* dentro de esa máquina debe atender. Las webs normales usan
> el puerto **80** (HTTP) o **443** (HTTPS); tu panel **Cockpit** usa el **9090**. Por eso lo
> abres como `https://polypaw-nas:9090`: la máquina + el apartamento.

---

## 4. HTTP y HTTPS: el idioma de la web

Cliente y servidor necesitan hablar el mismo idioma para entenderse. En la web, ese idioma es
HTTP.

> ### 🟦 ¿Qué significa? — *HTTP*
> **HTTP** (*HyperText Transfer Protocol*, "protocolo de transferencia de hipertexto") son las
> **reglas** con las que el navegador pide y el servidor responde páginas y datos. Un
> *protocolo* es simplemente un conjunto de reglas acordadas para comunicarse.

> ### 🟦 ¿Qué significa? — *HTTPS y por qué la "s" importa*
> **HTTPS** es HTTP **seguro**: la "s" es de *secure*. Cifra (codifica) la información para que
> nadie en el camino pueda leerla ni alterarla. Por eso ves un **candado** 🔒 en el navegador.
> **Regla práctica:** cualquier sitio que pida datos (contraseñas, formularios) **debe** usar
> HTTPS. El sitio de Tunal Digital lo usa.

> ### 🟦 ¿Qué significa? — *Métodos HTTP (GET, POST…)*
> Cada petición HTTP tiene un **método** que dice *qué quieres hacer*:
> - **GET** → "dame" algo (leer una página o datos). Es lo más común.
> - **POST** → "toma" estos datos (enviar un formulario, crear algo).
> - **PUT** → "actualiza" algo existente.  **DELETE** → "borra" algo.
> **¿Dónde se usa en tu proyecto?** En Faro, `src/app/api/projects/` responde a GET (listar
> proyectos), POST (crear), PUT (editar) y DELETE (borrar). Lo verás en el módulo 08 (APIs).

> ### 🟦 ¿Qué significa? — *Código de estado HTTP*
> Cada respuesta trae un **número de estado** que resume qué pasó:
> - **200** → todo bien.
> - **404** → "no encontrado" (la página/recurso no existe).
> - **403** → "prohibido" (no tienes permiso). *(Justo este error apareció cuando intenté
>   acceder a un repositorio fuera de mi alcance.)*
> - **500** → error del servidor.
> Memorizar estos cuatro te ahorra muchísimo tiempo depurando.

---

## 5. Qué pasa, paso a paso, al abrir una página

Juntemos todo. Cuando escribes `tunaldigital.com` y presionas Enter:

1. **DNS:** tu computadora pregunta "¿cuál es la IP de `tunaldigital.com`?" y recibe, por
   ejemplo, `172.67.12.34`.
2. **Conexión:** tu navegador (cliente) abre una conexión a esa IP, al puerto 443 (HTTPS).
3. **Petición:** el navegador envía una petición HTTP `GET /` ("dame la página principal").
4. **Respuesta:** el servidor responde con estado `200` y el contenido: el archivo
   `index.html`.
5. **Lectura del HTML:** el navegador lee el HTML y descubre que necesita más archivos
   (el `styles.css` para los colores, el `main.js` para la interactividad). Por cada uno hace
   **otra** petición GET.
6. **Dibujado (render):** con el HTML (estructura), el CSS (aspecto) y el JavaScript (lógica),
   el navegador **dibuja** la página en tu pantalla.

> ### 💡 Tip — Esto explica el orden de tus módulos
> Fíjate: el navegador necesita **HTML + CSS + JavaScript**. Por eso el manual los enseña en
> ese orden (módulos 01, 02, 03): es exactamente cómo se arma una página.

---

## 6. Frontend y backend

Dos palabras que oirás constantemente.

> ### 🟦 ¿Qué significa? — *Frontend (la parte de adelante)*
> El **frontend** es todo lo que ocurre **en el navegador del usuario**: lo que ve y toca
> (HTML, CSS, JavaScript). "Front" = frente, la cara visible.

> ### 🟦 ¿Qué significa? — *Backend (la parte de atrás)*
> El **backend** es lo que ocurre **en el servidor**, lejos de la vista: guardar datos,
> verificar contraseñas, hablar con la base de datos, llamar a la IA. "Back" = atrás.
> **¿Dónde se usa en tu proyecto?** En Faro, las carpetas `src/components/` son frontend
> (lo que se ve); `src/app/api/` es backend (lo que procesa en el servidor). Los **Cloudflare
> Workers** de tunal-digital también son backend.

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Distingo **internet** (la red física) de **la web** (un servicio sobre ella).
- [ ] Explico el modelo **cliente–servidor** (pedir / responder).
- [ ] Sé qué son **IP**, **dominio**, **DNS** y **puerto**, y cómo se relacionan.
- [ ] Entiendo **HTTP/HTTPS**, los **métodos** (GET/POST…) y los **estados** (200/404/403/500).
- [ ] Puedo narrar, paso a paso, qué pasa al abrir una página.
- [ ] Diferencio **frontend** de **backend**.

---

## 🧪 Ejercicios

1. **La analogía de la carta.** Explica, con la analogía del correo postal, qué papel juegan
   la **IP**, el **dominio**, el **DNS** y el **puerto**.
2. **Lee estados.** ¿Qué significa cada uno y qué harías como programador? (a) 404 al cargar
   una imagen, (b) 403 al entrar a una página, (c) 500 al enviar un formulario.
3. **Frontend o backend.** Clasifica: el color de un botón; verificar una contraseña; el texto
   que ves; guardar un hábito en la base de datos; una animación al pasar el cursor.
4. 💻 **Ver una petición real.** En tu computadora, abre cualquier web, pulsa `F12` (Herramientas
   de desarrollador), pestaña **Network** (Red) y recarga. Verás la lista de peticiones.
   Anota: ¿cuántas hubo? ¿Ves alguna con estado 200? ¿Cuál fue la primera?
5. **Tu propio NAS.** Tu NAS usa el puerto 9090 para Cockpit. Si quisieras también servir una
   web normal desde él, ¿qué puerto usarías y por qué?

➡️ Siguiente: **[Capítulo 04 — La terminal](04-la-terminal.md)**.
