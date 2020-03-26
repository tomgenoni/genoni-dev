# genoni.dev

Source of genoni.dev

```
git clone https://github.com/tomgenoni/genoni-dev
cd genoni-dev
yarn
```

## Local dev

```
yarn start
```

Will build site and start local server at [`localhost:3000`](http://localhost:3000)

## Production build

Pushes to `master` will rebuild site on Netlify using `yarn build`.

### Sitemap

If the site structure has changed run the sitemap generator manually:

```
yarn sitemap:build
```

This runs a script that crawls `genoni.dev` and outputs a sitemap in `src/sitemap.xml`. The next time `yarn build` runs, locally or on Netlify, the `sitemap.xml` file will be copied to the `dist` directory.
