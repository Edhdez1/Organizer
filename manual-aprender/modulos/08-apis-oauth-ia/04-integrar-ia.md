# Capítulo 04 — Integrar IA

> Integrar inteligencia artificial en una app suena a ciencia ficción, pero —ya lo intuyes— es
> **consumir una API** (capítulo 02) cuyo servicio es un modelo de IA. Tu sitio ya lo hace con
> Claude; Faro, con OpenAI. Aquí entiendes cómo, y cómo pedirle bien las cosas a un modelo.

---

## 1. Un modelo de IA es una API más (con un detalle)

> ### 🟦 ¿Qué significa? — *Modelo de lenguaje (LLM)*
> Un **modelo de lenguaje grande** (*Large Language Model*, LLM) es un programa de IA, entrenado
> con enormes cantidades de texto, capaz de **entender y generar lenguaje**: responder preguntas,
> resumir, redactar, clasificar. **Claude** (de Anthropic) y los modelos **GPT** (de OpenAI) son
> LLMs. No "saben" como una base de datos: **predicen** texto coherente a partir de lo que les
> das.

> ### 🟦 ¿Qué significa? — *Consumir un LLM por su API*
> Usas un LLM igual que cualquier API (capítulo 02): haces un **POST** a su endpoint, con tu
> **clave de API** en los headers y, en el **body**, el **prompt** (lo que le pides) más opciones
> (qué modelo, cuánto puede responder). Te devuelve la respuesta en JSON. Eso es todo: tu chat es,
> en esencia, un `fetch` POST a Claude.

> ### 🟦 ¿Qué significa? — *Modelo (model)*
> Al llamar a la API eliges **qué modelo** usar. Suele haber varios, equilibrando capacidad,
> velocidad y costo: por ejemplo Claude tiene modelos más potentes (tipo "Opus") y otros más
> rápidos y económicos (tipo "Haiku"). **Tu sitio usa `claude-haiku-4-5`**: un modelo rápido y
> barato, suficiente para un chat de bienvenida, y que te ayuda a **controlar el gasto**.

---

## 2. El prompt: cómo se le pide a un LLM

> ### 🟦 ¿Qué significa? — *Prompt*
> El **prompt** es **el texto con el que le pides algo** a un modelo: tu instrucción + el
> contexto. La calidad de la respuesta depende muchísimo de la calidad del prompt. A escribir
> buenos prompts se le llama **"ingeniería de prompts"** (prompt engineering), y es una habilidad
> en sí misma.

> ### 🟦 ¿Qué significa? — *Prompt de sistema (system prompt)*
> Muchas APIs separan dos cosas:
> - El **system prompt**: instrucciones de fondo que definen **el papel y las reglas** del
>   asistente ("Eres el asistente de Tunal Digital. Responde breve, en español, sobre nuestros
>   servicios. No inventes precios.").
> - El **mensaje del usuario**: lo que la persona escribe en el chat.
> Tu Worker arma ambos: pone un system prompt fijo (la personalidad de tu bot) y le añade el
> mensaje del visitante. Por eso tu chat "sabe" de qué hablar y mantiene el tono.

> ### 💡 Tip — Cómo escribir un buen prompt (lo que este manual te dio)
> Un buen prompt es **específico** y **da contexto**, justo la habilidad que perseguías:
> - Di **el rol** ("actúa como…"), **el formato** ("responde en una lista de 3 puntos"), **el
>   tono** y **los límites** ("máximo 50 palabras", "no inventes datos").
> - Da **ejemplos** si puedes (mostrarle uno o dos ejemplos de lo que quieres se llama
>   *few-shot*; tu Worker usa esta técnica).
> Vago: "háblame de marketing". Preciso: "En 3 viñetas y tono cercano, explica a un dueño de
> tienda por qué necesita un sitio web. Máximo 60 palabras. No menciones precios."

---

## 3. Cómo viaja una pregunta del chat (uniendo todo)

```
1. Escribes en el chat de tunaldigital.com y pulsas enviar.
2. main.js hace un fetch POST a tu Cloudflare Worker, con tu mensaje en el body (JSON).
3. El Worker (servidor) añade el system prompt y llama a la API de Claude,
   con la CLAVE secreta (que vive solo en el Worker, nunca en la página).
4. Claude responde; el Worker te devuelve el texto.
5. main.js muestra la respuesta en pantalla (manipulando el DOM, Módulo 03).
```

Cada flecha es algo que ya sabes: `fetch`, JSON, async/await, headers, claves de API, DOM. La IA
no era magia: era una API bien orquestada y protegida.

> ### 🔎 En tu código
> Faro usa la API de **OpenAI** (`src/lib/openai.ts`) de la misma forma, pero para otra tarea:
> le manda el README y los datos de un proyecto y le pide que **resuma** su estado, progreso y
> roadmap, devolviendo **JSON estructurado**. Es el mismo patrón (prompt → respuesta), aplicado a
> analizar en vez de chatear.

> ### 🟦 ¿Qué significa? — *Token (en el contexto de IA) y por qué importa el costo*
> En IA, un **token** es un trocito de texto (más o menos una palabra o parte de ella). Las APIs
> de LLM **cobran por tokens** (los que envías + los que genera). Por eso importan los límites: tu
> Worker corta el largo de los mensajes y limita el uso, para que el chat sea útil **sin
> dispararte la factura** (tu sitio tiene un tope de gasto mensual). Controlar tokens = controlar
> costo.

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Entiendo que un **LLM** se consume como cualquier **API** (POST + clave + prompt).
- [ ] Sé qué es un **modelo** y por qué elegir uno rápido/barato (Haiku) controla el gasto.
- [ ] Sé qué es un **prompt** y un **system prompt**, y cómo escribir uno bueno (específico, con rol/formato/límites).
- [ ] Puedo narrar cómo viaja una pregunta del chat de mi sitio (navegador → Worker → Claude → vuelta).
- [ ] Entiendo qué es un **token** en IA y su relación con el **costo**.

---

## 🧪 Ejercicios

1. **De vago a preciso.** Reescribe este prompt para que sea bueno: "escribe algo sobre mi
   negocio". (Inventa rol, formato, tono y un límite de palabras.)
2. **System vs. usuario.** Da un ejemplo de system prompt para un bot que ayuda a reservar citas,
   y un ejemplo de mensaje de usuario.
3. **El flujo.** ¿Por qué la clave de Claude vive en el Worker y no en `main.js`? (Une con el
   capítulo 02.)
4. **Costo.** Explica por qué limitar el largo de los mensajes ayuda a controlar la factura de la
   IA.
5. **Tarea distinta.** Faro no chatea: pide a la IA un **resumen en JSON**. Inventa un prompt que
   le pida resumir un proyecto en un JSON con campos `descripcion` y `siguiente_accion`.

➡️ Siguiente: **[Capítulo 05 — Construir y proteger una API](05-construir-y-proteger.md)**.
