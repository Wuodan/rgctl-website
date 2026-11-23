# Blast Radius Analysis — Agent Question Script

**Guide:** [Blast Radius Analysis](/docs/guides/blast-radius-analysis/)  
**Fixture:** `example/coolstore-weblogic`  
**Goal:** Demonstrate pre-change risk assessment and a review-ready impact summary.

## Questions

### 1. Opening

> I need to change `priceShoppingCart`. Which callers and endpoints are in the blast radius?

### 2. Depth

> How does the impact change at depth 2 versus depth 4, and which of those callers are external entry points?

### 3. Comparison

> Compare `priceShoppingCart` and `getShoppingCart` by risk. Which one should I touch first?

### 4. Wrap-up

> Write a short risk summary for the PR description, including the callers I need to test.

## What the agent should show

- The agent shows upstream callers at a stated depth and explains why deeper calls matter.
- It uses boundary classification to distinguish entry points from internal helpers.
- The final summary is grounded in the graph, with the score and caller list visible.

## Recording note

Ask the questions in order and let the agent finish before the next prompt. Do not paste CLI commands; the point is to show the agent choosing them and explaining the evidence.
