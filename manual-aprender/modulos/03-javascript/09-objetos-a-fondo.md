# Capitulo 09 — Objetos a fondo

<p align="center">
  <img src="../../recursos/imagenes/03-javascript/cap09.png" alt="Ilustración del capítulo (pixel art con Bit)" width="640">
</p>


> Hola otra vez, soy **Bit**, tu ajolote guia. Hasta ahora hemos visto variables, funciones y arreglos. Hoy abrimos la caja fuerte de JavaScript: los **objetos**. Casi todo lo que toca tu codigo real (la respuesta de una API, un usuario de Supabase, la configuracion de un proyecto en Faro) llega en forma de objeto. Si dominas esto, dominas el 80% del trabajo del dia a dia. Respira, mueve las branquias, y vamos despacio. Cada palabra rara la voy a explicar en un recuadro azul. Nada quedara sin definir.

---

## 1. ¿Que es un objeto y por que importa?

Un arreglo guarda cosas en orden por numero: `lista[0]`, `lista[1]`. Un objeto guarda cosas con **nombre**: `usuario.nombre`, `usuario.edad`. Cuando lo que describes tiene partes que merecen un nombre, usa un objeto.

> ### 🟦 ¿Que significa? — *Objeto*
> Es una coleccion de pares **nombre + valor**. Cada nombre se llama **propiedad** y cada valor puede ser un texto, un numero, otro objeto o incluso una funcion.
> **Para que sirve:** agrupar datos que pertenecen a la misma "cosa" bajo una sola variable.
> **Donde se usa en un repo real:** en **Faro/Organizer** cada proyecto analizado es un objeto con propiedades como `nombre`, `estado`, `progreso` y `roadmap`.

```javascript
const proyecto = {
  nombre: "Faro",
  estado: "en progreso",
  progreso: 42,
};

console.log(proyecto.nombre); // "Faro"
```

Las llaves `{ }` delimitan el objeto. Dentro van pares `clave: valor` separados por comas.

> ### 🟦 ¿Que significa? — *Propiedad*
> Es uno de los nombres dentro del objeto (en el ejemplo: `nombre`, `estado`, `progreso`). Tambien se le llama **clave** (en ingles *key*).
> **Para que sirve:** etiquetar cada dato para poder pedirlo despues por su nombre.
> **Donde se usa:** en **tunal-digital**, cuando el formulario de contacto arma un objeto con propiedades `nombre`, `email` y `mensaje` antes de enviarlo.

> ### 💡 Tip
> Lee un objeto como una ficha: "este proyecto **tiene** nombre Faro, **tiene** estado en progreso". La palabra "tiene" es la pista de que estas frente a propiedades.

---

## 2. Leer y escribir propiedades: punto y corchetes

Hay dos formas de acceder a una propiedad.

```javascript
const usuario = { nombre: "Edwar", rol: "dueño" };

// Notacion de punto: la mas comun y legible
console.log(usuario.nombre); // "Edwar"

// Notacion de corchetes: util cuando la clave esta en una variable
const clave = "rol";
console.log(usuario[clave]); // "dueño"
```

> ### 🟦 ¿Que significa? — *Notacion de punto*
> Escribir `objeto.propiedad` para leer o cambiar un valor.
> **Para que sirve:** es la forma corta y clara cuando ya sabes el nombre exacto de la propiedad.
> **Donde se usa:** en **RachaSimple**, al leer `racha.dias` de un dato traido de Supabase.

> ### 🟦 ¿Que significa? — *Notacion de corchetes*
> Escribir `objeto["propiedad"]`. Acepta un texto o una variable que contenga el nombre.
> **Para que sirve:** cuando el nombre de la propiedad se decide en tiempo de ejecucion (por ejemplo, viene de un bucle o de la eleccion del usuario).
> **Donde se usa:** util en **PolyPaw** al recorrer las claves de un JSON de misiones donde cada clave es un id distinto.

Para escribir, asignas con `=`:

```javascript
usuario.rol = "administrador"; // cambia un valor existente
usuario.activo = true;         // crea una propiedad nueva
```

> ### ⚠️ Cuidado
> Si pides una propiedad que no existe, JavaScript **no se rompe**: devuelve `undefined`. Eso puede confundir, porque parece que "funciono". Mas adelante veremos `?.` para protegerte de esto.

---

## 3. Metodos: funciones que viven dentro del objeto

Un objeto no solo guarda datos; tambien puede guardar **acciones**.

> ### 🟦 ¿Que significa? — *Metodo*
> Es una propiedad cuyo valor es una funcion. En lugar de un dato, guarda algo que el objeto **sabe hacer**.
> **Para que sirve:** mantener juntas las acciones con los datos sobre los que actuan.
> **Donde se usa:** en **tunal-digital**, el `main.js` define funciones de atajo (acortar/seleccionar elementos del DOM); agrupadas en un objeto serian metodos de ese objeto utilitario.

```javascript
const saludador = {
  nombre: "Bit",
  saludar() {
    return "Hola, soy " + this.nombre;
  },
};

console.log(saludador.saludar()); // "Hola, soy Bit"
```

Fijate en `saludar() { ... }`: es el **atajo de metodo**, una forma corta de escribir `saludar: function() { ... }`. Y aparecio una palabra clave nueva: `this`.

---

## 4. `this`: el "yo mismo" del objeto

> ### 🟦 ¿Que significa? — *this*
> Dentro de un metodo, `this` se refiere al **objeto que llamo al metodo**. Es como decir "yo mismo".
> **Para que sirve:** que un metodo pueda leer las propiedades de su propio objeto sin repetir el nombre de la variable.
> **Donde se usa:** en cualquier objeto con metodos; por ejemplo, en componentes de **Faro** cuando un objeto de configuracion necesita referirse a sus propios valores.

```javascript
const carrito = {
  productos: ["camisa", "gorra"],
  total() {
    return this.productos.length; // "this" = carrito
  },
};

console.log(carrito.total()); // 2
```

Cuando escribes `carrito.total()`, JavaScript pone `this = carrito` mientras corre el metodo. Por eso `this.productos` es lo mismo que `carrito.productos`.

> ### ⚠️ Cuidado
> `this` cambia segun **como se llama** la funcion, no segun donde se escribio. Si extraes el metodo a una variable suelta (`const f = carrito.total; f();`), `this` se pierde y obtienes un error o `undefined`. Para principiantes, la regla segura es: **llama los metodos pegados a su objeto** (`carrito.total()`), no por separado.

> ### 💡 Tip
> Las **funciones flecha** (`() => {}`) no tienen su propio `this`: heredan el de afuera. Por eso, para metodos que usan `this`, prefiere la sintaxis normal `metodo() {}` y no la flecha.

---

## 5. Atajo de propiedades (shorthand)

Muy seguido tienes una variable que se llama igual que la propiedad que quieres crear. JavaScript te deja escribirlo una sola vez.

> ### 🟦 ¿Que significa? — *Atajo de propiedades* (shorthand)
> Si ya tienes una variable `nombre`, puedes escribir `{ nombre }` en vez de `{ nombre: nombre }`. Ambos crean una propiedad `nombre` con el valor de la variable.
> **Para que sirve:** evitar repetir y escribir menos.
> **Donde se usa:** en **RachaSimple**, al armar el objeto que se envia a Supabase usando variables que ya se llaman como las columnas.

```javascript
const nombre = "Faro";
const estado = "activo";

// Forma larga
const a = { nombre: nombre, estado: estado };

// Atajo (identico resultado)
const b = { nombre, estado };

console.log(b); // { nombre: "Faro", estado: "activo" }
```

> ### 🔎 En tu codigo
> En el `main.js` de **tunal-digital**, cuando recoges los valores del formulario en variables `nombre`, `email`, `mensaje`, puedes mandarlos al Worker como `{ nombre, email, mensaje }` sin repetir nada.

---

## 6. Spread y copia de objetos

Aqui empieza una de las herramientas mas usadas en proyectos React (RachaSimple, Faro): el operador **spread**.

> ### 🟦 ¿Que significa? — *Spread* (`...`)
> Tres puntos delante de un objeto que "desparraman" todas sus propiedades dentro de otro objeto nuevo.
> **Para que sirve:** copiar un objeto o combinar varios sin tocar los originales.
> **Donde se usa:** en **Faro** y **RachaSimple**, para actualizar el estado de React creando una copia con un cambio, en vez de modificar el objeto viejo.

```javascript
const base = { nombre: "Faro", estado: "activo", progreso: 42 };

// Copia exacta
const copia = { ...base };

// Copia con un cambio
const actualizado = { ...base, progreso: 80 };

console.log(actualizado); // { nombre: "Faro", estado: "activo", progreso: 80 }
console.log(base.progreso); // 42  (el original NO cambio)
```

Cuando dos propiedades chocan, **gana la ultima** escrita. Por eso `progreso: 80` pisa al `progreso: 42` que venia en `...base`.

> ### 🟦 ¿Que significa? — *Copia (inmutabilidad)*
> Hacer un objeto nuevo con los mismos datos en vez de modificar el original. Trabajar asi se llama **inmutabilidad**.
> **Para que sirve:** evitar errores donde un cambio en un lado rompe otra parte del programa que apuntaba al mismo objeto.
> **Donde se usa:** es **obligatorio** al actualizar estado en React (RachaSimple, Faro); por eso veras `...` por todos lados en esos repos.

> ### ⚠️ Cuidado
> El spread hace una **copia superficial** (*shallow copy*): copia el primer nivel, pero los objetos anidados se comparten. Si `base` tuviera `config: { tema: "oscuro" }`, la copia y el original apuntarian al **mismo** `config`. Para cambios profundos, copia tambien el nivel interno: `{ ...base, config: { ...base.config, tema: "claro" } }`.

> ### 💡 Tip
> El mismo `...` sirve para combinar: `{ ...valoresPorDefecto, ...valoresDelUsuario }` aplica los del usuario encima de los defaults. Patron clasico para configuraciones.

---

## 7. Desestructuracion: sacar propiedades a variables

Sacar valores de un objeto uno por uno cansa. La **desestructuracion** lo hace en una linea.

> ### 🟦 ¿Que significa? — *Desestructuracion*
> Sintaxis para extraer propiedades de un objeto y guardarlas en variables sueltas de golpe.
> **Para que sirve:** escribir menos y dejar claro al inicio de una funcion que datos vas a usar.
> **Donde se usa:** en **Faro** y **RachaSimple**, en cada componente que recibe `props` o que lee un resultado de TanStack Query con `const { data, isLoading } = useQuery(...)`.

```javascript
const proyecto = { nombre: "Faro", estado: "activo", progreso: 42 };

// Forma larga
const nombre1 = proyecto.nombre;
const estado1 = proyecto.estado;

// Desestructuracion (mismo resultado)
const { nombre, estado } = proyecto;

console.log(nombre); // "Faro"
console.log(estado); // "activo"
```

El nombre de la variable debe coincidir con el de la propiedad. Pero a veces no quieres eso, y para eso existe el renombrado.

### 7.1 Renombrado

> ### 🟦 ¿Que significa? — *Renombrado en desestructuracion*
> Cambiar el nombre de la variable usando `propiedad: nuevoNombre`.
> **Para que sirve:** evitar choques de nombres o usar un nombre mas claro en tu codigo.
> **Donde se usa:** comun en **RachaSimple** cuando dos consultas devuelven `data` y necesitas distinguirlas: `const { data: rachas } = useQuery(...)`.

```javascript
const { nombre: tituloProyecto } = proyecto;
console.log(tituloProyecto); // "Faro"
// Ojo: "nombre" como variable ya no existe; ahora es "tituloProyecto"
```

### 7.2 Valores por defecto

> ### 🟦 ¿Que significa? — *Valor por defecto en desestructuracion*
> Un valor de respaldo (`propiedad = valor`) que se usa **solo** si la propiedad es `undefined`.
> **Para que sirve:** que tu variable nunca quede vacia cuando el dato no vino.
> **Donde se usa:** en **Faro**, al leer configuracion de un proyecto donde algunos campos podrian faltar.

```javascript
const config = { tema: "oscuro" };

const { tema = "claro", idioma = "es" } = config;

console.log(tema);   // "oscuro" (vino en el objeto)
console.log(idioma); // "es"     (no vino, se uso el default)
```

Puedes combinar renombrado y default a la vez:

```javascript
const { idioma: lang = "es" } = config;
console.log(lang); // "es"
```

> ### ⚠️ Cuidado
> El default salta **solo con `undefined`**, no con otros valores "vacios". Si la propiedad vale `null`, `0` o `""`, esos SI se respetan y el default no entra. Es un error tipico esperar que `0` active el respaldo: no lo hace.

---

## 8. Optional chaining `?.`: leer sin miedo a romper

Cuando lees datos anidados (un objeto dentro de otro), si un nivel falta, el programa **explota** con un error. El operador `?.` evita ese golpe.

> ### 🟦 ¿Que significa? — *Optional chaining* (`?.`)
> Operador que lee una propiedad solo si lo de la izquierda existe; si es `null` o `undefined`, devuelve `undefined` en vez de lanzar error.
> **Para que sirve:** acceder con seguridad a datos que podrian no estar (respuestas de API incompletas, usuario sin sesion, etc.).
> **Donde se usa:** en **Faro** y **RachaSimple**, al leer datos del usuario de Supabase: `user?.email` no truena aunque `user` sea `null` mientras carga la sesion.

```javascript
const respuesta = {
  proyecto: { nombre: "Faro" },
};

// Sin ?.  -> esto explotaria si "drive" no existe:
// console.log(respuesta.drive.archivos); // ❌ TypeError

// Con ?.  -> seguro:
console.log(respuesta.drive?.archivos); // undefined (no truena)
console.log(respuesta.proyecto?.nombre); // "Faro"
```

Tambien funciona para llamar metodos que quizas no existan:

```javascript
const obj = {};
obj.saludar?.(); // no hace nada, pero NO truena
```

> ### 🔎 En tu codigo
> En el `main.js` de **tunal-digital**, cuando haces `fetch` al Worker y conviertes la respuesta a objeto, no todos los campos llegan siempre. Leer `data?.respuesta?.texto` evita que la pagina se rompa si el chat de IA devolvio algo distinto a lo esperado.

> ### ⚠️ Cuidado
> No abuses de `?.`. Si una propiedad **siempre** deberia existir, usar `?.` esconde bugs reales. Usalo solo donde de verdad el dato puede faltar.

---

## 9. Nullish coalescing `??`: un respaldo mas preciso

`?.` te da `undefined` cuando algo falta. Casi siempre quieres poner un valor de respaldo. Para eso esta `??`.

> ### 🟦 ¿Que significa? — *Nullish coalescing* (`??`)
> Operador que devuelve lo de la derecha **solo** si lo de la izquierda es `null` o `undefined`. La palabra *nullish* significa "que es null o undefined".
> **Para que sirve:** dar un valor por defecto sin equivocarte con datos validos como `0` o `""`.
> **Donde se usa:** en **Faro**, al mostrar el progreso: `progreso ?? 0` deja pasar un `0` real pero cubre el caso de dato ausente.

```javascript
const progreso = 0;

console.log(progreso ?? 100); // 0   -> 0 es valido, se respeta
console.log(progreso || 100); // 100 -> ¡ojo! "||" trata el 0 como falso
```

Esa es la diferencia clave con el viejo `||`.

> ### 🟦 ¿Que significa? — *Valor "falsy"*
> En JavaScript, los valores que cuentan como "falso" en una condicion: `false`, `0`, `""` (texto vacio), `null`, `undefined` y `NaN`.
> **Para que sirve:** entender por que `||` a veces "se come" un `0` o un texto vacio que tu si querias conservar.
> **Donde se usa:** en cualquier repo; saberlo evita bugs sutiles al poner defaults.

> ### 💡 Tip
> Regla practica: usa `??` cuando `0`, `""` o `false` sean **valores validos** que quieres conservar. Usa `||` solo cuando de verdad quieras tratar todos esos como "vacio".

`?.` y `??` se combinan de maravilla:

```javascript
const usuario = null;
const nombre = usuario?.nombre ?? "Invitado";
console.log(nombre); // "Invitado"
```

---

## 10. Recorrer objetos: keys, values y entries

Un objeto no se recorre con `for` por indice como un arreglo. Para eso `Object` nos da tres ayudantes.

> ### 🟦 ¿Que significa? — *Object.keys()*
> Funcion que devuelve un **arreglo con los nombres** (claves) de las propiedades de un objeto.
> **Para que sirve:** saber que propiedades tiene un objeto y recorrerlas.
> **Donde se usa:** en **PolyPaw**, al recorrer las claves de un JSON de misiones para listarlas.

> ### 🟦 ¿Que significa? — *Object.values()*
> Devuelve un arreglo con los **valores** de las propiedades.
> **Para que sirve:** trabajar solo con los datos sin importar como se llaman.
> **Donde se usa:** util para sumar o filtrar todos los valores de un objeto de configuracion.

> ### 🟦 ¿Que significa? — *Object.entries()*
> Devuelve un arreglo de pares `[clave, valor]`, uno por cada propiedad.
> **Para que sirve:** recorrer clave y valor al mismo tiempo.
> **Donde se usa:** en **Faro**, al pintar una tabla donde cada fila muestra el nombre de un dato y su valor.

```javascript
const proyecto = { nombre: "Faro", estado: "activo", progreso: 42 };

console.log(Object.keys(proyecto));   // ["nombre", "estado", "progreso"]
console.log(Object.values(proyecto)); // ["Faro", "activo", 42]
console.log(Object.entries(proyecto));
// [["nombre","Faro"], ["estado","activo"], ["progreso",42]]
```

Como te devuelven **arreglos**, puedes usar todo lo que ya sabes de arreglos, como `forEach`:

```javascript
Object.entries(proyecto).forEach(([clave, valor]) => {
  console.log(`${clave}: ${valor}`);
});
// nombre: Faro
// estado: activo
// progreso: 42
```

> ### 💡 Tip
> Fijate en `([clave, valor]) =>`: ahi hay desestructuracion de **arreglos**. Cada par `[clave, valor]` se abre directo en dos variables. Mezclar tecnicas asi es lo normal en codigo real.

---

## 11. JSON a fondo: stringify y parse

Cuando guardas datos en un archivo o los mandas por internet, no viajan como objetos: viajan como **texto**. JSON es el formato de ese texto.

> ### 🟦 ¿Que significa? — *JSON*
> Sigla de *JavaScript Object Notation*. Es un **formato de texto** para representar objetos y arreglos. Se parece mucho a un objeto de JavaScript, pero es texto plano y con reglas estrictas (claves siempre entre comillas dobles, sin funciones, sin comas finales).
> **Para que sirve:** guardar datos en archivos y enviarlos entre programas o por la red.
> **Donde se usa:** en **PolyPaw** las misiones se guardan en archivos `.json`; en **tunal-digital** el `fetch` al Worker envia y recibe JSON.

> ### 🟦 ¿Que significa? — *JSON.stringify()*
> Convierte un objeto de JavaScript en **texto** JSON.
> **Para que sirve:** preparar datos para guardarlos o mandarlos por `fetch`.
> **Donde se usa:** en **tunal-digital**, el `main.js` hace `JSON.stringify` del mensaje del usuario antes de enviarlo al Worker de IA.

> ### 🟦 ¿Que significa? — *JSON.parse()*
> Hace lo contrario: convierte **texto** JSON de vuelta a un objeto de JavaScript usable.
> **Para que sirve:** leer datos que llegaron como texto (de una API, de un archivo) y volver a usarlos como objeto.
> **Donde se usa:** en **PolyPaw** al cargar un archivo de misiones; en **tunal-digital** al leer la respuesta del Worker.

```javascript
const proyecto = { nombre: "Faro", progreso: 42 };

// Objeto -> texto
const texto = JSON.stringify(proyecto);
console.log(texto); // '{"nombre":"Faro","progreso":42}'
console.log(typeof texto); // "string"

// Texto -> objeto
const otraVez = JSON.parse(texto);
console.log(otraVez.progreso); // 42
console.log(typeof otraVez); // "object"
```

### 11.1 stringify con formato bonito

`JSON.stringify` acepta dos argumentos extra: uno para filtrar y otro para **indentar**.

```javascript
const bonito = JSON.stringify(proyecto, null, 2);
console.log(bonito);
// {
//   "nombre": "Faro",
//   "progreso": 42
// }
```

El `null` es el "filtro" (no filtramos nada) y el `2` son los espacios de sangria. Asi se ven los `.json` legibles de **PolyPaw**.

> ### ⚠️ Cuidado
> `JSON.stringify` **ignora** las funciones y el valor `undefined`: simplemente no aparecen en el texto. JSON guarda datos, no acciones. Si necesitabas un metodo, no estara al volver con `parse`.

> ### ⚠️ Cuidado
> `JSON.parse` **truena** si el texto no es JSON valido (una coma de mas, una comilla simple). Cuando el texto viene de afuera (de un `fetch`), protege la llamada con `try { ... } catch { ... }` para que un dato malo no rompa toda la pagina.

```javascript
try {
  const datos = JSON.parse(textoDeAfuera);
} catch {
  console.log("El texto no era JSON valido");
}
```

> ### 🔎 En tu codigo
> El ciclo completo del chat de **tunal-digital** es: armas un objeto `{ mensaje }`, lo conviertes con `JSON.stringify` para el `fetch`, el Worker responde texto JSON, y tu lo recuperas con `JSON.parse` (o con `await respuesta.json()`, que hace el parse por dentro). Entender este viaje texto-objeto es entender medio backend.

---

## 12. Todo junto: un mini ejemplo realista

Juntemos varias piezas como en un caso de **Faro**:

```javascript
function resumirProyecto(datos) {
  // Desestructuracion con default y renombrado
  const {
    nombre = "Sin nombre",
    estado = "desconocido",
    metricas: { progreso } = {}, // anidado con default
  } = datos;

  // Optional chaining + nullish
  const ultimoRoadmap = datos.roadmap?.[0]?.titulo ?? "Sin tareas";

  // Copia inmutable con un campo nuevo
  const resumen = { nombre, estado, progreso: progreso ?? 0, ultimoRoadmap };

  return JSON.stringify(resumen, null, 2);
}

console.log(
  resumirProyecto({
    nombre: "Faro",
    metricas: { progreso: 42 },
    roadmap: [{ titulo: "OAuth con Supabase" }],
  })
);
// {
//   "nombre": "Faro",
//   "estado": "desconocido",
//   "progreso": 42,
//   "ultimoRoadmap": "OAuth con Supabase"
// }
```

Mira cuanto cabe en pocas lineas: desestructuracion, defaults, `?.`, `??`, copia con spread implicito y `JSON.stringify`. Eso es JavaScript real.

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Se crear un objeto y leer/escribir propiedades con punto y con corchetes.
- [ ] Entiendo que un metodo es una funcion dentro de un objeto.
- [ ] Se que `this` es "el objeto que llamo al metodo" y por que conviene llamar el metodo pegado a su objeto.
- [ ] Uso el atajo de propiedades `{ nombre }` cuando la variable se llama igual.
- [ ] Copio objetos con `...` y entiendo que es una copia superficial.
- [ ] Desestructuro con renombrado (`prop: nuevo`) y con valores por defecto (`prop = valor`).
- [ ] Distingo cuando el default salta (solo con `undefined`).
- [ ] Leo datos anidados con `?.` sin que el programa truene.
- [ ] Uso `??` para defaults y se por que es mejor que `||` cuando `0` o `""` son validos.
- [ ] Recorro objetos con `Object.keys`, `Object.values` y `Object.entries`.
- [ ] Convierto objeto-a-texto con `JSON.stringify` y texto-a-objeto con `JSON.parse`, y protejo el parse con `try/catch`.

---

## 🧪 Ejercicios

1. **Ficha de mascota (papel o consola).** Escribe en un objeto `bit` las propiedades `nombre`, `especie` y `colorFavorito`. Luego, sin mirar, di que devuelve `bit.edad`. (Pista: la propiedad no existe.)

2. 💻 **Metodo con `this`.** Crea un objeto `contador` con propiedad `valor: 0` y un metodo `sumar()` que haga `this.valor++` y devuelva `this.valor`. Llamalo tres veces y comprueba que imprime `1`, `2`, `3`.

3. 💻 **Copia segura.** Parte de `const base = { nombre: "Faro", progreso: 42 }`. Crea `mejorado` con spread cambiando `progreso` a `100`. Imprime `base.progreso` y confirma que sigue en `42`.

4. 💻 **Desestructuracion con defaults.** Dado `const config = { tema: "oscuro" }`, desestructura `tema` y `idioma` poniendo `"es"` como default de `idioma`. Imprime ambos. Luego renombra `tema` a `apariencia`.

5. 💻 **`?.` y `??` al rescate.** Dado `const data = { proyecto: { nombre: "Faro" } }`, intenta leer `data.drive?.archivos?.length ?? 0` y explica por que el resultado es `0` en vez de un error.

6. 💻 **Ida y vuelta con JSON.** Toma el objeto del ejercicio 3, conviertelo a texto con `JSON.stringify(obj, null, 2)` e imprimelo. Luego pasalo por `JSON.parse` y comprueba con `typeof` que volviste a tener un objeto.

---

> Lo lograste. Hoy abriste, copiaste, recorriste y empaquetaste objetos como un profesional. Cada vez que en **Faro** o **RachaSimple** veas `{ ...algo }`, `data?.campo` o `JSON.stringify`, ya sabras exactamente que pasa por dentro. Nos vemos en el siguiente capitulo. — Bit 🐾
```
