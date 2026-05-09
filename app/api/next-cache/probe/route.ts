import { unstable_cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { getStorySlugTag } from "../../../../src/lib/api/story";

const normalizeSlug = (slug?: string | null): string => {
  const normalized = (slug ?? "").trim().replace(/^\/+|\/+$/g, "");

  return normalized || "home";
};

interface ProbeCacheResponse {
  slug: string;
  generatedAt: number;
}

const getCachedProbeResponse = async (
  slug: string,
  tag: string,
): Promise<ProbeCacheResponse> => {
  const resolver = unstable_cache(
    async (): Promise<ProbeCacheResponse> => {
      return {
        slug,
        generatedAt: Date.now(),
      };
    },
    ["next-cache-probe", slug],
    {
      tags: [tag],
      revalidate: 300,
    },
  );

  return resolver();
};

export async function GET(request: NextRequest) {
  const slug = normalizeSlug(request.nextUrl.searchParams.get("slug"));
  const tag = getStorySlugTag(slug);
  const first = await getCachedProbeResponse(slug, tag);
  const second = await getCachedProbeResponse(slug, tag);
  const sameRequestStable = first.generatedAt === second.generatedAt;

  return NextResponse.json({
    ok: true,
    slug,
    tag,
    sourceGeneratedAt: second.generatedAt,
    sourceSlug: second.slug,
    sameRequestStable,
    checkedAt: Date.now(),
  });
}