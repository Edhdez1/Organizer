# Capítulo 05 — Datos, JSON y fetch

> Cerramos JavaScript con cómo se manejan **colecciones de datos** (listas y objetos), el
> formato **JSON** (que usan PolyPaw y todas las APIs) y cómo **pedir datos a internet** con
> `fetch`. Esto último es justo lo que hace el chat con IA de tu sitio.

---

## 1. Arrays: listas de cosas

> ### 🟦 ¿Qué significa? — *Array (arreglo / lista)*
> Un **array** es una **lista ordenada** de valores, escrita entre corchetes `[ ]` y separada
> por comas. Sirve para guardar varias cosas en una sola variable:
> ```javascript
> const servicios = ["Diseño web", "IA", "Marketing"];
> const numeros = [10, 25, 4, 99];
> ```

> ### 🟦 ¿Qué significa? — *Índice (acceder a un elemento)*
> Cada elemento tiene una **posición** numérica llamada **índice**, que **empieza en 0**:
> ```javascript
> servicios[0]   // "Diseño web"  (el primero)
> servicios[2]   // "Marketing"   (el tercero)
> servicios.length   // 3  (cuántos elementos hay)
> ```
> (¿Recuerdas que los bucles empezaban en 0? Es por esto.)

> ### 🟦 ¿Qué significa? — *Métodos útiles de array*
> Los arrays traen "funciones incorporadas" (métodos) muy usadas:
> ```javascript
> servicios.push("SEO");        // añade al final
> servicios.includes("IA");     // true/false: ¿está en la lista?
> servicios.forEach((s) => {    // ejecuta algo por cada elemento
>   console.log(s);
> });
> ```
> `forEach` es un bucle más legible: "para cada servicio `s`, haz esto". Recorrer listas así es
> pan de cada día en la web (mostrar productos, hábitos, mensajes…).

---

## 2. Objetos: datos con etiquetas

> ### 🟦 ¿Qué significa? — *Objeto*
> Un **objeto** agrupa datos relacionados usando **etiquetas** (llamadas *propiedades* o
> *claves*) en lugar de posiciones. Se escribe entre llaves `{ }`:
> ```javascript
> const usuario = {
>   nombre: "Edwar",
>   edad: 25,
>   activo: true
> };
> ```
> Cada par es `clave: valor`. Mientras un array es "una fila de cosas", un objeto es "una ficha
> con campos".

> ### 🟦 ¿Qué significa? — *Acceder a propiedades*
> Se accede con un **punto** y el nombre de la propiedad:
> ```javascript
> usuario.nombre     // "Edwar"
> usuario.edad       // 25
> usuario.edad = 26; // también se puede cambiar
> ```

> ### 💡 Tip — Arrays y objetos se combinan
> Lo normal es mezclarlos: una **lista de objetos**. Por ejemplo, los hábitos de RachaSimple o
> las misiones de PolyPaw son arrays de objetos:
> ```javascript
> const habitos = [
>   { nombre: "Leer",      hecho: true },
>   { nombre: "Ejercicio", hecho: false }
> ];
> habitos[0].nombre   // "Leer"
> ```

---

## 3. JSON: el idioma para intercambiar datos

> ### 🟦 ¿Qué significa? — *JSON*
> **JSON** (*JavaScript Object Notation*) es un **formato de texto** para guardar e intercambiar
> datos, basado en la forma de los objetos y arrays de JavaScript. Es el idioma estándar con el
> que las apps y los servidores se pasan información.
> ```json
> {
>   "nombre": "Edwar",
>   "servicios": ["Diseño web", "IA"],
>   "activo": true
> }
> ```
> Se parece muchísimo a un objeto de JavaScript. Diferencia clave: en JSON **las claves van
> entre comillas dobles** y solo admite datos (no funciones).
> **¿Dónde se usa en tu proyecto?** **PolyPaw** guarda TODAS sus misiones y la base de datos del
> usuario en archivos `.json` (`missions/*.json`, `polypaw_db.json`). Y cada vez que una web
> habla con una API, los datos viajan en JSON.

> ### 🟦 ¿Qué significa? — *Convertir entre texto JSON y objetos*
> Como JSON es **texto**, para usarlo en JavaScript hay que convertirlo a objeto, y viceversa:
> - `JSON.parse(texto)` → convierte texto JSON **a** objeto de JavaScript (para usarlo).
> - `JSON.stringify(objeto)` → convierte un objeto **a** texto JSON (para enviarlo o guardarlo).
> ```javascript
> const texto = '{"nombre":"Edwar"}';
> const obj = JSON.parse(texto);      // ahora obj.nombre es "Edwar"
> const otraVez = JSON.stringify(obj); // vuelve a texto
> ```

---

## 4. Pedir datos a internet: `fetch` y `async/await`

Aquí conectamos con el Módulo 00: el navegador (cliente) le pide datos a un servidor. En
JavaScript eso se hace con `fetch`.

> ### 🟦 ¿Qué significa? — *`fetch` (pedir/traer)*
> `fetch(url)` hace una **petición HTTP** a una dirección y trae la respuesta. Es cómo tu código
> habla con una API (un servidor que entrega datos).

> ### 🟦 ¿Qué significa? — *Operación asíncrona*
> Pedir algo a internet **toma tiempo** (puede tardar segundos). Una operación **asíncrona** es
> una que no da el resultado al instante: el programa la "encarga" y sigue, y el resultado llega
> después. Es como pedir comida a domicilio: no te quedas congelado en la puerta; haces otras
> cosas y avisan cuando llega.

> ### 🟦 ¿Qué significa? — *`async` y `await`*
> Para trabajar con operaciones asíncronas de forma legible se usan dos palabras:
> - `async` marca una función como asíncrona (que hará esperas).
> - `await` ("espera") pausa **dentro** de esa función hasta que el resultado llegue, sin
>   congelar el resto de la página.
> ```javascript
> async function cargarDatos() {
>   const respuesta = await fetch("https://api.ejemplo.com/datos");
>   const datos = await respuesta.json();   // convierte la respuesta JSON a objeto
>   console.log(datos);
> }
> cargarDatos();
> ```
> Se lee: "pide los datos (espera a que lleguen), conviértelos de JSON a objeto (espera), y
> muéstralos". El `await respuesta.json()` es el `JSON.parse` de las respuestas web.

> ### 🟦 ¿Qué significa? — *Promesa (promise)*
> Por debajo, `fetch` devuelve una **promesa**: un "vale" que representa un resultado que
> **llegará en el futuro**. `await` es, en la práctica, "espera a que la promesa se cumpla y
> dame el valor". No necesitas dominar las promesas a fondo todavía; con `async/await` te
> alcanza para empezar.

> ### ⚠️ Cuidado — Manejar errores con try/catch
> Una petición puede fallar (sin internet, servidor caído). Se protege con `try/catch`:
> ```javascript
> async function cargarDatos() {
>   try {
>     const respuesta = await fetch("https://api.ejemplo.com/datos");
>     const datos = await respuesta.json();
>     console.log(datos);
>   } catch (error) {
>     console.log("Algo falló:", error);
>   }
> }
> ```
> `try` intenta el código; si algo revienta, salta al `catch` en vez de romper toda la página.

> ### 🔎 En tu código
> El **chat con IA** de tu sitio (`main.js`) hace exactamente esto: con `fetch` envía tu mensaje
> al Cloudflare Worker, `await` espera la respuesta de Claude, la convierte de JSON y la muestra
> en pantalla manipulando el DOM. Faro hace lo mismo para hablar con GitHub, Drive y OpenAI.
> ¡Ya entiendes la pieza central de tus apps!

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Uso **arrays** (`[ ]`), accedo por **índice** (desde 0) y uso `length`, `push`, `forEach`.
- [ ] Uso **objetos** (`{ clave: valor }`) y accedo con punto.
- [ ] Entiendo qué es **JSON** y `JSON.parse` / `JSON.stringify`.
- [ ] Sé qué es una operación **asíncrona** y para qué sirven `async`/`await`.
- [ ] Pido datos con **`fetch`** y convierto la respuesta con `.json()`.
- [ ] Protejo las peticiones con **`try/catch`**.

---

## 🧪 Ejercicios

1. **Array.** Crea un array `colores` con tres colores y muestra el segundo por su índice. ¿Qué
   índice tiene?
2. **Objeto.** Crea un objeto `producto` con `nombre`, `precio` y `disponible`. Accede al precio.
3. **JSON.** ¿Cuál es la diferencia entre `JSON.parse` y `JSON.stringify`? Da un caso de uso de
   cada uno.
4. **Asíncrono.** Explica con la analogía de la comida a domicilio por qué `fetch` necesita
   `await` y no congela la página.
5. 💻 **Una API real.** En la consola, prueba:
   ```javascript
   async function probar() {
     const r = await fetch("https://api.github.com/users/Edhdez1");
     const d = await r.json();
     console.log(d.name, d.public_repos);
   }
   probar();
   ```
   (Pide datos públicos de tu propio usuario de GitHub y muestra tu nombre y nº de repos.)

---

🎉 **¡Terminaste el Módulo 03 — JavaScript!** Ya programas de verdad: datos, decisiones, bucles,
funciones, manipulación del DOM y peticiones a internet. Con esto entiendes el `main.js` de tu
sitio **completo**. Y, lo más importante, tienes la base para los dos módulos que vienen
(TypeScript y React), que son JavaScript llevado más lejos.

➡️ Siguiente módulo: **[04 — Python](../04-python/README.md)** *(en preparación)*.
