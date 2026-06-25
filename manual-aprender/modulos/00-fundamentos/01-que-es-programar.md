# Capítulo 01 — ¿Qué es programar?

> En este capítulo no escribirás código todavía. Vamos a construir la idea correcta de qué
> es programar, porque mucha gente arranca con una idea equivocada y por eso se frustra.

---

## 1. Una computadora es obediente, pero literal

Imagina que tienes un ayudante extremadamente rápido, capaz de hacer millones de cosas por
segundo, que **nunca se cansa** y **nunca se aburre**… pero que es **absolutamente literal**:
solo hace *exactamente* lo que le dices, ni más ni menos, y no "adivina" lo que quisiste decir.

Si le dices a una persona "prepárame un café", entiende todo el contexto: ir a la cocina,
buscar la taza, calentar el agua, etc. A una computadora tienes que decírselo **paso a paso**,
sin saltarte nada. **Programar es escribir esos pasos**, en un idioma que la computadora pueda
seguir, para que haga algo útil.

> ### 🟦 ¿Qué significa? — *Programar*
> **Programar** (o "codear", del inglés *to code*) es **escribir instrucciones precisas**
> para que una computadora las ejecute y resuelva una tarea. Esas instrucciones, escritas,
> son el **código**.
> **¿Para qué sirve?** Para crear páginas web, aplicaciones, juegos, automatizaciones,
> análisis de datos… cualquier cosa que haga una computadora la hizo alguien programándola.
> **¿Dónde se usa en tu proyecto?** Todo lo que tienes —tunal-digital, PolyPaw, RachaSimple,
> Faro— es código que alguien (o una IA) escribió siguiendo estas reglas.

---

## 2. Lenguaje, código y algoritmo (las tres palabras clave)

Vamos a separar tres palabras que a veces se confunden.

> ### 🟦 ¿Qué significa? — *Lenguaje de programación*
> Un **lenguaje de programación** es un conjunto de palabras y reglas (una "gramática") que
> tanto tú como la computadora entienden, y que sirve para escribir instrucciones. Igual que
> el español y el inglés son idiomas para comunicarte con personas, **HTML, JavaScript,
> Python o SQL** son idiomas para comunicarte con la computadora.
> **¿Por qué hay tantos?** Porque cada uno está pensado para tareas distintas. Verás:
> - **HTML** → describir la *estructura* de una página web.
> - **CSS** → describir el *aspecto* (colores, tamaños).
> - **JavaScript / TypeScript** → la *lógica* e interactividad.
> - **Python** → lógica de aplicaciones, automatización, datos.
> - **SQL** → hablar con bases de datos.

> ### 🟦 ¿Qué significa? — *Código (código fuente)*
> El **código** o **código fuente** es el texto que escribes en un lenguaje de programación.
> Es solo texto, guardado en archivos. Por ejemplo, el archivo
> `tunal-digital/sitio-web/main.js` contiene código en lenguaje JavaScript.

> ### 🟦 ¿Qué significa? — *Algoritmo*
> Un **algoritmo** es **la receta**: la secuencia de pasos lógicos para resolver un problema,
> *independiente del idioma* en que la escribas. "Para hacer café: 1) calienta agua, 2) pon
> el café, 3) vierte el agua" es un algoritmo. El **código** es ese algoritmo ya escrito en
> un lenguaje concreto.
> **La diferencia importa:** primero piensas el algoritmo (la lógica), luego lo traduces a
> código. Programar bien es, sobre todo, **pensar bien el algoritmo**.

---

## 3. Un primer "programa" en español

Antes de cualquier lenguaje real, escribamos un algoritmo en español puro. Problema: *decidir
si una persona puede entrar a un evento solo para mayores de 18*.

```
1. Preguntar la edad de la persona.
2. Si la edad es 18 o más:
      decir "Puede entrar".
   Si no:
      decir "No puede entrar".
```

Eso es **pensamiento de programador**: pasos claros y una **decisión** ("si… si no…"). Casi
todos los lenguajes tienen esa estructura. En JavaScript se vería así (no te preocupes por
entenderlo aún, solo nota el parecido):

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

Aunque existan miles de lenguajes, casi toda la programación se construye con tres ideas que
verás una y otra vez. Quédate con sus nombres:

1. **Datos (variables):** la información que el programa guarda y usa. Ej.: una edad, un
   nombre, un color, una lista de hábitos.
   > 🟦 **Variable:** una "cajita" con un nombre donde guardas un dato para usarlo después.
   > En el ejemplo, `edad` es una variable que guarda el número 20.

2. **Decisiones (condicionales):** el programa elige qué hacer según una condición. Es el
   "si… si no…" (`if … else`).

3. **Repeticiones (bucles):** hacer algo muchas veces sin escribirlo muchas veces. Ej.:
   "para cada hábito en la lista, muéstralo en pantalla".
   > 🟦 **Bucle (loop):** una instrucción que repite un bloque de código varias veces.

Con solo estos tres ingredientes —guardar datos, decidir y repetir— se construye una
cantidad enorme de programas. Todo lo demás son variaciones y herramientas encima de esto.

---

## 5. Por qué "vibe coding" te deja a medias (y este manual no)

> ### 🟦 ¿Qué significa? — *"Vibe coding"*
> Es pedirle a una IA que escriba el código por ti **describiendo el resultado** que quieres
> ("hazme una página bonita con un formulario"), sin entender el código que produce. Funciona
> para empezar y para prototipos, pero tiene un techo: cuando algo falla, o quieres un cambio
> *fino y específico*, no sabes qué pedir ni cómo revisar lo que te dieron.

El objetivo de este manual es subir ese techo. Cuando entiendas los fundamentos, podrás pasar
de órdenes vagas a órdenes **precisas**:

| En vez de decir… | Vas a poder decir… |
|---|---|
| "Ponlo más bonito" | "Usa este azul `#1B2A4A` de fondo y `16px` de espaciado interno" |
| "No me funciona" | "El error dice *undefined is not a function* en la línea 40 de main.js" |
| "Hazme la base de datos" | "Crea una tabla `habitos` con columnas id, nombre y usuario_id, con RLS" |

Esa precisión es **poder**: trabajas más rápido, gastas menos, y controlas el resultado.

---

## ✅ Checklist — ¿ya domino esto?

Marca mentalmente. Si dudas en alguno, relee esa parte.

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
2. **Encuentra los ingredientes.** En el ejemplo del evento (mayores de 18), señala: ¿cuál es
   el **dato/variable**? ¿Dónde está la **decisión**?
3. **Bucle a mano.** Escribe en español un algoritmo que diga "Hola" a cada nombre de esta
   lista: Ana, Beto, Carla. Usa la idea de **repetición** ("para cada…").
4. **Traduce una orden vaga a una precisa.** Toma esta petición vaga: *"hazme el botón más
   llamativo"*. Reescríbela como una orden precisa (inventa un color en hexadecimal, un
   tamaño, etc.). No tiene que ser "correcta", solo **específica**.

➡️ Siguiente: **[Capítulo 02 — Cómo funciona una computadora](02-como-funciona-la-computadora.md)**.
