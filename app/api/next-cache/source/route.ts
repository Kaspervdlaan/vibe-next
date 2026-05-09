import { NextRequest, NextResponse } from "next/server";

const normalizeSlug = (slug?: string | null): string => {
  const normalized = (slug ?? "").trim().replace(/^\/+|\/+$/g, "");

  return normalized || "home";
};

export async function GET(request: NextRequest) {
  const slug = normalizeSlug(request.nextUrl.searchParams.get("slug"));

  return NextResponse.json(
    {
      slug,
      generatedAt: Date.now(),
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}