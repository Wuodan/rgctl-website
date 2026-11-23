# HTTP Server and Dashboard — Agent Question Script

**Guide:** [HTTP Server and Dashboard](/docs/guides/http-server-and-dashboard/)  
**Fixture:** `example/coolstore-weblogic; index with `--with-universe``  
**Goal:** Show interactive exploration and the semantic API without confusing them with CLI queries.

## Questions

### 1. Opening

> Start the dashboard for this repo and tell me what I should look at first.

### 2. Sharing

> How can a teammate explore this graph without cloning the repo?

### 3. API

> Use the semantic API to find checkout-related functions and show the request and response.

### 4. Freshness

> The dashboard looks stale after my edits. What should we do?

## What the agent should show

- The agent starts `serve` and distinguishes dashboard browsing from structural CLI verbs.
- The semantic API request/response is shown, not just described.
- A stale dashboard is explained in terms of index freshness and the watcher.

## Recording note

Ask the questions in order and let the agent finish before the next prompt. Do not paste CLI commands; the point is to show the agent choosing them and explaining the evidence.
