# Inspecting CFG, PDG, and Dominance — Agent Question Script

**Guide:** [Inspecting CFG, PDG, and Dominance](/docs/guides/inspecting-cfg-pdg-dominance/)  
**Fixture:** `example/coolstore-weblogic; `--with-cfg``  
**Goal:** Explain a function's internal structure when a slice or flow result needs justification.

## Questions

### 1. CFG

> Walk me through the control flow of `priceShoppingCart`, including branches and loops.

### 2. PDG

> At line 68, which statements contribute to `sc`, and why?

### 3. Dominance

> Show the dominator tree and explain which block guards the discount logic.

### 4. Debug

> This slice result looks wrong. Inspect the CFG/PDG and tell me whether the edge is real.

## What the agent should show

- The agent uses `inspect` layers explicitly and does not confuse CFG with PDG.
- Line-specific dependencies are tied to the raw graph, not guessed from source order.
- The final answer either confirms or corrects the earlier slice result.

## Recording note

Ask the questions in order and let the agent finish before the next prompt. Do not paste CLI commands; the point is to show the agent choosing them and explaining the evidence.
