# Exporting Graphs — Agent Question Script

**Guide:** [Exporting Graphs](/docs/guides/exporting-graphs/)  
**Fixture:** `example/coolstore-weblogic`  
**Goal:** Select the right export format for the downstream tool and audience.

## Questions

### 1. Graph tool

> Export the call graph so I can open it in Gephi. Which format should you use?

### 2. Docs

> Make a Mermaid diagram of the checkout call graph for a design doc.

### 3. Knowledge base

> I want to browse this codebase as an Obsidian vault, one note per section.

### 4. Archive

> Save a JSON graph snapshot for later comparison.

## What the agent should show

- The agent matches GraphML, Mermaid, Obsidian, OKF, or JSON to the destination.
- Export filters are scoped with a query rather than dumping the whole graph by default.
- The output path and format are stated before the command runs.

## Recording note

Ask the questions in order and let the agent finish before the next prompt. Do not paste CLI commands; the point is to show the agent choosing them and explaining the evidence.
