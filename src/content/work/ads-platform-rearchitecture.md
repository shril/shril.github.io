---
title: Deleting the tracker table
summary: Re-architected hourly ad impression and conversion processing from mutable tracker state to stateless, idempotent Iceberg pipelines. Runtime down 35%, Trino latency down 20%, incident recovery from a day to two hours.
org: Roku
period: 2024 – 2025
order: 4
tags: ["Apache Spark", "Iceberg", "Idempotency", "Trino", "SLA"]
---

The ads data platform processes hundreds of millions of ad impressions and tens of millions of advertiser conversion events every day, and has to publish under a **one-hour SLA**. When I picked this up, the pipelines met that SLA most of the time, and when they missed it they missed badly.

## The bug was the architecture

The pipelines tracked their own progress in an external tracker table: a row recording how many hours of data had been processed so far. Every run read the tracker, processed the next window, and updated it.

This is a very common pattern and it has a very specific failure mode. The tracker update and the data write are two separate operations, so any interruption between them leaves the system in a state that is a lie. If the data was written and the tracker was not updated, the next run reprocesses the same window and you get duplicates. If the tracker advanced and the write failed, you get a silent hole.

Both happened. The resulting duplication and inconsistency caused production incidents, and because reconciling a mutable tracker against partially-written data is manual forensic work, **recovery took a full day**.

The important realisation was that this was not a bug to be fixed with more careful tracker updates. Any design where progress is stored separately from the data has this race. The tracker had to go.

## Making the pipelines stateless

I replaced external tracking with **partition-held state**: the data's own partition layout tells you what has been processed, because a partition either exists with complete data or it does not. The question "where did we get to" is answered by querying the table rather than by consulting a side-channel that can disagree with it.

Making that work at this scale needed two more things. **Bloom filters** to cheaply determine whether a given event had already been ingested, without a full scan on every run. And Iceberg **positional deletes** to surgically remove specific rows when correcting a window, rather than rewriting whole partitions.

Together these make the pipelines **idempotent**. Running the same window twice produces the same result as running it once. That single property is what eliminated the incident class entirely — not reduced its frequency, eliminated the mechanism.

## Write-audit-publish

On top of that I added transactional write-audit-publish. Data is written, validated while still invisible to readers, and then published through a **metadata-only commit**. Readers see either the previous state or the complete new state, never a partial one.

This is what made safe reruns possible. Reprocessing a window is no longer a risky operation requiring a maintenance window and a person watching dashboards; it is routine. **Incident recovery went from a full day to two hours**, and most of those two hours is deciding what to rerun rather than repairing damage.

## The performance was almost incidental

Cutting the tracker also removed a lot of coordination overhead and let me revisit partitioning and compaction properly. Across twelve hourly Spark aggregation jobs, **runtime fell 35%**. **Trino query latency for the Superset-backed dashboards fell 20%**, because the tables underneath were better laid out and no longer accumulating small files.

The constraint I am most pleased about is that none of this increased ingestion latency. It is easy to buy correctness with a slower pipeline, and that would have broken the one-hour SLA that made the whole thing worth doing.

## Keeping it that way

Iceberg tables degrade if left alone. Small files accumulate, delete files pile up, snapshots grow without bound, and orphaned data lingers after failed writes.

So I built a config-driven maintenance framework covering data-file and positional-delete compaction, snapshot expiry, and orphan cleanup, integrated with Airflow at one task per table and operation. That granularity means a single misbehaving table's maintenance can be retried or tuned in isolation instead of taking down a monolithic maintenance DAG.

It now maintains **100+ production tables**, including but not limited to the ones from this project — which is how it should be, since the degradation problem is a property of Iceberg rather than of these pipelines.
