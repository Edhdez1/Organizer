# Capítulo 01 — ¿Qué es una API?

> La palabra "API" suena técnica e intimidante, pero la idea es de lo más cotidiana. Cuando la
> entiendas, verás APIs por todas partes: son cómo los programas se piden cosas entre sí. Ya
> tienes media batalla ganada con el modelo cliente–servidor del Módulo 00.

---

## 1. La idea: cómo dos programas se piden cosas

Imagina un restaurante. Tú (cliente) no entras a la cocina a cocinar: le dices al **mesero** lo
que quieres, él lo lleva a la cocina y te trae el plato. El mesero es un **intermediario** con
un **menú** de lo que puedes pedir y reglas de cómo pedirlo. Eso es una API.

> ### 🟦 ¿Qué significa? — *API*
> **API** significa *Application Programming Interface* ("interfaz de programación de
> aplicaciones"). Es un **conjunto de reglas y "puntos de entrada"** que un programa ofrece para
> que **otros programas** le pidan datos o acciones, sin saber cómo funciona por dentro.
> En la analogía: el **menú + el mesero**. Tú pides del menú (las funciones disponibles) y
> recibes el plato (la respuesta), sin entrar a la cocina (el código interno).

> ### 💡 Tip — Por qué las APIs lo cambian todo
> Gracias a las APIs, tu app no tiene que hacerlo todo. ¿Quieres mapas? Usas la API de Google
> Maps. ¿Pagos? La API de Stripe. ¿IA? La API de Claude. **Te montas sobre el trabajo de otros**,
> como bloques. Faro no "tiene" tus repos: se los **pide** a la API de GitHub. Es la diferencia
> entre construir todo desde cero y ensamblar piezas potentes.

---

## 2. APIs web y REST

Hay muchos tipos de API; la más común en la web es la **API REST**.

> ### 🟦 ¿Qué significa? — *API web*
> Una **API web** es una API a la que se accede **por internet**, usando HTTP (Módulo 00). Tu app
> hace una petición HTTP a una dirección, y la API responde, normalmente con datos en **JSON**
> (Módulo 03). Es, literalmente, el modelo cliente–servidor aplicado entre programas.

> ### 🟦 ¿Qué significa? — *REST*
> **REST** es un **estilo** muy usado para diseñar APIs web. No te agobies con la sigla; lo
> importante es su idea: organizar la API alrededor de **recursos** (cosas como "usuarios",
> "repos", "proyectos"), cada uno con su **dirección**, y usar los **métodos HTTP** que ya
> conoces (GET para leer, POST para crear, etc.). Una API que sigue ese estilo se llama "RESTful".

> ### 🟦 ¿Qué significa? — *Endpoint (punto de acceso)*
> Un **endpoint** es **una dirección concreta** de la API para una cosa específica. Por ejemplo,
> en la API de GitHub:
> - `https://api.github.com/users/Edhdez1` → tus datos de usuario.
> - `https://api.github.com/users/Edhdez1/repos` → tus repositorios.
> Cada endpoint es un "plato del menú". Combinas el endpoint (qué recurso) con el método HTTP
> (qué hacer con él).

---

## 3. Anatomía de una llamada a una API

Cuando tu app llama a una API, la petición tiene varias partes (todas ya las viste sueltas):

> ### 🟦 ¿Qué significa? — *Las partes de una petición a una API*
> - **URL/endpoint**: a dónde (`https://api.github.com/users/Edhdez1`).
> - **Método**: qué hacer (`GET`, `POST`…).
> - **Headers (cabeceras)**: información extra de la petición; aquí suele ir la **autenticación**
>   (tu clave/token) y el formato.
> - **Body (cuerpo)**: los datos que envías (en POST/PUT), normalmente en JSON.
> - **Respuesta**: lo que devuelve la API: un **código de estado** (200, 404…) y un **body** con
>   los datos en JSON.

> ### 🟦 ¿Qué significa? — *Header (cabecera)*
> Un **header** es un par "nombre: valor" que acompaña a la petición o respuesta con metadatos:
> qué formato esperas, quién eres (autenticación), etc. Por ejemplo
> `Authorization: Bearer TU_TOKEN` le dice a la API "soy yo, aquí está mi credencial". Lo verás
> en el capítulo 02.

---

## 4. La documentación: el "menú" de cada API

> ### 🟦 ¿Qué significa? — *Documentación de una API*
> Cada API publica su **documentación**: el "menú" que explica qué endpoints tiene, qué métodos
> aceptan, qué hay que enviar y qué devuelven. Aprender a **leer la documentación** de una API es
> una habilidad clave: no memorizas APIs, las consultas. Cuando uses una API nueva, lo primero es
> buscar "[nombre] API docs".

> ### 🔎 En tu código
> Faro tiene, en `src/app/api/`, **endpoints propios** (su propia API) y, en `src/lib/`, código
> que **consume APIs ajenas**: `github.ts` (API de GitHub), `google-drive.ts` (API de Drive),
> `openai.ts` (API de OpenAI). Es decir, Faro **es cliente** de unas APIs **y servidor** de la
> suya. Las dos caras que verás en este módulo.

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Explico qué es una **API** con la analogía del restaurante (menú + mesero).
- [ ] Entiendo qué es una **API web** y, a grandes rasgos, el estilo **REST**.
- [ ] Sé qué es un **endpoint** (una dirección para un recurso).
- [ ] Reconozco las partes de una petición: URL, método, **headers**, body, respuesta.
- [ ] Sé qué es un **header** y que la autenticación suele ir ahí.
- [ ] Entiendo que se **lee la documentación** de cada API, no se memoriza.

---

## 🧪 Ejercicios

1. **La analogía.** Explica con el restaurante qué representan: el menú, el mesero, la cocina y
   el plato, en términos de una API.
2. **Endpoints.** Inventa dos endpoints REST para una API de una biblioteca (recursos: libros,
   autores). Di qué método HTTP usarías para "ver todos los libros" y para "agregar un libro".
3. **Partes.** Para "crear un proyecto en Faro", ¿qué método HTTP sería y dónde irían los datos
   del proyecto (en qué parte de la petición)?
4. **Cliente y servidor.** Explica la frase: "Faro es cliente de la API de GitHub y servidor de
   su propia API".
5. 💻 **Abre una API real.** En el navegador, entra a `https://api.github.com/users/Edhdez1`.
   Verás JSON crudo: esa es la respuesta de un endpoint GET, sin app de por medio.

➡️ Siguiente: **[Capítulo 02 — Consumir una API](02-consumir-una-api.md)**.
