import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();

const covers = [
  {
    slug: "faiss-document-retrieval",
    kicker: "RAG",
    title: "FAISS retrieval",
    accent: "#c6b08a",
    accent2: "#8c7350",
    motif: `
      <g fill="none" stroke="#f4f4f8" stroke-opacity="0.85" stroke-width="2">
        <rect x="180" y="250" width="280" height="360" rx="18"/>
        <rect x="230" y="210" width="280" height="360" rx="18"/>
        <rect x="280" y="170" width="280" height="360" rx="18"/>
      </g>
      <g fill="#c6b08a">
        <circle cx="980" cy="280" r="10"/>
        <circle cx="1120" cy="420" r="10"/>
        <circle cx="900" cy="520" r="10"/>
      </g>
      <path d="M980 280 L1120 420 L900 520" fill="none" stroke="#b39a74" stroke-width="2"/>
    `,
  },
  {
    slug: "student-assistant",
    kicker: "VOICE",
    title: "Student assistant",
    accent: "#ddd0b4",
    accent2: "#b89a6e",
    motif: `
      <path d="M160 450 C 240 300, 320 600, 400 450 S 560 300, 640 450 S 800 600, 880 450 S 1040 300, 1120 450 S 1280 600, 1360 450" fill="none" stroke="#ddd0b4" stroke-width="6" stroke-linecap="round"/>
      <circle cx="800" cy="450" r="120" fill="none" stroke="#b89a6e" stroke-opacity="0.85" stroke-width="2"/>
      <circle cx="800" cy="450" r="200" fill="none" stroke="#b89a6e" stroke-opacity="0.35" stroke-width="2"/>
    `,
  },
  {
    slug: "document-ingestion",
    kicker: "API",
    title: "Document ingestion",
    accent: "#d4c4a4",
    accent2: "#9a7d52",
    motif: `
      <text x="180" y="420" fill="#d4c4a4" font-family="ui-monospace, monospace" font-size="180">{ }</text>
      <g stroke="#b39a74" stroke-width="3" stroke-linecap="round">
        <path d="M760 300 H1180"/>
        <path d="M760 380 H1080"/>
        <path d="M760 460 H1240"/>
        <path d="M760 540 H980"/>
      </g>
    `,
  },
  {
    slug: "llm-memory-dashboards",
    kicker: "AGENTS",
    title: "LLM dashboards",
    accent: "#c6b08a",
    accent2: "#b39a74",
    motif: `
      <g fill="none" stroke="#f4f4f8" stroke-width="2">
        <rect x="160" y="360" width="220" height="120" rx="20"/>
        <rect x="620" y="180" width="220" height="100" rx="20"/>
        <rect x="620" y="380" width="220" height="100" rx="20"/>
        <rect x="620" y="580" width="220" height="100" rx="20"/>
      </g>
      <path d="M380 420 C 500 420, 500 230, 620 230" fill="none" stroke="#c6b08a" stroke-width="2"/>
      <path d="M380 420 H620" fill="none" stroke="#b39a74" stroke-width="2"/>
      <path d="M380 420 C 500 420, 500 630, 620 630" fill="none" stroke="#8c7350" stroke-width="2"/>
    `,
  },
  {
    slug: "content-workflow-agents",
    kicker: "AGENTS",
    title: "Content agents",
    accent: "#d4c4a4",
    accent2: "#8c7350",
    motif: `
      <circle cx="760" cy="430" r="70" fill="none" stroke="#d4c4a4" stroke-width="3"/>
      <g fill="none" stroke="#b39a74" stroke-width="2">
        <circle cx="420" cy="250" r="36"/>
        <circle cx="1100" cy="250" r="36"/>
        <circle cx="420" cy="640" r="36"/>
        <circle cx="1100" cy="640" r="36"/>
      </g>
      <g stroke="#f4f4f8" stroke-opacity="0.7" stroke-width="2">
        <path d="M456 270 L700 400"/>
        <path d="M1064 270 L820 400"/>
        <path d="M456 620 L700 470"/>
        <path d="M1064 620 L820 470"/>
      </g>
    `,
  },
];

function coverSvg(cover) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#12110f"/>
      <stop offset="1" stop-color="#1a1814"/>
    </linearGradient>
    <filter id="blur" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="50"/>
    </filter>
  </defs>
  <rect width="1600" height="900" fill="url(#bg)"/>
  <g opacity="0.45" stroke="#ffffff" stroke-opacity="0.06">
    ${Array.from({ length: 21 }, (_, index) => `<line x1="${index * 80}" y1="0" x2="${index * 80}" y2="900"/>`).join("")}
    ${Array.from({ length: 13 }, (_, index) => `<line x1="0" y1="${index * 80}" x2="1600" y2="${index * 80}"/>`).join("")}
  </g>
  <circle cx="1280" cy="160" r="220" fill="${cover.accent}" opacity="0.16" filter="url(#blur)"/>
  <circle cx="220" cy="780" r="180" fill="${cover.accent2}" opacity="0.1" filter="url(#blur)"/>
  ${cover.motif}
  <text x="80" y="760" fill="${cover.accent}" font-family="ui-monospace, monospace" font-size="22" letter-spacing="6">${cover.kicker}</text>
  <text x="80" y="820" fill="#f7f3ea" font-family="ui-sans-serif, system-ui, sans-serif" font-size="52">${cover.title}</text>
</svg>`;
}

const profileSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#1c1914"/>
      <stop offset="1" stop-color="#12110f"/>
    </linearGradient>
    <filter id="blur"><feGaussianBlur stdDeviation="40"/></filter>
  </defs>
  <rect width="800" height="1000" fill="url(#bg)"/>
  <circle cx="640" cy="160" r="180" fill="#c6b08a" opacity="0.22" filter="url(#blur)"/>
  <circle cx="120" cy="860" r="200" fill="#8c7350" opacity="0.16" filter="url(#blur)"/>
  <g fill="none" stroke="#f4f4f8" stroke-opacity="0.18">
    ${Array.from({ length: 12 }, (_, index) => `<circle cx="400" cy="460" r="${40 + index * 28}"/>`).join("")}
  </g>
</svg>`;

const ogSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#12110f"/>
  <circle cx="160" cy="40" r="220" fill="#c6b08a" opacity="0.22"/>
  <circle cx="1100" cy="80" r="180" fill="#8c7350" opacity="0.16"/>
  <text x="72" y="180" fill="#c6b08a" font-family="ui-monospace, monospace" font-size="22" letter-spacing="4">AI NATIVE DEVELOPER</text>
  <text x="72" y="320" fill="#f7f3ea" font-family="ui-sans-serif, system-ui" font-size="64">Elijah Olojede</text>
  <text x="72" y="400" fill="#d9d0c2" font-family="ui-sans-serif, system-ui" font-size="28">LangChain and RAG systems</text>
</svg>`;

await mkdir(path.join(root, "public", "images"), { recursive: true });
await writeFile(path.join(root, "public", "images", "profile.svg"), profileSvg);

for (const cover of covers) {
  const directory = path.join(root, "public", "images", "projects", cover.slug);
  await mkdir(directory, { recursive: true });
  const svg = coverSvg(cover);
  await sharp(Buffer.from(svg)).webp({ quality: 82 }).toFile(path.join(directory, "thumb.webp"));
}

await sharp(Buffer.from(ogSvg)).png().toFile(path.join(root, "public", "og-default.png"));

console.log("Assets written to public/");
process.exit(0);
