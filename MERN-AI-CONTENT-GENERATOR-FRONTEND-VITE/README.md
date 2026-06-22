# MERN AI Content Generator – Frontend (Vite + React + Tailwind)

This is the original CRA project converted to **Vite + React 18 + Tailwind CSS v3**.
The UI, routing, and component code are kept identical — only the build tooling
and a few CRA-specific files were updated.

## Getting started

```bash
npm install        # or: pnpm install / yarn / bun install
cp .env.example .env   # then set VITE_STRIPE_PUBLISHABLE_KEY
npm run dev        # start the dev server on http://localhost:3000
npm run build      # production build to ./dist
npm run preview    # preview the production build
```

## What changed compared to the CRA version

- `react-scripts` removed; replaced by `vite` + `@vitejs/plugin-react`.
- `public/index.html` moved to project root (`index.html`) — Vite convention.
- Entry file renamed `src/index.js` → `src/main.jsx`.
- Environment variables now use the `VITE_` prefix and are read via
  `import.meta.env` (see `src/main.jsx`).
- CRA leftovers removed: `reportWebVitals`, `setupTests`, `App.test.js`,
  `logo.svg`.
- Tailwind config switched to ESM (`export default`) to match Vite's
  `"type": "module"` package.
- A `vite.config.js` was added that allows JSX inside `.js` files so the
  original CRA component files keep working without bulk renaming.

## Project structure

```
.
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── public/                # static assets served as-is
└── src/
    ├── main.jsx           # app entry (was index.js)
    ├── App.js             # router setup
    ├── index.css          # Tailwind directives
    ├── apis/              # axios clients (chatGPT, stripe, users)
    ├── AuthContext/       # auth provider + useAuth hook
    ├── components/        # all feature components
    └── assets/            # images imported by components
```
