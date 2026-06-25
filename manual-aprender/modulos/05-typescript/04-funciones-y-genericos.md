# Capítulo 04 — Funciones tipadas y genéricos

> Las funciones son donde los tipos más brillan: declaras qué **reciben** y qué **devuelven**, y
> TypeScript vigila ambos extremos. Al final asomamos los **genéricos**, que suenan intimidantes
> pero la idea es sencilla.

---

## 1. Tipar parámetros y el valor de retorno

> ### 🟦 ¿Qué significa? — *Función tipada*
> En una función, anotas el tipo de cada **parámetro** y, opcionalmente, el tipo de lo que
> **devuelve** (después de los paréntesis, con `: tipo`):
> ```typescript
> function precioConIva(precio: number): number {
>   return precio * 1.13;
> }
> ```
> - `precio: number` → el parámetro debe ser un número.
> - `: number` después de `()` → la función devuelve un número.
>
> Ahora, si alguien la llama mal, error inmediato:
> ```typescript
> precioConIva("100");   // ❌ se esperaba number, llegó string
> ```

> ### 💡 Tip — El tipo de retorno se suele inferir
> TypeScript normalmente **deduce** lo que devuelve una función (por el `return`), así que el
> `: number` final es opcional. Muchos lo escriben igual, como documentación y para evitar
> sorpresas. Los **parámetros**, en cambio, casi siempre conviene anotarlos.

> ### 🟦 ¿Qué significa? — *Funciones flecha tipadas*
> La forma flecha (que viste en JS) se tipa igual:
> ```typescript
> const precioConIva = (precio: number): number => precio * 1.13;
> ```
> Así verás la mayoría de funciones en RachaSimple y Faro.

---

## 2. Parámetros opcionales y por defecto

> ### 🟦 ¿Qué significa? — *Parámetro opcional (`?`) y por defecto*
> ```typescript
> function saludar(nombre: string, saludo?: string): string {
>   return `${saludo ?? "Hola"}, ${nombre}`;
> }
> saludar("Edwar");            // "Hola, Edwar"
> saludar("Ana", "Buenas");    // "Buenas, Ana"
> ```
> - `saludo?` → el parámetro es opcional (puede no pasarse).
> - `??` (operador de coalescencia nula) → "usa lo de la izquierda, y si es `null`/`undefined`,
>   usa lo de la derecha". Aquí: si no hay `saludo`, usa `"Hola"`.

---

## 3. Tipar funciones que reciben tus objetos

Lo más útil en la práctica: combinar funciones con las **interfaces** del capítulo anterior.

```typescript
interface Habito {
  nombre: string;
  hecho: boolean;
}

function describir(habito: Habito): string {
  const estado = habito.hecho ? "✅" : "⬜";
  return `${estado} ${habito.nombre}`;
}
```

Dentro de `describir`, TypeScript **sabe** que `habito` tiene `nombre` y `hecho`, así que te
autocompleta esas propiedades y te avisa si escribes `habito.nombr` (error de tipeo). Esa ayuda
constante es el día a día de programar con tipos.

---

## 4. Genéricos: funciones que sirven para "cualquier tipo, pero con seguridad"

> ### 🟦 ¿Qué significa? — *Genérico*
> Un **genérico** es una forma de escribir una función (o tipo) que funciona con **distintos
> tipos**, pero **manteniendo la información del tipo**. Es el punto medio entre "solo number" y
> el peligroso `any`.
>
> Imagina una función que devuelve el primer elemento de una lista. Sin genéricos tendrías que
> elegir un tipo (`number[]`) o usar `any` (inseguro). Con genéricos, se adapta:
> ```typescript
> function primero<T>(lista: T[]): T {
>   return lista[0];
> }
>
> primero<number>([10, 20, 30]);     // devuelve un number (10)
> primero<string>(["a", "b"]);        // devuelve un string ("a")
> ```
> La `<T>` es un **"tipo comodín"**: un marcador que se rellena con el tipo real al usar la
> función. `T` es solo una letra convencional (de *Type*); podría llamarse distinto. Así, la
> función sirve para listas de cualquier tipo **y** TypeScript sigue sabiendo qué devuelve.

> ### 💡 Tip — No te agobies con los genéricos todavía
> Es un concepto avanzado. Por ahora basta con **reconocerlos** cuando los veas (esa `<T>` o
> `<Habito>` junto a una función o tipo) y saber que significan "esto se adapta a varios tipos
> sin perder seguridad". Los usarás de verdad con TanStack Query en React (Módulo 06), donde
> verás cosas como `useQuery<Habito[]>(...)`: ahí el genérico le dice "esta consulta devuelve una
> lista de hábitos".

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Tipo los **parámetros** y (opcionalmente) el **retorno** de una función.
- [ ] Sé que el retorno se suele inferir, pero los parámetros conviene anotarlos.
- [ ] Tipo **funciones flecha** y uso parámetros opcionales (`?`) con `??`.
- [ ] Paso **objetos** tipados (interfaces) a funciones y aprovecho el autocompletado.
- [ ] **Reconozco** un genérico (`<T>`) y entiendo, a grandes rasgos, para qué sirve.

---

## 🧪 Ejercicios

1. **Tipa una función.** Escribe `function area(base: ?, altura: ?): ?` con los tipos correctos
   para calcular el área de un rectángulo.
2. **Flecha.** Convierte la función `area` a función flecha tipada.
3. **Opcional.** Escribe una función `saludar(nombre, titulo?)` que use `titulo` si está y, si
   no, no ponga nada. (Pista: `??` o un `if`.)
4. **Con interface.** Usando una `interface Producto { nombre: string; precio: number }`,
   escribe `function etiqueta(p: Producto): string` que devuelva `"nombre: $precio"`.
5. **Reconoce el genérico.** Explica con tus palabras qué significa la `<Habito[]>` en una
   llamada imaginaria `useQuery<Habito[]>(...)`.

➡️ Siguiente: **[Capítulo 05 — TypeScript en la práctica](05-typescript-en-practica.md)**.
