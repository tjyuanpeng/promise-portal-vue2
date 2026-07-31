# AGENTS.md

## Quick commands

```bash
pnpm dev              # parallel: library watch + playground (http://localhost:9002)
pnpm test             # run vitest in promise-portal-vue2 package
pnpm build            # build library only (tsdown: ESM + CJS + types)
pnpm build:playground # build playground for deploy (filter: play-vue2)
pnpm publish          # publish promise-portal-vue2 to npm
pnpm lint             # per-package: pnpm --filter promise-portal-vue2 lint
pnpm typecheck        # per-package: pnpm --filter promise-portal-vue2 typecheck
pnpm clean            # remove all node_modules and dist directories
```

## Architecture

- Monorepo with pnpm workspaces (catalog mode: strict, shellEmulator: true).
- Two packages:
  - `packages/promise-portal-vue2` — the library (Vue 2)
  - `packages/playground` — demo/docs site (deploys to GitHub Pages, Vite + @vitejs/plugin-vue2)
- **Node >= 24** required (`.nvmrc`), **pnpm >= 10** (enforced by `preinstall` script).

### Library (`promise-portal-vue2`)

Enables using Vue 2 components as a Promise-like function.

APIs:
- `definePortal(component, props, parent)` — returns a `Promise` that resolves when the component calls `$resolve(value)` or rejects on `$reject(reason)`.
- `usePortal(component, props)` — composable for use inside `setup()`, returns a function that calls `definePortal` with the current component instance as parent.
- `usePortalContext()` — composable for use inside portal component's `setup()`, returns `{ $resolve, $reject, $show }`.

Source files:
- `src/index.ts` — exports `definePortal`, `usePortal`, and `usePortalContext`.

### Build

- Uses `tsdown`. Config: `packages/promise-portal-vue2/tsdown.config.ts`.
- Output: `dist/index.mjs` (ESM), `dist/index.cjs` (CJS), `dist/index.d.cts` (types).

## CI

- `deploy.yml` — push to `main`: install → build library → build playground, deploy to GitHub Pages from `packages/playground/dist`.
- `publish.yml` — push tag `v*`: install → build library, publish to npm with `--provenance`.

## Style conventions

- ESLint: `@antfu/eslint-config` (`lessOpinionated`, brace-style: `1tbs`).
- 2-space indent, LF line endings, trailing whitespace trimmed (except `.md`).
- `no-console` is off globally.
