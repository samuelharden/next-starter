---
name: playwright-verify
description: >-
  Thorough homepage and layout verification with the project Playwright MCP
  (Firefox). Use when the user asks to test, verify, or QA layout; or when
  visual bugs need evidence beyond markup reasoning.
---

# Playwright verification (Starter)

## Prefer this over ad-hoc browsing

- **Default for this repo:** project Playwright MCP (`playwright` in `.cursor/mcp.json`), **Firefox**.
- Cursor’s built-in browser is fine for a quick Chromium peek when Firefox MCP is down.
- If MCP errors with “Browser firefox is not installed”, install it before testing. Do not silently skip.

## When to run

- User asks to test / verify / QA
- Homepage sections, nav hash links, or layout changed
- Reported visual bugs

## Harness pattern

1. Ensure `yarn dev` (or preview) is up.
2. Run **desktop** (`1440×900`) and **mobile** (`390×844`).
3. Assert structure: `#start`, `#leistungen`, `#ueber-uns`, `#kontakt`; native document scroll (no Lenis class, no nested scrollport).
4. **Hash / nav:** click real nav links; poll until the target section is near the top under the fixed header.
5. Report console **errors** (warnings OK unless actionable).

## Output

Return a short pass/fail table and path screenshots under `playwright-output/` when useful.
