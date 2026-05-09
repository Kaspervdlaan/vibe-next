import type { Metadata } from "next";
import "../src/styles/_globals.scss";

export const metadata: Metadata = {
  title: "Vibe Design",
  description: "Vibe design frontend migrated to Next.js 16",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
