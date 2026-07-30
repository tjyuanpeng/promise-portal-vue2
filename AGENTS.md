# AGENTS.md

## Quick commands

```bash
pnpm dev              # parallel: library watch + playground (http://localhost:9002)
pnpm test             # run vitest in promise-portal-vue2 package
pnpm build            # build library only (tsdown: ESM + CJS + types)
pnpm build:playground # build playground for deploy
pnpm lint             # per-package: pnpm --filter promise-portal-vue2 lint
pnpm typecheck        # per-package: pnpm --filter promise-portal-vue2 typecheck
```

## Architecture

- Monorepo with pnpm workspaces (catalog mode: strict).
- Two packages:
  - `packages/promise-portal-vue2` — the library (Vue 2 plugin)
  - `packages/playground-vue2` — demo/docs site (deploys to GitHub Pages)
- **Node >= 24** required (`.nvmrc`), **pnpm >= 10** (enforced by `preinstall` script).

### Library (`promise-portal-vue2`)

Enables using Vue 2 components as a Promise-like function.

- `definePortal(component, props, parent)` — returns a `Promise` that resolves when the component calls `$resolve(value)`.
- `createPromisePortal()` — Vue plugin.
- `detectPromisePortalInstance()` — development leak detector for non-released portals.

Source files: `src/index.ts` re-exports `definePortal`, `detectPromisePortalInstance`.

### Build

- Uses `tsdown`. Config: `packages/promise-portal-vue2/tsdown.config.ts`.
- Output: `dist/index.mjs` (ESM), `dist/index.cjs` (CJS), `dist/index.d.cts` (types).

## CI

- `deploy.yml` — push to `main`: build library + playground, deploy to GitHub Pages from `packages/playground-vue2/dist`.
- `publish.yml` — push tag `v*`: build library, publish to npm with provenance.

## Style conventions

- ESLint: `@antfu/eslint-config` (`lessOpinionated`, brace-style: `1tbs`).
- 2-space indent, LF line endings, trailing whitespace trimmed (except `.md`).
- `no-console` is off globally.
