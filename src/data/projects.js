import { TreeStructure, Brain } from '@phosphor-icons/react'

export const projects = [
  {
    id: 'codesense',
    title: 'CodeSense',
    type: 'AI / Full-Stack',
    description: 'RAG-powered codebase exploration tool — query 100+ file repos through a dual-mode Streamlit + React Flow visualization engine using OpenAI GPT and Function Calling.',
    color: '#0d1a0d',
    accent: '#c8ff00',
    Icon: TreeStructure,
    link: 'https://codesensegit.streamlit.app/',
    github: 'https://github.com/surbhit20/CodeSense',
    tags: ['Python', 'OpenAI', 'Streamlit', 'React Flow'],
  },
  {
    id: 'ml-rag-system',
    title: 'Probabilistic ML RAG System',
    type: 'ML / AI',
    description: 'RAG pipeline on Llama 3.2 parsing 50+ technical PDFs with sub-3s query response, powered by LlamaIndex, LlamaParser, and Pinecone vector embeddings.',
    color: '#1a0a2e',
    accent: '#a855f7',
    Icon: Brain,
    link: 'https://ml-concepts-rag.streamlit.app/',
    github: 'https://github.com/surbhit20/RAG',
    tags: ['LlamaIndex', 'Pinecone', 'Streamlit', 'Python'],
  },
]
