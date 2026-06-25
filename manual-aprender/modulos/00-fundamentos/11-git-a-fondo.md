# Capítulo 11 — Git a fondo

> En el capítulo 05 aprendiste a hacer tus primeros `commit` y a guardar la historia de tu proyecto. Ahora vas a llevar Git al siguiente nivel: trabajar con **ramas** para experimentar sin miedo, **fusionar** tu trabajo, resolver **conflictos** cuando dos cambios chocan, **comparar versiones**, **deshacer errores** con calma y decidir qué archivos Git debe **ignorar**. Todo esto es lo que separa a alguien que "usa Git" de alguien que de verdad confía en Git. Y, como bonus, entenderás el mismo flujo de trabajo con ramas y *pull requests* que usamos para construir este propio manual. Bit, tu ajolote guía, te acompaña con la linterna encendida.

## 1. Repaso rápido: ¿dónde quedamos?

En el capítulo 05 vimos que Git guarda "fotos" de tu proyecto llamadas *commits*. Cada commit tiene un mensaje, una fecha y un identificador único. Hasta ahora trabajabas en una sola línea de tiempo: hacías un cambio, lo guardabas, hacías otro, lo guardabas, y así.

El problema aparece cuando quieres **probar algo nuevo sin romper lo que ya funciona**. Por ejemplo, en tu proyecto **RachaSimple** (la app de hábitos en React) quieres añadir una pantalla de estadísticas, pero no estás seguro de que vaya a quedar bien. Si tocas el código directamente y algo falla, te quedas sin nada que funcione. La solución es trabajar en una **rama** separada.

> ### 🟦 ¿Qué significa? — *Rama (branch)*
> Una **rama** es una línea de trabajo paralela dentro de tu repositorio. Es como sacar una fotocopia de tu proyecto en su estado actual y empezar a dibujar sobre esa copia, sin tocar el original. Sirve para experimentar, desarrollar una funcionalidad o arreglar un error de forma aislada. Si sale bien, juntas el resultado con el original; si sale mal, tiras la rama y no pasó nada.
> **¿Dónde se usa en tu proyecto?** En **Faro** (la carpeta Organizer), cada vez que una sesión añade una nueva *feature* lo hace en una rama propia antes de fusionarla a `main`.

## 2. La rama principal y por qué no se toca a la ligera

Cuando creas un repositorio, Git crea una rama por defecto. Hoy se llama casi siempre `main` (antes se llamaba `master`).

> ### 🟦 ¿Qué significa? — *`main`*
> `main` es el nombre de la rama principal: la versión "oficial" y estable de tu proyecto. Sirve como la fuente de la verdad. La idea es que el código en `main` siempre funcione, de modo que cualquiera que lo descargue obtenga algo que no esté roto.

La regla de oro de los proyectos serios es: **no trabajes directamente sobre `main`**. En su lugar, creas una rama para tu tarea, trabajas tranquilo ahí, y solo cuando esté listo y probado lo llevas a `main`. Así `main` se mantiene siempre sano.

> ### 💡 Tip — Una rama, una tarea
> No metas diez cosas distintas en la misma rama. Una rama debería resolver **un** asunto concreto: "añadir login", "arreglar el color del botón", "corregir el cálculo de progreso". Ramas pequeñas y enfocadas son fáciles de revisar y de fusionar.

## 3. Crear, listar y cambiar de rama

Veamos los comandos. Imagina que estás en **RachaSimple** y quieres crear la rama de las estadísticas.

```bash
# Ver en qué rama estás y qué otras existen
git branch

# Crear una rama nueva llamada "estadisticas"
git branch estadisticas

# Cambiarte a esa rama (moverte a esa línea de trabajo)
git switch estadisticas
```

Hay un atajo muy común que **crea la rama y te cambia a ella** en un solo paso:

```bash
git switch -c estadisticas
```

> ### 🟦 ¿Qué significa? — *`switch` y `checkout`*
> `git switch` sirve para moverte entre ramas. Verás también `git checkout` en tutoriales antiguos: hace lo mismo (y más cosas), pero Git separó esa función en `switch` precisamente porque `checkout` hacía demasiadas tareas distintas y confundía. Para cambiar de rama, prefiere `switch`; es más claro.

Cuando te cambias de rama, los archivos en tu carpeta **cambian** para reflejar el estado de esa rama. Si en `main` el archivo `src/components/Stats.tsx` no existía y en tu rama sí, al volver a `main` ese archivo desaparece de la vista (pero sigue guardado en la rama). Esto asusta la primera vez; es normal. No perdiste nada: cada rama recuerda su propia versión.

> ### 🔎 En tu código
> En **RachaSimple**, una rama típica viviría así:
> ```bash
> git switch -c stats-pantalla
> # editas src/components/StatsView.tsx, src/hooks/useStats.ts...
> git add src/components/StatsView.tsx src/hooks/useStats.ts
> git commit -m "Añade vista de estadísticas semanales"
> ```
> Mientras tanto, tu rama `main` sigue intacta con la app funcionando como antes.

## 4. Ver diferencias con `diff`

Antes de guardar nada, conviene mirar **qué cambiaste exactamente**. Para eso está `git diff`.

> ### 🟦 ¿Qué significa? — *`diff` (diferencia)*
> Un **diff** es una comparación que muestra, línea por línea, qué cambió entre dos versiones de un archivo. Las líneas que añadiste aparecen con `+` (normalmente en verde) y las que borraste con `-` (en rojo). Sirve para revisar tu propio trabajo antes de confirmarlo y para entender qué hizo otra persona.

```bash
# Ver los cambios que aún NO has preparado (no hiciste git add)
git diff

# Ver los cambios que YA preparaste con git add
git diff --staged

# Comparar tu rama actual con main
git diff main
```

Una lectura de ejemplo, sobre el archivo `main.js` de **tunal-digital**:

```diff
diff --git a/sitio-web/main.js b/sitio-web/main.js
--- a/sitio-web/main.js
+++ b/sitio-web/main.js
@@ -10,7 +10,7 @@ function enviarMensaje(texto) {
-  const url = "http://localhost:8787/chat";
+  const url = "https://tunal-worker.workers.dev/chat";
   fetch(url, { method: "POST", body: texto });
```

Esto se lee así: en `main.js`, alrededor de la línea 10, **quitaste** la línea con `localhost` y la **reemplazaste** por la URL real del Worker de Cloudflare. El diff te deja revisar exactamente eso antes de hacer commit.

> ### 💡 Tip — Lee siempre tu diff antes del commit
> Hacer `git diff` antes de `git commit` es como releer un mensaje antes de enviarlo. Atrapa errores tontos: una clave de API pegada por accidente, un `console.log` olvidado, una línea borrada de más. Bit te lo recordará.

## 5. Fusionar ramas con `merge`

Cuando tu rama está lista y probada, quieres llevar esos cambios de vuelta a `main`. Eso es **fusionar** (merge).

> ### 🟦 ¿Qué significa? — *Fusionar (merge)*
> **Fusionar** es combinar el trabajo de una rama dentro de otra. Git toma los commits de tu rama y los integra en la rama destino, creando una historia unificada. Sirve para que el trabajo que hiciste aislado pase a formar parte de la versión oficial.

El patrón es: te paras en la rama que va a **recibir** los cambios y le pides que se traiga la otra.

```bash
# 1. Me muevo a la rama destino (la que recibe)
git switch main

# 2. Le traigo el trabajo de la rama "estadisticas"
git merge estadisticas
```

Hay dos formas en que Git puede fusionar:

- **Fast-forward (avance rápido):** si `main` no cambió desde que creaste tu rama, Git simplemente "adelanta" el puntero de `main` hasta tu último commit. No hay nada que combinar; es instantáneo.
- **Merge commit (commit de fusión):** si `main` también avanzó por su cuenta, Git crea un commit especial que une las dos historias. Es perfectamente normal y deseable.

> ### ⚠️ Cuidado — Fusiona hacia donde quieres
> Un error clásico de principiante es fusionar al revés. Recuerda: primero `switch` a la rama **destino**, luego `merge` de la rama **origen**. Si te paras en `estadisticas` y haces `git merge main`, estás trayendo `main` *hacia tu rama*, que a veces es lo que quieres (actualizar tu rama) pero no es "publicar tu trabajo".

## 6. Conflictos: cuando dos cambios chocan

A veces, dos ramas modifican **la misma línea del mismo archivo** de forma distinta. Git no puede adivinar cuál es la correcta, así que se detiene y te pide ayuda. Eso es un **conflicto de fusión**.

> ### 🟦 ¿Qué significa? — *Conflicto (merge conflict)*
> Un **conflicto** ocurre cuando Git no puede combinar dos versiones automáticamente porque ambas tocaron las mismas líneas. No es un error tuyo ni un daño: es Git pidiéndote que decidas tú qué versión gana. Sirve para que nunca se pierda trabajo sin que un humano lo apruebe.

Cuando hay conflicto, Git marca el archivo con unos símbolos especiales. Por ejemplo, en `polypaw_db.json` de **PolyPaw** dos ramas cambiaron el mismo valor:

```text
{
  "version_datos":
<<<<<<< HEAD
  "1.2.0",
=======
  "1.3.0",
>>>>>>> nuevas-misiones
}
```

Cómo leer esto:

- `<<<<<<< HEAD` hasta `=======` es **lo que hay en tu rama actual** (HEAD).
- `=======` hasta `>>>>>>> nuevas-misiones` es **lo que trae la otra rama**.

Tu trabajo es **editar el archivo a mano** para dejarlo como debe quedar, **borrando** las tres líneas de marcas (`<<<<<<<`, `=======`, `>>>>>>>`). Por ejemplo, decides que la versión correcta es la `1.3.0`:

```text
{
  "version_datos": "1.3.0"
}
```

Luego le dices a Git que ya lo resolviste:

```bash
git add polypaw_db.json
git commit          # cierra la fusión
```

> ### 💡 Tip — Calma con los conflictos
> Los conflictos asustan al principio, pero son rutina. La clave es ir archivo por archivo: abre cada uno marcado, decide qué texto queda, borra las marcas, guarda. Si te enredas y quieres empezar de cero, `git merge --abort` cancela la fusión y te devuelve a como estabas antes de empezar.

> ### 🔎 En tu código
> En **Faro** (Next.js), un conflicto típico aparece en `src/lib/` cuando dos sesiones tocan la misma función de análisis con OpenAI. Resolverlo es leer ambas versiones, entender qué hacía cada una, y combinar la lógica a mano para que el resultado tenga sentido, no solo elegir una al azar.

## 7. Deshacer cambios: `restore`, `checkout` y `revert`

Equivocarse es parte de programar. Git te da varias formas de retroceder, según **qué tan lejos** quieres deshacer.

### 7.1 Descartar cambios que aún no guardaste

Editaste `styles.css` de **tunal-digital**, no te gustó y quieres volver a como estaba en el último commit:

```bash
# Forma moderna y recomendada
git restore sitio-web/styles.css

# Forma antigua equivalente
git checkout -- sitio-web/styles.css
```

> ### 🟦 ¿Qué significa? — *`restore`*
> `git restore` devuelve un archivo (o varios) a un estado anterior, normalmente el del último commit. Sirve para tirar a la basura cambios sin guardar que no quieres conservar. **Cuidado:** lo descartado no se recupera, porque nunca llegó a la historia de Git.

> ### ⚠️ Cuidado — `restore` borra de verdad
> A diferencia de un `commit`, lo que descartas con `restore` no está guardado en ningún lado. Úsalo solo cuando estés seguro de que esos cambios no valen nada. Bit sugiere mirar primero con `git diff` para no arrepentirte.

### 7.2 Quitar un archivo del área preparada

Hiciste `git add` de un archivo que no querías incluir todavía:

```bash
# Lo saca de "preparado", pero conserva tus ediciones
git restore --staged backend/worker.js
```

### 7.3 Deshacer un commit que ya está en la historia

Aquí la herramienta más segura es `revert`.

> ### 🟦 ¿Qué significa? — *`revert`*
> `git revert` crea un **nuevo commit** que deshace los cambios de un commit anterior. No borra historia: la *añade*. Es como decir "este commit fue un error, aquí va otro que lo cancela". Sirve para deshacer algo que ya compartiste con otras personas sin reescribir el pasado, lo cual sería peligroso en un trabajo en equipo.

```bash
# Ver los identificadores de los commits
git log --oneline

# Deshacer un commit concreto (usa su identificador corto)
git revert a1b2c3d
```

> ### 💡 Tip — `revert` para historia compartida, `restore` para lo local
> Regla mental sencilla: si el cambio **ya está en GitHub** o lo vio alguien más, usa `revert` (suma un commit que corrige). Si el cambio es **solo tuyo y local**, puedes usar `restore` o rehacerlo sin drama. Reescribir historia que otros ya descargaron causa líos; `revert` los evita.

## 8. `.gitignore`: lo que Git no debe vigilar

No todo lo que hay en tu carpeta debe entrar al repositorio. Cosas como dependencias descargadas, archivos temporales o, sobre todo, **secretos**, deben quedar fuera.

> ### 🟦 ¿Qué significa? — *`.gitignore`*
> `.gitignore` es un archivo de texto donde escribes, una por línea, los nombres o patrones de archivos que quieres que Git **ignore** por completo: no los sigue, no los sube, no los muestra como cambios. Sirve para mantener el repo limpio y, crítico, para no subir contraseñas ni claves de API por accidente.

Un `.gitignore` realista para **Faro** (Next.js) se vería así:

```gitignore
# Dependencias instaladas (se reinstalan con npm install)
node_modules/

# Variables de entorno: AQUÍ viven tus secretos. NUNCA subir.
.env
.env.local

# Resultado de compilar Next.js
.next/

# Archivos del sistema operativo
.DS_Store
```

Cada línea es un patrón. `node_modules/` ignora toda esa carpeta. `.env.local` ignora ese archivo concreto. El `#` marca un comentario para que tú te acuerdes de para qué es cada regla.

> ### ⚠️ Cuidado — Los secretos jamás van a Git
> Las convenciones de **Faro** son tajantes: tokens y claves (las de OpenAI, las de Supabase) viven solo en variables de entorno del servidor, nunca en el código ni en el repositorio. Por eso `.env` y `.env.local` **siempre** están en `.gitignore`. Si alguna vez una clave llega a subirse, debe considerarse comprometida y rotarse (cambiarse) de inmediato.

> ### 🔎 En tu código
> En **PolyPaw** (Python + Flet) tu `.gitignore` ignoraría la carpeta del entorno virtual y los archivos compilados de Python:
> ```gitignore
> __pycache__/
> *.pyc
> .venv/
> ```
> En cambio, sí quieres versionar `missions/*.json` y `polypaw_db.json`, porque esos datos **son** el contenido de la app.

> ### 💡 Tip — Ignora antes de añadir
> `.gitignore` solo evita que se **empiecen** a seguir archivos. Si ya hiciste `git add` de algo y luego lo pones en `.gitignore`, Git lo seguirá vigilando. Para que deje de hacerlo: `git rm --cached archivo` y luego commit. Por eso conviene crear el `.gitignore` al inicio del proyecto.

## 9. El flujo con ramas y *pull requests* (como en este manual)

Ya tienes todas las piezas. Ahora veamos cómo se combinan en un **flujo de trabajo** real, el mismo que usamos para construir este manual y que describen las convenciones de **Faro**.

> ### 🟦 ¿Qué significa? — *Pull request (PR)*
> Un **pull request** (literalmente "solicitud de incorporación") es una propuesta formal, hecha en GitHub, para fusionar una rama dentro de otra. Sirve para revisar los cambios antes de aceptarlos: muestra el diff completo, permite comentarios y deja constancia de qué se decidió. Es la puerta de entrada controlada hacia `main`.

El ciclo completo, paso a paso:

```bash
# 1. Parto de main actualizado
git switch main
git pull                      # traigo lo último del repositorio remoto

# 2. Creo una rama para mi tarea
git switch -c arreglo-progreso

# 3. Trabajo: edito, reviso con diff, hago commits
git add src/app/api/analyze/route.ts
git commit -m "Corrige el cálculo de progreso híbrido"

# 4. Subo mi rama al repositorio remoto (GitHub)
git push -u origin arreglo-progreso
```

Con la rama subida, vas a GitHub y **abres un pull request** de `arreglo-progreso` hacia `main`. Ahí cualquiera (o tú mismo) revisa el diff, comenta y, si todo está bien, lo **fusiona**.

> ### 🟦 ¿Qué significa? — *`push` y `pull`*
> `git push` **sube** tus commits locales al repositorio remoto (GitHub) para compartirlos. `git pull` **baja** los commits que otros subieron, para que tu copia local esté al día. Son los dos sentidos de sincronización entre tu computadora y GitHub.

> ### 🔎 En tu código
> Las convenciones de **Faro** piden un detalle importante: en el **mismo PR** que introduce un cambio funcional, hay que **actualizar el `README.md`** para que la documentación siempre refleje el estado real del producto. Así, cuando alguien revisa tu pull request, ve a la vez el código nuevo y su explicación. Ese es exactamente el espíritu del flujo con PRs: nada entra a `main` sin revisión y sin estar documentado.

> ### 💡 Tip — Por qué este flujo vale la pena
> Ramas + pull requests te dan tres regalos: (1) `main` siempre funciona porque solo recibe trabajo revisado; (2) cada cambio queda documentado con su discusión; (3) puedes experimentar sin miedo, porque una rama fallida se descarta sin tocar lo bueno. Cuando trabajes con otras personas, este flujo deja de ser opcional y se vuelve la forma normal de colaborar.

## 10. Juntándolo todo: una historia completa

Pongamos todo en una sola escena, sobre **RachaSimple**:

```bash
# Empiezo desde main al día
git switch main
git pull

# Rama para la nueva feature
git switch -c racha-semanal

# Edito archivos, reviso lo que cambié
git diff
git add src/hooks/useRacha.ts src/types/database.ts
git commit -m "Añade conteo de racha semanal"

# Ups, me equivoqué en un archivo y aún no lo guardé: lo descarto
git restore src/components/Header.tsx

# Subo y abro un pull request en GitHub
git push -u origin racha-semanal
# (en GitHub: abrir PR, revisar diff, actualizar README, fusionar)
```

Si al fusionar en GitHub aparece un conflicto, lo resuelves localmente: traes `main` a tu rama con `git merge main`, editas los archivos marcados, borras las marcas `<<<<<<<`, haces `git add` y `git commit`, y vuelves a subir. El PR se actualiza solo.

## ✅ Checklist — ¿ya domino esto?

- [ ] Sé crear una rama con `git switch -c nombre` y cambiar entre ramas.
- [ ] Entiendo que `main` es la versión estable y que no se toca directamente.
- [ ] Reviso mis cambios con `git diff` antes de hacer commit.
- [ ] Sé fusionar una rama con `git merge` y entiendo qué es un fast-forward.
- [ ] Sé leer las marcas `<<<<<<<`, `=======`, `>>>>>>>` y resolver un conflicto a mano.
- [ ] Distingo cuándo usar `restore` (cambios locales) y cuándo `revert` (historia compartida).
- [ ] Sé crear un `.gitignore` y entiendo por qué `.env` nunca se sube.
- [ ] Comprendo el flujo rama → push → pull request → merge.
- [ ] Sé que el `README.md` se actualiza en el mismo PR que el cambio funcional.

## 🧪 Ejercicios

1. **💻 Tu primera rama de verdad.** En tu repositorio de **RachaSimple** (o cualquiera tuyo), crea una rama `experimento` con `git switch -c experimento`. Haz un cambio pequeño en un archivo, un commit, y luego vuelve a `main` con `git switch main`. Observa cómo el archivo recupera su estado anterior. Escribe en una nota qué viste pasar con los archivos al cambiar de rama.

2. **💻 Lee un diff.** En **tunal-digital**, edita una línea de `sitio-web/styles.css` (por ejemplo, cambia un color) y, sin hacer `git add`, ejecuta `git diff`. Identifica la línea con `-` y la línea con `+`. Después descarta el cambio con `git restore sitio-web/styles.css` y confirma con `git diff` que ya no hay diferencias.

3. **💻 Provoca y resuelve un conflicto.** En un repositorio de práctica, crea un archivo `notas.txt` con una línea de texto y haz commit en `main`. Crea dos ramas a partir de ahí, y en cada una cambia **esa misma línea** de forma distinta. Fusiona la primera a `main`, luego intenta fusionar la segunda. Cuando aparezca el conflicto, ábrelo, decide qué texto queda, borra las marcas, y termina con `git add` y `git commit`.

4. **💻 Practica `revert`.** Haz un commit con un cambio claramente equivocado (por ejemplo, borra una función en una copia de práctica). Con `git log --oneline` copia su identificador y ejecuta `git revert <id>`. Verifica con `git log` que se creó un commit nuevo que deshace el anterior, sin borrar el original.

5. **Diseña un `.gitignore`.** Sin computadora: para **PolyPaw** y para **Faro**, escribe en papel qué líneas pondrías en cada `.gitignore`. Justifica por qué `missions/*.json` sí se versiona pero `.env.local` no. Explica con tus palabras qué pasaría si subieras tu archivo de variables de entorno a GitHub.

6. **💻 Flujo completo con pull request.** En un repositorio tuyo en GitHub, crea una rama, haz un commit, súbela con `git push -u origin nombre-rama` y abre un pull request hacia `main` desde la web de GitHub. Revisa el diff que te muestra GitHub, escribe una descripción y fusiónalo. Bonus: actualiza el `README.md` en ese mismo PR, como manda la convención del proyecto.
