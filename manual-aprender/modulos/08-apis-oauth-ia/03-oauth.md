# Capítulo 03 — OAuth: login con terceros

> ¿Has visto el botón "Iniciar sesión con Google"? Eso es **OAuth**. Permite que una app (como
> Faro) actúe en tu nombre en otro servicio (como tu Google Drive o tu GitHub) **sin que le des
> tu contraseña**. Suena mágico; es ingenioso, y aquí lo desmontamos en pasos simples.

---

## 1. El problema que resuelve OAuth

Faro necesita leer tus repos de GitHub y tus carpetas de Drive. Opción mala: que le des tu
usuario y contraseña de Google a Faro. **Pésima idea**: le darías acceso TOTAL y para siempre, y
tendrías que confiar en que Faro guarde bien tu contraseña. OAuth resuelve esto.

> ### 🟦 ¿Qué significa? — *OAuth*
> **OAuth** (*Open Authorization*) es un estándar que permite que una app obtenga **permiso
> limitado** para actuar en tu nombre en otro servicio, **sin conocer tu contraseña**. Tú te
> autenticas **directamente con el servicio** (Google, GitHub), y este le entrega a la app un
> **permiso acotado** y revocable.
> Analogía: la **llave de hotel**. No le das la llave maestra de tu casa al hotel; recibes una
> tarjeta que **solo** abre tu habitación, **solo** durante tu estancia, y se puede desactivar.
> OAuth es esa tarjeta para tus datos.

---

## 2. Los actores y el "permiso acotado"

> ### 🟦 ¿Qué significa? — *Los tres participantes*
> - **Tú** (el usuario / dueño de los datos).
> - **La app** que quiere acceso (Faro).
> - **El proveedor** que tiene tus datos y verifica tu identidad (Google, GitHub).

> ### 🟦 ¿Qué significa? — *Scope (alcance del permiso)*
> El **scope** es **qué exactamente** puede hacer la app. Por eso, al pulsar "Conectar GitHub",
> ves una pantalla que dice "Faro quiere: leer tus repositorios". Eso es el scope: un permiso
> **limitado** (leer repos, no borrar; ver Drive, no tu Gmail). Tú lo apruebas conscientemente.

---

## 3. El flujo de OAuth, paso a paso

Parece complejo, pero es una coreografía de redirecciones. Síguelo despacio:

```
1. Clic en "Conectar GitHub" en Faro.
2. Faro te REDIRIGE a GitHub (al sitio real de GitHub, no a Faro).
3. En GITHUB inicias sesión (si no lo estabas) y ves: "Faro quiere leer tus repos. ¿Permitir?".
4. Aceptas. GitHub te REDIRIGE de vuelta a Faro con un "código de autorización" temporal.
5. Faro (en su servidor) cambia ese código por un TOKEN de acceso, hablando con GitHub.
6. Con ese token, Faro ya puede pedir tus repos a la API de GitHub, en tu nombre.
```

> ### 🟦 ¿Qué significa? — *Token de acceso y código de autorización*
> - El **código de autorización** es un vale temporal y de un solo uso que GitHub te da tras
>   aceptar; viaja en la URL de vuelta.
> - Faro cambia ese código (desde su **servidor**, en secreto) por un **token de acceso**: la
>   credencial real con la que llamará a la API en tu nombre. El token nunca pasa por tu
>   navegador a la vista; se maneja en el servidor.
> ¿Por qué dos pasos (código → token)? Por seguridad: el token, lo valioso, solo se entrega
> servidor-a-servidor, no expuesto en la URL.

> ### 🟦 ¿Qué significa? — *Redirección (redirect)*
> **Redirigir** es que una web te **envíe automáticamente** a otra dirección. OAuth se basa en
> redirecciones: de la app al proveedor (para que te autentiques **allí**, no en la app) y de
> vuelta. Esto es clave: **tu contraseña la escribes solo en Google/GitHub**, nunca en Faro.

---

## 4. Autenticación vs. "login social"

> ### 🟦 ¿Qué significa? — *Login social*
> OAuth también sirve para **iniciar sesión** en una app usando tu cuenta de otro servicio
> ("Entrar con Google"). En vez de crear otra contraseña, Google le confirma a la app "sí, es
> esta persona". Es cómodo (una contraseña menos) y seguro (Google cuida la autenticación). Es lo
> que viste en el Módulo 07: **Supabase Auth** ofrece login con Google/GitHub usando OAuth por
> debajo.

> ### 🔎 En tu código
> - **Faro** usa OAuth para dos cosas: que inicies sesión (login social con Google) **y** para
>   obtener permiso de leer tu GitHub y tu Drive. El intercambio ocurre en
>   `src/app/auth/callback/` (el paso 4-5 del flujo), y los tokens se guardan de forma segura del
>   lado servidor (en `user_connections` con RLS, como recalca su `CLAUDE.md`).
> - Los documentos `docs/OAUTH-SETUP.md` y `docs/TOKEN-MANAGEMENT.md` de Faro explican cómo se
>   configuró y cómo se **refrescan** los tokens cuando caducan.

> ### 🟦 ¿Qué significa? — *Refrescar un token (refresh token)*
> Los tokens de acceso **caducan** (por seguridad). Un **refresh token** es una credencial extra
> que permite obtener un token nuevo **sin** molestarte a ti otra vez. Por eso Faro puede seguir
> leyendo tu Drive días después sin pedirte login de nuevo: refresca el token solo, por detrás.

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Entiendo qué problema resuelve **OAuth** (acceso sin dar tu contraseña).
- [ ] Uso la analogía de la **llave de hotel** (permiso limitado y revocable).
- [ ] Conozco los tres actores y qué es el **scope**.
- [ ] Puedo narrar el **flujo** (clic → redirección al proveedor → permiso → código → token).
- [ ] Entiendo por qué tu contraseña solo se escribe en el **proveedor**, no en la app.
- [ ] Sé qué es un **refresh token** y para qué sirve.

---

## 🧪 Ejercicios

1. **La llave de hotel.** Explica OAuth con esa analogía: ¿qué es la tarjeta, la habitación, la
   recepción y el "solo durante tu estancia"?
2. **Por qué no la contraseña.** Da dos razones por las que es mejor que Faro use OAuth en lugar
   de pedirte tu usuario y contraseña de Google.
3. **Ordena el flujo.** Pon en orden: "GitHub te redirige de vuelta con un código", "haces clic
   en Conectar", "Faro cambia el código por un token", "apruebas el permiso en GitHub".
4. **Scope.** Si una app te pide al conectar "permiso para leer y **borrar** todos tus correos"
   pero solo es un visor de fotos, ¿qué deberías sospechar?
5. **Refresh.** Explica por qué Faro puede leer tu Drive una semana después sin pedirte login otra
   vez.

➡️ Siguiente: **[Capítulo 04 — Integrar IA](04-integrar-ia.md)**.
