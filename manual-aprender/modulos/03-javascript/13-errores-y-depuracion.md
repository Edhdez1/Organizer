# Capitulo 13 — Errores y depuracion

<p align="center">
  <img src="../../recursos/imagenes/03-javascript/cap13.png" alt="Ilustración del capítulo (pixel art con Bit)" width="640">
</p>


> Hola otra vez, soy **Bit**, tu ajolote programador. Hoy vamos a hablar de algo que asusta a casi todo principiante: los **errores**. Pero te cuento un secreto de ajolote: los errores no son tu enemigo, son mensajes que te dicen exactamente que arreglar. Un programador no es alguien que nunca se equivoca; es alguien que sabe leer sus errores y resolverlos con calma. Al terminar este capitulo vas a mirar la consola roja sin temblar. Respira, que arrancamos.

Cuando escribimos JavaScript, tarde o temprano el programa **falla**: una pantalla que no carga, un boton que no responde, un texto que sale como `undefined`. Eso es normal. Lo importante es tener herramientas para **encontrar** el problema (depurar) y **manejarlo** (controlar el error) sin que toda la aplicacion se caiga. Vamos paso a paso.

## 1. ¿Que es un error y por que aparece?

Un programa es un conjunto de instrucciones. Cuando una instruccion le pide al navegador algo imposible o mal escrito, el navegador **detiene** esa parte del codigo y lanza un error.

> ### 🟦 ¿Que significa? — *Error (en programacion)*
> Un **error** es un aviso que JavaScript genera cuando no puede ejecutar una instruccion. **Para que sirve:** te dice que algo salio mal y, casi siempre, en que linea. **Donde se usa en un repo real:** en `tunal-digital`, si en `main.js` llamas a una funcion que no existe o tocas una propiedad de algo vacio, el navegador lanza un error y el resto del script puede dejar de correr.

> ### 🟦 ¿Que significa? — *Consola (Console)*
> La **consola** es una ventana dentro de las herramientas del navegador donde aparecen los mensajes de tu programa: textos que tu imprimes y errores que JavaScript lanza. **Para que sirve:** es tu tablero de diagnostico. **Donde se usa en un repo real:** mientras pruebas el chat IA de `tunal-digital`, abres la consola para ver si la peticion al Worker respondio bien o fallo.

Para abrir la consola en casi cualquier navegador: pulsa **F12** o clic derecho sobre la pagina y elige **Inspeccionar**, luego ve a la pestaña **Console**.

> ### 💡 Tip
> Acostumbrate a tener la consola abierta SIEMPRE mientras programas en el navegador. Es como conducir mirando el tablero del auto: muchos problemas se ven ahi antes de que se vuelvan grandes.

## 2. Los tres errores que mas veras: SyntaxError, ReferenceError, TypeError

JavaScript tiene varios tipos de error, cada uno con un nombre. El nombre te dice **la categoria del problema**. Vamos con los tres mas comunes.

> ### 🟦 ¿Que significa? — *SyntaxError*
> Un **SyntaxError** (error de sintaxis) ocurre cuando el codigo esta **mal escrito** segun las reglas del lenguaje: un parentesis sin cerrar, una coma de mas, una llave que falta. **Para que sirve:** te avisa que el navegador ni siquiera pudo entender tu codigo. **Donde se usa en un repo real:** si en `main.js` de `tunal-digital` olvidas cerrar un `}` de una funcion, el archivo entero no corre y veras un SyntaxError.

```javascript
// SyntaxError: falta cerrar el parentesis
function saludar(nombre {
  console.log("Hola " + nombre);
}
// Uncaught SyntaxError: missing ) after argument list
```

> ### 🟦 ¿Que significa? — *ReferenceError*
> Un **ReferenceError** ocurre cuando usas un **nombre que no existe**: una variable o funcion que nunca declaraste, o que escribiste mal. **Para que sirve:** te indica que el navegador busco ese nombre y no lo encontro. **Donde se usa en un repo real:** en `tunal-digital`, si escribes `enviarFormularo()` en vez de `enviarFormulario()`, JavaScript no encuentra esa funcion y lanza un ReferenceError.

```javascript
// ReferenceError: usamos algo que no existe
console.log(mensaje);
// Uncaught ReferenceError: mensaje is not defined
```

> ### 🟦 ¿Que significa? — *TypeError*
> Un **TypeError** ocurre cuando un valor **no es del tipo** que esperabas: intentas llamar como funcion algo que no lo es, o leer una propiedad de `null` o `undefined`. **Para que sirve:** te avisa que el dato existe pero no se puede usar asi. **Donde se usa en un repo real:** en `tunal-digital`, si `document.querySelector(".chat")` no encuentra el elemento, devuelve `null`, y al hacer `.addEventListener(...)` sobre `null` salta un TypeError.

```javascript
// TypeError: el elemento no existe (es null)
const boton = document.querySelector("#no-existe");
boton.addEventListener("click", abrirChat);
// Uncaught TypeError: Cannot read properties of null (reading 'addEventListener')
```

> ### 🟦 ¿Que significa? — *null y undefined*
> **`null`** es un valor que significa "vacio a proposito"; **`undefined`** significa "esto no tiene valor todavia". **Para que sirve:** representan la ausencia de un dato. **Donde se usa en un repo real:** en `RachaSimple` (React + TypeScript), mientras los datos del usuario cargan desde Supabase con TanStack Query, una variable puede estar `undefined` un instante; si la usas sin revisar, salta un TypeError.

> ### ⚠️ Cuidado
> El TypeError mas frecuente del principiante es **"Cannot read properties of null/undefined"**. Casi siempre significa: "buscaste algo en el HTML y no lo encontre" o "ese dato aun no ha llegado". Antes de usar un valor, asegurate de que existe.

## 3. Leer el stack: el mapa hacia el error

Cuando ocurre un error, la consola no solo muestra el mensaje; muestra tambien el **stack trace**.

> ### 🟦 ¿Que significa? — *Stack trace (rastro de la pila)*
> El **stack trace** es la lista de funciones que se estaban ejecutando en el momento del error, desde la mas reciente hacia atras, con el archivo y la linea de cada una. **Para que sirve:** te dice donde explotó el error y como llego hasta ahi. **Donde se usa en un repo real:** en `Faro/Organizer` (Next.js + TypeScript), si la llamada a OpenAI falla, el stack te muestra la cadena de funciones hasta el punto exacto del fallo.

Asi se lee un mensaje de error tipico:

```
Uncaught TypeError: Cannot read properties of null (reading 'value')
    at enviarFormulario (main.js:42)
    at HTMLButtonElement.<anonymous> (main.js:88)
```

Lee de **arriba hacia abajo**:
1. **Primera linea:** el tipo de error (`TypeError`) y el mensaje.
2. **`at enviarFormulario (main.js:42)`:** donde fallo de verdad — funcion `enviarFormulario`, archivo `main.js`, **linea 42**. Ahi vas a mirar primero.
3. **Linea siguiente:** quien la llamo — un boton al que le hiciste clic.

> ### 💡 Tip
> Empieza siempre por la **linea mas alta que sea de TU codigo**. Si el stack menciona archivos de librerias (React, TanStack), salta esas y busca la primera que sea tuya, como `main.js:42`.

> ### 🔎 En tu codigo
> En `tunal-digital`, abre `main.js`, provoca un error a proposito (por ejemplo, escribe mal el nombre de una funcion de atajo) y observa el stack en la consola. Practica leer el numero de linea y abrir esa linea exacta en tu editor.

## 4. try / catch / throw: manejar errores sin caerse

A veces sabes que algo **puede** fallar (una peticion a internet, un dato que quiza no llegue). En esos casos no quieres que toda la pagina se rompa: quieres **capturar** el error y reaccionar con elegancia. Para eso existe `try...catch`.

> ### 🟦 ¿Que significa? — *try...catch*
> **`try...catch`** es una estructura que ejecuta un bloque de codigo "arriesgado" dentro de `try`; si algo falla, en vez de detener todo, salta al bloque `catch`, donde tu decides que hacer. **Para que sirve:** evita que un error tumbe toda la app y te deja mostrar un mensaje amable. **Donde se usa en un repo real:** en `tunal-digital`, el `fetch` al Worker de IA va dentro de un `try...catch` para que, si no hay internet, el chat muestre "intenta de nuevo" en vez de quedarse congelado.

```javascript
async function preguntarIA(texto) {
  try {
    const respuesta = await fetch("https://worker.tunal/chat", {
      method: "POST",
      body: JSON.stringify({ mensaje: texto }),
    });
    const datos = await respuesta.json();
    return datos.respuesta;
  } catch (error) {
    console.error("Fallo la peticion al Worker:", error);
    return "Lo siento, no pude responder. Intenta de nuevo.";
  }
}
```

> ### 🟦 ¿Que significa? — *Bloque catch y el objeto error*
> El **bloque `catch (error)`** recibe un objeto que describe lo que fallo. Ese objeto tiene `error.message` (texto del problema) y `error.name` (tipo de error). **Para que sirve:** te da los detalles para registrar o mostrar el fallo. **Donde se usa en un repo real:** en `Faro/Organizer`, al analizar un proyecto con IA, el `catch` registra `error.message` para saber si fallo Supabase, GitHub o OpenAI.

> ### 🟦 ¿Que significa? — *throw*
> **`throw`** lanza un error a proposito. Tu creas el error y lo "arrojas" para detener la ejecucion y avisar de una condicion invalida. **Para que sirve:** validar datos y forzar que alguien mas (un `catch`) los maneje. **Donde se usa en un repo real:** en `Faro/Organizer`, si falta una variable de entorno necesaria para OpenAI, el codigo del servidor puede hacer `throw new Error("Falta la API key")` para no continuar con datos incompletos.

```javascript
function dividir(a, b) {
  if (b === 0) {
    throw new Error("No se puede dividir entre cero");
  }
  return a / b;
}

try {
  dividir(10, 0);
} catch (error) {
  console.error(error.message); // No se puede dividir entre cero
}
```

> ### 🟦 ¿Que significa? — *Error (objeto) y new Error()*
> **`Error`** es un tipo de objeto que representa un fallo; **`new Error("mensaje")`** crea uno nuevo con tu propio texto. **Para que sirve:** empaquetar la descripcion del problema para lanzarlo o registrarlo. **Donde se usa en un repo real:** en `RachaSimple`, las funciones que hablan con Supabase devuelven un objeto de error; si decides cortar el flujo, puedes `throw new Error(error.message)`.

> ### ⚠️ Cuidado
> No envuelvas **todo** tu codigo en un `try...catch` gigante para "que no falle nunca". Eso esconde los errores y te deja a ciegas. Usa `try...catch` solo donde de verdad esperas un fallo (red, datos externos) y siempre registra el error con `console.error`.

> ### 🟦 ¿Que significa? — *finally*
> **`finally`** es un bloque opcional que se ejecuta SIEMPRE al final del `try...catch`, haya fallado o no. **Para que sirve:** limpiar cosas, como apagar un indicador de "cargando...". **Donde se usa en un repo real:** en `tunal-digital`, despues de la peticion del chat (salga bien o mal), un `finally` puede ocultar el spinner de "escribiendo...".

```javascript
async function preguntarIA(texto) {
  mostrarCargando(true);
  try {
    const r = await fetch("https://worker.tunal/chat", { method: "POST" });
    return await r.json();
  } catch (error) {
    console.error(error);
  } finally {
    mostrarCargando(false); // se apaga pase lo que pase
  }
}
```

## 5. console: tu primera herramienta de depuracion

Antes de herramientas sofisticadas, esta el humilde y poderoso `console`. Imprimir valores en momentos clave es la forma mas rapida de entender que esta pasando.

> ### 🟦 ¿Que significa? — *Depurar (debugging)*
> **Depurar** es el proceso de encontrar y corregir errores en tu codigo, observando que hace por dentro. **Para que sirve:** pasar de "no funciona" a "ya se exactamente por que". **Donde se usa en un repo real:** depuras `main.js` de `tunal-digital` cuando el formulario no envia y necesitas ver que valores recoge antes de mandarlos.

> ### 🟦 ¿Que significa? — *console.log()*
> **`console.log(valor)`** imprime un valor en la consola. **Para que sirve:** ver el contenido de una variable o confirmar que una linea se ejecuto. **Donde se usa en un repo real:** en `tunal-digital`, dentro de la funcion del formulario imprimes `console.log(nombre, email)` para confirmar que recoge bien los datos antes del fetch.

```javascript
function enviarFormulario() {
  const nombre = document.querySelector("#nombre").value;
  const email = document.querySelector("#email").value;
  console.log("Datos recogidos:", { nombre, email });
  // ...resto del envio
}
```

> ### 🟦 ¿Que significa? — *console.error()*
> **`console.error(valor)`** imprime un mensaje marcado como error (en rojo, con icono). **Para que sirve:** resaltar fallos para distinguirlos de mensajes normales. **Donde se usa en un repo real:** en el `catch` del fetch de `tunal-digital`, usas `console.error` para que el fallo de red destaque entre los demas logs.

> ### 🟦 ¿Que significa? — *console.table()*
> **`console.table(datos)`** muestra arreglos u objetos como una **tabla** ordenada con filas y columnas. **Para que sirve:** leer listas de datos comodamente. **Donde se usa en un repo real:** en `Faro/Organizer`, al traer la lista de proyectos desde Supabase, `console.table(proyectos)` te deja ver nombre, estado y progreso de cada uno en columnas.

```javascript
const proyectos = [
  { nombre: "tunal-digital", estado: "activo", progreso: 80 },
  { nombre: "PolyPaw", estado: "activo", progreso: 60 },
];
console.table(proyectos);
```

> ### 💡 Tip
> Pon una **etiqueta** clara en cada log: en vez de `console.log(x)`, escribe `console.log("valor de x:", x)`. Cuando tengas diez logs, agradeceras saber cual es cual. Y cuando termines de depurar, **borra** los `console.log` de prueba para no dejar la consola llena de ruido.

> ### 🔎 En tu codigo
> Recuerda que en `PolyPaw` (Python con Flet) la consola equivalente es `print()` y los datos viven en archivos `JSON`. El concepto es el mismo: imprimir valores para entender el flujo. Cambia el lenguaje, no la idea.

## 6. El debugger y los breakpoints en DevTools

Los `console.log` son geniales, pero a veces quieres **pausar** el programa y mirar todo con calma, paso a paso. Para eso estan las DevTools.

> ### 🟦 ¿Que significa? — *DevTools (herramientas de desarrollador)*
> Las **DevTools** son el conjunto de herramientas del navegador para inspeccionar y depurar paginas: Console, Sources (codigo), Network (peticiones) y mas. **Para que sirve:** examinar tu app por dentro mientras corre. **Donde se usa en un repo real:** depuras `tunal-digital` en la pestaña **Sources** para pausar `main.js`, y en **Network** para ver la peticion al Worker.

> ### 🟦 ¿Que significa? — *Breakpoint (punto de interrupcion)*
> Un **breakpoint** es una marca que pones en una linea para que el navegador **pause** la ejecucion justo ahi. **Para que sirve:** congelar el programa en un momento exacto y revisar el valor de cada variable. **Donde se usa en un repo real:** pones un breakpoint en la linea de `enviarFormulario` en `tunal-digital` para inspeccionar `nombre` y `email` antes del fetch.

Como poner un breakpoint:
1. Abre DevTools (**F12**) y ve a **Sources**.
2. Busca tu archivo (`main.js`).
3. Haz clic en el **numero de linea**: aparece un marcador azul.
4. Recarga o usa la pagina hasta que pase por esa linea. El programa se **pausa**.

> ### 🟦 ¿Que significa? — *debugger (palabra clave)*
> **`debugger;`** es una instruccion que, si tienes las DevTools abiertas, pausa el programa en esa linea, como un breakpoint escrito en el codigo. **Para que sirve:** marcar una pausa sin abrir Sources a mano. **Donde se usa en un repo real:** colocas `debugger;` dentro de la funcion del chat de `tunal-digital` para detenerte justo antes de enviar el mensaje.

```javascript
function enviarFormulario() {
  const nombre = document.querySelector("#nombre").value;
  debugger; // el programa se pausa aqui si DevTools esta abierto
  enviarDatos(nombre);
}
```

> ### 🟦 ¿Que significa? — *Step over / Step into (avanzar paso a paso)*
> **Step over** ejecuta la linea actual y pasa a la siguiente sin entrar en las funciones; **Step into** entra dentro de la funcion para seguirla por dentro. **Para que sirve:** recorrer el codigo con lupa, linea por linea. **Donde se usa en un repo real:** en `tunal-digital`, usas Step over para avanzar por `enviarFormulario` y Step into para meterte en la funcion `fetch` y ver que envia.

> ### 🟦 ¿Que significa? — *Watch y Scope (vigilar variables)*
> El panel **Scope** muestra el valor de todas las variables en el punto pausado; **Watch** te deja fijar variables concretas para vigilarlas. **Para que sirve:** ver como cambian los datos sin imprimir nada. **Donde se usa en un repo real:** en pausa dentro de `main.js`, miras en Scope cuanto vale `email` para confirmar que el usuario escribio algo.

> ### 💡 Tip
> Cuando estes pausado en un breakpoint, ve a la pestaña **Console** y escribe el nombre de una variable: el navegador te dice su valor **en ese instante**. Es como hacerle preguntas a tu programa congelado.

> ### ⚠️ Cuidado
> No olvides quitar las lineas `debugger;` antes de subir tu codigo. Si quedan y alguien abre DevTools, la pagina se pausará sin avisar y parecera "colgada".

## 7. Errores asincronos: cuando el fallo llega tarde

Mucho codigo moderno es **asincrono**: pide datos a internet y sigue trabajando mientras llegan. Los errores en ese mundo se manejan distinto.

> ### 🟦 ¿Que significa? — *Asincrono*
> **Asincrono** describe codigo que no se ejecuta de inmediato, sino que **espera** un resultado futuro (una respuesta de internet, por ejemplo) sin congelar el resto del programa. **Para que sirve:** mantener la app fluida mientras llegan datos. **Donde se usa en un repo real:** el chat IA y el formulario de `tunal-digital` usan codigo asincrono para hablar con el Worker sin bloquear la pagina.

> ### 🟦 ¿Que significa? — *Promesa (Promise)*
> Una **promesa** es un objeto que representa un resultado que llegara **mas tarde**: puede cumplirse (resolverse) o fallar (rechazarse). **Para que sirve:** manejar operaciones que tardan, como un `fetch`. **Donde se usa en un repo real:** `fetch` en `tunal-digital` devuelve una promesa; cuando llega la respuesta del Worker, esa promesa se resuelve.

> ### 🟦 ¿Que significa? — *async / await*
> **`async`** marca una funcion como asincrona; **`await`** dentro de ella espera a que una promesa termine antes de seguir. **Para que sirve:** escribir codigo asincrono que se lee de arriba abajo, casi como si fuera normal. **Donde se usa en un repo real:** en `tunal-digital`, la funcion del chat es `async` y hace `await fetch(...)` para esperar la respuesta de la IA.

La clave: con `async/await`, un fallo en un `await` se captura con `try...catch`, igual que un error normal.

```javascript
async function cargarRespuesta() {
  try {
    const r = await fetch("https://worker.tunal/chat");
    if (!r.ok) {
      throw new Error("El servidor respondio con error " + r.status);
    }
    const datos = await r.json();
    return datos;
  } catch (error) {
    console.error("Error asincrono:", error.message);
  }
}
```

> ### ⚠️ Cuidado
> `fetch` NO lanza error si el servidor responde con 404 o 500: la promesa **se cumple** igual. Por eso revisamos `r.ok` y, si es falso, hacemos `throw`. Es uno de los tropiezos clasicos del principiante con peticiones.

> ### 🟦 ¿Que significa? — *.catch() y .then()*
> Cuando no usas `async/await`, manejas la promesa con **`.then()`** (que corre si todo va bien) y **`.catch()`** (que corre si falla). **Para que sirve:** reaccionar al resultado de una promesa al estilo de cadena. **Donde se usa en un repo real:** en `RachaSimple`, TanStack Query trabaja con promesas por dentro; entender `.then`/`.catch` te ayuda a leer ese flujo.

> ### 🟦 ¿Que significa? — *Unhandled promise rejection*
> Una **"unhandled promise rejection"** es una promesa que fallo y **nadie** la capturo con `try...catch` ni `.catch()`. **Para que sirve (saberlo):** te avisa de un error asincrono que estas ignorando. **Donde se usa en un repo real:** si en `Faro/Organizer` olvidas capturar el fallo de una llamada a OpenAI, veras este aviso en la consola del servidor.

> ### 🔎 En tu codigo
> En `Faro/Organizer`, casi toda interaccion con Supabase, GitHub y OpenAI es asincrona. Acostumbrate a envolver cada `await` que toque la red en `try...catch` y a registrar `error.message`. Asi nunca tendras un fallo silencioso.

## 8. Errores comunes de principiante (y como resolverlos)

Vamos con un mini-catalogo de tropiezos clasicos. Si reconoces uno, ya casi lo resolviste.

> ### 🟦 ¿Que significa? — *Cannot read properties of null/undefined*
> Es el TypeError que aparece al **leer algo de un valor vacio**. **Para que sirve (entenderlo):** te dice que el objeto que esperabas no existe. **Donde se usa en un repo real:** en `tunal-digital`, `querySelector` devolvio `null` porque el selector no coincide con ningun elemento del HTML.
>
> **Como resolverlo:** revisa que el selector (`#id` o `.clase`) exista en el HTML y que el script corra **despues** de que el HTML cargo (script al final del `<body>` o con `defer`).

> ### 🟦 ¿Que significa? — *is not defined (ReferenceError)*
> Significa que usaste un nombre que el navegador no conoce. **Para que sirve (entenderlo):** casi siempre es un error de tipeo o una variable fuera de su sitio. **Donde se usa en un repo real:** en `main.js` de `tunal-digital`, llamar `abriChat()` en vez de `abrirChat()`.
>
> **Como resolverlo:** revisa la ortografia del nombre y que la variable este declarada **antes** de usarla y en el mismo ambito.

> ### 🟦 ¿Que significa? — *is not a function (TypeError)*
> Significa que intentaste **llamar** como funcion algo que no lo es. **Para que sirve (entenderlo):** la variable existe pero no es una funcion. **Donde se usa en un repo real:** confundir `array.length` (un numero) con `array.length()` (intentar llamarlo) en `tunal-digital`.
>
> **Como resolverlo:** verifica que el valor sea realmente una funcion; revisa si te sobra o falta un par de parentesis.

> ### ⚠️ Cuidado
> Muchos "errores" no lanzan mensaje rojo: simplemente el resultado sale mal. Por ejemplo, comparar con `==` en vez de `===` puede dar resultados raros. Cuando algo "no funciona" pero no hay error en consola, es momento de `console.log` y breakpoints.

> ### 🟦 ¿Que significa? — *Error de logica*
> Un **error de logica** es cuando el codigo corre sin lanzar error, pero hace algo distinto a lo que querias. **Para que sirve (entenderlo):** te recuerda que "sin errores rojos" no significa "correcto". **Donde se usa en un repo real:** en `RachaSimple`, un calculo de racha que cuenta un dia de mas no lanza error, pero el numero esta mal; lo cazas comparando lo que esperas contra lo que imprime.

> ### 💡 Tip — El metodo del patito de goma
> Cuando estes atascado, explica tu codigo **en voz alta**, linea por linea, a un objeto (un patito, o a mi, Bit). Al forzarte a verbalizar cada paso, muchas veces descubres el fallo tu mismo antes de terminar la frase. Suena raro, pero funciona de verdad.

> ### 🔎 En tu codigo
> Incluso fuera de JavaScript depuras leyendo mensajes. En `polypaw-nas` (servidor Ubuntu con Samba, Cockpit y Tailscale), cuando un servicio no arranca, lees los **logs** del sistema igual que aqui lees el stack: de arriba abajo, buscando la primera linea que explica la causa.

## 9. Una rutina de depuracion que siempre funciona

Cuando algo falle, sigue estos pasos en orden y rara vez te quedaras atascado:

1. **Lee el mensaje completo** en la consola: tipo de error y texto.
2. **Mira el stack:** ve a la primera linea de TU codigo y abre ese archivo y linea.
3. **Reproduce el error:** averigua que accion exacta lo dispara.
4. **Imprime valores** cerca del fallo con `console.log` etiquetados.
5. **Pausa con un breakpoint** si los logs no bastan y revisa el Scope.
6. **Forma una hipotesis** ("creo que `email` llega vacio") y **compruebala**.
7. **Arregla una sola cosa** y vuelve a probar. No cambies cinco cosas a la vez.
8. **Limpia** los `console.log` y `debugger;` de prueba.

> ### 💡 Tip
> Cambia **una cosa cada vez**. Si tocas cinco lineas y el error desaparece, no sabras cual lo arreglo, y volvera a aparecer. Paso a paso, como caminamos los ajolotes.

## ✅ Checklist — ¿ya domino esto?

- [ ] Se abrir la consola del navegador y la pestaña Sources.
- [ ] Distingo SyntaxError, ReferenceError y TypeError por su mensaje.
- [ ] Se leer un stack trace y encontrar la linea de mi codigo que fallo.
- [ ] Entiendo que `null` y `undefined` causan el clasico "Cannot read properties of...".
- [ ] Se usar `try...catch` para manejar codigo que puede fallar.
- [ ] Se lanzar mis propios errores con `throw new Error(...)`.
- [ ] Uso `finally` para limpiar cosas pase lo que pase.
- [ ] Diferencio `console.log`, `console.error` y `console.table` y cuando usar cada uno.
- [ ] Se poner un breakpoint y avanzar paso a paso con step over / step into.
- [ ] Entiendo que un fallo en un `await` se captura con `try...catch`.
- [ ] Se que `fetch` no falla solo por un 404 y reviso `r.ok`.
- [ ] Tengo una rutina ordenada para depurar y cambio una cosa a la vez.

## 🧪 Ejercicios

1. 💻 **Caza el SyntaxError.** Copia en un archivo `.js` una funcion a la que le falte cerrar una llave `}`. Abre la pagina, mira el error en consola e identifica el tipo y la linea. Luego arreglalo y confirma que desaparece.

2. 💻 **Provoca y lee un TypeError.** Escribe `document.querySelector("#noexiste").value` en la consola del navegador. Lee el mensaje completo, explica con tus palabras por que ocurre y como lo evitarias.

3. 💻 **Envuelve un fetch en try/catch.** Escribe una funcion `async` que haga `fetch` a una URL inventada (que fallara). Captura el error con `try...catch`, registra `error.message` con `console.error` y devuelve un texto amable como "no se pudo cargar".

4. 💻 **Practica breakpoints.** En un script con una funcion que sume dos numeros leidos de inputs, pon un breakpoint dentro de la funcion. Pausa el programa, mira los valores en Scope y avanza con step over hasta el `return`.

5. **Clasifica errores (sin computadora).** Para cada mensaje, di que tipo de error es y una causa probable: (a) `x is not defined`, (b) `Cannot read properties of null (reading 'value')`, (c) `missing ) after argument list`, (d) `boton.adEventListener is not a function`.

6. **Diseña tu validacion con throw (papel).** Imagina una funcion `registrarEdad(edad)` que debe rechazar edades negativas. Escribe en papel donde pondrias `throw new Error(...)` y como un `try...catch` que la llame mostraria el mensaje al usuario.

> ¡Lo lograste! Ahora los errores ya no son monstruos: son pistas. Cada mensaje rojo que leas con calma te hace mejor programador. Yo, Bit, sigo nadando a tu lado. En el proximo capitulo seguimos construyendo. Recuerda: programar es, en gran parte, depurar con paciencia.
