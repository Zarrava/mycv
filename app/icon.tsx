import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  const photo = await readFile(path.join(process.cwd(), "public", "images", "profile-circle.jpg"));
  const portrait = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex" }}>
        <img src={portrait} alt="" width={32} height={32} style={{ objectFit: "cover" }} />
      </div>
    ),
    { ...size },
  );
}
