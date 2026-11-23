# Clone Detection — Agent Question Script

**Guide:** [Clone Detection](/docs/guides/clone-detection/)  
**Fixture:** `example/coolstore-weblogic`  
**Goal:** Show duplication discovery, bug-fix propagation, and extraction candidates.

## Questions

### 1. Opening

> Find duplicated blocks in the cart and order code, including copy-paste variants where local variables were renamed.

### 2. Groups

> Show me the exact and fragment clone groups and the methods they belong to.

### 3. Propagation

> If I fix a bug in one copy, which other copies should I update?

### 4. Decision

> Which clone group is the best candidate for extraction into a shared helper, and why?

## What the agent should show

- The agent chooses exact, similarity, or fragment mode with a reason.
- Clone groups are tied to concrete methods and file locations.
- The extraction recommendation weighs group size and usage, not just duplication count.

## Recording note

Ask the questions in order and let the agent finish before the next prompt. Do not paste CLI commands; the point is to show the agent choosing them and explaining the evidence.
