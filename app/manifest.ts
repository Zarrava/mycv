import type { MetadataRoute } from "next";
import { seoDescription, site } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} · ${site.roles[0]}`,
    short_name: site.name,
    description: seoDescription(),
    start_url: "/",
    display: "standalone",
    background_color: "#12110f",
    theme_color: "#12110f",
    lang: "en",
    icons: [
      {
        src: "/favicon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
