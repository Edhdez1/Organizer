# Capítulo 02 — Operadores y decisiones

> Ya guardas datos en variables. Ahora vas a **operar** con ellos (sumar, comparar) y a hacer
> que tu programa **tome decisiones** según el resultado. Aquí aparece el segundo ingrediente
> del Módulo 00: las decisiones (`if/else`).

---

## 1. Operadores aritméticos (matemáticas)

> ### 🟦 ¿Qué significa? — *Operador*
> Un **operador** es un símbolo que realiza una operación sobre uno o más valores. Los
> aritméticos son los de matemáticas:
> | Operador | Operación | Ejemplo | Resultado |
> |---|---|---|---|
> | `+` | suma | `5 + 3` | `8` |
> | `-` | resta | `5 - 3` | `2` |
> | `*` | multiplicación | `5 * 3` | `15` |
> | `/` | división | `6 / 3` | `2` |
> | `%` | **resto** (módulo) | `7 % 3` | `1` |
> | `**` | potencia | `2 ** 3` | `8` |

> ### 🟦 ¿Qué significa? — *El operador resto `%` (módulo)*
> `%` da **el sobrante** de una división. `7 % 3` es 1 porque 7 entre 3 da 2 y sobra 1. Parece
> raro, pero es utilísimo: por ejemplo, **un número es par si `numero % 2 === 0`** (no sobra
> nada al dividir entre 2). Lo usarás más de lo que crees.

> ### ⚠️ Cuidado — `+` con texto: concatenación
> Si usas `+` entre **textos** (strings), no suma: los **pega** (concatena).
> ```javascript
> "Hola " + "Edwar"   // "Hola Edwar"
> 5 + 3               // 8
> "5" + 3             // "53"  ← ¡ojo! el "5" es texto, así que pega
> ```
> Por eso conviene usar **template strings** (`` `...${}` ``) del capítulo anterior, que evitan
> esta confusión.

---

## 2. Variables que cambian: operadores de asignación

> ### 🟦 ¿Qué significa? — *Asignación compuesta*
> Atajos para modificar una variable usando su propio valor:
> ```javascript
> let total = 10;
> total += 5;   // igual que: total = total + 5  → 15
> total -= 3;   // 12
> total *= 2;   // 24
> ```
> `+=` se lee "súmale y guarda". Muy común en contadores.

---

## 3. Comparaciones: preguntas que dan true o false

Para decidir, primero necesitas **comparar**. Las comparaciones devuelven un **booleano**
(`true`/`false`).

> ### 🟦 ¿Qué significa? — *Operadores de comparación*
> | Operador | Pregunta | Ejemplo | Resultado |
> |---|---|---|---|
> | `===` | ¿son **iguales** (valor y tipo)? | `5 === 5` | `true` |
> | `!==` | ¿son **distintos**? | `5 !== 3` | `true` |
> | `>` | ¿mayor que? | `5 > 3` | `true` |
> | `<` | ¿menor que? | `3 < 5` | `true` |
> | `>=` | ¿mayor o igual? | `5 >= 5` | `true` |
> | `<=` | ¿menor o igual? | `4 <= 3` | `false` |

> ### ⚠️ Cuidado — Usa `===`, no `==`
> JavaScript tiene dos formas de comparar igualdad:
> - `===` (tres iguales) compara **valor y tipo**. Es la correcta: `5 === "5"` es `false`
>   (número vs. texto).
> - `==` (dos iguales) compara de forma "laxa" y hace conversiones raras: `5 == "5"` es `true`.
>   Esto causa errores difíciles. **Usa siempre `===` y `!==`.** (Recuerda además que un solo
>   `=` es asignar, no comparar.) Tres niveles: `=` asigna, `==` compara mal, `===` compara bien.

---

## 4. La decisión: `if`, `else if`, `else`

> ### 🟦 ¿Qué significa? — *La estructura `if` (si)*
> `if` ejecuta un bloque de código **solo si** una condición es verdadera. Si no, puedes dar
> alternativas con `else if` (si no, ¿y si...?) y `else` (si no, en cualquier otro caso):
> ```javascript
> const edad = 20;
>
> if (edad >= 18) {
>   console.log("Puede entrar");
> } else {
>   console.log("No puede entrar");
> }
> ```
> La condición va entre **paréntesis** `( )` y el código a ejecutar entre **llaves** `{ }`.
> ¿Te suena? Es exactamente el algoritmo del evento del Módulo 00, ahora en código real.

Con varias ramas:
```javascript
const nota = 85;

if (nota >= 90) {
  console.log("Excelente");
} else if (nota >= 70) {
  console.log("Aprobado");
} else {
  console.log("Reprobado");
}
// Como nota es 85, muestra: Aprobado
```

> ### 💡 Tip — Cómo se evalúa
> JavaScript revisa las condiciones **en orden, de arriba a abajo**, y ejecuta el **primer**
> bloque cuya condición sea verdadera; luego se salta el resto. Por eso el orden importa: pon
> las condiciones más específicas/altas primero.

---

## 5. Combinar condiciones: operadores lógicos

A veces una decisión depende de **varias** condiciones a la vez.

> ### 🟦 ¿Qué significa? — *Operadores lógicos `&&`, `||`, `!`*
> - `&&` (**Y**): verdadero solo si **ambas** condiciones lo son.
> - `||` (**O**): verdadero si **al menos una** lo es.
> - `!` (**NO**): invierte (de `true` a `false` y viceversa).
> ```javascript
> const edad = 25;
> const tieneEntrada = true;
>
> if (edad >= 18 && tieneEntrada) {
>   console.log("Bienvenido");   // ambas verdaderas → entra
> }
>
> if (edad < 13 || edad > 65) {
>   console.log("Descuento");    // basta una
> }
> ```

> ### 🟦 ¿Qué significa? — *Valores "verdaderos" y "falsos" (truthy/falsy)*
> En una condición, JavaScript trata ciertos valores como falsos aunque no sean exactamente
> `false`: `0`, `""` (texto vacío), `null`, `undefined`. Los demás se consideran "verdaderos".
> Esto permite escribir `if (nombre)` para decir "si nombre tiene algo". Útil, pero por ahora
> sé explícito (`if (nombre !== "")`) hasta que te sientas cómodo.

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Uso operadores aritméticos, incluido `%` (resto) y entiendo la concatenación con `+`.
- [ ] Uso asignación compuesta (`+=`, `-=`…).
- [ ] Comparo con `===`/`!==` (¡no `==`!) y `<`, `>`, `<=`, `>=`.
- [ ] Escribo decisiones con `if`, `else if`, `else`.
- [ ] Combino condiciones con `&&` (Y), `||` (O) y `!` (NO).
- [ ] Entiendo a grandes rasgos los valores *truthy/falsy*.

---

## 🧪 Ejercicios

Hazlos en la consola (`F12` → Console) para ver los resultados al instante.

1. **Par o impar.** Escribe una condición que diga si un número guardado en `n` es par (pista:
   usa `%`).
2. **Predice el resultado.** ¿Qué da cada uno? `5 === "5"`, `5 !== 3`, `"a" + "b"`, `10 % 4`.
3. **Tres ramas.** Escribe un `if/else if/else` que, según una variable `hora` (0–23), diga
   "Buenos días" (<12), "Buenas tardes" (<19) o "Buenas noches".
4. **Lógicos.** Escribe la condición para "el usuario puede comprar si es mayor de edad **y**
   tiene saldo mayor a 0".
5. 💻 **Mini-validación.** Crea `const correo = "hola@ejemplo.com";` y un `if` que, usando
   `correo.includes("@")` (devuelve true/false), muestre "Correo válido" o "Correo inválido".

➡️ Siguiente: **[Capítulo 03 — Bucles y funciones](03-bucles-y-funciones.md)**.
