export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ??
  "https://dnd-worker.ablx799.workers.dev/";

export type ArtefactOptions = {
  minorBeneficial: number;
  majorBeneficial: number;
  minorDetrimental: number;
  majorDetrimental: number;
};
export type ArtefactData = { roll: number, result: string };
export type ArtefactResponse = {
  minorBeneficial: ArtefactData[],
  majorBeneficial: ArtefactData[],
  minorDetrimental: ArtefactData[],
  majorDetrimental: ArtefactData[]
};

export type NpcOptions = {
  count: number,
  raceSrc: string,
  likeCount: number,
  dislikeCount: number,
  quirkCount: number
};
export type Npc = {
  race: string,
  maturity: string,
  job: string,
  likes: string[],
  dislikes: string[],
  quirks: string[]
};

async function request<T>(path: string, params?: Record<string, string | number>): Promise<T> {
  const url = new URL(`${API_BASE_URL}${path}`);

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, String(value));
    }
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export function generateArtefact(options: ArtefactOptions): Promise<ArtefactResponse> {
  return request<ArtefactResponse>("artifact", options);
}

export function generateNpcs(options: NpcOptions): Promise<Npc[]> {
  return request<Npc[]>("npc", options);
}