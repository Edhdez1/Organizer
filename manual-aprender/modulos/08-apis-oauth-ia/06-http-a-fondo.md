# Capitulo 06 — HTTP a fondo: métodos, estados y cabeceras

> ¡Hola de nuevo! Soy **Bit**, tu ajolote guía. 🐾 En el capítulo anterior viste qué es una API y cómo `fetch` pide datos. Hoy abrimos el capó del coche: vamos a entender el **protocolo HTTP**, que es el idioma que hablan tu navegador, los servidores y las APIs cuando se mandan mensajes. Cada vez que el chat de **tunal-digital** pregunta algo a la IA, o que **Faro** lee tus proyectos de GitHub, por debajo viajan peticiones HTTP. Cuando termines este capítulo vas a poder abrir la pestaña *Network* del navegador y leer lo que pasa como si fuera un libro. Y, muy importante, vamos a insistir en una regla de oro: **las claves secretas viven en el servidor, NUNCA en el cliente**. ¡Vamos!

## 1. ¿Qué es HTTP y por qué nos importa?

Cuando tu navegador pide una página o tu código llama a una API, no se manda un texto suelto al azar. Se manda un **mensaje con una estructura muy precisa**. Esa estructura la define HTTP.

> ### 🟦 ¿Que significa? — *HTTP*
> **HTTP** (HyperText Transfer Protocol, "protocolo de transferencia de hipertexto") es el conjunto de reglas que define cómo un **cliente** (tu navegador o tu código) le pide algo a un **servidor** y cómo el servidor le responde. Sirve para que ambos se entiendan: el cliente manda una **petición** (request) y el servidor devuelve una **respuesta** (response).
> **Dónde se usa en un repo real:** en **tunal-digital**, cuando el visitante escribe en el chat, el JavaScript del sitio hace una petición HTTP a un Cloudflare Worker, que a su vez habla por HTTP con la API de Claude (Anthropic). Todo es HTTP de punta a punta.

> ### 🟦 ¿Que significa? — *Cliente y servidor*
> El **cliente** es quien pide (el navegador, una app, tu código con `fetch`). El **servidor** es quien responde (una computadora remota que tiene los datos o ejecuta la lógica). Sirve para repartir el trabajo: el cliente muestra cosas al usuario, el servidor guarda secretos y datos.
> **Dónde se usa:** en **Faro** (Next.js), el navegador es el cliente y las *rutas de API* de Next (que corren en el servidor) son el servidor; ahí viven los tokens de OpenAI y de GitHub.

Una petición HTTP siempre tiene cuatro piezas que vamos a estudiar una por una:

1. Un **método** (qué quiero hacer: leer, crear, borrar...).
2. Una **URL** (a qué recurso).
3. Unas **cabeceras** (headers: datos sobre el mensaje).
4. Opcionalmente, un **cuerpo** (body: el contenido que mando).

Y la respuesta trae:

1. Un **código de estado** (¿salió bien o mal?).
2. Sus propias **cabeceras**.
3. Normalmente un **cuerpo** (los datos de vuelta).

> ### 💡 Tip
> Piensa en HTTP como pedir comida a domicilio. El **método** es lo que quieres hacer (¿pedir un plato nuevo, cancelar, cambiar la dirección?). La **URL** es la dirección del restaurante. Las **cabeceras** son notas en el sobre ("soy cliente VIP", "pago con tarjeta"). El **cuerpo** es el pedido detallado. El **código de estado** es la respuesta del repartidor: "aquí está" (200) o "esa calle no existe" (404).

## 2. Los métodos HTTP: el verbo de la petición

> ### 🟦 ¿Que significa? — *Método HTTP*
> El **método** (también llamado *verbo*) es la palabra que dice **qué acción** quieres hacer sobre un recurso. Sirve para que el servidor sepa tu intención sin tener que adivinarla. Los más comunes son GET, POST, PUT, PATCH y DELETE.
> **Dónde se usa:** el chat de **tunal-digital** usa `POST` para mandar tu mensaje a la IA; **RachaSimple** usa peticiones a Supabase que por debajo son GET (leer rachas) y POST (crear una nueva).

Vamos uno por uno con una analogía de una libreta de contactos:

> ### 🟦 ¿Que significa? — *GET*
> **GET** sirve para **leer** o **traer** datos sin modificar nada. Es como mirar un contacto en la libreta: lo lees, no lo cambias. No lleva cuerpo (body).
> **Dónde se usa:** **Faro** hace GET a la API de GitHub para leer la lista de tus repositorios.

> ### 🟦 ¿Que significa? — *POST*
> **POST** sirve para **crear** algo nuevo o **enviar** datos para que el servidor los procese. Es como añadir un contacto nuevo. Lleva cuerpo (body) con la información.
> **Dónde se usa:** el chat de **tunal-digital** hace `POST` al Cloudflare Worker enviando el texto del usuario; **Faro** hace POST a OpenAI enviando el contexto del proyecto para que la IA genere la descripción.

> ### 🟦 ¿Que significa? — *PUT*
> **PUT** sirve para **reemplazar por completo** un recurso que ya existe. Es como borrar un contacto y volver a escribirlo entero, todos los campos.
> **Dónde se usa:** una API que guarde la configuración completa de un proyecto en **Faro** podría usar PUT para sobrescribir todo el registro de una sola vez.

> ### 🟦 ¿Que significa? — *PATCH*
> **PATCH** sirve para **modificar solo una parte** de un recurso existente. Es como cambiar únicamente el teléfono de un contacto, dejando el resto igual.
> **Dónde se usa:** en **Faro**, marcar una fase del roadmap como completada (cambiar un solo campo) encaja con PATCH; en Supabase, un `update` de una columna se traduce a PATCH.

> ### 🟦 ¿Que significa? — *DELETE*
> **DELETE** sirve para **borrar** un recurso. Es como eliminar un contacto de la libreta.
> **Dónde se usa:** desconectar una fuente (por ejemplo, una cuenta de Google Drive) en **Faro** podría disparar un DELETE sobre el registro de esa conexión.

> ### 💡 Tip
> Una forma fácil de recordarlos: **GET** = traer, **POST** = crear, **PUT** = reemplazar todo, **PATCH** = parchear (cambiar un poco), **DELETE** = borrar. Si solo recuerdas GET y POST estás bien para empezar: son los dos que más vas a ver.

Así se ve un GET y un POST con `fetch`, que ya conoces del módulo 03:

```javascript
// GET: leer la lista de repos del usuario (no lleva body)
const repos = await fetch("https://api.github.com/user/repos");

// POST: enviar el mensaje del chat al Worker de tunal-digital
const respuesta = await fetch("https://chat.tunal-digital.workers.dev/api/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ mensaje: "¿Cuánto cuesta una página web?" }),
});
```

> ### 🔎 En tu codigo
> Si en `fetch` no escribes `method`, el navegador asume `GET`. Por eso el primer ejemplo no necesita la opción `method`. En cuanto quieras mandar datos (un `body`), casi siempre será `POST` y tendrás que escribirlo explícitamente.

## 3. Idempotencia: ¿qué pasa si repito la petición?

Esta palabra suena rara, pero la idea es sencilla y muy útil.

> ### 🟦 ¿Que significa? — *Idempotencia*
> Una petición es **idempotente** si **repetirla varias veces da el mismo resultado** que hacerla una sola vez. Sirve para saber qué es seguro reintentar cuando la red falla.
> **Dónde se usa:** si en **Faro** un GET de tus repos se pierde por mala conexión, puedes reintentarlo sin miedo: leer dos veces no rompe nada. Es idempotente.

Veámoslo método por método:

- **GET** es idempotente: leer mil veces no cambia nada.
- **PUT** es idempotente: reemplazar el registro entero con los mismos datos deja todo igual la segunda vez.
- **DELETE** es idempotente: borrar algo ya borrado sigue dejándolo borrado.
- **POST** **NO** es idempotente: cada POST suele crear algo nuevo. Si mandas dos veces "crear pedido", ¡tendrás dos pedidos!
- **PATCH** depende de cómo esté hecho; a menudo no es idempotente.

> ### ⚠️ Cuidado
> Por esto los botones de "Enviar" o "Pagar" (que hacen POST) a veces se deshabilitan tras el primer clic: si el usuario hace doble clic, podría crear dos cosas. En el chat de **tunal-digital**, mandar el mismo mensaje dos veces generaría dos respuestas (y gastaría el doble de tokens de IA). No es un error técnico, pero sí algo a cuidar.

## 4. Códigos de estado: ¿salió bien o mal?

Cuando el servidor responde, lo primero que manda es un número de tres cifras: el **código de estado**. Es la forma más rápida de saber qué pasó.

> ### 🟦 ¿Que significa? — *Código de estado (status code)*
> Un **código de estado** es un número de tres dígitos que el servidor pone en su respuesta para decir cómo le fue a la petición. Sirve para que tu código reaccione: mostrar los datos, reintentar, o avisar de un error. La primera cifra indica la "familia".
> **Dónde se usa:** cuando **Faro** llama a OpenAI, revisa el código: si es `200` usa la respuesta de la IA; si es `401` sabe que el token está mal; si es `429` sabe que pidió demasiado rápido.

Las cinco familias:

> ### 🟦 ¿Que significa? — *2xx (éxito)*
> Los códigos que empiezan por **2** significan **todo salió bien**. El más común es **200 OK** (petición correcta) y **201 Created** (se creó algo nuevo, típico tras un POST).
> **Dónde se usa:** cuando GitHub te devuelve tus repos a **Faro**, responde `200 OK`.

> ### 🟦 ¿Que significa? — *3xx (redirección)*
> Los códigos que empiezan por **3** significan **lo que buscas está en otro sitio**. Por ejemplo **301 Moved Permanently** (se mudó para siempre) o **302 Found** (redirección temporal). El navegador suele seguir la nueva dirección solo.
> **Dónde se usa:** en el flujo de **OAuth** de **Faro**, al iniciar sesión con GitHub o Google, el navegador es **redirigido** (3xx) varias veces entre páginas hasta volver a la app con la sesión lista.

> ### 🟦 ¿Que significa? — *4xx (error del cliente)*
> Los códigos que empiezan por **4** significan **tú (el cliente) hiciste algo mal**. Los más comunes:
> - **400 Bad Request:** mandaste datos mal formados.
> - **401 Unauthorized:** no te identificaste (falta o falla el token/login).
> - **403 Forbidden:** te identificaste, pero no tienes permiso.
> - **404 Not Found:** lo que pides no existe.
> - **429 Too Many Requests:** estás pidiendo demasiado rápido.
> **Dónde se usa:** si en **RachaSimple** intentas leer datos sin haber iniciado sesión con Supabase Auth, la API responde `401`. Si el token de OpenAI de **Faro** está vencido, llega `401`.

> ### 🟦 ¿Que significa? — *5xx (error del servidor)*
> Los códigos que empiezan por **5** significan **el servidor falló**, no tú. Los más comunes: **500 Internal Server Error** (algo se rompió dentro) y **503 Service Unavailable** (el servicio está caído o saturado).
> **Dónde se usa:** si la API de Claude tuviera un problema interno, el Worker de **tunal-digital** podría recibir un `500` o `503` y debería mostrar al visitante un mensaje amable de "inténtalo de nuevo".

> ### 💡 Tip
> Regla mental rápida: **4xx = es culpa mía** (revisa lo que mandé), **5xx = es culpa del servidor** (puedo reintentar más tarde). Y el famoso **404** que ves en webs rotas significa simplemente "esa página no existe".

Así se revisa el código de estado con `fetch`:

```javascript
const res = await fetch("https://api.github.com/user/repos");

if (res.ok) {
  // res.ok es true cuando el código es 2xx
  const repos = await res.json();
  console.log("Repos recibidos:", repos.length);
} else if (res.status === 401) {
  console.log("Token inválido o sesión caducada");
} else if (res.status === 429) {
  console.log("Demasiadas peticiones, espera un momento");
} else {
  console.log("Algo salió mal:", res.status);
}
```

> ### ⚠️ Cuidado
> Con `fetch`, un código `404` o `500` **NO lanza un error** de JavaScript: la promesa se cumple igual. Por eso SIEMPRE debes revisar `res.ok` o `res.status` tú mismo. Mucha gente nueva cree que `fetch` "fallaría" con un 404 y se confunde cuando su código sigue como si nada.

## 5. Cabeceras (headers): los datos sobre el mensaje

> ### 🟦 ¿Que significa? — *Cabeceras (headers)*
> Las **cabeceras** son pares de "nombre: valor" que viajan junto a la petición y la respuesta, dando **información sobre el mensaje** (no es el contenido en sí, sino datos *acerca* del contenido). Sirven para indicar el formato, la autenticación, el idioma, etc.
> **Dónde se usa:** **Faro** manda una cabecera de autorización con el token de OpenAI en cada llamada a la IA; sin ella, OpenAI respondería `401`.

Hay cabeceras de **petición** (las que mandas tú) y de **respuesta** (las que devuelve el servidor). Algunas muy frecuentes:

> ### 🟦 ¿Que significa? — *Content-Type*
> La cabecera **Content-Type** dice **en qué formato** está el cuerpo del mensaje. El valor más común en APIs es `application/json` (datos en formato JSON). Sirve para que quien recibe sepa cómo interpretar el cuerpo.
> **Dónde se usa:** el chat de **tunal-digital** envía `Content-Type: application/json` para que el Worker entienda que el body es JSON.

> ### 🟦 ¿Que significa? — *Authorization*
> La cabecera **Authorization** lleva la **credencial** que demuestra quién eres, normalmente un token. Un formato común es `Bearer <token>` ("portador de este token"). Sirve para que el servidor te deje pasar.
> **Dónde se usa:** **Faro** usa `Authorization: Bearer ...` con el token de OpenAI y con el de GitHub para que esas APIs sepan que la petición está autorizada.

> ### 🟦 ¿Que significa? — *Accept*
> La cabecera **Accept** dice **qué formato esperas recibir** en la respuesta. Por ejemplo `Accept: application/json` significa "respóndeme en JSON, por favor".
> **Dónde se usa:** al hablar con la API de GitHub, **Faro** manda `Accept` para pedir la versión correcta del formato de respuesta.

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer sk-...EL-TOKEN-VA-EN-EL-SERVIDOR...",
  "Accept": "application/json"
}
```

> ### ⚠️ Cuidado — ¡SEGURIDAD!
> Esa cabecera `Authorization` con el token **JAMÁS** debe ponerse en el código que corre en el navegador (el cliente). Si lo hicieras, cualquier visitante podría abrir la pestaña Network, copiar tu clave de OpenAI o de Anthropic y gastarte el dinero. Por eso **tunal-digital** no llama a la API de Claude directamente desde el JavaScript del sitio: la llamada pasa por un **Cloudflare Worker** (que es código de servidor), y la clave de Anthropic vive como variable de entorno **dentro del Worker**, fuera del alcance del visitante. Es exactamente la regla de seguridad de **Faro**: *tokens y secretos solo en el servidor, nunca en el cliente ni en el repositorio*.

> ### 🔎 En tu codigo
> En **Faro** (Next.js) ocurre lo mismo: el navegador llama a una *ruta de API* propia de Faro (por ejemplo `/api/analizar`), y es esa ruta —que corre en el servidor— la que añade el header `Authorization` con el token de OpenAI antes de llamar a la API real. El navegador nunca toca la clave. Si alguna vez ves una clave secreta en el código del cliente, eso es un bug de seguridad que hay que arreglar de inmediato.

> ### 🟦 ¿Que significa? — *Variable de entorno*
> Una **variable de entorno** es un valor de configuración (como una clave secreta) que se guarda **fuera del código**, en el entorno donde corre el servidor. Sirve para no escribir secretos dentro de los archivos del proyecto y no subirlos por error a GitHub.
> **Dónde se usa:** la clave de Anthropic en el Worker de **tunal-digital** y las claves de OpenAI y de OAuth en **Faro** se guardan como variables de entorno del servidor.

## 6. El cuerpo (body): el contenido del mensaje

> ### 🟦 ¿Que significa? — *Cuerpo (body)*
> El **cuerpo** es el **contenido principal** que viaja en la petición o en la respuesta: los datos de verdad. En las peticiones, el body lo llevan métodos como POST, PUT y PATCH. En las respuestas, el body es lo que el servidor te devuelve.
> **Dónde se usa:** cuando **Faro** pide a OpenAI generar el roadmap, en el body de la petición van el contexto del proyecto y las instrucciones; en el body de la respuesta vuelve el texto generado por la IA.

Casi siempre el body va en formato **JSON** (que ya viste en el módulo de bases de datos). Recuerda estas dos funciones clave:

> ### 🟦 ¿Que significa? — *JSON.stringify y JSON.parse*
> **`JSON.stringify(objeto)`** convierte un objeto de JavaScript en una cadena de texto JSON, lista para mandarse en el body. **`JSON.parse(texto)`** hace lo contrario: convierte el texto JSON de la respuesta en un objeto de JavaScript usable. Con `fetch`, el método `res.json()` hace el parse por ti.
> **Dónde se usa:** **tunal-digital** y **Faro** hacen `JSON.stringify` para mandar datos y `res.json()` para leer la respuesta.

```javascript
// Petición POST con body JSON (chat de tunal-digital, simplificado)
const res = await fetch("https://chat.tunal-digital.workers.dev/api/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" }, // declaramos el formato
  body: JSON.stringify({                            // convertimos a texto JSON
    mensaje: "Quiero cotizar un sitio web",
  }),
});

// Leemos el body de la respuesta y lo convertimos a objeto
const datos = await res.json();
console.log(datos.respuesta); // el texto que generó la IA
```

> ### 💡 Tip
> Fíjate en la pareja: si declaras `Content-Type: application/json`, el body debe ser JSON de verdad (`JSON.stringify(...)`). Si dices "esto es JSON" pero mandas otra cosa, el servidor se confunde y suele responder `400 Bad Request`. ¡El header y el body deben ir de acuerdo!

## 7. La pestaña Network: ver el HTTP con tus propios ojos

Aquí viene lo divertido. El navegador tiene una herramienta que te deja **espiar todas las peticiones HTTP** que ocurren. Se llama pestaña **Network**.

> ### 🟦 ¿Que significa? — *Pestaña Network (Red)*
> La **pestaña Network** es una sección de las herramientas de desarrollador del navegador que **lista cada petición HTTP** que la página hace, con su método, su URL, su código de estado, sus cabeceras y sus cuerpos. Sirve para depurar: ver qué se mandó, qué volvió y por qué algo falla.
> **Dónde se usa:** abriendo Network en el sitio de **tunal-digital** mientras usas el chat, verás aparecer la petición `POST` al Worker; en **Faro**, verás las llamadas a sus rutas de API cuando disparas un análisis.

Cómo abrirla y leerla, paso a paso:

1. Abre el navegador en la web (por ejemplo, el sitio de **tunal-digital**).
2. Pulsa **F12** (o clic derecho → "Inspeccionar") y ve a la pestaña **Network** (o "Red").
3. Con Network abierta, **haz la acción** que quieres observar (escribe en el chat y envía).
4. Verás aparecer una o varias filas. Haz clic en la del chat para leer:
   - **Headers / Encabezados:** método (POST), URL, código de estado y las cabeceras de petición y respuesta.
   - **Payload / Request:** el body que se envió (`{ mensaje: "..." }`).
   - **Response / Respuesta:** el body que volvió (la contestación de la IA).
   - **Timing / Tiempos:** cuánto tardó.

> ### 💡 Tip
> En la lista de Network, la columna "Status" te muestra el código de estado de cada petición. Si ves algo en rojo o un `4xx`/`5xx`, ahí está tu pista para depurar. ¡Es lo primero que mira un desarrollador cuando algo no carga!

> ### 🔎 En tu codigo
> Abre Network mientras usas el chat de **tunal-digital** y comprueba algo importante para la seguridad: en la petición al Worker **NO** debe aparecer ninguna clave de Anthropic. El visitante solo ve su mensaje y la URL del Worker; la clave secreta se queda escondida en el servidor. Si la vieras ahí, sería una fuga grave. Esa es la prueba visual de que la arquitectura "secretos en el servidor" funciona.

> ### ⚠️ Cuidado
> En Network puedes ver TUS propios tokens si tu sesión los usa (por ejemplo, el de Supabase en **RachaSimple** o **Faro**). Eso es normal: son *tus* credenciales en *tu* navegador. El problema sería que aparecieran claves **compartidas** del servicio (como la clave maestra de OpenAI o de Anthropic): esas nunca deben llegar al navegador de nadie.

## 8. Juntándolo todo: una petición real de Faro, comentada

Veamos cómo se conectan todas las piezas en una llamada que el **servidor** de Faro hace a OpenAI para generar la descripción de un proyecto:

```javascript
// Esto corre en el SERVIDOR de Faro (una ruta de API de Next.js),
// nunca en el navegador. Por eso aquí sí puede ir el token.
const res = await fetch("https://api.openai.com/v1/chat/completions", {
  method: "POST", // creamos una nueva "completación" → POST
  headers: {
    "Content-Type": "application/json",                  // el body es JSON
    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`, // token desde variable de entorno
  },
  body: JSON.stringify({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "Resume el estado del proyecto." },
      { role: "user", content: "README: ...contexto del repo..." },
    ],
  }),
});

if (!res.ok) {
  // 401 = token mal, 429 = demasiado rápido, 500 = error de OpenAI
  throw new Error(`OpenAI respondió ${res.status}`);
}

const datos = await res.json(); // leemos el body de la respuesta
const descripcion = datos.choices[0].message.content;
```

> ### 🔎 En tu codigo
> Repasa las cuatro piezas: **método** (`POST`), **URL** (`.../chat/completions`), **cabeceras** (`Content-Type` y `Authorization`) y **cuerpo** (`body` con el modelo y los mensajes). Y la respuesta con su **código de estado** (`res.ok`) y su **cuerpo** (`res.json()`). ¡Ya sabes leer y escribir cualquier petición HTTP!

> ### 💡 Tip
> `process.env.OPENAI_API_KEY` es la forma en Node/Next de leer una variable de entorno. Como este archivo corre en el servidor, la clave nunca se manda al navegador. Si copiaras este mismo `fetch` a un componente del cliente, ¡estarías filtrando la clave a todo el mundo! Por eso Faro coloca estas llamadas en rutas de API del servidor.

## ✅ Checklist — ¿ya domino esto?

- [ ] Sé que una petición HTTP tiene **método, URL, cabeceras y (a veces) cuerpo**.
- [ ] Puedo explicar **GET, POST, PUT, PATCH y DELETE** y dar un ejemplo de cada uno.
- [ ] Entiendo qué es la **idempotencia** y por qué POST no la cumple.
- [ ] Reconozco las familias de códigos: **2xx, 3xx, 4xx, 5xx** y sé qué son 200, 301, 401, 403, 404, 429 y 500.
- [ ] Sé que con `fetch` debo revisar **`res.ok`** porque un 404 no lanza error solo.
- [ ] Sé qué hacen las cabeceras **Content-Type**, **Authorization** y **Accept**.
- [ ] Entiendo que el **cuerpo (body)** suele ir en JSON con `JSON.stringify` y se lee con `res.json()`.
- [ ] Puedo abrir la **pestaña Network** y leer método, status, payload y respuesta.
- [ ] Tengo grabado a fuego que **las claves secretas van en el servidor, nunca en el cliente**.

## 🧪 Ejercicios

1. 💻 Abre la pestaña **Network** en cualquier sitio web que uses a diario. Recarga la página y anota: ¿cuántas peticiones hay?, ¿qué **método** y qué **código de estado** tiene la primera? Escribe en una frase qué significa ese código.

2. 💻 Si tienes acceso al sitio de **tunal-digital** (o cualquier chat web), abre Network, envía un mensaje y localiza la petición `POST`. Revisa su **payload** (lo que mandaste) y su **response** (lo que volvió). Confirma que **no aparece ninguna clave de Anthropic** en las cabeceras de la petición. Explica con tus palabras por qué.

3. 💻 Escribe un `fetch` GET a una API pública y gratuita (por ejemplo `https://api.github.com/users/octocat`). Imprime `res.status` y, si `res.ok`, imprime un par de campos del JSON. Provoca un `404` pidiendo un usuario inventado y observa que tu código NO lanza error solo: tú debes detectarlo.

4. Sin computadora: para cada situación, di qué **método** y qué **código de estado** esperarías.
   - (a) Leer la lista de repos en Faro.
   - (b) Crear una nueva racha en RachaSimple sin haber iniciado sesión.
   - (c) Marcar como completada una sola fase del roadmap.
   - (d) Pedir una página que no existe.

5. Sin computadora: explica con tus palabras por qué **GET es idempotente** pero **POST no lo es**, y pon un ejemplo de un problema real que causaría repetir un POST por accidente (pista: piensa en el botón "Enviar" del chat y los tokens de IA).

6. 💻 (Reto) Toma el ejemplo del `fetch` POST de la sección 6 y rómpelo a propósito: pon `Content-Type: application/json` pero manda en el `body` un texto que **no** sea JSON válido. Anota qué código de estado responde el servidor y relaciónalo con lo que viste en la sección 4.

---

> ¡Lo lograste! 🎉 Ahora HTTP ya no es una caja negra: sabes qué viaja en cada petición, cómo leer si algo salió bien o mal, y —lo más importante— por qué los secretos viven en el servidor y nunca en el navegador. La próxima vez que algo no cargue, abre Network y deja que el código de estado te cuente la historia. Nos vemos en el siguiente capítulo. — Bit 🐾
