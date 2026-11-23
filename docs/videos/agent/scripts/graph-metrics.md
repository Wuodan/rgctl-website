# Graph Metrics — Agent Question Script

**Guide:** [Graph Metrics](/docs/guides/graph-metrics/)  
**Fixture:** `example/coolstore-weblogic; `--with-git` for churn`  
**Goal:** Turn centrality and churn into a defensible refactoring priority.

## Questions

### 1. Opening

> Which functions are the structural bottlenecks in this codebase?

### 2. Hotspots

> Rank the top files by PageRank plus recent git churn.

### 3. Bridges

> Which functions bridge otherwise separate modules?

### 4. Explanation

> Explain in plain language why `priceShoppingCart` ranks where it does.

## What the agent should show

- The agent distinguishes PageRank, betweenness, harmonic centrality, and churn.
- Production/test/generated roles are filtered or called out explicitly.
- The ranking is translated into a concrete review or refactoring recommendation.

## Recording note

Ask the questions in order and let the agent finish before the next prompt. Do not paste CLI commands; the point is to show the agent choosing them and explaining the evidence.
