# Capítulo 04 — Archivos y JSON

> Los programas necesitan **guardar** datos para que no se pierdan al cerrarse, y **leerlos** al
> abrirse. Aquí aprendes a trabajar con archivos y con **JSON**, el formato que usa PolyPaw para
> sus misiones y el perfil del usuario. Es el capítulo que conecta Python con datos reales.

---

## 1. Por qué necesitamos archivos

Hasta ahora, todo lo que guardabas en variables **desaparecía** al terminar el programa (vivía
en la RAM, ¿recuerdas el Módulo 00?). Para que un dato **persista** (siga existiendo mañana),
hay que escribirlo en un **archivo** del disco.

> ### 🟦 ¿Qué significa? — *Persistencia*
> **Persistir** un dato es guardarlo de forma permanente (en disco), para recuperarlo después
> aunque el programa se haya cerrado o la computadora se haya apagado. Sin persistencia, una app
> de hábitos olvidaría tu racha cada vez que la cierras.

---

## 2. Leer y escribir archivos de texto

> ### 🟦 ¿Qué significa? — *Abrir un archivo con `open` y `with`*
> Para trabajar con un archivo se usa `open()`, normalmente dentro de un bloque `with` (que se
> encarga de cerrarlo solo al terminar):
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
> - `"w"` = *write* (escribir; **borra** lo anterior). `"r"` = *read* (leer). `"a"` = *append*
>   (añadir al final sin borrar).
> - `encoding="utf-8"` asegura que acentos y ñ se guarden bien (igual que el `charset` del HTML).
> - El bloque `with` cierra el archivo automáticamente al salir; es la forma recomendada.

---

## 3. JSON en Python: el módulo `json`

Guardar texto plano sirve para poco. Lo que de verdad quieres guardar son **datos
estructurados** (listas, diccionarios). Para eso está JSON.

> ### 🟦 ¿Qué significa? — *El módulo `json` (repaso de JSON)*
> Recuerda del Módulo 03: **JSON** es un formato de texto para datos estructurados. Python trae
> un **módulo** llamado `json` para convertir entre sus diccionarios/listas y texto JSON.

> ### 🟦 ¿Qué significa? — *Módulo e `import`*
> Un **módulo** es un conjunto de funciones ya hechas que puedes usar en tu programa. Para
> usarlo, lo **importas** al inicio con `import`:
> ```python
> import json
> ```
> Python trae muchísimos módulos listos (la "biblioteca estándar"): `json`, `random`,
> `datetime`, etc. `import` es como decir "tráeme esta caja de herramientas".

> ### 🟦 ¿Qué significa? — *Las cuatro funciones de `json`*
> | Función | Qué hace |
> |---|---|
> | `json.dumps(dato)` | convierte un dict/lista **a texto** JSON (como `JSON.stringify` en JS) |
> | `json.loads(texto)` | convierte texto JSON **a** dict/lista (como `JSON.parse` en JS) |
> | `json.dump(dato, archivo)` | escribe el dato como JSON **directo a un archivo** |
> | `json.load(archivo)` | lee un archivo JSON y lo convierte a dict/lista |
> (Truco para recordar: las versiones **con `s`** trabajan con *strings* (texto); las **sin `s`**
> trabajan con archivos.)

---

## 4. Guardar y cargar datos reales (como PolyPaw)

Juntando archivos + JSON, así se guarda y se recupera el perfil de un usuario:

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
> - `indent=2` guarda el JSON "bonito", con sangría, para que un humano pueda leerlo.
> - `ensure_ascii=False` permite guardar acentos y ñ tal cual (sin convertirlos a códigos raros).

> ### 🔎 En tu código
> Esto es, literalmente, lo que hace `database_manager.py` de PolyPaw con `polypaw_db.json`:
> al iniciar, `json.load` lee el perfil del usuario; cuando ganas XP o subes tu racha, modifica
> el diccionario y `json.dump` lo vuelve a guardar. Y `curriculum_loader.py` usa `json.load`
> para cargar las misiones desde `missions/*.json`. **Ahora entiendes el sistema de datos
> completo de tu app.**

> ### ⚠️ Cuidado — Maneja el caso "el archivo no existe"
> La primera vez que se ejecuta la app, el archivo de datos aún no existe y `json.load` fallaría.
> Por eso se protege con `try/except` (el `try/catch` de Python; lo verás abajo) o comprobando
> antes si el archivo existe. PolyPaw crea un perfil por defecto si no encuentra el archivo.

---

## 5. Manejo de errores: `try` / `except`

> ### 🟦 ¿Qué significa? — *`try` / `except`*
> Es el equivalente de `try/catch` de JavaScript: intenta un código y, si falla, ejecuta un
> plan B en lugar de romperse:
> ```python
> try:
>     with open("usuario.json", "r", encoding="utf-8") as archivo:
>         datos = json.load(archivo)
> except FileNotFoundError:
>     print("No hay datos aún; creando perfil nuevo.")
>     datos = {"nombre": "", "nivel": "A1", "xp": 0, "racha": 0}
> ```
> `except FileNotFoundError` atrapa específicamente el error de "archivo no encontrado". Manejar
> errores así hace tu programa **robusto** (no se cae ante lo inesperado).

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
