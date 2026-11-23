# Agent pack (skills) — Agent Question Script

**Guide:** [Agent pack (skills)](/docs/guides/agent-skill/)  
**Fixture:** `example/coolstore-weblogic`  
**Goal:** Show the agent pack turning natural-language questions into graph-backed analysis and safer edits.

## Questions

### 1. Opening

> I'm about to rename `priceShoppingCart` and change its signature. Before I edit, tell me every caller and what else could break.

### 2. Porting

> Use the graph to explain the cart pricing flow so I can port the same logic to Go.

### 3. Tests

> Write a test plan for the pricing path that covers its real branches, not just line coverage.

### 4. Migration

> Which parts of this monolith are the safest to extract first, and which are too coupled to touch?

### 5. Review

> Review the current diff against the architecture rules and flag anything new.

## What the agent should show

- The agent loads the rgctl skill and reaches for `rgctl -f json` instead of reading whole files.
- Its answer cites callers, blast radius, or slice evidence rather than guessing from names.
- If the graph is stale, it says so and suggests `discover` / `update` before making claims.

## Recording note

Ask the questions in order and let the agent finish before the next prompt. Do not paste CLI commands; the point is to show the agent choosing them and explaining the evidence.
