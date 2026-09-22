---
title: An LLM PII classifier, and the flywheel that fixed it
summary: Built in-house sensitive-data discovery for the ads data platform instead of buying it, then closed the loop between analyst corrections and training data to move precision from 84% to 91% without giving up recall.
org: Roku
period: 2024 – present
order: 1
tags: ["LLMs", "Data governance", "Synthetic data", "Evaluation", "PII"]
---

A vendor was ready to sell us a data discovery and classification tool on a six-figure annual contract. The pitch was reasonable — we genuinely did not know where sensitive data lived across the ads data platform — but the pricing assumed we could not build it ourselves. I thought we could, because the problem has a shape that suits a language model unusually well.

## Classifying schema, not data

The key decision was to classify **metadata rather than contents**. The pipeline runs over table DDL and asks the model about a table name, a column name, and a data type. It answers two questions in sequence: is this column personally identifiable, and if so, which category does it belong to — financial, personal, geographic, educational, and so on.

Reading DDL instead of rows matters for several reasons at once. It is orders of magnitude cheaper, because schema is tiny and rows are not. It sidesteps the awkwardness of piping the very data you are trying to protect through a third-party model endpoint. And it scales with the number of columns in the estate rather than the number of records, which is the difference between a job that finishes and one that does not.

The tradeoff is real: a column called `notes` or `value_3` tells the model almost nothing. Those cases are exactly where the classifier was weakest, and they are what the rest of this work is about.

## Humans in the loop, by design

Predictions do not land in a policy engine. They go to the legal analyst team, who validate each one and override what the model got wrong. That gate was never negotiable — the downstream consequences of a misclassification are regulatory, not cosmetic — but it also turned out to be the most valuable part of the system.

Every override is a labelled example of a specific failure, produced by an expert, for free, as a side effect of a process we needed anyway.

## Turning corrections into training data

Most teams treat human corrections as a correction and move on. The interesting part is treating them as a **dataset**.

I clustered the accumulated analyst overrides and found they collapsed into six recurring failure modes rather than being scattered noise. That changed the problem from "the classifier is 84% precise" — which tells you nothing actionable — into six concrete, nameable gaps.

For the weakest of those clusters I generated synthetic examples: additional schema patterns that exercise the same confusion the analysts had caught. Each generated example carries a **provenance tag** recording that it is model-generated and which failure cluster it was made to address. That bookkeeping is not decoration. Without it you lose the ability to answer the two questions that matter later — where did this training example come from, and is the evaluation set contaminated by the same generator that produced the training data?

Those examples are then served back into the classifier through retrieval-augmented few-shot prompting. At inference time, a column being classified retrieves the synthetic and real examples nearest to it, so the prompt is populated with precisely the cases most likely to disambiguate it.

## What moved

Precision went from **84% to 91%**, and the constraint that made this hard is that recall had to stay at or above **99%**.

That asymmetry is the whole design problem. In a governance context, a false negative is an unclassified sensitive column sitting in a warehouse, which is a compliance failure. A false positive is an analyst spending ten minutes rejecting a wrong guess. The two errors are not remotely equal in cost, so recall is effectively a hard floor and precision is what you are allowed to optimise. Plenty of interventions improve precision by quietly trading away recall; those were not available to us.

The practical effect was a meaningful cut in the false-positive review burden, which is what made the platform sustainable for a small analyst team rather than an ever-growing queue.

## Where it went

The platform became a cornerstone of the wider data-governance strategy, and it is now expanding well beyond the ads platform it was built for — into the core and enterprise data estates, and into SQL and NoSQL databases, which have quite different metadata conventions than a Hive or Iceberg warehouse.

The part I would keep in any future version of this system is the flywheel rather than the classifier. The model will be replaced; it has already been replaced once. The loop that converts expert disagreement into targeted, provenance-tracked training data is the durable asset.
