# Capitulo 10 — Funciones a fondo

<p align="center">
  <img src="../../recursos/imagenes/03-javascript/cap10.png" alt="Ilustración del capítulo (pixel art con Bit)" width="640">
</p>


> Hola, soy **Bit**, el ajolote del manual. En los capitulos pasados ya escribiste tus primeras funciones: esas cajitas que reciben datos y devuelven un resultado. Hoy las vamos a abrir, mirar por dentro y descubrir algo que cambia bastante la forma de programar: en JavaScript una funcion no es solo una receta, es **un valor que puedes pasar de mano en mano**. Iremos con calma, te lo prometo. Cada palabra rara la dejo primero en un recuadro azul antes de soltarla en el texto. Respira, agarra agua y vamos nadando despacio.

Las funciones son el corazon de JavaScript. Si este capitulo te queda claro de verdad, vas a notar dos cosas. La primera: tu codigo del proyecto **tunal-digital** (ese `main.js` con sus atajos, su `fetch` al Worker y su chat con IA) dejara de parecerte magia. La segunda: cuando lleguemos al **Modulo 06 (React)**, entenderas por que React esta hecho casi entero de funciones. Empecemos.

---

## 1. Una funcion tambien es un valor

Hasta ahora pensabas en una funcion como en una accion: "haz esto". Y esta bien, pero en JavaScript una funcion es ademas un **dato** que puede vivir en una variable, igual que un numero o un texto.

> ### 🟦 ¿Que significa? — *Valor de primera clase (first-class)*
> Decimos que las funciones son "valores de primera clase" cuando el lenguaje las trata como a cualquier otro dato: puedes guardarlas en una variable, meterlas en un array, pasarlas a otra funcion y devolverlas. **Para que sirve:** te deja construir piezas reutilizables y combinarlas a tu gusto. **Donde se usa en un repo real:** en `main.js` de **tunal-digital**, las funciones que abren el chat o envian el formulario se guardan y luego se "enchufan" a los botones; son valores que el navegador llama cuando toca.

Mira la diferencia entre **llamar** una funcion y **referirse** a ella:

```javascript
function saludar() {
  return "Hola desde Tunal";
}

const resultado = saludar();   // LLAMAS la funcion: resultado = "Hola desde Tunal"
const referencia = saludar;    // GUARDAS la funcion: referencia es la funcion misma

console.log(resultado);   // "Hola desde Tunal"
console.log(referencia);  // [Function: saludar]
console.log(referencia()); // "Hola desde Tunal" (ahora si la llamas)
```

Todo depende de los parentesis. `saludar()`, con parentesis, **ejecuta** la funcion y te entrega lo que devuelve. `saludar`, sin parentesis, **es** la funcion en si, todavia sin ejecutar.

> ### ⚠️ Cuidado
> Confundir `saludar` con `saludar()` es uno de los tropiezos mas comunes al principio. Cuando le das una funcion a un boton, casi siempre quieres pasarle `saludar` (sin parentesis), porque le estas diciendo "guardate esta funcion para mas tarde". Si pones `saludar()`, la ejecutas **ahora mismo** y el boton recibe el resultado, no la funcion. Volvemos a esto en la seccion 2.

---

## 2. Callbacks: una funcion que le das a otra

Como una funcion es un valor, nada te impide pasarla como argumento a otra funcion. Y eso tiene nombre propio.

> ### 🟦 ¿Que significa? — *Callback*
> Un *callback* es una funcion que le entregas a otra funcion para que la llame **mas tarde**, cuando ocurra algo. La palabra significa "vuelve a llamar": tu pasas la funcion y dices "llamame cuando pase tal cosa". **Para que sirve:** reaccionar a eventos (un clic, una respuesta del servidor) sin saber de antemano cuando van a pasar. **Donde se usa en un repo real:** en `main.js` de **tunal-digital**, cuando haces `boton.addEventListener("click", abrirChat)`, la funcion `abrirChat` es el callback que el navegador guarda y dispara cuando el usuario hace clic.

```javascript
const boton = document.querySelector("#abrir-chat");

function abrirChat() {
  console.log("Abriendo el chat de IA...");
}

// Le pasamos abrirChat SIN parentesis: es un callback.
boton.addEventListener("click", abrirChat);
```

Fijate bien: pasamos `abrirChat` sin parentesis. Le estamos dando la funcion al navegador para que sea **el** quien la llame cuando haya un clic. Si escribieramos `addEventListener("click", abrirChat())`, ejecutariamos `abrirChat` de inmediato y le pasariamos su resultado (probablemente `undefined`) al evento. Ese es el error clasico.

A veces el callback ni siquiera necesita nombre: lo escribes ahi mismo, "anonimo".

> ### 🟦 ¿Que significa? — *Funcion anonima*
> Una *funcion anonima* es una funcion sin nombre que escribes justo en el lugar donde la necesitas. **Para que sirve:** cuando solo la vas a usar una vez, no vale la pena bautizarla. **Donde se usa en un repo real:** en `main.js` de **tunal-digital**, el `submit` del formulario suele llevar una funcion anonima inline que evita el envio por defecto y dispara el `fetch`.

```javascript
const formulario = document.querySelector("#contacto");

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault(); // evita que la pagina se recargue
  console.log("Enviando datos del formulario...");
});
```

> ### 💡 Tip
> El parametro `evento` (muchos lo abrevian como `e`) lo crea y te lo entrega el navegador solo, sin que hagas nada. Dentro trae la informacion de lo que paso: que elemento se toco, que tecla se pulso, etc. Tu unica tarea es recibirlo en el callback.

---

## 3. Funciones de orden superior

Si una funcion es capaz de recibir o devolver otra funcion, se gana un titulo elegante.

> ### 🟦 ¿Que significa? — *Funcion de orden superior (higher-order)*
> Es una funcion que hace al menos una de estas dos cosas: **recibe** una funcion como argumento, o **devuelve** una funcion. **Para que sirve:** te deja escribir una logica generica y personalizar el comportamiento con la funcion que le pasas. **Donde se usa en un repo real:** los metodos de array como `.map`, `.filter` y `.forEach` son funciones de orden superior; en **RachaSimple** (React+TS) se usan a cada rato para transformar las listas de rachas antes de pintarlas.

Los tres metodos de array mas usados son justamente de orden superior. Veamoslos con una lista de servicios de Tunal Digital.

```javascript
const servicios = [
  { nombre: "Sitio web", precio: 800 },
  { nombre: "SEO local", precio: 300 },
  { nombre: "Chat IA", precio: 500 },
];

// forEach: ejecuta un callback por cada elemento (no devuelve nada util)
servicios.forEach(function (s) {
  console.log(s.nombre);
});

// map: crea un array NUEVO transformando cada elemento
const nombres = servicios.map(function (s) {
  return s.nombre;
});
// nombres === ["Sitio web", "SEO local", "Chat IA"]

// filter: crea un array NUEVO solo con los que cumplen una condicion
const baratos = servicios.filter(function (s) {
  return s.precio < 600;
});
// baratos === [{SEO local...}, {Chat IA...}]
```

> ### 🔎 En tu codigo
> En **tunal-digital**, cuando el chat de IA recibe una lista de mensajes desde el Worker, lo natural es recorrerla con `.map` para convertir cada mensaje en un trozo de HTML. En **Faro/Organizer** (Next.js+React), el roadmap de un proyecto es un array de fases que se renderiza con `.map`. Dominar estos tres metodos te ahorra una montaña de bucles `for`.

> ### 🟦 ¿Que significa? — *Inmutable / array nuevo*
> "Inmutable" significa que **no se modifica el original**. `map` y `filter` no tocan tu array de partida: te devuelven uno nuevo. **Para que sirve:** evita esos errores raros en los que algo cambia a tus espaldas. **Donde se usa en un repo real:** React (RachaSimple, Faro) se apoya en esta idea; en el Modulo 06 veremos que, para que React note los cambios, casi siempre creamos datos nuevos en vez de modificar los viejos.

---

## 4. Ambito (scope): donde viven las variables

Antes de meternos con los closures, necesitas tener claro el concepto de **ambito**. Tranquilo, es mas sencillo de lo que suena el nombre.

> ### 🟦 ¿Que significa? — *Ambito (scope)*
> El *ambito* es la zona del codigo donde una variable existe y se puede usar. Fuera de su ambito, esa variable es invisible. **Para que sirve:** mantiene ordenado tu programa; cada funcion tiene sus propias variables sin pisar las de otra. **Donde se usa en un repo real:** en cualquier funcion de `main.js` de **tunal-digital**, las variables que declaras dentro solo viven ahi; gracias a eso el formulario y el chat no se mezclan por accidente.

Hay dos sabores principales:

> ### 🟦 ¿Que significa? — *Ambito global vs. ambito local*
> El *ambito global* es el nivel de afuera de todo: lo que declaras ahi lo ve cualquier parte del programa. El *ambito local* es el de dentro de una funcion: lo que declaras ahi solo lo ve esa funcion. **Para que sirve:** lo local te protege; tener pocas cosas en global evita choques de nombres. **Donde se usa en un repo real:** en **tunal-digital** una constante como la URL del Worker puede vivir arriba (casi global) mientras los datos temporales del formulario viven dentro de la funcion.

```javascript
const URL_WORKER = "https://api.tunal.workers.dev"; // ambito de modulo (visible abajo)

function enviarMensaje(texto) {
  const cuerpo = { mensaje: texto }; // ambito LOCAL: solo vive aqui dentro
  console.log(URL_WORKER); // OK: puede ver lo de afuera
  return cuerpo;
}

enviarMensaje("hola");
console.log(cuerpo); // ERROR: cuerpo no existe aqui afuera
```

Guardate esta regla mental: **desde adentro puedes mirar hacia afuera, pero desde afuera no puedes mirar hacia adentro.** Una funcion ve las variables de su alrededor, pero el mundo de afuera no tiene ni idea de lo que pasa dentro de la funcion.

> ### 🟦 ¿Que significa? — *Ambito de bloque (let y const)*
> Un *bloque* es todo lo que va entre llaves `{ }` (un `if`, un `for`, etc.). Las variables con `let` y `const` solo viven dentro del bloque donde nacen. **Para que sirve:** evita que una variable se escape a sitios donde no la quieres. **Donde se usa en un repo real:** en los bucles de cualquiera de tus repos JS; cada vuelta de un `for` con `let` tiene su propia copia.

```javascript
if (true) {
  const secreto = 42;
  console.log(secreto); // 42, aqui si existe
}
console.log(secreto); // ERROR: secreto murio al cerrar la llave
```

> ### ⚠️ Cuidado
> La vieja palabra `var` **no** respeta el ambito de bloque: se escapa de los `if` y los `for` y te trae sorpresas desagradables. En este manual usamos siempre `const`, y `let` solo cuando de verdad necesitas reasignar. A `var` ya puedes olvidarla.

---

## 5. Closures: la funcion que se acuerda

Llegamos a la palabra que asusta a medio internet. Vas a ver que, despues de entender el ambito, es casi natural.

> ### 🟦 ¿Que significa? — *Closure (clausura)*
> Un *closure* ocurre cuando una funcion **recuerda** las variables del lugar donde fue creada, aunque la ejecutes mucho mas tarde y en otro sitio. La funcion "se lleva consigo" su entorno. **Para que sirve:** guardar un estado privado entre llamadas y crear funciones a la medida. **Donde se usa en un repo real:** en `main.js` de **tunal-digital**, una funcion que crea atajos (un "fabricador" de manejadores) usa closures para recordar a que elemento o a que URL apunta cada atajo.

Vamos por partes. Primero, una funcion que **devuelve** otra funcion:

```javascript
function crearContador() {
  let cuenta = 0; // esta variable vive en el ambito de crearContador

  // devolvemos una funcion que recuerda "cuenta"
  return function () {
    cuenta = cuenta + 1;
    return cuenta;
  };
}

const contar = crearContador();
console.log(contar()); // 1
console.log(contar()); // 2
console.log(contar()); // 3
```

Aqui esta lo curioso: cuando `crearContador()` termina, lo logico seria que `cuenta` desapareciera. Pero la funcion que devolvimos **se aferra** a ella. Cada vez que llamas `contar()`, esa misma `cuenta` sigue viva, escondida, sumando. Eso es un closure: la funcion interior **cerro** alrededor de `cuenta`.

Otro ejemplo mas pegado a tu codigo, un "fabricador" de saludos:

```javascript
function crearSaludo(nombre) {
  // la funcion devuelta recuerda "nombre"
  return function () {
    return "Hola, " + nombre + ", bienvenido a Tunal";
  };
}

const saludarAna = crearSaludo("Ana");
const saludarLuis = crearSaludo("Luis");

console.log(saludarAna());  // "Hola, Ana, bienvenido a Tunal"
console.log(saludarLuis()); // "Hola, Luis, bienvenido a Tunal"
```

`saludarAna` y `saludarLuis` son dos funciones distintas, y cada una recuerda su propio `nombre`. No se pisan entre ellas.

> ### 🔎 En tu codigo
> Cada vez que en `main.js` de **tunal-digital** escribes un callback dentro de otra funcion y usas una variable de afuera (la URL del Worker, el elemento del formulario), estas creando un closure sin darte cuenta. Por eso funciona aunque el callback se ejecute segundos despues, cuando el usuario hace clic. Y en el **Modulo 06 (React)**, el hook `useState` esta construido sobre closures: por eso un componente "recuerda" su estado entre renders.

> ### 💡 Tip
> No te obsesiones con memorizar la definicion exacta de closure. Quedate con la imagen: **una funcion es como una mochila que se lleva las variables de su vecindario.** Cuando la abres mas tarde, las variables siguen ahi dentro.

---

## 6. Parametros por defecto y rest

Dos comodidades modernas que vuelven tus funciones mas flexibles y mas faciles de leer.

> ### 🟦 ¿Que significa? — *Parametro por defecto*
> Es un valor que la funcion usa **cuando no le pasas ese argumento**. Se escribe con `=` en la definicion. **Para que sirve:** evita errores cuando falta un dato y te ahorra escribir `if`s. **Donde se usa en un repo real:** en **PolyPaw** (Python) tambien existe esta idea; en JS, una funcion de `main.js` que arma una peticion al Worker puede traer un modelo de IA por defecto si no le indicas otro.

```javascript
function enviarAlChat(mensaje, modelo = "gpt-mini") {
  console.log("Enviando:", mensaje, "con modelo", modelo);
}

enviarAlChat("Hola");              // usa "gpt-mini" por defecto
enviarAlChat("Hola", "gpt-grande"); // usa "gpt-grande"
```

> ### 🟦 ¿Que significa? — *Parametro rest (...)*
> El parametro *rest* (los tres puntos `...`) recoge **todos los argumentos que sobran** en un solo array. La palabra "rest" significa "el resto". **Para que sirve:** escribir funciones que aceptan una cantidad variable de argumentos. **Donde se usa en un repo real:** util en cualquier funcion de log de tus repos; tambien lo veras en React para pasar "todas las demas props" a un componente hijo.

```javascript
function registrar(nivel, ...detalles) {
  // detalles es un ARRAY con todo lo que viene despues de nivel
  console.log("[" + nivel + "]", detalles.join(" - "));
}

registrar("INFO", "usuario entro");                 // [INFO] usuario entro
registrar("ERROR", "fallo el fetch", "codigo 500"); // [ERROR] fallo el fetch - codigo 500
```

> ### ⚠️ Cuidado
> Ojo con no mezclar el *rest* (`...` en la **definicion**, recoge muchos en un array) con el *spread*, que es el mismo `...` pero al **llamar** o al construir, donde **reparte** un array en piezas sueltas. Mismo simbolo, trabajo opuesto. Al spread lo veras cuando copies objetos en React: `{ ...proyecto, estado: "activo" }`.

```javascript
const numeros = [3, 7, 2];
console.log(Math.max(...numeros)); // spread: reparte como Math.max(3, 7, 2) -> 7
```

---

## 7. Arrow functions vs. function (y el famoso `this`)

Hay dos maneras de escribir funciones. La palabra `function` ya la conoces. Ahora te presento a su prima compacta.

> ### 🟦 ¿Que significa? — *Arrow function (funcion flecha)*
> Es una forma corta de escribir funciones usando la flecha `=>`. **Para que sirve:** escribir callbacks cortos de forma limpia. **Donde se usa en un repo real:** en **RachaSimple** y **Faro** (React+TS), casi todos los callbacks de `.map`, los manejadores de eventos y los efectos se escriben como arrow functions, justamente porque son breves.

Compara la misma funcion en los dos estilos:

```javascript
// Estilo clasico
const dobleA = function (n) {
  return n * 2;
};

// Arrow equivalente
const dobleB = (n) => {
  return n * 2;
};

// Arrow corta: si solo hay un "return", quitas llaves y la palabra return
const dobleC = (n) => n * 2;

console.log(dobleA(4), dobleB(4), dobleC(4)); // 8 8 8
```

Con `.map` quedan cortas y elegantes:

```javascript
const servicios = ["Sitio web", "SEO local", "Chat IA"];
const enMayusculas = servicios.map((s) => s.toUpperCase());
// ["SITIO WEB", "SEO LOCAL", "CHAT IA"]
```

> ### 💡 Tip
> Si la arrow recibe **un solo** parametro, puedes quitar los parentesis: `s => s.toUpperCase()`. Si recibe cero, dos o mas, los parentesis son obligatorios: `() => ...` o `(a, b) => ...`. Mi consejo: deja siempre los parentesis. Se lee mas facil y te ahorras dudas.

Y ahora la parte que confunde a casi todo el mundo: la palabra `this`.

> ### 🟦 ¿Que significa? — *this*
> `this` es una palabra especial que apunta al **objeto que esta ejecutando la funcion** en ese momento. Su valor cambia segun **como** se llame la funcion. **Para que sirve:** dentro de un metodo, acceder a los datos del propio objeto. **Donde se usa en un repo real:** en JS orientado a objetos y en algunas APIs del navegador; en **tunal-digital**, dentro de un manejador de evento clasico, `this` apunta al elemento del DOM que disparo el evento.

```javascript
const proyecto = {
  nombre: "Tunal Digital",
  describir: function () {
    return "Proyecto: " + this.nombre; // this = proyecto
  },
};

console.log(proyecto.describir()); // "Proyecto: Tunal Digital"
```

Y aqui esta **la gran diferencia** entre los dos estilos de funcion:

> ### 🟦 ¿Que significa? — *this lexico (en arrow functions)*
> Las arrow functions **no tienen su propio `this`**: usan el `this` del lugar donde fueron escritas (su entorno, igual que un closure). A esto se le llama "this lexico". **Para que sirve:** evita el clasico bug en el que `this` "se pierde" dentro de un callback. **Donde se usa en un repo real:** por esta misma razon, en React (Faro, RachaSimple) se prefieren las arrow functions; mantienen el contexto sin sorpresas.

```javascript
const cronometro = {
  segundos: 0,
  iniciarMal: function () {
    setInterval(function () {
      this.segundos++; // this NO es cronometro aqui: se pierde
    }, 1000);
  },
  iniciarBien: function () {
    setInterval(() => {
      this.segundos++; // arrow: this SIGUE siendo cronometro
    }, 1000);
  },
};
```

En `iniciarMal`, la `function` interior trae su propio `this` (que no es el cronometro), asi que la cosa falla. En `iniciarBien`, la arrow **no crea** un `this` nuevo: hereda el del metodo, que si es el cronometro. Y por eso funciona.

> ### ⚠️ Cuidado
> No uses arrow functions para definir **metodos** de un objeto si dentro necesitas que `this` apunte a ese objeto. Para un metodo "normal" que use `this`, ve por `function` o por la sintaxis corta `describir() { ... }`. Las arrow brillan como **callbacks**, no tanto como metodos.

> ### 💡 Tip
> Regla practica para principiantes: usa **arrow** para callbacks cortos (lo mas comun, sobre todo en React). Y usa **`function`** o el metodo corto cuando definas un metodo de objeto que dependa de `this`. Con eso te quitas de encima el 95% de los lios.

---

## 8. Por que todo esto importa en React (Modulo 06)

Te adelanto el premio, para que sepas hacia donde vamos.

> ### 🟦 ¿Que significa? — *Componente (en React)*
> Un *componente* es, casi siempre, **una funcion** que recibe datos (props) y devuelve lo que se ve en pantalla. **Para que sirve:** dividir la interfaz en piezas reutilizables. **Donde se usa en un repo real:** **RachaSimple** y **Faro/Organizer** estan construidos con componentes; cada tarjeta de racha o de proyecto es una funcion que devuelve interfaz.

Cuando llegues al Modulo 06, todo lo de hoy vuelve a aparecer:

- Un **componente** es una funcion (seccion 1).
- Los **eventos** (`onClick`, `onSubmit`) reciben **callbacks**, normalmente arrow functions (secciones 2 y 7).
- Las listas se pintan con `.map`, una **funcion de orden superior** (seccion 3).
- `useState` recuerda el estado del componente gracias a **closures** (seccion 5).
- Pasar "el resto de las props" usa **rest/spread** (seccion 6).
- Se prefieren arrow functions por su **this lexico** y por lo cortas que son (seccion 7).

> ### 🔎 En tu codigo
> En **RachaSimple** veras algo asi como `rachas.map((r) => <Tarjeta key={r.id} dato={r} />)`. En esa sola linea conviven cuatro ideas de este capitulo: una funcion de orden superior (`map`), una arrow function como callback, un closure que recuerda `rachas`, y funciones que devuelven interfaz (componentes). No es magia nueva: es exactamente lo que practicaste hoy.

---

> Lo lograste. Hoy abriste la caja de las funciones y viste los engranajes de dentro: son valores, viajan como callbacks, otras funciones las reciben (orden superior), viven en ambitos, recuerdan su entorno (closures), aceptan parametros flexibles (rest y por defecto) y vienen en dos sabores (arrow y function) que tratan a `this` de forma distinta. Con esto, el `main.js` de tunal-digital deja de guardar secretos, y React te va a recibir con los brazos abiertos. Nos vemos en el siguiente capitulo, dice **Bit** mientras mueve sus branquias rosadas.

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Entiendo la diferencia entre `saludar` (la funcion) y `saludar()` (su resultado).
- [ ] Se que es un callback y por que se pasa **sin** parentesis a `addEventListener`.
- [ ] Reconozco una funcion de orden superior y se usar `.map`, `.filter` y `.forEach`.
- [ ] Distingo el ambito global del local y se que "desde adentro veo afuera, no al reves".
- [ ] Puedo explicar un closure con la imagen de la "mochila de variables".
- [ ] Se usar parametros por defecto y el parametro rest `...`.
- [ ] Distingo el rest (recoge) del spread (reparte), aunque usen el mismo `...`.
- [ ] Se escribir una arrow function corta y se cuando NO usarla como metodo por el `this`.
- [ ] Entiendo por que estas ideas son la base de React (Modulo 06).

---

## 🧪 Ejercicios

1. **(En papel)** Escribe con tus palabras la diferencia entre *llamar* una funcion y *pasarla como referencia*. Pon un ejemplo de cuando querrias cada uno.

2. 💻 **Callbacks.** Crea un boton en HTML y, en un archivo JS, una funcion `mostrarHora` que imprima la hora actual con `console.log(new Date().toLocaleTimeString())`. Conectala al clic del boton con `addEventListener` pasandola **sin** parentesis. Comprueba que cada clic muestra la hora.

3. 💻 **Orden superior.** Dado el array de servicios de la seccion 3, usa `.filter` para quedarte solo con los que cuestan mas de 400, y luego `.map` para obtener un array con frases como `"Sitio web cuesta 800"`. Encadena los dos metodos en una sola linea.

4. 💻 **Closures.** Escribe una funcion `crearAcumulador()` que devuelva una funcion. Cada vez que llames a la funcion devuelta con un numero, debe sumar ese numero a un total interno y devolver el total. Pruebala: `const sumar = crearAcumulador(); sumar(5); sumar(3);` deberia devolver `8` en la segunda llamada.

5. 💻 **Rest y por defecto.** Escribe una funcion `promedio(...numeros)` que reciba cualquier cantidad de numeros y devuelva su promedio. Si no recibe ninguno, debe devolver `0` (pista: usa un valor por defecto o un `if`). Pruebala con `promedio(10, 20, 30)` y con `promedio()`.

6. 💻 **Arrow y this.** Toma el objeto `cronometro` de la seccion 7. Sustituye el `setInterval` por uno que use una arrow function y haz que despues de 3 segundos imprima `cronometro.segundos`. Luego cambia la arrow por una `function` clasica y observa que `this.segundos` ya no funciona. Anota en un comentario por que.
