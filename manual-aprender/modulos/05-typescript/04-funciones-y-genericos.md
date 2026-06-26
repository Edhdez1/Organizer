# Capítulo 04 — Funciones tipadas y genéricos

> Las funciones son donde los tipos más brillan: declaras qué **reciben** y qué **devuelven**, y
> TypeScript vigila los dos extremos. Al final le echamos un vistazo a los **genéricos**, que
> suenan intimidantes pero esconden una idea bastante sencilla.

---

## 1. Tipar parámetros y el valor de retorno

> ### 🟦 ¿Qué significa? — *Función tipada*
> En una función anotas el tipo de cada **parámetro** y, si quieres, el tipo de lo que
> **devuelve** (va después de los paréntesis, con `: tipo`):
> ```typescript
> function precioConIva(precio: number): number {
>   return precio * 1.13;
> }
> ```
> - `precio: number` → el parámetro debe ser un número.
> - `: number` después de `()` → la función devuelve un número.
>
> Si alguien la llama mal, salta el error en el acto:
> ```typescript
> precioConIva("100");   // ❌ se esperaba number, llegó string
> ```

> ### 💡 Tip — El tipo de retorno se suele inferir
> Por lo general TypeScript **deduce** lo que devuelve una función mirando el `return`, así que
> ese `: number` del final es opcional. Aun así mucha gente lo escribe, tanto para documentar
> como para no llevarse sorpresas. Con los **parámetros** la cosa cambia: ahí casi siempre vale
> la pena anotarlos.

> ### 🟦 ¿Qué significa? — *Funciones flecha tipadas*
> La forma flecha (la que viste en JS) se tipa igual:
> ```typescript
> const precioConIva = (precio: number): number => precio * 1.13;
> ```
> Así verás escritas la mayoría de funciones en RachaSimple y Faro.

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
> - `saludo?` → el parámetro es opcional, puedes no pasarlo.
> - `??` (operador de coalescencia nula) → significa "usa lo de la izquierda, y si resulta ser
>   `null`/`undefined`, usa lo de la derecha". Aquí: si no llega `saludo`, se usa `"Hola"`.

---

## 3. Tipar funciones que reciben tus objetos

Esto es lo más útil en el día a día: juntar las funciones con las **interfaces** del capítulo
anterior.

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

Dentro de `describir`, TypeScript **sabe** que `habito` tiene `nombre` y `hecho`. Por eso te
autocompleta esas propiedades y te avisa si escribes `habito.nombr` por un despiste. Tener esa
ayuda todo el rato es, en buena parte, lo que se siente al programar con tipos.

---

## 4. Genéricos: funciones que sirven para "cualquier tipo, pero con seguridad"

> ### 🟦 ¿Qué significa? — *Genérico*
> Un **genérico** es una manera de escribir una función (o un tipo) que funciona con **distintos
> tipos** sin perder por el camino la **información del tipo**. Es el punto medio entre quedarte
> en "solo number" y caer en el peligroso `any`.
>
> Piensa en una función que devuelve el primer elemento de una lista. Sin genéricos tendrías que
> casarte con un tipo (`number[]`) o tirar de `any`, que es inseguro. Con genéricos, se adapta:
> ```typescript
> function primero<T>(lista: T[]): T {
>   return lista[0];
> }
>
> primero<number>([10, 20, 30]);     // devuelve un number (10)
> primero<string>(["a", "b"]);        // devuelve un string ("a")
> ```
> Esa `<T>` es un **"tipo comodín"**: un hueco que se rellena con el tipo real en el momento de
> usar la función. La `T` es solo una letra por convención (viene de *Type*); podrías llamarla de
> otra forma. Así la función te vale para listas de cualquier tipo **y** TypeScript sigue sabiendo
> qué te devuelve.

> ### 💡 Tip — No te agobies con los genéricos todavía
> Es un concepto avanzado, así que tranquilo. De momento te basta con **reconocerlos** cuando los
> veas (esa `<T>` o `<Habito>` pegada a una función o a un tipo) y tener claro que quieren decir
> "esto se adapta a varios tipos sin perder seguridad". Los empezarás a usar de verdad con
> TanStack Query en React (Módulo 06), donde verás cosas como `useQuery<Habito[]>(...)`: ahí el
> genérico le está diciendo "esta consulta devuelve una lista de hábitos".

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
