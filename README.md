# Faro 🪔

> **Tus proyectos, siempre a la vista.**

Faro es un organizador de proyectos: reúne el estado de todos tus proyectos en un
solo lugar. Conectas **GitHub** y **Google Drive**, y la IA te dice **qué es** cada
proyecto, en qué **fase** está, su **progreso (%)**, un **roadmap** con hitos y los
**siguientes pasos** — leyendo el contenido real (README, código y documentos).

Hecho con **Next.js 15 + Supabase + Vercel + OpenAI**.

---

## Qué hace (estado actual)

- **Login con Google** (da acceso a Drive) + **Conectar GitHub** (repos, incluidos privados) vía OAuth — sin tokens manuales.
- **Añadir proyecto** enlazando un repo de GitHub y/o **una o varias carpetas de Google Drive**.
- **Análisis automático con IA** que lee el contenido real (README, archivos, lenguajes, milestones y documentos de Drive) y genera:
  - **Descripción** (qué es el proyecto),
  - **Estado** actual,
  - **% de progreso** (híbrido: *milestones* de GitHub si existen, si no lo estima la IA),
  - **Roadmap** con hitos ✓/○,
  - **Siguiente acción** sugerida.
- **Fase deducida** de la actividad real de GitHub (idea / en progreso / en pausa…).
- **Gestión de fuentes** por proyecto: enlazar/quitar repos y carpetas, con **sugerencia automática** de carpetas de Drive por similitud de nombre.
- **Vistas**: Roadmap (columnas por fase con % por proyecto) y Tarjetas, con filtros y búsqueda.
- **Editar / eliminar** proyectos.
- **Branding Faro**: tema oscuro cálido, logo y tipografías (paleta verificada WCAG AA).

---

## Cómo funciona

1. Entras con **Google** y conectas **GitHub**.
2. Añades un proyecto: eliges un **repo** y/o **carpeta(s) de Drive**.
3. Faro lo **analiza solo** y muestra descripción, progreso, roadmap y siguientes pasos.
4. El refresco es **bajo demanda** (botones "Actualizar estado" / "Analizar con IA"): nada se dispara sin que tú lo pidas.

---

## Stack

| Capa | Tecnología |
|---|---|
| Frontend + backend | Next.js 15 (App Router) + React + TypeScript |
| UI | Tailwind CSS (tema propio "Faro") |
| Base de datos + Auth | Supabase (Postgres + RLS + OAuth Google/GitHub) |
| IA | OpenAI (modelo económico configurable) |
| Hosting | Vercel |
| GitHub API | Octokit (con el token OAuth del usuario) |

---

## Puesta en marcha (local)

```bash
npm install
cp .env.local.example .env.local   # rellena las variables (ver abajo)
npm run dev                          # http://localhost:3000
```

El esquema de la base de datos está en `supabase/migrations/`.

### Variables de entorno

- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` — de Supabase.
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` — OAuth de Google (login + Drive; el secret refresca el token de Drive).
- `OPENAI_API_KEY` (+ `OPENAI_MODEL` opcional, por defecto `gpt-4o-mini`).
- `GITHUB_TOKEN` — **opcional/legado**; el acceso a GitHub se hace con OAuth en la app.

### Configuración OAuth

Crear OAuth App de GitHub y credenciales OAuth de Google (con Drive API) y pegarlas en
**Supabase → Authentication → Providers**. Guías paso a paso en `docs/`.

---

## Estructura

```
src/
  app/
    login/                 # entrar con Google / enlace mágico
    auth/callback/         # intercambio OAuth + guardado de tokens
    dashboard/             # estado consolidado (Roadmap / Tarjetas)
    projects/new, [id]/    # añadir y ver/editar proyecto
    api/                   # github, drive, ai/analyze, projects, sources
  components/              # tarjetas, roadmap, fuentes, branding (logo, ui)
  lib/                     # supabase, github, google-drive, openai, analyze, connections
supabase/migrations/       # esquema SQL + RLS
docs/                      # manual de marca y guías (OAuth, token)
```

---

## Roadmap

- [x] Dashboard de estado consolidado (GitHub)
- [x] Branding Faro + vista Roadmap
- [x] Login OAuth (Google) + conexión GitHub (repos privados)
- [x] Análisis por contenido: descripción, progreso %, roadmap
- [x] Google Drive: varias carpetas por proyecto con sugerencia automática
- [x] Editar / eliminar proyectos + gestión de fuentes
- [x] Landing pública
- [ ] Verificación de la app en Google (para abrirla a otros usuarios)
- [ ] Dominio propio
- [ ] Re-análisis programado y "Analizar todo"

---

## Convención de mantenimiento

**Este `README.md` se actualiza en cada cambio funcional del producto** (parte del flujo
de cada PR). Ver `CLAUDE.md` para las convenciones de trabajo del repo.
