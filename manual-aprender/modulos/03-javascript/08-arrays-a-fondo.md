# Capitulo 08 — Arrays a fondo

<p align="center">
  <img src="../../recursos/imagenes/03-javascript/cap08.png" alt="Ilustración del capítulo (pixel art con Bit)" width="640">
</p>


> Hola otra vez, soy **Bit**, tu ajolote de confianza. Ya sabes crear arrays y recorrerlos con bucles. Lo que quiza no sabes es que JavaScript trae de fabrica un monton de **metodos** que hacen el trabajo pesado por ti: transformar, filtrar, buscar y resumir listas, muchas veces en una sola linea. De eso va este capitulo. Cuando lleguemos al final vas a mirar un `for` de seis lineas y vas a pensar "esto en realidad es un `map`". Iremos despacio y con muchos ejemplos sacados del proyecto **tunal-digital** (un sitio en HTML/CSS/JS vanilla). Respira y sigueme.

## 1. Antes de empezar: que es un metodo de array

Un array es una lista ordenada de valores; eso ya lo tienes. Lo que cambia aqui es **como** trabajas con esa lista. En vez de escribir bucles a mano una y otra vez, vas a apoyarte en funciones que ya vienen incluidas en el lenguaje.

> ### 🟦 ¿Que significa? — *Metodo*
> Un **metodo** es una funcion que "pertenece" a algo y se llama poniendo un punto despues de ese algo: `lista.map(...)`. La parte antes del punto (`lista`) es sobre lo que actua el metodo.
> **Para que sirve:** te da herramientas ya hechas para no tener que reinventarlas cada vez.
> **Donde se usa en un repo real:** en el `main.js` de **tunal-digital**, cuando se recogen los campos de un formulario o se procesan las respuestas del Worker, se usan metodos de array para evitar escribir el mismo bucle una y otra vez.

> ### 🟦 ¿Que significa? — *Callback*
> Un **callback** es una funcion que le pasas a otra funcion para que la llame por ti. En `lista.map(n => n * 2)`, la flecha `n => n * 2` es el callback: tu describes "que hacer con cada elemento" y `map` se ocupa de recorrer.
> **Para que sirve:** separa el "que hacer" del "como recorrer".
> **Donde se usa en un repo real:** todos los metodos de este capitulo reciben un callback.

Para los ejemplos vamos a usar esta lista de servicios inventada de **tunal-digital**:

```javascript
const servicios = [
  { nombre: "Sitio web", precio: 800, activo: true },
  { nombre: "SEO local", precio: 300, activo: true },
  { nombre: "Chat IA", precio: 500, activo: false },
  { nombre: "Logo", precio: 150, activo: true },
];
```

## 2. map: transformar cada elemento

`map` recorre la lista y te devuelve **una lista nueva** del mismo tamano, en la que cada elemento es el resultado de tu callback.

> ### 🟦 ¿Que significa? — *map*
> **map** (mapear) toma cada elemento, le aplica una transformacion y guarda el resultado en un array nuevo.
> **Para que sirve:** convertir una lista en otra: precios a precios con IVA, objetos a nombres, datos crudos a HTML.
> **Donde se usa en un repo real:** en **tunal-digital**, para convertir una lista de mensajes del chat IA en una lista de cadenas de texto listas para mostrar.

```javascript
const nombres = servicios.map((s) => s.nombre);
// ["Sitio web", "SEO local", "Chat IA", "Logo"]

const conIva = servicios.map((s) => s.precio * 1.21);
// [968, 363, 605, 181.5]
```

Quedate con un detalle: **`map` no toca el array original**. Te entrega uno nuevo y `servicios` se queda exactamente igual que antes.

> ### 💡 Tip
> Una regla que casi nunca falla: si la lista nueva tiene **el mismo numero de elementos** que la original, lo que quieres es `map`. Si tiene **menos**, es `filter`. Y si lo que buscas es **un solo valor** (un total, un texto unico), es `reduce`.

> ### ⚠️ Cuidado
> `map` siempre devuelve un array. Si dentro del callback **no pones `return`** (y no usas la flecha corta), acabaras con una lista llena de `undefined`. Con `=> s.nombre` el `return` es implicito; con llaves `=> { ... }` tienes que escribir el `return` tu mismo.

## 3. filter: quedarte solo con algunos

`filter` recorre la lista y te devuelve un array nuevo **solo con los elementos que pasan una prueba**.

> ### 🟦 ¿Que significa? — *filter*
> **filter** (filtrar) conserva los elementos cuyo callback devuelve `true` y descarta los que devuelven `false`.
> **Para que sirve:** quedarte con un subconjunto: solo los activos, solo los caros, solo los que coinciden con una busqueda.
> **Donde se usa en un repo real:** en **RachaSimple** (React + TS + Supabase) podrias filtrar las rachas que siguen vivas hoy antes de pintarlas.

```javascript
const activos = servicios.filter((s) => s.activo);
// [Sitio web, SEO local, Logo]   (Chat IA queda fuera)

const baratos = servicios.filter((s) => s.precio < 400);
// [SEO local, Logo]
```

> ### 🟦 ¿Que significa? — *Booleano*
> Un **booleano** es un valor que solo puede ser `true` (verdadero) o `false` (falso). El callback de `filter` tiene que devolver un booleano: "¿este elemento se queda? si o no".
> **Para que sirve:** representar decisiones de "si/no".
> **Donde se usa en un repo real:** el campo `activo` de cada servicio ya es un booleano.

## 4. reduce: convertir la lista en un solo valor

`reduce` es el que mas musculo tiene y tambien el que mas intimida al principio. Recorre la lista acumulando un resultado y, al final, te devuelve **un solo valor**.

> ### 🟦 ¿Que significa? — *reduce*
> **reduce** (reducir) combina todos los elementos en uno solo, paso a paso. En cada vuelta recibe el **acumulador** (lo que llevas hasta ahora) y el elemento actual, y tu devuelves el nuevo acumulador.
> **Para que sirve:** sumar totales, contar, agrupar, construir un objeto a partir de una lista.
> **Donde se usa en un repo real:** en **Faro/Organizer** podrias usar `reduce` para calcular el progreso total de un proyecto sumando los pesos de sus milestones.

```javascript
const total = servicios.reduce((suma, s) => suma + s.precio, 0);
// 800 + 300 + 500 + 150 = 1750
```

Vamos parte por parte:

- `suma` es el **acumulador**.
- `s` es el elemento actual.
- `suma + s.precio` es el nuevo acumulador que devuelves.
- El `0` del final es el **valor inicial**: con que empieza `suma` en la primera vuelta.

> ### 🟦 ¿Que significa? — *Acumulador*
> El **acumulador** es la "caja" donde `reduce` va guardando el resultado parcial mientras recorre la lista. Empieza con el valor inicial y se actualiza vuelta a vuelta.
> **Para que sirve:** llevar la cuenta de lo que vas construyendo (una suma, un objeto, otra lista).
> **Donde se usa en un repo real:** sumar precios o agrupar tareas por estado.

> ### ⚠️ Cuidado
> **Pon casi siempre el valor inicial** (`, 0` o `, {}` o `, []`). Si te lo saltas, `reduce` usa el primer elemento como acumulador, y con listas de objetos eso da resultados raros (o directamente un error si la lista esta vacia).

> ### 💡 Tip
> Si `reduce` se te resiste, recuerda esto: casi todo lo que la gente hace con `reduce` tambien se puede hacer con un `for` normal. Empieza con `for` y, cuando te sientas comodo, lo traduces a `reduce`. A Bit le costo semanas tomarle carino, asi que sin prisa.

## 5. find, some y every: buscar y preguntar

Estos tres no transforman la lista; lo que te dan es **una respuesta**.

> ### 🟦 ¿Que significa? — *find*
> **find** (encontrar) devuelve el **primer** elemento que cumple la prueba, o `undefined` si ninguno la cumple.
> **Para que sirve:** localizar un elemento concreto: el usuario con cierto id, el servicio con cierto nombre.
> **Donde se usa en un repo real:** en **PolyPaw** (Python/Flet/JSON) hay datos guardados en listas; el equivalente en JS seria un `find` para sacar la mision con cierto id.

```javascript
const chat = servicios.find((s) => s.nombre === "Chat IA");
// { nombre: "Chat IA", precio: 500, activo: false }
```

> ### 🟦 ¿Que significa? — *undefined*
> **undefined** ("indefinido") es el valor que usa JavaScript para decir "aqui no hay nada". `find` lo devuelve cuando no encuentra ninguna coincidencia.
> **Para que sirve:** representar la ausencia de un valor.
> **Donde se usa en un repo real:** siempre que buscas algo que podria no existir, conviene comprobar `if (resultado === undefined)`.

> ### 🟦 ¿Que significa? — *some*
> **some** (alguno) devuelve `true` si **al menos un** elemento cumple la prueba.
> **Para que sirve:** preguntar "¿hay alguno que...?".

> ### 🟦 ¿Que significa? — *every*
> **every** (todos) devuelve `true` si **todos** los elementos cumplen la prueba.
> **Para que sirve:** preguntar "¿todos cumplen...?". Va muy bien para validar formularios.
> **Donde se usa en un repo real:** en **tunal-digital**, antes de enviar el formulario al Worker, `every` sirve para comprobar que todos los campos obligatorios estan rellenos.

```javascript
const hayGratis = servicios.some((s) => s.precio === 0);   // false
const todosActivos = servicios.every((s) => s.activo);     // false (Chat IA no lo esta)
```

> ### 🔎 En tu codigo
> En el `main.js` de **tunal-digital**, el formulario recoge campos como nombre, email y mensaje. Validarlos con `campos.every((c) => c.value.trim() !== "")` queda mucho mas limpio que un `if` gigante. Si devuelve `false`, no se hace `fetch` al Worker y se muestra un aviso.

## 6. includes e indexOf: ¿esta este valor?

> ### 🟦 ¿Que significa? — *includes*
> **includes** (incluye) devuelve `true` o `false` segun si el array contiene exactamente ese valor.
> **Para que sirve:** comprobar pertenencia rapida sin escribir un bucle.
> **Donde se usa en un repo real:** en **tunal-digital**, comprobar si una lista de etiquetas permitidas incluye la que envio el usuario.

> ### 🟦 ¿Que significa? — *indexOf*
> **indexOf** (indice de) devuelve la **posicion** (empezando en 0) de un valor, o `-1` si no esta.
> **Para que sirve:** saber donde esta algo, o usar `-1` como senal de "no existe".

```javascript
const etiquetas = ["web", "seo", "ia"];
etiquetas.includes("seo");   // true
etiquetas.indexOf("ia");     // 2
etiquetas.indexOf("logo");   // -1  (no esta)
```

> ### 💡 Tip
> `includes` se lee mejor cuando solo te interesa el "si o no". Tira de `indexOf` cuando ademas necesites saber la posicion. Antes solo existia `indexOf` y se escribia `indexOf(x) !== -1`; hoy `includes(x)` dice lo mismo de forma mucho mas clara.

## 7. slice y splice: cortar la lista

Ojo con estos dos: se parecen muchisimo en el nombre, pero hacen cosas bien distintas.

> ### 🟦 ¿Que significa? — *slice*
> **slice** (rebanada) devuelve una **copia** de un trozo del array, sin tocar el original. Recibe el indice de inicio y el de fin (este ultimo **no** se incluye).
> **Para que sirve:** sacar las primeras N filas, paginar, copiar un array.
> **Donde se usa en un repo real:** en **RachaSimple**, mostrar solo las 5 rachas mas recientes: `rachas.slice(0, 5)`.

```javascript
const top2 = servicios.slice(0, 2);
// [Sitio web, SEO local]   (servicios sigue completo)
```

> ### 🟦 ¿Que significa? — *splice*
> **splice** (empalmar) **modifica el array original**: puede borrar elementos, insertar nuevos o las dos cosas a la vez. Recibe el indice donde empezar, cuantos borrar y, si quieres, que insertar.
> **Para que sirve:** quitar o agregar elementos en mitad de la lista.
> **Donde se usa en un repo real:** quitar un item de una lista de tareas en memoria antes de redibujar la interfaz.

```javascript
const items = ["a", "b", "c", "d"];
items.splice(1, 2);   // borra desde el indice 1, dos elementos
// items ahora es ["a", "d"]
```

> ### ⚠️ Cuidado
> `slice` **no** cambia el original (es seguro). `splice` **si** lo cambia (es destructivo). Un truco para no liarte: spli**ce** lleva una **C** de "Cambia". En React (como en **RachaSimple** o **Faro**) evita `splice` sobre el estado: alli prefieres copias con `slice`, `filter` o spread.

## 8. Encadenar metodos

Como `map`, `filter` y `slice` devuelven **un array nuevo**, puedes pegar un metodo detras de otro con puntos. A eso se le llama **encadenar**.

> ### 🟦 ¿Que significa? — *Encadenar*
> **Encadenar** es aplicar varios metodos en fila, donde la salida de uno es la entrada del siguiente: `lista.filter(...).map(...).reduce(...)`.
> **Para que sirve:** describir una transformacion completa de forma legible, de izquierda a derecha.
> **Donde se usa en un repo real:** en **Faro/Organizer**, tomar los proyectos, quedarte con los activos, sacar su progreso y sumarlo.

```javascript
const totalActivos = servicios
  .filter((s) => s.activo)        // solo los activos
  .map((s) => s.precio)           // me quedo con el precio
  .reduce((suma, p) => suma + p, 0); // los sumo
// 800 + 300 + 150 = 1250
```

Leelo en voz alta: "de los servicios, filtra los activos, saca sus precios y sumalos". Cada linea es un paso, y se entiende de un vistazo.

> ### 💡 Tip
> Pon **cada metodo en su propia linea**, como en el ejemplo de arriba. Se lee mucho mejor y puedes comentar paso a paso, mejor que meter toda la cadena en una sola linea kilometrica.

> ### ⚠️ Cuidado
> Cada metodo de la cadena vuelve a recorrer la lista entera. Para listas de unos cientos de elementos esto no importa lo mas minimo. Solo en listas enormes (decenas de miles) merece la pena plantearse si todo cabe en un solo `reduce`. Para casi todo lo que haras al principio, gana la claridad.

## 9. sort: ordenar

> ### 🟦 ¿Que significa? — *sort*
> **sort** (ordenar) reordena el array. Le pasas un callback que compara dos elementos `(a, b)`: si devuelves un numero negativo, `a` va antes; positivo, `b` va antes; cero, da igual.
> **Para que sirve:** ordenar por precio, por fecha, alfabeticamente.
> **Donde se usa en un repo real:** en **Faro/Organizer**, ordenar proyectos por fecha de ultima actividad.

```javascript
const porPrecio = [...servicios].sort((a, b) => a.precio - b.precio);
// Logo (150), SEO (300), Chat (500), Sitio (800)
```

> ### ⚠️ Cuidado
> `sort` tiene dos trampas que conviene tener fichadas:
> 1. **Modifica el array original.** Por eso en el ejemplo de arriba hacemos primero una copia con `[...servicios]` (lo veras en la seccion del spread).
> 2. **Sin callback, ordena como texto.** Es decir, `[10, 2, 1].sort()` da `[1, 10, 2]` porque compara caracteres uno a uno. Para numeros, pasa siempre `(a, b) => a - b`.

## 10. El spread (...): expandir un array

> ### 🟦 ¿Que significa? — *Spread*
> El **spread** (esparcir), escrito con tres puntos `...`, "desempaca" los elementos de un array (o las propiedades de un objeto) y los suelta donde tu lo pongas.
> **Para que sirve:** copiar arrays, juntar varios, o anadir elementos sin modificar el original.
> **Donde se usa en un repo real:** en **RachaSimple** y **Faro**, para actualizar el estado de React sin mutarlo: `setLista([...lista, nuevo])`.

```javascript
const a = [1, 2];
const b = [3, 4];

const copia = [...a];        // [1, 2]  (copia independiente)
const juntos = [...a, ...b]; // [1, 2, 3, 4]
const masUno = [...a, 99];   // [1, 2, 99]
```

> ### 💡 Tip
> El spread hace una **copia superficial**: el array nuevo es independiente, pero si dentro hay objetos, esos objetos se siguen compartiendo. Para listas de numeros o textos, es justo lo que necesitas.

> ### 🔎 En tu codigo
> Cuando en la seccion 9 escribimos `[...servicios].sort(...)`, el spread hace una copia y `sort` ordena esa copia. Asi `servicios` no se desordena. Este patron de "copiar y luego transformar" es la base de trabajar con React, donde nunca debes mutar el estado directamente.

## 11. Desestructuracion de arrays

> ### 🟦 ¿Que significa? — *Desestructuracion*
> La **desestructuracion** te deja sacar valores de un array y meterlos en variables con nombre, en una sola linea, segun su posicion.
> **Para que sirve:** dar nombres claros a los elementos sin tener que escribir `lista[0]`, `lista[1]`...
> **Donde se usa en un repo real:** en **RachaSimple** y **Faro**, el hook `useState` de React devuelve un array de dos elementos que se desestructura: `const [valor, setValor] = useState(...)`.

```javascript
const punto = [40.4, -3.7];
const [lat, lng] = punto;
// lat = 40.4, lng = -3.7
```

Puedes saltarte posiciones dejando una coma vacia, y recoger "el resto" con spread:

```javascript
const [primero, , tercero] = ["a", "b", "c"];
// primero = "a", tercero = "c"

const [cabeza, ...resto] = [1, 2, 3, 4];
// cabeza = 1, resto = [2, 3, 4]
```

> ### 🔎 En tu codigo
> Cada vez que en **RachaSimple** escribes `const [data, setData] = useState([])`, estas desestructurando el array que devuelve `useState`. El primer hueco es el valor; el segundo, la funcion para cambiarlo. Es exactamente el mismo `[a, b] = array` de arriba.

## 12. Un ejemplo completo: de datos crudos a HTML

Vamos a juntar varias piezas, tal como lo harias en **tunal-digital** para pintar tarjetas con los servicios activos, ordenados por precio:

```javascript
const html = servicios
  .filter((s) => s.activo)                       // solo activos
  .sort((a, b) => a.precio - b.precio)           // del mas barato al mas caro
  .map((s) => `<li>${s.nombre}: ${s.precio} EUR</li>`) // cada uno a HTML
  .join("");                                     // unir en un solo texto

// "<li>Logo: 150 EUR</li><li>SEO local: 300 EUR</li><li>Sitio web: 800 EUR</li>"
```

> ### 🟦 ¿Que significa? — *join*
> **join** (unir) convierte un array en un solo texto, pegando los elementos con el separador que le indiques (aqui `""`, o sea sin separador).
> **Para que sirve:** pasar de una lista de fragmentos HTML a una sola cadena lista para `innerHTML`.
> **Donde se usa en un repo real:** en **tunal-digital**, `main.js` construye trozos de HTML con `map` y los une con `join` antes de meterlos en la pagina.

> ### ⚠️ Cuidado
> Meter texto del usuario directo en `innerHTML` puede ser peligroso (alguien podria colar codigo malicioso). Para datos tuyos de confianza, como esta lista fija de servicios, no hay problema. Cuando muestres lo que escribe un visitante, hay que escapar el texto. Lo veremos mas adelante; por ahora basta con que te suene.

## ✅ Checklist — ¿ya domino esto?

- [ ] Explico la diferencia entre `map` (misma cantidad), `filter` (menos) y `reduce` (uno solo).
- [ ] Se que `map`, `filter` y `slice` devuelven un array nuevo y no tocan el original.
- [ ] Recuerdo poner siempre el valor inicial en `reduce`.
- [ ] Distingo `find` (devuelve el elemento), `some` (¿hay alguno?) y `every` (¿todos?).
- [ ] Se cuando usar `includes` (si/no) frente a `indexOf` (posicion o -1).
- [ ] Tengo claro que `slice` es seguro y `splice` modifica el original.
- [ ] Puedo encadenar `filter().map().reduce()` y leerlo paso a paso.
- [ ] Se que `sort` muta el array y necesita `(a, b) => a - b` para numeros.
- [ ] Uso el spread `...` para copiar y juntar arrays sin mutar.
- [ ] Entiendo `const [a, b] = array` y por que `useState` lo usa.

## 🧪 Ejercicios

1. 💻 Crea un array de numeros `[5, 12, 8, 130, 44]`. Con `filter`, deja solo los mayores que 10. Con `map`, multiplica cada uno por 2. Encadena ambos en una sola expresion.

2. 💻 Usando la lista `servicios` del capitulo, calcula con `reduce` el precio **promedio** de todos los servicios (suma total dividida entre la cantidad). Pista: usa `servicios.length`.

3. 💻 Escribe una funcion `existeServicio(nombre)` que use `some` para devolver `true` si hay un servicio con ese nombre, y `false` si no. Pruebala con `"Logo"` y con `"App movil"`.

4. 💻 Parte de `const datos = [3, 1, 4, 1, 5, 9, 2]`. Crea una copia ordenada de menor a mayor **sin** modificar `datos` (usa spread + `sort`). Comprueba con `console.log` que `datos` sigue desordenado.

5. Sin ejecutar nada, escribe en papel que devuelve cada linea y por que: `[1,2,3].slice(1)`, `[1,2,3].includes(2)`, `[1,2,3].indexOf(9)`.

6. 💻 Reto: desestructura `const [primero, ...resto] = ["web", "seo", "ia", "social"]`. Luego, con `resto`, construye un texto `"seo, ia, social"` usando `join`.

> Lo lograste. Si algun metodo todavia se te enreda, escribe el ejercicio con un `for` normal primero y luego traducelo al metodo. Yo, Bit, sigo confundiendo `slice` y `splice` cada dos por tres, asi que estas en muy buena compania. Nos vemos en el Capitulo 09.
