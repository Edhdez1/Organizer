import { Octokit } from "@octokit/rest";
import type { GithubSnapshot } from "@/lib/types";

// El token vive SOLO en el servidor (variable de entorno GITHUB_TOKEN).
function octokit() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new Error(
      "Falta GITHUB_TOKEN. Genera un token fino de solo lectura y configúralo."
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

// Lista los repos accesibles por el token (para elegir al añadir un proyecto).
export async function listRepos(): Promise<RepoOption[]> {
  const gh = octokit();
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
export async function fetchRepoSnapshot(fullName: string): Promise<GithubSnapshot> {
  const gh = octokit();
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
