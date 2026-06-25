# Cómo estudiar este manual

Léelo una vez antes de empezar. Son 10 minutos que te ahorran semanas de frustración.

---

## 1. La mentalidad correcta

Programar **no es memorizar**. Es entender ideas y combinarlas. Nadie se sabe todo de
memoria: hasta los programadores con 20 años de experiencia buscan cosas todos los días. Lo
que sí desarrollas es **criterio**: saber qué buscar, qué decisión tomar y por qué.

Tres reglas de oro:

1. **Hacer > leer.** Por cada hora leyendo, dedica al menos una hora escribiendo código.
2. **Equivocarse es el método, no el fracaso.** Un error (un *bug*) no es que "seas malo":
   es información. Aprenderás a leer los mensajes de error como pistas, no como insultos.
3. **Entender el "por qué", no solo el "qué".** El objetivo de este manual es que puedas
   decir *"este color en código hexadecimal `#1B2A4A`, esta parte hazla con flexbox"* —
   órdenes precisas— en lugar de "hazme una página bonita".

---

## 2. Cómo está escrito cada concepto

Cada vez que aparece una palabra técnica, la verás explicada en un recuadro así:

> ### 🟦 ¿Qué significa? — *Servidor*
> Un **servidor** es una computadora (o un programa) que está siempre encendida esperando
> peticiones de otras computadoras para *servirles* algo: una página web, un dato, un archivo.
> **¿Para qué sirve?** Para que muchas personas accedan a lo mismo desde cualquier lugar.
> **¿Dónde se usa en tu proyecto?** Tu NAS `polypaw-nas` es un servidor; también lo es
> Cloudflare cuando entrega tu sitio `tunaldigital.com`.

Si un término aparece y **no** lo entiendes y **no** está explicado, es un error del manual:
anótalo. La meta es que no quede ni una sola palabra técnica sin definir.

---

## 3. Símbolos que verás

| Símbolo | Significa |
|---|---|
| 🟦 **¿Qué significa?** | Definición de un término nuevo |
| 💡 **Tip** | Un consejo práctico |
| ⚠️ **Cuidado** | Un error común que la gente comete aquí |
| 🧪 **Ejercicio** | Algo para que hagas tú |
| 🔎 **En tu código** | Dónde aparece esto en uno de tus proyectos reales |
| ✅ **Checklist** | Autoevaluación: ¿ya domino esto? |

---

## 4. Cómo preparar tu computadora (cuando la tengas a mano)

No necesitas nada para *leer*. Para *practicar* necesitarás, según el módulo:

1. **Un editor de código: Visual Studio Code (VS Code).**
   > 🟦 **¿Qué es un editor de código?** Un programa donde escribes el código, parecido a un
   > procesador de texto pero pensado para programar: colorea el código, avisa de errores y
   > te autocompleta. **VS Code** es gratis y el más usado del mundo.
   - Descárgalo de <https://code.visualstudio.com> e instálalo.

2. **Un navegador web** (ya tienes uno: Chrome, Firefox, Edge…). Te servirá para ver tus
   páginas y para abrir las "Herramientas de desarrollador" (lo veremos).

3. **Node.js** (para los módulos de JavaScript/TypeScript/React) — se instala desde
   <https://nodejs.org> (versión "LTS"). Lo explicaremos cuando toque.

4. **Python** (para el módulo de Python) — desde <https://python.org>. También lo explicaremos.

5. **Git** (para guardar versiones de tu trabajo) — lo verás en el Módulo 00.

> 💡 No instales todo de golpe. Cada módulo te dice **exactamente** qué necesitas y cómo
> instalarlo paso a paso. Instala solo cuando llegues ahí.

---

## 5. Ritmo sugerido

No hay prisa. Una buena meta es **un capítulo cada uno o dos días**, haciendo los ejercicios.
Es mejor avanzar despacio y entender, que correr y no quedarte con nada.

| Si tienes… | Haz esto |
|---|---|
| 20 minutos | Lee un concepto y haz su mini-ejercicio |
| 1 hora | Un capítulo completo con sus ejercicios |
| Un fin de semana | Un módulo corto entero (ej. HTML o CSS) |

---

## 6. Qué hacer cuando te atores

Te vas a atorar. Es normal y le pasa a todos. Orden recomendado:

1. **Relee el mensaje de error completo.** Casi siempre dice qué pasó y en qué línea.
2. **Compara con el ejemplo del manual**, carácter por carácter (un punto o una coma de más
   rompen el código).
3. **Busca el error en internet** copiando el mensaje. Suele haber miles que ya lo tuvieron.
4. **Pídele ayuda a la IA**, pero ahora con conocimiento: en vez de "no funciona", podrás
   decir *"tengo este error en esta línea, creo que es por esto, ¿es correcto?"*. Esa es
   exactamente la habilidad que este manual te da.

---

¡Listo! Empieza por **[Módulo 00 — Fundamentos](modulos/00-fundamentos/README.md)**.
