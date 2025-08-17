# Portfolio (static)

This is a static portfolio scaffold intended for a Computer Vision Engineer. It's GitHub Pages compatible.

Structure:

- index.html — main site
- css/ — styles
- js/ — scripts
- images/ — placeholders
- documents/resume.pdf — place your resume here (the attached resume has been copied)

How to use:

1. Replace placeholder text, images, and links with your real content.
2. Update `index.html` meta tags and `canonical` URL to your site.
3. Commit to a repository named `username.github.io` (or enable Pages on `gh-pages` branch).

Recommended additions:
- minify CSS/JS for production
- add real project pages or modals
- integrate form backend (Formspree, Netlify Forms) if you want contact messages

Publishing on GitHub Pages (automatic)

Option A — Repository named `yourusername.github.io`:
- Push the repository to GitHub under the name `yourusername.github.io` and GitHub Pages will serve the `main` branch automatically.

Option B — Use `gh-pages` branch (recommended for project sites):
- This repo includes a GitHub Actions workflow that will deploy the `portfolio/` folder to the `gh-pages` branch on push to `main`.
- To enable: commit and push the repo to GitHub, then enable Actions if prompted. Pages will serve the `gh-pages` branch.

Notes:
- Update the `homepage`/canonical URL in `index.html` before publishing.
- Replace the Font Awesome kit placeholder in `index.html` if you need icons.
- The deploy workflow requires a writeable GITHUB_TOKEN (default provided by Actions).

