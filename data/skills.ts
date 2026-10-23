export type SkillIcon =
  | "openai"
  | "langchain"
  | "prompt"
  | "parse"
  | "tokens"
  | "rag"
  | "vector"
  | "python"
  | "fastapi"
  | "flask"
  | "api"
  | "voice"
  | "docker"
  | "git"
  | "aws"
  | "gcp";

export interface SkillGroup {
  id: string;
  title: string;
  summary: string;
  items: { name: string; icon: SkillIcon }[];
}

export const skills: SkillGroup[] = [
  {
    id: "genai",
    title: "LLMs & GenAI",
    summary: "Agents, prompts, parsers, and the token budget, designed as one system.",
    items: [
      { name: "LangChain — agents, tools, memory", icon: "langchain" },
      { name: "OpenAI GPT-4+", icon: "openai" },
      { name: "Prompt engineering", icon: "prompt" },
      { name: "LLM output parsing", icon: "parse" },
      { name: "Token optimization", icon: "tokens" },
      { name: "Cohere", icon: "api" },
    ],
  },
  {
    id: "retrieval",
    title: "Retrieval & Data",
    summary: "Vector search for RAG, and knowledge graphs as current study.",
    items: [
      { name: "RAG pipelines", icon: "rag" },
      { name: "Pinecone", icon: "vector" },
      { name: "FAISS", icon: "vector" },
      { name: "Knowledge graphs (OWL / RDF)", icon: "rag" },
    ],
  },
  {
    id: "backend",
    title: "Backend & APIs",
    summary: "Python services and the APIs that feed them.",
    items: [
      { name: "Python", icon: "python" },
      { name: "FastAPI", icon: "fastapi" },
      { name: "Flask", icon: "flask" },
      { name: "REST and GraphQL", icon: "api" },
      { name: "Hugging Face", icon: "api" },
    ],
  },
  {
    id: "interfaces",
    title: "Interfaces",
    summary: "Voice input and speech APIs alongside the text interface.",
    items: [
      { name: "Voice interfaces", icon: "voice" },
      { name: "Whisper", icon: "voice" },
      { name: "ElevenLabs", icon: "voice" },
    ],
  },
  {
    id: "devops",
    title: "DevOps & Cloud",
    summary: "The tools used to version, containerize, and host the services.",
    items: [
      { name: "Git", icon: "git" },
      { name: "Docker", icon: "docker" },
      { name: "AWS", icon: "aws" },
      { name: "GCP", icon: "gcp" },
    ],
  },
];
