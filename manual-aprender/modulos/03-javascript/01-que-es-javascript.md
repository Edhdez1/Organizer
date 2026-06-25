# Capítulo 01 — ¿Qué es JavaScript?

> Llegó el momento de programar de verdad. En el Módulo 00 viste que casi todo programa usa
> tres ingredientes: **datos, decisiones y repeticiones**. JavaScript es donde por fin los
> escribes. Empecemos por qué es y por los datos (las variables).

---

## 1. Qué es JavaScript y dónde vive

> ### 🟦 ¿Qué significa? — *JavaScript (JS)*
> **JavaScript** es un **lenguaje de programación** (este sí, a diferencia de HTML/CSS) que da
> **comportamiento** a las páginas web. Originalmente corría solo dentro del **navegador**, para
> hacer las páginas interactivas. Hoy también corre en servidores (con Node.js) y en apps.
> **¿Para qué sirve?** Para todo lo que "reacciona": clics, formularios que validan, contenido
> que aparece, datos que se piden a un servidor, animaciones, juegos.

> ### ⚠️ Cuidado — JavaScript NO es Java
> A pesar del nombre, **JavaScript y Java son lenguajes distintos**, tan diferentes como "carro"
> y "carpa". El nombre fue una decisión de marketing de los años 90. Si buscas ayuda, busca
> "JavaScript", no "Java".

> ### 🟦 ¿Qué significa? — *El motor y la consola*
> El navegador trae un **motor de JavaScript** que ejecuta tu código. Y trae una **consola**:
> una ventana (dentro de las DevTools, `F12` → pestaña **Console**) donde puedes escribir
> JavaScript y ver resultados al instante. Es tu laboratorio para practicar.

> ### 🟦 ¿Qué significa? — *`console.log()`*
> `console.log(...)` es la instrucción para **mostrar un valor en la consola**. Es la
> herramienta número uno para ver qué está pasando en tu código (lo que en otros lenguajes
> sería "imprimir"):
> ```javascript
> console.log("Hola, mundo");   // muestra: Hola, mundo
> console.log(2 + 3);            // muestra: 5
> ```
> **Pruébalo ya:** abre cualquier página, pulsa `F12` → Console, escribe `console.log("hola")`
> y pulsa Enter. Acabas de ejecutar JavaScript.

---

## 2. Cómo se conecta JS a una página

Igual que el CSS, el JavaScript se suele poner en un **archivo aparte** (`.js`) y se enlaza
desde el HTML, normalmente justo antes de cerrar el `<body>`:

```html
  <script src="main.js"></script>
</body>
```

> ### 🟦 ¿Qué significa? — *La etiqueta `<script>`*
> `<script>` carga y ejecuta JavaScript en la página. Con `src` apunta a un archivo externo
> (recomendado). Se coloca al final del `<body>` para que el HTML ya esté cargado cuando el
> script intente manipularlo (lo entenderás en el capítulo 04). **¿Dónde se usa en tu
> proyecto?** Tu `index.html` carga `main.js` justo así.

---

## 3. Variables: cajitas con nombre para guardar datos

> ### 🟦 ¿Qué significa? — *Variable*
> Una **variable** es un espacio en memoria, **con un nombre**, donde guardas un dato para
> usarlo o cambiarlo después. (Ya viste el concepto en el Módulo 00; aquí lo escribes.)
> En JavaScript moderno se crean con `let` o `const`:
> ```javascript
> let edad = 25;
> const nombre = "Edwar";
> ```

> ### 🟦 ¿Qué significa? — *`let` vs. `const` (y por qué no `var`)*
> - `const` → una variable **constante**: su valor **no cambiará**. Úsala por defecto.
> - `let` → una variable que **sí podrá cambiar** de valor más adelante.
> - `var` → la forma **antigua**; tiene comportamientos confusos. **No la uses** en código nuevo
>   (la verás en código viejo).
> ```javascript
> const pi = 3.14;     // nunca cambia
> let contador = 0;    // cambiará
> contador = contador + 1;   // ahora vale 1
> ```
> **Regla práctica:** usa `const` siempre; cámbiala a `let` solo cuando de verdad necesites
> reasignar el valor. Esto evita errores.

> ### 🟦 ¿Qué significa? — *Asignación (`=`)*
> El signo `=` **no** significa "igual" como en matemáticas: significa "**guarda** el valor de
> la derecha en la variable de la izquierda". `edad = 25` se lee "guarda 25 en edad". (Para
> comparar igualdad se usa `===`, que verás en el próximo capítulo.)

> ### 💡 Tip — Nombres de variables
> - Usa nombres **descriptivos**: `precioTotal`, no `x`.
> - Se escriben en **camelCase**: primera palabra en minúscula y las siguientes con mayúscula
>   inicial (`nombreUsuario`, `totalConIva`). Es la convención en JavaScript.
> - No pueden empezar con número ni tener espacios.

---

## 4. Los tipos de dato

Los datos que guardas son de distintos **tipos**. Estos son los que usarás siempre:

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
> Los **arrays** y **objetos** los veremos a fondo en el capítulo 05; por ahora reconócelos.

> ### 🟦 ¿Qué significa? — *String (cadena de texto)*
> Un **string** es texto. Va entre comillas dobles `"..."`, simples `'...'`, o invertidas
> `` `...` `` (estas últimas son especiales: las verás abajo). Ejemplos: `"correo@ejemplo.com"`.

> ### 🟦 ¿Qué significa? — *Booleano*
> Un **booleano** solo tiene dos valores: `true` (verdadero) o `false` (falso). Es la base de
> las **decisiones**: "¿el usuario está logueado? → true/false". Lo usarás en cada `if`.

> ### 🟦 ¿Qué significa? — *Template strings (plantillas de texto)*
> Con las comillas invertidas `` ` `` puedes **insertar variables dentro de un texto** usando
> `${...}`. Es comodísimo:
> ```javascript
> const nombre = "Edwar";
> const saludo = `Hola, ${nombre}. ¡Bienvenido!`;
> console.log(saludo);   // muestra: Hola, Edwar. ¡Bienvenido!
> ```
> Sin esto tendrías que "pegar" textos con `+` ("Hola, " + nombre + "."), más engorroso.

---

## 5. Un primer programa completo

Junta todo: variables, tipos, template string y `console.log`:

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
> (En HTML era `<!-- -->`, en CSS `/* */`; en JS la forma rápida es `//`.)

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

Puedes hacer varios **directamente en la consola** del navegador (`F12` → Console), sin instalar nada.

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
