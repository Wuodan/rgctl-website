# Pull Request Review — Agent Question Script

**Guide:** [Pull Request Review](/docs/guides/pr-review/)  
**Fixture:** `sshaaf/coolstore-weblogic PR #2` against `sshaaf/main`  
**Goal:** Review the structural change in a real PR, not just its line diff.

## Questions

### 1. Paths

> Review PR #2 from sshaaf/coolstore-weblogic against sshaaf/main: which call paths changed and which callers were rewired?

### 2. Retargeting

> Are there retargeted calls where an old method was replaced by a new one?

### 3. Policy

> Does PR #2 introduce any new architecture violations compared with sshaaf/main?

### 4. Summary

> Summarize the risk in four sections for the PR description.

## What the agent should show

- The agent compares base and head graphs and shows added/removed/retargeted deltas.
- Policy findings are classified as new versus existing debt.
- The summary separates behavior change, impact, policy, and test guidance.

## Recording note

Ask the questions in order and let the agent finish before the next prompt. Do not paste CLI commands; the point is to show the agent choosing them and explaining the evidence.
