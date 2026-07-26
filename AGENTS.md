# Agent notes for lattice-hub.github.io

## After push to `main`

When the user asks to commit and push (or when a push to `main` is completed in this session):

1. Monitor the **Deploy GitHub Pages** workflow with `gh run list` / `gh run watch` until it finishes.
2. If the run fails, inspect logs (`gh run view <id> --log-failed`), fix the root cause, commit, push, and monitor again.
3. Do not treat “push succeeded” as “site is live”. Confirm the workflow **build + deploy** both succeed.
4. Prefer a quick public check after success: `curl -I https://lattice-hub.github.io/` and a relevant docs path (e.g. `/docs/guides/console/`) return HTTP 200.

## Docs / MDX

- Frontmatter YAML values that contain `:` must be quoted.
- Chinese and English docs under `content/docs/{zh-CN,en}/` must stay path-symmetric; update `tests/site-content.test.ts` page counts when adding pages.
- Console guide screenshots live in `public/images/console/` and should come from a real Console when available.
- Keep **MCP** (`/docs/guides/console/mcp`), **A2A** (`/docs/guides/console/a2a`), and **Pole Agent workspace** (`/docs/guides/console/agent`) as separate guides. Do not merge Agent into AI Registry pages—Agent is the sidebar-bottom workspace mode, not an AI-tools submenu item.

## Product facts

- Prefer `product-facts.md` and sibling `../pole-control-plane` over invented UI or benchmarks.
- Namespace = environment (not tenant). A2A is registry metadata only. Pole Agent drafts only.
