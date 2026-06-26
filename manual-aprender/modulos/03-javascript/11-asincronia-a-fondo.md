# Capitulo 11 — Asincronia a fondo

<p align="center">
  <img src="../../recursos/imagenes/03-javascript/cap11.png" alt="Ilustración del capítulo (pixel art con Bit)" width="640">
</p>


> Hola otra vez, soy **Bit**, tu ajolote favorito. Hasta ahora tu codigo corria de arriba hacia abajo, una linea tras otra, como cuando lees una receta paso a paso. Pero el mundo real no es tan paciente: pedir datos a internet, esperar la respuesta de una IA o leer un archivo toma tiempo, y mientras eso pasa tu programa **no puede quedarse congelado**. En este capitulo vamos a entender como JavaScript hace varias cosas "a la vez" sin trabarse. Respira: lo veremos despacio, con calma de anfibio, y con ejemplos reales de tu propio `main.js` de **tunal-digital**. Vamos.

## 1. ¿Por que necesitamos la asincronia?

Imagina que vas a una cafeteria. Pides un cafe y, en lugar de quedarte parado mirando la maquina hasta que termine, te sientas a revisar tu telefono. Cuando el cafe esta listo, el barista te avisa. Eso es **asincronia**: empezar algo que tarda, seguir con otras cosas, y reaccionar cuando termine.

En tu sitio **tunal-digital**, cuando un visitante escribe en el chat de IA y envias su pregunta a internet, esa respuesta puede tardar uno o dos segundos. Si el navegador se congelara durante ese tiempo, el usuario no podria ni mover el raton. La asincronia evita ese congelamiento.

> ### 🟦 ¿Que significa? — *Asincronia*
> Es la capacidad de **iniciar una tarea que tarda** (como pedir datos a internet) y **no detener el resto del programa** mientras esa tarea se completa. Cuando termina, tu codigo se entera y reacciona.
> **Para que sirve:** mantener la pagina fluida mientras se esperan cosas lentas (red, archivos, temporizadores).
> **Donde se usa en un repo real:** en `tunal-digital`, cada vez que el `main.js` hace `fetch` al Worker para responder en el chat de IA, eso es asincronia en accion.

> ### 🟦 ¿Que significa? — *Sincrono*
> Lo contrario de asincrono: el codigo se ejecuta **paso a paso, y cada linea espera** a que la anterior termine antes de continuar.
> **Para que sirve:** para logica normal que es instantanea (sumar, comparar, recorrer una lista).
> **Donde se usa en un repo real:** casi todo el codigo de calculo en `RachaSimple` (React+TS) que no toca la red es sincrono.

> ### 💡 Tip
> Regla mental: si algo "tarda" (internet, disco, esperar un tiempo), casi seguro es asincrono. Si es puro calculo en memoria, es sincrono.

## 2. El bucle de eventos, a grandes rasgos

Aqui viene la pregunta del millon: si JavaScript solo puede hacer **una cosa a la vez**, ¿como logra parecer que hace varias? La respuesta es el **bucle de eventos**.

> ### 🟦 ¿Que significa? — *Hilo unico (single-threaded)*
> JavaScript tiene **un solo "trabajador"** que ejecuta tu codigo. No hay dos lineas corriendo de verdad al mismo tiempo.
> **Para que sirve:** simplifica la programacion (no te peleas con varios trabajadores tocando lo mismo a la vez).
> **Donde se usa en un repo real:** todo el JS del navegador en `tunal-digital` corre en ese unico hilo.

> ### 🟦 ¿Que significa? — *Bucle de eventos (event loop)*
> Es el **organizador** de JavaScript. Mientras una tarea lenta se cocina "afuera" (la maneja el navegador), el bucle de eventos sigue atendiendo tu codigo. Cuando la tarea lenta termina, el bucle toma su resultado y lo pone en la fila para ejecutarlo.
> **Para que sirve:** dar la ilusion de hacer muchas cosas a la vez con un solo hilo.
> **Donde se usa en un repo real:** es el motor invisible que permite que el chat de `tunal-digital` espere la respuesta sin congelar la pagina.

Piensa en un mesero (el hilo unico). No cocina el, solo toma pedidos y entrega platos. La cocina (el navegador) prepara los platos lentos. Cuando un plato esta listo, el mesero lo recoge y lo lleva. El **bucle de eventos** es ese ir y venir del mesero, revisando una y otra vez si hay algo listo para entregar.

> ### 💡 Tip
> No necesitas entender el bucle de eventos al detalle para programar bien. Te basta con saber que **lo lento se delega y se reanuda despues**. Con eso entiendes el 90% de los bugs de asincronia.

> ### ⚠️ Cuidado
> Como el hilo es unico, si escribes un calculo enorme y bloqueante (por ejemplo un bucle de millones de vueltas), **congelas la pagina** aunque no haya red de por medio. La asincronia no parte el calculo en pedazos por arte de magia.

## 3. Callbacks: la primera forma de esperar

La manera mas antigua de manejar "avisame cuando termines" es pasar una **funcion** que se ejecutara despues.

> ### 🟦 ¿Que significa? — *Callback*
> Es una **funcion que le entregas a otra funcion** para que la llame "mas tarde", cuando algo termine.
> **Para que sirve:** reaccionar a eventos o a tareas que tardan, sin saber exactamente cuando ocurriran.
> **Donde se usa en un repo real:** en `main.js` de `tunal-digital`, cuando haces que un boton ejecute codigo "al hacer clic", esa funcion del clic es un callback.

Ejemplo sencillo con un temporizador:

```javascript
// setTimeout recibe un callback y un tiempo en milisegundos.
// "Avisame dentro de 2 segundos" — pero el codigo de abajo no espera.
console.log("Pido un cafe...");

setTimeout(function () {
  console.log("Cafe listo (2 segundos despues)");
}, 2000);

console.log("Mientras tanto, reviso el telefono");
```

Si lo corres, veras en la consola: "Pido un cafe...", luego "Mientras tanto, reviso el telefono", y solo despues de 2 segundos "Cafe listo". Eso demuestra que `setTimeout` **no detuvo** el programa.

> ### 🟦 ¿Que significa? — *setTimeout*
> Una funcion del navegador que ejecuta un callback **despues** de cierto tiempo en milisegundos (1000 ms = 1 segundo).
> **Para que sirve:** retrasar acciones, mostrar mensajes temporales, reintentar algo mas tarde.
> **Donde se usa en un repo real:** util en `tunal-digital` para ocultar un aviso de "mensaje enviado" tras unos segundos en el formulario de contacto.

> ### 🔎 En tu codigo
> En el `main.js` de `tunal-digital` ya usas callbacks sin darte cuenta: cada `addEventListener("click", ...)` y cada `addEventListener("submit", ...)` recibe un callback que el navegador llamara cuando ocurra ese evento. Los callbacks no son algo nuevo: ya los usabas.

## 4. El callback hell (el infierno de los callbacks)

Los callbacks funcionan, pero se vuelven feos cuando **una tarea depende de otra que depende de otra**. Imagina: primero pide el usuario, luego con ese usuario pide sus proyectos, luego con cada proyecto pide sus tareas. Si todo eso lo haces con callbacks anidados, te queda una piramide ilegible.

> ### 🟦 ¿Que significa? — *Callback hell (piramide de la perdicion)*
> Es el lio que aparece cuando **anidas muchos callbacks** uno dentro de otro, formando una escalera de codigo cada vez mas indentado y dificil de leer.
> **Para que sirve:** no sirve, es un problema a evitar. Es la senal de que necesitas promesas o async/await.
> **Donde se usa en un repo real:** lo evitarias en `Faro/Organizer`, que encadena varias llamadas (GitHub, luego Drive, luego OpenAI); con callbacks puros seria una pesadilla.

```javascript
// EJEMPLO de lo que NO quieres: callbacks anidados.
pedirUsuario(function (usuario) {
  pedirProyectos(usuario, function (proyectos) {
    pedirTareas(proyectos, function (tareas) {
      mostrar(tareas);
      // ...y si hay un cuarto paso, la escalera sigue creciendo a la derecha.
    });
  });
});
```

¿Ves como el codigo se va "cayendo" hacia la derecha? Ademas, manejar errores en cada nivel se vuelve repetitivo. Para resolver esto nacieron las **promesas**.

> ### ⚠️ Cuidado
> El callback hell no solo se ve feo: dificulta encontrar bugs y manejar errores. Si te sorprendes anidando tres o mas callbacks, detente y pasa a promesas o async/await.

## 5. Promesas: una caja con un resultado futuro

Una **promesa** es como un ticket que te dan en la tintoreria: todavia no tienes tu ropa, pero tienes un comprobante que dice "lista mas tarde". Con ese ticket puedes planear que haras cuando este lista, y que haras si algo sale mal.

> ### 🟦 ¿Que significa? — *Promesa (Promise)*
> Es un **objeto que representa un resultado que aun no esta listo**. Puede terminar de dos formas: cumplida (con un valor) o rechazada (con un error).
> **Para que sirve:** manejar tareas asincronas de forma ordenada y encadenable, sin anidar callbacks.
> **Donde se usa en un repo real:** `fetch` en `tunal-digital` **devuelve una promesa**; toda la comunicacion del chat de IA con el Worker se basa en promesas.

Una promesa pasa por **estados**:

> ### 🟦 ¿Que significa? — *Estados de una promesa (pending, fulfilled, rejected)*
> - **pending (pendiente):** todavia esperando, no se sabe el resultado.
> - **fulfilled (cumplida):** termino bien y trae un valor.
> - **rejected (rechazada):** termino mal y trae un error.
> **Para que sirve:** saber en que punto esta tu tarea y reaccionar segun corresponda.
> **Donde se usa en un repo real:** cuando el `fetch` del chat de `tunal-digital` esta esperando al Worker, la promesa esta *pending*; al llegar la respuesta pasa a *fulfilled*, y si falla la red, a *rejected*.

### 5.1 then, catch y finally

Para reaccionar a una promesa usas tres metodos:

> ### 🟦 ¿Que significa? — *.then()*
> Metodo de una promesa que registra **que hacer cuando se cumple** (cuando llega el resultado). Recibe un callback con el valor.
> **Para que sirve:** procesar el resultado exitoso de una tarea asincrona.
> **Donde se usa en un repo real:** en `tunal-digital`, tras el `fetch` se usa `.then()` para convertir la respuesta y mostrar el texto de la IA.

> ### 🟦 ¿Que significa? — *.catch()*
> Metodo que registra **que hacer si la promesa se rechaza** (si hubo un error).
> **Para que sirve:** mostrar un mensaje amable cuando algo falla, en lugar de dejar la pagina rota.
> **Donde se usa en un repo real:** en el chat de `tunal-digital`, para mostrar "Ups, no pude responder" si el Worker no contesta.

> ### 🟦 ¿Que significa? — *.finally()*
> Metodo que se ejecuta **al final, pase lo que pase** (haya exito o error).
> **Para que sirve:** limpiar cosas, como ocultar un spinner de "cargando" o reactivar un boton.
> **Donde se usa en un repo real:** en `tunal-digital`, para reactivar el boton "Enviar" del chat tanto si la respuesta llego como si fallo.

```javascript
// Una cadena de promesas con los tres metodos.
fetch("https://mi-worker.ejemplo.dev/chat")
  .then(function (respuesta) {
    // Esto corre si el fetch fue bien. Convertimos la respuesta a texto.
    return respuesta.text();
  })
  .then(function (texto) {
    // Recibimos el texto ya convertido del then anterior.
    console.log("La IA dijo:", texto);
  })
  .catch(function (error) {
    // Esto corre si CUALQUIER paso de arriba fallo.
    console.log("Algo salio mal:", error);
  })
  .finally(function () {
    // Esto corre siempre, al final de todo.
    console.log("Termine de intentarlo (con exito o no).");
  });
```

> ### 💡 Tip
> Fijate en el `return` dentro del primer `.then()`. Cuando devuelves algo en un `.then()`, ese valor llega al **siguiente** `.then()` de la cadena. Asi se encadena de forma plana, sin piramides. Adios callback hell.

> ### 🔎 En tu codigo
> El `main.js` de `tunal-digital` usa exactamente este patron para hablar con el Worker: un `fetch`, luego convertir la respuesta, luego pintar el mensaje de la IA, y un manejo de error por si la red falla. Reconocer esta cadena es reconocer el corazon del chat.

## 6. async/await: promesas que se leen como cuento

Las promesas con `.then()` ya son mejores que los callbacks, pero todavia hay que pensar en cadenas. La sintaxis **async/await** te deja escribir codigo asincrono que **se lee de arriba hacia abajo**, como si fuera sincrono. Es azucar visual sobre las promesas: por debajo siguen siendo promesas.

> ### 🟦 ¿Que significa? — *async*
> Una palabra que pones **antes de una funcion** para marcarla como asincrona. Una funcion `async` siempre devuelve una promesa.
> **Para que sirve:** habilitar el uso de `await` dentro de esa funcion.
> **Donde se usa en un repo real:** en `Faro/Organizer` (Next.js+TS), las funciones que llaman a OpenAI o a Supabase son `async`.

> ### 🟦 ¿Que significa? — *await*
> Una palabra que pones **antes de una promesa** y que significa "espera aqui hasta que se resuelva, y dame su valor". Solo funciona dentro de funciones `async`.
> **Para que sirve:** escribir tareas asincronas en orden, sin `.then()` encadenados.
> **Donde se usa en un repo real:** en `RachaSimple` y `Faro/Organizer`, para esperar datos de Supabase antes de seguir.

Compara el mismo chat escrito con async/await:

```javascript
// La misma logica del fetch, pero leida como un cuento de arriba a abajo.
async function preguntarIA(mensaje) {
  const respuesta = await fetch("https://mi-worker.ejemplo.dev/chat");
  const texto = await respuesta.text();
  console.log("La IA dijo:", texto);
  return texto;
}

preguntarIA("Hola");
```

¿No es mucho mas facil de leer? Cada `await` "pausa" esa funcion hasta tener el resultado, pero **no congela la pagina**: por debajo sigue siendo el bucle de eventos haciendo su magia.

> ### 💡 Tip
> `await` solo funciona dentro de funciones marcadas con `async`. Si intentas usar `await` en codigo suelto, JavaScript te dara error. Recuerda: primero `async` en la funcion, luego `await` adentro.

> ### ⚠️ Cuidado
> `await` hace que tu funcion espere ese resultado **antes de seguir**. Si pones muchos `await` en fila para tareas independientes, las haces una tras otra y tardas mas. Para tareas que pueden ir en paralelo, mira la siguiente seccion (`Promise.all`).

## 7. Manejar errores con try/catch

Con async/await ya no usas `.catch()`. En su lugar, envuelves el codigo que puede fallar en un bloque **try/catch**.

> ### 🟦 ¿Que significa? — *try/catch*
> Una estructura para **intentar** un codigo (`try`) y, si lanza un error, **atraparlo** (`catch`) en lugar de que el programa se rompa.
> **Para que sirve:** manejar fallos (red caida, respuesta invalida) de forma controlada y mostrar mensajes amables.
> **Donde se usa en un repo real:** en `Faro/Organizer`, cada llamada a OpenAI va dentro de try/catch para que un fallo de la IA no tumbe toda la app.

> ### 🟦 ¿Que significa? — *finally (en try/catch)*
> Un bloque opcional despues de `catch` que se ejecuta **siempre**, haya error o no. Es el primo de `.finally()` de las promesas.
> **Para que sirve:** limpiar al final (apagar un spinner, reactivar un boton).
> **Donde se usa en un repo real:** en el chat de `tunal-digital`, para volver a habilitar el campo de texto tras cada intento.

```javascript
async function preguntarIA(mensaje) {
  try {
    const respuesta = await fetch("https://mi-worker.ejemplo.dev/chat");
    const texto = await respuesta.text();
    console.log("La IA dijo:", texto);
    return texto;
  } catch (error) {
    // Cae aqui si el fetch falla o si algo lanza un error.
    console.log("No pude obtener respuesta:", error);
    return "Lo siento, intentalo de nuevo en un momento.";
  } finally {
    // Pase lo que pase, dejamos todo listo para el siguiente mensaje.
    console.log("Chat listo para otra pregunta.");
  }
}
```

> ### 🔎 En tu codigo
> El chat de IA de `tunal-digital` necesita exactamente este escudo: si el Worker no responde o el usuario no tiene internet, el `try/catch` evita que la pagina muestre un error feo en consola y, en cambio, le da al usuario un mensaje humano.

## 8. Promise.all: esperar varias cosas a la vez

A veces necesitas varios resultados que **no dependen entre si**. Por ejemplo, en `Faro/Organizer` quieres datos de GitHub **y** de Google Drive. No tiene sentido esperar uno y luego el otro: ¡lanzalos juntos!

> ### 🟦 ¿Que significa? — *Promise.all*
> Una funcion que recibe **una lista de promesas** y devuelve una sola promesa que se cumple cuando **todas** terminan. Te da un arreglo con todos los resultados, en el mismo orden.
> **Para que sirve:** acelerar cuando tienes varias tareas independientes; las haces en paralelo en vez de una por una.
> **Donde se usa en un repo real:** en `Faro/Organizer`, para pedir GitHub y Drive al mismo tiempo y juntar ambos resultados antes de analizarlos con IA.

```javascript
async function cargarFuentes() {
  try {
    // Lanzamos las dos peticiones a la vez (sin await individual antes).
    const [github, drive] = await Promise.all([
      fetch("/api/github").then((r) => r.json()),
      fetch("/api/drive").then((r) => r.json()),
    ]);

    console.log("Datos de GitHub:", github);
    console.log("Datos de Drive:", drive);
  } catch (error) {
    // Si CUALQUIERA de las dos falla, caemos aqui.
    console.log("Fallo al menos una fuente:", error);
  }
}
```

> ### ⚠️ Cuidado
> Con `Promise.all`, si **una sola** promesa se rechaza, toda la operacion se considera fallida y caes al `catch`, aunque las demas hayan ido bien. Si quieres que cada una falle por su cuenta sin tumbar al resto, existe `Promise.allSettled` (mas avanzado, lo veras cuando lo necesites).

> ### 💡 Tip
> Truco mental: usa `await` simple para pasos que **dependen** uno del otro (necesito el usuario antes de pedir sus proyectos), y `Promise.all` para pasos **independientes** que pueden correr juntos. Eso ya te hace pensar como un dev senior.

## 9. fetch completo: headers, body y respuesta

Ya usamos `fetch` varias veces. Ahora veamoslo entero, porque es la herramienta que conecta tu sitio con el resto de internet.

> ### 🟦 ¿Que significa? — *fetch*
> La funcion del navegador para **hacer peticiones a internet** (a una API, a un Worker). Devuelve una promesa con la respuesta.
> **Para que sirve:** enviar y recibir datos del servidor sin recargar la pagina.
> **Donde se usa en un repo real:** en `main.js` de `tunal-digital`, para enviar el mensaje del usuario al Worker y traer la respuesta de la IA.

> ### 🟦 ¿Que significa? — *Peticion HTTP (request)*
> El "mensaje" que tu navegador envia al servidor. Lleva un metodo (GET para pedir, POST para enviar), una direccion (URL) y, a veces, datos.
> **Para que sirve:** comunicarte con servicios externos siguiendo las reglas de la web.
> **Donde se usa en un repo real:** cada mensaje del chat de `tunal-digital` viaja como una peticion POST al Worker.

> ### 🟦 ¿Que significa? — *Headers (cabeceras)*
> Datos extra que acompanan la peticion, como "el contenido que envio es JSON" o una clave de autenticacion.
> **Para que sirve:** decirle al servidor en que formato hablas y quien eres.
> **Donde se usa en un repo real:** en `tunal-digital`, el header `Content-Type: application/json` le avisa al Worker que el cuerpo del mensaje es JSON.

> ### 🟦 ¿Que significa? — *Body (cuerpo)*
> Los **datos que envias** en una peticion POST, normalmente texto en formato JSON.
> **Para que sirve:** mandar informacion al servidor (el mensaje del usuario, un formulario).
> **Donde se usa en un repo real:** en el chat de `tunal-digital`, el body lleva el texto que el visitante escribio.

> ### 🟦 ¿Que significa? — *JSON*
> Un formato de texto para representar datos (objetos, listas, numeros) que tanto JavaScript como los servidores entienden facilmente.
> **Para que sirve:** intercambiar datos estructurados entre cliente y servidor.
> **Donde se usa en un repo real:** `PolyPaw` guarda sus misiones en archivos JSON; `tunal-digital` envia y recibe JSON en el chat.

> ### 🟦 ¿Que significa? — *JSON.stringify y .json()*
> `JSON.stringify(objeto)` convierte un objeto de JavaScript en **texto JSON** para enviarlo. El metodo `respuesta.json()` hace lo contrario: convierte el **texto JSON recibido** en un objeto de JavaScript.
> **Para que sirve:** traducir entre el mundo de objetos de JS y el texto que viaja por internet.
> **Donde se usa en un repo real:** en `tunal-digital`, `JSON.stringify` arma el body del mensaje y `.json()` desempaca la respuesta de la IA.

Un `fetch` completo con todas sus partes:

```javascript
async function enviarMensajeAlChat(textoUsuario) {
  try {
    const respuesta = await fetch("https://mi-worker.ejemplo.dev/chat", {
      method: "POST", // Enviamos datos, no solo pedimos.
      headers: {
        "Content-Type": "application/json", // Avisamos que el body es JSON.
      },
      body: JSON.stringify({ mensaje: textoUsuario }), // Datos como texto JSON.
    });

    // respuesta.ok es true si el servidor respondio bien (codigo 200-299).
    if (!respuesta.ok) {
      throw new Error("El servidor respondio con error: " + respuesta.status);
    }

    const datos = await respuesta.json(); // Convertimos la respuesta a objeto.
    return datos.respuesta; // El texto que genero la IA.
  } catch (error) {
    console.log("Error en el chat:", error);
    return "No pude responder ahora mismo. Intenta de nuevo.";
  }
}
```

> ### 🟦 ¿Que significa? — *respuesta.ok y respuesta.status*
> `respuesta.status` es el **codigo numerico** que envia el servidor (200 = todo bien, 404 = no encontrado, 500 = error del servidor). `respuesta.ok` es un atajo: vale `true` si el codigo esta entre 200 y 299.
> **Para que sirve:** saber si la peticion realmente funciono antes de usar los datos.
> **Donde se usa en un repo real:** en `tunal-digital`, conviene revisar `respuesta.ok` antes de leer la respuesta del Worker, para no procesar una respuesta de error.

> ### 🟦 ¿Que significa? — *throw (lanzar un error)*
> La palabra que usas para **provocar un error a proposito**, que sera atrapado por el `catch` mas cercano.
> **Para que sirve:** cortar el flujo cuando detectas que algo no esta bien (por ejemplo, una respuesta con error).
> **Donde se usa en un repo real:** en `Faro/Organizer`, para lanzar un error claro si Supabase o OpenAI devuelven algo invalido.

> ### ⚠️ Cuidado
> Un detalle que confunde a todos al principio: `fetch` **no** lanza error si el servidor responde 404 o 500. Solo falla si no hubo conexion. Por eso debes revisar `respuesta.ok` tu mismo y lanzar el error con `throw` si hace falta.

> ### 🔎 En tu codigo
> El chat de IA de `tunal-digital` reune todo lo de este capitulo: un boton con su callback de `submit`, una funcion `async`, un `fetch` POST con headers y body JSON, un `await respuesta.json()`, un `try/catch` para los fallos y un `finally` para reactivar el boton. Si entendiste este capitulo, ya entiendes como late el corazon de tu sitio.

## 10. Juntandolo todo: el chat de IA paso a paso

Veamos el flujo completo del chat, como ocurre de verdad en `tunal-digital`:

```javascript
const formulario = document.querySelector("#chat-form");
const campo = document.querySelector("#chat-input");
const boton = document.querySelector("#chat-enviar");

// El callback del evento "submit" se marca como async para usar await dentro.
formulario.addEventListener("submit", async function (evento) {
  evento.preventDefault(); // Evita que la pagina se recargue.

  const texto = campo.value.trim();
  if (texto === "") return; // No enviamos mensajes vacios.

  boton.disabled = true; // Bloqueamos el boton mientras esperamos.

  try {
    const respuestaIA = await enviarMensajeAlChat(texto);
    mostrarEnPantalla(respuestaIA); // Pintamos la respuesta en el chat.
  } catch (error) {
    mostrarEnPantalla("Hubo un problema. Intenta de nuevo.");
  } finally {
    boton.disabled = false; // Reactivamos el boton, pase lo que pase.
    campo.value = ""; // Limpiamos el campo.
  }
});
```

Lee ese codigo despacio. Cada pieza que ves ya la definimos: el callback del evento, `async`/`await`, la llamada con `fetch`, el `try/catch/finally`. Todo el capitulo cabe en un solo flujo real. Eso es lo bonito de la asincronia: pocas piezas, bien combinadas.

> ### 💡 Tip
> `evento.preventDefault()` evita el comportamiento por defecto del formulario (recargar la pagina). En sitios con `fetch` es casi obligatorio, porque queremos enviar los datos nosotros y quedarnos en la misma pagina.

## ✅ Checklist — ¿ya domino esto?

- [ ] Explico con mis palabras que es la asincronia y por que evita que la pagina se congele.
- [ ] Entiendo la idea del bucle de eventos: lo lento se delega y se reanuda despues.
- [ ] Reconozco un callback y se que `addEventListener` recibe uno.
- [ ] Identifico el callback hell y se que se evita con promesas o async/await.
- [ ] Se que una promesa tiene tres estados: pending, fulfilled y rejected.
- [ ] Uso `.then()`, `.catch()` y `.finally()` en una cadena de promesas.
- [ ] Escribo una funcion `async` y uso `await` dentro de ella.
- [ ] Manejo errores asincronos con `try/catch/finally`.
- [ ] Uso `Promise.all` para tareas independientes en paralelo.
- [ ] Hago un `fetch` POST completo con `method`, `headers` y `body` (JSON).
- [ ] Reviso `respuesta.ok` antes de leer los datos y se que `fetch` no falla solo por un 404.
- [ ] Convierto datos con `JSON.stringify` y `respuesta.json()`.

## 🧪 Ejercicios

1. 💻 **El cafe asincrono.** Escribe un `setTimeout` que muestre "Cafe listo" despues de 3 segundos. Antes y despues del `setTimeout`, agrega dos `console.log`. Corre el codigo y anota en que orden aparecen los mensajes. Explica con tus palabras por que.

2. 💻 **De cadena a async/await.** Toma la cadena de promesas con `.then()` de la seccion 5 y reescribela usando una funcion `async` con `await`. Comprueba que hace lo mismo. ¿Cual te parece mas facil de leer?

3. 💻 **Atrapa el error.** Haz un `fetch` a una URL inventada que no existe (por ejemplo `https://no-existe-este-sitio-xyz.dev`). Envuelvelo en `try/catch` y muestra un mensaje amable en consola cuando falle. Confirma que tu programa no se rompe.

4. 💻 **Dos a la vez.** Usando `Promise.all`, lanza dos `fetch` a la vez hacia dos APIs publicas cualquiera (o dos URLs de prueba). Muestra ambos resultados. Luego conviertelo a dos `await` seguidos y observa que ahora tardan mas (van uno tras otro).

5. **Detective del 404.** Sin codigo: explica con tus palabras por que `fetch` NO cae al `catch` cuando el servidor responde 404, y que debes hacer tu para detectar ese caso. (Pista: `respuesta.ok` y `throw`.)

6. 💻 **Tu mini chat.** Simula el chat de `tunal-digital`: una funcion `async` que reciba un texto, espere 1 segundo con una promesa, y devuelva "La IA dice: " + el texto en mayusculas. Llamala con `await` y muestra el resultado. Bonus: agrega un `finally` que imprima "Listo para otra pregunta".

> Lo lograste. Antes de este capitulo, "esperar" en JavaScript te sonaba a magia negra; ahora sabes que detras solo hay promesas, un bucle de eventos paciente y unas cuantas palabras como `async`, `await` y `try/catch`. El chat de IA de tu sitio ya no es un misterio: es codigo que tu entiendes linea por linea. Yo, **Bit**, me voy a flotar un rato en mi pecera mientras tu practicas los ejercicios. Nos vemos en el siguiente capitulo. 🐾
