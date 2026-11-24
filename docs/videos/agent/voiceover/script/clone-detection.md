# Clone Detection — Voiceover Script

**Video:** [`../../recordings/clone-detection.mp4`](../../recordings/clone-detection.mp4)  
**Runtime:** ~86.3s  
**Delivery:** warm, direct, ~150 wpm. Pause after each question and let the evidence land.

## Intro (0:00–0:06)

> rgctl is an open-source, MIT-licensed code knowledge graph built in Rust for AI coding agents.
>
> In this walkthrough, a coding agent finds duplicated code, distinguishes exact from fragment clones, and chooses an extraction candidate.

## Walkthrough

### Beat 1 — Find the copies

> The agent looks for exact clones and fragment clones, including blocks where local variables were renamed. It maps each group back to methods and file locations.

### Beat 2 — Fix every copy

> When one copy has a bug, the graph shows the other copies that need the same fix. That is the practical value of clone detection: not a duplication score, but a complete propagation list.

### Beat 3 — Choose the extraction

> The final recommendation weighs group size, usage, and coupling. The best extraction candidate is the one that removes repetition without creating a new shared dependency everyone has to touch.

## On screen

- “Find duplicated blocks in the cart and order code, including copy-paste variants where local variables were renamed.”
- “Show me the exact and fragment clone groups and the methods they belong to.”
- “If I fix a bug in one copy, which other copies should I update?”
- “Which clone group is the best candidate for extraction into a shared helper, and why?”

## Outro (last ~10s)

> Try rgctl at rgctl.io/install. Star the repository at github.com/rgctl/rgctl, and join the community on Discord at rgctl.io/community. If you build something with rgctl, we would love to see it.
