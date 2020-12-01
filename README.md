<h1 align="center">
  <img width="40px" src="https://github.com/CoolRice/Git-Outline/raw/main/.github/icon.png"/>
  Git-Outline
</h1>
<p align="center">A Web Extension for Better GitHub Page Outline View</p>
<div align="center">
  <img src="https://github.com/CoolRice/Git-Outline/raw/main/.github/preview.gif"/>
</div>
<hr />

## 🚀 Development

Ensure you have

- [Node.js](https://nodejs.org) 10 or later installed
- [Yarn](https://yarnpkg.com) v1 or v2 installed

Then run the following:

- `yarn install` to install dependencies.
- `yarn run dev:chrome` to start the development server for chrome extension
- `yarn run dev:firefox` to start the development server for firefox addon
- `yarn run build:chrome` to build chrome extension
- `yarn run build:firefox` to build firefox addon
- `yarn run build` builds and packs extensions all at once to extension/ directory

- **Load extension in browser**

- ### Chrome

  - Go to the browser address bar and type `chrome://extensions`
  - Check the `Developer Mode` button to enable it.
  - Click on the `Load Unpacked Extension…` button.
  - Select your extension’s extracted directory.

- ### Firefox

  - Load the Add-on via `about:debugging` as temporary Add-on.
  - Choose the `manifest.json` file in the extracted directory

### Production

- `yarn run build` builds the extension for all the browsers to `extension/BROWSER` directory respectively.