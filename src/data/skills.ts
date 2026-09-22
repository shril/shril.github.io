export type SkillGroup = { label: string; items: string[] };

export const skills: SkillGroup[] = [
  {
    label: "Languages",
    items: ["Python", "Scala", "Java", "SQL"],
  },
  {
    label: "Data & distributed systems",
    items: [
      "Apache Spark",
      "Trino",
      "Kafka",
      "Iceberg",
      "Hive",
      "Hadoop",
      "Databricks",
      "Airflow",
    ],
  },
  {
    label: "AI data & governance",
    items: [
      "LLM data pipelines",
      "Synthetic data",
      "Retrieval-augmented generation",
      "MCP",
      "DataHub",
      "PII classification",
      "Provenance",
      "Lineage",
      "Policy-enforced access",
    ],
  },
  {
    label: "Infrastructure & security",
    items: ["Terraform", "Kubernetes", "Bazel", "OAuth", "JWT"],
  },
  {
    label: "Cloud & datastores",
    items: [
      "GCP (Dataproc, Bigtable)",
      "AWS (Keyspaces)",
      "Cassandra",
      "PostgreSQL",
      "DynamoDB",
    ],
  },
  {
    label: "Backend",
    items: ["Dropwizard (Java)", "FastMCP / MCP (Python)"],
  },
];
