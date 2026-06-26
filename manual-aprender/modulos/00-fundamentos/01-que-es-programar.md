# Capítulo 01 — ¿Qué es programar?

<p align="center">
  <img src="../../recursos/imagenes/00-fundamentos/cap01.png" alt="Ilustración del capítulo (pixel art con Bit)" width="640">
</p>


> En este capítulo todavía no vas a escribir código. Primero quiero que te quede clara una
> idea: qué es programar de verdad. Mucha gente arranca creyendo otra cosa, choca con la
> realidad y abandona. Vamos a evitarte ese tropiezo.

---

## 1. Una computadora es obediente, pero literal

Imagina que tienes un ayudante rapidísimo, capaz de hacer millones de cosas por segundo, que
**nunca se cansa** y **nunca se aburre**. Suena perfecto, pero tiene un detalle: es
**absolutamente literal**. Hace *exactamente* lo que le dices, ni un paso de más ni uno de
menos, y jamás "adivina" lo que tú querías decir.

Si a una persona le pides "prepárame un café", capta todo el contexto sola: va a la cocina,
busca la taza, calienta el agua y demás. A una computadora hay que dictárselo **paso a paso**,
sin saltarte nada por obvio que parezca. **Programar es justamente escribir esos pasos**, en un
idioma que la máquina pueda seguir, para que termine haciendo algo útil.

> ### 🟦 ¿Qué significa? — *Programar*
> **Programar** (o "codear", del inglés *to code*) es **escribir instrucciones precisas** para
> que una computadora las ejecute y resuelva una tarea. Esas instrucciones, ya escritas, son el
> **código**.
> **¿Para qué sirve?** Para crear páginas web, aplicaciones, juegos, automatizaciones, análisis
> de datos… Cualquier cosa que haga una computadora la hizo alguien programándola.
> **¿Dónde se usa en tu proyecto?** Todo lo que tienes —tunal-digital, PolyPaw, RachaSimple,
> Faro— es código que alguien (o una IA) escribió siguiendo estas reglas.

---

## 2. Lenguaje, código y algoritmo (las tres palabras clave)

Hay tres palabras que conviene separar bien desde el principio, porque se confunden todo el rato.

> ### 🟦 ¿Qué significa? — *Lenguaje de programación*
> Un **lenguaje de programación** es un conjunto de palabras y reglas (una "gramática") que tú y
> la computadora entienden, y que sirve para escribir instrucciones. Así como el español y el
> inglés son idiomas para entenderte con personas, **HTML, JavaScript, Python o SQL** son
> idiomas para entenderte con la máquina.
> **¿Por qué hay tantos?** Porque cada uno nació pensando en tareas distintas. Te irás
> encontrando con estos:
> - **HTML** → describir la *estructura* de una página web.
> - **CSS** → describir el *aspecto* (colores, tamaños).
> - **JavaScript / TypeScript** → la *lógica* e interactividad.
> - **Python** → lógica de aplicaciones, automatización, datos.
> - **SQL** → hablar con bases de datos.

> ### 🟦 ¿Qué significa? — *Código (código fuente)*
> El **código** o **código fuente** es el texto que escribes en un lenguaje de programación. Al
> final es solo texto guardado en archivos. Por ejemplo, el archivo
> `tunal-digital/sitio-web/main.js` contiene código en lenguaje JavaScript.

> ### 🟦 ¿Qué significa? — *Algoritmo*
> Un **algoritmo** es **la receta**: la secuencia de pasos lógicos para resolver un problema,
> *al margen del idioma* en que la escribas. "Para hacer café: 1) calienta agua, 2) pon el café,
> 3) vierte el agua" es un algoritmo. El **código** es ese mismo algoritmo, pero ya escrito en un
> lenguaje concreto.
> **La diferencia importa:** primero piensas el algoritmo (la lógica) y luego lo traduces a
> código. Programar bien es, sobre todo, **pensar bien el algoritmo**.

---

## 3. Un primer "programa" en español

Antes de tocar cualquier lenguaje real, escribamos un algoritmo en español puro. El problema:
*decidir si una persona puede entrar a un evento solo para mayores de 18*.

```
1. Preguntar la edad de la persona.
2. Si la edad es 18 o más:
      decir "Puede entrar".
   Si no:
      decir "No puede entrar".
```

Eso es **pensamiento de programador**: pasos claros y una **decisión** ("si… si no…"). Esa
estructura aparece en casi todos los lenguajes. En JavaScript se vería así (no te preocupes por
entenderlo todavía, solo fíjate en el parecido):

```javascript
let edad = 20;
if (edad >= 18) {
  console.log("Puede entrar");
} else {
  console.log("No puede entrar");
}
```

> ### 🟦 ¿Qué significa? — *Ejecutar (correr) un programa*
> **Ejecutar** (o "correr", del inglés *to run*) un programa es **ponerlo en marcha**: la
> computadora lee tu código y hace lo que dice. Escribir el código es como escribir una
> partitura; ejecutarlo es tocar la música.

---

## 4. Los tres ingredientes de casi todo programa

Existen miles de lenguajes, pero casi toda la programación se apoya en tres ideas que vas a ver
una y otra vez. Quédate con sus nombres:

1. **Datos (variables):** la información que el programa guarda y usa. Por ejemplo: una edad, un
   nombre, un color, una lista de hábitos.
   > 🟦 **Variable:** una "cajita" con un nombre donde guardas un dato para usarlo después. En el
   > ejemplo, `edad` es una variable que guarda el número 20.

2. **Decisiones (condicionales):** el programa elige qué hacer según una condición. Es el "si…
   si no…" (`if … else`).

3. **Repeticiones (bucles):** hacer algo muchas veces sin tener que escribirlo muchas veces. Por
   ejemplo: "para cada hábito en la lista, muéstralo en pantalla".
   > 🟦 **Bucle (loop):** una instrucción que repite un bloque de código varias veces.

Con esos tres ingredientes —guardar datos, decidir y repetir— se arma una cantidad enorme de
programas. Lo demás son variaciones y herramientas montadas encima de esto.

---

## 5. Por qué "vibe coding" te deja a medias (y este manual no)

> ### 🟦 ¿Qué significa? — *"Vibe coding"*
> Es pedirle a una IA que escriba el código por ti **describiendo el resultado** que quieres
> ("hazme una página bonita con un formulario"), sin entender lo que produce. Sirve para empezar
> y para prototipos, pero tiene un techo: cuando algo falla, o cuando quieres un cambio *fino y
> específico*, no sabes qué pedir ni cómo revisar lo que te dieron.

La idea de este manual es subirte ese techo. Cuando manejes los fundamentos, podrás pasar de
órdenes vagas a órdenes **precisas**:

| En vez de decir… | Vas a poder decir… |
|---|---|
| "Ponlo más bonito" | "Usa este azul `#1B2A4A` de fondo y `16px` de espaciado interno" |
| "No me funciona" | "El error dice *undefined is not a function* en la línea 40 de main.js" |
| "Hazme la base de datos" | "Crea una tabla `habitos` con columnas id, nombre y usuario_id, con RLS" |

Esa precisión es **poder**: trabajas más rápido, gastas menos y mandas tú sobre el resultado.

---

## ✅ Checklist — ¿ya domino esto?

Repásalo de memoria. Si dudas en alguno, vuelve a esa parte.

- [ ] Puedo explicar qué es programar con la analogía del "ayudante literal".
- [ ] Sé la diferencia entre **lenguaje**, **código** y **algoritmo**.
- [ ] Reconozco los tres ingredientes: **datos, decisiones, repeticiones**.
- [ ] Entiendo por qué entender el código me da **órdenes más precisas**.

---

## 🧪 Ejercicios

Estos no necesitan computadora; puedes hacerlos en papel o en las notas del teléfono. Las
respuestas sugeridas están en [`soluciones/01-soluciones.md`](soluciones/01-soluciones.md)
(intenta primero, no espíes 😉).

1. **Algoritmo cotidiano.** Escribe, en español y paso a paso, el algoritmo para *lavarte los
   dientes*. Incluye al menos una **decisión** ("si…").
2. **Encuentra los ingredientes.** En el ejemplo del evento (mayores de 18), señala: ¿cuál es el
   **dato/variable**? ¿Dónde está la **decisión**?
3. **Bucle a mano.** Escribe en español un algoritmo que diga "Hola" a cada nombre de esta lista:
   Ana, Beto, Carla. Usa la idea de **repetición** ("para cada…").
4. **Traduce una orden vaga a una precisa.** Toma esta petición vaga: *"hazme el botón más
   llamativo"*. Reescríbela como una orden precisa (inventa un color en hexadecimal, un tamaño,
   etc.). No tiene que ser "correcta", solo **específica**.

➡️ Siguiente: **[Capítulo 02 — Cómo funciona una computadora](02-como-funciona-la-computadora.md)**.
