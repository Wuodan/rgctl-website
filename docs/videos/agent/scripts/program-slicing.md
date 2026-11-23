# Program Slicing — Agent Question Script

**Guide:** [Program Slicing](/docs/guides/program-slicing/)  
**Fixture:** `example/coolstore-weblogic; lazy CFG/PDG is enough`  
**Goal:** Reduce a function to the statements that actually matter for a bug or change.

## Questions

### 1. Backward

> At `ShoppingCartService.java` line 68, trace back everything that contributes to `sc`.

### 2. Forward

> If I change `quantity` at line 54, what later statements are affected?

### 3. Security

> Can untrusted input reach the discount calculation? Slice forward with taint.

### 4. Focus

> Show only the statements I need to understand this bug, not the whole file.

## What the agent should show

- The agent states the direction (backward or forward) and the criterion explicitly.
- It uses lazy single-function CFG/PDG rather than demanding a full re-index.
- The final slice is short enough to review and explains why each statement is included.

## Recording note

Ask the questions in order and let the agent finish before the next prompt. Do not paste CLI commands; the point is to show the agent choosing them and explaining the evidence.
