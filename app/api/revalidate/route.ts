import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { STORY_GLOBAL_TAG } from "../../../src/lib/api/story";

interface RevalidateBody {
  source?: string;
  action?: string;
  slug?: string;
  invalidate?: "global" | "path";
  cv?: string;
  space_id?: number | string;
}

export async function POST(request: NextRequest) {
  let body: RevalidateBody = {};

  try {
    body = (await request.json()) as RevalidateBody;
  } catch {
    body = {};
  }

  revalidateTag(STORY_GLOBAL_TAG, "max");

  return NextResponse.json({
    revalidated: true,
    scope: "global",
    tag: STORY_GLOBAL_TAG,
    source: body.source ?? "unknown",
    action: body.action ?? "unknown",
    slug: body.slug ?? null,
    cv: body.cv ?? null,
    invalidate: body.invalidate ?? "global",
    space_id: body.space_id ?? null,
  });
}
