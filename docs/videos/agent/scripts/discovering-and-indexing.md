# Discovering and Indexing a Codebase — Agent Question Script

**Guide:** [Discovering and Indexing a Codebase](/docs/guides/discovering-and-indexing/)  
**Fixture:** `example/coolstore-weblogic; optionally a two-service layout`  
**Goal:** Show how to build the right index for the question, including large or multi-repo setups.

## Questions

### 1. Opening

> Index this repository for agent use and tell me what you found.

### 2. Scope

> Index only the Java backend, not the Angular frontend, and explain what changed.

### 3. History

> I need git churn and co-change data for a hotspot review. What should you enable?

### 4. Multi-repo

> This is a two-service monorepo. How would you index and merge them?

### 5. Health

> Verify the index is current and give me the function and edge counts.

## What the agent should show

- The agent uses `-r` correctly and does not combine it with a positional `.`.
- Optional passes (`--with-git`, `--with-cfg`, `--scip`) are justified by the question.
- The final status includes graph presence fresh enough for the requested answer.

## Recording note

Ask the questions in order and let the agent finish before the next prompt. Do not paste CLI commands; the point is to show the agent choosing them and explaining the evidence.
