---
title: Moving cloud platforms without downtime
summary: Migrated 2,500 Spark jobs from on-premises infrastructure to GCP Dataproc with phased cutovers. A separate AWS Keyspaces to GCP Bigtable migration delivered zero downtime and lowered annual datastore cost from approximately $2M to $200K.
org: Groupon
period: 2020 – 2024
order: 3
tags: ["Cloud migration", "GCP Dataproc", "Apache Spark", "Bigtable", "Keyspaces"]
---

At Groupon, I worked on two distinct migrations: moving **2,500 Spark jobs from on-premises infrastructure to GCP Dataproc**, and moving a service datastore from **AWS Keyspaces to GCP Bigtable**. Both required keeping existing production flows running during the transition.

## Moving 2,500 Spark jobs

I led the architecture and phased cutover of the Spark estate. Rather than switch all jobs at once, we moved them individually while preserving the marketing flows that depended on their output.

Bidirectional table synchronization kept those flows running during per-job cutovers. As each channel completed its transition, we retired its synchronization layer without interrupting the revenue paths it supported.

## A separate datastore migration

The Keyspaces-to-Bigtable project moved a high-throughput service datastore with **zero customer-visible downtime**. Annual run cost fell from approximately **$2M to $200K** — a 90% reduction for that datastore.

The cost change came from replacing per-operation serverless pricing with a provisioned cluster. It is a project-specific comparison, separate from the Spark migration.

I also built bulk-CRUD libraries for Keyspaces and Bigtable using batching and parallel execution. These became the standard access path for **10+ teams**, giving teams a reusable way to interact with both stores.

## The common thread

The platform could change underneath its users while the flows they relied on kept running. Phased cutovers and reusable access libraries made these migrations operational changes teams could manage, rather than a single disruptive switch.
