# Módulo 08 — APIs, OAuth e IA

<p align="center">
  <img src="../../recursos/imagenes/08-apis-oauth-ia/portada.png" alt="Bit en un puente que conecta dos edificios (API), con una llave que cruza una puerta vigilada (OAuth) y un robot-cerebro (IA)" width="640">
</p>

> **Objetivo del módulo:** entender cómo las apps **se comunican con otros servicios**: pedir
> datos a una **API**, dejar que el usuario inicie sesión con Google/GitHub (**OAuth**) e
> integrar **inteligencia artificial**. Es lo que hace especiales a Faro y al chat de tu sitio.

Hasta ahora tus apps eran "islas". Aquí aprenden a **hablar con el mundo**: GitHub, Google
Drive, OpenAI, Claude. Es el módulo que convierte una app en algo realmente poderoso.

---

## ¿De dónde sale esto en TUS proyectos?

- **Faro** consume la **API de GitHub** (tus repos), la de **Google Drive** (tus carpetas) y la
  de **OpenAI** (para analizar proyectos). Usa **OAuth** para que inicies sesión con Google y
  GitHub.
- **tunal-digital** integra la **API de Claude** (el chat con IA) mediante un Cloudflare Worker,
  con seguridad (verificación de origen, límite de uso).

---

## ¿Qué vas a poder hacer al terminar?

- Explicar qué es una **API** y cómo se consume (uniendo `fetch` del Módulo 03).
- Entender las **claves de API** y cómo se guardan de forma segura.
- Comprender el flujo de **OAuth** (login con terceros) sin que te asuste.
- Integrar un servicio de **IA** y escribir un buen *prompt*.
- Saber cómo se construye una **API propia** (rutas de Next.js, Workers) y protegerla.

---

## Capítulos

| # | Capítulo | Qué cubre |
|---|---|---|
| 01 | [¿Qué es una API?](01-que-es-una-api.md) | API, REST, endpoints, contrato entre programas |
| 02 | [Consumir una API](02-consumir-una-api.md) | `fetch`, métodos, headers, claves de API |
| 03 | [OAuth: login con terceros](03-oauth.md) | El flujo, tokens, Google/GitHub en Faro |
| 04 | [Integrar IA](04-integrar-ia.md) | Llamar a Claude/OpenAI, prompts, el chat de tu sitio |
| 05 | [Construir y proteger una API](05-construir-y-proteger.md) | Rutas Next.js, Workers, secretos, límites |
| 06 | [HTTP a fondo](06-http-a-fondo.md) | Métodos, códigos de estado, cabeceras, body |
| 07 | [APIs REST y JSON a fondo](07-rest-y-json-a-fondo.md) | Recursos, endpoints, query params, paginación |
| 08 | [fetch a fondo y errores](08-fetch-y-errores.md) | `response.ok`, errores de red, reintentos, timeouts |
| 09 | [Autenticación: claves y tokens](09-autenticacion-y-claves.md) | API keys, Bearer, secretos en el servidor |
| 10 | [OAuth a fondo](10-oauth-a-fondo.md) | Flujo de código, scopes, callback, refresco |
| 11 | [Integrar IA a fondo](11-integrar-ia-a-fondo.md) | LLM, roles de mensajes, tokens, parámetros |
| 12 | [Prompting y respuestas estructuradas](12-prompting-y-datos.md) | Buenos prompts, salida JSON, alucinaciones |
| 13 | [Construir tu propia API](13-construir-tu-api.md) | Route handlers, Workers, validar, CORS, proxy |
| 14 | [Mini-proyecto: tu proxy de IA](14-mini-proyecto-proxy-ia.md) | Un backend que esconde tu clave secreta |
| 15 | [Glosario de APIs, OAuth e IA](15-glosario-apis.md) | Todos los términos + mapa mental |

> ✅ **Módulo 08 — versión ampliada (capítulos 01–15, ~100 páginas).**

➡️ Empieza por **[Capítulo 01 — ¿Qué es una API?](01-que-es-una-api.md)**.
