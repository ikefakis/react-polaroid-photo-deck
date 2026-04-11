# React Polaroid Photo Deck

![React Polaroid Photo Deck](https://github.com/ikefakis/react-polaroid-photo-deck/raw/main/docs/repository-image.png)

A publishable React component that renders an interactive polaroid-style photo deck with drag gestures and spring animations.

Demo: [ikefakis.github.io/react-polaroid-photo-deck](https://ikefakis.github.io/react-polaroid-photo-deck)

## Install

```bash
npm install @ikefakis/react-polaroid-photo-deck react react-dom
```

The package keeps `react` and `react-dom` as peer dependencies. Gesture and spring dependencies are bundled as regular package dependencies so consumers do not need to install them separately.

## Usage

```tsx
import { Deck } from "@ikefakis/react-polaroid-photo-deck";
import "@ikefakis/react-polaroid-photo-deck/style.css";

const photos = [
  {
    url: "https://picsum.photos/id/1036/800/1100",
    date: "15/01/2025",
    caption: "Quiet morning mist",
  },
  {
    url: "https://picsum.photos/id/1011/1200/800",
    date: "22/07/2024",
    caption: "Drifting in silence",
  },
  {
    url: "https://picsum.photos/id/1003/820/1180",
    date: "05/05/2024",
    caption: "Stumbled upon magic",
  },
];

export function Example() {
  return <Deck cards={cards} style={{ width: "100vw", height: "100vh" }} />;
}
```

Each card only needs a final image URL. You can also provide an optional
display-ready `date` string and a `caption` string for handwritten metadata.
Orientation is detected automatically when images load.

## API

```ts
type Card = {
  url: string;
  date?: string;
  caption?: string;
};

type DeckProps = {
  cards: Card[];
  className?: string;
  style?: React.CSSProperties;
};
```

The bundled stylesheet imports the `Mynerve` font from Google Fonts for the
handwritten metadata. Consumers can override it with:

```css
.your-deck {
  --photo-deck-font: "Your Custom Font";
  --photo-deck-caption-font-size: 1.5rem;
}
```

## Repository Structure

- `src/`: publishable library source and package entrypoint.
- `playground/`: local demo app and GitHub Pages entrypoint.

## Development

```bash
npm ci
npm run dev
```

That starts the secondary playground app on the local Vite server.

## Build

```bash
npm run build
```

Builds the publishable library into `dist`.

```bash
npm run build:playground
```

Builds the GitHub Pages playground into `dist`.

## Publish

`npm run prepublishOnly` and the `Publish package` workflow both validate the library build before publishing.

The publish workflow:

1. Installs dependencies with `npm ci`.
2. Validates the package with `npm run build`.
3. Bumps the version.
4. Prepends generated release notes to `CHANGELOG.md`.
5. Publishes the package to npm.
6. Pushes the release commit and matching `v*` tag.

## Deploy

The GitHub Pages workflow runs `npm run build:playground` and deploys the generated `dist` directory.

## License

MIT. See [LICENSE](./LICENSE).
