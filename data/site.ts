/**
 * Personal content, navigation, and SEO copy.
 * Sourced from Elijah Olojede's CV. Components read from here.
 */

export const site = {
  name: "Elijah Olojede",
  location: "Lagos, Nigeria",
  openTo: ["Lagos, Nigeria"],
  email: "lijazoft@gmail.com",
  phone: "+234 81435 21126",
  phoneHref: "tel:+2348143521126",
  github: "",
  linkedin: "",
  x: "",
  portrait: "/images/profile.jpg",
  portraitMark: "/images/profile-circle.jpg",
  portraitIsPhoto: true,
  resumeHref: "/Elijah-Olojede-CV.pdf",

  roles: ["AI Native Developer", "Python Developer", "LangChain Developer"],
  headline: {
    before: "AI Native Developer building",
    accent: "LangChain and RAG systems",
  },
  availabilityLabel: "Remote experience",

  bioRest:
    "Across Primordial Technologies, Bajol Integrated Services, Helen La Costura, and GOMYCODE I have designed AI pipelines, integrated REST APIs, and deployed microservices with FastAPI and Flask. I am currently exploring semantic web technologies, OWL and RDF knowledge graphs, and multi-agent architectures for more context-aware reasoning.",

  terminal: {
    prompt: "Ground this answer in the documents, and say so if they do not cover it.",
    response:
      "Embed the query, search with FAISS, then answer from the retrieved passages. If retrieval is empty, the assistant says the documents do not cover it.",
  },

  stats: [
    { label: "Organizations", value: 4, suffix: "" },
    { label: "Case studies on this site", value: 5, suffix: "" },
    { label: "Core skill groups", value: 5, suffix: "" },
  ],

  education: {
    degree: "B.Sc. in Computer Science",
    school: "Ecole Supérieure Panafricaine de Management Appliqué",
    place: "Cotonou, Benin Republic",
    years: "2015 – 2018",
  },

  certifications: [
    "Foundations of Project Management – Google, 2023",
    "Data Engineering Essentials – IBM, 2023",
    "Ask Questions to Make Data-Driven Decisions – Google, 2023",
    "Data Science with Python – Simplilearn, 2022",
    "Foundations of UX Design – Google",
    "Software Development Fundamentals – Microsoft, 2021",
  ],

  showWhatIBring: true,
  showTestimonials: false,
} as const;

export const testimonials: readonly {
  quote: string;
  name: string;
  role: string;
}[] = [];

export const whatIBring = [
  {
    title: "LangChain, end to end",
    description:
      "Agents, tools, memory, and chains used on dashboards, content workflows, and a student assistant — not a single demo prompt.",
  },
  {
    title: "Retrieval that can be checked",
    description:
      "RAG pipelines with FAISS and Pinecone, plus document ingestion from PDFs and websites for internal question-answering tools.",
  },
  {
    title: "Output other code can use",
    description:
      "Structured parsing, summarization, and prompt and token work aimed at lower latency and lower cost.",
  },
  {
    title: "Services and voice",
    description:
      "FastAPI and Flask microservices, REST and GraphQL integrations, and voice input with Whisper.",
  },
] as const;

export const nav = [
  { href: "/#about", id: "about", label: "About" },
  { href: "/#skills", id: "skills", label: "Skills" },
  { href: "/#experience", id: "experience", label: "Experience" },
  { href: "/#projects", id: "projects", label: "Projects" },
  { href: "/#contact", id: "contact", label: "Contact" },
] as const;

/**
 * First professional role on the CV: Bajol Integrated Services, February 2021.
 * Full years are counted from this date, so the number advances on each anniversary.
 */
const CAREER_START = { year: 2021, month: 2, day: 1 };

export function yearsExperience(now = new Date()) {
  let years = now.getFullYear() - CAREER_START.year;
  const month = now.getMonth() + 1;
  const beforeAnniversary =
    month < CAREER_START.month ||
    (month === CAREER_START.month && now.getDate() < CAREER_START.day);
  if (beforeAnniversary) years -= 1;
  return Math.max(years, 0);
}

export function valueProposition(now = new Date()) {
  return `Over ${yearsExperience(now)} years designing GenAI pipelines, LangChain agents, vector search, and FastAPI and Flask services that other people can run.`;
}

export function seoDescription(now = new Date()) {
  return `Elijah Olojede is an AI Native Developer in Lagos with ${yearsExperience(now)}+ years building LangChain, RAG, and Python services.`;
}

export function bioParagraphs(now = new Date()) {
  return [
    `I am an AI Native Developer and Python developer with over ${yearsExperience(now)} years building GenAI solutions. The work centers on LangChain — agents, tools, and memory — plus vector databases such as Pinecone and FAISS, prompt engineering, and applications built on large language models.`,
    site.bioRest,
  ];
}

export function experienceStat(now = new Date()) {
  return {
    label: "Years building GenAI and Python",
    value: yearsExperience(now),
    suffix: "+",
  };
}

export function headlineText() {
  return `${site.headline.before} ${site.headline.accent}`;
}

export function roleLine() {
  return site.roles.join(" · ");
}

function siteOrigin() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) return configured.replace(/\/$/, "");
  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (production) return `https://${production.replace(/^https?:\/\//, "").replace(/\/$/, "")}`;
  return "http://localhost:3000";
}

export function absoluteUrl(path = "/") {
  const base = siteOrigin();
  if (path.startsWith("http")) return path;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
