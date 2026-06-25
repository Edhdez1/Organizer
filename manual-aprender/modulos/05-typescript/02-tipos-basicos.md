# Capítulo 02 — Tipos básicos y anotaciones

> Ahora la práctica: cómo se escriben los tipos. Verás que es poca sintaxis y muy lógica. La
> regla de oro ya la conoces: **nombre `:` tipo**.

---

## 1. Los tipos básicos

> ### 🟦 ¿Qué significa? — *Los tipos primitivos*
> | Tipo | Qué guarda | Ejemplo |
> |---|---|---|
> | `string` | texto | `let n: string = "Edwar";` |
> | `number` | números (enteros o decimales) | `let e: number = 25;` |
> | `boolean` | verdadero/falso | `let a: boolean = true;` |
> | `null` | "vacío a propósito" | `let x: null = null;` |
> | `undefined` | "sin definir" | `let y: undefined;` |
> A diferencia de Python, TypeScript no separa `int` de `float`: todo número es `number`.

---

## 2. La inferencia: TypeScript adivina el tipo

> ### 🟦 ¿Qué significa? — *Inferencia de tipos*
> **Inferir** es deducir. Si le das un valor inicial a una variable, TypeScript **deduce solo**
> su tipo; no hace falta que lo escribas:
> ```typescript
> let nombre = "Edwar";   // TypeScript infiere que es string
> nombre = 42;            // ❌ Error: ya sabe que 'nombre' es string
> ```
> **Consecuencia práctica:** no tienes que anotar todo. Anota lo que aporte claridad (sobre todo
> funciones); deja que la inferencia haga el resto. Menos ruido, misma seguridad.

> ### 💡 Tip — ¿Cuándo anotar y cuándo no?
> - **Anota** los parámetros de funciones y, a veces, lo que devuelven (no se infieren solos al
>   llamarlas).
> - **Deja inferir** las variables simples con valor inicial (`const total = 0`).
> Regla: anota en las "fronteras" (entradas/salidas); confía en la inferencia adentro.

---

## 3. Arrays tipados

> ### 🟦 ¿Qué significa? — *Tipar una lista*
> Para decir "una lista de textos" o "una lista de números", se pone el tipo seguido de `[]`:
> ```typescript
> let servicios: string[] = ["Diseño web", "IA"];
> let precios: number[] = [100, 250, 99];
> ```
> `string[]` se lee "arreglo de strings". Si intentas meter un número en `servicios`, error.

---

## 4. El tipo `any` (y por qué evitarlo)

> ### 🟦 ¿Qué significa? — *`any` (cualquiera)*
> `any` significa "cualquier tipo, sin revisar". Apaga la seguridad de TypeScript para esa
> variable:
> ```typescript
> let cosa: any = "hola";
> cosa = 42;          // permitido
> cosa.metodoRaro();  // TypeScript NO se queja (y eso es peligroso)
> ```
> ⚠️ **Úsalo lo menos posible.** Si usas `any` en todos lados, vuelves a tener JavaScript sin
> red. Existe para casos puntuales (código viejo, datos de forma desconocida), pero es una
> "puerta trasera" que conviene mantener cerrada. Por eso los proyectos serios (como los tuyos)
> activan reglas que avisan cuando aparece `any`.

> ### 🟦 ¿Qué significa? — *`unknown` (la alternativa segura a `any`)*
> `unknown` también acepta cualquier valor, pero **te obliga a comprobar el tipo antes de
> usarlo**. Es el "any responsable". Por ahora solo reconócelo; lo importante es: **prefiere
> tipos concretos; si no sabes el tipo, `unknown` antes que `any`.**

---

## 5. Tipos unión: "esto o aquello"

> ### 🟦 ¿Qué significa? — *Tipo unión (`|`)*
> A veces un valor puede ser de **uno de varios** tipos. Se expresa con la barra `|`:
> ```typescript
> let id: string | number;   // puede ser texto O número
> id = "abc123";   // ✅
> id = 42;         // ✅
> id = true;       // ❌ no es ni string ni number
> ```
> Una variante muy usada son los **valores literales** como unión, para limitar las opciones:
> ```typescript
> let estado: "completado" | "minimo" | "no_hecho";
> estado = "completado";   // ✅
> estado = "otro";         // ❌ solo se permiten esos tres textos
> ```

> ### 🔎 En tu código
> RachaSimple usa exactamente esto: el tipo de un check-in diario es algo como
> `"completed" | "minimum" | "recovery" | "no_done"`. Así, es **imposible** guardar un estado
> inválido por error: TypeScript lo impediría al escribir. Esa es la seguridad de tipos
> trabajando para ti.

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Anoto variables con `string`, `number`, `boolean`.
- [ ] Entiendo la **inferencia** y cuándo conviene anotar y cuándo no.
- [ ] Tipo arrays con `tipo[]` (ej. `string[]`).
- [ ] Sé qué es `any`, por qué evitarlo, y que `unknown` es la alternativa segura.
- [ ] Uso **tipos unión** (`A | B`) y uniones de literales para limitar valores.

---

## 🧪 Ejercicios

1. **Anota o infiere.** ¿En cuáles hace falta anotar y en cuáles no?:
   (a) `const ciudad = "San Salvador";` (b) un parámetro de función `precio`.
2. **Array.** Declara una variable `edades` que sea una lista de números.
3. **Evita any.** Explica por qué llenar un proyecto de `any` "tira a la basura" las ventajas
   de TypeScript.
4. **Unión de literales.** Declara una variable `talla` que solo pueda ser `"S"`, `"M"` o `"L"`.
5. **Lee tu app.** Si en RachaSimple un check-in es
   `"completed" | "minimum" | "recovery" | "no_done"`, ¿qué pasaría si el código intentara
   guardar `"casi"`? ¿Cuándo se detectaría el error?

➡️ Siguiente: **[Capítulo 03 — Interfaces y tipos propios](03-interfaces-y-tipos.md)**.
