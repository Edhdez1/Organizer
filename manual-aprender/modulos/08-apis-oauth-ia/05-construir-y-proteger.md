# Capítulo 05 — Construir y proteger una API

> Hasta ahora **consumiste** APIs ajenas. Ahora ves la otra cara: cómo tus apps **ofrecen** su
> propia API (su backend) y, sobre todo, cómo **protegerla**. Cierras el módulo entendiendo el
> backend de Faro y los Workers de tu sitio.

---

## 1. Por qué tu app necesita su propia API (un backend)

Recuerda dos lecciones: las **claves secretas** no pueden estar en el frontend (capítulo 02), y
la **seguridad** vive en el servidor (Módulo 07). Por eso tu app necesita un "intermediario"
propio del lado servidor: tu propia API.

> ### 🟦 ¿Qué significa? — *Construir una API (exponer endpoints)*
> Construir una API es escribir **código que corre en un servidor** y responde a peticiones HTTP
> en ciertos **endpoints**. El navegador (frontend) llama a **tu** API; **tu** API, con sus
> secretos a salvo, hace el trabajo pesado (hablar con la base de datos, con Claude, con GitHub) y
> devuelve un resultado limpio.

> ### 🟦 ¿Qué significa? — *Las dos formas que usan tus proyectos*
> - **Rutas de API en Next.js** (Faro): archivos dentro de `src/app/api/`. Cada carpeta es un
>   endpoint que corre **en el servidor**. Por ejemplo, `src/app/api/ai/analyze/` recibe una
>   petición, llama a OpenAI con la clave secreta (a salvo en el servidor) y devuelve el análisis.
> - **Cloudflare Workers** (tunal-digital): pequeños programas que corren "en el borde" de la red
>   de Cloudflare. Tu `worker.js` es tu API para el chat: recibe el mensaje, llama a Claude y
>   responde. Ligero y sin servidor que mantener.
> Las dos son "tu backend"; difieren en dónde corren, pero el concepto es el mismo.

> ### 🟦 ¿Qué significa? — *Serverless ("sin servidor")*
> Suena contradictorio: **sí** hay servidores, pero **tú no los administras**. Subes tu función
> (una ruta de Next.js en Vercel, o un Worker en Cloudflare) y la plataforma la ejecuta cuando
> llega una petición, escalando sola. "Serverless" = tú pones el código, ellos ponen (y cuidan)
> el servidor. Es lo que permite que tus apps tengan backend sin que mantengas máquinas. (En el
> Módulo 09 verás el otro extremo: administrar **tu propio** servidor, el NAS.)

---

## 2. Cómo proteger tu API (lo esencial)

Una API abierta al mundo recibe abusos. Estas son las defensas que usan tus proyectos:

> ### 🟦 ¿Qué significa? — *Verificación de origen (CORS)*
> **CORS** (*Cross-Origin Resource Sharing*) controla **qué sitios web** pueden llamar a tu API
> desde el navegador. Tu Worker verifica que la petición venga de `tunaldigital.com` y no de un
> sitio cualquiera que quiera usar tu chat (y tu factura de IA). Es poner un portero que revisa de
> dónde vienes.

> ### 🟦 ¿Qué significa? — *Rate limiting (límite de tasa)*
> Limitar **cuántas peticiones** acepta tu API de un mismo usuario/IP en un tiempo dado. Evita que
> alguien haga miles de llamadas para saturarte o gastarte el presupuesto. Tu Worker hace rate
> limiting **por IP**. (Es la otra cara del 429 que viste en el capítulo 02: ahora tú lo aplicas.)

> ### 🟦 ¿Qué significa? — *Validación de entrada*
> **Nunca confíes en lo que llega** del cliente: revisa que los datos tengan el formato esperado
> antes de usarlos (que el mensaje no sea gigantesco, que el correo sea válido). En el Módulo 07
> viste que RachaSimple valida con **Zod** antes de tocar la base de datos. Validar en el servidor
> es seguridad real (el frontend solo valida por comodidad).

> ### 🟦 ¿Qué significa? — *Tope de gasto*
> Como las APIs de IA cuestan dinero, una protección extra es un **límite de gasto**: cortar el
> servicio si se supera cierto costo mensual. Tu chat tiene un tope (~$10/mes) para que un abuso
> no se convierta en una factura enorme. Defensa de negocio, no solo técnica.

---

## 3. El panorama completo: las dos caras

```
              TU APP (frontend, en el navegador)
                        │  fetch (Módulo 03)
                        ▼
   TU API / BACKEND  (ruta Next.js o Cloudflare Worker)   ← aquí viven los SECRETOS
     · verifica origen (CORS) · rate limit · valida entrada · tope de gasto
                        │
        ┌───────────────┼────────────────┐
        ▼               ▼                ▼
   Base de datos     API de IA       APIs externas
   (Supabase/RLS)   (Claude/OpenAI)  (GitHub, Drive)
```

Tu frontend nunca habla directo con los secretos: pasa por **tu** backend, que es la única puerta
y la que aplica todas las defensas. Esta arquitectura —que tú ya tienes en tus proyectos— es la
forma profesional y segura de construir apps conectadas.

---

## 4. Cierre del módulo

```
APIs, OAuth e IA
├── Qué es una API: contrato entre programas, REST, endpoints   (cap. 01)
├── Consumir: fetch, headers, claves de API, variables de entorno (cap. 02)
├── OAuth: acceso/login sin dar la contraseña, tokens            (cap. 03)
├── Integrar IA: LLM como API, prompts, control de costo         (cap. 04)
└── Construir y proteger: backend propio, CORS, rate limit, secretos (cap. 05)
```

Ya entiendes cómo tus apps **hablan con el mundo** de forma segura: la pieza que conecta todo lo
anterior (frontend, datos, lógica) con servicios poderosos como la IA. Solo queda un módulo, y es
distinto: tu propio **servidor en casa**, el NAS.

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Entiendo por qué una app necesita su **propia API/backend** (esconder secretos, seguridad).
- [ ] Distingo **rutas de API de Next.js** (Faro) de **Cloudflare Workers** (tu sitio).
- [ ] Sé qué es **serverless** ("tú el código, ellos el servidor").
- [ ] Conozco las defensas: **CORS** (origen), **rate limiting**, **validación de entrada**, **tope de gasto**.
- [ ] Visualizo la arquitectura: frontend → mi backend (con defensas y secretos) → datos/IA/APIs.

---

## 🧪 Ejercicios

1. **Por qué un backend.** Explica por qué el chat no puede llamar a Claude **directamente** desde
   `main.js` y necesita el Worker en medio.
2. **CORS.** ¿Qué problema evita la verificación de origen en tu Worker? Da un ejemplo de abuso
   que frena.
3. **Rate limit.** Relaciona el rate limiting que **tú** aplicas con el estado **429** que viste
   al consumir APIs ajenas (capítulo 02).
4. **Serverless.** Explica con tus palabras por qué "serverless" no significa "sin servidores".
5. **Diseña defensas.** Vas a abrir una API que resume textos con IA. Lista 4 protecciones que le
   pondrías y por qué.

---

🎉 **¡Terminaste el Módulo 08 — APIs, OAuth e IA!** Con esto cierras toda la parte de
**programación**: ya entiendes, de punta a punta, cómo están hechas tus cuatro apps y cómo dar
órdenes precisas sobre ellas. Felicidades: ese era el objetivo central del manual. Queda un
módulo final, dedicado a tu **servidor NAS** y las redes.

➡️ Siguiente módulo: **[09 — NAS y servidores](../09-nas-y-servidores/README.md)** *(en preparación)*.
