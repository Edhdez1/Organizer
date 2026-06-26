# Capitulo 15 — Glosario de JavaScript y mapa

<p align="center">
  <img src="../../recursos/imagenes/03-javascript/cap15.png" alt="Ilustración del capítulo (pixel art con Bit)" width="640">
</p>


> Hola otra vez. Soy **Bit**, tu ajolote guia, y este es el capitulo donde respiramos hondo. No vamos a aprender nada nuevo: vamos a **ordenar** todo lo que ya vimos en el modulo de JavaScript. Piensa en este capitulo como el cajon de tu escritorio: aqui guardamos cada palabra rara que aparecio, le ponemos una etiqueta clara y la dejamos lista para cuando la necesites. Si en algun capitulo te perdiste con una palabra, este es el sitio para volver. Lo usaremos con el ejemplo estrella del modulo: el `main.js` del sitio **tunal-digital**. Vamos despacio, que ningun termino se quede sin definir.

## 1. Como usar este glosario

Este capitulo es distinto a los demas. No hay un proyecto que construir paso a paso: hay un **diccionario** ordenado alfabeticamente. Cada palabra tecnica vive en su propio recuadro azul, con tres cosas:

1. **Que significa** en palabras simples.
2. **Para que sirve** (por que existe).
3. **Donde se usa en un repo real** de los que ya conoces.

Antes del glosario, mira el mapa mental para tener la foto completa. Despues del glosario, hay un repaso final y, al cierre, unos ejercicios cortos para fijar todo.

> ### 💡 Tip
> No leas el glosario de corrido como una novela. Leelo a saltos: cuando estes programando y veas una palabra que no recuerdes, ven aqui, buscala y vuelve a tu codigo. Asi se usa un diccionario de verdad.

## 2. El mapa mental de JavaScript

Antes de las definiciones, aqui tienes el **mapa**: como se conectan las piezas grandes del modulo. Lo dibujamos con texto (un esquema con sangrias) para que lo puedas copiar a tu cuaderno.

```
JAVASCRIPT
│
├── 1. GUARDAR DATOS
│     ├── variable (let, const, var)
│     ├── tipo de dato (string, number, boolean, null, undefined)
│     ├── array  → lista ordenada [ ]
│     └── objeto → ficha con etiquetas { }
│
├── 2. HACER COSAS
│     ├── funcion        → receta reutilizable
│     ├── parametro/argumento → lo que le pasas a la receta
│     ├── return         → lo que la receta devuelve
│     ├── scope          → donde vive cada variable
│     └── closure        → funcion que recuerda su entorno
│
├── 3. DECIDIR Y REPETIR
│     ├── condicional (if / else)
│     ├── operador (===, &&, ||, +)
│     └── bucle (for, forEach, map)
│
├── 4. LA PAGINA WEB (navegador)
│     ├── DOM            → el arbol de la pagina
│     ├── selector       → como encuentras un elemento
│     ├── evento         → click, submit, scroll...
│     └── listener       → "quedate atento a este evento"
│
└── 5. HABLAR CON INTERNET (asincronia)
      ├── callback       → "llamame cuando termines"
      ├── promesa        → un pagare de un resultado futuro
      ├── async / await  → esperar sin trabarse
      ├── fetch          → pedir datos a un servidor
      └── JSON           → el idioma de los datos que viajan
```

> ### 💡 Tip
> Fijate que el mapa va de **lo mas simple** (guardar un dato) a **lo mas avanzado** (hablar con internet). Ese es justo el orden en que crece tu codigo: primero guardas, luego haces, luego decides, luego pintas la pagina y al final pides datos de afuera.

En el `main.js` de **tunal-digital** estan casi todas las ramas a la vez: hay variables y funciones de atajo (rama 1 y 2), hay seleccion de elementos y eventos del formulario y del chat (rama 4) y hay `fetch` al Worker de IA con `async/await` y `JSON` (rama 5). Por eso es nuestro ejemplo principal: cabe casi todo el mapa en un archivo.

## 3. Glosario alfabetico

Aqui van los terminos, de la A a la Z. Cada uno con su recuadro.

> ### 🟦 ¿Que significa? — *Argumento*
> El **valor concreto** que le pasas a una funcion cuando la llamas. Sirve para darle a la funcion el dato real con el que va a trabajar. En **tunal-digital**, cuando llamas a una funcion de atajo como `$('#chat')`, el texto `'#chat'` es el argumento.

> ### 🟦 ¿Que significa? — *Array*
> Una **lista ordenada** de valores, escrita entre corchetes `[ ]`. Sirve para guardar muchas cosas bajo un solo nombre y recorrerlas. En **tunal-digital** se usa, por ejemplo, para guardar la lista de mensajes del chat antes de pintarlos.

```javascript
const mensajes = ["Hola", "Soy el bot", "Cuentame de tu negocio"];
mensajes.forEach(function (texto) {
  console.log(texto); // imprime cada mensaje, uno por uno
});
```

> ### 🟦 ¿Que significa? — *async (palabra clave)*
> Una etiqueta que pones antes de una funcion para avisar: "esta funcion hace cosas que tardan, podra usar `await`". Sirve para escribir codigo que espera resultados de internet sin enredarse. En **tunal-digital**, la funcion que envia el mensaje al chat de IA es `async` porque adentro espera la respuesta del Worker.

> ### 🟦 ¿Que significa? — *await (palabra clave)*
> Le dice a JavaScript: "espera aqui a que esta promesa termine antes de seguir". Solo funciona dentro de una funcion `async`. Sirve para leer un resultado que tarda como si fuera normal. En **tunal-digital** se usa `await fetch(...)` para esperar la respuesta del servidor de IA.

```javascript
async function enviarMensaje(texto) {
  const respuesta = await fetch("/api/chat", { method: "POST", body: texto });
  const datos = await respuesta.json();
  return datos.reply;
}
```

> ### 🟦 ¿Que significa? — *Booleano (boolean)*
> Un tipo de dato que solo puede valer `true` (verdadero) o `false` (falso). Sirve para responder preguntas de si/no y controlar decisiones. En **tunal-digital**, una variable booleana como `enviando` indica si el formulario ya esta procesando un envio.

> ### 🟦 ¿Que significa? — *Bucle (loop)*
> Una estructura que **repite** un bloque de codigo varias veces (`for`, `forEach`, `map`). Sirve para no escribir lo mismo una y otra vez. En **tunal-digital** se recorre la lista de mensajes con un bucle para pintarlos todos en pantalla.

> ### 🟦 ¿Que significa? — *Callback*
> Una funcion que le entregas a otra funcion para que la llame **cuando termine** algo. Sirve para reaccionar a eventos o a tareas que tardan. En **tunal-digital**, la funcion que reacciona al `submit` del formulario es un callback: el navegador la llama cuando el usuario envia.

```javascript
boton.addEventListener("click", function () {
  // este es el callback: corre solo cuando hacen click
  console.log("Hiciste click");
});
```

> ### ⚠️ Cuidado
> Un callback no se ejecuta cuando lo escribes, sino **mas tarde**, cuando ocurre el evento. Por eso ves logs en un orden que parece "fuera de lugar": es normal, el callback espero su turno.

> ### 🟦 ¿Que significa? — *Closure (clausura)*
> Una funcion que **recuerda** las variables del lugar donde nacio, aunque ese lugar ya haya terminado. Sirve para guardar un estado privado sin variables globales. En **tunal-digital**, una funcion de atajo que "recuerda" un contador interno entre llamadas usa una closure.

```javascript
function crearContador() {
  let cuenta = 0; // vive dentro, pero la closure la recuerda
  return function () {
    cuenta = cuenta + 1;
    return cuenta;
  };
}
const siguiente = crearContador();
siguiente(); // 1
siguiente(); // 2  (recordo el valor anterior)
```

> ### 🟦 ¿Que significa? — *Condicional (if / else)*
> Una bifurcacion: "si pasa esto, haz A; si no, haz B". Sirve para que el programa tome decisiones. En **tunal-digital**, un `if` revisa si el campo del formulario esta vacio antes de enviar.

> ### 🟦 ¿Que significa? — *const*
> Una forma de declarar una variable cuyo **nombre no se reasigna** a otro valor. Sirve para datos que no deben cambiar de referencia, dando mas seguridad. En **tunal-digital**, los elementos de la pagina se guardan con `const` porque apuntan siempre al mismo nodo.

> ### 🟦 ¿Que significa? — *console.log*
> Una orden que **escribe un mensaje** en la consola del navegador. Sirve para ver que esta pasando y depurar errores. En **tunal-digital** se usa durante el desarrollo para revisar que el `fetch` devolvio lo esperado.

> ### 🟦 ¿Que significa? — *DOM (Document Object Model)*
> El **arbol** que el navegador arma con tu pagina HTML: cada etiqueta es una rama que JavaScript puede leer y cambiar. Sirve para que tu codigo modifique lo que se ve. En **tunal-digital**, escribir la respuesta del bot en el chat es cambiar el DOM.

```javascript
const caja = document.querySelector("#chat");
caja.textContent = "Hola desde JavaScript"; // cambiamos el DOM
```

> ### 🟦 ¿Que significa? — *Elemento*
> Cada pieza del DOM que corresponde a una etiqueta HTML (un `<button>`, un `<form>`, un `<div>`). Sirve como el "objeto" sobre el que actuas en la pagina. En **tunal-digital**, el formulario de contacto es un elemento que seleccionas y al que le pones un listener.

> ### 🟦 ¿Que significa? — *Evento*
> Algo que **pasa** en la pagina: un click, un envio de formulario, mover el raton, escribir una tecla. Sirve para que tu programa reaccione al usuario. En **tunal-digital**, el evento `submit` del formulario dispara el envio del mensaje.

> ### 🔎 En tu codigo
> En el `main.js` de **tunal-digital** busca la linea con `addEventListener("submit", ...)`. Ese es el corazon del formulario: ahi conectas un **evento** (submit) con un **callback** que decide que hacer cuando el usuario manda sus datos.

> ### 🟦 ¿Que significa? — *fetch*
> Una funcion del navegador que **pide datos a un servidor** por internet y devuelve una promesa. Sirve para traer o enviar informacion sin recargar la pagina. En **tunal-digital**, `fetch` llama al Worker de Cloudflare que conecta con la IA del chat.

```javascript
const respuesta = await fetch("https://mi-worker.workers.dev/chat");
const datos = await respuesta.json();
```

> ### ⚠️ Cuidado
> `fetch` no falla automaticamente cuando el servidor responde con un error tipo 404 o 500: te entrega la respuesta igual. Revisa `respuesta.ok` antes de confiar en los datos.

> ### 🟦 ¿Que significa? — *forEach*
> Un metodo de los arrays que **recorre cada elemento** y ejecuta una funcion con el. Sirve para hacer algo con cada item de una lista. En **tunal-digital** se usa para pintar cada mensaje del chat en pantalla.

> ### 🟦 ¿Que significa? — *Funcion*
> Una **receta reutilizable**: un bloque de codigo con nombre que puedes llamar cuando quieras. Sirve para no repetir codigo y para organizar tareas. En **tunal-digital**, las "funciones de atajo" (como un `$` que envuelve `querySelector`) son funciones que usas en todo el archivo.

```javascript
function saludar(nombre) {
  return "Hola, " + nombre;
}
saludar("Bit"); // "Hola, Bit"
```

> ### 🟦 ¿Que significa? — *Funcion flecha (arrow function)*
> Una forma corta de escribir funciones con `=>`. Sirve para que los callbacks queden mas breves y legibles. En **tunal-digital** se usan funciones flecha como callbacks de eventos y dentro de `forEach`.

```javascript
const doble = (n) => n * 2;
doble(4); // 8
```

> ### 🟦 ¿Que significa? — *Global (ambito global)*
> El espacio "de afuera de todo", donde una variable es visible desde cualquier parte del archivo. Sirve para datos compartidos, pero conviene usarlo poco. En **tunal-digital**, casi nada es global a proposito: cada cosa vive dentro de su funcion para evitar choques.

> ### 🟦 ¿Que significa? — *JSON (JavaScript Object Notation)*
> Un **formato de texto** para representar datos (objetos y listas) que viaja facil por internet. Sirve para que el navegador y el servidor se entiendan. En **tunal-digital**, la respuesta del Worker de IA llega como JSON y se convierte con `.json()`.

```javascript
// Esto es JSON (texto): el servidor te lo manda asi
{ "reply": "Hola, soy el asistente", "ok": true }
```

> ### 🔎 En tu codigo
> JSON aparece en mas de un repo de tu lista. En **PolyPaw** (Python/Flet) las misiones se guardan en archivos `.json`. En **tunal-digital** el JSON llega por la red desde el Worker. Mismo formato, dos usos: uno en disco, otro viajando por internet.

> ### 🟦 ¿Que significa? — *let*
> Una forma de declarar una variable que **si puede cambiar** de valor mas adelante. Sirve para datos que evolucionan, como un contador o un estado. En **tunal-digital**, una bandera como `let enviando = false` usa `let` porque cambia mientras se manda el formulario.

> ### 🟦 ¿Que significa? — *Listener (escuchador de eventos)*
> El "vigilante" que pones con `addEventListener` para quedarte atento a un evento. Sirve para conectar un evento con la funcion que debe reaccionar. En **tunal-digital**, hay un listener en el formulario y otro en el boton de enviar del chat.

> ### 🟦 ¿Que significa? — *map (metodo)*
> Un metodo de los arrays que **crea una lista nueva** transformando cada elemento. Sirve para convertir datos sin tocar el array original. En **tunal-digital** se puede usar para convertir una lista de textos en una lista de elementos HTML del chat.

```javascript
const numeros = [1, 2, 3];
const dobles = numeros.map((n) => n * 2); // [2, 4, 6]
```

> ### 🟦 ¿Que significa? — *null*
> Un valor especial que significa "aqui, a proposito, no hay nada". Sirve para decir "vacio intencional". En **tunal-digital**, si `querySelector` no encuentra un elemento, devuelve `null`, y conviene revisarlo antes de usarlo.

> ### 🟦 ¿Que significa? — *Number (numero)*
> El tipo de dato para los **numeros** (enteros y decimales). Sirve para contar, medir y calcular. En **tunal-digital**, un contador de caracteres del mensaje del chat es un Number.

> ### 🟦 ¿Que significa? — *Objeto*
> Una **ficha** con pares etiqueta-valor, escrita entre llaves `{ }`. Sirve para agrupar datos relacionados bajo nombres claros. En **tunal-digital**, las opciones que le pasas a `fetch` (`{ method: "POST", body: ... }`) son un objeto.

```javascript
const usuario = {
  nombre: "Edwar",
  negocio: "Tunal Digital",
  activo: true,
};
console.log(usuario.nombre); // "Edwar"
```

> ### 🟦 ¿Que significa? — *Operador*
> Un simbolo que **combina o compara** valores: `+` suma, `===` compara, `&&` es "y", `||` es "o". Sirve para hacer calculos y decisiones. En **tunal-digital**, un `if (texto === "")` usa el operador `===` para ver si el campo esta vacio.

> ### ⚠️ Cuidado
> Usa siempre `===` (triple) para comparar, no `==` (doble). El doble hace conversiones raras (por ejemplo `0 == ""` da `true`) y te mete bichos dificiles de encontrar.

> ### 🟦 ¿Que significa? — *Parametro*
> El **nombre** que escribes entre parentesis al definir una funcion, como hueco que se llenara al llamarla. Sirve para que la funcion reciba datos. En **tunal-digital**, en `function saludar(nombre)`, `nombre` es el parametro; el texto que pasas al llamar es el argumento.

> ### 🟦 ¿Que significa? — *Promesa (Promise)*
> Un **pagare**: un objeto que representa un resultado que llegara despues (o un error). Sirve para manejar tareas que tardan, como pedir datos. En **tunal-digital**, `fetch` devuelve una promesa que se resuelve cuando el Worker responde.

```javascript
fetch("/api/chat")
  .then((respuesta) => respuesta.json())
  .then((datos) => console.log(datos))
  .catch((error) => console.log("Algo fallo", error));
```

> ### 💡 Tip
> Una promesa tiene tres estados: **pendiente** (esperando), **cumplida** (llego el dato) y **rechazada** (hubo error). `await` te da el dato cuando se cumple; el `.catch` o el `try/catch` atrapan el rechazo.

> ### 🟦 ¿Que significa? — *querySelector*
> Un metodo del documento que **busca el primer elemento** que coincide con un selector CSS. Sirve para encontrar la pieza del DOM con la que vas a trabajar. En **tunal-digital**, las funciones de atajo en `main.js` envuelven `querySelector` para escribir menos.

> ### 🟦 ¿Que significa? — *return*
> La palabra que hace que una funcion **devuelva un valor** y termine. Sirve para que la receta entregue su resultado a quien la llamo. En **tunal-digital**, una funcion de atajo hace `return document.querySelector(sel)` para entregarte el elemento.

> ### ⚠️ Cuidado
> Despues de `return`, la funcion se detiene: el codigo escrito debajo no se ejecuta. Si pusiste algo importante despues de un `return`, nunca correra.

> ### 🟦 ¿Que significa? — *Scope (ambito)*
> La **zona donde vive** una variable y donde se la puede ver. Sirve para mantener el codigo ordenado y evitar que unas variables pisen a otras. En **tunal-digital**, una variable declarada dentro del callback del formulario solo existe dentro de ese callback.

> ### 🔎 En tu codigo
> Si en **tunal-digital** declaras una variable con `let` dentro de la funcion del chat, no podras leerla desde el formulario: tienen **scopes distintos**. Para compartir un dato entre ambos, lo declaras un nivel mas arriba.

> ### 🟦 ¿Que significa? — *Selector*
> Una **cadena de texto** (como `#chat` o `.boton`) que describe que elemento del DOM quieres. Sirve para apuntar a la pieza correcta de la pagina. En **tunal-digital**, los selectores `#` (por id) y `.` (por clase) se pasan a las funciones de atajo.

> ### 🟦 ¿Que significa? — *String (cadena de texto)*
> El tipo de dato para **texto**, escrito entre comillas. Sirve para guardar nombres, mensajes y cualquier letra. En **tunal-digital**, el mensaje que el usuario escribe en el chat es un string.

```javascript
const saludo = "Hola";
const nombre = "Bit";
console.log(saludo + ", " + nombre); // "Hola, Bit"
```

> ### 🟦 ¿Que significa? — *Template literal (plantilla)*
> Una forma de escribir texto con **acentos graves** y huecos `${ }` para meter variables. Sirve para armar mensajes sin pegar trozos con `+`. En **tunal-digital** se usan para construir el HTML de cada burbuja del chat.

```javascript
const nombre = "Edwar";
const mensaje = `Hola, ${nombre}, bienvenido a Tunal`;
```

> ### 🟦 ¿Que significa? — *Tipo de dato*
> La **categoria** de un valor: string, number, boolean, null, undefined, objeto o array. Sirve para saber que puedes hacer con un dato. En **tunal-digital**, antes de enviar el formulario revisas que el texto sea un string y no este vacio.

> ### 🟦 ¿Que significa? — *try / catch*
> Un bloque para **intentar** algo riesgoso (`try`) y **atrapar** el error si falla (`catch`), sin que se caiga toda la pagina. Sirve para manejar fallos con elegancia. En **tunal-digital**, el `fetch` al Worker va dentro de un `try/catch` por si la red falla.

```javascript
try {
  const r = await fetch("/api/chat");
  const datos = await r.json();
} catch (error) {
  console.log("No se pudo conectar:", error);
}
```

> ### 🟦 ¿Que significa? — *undefined*
> El valor que tiene una variable que **existe pero aun no tiene contenido**. Sirve para detectar "todavia no le di valor a esto". En **tunal-digital**, si lees una propiedad que no existe en la respuesta JSON, obtienes `undefined`.

> ### ⚠️ Cuidado
> `null` y `undefined` parecen lo mismo pero no lo son. `undefined` es "nunca le di valor"; `null` es "le di valor vacio a proposito". Confundirlos es fuente clasica de errores.

> ### 🟦 ¿Que significa? — *var*
> La forma **antigua** de declarar variables, anterior a `let` y `const`. Sirve... cada vez menos: se recomienda evitarla porque su scope es confuso. En **tunal-digital** no se usa `var`: todo es `let` o `const`, que es la practica moderna.

> ### 🟦 ¿Que significa? — *Variable*
> Una **caja con nombre** donde guardas un valor para usarlo despues. Sirve como la base de todo: sin variables no hay datos que mover. En **tunal-digital**, cada elemento del DOM, cada bandera y cada mensaje vive en una variable.

```javascript
let mensaje = "Hola";     // puede cambiar
const limite = 280;       // no se reasigna
```

## 4. Terminos que cruzan con otros modulos

JavaScript no vive solo. Algunas palabras del modulo aparecen tambien en tus otros repos. Aqui las anclamos para que las reconozcas en cualquier sitio.

> ### 🟦 ¿Que significa? — *Componente*
> En frameworks como React, un **trozo de interfaz reutilizable** que es, en el fondo, una funcion que devuelve lo que se ve. Sirve para construir pantallas por piezas. En **RachaSimple** (React + TypeScript) cada tarjeta de racha es un componente.

> ### 🟦 ¿Que significa? — *Estado (state)*
> Datos que **cambian con el tiempo** dentro de una app y que, al cambiar, redibujan la pantalla. Sirve para apps que reaccionan al usuario. En **RachaSimple** y en **Faro/Organizer** (Next.js + React) el estado guarda lo que el usuario ve y edita.

> ### 🟦 ¿Que significa? — *TypeScript*
> Un JavaScript con **etiquetas de tipo**: avisa errores antes de ejecutar. Sirve para escribir codigo mas seguro en proyectos grandes. **RachaSimple** y **Faro/Organizer** usan TypeScript; **tunal-digital** usa JavaScript "vanilla" (sin framework).

> ### 🔎 En tu codigo
> El salto natural despues de dominar el `main.js` de **tunal-digital** es entender **RachaSimple**: alli el mismo JavaScript se escribe con TypeScript, dentro de componentes de React, y los datos viajan con TanStack Query a Supabase. Las palabras de este glosario (funcion, objeto, array, fetch, promesa, async) siguen siendo las mismas; solo cambia el envoltorio.

> ### 💡 Tip
> No todo lo de tu lista es JavaScript. **PolyPaw** es Python con Flet y JSON; **polypaw-nas** es servidor (Ubuntu, Samba, Cockpit, Tailscale), nada de JS. Saber donde NO aplica un concepto es tan util como saber donde si.

## 5. Repaso final (en vez de teoria nueva)

Cerremos el modulo armando la historia completa, usando solo palabras del glosario. Lee esto despacio; si una palabra no te suena, vuelve arriba y buscala.

1. Abres la pagina de **tunal-digital**. El navegador construye el **DOM** a partir del HTML.
2. Tu `main.js` usa **funciones** de atajo (que por dentro llaman a `querySelector`) para tomar **elementos**: el **formulario** y la caja del **chat**. Cada uno se guarda en una **variable** declarada con `const`.
3. Pones un **listener** con `addEventListener` al **evento** `submit`. Le entregas un **callback**.
4. Cuando el usuario envia, el callback corre. Dentro, un **condicional** (`if`) revisa con el **operador** `===` que el **string** del mensaje no este vacio.
5. Si todo bien, una funcion `async` hace `await fetch(...)` al Worker. `fetch` devuelve una **promesa**; `await` espera el resultado.
6. La respuesta llega como **JSON**; con `.json()` la conviertes en un **objeto** de JavaScript y lees su propiedad `reply` (un **string**).
7. Recorres los mensajes con un **bucle** (`forEach`) y, con un **template literal**, escribes cada burbuja en el **DOM**.
8. Si la red falla, el **try/catch** atrapa el error y muestra un aviso amable en vez de romper la pagina.

Eso es JavaScript de principio a fin: **guardar** (variables, tipos), **hacer** (funciones, scope), **decidir** (condicionales, operadores), **pintar** (DOM, eventos) y **conectar** (fetch, promesas, async, JSON). Todo el mapa del inicio, vivo en un solo flujo.

> ### 🔎 En tu codigo
> Reto de cierre: abre el `main.js` real de **tunal-digital** y, con lapiz en mano, marca al lado de cada bloque que termino del glosario aparece. Veras que el archivo entero es este mismo recorrido. Si reconoces las ocho etapas, ya dominas el modulo.

## ✅ Checklist — ¿ya domino esto?

- [ ] Se explicar con mis palabras que es una **variable** y la diferencia entre `let` y `const`.
- [ ] Distingo los **tipos de dato**: string, number, boolean, null, undefined.
- [ ] Se que es una **funcion**, y la diferencia entre **parametro** y **argumento**.
- [ ] Entiendo que es un **array** y que es un **objeto**, y cuando usar cada uno.
- [ ] Puedo explicar **scope** y dar una idea de que es un **closure**.
- [ ] Se que es el **DOM**, un **evento**, un **listener** y un **selector**.
- [ ] Distingo **callback**, **promesa** y **async/await**.
- [ ] Se para que sirve **fetch** y que es **JSON**.
- [ ] Reconozco estas palabras en el `main.js` de **tunal-digital**.
- [ ] Se cuales conceptos NO son JavaScript (PolyPaw es Python; polypaw-nas es servidor).

## 🧪 Ejercicios

1. **El diccionario al reves.** Sin mirar el glosario, escribe en tu cuaderno la definicion (1-2 lineas) de: *variable, funcion, array, objeto, evento, fetch, promesa, JSON*. Luego compara con los recuadros y corrige lo que falle.

2. **Caza-palabras (clasificacion).** Toma estos terminos: `string`, `componente`, `Samba`, `forEach`, `Tailscale`, `closure`, `JSON`. Clasificalos en tres columnas: *es de JavaScript*, *es de otro framework de JS* (React/Next), *no es de JavaScript*. Pista: dos no son de JS.

3. **💻 Marca el mapa en codigo.** Abre el `main.js` de **tunal-digital**. Pon comentarios `// EVENTO`, `// CALLBACK`, `// FETCH`, `// JSON`, `// DOM` junto a las lineas donde reconozcas cada concepto. No cambies la logica, solo anota.

4. **💻 Mini-objeto y array.** En la consola del navegador, crea un **objeto** `bit` con las propiedades `nombre`, `tipo` y `nivel`. Luego crea un **array** `mensajes` con tres strings y recorrelo con `forEach` imprimiendo cada uno. Verifica que `bit.nombre` te devuelve lo correcto.

5. **💻 Promesa controlada.** Escribe una funcion `async` llamada `probar()` que haga `await fetch("https://example.com")` dentro de un `try/catch`. Si funciona, imprime `respuesta.ok`; si falla, imprime un mensaje propio. Observa el orden en que aparecen los `console.log`.

6. **Explicaselo a alguien.** Elige tres palabras del glosario que mas te costaron y explicalas en voz alta a otra persona (o a tu mascota, Bit no juzga) sin leer el recuadro. Si logras explicarlas, ya son tuyas.

> Y con esto cerramos el modulo de JavaScript. Lo hiciste muy bien: pasaste de "estas palabras me marean" a tener un mapa y un diccionario propios. Guarda este capitulo cerca; volveras a el mas de lo que crees. Nos vemos en el siguiente modulo, donde el mismo JavaScript se pone su traje de React. Un abrazo con aleta. — **Bit** 🐾
```
