# CLI Command Reference & Architecture Guide — Agent Question Script

**Guide:** [CLI Command Reference & Architecture Guide](/docs/guides/cli-command-reference/)  
**Fixture:** `example/coolstore-weblogic`  
**Goal:** Show the agent choosing canonical commands for real questions instead of reciting a command list.

## Questions

### 1. Lookup

> I need every implementation of `getOrders` and every caller. Which rgctl command should you use, and why?

### 2. Deep analysis

> I want to see a function's control flow and then its data dependencies. Pick the right commands and show the outputs.

### 3. History

> When would I use `diff` instead of the normal git diff?

### 4. Cheat sheet

> Give me a short cheat sheet of the commands you would actually use for impact, slicing, and PR review.

## What the agent should show

- The agent picks canonical verbs (`find`, `callers`, `inspect`, `review`) and explains aliases only when relevant.
- It passes `-f json` for machine-readable answers and keeps text output for humans.
- No invented flags; the agent verifies against `rgctl --help` when unsure.

## Recording note

Ask the questions in order and let the agent finish before the next prompt. Do not paste CLI commands; the point is to show the agent choosing them and explaining the evidence.
