# Capitulo 12 — Almacenamiento y modulos

<p align="center">
  <img src="../../recursos/imagenes/03-javascript/cap12.png" alt="Ilustración del capítulo (pixel art con Bit)" width="640">
</p>


> Hola de nuevo. Soy **Bit**, tu ajolote guia. Hasta ahora tus programas en JavaScript han tenido mala memoria: en cuanto el usuario recarga la pagina, todo lo que escribio o eligio desaparece como si nunca hubiera pasado. En este capitulo vamos a darle memoria al navegador con `localStorage` y `sessionStorage`, y aprenderemos a guardar datos complicados convirtiendolos a texto con **JSON**. Despues partiremos nuestro codigo en varios archivos ordenados usando **modulos** (`import`/`export`), igual que cuando ordenas tus juguetes en cajas en lugar de tenerlos todos en un monton. Respira: vamos despacio y todo lo voy a explicar palabra por palabra. *(Hago burbujas de emocion.)*

---

## 1. El problema: la pagina se olvida de todo

Imagina que en **tunal-digital** (un sitio web hecho con HTML, CSS y JavaScript puro, sin frameworks) el usuario escribe su nombre en un formulario, o activa el modo oscuro. Si cierra la pestana y vuelve, el sitio no recuerda nada. Eso pasa porque las **variables** de JavaScript viven en la memoria temporal del navegador, y esa memoria se borra al recargar.

Para que algo **sobreviva** a la recarga, necesitamos guardarlo en un lugar mas permanente. El navegador nos ofrece dos cajones para eso: `localStorage` y `sessionStorage`.

> ### 🟦 ¿Que significa? — *Persistencia*
> **Definicion simple:** que un dato siga existiendo aunque cierres la pagina o apagues el computador.
> **Para que sirve:** para que tu app recuerde preferencias, sesiones, datos a medio escribir, etc.
> **Donde se usa en un repo real:** en **RachaSimple** (app de habitos hecha con React, TypeScript y Supabase) la persistencia "de verdad" vive en una base de datos en la nube; pero un sitio sencillo como **tunal-digital** puede lograr persistencia ligera usando el almacenamiento del navegador, sin servidor.

---

## 2. `localStorage`: el cajon que no se vacia

`localStorage` es como una pequena libreta que el navegador guarda en el disco de la computadora. Lo que escribas ahi **se queda** aunque cierres todo y vuelvas manana.

> ### 🟦 ¿Que significa? — *localStorage*
> **Definicion simple:** un almacen del navegador donde guardas pares de "nombre y valor" (texto) que persisten indefinidamente.
> **Para que sirve:** recordar preferencias del usuario (tema claro/oscuro, idioma), datos no sensibles, borradores.
> **Donde se usa en un repo real:** en **tunal-digital**, el archivo `main.js` maneja interacciones del lado del cliente; ahi seria natural usar `localStorage` para recordar, por ejemplo, si el usuario ya cerro un aviso o que tema prefiere.

Se usa con cuatro operaciones basicas:

```javascript
// Guardar un valor (siempre como texto)
localStorage.setItem("tema", "oscuro");

// Leer un valor
const tema = localStorage.getItem("tema");
console.log(tema); // "oscuro"

// Borrar un valor concreto
localStorage.removeItem("tema");

// Borrar TODO lo guardado por este sitio
localStorage.clear();
```

> ### 🟦 ¿Que significa? — *Par clave-valor*
> **Definicion simple:** una pareja formada por un nombre (la **clave**) y la informacion que le corresponde (el **valor**). Como una etiqueta y lo que hay dentro de la caja.
> **Para que sirve:** organizar datos para encontrarlos por su nombre, sin importar el orden.
> **Donde se usa en un repo real:** en **PolyPaw** (app educativa en Python con Flet que guarda su contenido en archivos JSON), cada mision tiene claves como `titulo` o `edad` con sus valores; es la misma idea que usa `localStorage`.

> ### 💡 Tip
> La **clave** la eliges tu y conviene que sea descriptiva: `"tema"`, `"usuario_nombre"`, `"carrito"`. Si dos partes de tu codigo usan la misma clave para cosas distintas, se pisaran los datos. Un truco: ponles un prefijo, como `"tunal_tema"`.

> ### ⚠️ Cuidado
> `localStorage` **solo guarda texto** (cadenas de caracteres). Si intentas guardar un numero, lo convierte a texto sin avisar: `localStorage.setItem("edad", 5)` guarda `"5"` (texto), no `5` (numero). Y si guardas un objeto sin convertirlo, obtienes la inutil cadena `"[object Object]"`. Por eso, en la seccion 4, aprenderemos JSON.

---

## 3. `sessionStorage`: el cajon que se vacia al cerrar

`sessionStorage` funciona **exactamente igual** que `localStorage` (mismos metodos: `setItem`, `getItem`, `removeItem`, `clear`), pero con una diferencia clave: lo que guardas dura **solo mientras la pestana esta abierta**. Cuando el usuario cierra la pestana, se borra.

> ### 🟦 ¿Que significa? — *sessionStorage*
> **Definicion simple:** un almacen del navegador identico a `localStorage`, pero que se borra al cerrar la pestana o ventana.
> **Para que sirve:** guardar datos temporales de una sola visita: un paso intermedio de un formulario largo, un filtro de busqueda, datos que no quieres que sobrevivan.
> **Donde se usa en un repo real:** en el formulario de **tunal-digital**, si quisieras recordar lo que el usuario escribio *solo* mientras navega entre paginas de esa misma visita (pero olvidarlo al cerrar), `sessionStorage` seria la herramienta correcta.

```javascript
// Guardar el paso actual de un formulario largo
sessionStorage.setItem("paso_formulario", "2");

// Leerlo mas tarde, en la misma visita
const paso = sessionStorage.getItem("paso_formulario");
```

> ### 🟦 ¿Que significa? — *Sesion (en el navegador)*
> **Definicion simple:** el periodo de tiempo desde que abres una pestana de un sitio hasta que la cierras.
> **Para que sirve:** delimitar cuanto vive un dato temporal.
> **Donde se usa en un repo real:** ojo, la "sesion" de `sessionStorage` no es lo mismo que la sesion de login de **RachaSimple** o **Faro** (donde la sesion de autenticacion la maneja Supabase Auth con tokens en el servidor). Son conceptos distintos con el mismo nombre.

### ¿Cual elijo?

| Pregunta | Si la respuesta es... | Usa |
| --- | --- | --- |
| ¿Debe recordarse manana? | Si | `localStorage` |
| ¿Solo importa en esta visita? | Si | `sessionStorage` |
| ¿Es un dato sensible (contrasena, token)? | Si | **Ninguno** (ver Cuidado abajo) |

> ### ⚠️ Cuidado
> **Nunca** guardes contrasenas, tokens de acceso ni secretos en `localStorage` o `sessionStorage`. Cualquier script en la pagina puede leerlos, y no estan cifrados. En **Faro** y **RachaSimple**, los tokens viven **en el servidor** (variables de entorno y la tabla `user_connections` con RLS —Row Level Security, reglas de seguridad por fila que deciden quien puede ver cada dato— en Supabase), nunca en el navegador. Esa es una regla de seguridad del proyecto, no un capricho.

---

## 4. JSON: convertir objetos en texto y viceversa

Recuerda el problema: el almacenamiento del navegador solo guarda texto. Pero los datos interesantes casi siempre son **objetos** o **listas** (un usuario con varios campos, un carrito con varios productos). ¿Como guardamos algo asi? Lo convertimos a texto con **JSON**.

> ### 🟦 ¿Que significa? — *JSON*
> **Definicion simple:** JSON (JavaScript Object Notation) es un formato de texto para representar datos estructurados: objetos, listas, numeros y textos, escritos de una forma que tanto las personas como las maquinas entienden.
> **Para que sirve:** guardar y transportar datos como texto plano.
> **Donde se usa en un repo real:** **PolyPaw** guarda TODO su contenido (misiones, niveles) en archivos JSON. Cada vez que la app lee una mision, lee un archivo JSON. Es el corazon de los datos de PolyPaw.

Un objeto JavaScript y su version JSON se parecen mucho:

```javascript
// Objeto JavaScript (vive en memoria)
const mascota = {
  nombre: "Bit",
  tipo: "ajolote",
  feliz: true
};

// Convertirlo a texto JSON para poder guardarlo
const textoJson = JSON.stringify(mascota);
console.log(textoJson);
// '{"nombre":"Bit","tipo":"ajolote","feliz":true}'  <-- es texto

// Recuperar el objeto desde el texto
const objetoDeNuevo = JSON.parse(textoJson);
console.log(objetoDeNuevo.nombre); // "Bit"
```

Hay dos funciones magicas que debes memorizar:

> ### 🟦 ¿Que significa? — *JSON.stringify()*
> **Definicion simple:** funcion que toma un objeto o lista de JavaScript y devuelve su representacion como **texto** JSON.
> **Para que sirve:** preparar datos complejos para guardarlos en `localStorage` o enviarlos por internet.
> **Donde se usa en un repo real:** cuando **tunal-digital** envia el contenido del formulario a su Worker (un pequeno servidor en la nube) mediante `fetch` (la funcion del navegador para pedir o enviar datos por internet, que veras a fondo en un capitulo proximo), el cuerpo del mensaje viaja como texto JSON producido con `JSON.stringify`.

> ### 🟦 ¿Que significa? — *JSON.parse()*
> **Definicion simple:** funcion que toma un texto JSON y lo convierte de vuelta en un objeto o lista de JavaScript usable.
> **Para que sirve:** "desempaquetar" datos que llegaron como texto para volver a trabajar con ellos.
> **Donde se usa en un repo real:** la respuesta del chat IA en **tunal-digital** llega como texto desde el Worker; `JSON.parse` (o el helper `response.json()` de `fetch`, que hace lo mismo por dentro) la convierte en un objeto con el mensaje.

Ahora si, guardar un objeto en `localStorage` es la combinacion de las dos ideas:

```javascript
// GUARDAR un objeto: objeto -> texto -> localStorage
const carrito = [
  { producto: "Plan basico", precio: 100 },
  { producto: "Soporte", precio: 50 }
];
localStorage.setItem("carrito", JSON.stringify(carrito));

// LEER un objeto: localStorage -> texto -> objeto
const textoGuardado = localStorage.getItem("carrito");
const carritoRecuperado = JSON.parse(textoGuardado);
console.log(carritoRecuperado[0].producto); // "Plan basico"
```

> ### ⚠️ Cuidado
> Si la clave no existe, `getItem` devuelve `null`, y `JSON.parse(null)`... curiosamente no falla (devuelve `null`), pero `JSON.parse` de un texto vacio o invalido **si lanza un error** y rompe tu programa. Protegete asi:
>
> ```javascript
> const texto = localStorage.getItem("carrito");
> const carrito = texto ? JSON.parse(texto) : [];
> ```
> Asi, si no hay nada guardado, empiezas con una lista vacia en lugar de un error.

> ### 🔎 En tu codigo
> En **PolyPaw**, los archivos JSON los lee Python, no JavaScript. Pero el formato es identico: un objeto `{ }` con claves y valores, listas `[ ]`, textos entre comillas. Cuando abras un archivo `.json` de PolyPaw veras exactamente la misma estructura que produce `JSON.stringify`. JSON es un idioma comun entre lenguajes: lo entienden Python, JavaScript, TypeScript y casi todos. Por eso **Faro** (Next.js + TypeScript) tambien intercambia datos con OpenAI en formato JSON.

> ### 💡 Tip
> Para inspeccionar tu JSON con sangrias bonitas mientras depuras, pasa un tercer argumento a `stringify`: `JSON.stringify(mascota, null, 2)`. El `2` significa "indenta con 2 espacios". Util para leerlo en la consola.

---

## 5. Un mini-proyecto: recordar el tema en tunal-digital

Juntemos `localStorage` + JSON en algo util. Vamos a recordar las preferencias del usuario en un objeto guardado:

```javascript
// Leer preferencias guardadas (o usar valores por defecto)
function leerPreferencias() {
  const texto = localStorage.getItem("tunal_prefs");
  return texto ? JSON.parse(texto) : { tema: "claro", avisoVisto: false };
}

// Guardar preferencias
function guardarPreferencias(prefs) {
  localStorage.setItem("tunal_prefs", JSON.stringify(prefs));
}

// Usarlas: al cargar la pagina
const prefs = leerPreferencias();
document.body.classList.toggle("oscuro", prefs.tema === "oscuro");

// Cuando el usuario cambia el tema
function cambiarTema(nuevoTema) {
  const prefs = leerPreferencias();
  prefs.tema = nuevoTema;
  guardarPreferencias(prefs);
}
```

> ### 🟦 ¿Que significa? — *Funcion de atajo (helper)*
> **Definicion simple:** una funcion pequena que envuelve una tarea repetitiva para no escribirla muchas veces.
> **Para que sirve:** evitar repetir codigo y darle un nombre claro a lo que hace.
> **Donde se usa en un repo real:** el `main.js` de **tunal-digital** tiene varias **funciones de atajo** justamente con esta idea: agrupar pasos comunes (seleccionar un elemento, hacer un `fetch`) en una sola funcion reutilizable.

Fijate que `leerPreferencias` y `guardarPreferencias` empiezan a sentirse como piezas independientes que podrias reutilizar en otras paginas. Eso nos lleva directo al segundo gran tema del capitulo: separar el codigo en archivos.

---

## 6. Modulos: por que dividir el codigo en archivos

Cuando un programa crece, meter TODO en un solo archivo `main.js` se vuelve un caos: cientos de lineas, funciones mezcladas, dificil de encontrar nada. La solucion es partir el codigo en varios archivos pequenos y bien nombrados. A cada archivo asi lo llamamos **modulo**.

> ### 🟦 ¿Que significa? — *Modulo*
> **Definicion simple:** un archivo de JavaScript que agrupa codigo relacionado (funciones, datos) y decide que parte comparte con los demas.
> **Para que sirve:** organizar el proyecto, reutilizar codigo y evitar que todo dependa de todo.
> **Donde se usa en un repo real:** **Faro** (Next.js + React + TypeScript) y **RachaSimple** estan hechos casi enteros de modulos: cada componente, cada utilidad vive en su propio archivo y se importa donde hace falta. Es la forma normal de trabajar en proyectos modernos.

Las ventajas de usar modulos:

- **Orden:** cada archivo tiene un proposito claro (`almacenamiento.js`, `tema.js`, `formulario.js`).
- **Reutilizacion:** escribes `guardarPreferencias` una vez y la usas desde varios sitios.
- **Menos errores:** lo que no compartes a proposito queda "privado" en su archivo y no choca con otro codigo.

> ### 🟦 ¿Que significa? — *Ambito (scope) de un modulo*
> **Definicion simple:** las variables y funciones de un modulo son privadas por defecto; solo se ven dentro de su archivo a menos que las exportes.
> **Para que sirve:** evitar que dos archivos definan algo con el mismo nombre y se rompan entre si.
> **Donde se usa en un repo real:** en **RachaSimple**, cada archivo puede tener su propia variable `data` sin pisar la de otro archivo, justamente porque cada modulo tiene su ambito privado.

---

## 7. `export` e `import`: compartir entre archivos

Para que un modulo comparta algo, usa `export`. Para que otro modulo lo reciba, usa `import`.

> ### 🟦 ¿Que significa? — *export*
> **Definicion simple:** palabra clave que marca una funcion, variable o valor como "disponible para otros archivos".
> **Para que sirve:** publicar las piezas de tu modulo que quieres compartir.
> **Donde se usa en un repo real:** en **Faro** cada componente de React termina con un `export` para poder usarse en otras pantallas de la app.

> ### 🟦 ¿Que significa? — *import*
> **Definicion simple:** palabra clave que trae a tu archivo algo que otro archivo exporto.
> **Para que sirve:** usar codigo definido en otro modulo sin copiarlo.
> **Donde se usa en un repo real:** en **RachaSimple**, los archivos importan herramientas de TanStack Query (una libreria que maneja la carga de datos) con `import`, igual que importarias tus propios modulos.

Hagamos un ejemplo concreto. Sacamos las funciones de almacenamiento del capitulo a su propio archivo:

```javascript
// archivo: almacenamiento.js
export function leerPreferencias() {
  const texto = localStorage.getItem("tunal_prefs");
  return texto ? JSON.parse(texto) : { tema: "claro", avisoVisto: false };
}

export function guardarPreferencias(prefs) {
  localStorage.setItem("tunal_prefs", JSON.stringify(prefs));
}
```

Y en `main.js` las traemos y las usamos:

```javascript
// archivo: main.js
import { leerPreferencias, guardarPreferencias } from "./almacenamiento.js";

const prefs = leerPreferencias();
document.body.classList.toggle("oscuro", prefs.tema === "oscuro");
```

> ### 💡 Tip
> Las llaves `{ }` en `import { leerPreferencias }` significan "importa estas piezas por su nombre exacto". El nombre tiene que coincidir con el del `export`. La ruta `"./almacenamiento.js"` empieza con `./` para decir "el archivo esta en la misma carpeta que este".

### Export por defecto

A veces un archivo exporta **una sola cosa principal**. Para eso esta `export default`:

```javascript
// archivo: saludo.js
export default function saludar(nombre) {
  return "Hola, " + nombre;
}
```

```javascript
// archivo: main.js
import saludar from "./saludo.js"; // sin llaves, y le pones el nombre que quieras
console.log(saludar("Bit"));
```

> ### 🟦 ¿Que significa? — *export default*
> **Definicion simple:** la exportacion principal de un modulo; solo puede haber una por archivo y se importa sin llaves.
> **Para que sirve:** marcar "esto es lo importante de este archivo".
> **Donde se usa en un repo real:** en **Faro** y otras apps con Next.js, cada pagina o componente principal suele ser un `export default`; es la convencion del framework.

> ### ⚠️ Cuidado
> No mezcles confusamente las dos formas. Con `export default` importas **sin** llaves y eliges el nombre. Con `export` normal (llamado "nombrado") importas **con** llaves y el nombre debe coincidir. Confundirlos es uno de los errores mas comunes al empezar.

---

## 8. Como activar los modulos en el navegador

Para que `import`/`export` funcionen en un sitio *vanilla* (asi se le dice a un sitio hecho con HTML, CSS y JavaScript puros, sin frameworks ni librerias) como **tunal-digital**, el navegador necesita saber que tu script es un modulo. Eso se hace en el HTML con el atributo `type="module"`:

```html
<!-- En el index.html de tunal-digital -->
<script type="module" src="main.js"></script>
```

> ### 🟦 ¿Que significa? — *type="module"*
> **Definicion simple:** un atributo en la etiqueta `<script>` que le dice al navegador "trata este archivo como un modulo, con `import`/`export` activados".
> **Para que sirve:** habilitar el sistema de modulos en un sitio sin framework.
> **Donde se usa en un repo real:** un sitio HTML/CSS/JS puro como **tunal-digital** lo usaria en su `index.html` para que `main.js` pueda importar otros archivos.

> ### ⚠️ Cuidado
> Los modulos en el navegador **necesitan un servidor** para cargar (aunque sea uno local sencillo). Si abres el `index.html` haciendo doble clic (ruta `file://`), los `import` fallaran por seguridad. Usa una extension de "Live Server" o un comando como `npx serve`. En proyectos como **Faro** o **RachaSimple** esto no te preocupa: la herramienta de construccion (Next.js, Vite) ya levanta un servidor y junta los modulos por ti.

> ### 🟦 ¿Que significa? — *Empaquetador (bundler)*
> **Definicion simple:** un programa que toma todos tus modulos y los combina/optimiza en archivos listos para el navegador.
> **Para que sirve:** que el navegador descargue pocos archivos eficientes en vez de muchos sueltos.
> **Donde se usa en un repo real:** **Faro** usa el sistema de Next.js y **RachaSimple** usa el suyo de React; ambos empaquetan tus modulos automaticamente. Por eso esos proyectos pueden tener cientos de archivos sin problema.

---

## 9. Juntando todo: del JSON local de PolyPaw a tu navegador

Cerremos el circulo. **PolyPaw** guarda sus misiones en JSON local (archivos en disco que lee Python). La idea de "datos como texto JSON, organizados en piezas" es exactamente la que acabas de aprender, solo que en otro lenguaje.

Si tu quisieras hacer una version web sencilla que muestre una mision y recuerde en cual se quedo el usuario, combinarias TODO lo del capitulo:

```javascript
// archivo: misiones.js  (modulo de datos)
export const misiones = [
  { id: 1, titulo: "Reciclar en casa", edad: "6-8" },
  { id: 2, titulo: "Ahorrar agua", edad: "6-8" }
];

// archivo: progreso.js  (modulo de almacenamiento)
export function guardarProgreso(idMision) {
  localStorage.setItem("polypaw_progreso", JSON.stringify({ ultima: idMision }));
}
export function leerProgreso() {
  const texto = localStorage.getItem("polypaw_progreso");
  return texto ? JSON.parse(texto) : { ultima: 1 };
}

// archivo: main.js  (junta las piezas)
import { misiones } from "./misiones.js";
import { guardarProgreso, leerProgreso } from "./progreso.js";

const progreso = leerProgreso();
const actual = misiones.find((m) => m.id === progreso.ultima);
console.log("Continuas en:", actual.titulo);

// Al completar una mision:
guardarProgreso(2);
```

> ### 🔎 En tu codigo
> Mira lo limpio que queda: los **datos** estan en `misiones.js`, el **almacenamiento** en `progreso.js`, y `main.js` solo orquesta. Si manana cambias de `localStorage` a una base de datos real (como hace **RachaSimple** con Supabase), solo tocas `progreso.js`; el resto ni se entera. Esa es la magia de los modulos: cada pieza esconde sus detalles tras un nombre claro.

> ### 💡 Tip
> Un buen ejercicio mental antes de escribir codigo: pregunta "¿que piezas tiene esto?" y dale a cada una su archivo. Datos, almacenamiento, interfaz y logica suelen ser buenos limites para separar modulos.

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Se explicar la diferencia entre `localStorage` (persiste) y `sessionStorage` (se borra al cerrar la pestana).
- [ ] Conozco los cuatro metodos: `setItem`, `getItem`, `removeItem`, `clear`.
- [ ] Entiendo que el almacenamiento del navegador **solo guarda texto**.
- [ ] Se usar `JSON.stringify` para guardar un objeto y `JSON.parse` para recuperarlo.
- [ ] Se protegerme cuando una clave no existe (`getItem` devuelve `null`).
- [ ] Se que **nunca** guardo contrasenas ni tokens en el almacenamiento del navegador.
- [ ] Entiendo que un **modulo** es un archivo que comparte solo lo que exporta.
- [ ] Distingo `export` nombrado (import con llaves) de `export default` (import sin llaves).
- [ ] Se que en un sitio vanilla necesito `type="module"` y un servidor para que funcionen los `import`.
- [ ] Puedo separar un programa en archivos de datos, almacenamiento y logica.

---

## 🧪 Ejercicios

1. **Verdadero o falso (en papel):** "Si guardo `{nombre: 'Bit'}` con `localStorage.setItem('m', {nombre:'Bit'})` sin convertirlo, podre recuperarlo intacto." Explica por que es falso y como se arregla.

2. 💻 **Contador persistente.** Crea una pagina con un boton "+1" y un numero. Guarda el numero en `localStorage` con la clave `"contador"`. Al recargar, el numero debe seguir donde estaba. Recuerda convertir texto a numero al leer (`Number(...)`).

3. 💻 **Lista de tareas con JSON.** Guarda una lista (array) de tareas en `localStorage` usando `JSON.stringify`. Al cargar la pagina, leela con `JSON.parse` y muestrala. Protege el caso de "no hay nada guardado todavia".

4. 💻 **localStorage vs sessionStorage.** Guarda tu nombre en `localStorage` y tu color favorito en `sessionStorage`. Cierra la pestana, vuelve a abrir el sitio y comprueba cual de los dos sigue ahi. Anota lo que observas.

5. 💻 **Separar en modulos.** Toma el contador del ejercicio 2 y mueve las funciones `leerContador` y `guardarContador` a un archivo `almacenamiento.js`. Importalas en `main.js` con `import { ... }`. Acuerdate de poner `type="module"` en el HTML y de servir la pagina con un servidor local.

6. 💻 **Mini-PolyPaw.** Inspirandote en la seccion 9, crea un modulo `misiones.js` con 3 misiones (objetos con `id` y `titulo`) y un modulo `progreso.js` que recuerde en `localStorage` la ultima mision vista. En `main.js`, importa ambos y muestra en consola el titulo de la mision donde se quedo el usuario.

---

Lo lograste. Ahora tus programas tienen memoria y orden: saben recordar datos entre visitas y viven en archivos limpios que puedes ampliar sin miedo. La proxima vez que abras el `main.js` de **tunal-digital** o un JSON de **PolyPaw**, los veras con otros ojos. Nos vemos en el siguiente capitulo. *(Me sumerjo dejando una estela de burbujas.)* — Bit
