# Capítulo 01 — ¿Qué es TypeScript?

> Este módulo es corto y muy rentable: TypeScript es JavaScript que ya conoces, más una "red de
> seguridad". Entender el *porqué* es la mitad del trabajo; la otra mitad es sintaxis sencilla.

---

## 1. El problema que resuelve TypeScript

Recuerda un detalle de JavaScript: una variable puede contener cualquier cosa y cambiar de tipo
sin avisar. Eso es flexible, pero causa errores difíciles. Ejemplo:

```javascript
function precioConIva(precio) {
  return precio * 1.13;
}
precioConIva("100");   // en JavaScript no se queja… y da un resultado raro
```

Pasarle el texto `"100"` en vez del número `100` no provoca un error inmediato; el problema
aparece **más tarde**, en producción, y cuesta encontrarlo.

> ### 🟦 ¿Qué significa? — *Tipo (type)*
> El **tipo** de un dato es la **clase** de información que es: texto (`string`), número
> (`number`), booleano (`boolean`), etc. (Ya los viste en JS y Python.) En JavaScript los tipos
> existen, pero el lenguaje no te obliga a respetarlos. TypeScript sí.

> ### 🟦 ¿Qué significa? — *TypeScript*
> **TypeScript** es JavaScript **más un sistema de tipos**: te permite **declarar** de qué tipo
> es cada cosa, y un programa revisa tu código **antes de ejecutarlo** para avisarte si te
> equivocas (por ejemplo, si pasas un texto donde se esperaba un número).
> ```typescript
> function precioConIva(precio: number) {   // ': number' declara el tipo
>   return precio * 1.13;
> }
> precioConIva("100");   // ❌ TypeScript marca error aquí mismo, antes de ejecutar
> ```

---

## 2. La idea clave: errores temprano, no tarde

> ### 💡 Tip — "Shift left": atrapar el error cuanto antes
> Cuanto **antes** descubres un error, más barato es arreglarlo. Un error que TypeScript te
> marca **mientras escribes** (subrayado rojo en el editor) te cuesta segundos. El mismo error
> descubierto por un cliente en producción te cuesta horas y reputación. TypeScript mueve la
> detección de errores "hacia la izquierda" en el tiempo: del usuario final a tu teclado.

> ### 🟦 ¿Qué significa? — *Tipado estático vs. dinámico*
> - **Dinámico** (JavaScript, Python): los tipos se revisan **al ejecutar**. Flexible, pero los
>   errores aparecen tarde.
> - **Estático** (TypeScript): los tipos se revisan **antes de ejecutar**, al escribir/compilar.
>   Más seguro. "Estático" = comprobado de antemano, sin correr el programa.

---

## 3. TypeScript es un "superset" de JavaScript

> ### 🟦 ¿Qué significa? — *Superset (superconjunto)*
> Un **superset** es un lenguaje que **contiene a otro entero y le añade cosas**. TypeScript
> incluye **todo** JavaScript y le suma los tipos. Consecuencia práctica importante: **todo tu
> JavaScript ya es TypeScript válido**. Puedes adoptar TypeScript poco a poco, añadiendo tipos
> donde quieras. No tiras nada de lo aprendido en el Módulo 03; lo amplías.

---

## 4. Los navegadores no entienden TypeScript: la compilación

> ### 🟦 ¿Qué significa? — *Compilar (transpilar)*
> Los navegadores solo ejecutan JavaScript, no TypeScript. Por eso, antes de usarlo, el código
> `.ts` se **compila** (o "transpila"): un programa lo traduce a JavaScript normal, quitando las
> anotaciones de tipo. **Compilar** es traducir código de un lenguaje/forma a otro que la máquina
> pueda ejecutar.
> ```
>   archivo.ts   ──(compilador de TypeScript)──►   archivo.js   ──►   el navegador lo ejecuta
> ```
> Durante esa traducción, el compilador **revisa los tipos** y te avisa de errores. Las
> herramientas modernas (como **Vite**, que usa RachaSimple) hacen esto automáticamente mientras
> desarrollas; no tienes que ejecutar nada a mano.

> ### 🟦 ¿Qué significa? — *Las extensiones `.ts` y `.tsx`*
> - `.ts` → un archivo de TypeScript normal.
> - `.tsx` → TypeScript que además contiene **JSX** (la sintaxis de React para escribir
>   interfaz; la verás en el Módulo 06). Por eso los componentes de RachaSimple y Faro son
>   `.tsx`.

---

## 5. Tu primera anotación de tipo

La sintaxis básica es: después del nombre, dos puntos `:` y el tipo.

```typescript
let nombre: string = "Edwar";
let edad: number = 25;
let activo: boolean = true;
```

Si intentas guardar algo del tipo equivocado, TypeScript se queja **al instante**:
```typescript
let edad: number = 25;
edad = "veintiséis";   // ❌ Error: el tipo 'string' no se puede asignar a 'number'
```

> ### 💡 Tip — El editor se vuelve tu copiloto
> Con TypeScript, VS Code no solo marca errores: también te **autocompleta** mejor (sabe qué
> propiedades tiene cada cosa) y te muestra la "forma" de los datos al pasar el cursor. Esa
> ayuda constante es una de las grandes razones por las que equipos enteros adoptan TypeScript.

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Entiendo qué problema resuelve TypeScript (errores de tipo que JS no atrapa).
- [ ] Sé qué es un **tipo** y la diferencia entre tipado **estático** y **dinámico**.
- [ ] Entiendo que TypeScript es un **superset**: todo mi JavaScript ya es válido.
- [ ] Sé que el `.ts` se **compila** a `.js` y que ahí se revisan los tipos.
- [ ] Distingo `.ts` de `.tsx` (este último con JSX de React).
- [ ] Sé anotar una variable con `: tipo`.

---

## 🧪 Ejercicios

1. **El porqué.** Explica, con el ejemplo del IVA, por qué pasar `"100"` (texto) a una función
   de precios es un problema que TypeScript evita y JavaScript no.
2. **Estático o dinámico.** Clasifica: JavaScript, Python, TypeScript. ¿Cuál revisa los tipos
   antes de ejecutar?
3. **Superset.** ¿Es verdad que tu código JavaScript del Módulo 03 ya es TypeScript válido?
   Explica por qué.
4. **Anota.** Escribe tres variables tipadas: una `string`, una `number` y una `boolean`.
5. **Encuentra el error.** ¿Qué marcará TypeScript aquí y por qué?
   ```typescript
   let total: number = 0;
   total = "cero";
   ```

➡️ Siguiente: **[Capítulo 02 — Tipos básicos y anotaciones](02-tipos-basicos.md)**.
