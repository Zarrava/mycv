export interface Role {
  id: string;
  title: string;
  company: string;
  place: string;
  mode: string;
  start: string;
  end: string;
  summary: string;
  bullets: string[];
  tags: string[];
}

/**
 * Dates and wording follow the CV. Several appointments overlap.
 */
export const experience: Role[] = [
  {
    id: "gomycode",
    title: "AI-Powered Education Tool Developer / Instructor",
    company: "GOMYCODE",
    place: "Lagos, Nigeria",
    mode: "Part-time",
    start: "Feb 2024",
    end: "Present",
    summary:
      "A student-assistant chatbot, voice input, and mentoring on embeddings, vector search, and agent routing.",
    bullets: [
      "Built a student-assistant chatbot with LangChain and OpenAI to support curriculum queries.",
      "Added voice input with Whisper and real-time API knowledge integration.",
      "Mentored students on AI project workflows, including vector search, embeddings, and agent routing.",
    ],
    tags: ["LangChain", "OpenAI", "Whisper", "Embeddings"],
  },
  {
    id: "primordial",
    title: "AI Solutions Developer / UX Lead Consultant",
    company: "Primordial Technologies Ltd",
    place: "Lagos, Nigeria",
    mode: "Remote",
    start: "Aug 2021",
    end: "Apr 2025",
    summary:
      "LLM dashboards, FAISS retrieval, prompt and token work, and early ontology-driven interfaces.",
    bullets: [
      "Developed LLM-powered dashboards with integrated memory and dynamic tool calling using LangChain.",
      "Implemented vector search pipelines with FAISS for RAG systems to improve document retrieval accuracy.",
      "Worked with teams to integrate OpenAI APIs, optimizing prompts and tokens to reduce latency and cost.",
      "Explored ontology-driven interfaces and linked-data schemas in preparation for structured reasoning with RDF and OWL.",
    ],
    tags: ["LangChain", "OpenAI", "FAISS", "RAG", "UX"],
  },
  {
    id: "helen",
    title: "LangChain Engineer / IT Consultant",
    company: "Helen La Costura Ltd",
    place: "Delaware, USA",
    mode: "Remote",
    start: "Mar 2022",
    end: "Apr 2025",
    summary:
      "Custom agents for content workflows, structured output, and FastAPI microservices.",
    bullets: [
      "Developed custom agents and chains with LangChain to automate content management workflows.",
      "Worked on structured output parsing, content summarization, and Cohere NLP API integration.",
      "Deployed microservices with FastAPI, with scalability and maintainability as the constraint.",
    ],
    tags: ["LangChain", "FastAPI", "Cohere", "Parsing"],
  },
  {
    id: "bajol",
    title: "Python Developer / IT Specialist",
    company: "Bajol Integrated Services Ltd",
    place: "Lagos, Nigeria",
    mode: "",
    start: "Feb 2021",
    end: "Jan 2025",
    summary:
      "Flask services for automation and conversation, document ingestion, and cached API workflows.",
    bullets: [
      "Built backend services in Flask to support AI automation and conversational interfaces.",
      "Integrated document ingestion with PDF and website parsing for internal QA tools.",
      "Managed API workflows for data processing pipelines and used caching to speed responses.",
      "Worked with the frontend team to visualize vector similarity outputs and structured LLM results.",
    ],
    tags: ["Python", "Flask", "APIs", "Caching"],
  },
];
