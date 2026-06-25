# Capítulo 05 — Apps con Flet

> Ya sabes Python: variables, decisiones, bucles, funciones, listas, diccionarios y archivos
> JSON. Cerramos el módulo viendo cómo todo eso se convierte en una **app con interfaz** usando
> **Flet**, el framework con el que está hecho PolyPaw. No buscamos que domines Flet hoy, sino
> que **entiendas cómo está armada tu app** y puedas leer su código.

---

## 1. Qué es un framework y qué es Flet

> ### 🟦 ¿Qué significa? — *Framework (marco de trabajo)*
> Un **framework** es un conjunto de herramientas y reglas ya construidas que te dan la
> estructura para crear cierto tipo de programa, para que no empieces de cero. Si una librería
> es "una caja de herramientas", un framework es "el taller completo con las reglas de cómo
> trabajar en él".

> ### 🟦 ¿Qué significa? — *Flet*
> **Flet** es un framework de Python para crear **interfaces gráficas** (apps con botones,
> textos, imágenes) que funcionan en **móvil, web y escritorio** con el mismo código. Su gran
> ventaja: escribes solo Python, sin necesidad de HTML/CSS/JavaScript, y Flet se encarga de
> dibujar la interfaz.
> **¿Dónde se usa en tu proyecto?** PolyPaw está construido **completamente con Flet**. Por eso
> es Python de principio a fin.

---

## 2. La idea central: la interfaz son objetos

> ### 🟦 ¿Qué significa? — *Controles (controls)*
> En Flet, cada elemento de la pantalla es un **control**: un objeto de Python que representa un
> botón, un texto, una imagen, una fila, una columna. Construyes la interfaz **creando estos
> objetos y agregándolos** a la página.
> ```python
> import flet as ft
>
> texto = ft.Text("¡Hola desde Flet!")
> boton = ft.ElevatedButton("Púlsame")
> ```
> `ft.Text(...)` crea un control de texto; `ft.ElevatedButton(...)` crea un botón. Cada uno es
> un objeto con propiedades que puedes configurar (color, tamaño, etc.).

> ### 🟦 ¿Qué significa? — *Contenedores de layout: `Row` y `Column`*
> Para organizar controles, Flet usa `ft.Row` (en fila, horizontal) y `ft.Column` (en columna,
> vertical). ¿Te suena? Es la misma idea que **Flexbox** en CSS (Módulo 02), pero en Python:
> ```python
> ft.Column([
>     ft.Text("Título"),
>     ft.Text("Subtítulo"),
>     ft.ElevatedButton("Aceptar"),
> ])
> ```
> Esto apila los tres controles verticalmente. Los conceptos de diseño se repiten entre
> tecnologías: aprender uno te ayuda con los demás.

---

## 3. La estructura mínima de una app Flet

```python
import flet as ft

def main(page: ft.Page):
    page.title = "Mi primera app"

    saludo = ft.Text("¡Hola, Edwar!", size=24)
    page.add(saludo)          # agrega el control a la página

ft.app(target=main)           # arranca la app, usando la función main
```

> ### 🔎 Línea por línea
> - `import flet as ft` → trae Flet y lo llama `ft` (un alias corto, muy común).
> - `def main(page):` → una función que **recibe la página** y construye la interfaz dentro.
> - `page.add(...)` → añade controles a la pantalla.
> - `ft.app(target=main)` → enciende la app y le dice "usa `main` para construir la interfaz".
> **¿Dónde se usa en tu proyecto?** El `main.py` de PolyPaw tiene exactamente esta forma: una
> función `main(page)` que arma todo, y `ft.app(...)` al final que la arranca.

---

## 4. Hacer la app interactiva: eventos

Igual que en JavaScript reaccionabas a clics, en Flet los controles tienen eventos.

> ### 🟦 ¿Qué significa? — *El evento `on_click`*
> Un botón puede ejecutar una función cuando se pulsa, mediante `on_click`:
> ```python
> import flet as ft
>
> def main(page: ft.Page):
>     contador = ft.Text("0", size=40)
>
>     def sumar(e):                       # función que reacciona al clic
>         valor = int(contador.value) + 1
>         contador.value = str(valor)
>         page.update()                   # redibuja la pantalla con el cambio
>
>     boton = ft.ElevatedButton("Sumar", on_click=sumar)
>     page.add(contador, boton)
>
> ft.app(target=main)
> ```
> La función `sumar` es un **callback** (como en JavaScript): se ejecuta cuando ocurre el clic.

> ### 🟦 ¿Qué significa? — *`page.update()`*
> Cambiar `contador.value` en Python no actualiza solo la pantalla; debes pedir a Flet que
> **redibuje** con `page.update()`. Es parecido a cuando en el DOM cambiabas `textContent`: hay
> un paso explícito para reflejar el cambio. Olvidarlo es un error común (cambias el dato pero
> "no se ve").

---

## 5. Cómo está organizado PolyPaw (lectura guiada)

Con todo lo aprendido, ya puedes entender el mapa de tu app:

| Archivo (en PolyPaw) | Qué hace | Conceptos que ya conoces |
|---|---|---|
| `main.py` | Arranca la app y enruta entre pantallas | `def main(page)`, `ft.app`, decisiones |
| `dashboard.py`, `leccion.py`, `tienda.py` | Cada pantalla (vista) de la app | controles `Row`/`Column`/`Text`/botones |
| `database_manager.py` | Carga/guarda el perfil | archivos + `json.load`/`json.dump` |
| `curriculum_loader.py` | Carga las misiones | `json.load` sobre `missions/*.json` |
| `i18n_manager.py` | Textos en varios idiomas | diccionarios (clave: texto) |
| `missions/*.json` | El contenido de las lecciones | listas de diccionarios |
| `polypaw_db.json` | Los datos del usuario | un diccionario persistido |

> ### 💡 Tip — Cómo "leer" un proyecto que no escribiste
> Ahora que conoces las piezas, abrir PolyPaw ya no da miedo. Estrategia para entender cualquier
> proyecto: 1) empieza por `main.py` (el punto de entrada); 2) sigue los `import` para ver qué
> archivos usa; 3) busca las funciones por su nombre (`cargar`, `guardar`, `mostrar`); 4) no
> intentes entenderlo todo de golpe, sigue **un** flujo (por ejemplo, "qué pasa al completar una
> misión"). Esta habilidad —leer código ajeno— es tan valiosa como escribirlo.

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Sé qué es un **framework** y qué es **Flet** (apps multiplataforma en Python).
- [ ] Entiendo que la interfaz son **controles** (objetos: `Text`, botones…).
- [ ] Uso `Row`/`Column` para organizar (como Flexbox) y `page.add(...)`.
- [ ] Reconozco la estructura mínima: `def main(page)` + `ft.app(target=main)`.
- [ ] Sé que la interactividad usa eventos (`on_click`) y requiere `page.update()`.
- [ ] Puedo ubicar las piezas de PolyPaw y sé una estrategia para leer código ajeno.

---

## 🧪 Ejercicios

1. **Framework vs. librería.** Explica con tus palabras la diferencia, con la analogía de la
   caja de herramientas y el taller.
2. **Row o Column.** ¿Cuál usarías para una barra de botones horizontal? ¿Y para un formulario
   apilado verticalmente?
3. **El paso que falta.** En el ejemplo del contador, si quitas `page.update()`, ¿qué pasa al
   pulsar el botón y por qué?
4. **Mapa mental.** Sin abrir el código, ¿qué archivo de PolyPaw crees que se encarga de
   guardar tu racha, y con qué funciones de Python (de los capítulos anteriores) lo haría?
5. 💻 **Tu primera app Flet.** Cuando tengas Python, instala Flet (`pip install flet`) y crea el
   contador del ejemplo de la sección 4. Ejecútalo y púlsalo. Luego añade un segundo botón que
   **reste**. (¡Acabas de hacer una app con interfaz!)

---

🎉 **¡Terminaste el Módulo 04 — Python!** Ahora conoces un segundo lenguaje completo y entiendes
cómo está construida PolyPaw por dentro: su Python, sus datos en JSON y su interfaz con Flet.
Con dos lenguajes en tu haber, ya piensas como programador, no como copista.

➡️ Siguiente módulo: **[05 — TypeScript](../05-typescript/README.md)** *(en preparación)*.
