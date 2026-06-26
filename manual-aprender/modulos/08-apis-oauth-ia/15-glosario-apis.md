# Capitulo 15 — Glosario de APIs, OAuth e IA y mapa

<p align="center">
  <img src="../../recursos/imagenes/08-apis-oauth-ia/cap15.png" alt="Ilustración del capítulo (pixel art con Bit)" width="640">
</p>


> Llegaste al final del Modulo 08. Soy **Bit**, tu ajolote guia, y traigo una libreta llena de esas palabras raras que fuimos soltando por el camino: *endpoint*, *Bearer*, *scope*, *temperature*... Si alguna te puso los pelos de punta, respira: aqui las dejamos ordenaditas de la A a la Z, con definiciones cortas, para que sirve cada una y donde aparece de verdad en nuestros repos (sobre todo **Faro** y **tunal-digital**). Piensa en este capitulo como tu diccionario de cabecera. No es para memorizarlo de golpe; es para volver a el cuando lo necesites. Vamos despacio y con la cola tranquila.

Antes de arrancar, un recordatorio que repetimos como mantra en todo el modulo: **las claves y los secretos viven en el servidor, nunca en el cliente**. Es la regla de seguridad de Faro y la vas a ver subrayada mas de una vez. No es paranoia, es oficio.

---

## 1. Como usar este glosario

Cada termino viene en un recuadro con la misma forma: que significa, para que sirve y donde lo usamos en un repo real. Los agrupamos por temas (la Web y HTTP, datos, autenticacion, IA, infraestructura) y dentro de cada grupo van en orden alfabetico. Al final encontraras un **mapa mental** que conecta todo, un repaso y el camino hacia el Modulo 09.

> ### 💡 Tip
> No leas esto como si fuera una novela. Dale una pasada para ubicarte y luego vuelve cada vez que una palabra te genere duda mientras programas. Un glosario se gana su sitio por consulta, no por memorizacion.

---

## 2. La Web y HTTP

> ### 🟦 ¿Que significa? — *API*
> Una **API** (Application Programming Interface, interfaz de programacion de aplicaciones) es un conjunto de reglas para que dos programas hablen entre si. Sirve para pedir datos o acciones a otro sistema sin tener ni idea de como funciona por dentro. En **Faro** usamos la API de GitHub para leer tus repos y la de OpenAI para generar el roadmap; en **tunal-digital**, el chat conversa con la API de Claude (Anthropic).

> ### 🟦 ¿Que significa? — *REST*
> **REST** es un estilo para diseñar APIs sobre HTTP: cada cosa (un usuario, un proyecto) es un *recurso* con su direccion, y operas sobre ella con metodos HTTP. Sirve para tener APIs predecibles y ordenadas. La API de GitHub que consume **Faro** es REST: pides `GET /repos/usuario/proyecto` y te devuelve ese repo.

> ### 🟦 ¿Que significa? — *Endpoint*
> Un **endpoint** es una URL concreta de una API que hace una cosa especifica. Sirve para apuntar tu peticion al lugar correcto. En **tunal-digital**, el endpoint del chat es la ruta del Cloudflare Worker (por ejemplo `/api/chat`); en **Faro**, un endpoint propio podria ser `/api/analyze`, que dispara el analisis del proyecto.

> ### 🟦 ¿Que significa? — *HTTP*
> **HTTP** (HyperText Transfer Protocol) es el idioma con el que el navegador y los servidores se piden y se mandan cosas en la web. Sirve para que tu codigo pueda solicitar datos a una API a traves de internet. Todas las llamadas de **Faro** y **tunal-digital** viajan sobre HTTP (en realidad HTTPS, su version cifrada).

> ### 🟦 ¿Que significa? — *HTTPS*
> **HTTPS** es HTTP con cifrado; la "S" es de *Secure*. Sirve para que nadie en el camino pueda leer ni manosear lo que envias, como tu token. Tanto **Faro** (desplegado en Vercel) como el Worker de **tunal-digital** solo aceptan HTTPS.

> ### 🟦 ¿Que significa? — *Metodo HTTP*
> Un **metodo** (o *verbo*) HTTP indica que accion quieres hacer: `GET` para leer, `POST` para crear o enviar, `PUT`/`PATCH` para actualizar, `DELETE` para borrar. Sirve para que el servidor entienda tu intencion. En **tunal-digital**, el chat manda el mensaje con `POST`; en **Faro**, leer tus repos es un `GET`.

```javascript
// tunal-digital: enviar el mensaje del usuario al Worker con POST
const respuesta = await fetch("/api/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ mensaje: textoDelUsuario }),
});
```

> ### 🟦 ¿Que significa? — *Codigo de estado*
> Un **codigo de estado** es el numero con el que el servidor te cuenta como salio la peticion: `200` OK, `201` creado, `400` peticion mal hecha, `401` no autenticado, `403` sin permiso, `404` no existe, `429` demasiadas peticiones, `500` error del servidor. Sirve para reaccionar en tu codigo. En **tunal-digital**, si el Worker responde `429`, el chat avisa "espera un momento".

> ### 🟦 ¿Que significa? — *Header (cabecera)*
> Un **header** es un par dato:valor que acompaña a una peticion o respuesta con informacion extra (tipo de contenido, autenticacion y demas). Sirve para configurar la llamada sin meter eso dentro del cuerpo. En **Faro**, el header `Authorization` lleva el token, y el header `Content-Type: application/json` dice "te estoy mandando JSON".

> ### 🟦 ¿Que significa? — *Body (cuerpo)*
> El **body** es el contenido principal de una peticion o respuesta, casi siempre JSON. Sirve para enviar los datos de verdad: el mensaje del chat, el prompt, lo que sea. En **tunal-digital**, el body del `POST` lleva `{ "mensaje": "..." }`.

> ### 🟦 ¿Que significa? — *Query string (parametros de URL)*
> El **query string** es la parte de la URL que va despues del `?`, con pares `clave=valor` separados por `&`. Sirve para filtrar o paginar sin tocar el body. En **Faro**, pedir tus repos ordenados se ve mas o menos asi: `GET /user/repos?sort=updated&per_page=50`.

> ### ⚠️ Cuidado
> Nunca metas datos secretos (un token, por ejemplo) en el query string. Las URLs quedan guardadas en historiales y en los registros de los servidores. Los secretos van en el header `Authorization` y, mejor todavia, manejados desde el servidor.

---

## 3. fetch y el cliente

> ### 🟦 ¿Que significa? — *fetch*
> **fetch** es la funcion de JavaScript del navegador para hacer peticiones HTTP. Sirve para pedir datos a una API desde tu codigo. Ya la viste en el Modulo 03. En **tunal-digital**, todo el chat se mueve con `fetch` hacia el Worker; en **Faro** (React/Next.js) tambien se usa `fetch` para llamar a las rutas internas.

> ### 🟦 ¿Que significa? — *Promesa (Promise)*
> Una **promesa** es un objeto que representa un resultado que llegara mas tarde, porque la red tarda lo suyo. Sirve para no congelar la app mientras esperas. `fetch` devuelve una promesa, y por eso le pones `await`.

> ### 🟦 ¿Que significa? — *async / await*
> **async** marca una funcion que trabaja con promesas, y **await** la pausa hasta que la promesa termina, sin bloquear el resto. Sirve para escribir codigo asincrono que se lee como si fuera de arriba a abajo, de corrido. Todas las llamadas a APIs en nuestros repos usan `async/await`.

```javascript
// tunal-digital: leer la respuesta del chat de forma asincrona
async function preguntar(texto) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mensaje: texto }),
  });
  if (!res.ok) throw new Error("El chat fallo: " + res.status);
  const datos = await res.json();
  return datos.respuesta;
}
```

> ### 🟦 ¿Que significa? — *Cliente y servidor*
> El **cliente** es donde corre el codigo cerca del usuario: el navegador, la app de Flet en **PolyPaw**. El **servidor** es la maquina remota que guarda datos y secretos: el Worker de **tunal-digital**, las rutas de **Faro** en Vercel, Supabase. Sirve para separar lo publico de lo privado. La regla de oro de siempre: **las claves viven en el servidor**.

> ### 🔎 En tu codigo
> En **Faro**, si un archivo esta dentro de `app/api/` (rutas de Next.js) o usa variables sin el prefijo `NEXT_PUBLIC_`, eso corre en el **servidor**: ahi puedes leer tokens sin problema. Si el componente lleva `"use client"` arriba, corre en el navegador, y ahi **nunca** pongas secretos.

---

## 4. Datos: JSON

> ### 🟦 ¿Que significa? — *JSON*
> **JSON** (JavaScript Object Notation) es un formato de texto para representar datos con objetos `{}` y listas `[]`. Sirve para intercambiar datos entre cliente y servidor de una forma que todos entienden. Es el formato del body en **tunal-digital** y **Faro**; y ademas, **PolyPaw** guarda sus misiones en archivos `.json`.

```json
{
  "proyecto": "Faro",
  "estado": "en desarrollo",
  "progreso": 62,
  "roadmap": ["Conectar Drive", "Mejorar el resumen IA"]
}
```

> ### 🟦 ¿Que significa? — *Serializar / parsear*
> **Serializar** es convertir un objeto a texto JSON (`JSON.stringify`); **parsear** es hacer el camino de vuelta, del texto JSON al objeto (`JSON.parse` o `res.json()`). Sirve para enviar y recibir datos. En **tunal-digital**, serializas el mensaje al mandarlo y parseas la respuesta al recibirla.

> ### 🟦 ¿Que significa? — *Content-Type*
> **Content-Type** es el header que dice en que formato va el contenido. Sirve para que el otro lado sepa como leerlo. Cuando envias JSON, pones `Content-Type: application/json`, como en cada `POST` de **tunal-digital**.

> ### ⚠️ Cuidado
> Si te olvidas del header `Content-Type: application/json`, el servidor puede no entender tu body y devolverte un `400`. Es uno de los errores mas comunes y, a la vez, de los mas faciles de pasar por alto.

---

## 5. Autenticacion: tokens, API keys y OAuth

Aqui esta el corazon de la seguridad. Lee con calma; Bit te acompaña.

> ### 🟦 ¿Que significa? — *Autenticacion vs autorizacion*
> **Autenticacion** es probar quien eres (el login); **autorizacion** es tener permiso de hacer algo. Sirve para separar el "se que eres tu" del "puedes tocar esto". En **RachaSimple** y **Faro**, Supabase Auth te autentica, y los *scopes* de OAuth deciden a que te autoriza.

> ### 🟦 ¿Que significa? — *Token*
> Un **token** es una cadena secreta que demuestra que ya te autenticaste, para no tener que mandar tu contraseña en cada peticion. Funciona como un pase de entrada temporal. **Faro** recibe un token de acceso de GitHub despues del OAuth y lo usa para leer tus repos.

> ### 🟦 ¿Que significa? — *API key*
> Una **API key** es una clave fija que identifica a tu aplicacion ante un servicio. Sirve para que el servicio sepa quien llama y pueda cobrar o limitar el uso. **Faro** usa la API key de OpenAI; **tunal-digital** usa la de Anthropic. Las dos viven **solo en el servidor**.

> ### ⚠️ Cuidado
> La diferencia clave: una **API key** suele identificar a *tu app* (es fija y muy secreta), mientras que un **token** suele identificar a *un usuario* tras un login (es temporal). Las dos son secretos. Ninguna se commitea ni se manda al navegador.

> ### 🟦 ¿Que significa? — *Bearer*
> **Bearer** ("portador") es el esquema mas comun para enviar un token: lo pones en el header `Authorization: Bearer <token>`. Sirve para que el servidor lea tu credencial de una forma estandar, que todos conocen. Asi llama **Faro** a OpenAI y a GitHub desde el servidor.

```javascript
// Faro (lado SERVIDOR): llamar a OpenAI con la API key en Authorization: Bearer
const res = await fetch("https://api.openai.com/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`, // secreto del servidor
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ model: "gpt-4o-mini", messages }),
});
```

> ### 🟦 ¿Que significa? — *OAuth*
> **OAuth** es un protocolo para que una app acceda a tus datos en otro servicio **sin que le des tu contraseña**. Sirve para conceder permisos limitados y revocables. **Faro** usa OAuth (via Supabase Auth) para que tu autorices leer tus repos de **GitHub** y tus archivos de **Google Drive**.

> ### 🟦 ¿Que significa? — *Proveedor de identidad*
> Un **proveedor de identidad** es el servicio que confirma quien eres dentro de un OAuth (GitHub, Google). Sirve para reutilizar una cuenta que ya tienes en lugar de crear otra mas. En **RachaSimple**, el login va por Supabase Auth; en **Faro**, GitHub y Google son los proveedores que autorizan el acceso a tus datos.

> ### 🟦 ¿Que significa? — *Scope (alcance)*
> Un **scope** es el permiso concreto que pides en un OAuth (por ejemplo, "leer repos" o "leer archivos de Drive"). Sirve para limitarte a lo justo y necesario. **Faro** pide scopes de solo lectura: quiere *leer* tus proyectos para analizarlos, no tocarlos.

> ### 💡 Tip
> Pide siempre el **scope minimo**. Si solo necesitas leer, no pidas permiso de escritura. Menos permisos significa menos daño posible si algo se llega a filtrar. Faro lo hace asi a proposito.

> ### 🟦 ¿Que significa? — *Callback (URL de redireccion)*
> El **callback** es la URL a la que el proveedor te devuelve despues de aprobar el acceso, trayendo un codigo que canjeas por el token. Sirve para cerrar el circulo del login. En **Faro**, tras aprobar en GitHub, vuelves a una ruta de callback que Supabase maneja para conseguir el token.

> ### 🟦 ¿Que significa? — *Flujo de OAuth (resumen)*
> El **flujo** es el orden de los pasos: (1) tu app te manda al proveedor, (2) tu apruebas los scopes, (3) el proveedor te regresa al *callback* con un codigo, (4) el **servidor** canjea ese codigo por un token. Sirve para que el secreto final nunca pase por el navegador. Asi conecta **Faro** con GitHub y Drive.

> ### 🟦 ¿Que significa? — *RLS (Row Level Security)*
> **RLS** es una funcion de la base de datos (Postgres/Supabase) que filtra por filas segun quien consulta, de modo que cada usuario solo ve lo suyo. Sirve para proteger los datos en la base misma. En **Faro**, la tabla `user_connections` (donde se guardan los tokens) tiene RLS para que nadie acceda a las conexiones de otra persona.

> ### 🔎 En tu codigo
> En **Faro**, los tokens de GitHub y Drive se guardan en `user_connections` (servidor + RLS), nunca en el `localStorage` del navegador. Si alguna vez ves un token en codigo del cliente, eso es un bug de seguridad y hay que corregirlo ya.

---

## 6. Inteligencia Artificial (LLM)

> ### 🟦 ¿Que significa? — *IA / LLM*
> **IA** es inteligencia artificial; un **LLM** (Large Language Model, modelo grande de lenguaje) es el tipo de IA que entiende y genera texto. Sirve para escribir, resumir, clasificar o conversar. **tunal-digital** usa el LLM de Claude (Anthropic) para el chat; **Faro** usa los LLM de OpenAI para generar descripcion, estado y roadmap.

> ### 🟦 ¿Que significa? — *Modelo*
> Un **modelo** es una version concreta de la IA, con su nombre y sus capacidades (por ejemplo, un modelo de Claude o uno de OpenAI). Sirve para elegir el equilibrio que te conviene entre calidad, velocidad y costo. En cada llamada indicas cual quieres en el campo `model`.

> ### 🟦 ¿Que significa? — *Prompt*
> Un **prompt** es el texto de instrucciones que le das al LLM. Sirve para decirle exactamente que quieres. En **Faro**, el prompt le pide a OpenAI: "con estos datos del repo, devuelve un JSON con descripcion, estado y roadmap"; en **tunal-digital**, el prompt incluye el mensaje del visitante.

> ### 🟦 ¿Que significa? — *System prompt*
> El **system prompt** son las instrucciones de fondo que fijan el papel y las reglas del modelo: su "personalidad" y sus limites. Sirve para sostener el tono y el comportamiento. En **tunal-digital**, el system prompt define que el asistente hable de Tunal Digital y no se vaya por las ramas.

> ### 🟦 ¿Que significa? — *Token de IA*
> Un **token de IA** es la unidad con la que el modelo cuenta el texto: un trozo de palabra. Sirve para medir cuanto entra y cuanto sale, porque de eso dependen el costo y el limite. ¡Ojo!: este "token" no tiene nada que ver con el "token" de autenticacion de la seccion 5. Mismo nombre, mundos distintos.

> ### ⚠️ Cuidado
> No mezcles los dos "token": el de **autenticacion** es tu pase de seguridad; el de **IA** es una unidad para medir texto. Si en una factura de IA lees "te quedaste sin tokens", hablan de los de texto, no de tus credenciales.

> ### 🟦 ¿Que significa? — *Temperature (temperatura)*
> **temperature** es un numero (entre 0 y ~1) que regula que tan creativa o predecible se pone la IA: bajo, mas estable y repetible; alto, mas variado. Sirve para ajustar el estilo de la respuesta. En **Faro**, para generar un JSON ordenado conviene temperatura baja; en el chat mas suelto de **tunal-digital** puedes subirla un poco.

> ### 🟦 ¿Que significa? — *max_tokens*
> **max_tokens** es el limite de cuanto texto puede generar el modelo en su respuesta. Sirve para controlar el largo y, de paso, el costo. En **tunal-digital** se limita para que las respuestas del chat salgan breves y baratas.

> ### 🟦 ¿Que significa? — *Salida estructurada (JSON)*
> Una **salida estructurada** es pedirle al modelo que responda en un formato fijo, normalmente JSON, en vez de texto libre. Sirve para que tu programa pueda leer la respuesta sin andar adivinando. **Faro** le pide a OpenAI un JSON con campos exactos para guardar estado y progreso.

```json
{
  "descripcion": "Organizador de proyectos que lee GitHub y Drive.",
  "estado": "en desarrollo",
  "progreso": 62,
  "roadmap": ["Mejorar deteccion de milestones", "Conectar Drive"]
}
```

> ### 🟦 ¿Que significa? — *Alucinacion*
> Una **alucinacion** es cuando la IA se inventa algo que suena muy seguro pero es falso. Conviene saberlo para no creerle a ciegas. Por eso en **Faro** el progreso es **hibrido** (milestones reales + IA): los datos duros le ponen freno a la IA para que no se invente el avance.

> ### 💡 Tip
> Trata la salida de un LLM como un borrador inteligente, no como la verdad final. Valida el JSON que te devuelve (que traiga los campos que esperas) antes de guardarlo en la base de datos.

---

## 7. Infraestructura: CORS, proxy, variables de entorno

> ### 🟦 ¿Que significa? — *CORS*
> **CORS** (Cross-Origin Resource Sharing) es la regla del navegador que controla si una pagina puede llamar a una API de **otro origen**, es decir, otro dominio. Sirve para proteger al usuario. Si **tunal-digital** llamara directo a la API de Anthropic desde el navegador, CORS (y la seguridad de la clave) se lo impedirian: por eso pasa por el Worker.

> ### 🟦 ¿Que significa? — *Origen (origin)*
> Un **origen** es la combinacion de protocolo + dominio + puerto (por ejemplo, `https://tunal.digital`). Sirve para que CORS sepa que cuenta como "lo mismo" y que cuenta como "otro". Llamar dentro del mismo origen no dispara CORS; cruzar de un origen a otro, si.

> ### 🟦 ¿Que significa? — *Proxy*
> Un **proxy** es un intermediario en el servidor: tu cliente le habla a el, y el reenvia la peticion al servicio real añadiendo el secreto por su cuenta. Sirve para esconder la clave y esquivar CORS de paso. El **Cloudflare Worker** de **tunal-digital** es justo eso: un proxy entre el navegador y la API de Claude.

```javascript
// tunal-digital, Cloudflare Worker (SERVIDOR): el proxy que esconde la API key
export default {
  async fetch(request, env) {
    const { mensaje } = await request.json();
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": env.ANTHROPIC_API_KEY, // secreto SOLO en el Worker
        "anthropic-version": "2023-06-01",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-...",
        max_tokens: 512,
        messages: [{ role: "user", content: mensaje }],
      }),
    });
    return new Response(await res.text(), {
      headers: { "Content-Type": "application/json" },
    });
  },
};
```

> ### 🟦 ¿Que significa? — *Worker (Cloudflare Worker)*
> Un **Worker** es una funcion que corre en el servidor, dentro de la red de Cloudflare, sin que tu tengas que administrar ninguna maquina. Sirve para tener "un pedacito de backend" barato y rapido. En **tunal-digital**, el Worker es el unico que conoce la API key de Claude.

> ### 🟦 ¿Que significa? — *Variable de entorno*
> Una **variable de entorno** es un valor de configuracion (muchas veces un secreto) que se inyecta fuera del codigo, segun el ambiente en que corras. Sirve para no escribir claves dentro del codigo ni subirlas a git. En **Faro** son `OPENAI_API_KEY` y compañia; en el Worker es `env.ANTHROPIC_API_KEY`.

> ### 🟦 ¿Que significa? — *.env y .gitignore*
> El archivo **.env** guarda las variables de entorno en tu maquina; **.gitignore** le dice a git que **no** suba ese archivo. Sirve para que tus secretos jamas lleguen al repositorio. Revisa siempre que `.env` este listado en `.gitignore`.

> ### ⚠️ Cuidado
> En Next.js (Faro), toda variable con el prefijo `NEXT_PUBLIC_` **se incrusta en el navegador y queda publica**. Jamas le pongas ese prefijo a una API key. Los secretos van en variables **sin** ese prefijo, que solo lee el servidor.

> ### 🟦 ¿Que significa? — *Rate limit (limite de peticiones)*
> Un **rate limit** es el tope de peticiones que un servicio te permite en cierto tiempo. Sirve para evitar abusos y costos disparados; cuando te pasas, recibes un `429`. En **tunal-digital** conviene limitar el chat para que un solo visitante no te agote la cuota de Anthropic.

> ### 🟦 ¿Que significa? — *Webhook*
> Un **webhook** es lo contrario de una llamada normal: en vez de que tu preguntes, el servicio te avisa enviando una peticion a una URL tuya cuando pasa algo. Sirve para reaccionar a eventos sin estar consultando todo el rato. No es central en estos repos, pero es un termino que vas a oir seguido.

> ### 🟦 ¿Que significa? — *SDK*
> Un **SDK** (Software Development Kit) es una libreria oficial que envuelve una API para que la uses sin armar las peticiones HTTP a mano. Sirve para escribir menos y equivocarte menos. En **Faro** podrias usar el SDK de OpenAI; en el Worker, puedes llamar a Anthropic via SDK o con `fetch` directo.

> ### 💡 Tip
> Uses fetch crudo o un SDK, el principio de seguridad no se mueve: la inicializacion con la API key ocurre en el **servidor**. El SDK no te libra de cuidar el secreto.

---

## 8. Mapa mental del modulo

Asi se conecta todo lo que viste. Sigue las flechas como si fuera un mapa de metro:

```text
                 ┌────────────────── EL USUARIO ──────────────────┐
                 │  navegador / app (CLIENTE)  — sin secretos      │
                 └───────────────┬─────────────────────────────────┘
                                 │ fetch (HTTP/HTTPS)
                                 │ metodo + headers + body(JSON)
                                 ▼
        ┌────────────────── SERVIDOR (aqui viven los secretos) ──────────────────┐
        │  Faro: rutas /api de Next.js (Vercel)                                   │
        │  tunal-digital: Cloudflare Worker (proxy)                               │
        │  variables de entorno: API key / tokens                                │
        └───────┬───────────────────────┬───────────────────────┬───────────────┘
                │ Bearer / x-api-key     │ OAuth (scopes,         │ Bearer
                ▼                        │   callback, token)     ▼
        ┌───────────────┐               ▼                ┌────────────────────┐
        │  API de IA    │      ┌──────────────────┐      │  Base de datos     │
        │  OpenAI(Faro) │      │  GitHub / Google  │      │  Supabase + RLS    │
        │  Claude(tunal)│      │  Drive  (Faro)    │      │  user_connections  │
        │  prompt,      │      │  leer repos /     │      │  guarda tokens     │
        │  temperature, │      │  archivos         │      │  con seguridad     │
        │  max_tokens   │      └──────────────────┘      └────────────────────┘
        │  → JSON       │
        └───────────────┘
```

Lee el mapa asi: el **cliente** nunca toca un secreto, siempre habla con **tu servidor** por `fetch`. Tu servidor, que si guarda las claves en **variables de entorno**, es quien llama a las **APIs de IA** (con prompts y parametros como `temperature`), a **GitHub/Drive** (con **OAuth**, scopes y callback) y guarda lo necesario en **Supabase** con **RLS**. Si entiendes este dibujo, entiendes el modulo entero.

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Explico que es una **API**, un **endpoint** y un **metodo HTTP** con mis palabras.
- [ ] Distingo los **codigos de estado** mas comunes (200, 400, 401, 403, 404, 429, 500).
- [ ] Se que son **header**, **body** y **Content-Type**, y cuando uso cada uno.
- [ ] Hago una peticion con **fetch** usando **async/await** y leo el **JSON** de respuesta.
- [ ] Diferencio **token** de **API key**, y se que es el esquema **Bearer**.
- [ ] Explico el **flujo de OAuth**: proveedor, **scope**, **callback** y canje del token.
- [ ] Entiendo por que **Faro** guarda tokens en `user_connections` con **RLS**.
- [ ] Se que es un **LLM**, un **prompt**, **temperature** y un **token de IA** (y no lo confundo con el de auth).
- [ ] Explico **CORS** y por que **tunal-digital** usa un **proxy** (Worker) para llamar a Claude.
- [ ] Tengo claro que las **claves van en variables de entorno del servidor**, nunca en el cliente ni en git.

---

## 🧪 Ejercicios

1. **Diccionario propio.** Sin mirar el capitulo, escribe con tus palabras la definicion de seis terminos: *endpoint*, *Bearer*, *scope*, *callback*, *temperature* y *proxy*. Luego compara con el glosario y corrige lo que falte.

2. **Caza al impostor.** Aqui hay tres afirmaciones; di cuales son falsas y por que: (a) "una API key identifica a un usuario tras el login", (b) "el token de IA y el token de autenticacion son lo mismo", (c) "CORS protege al navegador de llamar a otro origen sin permiso".

3. 💻 **Lee un estado.** Con `fetch` a una API publica de prueba, haz una peticion que devuelva `404` a proposito (pidiendo algo que no existe) e imprime en consola `res.status` y `res.ok`. Confirma que entiendes la diferencia entre ambos.

4. 💻 **Mismo origen, otro origen.** En una pagina local, haz un `fetch` a una ruta del mismo origen y luego a una API de otro dominio que no permita CORS. Observa el error de CORS en la consola y explica en un comentario por que un **proxy** lo resolveria.

5. 💻 **Secretos a su lugar.** Crea un archivo `.env` con una variable `MI_API_KEY=demo123`, añadelo a `.gitignore` y verifica con `git status` que git **no** lo lista para subir. Escribe debajo, en un comentario, por que esto protege tu clave.

6. **Mapa con tus repos.** Dibuja (a mano o en un editor) tu propia version del mapa mental de la seccion 8, pero solo para **tunal-digital**: marca donde esta el cliente, donde el Worker, donde vive la API key y por donde viaja el prompt.

---

## 👉 Como sigue: Modulo 09 — NAS y servidores

Cerramos el Modulo 08 sabiendo pedir datos a otros (APIs), autorizar accesos sin regalar contraseñas (OAuth) y conversar con modelos de IA sin perder de vista la **seguridad**. Hasta ahora, tu "servidor" siempre fue de alguien mas: Vercel, Cloudflare, Supabase.

En el **Modulo 09** das el salto a **tu propio servidor en casa**: un **NAS**. Lo veremos de la mano de **polypaw-nas** (Ubuntu + Samba para compartir archivos + Cockpit para administrarlo desde el navegador + Tailscale para llegar a el de forma segura desde fuera). Vas a entender que es una direccion IP, que es un puerto, que significa un servicio que corre siempre y como acceder a tus archivos desde cualquier lado sin abrirle tu casa al mundo entero. Mucho de lo que aprendiste aqui (HTTP, headers, seguridad, variables de entorno) te va a sonar; solo que ahora del otro lado del cable.

> Lo lograste, y se nota. Guarda este glosario cerquita: vas a volver a el mas seguido de lo que crees. Nos vemos en el Modulo 09 con las patitas listas para montar tu primer servidor. — Bit 🐾
