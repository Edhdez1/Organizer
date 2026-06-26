# Capítulo 04 — Archivos y JSON

<p align="center">
  <img src="../../recursos/imagenes/04-python/cap04.png" alt="Ilustración del capítulo (pixel art con Bit)" width="640">
</p>


> Un programa que no guarda nada empieza de cero cada vez que lo abres. Aquí vas a aprender a
> **guardar** datos en el disco para que sobrevivan al cierre y a **leerlos** de vuelta cuando
> arranca otra vez. Y lo harás con **JSON**, que es justo el formato con el que PolyPaw guarda
> sus misiones y el perfil del usuario. Este es el capítulo que enlaza Python con datos de
> verdad.

---

## 1. Por qué necesitamos archivos

Hasta ahora, todo lo que metías en una variable **desaparecía** al terminar el programa: vivía
en la RAM (¿te acuerdas del Módulo 00?) y la RAM se borra. Si quieres que un dato siga ahí
mañana, que **persista**, tienes que escribirlo en un **archivo** del disco.

> ### 🟦 ¿Qué significa? — *Persistencia*
> **Persistir** un dato es dejarlo guardado de forma permanente, en disco, para poder
> recuperarlo más tarde aunque el programa se haya cerrado o hayas apagado la computadora. Sin
> persistencia, una app de hábitos olvidaría tu racha cada vez que sales de ella.

---

## 2. Leer y escribir archivos de texto

> ### 🟦 ¿Qué significa? — *Abrir un archivo con `open` y `with`*
> Para trabajar con un archivo usas `open()`, casi siempre dentro de un bloque `with`, que se
> ocupa de cerrarlo por ti cuando terminas:
> ```python
> # Escribir
> with open("notas.txt", "w", encoding="utf-8") as archivo:
>     archivo.write("Hola, esto se guarda en disco.")
>
> # Leer
> with open("notas.txt", "r", encoding="utf-8") as archivo:
>     contenido = archivo.read()
>     print(contenido)
> ```
> - `"w"` = *write* (escribir; ojo, **borra** lo que hubiera antes). `"r"` = *read* (leer).
>   `"a"` = *append* (añadir al final sin borrar nada).
> - `encoding="utf-8"` se asegura de que los acentos y la ñ se guarden bien, igual que el
>   `charset` que pusiste en el HTML.
> - Al salir del bloque `with`, el archivo se cierra solo. Es la forma recomendada de hacerlo.

---

## 3. JSON en Python: el módulo `json`

Guardar texto plano sirve para poco. Lo que normalmente quieres guardar son **datos
estructurados**: listas, diccionarios. Y para eso existe JSON.

> ### 🟦 ¿Qué significa? — *El módulo `json` (repaso de JSON)*
> Como viste en el Módulo 03, **JSON** es un formato de texto para datos estructurados. Python
> incluye de fábrica un **módulo** llamado `json` que pasa de tus diccionarios y listas a texto
> JSON, y al revés.

> ### 🟦 ¿Qué significa? — *Módulo e `import`*
> Un **módulo** es un paquete de funciones ya hechas que puedes aprovechar en tu programa. Para
> usarlo, lo **importas** al principio del archivo con `import`:
> ```python
> import json
> ```
> Python viene con un montón de módulos listos (es la "biblioteca estándar"): `json`, `random`,
> `datetime` y muchos más. Hacer `import` es como decir "tráeme esa caja de herramientas".

> ### 🟦 ¿Qué significa? — *Las cuatro funciones de `json`*
> | Función | Qué hace |
> |---|---|
> | `json.dumps(dato)` | convierte un dict/lista **a texto** JSON (como `JSON.stringify` en JS) |
> | `json.loads(texto)` | convierte texto JSON **a** dict/lista (como `JSON.parse` en JS) |
> | `json.dump(dato, archivo)` | escribe el dato como JSON **directo a un archivo** |
> | `json.load(archivo)` | lee un archivo JSON y lo convierte a dict/lista |
> Para no confundirlas, un truco: las que llevan **`s`** trabajan con *strings* (texto); las que
> van **sin `s`** trabajan con archivos.

---

## 4. Guardar y cargar datos reales (como PolyPaw)

Cuando juntas archivos y JSON, guardar y recuperar el perfil de un usuario queda así:

```python
import json

# El dato que queremos guardar (un diccionario)
usuario = {
    "nombre": "Edwar",
    "nivel": "A2",
    "xp": 1500,
    "racha": 7
}

# GUARDAR a un archivo JSON
with open("usuario.json", "w", encoding="utf-8") as archivo:
    json.dump(usuario, archivo, ensure_ascii=False, indent=2)

# CARGAR desde el archivo JSON
with open("usuario.json", "r", encoding="utf-8") as archivo:
    datos = json.load(archivo)

print(datos["nombre"])   # Edwar
print(datos["xp"])       # 1500
```

> ### 🟦 ¿Qué significa? — *`indent` y `ensure_ascii`*
> - `indent=2` guarda el JSON "bonito", con sangría, para que un humano lo pueda leer sin
>   esfuerzo.
> - `ensure_ascii=False` deja los acentos y la ñ tal cual, sin convertirlos en códigos raros.

> ### 🔎 En tu código
> Esto es, casi al pie de la letra, lo que hace `database_manager.py` de PolyPaw con
> `polypaw_db.json`: al arrancar, `json.load` lee el perfil del usuario; cuando ganas XP o subes
> la racha, modifica el diccionario y `json.dump` lo vuelve a guardar. Y `curriculum_loader.py`
> usa `json.load` para cargar las misiones desde `missions/*.json`. **Con esto ya entiendes el
> sistema de datos completo de tu app.**

> ### ⚠️ Cuidado — Maneja el caso "el archivo no existe"
> La primera vez que alguien ejecuta la app, el archivo de datos todavía no existe, así que
> `json.load` fallaría. Por eso se protege con `try/except` (el `try/catch` de Python, que verás
> justo abajo) o comprobando antes si el archivo está ahí. PolyPaw, cuando no encuentra el
> archivo, crea un perfil por defecto.

---

## 5. Manejo de errores: `try` / `except`

> ### 🟦 ¿Qué significa? — *`try` / `except`*
> Es el equivalente del `try/catch` de JavaScript: intenta ejecutar un código y, si algo falla,
> pasa a un plan B en vez de reventar:
> ```python
> try:
>     with open("usuario.json", "r", encoding="utf-8") as archivo:
>         datos = json.load(archivo)
> except FileNotFoundError:
>     print("No hay datos aún; creando perfil nuevo.")
>     datos = {"nombre": "", "nivel": "A1", "xp": 0, "racha": 0}
> ```
> `except FileNotFoundError` atrapa concretamente el error de "archivo no encontrado". Manejar
> los fallos así hace que tu programa sea **robusto**: aguanta lo inesperado sin caerse.

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Entiendo qué es la **persistencia** y por qué hacen falta los archivos.
- [ ] Leo y escribo archivos con `with open(...)` y los modos `"r"`, `"w"`, `"a"`.
- [ ] Sé qué es un **módulo** y cómo importarlo (`import json`).
- [ ] Distingo `json.dumps/loads` (texto) de `json.dump/load` (archivos).
- [ ] Sé guardar un diccionario a JSON y cargarlo de vuelta (como PolyPaw).
- [ ] Manejo errores con `try`/`except` (p. ej. `FileNotFoundError`).

---

## 🧪 Ejercicios

1. **Modos.** ¿Qué diferencia hay entre abrir un archivo con `"w"` y con `"a"`?
2. **¿Con o sin `s`?** ¿Cuál usas para convertir un diccionario a texto JSON en memoria:
   `json.dump` o `json.dumps`? ¿Y para escribirlo directo a un archivo?
3. **Lee tu app.** En PolyPaw, ¿qué función crees que carga `polypaw_db.json` al iniciar y cuál
   lo vuelve a guardar cuando ganas XP?
4. **try/except.** Explica por qué cargar un archivo de datos conviene envolverlo en
   `try/except` la primera vez que corre la app.
5. 💻 **Mini-diario.** Escribe un programa que: 1) cargue una lista desde `diario.json` (o use una
   lista vacía si no existe, con try/except); 2) le añada una entrada nueva con `append`; 3)
   vuelva a guardar la lista con `json.dump`. Ejecútalo varias veces y observa cómo crece el
   archivo (¡acabas de hacer persistencia real!).

➡️ Siguiente: **[Capítulo 05 — Apps con Flet](05-apps-con-flet.md)**.
