# Organizer

Organizador de proyectos: un solo lugar para ver el **estado consolidado** de todos
tus proyectos, con la actividad real de **GitHub**, tus notas y un **resumen con IA
bajo demanda** (OpenAI). Google Drive llega en una fase posterior.

> Estado: **MVP Fase 1** (GitHub + IA). Hecho con Next.js 15, Supabase y Vercel.

---

## Cómo funciona (en simple)

1. Curas a mano tus proyectos (tú decides qué cuenta como proyecto).
2. Cada proyecto puede enlazar a un repo de GitHub.
3. Pulsas **"Actualizar estado"** y la app trae issues abiertas, PRs, último commit y
   última actividad de ese repo.
4. Pulsas **"Resumir con IA"** y OpenAI te da un resumen del estado + una **siguiente
   acción sugerida** (que aplicas solo si quieres).

Nada ocurre en automático: todo se dispara cuando tú lo pides.

---

## Puesta en marcha (local)

Requisitos: Node 20+ y una cuenta gratis de [Supabase](https://supabase.com).

1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Crear un proyecto en Supabase y aplicar el esquema:
   - Abre el **SQL Editor** de Supabase y pega el contenido de
     `supabase/migrations/0001_init.sql`. Ejecútalo.
   - En **Authentication → Providers**, deja habilitado **Email** (magic link).
3. Copiar las variables de entorno:
   ```bash
   cp .env.local.example .env.local
   ```
   Rellena `.env.local` (ver sección de credenciales abajo).
4. Arrancar:
   ```bash
   npm run dev
   ```
   Abre http://localhost:3000

---

## Credenciales (una sola vez)

Todas viven en `.env.local` (local) o en las **Environment Variables de Vercel**
(producción). **Nunca** se suben al repo.

### Supabase
`Project Settings → API`:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### GitHub (token fino de solo lectura)
1. GitHub → **Settings** → **Developer settings** → **Fine-grained tokens** →
   *Generate new token*.
2. **Repository access**: los repos que quieras seguir (o "All repositories").
3. **Permissions** (todo en *Read-only*): **Contents**, **Metadata**, **Issues**,
   **Pull requests**.
4. Copia el token y ponlo en `GITHUB_TOKEN`.

> El token **caduca**. Cuando lo haga, las llamadas a GitHub fallarán; basta con
> regenerarlo y actualizar la variable.

### OpenAI
- `OPENAI_API_KEY` con tu clave.
- `OPENAI_MODEL` (opcional): por defecto `gpt-4o-mini`. Alternativas económicas:
  `gpt-4.1-mini`, `gpt-4.1-nano`.

---

## Despliegue en Vercel

1. Conecta este repo a Vercel.
2. Carga las mismas variables de entorno en *Project Settings → Environment Variables*.
3. Cada push al branch despliega solo.

> Notas de planes gratuitos: en el plan **Hobby** de Vercel las funciones tienen un
> límite de 10s (suficiente para el resumen IA con un modelo mini). En el plan **Free**
> de Supabase, el proyecto se **pausa tras 7 días de inactividad** (se reactiva solo en
> la primera visita).

---

## Estructura

```
src/
  app/
    login/                 # entrar con magic link
    auth/callback/         # intercambio de sesión
    dashboard/             # estado consolidado (tarjetas + filtros)
    projects/new, [id]/    # añadir y ver proyecto
    api/                   # github/{repos,refresh}, ai/summarize, projects
  components/              # tarjetas, badges, board, ui
  lib/                     # supabase, github (Octokit), openai, queries, types
supabase/migrations/       # esquema SQL + RLS
```

---

## Roadmap

- **Fase 2 — Google Drive**: enlazar carpetas (OAuth de Google) y sumarlas al estado y
  al resumen IA.
- **Fase 3 — Pulido**: vista tipo tablero por fase, orden manual, refinar móvil.
- **Branding**: paleta y logo (pendiente, con la skill `director-creativo`).
