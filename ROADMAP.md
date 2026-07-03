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
- [x] Story 4: adversarial patrolling (papers/adversarial-patrolling.html),
  Jonathan Zhou credited as student lead
- [x] Story 5: ATC as shepherding (papers/atc-shepherding.html)
- [ ] Remaining candidates: spatially informed gating (Sensors 2025),
      translator stylometry (partly covered by the PWC4.5 page)
- [ ] Review pilots with Heba, then scale/stop as she decides
- Template rule: every story page ends with the "How this page was written"
  colophon (AI-assisted drafting acknowledged; Heba reviews and owns the
  technical content)

## WS3 — More paper highlights (cap ~8 panels) — `on-hold`
DECISION 2026-07: TIFS 2019 and Drones 2025 will NOT be gallery panels.
TIFS is part of another researcher's PhD; Drones sits under another lead
supervisor's separate fund. Gallery panels are for work that is genuinely
Heba's to headline; supervised outputs are correctly credited on the
People page instead.
- Candidate if a 7th panel is ever wanted: SMC 2018 SSVEP person
  identification (Heba first author)
- Otherwise hold at the current six panels and revisit when outputs from
  Heba-led grants (e.g. the DIN maritime UAS project) are published

## WS4 — Page enrichment — `in-progress`
- [x] "Join the group / prospective students" section (people.html#join)
      with contact-page pointer. MAINTENANCE RULE: scholarship deadline
      (currently 14 Aug 2026) and stipend rates must be refreshed each
      term; verify against unsw.edu.au before each update. The 2027
      round schedule was unpublished as of Jul 2026; add the following
      round's date once UNSW publishes it.
- [ ] ON HOLD pending School approval: "campus screening" note for the
      Join section (process-based wording drafted in session; Heba is
      checking with the School before anything is published). A reply
      template for affected applicants was also drafted for her use.
- [x] Teaching page v1: score chips, numbers strip, teaching awards,
      leadership (BCCS deliberately omitted; dual-stream past tense;
      ZEIT4150 corrected to S1-only)
- [x] Teaching page v2: course descriptions from published 2026 outlines,
      updated score chips from 2025 myExperience reports (4151: 5.57,
      8601: 5.25), three anonymous student quotes with attribution lines
- [x] DECIDED 2026-07: Exercise Enigma stays OFF the site for now.
      Do not add it unless Heba explicitly reopens this.
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
