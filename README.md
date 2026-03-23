# Polaroid style photo deck

![alt text](https://github.com/ikefakis/react-polaroid-photo-deck/raw/master/docs/repository-image.png "Polaroid style photo deck")

A beautiful polaroid style photo deck.
_See [demo](https://ikefakis.github.io/react-polaroid-photo-deck)_

## Getting Started

1. `$ cd react-polaroid-photo-deck` - go inside the project directory
2. `$ npm install` - install dependencies
3. `$ npm start` - you will be navigated to [http://localhost:5173](http://localhost:5173) on your browser with hot reloading.

## Customization

- Put your images in `public/img` folder and update the paths inside `photos.json` with orientation info: (portrait | landscape)

## Build

- `$ npm run build` - An optimized production build will be generated in `dist` folder.

## Deploy

- Push to `main` to trigger the GitHub Actions workflow that builds the app and deploys `dist` to GitHub Pages.
