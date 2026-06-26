# Capítulo 03 — OAuth: login con terceros

<p align="center">
  <img src="../../recursos/imagenes/08-apis-oauth-ia/cap03.png" alt="Ilustración del capítulo (pixel art con Bit)" width="640">
</p>


> ¿Te suena el botón "Iniciar sesión con Google"? Detrás de ese botón hay **OAuth**. Es lo que
> permite que una app (como Faro) actúe en tu nombre en otro servicio (tu Google Drive, tu GitHub)
> **sin que le entregues tu contraseña**. La primera vez parece cosa de magia, pero en realidad es
> bastante ingenioso, y en este capítulo lo vamos a ir desarmando pieza por pieza.

---

## 1. El problema que resuelve OAuth

Faro necesita leer tus repos de GitHub y tus carpetas de Drive. La salida fácil sería que le
dieras directamente tu usuario y contraseña de Google. Y sería **una pésima idea**: le estarías
dando acceso total, para siempre, y tendrías que cruzar los dedos para que Faro guarde tu
contraseña con cuidado. OAuth nació justo para evitar ese escenario.

> ### 🟦 ¿Qué significa? — *OAuth*
> **OAuth** (*Open Authorization*) es un estándar que permite que una app obtenga **permiso
> limitado** para actuar en tu nombre en otro servicio, **sin conocer tu contraseña**. La gracia
> está en que tú te autenticas **directamente con el servicio** (Google, GitHub), y es ese
> servicio quien le entrega a la app un **permiso acotado** y que se puede revocar cuando quieras.
> Piénsalo como la **llave de un hotel**. No le entregas la llave maestra de tu casa al hotel;
> recibes una tarjeta que abre **solo** tu habitación, **solo** mientras dura tu estancia, y que
> se puede desactivar en cualquier momento. OAuth es exactamente esa tarjeta, pero para tus datos.

---

## 2. Los actores y el "permiso acotado"

> ### 🟦 ¿Qué significa? — *Los tres participantes*
> - **Tú** (el usuario, el dueño de los datos).
> - **La app** que quiere acceso (Faro).
> - **El proveedor** que guarda tus datos y verifica tu identidad (Google, GitHub).

> ### 🟦 ¿Qué significa? — *Scope (alcance del permiso)*
> El **scope** es el detalle de **qué puede hacer exactamente** la app. Por eso, cuando pulsas
> "Conectar GitHub", aparece una pantalla que dice algo como "Faro quiere: leer tus
> repositorios". Eso es el scope en acción: un permiso **limitado** (leer repos, no borrarlos;
> ver Drive, no husmear tu Gmail). Y eres tú quien lo aprueba a conciencia.

---

## 3. El flujo de OAuth, paso a paso

A primera vista parece enrevesado, pero en el fondo es una coreografía de redirecciones. Léelo con
calma y sigue cada paso:

```
1. Clic en "Conectar GitHub" en Faro.
2. Faro te REDIRIGE a GitHub (al sitio real de GitHub, no a Faro).
3. En GITHUB inicias sesión (si no lo estabas) y ves: "Faro quiere leer tus repos. ¿Permitir?".
4. Aceptas. GitHub te REDIRIGE de vuelta a Faro con un "código de autorización" temporal.
5. Faro (en su servidor) cambia ese código por un TOKEN de acceso, hablando con GitHub.
6. Con ese token, Faro ya puede pedir tus repos a la API de GitHub, en tu nombre.
```

> ### 🟦 ¿Qué significa? — *Token de acceso y código de autorización*
> - El **código de autorización** es un vale temporal y de un solo uso que GitHub te entrega
>   cuando aceptas; viaja en la URL de vuelta.
> - Faro toma ese código (desde su **servidor**, sin que lo veas) y lo cambia por un **token de
>   acceso**: la credencial de verdad, con la que llamará a la API en tu nombre. El token no anda
>   paseándose a la vista por tu navegador; todo el manejo ocurre en el servidor.
> ¿Y por qué dar ese rodeo de dos pasos, código y luego token? Por seguridad: lo realmente
> valioso, el token, solo se entrega de servidor a servidor, nunca queda expuesto en la URL.

> ### 🟦 ¿Qué significa? — *Redirección (redirect)*
> **Redirigir** es que una web te **mande automáticamente** a otra dirección. OAuth se sostiene
> sobre redirecciones: de la app al proveedor (para que te autentiques **allí**, no en la app) y
> luego de vuelta. Y esto es lo importante: **tu contraseña la escribes solo en Google o en
> GitHub**, nunca en Faro.

---

## 4. Autenticación vs. "login social"

> ### 🟦 ¿Qué significa? — *Login social*
> OAuth también sirve para **iniciar sesión** en una app usando tu cuenta de otro servicio
> ("Entrar con Google"). En lugar de inventarte otra contraseña, Google le confirma a la app "sí,
> es esta persona". Te quitas una contraseña de encima (cómodo) y dejas la autenticación en manos
> de Google (seguro). Es justo lo que viste en el Módulo 07: **Supabase Auth** ofrece login con
> Google y GitHub apoyándose en OAuth por debajo.

> ### 🔎 En tu código
> - **Faro** usa OAuth para dos cosas: para que inicies sesión (login social con Google) **y**
>   para conseguir permiso de leer tu GitHub y tu Drive. El intercambio sucede en
>   `src/app/auth/callback/` (los pasos 4 y 5 del flujo), y los tokens se guardan de forma segura
>   del lado del servidor (en `user_connections` con RLS, tal como insiste su `CLAUDE.md`).
> - Los documentos `docs/OAUTH-SETUP.md` y `docs/TOKEN-MANAGEMENT.md` de Faro cuentan cómo se
>   configuró todo y cómo se **refrescan** los tokens cuando caducan.

> ### 🟦 ¿Qué significa? — *Refrescar un token (refresh token)*
> Los tokens de acceso **caducan** a propósito, por seguridad. Un **refresh token** es una
> credencial extra que sirve para conseguir un token nuevo **sin** tener que molestarte a ti otra
> vez. Por eso Faro puede seguir leyendo tu Drive días después sin pedirte que vuelvas a iniciar
> sesión: refresca el token por su cuenta, en segundo plano.

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
