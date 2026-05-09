export interface StoryPayload {
  content?: Record<string, unknown>;
}

export interface StoryApiResponse {
  slug?: string;
  story?: StoryPayload | null;
}

export const STORY_GLOBAL_TAG = "story:global";

const DEFAULT_STORY_API_URL = "http://localhost/api/story";

const resolveStoryApiUrl = (): string => {
  return process.env.STORY_API_URL || DEFAULT_STORY_API_URL;
};

export const fetchStoryBySlug = async (
  slug: string,
  revalidateSeconds: number,
): Promise<StoryApiResponse> => {
  const endpoint = resolveStoryApiUrl();
  const url = `${endpoint}?slug=${encodeURIComponent(slug)}`;

  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
    next: {
      revalidate: revalidateSeconds,
      tags: [STORY_GLOBAL_TAG],
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch story (${response.status})`);
  }

  const payload = (await response.json()) as StoryApiResponse;

  if (!payload || typeof payload !== "object") {
    throw new Error("Story endpoint did not return valid payload data.");
  }

  return payload;
};