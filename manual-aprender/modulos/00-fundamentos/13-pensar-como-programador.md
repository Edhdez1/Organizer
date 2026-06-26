# Capítulo 13 — Pensar como programador

<p align="center">
  <img src="../../recursos/imagenes/00-fundamentos/cap13.png" alt="Ilustración del capítulo (pixel art con Bit)" width="640">
</p>


> Aquí no vas a aprender un lenguaje nuevo. Vas a aprender la **forma de pensar** que está debajo de todos ellos. Partir un problema en pasos, escribir el plan con palabras antes de tocar el teclado, distinguir los datos de las decisiones y de las repeticiones, leer un mensaje de error sin que te tiemble el pulso, cazar el bug poco a poco, pedir ayuda de manera que de verdad te respondan y, sobre todo, dar órdenes precisas a una IA. Esta es la habilidad que le da sentido a todo lo demás. Bit, nuestro ajolote, lo compara con aprender a caminar antes de correr: pesado al principio, imprescindible siempre.

## 1. ¿Qué es "pensar como programador"?

Mucha gente cree que programar es memorizar comandos raros. No lo es. Programar es, ante todo, **resolver problemas con pasos tan claros que una máquina pueda seguirlos sin equivocarse ni inventarse nada**. La computadora no entiende intenciones; entiende instrucciones exactas y poco más.

> ### 🟦 ¿Qué significa? — *Algoritmo*
> Un algoritmo es una lista de pasos ordenados que resuelve un problema o cumple una tarea. No tiene por qué estar en ningún lenguaje de programación: una receta de cocina o las instrucciones para armar un mueble también son algoritmos. Te sirve para describir *qué hay que hacer* antes de pelearte con *cómo escribirlo* en código.

Pensar como programador es, en el fondo, tener cuatro reflejos:

1. **Descomponer**: partir un problema grande en problemas pequeños.
2. **Reconocer patrones**: ver lo que se parece a algo que ya resolviste.
3. **Abstraer**: quedarte con lo importante e ignorar el ruido.
4. **Diseñar un algoritmo**: escribir los pasos antes de programarlos.

> ### 💡 Tip — El código es el último paso
> Antes de escribir una sola línea, hazte una pregunta: "¿Sabría explicarle esto a una persona, paso por paso, sin saltarme nada?". Si la respuesta es no, todavía no estás listo para programar. Estás listo para *pensar* un rato más.

## 2. Descomponer un problema en pasos

Imagina que en tu app de hábitos **RachaSimple** quieres una función nueva: "marcar un hábito como completado hoy". Suena pequeño, pero esconde varios pasos. Descomponer es justo eso, sacarlos a la luz:

1. Saber **qué** hábito se está marcando (su identificador).
2. Saber **qué día** es hoy.
3. Comprobar si ese hábito **ya** estaba marcado hoy (para no contarlo dos veces).
4. Guardar la marca en la base de datos.
5. Volver a calcular la **racha** (cuántos días seguidos lleva).
6. Mostrar el cambio en la pantalla.

Fíjate: un "simple botón" esconde seis decisiones. Y eso es lo normal. Quien no descompone se atasca; quien descompone avanza, paso a paso.

> ### 🔎 En tu código
> En **RachaSimple** esos pasos se reparten entre carpetas: la pantalla y el botón viven en `src/components`, la lógica de "qué pasa al marcar" suele estar en `src/hooks`, y la conversación con la base de datos en `src/repositories`. Descomponer también es decidir *dónde* va cada pieza.

> ### 💡 Tip — La regla del "y luego"
> Cuenta tu problema en voz alta usando "y luego". "El usuario toca el botón, *y luego* miro qué hábito es, *y luego* reviso si ya estaba marcado...". Cada "y luego" es, casi siempre, un paso de tu algoritmo.

## 3. Pseudocódigo: el plan antes del código

El pseudocódigo es el puente entre tu cabeza y el lenguaje de programación.

> ### 🟦 ¿Qué significa? — *Pseudocódigo*
> Es escribir los pasos de tu algoritmo en lenguaje casi humano, pero con la estructura de un programa (decisiones, repeticiones, datos). No se ejecuta en ninguna máquina; sirve para *pensar con orden* y para cazar errores de lógica antes de escribir código de verdad. La palabra significa "casi-código".

Volvamos al ejemplo de marcar un hábito en **RachaSimple**, ahora en pseudocódigo:

```text
FUNCIÓN marcarHabito(idHabito):
    hoy = fecha de hoy
    SI el hábito idHabito ya está marcado en hoy:
        avisar "ya lo marcaste" y terminar
    SINO:
        guardar marca (idHabito, hoy)
        racha = contar días seguidos marcados
        mostrar nueva racha en pantalla
    FIN SI
FIN FUNCIÓN
```

No es JavaScript, no es Python, no es de nadie. Pero cualquiera que sepa programar podría pasarlo a su lenguaje. Ahí está la gracia: **el pseudocódigo separa la lógica del idioma**.

Otro ejemplo, esta vez de **PolyPaw**, tu app educativa en Python. Quieres elegir una misión al azar de las que el niño todavía no ha completado:

```text
FUNCIÓN elegirMision(misionesDisponibles, misionesHechas):
    pendientes = lista vacía
    PARA CADA mision EN misionesDisponibles:
        SI mision NO está en misionesHechas:
            agregar mision a pendientes
    SI pendientes está vacía:
        devolver "no hay misiones nuevas"
    SINO:
        devolver una mision al azar de pendientes
```

> ### 🔎 En tu código
> En **PolyPaw** las misiones viven en archivos `missions/*.json` y el progreso del niño en `polypaw_db.json`. El pseudocódigo de arriba describe, sin tecnicismos, cómo `main.py` decidiría qué misión mostrar. Primero el plan; luego lo traduces a Python.

> ### ⚠️ Cuidado — No saltes este paso "porque es obvio"
> Los problemas que parecen obvios son los que más bugs esconden. Escribir cuatro líneas de pseudocódigo te cuesta dos minutos y te ahorra una hora de líos. Bit ha visto a mucha gente atascarse por fiarse de más de su memoria.

## 4. Las tres piezas de todo programa: datos, decisiones y repeticiones

Casi cualquier programa del mundo se arma con tres ingredientes. Saber reconocerlos es como tener rayos X para leer cualquier código.

### 4.1 Datos

> ### 🟦 ¿Qué significa? — *Dato / Variable*
> Un **dato** es una pieza de información que tu programa guarda y usa: un nombre, un número, una fecha, una lista. Una **variable** es una caja con etiqueta donde guardas un dato para reutilizarlo después. Si escribes `racha = 5`, "racha" es la variable y "5" es el dato.

En **RachaSimple**, los datos son cosas como el nombre del hábito, la fecha de hoy, el número de la racha o si está completado o no.

> ### 🔎 En tu código
> En **RachaSimple** la forma exacta de tus datos está descrita en `src/types/database.ts`. Ese archivo es como el plano de qué información existe: qué es un hábito y qué campos tiene. Cuando dudes "¿qué datos manejo?", ese archivo te responde.

### 4.2 Decisiones

> ### 🟦 ¿Qué significa? — *Condicional (decisión)*
> Es cuando el programa elige entre caminos según una condición: "**SI** pasa esto, haz aquello; **SINO**, haz lo otro". En casi todos los lenguajes se escribe con la palabra `if` (que en inglés significa "si"). Sirve para que tu programa reaccione distinto según la situación.

```python
if racha >= 7:
    mensaje = "Una semana entera. Increible."
else:
    mensaje = "Sigue asi."
```

### 4.3 Repeticiones

> ### 🟦 ¿Qué significa? — *Bucle (repetición)*
> Es cuando el programa repite los mismos pasos varias veces, normalmente recorriendo una lista. En inglés se usa `for` ("para cada") o `while` ("mientras"). Sirve para no escribir lo mismo cien veces: escribes el paso una vez y le dices "repítelo para cada elemento".

```python
for mision in misiones_disponibles:
    print(mision["titulo"])
```

> ### 💡 Tip — El juego de los tres colores
> Toma cualquier trozo de código (tuyo o ajeno) y subraya mentalmente: datos en azul, decisiones (`if`) en verde, repeticiones (`for`/`while`) en naranja. Verás que casi todo cae en uno de los tres. Reconocer la estructura ya es media batalla ganada.

> ### 🔎 En tu código
> En el backend de **tunal-digital** (`backend/worker.js`), un Cloudflare Worker que habla con la API de Claude, están los tres ingredientes: **datos** (el mensaje que envía el visitante), una **decisión** (¿la petición es válida o respondo con error?) y a veces una **repetición** (recorrer una lista de mensajes). Mismos tres ladrillos, otro proyecto.

## 5. Leer y entender un mensaje de error

Un error no es un castigo: es la computadora **echándote una mano** para encontrar dónde se rompió algo. Aprender a leerlos es una superhabilidad.

> ### 🟦 ¿Qué significa? — *Error / Excepción*
> Un error (o "excepción") es un aviso de que el programa no pudo seguir porque algo no cuadró: un archivo que no existe, una variable mal escrita, un número donde esperabas texto. El mensaje suele decir **qué** pasó, **dónde** (archivo y línea) y a veces **por qué**.

Mira este error típico de **PolyPaw** (Python):

```text
Traceback (most recent call last):
  File "main.py", line 42, in cargar_mision
    titulo = mision["titulo"]
KeyError: 'titulo'
```

Vamos a leerlo de abajo hacia arriba, que es como se entiende más rápido:

- **`KeyError: 'titulo'`** → el tipo de error: buscaste una clave llamada `titulo` que no existe.
- **`File "main.py", line 42`** → dónde ocurrió: archivo `main.py`, línea 42.
- **`in cargar_mision`** → dentro de qué función.

Conclusión: una misión de tus `missions/*.json` no tiene el campo `titulo`, o lo escribiste distinto (`Titulo`, `title`). Sin entrar en pánico, el propio error ya te llevó casi de la mano hasta el problema.

Ahora uno de **RachaSimple** (TypeScript/React):

```text
TypeError: Cannot read properties of undefined (reading 'nombre')
    at HabitCard (src/components/HabitCard.tsx:18:30)
```

Traducción: en `src/components/HabitCard.tsx`, línea 18, intentaste leer `.nombre` de algo que era `undefined` (no existía). Lo más probable es que un hábito llegara vacío. El error te da archivo y línea exactos. Es un mapa, no un regaño.

> ### ⚠️ Cuidado — No leas solo la primera línea roja
> Mucha gente ve rojo y cierra la terminal. El detalle útil casi siempre está en el **nombre del error** y en la **línea de TU archivo** (no la de las librerías). Busca el nombre de tu archivo en el mensaje: ahí empieza la pista.

> ### 💡 Tip — Copia el error completo, no lo cuentes con tus palabras
> Cuando guardes un error para buscarlo o preguntarlo, copia el texto literal. "Me sale algo de undefined" no sirve; `TypeError: Cannot read properties of undefined (reading 'nombre')` sí.

## 6. Depurar paso a paso

Depurar es encontrar y arreglar errores. La palabra viene de "debug", quitar el bicho, el *bug*.

> ### 🟦 ¿Qué significa? — *Bug y depurar (debug)*
> Un **bug** es un fallo en el programa: hace algo distinto de lo que querías. **Depurar** es el proceso de averiguar por qué ocurre y corregirlo. No es magia: es un método ordenado de ir descartando sospechosos.

### El método de los cuatro pasos

1. **Reproduce el error.** Asegúrate de que puedes hacer que falle a voluntad. Un bug que no puedes reproducir es casi imposible de arreglar.
2. **Aísla.** ¿En qué momento exacto se rompe? ¿Antes de guardar en la base de datos o después? Divide el problema a la mitad y comprueba cada mitad.
3. **Inspecciona.** Mira el valor real de tus datos en ese punto. La herramienta más simple y poderosa es imprimir valores:

```python
print("DEBUG: la mision vale ->", mision)
```

En JavaScript/TypeScript (tunal-digital, RachaSimple, Faro) sería:

```javascript
console.log("DEBUG: el habito vale ->", habito);
```

4. **Corrige una cosa y vuelve a probar.** No cambies cinco cosas a la vez: si funciona, no sabrás cuál lo arregló; si falla, no sabrás cuál lo empeoró.

> ### 🟦 ¿Qué significa? — *`print` / `console.log`*
> Son instrucciones que muestran un valor en la pantalla o en la consola mientras el programa corre. `print` se usa en Python (PolyPaw); `console.log` en JavaScript y TypeScript (tunal-digital, RachaSimple, Faro). Sirven para "espiar" qué valen tus datos en un punto concreto y entender por qué algo falla.

> ### 🔎 En tu código
> En **Faro** (carpeta Organizer, Next.js + OpenAI), cuando una llamada a la IA devuelva algo raro, un `console.log` justo después de recibir la respuesta de OpenAI, dentro de `src/app/api`, te muestra exactamente qué llegó. Casi siempre el bug está en que lo recibido no tenía la forma que esperabas.

> ### 💡 Tip — El patito de goma
> Hay una técnica real y famosa: explícale tu bug en voz alta a un objeto (un patito, una taza... o a Bit). Al obligarte a contar el problema paso a paso, tu cerebro encuentra la falla solo. Suena raro; funciona muchísimo.

> ### ⚠️ Cuidado — "No cambié nada y dejó de funcionar"
> Casi siempre **sí** cambió algo: una actualización, un dato distinto, un archivo movido. En lugar de pelearte con esa frase, pregúntate "¿qué fue lo último que toqué?" y empieza por ahí.

## 7. Buscar ayuda eficazmente

Pedir ayuda no es trampa; es parte del oficio. Pero hay formas que funcionan y formas que no.

### Antes de preguntar

- Lee el error completo (sección 5).
- Intenta reproducirlo y aislarlo (sección 6).
- Busca el **texto literal del error** en internet. Suele ser lo más rápido.

### Cómo escribir una buena pregunta

Una buena pregunta tiene cuatro partes:

1. **Qué intentabas hacer** ("marcar un hábito como completado en RachaSimple").
2. **Qué hiciste** (el trozo de código relevante, no todo el proyecto).
3. **Qué esperabas** que pasara.
4. **Qué pasó en realidad** (el mensaje de error literal).

> ### 💡 Tip — El ejemplo mínimo
> Reduce tu problema al trozo más pequeño que aún falla. Si consigues reproducir el bug en 10 líneas en vez de 500, la mitad de las veces lo resolverás tú mismo *mientras* lo recortas. A esto se le llama "ejemplo reproducible mínimo".

> ### ⚠️ Cuidado — Nunca pegues tus secretos
> Al pedir ayuda (en un foro o a una IA), borra claves, tokens y contraseñas. En tus proyectos eso incluye la clave de la API de Claude en **tunal-digital**, las credenciales de Supabase en **RachaSimple** y **Faro**, o la clave de OpenAI en **Faro**. Esas viven en variables de entorno precisamente para no exponerlas. Si las pegas en internet, dalas por comprometidas.

## 8. Cómo dar órdenes precisas a una IA

Este es el objetivo del manual, así que vamos con calma. Una IA como Claude es muy capaz, pero **no adivina lo que tienes en la cabeza**. Hace lo que le dices, no lo que querías decir. Y pensar como programador es justo lo que te vuelve bueno pidiéndole cosas.

> ### 🟦 ¿Qué significa? — *Prompt*
> Un prompt es el mensaje o la instrucción que le das a una IA para que haga algo. Un buen prompt es claro, da contexto y dice exactamente qué quieres de salida. Pedirle bien a una IA es una habilidad tan real como escribir código.

### Las cinco partes de una buena orden a la IA

1. **Contexto**: en qué proyecto y *stack* estás (el **stack** es el conjunto de tecnologías que usa tu proyecto: lenguaje, framework, base de datos; por ejemplo "React + TypeScript + Supabase").
2. **Objetivo**: qué quieres lograr, concreto.
3. **Restricciones**: qué NO debe hacer, qué tecnología usar.
4. **Formato de salida**: ¿código?, ¿explicación?, ¿pasos?
5. **Datos**: el código, error o archivo relevante.

Compara estas dos peticiones:

```text
❌ Vago:
"Haz que funcione el botón de hábitos."
```

```text
✅ Preciso:
"En RachaSimple (React 18 + TypeScript + Vite + Supabase), tengo un
componente en src/components/HabitCard.tsx. Quiero una función que,
al pulsar el botón, marque el hábito como completado hoy en Supabase
y recalcule la racha. Restricción: la lógica de datos debe ir en
src/repositories, no en el componente. Devuélveme solo el código de
la función con comentarios en español. Aquí está mi tipo de hábito:
[pegas el fragmento de src/types/database.ts]"
```

La segunda funciona porque **descompusiste el problema antes de pedir** (secciones 2 y 3), nombraste tus datos (sección 4) y diste contexto real. Pensar como programador es lo que te permite escribir el prompt de la derecha.

> ### 💡 Tip — Pide el plan antes del código
> Una técnica poderosa: "Antes de escribir código, dame el pseudocódigo de los pasos y espera mi visto bueno." Así revisas la *lógica* antes de recibir 80 líneas. Si el plan está mal, el código saldría mal igual.

> ### 💡 Tip — Dale el error literal a la IA
> Igual que con una persona, pega el mensaje de error completo, con archivo y línea. "Tengo este `KeyError: 'titulo'` en main.py línea 42, aquí está la función y aquí un ejemplo de mi JSON de misión. ¿Por qué falla?". Con eso, la IA acierta muchísimo más.

> ### ⚠️ Cuidado — Revisa, no copies a ciegas
> La IA se equivoca, inventa funciones que no existen o da por hechas cosas de tu proyecto que no son ciertas. Tú eres quien manda. Lee lo que te da, entiéndelo (para eso es este manual) y pruébalo antes de confiar. Una IA que programa por ti sin que entiendas nada te deja indefenso el día que algo falla.

> ### 🔎 En tu código
> Hasta para administrar tu **polypaw-nas** (Ubuntu Server, Samba, Docker/Podman, Cockpit) aplica lo mismo: si le pides ayuda a una IA con un servicio que no arranca, dile la versión exacta del sistema (Ubuntu Server 26.04), qué servicio falla (`smbd` de Samba, por ejemplo) y pega el mensaje de error literal del log. Contexto preciso, respuesta precisa.

## 9. Juntándolo todo: un ejemplo completo

Pongamos en marcha los siete reflejos en un mini-caso de **tunal-digital**. Objetivo: "cuando el visitante envía un mensaje en el sitio, el backend debe pedir una respuesta a la API de Claude y devolverla; si el mensaje está vacío, no llamar a la IA".

**Paso 1 — Descomponer:**

1. Recibir el mensaje del visitante.
2. Comprobar que no esté vacío.
3. Si está vacío, responder con un error amable.
4. Si tiene texto, llamar a la API de Claude.
5. Devolver la respuesta al sitio.

**Paso 2 — Pseudocódigo:**

```text
FUNCIÓN responder(peticion):
    mensaje = texto del visitante en peticion
    SI mensaje está vacío:
        devolver error "escribe algo primero"
    respuesta = pedir a la API de Claude una contestación a mensaje
    devolver respuesta
```

**Paso 3 — Identificar piezas:** el **dato** es `mensaje`; la **decisión** es el `SI mensaje está vacío`; aquí no hay repetición, y eso también es información útil.

**Paso 4 — Traducir a código** (esto vive en `backend/worker.js`) y **probar**. Si falla, lees el error (sección 5), pones un `console.log` para ver qué llegó (sección 6), y si te atascas, preparas una pregunta con contexto o un prompt preciso para la IA (secciones 7 y 8).

¿Ves? No usamos ningún truco mágico. Usamos **método**. Eso es pensar como programador.

## ✅ Checklist — ¿ya domino esto?

- [ ] Sé descomponer una tarea grande en pasos pequeños usando la regla del "y luego".
- [ ] Puedo escribir pseudocódigo de un problema antes de programarlo.
- [ ] Distingo en un código los **datos**, las **decisiones** (`if`) y las **repeticiones** (`for`/`while`).
- [ ] Leo un mensaje de error e identifico el **tipo**, el **archivo** y la **línea**.
- [ ] Conozco el método de depurar: reproducir, aislar, inspeccionar con `print`/`console.log`, corregir una cosa a la vez.
- [ ] Sé preparar una buena pregunta: qué intentaba, qué hice, qué esperaba, qué pasó.
- [ ] Sé escribir un prompt preciso a una IA con contexto, objetivo, restricciones, formato y datos.
- [ ] Nunca pego claves ni tokens al pedir ayuda.

## 🧪 Ejercicios

1. **Descomponer (papel).** Escribe, en lenguaje normal y con "y luego", todos los pasos para "preparar un café". Apunta a tener al menos 8 pasos. Luego subraya dónde hay una **decisión** (por ejemplo: ¿con azúcar o sin azúcar?).

2. **Pseudocódigo (papel).** Escribe el pseudocódigo de una función `saludo(hora)` que diga "Buenos días" si la hora es menor que 12, "Buenas tardes" si es menor que 19, y "Buenas noches" en otro caso. Marca cuál es el **dato** y cuáles son las **decisiones**.

3. **💻 Cazar las tres piezas.** Abre `main.py` de **PolyPaw** (o `backend/worker.js` de **tunal-digital**). Encuentra y anota: un dato (variable), una decisión (`if`) y, si existe, una repetición (`for`/`while`). Si no hay repetición, escríbelo: detectar su ausencia también cuenta.

4. **💻 Leer un error a propósito.** En un archivo Python nuevo escribe `datos = {}` y luego `print(datos["nombre"])`. Ejecútalo, lee el `KeyError` completo e identifica en voz alta: tipo de error, archivo y línea. Después arréglalo para que no falle.

5. **💻 Depurar con prints.** Toma cualquier función tuya y mete dos `print`/`console.log` que muestren un valor *antes* y *después* de un cálculo. Ejecútala y comprueba si los valores son los que esperabas. Anota una cosa que te haya sorprendido.

6. **Escribir el prompt perfecto (papel).** Imagina que quieres pedirle a una IA una nueva función para **Faro** que reciba un proyecto y devuelva su progreso en %. Escribe el prompt usando las cinco partes (contexto, objetivo, restricciones, formato de salida, datos). Incluye el stack real (Next.js 15, TypeScript, Supabase, OpenAI) y di que el plan vaya primero en pseudocódigo.
