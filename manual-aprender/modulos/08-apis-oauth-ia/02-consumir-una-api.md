# Capítulo 02 — Consumir una API

<p align="center">
  <img src="../../recursos/imagenes/08-apis-oauth-ia/cap02.png" alt="Ilustración del capítulo (pixel art con Bit)" width="640">
</p>


> "Consumir" una API es usarla desde tu código: hacerle peticiones y leer lo que te responde.
> Lo bueno es que la herramienta ya la conoces (`fetch`, del Módulo 03). Aquí la combinamos con
> headers, métodos y **claves de API**, que es la parte nueva.

---

## 1. La petición más simple: un GET con fetch

Acuérdate de `fetch`, del Módulo 03. Consumir una API GET es justo eso:

```js
async function verUsuario() {
  const respuesta = await fetch("https://api.github.com/users/Edhdez1");
  const datos = await respuesta.json();   // de JSON a objeto
  console.log(datos.name, datos.public_repos);
}
```

Léelo en voz alta: "pide a este endpoint (espera), pasa la respuesta de JSON a objeto (espera) y
úsala". Ya lo hiciste con la API de GitHub en el Módulo 03. Eso **es** consumir una API.

> ### 🟦 ¿Qué significa? — *Consumir vs. exponer una API*
> - **Consumir** una API = ser el cliente: tú le pides cosas (lo de este capítulo).
> - **Exponer** una API = ser el servidor: tú la ofreces para que otros pidan (capítulo 05).
> En este módulo verás las dos caras.

---

## 2. Enviar datos: POST con body y headers

Cuando quieres **crear** algo, usas POST y mandas los datos en el **body**, y de paso avisas en
qué formato van con un **header**:

```js
const respuesta = await fetch("https://api.ejemplo.com/proyectos", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ nombre: "Mi proyecto", fase: "idea" })
});
```

> ### 🟦 ¿Qué significa? — *Las opciones de fetch (método, headers, body)*
> El segundo argumento de `fetch` es un objeto con opciones:
> - `method`: el verbo HTTP (`POST`, `PUT`, `DELETE`…). Si no lo pones, asume `GET`.
> - `headers`: las cabeceras. `"Content-Type": "application/json"` avisa "te mando JSON".
> - `body`: los datos que envías. Se convierten a texto JSON con `JSON.stringify` (Módulo 03).
> ¿Te suena? Es la "anatomía de una petición" del capítulo anterior, ahora escrita en código.

> ### 🔎 En tu código
> El chat de tu sitio (`main.js`) hace un `fetch` **POST** al Cloudflare Worker y mete tu mensaje
> en el `body` como JSON. El Worker se lo pasa a Claude y te devuelve la respuesta. Es exactamente
> este patrón.

---

## 3. Claves de API: identificarte ante el servicio

La mayoría de las APIs **no son abiertas**: te piden una credencial para usarlas. Así saben quién
eres, controlan el uso y, si toca, te cobran.

> ### 🟦 ¿Qué significa? — *Clave de API (API key) y token*
> Una **clave de API** (o **token**) es un texto secreto, único para ti, que mandas en cada
> petición para **identificarte** ante la API. Normalmente viaja en un header de autorización:
> ```js
> headers: { "Authorization": "Bearer sk-tu-clave-secreta" }
> ```
> `Bearer` ("portador") es el esquema habitual: "quien lleva este token es el autorizado".
> Las APIs de OpenAI, de Claude y muchas más funcionan así: si tu clave no es válida, te rechazan
> con un estado 401 ("no autorizado").

> ### ⚠️ Cuidado — Las claves de API son SECRETAS (esto es crucial)
> Una clave de API normalmente da acceso de pago a tu cuenta. Si alguien la consigue, puede gastar
> tu dinero. Son reglas que no se negocian (ya las viste en Git y en Supabase; aquí solo se
> confirman):
> 1. **Nunca** la escribas directamente en el código del frontend (cualquiera la vería en el
>    navegador).
> 2. **Nunca** la subas a GitHub (queda en el historial para siempre).
> 3. Guárdala en **variables de entorno** del **servidor** (`.env.local`, excluido por
>    `.gitignore`) y haz las llamadas desde ahí.
> Por esto mismo tu chat usa un **Cloudflare Worker**: la clave de Claude vive en el Worker
> (servidor), nunca en la página. El navegador habla con tu Worker, y tu Worker habla con Claude.

> ### 🟦 ¿Qué significa? — *Variable de entorno*
> Una **variable de entorno** es un valor de configuración (por ejemplo, una clave secreta) que se
> guarda **fuera del código**, en el entorno donde corre el programa (el servidor, Vercel, el
> Worker). Así el código dice "usa la clave que está en la variable `OPENAI_API_KEY`" sin que la
> clave aparezca escrita en ningún archivo que se suba. Faro tiene un `.env.local.example` que
> lista qué variables necesita, pero sin los valores reales.

---

## 4. Manejar la respuesta y los errores

> ### 🟦 ¿Qué significa? — *Revisar el estado de la respuesta*
> Una API puede responderte con un error (401 sin clave, 404 no existe, 429 demasiadas
> peticiones). Por eso conviene revisar antes de usar los datos:
> ```js
> const r = await fetch(url, opciones);
> if (!r.ok) {            // r.ok es true si el estado es 200-299
>   console.log("Error:", r.status);
>   return;
> }
> const datos = await r.json();
> ```
> `r.ok` y `r.status` (¿te acuerdas de los códigos del Módulo 00?) te dicen si todo salió bien.
> Y envuelve todo en `try/catch` (Módulo 03) por si la red falla.

> ### 🟦 ¿Qué significa? — *Límite de tasa (rate limit)*
> Las APIs ponen un tope a cuántas peticiones puedes hacer por minuto o por día, para no saturarse.
> Si te pasas, te responden **429** ("demasiadas peticiones"). Por eso las apps serias cuidan su
> ritmo. Tu Worker de Claude tiene su propio rate limiting **por IP**, para que nadie abuse de tu
> chat y te dispare la factura.

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Consumo una API GET con `fetch` + `.json()` (lo del Módulo 03).
- [ ] Hago un POST con `method`, `headers` (`Content-Type`) y `body` (`JSON.stringify`).
- [ ] Sé qué es una **clave de API / token** y que va en el header `Authorization: Bearer`.
- [ ] **Nunca** pongo claves en el frontend ni en GitHub; van en **variables de entorno** del servidor.
- [ ] Entiendo por qué el chat usa un **Worker** (para esconder la clave de Claude).
- [ ] Reviso `r.ok`/`r.status` y conozco el **rate limit** (429).

---

## 🧪 Ejercicios

1. **GET.** Escribe el `fetch` que pide `https://api.github.com/users/Edhdez1/repos` y muestra
   cuántos repos llegaron (pista: la respuesta es un array; usa `.length`).
2. **POST.** Escribe el `fetch` para crear un hábito enviando `{ nombre: "Leer", meta: 20 }` en
   el body, con el header de tipo JSON.
3. **Seguridad.** Tu compañero pegó la clave de OpenAI directamente en un archivo `.js` del
   frontend. Lista tres razones por las que está mal y cómo debe hacerse.
4. **Estados.** ¿Qué significan, al llamar a una API, los estados 401, 404 y 429? ¿Qué harías en
   cada caso?
5. 💻 **Encadena.** Cuando puedas, escribe una función que pida tus repos de GitHub y muestre el
   nombre del primero. Revisa `r.ok` antes de leer los datos.

➡️ Siguiente: **[Capítulo 03 — OAuth: login con terceros](03-oauth.md)**.
