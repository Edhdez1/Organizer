# Capítulo 01 — ¿Qué es React?

> React es la pieza que conecta todo lo aprendido: usa JavaScript (Módulo 03) y TypeScript
> (Módulo 05) para construir interfaces como las del Módulo 01 (HTML) y 02 (CSS), pero de forma
> **organizada y reactiva**. Empecemos por la idea grande antes de tocar código.

---

## 1. El problema que resuelve React

Recuerda el Módulo 03: para cambiar la página, seleccionabas elementos del DOM y los modificabas
a mano (`querySelector`, `textContent`, `classList`…). Funciona para cosas pequeñas, pero en una
app grande (con listas que cambian, formularios, datos que llegan de internet) se vuelve un caos:
miles de instrucciones de "busca esto y cámbialo", fáciles de romper.

> ### 🟦 ¿Qué significa? — *React*
> **React** es una **librería de JavaScript para construir interfaces de usuario** a base de
> **componentes** reutilizables. Su gran idea: en vez de decir *cómo* cambiar el DOM paso a paso,
> tú describes *cómo debe verse* la interfaz según los datos, y React se encarga de actualizar la
> pantalla por ti cuando los datos cambian.

---

## 2. Declarativo vs. imperativo (la idea central)

> ### 🟦 ¿Qué significa? — *Imperativo vs. declarativo*
> - **Imperativo** = describes **los pasos**. "Busca el contador, lee su número, súmale 1,
>   escríbelo de vuelta." Así trabajabas con el DOM a mano.
> - **Declarativo** = describes **el resultado deseado**. "El contador muestra el valor actual."
>   Y cuando el valor cambia, React redibuja solo.
>
> Analogía: imperativo es dar indicaciones giro a giro ("derecha, luego izquierda, luego
> recto"); declarativo es decir la dirección de destino y dejar que el GPS calcule. React es el
> GPS: tú dices el destino (cómo debe verse), él calcula los cambios.

> ### 💡 Tip — Por qué esto importa
> El enfoque declarativo hace que las apps grandes sean **manejables**: no rastreas mil cambios
> manuales; solo describes "así se ve con estos datos", y confías en que React mantiene la
> pantalla sincronizada. Menos errores, código más claro.

---

## 3. Componentes: construir con piezas

> ### 🟦 ¿Qué significa? — *Componente*
> Un **componente** es una **pieza reutilizable de interfaz**, con su propia estructura, estilo y
> lógica, que puedes usar muchas veces. Una tarjeta de hábito, un botón, una barra de navegación:
> cada uno es un componente.
> Analogía: son como **bloques de LEGO**. Construyes piezas pequeñas (un botón, una tarjeta) y
> las combinas para formar pantallas completas. Y como son reutilizables, defines la tarjeta
> **una vez** y la usas para los 20 hábitos de la lista.

> ### 🔎 En tu código
> En `RachaSimple/src/components/racha/` cada archivo es un componente: `HabitCard.tsx` (una
> tarjeta de hábito), `MetricCard.tsx` (una métrica), `AppShell.tsx` (el armazón de la app). Las
> pantallas en `src/pages/` (como `Today.tsx`) **combinan** esos componentes. Faro hace lo mismo
> con `project-card.tsx`, `roadmap-view.tsx`, etc. Toda la app es un árbol de componentes.

> ### 🟦 ¿Qué significa? — *Árbol de componentes*
> Los componentes se **anidan** unos dentro de otros, formando un árbol (como el DOM del Módulo
> 01): un componente "App" contiene una "Página", que contiene una "Lista", que contiene muchas
> "Tarjetas". Pensar en árbol te ayuda a ubicar dónde vive cada cosa.

---

## 4. React, Vite y Next.js: ¿qué es cada uno?

Para no confundirte con los nombres que aparecen en tus proyectos:

> ### 🟦 ¿Qué significa? — *React vs. su "andamiaje"*
> - **React** es la librería de componentes en sí.
> - **Vite** (en RachaSimple) es la **herramienta de construcción**: arranca el servidor de
>   desarrollo, compila el TypeScript, refresca el navegador al guardar. Es el "taller".
> - **Next.js** (en Faro) es un **framework sobre React** que añade más cosas (rutas por
>   carpetas, código de servidor, etc.). Es "React con baterías incluidas".
> Por ahora: **React es lo que aprendes aquí**; Vite y Next.js son envoltorios que lo hacen
> cómodo de usar. Los conceptos de componentes, props y estado son **los mismos** en ambos.

---

## 5. Cómo se ve un componente (un primer vistazo)

No te preocupes por entenderlo del todo aún; solo nota la forma:

```tsx
function Saludo() {
  return <h1>¡Hola, Edwar!</h1>;
}
```

Eso es un componente: **una función** (¿recuerdas las funciones del Módulo 03?) que **devuelve
algo que parece HTML**. Ese "HTML dentro de JavaScript" se llama **JSX**, y es el tema del
próximo capítulo. Lo mágico: usas `<Saludo />` como si fuera una etiqueta HTML nueva, y React
pone ahí ese `<h1>`.

> ### 💡 Tip — Un componente es una función que devuelve interfaz
> Si te quedas con una sola frase de este capítulo, que sea esta. Todo lo demás (props, estado,
> hooks) son añadidos sobre esta idea simple. Ya sabes hacer funciones; ahora devuelven pantalla.

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
