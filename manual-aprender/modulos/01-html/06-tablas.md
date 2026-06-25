# Capítulo 06 — Tablas en HTML

<p align="center">
  <img src="../../recursos/imagenes/01-html/cap06.png" alt="Ilustración del capítulo (pixel art con Bit)" width="640">
</p>


> En este capítulo aprenderás a mostrar datos ordenados en filas y columnas usando tablas de HTML. Verás cuándo una tabla es la herramienta correcta (datos como un horario o una lista de precios) y cuándo NO debes usarla (para colocar cosas en la pantalla, eso es trabajo de CSS). También aprenderás a hacer tus tablas accesibles para personas que usan lectores de pantalla. Bit, nuestro ajolote pixel art, irá contigo: hoy trae una libretita cuadriculada, que es justo la idea de una tabla.

## 1. ¿Qué es una tabla y para qué sirve?

Imagina una hoja de cálculo o el horario de clases pegado en la pared: tiene **filas** (líneas horizontales) y **columnas** (líneas verticales), y en cada cruce hay un dato. Eso es exactamente una **tabla**.

> ### 🟦 ¿Qué significa? — *Tabla*
> Una **tabla** es una forma de organizar información en filas y columnas, donde cada celda guarda un dato relacionado con su fila y su columna. **¿Para qué sirve?** Para mostrar **datos tabulares**: información que tiene sentido comparada por columnas, como precios, horarios, resultados o estadísticas.

> ### 🟦 ¿Qué significa? — *Datos tabulares*
> Son datos que **naturalmente** caben en una cuadrícula: cada fila es un elemento (por ejemplo, un servicio) y cada columna es una característica de ese elemento (su precio, su duración). **¿Para qué sirve la palabra?** Para que sepas reconocer cuándo SÍ va una tabla: si tus datos se parecen a una hoja de Excel, es tabla.

La regla de oro es muy simple: **usa una tabla cuando los datos serían iguales de claros en una hoja de cálculo.** Si pudieras pasarlos a Excel sin perder sentido, una tabla de HTML es perfecta.

> ### 💡 Tip — La prueba del Excel
> Antes de hacer una tabla, pregúntate: "¿Esto cabría bien en una hoja de cálculo?". Si la respuesta es sí (un menú con precios, un horario, una comparación de planes), adelante. Si la respuesta es "no, solo quiero acomodar una imagen al lado de un texto", entonces NO es una tabla: es maquetación, y eso se hace con CSS (lo verás en el módulo de CSS).

## 2. La estructura básica: `table`, `tr`, `td`

Toda tabla en HTML empieza con la etiqueta `<table>` y dentro lleva filas, y dentro de cada fila, celdas. Veamos las tres etiquetas mínimas.

> ### 🟦 ¿Qué significa? — *Etiqueta `<table>`*
> Es la etiqueta que **abre y cierra** toda la tabla. Todo lo demás (filas y celdas) vive dentro de ella. **¿Para qué sirve?** Le dice al navegador "aquí empieza una cuadrícula de datos".

> ### 🟦 ¿Qué significa? — *Etiqueta `<tr>` (table row)*
> `tr` viene del inglés *table row*, "fila de tabla". Cada `<tr>` es **una fila horizontal** completa. **¿Para qué sirve?** Para agrupar las celdas que van en la misma línea.

> ### 🟦 ¿Qué significa? — *Etiqueta `<td>` (table data)*
> `td` viene de *table data*, "dato de tabla". Cada `<td>` es **una celda** con un dato dentro. **¿Para qué sirve?** Es el cajoncito donde escribes el contenido (un texto, un número, hasta una imagen).

Vamos con el ejemplo más pequeño posible: una tabla de dos filas y dos columnas.

```html
<table>
  <tr>
    <td>Servicio</td>
    <td>Precio</td>
  </tr>
  <tr>
    <td>Sitio web básico</td>
    <td>$300</td>
  </tr>
</table>
```

Lee el código de arriba hacia abajo, como lo hace el navegador:

- La primera `<tr>` es la primera fila. Dentro tiene dos `<td>`: "Servicio" y "Precio".
- La segunda `<tr>` es la segunda fila, con "Sitio web básico" y "$300".

El navegador dibuja una cuadrícula de 2 filas × 2 columnas. ¡Tu primera tabla!

> ### ⚠️ Cuidado — Todas las filas con el mismo número de celdas
> Si una fila tiene 3 celdas, las demás también deberían tener 3 (salvo cuando uses `colspan`/`rowspan`, que verás más abajo). Si una fila tiene 2 y otra tiene 4, la tabla se ve descuadrada y confusa. Cuenta tus `<td>` por fila.

## 3. Encabezados con `th` y secciones con `thead` y `tbody`

En el ejemplo anterior, la primera fila eran títulos ("Servicio", "Precio"), no datos normales. HTML tiene una etiqueta especial para los títulos de columna o fila: `<th>`.

> ### 🟦 ¿Qué significa? — *Etiqueta `<th>` (table header)*
> `th` viene de *table header*, "encabezado de tabla". Se usa en lugar de `<td>` cuando la celda es un **título** (el nombre de una columna o de una fila). **¿Para qué sirve?** El navegador la muestra en **negrita y centrada** por defecto, y —muy importante— los lectores de pantalla la anuncian como encabezado, lo que ayuda a personas ciegas a entender la tabla.

Además, una tabla bien hecha se divide en dos zonas: la **cabecera** (los títulos) y el **cuerpo** (los datos). Para eso existen `<thead>` y `<tbody>`.

> ### 🟦 ¿Qué significa? — *Etiqueta `<thead>` (table head)*
> Agrupa la fila (o filas) de **encabezados** de la tabla. **¿Para qué sirve?** Para separar visual y semánticamente los títulos del resto. "Semántico" significa que le da significado: el navegador y los buscadores entienden "esto son los encabezados".

> ### 🟦 ¿Qué significa? — *Etiqueta `<tbody>` (table body)*
> Agrupa las filas con los **datos reales**, el cuerpo de la tabla. **¿Para qué sirve?** Para dejar claro dónde está la información, separada de los títulos. Si en el futuro usas CSS o JavaScript, poder apuntar al `<tbody>` te facilitará la vida.

Reescribamos el ejemplo, ahora bien estructurado:

```html
<table>
  <thead>
    <tr>
      <th>Servicio</th>
      <th>Precio</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Sitio web básico</td>
      <td>$300</td>
    </tr>
    <tr>
      <td>Tienda en línea</td>
      <td>$800</td>
    </tr>
  </tbody>
</table>
```

¿Ves la diferencia? Los títulos van con `<th>` dentro de `<thead>`, y los datos van con `<td>` dentro de `<tbody>`. Esta es la forma profesional y la que deberías usar siempre.

> ### 🔎 En tu código
> En **tunal-digital** (`sitio-web/index.html`), si quisieras mostrar una sección de "Planes y precios" con varios paquetes y sus características, una tabla con `<thead>` (Plan, Precio, Incluye) y un `<tbody>` con una fila por plan sería ideal. Es justo el tipo de dato que se compara por columnas: ¡la prueba del Excel la pasa con facilidad!

## 4. Un título para la tabla: `caption`

Una tabla suelta, sin explicar de qué trata, puede confundir. Para darle un título visible que forma parte de la tabla, usamos `<caption>`.

> ### 🟦 ¿Qué significa? — *Etiqueta `<caption>`*
> Es el **título de la tabla**. Va justo después de abrir `<table>`, como primera línea de su contenido. **¿Para qué sirve?** Para que cualquiera (incluidos los lectores de pantalla) sepa de un vistazo qué muestra la tabla. Es como ponerle nombre a una foto.

```html
<table>
  <caption>Planes de tunal-digital (2026)</caption>
  <thead>
    <tr>
      <th>Plan</th>
      <th>Precio</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Básico</td>
      <td>$300</td>
    </tr>
  </tbody>
</table>
```

El navegador muestra "Planes de tunal-digital (2026)" arriba de la tabla, centrado. Sencillo y muy útil.

> ### 💡 Tip — El `caption` siempre primero
> El `<caption>` debe ser el **primer hijo** de `<table>`, antes de `<thead>`. Si lo pones en otro lugar, el navegador puede ignorarlo o moverlo. Regla fácil: abres `<table>` y lo siguiente es el `<caption>`.

## 5. Celdas que se estiran: `colspan` y `rowspan`

A veces una celda necesita ocupar el espacio de varias. Por ejemplo, un título que abarca dos columnas, o una celda que cubre dos filas. Para eso existen dos **atributos**.

> ### 🟦 ¿Qué significa? — *Atributo*
> Un **atributo** es información extra que se escribe **dentro** de la etiqueta de apertura, con la forma `nombre="valor"`. **¿Para qué sirve?** Para modificar cómo se comporta o se ve un elemento. Ya viste atributos como `href` en los enlaces; aquí usaremos `colspan` y `rowspan`.

> ### 🟦 ¿Qué significa? — *Atributo `colspan`*
> *Col* = columna, *span* = abarcar. `colspan="2"` hace que **una celda ocupe el ancho de 2 columnas**. **¿Para qué sirve?** Para fusionar celdas a lo ancho, como un encabezado que cubre varias columnas.

> ### 🟦 ¿Qué significa? — *Atributo `rowspan`*
> *Row* = fila. `rowspan="2"` hace que **una celda ocupe el alto de 2 filas**. **¿Para qué sirve?** Para fusionar celdas hacia abajo, cuando un mismo valor se repite en varias filas.

Veamos `colspan` en acción. Queremos un título "Servicios web" que cubra las dos columnas de abajo:

```html
<table>
  <thead>
    <tr>
      <th colspan="2">Servicios web</th>
    </tr>
    <tr>
      <th>Servicio</th>
      <th>Precio</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Landing page</td>
      <td>$300</td>
    </tr>
  </tbody>
</table>
```

Fíjate en `colspan="2"`: esa celda sola ocupa el lugar de dos. Por eso esa fila tiene **una** `<th>` en vez de dos.

Ahora `rowspan`. Imagina que dos planes pertenecen a la misma categoría "Web" y no quieres repetir la palabra:

```html
<table>
  <tbody>
    <tr>
      <td rowspan="2">Web</td>
      <td>Landing page</td>
      <td>$300</td>
    </tr>
    <tr>
      <td>Tienda en línea</td>
      <td>$800</td>
    </tr>
  </tbody>
</table>
```

La celda "Web" tiene `rowspan="2"`, así que se estira hacia abajo y cubre las dos filas. Por eso la segunda `<tr>` solo tiene **dos** celdas: la primera columna ya está ocupada por "Web".

> ### ⚠️ Cuidado — Hacer cuentas con colspan y rowspan
> Cuando uses `colspan` o `rowspan`, una celda "se come" el lugar de otras. La fila afectada tendrá **menos** etiquetas `<td>` o `<th>` de lo normal. Si olvidas restar las celdas, la tabla se rompe (aparecen huecos o columnas de más). Cuenta despacio: una celda con `colspan="2"` cuenta como 2; con `colspan="3"`, como 3.

> ### 💡 Tip — Empieza simple
> Como principiante, no abuses de `colspan` y `rowspan`. Una tabla sencilla y limpia se entiende mejor que una llena de celdas fusionadas. Úsalos solo cuando de verdad aclaren los datos.

## 6. Por qué NO debes usar tablas para maquetar

Esta sección es importante porque, hace muchos años, los programadores usaban tablas **para colocar cosas en la página**: un menú a la izquierda, el contenido en el centro, etc. Hoy eso se considera un **error**.

> ### 🟦 ¿Qué significa? — *Maquetar*
> **Maquetar** es decidir dónde va cada cosa en la pantalla: qué está arriba, qué a un lado, cómo se acomoda todo. **¿Para qué sirve la palabra?** Para distinguir dos trabajos: *mostrar datos* (eso sí es tarea de las tablas) y *acomodar la página* (eso es tarea de CSS).

> ### 🟦 ¿Qué significa? — *CSS*
> **CSS** (Hojas de Estilo en Cascada) es el lenguaje que da **diseño** a una página: colores, tamaños, posiciones y disposición. **¿Para qué sirve?** Para maquetar y dar estilo. **¿Dónde se usa en tu proyecto?** En **tunal-digital** el archivo `styles.css` hace exactamente esto: coloca y embellece el sitio. La maquetación va ahí, NO en tablas dentro de `index.html`.

¿Por qué es malo maquetar con tablas? Tres razones, contadas fácil:

1. **Significado equivocado.** Una tabla le dice al navegador y a los lectores de pantalla "esto son datos en filas y columnas". Si la usas solo para empujar cosas a un lado, estás mintiendo sobre el contenido. Una persona ciega oirá "fila 1, columna 2" donde no hay datos: pura confusión.
2. **Difícil de mantener.** El diseño con tablas se enreda muchísimo (tablas dentro de tablas dentro de tablas). Cambiar algo se vuelve una pesadilla.
3. **No se adapta bien al móvil.** Las tablas son rígidas. CSS, en cambio, tiene herramientas (como Flexbox y Grid) pensadas para que la página se vea bien en cualquier pantalla.

> ### ⚠️ Cuidado — La regla que nunca debes olvidar
> **Tabla = datos. CSS = diseño.** Si tu objetivo es "que esto quede al lado de aquello" o "que el menú vaya arriba", NO uses tablas. Esa decisión es de CSS. Las tablas son solo para información tabular.

> ### 🔎 En tu código
> En **RachaSimple** (React + TypeScript + Tailwind), la colocación de tarjetas y botones se resuelve con clases de Tailwind (que es CSS), no con tablas. Y en **Faro** (carpeta Organizer, Next.js + React), el panel con la lista de proyectos se maqueta con CSS/componentes; pero si Faro mostrara una tabla de "proyecto / estado / progreso %", ahí SÍ tendría sentido una `<table>`, porque son datos comparables por columnas. La diferencia siempre es la misma: ¿estás mostrando datos o acomodando la página?

## 7. Accesibilidad: el atributo `scope`

> ### 🟦 ¿Qué significa? — *Accesibilidad*
> La **accesibilidad** es hacer que tu sitio lo pueda usar **todo el mundo**, incluidas personas con discapacidad (por ejemplo, quienes navegan con un **lector de pantalla**, un programa que lee la página en voz alta). **¿Para qué sirve?** Para no dejar a nadie afuera. Es responsabilidad de quien programa, no un extra opcional.

En una tabla, los `<th>` son los encabezados, pero el navegador a veces no sabe si un encabezado manda sobre una **columna** o sobre una **fila**. Para dejarlo clarísimo usamos el atributo `scope`.

> ### 🟦 ¿Qué significa? — *Atributo `scope`*
> *Scope* en inglés es "ámbito" o "alcance". Se pone en un `<th>` para indicar qué celdas controla ese encabezado. Los valores más comunes son `scope="col"` (encabezado de una **columna**) y `scope="row"` (encabezado de una **fila**). **¿Para qué sirve?** Para que el lector de pantalla diga, por ejemplo, "Precio: $300" en lugar de soltar números sueltos. Mejora mucho la comprensión.

Aquí una tabla accesible con `scope`:

```html
<table>
  <caption>Planes de tunal-digital</caption>
  <thead>
    <tr>
      <th scope="col">Plan</th>
      <th scope="col">Precio</th>
      <th scope="col">Entrega</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Básico</th>
      <td>$300</td>
      <td>5 días</td>
    </tr>
    <tr>
      <th scope="row">Tienda</th>
      <td>$800</td>
      <td>15 días</td>
    </tr>
  </tbody>
</table>
```

Observa dos cosas:

- Los encabezados de arriba (Plan, Precio, Entrega) llevan `scope="col"` porque mandan sobre toda su columna.
- El nombre de cada plan (Básico, Tienda) es un `<th scope="row">`: ¡también puede haber encabezados de fila! Indican de qué trata esa fila.

Así, cuando un lector de pantalla llega a la celda "$300", puede anunciar "Básico, Precio, $300". El usuario entiende perfectamente sin ver la pantalla.

> ### 💡 Tip — Accesible desde el principio
> Añadir `scope`, `caption`, `<thead>` y `<tbody>` no cuesta casi nada cuando construyes la tabla, pero es muy molesto agregarlo después. Hazlo bien desde el primer momento y tu yo del futuro (y tus usuarios) te lo agradecerán. Bit asiente con sus branquias rosas: ajolote feliz, código accesible.

## 8. ¿Y los bordes? Una nota sobre el aspecto visual

Si pruebas las tablas de arriba en el navegador, notarás algo curioso: **no tienen líneas**. Las celdas están ahí, pero no se ven los bordes que dibujarías a mano en una cuadrícula. Esto confunde a mucha gente que empieza. No te preocupes: tu tabla está bien; simplemente HTML, por sí solo, casi no pinta líneas.

> ### 🟦 ¿Qué significa? — *Borde*
> Un **borde** es la línea que rodea una celda o la tabla entera. **¿Para qué sirve?** Para separar visualmente los datos y que se lean como una cuadrícula. En HTML moderno los bordes **no** se ponen en el HTML: se ponen con **CSS** (la propiedad `border`). Lo verás en el módulo de CSS.

Quizá en tutoriales viejos viste algo como `<table border="1">`. Funcionaba, pero hoy se considera anticuado: mezclar diseño (las líneas) con el contenido (los datos) es justo lo que queremos evitar. La regla que ya conoces vuelve a aplicar.

> ### 💡 Tip — Sin líneas no significa "roto"
> Si tu tabla aparece sin bordes, **no está mal hecha**: solo le falta estilo. La estructura (filas, columnas, encabezados) es correcta. Darle líneas, colores y espacios es el siguiente paso, y ese paso vive en CSS, no aquí. Primero la estructura, luego la pintura.

> ### 🔎 En tu código
> En **tunal-digital**, cuando llegues al módulo de CSS, abrirás `styles.css` y le darás bordes y colores a tu tabla de precios con reglas como `table { border-collapse: collapse; }`. El HTML que escribes hoy en `index.html` queda igual; solo le sumas una capa de estilo encima. Separar las dos cosas es lo que hace tu código limpio y fácil de mantener.

## 9. Errores típicos de principiante (y cómo evitarlos)

Antes del repaso final, repasemos las trampas más comunes al hacer tablas. Reconocerlas ahora te ahorrará dolores de cabeza.

> ### ⚠️ Cuidado — Olvidar el `<tr>`
> Un error frecuente es poner `<td>` sueltos directamente dentro de `<table>`, sin envolverlos en una fila `<tr>`. Sin `<tr>`, el navegador no sabe qué celdas van juntas en cada línea. **Recuerda el orden:** `<table>` contiene `<tr>`, y cada `<tr>` contiene `<td>` o `<th>`. Es como una caja (tabla) con bandejas (filas) y dentro de cada bandeja, los cajoncitos (celdas).

> ### ⚠️ Cuidado — Usar `<th>` donde van datos (o al revés)
> Usa `<th>` **solo** para títulos (nombres de columna o de fila) y `<td>` para los datos. Si pones todo con `<th>`, el lector de pantalla pensará que todo es encabezado y la tabla pierde sentido. Si pones los títulos con `<td>`, pierdes la negrita automática y la ayuda de accesibilidad. Cada etiqueta tiene su trabajo.

> ### 💡 Tip — Lee tu tabla en voz alta
> Una forma sencilla de comprobar si tu tabla está bien: léela imaginando que eres un lector de pantalla, celda por celda, fila por fila. Si al decir "Precio, $300" todo cuadra, vas bien. Si algo suena raro ("encabezado, encabezado, encabezado, 300"), revisa tus `<th>` y `<td>`.

## 10. Repaso con un ejemplo completo

Juntemos todo lo aprendido en una tabla final, lista para pegar en `sitio-web/index.html` de **tunal-digital**:

```html
<table>
  <caption>Comparativa de planes — tunal-digital</caption>
  <thead>
    <tr>
      <th scope="col">Plan</th>
      <th scope="col">Precio</th>
      <th scope="col">Páginas</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Básico</th>
      <td>$300</td>
      <td>1</td>
    </tr>
    <tr>
      <th scope="row">Profesional</th>
      <td>$600</td>
      <td>5</td>
    </tr>
    <tr>
      <th scope="row">Tienda</th>
      <td>$800</td>
      <td>10</td>
    </tr>
  </tbody>
</table>
```

Esta tabla tiene título (`caption`), cabecera separada (`thead`), cuerpo (`tbody`), encabezados de columna y de fila con `scope`, y datos limpios. Es una tabla de nivel profesional, y la entiendes por completo. ¡Bien hecho!

## ✅ Checklist — ¿ya domino esto?

- [ ] Sé qué son **datos tabulares** y aplico "la prueba del Excel" antes de hacer una tabla.
- [ ] Sé escribir una tabla con `<table>`, `<tr>` y `<td>`.
- [ ] Uso `<th>` para los encabezados y entiendo por qué no son simples `<td>`.
- [ ] Separo mi tabla en `<thead>` y `<tbody>`.
- [ ] Le pongo un título a la tabla con `<caption>` como primer elemento.
- [ ] Sé fusionar celdas con `colspan` (a lo ancho) y `rowspan` (a lo alto), y recuerdo restar celdas.
- [ ] Entiendo que **NO** se usan tablas para maquetar: el diseño es trabajo de CSS.
- [ ] Añado `scope="col"` y `scope="row"` para que mi tabla sea accesible.

## 🧪 Ejercicios

1. **(En papel)** Escribe en una hoja tres ejemplos de información que SÍ sea tabular (datos de tabla) y tres que NO lo sean (que deban maquetarse con CSS). Justifica cada uno con la "prueba del Excel".

2. **💻** Crea un archivo `tabla.html` y haz una tabla de 3 filas × 2 columnas con tu lista de tareas: columna "Tarea" y columna "¿Hecha?". Usa solo `<table>`, `<tr>` y `<td>`. Ábrelo en el navegador.

3. **💻** Mejora la tabla del ejercicio anterior: convierte la primera fila en encabezados con `<th>`, envuélvela en `<thead>` y mete el resto en `<tbody>`. Agrégale un `<caption>` con el título "Mi lista de tareas".

4. **💻** En tu `tabla.html`, añade `scope="col"` a los encabezados de columna y, si tienes encabezados de fila, `scope="row"`. Comprueba que la tabla sigue viéndose igual (el cambio es para accesibilidad, no para el aspecto visual).

5. **💻** Construye la "Comparativa de planes" de **tunal-digital** del apartado 10 en un archivo nuevo. Luego añade una fila de encabezado con `colspan="3"` arriba de todo que diga "Servicios 2026", y verifica que la fila tenga una sola `<th>`.

6. **💻 (reto)** Crea una tabla de horario semanal (columnas: Lunes a Viernes; filas: Mañana y Tarde). Usa `rowspan="2"` en una celda donde una misma actividad ocupe mañana y tarde el mismo día, y cuenta con cuidado cuántas celdas debe tener cada fila.
