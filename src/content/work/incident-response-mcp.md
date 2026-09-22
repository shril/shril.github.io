---
title: Least-privilege MCP servers for an incident assistant
summary: Productionised Slack incident-history and Confluence runbook-retrieval MCP servers for an internal AI incident assistant, with read allowlists, least-privilege scopes, and button-gated writes. Adopted by 20+ teams and 150+ engineers.
org: Roku
period: "2025"
order: 6
tags: ["MCP", "Incident response", "Kubernetes", "Terraform", "Bazel"]
---

During an incident, most of the time goes on retrieval rather than thinking. Has this happened before? What did we do last time? Is there a runbook? The information exists — in Slack history and Confluence — and it is effectively unsearchable at three in the morning.

We built an internal incident-management assistant to answer those questions. I built and productionised the two MCP servers that give it access to the source material: one for Slack incident history, one for Confluence runbook retrieval.

## The security model came first

Connecting an LLM to a company's entire Slack workspace and wiki is a data-exfiltration surface, and during an incident it is being operated by tired people under pressure who will accept whatever it suggests. So the constraints came before the features.

**Read allowlists.** The servers can read from an explicit list of channels and spaces, not from everything the token could theoretically reach. The blast radius of a prompt injection in some unrelated channel is bounded by construction rather than by the model's good judgment.

**Least-privilege scopes.** Each server holds the narrowest OAuth scopes that let it do its job. The Confluence server can retrieve runbooks; it cannot rewrite them on a whim.

**Button-gated writes.** Anything that mutates state — posting an update, editing a page — requires a human to press a button. The assistant drafts; a person commits. This matters more in incident response than almost anywhere else, because an assistant confidently posting an incorrect status update to a stakeholder channel makes the incident worse, not better.

## Productionising it

The difference between a working MCP server and one that 150 engineers rely on during outages is mostly operational. I authored the Bazel build configuration, Terraform infrastructure definitions, and Kubernetes deployment manifests, so the servers deploy through the same reviewed pipeline as everything else rather than living on someone's machine.

An incident tool that is itself unreliable is worse than no tool, since it fails exactly when you are least able to debug it.

## Adoption

**20+ engineering teams and 150+ engineers.**

What I found most interesting is which capability people actually valued. I expected runbook retrieval to be the draw — it is the more obviously useful feature. In practice, Slack incident history was used more, because the honest answer to "what do we do about this" is usually recorded in a thread from eight months ago rather than in a document anybody maintained.
