# Capítulo 10 — Transiciones y animaciones

<p align="center">
  <img src="../../recursos/imagenes/02-css/cap10.png" alt="Ilustración del capítulo (pixel art con Bit)" width="640">
</p>


> ¡Hola otra vez! Soy **Bit**, tu ajolote guía. Hasta ahora tu CSS ha sido como una foto: bonita, pero quieta. En este capítulo le vamos a dar **movimiento**. Vas a aprender a que un botón cambie de color suavemente, a que una tarjeta se eleve cuando pasas el ratón por encima y a que un logo gire solito. Y todo eso con muy poco código, sin tocar JavaScript. Eso sí, prometeme una cosa: el movimiento es como la sal en la comida. Una pizca realza el plato; un kilo lo arruina (y marea a la gente). Vamos despacio y con cariño. 🪼

---

## 1. ¿Por qué animar? El antes y el después

Imagina dos botones. El primero, cuando pasas el ratón, **salta** de golpe de azul a verde. El segundo se va tiñendo de verde poco a poco, en un cuarto de segundo. El segundo se siente más profesional, más “vivo”, aunque el color final sea idéntico en ambos. Esa diferencia —ese “poco a poco”— es justo lo que vamos a controlar.

En CSS tienes dos grandes herramientas para mover cosas:

1. **`transition`**: para suavizar un cambio que ocurre por algo (un `:hover`, un clic, un cambio de clase). Es el “de A a B, despacito”.
2. **`animation` con `@keyframes`**: para movimientos que ocurren **solos** o se repiten (un spinner que gira, un texto que parpadea, algo que entra deslizándose).

Y hay una tercera pieza que mucha gente olvida y que pesa más de lo que parece:

3. **`prefers-reduced-motion`**: una forma de respetar a quienes el movimiento les marea o les molesta. Accesibilidad, y no es opcional.

> ### 🟦 ¿Qué significa? — *Animación (en la web)*
> Es un cambio visual que ocurre **a lo largo del tiempo** en lugar de instantáneamente. En vez de pasar de “rojo” a “azul” de un frame al siguiente, la animación dibuja todos los pasos intermedios. Sirve para guiar la atención, dar feedback (“sí, te hice caso”) y hacer la interfaz más agradable. Lo usarías, por ejemplo, en el `styles.css` de **tunal-digital** para que las tarjetas de servicios reaccionen cuando el visitante las recorre con el ratón.

---

## 2. `transition`: suavizar los cambios

Vamos con la estrella del capítulo. La idea es sencilla: tienes un elemento con un estado normal y otro estado distinto (al pasar el ratón, al enfocar, al añadir una clase). `transition` le dice al navegador: **“no cambies de golpe, tómate tu tiempo”**.

> ### 🟦 ¿Qué significa? — *transition*
> Es una propiedad CSS que **interpola** (rellena los pasos intermedios) entre el valor inicial y el final de otras propiedades cuando estas cambian. Sirve para que los cambios se sientan fluidos en vez de bruscos. La encontrarías en el `styles.css` de **tunal-digital** sobre los botones y las tarjetas, y en el `site/estilos.css` del propio manual, cuando un enlace cambia de color al pasar por encima.

### 2.1 El ejemplo más pequeño posible

```css
.boton {
  background-color: #2563eb; /* azul */
  transition: background-color 0.3s;
}

.boton:hover {
  background-color: #16a34a; /* verde */
}
```

Fíjate en la línea clave: `transition: background-color 0.3s;`. Le estás diciendo al botón: *“cuando tu `background-color` cambie, hazlo en 0.3 segundos”*. Quien dispara ese cambio es el `:hover`. Sin la línea de `transition`, el salto sería instantáneo.

> ### 💡 Tip
> La `transition` va en el estado **normal** del elemento, no en el `:hover`. Así el suavizado funciona tanto al **entrar** el ratón como al **salir**. Si solo la pones en el `:hover`, se anima al entrar pero vuelve de golpe al salir, y eso se siente raro.

### 2.2 Las cuatro piezas de `transition`

La forma corta de `transition` admite hasta cuatro valores, en este orden:

```css
transition: background-color 0.3s ease-in-out 0s;
/*           ↑propiedad      ↑duración ↑curva    ↑retraso */
```

Veámoslas una por una, porque cada una tiene además su propia propiedad “larga”.

> ### 🟦 ¿Qué significa? — *transition-property*
> Indica **qué propiedad** quieres animar: `background-color`, `transform`, `opacity`, `color`… Sirve para no animar todo a lo loco, sino solo lo que te interesa. Si pones `all`, animas cualquier cosa que cambie: es cómodo, pero a veces termina animando cosas que no querías.

> ### 🟦 ¿Qué significa? — *transition-duration*
> Cuánto **tarda** la transición, en segundos (`s`) o milisegundos (`ms`). `0.3s` y `300ms` son lo mismo. Sirve para controlar la velocidad: valores entre `0.15s` y `0.4s` suelen sentirse naturales. Por encima de `0.6s` un simple `:hover` empieza a sentirse lento y pesado.

> ### 🟦 ¿Qué significa? — *transition-timing-function (easing)*
> Es la **curva de velocidad**: ¿el movimiento va a ritmo constante, arranca lento, frena al final? Sirve para que el movimiento se sienta orgánico, como en el mundo real, donde las cosas no arrancan ni frenan de golpe. Los valores más comunes: `ease` (el de por defecto, arranca y frena suave), `linear` (velocidad constante), `ease-in`, `ease-out`, `ease-in-out`.

> ### 🟦 ¿Qué significa? — *transition-delay*
> Cuánto **espera** antes de empezar. `0s` = empieza ya. Sirve para encadenar efectos o para que algo no reaccione al instante. Casi siempre lo dejarás en `0s` (o ni lo escribes).

> ### 🟦 ¿Qué significa? — *Easing*
> “Easing” es el término general para esa curva de velocidad. La palabra viene de “to ease” (suavizar). Sirve para que los movimientos no parezcan robóticos. Una regla práctica: para cosas que **aparecen o responden** usa `ease-out` (entra rápido y frena, se siente atenta); para cosas que **se van** usa `ease-in`.

### 2.3 Animar varias propiedades a la vez

Puedes separar varias transiciones con comas:

```css
.tarjeta {
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transform: translateY(0);
  transition:
    box-shadow 0.25s ease-out,
    transform 0.25s ease-out;
}

.tarjeta:hover {
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  transform: translateY(-6px);
}
```

Al pasar el ratón ocurren **dos** cosas al mismo tiempo: la sombra crece (la tarjeta parece “levantarse” del papel) y la tarjeta sube 6 píxeles. Las dos se animan en 0.25s con la misma curva. Esto es, casi literalmente, el efecto hover de tarjeta que ves en montones de sitios… incluido el tuyo.

> ### 🔎 En tu código
> En **tunal-digital**, dentro de `styles.css`, busca tu sección de tarjetas de servicios. El patrón “sombra suave en reposo + sombra grande y `translateY` negativo en `:hover`” es exactamente el de arriba. Si tus tarjetas hoy cambian de golpe, agrégales una línea de `transition` en el estado normal y siente la diferencia. En **RachaSimple** y **Faro**, que usan **Tailwind**, este mismo efecto se escribe con clases utilitarias como `transition`, `duration-200`, `ease-out` y `hover:-translate-y-1`, pero por debajo es exactamente el mismo CSS.

> ### ⚠️ Cuidado
> Evita animar propiedades como `width`, `height`, `top` o `margin` siempre que puedas. Esas obligan al navegador a **recalcular el layout** de la página en cada frame, y eso se ve a tirones. Las dos propiedades “baratas” y fluidas por excelencia son **`transform`** y **`opacity`**. Si quieres mover o agrandar algo, usa `transform` (lo vemos ahora mismo), no `top`/`left`/`width`.

---

## 3. `transform`: mover, escalar y rotar sin romper nada

> ### 🟦 ¿Qué significa? — *transform*
> Es una propiedad que **desplaza, escala, rota o inclina** un elemento visualmente, sin afectar a los demás elementos de la página. Sirve para mover cosas de forma fluida y barata, y se lleva de maravilla con `transition`. La usarías en el `styles.css` de **tunal-digital** para elevar tarjetas, agrandar un icono al pasar el ratón o rotar una flecha en un acordeón.

Lo bonito de `transform` es que el espacio que ocupaba el elemento **se queda reservado**: aunque lo muevas o lo agrandes, no empuja a sus vecinos. Por eso resulta tan suave.

### 3.1 `translate` — mover

> ### 🟦 ¿Qué significa? — *translate*
> Mueve el elemento en horizontal y/o vertical. `translateX(10px)` lo desplaza a la derecha; `translateY(-6px)` lo sube; `translate(10px, -6px)` hace las dos cosas a la vez. Sirve para desplazamientos suaves sin tocar el layout.

```css
.icono:hover {
  transform: translateY(-4px); /* sube 4px, como flotando */
}
```

Ojo al signo: en la web el eje Y crece **hacia abajo**, así que un valor **negativo** sube. Esto confunde a todo el mundo al principio; a mí también me pasaba cuando era un ajolote más pequeño. 🪼

### 3.2 `scale` — agrandar o encoger

> ### 🟦 ¿Qué significa? — *scale*
> Cambia el **tamaño** visual del elemento. `scale(1)` es el tamaño normal; `scale(1.05)` lo agranda un 5%; `scale(0.9)` lo encoge un 10%. Sirve para dar feedback (“me estás apuntando”) en botones, imágenes o iconos.

```css
.foto-producto {
  transition: transform 0.3s ease;
}
.foto-producto:hover {
  transform: scale(1.05); /* un 5% más grande, sutil */
}
```

> ### 💡 Tip
> Para fotos dentro de una tarjeta, combina `scale` con `overflow: hidden` en la tarjeta contenedora. Así la imagen se agranda “por dentro” del marco y consigues el clásico efecto de zoom elegante sin que nada se desborde.

### 3.3 `rotate` — girar

> ### 🟦 ¿Qué significa? — *rotate*
> Gira el elemento alrededor de su centro. `rotate(45deg)` lo inclina 45 grados; `rotate(180deg)` lo pone boca abajo; `rotate(360deg)` da una vuelta completa. Sirve para flechitas que apuntan según el estado (acordeones, menús) y para iconos que giran.

```css
.flecha {
  transition: transform 0.2s ease;
}
.acordeon.abierto .flecha {
  transform: rotate(180deg); /* la flecha apunta hacia arriba */
}
```

### 3.4 Combinar varias transformaciones

Puedes encadenar varias en una sola línea, separadas por espacios:

```css
.tarjeta:hover {
  transform: translateY(-6px) scale(1.02);
}
```

> ### ⚠️ Cuidado
> El **orden importa**. `translate(...) rotate(...)` no da el mismo resultado que `rotate(...) translate(...)`, porque cada transformación arrastra también los ejes para la siguiente. Si algo se mueve “raro”, prueba a invertir el orden.

> ### 🔎 En tu código
> En **PolyPaw** (Python + Flet) y en **polypaw-nas** (Ubuntu/Samba/Cockpit) no escribes CSS a mano: Flet genera la interfaz desde Python y Cockpit ya trae sus propios estilos. Por eso `transform` y `@keyframes` viven sobre todo en tus proyectos **web**: `tunal-digital`, el `site/estilos.css` del manual, y vía Tailwind en **RachaSimple** y **Faro**. Tenlo presente para no buscar CSS donde no lo hay.

---

## 4. `@keyframes` y `animation`: movimiento que ocurre solo

`transition` siempre necesita un “disparador” (un `:hover`, un clic). ¿Y si quieres que algo se mueva **solo**, nada más cargar la página, o que **se repita** para siempre, como un spinner de carga? Ahí entran las animaciones con `@keyframes`.

> ### 🟦 ¿Qué significa? — *@keyframes*
> Es una regla CSS donde defines los **fotogramas clave** de una animación: cómo empieza, cómo termina y, si quieres, los pasos intermedios. Le pones un nombre y luego lo usas. Sirve para describir un movimiento completo una sola vez y reutilizarlo. Lo usarías para un spinner de carga mientras **Faro** consulta a OpenAI, o para que una tarjeta de **tunal-digital** entre deslizándose al cargar.

> ### 🟦 ¿Qué significa? — *animation*
> Es la propiedad que **aplica** unos `@keyframes` a un elemento, indicando cuánto duran, cuántas veces se repiten, con qué curva, etc. Por sí solos, los `@keyframes` no hacen nada: son la receta; `animation` es ponerse a cocinar.

### 4.1 Un spinner de carga (el ejemplo clásico)

```css
@keyframes girar {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

.spinner {
  width: 32px;
  height: 32px;
  border: 4px solid #e5e7eb;        /* anillo gris claro */
  border-top-color: #2563eb;        /* un trozo azul */
  border-radius: 50%;               /* círculo */
  animation: girar 0.8s linear infinite;
}
```

Lee la última línea como si fuera una frase: anima usando los keyframes `girar`, cada vuelta dura `0.8s`, a velocidad constante (`linear`, porque un giro no debería frenar) y se repite `infinite` (para siempre). Eso ya es un spinner completo. Con `from`/`to` defines solo el inicio y el final; el navegador rellena todo lo de en medio.

> ### 💡 Tip
> En vez de `from`/`to` puedes usar **porcentajes** para marcar pasos intermedios. `0%` es el inicio, `100%` el final, y entre medias pones los que quieras:
> ```css
> @keyframes pulso {
>   0%   { transform: scale(1); }
>   50%  { transform: scale(1.1); }
>   100% { transform: scale(1); }
> }
> ```
> Esto crece y vuelve, perfecto para un “latido” que llama la atención.

### 4.2 Las piezas de `animation`

Igual que `transition`, la forma corta de `animation` resume varias propiedades:

```css
animation: girar 0.8s linear infinite;
/*         ↑nombre ↑duración ↑curva ↑repeticiones */
```

> ### 🟦 ¿Qué significa? — *animation-name*
> El nombre de los `@keyframes` que quieres usar (aquí, `girar`). Tiene que coincidir exactamente con el nombre que definiste. Sirve para conectar la receta con el elemento.

> ### 🟦 ¿Qué significa? — *animation-duration*
> Cuánto dura **una pasada** de la animación. Igual que en `transition`, se mide en `s` o `ms`.

> ### 🟦 ¿Qué significa? — *animation-iteration-count*
> Cuántas veces se repite. Un número (`1`, `3`) o `infinite` (sin parar). Sirve para spinners (`infinite`) o para efectos que ocurren una sola vez al cargar (`1`).

> ### 🟦 ¿Qué significa? — *animation-timing-function*
> La misma curva de velocidad (easing) que en `transition`: `ease`, `linear`, `ease-in-out`… Para giros y barras de progreso normalmente querrás `linear`; para entradas, `ease-out`.

Hay más piezas que vale la pena conocer, aunque no las uses todos los días:

> ### 🟦 ¿Qué significa? — *animation-delay*
> Cuánto espera antes de empezar. Muy útil para **escalonar** entradas: si tres tarjetas entran con delays de `0s`, `0.1s` y `0.2s`, aparecen una tras otra con un efecto de cascada precioso.

> ### 🟦 ¿Qué significa? — *animation-fill-mode*
> Decide qué aspecto tiene el elemento **antes** de empezar y **después** de terminar. El valor `forwards` hace que el elemento se quede con el estilo del último fotograma, sin “volver” a su estado inicial. Es imprescindible para animaciones de entrada: sin `forwards`, el elemento parpadearía de vuelta a invisible al acabar.

> ### 🟦 ¿Qué significa? — *animation-direction*
> Si la animación va hacia adelante, hacia atrás o alterna (`normal`, `reverse`, `alternate`). Con `alternate`, un pulso va y vuelve suavemente, sin saltos.

### 4.3 Una entrada elegante (fade + subida)

```css
@keyframes aparecer {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.tarjeta-entrada {
  animation: aparecer 0.4s ease-out forwards;
}
```

La tarjeta empieza invisible (`opacity: 0`) y 16px más abajo, y termina visible en su sitio. Como animamos `opacity` y `transform`, queda súper fluido. El `forwards` evita que vuelva a desaparecer al terminar.

> ### 🔎 En tu código
> En **Faro/Organizer** (Next.js + React), un spinner como el de la sección 4.1 es justo lo que muestras mientras esperas la respuesta de OpenAI para generar la descripción o el roadmap de un proyecto. Con Tailwind ya viene de fábrica la utilidad `animate-spin`, que por dentro define unos `@keyframes` idénticos a `girar`. Saber qué hay debajo te permite entender la animación y, si hace falta, personalizarla.

> ### 💡 Tip — `transition` vs `animation`, ¿cuál uso?
> Regla rápida: si el cambio lo dispara una interacción (hover, clic, foco) y va de un estado a otro, usa **`transition`**. Si el movimiento ocurre solo, se repite, o tiene varios pasos intermedios definidos, usa **`@keyframes` + `animation`**. El 80% de tus efectos del día a día serán `transition`.

---

## 5. Accesibilidad: `prefers-reduced-motion`

Aquí llega la parte que separa a quien “sabe animar” de quien “anima con responsabilidad”. Para algunas personas, el movimiento en pantalla no es bonito: les provoca mareo, náuseas o dolor de cabeza (se llama trastorno vestibular). Los sistemas operativos permiten activar un ajuste de “reducir movimiento”, y nosotros podemos **escucharlo** desde CSS.

> ### 🟦 ¿Qué significa? — *prefers-reduced-motion*
> Es una *media query* que detecta si la persona ha pedido en su sistema operativo **reducir las animaciones**. Sirve para apagar o suavizar tus efectos para quien los necesita apagados, sin tocar la experiencia de los demás. Es una pieza de **accesibilidad** que deberías incluir en `tunal-digital` y en el `site/estilos.css` del manual.

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Esta receta tan corta es casi un estándar de la industria: si la persona pidió menos movimiento, todas tus animaciones y transiciones se vuelven **prácticamente instantáneas**. El contenido sigue funcionando igual; lo único que desaparece es el “viaje”.

> ### ⚠️ Cuidado
> No basta con que tu animación te parezca “suave” a ti. Lo que a una persona le resulta elegante, a otra le revuelve el estómago. Incluir `prefers-reduced-motion` no es un extra de lujo: es parte de hacer una web para **todo el mundo**. Pégalo al final de tu hoja de estilos y, con tres líneas, ya cubriste a un montón de gente.

> ### 💡 Tip
> Si usas **Tailwind** (RachaSimple, Faro), tienes el prefijo `motion-reduce:` para aplicar clases solo cuando la persona pidió menos movimiento, y `motion-safe:` para lo contrario. Por ejemplo, `motion-safe:transition` solo activa la transición si el usuario **no** ha pedido reducir el movimiento.

---

## 6. Los efectos hover de tarjeta, pieza a pieza

Juntemos todo en el efecto que más vas a usar: la **tarjeta interactiva**. Es el patrón de las tarjetas de servicios de tunal-digital y de las tarjetas de proyecto de Faro.

```css
.card {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  /* la transición vive en el estado normal */
  transition:
    transform 0.25s ease-out,
    box-shadow 0.25s ease-out;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.12);
}

/* respeta a quien pidió menos movimiento */
@media (prefers-reduced-motion: reduce) {
  .card {
    transition: none;
  }
  .card:hover {
    transform: none;
  }
}
```

Repasemos por qué cada línea está donde está:

- La `transition` está en `.card` (estado normal), no en `:hover`, para que suavice la entrada **y** la salida del ratón.
- Animamos `transform` y `box-shadow`, las dos propiedades “baratas” y fluidas.
- En `:hover`, la tarjeta sube (`translateY(-6px)`) y proyecta una sombra más grande y difusa: el cerebro lo interpreta como “está más cerca de mí, flotando”.
- El bloque de `prefers-reduced-motion` apaga el efecto para quien lo necesita.

> ### 🔎 En tu código
> Compara este `.card` con tus tarjetas reales en el `styles.css` de **tunal-digital**. Si encuentras que el `:hover` cambia la sombra pero la transición está dentro del `:hover` (o ni aparece), ese es justo el detalle que hace que todo se sienta “a saltos”. Moverla al estado normal es un cambio de una sola línea con un efecto enorme. Y recuerda: si tocas algo funcional en Faro, actualiza también el `README.md` en el mismo PR, como pide la convención del proyecto. 🪼

> ### 💡 Tip — el detalle del cursor
> Acompaña tus tarjetas y botones clicables con `cursor: pointer;`. No es animación, pero refuerza el mensaje “esto se puede tocar”. Detalles pequeños, gran sensación de calidad.

---

## 7. Errores comunes (y cómo te das cuenta)

- **“No se anima nada”**: lo más probable es que pusieras la `transition` solo en el `:hover`, o que el navegador no pueda interpolar entre los dos valores (por ejemplo, animar entre `display: none` y `display: block` no funciona: `display` no es animable de forma sencilla). Usa `opacity` + `visibility`, o `transform`, en su lugar.
- **“Se ve a tirones”**: seguramente estás animando `width`, `height`, `top` o `margin`. Cámbialo a `transform` y `opacity`.
- **“Parpadea al terminar la animación de entrada”**: te falta `animation-fill-mode: forwards;`.
- **“Marea / es demasiado”**: baja la duración, reduce el desplazamiento y añade `prefers-reduced-motion`. Menos es más.

> ### ⚠️ Cuidado — la prueba del abuelo
> Antes de dar por bueno un efecto, imagina a alguien que entra a tu sitio por trabajo, con prisa, treinta veces al día. ¿El movimiento le ayuda o le estorba? Si dudas, hazlo más sutil y más rápido. La animación buena casi no se nota: solo se siente que “todo va fino”.

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Sé explicar qué hace `transition` y por qué se escribe en el estado **normal**, no en el `:hover`.
- [ ] Conozco las cuatro piezas de `transition`: propiedad, duración, easing y delay.
- [ ] Entiendo qué es el **easing** y cuándo usar `ease-out` frente a `linear`.
- [ ] Sé usar `transform` con `translate`, `scale` y `rotate`, y por qué un `translateY` negativo **sube**.
- [ ] Entiendo por qué `transform` y `opacity` son las propiedades fluidas y por qué evitar animar `width`/`top`/`margin`.
- [ ] Sé escribir unos `@keyframes` con `from`/`to` o con porcentajes.
- [ ] Sé aplicar una `animation` con nombre, duración, curva, repeticiones y `forwards`.
- [ ] Distingo cuándo usar `transition` y cuándo `@keyframes` + `animation`.
- [ ] Incluyo siempre `prefers-reduced-motion` para respetar la accesibilidad.
- [ ] Reconozco el patrón del hover de tarjeta (`translateY` + `box-shadow`).

---

## 🧪 Ejercicios

1. **💻 Botón suave.** En el `styles.css` de **tunal-digital**, toma un botón y haz que su `background-color` cambie en `0.25s` con `ease-out` al pasar el ratón. Prueba a quitar la `transition` para sentir el “antes”, y vuelve a ponerla.

2. **💻 Tarjeta que flota.** Aplica el patrón de la sección 6 a tus tarjetas de servicios: `transition` en el estado normal, y en `:hover` un `translateY(-6px)` más una `box-shadow` más grande. Ajusta los valores hasta que te guste.

3. **💻 Zoom en imagen.** Mete una imagen dentro de una tarjeta con `overflow: hidden`, dale `transition: transform 0.3s ease` y, en el `:hover` de la tarjeta, `transform: scale(1.06)` a la imagen. Observa cómo hace zoom “por dentro” del marco.

4. **💻 Spinner propio.** Crea unos `@keyframes girar` y un `.spinner` redondo con un borde de un solo color distinto, que gire `infinite` en `0.8s linear`. Imagina que es el indicador de carga mientras **Faro** llama a OpenAI.

5. **💻 Entrada en cascada.** Haz que tres tarjetas aparezcan con la animación `aparecer` (fade + subida) usando `animation-delay` de `0s`, `0.1s` y `0.2s` para que entren una tras otra. No olvides `forwards`.

6. **Accesibilidad.** Sin escribir código nuevo, explica con tus palabras qué hace `prefers-reduced-motion: reduce` y por qué el bloque de tres líneas de la sección 5 cubre a tanta gente con tan poco esfuerzo. Bonus: ¿cómo lo lograrías en Tailwind?

---

> ¡Lo lograste! Ahora tu CSS respira. 🪼 Recuerda la moraleja del capítulo: el movimiento bien hecho casi no se ve, solo se siente. Usa `transition` para casi todo, reserva `@keyframes` para lo que se mueve solo, y nunca, **nunca** olvides `prefers-reduced-motion`. Nos vemos en el siguiente capítulo, donde seguiremos puliendo tu sitio. — Bit
