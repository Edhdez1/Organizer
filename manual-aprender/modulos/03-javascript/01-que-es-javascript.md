# Capítulo 01 — ¿Qué es JavaScript?

> Aquí empieza la programación de verdad. En el Módulo 00 viste que casi cualquier programa
> se arma con tres ingredientes: **datos, decisiones y repeticiones**. JavaScript es donde por
> fin los escribes con tus propias manos. Arranquemos por lo básico: qué es y cómo se guardan
> los datos (las variables).

---

## 1. Qué es JavaScript y dónde vive

> ### 🟦 ¿Qué significa? — *JavaScript (JS)*
> **JavaScript** es un **lenguaje de programación** de verdad (este sí, al contrario que
> HTML/CSS) y su trabajo es darle **comportamiento** a las páginas web. Al principio solo vivía
> dentro del **navegador**, donde se encargaba de que las páginas reaccionaran. Hoy hace mucho
> más: también corre en servidores (con Node.js) y en aplicaciones.
> **¿Para qué sirve?** Para todo lo que "responde": clics, formularios que se validan, contenido
> que aparece de repente, datos que se piden a un servidor, animaciones, juegos.

> ### ⚠️ Cuidado — JavaScript NO es Java
> Aunque el nombre confunda, **JavaScript y Java son dos lenguajes distintos**, tan parecidos
> como "carro" y "carpa". Lo del nombre fue una jugada de marketing de los años 90, nada más.
> Así que cuando busques ayuda, busca "JavaScript", no "Java".

> ### 🟦 ¿Qué significa? — *El motor y la consola*
> El navegador incluye un **motor de JavaScript**, que es lo que ejecuta tu código. Y trae
> también una **consola**: una ventanita (dentro de las DevTools, `F12` → pestaña **Console**)
> donde puedes escribir JavaScript y ver el resultado al momento. Piénsala como tu laboratorio
> para practicar.

> ### 🟦 ¿Qué significa? — *`console.log()`*
> `console.log(...)` es la instrucción que usas para **mostrar un valor en la consola**. Es,
> con diferencia, tu mejor amiga para ver qué está pasando dentro de tu código (lo que en otros
> lenguajes llamarían "imprimir"):
> ```javascript
> console.log("Hola, mundo");   // muestra: Hola, mundo
> console.log(2 + 3);            // muestra: 5
> ```
> **Pruébalo ya:** abre cualquier página, pulsa `F12` → Console, escribe `console.log("hola")`
> y dale a Enter. Listo, acabas de ejecutar JavaScript.

---

## 2. Cómo se conecta JS a una página

Como pasaba con el CSS, lo normal es que el JavaScript viva en su propio **archivo aparte**
(`.js`) y se enlace desde el HTML, casi siempre justo antes de cerrar el `<body>`:

```html
  <script src="main.js"></script>
</body>
```

> ### 🟦 ¿Qué significa? — *La etiqueta `<script>`*
> `<script>` es la etiqueta que carga y ejecuta JavaScript en la página. Con `src` la haces
> apuntar a un archivo externo (lo más recomendable). Se pone al final del `<body>` para que,
> cuando el script intente tocar el HTML, ese HTML ya esté cargado (le verás todo el sentido
> en el capítulo 04). **¿Dónde se usa en tu proyecto?** Tu `index.html` carga `main.js`
> exactamente así.

---

## 3. Variables: cajitas con nombre para guardar datos

> ### 🟦 ¿Qué significa? — *Variable*
> Una **variable** es un espacio en memoria, **con un nombre**, donde guardas un dato para
> volver a usarlo o cambiarlo más tarde. (El concepto ya lo viste en el Módulo 00; aquí toca
> escribirlo.) En el JavaScript de hoy se crean con `let` o `const`:
> ```javascript
> let edad = 25;
> const nombre = "Edwar";
> ```

> ### 🟦 ¿Qué significa? — *`let` vs. `const` (y por qué no `var`)*
> - `const` → una variable **constante**: su valor **no va a cambiar**. Esta es tu opción por
>   defecto.
> - `let` → una variable que **sí podrá cambiar** de valor más adelante.
> - `var` → la forma **antigua**, con comportamientos que despistan. **No la uses** en código
>   nuevo (aunque te la cruzarás en código viejo).
> ```javascript
> const pi = 3.14;     // nunca cambia
> let contador = 0;    // cambiará
> contador = contador + 1;   // ahora vale 1
> ```
> **Regla práctica:** empieza siempre con `const` y cámbiala a `let` solo cuando de verdad
> necesites reasignar el valor. Esto te ahorra errores.

> ### 🟦 ¿Qué significa? — *Asignación (`=`)*
> El signo `=` **no** quiere decir "igual" como en matemáticas. Aquí significa "**guarda** el
> valor de la derecha en la variable de la izquierda". Así que `edad = 25` se lee "guarda 25 en
> edad". (Para comparar si dos cosas son iguales se usa `===`, que llega en el próximo capítulo.)

> ### 💡 Tip — Nombres de variables
> - Pon nombres **descriptivos**: `precioTotal`, no `x`.
> - Se escriben en **camelCase**: la primera palabra en minúscula y las siguientes con mayúscula
>   inicial (`nombreUsuario`, `totalConIva`). Es la convención de JavaScript.
> - No pueden empezar con número ni llevar espacios.

---

## 4. Los tipos de dato

Los datos que guardas no son todos iguales: cada uno es de un **tipo**. Estos son los que vas a
manejar a diario:

> ### 🟦 ¿Qué significa? — *Tipos de dato básicos*
> | Tipo | Qué es | Ejemplo |
> |---|---|---|
> | **String** (cadena) | Texto, entre comillas | `"Hola"`, `'Edwar'` |
> | **Number** (número) | Enteros o decimales, sin comillas | `25`, `3.14`, `-7` |
> | **Boolean** (booleano) | Verdadero o falso | `true`, `false` |
> | **null** | "Vacío a propósito" (sin valor) | `null` |
> | **undefined** | "Aún sin definir" (sin asignar) | `undefined` |
> | **Array** (lista) | Una colección ordenada | `[1, 2, 3]` |
> | **Object** (objeto) | Datos con etiquetas | `{ nombre: "Edwar" }` |
> Los **arrays** y **objetos** los veremos con calma en el capítulo 05; por ahora basta con que
> los reconozcas.

> ### 🟦 ¿Qué significa? — *String (cadena de texto)*
> Un **string** es texto, sin más. Va entre comillas dobles `"..."`, simples `'...'` o
> invertidas `` `...` `` (estas últimas tienen su truco; las verás abajo). Por ejemplo:
> `"correo@ejemplo.com"`.

> ### 🟦 ¿Qué significa? — *Booleano*
> Un **booleano** solo puede valer dos cosas: `true` (verdadero) o `false` (falso). Es la base
> de las **decisiones**: "¿el usuario está logueado? → true/false". Lo usarás en cada `if` que
> escribas.

> ### 🟦 ¿Qué significa? — *Template strings (plantillas de texto)*
> Con las comillas invertidas `` ` `` puedes **meter variables dentro de un texto** usando
> `${...}`. Es de lo más cómodo:
> ```javascript
> const nombre = "Edwar";
> const saludo = `Hola, ${nombre}. ¡Bienvenido!`;
> console.log(saludo);   // muestra: Hola, Edwar. ¡Bienvenido!
> ```
> Sin esto te tocaría "pegar" textos con `+` ("Hola, " + nombre + "."), que es mucho más
> engorroso.

---

## 5. Un primer programa completo

Vamos a juntarlo todo: variables, tipos, un template string y `console.log`:

```javascript
const nombre = "Edwar";
const edad = 25;
const esProgramador = true;

const mensaje = `${nombre} tiene ${edad} años. ¿Programa? ${esProgramador}`;
console.log(mensaje);
// muestra: Edwar tiene 25 años. ¿Programa? true
```

> ### 💡 Tip — Comentarios en JavaScript
> ```javascript
> // Comentario de una línea
> /* Comentario
>    de varias líneas */
> ```
> (En HTML era `<!-- -->`, en CSS `/* */`; en JS la forma rápida de comentar una línea es `//`.)

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Sé qué es JavaScript, que **no es Java**, y dónde corre (navegador/servidor).
- [ ] Sé usar la **consola** (`F12`) y `console.log()` para ver valores.
- [ ] Conecto JS con `<script src="...">` al final del `<body>`.
- [ ] Creo variables con `const` (por defecto) y `let` (si cambian); evito `var`.
- [ ] Reconozco los **tipos**: string, number, boolean, null, undefined, array, object.
- [ ] Uso **template strings** con `` `...${variable}...` ``.

---

## 🧪 Ejercicios

Varios de estos los puedes hacer **directamente en la consola** del navegador (`F12` → Console), sin instalar nada.

1. **Tipos.** Di de qué tipo es cada valor: `"42"`, `42`, `true`, `[1,2,3]`, `null`,
   `{ x: 1 }`.
2. **const o let.** ¿Cuál usarías para: el número PI; un contador que sube; el nombre de un
   usuario que no cambia; el total de un carrito que sí cambia?
3. **Template string.** Crea variables `producto` y `precio`, y arma con template string el
   texto: `El producto X cuesta $Y`.
4. **Encuentra el error.** ¿Qué falla aquí? `const edad = 25; edad = 26;`
5. 💻 **En la consola.** Abre `F12` → Console y escribe paso a paso: declara `const ciudad =
   "San Salvador";`, luego `console.log(`Vivo en ${ciudad}`);`. Observa el resultado.

➡️ Siguiente: **[Capítulo 02 — Operadores y decisiones](02-operadores-y-decisiones.md)**.
