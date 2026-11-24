# Blast Radius Analysis — Voiceover Script

**Video:** [`../../recordings/blast-radius-analysis.mp4`](../../recordings/blast-radius-analysis.mp4)  
**Runtime:** ~58.2s  
**Delivery:** warm, direct, ~150 wpm. Pause after each question and let the evidence land.

## Intro (0:00–0:06)

> rgctl is an open-source, MIT-licensed code knowledge graph built in Rust for AI coding agents.
>
> In this walkthrough, a coding agent sizes the blast radius before changing a cart-pricing method, then turns the evidence into a PR-ready risk summary.

## Walkthrough

### Beat 1 — Ask before editing

> Before touching priceShoppingCart, the agent asks who calls it and which exposed endpoints sit upstream. It checks depth two and depth four and notices that the impact saturates early.

### Beat 2 — Compare the risk

> It compares priceShoppingCart with getShoppingCart by caller count, behavioral risk, and endpoint exposure. The exact same query pattern explains why one change is a safe accessor edit and the other touches checkout behavior.

### Beat 3 — Write the summary

> The final answer is a PR-ready risk summary: direct callers, external entry points, and the tests that need attention. That is graph-backed impact, not a text search.

## On screen

- “I need to change `priceShoppingCart`. Which callers and endpoints are in the blast radius?”
- “How does the impact change at depth 2 versus depth 4, and which of those callers are external entry points?”
- “Compare `priceShoppingCart` and `getShoppingCart` by risk. Which one should I touch first?”
- “Write a short risk summary for the PR description, including the callers I need to test.”

## Outro (last ~10s)

> Try rgctl at rgctl.io/install. Star the repository at github.com/rgctl/rgctl, and join the community on Discord at rgctl.io/community. If you build something with rgctl, we would love to see it.
