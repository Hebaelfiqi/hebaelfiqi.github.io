# Website Roadmap — hebaelfiqi.github.io

Working plan agreed July 2026. One workstream at a time; update status as we go.
Statuses: `todo` · `in-progress` · `blocked` · `done`

> NOTE: this file is internal planning. Keep it excluded from publishing:
> `exclude_assets: '.github/workflows/deploy.yml,ROADMAP.md'` in the private
> repo's deploy.yml.

---

## WS1 — Shepherding interactive demo (investigate first) — `todo`
Third-year student built a browser-based interactive interface for the
Shepherding Library. If it is client-side (JS/canvas/WebGL), it can be hosted
on GitHub Pages as-is under e.g. `/demos/shepherding/`.

Steps:
- [ ] Heba: locate the student's code (repo / zip / group storage) and share it
- [ ] Assess build type: client-side vs needs a server
- [ ] Confirm IP/credit: credit student prominently; get their blessing if reachable
- [ ] If client-side: integrate under /demos/, link from Research + Software pages
- [ ] If server-needed: evaluate Hugging Face Spaces or client-side rewrite

## WS2 — Story-page template + pilots (papers & software) — `in-progress`
One shared "story page" template serving both paper and software deep-dives.
Plain-language narrative: problem → idea → walkthrough figure(s) → findings →
who should care → cite & links. Gallery panels get a single "Learn more →"
link; no external links on the main page.

Steps:
- [x] Design story-page template (layout, nav, typography) consistent with site
- [x] Pilot 1: WGLAE / gated autoencoders (papers/wglae.html)
- [x] Pilot 2: Limits of reactive shepherding (papers/shepherding-limits.html)
- [x] Pilot 3 (software): PWC4.5 (software/pwc45.html)
- [x] Add "Learn more" links under the corresponding gallery panels (wglae, limits, stylometry)
- [ ] Review pilots with Heba, then scale to remaining panels/software
- Template rule: every story page ends with the "How this page was written"
  colophon (AI-assisted drafting acknowledged; Heba reviews and owns the
  technical content)

## WS3 — More paper highlights (cap ~8 panels) — `todo`
- [ ] TIFS 2019 — EEG person identification ("brain connectivity as fingerprint")
- [ ] Drones 2025 — cognitive load of UAS operators (ties to current grant + Qianchu)
- [ ] Review gallery order after additions; keep it curated, not exhaustive

## WS4 — Page enrichment — `todo`
- [ ] "Join the group / prospective students" section (Contact or People):
      recruiting topics, expectations, how to approach
- [ ] Teaching page: course cards for ZEIT4150 / ZEIT4151 / ZEIT8601 with
      built-from-scratch narrative + satisfaction numbers (95.8–100%)
- [ ] Service page: add IJCNN/WCCI mentoring photos (already in assets/img)
- [ ] Home: optional small news strip (only if it will be kept fresh)

## WS5 — Custom domain — `done`
FINAL: purchased hebaelfiqi.com via Cowork; DNS + Pages binding + SEO done
by Cowork directly on the public repo; now made permanent in source.

Steps:
- [x] Heba: purchase domain (hebaelfiqi.com) and bind via Cowork
- [x] Claude: CNAME file (hebaelfiqi.com) in source root
- [x] Claude: SEO handoff — google-site-verification, canonical + og:url +
      og:image + Twitter cards + Person JSON-LD on index; self-canonicals
      on all pages incl. story pages; sitemap.xml; robots.txt
- [x] Deploy and verify per handoff item 7 (all markers verified on deployed
      main; Heba eyeballed the live domain)
- Rule: keep sitemap.xml in sync when adding/removing pages

## WS6 — Full independent hosting — `parked`
Revisit only if a concrete dynamic/server-side need appears that static
hosting cannot serve. Current setup costs $0 and self-heals.

---

## Publishing automation (agreed)
- Claude pushes finished work to the public repo branch
  claude/push-local-repo-github-qd88t7.
- The private repo runs sync.yml (cron, every 15 min): merges that branch
  into main and dispatches Deploy site. No manual merge needed. VERIFIED
  working end-to-end 2026-07-03. Note: GitHub cron often lags 30-90 min;
  for instant publishing, Run workflow manually in website-source Actions.
- Optional direct path: grant the Claude GitHub App access to
  Hebaelfiqi/website-source so future sessions can merge+push directly.

## Done so far (context for future sessions)
- Two-repo privacy split: private `website-source` (full history) → Action
  deploys single "Deploy site" commit to public repo
- Actions-based Pages deploy with 3 auto-retry attempts (pages.yml),
  replacing the flaky legacy pipeline
- People page: labeled per-student entries, admission terms, outputs w/ links
- Research gallery: ATC-as-shepherding panel (two-stage, plane silhouettes);
  WGLAE panel replaced with recovery scene + robustness inset
- Software page: PWC4.5 card

## Decisions log
- 2026-07: Stay on GitHub Pages free tier; custom domain preferred over paid
  hosting or GitHub Pro. Migration parked (WS6).
- 2026-07: Gallery capped ~8 panels; deep content goes to story pages (WS2).
- 2026-07: Domain (as purchased): hebaelfiqi.com, bound to GitHub Pages via
  Cowork. (The interim heba.el-fiqi.com plan was superseded at purchase.)
