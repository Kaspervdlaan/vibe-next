import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { getStorySlugTag } from "../../../src/lib/api/story";

interface RevalidateBody {
  source?: string;
  action?: string;
  slug?: string;
  cv?: string;
  space_id?: number | string;
}

const slugToPath = (slug?: string): string | null => {
  if (!slug) {
    return null;
  }

  const normalizedSlug = slug.trim().replace(/^\/+|\/+$/g, "");

  if (!normalizedSlug || normalizedSlug === "home") {
    return "/";
  }

  return `/${normalizedSlug}`;
};

export async function POST(request: NextRequest) {
  let body: RevalidateBody = {};

  try {
    body = (await request.json()) as RevalidateBody;
  } catch {
    body = {};
  }

  const slug = body.slug?.trim() || "home";
  const resolvedPath = slugToPath(slug) ?? "/";
  const resolvedSlugTag = getStorySlugTag(slug);

  revalidatePath(resolvedPath);
  revalidateTag(resolvedSlugTag, { expire: 0 });

  return NextResponse.json({
    revalidated: true,
    scope: "slug",
    tag: resolvedSlugTag,
    path: resolvedPath,
    source: body.source ?? "unknown",
    action: body.action ?? "unknown",
    slug,
    cv: body.cv ?? null,
    invalidate: "slug",
    space_id: body.space_id ?? null,
  });
}
