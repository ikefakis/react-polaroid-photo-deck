# Changelog

## v3.0.4 - 2026-04-07

- Updated Vite to 8.0.5.
- Refreshed grouped npm dependencies in the demo/package workspace.

## v3.0.3 - 2026-03-31

- Added `touch-action` handling so dragging cards behaves correctly on touch devices.
- Avoided the Node 20 GitHub Pages artifact warning in CI.

## v3.0.2 - 2026-03-31

- Fixed package compatibility for React 19 consumers.

## v3.0.1 - 2026-03-31

- Simplified the publish workflow by removing npm token validation.

## v3.0.0 - 2026-03-31

- Added the publishable `@ikefakis/react-polaroid-photo-deck` package entrypoint and packaging workflow.
- Converted the app source to TypeScript and cleaned the generated build artifacts.
- Added automatic photo orientation detection and related cleanup.
- Migrated the project build tooling to Vite and updated the README for the new development/build flow.
- Added GitHub Pages deployment automation and aligned the Pages workflow with GitHub's current setup.
- Improved image preload and intro animation handling so the deck waits for images and resets correctly on card changes.
- Added repository/package metadata and publish safeguards, including preventing duplicate npm version publishes.
- Carried forward the earlier photo deck app history that predates package publishing, including the initial polaroid deck implementation, documentation, deployment setup, and dependency updates.
