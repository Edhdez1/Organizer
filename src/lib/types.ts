// Tipos compartidos del dominio de Organizer.

export type ProjectPhase =
  | "idea"
  | "en_progreso"
  | "en_pausa"
  | "bloqueado"
  | "terminado";

export type SourceType = "github_repo" | "drive_folder";

export interface RoadmapStep {
  title: string;
  done: boolean;
}

export interface Project {
  id: string;
  owner_id: string;
  name: string;
  description: string | null;
  phase: ProjectPhase;
  next_action: string | null;
  tags: string[];
  ai_summary: string | null;
  ai_summary_at: string | null;
  ai_description: string | null;
  progress_pct: number | null;
  roadmap: RoadmapStep[];
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ProjectSource {
  id: string;
  project_id: string;
  type: SourceType;
  external_id: string;
  external_url: string | null;
  label: string | null;
  created_at: string;
}

// Datos normalizados que guardamos en source_snapshots.data para GitHub.
export interface GithubSnapshot {
  default_branch: string | null;
  open_issues: number;
  open_pull_requests: number;
  last_commit: {
    sha: string;
    message: string;
    author: string | null;
    date: string | null;
  } | null;
  pushed_at: string | null;
  stars: number;
  language: string | null;
}

export interface SourceSnapshot {
  id: string;
  source_id: string;
  data: GithubSnapshot | Record<string, unknown>;
  fetched_at: string;
}

// Proyecto con sus fuentes y el último snapshot de cada una (para el dashboard).
export interface ProjectWithSources extends Project {
  sources: (ProjectSource & { snapshot: SourceSnapshot | null })[];
}

// ── Agenda / preferencias ───────────────────────────────────────────────────
export type DeviceKind = "off" | "phone" | "computer";
export type Weekday = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export interface DayConfig {
  device: DeviceKind;
  hours: number;
}
export interface DeviceProfile {
  label: string;
  capabilities: string;
}
export interface UserPrefs {
  timezone: string;
  days: Record<Weekday, DayConfig>;
  devices: { phone: DeviceProfile; computer: DeviceProfile };
}

export interface AgendaBlock {
  start: string; // "HH:MM"
  end: string; // "HH:MM"
  project_id: string | null;
  project_name: string;
  task: string;
  device: DeviceKind;
}
export interface AgendaDay {
  date: string; // ISO "YYYY-MM-DD"
  weekday: Weekday;
  device: DeviceKind;
  blocks: AgendaBlock[];
}
export interface AgendaPlan {
  days: AgendaDay[];
}
