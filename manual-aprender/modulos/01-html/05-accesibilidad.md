# Capítulo 05 — Accesibilidad y buenas prácticas

> Cerramos HTML con lo que separa a un principiante de un profesional: hacer páginas que
> **cualquiera** pueda usar, incluidas personas con discapacidad. No es un "extra bonito": es
> calidad, es ley en muchos países, y Google lo premia. Y casi todo se logra escribiendo el
> HTML correctamente, que es justo lo que ya aprendiste.

---

## 1. Qué es la accesibilidad web

> ### 🟦 ¿Qué significa? — *Accesibilidad (a11y)*
> La **accesibilidad web** es diseñar páginas que puedan usar **todas** las personas,
> incluyendo quienes tienen discapacidad visual, auditiva, motriz o cognitiva. Se abrevia
> **a11y** (la "a", 11 letras, y la "y"). No es una función aparte: es una forma de construir.

> ### 🟦 ¿Qué significa? — *Lector de pantalla*
> Un **lector de pantalla** (*screen reader*) es un programa que **lee en voz alta** lo que hay
> en la pantalla, para personas ciegas o con baja visión. Recorre tu HTML y lo narra: "encabezado
> nivel 1: Mi negocio… enlace: Contacto… campo de texto: Correo". Si tu HTML está bien hecho,
> la experiencia es fluida; si no, es un caos. Por eso todo lo "semántico" del capítulo 03
> importa tanto.

---

## 2. Las reglas de oro (que ya casi dominas)

La buena noticia: la mayoría de la accesibilidad **sale gratis** si escribes HTML correcto.
Repaso de lo que ya viste, ahora con nombre y propósito:

1. **Usa HTML semántico** (`<header>`, `<nav>`, `<main>`, `<footer>`): el lector de pantalla
   anuncia cada zona y permite saltar entre ellas.
2. **Encabezados en orden** (`<h1>` → `<h2>` → `<h3>`, sin saltarse): forman un índice por el
   que el usuario navega.
3. **Todas las imágenes con `alt`** descriptivo (o `alt=""` si son decorativas).
4. **Todo campo de formulario con su `<label>`**.
5. **Enlaces con texto claro**: "Ver precios", no "haz clic aquí". El lector de pantalla a
   veces lista solo los enlaces; "clic aquí" fuera de contexto no dice nada.
6. **El idioma declarado** (`<html lang="es">`): así el lector usa la pronunciación correcta.

> ### 💡 Tip — La prueba del teclado
> Muchas personas navegan **sin ratón**, solo con el teclado (por discapacidad motriz o
> preferencia). Prueba tu página pulsando la tecla **Tab** repetidamente: el foco debe ir
> saltando por enlaces, campos y botones en un orden lógico, y debe **verse** dónde está. Si
> puedes usar todo con el teclado, vas muy bien.

---

## 3. Cuando el HTML semántico no alcanza: ARIA

A veces construyes algo interactivo que el HTML normal no describe bien (un menú desplegable
complejo, una ventana emergente). Ahí entran los atributos ARIA.

> ### 🟦 ¿Qué significa? — *ARIA*
> **ARIA** (*Accessible Rich Internet Applications*) es un conjunto de **atributos extra** que
> le dan información de accesibilidad al navegador y a los lectores de pantalla cuando el HTML
> por sí solo no basta. Ejemplos:
> - `aria-label="Cerrar"` → le da un nombre a un botón que solo tiene un icono "✕".
> - `aria-hidden="true"` → le dice al lector de pantalla que ignore algo puramente decorativo.
> - `role="navigation"` → describe el papel de un elemento (aunque con `<nav>` ya no hace falta).

> ### ⚠️ Cuidado — La primera regla de ARIA es: no uses ARIA
> Suena raro, pero es la recomendación oficial: **si una etiqueta HTML normal ya hace el
> trabajo, úsala en vez de ARIA.** Un `<button>` real es mejor que un `<div role="button">` con
> cinco atributos ARIA. ARIA es un parche para casos especiales, no un sustituto del HTML
> semántico. Por eso lo vemos al final: primero domina lo semántico; ARIA es la excepción.

> ### 🔎 En tu código
> En `tunal-digital/sitio-web/index.html`, el botón del menú móvil y el chat usan algún
> `aria-label` para que su función quede clara aunque solo muestren un icono. Cuando lo
> inspecciones con `F12`, busca atributos que empiecen con `aria-`.

---

## 4. Contraste y color (un puente al módulo de CSS)

> ### 🟦 ¿Qué significa? — *Contraste*
> El **contraste** es la diferencia de luminosidad entre el texto y su fondo. Texto gris claro
> sobre blanco es difícil de leer para mucha gente. Existe un estándar, **WCAG**, que define un
> contraste mínimo (la relación recomendada para texto normal es **4.5:1**).
> **¿Dónde se usa en tu proyecto?** Tanto tu sitio como Faro mencionan cumplir "WCAG AA": es
> justo este criterio de contraste. El color se controla con **CSS** (módulo 02), pero la
> *decisión* de que sea legible es de accesibilidad.

> ### 💡 Tip — No comuniques solo con color
> Nunca digas únicamente "los campos en rojo son obligatorios": una persona daltónica no lo
> distingue. Acompaña el color con un texto o un icono ("Obligatorio *"). El color **refuerza**,
> no comunica solo.

---

## 5. Cierre del módulo: tu mapa de HTML

Repasa todo lo que ahora sabes hacer:

```
HTML
├── Etiquetas, elementos, atributos        (cap. 01)
├── El DOM: tu HTML como árbol             (cap. 01)
├── Texto: h1–h6, p, strong/em, listas     (cap. 02)
├── Enlaces (a/href) e imágenes (img/alt)  (cap. 02)
├── head: charset, viewport, title, meta   (cap. 03)
├── body semántico: header/nav/main/footer (cap. 03)
├── Formularios: form, input, label, button(cap. 04)
└── Accesibilidad: alt, label, ARIA, WCAG  (cap. 05)
```

Con esto puedes leer y escribir el **esqueleto** de cualquier página, incluido tu propio sitio.
Lo que aún se ve "sin pintar" lo resolverás en el módulo siguiente.

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Entiendo qué es la **accesibilidad** y qué hace un **lector de pantalla**.
- [ ] Sé que el HTML **semántico** + `alt` + `label` + buen texto de enlace ya dan mucha a11y.
- [ ] Puedo hacer la **prueba del teclado** (Tab) en una página.
- [ ] Sé qué es **ARIA** y por qué se usa solo cuando el HTML normal no basta.
- [ ] Entiendo el **contraste** (WCAG) y por qué no debo comunicar solo con color.

---

## 🧪 Ejercicios

1. **Gratis con HTML.** Lista tres cosas de accesibilidad que ya consigues solo por escribir
   HTML correcto (sin ARIA ni nada extra).
2. **Texto de enlace.** Reescribe estos enlaces para que tengan sentido fuera de contexto:
   "Para ver los precios, haz clic <a href='#'>aquí</a>." 
3. **¿ARIA o HTML?** Quieres un botón que cierre una ventana y solo muestra "✕". ¿Qué etiqueta
   usas y qué atributo le añades para que un lector de pantalla sepa que "cierra"?
4. **Contraste.** Explica por qué texto gris claro (#BBBBBB) sobre fondo blanco es un problema
   y a quién afecta.
5. 💻 **Auditoría.** Abre tu `index.html` y revisa: ¿toda imagen tiene `alt`? ¿todo input tiene
   `<label>`? ¿hay un solo `<h1>`? ¿puedes navegarlo con Tab? Corrige lo que falte.

---

🎉 **¡Terminaste el Módulo 01 — HTML!** Ya construyes el esqueleto de cualquier web y entiendes
tu propio sitio por dentro. Ahora toca darle vida visual.

➡️ Siguiente módulo: **[02 — CSS](../02-css/README.md)** *(en preparación)*.
