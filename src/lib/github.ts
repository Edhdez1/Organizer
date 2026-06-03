import { Octokit } from "@octokit/rest";
import type { GithubSnapshot } from "@/lib/types";

// El token llega del usuario (conexión OAuth de GitHub) o, en su defecto, del
// entorno (compatibilidad). Con el token OAuth del usuario se ven repos privados.
function octokit(token: string | null) {
  if (!token) {
    throw new Error(
      "Conecta tu cuenta de GitHub para leer tus repositorios."
    );
  }
  return new Octokit({ auth: token });
}

export interface RepoOption {
  full_name: string; // 'owner/repo'
  html_url: string;
  description: string | null;
  private: boolean;
  pushed_at: string | null;
}

// Lista los repos accesibles por el token (incluye privados con OAuth del usuario).
export async function listRepos(token: string | null): Promise<RepoOption[]> {
  const gh = octokit(token);
  const repos = await gh.paginate(gh.repos.listForAuthenticatedUser, {
    per_page: 100,
    sort: "pushed",
    affiliation: "owner,collaborator,organization_member",
  });
  return repos.map((r) => ({
    full_name: r.full_name,
    html_url: r.html_url,
    description: r.description,
    private: r.private,
    pushed_at: r.pushed_at ?? null,
  }));
}

// Lee el estado actual de un repo 'owner/repo' y lo normaliza a GithubSnapshot.
export async function fetchRepoSnapshot(
  token: string | null,
  fullName: string
): Promise<GithubSnapshot> {
  const gh = octokit(token);
  const [owner, repo] = fullName.split("/");
  if (!owner || !repo) {
    throw new Error(`Formato de repo inválido: "${fullName}" (esperado owner/repo)`);
  }

  const { data: repoData } = await gh.repos.get({ owner, repo });

  // Conteo de PRs abiertas vía búsqueda (más barato que paginar todo).
  const { data: prSearch } = await gh.search.issuesAndPullRequests({
    q: `repo:${fullName} type:pr state:open`,
    per_page: 1,
  });

  // open_issues_count incluye PRs; restamos las PRs abiertas para el conteo real.
  const openPRs = prSearch.total_count;
  const openIssues = Math.max(0, (repoData.open_issues_count ?? 0) - openPRs);

  // Último commit de la rama por defecto.
  let lastCommit: GithubSnapshot["last_commit"] = null;
  try {
    const { data: commits } = await gh.repos.listCommits({
      owner,
      repo,
      per_page: 1,
    });
    const c = commits[0];
    if (c) {
      lastCommit = {
        sha: c.sha.slice(0, 7),
        message: c.commit.message.split("\n")[0],
        author: c.commit.author?.name ?? c.author?.login ?? null,
        date: c.commit.author?.date ?? null,
      };
    }
  } catch {
    // Repo vacío (sin commits): dejamos last_commit en null.
  }

  return {
    default_branch: repoData.default_branch ?? null,
    open_issues: openIssues,
    open_pull_requests: openPRs,
    last_commit: lastCommit,
    pushed_at: repoData.pushed_at ?? null,
    stars: repoData.stargazers_count ?? 0,
    language: repoData.language ?? null,
  };
}

// Contexto de CONTENIDO del repo, para que la IA describa QUÉ es el proyecto
// (no solo su actividad). Incluye README, archivos, lenguajes y milestones.
export interface RepoContext {
  description: string | null;
  languages: string[];
  topics: string[];
  readme: string | null;
  files: string[];
  milestones: { title: string; open: number; closed: number }[];
}

export async function fetchRepoContext(
  token: string | null,
  fullName: string
): Promise<RepoContext> {
  const gh = octokit(token);
  const [owner, repo] = fullName.split("/");

  const { data: repoData } = await gh.repos.get({ owner, repo });

  let languages: string[] = [];
  try {
    const { data } = await gh.repos.listLanguages({ owner, repo });
    languages = Object.keys(data);
  } catch {}

  let readme: string | null = null;
  try {
    const { data } = await gh.repos.getReadme({ owner, repo });
    readme = Buffer.from(data.content, "base64")
      .toString("utf8")
      .slice(0, 6000); // recorte para no inflar el prompt
  } catch {}

  let files: string[] = [];
  try {
    const { data } = await gh.repos.getContent({ owner, repo, path: "" });
    if (Array.isArray(data)) files = data.map((f) => f.name).slice(0, 60);
  } catch {}

  let milestones: RepoContext["milestones"] = [];
  try {
    const { data } = await gh.issues.listMilestones({
      owner,
      repo,
      state: "all",
      per_page: 30,
    });
    milestones = data.map((m) => ({
      title: m.title,
      open: m.open_issues,
      closed: m.closed_issues,
    }));
  } catch {}

  return {
    description: repoData.description,
    languages,
    topics: repoData.topics ?? [],
    readme,
    files,
    milestones,
  };
}

// Progreso por milestones (parte "hitos" del cálculo híbrido). null si no hay.
export function milestoneProgress(ctx: RepoContext): number | null {
  const total = ctx.milestones.reduce((a, m) => a + m.open + m.closed, 0);
  if (total === 0) return null;
  const closed = ctx.milestones.reduce((a, m) => a + m.closed, 0);
  return Math.round((closed / total) * 100);
}
