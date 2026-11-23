# Full Agent Demo — Question Script

**Guide:** [Demo](/demo/)  
**Fixture:** `example/coolstore-weblogic`  
**Goal:** A chaptered, long-form walkthrough that shows one agent conversation moving from orientation to analysis, change, review, and vulnerability triage.

## Questions

### 1. Orientation

> I'm new to this repo. Index it and give me a 60-second tour: the main domains, the entry points, and the riskiest code.

### 2. Change plan

> I want to add a discount rule to cart pricing. What would break, and which callers and tests should I update?

### 3. Data flow

> Trace how `quantity` and `discount` flow through that path. Show me only the statements that matter, not the whole files.

### 4. Architecture

> Before I change it, which architecture rules or highly coupled areas should I worry about?

### 5. Migration context

> If we eventually extract this module, what should we extract first and why?

### 6. Review

> I've made the change. Review my diff for call-path rewiring and policy regressions.

### 7. Security follow-up

> One more thing: are we affected by CVE-2022-42004? The dependency might be shaded inside a bundled JAR.

## What the agent should show

- It answers each question with rgctl evidence and carries context forward instead of re-reading the repo.
- The change plan and review are grounded in callers, blast radius, and policy findings.
- The security answer separates dependency presence from reachability and ends with a justified verdict.

## Recording note

This is a chaptered, long-form script; record each section as a separate chapter and keep the questions in order. It can reuse footage from the individual guide scripts, but the through-line should be one continuous conversation.
