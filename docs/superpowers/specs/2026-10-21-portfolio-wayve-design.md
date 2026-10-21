# Portfolio and Wayve website alignment

The user approved rebalancing the public portfolio, publishing a dedicated /wayve/ landing page, and using the current mock's design across the site. The CV is the user's responsibility. The source mock is ../site/dist/index.html. Preserve its latest content decisions: no engineering disclosure or diagram, no MongoDB/Azure ETL sentence in the landing page, no footer tagline, and a prominent Read CV button.

## Confirmed facts

- Maintenance framework: 500+ mission-critical tables.
- Hive-to-Iceberg migration: 450 tables migrated so far. This is distinct from maintenance coverage.
- Iceberg migration and maintenance tools adopted by 10+ teams.
- Ads ingestion: 250M+ events/day; one-hour publishing SLA; recovery one day to two hours.
- Ads Data Platform lake footprint: 70+ PB, not daily transfer throughput.
- Rust compaction costs 90% less compute than Spark. Scope this claim to compaction.
- Groupon: 2,500 Spark jobs migrated on-prem to GCP Dataproc; separate AWS Keyspaces to GCP Bigtable migration with zero downtime and ~$2M to $200K annual cost.
- GDPR fulfilment: 90+ days to 5 days. User confirmed this is current and the supplied CV is older.
- Primary production orchestrator is Airflow. Temporal is experimental; do not claim production Flyte or Azure networking expertise.

## Design and structure

Retain Astro and existing routes. Use cream #f5f3ec, ink #202d2c, teal #245d52, pale green #e6eee5, white #fffef9, Georgia serif headlines and system sans body text from the mock. Light is the default shared presentation; remove the old theme override/toggle so stored dark preferences cannot override the approved palette.

The homepage introduces fast, reliable data platforms and AI infrastructure. Lead with Ads reliability, Iceberg tooling, and cloud migration; keep AI governance and MCP as supporting work. Provide visible, concise project summaries, using deeper case studies through ordinary links. Retain existing deep links.

Publish the approved compact mock at /wayve/, adapted into Astro and shared components/styles where practical. Keep its simple header, primary Data role focus, and secondary orchestration link. Show 450 migrated distinctly from 500+ maintained; avoid adding another large metric section. Point Read CV to the existing canonical PDF /Shril-Kumar-CV.pdf. Do not copy the stale mock PDF to the live site.

Preserve PDF bytes, cv.astro content, and profile.summary/experience data used by the CV. Shared visual styling can change the CV page. Add website-only profile copy and selected-work facts without replacing the CV's content. Open-source page should link Hardwood and Koalas repositories and explain practical usefulness, with no temporary release-status claims. Avoid changing CV content indirectly through its shared contributions data.

## Evidence reconciliation

Replace the stale 100+ maintenance count in the Ads case study. Retain 450 migration and 5-day GDPR outcomes. Add an evidence-grounded cloud migration case study, without inventing transfer architecture, tooling, or metrics. Remove the work index's ratios-only sentence because approved pages now contain estate sizes and project costs.

## Validation and delivery

Build Astro; verify all generated internal links and routes, the original PDF hash and absence of stale maintenance counts. Inspect homepage, /wayve/, and one case study on desktop and mobile using the supported browser. Check CV and open-source routes. Publication target is the existing GitHub Pages repository shril/shril.github.io, whose master workflow publishes on push; do not replace it with another hosting provider. Review the complete diff before publishing. Retain the existing local mock server.
