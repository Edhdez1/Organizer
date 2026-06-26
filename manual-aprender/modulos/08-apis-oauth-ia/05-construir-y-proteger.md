# Capítulo 05 — Construir y proteger una API

> Hasta aquí estuviste del lado del que **consume** APIs de otros. Ahora le damos la vuelta: vas a
> ver cómo tus propias apps **ofrecen** su API (su backend) y, lo más importante, cómo
> **protegerla**. Cerramos el módulo entendiendo el backend de Faro y los Workers de tu sitio.

---

## 1. Por qué tu app necesita su propia API (un backend)

Vale la pena recordar dos cosas que ya viste: las **claves secretas** no pueden vivir en el
frontend (capítulo 02), y la **seguridad** se decide en el servidor (Módulo 07). De ahí sale la
necesidad de tener un "intermediario" propio del lado del servidor: tu propia API.

> ### 🟦 ¿Qué significa? — *Construir una API (exponer endpoints)*
> Construir una API es escribir **código que corre en un servidor** y responde a peticiones HTTP en
> ciertos **endpoints**. El navegador (frontend) llama a **tu** API; **tu** API, que guarda los
> secretos a buen recaudo, hace el trabajo pesado (hablar con la base de datos, con Claude, con
> GitHub) y devuelve un resultado limpio.

> ### 🟦 ¿Qué significa? — *Las dos formas que usan tus proyectos*
> - **Rutas de API en Next.js** (Faro): archivos dentro de `src/app/api/`. Cada carpeta es un
>   endpoint que corre **en el servidor**. Por ejemplo, `src/app/api/ai/analyze/` recibe una
>   petición, llama a OpenAI con la clave secreta (a salvo en el servidor) y devuelve el análisis.
> - **Cloudflare Workers** (tunal-digital): programitas que corren "en el borde" de la red de
>   Cloudflare. Tu `worker.js` es la API del chat: recibe el mensaje, llama a Claude y responde.
>   Ligero y sin servidor que mantener.
> Las dos son "tu backend". Cambian en dónde corren, pero la idea de fondo es la misma.

> ### 🟦 ¿Qué significa? — *Serverless ("sin servidor")*
> Suena a contradicción: **sí** hay servidores, lo que pasa es que **tú no los administras**. Subes
> tu función (una ruta de Next.js en Vercel, o un Worker en Cloudflare) y la plataforma la ejecuta
> cuando llega una petición, y escala sola. "Serverless" viene a ser: tú pones el código, ellos
> ponen (y cuidan) el servidor. Eso es justo lo que permite que tus apps tengan backend sin que
> tengas que mantener máquinas. (En el Módulo 09 verás el otro extremo: administrar **tu propio**
> servidor, el NAS.)

---

## 2. Cómo proteger tu API (lo esencial)

Una API abierta al mundo tarde o temprano recibe abusos. Estas son las defensas que ya usan tus
proyectos:

> ### 🟦 ¿Qué significa? — *Verificación de origen (CORS)*
> **CORS** (*Cross-Origin Resource Sharing*) decide **qué sitios web** pueden llamar a tu API desde
> el navegador. Tu Worker comprueba que la petición venga de `tunaldigital.com` y no de cualquier
> sitio que quiera aprovecharse de tu chat (y de tu factura de IA). Es como poner un portero que
> revisa de dónde vienes.

> ### 🟦 ¿Qué significa? — *Rate limiting (límite de tasa)*
> Limitar **cuántas peticiones** acepta tu API de un mismo usuario o IP en un rato dado. Así evitas
> que alguien lance miles de llamadas para saturarte o vaciarte el presupuesto. Tu Worker aplica
> rate limiting **por IP**. (Es la otra cara del 429 que viste en el capítulo 02: ahora el que lo
> aplica eres tú.)

> ### 🟦 ¿Qué significa? — *Validación de entrada*
> **Nunca te fíes de lo que llega** del cliente: revisa que los datos tengan el formato que esperas
> antes de usarlos (que el mensaje no sea gigantesco, que el correo sea válido). En el Módulo 07
> viste que RachaSimple valida con **Zod** antes de tocar la base de datos. Validar en el servidor
> es seguridad de verdad; el frontend solo valida por comodidad.

> ### 🟦 ¿Qué significa? — *Tope de gasto*
> Como las APIs de IA cuestan dinero, una protección extra es ponerles un **límite de gasto**:
> cortar el servicio si se pasa de cierto costo mensual. Tu chat tiene un tope (~$10/mes) para que
> un abuso no termine en una factura enorme. Es una defensa de negocio, no solo técnica.

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

Tu frontend nunca habla directo con los secretos: todo pasa por **tu** backend, que es la única
puerta y la que aplica todas las defensas. Esta arquitectura —que ya tienes montada en tus
proyectos— es la forma profesional y segura de construir apps conectadas.

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

Ya entiendes cómo tus apps **hablan con el mundo** de forma segura: esa es la pieza que conecta
todo lo anterior (frontend, datos, lógica) con servicios potentes como la IA. Solo queda un módulo,
y es de otra naturaleza: tu propio **servidor en casa**, el NAS.

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
2. **CORS.** ¿Qué problema evita la verificación de origen en tu Worker? Da un ejemplo de abuso que
   frena.
3. **Rate limit.** Relaciona el rate limiting que **tú** aplicas con el estado **429** que viste al
   consumir APIs ajenas (capítulo 02).
4. **Serverless.** Explica con tus palabras por qué "serverless" no significa "sin servidores".
5. **Diseña defensas.** Vas a abrir una API que resume textos con IA. Lista 4 protecciones que le
   pondrías y por qué.

---

🎉 **¡Terminaste el Módulo 08 — APIs, OAuth e IA!** Con esto cierras toda la parte de
**programación**: ya entiendes, de punta a punta, cómo están hechas tus cuatro apps y cómo dar
órdenes precisas sobre ellas. Felicidades: ese era el objetivo central del manual. Queda un módulo
final, dedicado a tu **servidor NAS** y las redes.

➡️ Siguiente módulo: **[09 — NAS y servidores](../09-nas-y-servidores/README.md)** *(en preparación)*.
