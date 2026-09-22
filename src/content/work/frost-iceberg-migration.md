---
title: Frost — an agentic workflow for migrating a data lake
summary: An agentic Hive-to-Iceberg migration platform with mandatory human approval gates. Migrated 450 tables across 40 workflows with no production incidents, delivered by three engineers instead of roughly ten.
org: Roku
period: "2025"
order: 2
tags: ["Agentic workflows", "Iceberg", "Migration", "Human-in-the-loop", "Lineage"]
---

Migrating a Hive table to Iceberg is not difficult. Migrating several hundred of them is, because the difficulty is not technical — it is that each table carries its own context. Who owns it, what writes to it, what reads from it, whether it holds PII or falls under SOX, how it is partitioned, and how badly things break if you get it wrong.

An engineer doing this manually spends most of their time gathering that context, and very little time on the migration itself. Frost automates the gathering and keeps the human for the judgment.

## What it does

Frost accepts a table, a set of tables, or an entire DAG. The DAG case is the one that saved the most time in practice: given a pipeline, it discovers the tables belonging to it rather than making an engineer enumerate them by hand, which is both tedious and the step where things get missed.

From there it runs through discovery, generation, validation, and controlled rollout:

**Discovery and classification.** It inspects the table's storage format, owner, location, size, partition count, producing DAG, write pattern, PII and SOX classification, and lineage. This is the context an engineer would otherwise assemble across DataHub, GitLab, and tribal knowledge.

**Configuration generation.** It writes the migration YAML — migration mode, target schema, partition specification, storage properties, and Spark settings tuned to the table's actual size and partition count. A table with twelve partitions and a table with twelve thousand do not want the same Spark configuration, and this is where most hand-written migrations go wrong.

**Sandbox merge request.** It commits the generated YAML to the migration repository, applies a sandbox label, and assigns the right reviewers.

**Development validation.** The sandbox pipeline deploys or snapshots the table in a development environment and validates the result, catching configuration, schema, and infrastructure problems before anything production-facing happens.

## The gates are the point

Frost runs on Forge, our internal framework for agentic data-engineering applications, which supplies orchestration, tool integrations, approval gates, monitoring, auditability, and reusable agents.

What makes Frost trustworthy is not the automation but the places where it refuses to proceed. Engineers review the generated migration YAML and plan. They review the DAG code diff. After downstream validation they decide whether to promote, adjust, or abort. Production merges additionally require sign-off from both Data Engineering and Data Platform.

None of these gates are advisory. The workflow stops and waits.

This is a deliberate position on where agents belong in infrastructure work. The model is good at assembling context and drafting a configuration, and it is not accountable for a corrupted production table. So it does the first job and a human does the second, with the handoff made explicit rather than implied.

## Surviving the real world

Long migrations fail in boring ways — a pipeline is flaky, a reviewer goes on holiday, the orchestrator restarts. Frost keeps durable state per `run_id`, tracking the current phase, gate decisions, merge request URLs, branches, and retry counts, so a migration can pause for days and resume where it left off. Failed validation is diagnosed and retried, up to a bounded number of attempts per phase, rather than dumping a stack trace on someone.

It also writes its own audit trail across GitLab, Jira, Slack, and Confluence as it goes. That was originally for compliance, but the more common use turned out to be an engineer asking "what happened to this table three weeks ago" and getting an answer.

## Outcome

**450 tables across 40 workflows, with no production incidents to date.** For 75% of non-critical tables, the generated YAML needed no engineering tuning at all after the mandatory review — the review confirmed the configuration rather than fixing it.

The comparison I find most telling is staffing. A three-engineer team delivered this, against an estimate of roughly ten for running the same programme manually. The savings did not come from the agent writing YAML faster than a person could. They came from eliminating the context-gathering that dominated each migration, and from the 75% of tables that stopped needing an expert opinion at all.
