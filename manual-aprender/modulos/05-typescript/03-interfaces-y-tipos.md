# Capítulo 03 — Interfaces y tipos propios

> Los tipos básicos están bien para una variable suelta. Pero tus datos reales son **objetos con
> forma**: un usuario tiene nombre, edad y correo; un hábito tiene nombre, meta y color. Aquí
> aprendes a **describir esa forma** con `interface` y `type`. Es lo más usado de TypeScript en
> tus apps.

---

## 1. El problema: describir la "forma" de un objeto

En el Módulo 03 viste los objetos de JavaScript (`{ nombre: "Edwar", edad: 25 }`). El problema:
nada impide escribir mal una propiedad o ponerle el tipo equivocado. TypeScript nos deja
**declarar la forma** que debe tener un objeto.

> ### 🟦 ¿Qué significa? — *`interface` (interfaz)*
> Una **interface** describe la **forma** que debe tener un objeto: qué propiedades tiene y de
> qué tipo es cada una. Es como una "plantilla" o "ficha" de datos:
> ```typescript
> interface Usuario {
>   nombre: string;
>   edad: number;
>   activo: boolean;
> }
> ```
> Luego declaras que un objeto es de ese tipo, y TypeScript **vigila** que cumpla la forma:
> ```typescript
> const edwar: Usuario = {
>   nombre: "Edwar",
>   edad: 25,
>   activo: true
> };
>
> const malo: Usuario = { nombre: "Ana" };   // ❌ faltan 'edad' y 'activo'
> ```

> ### 💡 Tip — Convención de nombres
> Las interfaces se nombran en **PascalCase** (como `camelCase` pero con la primera letra
> también en mayúscula): `Usuario`, `Habito`, `DailyCheckin`. Así se distinguen de las variables.

---

## 2. Propiedades opcionales y de solo lectura

> ### 🟦 ¿Qué significa? — *Propiedad opcional (`?`)*
> Una propiedad seguida de `?` **puede o no estar**:
> ```typescript
> interface Usuario {
>   nombre: string;
>   telefono?: string;   // opcional: puede faltar
> }
> const a: Usuario = { nombre: "Edwar" };               // ✅ válido sin teléfono
> const b: Usuario = { nombre: "Ana", telefono: "..." }; // ✅ también
> ```

> ### 🟦 ¿Qué significa? — *Propiedad de solo lectura (`readonly`)*
> `readonly` marca una propiedad que **no se puede cambiar** después de crear el objeto (como una
> `const` para propiedades). Típico para los `id`:
> ```typescript
> interface Usuario {
>   readonly id: string;   // no se reasigna
>   nombre: string;
> }
> ```

---

## 3. Anidar y combinar tipos

Las interfaces pueden contener otras interfaces y listas, reflejando datos reales:

```typescript
interface Habito {
  readonly id: string;
  nombre: string;
  meta: number;
  color: string;
  categoria: "lectura" | "ejercicio" | "salud" | "otro";   // unión de literales
}

interface Usuario {
  nombre: string;
  habitos: Habito[];        // una lista de hábitos
}
```

Aquí un `Usuario` tiene una lista de `Habito`, y cada `Habito` solo admite ciertas categorías.
Con esto, TypeScript **conoce la forma completa** de tus datos y te autocompleta y corrige en
todo momento.

> ### 🔎 En tu código
> Abre `RachaSimple/src/types/database.ts`: es justamente un archivo lleno de interfaces que
> describen `UserProfile`, `Habit`, `DailyCheckin`, `RescuePlan`, etc. Esa es la "fuente de la
> verdad" sobre cómo son los datos de la app. Cuando un componente usa un hábito, TypeScript ya
> sabe que tiene `nombre`, `meta`, `color`… y avisa si te equivocas. Es como un mapa que mantiene
> a todo el equipo (y a la IA) sincronizado sobre la forma de los datos.

---

## 4. `type`: la otra forma de crear tipos

> ### 🟦 ¿Qué significa? — *`type` (alias de tipo)*
> `type` también crea tipos propios. Para objetos, es casi intercambiable con `interface`:
> ```typescript
> type Usuario = {
>   nombre: string;
>   edad: number;
> };
> ```
> La diferencia práctica para empezar: `type` es más flexible para cosas que **no** son objetos,
> como dar nombre a una unión:
> ```typescript
> type EstadoCheckin = "completed" | "minimum" | "recovery" | "no_done";
> ```
> Ahora puedes usar `EstadoCheckin` en muchos sitios sin repetir la lista.

> ### 💡 Tip — ¿`interface` o `type`?
> Regla simple para empezar:
> - Para **describir la forma de un objeto** → usa `interface`.
> - Para **uniones, alias o tipos no-objeto** → usa `type`.
> En la práctica ambos funcionan para objetos; muchos equipos eligen uno por consistencia. No te
> agobies: lo importante es **describir tus datos**, con cualquiera de los dos.

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Creo una **`interface`** para describir la forma de un objeto.
- [ ] Uso propiedades **opcionales** (`?`) y de **solo lectura** (`readonly`).
- [ ] Anido tipos (una interface con una lista de otra) y uso uniones de literales dentro.
- [ ] Sé qué es **`type`** y cuándo conviene frente a `interface`.
- [ ] Entiendo que `database.ts` de RachaSimple es la "ficha" de todos sus datos.

---

## 🧪 Ejercicios

1. **Tu primera interface.** Escribe una `interface Producto` con `id` (solo lectura, string),
   `nombre` (string), `precio` (number) y `enOferta` (boolean, opcional).
2. **Objeto válido.** Crea un objeto que cumpla tu `interface Producto`. Luego intenta crear uno
   al que le falte `precio`: ¿qué dirá TypeScript?
3. **Unión con type.** Crea `type Prioridad = "alta" | "media" | "baja";` y una variable que la
   use.
4. **Anidar.** Escribe una `interface Pedido` que tenga `cliente: string` y
   `productos: Producto[]`.
5. **Lee tu app.** ¿Qué crees que contiene la interface `Habit` en `database.ts` de RachaSimple?
   Enumera 3 o 4 propiedades que tendría y su tipo.

➡️ Siguiente: **[Capítulo 04 — Funciones tipadas y genéricos](04-funciones-y-genericos.md)**.
