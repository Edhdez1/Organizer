# Capítulo 04 — Formularios

> Los formularios son cómo tu página **recibe datos** del usuario: un nombre, un correo, un
> mensaje. Tu sitio tiene uno (el de contacto) que envía la info a tu WhatsApp. Aquí entenderás
> cada pieza y, de paso, conceptos que reaparecerán en React (módulo 06).

---

## 1. El contenedor: `<form>`

> ### 🟦 ¿Qué significa? — *`<form>` (formulario)*
> La etiqueta `<form>` **agrupa** los campos que se enviarán juntos. Tiene dos atributos
> importantes:
> - `action` → **a dónde** se envían los datos (una URL que los procesa).
> - `method` → **cómo** se envían: normalmente `post` (recuerda los métodos HTTP del Módulo 00:
>   `POST` = "toma estos datos").
> ```html
> <form action="https://api.web3forms.com/submit" method="post">
>   …campos…
> </form>
> ```
> **¿Dónde se usa en tu proyecto?** Tu formulario de contacto envía los datos a **Web3Forms**
> (un servicio que recibe envíos sin que tengas que programar un servidor) y, mediante un
> Cloudflare Worker, te avisa por WhatsApp.

---

## 2. Los campos: `<input>` y sus tipos

> ### 🟦 ¿Qué significa? — *`<input>` (campo de entrada)*
> `<input>` es el campo donde el usuario escribe o elige algo. Es un elemento "vacío" (no se
> cierra). Su atributo `type` **cambia por completo** lo que hace:
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
> - `name` → **el nombre del dato** que se envía (imprescindible; sin `name` el dato no viaja).
> - `placeholder` → el texto gris de ejemplo dentro del campo ("tu@correo.com").
> - `required` → marca el campo como **obligatorio**; el navegador no deja enviar si está vacío.
> - `value` → un valor inicial.

Ejemplo de un campo de correo obligatorio:
```html
<input type="email" name="correo" placeholder="tu@correo.com" required>
```

---

## 3. Etiquetas de campo: `<label>` (no opcional)

> ### 🟦 ¿Qué significa? — *`<label>` (etiqueta de campo)*
> Un `<label>` es el **texto que describe** un campo ("Nombre", "Correo"). Se conecta al
> `<input>` mediante el atributo `for`, que apunta al `id` del input:
> ```html
> <label for="correo">Tu correo</label>
> <input type="email" id="correo" name="correo" required>
> ```
> **¿Por qué es obligatorio?** Porque:
> 1. Al tocar el `<label>`, el cursor salta al campo (más fácil en móvil).
> 2. Los lectores de pantalla leen "Tu correo, campo de texto" en vez de un campo mudo.
> Un formulario sin `<label>` es inaccesible. (Lo profundizamos en el capítulo 05.)

---

## 4. Áreas de texto y botones

> ### 🟦 ¿Qué significa? — *`<textarea>` (área de texto)*
> Para textos largos (un mensaje), se usa `<textarea>` en vez de `<input>`. A diferencia de
> `<input>`, **sí** lleva etiqueta de cierre:
> ```html
> <label for="mensaje">Tu mensaje</label>
> <textarea id="mensaje" name="mensaje" rows="5"></textarea>
> ```

> ### 🟦 ¿Qué significa? — *El botón de envío*
> El botón que manda el formulario puede ser `<input type="submit" value="Enviar">` o, más
> moderno y flexible, `<button type="submit">Enviar</button>`. Al pulsarlo, el navegador
> recoge todos los campos con `name` y los envía a la `action` del `<form>`.

---

## 5. Un formulario de contacto completo

Juntando todo, un formulario como el de tu sitio:

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
> Cuando el navegador comprueba, **antes de enviar**, que el correo tiene formato válido o que
> un campo `required` no está vacío, eso es **validación del lado del cliente** ("cliente" =
> el navegador, como viste en el Módulo 00). Es cómoda y rápida, pero **no es suficiente por sí
> sola**: alguien malicioso podría saltársela. Por eso los datos también se validan en el
> **servidor**. Por ahora basta con que sepas que existen los dos niveles.

> ### ⚠️ Cuidado — El honeypot: una trampa para robots
> Los formularios reciben spam de robots automáticos. Un truco común es añadir un campo
> **oculto** que una persona nunca ve ni llena, pero que un robot tonto sí completa; si llega
> lleno, descartas el envío. Se llama *honeypot* ("tarro de miel"). Tu sitio usa esta técnica.
> No necesitas implementarla aún, pero reconоce el nombre.

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
