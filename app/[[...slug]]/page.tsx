import { StoryPageClient } from "../../src/components/story/StoryPageClient";
import { fetchStoryBySlug } from "../../src/lib/api/story";

const STORY_REVALIDATE_SECONDS = 300;

type RouteParams = {
  slug?: string[];
};

interface StoryPageProps {
  params: Promise<RouteParams> | RouteParams;
}

const normalizeSlug = async (params: Promise<RouteParams> | RouteParams) => {
  const resolvedParams = await params;
  const pathSlug = resolvedParams.slug?.join("/") || "";
  const normalizedSlug = pathSlug.replace(/^\//, "").replace(/\/$/, "");

  return normalizedSlug || "home";
};

export default async function StoryPage({ params }: StoryPageProps) {
  const slug = await normalizeSlug(params);
  let fetchError: string | null = null;
  let story: Awaited<ReturnType<typeof fetchStoryBySlug>>["story"] | null = null;

  try {
    const payload = await fetchStoryBySlug(slug, STORY_REVALIDATE_SECONDS);

    if (!payload.story || typeof payload.story !== "object") {
      throw new Error("Story endpoint did not return valid story data.");
    }

    story = payload.story;
  } catch (error) {
    fetchError = error instanceof Error ? error.message : "Unable to load page.";
  }

  return <StoryPageClient slug={slug} story={story} fetchError={fetchError} />;
}