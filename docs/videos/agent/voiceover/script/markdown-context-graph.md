# Markdown Context Graph — Voiceover Script

**Video:** [`../../recordings/markdown-context-graph.mp4`](../../recordings/markdown-context-graph.mp4)  
**Runtime:** ~65.2s  
**Delivery:** warm, direct, ~150 wpm. Pause after each question and let the evidence land.

## Intro (0:00–0:06)

> rgctl is an open-source, MIT-licensed code knowledge graph built in Rust for AI coding agents.
>
> In this walkthrough, a coding agent indexes documentation as a graph, follows heading structure and links, and connects docs back to code.

## Walkthrough

### Beat 1 — Docs are a graph too

> The agent indexes documentation, shows heading hierarchy, and follows internal links between sections. It then limits semantic search to documents instead of searching code.

### Beat 2 — Connect docs to code

> A design section is linked to the Java class it describes. That gives an agent a route from prose to implementation, not just a text match.

### Beat 3 — Take it with you

> The docs graph exports as an Obsidian vault, so the same structure remains useful outside the conversation.

## On screen

- “Index our docs and tell me which sections link to the checkout guide.”
- “Find every deployment section and show the heading hierarchy.”
- “Export the docs graph as an Obsidian vault.”
- “Search only the docs for 'cart pricing' and show the source sections.”
- “Link this design section to the Java class it describes.”

## Outro (last ~10s)

> Try rgctl at rgctl.io/install. Star the repository at github.com/rgctl/rgctl, and join the community on Discord at rgctl.io/community. If you build something with rgctl, we would love to see it.
