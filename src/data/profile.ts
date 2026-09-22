export const profile = {
  name: "Shril Kumar",
  title: "Data & AI Infrastructure Engineer",
  location: "Bangalore, India",
  tagline:
    "I build the infrastructure that turns data into something models and teams can actually trust.",
  summary: [
    "I have spent 8+ years building large-scale data platforms, privacy and governance systems, agentic workflows, and distributed pipelines that hold up in production. Most of that work sits at the boundary where data engineering meets compliance: PII classification, provenance-aware synthetic data, lineage, policy-enforced access, and data lifecycle management across petabyte-scale estates.",
    "Currently a Senior Software Development Engineer on Roku's Ads Data Platform, where I lead a small team and own the systems that classify sensitive data, govern how AI agents query the warehouse, and migrate the lake to Iceberg without incidents.",
  ],
  links: {
    email: "shril.iitdhn@gmail.com",
    github: "https://github.com/shril",
    githubHandle: "shril",
    linkedin: "https://linkedin.com/in/shril",
    linkedinHandle: "in/shril",
    cv: "/Shril-Kumar-CV.pdf",
  },
  // Headline facts, deliberately expressed as ratios rather than absolute
  // dollar amounts or estate sizes.
  highlights: [
    {
      metric: "84% → 91%",
      label: "PII classifier precision at recall ≥ 99%, via an evaluation-to-data flywheel",
    },
    {
      metric: "450 tables",
      label: "migrated Hive → Iceberg by an agentic workflow, with zero production incidents",
    },
    {
      metric: "94%",
      label: "reduction in GDPR deletion fulfilment time, from 90+ days to 5",
    },
  ],
} as const;

export const siteMeta = {
  title: "Shril Kumar",
  description:
    "Data & AI infrastructure engineer. Data governance, privacy systems, agentic workflows, and petabyte-scale pipelines.",
  url: "https://shril.github.io",
} as const;
