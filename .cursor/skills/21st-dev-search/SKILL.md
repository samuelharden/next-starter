---
name: 21st-dev-search
description: >-
  Format 21st.dev MCP component search results with labeled preview and component
  links. Use when searching, browsing, or previewing 21st.dev / 21st MCP
  components (search, search_picker, get_component), or when the user asks to
  find UI from 21st.
---

# 21st.dev search results

## When searching

1. Use `search_picker` when the user should choose; otherwise `search`.
2. Cursor often does **not** render the inline picker: always list results in chat.
3. **Do not** pick a component or call `get_component` until the user gives an id.
4. Mention remaining free retrievals when relevant (`get_usage`).

## Result format (required)

For every component result, show **id**, **name**, a short why/fit note if useful, and **exactly two** markdown links. Link text must be only `preview` and `component`: never paste the raw URL as visible text.

Derive URLs from the CDN preview path:

- CDN: `https://cdn.21st.dev/{author}/{slug}/.../preview....png`
- **preview** → that CDN URL (as-is)
- **component** → `https://21st.dev/{author}/{slug}`

Use prominent spacing between the two links (three spaces on each side of a pipe):

```markdown
| id | name | links |
|----|------|-------|
| **2220** | Spotlight Card | [preview](https://cdn.21st.dev/preetsuthar17/spotlight-card/default/preview.1747709960379.png)   |   [component](https://21st.dev/preetsuthar17/spotlight-card) |
```

Or as a bullet list:

```markdown
- **2220** Spotlight Card: [preview](https://cdn.21st.dev/preetsuthar17/spotlight-card/default/preview.1747709960379.png)   |   [component](https://21st.dev/preetsuthar17/spotlight-card)
```

## After listing

Stop and ask for an **id**. Only then pull code with `get_component`.
