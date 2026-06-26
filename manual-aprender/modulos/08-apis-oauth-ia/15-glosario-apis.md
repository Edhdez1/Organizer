# Capitulo 15 — Glosario de APIs, OAuth e IA y mapa

> Llegaste al final del Modulo 08. Soy **Bit**, tu ajolote guia, y vengo con una libreta llena de palabras raras que fuimos soltando por el camino: *endpoint*, *Bearer*, *scope*, *temperature*... Si alguna te dio un escalofrio, tranquilo: aqui las ordenamos de la A a la Z, con definiciones cortitas, para que sirven y donde aparecen de verdad en nuestros repos (sobre todo **Faro** y **tunal-digital**). Este capitulo es tu diccionario de cabecera. No se memoriza de un tiron: se consulta. Vamos despacio y con la cola tranquila.

Antes de empezar, un recordatorio que repetiremos como mantra de todo el modulo: **las claves y los secretos viven en el servidor, nunca en el cliente**. Es la regla de seguridad de Faro y la vas a ver subrayada varias veces. No es paranoia; es profesionalismo.

---

## 1. Como usar este glosario

Cada termino viene en un recuadro con la misma estructura: que significa, para que sirve y donde lo usamos en un repo real. Los terminos estan agrupados por temas (la Web y HTTP, datos, autenticacion, IA, infraestructura) y dentro de cada grupo van en orden alfabetico. Al final hay un **mapa mental** que conecta todo, un repaso y como sigue el camino hacia el Modulo 09.

> ### 💡 Tip
> No leas esto como una novela. Leelo una vez para ubicarte y luego vuelve cada vez que una palabra te genere duda mientras programas. Un glosario sirve por consulta, no por memorizacion.

---

## 2. La Web y HTTP

> ### 🟦 ¿Que significa? — *API*
> **API** (Application Programming Interface, interfaz de programacion de aplicaciones) es un conjunto de reglas para que dos programas hablen entre si. Sirve para pedir datos o acciones a otro sistema sin saber como funciona por dentro. En **Faro** usamos la API de GitHub para leer tus repos y la API de OpenAI para generar el roadmap; en **tunal-digital** el chat habla con la API de Claude (Anthropic).

> ### 🟦 ¿Que significa? — *REST*
> **REST** es un estilo para diseñar APIs sobre HTTP: cada cosa (un usuario, un proyecto) es un *recurso* con su direccion, y se opera con metodos HTTP. Sirve para tener APIs predecibles y ordenadas. La API de GitHub que consume **Faro** es REST: pides `GET /repos/usuario/proyecto` y te devuelve ese repo.

> ### 🟦 ¿Que significa? — *Endpoint*
> Un **endpoint** es una URL concreta de una API que hace una cosa especifica. Sirve para apuntar tu peticion al lugar correcto. En **tunal-digital**, el endpoint del chat es la ruta del Cloudflare Worker (por ejemplo `/api/chat`); en **Faro**, un endpoint propio podria ser `/api/analyze` que dispara el analisis del proyecto.

> ### 🟦 ¿Que significa? — *HTTP*
> **HTTP** (HyperText Transfer Protocol) es el idioma con el que el navegador y los servidores se piden y se envian cosas en la web. Sirve para que tu codigo pueda solicitar datos a una API por internet. Todas las llamadas de **Faro** y **tunal-digital** viajan sobre HTTP (en realidad HTTPS, su version cifrada).

> ### 🟦 ¿Que significa? — *HTTPS*
> **HTTPS** es HTTP con cifrado (la "S" es de *Secure*). Sirve para que nadie en el camino pueda leer ni alterar lo que envias, como tu token. Tanto **Faro** (desplegado en Vercel) como el Worker de **tunal-digital** solo aceptan HTTPS.

> ### 🟦 ¿Que significa? — *Metodo HTTP*
> Un **metodo** (o *verbo*) HTTP indica que accion quieres: `GET` para leer, `POST` para crear o enviar, `PUT`/`PATCH` para actualizar, `DELETE` para borrar. Sirve para que el servidor sepa tu intencion. En **tunal-digital** el chat envia el mensaje con `POST`; en **Faro** leer tus repos es un `GET`.

```javascript
// tunal-digital: enviar el mensaje del usuario al Worker con POST
const respuesta = await fetch("/api/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ mensaje: textoDelUsuario }),
});
```

> ### 🟦 ¿Que significa? — *Codigo de estado*
> Un **codigo de estado** es el numero que devuelve el servidor para decir como salio la peticion: `200` OK, `201` creado, `400` peticion mal hecha, `401` no autenticado, `403` sin permiso, `404` no existe, `429` demasiadas peticiones, `500` error del servidor. Sirve para reaccionar en tu codigo. En **tunal-digital**, si el Worker responde `429`, el chat avisa "espera un momento".

> ### 🟦 ¿Que significa? — *Header (cabecera)*
> Un **header** es un par dato:valor que acompaña a una peticion o respuesta con informacion extra (tipo de contenido, autenticacion, etc.). Sirve para configurar la llamada sin meter eso en el cuerpo. En **Faro**, el header `Authorization` lleva el token; el header `Content-Type: application/json` dice "te mando JSON".

> ### 🟦 ¿Que significa? — *Body (cuerpo)*
> El **body** es el contenido principal de una peticion o respuesta, normalmente JSON. Sirve para enviar los datos de verdad (el mensaje del chat, el prompt). En **tunal-digital** el body del `POST` lleva `{ "mensaje": "..." }`.

> ### 🟦 ¿Que significa? — *Query string (parametros de URL)*
> El **query string** es la parte de la URL despues del `?`, con pares `clave=valor` separados por `&`. Sirve para filtrar o paginar sin usar el body. En **Faro**, pedir tus repos ordenados es algo como `GET /user/repos?sort=updated&per_page=50`.

> ### ⚠️ Cuidado
> No metas datos secretos (un token) en el query string. Las URLs quedan guardadas en historiales y registros de servidores. Los secretos van en el header `Authorization` y, mejor aun, manejados desde el servidor.

---

## 3. fetch y el cliente

> ### 🟦 ¿Que significa? — *fetch*
> **fetch** es la funcion de JavaScript del navegador para hacer peticiones HTTP. Sirve para pedir datos a una API desde tu codigo. La viste en el Modulo 03. En **tunal-digital**, todo el chat se mueve con `fetch` hacia el Worker; en **Faro** (React/Next.js) tambien se usa `fetch` para llamar a las rutas internas.

> ### 🟦 ¿Que significa? — *Promesa (Promise)*
> Una **promesa** es un objeto que representa un resultado que llegara despues (porque la red tarda). Sirve para no congelar la app mientras esperas. `fetch` devuelve una promesa; por eso usas `await`.

> ### 🟦 ¿Que significa? — *async / await*
> **async** marca una funcion que trabaja con promesas, y **await** pausa hasta que la promesa termina, sin bloquear el resto. Sirve para escribir codigo asincrono que se lee como si fuera de arriba a abajo. Todas las llamadas a APIs en nuestros repos usan `async/await`.

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
> El **cliente** es donde corre el codigo cerca del usuario (el navegador, la app de Flet en **PolyPaw**). El **servidor** es la maquina remota que guarda datos y secretos (el Worker de **tunal-digital**, las rutas de **Faro** en Vercel, Supabase). Sirve para separar lo publico de lo privado. Regla de oro: **las claves viven en el servidor**.

> ### 🔎 En tu codigo
> En **Faro**, si un archivo esta dentro de `app/api/` (rutas de Next.js) o usa variables sin el prefijo `NEXT_PUBLIC_`, eso corre en el **servidor**: ahi puedes leer tokens. Si el componente lleva `"use client"` arriba, corre en el navegador: ahi **nunca** pongas secretos.

---

## 4. Datos: JSON

> ### 🟦 ¿Que significa? — *JSON*
> **JSON** (JavaScript Object Notation) es un formato de texto para representar datos con objetos `{}` y listas `[]`. Sirve para intercambiar datos entre cliente y servidor de forma universal. Es el formato del body en **tunal-digital** y **Faro**; ademas, **PolyPaw** guarda sus misiones en archivos `.json`.

```json
{
  "proyecto": "Faro",
  "estado": "en desarrollo",
  "progreso": 62,
  "roadmap": ["Conectar Drive", "Mejorar el resumen IA"]
}
```

> ### 🟦 ¿Que significa? — *Serializar / parsear*
> **Serializar** es convertir un objeto a texto JSON (`JSON.stringify`); **parsear** es convertir el texto JSON de vuelta a objeto (`JSON.parse` o `res.json()`). Sirve para enviar y recibir datos. En **tunal-digital** serializas el mensaje al enviarlo y parseas la respuesta al recibirla.

> ### 🟦 ¿Que significa? — *Content-Type*
> **Content-Type** es el header que dice en que formato va el contenido. Sirve para que el otro lado sepa como leerlo. Cuando envias JSON pones `Content-Type: application/json`, como en cada `POST` de **tunal-digital**.

> ### ⚠️ Cuidado
> Si olvidas el header `Content-Type: application/json`, el servidor puede no entender tu body y devolverte un `400`. Es uno de los errores mas comunes y mas faciles de pasar por alto.

---

## 5. Autenticacion: tokens, API keys y OAuth

Aqui esta el corazon de la seguridad. Lee con calma, Bit te acompaña.

> ### 🟦 ¿Que significa? — *Autenticacion vs autorizacion*
> **Autenticacion** es probar quien eres (login); **autorizacion** es que tienes permiso de hacer. Sirve para distinguir "se que eres tu" de "puedes tocar esto". En **RachaSimple** y **Faro**, Supabase Auth te autentica; los *scopes* de OAuth deciden a que te autoriza.

> ### 🟦 ¿Que significa? — *Token*
> Un **token** es una cadena secreta que prueba que ya te autenticaste, para no mandar tu contraseña en cada peticion. Sirve como "pase de entrada" temporal. **Faro** recibe un token de acceso de GitHub tras el OAuth y lo usa para leer tus repos.

> ### 🟦 ¿Que significa? — *API key*
> Una **API key** es una clave fija que identifica a tu aplicacion ante un servicio. Sirve para que el servicio sepa quien llama y cobre/limite el uso. **Faro** usa la API key de OpenAI; **tunal-digital** usa la API key de Anthropic. Ambas viven **solo en el servidor**.

> ### ⚠️ Cuidado
> Diferencia clave: una **API key** suele identificar a *tu app* (es fija y muy secreta); un **token** suele identificar a *un usuario* tras un login (es temporal). Las dos son secretos. Ninguna se commitea ni se manda al navegador.

> ### 🟦 ¿Que significa? — *Bearer*
> **Bearer** ("portador") es el esquema mas comun para enviar un token: se pone en el header `Authorization: Bearer <token>`. Sirve para que el servidor lea tu credencial de forma estandar. Asi llama **Faro** a OpenAI y a GitHub desde el servidor.

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
> Un **proveedor de identidad** es el servicio que confirma quien eres en un OAuth (GitHub, Google). Sirve para reutilizar una cuenta que ya tienes. En **RachaSimple** el login es con Supabase Auth; en **Faro**, GitHub y Google son los proveedores que autorizan el acceso a tus datos.

> ### 🟦 ¿Que significa? — *Scope (alcance)*
> Un **scope** es el permiso concreto que pides en un OAuth (por ejemplo "leer repos", "leer archivos de Drive"). Sirve para limitar a lo justo y necesario. **Faro** pide scopes de solo lectura: quiere *leer* tus proyectos para analizarlos, no modificarlos.

> ### 💡 Tip
> Pide siempre el **scope minimo**. Si solo necesitas leer, no pidas permiso de escritura. Menos permisos = menos daño posible si algo se filtra. Faro lo hace asi a proposito.

> ### 🟦 ¿Que significa? — *Callback (URL de redireccion)*
> El **callback** es la URL a la que el proveedor te devuelve despues de aprobar el acceso, trayendo un codigo para canjear por el token. Sirve para cerrar el circulo del login. En **Faro**, tras aprobar en GitHub, vuelves a una ruta de callback que Supabase maneja para obtener el token.

> ### 🟦 ¿Que significa? — *Flujo de OAuth (resumen)*
> El **flujo** es el orden de pasos: (1) tu app te manda al proveedor, (2) tu apruebas los scopes, (3) el proveedor te regresa al *callback* con un codigo, (4) el **servidor** canjea ese codigo por un token. Sirve para que el secreto final nunca pase por el navegador. Asi conecta **Faro** con GitHub y Drive.

> ### 🟦 ¿Que significa? — *RLS (Row Level Security)*
> **RLS** es una funcion de la base de datos (Postgres/Supabase) que filtra por filas segun quien consulta, para que cada usuario solo vea lo suyo. Sirve para proteger datos a nivel de base. En **Faro**, la tabla `user_connections` (donde se guardan tokens) tiene RLS para que nadie acceda a las conexiones de otro.

> ### 🔎 En tu codigo
> En **Faro**, los tokens de GitHub y Drive se guardan en `user_connections` (servidor + RLS), nunca en `localStorage` del navegador. Si alguna vez ves un token en codigo del cliente, eso es un bug de seguridad que hay que corregir ya.

---

## 6. Inteligencia Artificial (LLM)

> ### 🟦 ¿Que significa? — *IA / LLM*
> **IA** es inteligencia artificial; un **LLM** (Large Language Model, modelo grande de lenguaje) es el tipo de IA que entiende y genera texto. Sirve para escribir, resumir, clasificar o conversar. **tunal-digital** usa el LLM de Claude (Anthropic) para el chat; **Faro** usa los LLM de OpenAI para generar descripcion, estado y roadmap.

> ### 🟦 ¿Que significa? — *Modelo*
> Un **modelo** es una version concreta de la IA, con su nombre y capacidades (por ejemplo un modelo de Claude o uno de OpenAI). Sirve para elegir el equilibrio entre calidad, velocidad y costo. En cada llamada indicas el modelo en el campo `model`.

> ### 🟦 ¿Que significa? — *Prompt*
> Un **prompt** es el texto de instrucciones que le das al LLM. Sirve para decirle exactamente que quieres. En **Faro**, el prompt le pide a OpenAI: "con estos datos del repo, devuelve un JSON con descripcion, estado y roadmap"; en **tunal-digital**, el prompt incluye el mensaje del visitante.

> ### 🟦 ¿Que significa? — *System prompt*
> El **system prompt** son instrucciones de fondo que fijan el papel y las reglas del modelo (su "personalidad" y limites). Sirve para mantener el tono y el comportamiento. En **tunal-digital** el system prompt define que el asistente hable de Tunal Digital y no se salga del tema.

> ### 🟦 ¿Que significa? — *Token de IA*
> Un **token de IA** es la unidad en que el modelo cuenta el texto (un trozo de palabra). Sirve para medir cuanto entra y sale, porque de eso depende el costo y el limite. ¡Ojo!: este "token" no es el mismo "token" de autenticacion de la seccion 5. Mismo nombre, mundo distinto.

> ### ⚠️ Cuidado
> No confundas los dos "token": el de **autenticacion** es tu pase de seguridad; el de **IA** es una unidad para medir texto. Si lees "te quedaste sin tokens" en una factura de IA, hablan de los de texto, no de credenciales.

> ### 🟦 ¿Que significa? — *Temperature (temperatura)*
> **temperature** es un numero (entre 0 y ~1) que regula que tan creativa o predecible es la IA: bajo = mas estable y repetible, alto = mas variado. Sirve para ajustar el estilo. En **Faro**, para generar un JSON ordenado conviene temperatura baja; en el chat creativo de **tunal-digital** se puede subir un poco.

> ### 🟦 ¿Que significa? — *max_tokens*
> **max_tokens** es el limite de cuanto texto puede generar el modelo en su respuesta. Sirve para controlar largo y costo. En **tunal-digital** se limita para que las respuestas del chat sean breves y baratas.

> ### 🟦 ¿Que significa? — *Salida estructurada (JSON)*
> Una **salida estructurada** es pedirle al modelo que responda en un formato fijo, normalmente JSON, en vez de texto libre. Sirve para que tu programa pueda leer la respuesta sin adivinar. **Faro** le pide a OpenAI un JSON con campos exactos para guardar estado y progreso.

```json
{
  "descripcion": "Organizador de proyectos que lee GitHub y Drive.",
  "estado": "en desarrollo",
  "progreso": 62,
  "roadmap": ["Mejorar deteccion de milestones", "Conectar Drive"]
}
```

> ### 🟦 ¿Que significa? — *Alucinacion*
> Una **alucinacion** es cuando la IA inventa algo que suena seguro pero es falso. Sirve saberlo para no confiar a ciegas. Por eso en **Faro** el progreso es **hibrido** (milestones reales + IA): los datos duros sujetan a la IA para que no se invente el avance.

> ### 💡 Tip
> Trata la salida de un LLM como un borrador inteligente, no como una verdad final. Valida el JSON que te devuelve (que tenga los campos esperados) antes de guardarlo en la base de datos.

---

## 7. Infraestructura: CORS, proxy, variables de entorno

> ### 🟦 ¿Que significa? — *CORS*
> **CORS** (Cross-Origin Resource Sharing) es la regla del navegador que controla si una pagina puede llamar a una API de **otro origen** (otro dominio). Sirve para proteger al usuario. Si **tunal-digital** llamara directo a la API de Anthropic desde el navegador, CORS (y la seguridad de la clave) lo impedirian: por eso pasa por el Worker.

> ### 🟦 ¿Que significa? — *Origen (origin)*
> Un **origen** es la combinacion de protocolo + dominio + puerto (por ejemplo `https://tunal.digital`). Sirve para que CORS sepa que es "lo mismo" y que es "otro". Llamar dentro del mismo origen no dispara CORS; cruzar de origen, si.

> ### 🟦 ¿Que significa? — *Proxy*
> Un **proxy** es un intermediario en el servidor: tu cliente le habla a el, y el reenvia la peticion al servicio real añadiendo el secreto. Sirve para ocultar la clave y esquivar CORS. El **Cloudflare Worker** de **tunal-digital** es exactamente eso: un proxy entre el navegador y la API de Claude.

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
> Un **Worker** es una funcion que corre en el servidor (en la red de Cloudflare), sin que tu administres una maquina. Sirve para tener "un pedacito de backend" barato y rapido. En **tunal-digital** el Worker es el unico que conoce la API key de Claude.

> ### 🟦 ¿Que significa? — *Variable de entorno*
> Una **variable de entorno** es un valor de configuracion (a menudo un secreto) que se inyecta fuera del codigo, segun el ambiente. Sirve para no escribir claves en el codigo ni subirlas a git. En **Faro** son `OPENAI_API_KEY`, etc.; en el Worker es `env.ANTHROPIC_API_KEY`.

> ### 🟦 ¿Que significa? — *.env y .gitignore*
> El archivo **.env** guarda las variables de entorno en tu maquina; **.gitignore** le dice a git que **no** suba ese archivo. Sirve para que tus secretos nunca lleguen al repositorio. Revisa siempre que `.env` este en `.gitignore`.

> ### ⚠️ Cuidado
> En Next.js (Faro), toda variable con el prefijo `NEXT_PUBLIC_` **se incrusta en el navegador y es publica**. Jamas pongas una API key con ese prefijo. Los secretos van en variables **sin** ese prefijo, que solo lee el servidor.

> ### 🟦 ¿Que significa? — *Rate limit (limite de peticiones)*
> Un **rate limit** es el tope de peticiones que un servicio te permite en un tiempo. Sirve para evitar abuso y costos disparados; al pasarte recibes `429`. En **tunal-digital** conviene limitar el chat para que un visitante no agote tu cuota de Anthropic.

> ### 🟦 ¿Que significa? — *Webhook*
> Un **webhook** es lo contrario a una llamada normal: en vez de que tu preguntes, el servicio te avisa enviando una peticion a una URL tuya cuando pasa algo. Sirve para reaccionar a eventos sin estar consultando. No es central en estos repos, pero es un termino que oiras seguido.

> ### 🟦 ¿Que significa? — *SDK*
> Un **SDK** (Software Development Kit) es una libreria oficial que envuelve una API para que la uses sin armar las peticiones HTTP a mano. Sirve para escribir menos y equivocarte menos. En **Faro** podrias usar el SDK de OpenAI; en el Worker, llamar a Anthropic via SDK o con `fetch` directo.

> ### 💡 Tip
> Uses fetch crudo o un SDK, el principio de seguridad no cambia: la inicializacion con la API key ocurre en el **servidor**. El SDK no te exime de cuidar el secreto.

---

## 8. Mapa mental del modulo

Asi se conecta todo lo que viste. Sigue las flechas como un mapa de metro:

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

Lee el mapa asi: el **cliente** nunca toca un secreto; siempre habla con **tu servidor** por `fetch`. Tu servidor, que si guarda las claves en **variables de entorno**, llama a las **APIs de IA** (con prompts y parametros como `temperature`), a **GitHub/Drive** (con **OAuth**, scopes y callback) y guarda lo necesario en **Supabase** con **RLS**. Si entiendes este dibujo, entiendes el modulo entero.

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

Cerramos el Modulo 08 sabiendo pedir datos a otros (APIs), autorizar accesos sin regalar contraseñas (OAuth) y conversar con modelos de IA con la cabeza fria sobre la **seguridad**. Hasta ahora tu "servidor" fue de alguien mas: Vercel, Cloudflare, Supabase.

En el **Modulo 09** das el salto a **tu propio servidor en casa**: un **NAS**. Lo veremos de la mano de **polypaw-nas** (Ubuntu + Samba para compartir archivos + Cockpit para administrarlo desde el navegador + Tailscale para llegar a el de forma segura desde fuera). Vas a entender que es una direccion IP, un puerto, un servicio que corre siempre, y como acceder a tus archivos desde cualquier lado sin abrir tu casa al mundo. Mucho de lo que aprendiste aqui (HTTP, headers, seguridad, variables de entorno) te va a sonar; ahora del otro lado del cable.

> Lo lograste, y se nota. Guarda este glosario cerquita: volveras a el mas seguido de lo que crees. Nos vemos en el Modulo 09 con las patitas listas para montar tu primer servidor. — Bit 🐾
```
