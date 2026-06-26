# Capítulo 04 — Formularios

> Un formulario es la forma en que tu página **recibe datos** del usuario: su nombre, su correo,
> un mensaje. Tu sitio ya tiene uno, el de contacto, que termina enviando la info a tu WhatsApp.
> En este capítulo vamos pieza por pieza y, de paso, verás ideas que volverán a aparecer cuando
> trabajemos con React (módulo 06).

---

## 1. El contenedor: `<form>`

> ### 🟦 ¿Qué significa? — *`<form>` (formulario)*
> La etiqueta `<form>` **agrupa** todos los campos que se mandan juntos. Tiene dos atributos que
> conviene tener claros:
> - `action` → **a dónde** van los datos (una URL que se encarga de procesarlos).
> - `method` → **cómo** viajan: casi siempre `post` (acuérdate de los métodos HTTP del Módulo 00:
>   `POST` significa "toma estos datos").
> ```html
> <form action="https://api.web3forms.com/submit" method="post">
>   …campos…
> </form>
> ```
> **¿Dónde se usa en tu proyecto?** Tu formulario de contacto manda los datos a **Web3Forms**,
> un servicio que recibe los envíos sin que tengas que montar un servidor propio, y de ahí, con
> ayuda de un Cloudflare Worker, te llega el aviso por WhatsApp.

---

## 2. Los campos: `<input>` y sus tipos

> ### 🟦 ¿Qué significa? — *`<input>` (campo de entrada)*
> `<input>` es el campo donde el usuario escribe o elige algo. Es un elemento "vacío", o sea que
> no se cierra. Lo curioso es su atributo `type`: según el valor que le pongas, **cambia por
> completo** lo que el campo hace:
> | `type` | Qué muestra |
> |---|---|
> | `text` | Una caja de texto normal |
> | `email` | Texto que **valida** que sea un correo (lleva @) |
> | `password` | Texto oculto con puntitos |
> | `tel` | Para teléfonos (en móvil abre el teclado numérico) |
> | `number` | Solo números |
> | `checkbox` | Una casilla para marcar |
> | `radio` | Botones de "elige uno" |
> | `date` | Un selector de fecha |
> | `submit` | El **botón** que envía el formulario |

> ### 🟦 ¿Qué significa? — *Atributos comunes de un input*
> - `name` → **el nombre del dato** que se envía. Es imprescindible: sin `name`, el dato no viaja.
> - `placeholder` → el texto gris de ejemplo que aparece dentro del campo ("tu@correo.com").
> - `required` → marca el campo como **obligatorio**; el navegador no deja enviar si está vacío.
> - `value` → un valor inicial.

Así se vería un campo de correo obligatorio:
```html
<input type="email" name="correo" placeholder="tu@correo.com" required>
```

---

## 3. Etiquetas de campo: `<label>` (no opcional)

> ### 🟦 ¿Qué significa? — *`<label>` (etiqueta de campo)*
> Un `<label>` es el **texto que describe** un campo: "Nombre", "Correo", etc. Se conecta con su
> `<input>` a través del atributo `for`, que apunta al `id` del input:
> ```html
> <label for="correo">Tu correo</label>
> <input type="email" id="correo" name="correo" required>
> ```
> **¿Por qué digo que no es opcional?** Por dos motivos concretos:
> 1. Al tocar el `<label>`, el cursor salta directo al campo (mucho más cómodo en móvil).
> 2. Los lectores de pantalla leen "Tu correo, campo de texto" en lugar de un campo mudo.
> Sin `<label>`, el formulario es inaccesible. Lo veremos con más calma en el capítulo 05.

---

## 4. Áreas de texto y botones

> ### 🟦 ¿Qué significa? — *`<textarea>` (área de texto)*
> Cuando el texto es largo, como un mensaje, no usamos `<input>` sino `<textarea>`. La diferencia
> es que `<textarea>` **sí** lleva etiqueta de cierre:
> ```html
> <label for="mensaje">Tu mensaje</label>
> <textarea id="mensaje" name="mensaje" rows="5"></textarea>
> ```

> ### 🟦 ¿Qué significa? — *El botón de envío*
> Para mandar el formulario tienes dos opciones: `<input type="submit" value="Enviar">` o, lo más
> moderno y flexible, `<button type="submit">Enviar</button>`. Al pulsarlo, el navegador junta
> todos los campos que tengan `name` y los manda a la `action` del `<form>`.

---

## 5. Un formulario de contacto completo

Si juntamos todas las piezas, queda un formulario parecido al de tu sitio:

```html
<form action="https://api.web3forms.com/submit" method="post">
  <label for="nombre">Nombre</label>
  <input type="text" id="nombre" name="nombre" required>

  <label for="correo">Correo</label>
  <input type="email" id="correo" name="correo" placeholder="tu@correo.com" required>

  <label for="mensaje">Mensaje</label>
  <textarea id="mensaje" name="mensaje" rows="5" required></textarea>

  <button type="submit">Enviar</button>
</form>
```

> ### 🟦 ¿Qué significa? — *Validación del lado del cliente*
> Cuando el navegador revisa, **antes de enviar**, que el correo tenga formato válido o que un
> campo `required` no esté vacío, eso es **validación del lado del cliente** (recuerda que
> "cliente" es el navegador, como viste en el Módulo 00). Es rápida y cómoda, pero **no alcanza
> por sí sola**: alguien con malas intenciones podría saltársela sin problema. Por eso los datos
> se vuelven a revisar en el **servidor**. De momento, basta con que sepas que existen esos dos
> niveles.

> ### ⚠️ Cuidado — El honeypot: una trampa para robots
> Los formularios reciben mucho spam de robots automáticos. Un truco habitual es meter un campo
> **oculto** que una persona nunca ve ni rellena, pero que un robot poco listo sí completa. Si ese
> campo llega lleno, sabes que fue un bot y descartas el envío. Esa técnica se llama *honeypot*
> ("tarro de miel"). Tu sitio la usa. No hace falta que la implementes todavía, pero quédate con
> el nombre.

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Sé qué hacen `action` y `method` en un `<form>`.
- [ ] Conozco los `type` de `<input>` más útiles (text, email, password, submit…).
- [ ] Uso `name` (para enviar el dato), `placeholder` y `required`.
- [ ] Siempre conecto un `<label for>` con el `id` de su campo.
- [ ] Uso `<textarea>` para textos largos y un `<button type="submit">` para enviar.
- [ ] Entiendo qué es la **validación del lado del cliente** y por qué no basta sola.

---

## 🧪 Ejercicios

1. **Elige el `type`.** ¿Qué `type` de input usarías para: la edad, la contraseña, aceptar los
   términos (sí/no), el correo, la fecha de nacimiento?
2. **Conecta label e input.** Escribe un campo "Teléfono" con su `<label>` correctamente
   enlazado por `for`/`id`, de tipo teléfono y obligatorio.
3. **Encuentra el error.** ¿Por qué este campo no enviará su dato?
   `<input type="text" id="ciudad" placeholder="Ciudad">` (pista: le falta algo importante).
4. **Cliente vs. servidor.** Explica por qué la validación del navegador es cómoda pero
   insuficiente, con un ejemplo de cómo alguien podría saltársela.
5. 💻 **Tu formulario.** Crea el formulario de contacto completo de la sección 5 dentro de una
   página. Pruébalo en el navegador: deja el correo vacío e intenta enviar; observa cómo el
   navegador te lo impide (esa es la validación del cliente en acción).

➡️ Siguiente: **[Capítulo 05 — Accesibilidad y buenas prácticas](05-accesibilidad.md)**.
