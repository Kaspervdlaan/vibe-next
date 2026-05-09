import { NextRequest, NextResponse } from "next/server";
import { getStorySlugTag } from "../../../../src/lib/api/story";

export const dynamic = "force-dynamic";

const normalizeSlug = (slug?: string | null): string => {
  const normalized = (slug ?? "").trim().replace(/^\/+|\/+$/g, "");

  return normalized || "home";
};

interface ProbeSourceResponse {
  slug?: string;
  generatedAt?: number;
}

export async function GET(request: NextRequest) {
  const slug = normalizeSlug(request.nextUrl.searchParams.get("slug"));
  const tag = getStorySlugTag(slug);
  const sourceUrl = new URL("/api/next-cache/source", request.nextUrl.origin);

  sourceUrl.searchParams.set("slug", slug);

  const response = await fetch(sourceUrl.toString(), {
    headers: {
      Accept: "application/json",
    },
    cache: "force-cache",
    next: {
      revalidate: 300,
      tags: [tag],
    },
  });

  if (!response.ok) {
    return NextResponse.json(
      {
        ok: false,
        slug,
        tag,
        error: `Probe source failed (${response.status})`,
      },
      {
        status: 502,
      },
    );
  }

  const source = (await response.json()) as ProbeSourceResponse;

  return NextResponse.json({
    ok: true,
    slug,
    tag,
    sourceGeneratedAt: source.generatedAt ?? null,
    sourceSlug: source.slug ?? slug,
    checkedAt: Date.now(),
  });
}