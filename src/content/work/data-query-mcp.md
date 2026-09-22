---
title: Governing what AI agents are allowed to ask the warehouse
summary: A governed MCP data-access layer over roughly 5,000 tables, enforcing schema, lineage, ownership, identity, and metric certification before a query runs. Adopted by 120+ platform engineers.
org: Roku
period: "2025"
order: 3
tags: ["MCP", "Trino", "DataHub", "Access control", "OAuth"]
---

Giving an AI agent database credentials is easy and almost always wrong. The agent will happily write a query that is syntactically valid, returns a number, and is completely misleading — because it joined on the wrong key, or read a deprecated table, or pulled a metric that the business stopped trusting two quarters ago. It has no way to know any of that from the schema alone.

The usual reactions are to forbid agent access entirely, or to allow it and hope. Neither scales. So the question I was interested in was: what would it take to let agents query the warehouse *through* governance rather than around it?

## Metadata as an admission requirement

The answer was to put DataHub metadata into the query path as a precondition, not a lookup.

Before a query executes, the layer resolves and enforces the schema, lineage, ownership, identity context, and — the piece that mattered most — **metric certification status**. Tables and metrics carry a certification state of `CERTIFIED`, `DEPRECATED`, or `NOT CERTIFIED`. An agent asking a business question gets steered toward certified sources and ranked away from the rest, so the default path to an answer is the trustworthy one.

This inverts the normal relationship between a catalog and a query engine. Usually the catalog is documentation that a diligent human consults. Here it is a gate that execution passes through.

## Identity, properly

The layer does per-user OAuth and JWT authorization rather than running everything as one service account. This detail is load-bearing. A shared service identity means every agent query has the union of everyone's permissions, the audit log says "the service did it", and you have built a very efficient way to leak data across team boundaries.

Instead, a query carries the identity of the person on whose behalf it runs. Access-control failures come back as ownership-aware errors — telling you who owns the table you cannot read, so the response is actionable rather than a dead end — and every call writes an auditable row recording the caller's role.

## Scale and adoption

It now governs access to roughly **5,000 Hive, Iceberg, and Snowflake tables**, serving around **5,000 calls per day** for **120+ Data Platform engineers**.

Worth noting: engineers use it directly, not only agents. That was not the original design goal, but a governed interface that ranks certified tables and explains access denials turned out to be genuinely faster than navigating three catalogs by hand. The adoption curve was driven by convenience rather than policy, which is the only way this kind of layer ever actually gets used.

## What I would tell someone building this

The temptation is to build the query execution first and add governance later. That ordering does not work, because governance-as-a-wrapper is trivially bypassable and everyone knows it, so nobody trusts the layer and they go get a direct connection instead.

Metadata resolution has to be on the critical path from the first commit. It makes the system slower to build and it is the only reason the system is worth anything.
