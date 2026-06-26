# Capitulo 06 — El DOM a fondo

<p align="center">
  <img src="../../recursos/imagenes/03-javascript/cap06.png" alt="Ilustración del capítulo (pixel art con Bit)" width="640">
</p>


> Hola, soy Bit, tu ajolote guia. En el capitulo pasado aprendimos a *encontrar* elementos en la pagina y a *escuchar* clics. Hoy damos un salto: vamos a **crear** elementos nuevos con codigo, **colocarlos** donde queramos, **borrarlos**, **movernos** por el arbol de la pagina y **leer o cambiar** sus atributos. Para cerrar, armaremos pedazos de HTML a partir de datos, tal como lo hace `main.js` en el sitio real `tunal-digital`. Tranquilo, que iremos paso a pasito. 🟦

## 1. Recordando que es el DOM (en una frase)

Cuando el navegador carga una pagina HTML, no se queda con el texto plano: lo convierte en un **arbol de objetos** que JavaScript puede tocar. Ese arbol es el DOM.

> ### 🟦 ¿Que significa? — *DOM (Document Object Model)*
> Es la representacion en memoria de tu pagina HTML como un **arbol de objetos**. Cada etiqueta (`<div>`, `<p>`, `<button>`...) se convierte en un **nodo** que puedes leer y modificar desde JavaScript.
> **Para que sirve:** te deja cambiar la pagina *despues* de cargada, sin recargar nada (crear una tarjeta, ocultar un menu, mostrar un mensaje).
> **Donde se usa en un repo real:** en `tunal-digital`, el archivo `main.js` toca el DOM a cada rato: abre el menu movil, pinta las respuestas del chat de IA y muestra mensajes del formulario de contacto.

> ### 🟦 ¿Que significa? — *Nodo*
> Es cada "pieza" del arbol del DOM. La mayoria de las piezas que vas a tocar son **nodos de elemento** (una etiqueta HTML), aunque tambien existen nodos de texto y de comentario.
> **Para que sirve:** pensar en "nodos" te ayuda a ver el DOM como una jerarquia de piezas conectadas (padres, hijos, hermanos), y no como una lista plana.
> **Donde se usa:** cada vez que `tunal-digital` agrega una burbuja de chat, esta creando un nodo de elemento nuevo.

> ### 🟦 ¿Que significa? — *Elemento*
> Es un nodo que corresponde a una etiqueta HTML concreta, por ejemplo un `<button>` o un `<article>`. En JavaScript lo manejas como un objeto con propiedades (`.textContent`, `.className`) y metodos (`.append()`, `.remove()`).
> **Para que sirve:** es la pieza que vas a crear, mover, leer y borrar la mayor parte del tiempo.
> **Donde se usa:** las tarjetas de proyecto que veras en `Faro/Organizer` son, dentro del navegador, elementos del DOM generados a partir de datos.

## 2. Crear elementos con `createElement`

Hasta ahora solo *buscabamos* cosas que ya estaban en el HTML. Toca fabricarlas desde cero.

> ### 🟦 ¿Que significa? — *createElement*
> Es un metodo de `document` que **fabrica un elemento nuevo** del tipo que le pidas, pero todavia *fuera* de la pagina (en memoria). Mas adelante tu decides donde colocarlo.
> **Para que sirve:** crear contenido dinamico: una tarjeta, un parrafo, un boton, una fila de tabla.
> **Donde se usa:** en `tunal-digital`, cuando llega la respuesta del chat de IA, se crea un elemento nuevo para la burbuja del mensaje antes de mostrarla.

```javascript
// Fabricamos un parrafo nuevo (todavia no aparece en pantalla)
const parrafo = document.createElement("p");

// Le ponemos texto
parrafo.textContent = "Hola, soy un parrafo creado con JavaScript";

// Le ponemos una clase de CSS
parrafo.className = "mensaje";
```

> ### 🟦 ¿Que significa? — *textContent*
> Es una propiedad que representa **el texto que hay dentro** de un elemento. Si la lees, obtienes ese texto; si le asignas un valor, reemplazas el contenido.
> **Para que sirve:** poner o leer texto de forma segura, sin que el navegador interprete etiquetas HTML.
> **Donde se usa:** el `main.js` de `tunal-digital` usa `textContent` para mostrar el texto del usuario en el chat, de modo que nadie pueda colar HTML malicioso.

> ### 🟦 ¿Que significa? — *innerHTML*
> Es una propiedad que representa, en forma de texto, **el contenido HTML** que hay dentro de un elemento. A diferencia de `textContent`, si le asignas algo con etiquetas (`<b>hola</b>`), el navegador las **interpreta** y las convierte en elementos reales.
> **Para que sirve:** leer o reemplazar de golpe el HTML interno de un elemento (por ejemplo, vaciar un contenedor con `contenedor.innerHTML = ""`).
> **Donde se usa:** en `tunal-digital`, antes de pintar resultados nuevos se limpia el contenedor con `innerHTML = ""` para no acumular contenido viejo.

> ### 🟦 ¿Que significa? — *XSS (Cross-Site Scripting)*
> Es un tipo de ataque en el que alguien consigue **inyectar codigo malicioso** (casi siempre JavaScript) dentro de una pagina, aprovechando que esa pagina mete texto sin filtrar en el HTML.
> **Para que sirve (saberlo):** te recuerda por que `textContent` es seguro y por que `innerHTML` puede ser peligroso cuando el texto viene de un usuario.
> **Donde se usa:** en `tunal-digital`, el chat usa `textContent` para el mensaje del usuario justamente para evitar un XSS.

> ### ⚠️ Cuidado
> Existe tambien `innerHTML`, que **si interpreta etiquetas HTML**. Es comodo, pero peligroso: si metes dentro de `innerHTML` texto que escribio un usuario, podrias dejar pasar codigo malicioso (un ataque llamado XSS). La regla de Bit es sencilla: para texto plano usa `textContent`; deja `innerHTML` solo para contenido que tu mismo controlas.

> ### 🟦 ¿Que significa? — *className*
> Es una propiedad que guarda **las clases CSS** de un elemento como un solo texto. Si le asignas un valor, cambias todas sus clases de golpe.
> **Para que sirve:** darle estilo al elemento que acabas de crear, reaprovechando tu CSS.
> **Donde se usa:** al crear burbujas de chat en `tunal-digital`, se asigna una clase distinta segun si el mensaje es del usuario o de la IA.

## 3. Insertar elementos: `append`, `prepend` y compania

Crear un elemento no lo hace aparecer. Hay que **colgarlo del arbol**, dentro de otro elemento que ya este en la pagina.

> ### 🟦 ¿Que significa? — *append*
> Es un metodo que mete uno o varios elementos (o texto) **al final** de los hijos de un elemento padre.
> **Para que sirve:** agregar contenido nuevo despues de lo que ya hay (por ejemplo, una burbuja de chat al final de la conversacion).
> **Donde se usa:** `tunal-digital` hace `append` de cada burbuja nueva dentro del contenedor del chat para que aparezca hasta abajo.

```javascript
// Suponemos que existe <div id="chat"></div> en el HTML
const chat = document.getElementById("chat");

const burbuja = document.createElement("div");
burbuja.className = "burbuja burbuja--ia";
burbuja.textContent = "Listo, ya analice tu proyecto.";

// Colgamos la burbuja al final del chat: ahora SI aparece
chat.append(burbuja);
```

> ### 🟦 ¿Que significa? — *Elemento padre / elemento hijo*
> En el arbol del DOM, un elemento que contiene a otros es el **padre**, y los que estan dentro son sus **hijos**. Es la misma idea de carpetas y archivos.
> **Para que sirve:** saber quien contiene a quien para insertar en el lugar correcto.
> **Donde se usa:** en `tunal-digital`, el `<div id="chat">` es el padre y cada burbuja es un hijo.

> ### 🟦 ¿Que significa? — *prepend*
> Funciona igual que `append`, pero inserta **al principio**, por delante de los demas hijos.
> **Para que sirve:** mostrar lo mas nuevo arriba (por ejemplo, las notificaciones recientes primero).
> **Donde se usa:** vendria bien en un panel como el de `Faro/Organizer` si quisieras mostrar el ultimo proyecto analizado en la parte superior de la lista.

> ### 💡 Tip
> `append` acepta varios argumentos de una sola vez: `padre.append(titulo, descripcion, boton)`. Y tambien acepta texto suelto: `padre.append("Hola ", nombreEspan)`. Menos lineas, mismo resultado.

> ### 🟦 ¿Que significa? — *insertBefore*
> Es un metodo mas antiguo que inserta un elemento **justo antes** de otro hijo concreto que tu le indiques. Se escribe asi: `padre.insertBefore(nuevo, referencia)`.
> **Para que sirve:** colocar un elemento en una posicion exacta del medio, no solo al inicio o al final.
> **Donde se usa:** cuando necesitas precision; en codigo moderno casi siempre basta con `append`/`prepend`, pero te toparas con `insertBefore` en proyectos antiguos.

## 4. Eliminar elementos con `remove`

Lo que se crea, a veces se borra: cerrar una notificacion, quitar una tarjeta, limpiar un error.

> ### 🟦 ¿Que significa? — *remove*
> Es un metodo que **saca un elemento del DOM** y lo elimina de la pagina. Lo llamas directamente sobre el elemento que quieres borrar.
> **Para que sirve:** quitar cosas que ya no deben verse (un mensaje de exito que se va solo, una fila que eliminaste).
> **Donde se usa:** en `tunal-digital`, el mensaje del formulario de contacto se puede quitar con `remove()` despues de unos segundos.

```javascript
const aviso = document.querySelector(".aviso-exito");

// Lo quitamos de la pagina por completo
aviso.remove();
```

> ### 🟦 ¿Que significa? — *removeChild*
> Es la forma antigua de borrar: el **padre** elimina a un **hijo** con `padre.removeChild(hijo)`.
> **Para que sirve:** lo mismo que `remove`, solo que aqui necesitas tener a mano al padre.
> **Donde se usa:** en codigo viejo. Hoy `elemento.remove()` es mas simple y es lo que se prefiere.

> ### 💡 Tip
> Para vaciar un contenedor entero (borrar todos los hijos), lo mas claro es `contenedor.innerHTML = ""`. En `tunal-digital`, antes de pintar resultados nuevos conviene limpiar lo anterior asi, para no acumular contenido viejo.

> ### ⚠️ Cuidado
> Cuando haces `remove()`, el elemento desaparece de la pantalla, pero si guardaste su referencia en una variable, esa variable sigue apuntando al objeto en memoria. No intentes "reusarlo" como si siguiera en la pagina; si lo necesitas de nuevo, crea uno desde cero.

## 5. Recorrer el DOM: moverse por el arbol

A veces tienes un elemento y necesitas llegar a su **padre**, a sus **hijos** o a un **ancestro** mas arriba. Para eso existen propiedades de navegacion.

> ### 🟦 ¿Que significa? — *parentElement*
> Es una propiedad que devuelve el **elemento padre** del actual: quien lo contiene directamente.
> **Para que sirve:** subir un nivel en el arbol (por ejemplo, desde un boton "borrar" llegar a la tarjeta que lo contiene para eliminarla entera).
> **Donde se usa:** en `tunal-digital`, desde el boton de cerrar de un aviso puedes hacer `boton.parentElement.remove()` para quitar el aviso completo.

```javascript
const botonCerrar = document.querySelector(".aviso .cerrar");

botonCerrar.addEventListener("click", () => {
  // Subimos al padre (el aviso) y lo eliminamos entero
  botonCerrar.parentElement.remove();
});
```

> ### 🟦 ¿Que significa? — *children*
> Es una propiedad que devuelve **los elementos hijos** de un elemento, en una lista parecida a un array (aunque no sea exactamente un array).
> **Para que sirve:** recorrer o contar los hijos directos de un contenedor.
> **Donde se usa:** sirve para saber cuantas tarjetas hay dentro de la lista de proyectos de `Faro/Organizer`.

```javascript
const lista = document.querySelector("#proyectos");

// Recorremos cada hijo directo
for (const tarjeta of lista.children) {
  console.log(tarjeta.textContent);
}

// Cuantos hijos hay
console.log("Total:", lista.children.length);
```

> ### 🟦 ¿Que significa? — *Coleccion tipo array (HTMLCollection / NodeList)*
> Es una lista de elementos que **parece** un array (tiene `.length` y la puedes recorrer), pero que no trae todos los metodos de un array de verdad como `.map()`.
> **Para que sirve:** representar grupos de elementos del DOM. Si te hacen falta los metodos de array, la conviertes con `Array.from(coleccion)`.
> **Donde se usa:** `document.querySelectorAll` en `tunal-digital` devuelve una de estas colecciones cuando selecciona varios enlaces del menu.

> ### 🟦 ¿Que significa? — *closest*
> Es un metodo que, partiendo de un elemento, **sube por el arbol** buscando el ancestro mas cercano que coincida con un selector CSS. Si no encuentra ninguno, devuelve `null`.
> **Para que sirve:** desde un elemento interno (un icono, un texto) dar con el contenedor importante que lo envuelve.
> **Donde se usa:** es muy comun en listas: si haces clic en cualquier parte de una tarjeta, `evento.target.closest(".tarjeta")` te entrega la tarjeta completa sin importar donde exacto clicaste.

```javascript
document.querySelector("#proyectos").addEventListener("click", (evento) => {
  // Sin importar si clicaste el titulo o el icono,
  // closest sube hasta la tarjeta contenedora
  const tarjeta = evento.target.closest(".tarjeta");
  if (tarjeta) {
    console.log("Clic en la tarjeta:", tarjeta.dataset.id);
  }
});
```

> ### 🔎 En tu codigo
> El patron `closest` + un solo escuchador en el contenedor padre tiene nombre: **delegacion de eventos**. En `tunal-digital`, en vez de poner un escuchador en cada enlace, podrias poner uno solo en el `<nav>` y usar `closest("a")` para saber que enlace se clico. Menos escuchadores, mismo resultado, y sigue funcionando aunque agregues enlaces nuevos despues.

> ### 🟦 ¿Que significa? — *nextElementSibling / previousElementSibling*
> Son propiedades que te llevan al **elemento hermano** siguiente o anterior (los que comparten el mismo padre).
> **Para que sirve:** moverte de lado en el arbol (por ejemplo, del titulo a la descripcion que viene justo despues).
> **Donde se usa:** vienen bien para acordeones o para pasos de un formulario donde un elemento controla al que tiene al lado.

## 6. Atributos: leer y cambiar con `getAttribute`, `setAttribute` y `dataset`

Los **atributos** son esos pares que escribes dentro de las etiquetas: `href="..."`, `src="..."`, `disabled`, `data-id="..."`.

> ### 🟦 ¿Que significa? — *Atributo*
> Es informacion extra que pones en una etiqueta HTML para configurarla, escrita como `nombre="valor"`. Ejemplos: `class`, `id`, `href`, `src`, `alt`.
> **Para que sirve:** decirle al navegador como comportarse, o guardar datos dentro del HTML.
> **Donde se usa:** en `tunal-digital`, los enlaces tienen `href`, las imagenes tienen `src` y `alt`, y los botones pueden tener `disabled`.

> ### 🟦 ¿Que significa? — *getAttribute*
> Es un metodo que **lee el valor de un atributo** por su nombre.
> **Para que sirve:** averiguar a donde apunta un enlace, que imagen carga un `<img>`, y cosas asi.
> **Donde se usa:** leer el `href` de un enlace del menu en `tunal-digital` para saber a que seccion lleva.

> ### 🟦 ¿Que significa? — *setAttribute*
> Es un metodo que **escribe (o cambia)** el valor de un atributo: `elemento.setAttribute("nombre", "valor")`.
> **Para que sirve:** modificar el HTML desde JavaScript (deshabilitar un boton, cambiar el destino de un enlace).
> **Donde se usa:** en el formulario de `tunal-digital`, mientras se envia el mensaje al Worker, se puede dejar el boton como `disabled` con `setAttribute` para evitar envios dobles.

```javascript
const enlace = document.querySelector("nav a");

// Leer un atributo
console.log(enlace.getAttribute("href")); // "#servicios"

// Cambiar un atributo
enlace.setAttribute("href", "#contacto");

// Deshabilitar un boton mientras se envia el formulario
const boton = document.querySelector("#enviar");
boton.setAttribute("disabled", "");
```

> ### 🟦 ¿Que significa? — *Worker (Cloudflare Worker)*
> Es un pequeño programa que corre en el servidor (en la red de Cloudflare), no en el navegador. El sitio le envia datos y el responde.
> **Para que sirve:** hacer tareas que no deben vivir en el cliente, como hablar con la IA o procesar el formulario de contacto sin exponer claves secretas.
> **Donde se usa:** `tunal-digital` hace `fetch` a su Worker tanto para el chat de IA como para el formulario de contacto.

> ### 🟦 ¿Que significa? — *dataset (atributos data-*)*
> Es una propiedad que da acceso comodo a los atributos personalizados que empiezan con `data-`. Un atributo `data-id="42"` se lee en JavaScript como `elemento.dataset.id`.
> **Para que sirve:** guardar datos propios dentro del HTML (un id, un estado, una categoria) sin tener que inventar atributos invalidos.
> **Donde se usa:** es ideal para que cada tarjeta de proyecto en `Faro/Organizer` lleve su `data-id`, y al clicarla sepas exactamente cual es.

```javascript
const tarjeta = document.createElement("article");
tarjeta.className = "tarjeta";

// Guardamos datos propios en el elemento
tarjeta.dataset.id = "42";
tarjeta.dataset.estado = "activo";

// Mas tarde, los leemos
console.log(tarjeta.dataset.id);     // "42"
console.log(tarjeta.dataset.estado); // "activo"
```

> ### 💡 Tip
> En HTML escribes `data-estado-actual`, pero en `dataset` se lee en *camelCase*: `elemento.dataset.estadoActual`. El navegador hace esa conversion por ti. Tenlo presente y te ahorras mas de un dolor de cabeza.

> ### ⚠️ Cuidado
> Los valores de `dataset` siempre son **texto** (string). Si guardas `data-id="42"`, al leerlo obtienes `"42"` (entre comillas), no el numero `42`. Cuando necesites un numero, conviertelo con `Number(tarjeta.dataset.id)`.

## 7. Clonar elementos con `cloneNode`

A veces ya tienes un elemento bien armado y lo unico que quieres son copias de el (una plantilla de tarjeta, una fila base).

> ### 🟦 ¿Que significa? — *cloneNode*
> Es un metodo que crea una **copia** de un elemento. Si le pasas `true` (`elemento.cloneNode(true)`), copia tambien todo su contenido interno (copia profunda); con `false`, copia solo el elemento vacio.
> **Para que sirve:** duplicar una estructura ya hecha sin volver a armarla a mano cada vez.
> **Donde se usa:** viene bien cuando tienes una "plantilla" de tarjeta oculta en el HTML y clonas una por cada proyecto que quieres mostrar.

```javascript
// Una plantilla oculta en el HTML: <article class="plantilla">...</article>
const plantilla = document.querySelector(".plantilla");

// Hacemos una copia profunda (con su contenido)
const copia = plantilla.cloneNode(true);
copia.classList.remove("plantilla");
copia.querySelector("h3").textContent = "Proyecto nuevo";

document.querySelector("#proyectos").append(copia);
```

> ### 🟦 ¿Que significa? — *classList*
> Es una propiedad que da acceso comodo a las clases CSS de un elemento como una **lista**, con metodos para manejarlas una por una: `.add("activo")`, `.remove("oculto")`, `.toggle("abierto")` y `.contains("activo")`.
> **Para que sirve:** agregar o quitar clases sueltas sin pisar las demas (a diferencia de `className`, que las reemplaza todas de golpe).
> **Donde se usa:** en `tunal-digital`, abrir el menu movil es tan simple como `menu.classList.toggle("abierto")` cada vez que se clica el boton.

> ### 💡 Tip
> Para clonar de verdad (copia profunda, con todo su contenido), casi siempre quieres `cloneNode(true)`. El `false` solo copia la cascara vacia, y es facil olvidar que existe. Bit recomienda: ante la duda, usa `true`.

## 8. Construir HTML desde datos

Aqui se junta todo. Casi siempre los datos llegan como una **lista de objetos** (de un `fetch`, de un JSON) y tu tienes que convertir cada objeto en HTML. Esta es la tarea estrella del DOM.

> ### 🟦 ¿Que significa? — *Array de objetos*
> Es una lista (`[ ... ]`) donde cada elemento es un objeto (`{ ... }`) con datos relacionados, por ejemplo `{ titulo: "...", estado: "..." }`.
> **Para que sirve:** representar colecciones de cosas: proyectos, mensajes, productos.
> **Donde se usa:** `Faro/Organizer` recibe sus proyectos como un array de objetos desde Supabase y los pinta en pantalla.

```javascript
const proyectos = [
  { id: 1, titulo: "tunal-digital", estado: "Activo" },
  { id: 2, titulo: "PolyPaw",       estado: "En pausa" },
  { id: 3, titulo: "RachaSimple",   estado: "Activo" },
];

const lista = document.querySelector("#proyectos");
lista.innerHTML = ""; // limpiamos antes de pintar

for (const proyecto of proyectos) {
  const tarjeta = document.createElement("article");
  tarjeta.className = "tarjeta";
  tarjeta.dataset.id = proyecto.id;

  const titulo = document.createElement("h3");
  titulo.textContent = proyecto.titulo;

  const estado = document.createElement("p");
  estado.textContent = `Estado: ${proyecto.estado}`;

  tarjeta.append(titulo, estado);
  lista.append(tarjeta);
}
```

> ### 🟦 ¿Que significa? — *Iterar (recorrer con un bucle)*
> Es repetir una accion para cada elemento de una lista, con un bucle como `for...of`. En cada vuelta trabajas con un elemento distinto.
> **Para que sirve:** hacer lo mismo (crear una tarjeta) por cada dato sin escribirlo a mano N veces.
> **Donde se usa:** en `RachaSimple` (React) los datos se recorren con `.map()` para pintar cada racha; en JS vanilla como el de `tunal-digital`, se usa `for...of` o `forEach`.

> ### 🔎 En tu codigo
> En `tunal-digital` el chat de IA hace justo esto, pero en pequeño: por cada mensaje (del usuario o de la IA) crea una burbuja, le pone clase y texto, y la mete con `append` en el contenedor del chat. Es el mismo patron "dato -> elemento -> insertar", solo que de uno en uno.

> ### 💡 Tip — fragmentos para muchas inserciones
> Si vas a insertar **muchos** elementos, meterlos uno por uno obliga al navegador a redibujar muchas veces. Puedes juntarlos primero en un `DocumentFragment` y hacer un solo `append` al final.

> ### 🟦 ¿Que significa? — *DocumentFragment*
> Es un contenedor **temporal e invisible** donde armas varios elementos antes de meterlos a la pagina de un solo golpe.
> **Para que sirve:** mejorar el rendimiento cuando insertas muchos elementos a la vez.
> **Donde se usa:** util en una lista larga de proyectos en `Faro/Organizer`; primero armas todo en el fragmento y luego haces un unico `append`.

```javascript
const fragmento = document.createDocumentFragment();

for (const proyecto of proyectos) {
  const tarjeta = document.createElement("article");
  tarjeta.textContent = proyecto.titulo;
  fragmento.append(tarjeta); // se acumula fuera de la pagina
}

document.querySelector("#proyectos").append(fragmento); // una sola insercion
```

## 9. Las funciones de atajo de `main.js`

En el sitio real `tunal-digital`, escribir `document.querySelector(...)` y `document.querySelectorAll(...)` una y otra vez termina cansando. Por eso `main.js` define **funciones de atajo**: nombres cortos que envuelven esos metodos tan largos.

> ### 🟦 ¿Que significa? — *Funcion de atajo (helper)*
> Es una funcion pequeña que tu defines para **acortar o simplificar** una tarea repetitiva. No es magia del navegador: es codigo tuyo que envuelve otro codigo.
> **Para que sirve:** escribir menos y leer mejor. En lugar de `document.querySelector("#chat")` escribes `$("#chat")`.
> **Donde se usa:** el `main.js` de `tunal-digital` define atajos para seleccionar elementos, y asi todo el resto del archivo queda mas corto y claro.

```javascript
// Atajo para seleccionar UN elemento
const $ = (selector, contexto = document) => contexto.querySelector(selector);

// Atajo para seleccionar VARIOS (como array de verdad)
const $$ = (selector, contexto = document) =>
  Array.from(contexto.querySelectorAll(selector));

// Ahora el resto de main.js queda limpio:
const chat = $("#chat");
const enlaces = $$("nav a");

enlaces.forEach((enlace) => {
  console.log(enlace.getAttribute("href"));
});
```

> ### 🟦 ¿Que significa? — *querySelector / querySelectorAll*
> `querySelector` busca y devuelve **el primer** elemento que coincide con un selector CSS. `querySelectorAll` devuelve **todos** los que coinciden, dentro de una coleccion.
> **Para que sirve:** encontrar elementos con la misma sintaxis de tus selectores CSS (`.clase`, `#id`, `nav a`).
> **Donde se usa:** son la base de los atajos `$` y `$$` de `tunal-digital`.

> ### 🟦 ¿Que significa? — *Array.from*
> Es una funcion que convierte una coleccion tipo array (como la que devuelve `querySelectorAll`) en un **array de verdad**, con todos sus metodos (`.map`, `.filter`, `.forEach`).
> **Para que sirve:** poder usar metodos de array sobre elementos del DOM.
> **Donde se usa:** dentro del atajo `$$`, para que devuelva algo comodo de recorrer.

> ### 🟦 ¿Que significa? — *Parametro por defecto*
> Es un valor que toma un parametro **cuando no le pasas otro** al llamar la funcion. En `(selector, contexto = document)`, si no das `contexto`, vale `document`.
> **Para que sirve:** hacer funciones flexibles: por defecto buscan en toda la pagina, pero puedes acotar la busqueda a un elemento concreto.
> **Donde se usa:** en los atajos `$`/`$$`, para poder buscar dentro de un contenedor especifico cuando hace falta.

> ### 🔎 En tu codigo
> Cuando abras el `main.js` de `tunal-digital`, fijate al inicio del archivo en definiciones cortas tipo `$` o en nombres como `qs`/`qsa`. Ese es el patron de atajo. Reconocerlo te ayuda a leer el resto del archivo mucho mas rapido, porque ya sabras que `$("#algo")` no es mas que "busca este elemento".

> ### ⚠️ Cuidado
> Los atajos `$` y `$$` que defines tu **no tienen nada que ver con jQuery** (una libreria antigua que tambien usa `$`). Aqui son funciones tuyas de una sola linea. No las confundas ni des por hecho que traen los poderes de jQuery.

## 10. Juntando todo: un mini ejemplo realista

Imagina una pequeña lista de proyectos con un boton para eliminar cada uno. Vamos a usar casi todo lo de este capitulo.

```javascript
const $ = (sel, ctx = document) => ctx.querySelector(sel);

const proyectos = [
  { id: 1, titulo: "Faro/Organizer", estado: "Activo" },
  { id: 2, titulo: "polypaw-nas",    estado: "Activo" },
];

const lista = $("#proyectos");
lista.innerHTML = "";

for (const proyecto of proyectos) {
  const tarjeta = document.createElement("article");
  tarjeta.className = "tarjeta";
  tarjeta.dataset.id = proyecto.id;

  const titulo = document.createElement("h3");
  titulo.textContent = proyecto.titulo;

  const boton = document.createElement("button");
  boton.textContent = "Eliminar";

  tarjeta.append(titulo, boton);
  lista.append(tarjeta);
}

// Delegacion: un solo escuchador para toda la lista
lista.addEventListener("click", (evento) => {
  const boton = evento.target.closest("button");
  if (!boton) return;
  const tarjeta = boton.closest(".tarjeta");
  console.log("Eliminando proyecto", tarjeta.dataset.id);
  tarjeta.remove();
});
```

Mira como encaja la historia completa: creamos elementos (`createElement`), los configuramos (`textContent`, `dataset`), los insertamos (`append`), recorremos el arbol hacia arriba (`closest`) y borramos (`remove`). Asi, ni mas ni menos, se construyen las interfaces de verdad. 🐾

## ✅ Checklist — ¿ya domino esto?

- [ ] Se que el DOM es el arbol de objetos de la pagina y se que es un nodo y un elemento.
- [ ] Puedo crear un elemento con `createElement` y ponerle texto con `textContent`.
- [ ] Se la diferencia entre `textContent` (seguro) e `innerHTML` (interpreta HTML, cuidado con XSS).
- [ ] Inserto elementos con `append` y `prepend`, y entiendo padre/hijo.
- [ ] Elimino elementos con `remove` y se vaciar un contenedor.
- [ ] Me muevo por el arbol con `parentElement`, `children` y `closest`.
- [ ] Leo y cambio atributos con `getAttribute` y `setAttribute`.
- [ ] Guardo y leo datos propios con `dataset` (y recuerdo que siempre son texto).
- [ ] Hago copias con `cloneNode(true)`.
- [ ] Construyo HTML recorriendo un array de objetos con un bucle.
- [ ] Reconozco las funciones de atajo (`$`, `$$`) al estilo del `main.js` de `tunal-digital`.

## 🧪 Ejercicios

1. 💻 **Tarjeta a mano.** Crea con `createElement` un `<article>` con un `<h3>` y un `<p>` dentro, ponles texto, y agregalo al `<body>` con `append`. Comprueba que aparece en pantalla.

2. 💻 **De datos a pantalla.** Parte de este array y pintalo como una lista de tarjetas usando un bucle `for...of`: `[{ titulo: "PolyPaw", estado: "En pausa" }, { titulo: "RachaSimple", estado: "Activo" }]`. Cada tarjeta debe llevar su `data-` con el estado.

3. 💻 **Boton que borra.** Agrega a cada tarjeta del ejercicio 2 un boton "Quitar" que, al hacer clic, use `closest(".tarjeta")` y `remove()` para eliminar solo esa tarjeta. Usa un unico escuchador en el contenedor (delegacion).

4. 💻 **Atajos propios.** Define las funciones `$` y `$$` como en la seccion 9 y reescribe alguno de tus ejercicios anteriores usandolas. Confirma que `$$` te deja usar `.forEach`.

5. **Sin computadora — atributos.** Para un elemento con `data-id="7"`, escribe en papel: que devuelve `elemento.dataset.id`, de que tipo es, y como lo convertirias a numero.

6. **Sin computadora — el arbol.** Dibuja un arbol con un `<ul>` que contiene tres `<li>`. Marca para uno de los `<li>`: su `parentElement`, su `previousElementSibling` y que devolveria `li.closest("ul")`.

> Lo lograste. 🟦 Ya no solo lees la pagina: la **construyes**. En el proximo capitulo les daremos vida a estos elementos con eventos mas avanzados y con datos que llegan de la red. Sigue practicando, que cada tarjeta que pintas te acerca a interfaces reales como las de tus propios repos. — Bit
