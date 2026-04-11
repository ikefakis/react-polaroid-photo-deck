# Copilot coding agent instructions

## Repository overview

- This is a small Vite + React app that renders a draggable polaroid-style photo deck.
- Most app behavior lives in `/src/main.jsx`.
- Spring helpers live in `/src/utils.js`.
- Photo content is driven by `/src/photos.json`, with matching image files in `/public/img`.

## Setup and verification

- Install dependencies before running any scripts: `npm ci`.
- In a fresh clone, `npm run build` fails with `sh: 1: vite: not found` until dependencies are installed. Use `npm ci` to fix that.
- There is no lint script in `package.json`.
- `npm test` is only a placeholder and currently prints `No tests configured`.
- The main verification command for changes is `npm run build`.
- For manual UI checks, run `npm start` and open the Vite dev server URL shown in the terminal.

## Important files

- `/src/main.jsx`: the `Deck` component, drag gesture handling, and spring updates.
- `/src/utils.js`: animation helper functions used by the deck.
- `/src/photos.json`: ordered list of cards. Each entry needs both `url` and `orientation`.
- `/src/styles.css`: visual styling for the deck and cards.
- `/vite.config.js`: Vite config. Production builds use `base: '/react-polaroid-photo-deck/'`, while dev uses `/`.
- `/.github/workflows/deploy.yml`: GitHub Pages workflow that runs `npm ci`, `npm run build`, and deploys `/dist`.

## Change guidance

- Keep changes small and localized; most feature or bug fixes will only touch one or two files in `/src`.
- If you add or change photos, update `/src/photos.json` and ensure the corresponding file exists in `/public/img`.
- Preserve the `orientation` field in `photos.json`; `main.jsx` uses it to switch card width and height.
- When changing asset paths or deployment behavior, account for `import.meta.env.BASE_URL` and the GitHub Pages base path in `vite.config.js`.

## Style and conventions

- Follow `/.prettierrc`: Prettier defaults with 2 spaces, semicolons, double quotes, trailing commas where valid, and `printWidth` 80.
- The codebase is lightweight and does not use TypeScript, ESLint, or a formal test suite.
- Avoid introducing new tooling unless the task specifically requires it.

## Deployment notes

- Pushing to `main` triggers the GitHub Pages workflow in `/.github/workflows/deploy.yml`.
- The workflow also supports manual `workflow_dispatch`.
- Build output is written to `/dist`.
