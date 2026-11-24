# Structured graph queries — Voiceover Script

**Video:** [`../../recordings/structured-query.mp4`](../../recordings/structured-query.mp4)  
**Runtime:** ~62.9s  
**Delivery:** warm, direct, ~150 wpm. Pause after each question and let the evidence land.

## Intro (0:00–0:06)

> rgctl is an open-source, MIT-licensed code knowledge graph built in Rust for AI coding agents.
>
> In this walkthrough, a coding agent answers structural questions with rgctl's stable JSON verbs: find, callers, relations, inventory, and status.

## Walkthrough

### Beat 1 — Ask in graph terms

> The agent lists public functions, follows callers two levels up, and walks exposes-route and injects edges. Each answer is a typed graph query.

### Beat 2 — Trust the envelope

> Stable JSON, schema versions, and inventory counts make the output usable by another agent or script. The agent checks status before making a strong claim about missing callers.

### Beat 3 — No guessing

> The graph returns entities and edges, not lines that happen to contain a string. That is the difference between a lookup and a search.

## On screen

- “List every public function in the checkout module, with file and line.”
- “Who calls `priceShoppingCart` two levels up?”
- “Show all `exposesroute` and `injects` edges for `CartEndpoint`.”
- “How many functions, classes, and edge types are in the index?”
- “Is the graph current? If not, what should we run?”

## Outro (last ~10s)

> Try rgctl at rgctl.io/install. Star the repository at github.com/rgctl/rgctl, and join the community on Discord at rgctl.io/community. If you build something with rgctl, we would love to see it.
