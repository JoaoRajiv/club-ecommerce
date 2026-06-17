# club-ecommerce — Agent instructions

## Commands

```bash
pnpm start          # dev server (http://localhost:3000)
pnpm build          # CI=false react-scripts build (disables CI error-to-warning)
pnpm test           # CRA Jest runner (interactive watch)
pnpm lint           # biome check --write (formats + lints with Biome)
```

Actual package manager is **pnpm** (not yarn despite README). Husky pre-commit hook exists but is **empty** — no checks run on commit.

## Architecture

- **React 17** — uses `ReactDOM.render` (no `createRoot`), `FunctionComponent` type
- **State**: Redux Toolkit (user, cart, category slices) **plus** Context API (user, cart, category contexts) — **redundant**. Both are wired in `index.tsx`. Prefer Redux Toolkit for new state; Context providers are legacy.
- **Routing**: react-router-dom v6, all routes **eagerly loaded** (no lazy loading despite `.cursorrules`)
- **Persistence**: redux-persist persists only `cartReducer` to localStorage. `@ts-expect-error` on all redux-persist imports in `store.ts` — typing is broken.
- **Styling**: styled-components with centralized theme (`src/theme/`)
- **Backend**: Firebase Auth + Firestore. Config is **hardcoded** in `firebase.config.ts` (not from env vars).

## Non-obvious code patterns

- Icon imports from `react-icons` need a cast: `const FooIcon = FiFoo as unknown as ComponentType<{ size?: number }>`
- `useAppSelector` typed hook exists at `hooks/redux.hooks.ts` (use it; avoid raw `useSelector`)
- No typed `useDispatch` hook exists — raw `useDispatch()` is used in `App.tsx`
- `react-hook-form` import has `@ts-expect-error` — known local type resolution issue
- `AuthenticationGuard` uses `useSelector((rootReducer: any) => ...)` — uses `any`
- Checkout calls external Stripe session API via `REACT_APP_API_URL` env var

## Testing

- **1 test file** exists: `components/custom-button/custom-button.spec.tsx`
- CRA Jest config with `@testing-library/react`
- `pnpm test` runs in interactive watch mode

## Key gotchas

| Gotcha | File |
|--------|------|
| `fetchCategories` duplicated in `category.context.tsx` AND `category.slice.ts` | Both files |
| Cart state lives in Redux slice (`store/toolkit/cart/`) AND `contexts/cart.context.tsx` | Duplicate |
| `localStorage.getItem("cartProducts")` in CartContext assumes non-null, can throw | `contexts/cart.context.tsx:36` |
| `category-detail.component.tsx` fetches from Firestore on every mount (no Redux cache check) | `components/category-details/` |
| Firebase API keys committed in plaintext | `config/firebase.config.ts` |
| `env.config.ts` exists but is unused | `config/env.config.ts` |
