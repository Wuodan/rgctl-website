# Program Slicing — Voiceover Script

**Video:** [`../../recordings/program-slicing.mp4`](../../recordings/program-slicing.mp4)  
**Runtime:** ~76.5s  
**Delivery:** warm, direct, ~150 wpm. Pause after each question and let the evidence land.

## Intro (0:00–0:06)

> rgctl is an open-source, MIT-licensed code knowledge graph built in Rust for AI coding agents.
>
> In this walkthrough, a coding agent slices a function down to the statements that matter and explains what a change really affects.

## Walkthrough

### Beat 1 — Cut to the relevant lines

> The agent traces backward from a specific variable at line 68 and forward from a quantity change. The result is a small set of statements that actually influence the value.

### Beat 2 — Add data flow

> A forward taint slice shows whether untrusted input can reach the discount calculation. Aliases and field writes are included only when they matter.

### Beat 3 — Keep the focus

> The point is not a shorter file. It is an answer an engineer can review without loading the entire function into working memory.

## On screen

- “At `ShoppingCartService.java` line 68, trace back everything that contributes to `sc`.”
- “If I change `quantity` at line 54, what later statements are affected?”
- “Can untrusted input reach the discount calculation? Slice forward with taint.”
- “Show only the statements I need to understand this bug, not the whole file.”

## Outro (last ~10s)

> Try rgctl at rgctl.io/install. Star the repository at github.com/rgctl/rgctl, and join the community on Discord at rgctl.io/community. If you build something with rgctl, we would love to see it.
