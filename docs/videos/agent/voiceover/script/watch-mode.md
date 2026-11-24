# Watch mode and incremental update — Voiceover Script

**Video:** [`../../recordings/watch-mode.mp4`](../../recordings/watch-mode.mp4)  
**Runtime:** ~46.8s  
**Delivery:** warm, direct, ~150 wpm. Pause after each question and let the evidence land.

## Intro (0:00–0:06)

> rgctl is an open-source, MIT-licensed code knowledge graph built in Rust for AI coding agents.
>
> In this walkthrough, a coding agent keeps the graph fresh while editing, choosing between incremental update and a full re-index.

## Walkthrough

### Beat 1 — Keep the graph fresh

> The agent edits the cart service and uses incremental update instead of a full re-index. It checks status to know whether the graph is current.

### Beat 2 — Choose the right refresh

> A couple of changed files call for update. A full discover is reserved for a cold index or an analysis pass that needs rebuilt sidecars.

### Beat 3 — One writer

> The watcher is the single writer. That prevents two processes from fighting over the snapshot while the agent keeps working.

## On screen

- “I'm editing the cart service. Keep the graph fresh while I work and tell me when it is current.”
- “I only changed two files — update the graph without a full re-index.”
- “Is the watcher running, and are any files queued or stale?”
- “I'm about to run a big analysis pass. Is update or discover the right choice now?”

## Outro (last ~10s)

> Try rgctl at rgctl.io/install. Star the repository at github.com/rgctl/rgctl, and join the community on Discord at rgctl.io/community. If you build something with rgctl, we would love to see it.
