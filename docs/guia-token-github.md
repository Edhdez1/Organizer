# Mini-guía: crear tu token de GitHub (solo lectura)

Faro necesita un **token fino de solo lectura** para leer el estado de tus repos
(issues, PRs, último commit). Es de solo lectura: **no puede modificar nada** en tu
GitHub. Se hace una vez y tarda ~2 minutos.

---

## Pasos

1. Entra a 👉 **https://github.com/settings/tokens?type=beta**
   (o: foto de perfil → *Settings* → *Developer settings* → *Fine-grained tokens*).

2. Pulsa **"Generate new token"**.

3. Rellena:
   - **Token name:** `faro` (el nombre que quieras).
   - **Expiration:** 90 días (o "custom"; cuando caduque lo regeneras igual).
   - **Resource owner:** tu usuario.

4. **Repository access** → elige una opción:
   - **All repositories** (recomendado, así Faro ve todos tus proyectos), o
   - **Only select repositories** y eliges los que quieras seguir.

5. **Permissions → Repository permissions.** Pon estos cuatro en **Read-only**
   (déjate el resto en "No access"):
   - **Contents** → *Read-only*
   - **Metadata** → *Read-only* (se activa solo)
   - **Issues** → *Read-only*
   - **Pull requests** → *Read-only*

6. Pulsa **"Generate token"** y **copia el token** (empieza por `github_pat_…`).
   ⚠️ Solo se muestra una vez; cópialo ya.

7. Pégalo en **Vercel** como variable de entorno con el nombre **`GITHUB_TOKEN`**
   (ver más abajo).

---

## ¿Dónde pego el token? (Vercel)

En Vercel, dentro de tu proyecto: **Settings → Environment Variables → Add New**:

| Name | Value |
|---|---|
| `GITHUB_TOKEN` | *(el token que copiaste)* |

Guarda y vuelve a desplegar (*Deployments → ⋯ → Redeploy*) para que tome el cambio.

---

## Cuando caduque

Si un día Faro deja de traer datos de GitHub y ves un error de permisos (401), es que el
token caducó. Repite los pasos, genera uno nuevo y actualiza el valor de `GITHUB_TOKEN`
en Vercel. Nada más.
