# Migration Planning — Agent Question Script

**Guide:** [Migration Planning](/docs/guides/migration-planning/)  
**Fixture:** `example/coolstore-weblogic; discover with `--with-harmonic --export-migration-hints``  
**Goal:** Produce and justify a dependency-aware extraction order.

## Questions

### 1. Opening

> Generate a migration plan for this monolith. What should we extract first?

### 2. Why

> Why is that package first? Show the dependency and risk evidence.

### 3. Sprints

> Group the plan into phases we can fit into sprints.

### 4. Risk

> Which extraction is highest risk, and what should we do before it?

## What the agent should show

- The agent uses the generated migration plan, not an improvised package order.
- Ordering is justified with coupling, blast radius, and centrality.
- The sprint grouping preserves dependency order and calls out the risky step.

## Recording note

Ask the questions in order and let the agent finish before the next prompt. Do not paste CLI commands; the point is to show the agent choosing them and explaining the evidence.
