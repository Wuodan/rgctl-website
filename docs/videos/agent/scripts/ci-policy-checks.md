# CI Policy Checks — Agent Question Script

**Guide:** [CI Policy Checks](/docs/guides/ci-policy-checks/)  
**Fixture:** `example/coolstore-weblogic with a base snapshot from main`  
**Goal:** Show the difference between a local policy check and a temporal PR gate, and how new violations are isolated from legacy debt.

## Questions

### 1. Opening

> This branch changes `ShoppingCartService`. Did it introduce new policy violations compared with main?

### 2. Triage

> Which findings are new, which were already on main, and which were resolved?

### 3. Scoping

> If I only want to block new violations, how should we scope the gate?

### 4. Fix

> Explain the failing rule and the exact symbol/file that triggered it so I can fix it.

## What the agent should show

- The agent distinguishes `check` (one snapshot) from `review check` (base vs head).
- It reports temporal classes (`new`, `existing`, `resolved`, `regression`) instead of one flat list.
- The failing rule, symbol, and exit behavior are explained clearly enough to change CI.

## Recording note

Ask the questions in order and let the agent finish before the next prompt. Do not paste CLI commands; the point is to show the agent choosing them and explaining the evidence.
