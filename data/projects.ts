/**
 * Single source of truth for projects.
 *
 * To add a project:
 * 1. Append one object to `projects`.
 * 2. Add /public/images/projects/<slug>/thumb.webp (16:9).
 *    Optional gallery images can live in the same folder.
 * No component changes are required. Filters are derived from this list.
 *
 * These case studies follow work described in the CV. They do not add
 * public URLs, repositories, or metrics the CV does not state.
 */

export type ProjectCategory =
  | "RAG"
  | "Agents"
  | "Voice"
  | "API"
  | "Automation"
  | "Other";

export type ProjectStatus = "Live" | "In Production" | "Prototype" | "Archived";

export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  tagline: string;
  category: ProjectCategory;
  thumbnail: string;
  gallery?: string[];
  tags: string[];
  year: number;
  role: string;
  status: ProjectStatus;
  previewUrl?: string;
  repoUrl?: string;
  featured: boolean;
  overview: string;
  problem: string;
  solution: string;
  features: { title: string; description: string }[];
  architecture: {
    description: string;
    mermaid: string;
  };
  challenges: { challenge: string; solution: string }[];
  results: { label: string; value: string }[];
  learnings: string;
}

export const projects: Project[] = [
  {
    slug: "llm-memory-dashboards",
    title: "LLM dashboards with memory",
    shortDescription:
      "LangChain dashboards with memory and dynamic tool calling, built at Primordial Technologies.",
    tagline: "Dashboards that keep context and call tools, instead of starting from a blank prompt.",
    category: "Agents",
    thumbnail: "/images/projects/llm-memory-dashboards/thumb.webp",
    tags: ["LangChain", "OpenAI", "Memory", "Tool calling"],
    year: 2025,
    role: "AI Solutions Developer / UX Lead Consultant",
    status: "In Production",
    featured: true,
    overview:
      "At Primordial Technologies I built LLM-powered dashboards with LangChain memory and dynamic tool calling, and worked with the team on OpenAI API integration, including prompt and token changes aimed at lower latency and cost.",
    problem:
      "A dashboard that forgets the last turn, or that can only answer from the prompt, forces people to restate context and copy results out by hand. Latency and token cost also had to come down as usage grew.",
    solution:
      "LangChain supplied memory and tool calling inside the dashboard. Prompts and token use were tuned with the team so OpenAI calls stayed faster and cheaper. Ontology-driven interfaces and linked-data schemas were explored as preparation for RDF and OWL reasoning, not shipped as a finished knowledge graph.",
    features: [
      {
        title: "Memory across turns",
        description: "LangChain memory so the dashboard carries context instead of starting over.",
      },
      {
        title: "Dynamic tool calling",
        description: "The chain can call tools the dashboard already has, rather than only chatting.",
      },
      {
        title: "Prompt and token tuning",
        description: "OpenAI calls were tightened with the team to reduce latency and cost.",
      },
      {
        title: "Ontology exploration",
        description:
          "Linked-data schemas and RDF/OWL interfaces were explored as preparation, not shipped as a finished graph.",
      },
    ],
    architecture: {
      description:
        "The dashboard talks to a LangChain chain that keeps memory, calls tools, and sends the request to OpenAI.",
      mermaid: `flowchart LR
  User[Dashboard] --> Chain[LangChain]
  Chain[LangChain] --> Memory[Memory]
  Chain[LangChain] --> Tools[Tool calling]
  Chain[LangChain] --> Model[OpenAI]`,
    },
    challenges: [
      {
        challenge: "Each new question arrived without the context of the one before it.",
        solution: "Memory was built into the LangChain chain so the dashboard could carry context forward.",
      },
      {
        challenge: "Answers that needed a lookup or an action stayed trapped in the chat.",
        solution: "Dynamic tool calling let the chain reach the tools the dashboard already had.",
      },
      {
        challenge: "Longer prompts made OpenAI calls slower and more expensive.",
        solution: "Prompts and token use were optimized with the team specifically to cut latency and cost.",
      },
    ],
    results: [
      { label: "Context", value: "Memory across turns" },
      { label: "Actions", value: "Dynamic tool calling" },
      { label: "Model", value: "OpenAI APIs" },
      { label: "Cost work", value: "Prompt and token tuning" },
    ],
    learnings:
      "Memory and tools are what make a dashboard feel like a product. Prompt and token work belongs in the same design, because a capable chain that is slow or expensive does not stay in use. RDF and OWL stayed exploratory: useful preparation, not a claim of a finished graph.",
  },
  {
    slug: "faiss-document-retrieval",
    title: "FAISS retrieval for RAG",
    shortDescription:
      "FAISS vector search for RAG, used to improve document retrieval accuracy at Primordial.",
    tagline: "A retrieval pipeline whose job was more accurate document search, not a longer answer.",
    category: "RAG",
    thumbnail: "/images/projects/faiss-document-retrieval/thumb.webp",
    tags: ["FAISS", "RAG", "Vector search", "LangChain"],
    year: 2025,
    role: "AI Solutions Developer",
    status: "In Production",
    featured: true,
    overview:
      "I implemented vector search pipelines with FAISS for retrieval-augmented generation at Primordial Technologies. The stated goal was better document retrieval accuracy.",
    problem:
      "Generation without a retrieval step answers from the model’s prior, which is the wrong source when the question is about a specific set of documents.",
    solution:
      "Documents are embedded and searched with FAISS. The retrieved passages are what the RAG pipeline uses to answer. Accuracy of that retrieval, not the length of the reply, was the thing we were trying to improve.",
    features: [
      {
        title: "FAISS index",
        description: "Documents are embedded and searched as vectors before any answer is written.",
      },
      {
        title: "RAG, not a free answer",
        description: "The model responds from retrieved passages instead of its prior alone.",
      },
      {
        title: "Retrieval as its own step",
        description: "Search can be inspected when the passages are wrong, without blaming the model.",
      },
    ],
    architecture: {
      description:
        "Documents are embedded into a FAISS index. A question searches that index before the model answers.",
      mermaid: `flowchart LR
  Docs[Documents] --> Embed[Embeddings]
  Embed[Embeddings] --> Index[FAISS index]
  Query[Question] --> Search[Vector search]
  Index[FAISS index] --> Search[Vector search]
  Search[Vector search] --> RAG[RAG answer]`,
    },
    challenges: [
      {
        challenge: "A fluent answer can still be about the wrong document.",
        solution:
          "The pipeline was built around retrieval accuracy: FAISS search first, then generation from what came back.",
      },
      {
        challenge: "Retrieval and generation are easy to treat as one blob.",
        solution:
          "Search stayed its own step so a weak index could be inspected without blaming the model.",
      },
    ],
    results: [
      { label: "Index", value: "FAISS" },
      { label: "Pattern", value: "RAG" },
      { label: "Aim", value: "More accurate retrieval" },
    ],
    learnings:
      "Retrieval accuracy is the product. If the passages are wrong, a stronger model does not fix the answer. Pinecone is part of the wider toolkit; this pipeline used FAISS.",
  },
  {
    slug: "document-ingestion",
    title: "Document ingestion for QA",
    shortDescription:
      "Flask backends that ingest PDFs and websites for internal QA tools at Bajol Integrated Services.",
    tagline: "PDF and website parsing, cached API workflows, and a view of vector similarity.",
    category: "API",
    thumbnail: "/images/projects/document-ingestion/thumb.webp",
    tags: ["Flask", "PDF", "Caching", "Python"],
    year: 2025,
    role: "Python Developer / IT Specialist",
    status: "In Production",
    featured: true,
    overview:
      "At Bajol Integrated Services I built Flask services for AI automation and conversational interfaces, ingested PDFs and websites for internal QA tools, cached API workflows, and worked with frontend to show vector similarity and structured model results.",
    problem:
      "Internal QA could not ask questions of documents that still lived as PDFs and web pages, and uncached API calls made the processing pipelines slower than the work required.",
    solution:
      "Flask services took in PDFs and parsed websites into the QA tools. API workflows for the data pipelines used caching so repeated work did not recompute the same response. Frontend views showed vector similarity and structured LLM output instead of a raw text dump.",
    features: [
      {
        title: "PDF and website ingestion",
        description: "Internal QA tools received documents that had been parsed, not left as files.",
      },
      {
        title: "Cached API workflows",
        description: "Repeated processing reused a cached response instead of recomputing it.",
      },
      {
        title: "Similarity on screen",
        description:
          "Frontend views, built with that team, showed vector similarity and structured model results.",
      },
    ],
    architecture: {
      description:
        "PDFs and websites are ingested by Flask services. Caching sits on the API workflows, and the UI shows similarity and structured results.",
      mermaid: `flowchart LR
  PDF[PDFs] --> Ingest[Ingestion]
  Web[Websites] --> Ingest[Ingestion]
  Ingest[Ingestion] --> Flask[Flask services]
  Flask[Flask services] --> Cache[Response cache]
  Flask[Flask services] --> UI[Similarity view]`,
    },
    challenges: [
      {
        challenge: "Source material was not in a form a QA tool could search.",
        solution: "Ingestion parsed PDFs and websites into the internal tools.",
      },
      {
        challenge: "The same processing requests were paying their full cost every time.",
        solution: "Caching on the API workflows reused responses instead of recomputing them.",
      },
      {
        challenge: "Vector scores and model output were hard to read as raw payloads.",
        solution:
          "The frontend visualized similarity and structured results, built with that team.",
      },
    ],
    results: [
      { label: "Sources", value: "PDFs and websites" },
      { label: "Service", value: "Flask" },
      { label: "Speed", value: "Cached API workflows" },
      { label: "Review", value: "Similarity visualized" },
    ],
    learnings:
      "Ingestion is the unglamorous half of retrieval. A vector index is only as useful as the PDFs and pages that were actually parsed into it, and a cache is what keeps that pipeline tolerable to run.",
  },
  {
    slug: "content-workflow-agents",
    title: "Content workflow agents",
    shortDescription:
      "Custom LangChain agents and FastAPI microservices for content workflows at Helen La Costura.",
    tagline: "Agents that summarize, parse structured output, and run as FastAPI services.",
    category: "Automation",
    thumbnail: "/images/projects/content-workflow-agents/thumb.webp",
    tags: ["LangChain", "FastAPI", "Cohere", "Parsing"],
    year: 2025,
    role: "LangChain Engineer / IT Consultant",
    status: "In Production",
    featured: true,
    overview:
      "For Helen La Costura I built custom LangChain agents and chains that automated content management workflows, including structured output parsing, summarization, and Cohere NLP APIs, then deployed the work as FastAPI microservices.",
    problem:
      "Content workflows that depend on free-form model text are hard to file, summarize, or hand to the next system. They also need a service boundary if more than one person is going to run them.",
    solution:
      "LangChain agents and chains took on the content steps. Output was parsed into a structure, summaries were generated where the workflow needed them, and Cohere’s NLP APIs were integrated for that language work. FastAPI hosted the pieces as microservices so they could be scaled and maintained.",
    features: [
      {
        title: "Custom agents and chains",
        description: "LangChain automated content-management steps that had been manual.",
      },
      {
        title: "Structured output",
        description: "Parsing and summarization turned free-form replies into something the next step could store.",
      },
      {
        title: "Cohere NLP",
        description: "Cohere’s language APIs were integrated into the same workflow.",
      },
      {
        title: "FastAPI microservices",
        description: "The agents were deployed as services meant to be scaled and maintained.",
      },
    ],
    architecture: {
      description:
        "A LangChain agent handles the content step, calls Cohere where needed, parses the output, and is served by FastAPI.",
      mermaid: `flowchart LR
  Content[Content workflow] --> Agent[LangChain agent]
  Agent[LangChain agent] --> Cohere[Cohere NLP]
  Agent[LangChain agent] --> Parse[Structured parsing]
  Parse[Structured parsing] --> API[FastAPI service]`,
    },
    challenges: [
      {
        challenge: "Content steps were manual and the model’s reply was unstructured.",
        solution:
          "Agents automated the workflow, and output parsing turned the reply into something the next step could store.",
      },
      {
        challenge: "Summaries and language features were a separate concern from the agent loop.",
        solution: "Summarization and Cohere’s NLP APIs were integrated into the same chain.",
      },
      {
        challenge: "A script on one machine does not stay maintainable.",
        solution: "The work was deployed as FastAPI microservices with scale and upkeep in mind.",
      },
    ],
    results: [
      { label: "Automation", value: "Content workflows" },
      { label: "Output", value: "Structured parsing" },
      { label: "Language APIs", value: "Cohere" },
      { label: "Runtime", value: "FastAPI microservices" },
    ],
    learnings:
      "An agent is finished when another system can call it. Structured parsing and a FastAPI boundary mattered as much as the chain itself, because content workflows fail at the handoff, not only inside the prompt.",
  },
  {
    slug: "student-assistant",
    title: "Student assistant chatbot",
    shortDescription:
      "A LangChain and OpenAI chatbot with Whisper voice input for curriculum questions at GOMYCODE.",
    tagline: "Curriculum questions by text or voice, plus mentoring on embeddings and agent routing.",
    category: "Voice",
    thumbnail: "/images/projects/student-assistant/thumb.webp",
    tags: ["LangChain", "OpenAI", "Whisper", "Voice"],
    year: 2024,
    role: "AI-Powered Education Tool Developer / Instructor",
    status: "In Production",
    featured: true,
    overview:
      "At GOMYCODE I built a student-assistant chatbot with LangChain and OpenAI for curriculum queries, added voice input with Whisper and live API knowledge, and mentored students on vector search, embeddings, and agent routing.",
    problem:
      "Students needed answers tied to the curriculum, including when they would rather speak than type, and they needed a way to learn the same patterns — embeddings, search, routing — by building them.",
    solution:
      "The assistant uses LangChain and OpenAI for curriculum questions. Whisper takes voice input. Real-time API integration supplies knowledge that should not be frozen in the prompt. Mentoring covered the same stack: vector search, embeddings, and how an agent decides which tool to call.",
    features: [
      {
        title: "Curriculum questions",
        description: "LangChain and OpenAI answer questions about the course, not an open-ended chat.",
      },
      {
        title: "Whisper voice input",
        description: "Students can speak the question. Whisper transcribes it into the same assistant.",
      },
      {
        title: "Live API knowledge",
        description: "Real-time API integration supplies knowledge that should not be frozen in the prompt.",
      },
      {
        title: "Teaching the same stack",
        description: "Mentoring covered vector search, embeddings, and agent routing as project work.",
      },
    ],
    architecture: {
      description:
        "Text goes straight to the assistant. Speech is transcribed by Whisper first. The chain uses OpenAI and a live knowledge API.",
      mermaid: `flowchart LR
  Speech[Voice] --> Whisper[Whisper]
  Text[Typed question] --> Bot[LangChain assistant]
  Whisper[Whisper] --> Bot[LangChain assistant]
  Bot[LangChain assistant] --> Model[OpenAI]
  Bot[LangChain assistant] --> API[Live knowledge API]`,
    },
    challenges: [
      {
        challenge: "Curriculum questions are a poor fit for an ungrounded chat window.",
        solution:
          "The assistant was built for those queries, with live API knowledge rather than a static prompt alone.",
      },
      {
        challenge: "Typing is the wrong input for some students.",
        solution: "Whisper provided the voice path into the same assistant.",
      },
      {
        challenge: "Students needed to understand the system, not only use it.",
        solution:
          "Mentoring walked through vector search, embeddings, and agent routing as project work.",
      },
    ],
    results: [
      { label: "Users", value: "Students" },
      { label: "Questions", value: "Curriculum queries" },
      { label: "Voice", value: "Whisper" },
      { label: "Teaching", value: "Search, embeddings, routing" },
    ],
    learnings:
      "A teaching assistant is also a syllabus. The useful version answers curriculum questions and leaves the retrieval and routing visible enough that a student can rebuild the idea. Voice only helps if it lands in that same assistant, not in a separate demo.",
  },
];

if (process.env.NODE_ENV !== "production") {
  const slugs = new Set<string>();
  for (const project of projects) {
    if (project.shortDescription.length > 140) {
      throw new Error(
        `${project.slug} shortDescription is ${project.shortDescription.length} characters (max 140).`,
      );
    }
    if (slugs.has(project.slug)) {
      throw new Error(`Duplicate project slug: ${project.slug}`);
    }
    slugs.add(project.slug);
  }
}
