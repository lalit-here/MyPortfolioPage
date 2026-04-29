export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  github: string;
  live: string;
  year: string;
};

export const projects: Project[] = [
  {
    id: "llm-research-agent",
    title: "LLM Research Agent",
    description:
      "A task-focused agent that breaks research prompts into search, extraction, and synthesis steps. It keeps source notes structured so the final answer can be checked instead of trusted blindly.",
    tags: ["Next.js", "TypeScript", "OpenAI", "Agents"],
    github: "https://github.com/lalit/llm-research-agent",
    live: "https://llm-research-agent.example.com",
    year: "2026",
  },
  {
    id: "ai-scraper-console",
    title: "AI Scraper Console",
    description:
      "A web scraping pipeline that turns messy pages into clean summaries and tagged records. Built around rate limits, retries, and human-readable extraction logs.",
    tags: ["Python", "Playwright", "FastAPI", "LLMs"],
    github: "https://github.com/lalit/ai-scraper-console",
    live: "https://ai-scraper-console.example.com",
    year: "2026",
  },
  {
    id: "support-intent-tuner",
    title: "Support Intent Tuner",
    description:
      "A fine-tuning experiment for classifying support tickets into high-signal intent buckets. The project tracks dataset quality, evaluation drift, and failure cases before model accuracy claims.",
    tags: ["Python", "PyTorch", "Fine-tuning", "Evaluation"],
    github: "https://github.com/lalit/support-intent-tuner",
    live: "https://support-intent-tuner.example.com",
    year: "2025",
  },
  {
    id: "rag-knowledge-pipeline",
    title: "RAG Knowledge Pipeline",
    description:
      "A retrieval pipeline for chunking documents, embedding them, and returning cited answers. It focuses on grounding, chunk inspection, and simple controls for improving weak retrieval results.",
    tags: ["RAG", "Vector DB", "LangChain", "Python"],
    github: "https://github.com/lalit/rag-knowledge-pipeline",
    live: "https://rag-knowledge-pipeline.example.com",
    year: "2025",
  },
  {
    id: "agentic-workflow-board",
    title: "Agentic Workflow Board",
    description:
      "A visual workflow tool for chaining small AI-assisted tasks with review checkpoints. Each run records inputs, outputs, and decisions so automation stays inspectable.",
    tags: ["React", "TypeScript", "Framer Motion", "Agents"],
    github: "https://github.com/lalit/agentic-workflow-board",
    live: "https://agentic-workflow-board.example.com",
    year: "2026",
  },
  {
    id: "brutalist-ai-interface",
    title: "Brutalist AI Interface",
    description:
      "A frontend experiment for presenting model output without soft SaaS patterns. The layout uses hard edges, dense typography, and clear interaction states for a sharper AI workspace.",
    tags: ["Next.js", "Tailwind", "Design Systems", "UI"],
    github: "https://github.com/lalit/brutalist-ai-interface",
    live: "https://brutalist-ai-interface.example.com",
    year: "2025",
  },
];
