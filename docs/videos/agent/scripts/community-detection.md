# Community Detection — Agent Question Script

**Guide:** [Community Detection](/docs/guides/community-detection/)  
**Fixture:** `example/metasfresh-4.9.8b`  
**Goal:** Turn community structure in a large ERP codebase into an understandable architecture map and extraction candidates.

## Questions

### 1. Opening

> Map this codebase into functional communities. Which ones look like the order-to-cash domain?

### 2. Coupling

> Which community has the most cross-boundary calls, and what does that imply for a codebase this size?

### 3. Extraction

> Which communities look like good service-extraction candidates?

### 4. Narrative

> Explain this architecture to a new engineer in five sentences.

## What the agent should show

- The agent uses community inventory and labels, not folder names alone.
- Cross-community calls and modularity support the coupling answer.
- The architecture narrative names concrete modules and their responsibilities.

## Recording note

Ask the questions in order and let the agent finish before the next prompt. Do not paste CLI commands; the point is to show the agent choosing them and explaining the evidence.
