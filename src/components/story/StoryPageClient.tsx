"use client";

import { initStoryblok, StoryblokComponent } from "../../lib/storyblok";
import type { StoryPayload } from "../../lib/api/story";

initStoryblok();

export interface StoryPageClientProps {
  slug: string;
  story: StoryPayload | null;
  fetchError: string | null;
}

export const StoryPageClient = ({
  slug,
  story,
  fetchError,
}: StoryPageClientProps) => {
  if (fetchError) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          fontFamily: "Sora, sans-serif",
          color: "#ae2012",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        {fetchError}
      </div>
    );
  }

  if (!story?.content) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          fontFamily: "Sora, sans-serif",
          fontSize: "1.25rem",
          color: "#001219",
          background: "#f7f4ed",
          gap: "1rem",
        }}
      >
        <div>Loading...</div>
        <div style={{ fontSize: "0.875rem", color: "#5c5a52" }}>
          Fetching cached story: /{slug}
        </div>
        {!story && (
          <div
            style={{
              fontSize: "0.75rem",
              color: "#ae2012",
              maxWidth: "400px",
              textAlign: "center",
            }}
          >
            No story found. Make sure you have a story with slug &quot;{slug}&quot; in
            Storyblok.
          </div>
        )}
      </div>
    );
  }

  return <StoryblokComponent blok={story.content} />;
};