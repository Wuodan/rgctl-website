# Dead Code Detection — Voiceover Script

**Video:** [`../../recordings/dead-code-detection.mp4`](../../recordings/dead-code-detection.mp4)  
**Runtime:** ~118.5s  
**Delivery:** warm, direct, ~150 wpm. Pause after each question and let the evidence land.

## Intro (0:00–0:06)

> rgctl is an open-source, MIT-licensed code knowledge graph built in Rust for AI coding agents.
>
> In this walkthrough, a coding agent investigates dead-code candidates in metasfresh and discovers why zero textual references do not automatically mean the code is dead.

## Walkthrough

### Beat 1 — Start from reachability

> The agent investigates dead-code candidates in metasfresh. A large set of classes appears unreferenced, but the agent does not delete anything on that signal alone.

### Beat 2 — Find the real wiring

> It discovers Spring component scanning and a custom Services.get naming policy that constructs implementations reflectively. Process and callout classes can also be named from database rows, so zero textual references can still be live code.

### Beat 3 — Separate the queues

> The result is not one dead-code list. It is a high-confidence deletion set, a reflective/framework review queue, and a baseline for CI. The graph prevents a grep-driven cleanup from deleting working code.

## On screen

- “Use the graph's dead-code reachability analysis, not a text search: what can we safely delete in this large ERP, and what is only suspicious?”
- “Which of these findings are actually invoked by the framework or container, even though grep finds no callers?”
- “Show me the high-confidence dead roots from the rgctl dead-code report and the evidence that nothing reachable can get to them.”
- “How would we fail CI on new high-confidence dead code without failing on the existing backlog?”

## Outro (last ~10s)

> Try rgctl at rgctl.io/install. Star the repository at github.com/rgctl/rgctl, and join the community on Discord at rgctl.io/community. If you build something with rgctl, we would love to see it.
