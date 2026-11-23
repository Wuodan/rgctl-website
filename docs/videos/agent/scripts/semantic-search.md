# Semantic Search — Agent Question Script

**Guide:** [Semantic Search](/docs/guides/semantic-search/)  
**Fixture:** `example/coolstore-weblogic; run `semantic index``  
**Goal:** Find code by intent, then verify the hits against the structural graph.

## Questions

### 1. Opening

> Where is the payment processing logic? I don't know the function names.

### 2. Broad

> Find authentication-related functions, including ones whose names do not mention auth.

### 3. Docs

> Search only the docs for 'shopping cart checkout' and show the sections.

### 4. Verify

> Which of these semantic hits are actually connected to the cart domain in the call graph?

## What the agent should show

- The agent uses semantic similarity as a discovery step, not as proof.
- It scopes the search to code or docs when the question asks for one.
- The final shortlist is cross-checked with callers or relations.

## Recording note

Ask the questions in order and let the agent finish before the next prompt. Do not paste CLI commands; the point is to show the agent choosing them and explaining the evidence.
