import { cacheTag } from "next/cache";

export interface StoryPayload {
  content?: Record<string, unknown>;
}

export interface StoryApiResponse {
  slug?: string;
  story?: StoryPayload | null;
}

const STORY_SLUG_TAG_PREFIX = "story:slug:";

export const getStorySlugTag = (slug: string): string => {
  const normalizedSlug = slug.trim().replace(/^\/+|\/+$/g, "") || "home";

  return `${STORY_SLUG_TAG_PREFIX}${normalizedSlug}`;
};

const DEFAULT_STORY_API_URL = "http://localhost/api/story";

const resolveStoryApiUrl = (): string => {
  return process.env.STORY_API_URL || DEFAULT_STORY_API_URL;
};

export const fetchStoryBySlug = async (
  slug: string,
  revalidateSeconds: number,
): Promise<StoryApiResponse> => {
  "use cache";

  cacheTag(getStorySlugTag(slug));

  const endpoint = resolveStoryApiUrl();
  const url = `${endpoint}?slug=${encodeURIComponent(slug)}`;

  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
    next: {
      revalidate: revalidateSeconds,
      tags: [getStorySlugTag(slug)],
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