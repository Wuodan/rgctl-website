# Dependency Injection and Frameworks — Voiceover Script

**Video:** [`../../recordings/dependency-injection-and-frameworks.mp4`](../../recordings/dependency-injection-and-frameworks.mp4)  
**Runtime:** ~60.1s  
**Delivery:** warm, direct, ~150 wpm. Pause after each question and let the evidence land.

## Intro (0:00–0:06)

> rgctl is an open-source, MIT-licensed code knowledge graph built in Rust for AI coding agents.
>
> In this walkthrough, a coding agent maps HTTP routes, dependency-injection wiring, and reflection-heavy entry points that a text search cannot see.

## Walkthrough

### Beat 1 — Expose the routes

> The agent lists HTTP endpoints and the handlers that serve them. Then it follows injected services through the graph in both directions.

### Beat 2 — See the wiring

> Exposes-route and injects edges reveal controller and service wiring that annotations and text search only hint at. Semantic lookup fills in the roles whose names do not say controller or service.

### Beat 3 — Answer the impact

> The final question is what a module split would touch. The answer connects routes, handlers, and injected services, so the agent can plan the change instead of discovering it in production.

## On screen

- “List every HTTP endpoint in this app and the handler that serves it.”
- “What does `CartEndpoint` inject, and which services depend on `ShoppingCartService`?”
- “Find all controllers and reflection-heavy classes, even where the names do not say controller.”
- “Which routes and injected services are affected if I split the cart module out?”

## Outro (last ~10s)

> Try rgctl at rgctl.io/install. Star the repository at github.com/rgctl/rgctl, and join the community on Discord at rgctl.io/community. If you build something with rgctl, we would love to see it.
