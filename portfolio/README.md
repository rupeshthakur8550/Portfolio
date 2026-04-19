# Portfolio Frontend

Single-page portfolio application built with React 19, TypeScript, Vite, Tailwind CSS, GSAP, and React Router.

## Scripts

- `npm run dev`: start the Vite dev server
- `npm run build`: type-check and build the production bundle
- `npm run lint`: run ESLint
- `npm run preview`: preview the production build locally
- `npm run typecheck`: run TypeScript project references

## Architecture

- `src/router.tsx`: single source of truth for route configuration
- `src/App.tsx`: shared application shell with header, footer, route outlet, and non-blocking preloader overlay
- `src/providers/ThemeProvider.tsx`: app-wide theme state
- `src/content/portfolio.ts`: typed content adapter and slug helpers
- `src/components/*`: feature and UI components

## Contact Form

The contact form no longer submits directly to a third-party API from the browser.

- Preferred: set `VITE_CONTACT_FORM_ENDPOINT` to a secure server-side endpoint
- Fallback: if no endpoint is configured, submit opens the user’s default mail client

## Deployment

- Static assets are served with Nginx using [nginx.conf](/Users/Rupesh.Thakur@gruve.ai/Documents/Projects/Projects/Portfolio/Portfolio/portfolio/nginx.conf)
- The SPA fallback is handled with `try_files ... /index.html`

## Audit Artifacts

- [code-review.md](/Users/Rupesh.Thakur@gruve.ai/Documents/Projects/Projects/Portfolio/Portfolio/portfolio/code-review.md)
- [tasks.md](/Users/Rupesh.Thakur@gruve.ai/Documents/Projects/Projects/Portfolio/Portfolio/portfolio/tasks.md)
