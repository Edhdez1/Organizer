# Capítulo 03 — El modelo de cajas

> Esta es **la idea más importante de todo CSS**. Si entiendes el modelo de cajas, entiendes el
> 80% de por qué las cosas se ven y se espacian como se ven. Si no lo entiendes, CSS te
> parecerá magia caótica. Vamos despacio porque vale oro.

---

## 1. Todo en una página es una caja

> ### 🟦 ¿Qué significa? — *El modelo de cajas (box model)*
> En CSS, **cada elemento HTML es una caja rectangular**, aunque no lo parezca. Un párrafo, una
> imagen, un botón, un `<div>`: todos son cajas. Y cada caja tiene **cuatro capas**, de adentro
> hacia afuera:
>
> ```
> ┌──────────────────────── margin (margen) ────────────────────────┐
> │   espacio EXTERIOR, separa esta caja de las demás                │
> │   ┌──────────────── border (borde) ────────────────┐            │
> │   │   la línea del borde                            │            │
> │   │   ┌──────────── padding (relleno) ──────────┐   │            │
> │   │   │   espacio INTERIOR, entre borde y texto  │   │            │
> │   │   │   ┌──────── content (contenido) ──────┐  │   │            │
> │   │   │   │   el texto, la imagen, lo de adentro │ │   │            │
> │   │   │   └──────────────────────────────────┘  │   │            │
> │   │   └──────────────────────────────────────────┘   │            │
> │   └──────────────────────────────────────────────────┘            │
> └──────────────────────────────────────────────────────────────────┘
> ```

Memoriza el orden de adentro hacia afuera: **contenido → padding → borde → margen**.

---

## 2. Las cuatro capas, una por una

> ### 🟦 ¿Qué significa? — *Content (contenido)*
> Es lo de adentro: el texto, la imagen. Su tamaño base se controla con `width` (ancho) y
> `height` (alto), aunque muchas veces se ajusta solo al contenido.

> ### 🟦 ¿Qué significa? — *Padding (relleno)*
> El **padding** es el espacio **dentro** de la caja, entre el contenido y el borde. Es lo que
> hace que un botón no tenga el texto pegado a sus bordes (le da "aire" por dentro).
> ```css
> .boton { padding: 12px; }            /* 12px por los cuatro lados */
> .boton { padding: 12px 20px; }       /* 12px arriba/abajo, 20px izq/der */
> ```

> ### 🟦 ¿Qué significa? — *Border (borde)*
> El **borde** es la línea que rodea el padding. Se define con grosor, estilo y color:
> ```css
> .tarjeta { border: 2px solid #1B6B6B; }   /* 2px, línea sólida, color teal */
> ```
> Relacionado: `border-radius` redondea las esquinas (lo que da el look "suave" moderno):
> ```css
> .tarjeta { border-radius: 12px; }
> ```

> ### 🟦 ¿Qué significa? — *Margin (margen)*
> El **margen** es el espacio **fuera** de la caja, que la separa de las cajas vecinas. Es lo
> que pones para que dos tarjetas no estén pegadas.
> ```css
> .tarjeta { margin: 16px; }            /* separación por los cuatro lados */
> .tarjeta { margin-bottom: 24px; }     /* solo por abajo */
> ```

> ### 💡 Tip — Padding vs. margin, la confusión eterna
> - **Padding** = espacio **por dentro** (entre el contenido y el borde). Empuja el contenido
>   hacia el centro; el fondo del elemento **sí** llega hasta el borde.
> - **Margin** = espacio **por fuera** (entre esta caja y las demás). Es transparente.
> Regla mental: *"padding = relleno de la caja; margin = distancia entre cajas."*

> ### 🟦 ¿Qué significa? — *La notación de cuatro lados*
> Muchas propiedades aceptan de 1 a 4 valores, en sentido del reloj desde arriba:
> ```css
> padding: 10px;                /* los 4 lados igual */
> padding: 10px 20px;           /* arriba/abajo | izquierda/derecha */
> padding: 10px 20px 30px 40px; /* arriba | derecha | abajo | izquierda */
> ```
> Lo mismo aplica a `margin`. También existen `padding-top`, `margin-left`, etc., para un solo lado.

---

## 3. El truco que evita dolores de cabeza: `box-sizing`

Hay una trampa clásica. Por defecto, cuando defines `width: 300px`, ese ancho es **solo del
contenido**; el padding y el borde se **suman aparte**, y la caja real acaba siendo más ancha
de 300px. Esto descuadra los diseños y vuelve loco a todo principiante.

> ### 🟦 ¿Qué significa? — *`box-sizing: border-box`*
> La propiedad `box-sizing: border-box` cambia ese comportamiento: hace que `width` incluya el
> **contenido + padding + borde**. Es decir, "300px de ancho" significa 300px de verdad, pase
> lo que pase con el padding. Es tan útil que prácticamente **todos** los sitios lo activan para
> todo, al inicio del CSS:
> ```css
> * {
>   box-sizing: border-box;
> }
> ```
> (El `*` es el "selector universal": afecta a **todos** los elementos.) **Recomendación:**
> empieza siempre tu CSS con esa regla y te ahorrarás horas de confusión. Tu propio
> `tunal-digital/sitio-web/styles.css` lo hace.

---

## 4. Bloque vs. en línea: por qué unas cajas se apilan y otras no

> ### 🟦 ¿Qué significa? — *Elementos de bloque e inline*
> - Un elemento **de bloque** (`block`) ocupa **todo el ancho disponible** y empuja lo siguiente
>   a una nueva línea. Ejemplos: `<p>`, `<h1>`, `<div>`, `<section>`. Por eso los párrafos se
>   apilan uno debajo de otro.
> - Un elemento **en línea** (`inline`) ocupa **solo lo que necesita** y convive en la misma
>   línea con texto. Ejemplos: `<a>`, `<strong>`, `<span>`.
> Esto se puede cambiar con la propiedad `display` (`display: block`, `display: inline`), y muy
> importante, `display: flex`, que es el tema del próximo capítulo.

> ### 🟦 ¿Qué significa? — *`<span>` (la caja inline genérica)*
> Igual que `<div>` es la caja de bloque sin significado, `<span>` es su equivalente **en línea**:
> sirve para envolver un trozo de texto dentro de una línea y darle estilo (por ejemplo, colorear
> una palabra) sin romper el flujo.

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Entiendo que **cada elemento es una caja** con 4 capas.
- [ ] Sé el orden: **contenido → padding → borde → margen**.
- [ ] Distingo **padding** (espacio interior) de **margin** (espacio exterior).
- [ ] Sé redondear esquinas con `border-radius` y usar la notación de 4 lados.
- [ ] Entiendo por qué conviene `box-sizing: border-box` en todo el sitio.
- [ ] Distingo elementos **de bloque** (se apilan) de **inline** (misma línea).

---

## 🧪 Ejercicios

1. **Etiqueta las capas.** Dibuja una caja y rotula sus cuatro capas de adentro hacia afuera.
2. **¿Padding o margin?** Para cada caso elige uno: (a) dar aire dentro de un botón; (b) separar
   dos tarjetas entre sí; (c) que el texto no toque el borde de una caja con fondo de color.
3. **Lee la notación.** ¿Qué significa `padding: 8px 16px;`? ¿Y `margin: 0 auto;`? (la segunda es
   un truco famoso para centrar; investiga o dedúcelo).
4. **El descuadre.** Explica con tus palabras por qué una caja con `width: 200px; padding: 20px;`
   mide 240px de ancho **sin** `border-box`, y 200px **con** `border-box`.
5. 💻 **Tarjeta.** Crea una `.tarjeta` con: fondo crema, `padding` de 20px, `border` teal de 2px,
   `border-radius` de 12px y `margin-bottom` de 16px. Aplícala a dos `<div>` y observa cómo se
   ven y se separan.

➡️ Siguiente: **[Capítulo 04 — Layout con Flexbox](04-flexbox.md)**.
