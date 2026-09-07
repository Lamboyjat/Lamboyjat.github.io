# Lamin Jatta portfolio

Professional portfolio for Lamin Jatta, deployed from the `Lamboyjat` GitHub identity.

## Architecture

- Astro static site with strict TypeScript.
- Evidence-aware project records in `src/content/projects`.
- Presentation components under `src/components` and layouts under `src/layouts`.
- GitHub Pages deployment through the official Astro action.

Project records must distinguish individual contribution from collaborative work and include at least one verifiable repository, publication, official project page, commit history, presentation, or demo link.

## Local development

```sh
npm install
npm run dev
```

Run `npm run build` before publishing. In the GitHub repository settings, set Pages → Source to **GitHub Actions**.
