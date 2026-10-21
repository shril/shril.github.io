import { experience } from "./experience";
import { contributions } from "./openSource";

export const websiteExperience = experience.map((role) => {
  if (role.company === "Roku") return { ...role, points: [
    "Re-architected Ads ingestion for 250M+ events per day under a one-hour publishing SLA, using idempotent Iceberg processing and audited publication. Incident recovery fell from one day to two hours; runtime fell 35% and Trino latency 20%.",
    "Built a Rust maintenance framework covering 500+ mission-critical tables. Rust compaction has 90% lower compute cost than Spark; Iceberg migration and maintenance tools are used by 10+ teams.",
    "Built an agentic Hive-to-Iceberg migration platform with mandatory human approval gates, durable workflow state and audit records. Migrated 450 tables across 40 workflows with no production incidents.",
    ...role.points.filter((point) => !/Re-architected hourly|Added transactional|Built an agentic Hive/.test(point)),
  ] };
  if (role.company === "Groupon") return { ...role, points: role.points.map((point) => point.startsWith("Led the migration of a high-throughput") ? "Led a separate Amazon Keyspaces to GCP Bigtable datastore migration with zero downtime, lowering annual cost from approximately $2M to $200K." : point) };
  return role;
});

export const websiteContributions = contributions.map((item) => item.name === "Hardwood" ? {
  ...item,
  href: "https://github.com/hardwood-hq/hardwood",
  description: "A minimal-dependency Java implementation of Apache Parquet, making columnar data access practical without a heavy Hadoop stack.",
  body: "My contributions: dictionary-based predicate evaluation, floating-point Bloom filter pruning, and content-width layout in the dive TUI preview.",
} : {
  ...item,
  description: "Brings familiar pandas APIs to distributed Spark dataframes. Its approach now lives in PySpark’s pandas API.",
  body: "My contributions: replace, cache, to_records and to_excel DataFrame APIs.",
});
