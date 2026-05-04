# isolate-mesh-demo# Isolate Mesh Demo

Minimal demo showing a Cloudflare Workers control plane + data plane with a Pages dashboard.
Fork this repo, add Cloudflare secrets, and connect to Pages.

## Quick start
1. Fork repository.
2. Add secrets in GitHub: CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID.
3. Connect repo to Cloudflare Pages (or let the workflow deploy Workers via wrangler).
4. Push to `main` to trigger CI/CD.

## Components
- control-plane: reads cluster-config and writes status to KV (simulated).
- data-plane: simple service worker that returns its version.
- pages: static dashboard that queries control-plane `/status`.
