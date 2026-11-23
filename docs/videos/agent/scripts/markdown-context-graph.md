# Markdown Context Graph — Agent Question Script

**Guide:** [Markdown Context Graph](/docs/guides/markdown-context-graph/)  
**Fixture:** `example/k8s-website plus tests/fixtures/markdown-context`  
**Goal:** Index documentation as a graph and connect docs to code.

## Questions

### 1. Opening

> Index our docs and tell me which sections link to the checkout guide.

### 2. Structure

> Find every deployment section and show the heading hierarchy.

### 3. Export

> Export the docs graph as an Obsidian vault.

### 4. Search

> Search only the docs for 'cart pricing' and show the source sections.

### 5. Linking

> Link this design section to the Java class it describes.

## What the agent should show

- The agent indexes `.md`/`.mdx` separately from code and shows heading modules.
- Internal links appear as references, not plain text greps.
- Doc-scoped semantic search is used for questions that are not just name lookups.

## Recording note

Ask the questions in order and let the agent finish before the next prompt. Do not paste CLI commands; the point is to show the agent choosing them and explaining the evidence.
