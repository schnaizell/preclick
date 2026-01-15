# PreClick – Architecture Overview

This document describes how PreClick is structured and the reasoning behind its design.

It is intentionally lightweight and practical, prioritizing clarity over completeness.

---

## 1. High-level concept

PreClick is a **decision-simulation system**, not a quiz.

The core loop is straightforward:
- present a realistic scenario
- let the user make a decision under uncertainty
- observe behavior patterns
- adapt future scenarios based on those behaviors

There is no single “correct” answer.

Outcomes are probabilistic, reflecting how real-world decisions often unfold rather than guaranteeing predictable results.

---

## 2. Core building blocks

The system is intentionally designed to remain explicit and minimal.

### 2.1 Scenarios (`scenario.ts`)

A scenario defines:
- the situation context
- available decisions
- possible outcomes
- metadata (e.g. category, risk type)

Scenarios are **data-first**, not hardcoded UI flows.

This approach enables:
- easy addition and iteration of scenarios
- future weighting or personalization
- potential external scenario authoring without touching core logic

---

### 2.2 Decisions & outcomes

Each decision:
- represents a realistic user action (e.g. pay, delay, verify)
- maps to one or more possible outcomes
- resolves probabilistically rather than deterministically

This avoids teaching users that:

> “doing the right thing always guarantees safety”

Instead, the system models **risk exposure**, not moral correctness.

---

### 2.3 Simulation logic (`simulate.ts`)

The simulation layer:
- resolves outcomes using controlled randomness
- ensures repeatability where appropriate
- serves as a boundary between scenario data and the UI

This separation ensures that:
- decision logic remains testable
- UI changes do not affect behavior modeling
- future analytics can integrate at a single, stable point

---

### 2.4 Application state (`App.tsx`)

The application tracks:
- the current scenario
- basic user behavior signals (e.g. risk vs. caution tendencies)
- recently observed decisions

State is kept minimal and explicit.

There is intentionally no global store at this stage.

This keeps the prototype:
- easier to reason about
- easier to refactor during workshop-driven iteration

---

## 2.5 System flow overview

Below is a simplified view of how system components interact:

Scenario Data (scenario.ts)
        |
        v
UI Layer (App.tsx)
        |
        v
Simulation Logic (simulate.ts)
        |
        v
Outcome Resolution

### System interaction (detailed)

+------------------+
|   Scenario Data  |
|  (scenario.ts)   |
+--------+---------+
         |
         v
+------------------+        user choice
|   UI Layer       | <------------------+
|  (App.tsx)       |                    |
+--------+---------+                    |
         |                              |
         v                              |
+------------------+                    |
| Simulation Logic |--------------------+
|  (simulate.ts)   |
+--------+---------+
         |
         v
+------------------+
|   Outcome        |
|  Resolution      |
+------------------+

The UI never decides outcomes directly.
All uncertainty and behavior modeling is handled by the simulation layer.

This flow intentionally avoids letting the UI resolve outcomes directly, keeping uncertainty centralized and observable.

---

## 3. Adaptive behavior (current and planned)

Currently:
- basic user behavior signals are tracked
- future scenarios can be selected based on recent decisions

Planned direction:
- dynamically weighted scenario categories
- subtle exposure of behavior patterns (not judgments)
- adaptation that remains quiet rather than obvious or punitive

The goal is **reflection**, not gamification.

---

## 4. Design principles

PreClick is guided by a small set of core principles:

- humans are not careless — they are overloaded
- learning happens through experience, not instruction
- uncertainty should be modeled, not hidden
- systems should adapt quietly, not lecture

These principles influence both technical structure and UX decisions.

---

## 5. Current limitations

This is an early prototype.

Known limitations include:
- no persistence between sessions
- no analytics dashboard
- minimal visual design
- a limited scenario set

These are conscious trade-offs made to preserve flexibility during exploration.

---

## 6. Why this architecture

The current structure favors:
- clarity over cleverness
- iteration over completeness
- understanding behavior before optimizing outcomes

The system is designed to evolve alongside real observations,
rather than locking assumptions too early.

---

## 7. Future directions (open)

Possible next steps include:
- richer behavior modeling
- scenario authoring tools
- reflective feedback loops
- privacy-aware aggregation of behavioral patterns

All future decisions should preserve the core idea:

**Help people pause before they click.**

---

## 8. Design trade-offs

Several deliberate trade-offs were made at this stage:

- **No global state management yet**
  This avoids premature complexity while the behavior model is still evolving.

- **Limited analytics and persistence**
  The focus remains on understanding decision dynamics before optimizing data collection.

- **Minimal visual design**
  Visual polish is intentionally deprioritized in favor of:
  - scenario clarity
  - decision realism
  - iteration speed

These choices may limit short-term scalability,
but they keep the system flexible during early exploration.
