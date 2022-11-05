# Joshua D. Graber Portfolio Page

This app was bootstrapped with [Remix](https://remix.run/docs)

## Development

Run the app locally in development mode with HMR:

```sh
npm run dev
```

Run the app locally in production mode with HMR:

```sh
npm start
```

Notes to make nicer later:

- react-markdown went ESM only, makes it difficult for Remix to handle. Until rmx figures it out, DO NOT UPDATE
- Mongodb is IP-protected. For local development, don't use VPN or choose location that corresponds to least favorite American city

- Query params to know:
  - `?contact=true` --> displays contact modal on top of any route
    - See `useModalPath` exports
  - `?redirect={pathRelativeToRoot}` --> pass with auth redirect, to redirect back from auth
