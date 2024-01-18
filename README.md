# Weird Server Actions Bug

Run `pnpm build` to reproduce the following error

```
> next build

   ▲ Next.js 14.0.4

Failed to compile.

./src/server/auth/keycloak.ts + 8 modules
Cannot get final name for export 'sha256' of ./node_modules/.pnpm/oslo@0.27.1/node_modules/oslo/dist/crypto/index.js


> Build failed because of webpack errors
   Creating an optimized production build  . ELIFECYCLE  Command failed with exit code 1.
```

### Explanation:

The file `src/server/auth/keycloak.ts` is imported in through `src/server/auth/index.ts` into the server action `src/server/actions/test.ts`.

I am unsure how and why this happens but there are two unrelated things I found you can do to make the error go away.
1. Add a second page/route where the server action `src/server/actions/test.ts` is imported. Removing the trailing underscore from `app/test2/_page.tsx` makes the error go away.
2. Commenting out the export on line 7 in `src/server/auth/index.ts` also makes the error go away.
