# Capítulo 06 — El sistema binario y hexadecimal

> En este capítulo vas a descubrir cómo cuenta una computadora por dentro. Te aseguro que no usa los diez dedos como nosotros: solo conoce dos estados, encendido y apagado. A partir de ahí construye **todo**: números, las letras de este texto, las fotos de tu galería y los colores de tu sitio web. Entender esto te quita el miedo a símbolos raros como `#1B6B6B` que aparecen en tu CSS, y te da una intuición que vas a usar durante toda tu vida como programador. Bit, nuestro ajolote pixelado, te acompaña: él, después de todo, está hecho de bits.

## 1. ¿Por qué una computadora solo cuenta con 0 y 1?

Imagina un interruptor de luz en la pared. Solo tiene dos posiciones: encendido o apagado. No hay un "medio encendido" estable y fácil de medir. Una computadora está hecha de millones (¡miles de millones!) de interruptores diminutos. Cada uno solo sabe estar en uno de dos estados.

Como solo hay dos estados posibles, decidimos representarlos con dos símbolos: **0** (apagado) y **1** (encendido). Eso es todo. No hay magia: la computadora es una montaña gigantesca de interruptores, y programar es, en el fondo, decidir cuáles se encienden y cuáles se apagan.

> ### 🟦 ¿Qué significa? — *Bit*
> Un **bit** es la unidad más pequeña de información en una computadora: un solo valor que solo puede ser **0** o **1** (apagado o encendido). El nombre viene del inglés *binary digit* (dígito binario). Sirve como el "ladrillo" mínimo con el que se construye absolutamente todo lo demás. Un bit solo no dice mucho; el poder aparece cuando juntamos muchos.

> ### 🟦 ¿Qué significa? — *Sistema binario*
> El **sistema binario** es la forma de contar usando solo dos símbolos: 0 y 1. Es "base 2". Nosotros, los humanos, usamos el sistema **decimal** ("base 10") con diez símbolos: 0, 1, 2, 3, 4, 5, 6, 7, 8 y 9, probablemente porque tenemos diez dedos. La computadora usa binario porque sus interruptores solo tienen dos posiciones.

> ### 💡 Tip — No te asustes con la palabra "base"
> "Base 10" solo significa "usamos 10 símbolos distintos". "Base 2" significa "usamos 2 símbolos distintos". El mecanismo de contar es el mismo en ambos; cambia cuántos símbolos tenemos antes de quedarnos sin ellos y tener que "llevar uno". Eso lo vemos enseguida.

## 2. Cómo contamos los humanos (para entender cómo cuenta la máquina)

Antes de entrar al binario, fijémonos en algo que hacemos sin pensar. Cuando contamos en decimal y llegamos al 9, nos quedamos sin símbolos. ¿Qué hacemos? Reiniciamos la primera posición a 0 y agregamos un 1 a la izquierda: pasamos de **9** a **10**. Volvemos a llenar hasta **19**, y entonces saltamos a **20**. Así hasta **99**, y luego **100**.

La clave es esta: cada posición vale diez veces más que la de su derecha. En el número **347**:

- el **7** está en la posición de las unidades (vale 7 × 1 = 7),
- el **4** está en la posición de las decenas (vale 4 × 10 = 40),
- el **3** está en la posición de las centenas (vale 3 × 100 = 300).

Sumando: 300 + 40 + 7 = 347. Lo hacías de niño sin darte cuenta de la mecánica.

El binario funciona **igualito**, pero como solo hay dos símbolos, cada posición vale **el doble** que la de su derecha, no diez veces más.

## 3. Contar en binario, paso a paso

En binario solo tenemos 0 y 1. Empecemos a contar desde cero, y observa qué pasa cuando nos quedamos sin símbolos (que ocurre rápido, porque solo hay dos):

| Número decimal | En binario |
|---|---|
| 0 | 0 |
| 1 | 1 |
| 2 | 10 |
| 3 | 11 |
| 4 | 100 |
| 5 | 101 |
| 6 | 110 |
| 7 | 111 |
| 8 | 1000 |

¿Ves el patrón? Cuando llegamos al 1 y queremos sumar uno más, no tenemos un "2", así que reiniciamos a 0 y llevamos uno a la izquierda: de `1` pasamos a `10` (que se lee "uno-cero", **no** "diez", y vale 2 en decimal). Es exactamente lo que hacíamos al pasar de 9 a 10 en decimal, solo que ocurre muchísimo más seguido.

> ### 💡 Tip — Léelo dígito por dígito
> El binario `101` no se lee "ciento uno". Se lee "uno, cero, uno". Decir "ciento uno" es mezclar decimal con binario y te confunde. Pronuncia cada cifra por separado.

### El truco de las posiciones (potencias de 2)

Cada posición en binario tiene un valor fijo. Empezando por la derecha: 1, 2, 4, 8, 16, 32, 64, 128... (cada una es el doble de la anterior). Para saber cuánto vale un número binario, sumas los valores de las posiciones donde hay un **1**.

Veamos `1101`:

```
Posición:    8   4   2   1
Bits:        1   1   0   1
```

Hay un 1 en las posiciones de 8, de 4 y de 1 (la de 2 tiene un 0, así que no cuenta). Sumamos: 8 + 4 + 0 + 1 = **13**. Listo: `1101` en binario es **13** en decimal.

> ### 🟦 ¿Qué significa? — *Byte*
> Un **byte** (se pronuncia "bait") es un grupo de **8 bits**. Con 8 bits puedes formar 256 combinaciones distintas (de `00000000` a `11111111`, es decir del 0 al 255). El byte es la unidad práctica con la que se mide casi todo en computación: un carácter de texto, el tamaño de un archivo (kilobytes, megabytes, gigabytes) y, como verás, cada componente de color. Tu disco `polypaw-nas` con "238 GB" usa esta misma escala: G de giga, B de bytes.

> ### 💡 Tip — De ahí salen los "256" y "255" que ves por todas partes
> Cuando veas números como 255, 256, 128, 1024 o 65535 en programación, casi siempre vienen de potencias de 2. No son arbitrarios: son "hasta dónde llega" cierta cantidad de bits. 8 bits llegan a 255; 16 bits llegan a 65535. Reconocer estos números es señal de que ya estás pensando como la máquina.

## 4. Cómo se guarda un número, una letra y un texto

Ya sabemos que un grupo de bits puede representar un número. ¿Pero cómo guarda la computadora una letra como la **A**, si solo sabe de 0 y 1?

La respuesta es un acuerdo: una **tabla** que dice "tal número representa tal carácter". El acuerdo histórico más famoso se llama **ASCII**.

> ### 🟦 ¿Qué significa? — *ASCII*
> **ASCII** (se lee "aski") es una tabla creada en los años 60 que asigna un número a cada carácter del inglés. Por ejemplo: la **A** mayúscula es el número 65, la **B** es 66, la **a** minúscula es 97, el espacio es 32 y el dígito **0** (como carácter de texto) es 48. Como esos números caben en un byte, cada carácter ocupa exactamente un byte. Sirvió para que computadoras distintas se entendieran al intercambiar texto.

Así, la palabra **Bit** se guarda como tres números (66, 105, 116), y cada uno como un patrón de 8 bits encendidos y apagados. La pantalla, al leer el 66, sabe que debe dibujar una "B".

El problema de ASCII es que solo pensó en inglés. No tiene **ñ**, ni **á**, ni emojis, ni caracteres del chino o del árabe. Por eso se inventó algo más grande.

> ### 🟦 ¿Qué significa? — *Unicode (y UTF-8)*
> **Unicode** es una tabla gigante y moderna que le asigna un número único a **cada** carácter de **todos** los idiomas del mundo, más símbolos y emojis (¡el ajolote 🦎 incluido!). **UTF-8** es la forma más común de guardar esos caracteres en bytes; tiene la gran ventaja de ser compatible con ASCII para las letras básicas. Sirve para que tu texto en español, con sus "ñ" y tildes, se vea igual en cualquier dispositivo del planeta.

> ### 🔎 En tu código
> En tu proyecto **tunal-digital**, el archivo `sitio-web/index.html` probablemente empieza con una línea como `<meta charset="UTF-8">`. Esa etiqueta le dice al navegador: "este texto está guardado en UTF-8, interprétalo así". Gracias a ella, palabras como "diseño" o "información" se muestran correctas y no como símbolos rotos (`dise�o`). Si alguna vez ves caracteres raros en una web, casi siempre es un problema de codificación de caracteres.

> ### ⚠️ Cuidado — "Número" y "carácter" no son lo mismo
> El número **5** (la cantidad) y el carácter **"5"** (el símbolo que se imprime) se guardan distinto. La cantidad cinco es el binario `101`; el carácter "5" es, en ASCII, el número **53**. Por eso en programación a veces hay que "convertir" un texto a número antes de hacer cuentas. En tu app **RachaSimple** (React + TypeScript), si lees `"7"` de un campo de texto y quieres sumarlo, primero debes transformarlo en el número 7; si no, `"7" + 1` podría darte `"71"` en vez de `8`. Lo verás más adelante con los tipos de datos.

## 5. Los colores también son números

Aquí es donde todo conecta con lo que ya tocas en tus proyectos. Las pantallas forman cada color mezclando tres luces: **R**ojo, **V**erde y **A**zul (en inglés RGB: *Red, Green, Blue*). Es como tener tres focos de colores y subirles o bajarles la intensidad.

> ### 🟦 ¿Qué significa? — *RGB*
> **RGB** son las iniciales en inglés de **R**ed, **G**reen, **B**lue (rojo, verde, azul). Es el modelo que usan las pantallas para formar cualquier color combinando esas tres luces. A cada una le das una intensidad de 0 a 255 (un byte). Por eso un color es, en el fondo, **tres números**. Es un modelo "aditivo": partes del negro (todo apagado) y vas sumando luz hasta llegar al blanco (todo a tope).

¿Cuánta intensidad puede tener cada foco? Un valor de **0 a 255**. ¿Y por qué justo 255? Porque cada componente usa **un byte** (8 bits), y ya vimos que un byte llega hasta 255. Todo encaja:

- Rojo a tope, verde y azul apagados → rojo puro: (255, 0, 0).
- Los tres apagados → negro: (0, 0, 0).
- Los tres a tope → blanco: (255, 255, 255).

Mezclando las tres intensidades obtienes alrededor de 16,7 millones de colores. Es decir: un color es solo **tres números**, y cada número es solo **un byte**.

## 6. El sistema hexadecimal: escribir bytes de forma corta

Escribir colores como (27, 107, 107) funciona, pero los programadores querían algo más compacto y que se alineara perfecto con los bytes. Ahí entra el **hexadecimal**.

> ### 🟦 ¿Qué significa? — *Sistema hexadecimal (hex)*
> El **sistema hexadecimal** es contar en "base 16": usa dieciséis símbolos. Como solo tenemos diez dígitos (0–9), se piden prestadas seis letras para los que faltan: **A=10, B=11, C=12, D=13, E=14, F=15**. Así, después del 9 viene A, luego B... hasta F, y entonces se "lleva uno" (la F va seguida de 10, que en hex vale dieciséis). Sirve para escribir valores de bytes de forma corta y ordenada.

¿Por qué hexadecimal y no otra base? Por una coincidencia preciosa: **dos dígitos hexadecimales representan exactamente un byte** (un número de 0 a 255). Ni más ni menos. Un dígito hex equivale a 4 bits, así que dos dígitos = 8 bits = 1 byte. Por eso encaja como anillo al dedo con los colores.

Mira la correspondencia:

| Decimal | Hex |
|---|---|
| 0 | 0 |
| 9 | 9 |
| 10 | A |
| 15 | F |
| 16 | 10 |
| 255 | FF |

El valor más grande de un byte, 255, se escribe `FF` en hex (la F vale 15: 15×16 + 15 = 255). Lo más bajo, 0, es `00`. Compacto y predecible.

> ### 💡 Tip — Cómo leer un par hexadecimal
> Para convertir un par hex a decimal: el primer dígito vale "su valor × 16", y le sumas el segundo. Por ejemplo `1B`: la **1** vale 1×16 = 16; la **B** vale 11. Total: 16 + 11 = **27**. No necesitas hacerlo mentalmente cada vez (las herramientas lo hacen por ti), pero entender el mecanismo te da intuición.

## 7. Por qué los colores CSS usan hex: el caso de tunal-digital

> ### 🟦 ¿Qué significa? — *CSS*
> **CSS** (del inglés *Cascading Style Sheets*, "hojas de estilo en cascada") es el lenguaje con el que se le da **aspecto** a una página web: colores, tamaños, tipos de letra, espacios y posiciones. Si el HTML es el "esqueleto" del contenido, el CSS es la "ropa y el maquillaje". Los archivos `.css`, como `styles.css` en **tunal-digital**, contienen estas reglas de estilo, y ahí es donde escribes los colores en hexadecimal.

Ahora sí, lleguemos a ese `#1B6B6B` que aparece en tu `styles.css`. Un color en CSS escrito en hexadecimal tiene esta forma:

```
#RRGGBB
```

Es decir, la almohadilla `#` seguida de **tres pares** de dígitos hex: el primer par es el Rojo, el segundo el Verde y el tercero el Azul. Cada par es un byte (0 a 255). Descifremos el color de tu marca:

> ### 🔎 En tu código
> En **tunal-digital**, dentro de `sitio-web/styles.css`, usas el color `#1B6B6B`. Vamos a traducirlo:
> - **1B** (rojo) = 1×16 + 11 = **27**
> - **6B** (verde) = 6×16 + 11 = **107**
> - **6B** (azul) = 6×16 + 11 = **107**
>
> O sea, en RGB es **(27, 107, 107)**: poco rojo y cantidades iguales y medias de verde y azul. Eso da un **verde azulado oscuro** (un tono "teal"), perfecto para una identidad sobria y profesional. ¡Ahora ya no es un símbolo misterioso: sabes exactamente qué luces está pidiendo a la pantalla!

```css
/* Un fragmento como el de tu styles.css */
:root {
  --color-marca: #1B6B6B;   /* rojo 27, verde 107, azul 107 → teal oscuro */
  --color-fondo: #FFFFFF;   /* 255,255,255 → blanco puro */
  --color-texto: #000000;   /* 0,0,0 → negro */
}
```

> ### 💡 Tip — El atajo de 3 dígitos
> A veces verás colores de solo 3 dígitos, como `#FFF` o `#1B6`. Es una abreviatura: CSS duplica cada dígito. `#FFF` equivale a `#FFFFFF` (blanco) y `#F00` a `#FF0000` (rojo puro). Útil cuando los pares tienen dígitos repetidos.

> ### ⚠️ Cuidado — Hex no es solo para colores
> El hexadecimal aparece en muchos otros sitios: direcciones de memoria, identificadores, códigos de error, claves. En tu app **PolyPaw** (Python + Flet), si guardas o muestras ciertos identificadores, podrías toparte con cadenas hex largas. Y un emoji como 🦎 tiene un "punto de código" Unicode que suele escribirse en hex (`U+1F98E`). Reconocer "esto es hexadecimal" ya es media batalla ganada.

## 8. ¿Y para qué me sirve saber todo esto en la práctica?

Quizá pienses: "las herramientas convierten por mí, ¿para qué memorizar tablas?". Tienes razón en algo: **no** debes memorizar conversiones. Pero entender el concepto te da superpoderes cotidianos:

- **Eliges colores con criterio.** Sabes que `#000000` es negro y `#FFFFFF` blanco, que subir los números aclara y bajarlos oscurece. En tunal-digital puedes ajustar un tono a mano sin adivinar.
- **Entiendes los tamaños.** Cuando tu `polypaw-nas` dice "8 GB de RAM" o "954 GB de disco", sabes que B es bytes y que todo se mide en potencias de 2.
- **Diagnosticas texto roto.** Si una página muestra `Ã±` en lugar de `ñ`, sospechas de un problema de codificación (UTF-8 mal configurado), como el `<meta charset>` de tu HTML.
- **Lees mensajes técnicos sin pánico.** Códigos de error, hashes, tokens... muchos están en hex, y ya no te parecen jeroglíficos.

> ### 🔎 En tu código
> En **Faro** (carpeta `Organizer`, Next.js + TypeScript), cuando tu backend en `src/app/api` maneje tokens, identificadores de Supabase o respuestas de la API de OpenAI, verás cadenas largas de letras y números. Buena parte usa hexadecimal o codificaciones derivadas de bytes. No tienes que descifrarlas a mano, pero saber "esto representa bytes en hex" te ayuda a no confundir un identificador con texto legible.

> ### 💡 Tip — Una calculadora siempre a mano
> En tu computadora, la app **Calculadora** suele tener un "modo programador" que convierte entre decimal, binario y hexadecimal con un clic. Es perfecta para comprobar tus conversiones mientras aprendes. Bit la usa todo el tiempo; no es trampa, es ser práctico.

## 9. Resumen visual de las tres "capas"

Para que quede grabado, así se conecta todo, de lo más pequeño a lo más cercano a ti:

```
BITS (0 y 1)  →  agrupados en BYTES (8 bits, hasta 255)
   ↓
Un byte puede ser:
   • un número (101 binario = 5)
   • una letra  (65 = 'A' en ASCII / Unicode)
   • una intensidad de color (255 = foco al máximo)
   ↓
HEXADECIMAL escribe cada byte en 2 dígitos cortos (FF = 255)
   ↓
#1B6B6B = tres bytes = rojo 27, verde 107, azul 107 = el teal de tunal-digital
```

Todo lo que ves en una pantalla —este texto, los botones de RachaSimple, los colores de tunal-digital, las imágenes de PolyPaw— nace de ese baile de interruptores en 0 y 1.

## ✅ Checklist — ¿ya domino esto?

- [ ] Entiendo por qué la computadora solo usa 0 y 1 (interruptores encendido/apagado).
- [ ] Sé qué es un **bit** y qué es un **byte** (8 bits, hasta 255).
- [ ] Puedo convertir un número binario pequeño a decimal sumando las posiciones (1, 2, 4, 8...).
- [ ] Entiendo que el texto se guarda con tablas como ASCII y Unicode/UTF-8.
- [ ] Sé que un color es tres números (RGB), cada uno de 0 a 255.
- [ ] Entiendo qué es el **hexadecimal** y por qué dos dígitos hex = un byte.
- [ ] Puedo leer un color CSS como `#1B6B6B` y decir aproximadamente qué color es.
- [ ] Reconozco que `#FFFFFF` es blanco y `#000000` es negro.

## 🧪 Ejercicios

1. Convierte a decimal estos números binarios, sumando los valores de posición (1, 2, 4, 8): `10`, `110`, `1010`. (Pista: la respuesta del último es 10.)

2. Sin computadora, di qué color crees que es `#FF0000` y cuál es `#000000`. Explica con tus palabras qué significan los tres pares de dígitos.

3. 💻 Abre la app **Calculadora** de tu sistema en "modo programador". Escribe el número 255 en decimal y observa cómo se ve en binario y en hexadecimal. Anota los tres valores.

4. 💻 En el archivo `sitio-web/styles.css` de **tunal-digital**, busca un color en hex distinto de `#1B6B6B`. Usa la pista del Tip (primer dígito × 16 + segundo) para calcular a mano el valor de su componente rojo (los dos primeros dígitos). Comprueba con la calculadora.

5. 💻 Usa cualquier buscador de "selector de color hex" en línea (o las herramientas de tu navegador). Escribe `#1B6B6B`, mira el color que aparece y confirma que sus valores RGB son (27, 107, 107).

6. Escribe tu nombre y cuenta cuántas letras tiene. Como cada letra ocupa **un byte** en ASCII básico, ¿cuántos bytes ocupa tu nombre? (Ojo: si tu nombre lleva tildes o "ñ", en UTF-8 esas letras pueden ocupar **dos** bytes; piensa por qué.)
