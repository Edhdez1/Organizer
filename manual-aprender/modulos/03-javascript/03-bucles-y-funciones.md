# Capítulo 03 — Bucles y funciones

> Llegamos al tercer ingrediente del Módulo 00 (**repeticiones**) y a la herramienta que
> ordena todo el código: las **funciones**. Con variables, decisiones, bucles y funciones ya
> tienes las cuatro piezas con las que se arma casi cualquier programa.

---

## 1. Bucles: repetir sin copiar y pegar

> ### 🟦 ¿Qué significa? — *Bucle (loop)*
> Un **bucle** repite un bloque de código varias veces. En lugar de escribir lo mismo 100 veces,
> escribes la instrucción una sola vez y le indicas cuántas veces debe repetirla. Pocas cosas
> en programación te ahorran tanto trabajo.

### El bucle `for`

> ### 🟦 ¿Qué significa? — *El bucle `for`*
> `for` repite un número **conocido** de veces. Lleva tres partes entre paréntesis, separadas
> por `;`:
> ```javascript
> for (let i = 0; i < 5; i++) {
>   console.log("Vuelta número " + i);
> }
> // muestra: Vuelta número 0, 1, 2, 3, 4
> ```
> - `let i = 0` → **inicio**: crea un contador `i` que arranca en 0.
> - `i < 5` → **condición**: repite **mientras** se cumpla.
> - `i++` → **paso**: qué hacer al terminar cada vuelta (`i++` suma 1 a `i`).
>
> Se lee así: "empieza i en 0; mientras i sea menor que 5, ejecuta el bloque y luego súmale 1 a i".

> ### 💡 Tip — Por qué se empieza en 0
> En programación se cuenta **desde 0**, no desde 1. Es una convención que te encontrarás por
> todos lados (y especialmente con las listas, en el próximo capítulo). Por eso `i < 5` da 5
> vueltas: 0, 1, 2, 3, 4.

### El bucle `while`

> ### 🟦 ¿Qué significa? — *El bucle `while`*
> `while` ("mientras") repite **mientras** una condición sea verdadera. Te sirve cuando **no
> sabes de antemano** cuántas vueltas harán falta:
> ```javascript
> let saldo = 100;
> while (saldo > 0) {
>   console.log("Saldo: " + saldo);
>   saldo -= 25;   // se va gastando
> }
> ```

> ### ⚠️ Cuidado — El bucle infinito
> Si la condición de un `while` **nunca** llega a ser falsa, el bucle no termina nunca y el
> programa se cuelga. Asegúrate de que **algo dentro del bucle** acerque la condición a su final
> (en el ejemplo, `saldo` baja en cada vuelta). Es el error clásico de quien empieza; si tu
> navegador se congela, casi seguro es esto.

---

## 2. Funciones: empaquetar código para reutilizarlo

> ### 🟦 ¿Qué significa? — *Función*
> Una **función** es un **bloque de código con nombre** que hace una tarea y que puedes
> **ejecutar (llamar) cuando quieras**, las veces que quieras. Te evita repetir código y reparte
> el programa en piezas con un propósito claro.
> Piénsalo como una **receta** guardada: la escribes una vez ("hacer café") y la "invocas" cada
> mañana sin volver a anotar los pasos.

### Definir y llamar una función

```javascript
// Definir la función (escribir la receta)
function saludar() {
  console.log("¡Hola!");
}

// Llamar (ejecutar) la función
saludar();   // muestra: ¡Hola!
saludar();   // puedes llamarla cuantas veces quieras
```

> ### 🟦 ¿Qué significa? — *Definir vs. llamar*
> - **Definir** una función es escribir qué hace (todavía no la ejecuta).
> - **Llamar** (o invocar) es ejecutarla: escribes su nombre seguido de `()`.
> Definir la receta no prepara el café; llamarla, sí.

### Parámetros: darle datos a la función

> ### 🟦 ¿Qué significa? — *Parámetro y argumento*
> Un **parámetro** es una variable que la función recibe como "entrada" para trabajar. El valor
> concreto que le pasas al llamarla es el **argumento**.
> ```javascript
> function saludar(nombre) {        // 'nombre' es el parámetro
>   console.log(`¡Hola, ${nombre}!`);
> }
> saludar("Edwar");                 // "Edwar" es el argumento → ¡Hola, Edwar!
> saludar("Ana");                   // → ¡Hola, Ana!
> ```

### `return`: que la función devuelva un resultado

> ### 🟦 ¿Qué significa? — *`return` (devolver)*
> `return` hace que la función **entregue un valor** de vuelta a quien la llamó, para que lo
> uses después. Sin `return`, la función hace algo pero no te "devuelve" nada con lo que seguir.
> ```javascript
> function sumar(a, b) {
>   return a + b;     // devuelve el resultado
> }
> const total = sumar(5, 3);   // total ahora vale 8
> console.log(total);          // 8
> ```
> La diferencia clave: `console.log` **muestra** algo en pantalla; `return` **entrega** un valor
> para que sigas usándolo en el código. Una función puede tener `return` sin imprimir nada.

> ### ⚠️ Cuidado — `return` termina la función
> En cuanto se ejecuta un `return`, la función **termina ahí mismo**; lo que venga después no
> llega a ejecutarse. Eso es útil para "salir temprano" en ciertos casos.

---

## 3. Funciones flecha (la forma moderna y abreviada)

Vas a ver muchísimo esta otra forma de escribir funciones, sobre todo en React.

> ### 🟦 ¿Qué significa? — *Función flecha (arrow function)*
> Es una sintaxis más corta para escribir funciones, usando `=>` (una "flecha"):
> ```javascript
> // Función normal
> function sumar(a, b) {
>   return a + b;
> }
> // La misma, como función flecha
> const sumar = (a, b) => {
>   return a + b;
> };
> // Versión ultracorta (si solo devuelve algo, sin llaves ni return)
> const sumar = (a, b) => a + b;
> ```
> Las tres hacen exactamente lo mismo. La flecha se usa tanto porque es muy concisa. **¿Dónde la
> ves en tu proyecto?** Tu `main.js` y, sobre todo, RachaSimple y Faro están llenos de funciones
> flecha; reconocerlas te abrirá ese código.

---

## 4. Juntándolo: un ejemplo con todo

```javascript
// Función que clasifica una nota
function clasificar(nota) {
  if (nota >= 90) return "Excelente";
  if (nota >= 70) return "Aprobado";
  return "Reprobado";
}

// Una lista de notas y un bucle que las recorre
const notas = [95, 82, 60, 75];

for (let i = 0; i < notas.length; i++) {
  const resultado = clasificar(notas[i]);
  console.log(`Nota ${notas[i]}: ${resultado}`);
}
// Nota 95: Excelente
// Nota 82: Aprobado
// Nota 60: Reprobado
// Nota 75: Aprobado
```

Aquí tienes las **cuatro piezas** trabajando juntas: variables (`notas`), decisiones (`if`),
repetición (`for`) y una función reutilizable (`clasificar`). Eso es programar, ni más ni menos.
`notas.length` te da la cantidad de elementos de la lista (lo verás en el próximo capítulo).

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Escribo un bucle `for` y entiendo sus tres partes (inicio, condición, paso).
- [ ] Sé por qué se cuenta desde 0.
- [ ] Uso `while` y sé evitar el **bucle infinito**.
- [ ] Defino y **llamo** funciones; distingo ambas cosas.
- [ ] Paso datos con **parámetros/argumentos** y devuelvo con **`return`**.
- [ ] Reconozco y escribo **funciones flecha** (`=>`).

---

## 🧪 Ejercicios

1. **Cuenta.** Escribe un `for` que muestre los números del 1 al 10.
2. **Predice.** ¿Cuántas veces se ejecuta el bloque de `for (let i = 0; i < 3; i++)` y qué
   valores toma `i`?
3. **Función con return.** Escribe una función `esPar(n)` que **devuelva** `true` si `n` es par
   y `false` si no (usa `%` y `===`).
4. **Convierte a flecha.** Reescribe esta función como función flecha:
   `function doble(x) { return x * 2; }`
5. 💻 **Tabla de multiplicar.** En la consola, escribe una función `tabla(n)` que use un `for`
   para mostrar la tabla de multiplicar de `n` del 1 al 10 (ej. `tabla(3)` muestra 3, 6, 9…).

➡️ Siguiente: **[Capítulo 04 — El DOM y los eventos](04-dom-y-eventos.md)**.
