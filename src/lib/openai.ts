import OpenAI from "openai";
import type { GithubSnapshot, ProjectPhase } from "@/lib/types";

// La API key vive SOLO en el servidor (OPENAI_API_KEY).
function client() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("Falta OPENAI_API_KEY. Configura tu clave de OpenAI.");
  }
  return new OpenAI({ apiKey });
}

export interface SummarizeInput {
  name: string;
  description: string | null;
  phase: ProjectPhase;
  // Fase deducida de la actividad real (commits/PRs/fechas), como pista para el modelo.
  inferredPhase?: ProjectPhase | null;
  snapshots: { label: string; data: GithubSnapshot | Record<string, unknown> }[];
}

export interface SummarizeResult {
  summary: string;
  next_action: string;
}

// Genera, bajo demanda, un resumen del estado + una siguiente acción sugerida.
// Modelo económico por defecto (gpt-4o-mini); se respeta el límite de 10s de Vercel
// pidiendo una respuesta corta en JSON.
export async function summarizeProject(
  input: SummarizeInput
): Promise<SummarizeResult> {
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
  const openai = client();

  const context = JSON.stringify(input, null, 2);

  const completion = await openai.chat.completions.create({
    model,
    temperature: 0.3,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content:
          "Eres un asistente que resume el estado de proyectos de software a partir " +
          "de su actividad real en GitHub. Responde en español, conciso y concreto. " +
          "IMPORTANTE: basa el estado en la ACTIVIDAD real (commits, PRs abiertas, " +
          "fecha del último commit y de la última actividad), NO en la etiqueta de fase. " +
          "Si hay commits y PRs recientes, el proyecto está EN DESARROLLO activo, aunque " +
          "la etiqueta diga 'idea'. No afirmes que no hay actividad si los datos muestran " +
          "commits o PRs. " +
          'Devuelve SOLO un JSON con las claves "summary" (2-3 frases sobre el estado ' +
          'real) y "next_action" (una sola siguiente acción recomendada y accionable).',
      },
      {
        role: "user",
        content: `Datos del proyecto y su actividad reciente:\n${context}`,
      },
    ],
  });

  const raw = completion.choices[0]?.message?.content ?? "{}";
  let parsed: Partial<SummarizeResult> = {};
  try {
    parsed = JSON.parse(raw);
  } catch {
    parsed = { summary: raw, next_action: "" };
  }

  return {
    summary: parsed.summary?.trim() || "No se pudo generar el resumen.",
    next_action: parsed.next_action?.trim() || "",
  };
}
