export const experience = [
  {
    company: 'Easley Dunn Productions, Inc.',
    role: 'Software Engineer',
    period: 'Feb 2026 — Present',
    location: 'Santa Clara, CA',
    current: true,
    bullets: [
      'Engineered an LLM-driven analytics pipeline for automated reporting and near real-time telemetry over GCP BigQuery and Firebase, with schema-grounded execution guardrails and a conversational agent interface, automating ~80% of ad-hoc requests.',
      'Architected a stateful memory retention system using dynamic context compression to maintain multi-turn context; reduced API token consumption by ~35% and lowered inference costs for complex analytical follow-ups.',
      'Shipped an MCP server on Google Cloud Run exposing 3 custom tools that index fragmented internal data (Firebase, GitHub, meeting transcripts) behind a single retrieval interface, eliminating context-switching during documentation and repo exploration.',
      'Implemented Firebase Analytics event tracking (C#) across 70+ gameplay events in a Unity application, routing 12 user flows into Looker Studio dashboards to visualize 17 key metrics for the product and design teams.',
    ],
  },
  {
    company: 'Amphenol',
    role: 'Software Engineering Intern',
    period: 'May 2025 — Aug 2025',
    location: 'St. Marys, PA',
    current: false,
    bullets: [
      'Architected a lightweight Internal Developer Portal using a Python webhook engine, integrating the GitHub and Jira REST APIs to automate repository provisioning and enforce naming governance, cutting project setup time by >30%.',
      'Built a RESTful Python microservice to automate hardware component nomenclature, replacing unstructured legacy workflows with strict naming schemas that reduced downstream quoting errors by 23%.',
      'Built a C# WinForms dashboard to visualize test results from SQL Server, speeding root-cause analysis and eliminating significant manual diagnostic effort.',
    ],
  },
  {
    company: 'HighRadius',
    role: 'Software Developer Intern',
    period: 'Jan 2022 — Apr 2022',
    location: 'Remote',
    current: false,
    bullets: [
      'Engineered a scalable loan prediction platform using a React and Node.js stack, cutting MySQL data retrieval latency by 25% through optimized database indexing and server-side pagination.',
      'Integrated Random Forest and Gradient Boosting algorithms to develop predictive ML models, achieving a 14.3% reduction in loan repayment discrepancies and improving overall financial system reliability.',
    ],
  },
  {
    company: 'Coal India Ltd',
    role: 'Software Developer Intern',
    period: 'Sep 2021 — Oct 2021',
    location: 'Ranchi, India',
    current: false,
    bullets: [
      'Developed and deployed a user-friendly accommodation search application leveraging JavaScript while utilizing Terraform for infrastructure as code to streamline deployment processes.',
      'Designed and implemented a backend with Django and PostgreSQL, containerized it with Docker, and integrated AWS S3 and RDS, which improved data reliability and security.',
    ],
  },
]
