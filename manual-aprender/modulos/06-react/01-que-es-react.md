# Capítulo 01 — ¿Qué es React?

<p align="center">
  <img src="../../recursos/imagenes/06-react/cap01.png" alt="Ilustración del capítulo (pixel art con Bit)" width="640">
</p>


> React es la pieza que conecta todo lo aprendido: usa JavaScript (Módulo 03) y TypeScript
> (Módulo 05) para construir interfaces como las del Módulo 01 (HTML) y 02 (CSS), pero de forma
> **organizada y reactiva**. Empecemos por la idea grande antes de tocar código.

---

## 1. El problema que resuelve React

¿Te acuerdas del Módulo 03? Cuando querías cambiar algo en la página, ibas a buscar el elemento al
DOM y lo modificabas tú mismo (`querySelector`, `textContent`, `classList`…). Para una página
pequeña, perfecto. El problema aparece cuando la app crece: listas que cambian, formularios, datos
que llegan de internet. De repente tienes cientos de instrucciones del tipo "busca esto y cámbialo",
y basta con que una falle para que todo se rompa. Se vuelve un caos difícil de seguir.

> ### 🟦 ¿Qué significa? — *React*
> **React** es una **librería de JavaScript para construir interfaces de usuario** a base de
> **componentes** reutilizables. Su gran idea es darle la vuelta al asunto: en lugar de explicarle
> al navegador *cómo* cambiar el DOM paso a paso, tú describes *cómo debe verse* la interfaz según
> los datos. Cuando esos datos cambian, React se encarga solo de actualizar la pantalla.

---

## 2. Declarativo vs. imperativo (la idea central)

> ### 🟦 ¿Qué significa? — *Imperativo vs. declarativo*
> - **Imperativo** = describes **los pasos**. "Busca el contador, lee su número, súmale 1,
>   escríbelo de vuelta." Así trabajabas con el DOM a mano.
> - **Declarativo** = describes **el resultado deseado**. "El contador muestra el valor actual."
>   Y cuando el valor cambia, React redibuja solo.
>
> Piénsalo así: lo imperativo es dar indicaciones giro a giro ("derecha, luego izquierda, luego
> recto"); lo declarativo es decir a dónde quieres llegar y dejar que el GPS calcule la ruta. React
> es ese GPS: tú dices el destino (cómo debe verse) y él se ocupa de los cambios.

> ### 💡 Tip — Por qué esto importa
> El enfoque declarativo es justo lo que vuelve **manejables** las apps grandes. No tienes que
> rastrear mil cambios manuales: solo describes "así se ve con estos datos" y confías en que React
> mantiene la pantalla sincronizada. El resultado son menos errores y un código mucho más claro.

---

## 3. Componentes: construir con piezas

> ### 🟦 ¿Qué significa? — *Componente*
> Un **componente** es una **pieza reutilizable de interfaz**, con su propia estructura, estilo y
> lógica, que puedes usar las veces que quieras. Una tarjeta de hábito, un botón, una barra de
> navegación: cada uno es un componente.
> La imagen que suele ayudar es la de los **bloques de LEGO**. Armas piezas pequeñas (un botón, una
> tarjeta) y las vas combinando hasta formar pantallas completas. Y como son reutilizables, defines
> la tarjeta **una sola vez** y la usas para los 20 hábitos de la lista.

> ### 🔎 En tu código
> En `RachaSimple/src/components/racha/` cada archivo es un componente: `HabitCard.tsx` (una
> tarjeta de hábito), `MetricCard.tsx` (una métrica), `AppShell.tsx` (el armazón de la app). Las
> pantallas en `src/pages/` (como `Today.tsx`) **combinan** esos componentes. Faro funciona igual,
> con `project-card.tsx`, `roadmap-view.tsx`, etc. Al final, toda la app es un árbol de componentes.

> ### 🟦 ¿Qué significa? — *Árbol de componentes*
> Los componentes se **anidan** unos dentro de otros y van formando un árbol (igual que el DOM del
> Módulo 01): un componente "App" contiene una "Página", que contiene una "Lista", que contiene
> muchas "Tarjetas". Pensar en árbol te ayuda a saber dónde vive cada cosa.

---

## 4. React, Vite y Next.js: ¿qué es cada uno?

Para que no te líes con los nombres que vas viendo en tus proyectos:

> ### 🟦 ¿Qué significa? — *React vs. su "andamiaje"*
> - **React** es la librería de componentes en sí.
> - **Vite** (en RachaSimple) es la **herramienta de construcción**: arranca el servidor de
>   desarrollo, compila el TypeScript y refresca el navegador cada vez que guardas. Es el "taller".
> - **Next.js** (en Faro) es un **framework sobre React** que añade más cosas (rutas por
>   carpetas, código de servidor, etc.). Es "React con baterías incluidas".
> Quédate con esto: **lo que aprendes aquí es React**; Vite y Next.js son envoltorios que lo hacen
> cómodo de usar. Los conceptos de componentes, props y estado son **los mismos** en ambos.

---

## 5. Cómo se ve un componente (un primer vistazo)

No hace falta que lo entiendas del todo todavía; por ahora fíjate solo en la forma:

```tsx
function Saludo() {
  return <h1>¡Hola, Edwar!</h1>;
}
```

Eso es un componente: **una función** (¿te acuerdas de las funciones del Módulo 03?) que **devuelve
algo que parece HTML**. A ese "HTML dentro de JavaScript" se le llama **JSX**, y es justo el tema
del próximo capítulo. Lo bonito es que luego usas `<Saludo />` como si fuera una etiqueta HTML
nueva, y React coloca ahí ese `<h1>`.

> ### 💡 Tip — Un componente es una función que devuelve interfaz
> Si de este capítulo te llevas una sola frase, que sea esta. Todo lo demás (props, estado, hooks)
> se construye encima de esta idea tan simple. Ya sabes hacer funciones; ahora resulta que devuelven
> pantalla.

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Entiendo el problema que resuelve React (manipular el DOM a mano no escala).
- [ ] Distingo **declarativo** (describir el resultado) de **imperativo** (describir los pasos).
- [ ] Sé qué es un **componente** (pieza reutilizable, como un LEGO) y el **árbol** de componentes.
- [ ] Diferencio **React** (la librería) de **Vite** y **Next.js** (su andamiaje).
- [ ] Entiendo que un componente es **una función que devuelve interfaz**.

---

## 🧪 Ejercicios

1. **Declarativo o imperativo.** Clasifica: (a) "busca el título y cámbiale el texto"; (b) "el
   título muestra el nombre del usuario". ¿Cuál es el estilo de React?
2. **LEGO.** Da tres ejemplos de "componentes" que verías en una app de hábitos (piensa en
   piezas reutilizables de pantalla).
3. **Nombres.** Explica en una frase la diferencia entre React, Vite y Next.js.
4. **La frase clave.** Completa: "Un componente es, en esencia, una ________ que devuelve
   ________".
5. **Explora tu app.** Mira la lista de archivos en `RachaSimple/src/components/racha/`. Elige
   tres nombres y adivina qué pieza de interfaz es cada uno.

➡️ Siguiente: **[Capítulo 02 — Componentes y JSX](02-componentes-y-jsx.md)**.
