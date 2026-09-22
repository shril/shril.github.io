export type Role = {
  company: string;
  title: string;
  location: string;
  start: string;
  end: string;
  note?: string;
  points: string[];
};

export const experience: Role[] = [
  {
    company: "Roku",
    title: "Senior Software Development Engineer (Data)",
    location: "Bangalore, India",
    start: "September 2024",
    end: "Present",
    note: "Tech lead, 4 engineers reporting informally",
    points: [
      "Built an LLM-powered PII discovery and classification platform for the Ads Data Platform, replacing a planned six-figure annual vendor contract. It classifies schema metadata into sensitive-data categories and routes predictions to legal analysts for human validation.",
      "Closed the loop between evaluation and data: clustered analyst corrections into six failure modes, generated provenance-tagged synthetic examples for the weak categories, and served them through retrieval-augmented few-shot prompting. Precision moved from 84% to 91% while holding recall at or above 99%.",
      "Re-architected hourly Spark pipelines for ad impressions and advertiser conversions under a one-hour publishing SLA, replacing mutable tracker state with stateless, idempotent Iceberg processing built on partition-held state, Bloom filters, and positional deletes.",
      "Added transactional write-audit-publish controls and safe reruns, cutting job runtime 35%, Trino query latency 20%, and incident recovery from a full day to two hours without increasing ingestion latency.",
      "Architected a governed data-access layer that lets AI agents and engineers query roughly 5,000 Hive, Iceberg, and Snowflake tables through Trino, enforcing schema, lineage, ownership, identity context, and metric-certification policy before execution. Adopted by 120+ platform engineers.",
      "Built an agentic Hive-to-Iceberg migration platform with mandatory human approval gates, CI/CD promotion controls, durable workflow state, and audit records across GitLab, Jira, Slack, and Confluence. Migrated 450 tables across 40 workflows with no production incidents.",
      "Productionised Slack incident-history and Confluence runbook-retrieval MCP servers for an AI incident assistant, with read allowlists, least-privilege scopes, and human-gated writes. Deployed with Bazel, Terraform, and Kubernetes; adopted by 20+ teams and 150+ engineers.",
      "Led the redesign of GDPR deletion across the data lake, introducing configurable compliance reporting and virtual-identifier rotation to immediately disassociate customer records. Cut end-to-end fulfilment from 90+ days to 5, a 94% reduction.",
      "Re-architected GDPR data-download processing from MapReduce to Spark, scaling intake from 20 to 1,000+ requests per day while keeping daily physical reads tightly pruned relative to the source footprint.",
    ],
  },
  {
    company: "Groupon",
    title: "Software Development Engineer III",
    location: "Bangalore, India",
    start: "October 2020",
    end: "August 2024",
    points: [
      "Designed and built a Java/Dropwizard batch and real-time personalization service supporting 40M emails and 60M push notifications daily at 5 ms p95 end-to-end latency.",
      "Built a Consumer 360 data store with 400+ behavioral, demographic, and predictive features used by Marketing Engineering.",
      "Led the architecture and phased cutover of 2,500 Spark jobs from on-premises infrastructure to Google Cloud Dataproc, designing bidirectional table synchronization to preserve marketing flows during per-job cutovers, then retiring the synchronization layer per channel without interrupting revenue paths.",
      "Architected bulk-CRUD libraries for Amazon Keyspaces and Cloud Bigtable using batching and parallel execution, adopted as the standard access path by 10+ teams.",
      "Led the migration of a high-throughput service datastore from Amazon Keyspaces to Cloud Bigtable with no customer-visible downtime, cutting its annual run cost 90% by replacing per-operation serverless pricing with a provisioned cluster.",
      "Implemented retention and lifecycle policies in the data warehouse, reducing retained data volume by 80% and materially cutting annual storage cost.",
      "Designed a data quality framework with record-, column-, and metric-level checks and alerting, reducing tracked data-corruption incidents by 75% over two quarters.",
    ],
  },
  {
    company: "AtkinsRéalis",
    title: "Software Development Engineer II",
    location: "Bangalore, India",
    start: "February 2019",
    end: "September 2020",
    points: [
      "Built image and GIS data pipelines on Theia, a decoupled big-data and machine-learning platform on Databricks, and optimized PySpark workloads using Spark SQL and UDFs.",
      "Built serverless ETL applications moving MongoDB data into Azure SQL Server for the Assist 2.0 workflow product.",
    ],
  },
  {
    company: "Eatclub",
    title: "Software Development Engineer I",
    location: "Bangalore, India",
    start: "June 2018",
    end: "January 2019",
    points: [
      "Built backend APIs for vendor onboarding and inventory tracking, including QR-code integrations with Box8's e-commerce platform.",
    ],
  },
];

export const education = [
  {
    institution: "Indian Institute of Technology (Indian School of Mines), Dhanbad",
    credential: "B.Tech, Minor in Computer Science and Engineering",
    detail: "CGPA 8.1/10",
    start: "July 2014",
    end: "March 2018",
  },
];

export const internships = [
  "SNC-Lavalin Nuclear Solutions (2017)",
  "AtkinsGlobal Digital Incubator (2016)",
  "Saint Petersburg State University, Global Citizen Fellow (2015)",
];
