import type { Metadata } from "next";
import { experience } from "@/data/experience";
import { site, absoluteUrl, seoDescription } from "@/data/site";
import type { Project } from "@/data/projects";

export function rootMetadata(): Metadata {
  const description = seoDescription();
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
      "Elijah Olojede",
      "AI engineer",
      "GenAI",
      "LLM",
      "RAG",
      "LangChain",
      "FastAPI",
      "Python",
      "Lagos",
      "voice AI",
    ],
    alternates: { canonical: absoluteUrl("/") },
    icons: {
      icon: [{ url: "/favicon.png", sizes: "512x512", type: "image/png" }],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    },
    openGraph: {
      type: "website",
      url: absoluteUrl("/"),
      title,
      description,
      siteName: site.name,
      locale: "en_NG",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
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
    jobTitle: site.roles[0],
    description: seoDescription(),
    hasOccupation: site.roles.map((name) => ({ "@type": "Occupation", name })),
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

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: absoluteUrl("/"),
    name: `${site.name} · ${site.roles[0]}`,
    description: seoDescription(),
    inLanguage: "en",
    mainEntity: {
      "@type": "Person",
      name: site.name,
      jobTitle: site.roles[0],
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
