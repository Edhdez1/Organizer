# Capítulo 04 — Layout con Flexbox

> Hasta ahora las cajas se apilaban una sobre otra. Pero ¿cómo pones tres tarjetas **en fila**?
> ¿Cómo centras algo perfectamente? ¿Cómo haces una barra de menú con el logo a la izquierda y
> los enlaces a la derecha? La respuesta moderna es **Flexbox**, y es más fácil de lo que temes.

---

## 1. El problema que resuelve Flexbox

Durante años, alinear cosas en CSS era un dolor (trucos raros, elementos que no se centraban).
**Flexbox** nació para resolverlo: es un sistema para **distribuir y alinear** un grupo de
cajas dentro de un contenedor, en fila o en columna, repartiendo el espacio de forma
inteligente y **adaptable**.

> ### 🟦 ¿Qué significa? — *Flexbox*
> **Flexbox** (*Flexible Box Layout*) es un modo de organización en el que un **contenedor**
> ordena a sus **elementos hijos** a lo largo de un eje (horizontal o vertical), controlando
> cómo se alinean y cómo se reparten el espacio sobrante. "Flexible" porque los hijos pueden
> crecer o encogerse para llenar el espacio disponible.

---

## 2. Activarlo: `display: flex`

Flexbox siempre involucra dos papeles: **un contenedor** (el padre) y **sus hijos** (los
elementos directos dentro de él).

> ### 🟦 ¿Qué significa? — *Contenedor flex y elementos flex*
> Pones `display: flex` en el **contenedor**; automáticamente, sus **hijos directos** se vuelven
> "elementos flex" y se colocan en fila.
> ```html
> <div class="fila">
>   <div class="caja">1</div>
>   <div class="caja">2</div>
>   <div class="caja">3</div>
> </div>
> ```
> ```css
> .fila { display: flex; }   /* las tres .caja ahora van en fila, lado a lado */
> ```
> Sin `display: flex`, esos tres `<div>` se apilarían (porque son de bloque). Con él, se ponen
> en hilera. Ese es el "¡ajá!" de Flexbox.

---

## 3. Las propiedades clave del contenedor

Casi todo Flexbox se controla con cinco propiedades en el **contenedor**. Estas son las que
usarás siempre:

> ### 🟦 ¿Qué significa? — *`flex-direction` (la dirección del eje)*
> Define si los hijos van en **fila** (por defecto) o en **columna**:
> ```css
> .fila { display: flex; flex-direction: row; }     /* → horizontal (defecto) */
> .col  { display: flex; flex-direction: column; }  /* ↓ vertical */
> ```

> ### 🟦 ¿Qué significa? — *`justify-content` (reparto en el eje principal)*
> Controla cómo se distribuyen los hijos **a lo largo** del eje (horizontal si es fila):
> | Valor | Efecto |
> |---|---|
> | `flex-start` | Todos al inicio (izquierda) |
> | `center` | Todos al centro |
> | `flex-end` | Todos al final (derecha) |
> | `space-between` | Repartidos, pegados a los extremos |
> | `space-around` | Repartidos con espacio alrededor de cada uno |
> ```css
> .barra { display: flex; justify-content: space-between; }  /* logo a la izq, menú a la der */
> ```

> ### 🟦 ¿Qué significa? — *`align-items` (alineación en el eje cruzado)*
> Controla la alineación en el eje **perpendicular** (vertical si los hijos van en fila):
> ```css
> .fila { display: flex; align-items: center; }  /* centra verticalmente los hijos */
> ```

> ### 💡 Tip — El centrado perfecto (el truco más buscado de CSS)
> Centrar algo horizontal **y** verticalmente, que durante años fue una pesadilla, hoy es:
> ```css
> .centro {
>   display: flex;
>   justify-content: center;   /* centra en horizontal */
>   align-items: center;       /* centra en vertical */
> }
> ```
> Guárdate esta receta: la usarás muchísimo.

> ### 🟦 ¿Qué significa? — *`gap` (espacio entre hijos)*
> El `gap` pone un espacio uniforme **entre** los elementos, sin tener que usar márgenes uno por
> uno:
> ```css
> .fila { display: flex; gap: 16px; }   /* 16px de separación entre cada caja */
> ```

> ### 🟦 ¿Qué significa? — *`flex-wrap` (saltar de línea)*
> Por defecto, los hijos intentan caber en una sola línea aunque se aprieten. `flex-wrap: wrap`
> les permite **pasar a la línea siguiente** si no caben. Es clave para que un grid de tarjetas
> se reacomode en pantallas pequeñas:
> ```css
> .galeria { display: flex; flex-wrap: wrap; gap: 16px; }
> ```

---

## 4. Un ejemplo real: la barra de navegación

Juntando lo aprendido, así se hace una barra con el logo a la izquierda y los enlaces a la
derecha, todo centrado verticalmente:

```css
.barra {
  display: flex;
  justify-content: space-between;  /* separa logo (izq) y menú (der) */
  align-items: center;             /* los centra verticalmente */
  padding: 16px 24px;
  gap: 16px;
}
```
```html
<nav class="barra">
  <div class="logo">Tunal Digital</div>
  <ul class="menu">
    <li><a href="#">Servicios</a></li>
    <li><a href="#">Contacto</a></li>
  </ul>
</nav>
```

> ### 🔎 En tu código
> La barra superior de tu sitio y las tarjetas de servicios usan Flexbox exactamente así. Y en
> la hoja de estilos de **este manual** (`site/estilos.css`), la clase `.tarjetas` usa una
> técnica hermana (CSS Grid) para la cuadrícula del índice. Cuando inspecciones con `F12` y veas
> `display: flex`, ya sabrás qué está pasando.

> ### 💡 Tip — ¿Y CSS Grid?
> Existe otro sistema, **CSS Grid**, para diseños en **dos dimensiones** (filas *y* columnas a la
> vez, como una cuadrícula). Flexbox es ideal para **una** dimensión (una fila o una columna);
> Grid, para rejillas completas. Domina Flexbox primero (cubre la mayoría de casos) y luego
> explora Grid; son complementarios, no rivales.

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Entiendo que Flexbox tiene **un contenedor** (`display: flex`) y **sus hijos**.
- [ ] Sé cambiar la dirección con `flex-direction` (row / column).
- [ ] Uso `justify-content` (eje principal) y `align-items` (eje cruzado).
- [ ] Conozco la receta del **centrado perfecto**.
- [ ] Uso `gap` para separar y `flex-wrap` para que salten de línea.
- [ ] Sé que **Grid** existe para diseños de dos dimensiones.

---

## 🧪 Ejercicios

1. **Predice.** Si pongo `display: flex` en un `<div>` con tres hijos, ¿cómo se colocan? ¿Y si
   añado `flex-direction: column`?
2. **Elige la propiedad.** ¿Cuál usarías para: (a) centrar tres botones horizontalmente; (b)
   poner el logo a la izquierda y el menú a la derecha; (c) separar las cajas 20px entre sí?
3. **Centrado.** Escribe el CSS de una caja `.hero` que centre su contenido horizontal y
   verticalmente.
4. **Lee una barra.** Explica qué hace este CSS:
   `.nav { display: flex; justify-content: space-between; align-items: center; gap: 12px; }`
5. 💻 **Tres tarjetas en fila.** Crea un contenedor con tres `.tarjeta` (las del capítulo
   anterior) y ponlas en fila con `display: flex` y `gap: 16px`. Luego añade `flex-wrap: wrap` y
   reduce el ancho de la ventana para ver cómo saltan de línea.

➡️ Siguiente: **[Capítulo 05 — Diseño responsive](05-responsive.md)**.
