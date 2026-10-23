import type { Metadata } from "next";
import { experience } from "@/data/experience";
import { headlineText, roleLine, site, absoluteUrl } from "@/data/site";
import type { Project } from "@/data/projects";

const description = `${site.name}, ${roleLine()}. ${site.valueProposition}`;

export function rootMetadata(): Metadata {
  const title = `${site.name} · ${site.roles[0]}`;
  return {
    metadataBase: new URL(absoluteUrl("/")),
    title: {
      default: title,
      template: `%s · ${site.name}`,
    },
    description,
    applicationName: site.name,
    authors: [{ name: site.name, url: absoluteUrl("/") }],
    creator: site.name,
    keywords: [
      "AI Native Developer",
      "AI engineer",
      "GenAI",
      "LLM",
      "RAG",
      "LangChain",
      "FastAPI",
      "Python",
      "voice AI",
    ],
    alternates: { canonical: absoluteUrl("/") },
    openGraph: {
      type: "website",
      url: absoluteUrl("/"),
      title,
      description,
      siteName: site.name,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: { index: true, follow: true },
  };
}

export function projectMetadata(project: Project): Metadata {
  const title = project.title;
  const summary = project.tagline;
  const url = absoluteUrl(`/projects/${project.slug}`);
  return {
    title,
    description: summary,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description: summary,
      siteName: site.name,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: summary,
    },
  };
}

export function personJsonLd() {
  const sameAs = [site.github, site.linkedin, site.x].filter(
    (url) => url.startsWith("http") && !url.includes("your-handle"),
  );

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: roleLine(),
    description: headlineText(),
    email: site.email,
    telephone: site.phone,
    url: absoluteUrl("/"),
    image: absoluteUrl(site.portrait),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lagos",
      addressCountry: "Nigeria",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: site.education.school,
    },
    worksFor: experience
      .filter((role) => role.end === "Present")
      .map((role) => ({
        "@type": "Organization",
        name: role.company,
      })),
    knowsAbout: [
      "LangChain",
      "Retrieval augmented generation",
      "FAISS",
      "Pinecone",
      "Prompt engineering",
      "FastAPI",
      "Flask",
      "Python",
      "Whisper",
    ],
    sameAs,
  };
}
