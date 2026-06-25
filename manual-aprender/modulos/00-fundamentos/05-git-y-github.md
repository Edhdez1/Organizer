# Capítulo 05 — Git y GitHub

> Tus cuatro proyectos viven en GitHub. Cada vez que la IA "subió cambios" usó Git por debajo.
> Entender Git es entender cómo se guarda, versiona y comparte el código en el mundo real. Es,
> además, una red de seguridad que te deja experimentar sin miedo a romper nada.

---

## 1. El problema que Git resuelve

Imagina que escribes un trabajo y vas guardando: `trabajo.doc`, `trabajo_final.doc`,
`trabajo_final_AHORA_SI.doc`, `trabajo_final_v3_bueno.doc`… Un caos. Y si trabajan dos
personas, peor: ¿cómo juntan sus cambios sin pisarse?

> ### 🟦 ¿Qué significa? — *Control de versiones*
> Un **sistema de control de versiones** es un programa que **guarda el historial completo** de
> los cambios de tus archivos: quién cambió qué, cuándo y por qué. Puedes volver a cualquier
> punto anterior, comparar versiones y combinar el trabajo de varias personas sin perder nada.

> ### 🟦 ¿Qué significa? — *Git*
> **Git** es **el** sistema de control de versiones más usado del mundo. Funciona en tu propia
> computadora (no necesita internet) y guarda "fotos" de tu proyecto a lo largo del tiempo.
> Lo creó en 2005 Linus Torvalds (el mismo de Linux).

> ### 💡 Tip — Git ≠ GitHub
> **Git** es la herramienta (vive en tu computadora). **GitHub** es un **sitio web** donde
> guardas una copia de tus proyectos Git en internet para respaldarlos y compartirlos. Puedes
> usar Git sin GitHub; GitHub sin Git no tiene sentido. (Existen alternativas a GitHub, como
> GitLab o Bitbucket: son "el mismo concepto", páginas para alojar repositorios Git.)

---

## 2. El vocabulario esencial de Git

Estas cinco palabras te abren el 90% de Git. Léelas con calma.

> ### 🟦 ¿Qué significa? — *Repositorio (repo)*
> Un **repositorio** es **la carpeta de tu proyecto con su historial de cambios incluido**.
> Cuando "inicias Git" en una carpeta, esta se vuelve un repo: además de tus archivos, guarda
> (en una subcarpeta oculta `.git`) toda la historia. `tunal-digital`, `PolyPaw`, `RachaSimple`
> y `Faro` son cada uno un repositorio.

> ### 🟦 ¿Qué significa? — *Commit (punto de guardado)*
> Un **commit** es **una "foto" del proyecto en un momento dado**, con un mensaje que describe
> qué cambiaste. Es como un punto de guardado en un videojuego: siempre puedes volver a él.
> Cada commit tiene un identificador único (un código como `e7c66d6`).
> **Buen hábito:** commits pequeños y frecuentes, con mensajes claros ("añade formulario de
> contacto"), mejor que uno gigante ("muchos cambios").

> ### 🟦 ¿Qué significa? — *Rama (branch)*
> Una **rama** es **una línea de trabajo paralela**. La rama principal suele llamarse `main`.
> Si quieres probar algo sin arriesgar lo que funciona, creas una rama aparte, trabajas ahí, y
> si sale bien la **unes** de vuelta. Si sale mal, la descartas y `main` quedó intacta.
> **¿Dónde se usó en tu proyecto?** Este mismo manual se escribió en la rama
> `claude/programming-fundamentals-manual-p2xv7n`, separada de `main`, y luego se unió.

> ### 🟦 ¿Qué significa? — *Merge (unir)*
> Hacer **merge** es **combinar** los cambios de una rama dentro de otra (por ejemplo, traer lo
> de tu rama de trabajo a `main`). Git intenta juntar los cambios automáticamente.

> ### 🟦 ¿Qué significa? — *Conflicto (merge conflict)*
> Un **conflicto** ocurre cuando dos ramas cambiaron **la misma línea** de un archivo de forma
> distinta, y Git no sabe cuál conservar. No es un error grave: Git te marca las dos versiones
> y tú eliges. Pasa, y se resuelve a mano.

---

## 3. Los tres "lugares" donde vive tu cambio

Esta es la idea que más confunde al principio, así que vamos despacio. Un cambio pasa por tres
estados antes de quedar guardado en internet:

```
   Tu carpeta            Zona de       Repositorio        GitHub
  (working dir)          preparación    local             (remoto)
        │                  (staging)        │                 │
   editas un  ──git add──►   listo   ──git commit──► guardado ──git push──► respaldado
   archivo                 para guardar    (foto)            en internet
```

> ### 🟦 ¿Qué significa? — *Área de preparación (staging)*
> El **staging** es una "sala de espera" donde **eliges qué cambios entran en el próximo
> commit**. Editas muchos archivos, pero quizá solo quieres guardar algunos: con `git add`
> los pones en staging. Sirve para hacer commits ordenados.

> ### 🟦 ¿Qué significa? — *Local vs. remoto*
> **Local** = en tu computadora. **Remoto** = la copia en internet (GitHub). El remoto por
> convención se llama `origin`. Trabajas local y, cuando quieres respaldar/compartir, **empujas**
> (`push`) al remoto. Para traer cambios del remoto, **jalas** (`pull`).

---

## 4. El flujo de trabajo, con sus comandos

Este es el ciclo que repetirás miles de veces:

| Paso | Comando | Qué hace |
|---|---|---|
| 1. Ver el estado | `git status` | Muestra qué cambiaste y qué falta por guardar |
| 2. Preparar cambios | `git add archivo` (o `git add .`) | Pone cambios en *staging* |
| 3. Guardar (foto) | `git commit -m "mensaje"` | Crea el commit con un mensaje |
| 4. Subir a GitHub | `git push` | Envía tus commits al remoto |
| 5. Traer cambios | `git pull` | Descarga los commits que haya en el remoto |
| — Ver historial | `git log` | Lista los commits anteriores |
| — Crear rama | `git checkout -b nombre` | Crea y entra a una rama nueva |

> ### 💡 Tip — El mensaje de commit le habla a tu yo futuro
> Dentro de seis meses no recordarás qué hiciste. Un buen mensaje ("corrige el cálculo de la
> racha cuando se salta un día") te ahorra horas. Escríbelos en presente y describe el *qué* y
> el *por qué*, no el *cómo*.

> ### ⚠️ Cuidado — Nunca subas secretos
> Contraseñas, claves de API y tokens **jamás** deben ir en un commit (quedan en el historial
> para siempre, aunque los borres después). Por eso existe el archivo `.gitignore`.

> ### 🟦 ¿Qué significa? — *.gitignore*
> Es un archivo de texto donde listas **lo que Git debe ignorar** (no guardar): claves
> secretas, la carpeta `node_modules` (dependencias que se reinstalan), archivos temporales.
> **¿Dónde se usa en tu proyecto?** Faro tiene un `.gitignore` que excluye `.env.local` (donde
> viven las claves de Supabase y OpenAI). Así nunca se suben por error. Lo recalca incluso el
> `CLAUDE.md` del proyecto: *"Nunca exponer claves en el cliente ni commitearlas."*

---

## 5. Pull request: la forma de proponer cambios

> ### 🟦 ¿Qué significa? — *Pull request (PR)*
> Un **pull request** ("solicitud de incorporación") es una **propuesta**, en GitHub, de unir
> tu rama a otra (normalmente a `main`). Dice: "preparé estos cambios, ¿los revisamos y
> unimos?". Permite ver el *diff* (las diferencias), comentar, y aprobar antes de fusionar.
> **¿Dónde lo viste?** Esta primera tanda del manual se subió como el **Pull Request #14** de
> tu repo `organizer`; tú lo revisaste y lo fusionaste a `main`. Ese es el flujo profesional:
> nada entra a `main` sin pasar por un PR.

> ### 🟦 ¿Qué significa? — *Diff (diferencias)*
> El **diff** muestra, línea por línea, **qué se añadió** (normalmente en verde con `+`) y
> **qué se quitó** (en rojo con `-`) respecto a la versión anterior. Es cómo se revisa el
> trabajo sin leer todo el archivo de nuevo.

---

## 6. Instalarlo (cuando estés en tu computadora)

1. Descarga Git de <https://git-scm.com> e instálalo (en macOS quizá ya lo tengas).
2. Comprueba que quedó instalado: en la terminal, `git --version` (debe mostrar un número).
3. Preséntate ante Git una sola vez (para que firme tus commits con tu nombre):
   ```
   git config --global user.name "Edwar"
   git config --global user.email "tu-correo@ejemplo.com"
   ```
4. Crea una cuenta gratis en <https://github.com> (ya la tienes: `Edhdez1`).

> ### 💡 Tip — No memorices, entiende el ciclo
> No necesitas saberte todos los comandos de Git de memoria (¡son cientos!). Con entender el
> ciclo **editar → add → commit → push**, y saber buscar el resto, vas sobradísimo para
> empezar. Lo demás lo aprenderás cuando lo necesites.

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Entiendo qué problema resuelve el **control de versiones**.
- [ ] Distingo **Git** (herramienta local) de **GitHub** (sitio web remoto).
- [ ] Sé qué es un **repositorio**, un **commit**, una **rama**, un **merge** y un **conflicto**.
- [ ] Comprendo los tres lugares: **working dir → staging → commit → push** a remoto.
- [ ] Conozco el ciclo de comandos `status → add → commit → push` y para qué sirve `pull`.
- [ ] Sé qué es un **pull request**, un **diff** y por qué **nunca** se suben secretos.

---

## 🧪 Ejercicios

1. **El videojuego.** Explica, con la analogía de los puntos de guardado, qué es un *commit* y
   por qué conviene hacer muchos pequeños en vez de uno gigante.
2. **Ordena el flujo.** Pon en orden estos pasos: `git push`, editar el archivo, `git commit`,
   `git add`. Explica qué hace cada uno.
3. **Local o remoto.** ¿Cuáles de estas acciones necesitan internet? `git add`, `git commit`,
   `git push`, `git pull`, `git log`.
4. **Secretos.** Tu amigo va a subir a GitHub un archivo `config.js` con la clave de su API
   dentro. ¿Qué le adviertes y qué solución le propones?
5. 💻 **Tu primer repo (cuando tengas Git).** Crea una carpeta, ábrela en la terminal, ejecuta
   `git init`, crea un archivo, y haz tu primer ciclo: `git status` → `git add .` →
   `git commit -m "primer commit"` → `git log`. Anota qué mostró cada comando.
6. **Relee tu propio PR.** Entra al Pull Request #14 de tu repo `organizer` en GitHub y observa
   la pestaña de *Files changed*: eso es un **diff**. Identifica una línea añadida (verde).

---

🎉 **¡Terminaste el Módulo 00!** Ya tienes el mapa mental completo: sabes qué es programar,
cómo funciona una computadora, cómo viaja la información por internet, cómo dar órdenes por
terminal y cómo se guarda y comparte el código con Git. Con esta base, el resto encaja.

➡️ Siguiente módulo: **[01 — HTML](../01-html/README.md)** *(en preparación)*.
