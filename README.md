# shril.github.io

Personal site — [shril.github.io](https://shril.github.io)

Built with [Astro](https://astro.build), deployed to GitHub Pages by GitHub Actions
on every push to `master`.

## Local development

Requires Node 22 (see `.nvmrc`).

```bash
npm install
npm run dev      # dev server with hot reload, http://localhost:4321
npm run build    # production build into dist/
npm run preview  # serve the built output
```

## Where the content lives

Most edits do not require touching a component.

| What | File |
|---|---|
| Name, title, tagline, links, headline metrics | `src/data/profile.ts` |
| Roles, bullet points, education | `src/data/experience.ts` |
| Skill groups | `src/data/skills.ts` |
| Open-source contributions and projects | `src/data/openSource.ts` |
| Case studies | `src/content/work/*.md` |
| CV PDF | `public/Shril-Kumar-CV.pdf` |
| Colours, type scale, spacing | `src/styles/global.css` (CSS custom properties at the top) |

Case studies are ordered by the `order` field in their frontmatter; the home page
shows the first four.

## Deployment

`.github/workflows/deploy.yml` builds the site and publishes it to Pages. The
repository's Pages source must be set to **GitHub Actions** (Settings → Pages),
not the legacy branch-based Jekyll build.
