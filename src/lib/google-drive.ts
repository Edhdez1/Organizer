// Cliente mínimo de Google Drive usando el access_token del usuario (OAuth).
// Lee carpetas y el contenido de una carpeta (lista de archivos + texto de Google
// Docs) para alimentar el análisis con IA.

const DRIVE = "https://www.googleapis.com/drive/v3";

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  modifiedTime?: string;
}

async function driveList(
  token: string,
  params: Record<string, string>
): Promise<DriveFile[]> {
  const url = new URL(`${DRIVE}/files`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    throw new Error(`Google Drive: ${res.status}. Reconecta Google si persiste.`);
  }
  const data = await res.json();
  return data.files ?? [];
}

export interface DriveFolder {
  id: string;
  name: string;
}

// Lista las carpetas del usuario (para el selector al enlazar Drive).
export async function listDriveFolders(token: string): Promise<DriveFolder[]> {
  const files = await driveList(token, {
    q: "mimeType='application/vnd.google-apps.folder' and trashed=false",
    fields: "files(id,name)",
    pageSize: "200",
    orderBy: "name",
    spaces: "drive",
  });
  return files.map((f) => ({ id: f.id, name: f.name }));
}

export interface DriveContext {
  files: string[];
  docs: string[]; // texto extraído de Google Docs
  fileCount: number;
  lastModified: string | null;
}

// Lee el contenido de una carpeta: nombres de archivos + texto de hasta 3 Google
// Docs (exportados a texto plano), para que la IA entienda el proyecto.
export async function fetchDriveContext(
  token: string,
  folderId: string
): Promise<DriveContext> {
  const files = await driveList(token, {
    q: `'${folderId}' in parents and trashed=false`,
    fields: "files(id,name,mimeType,modifiedTime)",
    pageSize: "200",
    orderBy: "modifiedTime desc",
  });

  const docs: string[] = [];
  const gdocs = files
    .filter((f) => f.mimeType === "application/vnd.google-apps.document")
    .slice(0, 3);
  for (const d of gdocs) {
    try {
      const res = await fetch(
        `${DRIVE}/files/${d.id}/export?mimeType=text/plain`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.ok) {
        const text = await res.text();
        docs.push(`# ${d.name}\n${text.slice(0, 3000)}`);
      }
    } catch {
      // si falla la exportación de un doc, seguimos con el resto
    }
  }

  return {
    files: files.map((f) => f.name).slice(0, 80),
    docs,
    fileCount: files.length,
    lastModified: files[0]?.modifiedTime ?? null,
  };
}
