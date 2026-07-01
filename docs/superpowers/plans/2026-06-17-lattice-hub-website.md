# Lattice Hub Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Fumadocs/Next.js organization website for Lattice Hub with homepage, docs, principles, blog, and performance report seed content.

**Architecture:** Use Next.js App Router with Fumadocs MDX for documentation routes. Keep reusable organization, component, capability, docs, principles, and blog metadata in `src/lib/site-content.ts`, and render the homepage from that data.

**Tech Stack:** Next.js 16, React 19, Fumadocs UI, Fumadocs MDX, TypeScript, Tailwind CSS, Node test runner with `tsx`.

---

### Task 1: Project Skeleton And Red Test

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next-env.d.ts`
- Create: `tests/site-content.test.ts`

- [ ] Create package scripts and dependencies.
- [ ] Write a failing Node test that imports `src/lib/site-content.ts` and checks the required site sections.
- [ ] Run `npm install`.
- [ ] Run `npm test` and confirm it fails because `src/lib/site-content.ts` does not exist.

### Task 2: Fumadocs And Site Implementation

**Files:**
- Create: `next.config.mjs`
- Create: `source.config.ts`
- Create: `src/lib/source.ts`
- Create: `src/lib/site-content.ts`
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`
- Create: `src/app/global.css`
- Create: `src/app/docs/layout.tsx`
- Create: `src/app/docs/[[...slug]]/page.tsx`
- Create: `src/mdx-components.tsx`

- [ ] Implement Fumadocs MDX configuration.
- [ ] Implement shared site content metadata.
- [ ] Implement homepage layout with infrastructure + AI network visual direction.
- [ ] Implement docs layout and catch-all docs page.
- [ ] Run `npm test` and confirm content structure passes.

### Task 3: MDX Content

**Files:**
- Create: `content/docs/meta.json`
- Create: `content/docs/index.mdx`
- Create: `content/docs/components/*.mdx`
- Create: `content/docs/reports/performance.mdx`
- Create: `content/docs/principles/*.mdx`
- Create: `content/docs/blog/*.mdx`

- [ ] Add docs landing page.
- [ ] Add component docs for control plane, console, Rust SDK, Controller, Sidecar, and Specification.
- [ ] Add performance report framework with only verified configuration facts.
- [ ] Add principle articles.
- [ ] Add best-practice blog articles.

### Task 4: Verification And Preview

**Files:**
- Modify: `context-kg/tasks/todo.md`

- [ ] Run `npm test`.
- [ ] Run `npm run lint`.
- [ ] Run `npm run build`.
- [ ] Start `npm run dev` and open the site in the browser.
- [ ] Update `context-kg/tasks/todo.md` with completed items and review notes.
