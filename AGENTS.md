# Repository Agent Instructions

## Repository overview

- This repository is a publishable React + TypeScript component library for a draggable polaroid-style photo deck.
- The main component implementation lives in `/src/Deck.tsx`.
- Spring helpers live in `/src/utils.ts`.
- The package entrypoint is `/src/index.ts`, which exports the `Deck` component and its public types.
- The local demo and GitHub Pages site live under `/playground`.

## Setup and verification

- Install dependencies before running scripts: `npm ci`.
- In a fresh clone, build commands fail with `vite: not found` until dependencies are installed. Use `npm ci` first.
- There is no lint script in `package.json`.
- `npm test` is only a placeholder and currently prints `No tests configured`.
- The main verification command for library changes is `npm run build`.
- For playground or GitHub Pages changes, verify with `npm run build:playground`.
- For manual UI checks, run `npm run dev` or `npm start` and open the Vite dev server URL shown in the terminal.

## Important files

- `/src/Deck.tsx`: the `Deck` component, drag gesture handling, image orientation detection, and spring updates.
- `/src/utils.ts`: animation helper functions used by the deck.
- `/src/index.ts`: public exports for the package.
- `/src/styles.css`: library styles that consumers import from `@ikefakis/react-polaroid-photo-deck/style.css`.
- `/playground/main.tsx`: local demo entrypoint for manual UI checks.
- `/playground/demo.css`: demo-only styling for the playground app.
- `/vite.config.ts`: Vite config for both library builds and the playground build. Library mode uses `src/index.ts`; playground builds use `/react-polaroid-photo-deck/` as the production base path.
- `/.github/workflows/deploy.yml`: GitHub Pages workflow that runs `npm ci`, `npm run build:playground`, and deploys `/dist`.
- `/.github/workflows/publish.yml`: npm publish workflow that runs `npm ci`, validates with `npm run build`, updates `CHANGELOG.md`, publishes the package, and creates the release tag.

## Change guidance

- Keep changes small and localized; most feature work should stay within `/src` and, when relevant, `/playground`.
- Preserve the public package API exposed from `/src/index.ts` unless the task explicitly requires an API change.
- The `Deck` component expects `cards` with `url` only; card orientation is detected automatically at runtime.
- When changing styles, distinguish between library styles in `/src/styles.css` and demo-only styles in `/playground/demo.css`.
- When changing build or asset behavior, account for both Vite modes in `/vite.config.ts`: library mode and playground mode.

## Style and conventions

- Follow `/.prettierrc`: Prettier defaults with 2 spaces, semicolons, double quotes, trailing commas where valid, and `printWidth` 80.
- The codebase uses TypeScript, React, Vite, `@react-spring/web`, and `@use-gesture/react`.
- There is no formal test suite; rely on build validation and focused manual checks.
- Avoid introducing new tooling unless the task specifically requires it.

## Deployment notes

- Pushing to `main` triggers the GitHub Pages workflow in `/.github/workflows/deploy.yml`.
- The deploy workflow also supports manual `workflow_dispatch`.
- GitHub Pages deploys the playground build from `/dist`.
- Package publishing is handled separately by `/.github/workflows/publish.yml`, which must be run from `main`.
