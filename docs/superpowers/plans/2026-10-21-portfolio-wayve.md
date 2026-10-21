# Portfolio and Wayve Alignment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan.

**Goal:** Align the public portfolio with the approved mock and publish a concise /wayve/ application page.

**Architecture:** Keep the existing Astro content collections and routes. Use a common cream/teal/serif visual language, shared CV link, and website-only fact definitions so CV content remains untouched.

**Tech Stack:** Astro 7, static GitHub Pages, TypeScript content, CSS.

## Global Constraints

- Source mock: /Users/shrilkumar/new-repos/my-resume/site/dist/index.html.
- Scope/design: docs/superpowers/specs/2026-10-21-portfolio-wayve-design.md.
- 500+ maintained; 450 migrated; 10+ teams using Iceberg tools; 250M+ daily events; 70+ PB estate footprint.
- GDPR current outcome is 5 days, confirmed by the user; retain it.
- Preserve public/Shril-Kumar-CV.pdf bytes and CV content (including shared inputs). Do not modify root my-resume/main.tex or its supplied PDF.
- No new package dependencies, trackers, external fonts, or image assets needed.
- Do not publish from a worker. The parent reviews and handles GitHub Pages delivery.

### Task 1: Implement the aligned portfolio

**Ownership:** All website source, public/favicon.svg if needed, and README in this isolated worktree. Preserve docs written by the parent and do not touch ../site.

**Files:** src/styles/global.css; src/layouts/Base.astro; src/components/Header.astro and Footer.astro; src/pages/index.astro, wayve.astro, work/index.astro, about.astro, open-source.astro, experience.astro; src/content/work/ads-platform-rearchitecture.md and relevant ordering; new src/content/work/cloud-migrations.md; website-only data/components/styles as needed. Keep CV content inputs unchanged.

**Interfaces:** Existing routes and content collection schema are retained. /wayve/ is an ordinary static Astro route. Read CV links use profile.links.cv.

- [ ] Record the existing PDF SHA-256 and CV content inputs; install cached dependencies if absent and build baseline.
- [ ] Apply shared mock typography/colours and header/footer, including a visible Read CV button. Remove old theme toggle/prepaint logic.
- [ ] Rebalance homepage: Ads, Iceberg migration/maintenance, cloud migration, plus retained AI/governance evidence. Use the mock headline and short body copy that also covers AI infrastructure.
- [ ] Reconcile approved facts in website content and add the cloud-migration case study. Keep maintenance separate from migration. Avoid adding GDPR to the mock's estate caption.
- [ ] Add /wayve/ using the mock's latest structure and contents. Integrate 450 migrated compactly without obscuring 500+ maintained. Leave the engineering section absent.
- [ ] Keep existing CV page/PDF content intact. Give the open-source page repo links and practical project explanations using page-specific content if necessary.
- [ ] Build; inspect generated routes/internal links and final fact strings. Record evidence and self-review in the task report. Parent handles browser QA.
- [ ] Commit source changes on codex/portfolio-wayve, requesting command permission if Git metadata requires it; do not push.

### Parent delivery

- Review the complete diff and browser views; resolve significant issues.
- Preserve screenshots and verification notes in my-resume/site.
- Publish to existing GitHub Pages only after checks pass. Verify Actions and live routes. Do not alter the CV PDF.
