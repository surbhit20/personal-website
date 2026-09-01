export const projects = [
  {
    id: 'mia',
    title: 'Mia: Real-Time Voice Agent for Google Meet',
    type: 'AI / Voice Agent',
    description: 'LLM-based voice agent that joins Google Meet, pairing streaming STT with Claude Opus over rolling call state to perform in-call queries through concurrent Calendar and Meet tool calls and emit structured summaries at ~2.9s p95 speech-to-speech. Enforces guardrails via a lightweight intent classifier run asynchronously to suppress prompt injection and out-of-scope completions at <150ms added p95.',
    link: 'https://youtu.be/PSs0ckJ0jt4?si=_Ir77z9juDHKbV7Z',
    tags: ['Claude Opus', 'Streaming STT', 'Google Calendar API', 'Google Meet API'],
  },
  {
    id: 'codesense',
    title: 'CodeSense: Agentic Codebase Retrieval and Chat',
    type: 'AI / Full-Stack',
    description: 'LLM-based coding agent (Claude Sonnet 5) paired with a custom AST-based RAG system for precise context retrieval, parsing and mapping complex dependency chains across codebases spanning 10,000+ interdependent files. Combines SQLite FTS BM25 and Abstract Syntax Trees for efficient, accurate code indexing and lazy lookups, saving model context by 74%.',
    link: 'https://youtu.be/YI1jCXRi_IU?si=Rufs3ER-GNZLFZpx',
    github: 'https://github.com/surbhit20/CodeSense',
    tags: ['Claude Sonnet 5', 'AST-based RAG', 'SQLite FTS BM25'],
  },
  {
    id: 'ai-mafia',
    title: 'Made AI Play Mafia: Multi-Agent Asynchronous Communication',
    type: 'AI / Multi-Agent',
    description: 'Async multi-agent AI system enabling structured communication among 6+ autonomous agents in social deduction gameplay scenarios, with a modular 2-part brain architecture (Scheduler & Generator) and a concurrency-safe shared context.',
    github: 'https://github.com/surbhit20/multi-agent-orchestration',
    tags: ['Multi-Agent AI', 'Async Python', 'Scheduler/Generator Architecture'],
  },
]
