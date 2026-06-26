# Capitulo 07 — APIs REST y JSON a fondo

<p align="center">
  <img src="../../recursos/imagenes/08-apis-oauth-ia/cap07.png" alt="Ilustración del capítulo (pixel art con Bit)" width="640">
</p>


> Hola otra vez. Soy **Bit**, el ajolote que te acompana en este manual. En el modulo 03 conociste `fetch` y en el modulo 07 trabajaste con bases de datos. Hoy toca unir esas piezas: entender, ya en serio, que es una API REST, como se piden y se devuelven los datos, y por que el formato **JSON** aparece en todos lados. Vamos despacio y le ponemos nombre a cada palabra que parezca complicada. Al final veras como **Faro** conversa con GitHub y Google Drive, y como **tunal-digital** le habla a la IA de Claude. Tranquilo: esto es mas facil de lo que el nombre da a entender. Arrancamos.

## 1. Empecemos por la idea: cliente y servidor conversando

Cuando tu navegador pide una pagina, o tu app pide datos, hay siempre dos papeles en juego: alguien **pide** y alguien **responde**. Quien pide es el cliente; quien responde es el servidor. Y una **API** es, sencillamente, la lista de cosas que puedes pedir y la forma de pedirlas.

> ### 🟦 ¿Que significa? — *API*
> **API** son las siglas de *Application Programming Interface* (Interfaz de Programacion de Aplicaciones). Piensa en el **menu de un restaurante**: una lista de lo que puedes pedir y como pedirlo, sin que tengas que meterte a la cocina. Su trabajo es dejar que dos programas se hablen sin conocer las tripas del otro.
> **Donde se usa en un repo real:** Faro le pide la lista de repositorios de un usuario a la **API de GitHub**; jamas entra a los servidores de GitHub, solo usa el "menu" que GitHub publica.

> ### 🟦 ¿Que significa? — *Cliente y servidor*
> El **cliente** es quien hace la peticion (tu app, tu navegador). El **servidor** es el programa, que vive en otra computadora, que recibe esa peticion y devuelve una respuesta. La idea es repartir el trabajo: el cliente pinta la pantalla, el servidor guarda y entrega los datos.
> **Donde se usa en un repo real:** en **RachaSimple** (React + TypeScript + Supabase) el cliente es la app React en el navegador, y el servidor es Supabase, que guarda las rachas y valida el login.

> ### 💡 Tip
> Acostumbrate a decirlo en voz alta: "yo (cliente) pido X; el servidor me responde Y". Cuando tienes claro quien pide y quien responde, medio problema ya esta resuelto.

## 2. Que es REST, con calma

La palabra REST suena tecnica, pero detras hay una idea bastante tranquila: es **una forma de organizar** una API para que resulte predecible. En lugar de inventar un nombre distinto para cada operacion, REST propone algo simple: "todo es un **recurso** (una cosa), cada cosa tiene una **direccion (URL)**, y para actuar sobre ella usas unos pocos **verbos** estandar".

> ### 🟦 ¿Que significa? — *REST*
> **REST** (*Representational State Transfer*) es un **estilo** para disenar APIs sobre HTTP. No es una libreria ni un programa: es un acuerdo de buenas costumbres. Gracias a el, cualquier programador puede intuir como usar la API sin tener que memorizar mil casos especiales.
> **Donde se usa en un repo real:** la API de GitHub que consume **Faro** es REST: para ver un repo pides `GET /repos/usuario/proyecto`, y casi se lee como una frase normal.

> ### 🟦 ¿Que significa? — *HTTP*
> **HTTP** (*HyperText Transfer Protocol*) es el **idioma** con el que cliente y servidor se hablan en la web. Define como se ve una peticion y como se ve una respuesta. Vendria a ser la "gramatica" comun de internet.
> **Donde se usa en un repo real:** cuando **tunal-digital** envia el mensaje del chat al servidor, ese mensaje viaja por HTTP hasta el Cloudflare Worker.

> ### 🟦 ¿Que significa? — *Recurso*
> Un **recurso** es una "cosa" que la API maneja: un usuario, un repositorio, un archivo, un mensaje. Sirve para pensar la API como un conjunto de objetos que puedes identificar, y no como un monton de funciones sueltas.
> **Donde se usa en un repo real:** en **Faro**, un "repositorio" y un "archivo de Drive" son recursos; cada uno tiene su propia direccion para pedirlo.

### Los verbos de HTTP

REST se apoya en unos pocos **verbos** (tambien llamados metodos) para indicar que quieres hacer con un recurso.

> ### 🟦 ¿Que significa? — *Metodo HTTP (verbo)*
> Es la **accion** que pides sobre un recurso. Los mas habituales son: **GET** (leer), **POST** (crear o enviar), **PUT/PATCH** (actualizar) y **DELETE** (borrar). Con el verbo, el servidor entiende tu intencion sin que tengas que explicarsela con palabras.
> **Donde se usa en un repo real:** **Faro** usa `GET` para leer tus repos de GitHub; **tunal-digital** usa `POST` para mandarle el mensaje del usuario a la IA, porque esta "enviando datos" para que la IA responda.

> ### 💡 Tip
> Una regla mental que casi nunca falla: si solo quieres **mirar** datos, lo normal es `GET`. Si vas a **mandar** datos (un formulario, un mensaje de chat), suele ser `POST`.

## 3. Endpoints y rutas: las direcciones de la API

Cada recurso vive en una **direccion**. A esa direccion la llamamos **endpoint** o **ruta**.

> ### 🟦 ¿Que significa? — *Endpoint (ruta)*
> Un **endpoint** es una URL concreta de la API que hace **una sola cosa**. Es como la direccion de una casa: si tocas ahi, te atienden para ese asunto. Sirve para organizar la API en puntos de entrada claros.
> **Donde se usa en un repo real:** **Faro** llama al endpoint `https://api.github.com/user/repos` para traer la lista de repositorios del usuario conectado.

Una URL de API se lee por partes. Fijate en esta:

```
https://api.github.com/repos/edwar/Faro/contents/README.md
```

- `https://` → protocolo (HTTP seguro).
- `api.github.com` → el **host**: el servidor al que le hablamos.
- `/repos/edwar/Faro/contents/README.md` → la **ruta**: que recurso queremos.

> ### 🟦 ¿Que significa? — *Host*
> El **host** es el nombre del servidor al que envias la peticion (la parte que va despues de `https://` y antes de la primera `/`). Le dice a internet **a que computadora** debe entregar tu peticion.
> **Donde se usa en un repo real:** en **tunal-digital** el host de la IA es el del Cloudflare Worker; el navegador nunca habla directo con `api.anthropic.com` (ya veremos por que, y es por seguridad).

> ### 🔎 En tu codigo
> Cuando escribas `fetch("https://api.github.com/user/repos")`, ese texto largo **es** el endpoint. No hay magia: es la direccion exacta de la cosa que quieres. Cambia la ruta y pides otra cosa distinta.

## 4. Parametros de ruta y query params

A veces la direccion necesita un **dato variable**. Tienes dos maneras de pasarlo: dentro de la ruta, o pegado al final con `?`.

> ### 🟦 ¿Que significa? — *Parametro de ruta*
> Es un **trozo variable dentro de la ruta** que identifica un recurso concreto. En `/repos/edwar/Faro`, las partes `edwar` y `Faro` son parametros de ruta: dicen *de quien* y *cual* repo. Sirve para senalar un elemento especifico.
> **Donde se usa en un repo real:** **Faro** arma rutas como `/repos/{owner}/{repo}/contents` rellenando `owner` y `repo` con el proyecto que eligio el usuario.

> ### 🟦 ¿Que significa? — *Query params (parametros de consulta)*
> Son **opciones** que van al final de la URL despues de un `?`, en forma `clave=valor`, separadas por `&`. Sirven para filtrar, ordenar o paginar **sin cambiar el recurso** que pides. Es como decir "lo mismo, pero ordenado por fecha y de a 10".
> **Donde se usa en un repo real:** **Faro** puede pedir `GET /user/repos?sort=updated&per_page=20` para traer los repos ordenados por ultima actualizacion y de 20 en 20.

Veamoslos uno al lado del otro:

```
Parametro de ruta:   /repos/edwar/Faro
                              ^^^^^ ^^^^   (que recurso)

Query params:        /user/repos?sort=updated&per_page=20
                                  ^^^^^^^^^^^^ ^^^^^^^^^^^  (como lo quiero)
```

> ### 🟦 ¿Que significa? — *Filtrar*
> **Filtrar** es pedirle al servidor que te devuelva solo los datos que cumplen cierta condicion, en lugar de todos. Asi recibes menos datos y mas utiles. Lo normal es hacerlo con query params (por ejemplo `?state=open`).
> **Donde se usa en un repo real:** al revisar issues, **Faro** podria pedir solo las abiertas con `?state=open`, para no traerse tambien las cerradas.

> ### ⚠️ Cuidado
> Los query params quedan **a la vista en la URL**. Nunca metas ahi una clave secreta ni una contrasena: terminaria registrada en logs y en el historial del navegador. Los secretos viajan de otra forma, y lo veremos en la seccion de seguridad.

> ### 💡 Tip
> Los caracteres raros (espacios, acentos, `&`) hay que "escaparlos" en una URL. En JavaScript tienes `encodeURIComponent("texto con espacios")` para construir query params sin que se rompa la direccion.

## 5. El formato JSON, a fondo

Cuando el servidor responde, te manda los datos en un formato de texto. El mas usado hoy es **JSON**. Ya lo cruzaste de pasada; ahora vamos a entenderlo pieza por pieza.

> ### 🟦 ¿Que significa? — *JSON*
> **JSON** (*JavaScript Object Notation*) es un formato de **texto** para representar datos de manera ordenada: objetos con `{}`, listas con `[]`, pares `clave: valor`. Su gracia es que dos programas, escritos en cualquier lenguaje, pueden intercambiar datos que ambos entienden.
> **Donde se usa en un repo real:** **PolyPaw** (Python/Flet) guarda sus misiones y datos en archivos **JSON**; y la API de GitHub le responde a **Faro** en JSON.

Asi se ve un JSON (una respuesta simplificada de la API de GitHub):

```json
{
  "name": "Faro",
  "full_name": "edwar/Faro",
  "private": false,
  "stargazers_count": 12,
  "language": "TypeScript",
  "topics": ["nextjs", "supabase", "openai"],
  "owner": {
    "login": "edwar",
    "type": "User"
  }
}
```

Vamos a ponerle nombre a cada parte:

> ### 🟦 ¿Que significa? — *Objeto JSON*
> Un **objeto** es un grupo de datos entre llaves `{ }`, formado por **pares clave-valor**. La clave (a la izquierda de `:`) es un texto entre comillas; el valor (a la derecha) es el dato. Sirve para describir "una cosa" con sus propiedades.
> **Donde se usa en un repo real:** cada repositorio que **Faro** recibe de GitHub llega como un objeto con `name`, `language`, etc.

> ### 🟦 ¿Que significa? — *Clave y valor*
> La **clave** es el nombre de un dato (por ejemplo `"language"`); el **valor** es su contenido (por ejemplo `"TypeScript"`). Sirven para que cada dato tenga su etiqueta y no se confunda con los demas.
> **Donde se usa en un repo real:** **Faro** lee la clave `language` para mostrar en que lenguaje esta escrito cada proyecto.

> ### 🟦 ¿Que significa? — *Array (lista)*
> Un **array** es una lista ordenada de valores entre corchetes `[ ]`, separados por comas. Sirve para guardar varias cosas del mismo tipo (varios temas, varios archivos).
> **Donde se usa en un repo real:** en el JSON de arriba, `"topics": ["nextjs", "supabase", "openai"]` es un array con las etiquetas del proyecto.

> ### 🟦 ¿Que significa? — *Anidamiento*
> **Anidar** es meter un objeto o un array **dentro** de otro. En el ejemplo, `owner` es un objeto que vive dentro del objeto principal. Sirve para representar datos con estructura: una cosa que contiene a otra.
> **Donde se usa en un repo real:** **Faro** accede a `repo.owner.login` para saber de quien es el repositorio; ese `owner` esta anidado.

### Tipos de valor que admite JSON

JSON solo permite estos tipos de valor. Es una lista corta, vale la pena tenerla a mano:

- **Texto (string):** entre comillas dobles, ej `"Faro"`.
- **Numero:** sin comillas, ej `12` o `3.5`.
- **Booleano:** `true` o `false` (verdadero/falso), sin comillas.
- **Nulo:** `null` (significa "no hay valor").
- **Objeto:** `{ ... }`.
- **Array:** `[ ... ]`.

> ### ⚠️ Cuidado
> En JSON las claves **siempre** van entre comillas dobles `"`, nunca simples `'`. Y tampoco se permite una coma despues del ultimo elemento. Cualquiera de esos dos descuidos deja el JSON invalido, y el programa falla al intentar leerlo.

### De texto a objeto y de vuelta

JSON viaja como **texto**, pero en tu codigo lo quieres como **objeto** para poder usar `.name`, `.language`, etc. JavaScript trae dos funciones para hacer la conversion en ambos sentidos.

> ### 🟦 ¿Que significa? — *Serializar y parsear*
> **Serializar** es convertir un objeto de tu codigo en texto JSON (`JSON.stringify`). **Parsear** es el camino inverso: convertir texto JSON en un objeto que puedes usar (`JSON.parse`). Lo primero te sirve para enviar datos por la red (que viajan como texto) y lo segundo para trabajarlos comodo (como objeto).
> **Donde se usa en un repo real:** **tunal-digital** serializa el mensaje del usuario a JSON antes de enviarlo, y parsea la respuesta de la IA para mostrarla en el chat.

```javascript
// De objeto a texto JSON (para enviar):
const cuerpo = JSON.stringify({ mensaje: "Hola IA" });

// De texto JSON a objeto (al recibir):
const respuesta = await fetch("/api/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: cuerpo,
});
const datos = await respuesta.json(); // parsea el JSON por ti
console.log(datos.reply);             // ahora puedes usarlo como objeto
```

> ### 🔎 En tu codigo
> Mira bien el `await respuesta.json()`. Ese metodo `.json()` te ahorra el `JSON.parse`: agarra el texto de la respuesta y te lo devuelve como un objeto listo para usar. Por eso un par de lineas despues puedes escribir `datos.reply`.

> ### 🟦 ¿Que significa? — *Header (cabecera)*
> Un **header** es un dato extra que viaja junto a la peticion o a la respuesta, en forma `clave: valor`, para dar contexto (que formato envias, quien eres). Sirve para informar al servidor sin tener que meterlo dentro del cuerpo.
> **Donde se usa en un repo real:** **Faro** y **tunal-digital** mandan `Content-Type: application/json` para avisar "te estoy enviando JSON", mas un header de autorizacion para identificarse.

## 6. El contrato entre cliente y servidor

Aqui esta la idea mas importante del capitulo. Una API es un **contrato**: un acuerdo sobre que pide el cliente y que devuelve el servidor.

> ### 🟦 ¿Que significa? — *Contrato de API*
> Es el **acuerdo** sobre como se comunican cliente y servidor: que ruta llamar, que metodo usar, que datos enviar y que forma exacta tendra la respuesta. Gracias a el, cada lado puede trabajar por su cuenta confiando en lo que el otro prometio.
> **Donde se usa en un repo real:** **RachaSimple** confia en que Supabase Auth devolvera un objeto de sesion con cierta forma al hacer login; si esa forma cambiara, el login se romperia. Ese acuerdo es el contrato.

El contrato tiene dos caras: **la peticion** (lo que mandas) y **la respuesta** (lo que recibes). Y la respuesta trae un dato clave: el **codigo de estado**.

> ### 🟦 ¿Que significa? — *Codigo de estado (status code)*
> Es un **numero** que el servidor pone en la respuesta para contarte como le fue. Van por familias: **2xx** = exito, **4xx** = error del cliente (tu peticion estaba mal), **5xx** = error del servidor. Sirve para que reacciones bien sin tener que adivinar.
> **Donde se usa en un repo real:** si **Faro** recibe `401` de GitHub, eso significa "no autorizado" (token vencido); si recibe `200`, significa "aqui tienes tus datos".

Codigos que vas a ver una y otra vez:

- **200 OK** → todo bien, aqui esta la respuesta.
- **201 Created** → se creo el recurso (tras un `POST`).
- **400 Bad Request** → enviaste algo mal formado.
- **401 Unauthorized** → no te identificaste o tu credencial no sirve.
- **403 Forbidden** → te identificaste, pero no tienes permiso.
- **404 Not Found** → ese recurso no existe.
- **429 Too Many Requests** → pediste demasiado, demasiado rapido.
- **500 Internal Server Error** → algo se rompio del lado del servidor.

```javascript
const respuesta = await fetch("https://api.github.com/user/repos");

if (respuesta.ok) {                 // .ok es true si el status es 2xx
  const repos = await respuesta.json();
  console.log("Tengo", repos.length, "repos");
} else if (respuesta.status === 401) {
  console.error("Token invalido o vencido, hay que reconectar GitHub");
} else {
  console.error("Algo salio mal:", respuesta.status);
}
```

> ### 💡 Tip
> `respuesta.ok` es un atajo: vale `true` cuando el codigo es 2xx. Aun asi, mirar el numero exacto (como `401`) te permite darle al usuario un mensaje mucho mas util.

> ### ⚠️ Cuidado
> Ojo con esto: `fetch` **no lanza error** cuando el servidor responde 404 o 500. Para `fetch`, recibir una respuesta de error sigue siendo "recibir una respuesta". Por eso te toca mirar `respuesta.ok` o `respuesta.status` a mano. No des por hecho que llegaste sano al `await respuesta.json()` solo porque nada exploto.

## 7. Versionado de APIs

Las APIs cambian con el tiempo. Para no dejar tirado a quien ya las usa, se **versionan**.

> ### 🟦 ¿Que significa? — *Versionado de API*
> Es marcar la API con un numero o una fecha de version (por ejemplo `/v1/`) para que los cambios nuevos no rompan el codigo viejo. Asi la API puede evolucionar sin abandonar a quienes ya integraron la version anterior.
> **Donde se usa en un repo real:** la API de Claude que usa **tunal-digital** se identifica con una version (un header tipo `anthropic-version` con una fecha); de ese modo el Worker sabe con que "edicion" del contrato esta hablando.

La version te la vas a encontrar de dos formas tipicas:

- **En la ruta:** `https://miapi.com/v1/usuarios` (la `v1` salta a la vista).
- **En un header:** un encabezado como `anthropic-version: 2023-06-01`.

> ### 💡 Tip
> Cuando abras la documentacion de una API, lo primero es fijarte que version estas mirando. Un ejemplo de `/v1/` no se comportara igual si la doc que tienes abierta es la de `/v2/`.

## 8. Paginacion

Si pides "todos los repos" y resulta que hay 5000, el servidor no te los suelta de golpe: te los entrega **por paginas**. Eso es paginar.

> ### 🟦 ¿Que significa? — *Paginacion*
> Es partir un resultado grande en **trozos (paginas)** y entregarlos poco a poco. Asi no se satura la red ni la memoria, y la app carga rapido. Suele controlarse con query params como `page` y `per_page`.
> **Donde se usa en un repo real:** **Faro** pide los repos de GitHub paginados (`?per_page=30&page=1`, luego `page=2`...) para no descargarse cientos de repos de una sola vez.

> ### 🟦 ¿Que significa? — *per_page y page*
> `per_page` dice **cuantos elementos** quieres por pagina; `page` dice **que pagina** pides. Juntos te dejan recorrer un resultado grande en partes manejables.
> **Donde se usa en un repo real:** **Faro** usa `per_page` para limitar el tamano de cada lote y `page` para avanzar al siguiente.

```javascript
// Traer la pagina 2, de 30 en 30:
const url = "https://api.github.com/user/repos?per_page=30&page=2";
const repos = await (await fetch(url)).json();
```

> ### 🟦 ¿Que significa? — *Rate limit (limite de peticiones)*
> Es el **maximo de peticiones** que la API te permite en cierto tiempo. Existe para proteger al servidor de abusos. Si te pasas, te responde `429`.
> **Donde se usa en un repo real:** por su filosofia de **refresco bajo demanda**, **Faro** analiza solo cuando el usuario lo pide; eso ayuda a no pegarle de mas a GitHub y a respetar su rate limit.

> ### ⚠️ Cuidado
> No montes un bucle que pida pagina tras pagina sin freno: puedes chocar contra el rate limit (`429`) o agotar tu cuota. Pide solo lo que vas a mostrar, y justo cuando lo necesitas.

## 9. Leer la documentacion de una API

Nadie se aprende las APIs de memoria: se **leen**. La documentacion (las "docs") es el manual de instrucciones, y saber leerla es una de las habilidades mas utiles que te llevas de este capitulo.

> ### 🟦 ¿Que significa? — *Documentacion (docs)*
> Es el **manual** que publica quien hace la API: la lista de endpoints, los metodos, los parametros, ejemplos de peticion y de respuesta. Te dice exactamente que pedir y que esperar, sin tener que adivinar.
> **Donde se usa en un repo real:** para integrar la IA, **tunal-digital** sigue la documentacion de la API de Claude/Anthropic; para los repos, **Faro** sigue la documentacion de la API de GitHub.

Cuando abras unas docs, ve buscando en este orden:

1. **El endpoint:** la URL y el metodo (`GET /user/repos`).
2. **Autenticacion:** como te identificas (casi siempre con un header).
3. **Parametros:** de ruta y query params, y cuales son obligatorios.
4. **Ejemplo de peticion:** copialo y adaptalo.
5. **Ejemplo de respuesta:** mira la forma del JSON para saber que claves vas a leer.
6. **Errores:** que codigos puede devolver y que significa cada uno.

> ### 💡 Tip
> Casi todas las docs traen un "ejemplo con `curl`". `curl` es una herramienta de linea de comandos para hacer peticiones. Aunque tu vayas a usar `fetch`, el ejemplo de `curl` te ensena la URL, el metodo y los headers exactos: solo te toca traducirlo mentalmente a tu `fetch`.

## 10. Las APIs que consumen Faro y tunal-digital

Juntemos todo lo visto con los repos reales.

**Faro / Organizer** (Next.js + React + TypeScript + Supabase + OpenAI) consume **tres** APIs:

- **API de GitHub:** lee tus repositorios, archivos y actividad. Es REST, responde JSON, se pagina con `per_page`/`page` y requiere un token para identificarte.
- **API de Google Drive:** lee tus documentos de proyecto. Tambien REST + JSON, tambien con autorizacion.
- **API de OpenAI:** con los datos ya leidos, genera la descripcion, el estado, el progreso y el roadmap de cada proyecto. Se le envia (`POST`) la informacion y devuelve (en JSON) el texto generado.

**tunal-digital** (HTML/CSS/JS vanilla) consume la **API de Claude/Anthropic** para su chat de IA, pero con un detalle de seguridad que conviene subrayar: el navegador no llama a Anthropic directamente. Llama a un **Cloudflare Worker**, y es el Worker el que llama a la IA.

> ### 🟦 ¿Que significa? — *Cloudflare Worker*
> Es un **pequeno programa que corre en el servidor** (dentro de la red de Cloudflare), no en el navegador del usuario. Hace de intermediario: recibe la peticion del cliente, le anade la clave secreta y reenvia la llamada a la API real.
> **Donde se usa en un repo real:** en **tunal-digital**, el chat envia el mensaje al Worker; el Worker, que ya esta en el servidor, le agrega la clave de la API de Claude y hace la llamada. La clave nunca toca el navegador.

```
[Navegador / chat]  --POST mensaje-->  [Cloudflare Worker]  --con la clave-->  [API de Claude]
        ^                                      |
        |------------ respuesta JSON ----------|
```

> ### 🔎 En tu codigo
> El mismo patron lo veras en **Faro**: el navegador habla con las rutas de la propia app (que viven en el servidor de Next.js), y es **el servidor** quien guarda los tokens y llama a GitHub, Drive y OpenAI. El cliente nunca llega a ver los secretos.

## 11. Seguridad: las claves viven en el servidor, jamas en el cliente

Esta seccion es la mas importante de todas. Leela dos veces. Es la regla de oro de Faro y de cualquier proyecto que se tome en serio.

> ### 🟦 ¿Que significa? — *Clave de API / secreto*
> Es una **credencial** (un texto largo) que te identifica ante una API y que suele dar acceso a tu cuenta o a recursos de pago. Autoriza tus peticiones, y justo por eso es **secreta**: quien la tenga puede actuar en tu nombre.
> **Donde se usa en un repo real:** la clave de la API de Claude en **tunal-digital** y la clave de OpenAI en **Faro** son secretos; cada una vive en el servidor (el Worker, las variables de entorno de Faro).

> ### 🟦 ¿Que significa? — *Variable de entorno*
> Es un valor de configuracion (por ejemplo una clave secreta) que se guarda **fuera del codigo**, en el entorno donde corre el servidor. Asi no escribes los secretos en los archivos ni los subes a GitHub sin querer.
> **Donde se usa en un repo real:** **Faro** guarda sus claves y tokens en variables de entorno del servidor y en la tabla `user_connections` protegida con **RLS** (*Row Level Security*: una regla de la base de datos que hace que cada usuario solo pueda leer sus propias filas); nunca en el codigo del cliente.

> ### ⚠️ Cuidado
> **El codigo que llega al navegador es publico.** Cualquiera puede abrir las herramientas de desarrollo y leerlo entero. Si pones una clave de API en el JavaScript del cliente, basicamente la estas **regalando**. Por eso tunal-digital usa un Worker y Faro usa el servidor: para que la clave nunca baje al navegador.

> ### ⚠️ Cuidado
> Nunca metas secretos en query params (`?api_key=...`): quedan en logs e historial. Nunca los escribas dentro del codigo fuente. Nunca los subas a GitHub. Y si una clave se llega a filtrar, **revocala y genera una nueva** de inmediato.

> ### 🔎 En tu codigo
> El patron seguro es siempre el mismo: el **cliente** llama a **tu servidor** (una ruta propia o un Worker) → **tu servidor** anade el secreto y llama a la **API externa** → la respuesta vuelve al cliente sin el secreto. Si en algun momento te dan ganas de meter la clave en el front, frena: ese es exactamente el error que este patron viene a evitar.

> ### 💡 Tip
> Una buena senal de que vas por buen camino: abres el codigo del navegador con las herramientas de desarrollo y **no** encuentras ninguna clave secreta por ningun lado.

## ✅ Checklist — ¿ya domino esto?

- [ ] Puedo explicar con mis palabras que es una API usando la metafora del menu.
- [ ] Distingo quien es el **cliente** y quien el **servidor** en una peticion.
- [ ] Se que REST es un **estilo** y reconozco los verbos `GET`, `POST`, `PUT/PATCH`, `DELETE`.
- [ ] Leo una URL de API y senalo el host, la ruta, los parametros de ruta y los query params.
- [ ] Distingo un **parametro de ruta** de un **query param** y se para que sirve cada uno.
- [ ] Leo un JSON e identifico objetos, arrays, claves, valores y anidamiento.
- [ ] Recuerdo los tipos de valor de JSON y que las claves van entre comillas dobles.
- [ ] Se la diferencia entre `JSON.stringify` (serializar) y `JSON.parse` / `.json()` (parsear).
- [ ] Entiendo que una API es un **contrato** y se que es un codigo de estado (2xx, 4xx, 5xx).
- [ ] Recuerdo que `fetch` no lanza error en 404/500 y que debo revisar `respuesta.ok`.
- [ ] Se que es versionado, paginacion (`page`/`per_page`) y rate limit (`429`).
- [ ] Se por donde empezar a leer la documentacion de una API.
- [ ] Puedo explicar por que las claves van en el **servidor** (Worker / variables de entorno) y nunca en el cliente.

## 🧪 Ejercicios

1. **Lee la URL.** Toma `https://api.github.com/repos/edwar/Faro/issues?state=open&per_page=10`. Por escrito, identifica: host, ruta, parametros de ruta, query params, y di que metodo HTTP usarias para *leer* esas issues.

2. **Disena el contrato.** Imagina un endpoint para el cotizador de **tunal-digital** que recibe un servicio y devuelve un precio. Describe en una hoja: metodo, ruta, que JSON envia el cliente y que JSON devuelve el servidor (con sus claves y tipos).

3. 💻 **Parsea un JSON.** Copia el JSON del repositorio de la seccion 5 en un archivo `.js` dentro de una variable como texto entre comillas. Usa `JSON.parse` y muestra en consola `name`, el primer elemento de `topics` y `owner.login`.

4. 💻 **Maneja estados.** Escribe una funcion `pedirRepos()` que haga `fetch` a `https://api.github.com/users/edwar/repos`, y que imprima mensajes distintos segun `respuesta.ok`, `respuesta.status === 404` y otros errores. Comprueba que **no** asumes exito sin revisarlo.

5. 💻 **Construye query params con seguridad.** Escribe una funcion que reciba un texto de busqueda y arme una URL con un query param `?q=...` usando `encodeURIComponent`. Pruebala con un texto que tenga espacios y acentos, y verifica que la URL no se rompe.

6. **Caza el riesgo de seguridad.** Te muestran este codigo del navegador: `fetch("https://api.anthropic.com/v1/messages", { headers: { "x-api-key": "sk-secreto-123" } })`. Explica por escrito que esta mal, que podria pasar, y como lo arreglarias usando el patron de **tunal-digital** (Cloudflare Worker).

> Lo lograste. Hoy desarmaste una API REST pieza por pieza: recursos, rutas, parametros, JSON, el contrato y, sobre todo, la regla sagrada de la seguridad. Cuando en los proximos capitulos veamos OAuth y la IA con detalle, vas a reconocer estas piezas por todos lados. Nos vemos en el siguiente. — Bit 🐾
