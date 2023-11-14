# Web-Chess-Front-Main

This is repository for main front-end application of Web-Chess.

Main points:

- Set up with recommended `VSCode` extensions, `EditorConfig`, `Eslint` and `Prettier` for better developer experience.
- Uses `Vite` bundler with `React`.
- Uses strict `TypeScript` and `Zod` to ensure good type safety.
- Uses `TailwindCSS` for styling and `daisyUI` for components.

See `package.json` for specific packages. Check `.nvmrc` for NodeJS version.

It's recommended to use `pnpm` package manager - <https://pnpm.io/>. It's much faster than `npm`. It can also be used instead of `nvm` to manage `NodeJS`.

It is assumed that `pnpm` is used going forward.

## Development

Install dependencies with `pnpm i`.

Start development server:

```#!/bin/bash
pnpm run dev
```

You can also use `Dockerfile.local`. See `package.json` for full list of commands.

## Production

Install dependencies with `pnpm i`.

Create production build:

```#!/bin/bash
pnpm run build
```

Start production build:

```#!/bin/bash
pnpm run start
```

This will start local server with production build. Deployment is automated with CI/CD.
