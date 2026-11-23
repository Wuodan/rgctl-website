# Hybrid CPG — Agent Question Script

**Guide:** [Hybrid CPG](/docs/guides/hybrid-cpg/)  
**Fixture:** `example/coolstore-weblogic; `--with-cfg` for mutations`  
**Goal:** Show the CPG as a practical bridge between repo-level calls and function-level data flow.

## Questions

### 1. Mutations

> Trace every place the `ShoppingCart` fields are mutated.

### 2. Flow

> Show the data flow of `quantity` through `priceShoppingCart`.

### 3. Calls

> What calls does `priceShoppingCart` make, and who calls it?

### 4. Export

> Export the CPG so I can inspect it in an external graph tool.

## What the agent should show

- The agent explains why mutations need the CFG/field-write index while flows can be lazy.
- Call neighborhood and data flow are shown as separate views.
- The export format matches the external tool.

## Recording note

Ask the questions in order and let the agent finish before the next prompt. Do not paste CLI commands; the point is to show the agent choosing them and explaining the evidence.
