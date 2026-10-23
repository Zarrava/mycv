import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { OgCard } from "@/components/og/OgCard";
import { headlineText, site } from "@/data/site";

export const alt = `${site.name} — ${site.roles[0]}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const photo = await readFile(path.join(process.cwd(), "public", "images", "profile.jpg"));
  const portrait = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    <OgCard title={site.name} kicker={site.roles[0]} subtitle={headlineText()} portrait={portrait} />,
    { ...size },
  );
}
