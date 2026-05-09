import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { getStorySlugTag, STORY_GLOBAL_TAG } from "../../../src/lib/api/story";

interface RevalidateBody {
  source?: string;
  action?: string;
  slug?: string;
  path?: string;
  invalidate?: "global" | "path";
  cv?: string;
  space_id?: number | string;
}

const normalizePath = (path?: string): string | null => {
  if (!path) {
    return null;
  }

  const trimmed = path.trim();

  if (!trimmed) {
    return null;
  }

  const withLeadingSlash = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  const normalized = `/${withLeadingSlash.replace(/^\/+|\/+$/g, "")}`;

  return normalized === "/" ? "/" : normalized;
};

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

  const resolvedPath = normalizePath(body.path) ?? slugToPath(body.slug);
  const shouldInvalidatePath = body.invalidate === "path" || (body.invalidate !== "global" && resolvedPath !== null);
  const resolvedScope = shouldInvalidatePath ? "path" : "global";
  const resolvedSlugTag = body.slug ? getStorySlugTag(body.slug) : null;

  if (resolvedScope === "path" && resolvedPath) {
    revalidatePath(resolvedPath);

    if (resolvedSlugTag) {
      revalidateTag(resolvedSlugTag, "max");
    }
  } else {
    revalidateTag(STORY_GLOBAL_TAG, "max");
  }

  return NextResponse.json({
    revalidated: true,
    scope: resolvedScope,
    tag: resolvedScope === "global" ? STORY_GLOBAL_TAG : resolvedSlugTag,
    path: resolvedPath,
    source: body.source ?? "unknown",
    action: body.action ?? "unknown",
    slug: body.slug ?? null,
    cv: body.cv ?? null,
    invalidate: body.invalidate ?? resolvedScope,
    space_id: body.space_id ?? null,
  });
}
