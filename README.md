# Polaroid style photo deck

![alt text](https://github.com/ikefakis/react-polaroid-photo-deck/raw/main/docs/repository-image.png "Polaroid style photo deck")

A beautiful polaroid style photo deck.
_See [demo](https://ikefakis.github.io/react-polaroid-photo-deck)_

## Getting Started

1. `$ cd react-polaroid-photo-deck` - go inside the project directory
2. `$ npm install` - install dependencies
3. `$ npm start` - you will be navigated to [http://localhost:5173](http://localhost:5173) on your browser with hot reloading.

## Customization

- Put your images in the `public/img` folder and update the paths inside `src/photos.json`. Card orientation is detected automatically from each image.

## Package usage

This repository can also be published as the `react-polaroid-photo-deck` package.

```jsx
import { Deck } from 'react-polaroid-photo-deck'

const cards = [{ url: '/img/01.jpg' }, { url: '/img/02.jpg' }]

export function Example() {
  return <Deck cards={cards} style={{ width: '100vw', height: '100vh' }} />
}
```

- The reusable component accepts final image URLs through the `cards` prop.
- The demo app still maps `src/photos.json` entries to the correct GitHub Pages asset path.
- Run `npm run build:lib` to create the publishable package in `dist`. This command bundles first and then emits `.d.ts` files so the generated type declarations are not removed by Vite's library build output step.

## Build

- `$ npm run build` - An optimized production build will be generated in `dist` folder.
- `$ npm run build:lib` - A publishable library build with type declarations will be generated in `dist` folder.

## Deploy

- Push to `main` to trigger the GitHub Actions workflow that builds the app and deploys `dist` to GitHub Pages.

## Publish from GitHub

- Add an `NPM_TOKEN` repository secret with publish access to the npm package.
- Run the `Publish package` workflow from the `main` branch.
- Provide the `version` input as either an npm release keyword (`patch`, `minor`, `major`, `prerelease`) or an exact semver.
- The workflow installs dependencies, validates `npm run build`, then bumps the version, commits and tags the release, publishes to npm, and pushes the updated `package.json`/`package-lock.json` plus the matching `v*` git tag.
