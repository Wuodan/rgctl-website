# Dependency Injection and Frameworks — Agent Question Script

**Guide:** [Dependency Injection and Frameworks](/docs/guides/dependency-injection-and-frameworks/)  
**Fixture:** `example/coolstore-weblogic`  
**Goal:** Expose HTTP surfaces and DI wiring that are invisible to naive grep.

## Questions

### 1. Routes

> List every HTTP endpoint in this app and the handler that serves it.

### 2. Wiring

> What does `CartEndpoint` inject, and which services depend on `ShoppingCartService`?

### 3. Plain English

> Find all controllers and reflection-heavy classes, even where the names do not say controller.

### 4. Impact

> Which routes and injected services are affected if I split the cart module out?

## What the agent should show

- The agent shows `exposesroute` and `injects` edges, not annotation text alone.
- Semantic search is used for roles whose names are not obvious.
- The impact answer connects routes, handlers, and injected services.

## Recording note

Ask the questions in order and let the agent finish before the next prompt. Do not paste CLI commands; the point is to show the agent choosing them and explaining the evidence.
