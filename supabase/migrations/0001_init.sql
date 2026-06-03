-- ─────────────────────────────────────────────────────────────────────────────
-- Organizer — esquema inicial (Fase 1)
-- Tablas: projects, project_sources, source_snapshots
-- Seguridad: RLS activado; cada usuario solo ve/edita lo suyo.
-- ─────────────────────────────────────────────────────────────────────────────

-- Tipos enumerados ----------------------------------------------------------
do $$
begin
  if not exists (select 1 from pg_type where typname = 'project_phase') then
    create type project_phase as enum (
      'idea', 'en_progreso', 'en_pausa', 'bloqueado', 'terminado'
    );
  end if;
  if not exists (select 1 from pg_type where typname = 'source_type') then
    create type source_type as enum ('github_repo', 'drive_folder');
  end if;
end$$;

-- Función util para mantener updated_at -------------------------------------
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- projects ------------------------------------------------------------------
create table if not exists projects (
  id            uuid primary key default gen_random_uuid(),
  owner_id      uuid not null references auth.users(id) on delete cascade,
  name          text not null,
  description   text,
  phase         project_phase not null default 'idea',
  next_action   text,
  tags          text[] not null default '{}',
  ai_summary    text,
  ai_summary_at timestamptz,
  sort_order    int not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

drop trigger if exists trg_projects_updated_at on projects;
create trigger trg_projects_updated_at
  before update on projects
  for each row execute function set_updated_at();

create index if not exists idx_projects_owner on projects(owner_id);

-- project_sources -----------------------------------------------------------
create table if not exists project_sources (
  id           uuid primary key default gen_random_uuid(),
  project_id   uuid not null references projects(id) on delete cascade,
  type         source_type not null,
  external_id  text not null,          -- 'owner/repo' o folderId de Drive
  external_url text,
  label        text,
  created_at   timestamptz not null default now()
);

create index if not exists idx_sources_project on project_sources(project_id);

-- source_snapshots (caché de estado, refresco manual) -----------------------
create table if not exists source_snapshots (
  id         uuid primary key default gen_random_uuid(),
  source_id  uuid not null references project_sources(id) on delete cascade,
  data       jsonb not null default '{}'::jsonb,
  fetched_at timestamptz not null default now()
);

create index if not exists idx_snapshots_source on source_snapshots(source_id);

-- Row Level Security --------------------------------------------------------
alter table projects         enable row level security;
alter table project_sources  enable row level security;
alter table source_snapshots enable row level security;

-- projects: el dueño manda
drop policy if exists "projects_owner_all" on projects;
create policy "projects_owner_all" on projects
  for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);

-- project_sources: accesible si el proyecto padre es del usuario
drop policy if exists "sources_owner_all" on project_sources;
create policy "sources_owner_all" on project_sources
  for all using (
    exists (select 1 from projects p where p.id = project_id and p.owner_id = auth.uid())
  ) with check (
    exists (select 1 from projects p where p.id = project_id and p.owner_id = auth.uid())
  );

-- source_snapshots: accesible vía la fuente → proyecto del usuario
drop policy if exists "snapshots_owner_all" on source_snapshots;
create policy "snapshots_owner_all" on source_snapshots
  for all using (
    exists (
      select 1 from project_sources s
      join projects p on p.id = s.project_id
      where s.id = source_id and p.owner_id = auth.uid()
    )
  ) with check (
    exists (
      select 1 from project_sources s
      join projects p on p.id = s.project_id
      where s.id = source_id and p.owner_id = auth.uid()
    )
  );
