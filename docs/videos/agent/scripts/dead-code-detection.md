# Dead Code Detection — Agent Question Script

**Guide:** [Dead Code Detection](/docs/guides/dead-code-detection/)  
**Fixture:** `example/metasfresh-4.9.8b`  
**Goal:** Show graph-wide reachability finding dead roots in a large ERP, framework entry points, and a CI-ready high-confidence gate.

## Questions

### 1. Opening

> Use the graph's dead-code reachability analysis, not a text search: what can we safely delete in this large ERP, and what is only suspicious?

### 2. Framework roots

> Which of these findings are actually invoked by the framework or container, even though grep finds no callers?

### 3. Evidence

> Show me the high-confidence dead roots from the rgctl dead-code report and the evidence that nothing reachable can get to them.

### 4. CI gate

> How would we fail CI on new high-confidence dead code without failing on the existing backlog?

## What the agent should show

- The agent runs graph-wide reachability, not a per-file "unused" search.
- Framework annotations and entry points are treated as roots, so container-invoked methods are not falsely deleted.
- Findings are separated into high, medium, and low confidence.
- The CI recommendation compares against the existing baseline instead of failing on legacy findings.

## Recording note

Ask the questions in order and let the agent finish before the next prompt. Do not paste CLI commands; the point is to show the agent choosing them and explaining the evidence.
