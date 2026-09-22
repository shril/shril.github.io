---
title: From 90 days to 5 — rebuilding GDPR deletion
summary: Redesigned deletion across a petabyte-scale data lake using virtual-identifier rotation for immediate disassociation, cutting end-to-end fulfilment 94%. Separately re-architected data download from MapReduce to Spark for a 50× intake increase.
org: Roku
period: 2024 – 2025
order: 5
tags: ["GDPR", "Privacy engineering", "Apache Spark", "Compliance", "Anonymisation"]
---

GDPR gives people the right to have their data deleted, and it gives companies a deadline. When I took this on, end-to-end fulfilment was taking **90+ days** — over the line, and getting worse as the lake grew.

## Why deletion is slow

The instinct is that deletion is slow because the data is big, and that is only partly true. It is slow because deletion is *transactional thinking applied to an analytical store*. To erase a person from a data lake you must find every dataset containing them, rewrite each one without their rows, and do it across formats, partitions, and pipelines that were built by different teams over a decade, several of which are undocumented.

A significant part of this work was not engineering at all. It was reverse-engineering the undocumented frontend, backend, and data-engineering paths by which customer data actually arrived in the lake, because you cannot delete what nobody has written down.

## Breaking the link instead of chasing the rows

The change that made the timeline collapse was to stop treating deletion as a single operation.

What the regulation cares about is that the data can no longer be associated with a person. Physically overwriting every row is one way to achieve that. Making the identifier that links them meaningless is another, and it is immediate.

So I introduced a **virtual-identifier service**. Customer records are keyed by virtual identifiers — a virtual account ID and a virtual device ID — rather than by durable personal identifiers. When a deletion request arrives, those identifiers are **rotated**. The moment rotation completes, the historical data in the lake is no longer associated with that customer, because the key that connected them no longer resolves.

Disassociation is instant. The physical purge still happens, on the lake's own schedule rather than against a ticking clock, and is no longer what the compliance deadline depends on.

## Making compliance reporting a configuration change

The other bottleneck was reporting. Every new compliance dataset meant a new engineering task, which meant legal analysts waited on the data team for something they understood better than we did.

I built a configurable Spark reporting client so new compliance datasets could be onboarded by configuration rather than code. Working directly with the legal analysts, the onboarding time for a new dataset came down to **one or two days**.

**End-to-end fulfilment went from 90+ days to 5 — a 94% reduction.** Alongside the redesign I ran a one-off purge of deeply nested PII from **700+ TB** of Hive data, the kind of accumulated mess that predates anyone's deletion policy.

## The mirror problem: data download

Deletion has a twin. GDPR also gives people the right to a copy of their data, and that system was in worse shape — a **MapReduce** job that could service roughly **20 requests per day**.

I re-architected it on **Spark**, which raised intake capacity to **1,000+ requests per day**, a 50× increase.

The interesting constraint was not compute but reads. A naive implementation scans the full source footprint for every request, and at petabyte scale that is unaffordable no matter how fast your engine is. The work that mattered was aggressive partition and predicate pruning, so that daily physical reads stayed a small fraction of the one-year source footprint even as request volume grew fiftyfold.

Here too I made new compliance datasets configurable, in partnership with the legal team, so the same one-to-two-day onboarding applied.

## What I took from it

Privacy engineering rewards changing the question. The 90-day problem looked like a throughput problem, and every throughput optimisation available would have gotten it to perhaps 60 days. Reframing "delete the data" as "break the association, then delete the data" is what produced a 94% improvement, and it came from reading the regulation carefully rather than from profiling a Spark job.
