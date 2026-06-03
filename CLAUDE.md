# Convenciones del proyecto Faro

Guía para cualquier sesión de Claude que trabaje en este repo.

## Regla principal

- **Actualiza siempre `README.md` en el mismo PR que introduce un cambio funcional**
  (nueva feature, cambio de flujo, de stack o de variables de entorno). El README debe
  reflejar el estado real del producto en todo momento. Esta es una regla explícita del
  dueño del proyecto.
- Si el cambio toca la sección de Roadmap del README, marca lo hecho con `[x]`.

## Flujo de trabajo

- Desarrollar en la rama indicada para la sesión; abrir PR a `main` y fusionar con
  método *merge*.
- Verificar que `npm run build` pasa antes de fusionar.
- Idioma del producto y de la documentación: **español**.

## Producto

- Faro = organizador de proyectos. Lee GitHub + Google Drive vía OAuth (Supabase Auth)
  y genera, con IA (OpenAI), descripción, estado, progreso % (híbrido milestones/IA) y
  roadmap por proyecto.
- Filosofía: refresco **bajo demanda** (el usuario dispara el análisis), control manual
  de fases y fuentes, con sugerencias automáticas donde aporten.

## Seguridad

- Tokens y secretos solo en el servidor (variables de entorno / `user_connections` con
  RLS). Nunca exponer claves en el cliente ni commitearlas.
