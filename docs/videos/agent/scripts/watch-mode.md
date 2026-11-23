# Watch mode and incremental update — Agent Question Script

**Guide:** [Watch mode and incremental update](/docs/guides/watch-mode/)  
**Fixture:** `example/coolstore-weblogic`  
**Goal:** Keep the graph fresh during an edit session without unnecessary full re-indexes.

## Questions

### 1. Opening

> I'm editing the cart service. Keep the graph fresh while I work and tell me when it is current.

### 2. Incremental

> I only changed two files — update the graph without a full re-index.

### 3. Health

> Is the watcher running, and are any files queued or stale?

### 4. Choice

> I'm about to run a big analysis pass. Is update or discover the right choice now?

## What the agent should show

- The agent distinguishes `update` (changed files) from `discover` (cold index + analysis).
- It checks `status` for freshness and watcher state.
- It explains that analysis sidecars may be invalidated and when a full discover is warranted.

## Recording note

Ask the questions in order and let the agent finish before the next prompt. Do not paste CLI commands; the point is to show the agent choosing them and explaining the evidence.
