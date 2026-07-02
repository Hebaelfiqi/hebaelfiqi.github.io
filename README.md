# Dr Heba El-Fiqi - research website

A static, multi-page site, ready for GitHub Pages. No build step, no dependencies.

## Pages
- `index.html` - home, with the swarm hero
- `research.html`, `publications.html`, `software.html`, `teaching.html`, `service.html`, `contact.html`
- `assets/` - shared `style.css`, `swarm.js` (hero animation), `main.js`

## Before you publish, fill in the placeholders
Search the files for `TODO` and for `#` links, then add your real URLs:
- LinkedIn and GitHub URLs (footer of every page, and `contact.html`)
- Your email in `contact.html`
- Repository / Code Ocean links in `software.html`
- Your profile photo: add an `<img>` in the hero of `index.html` if you want one

Google Scholar and ORCID are already linked.

## Deploy to GitHub Pages
1. Create a new public repository, for example `heba-elfiqi.github.io` (a user site) or any name (a project site).
2. Upload all of these files to the repository root, keeping the `assets` folder.
3. In the repository, go to Settings, then Pages.
4. Under "Build and deployment", set Source to "Deploy from a branch", branch `main`, folder `/ (root)`. Save.
5. Wait about a minute, then open the URL GitHub shows you.

A `.nojekyll` file is included so GitHub serves the files as-is.

## Custom domain (optional)
In Settings, then Pages, add your domain under "Custom domain", then point a CNAME
record at your GitHub Pages address with your registrar.

## Edit locally
Open `index.html` in a browser to preview. Edit the HTML text directly; styling is in
`assets/style.css`.
