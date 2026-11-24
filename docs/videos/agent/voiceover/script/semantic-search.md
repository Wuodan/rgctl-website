# Semantic Search — Voiceover Script

**Video:** [`../../recordings/semantic-search.mp4`](../../recordings/semantic-search.mp4)  
**Runtime:** ~78.6s  
**Delivery:** warm, direct, ~150 wpm. Pause after each question and let the evidence land.

## Intro (0:00–0:06)

> rgctl is an open-source, MIT-licensed code knowledge graph built in Rust for AI coding agents.
>
> In this walkthrough, a coding agent finds code by intent, then verifies semantic hits against the call graph instead of trusting embeddings alone.

## Walkthrough

### Beat 1 — Search by intent

> The agent finds payment, authentication, and documentation by meaning when the symbol name is unknown. Semantic search is the discovery step.

### Beat 2 — Verify with structure

> Each hit is checked against callers and typed relations. An embedding similarity is not proof that the code belongs to the domain.

### Beat 3 — Use the right scope

> The agent narrows the search to code or docs when the question asks for one. The best answer combines intent with the graph.

## On screen

- “Where is the payment processing logic? I don't know the function names.”
- “Find authentication-related functions, including ones whose names do not mention auth.”
- “Search only the docs for 'shopping cart checkout' and show the sections.”
- “Which of these semantic hits are actually connected to the cart domain in the call graph?”

## Outro (last ~10s)

> Try rgctl at rgctl.io/install. Star the repository at github.com/rgctl/rgctl, and join the community on Discord at rgctl.io/community. If you build something with rgctl, we would love to see it.
