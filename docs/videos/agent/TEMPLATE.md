# <Guide title> — Agent Question Script

**Guide:** [<Guide title>](/docs/guides/<slug>/)  
**Fixture:** `<fixture path or description>`  
**Goal:** One sentence describing the workflow this recording should prove.

## Questions

### 1. Opening

> A natural question a user would ask the coding agent. Do not mention rgctl commands or flags.

### 2. Follow-up

> A follow-up that asks for evidence, a trade-off, or the next action.

### 3. Decision

> A question that makes the agent choose between approaches or explain risk.

### 4. Wrap-up

> A request for a concrete artifact: a summary, a plan, a review note, or a test list.

## What the agent should show

- The evidence the viewer should see (for example, callers, a path, a policy finding, or a SARIF result).
- The command the agent should reach for, if the recording needs that cue for the producer.
- The failure or uncertainty the agent should call out honestly.

## Recording note

Ask the questions in order and let the agent finish before the next prompt. Do not paste CLI commands; the point is to show the agent choosing them and explaining the evidence.
