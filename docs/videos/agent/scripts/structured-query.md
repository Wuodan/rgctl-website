# Structured graph queries — Agent Question Script

**Guide:** [Structured graph queries](/docs/guides/structured-query/)  
**Fixture:** `example/coolstore-weblogic`  
**Goal:** Answer structural questions with stable JSON verbs and a check for index freshness.

## Questions

### 1. Opening

> List every public function in the checkout module, with file and line.

### 2. Callers

> Who calls `priceShoppingCart` two levels up?

### 3. Edges

> Show all `exposesroute` and `injects` edges for `CartEndpoint`.

### 4. Inventory

> How many functions, classes, and edge types are in the index?

### 5. Health

> Is the graph current? If not, what should we run?

## What the agent should show

- The agent uses `find`, `callers`, `relations`, `inventory`, and `status` appropriately.
- JSON envelopes and schema versions are handled without inventing fields.
- It checks freshness before making a strong claim about missing callers.

## Recording note

Ask the questions in order and let the agent finish before the next prompt. Do not paste CLI commands; the point is to show the agent choosing them and explaining the evidence.
