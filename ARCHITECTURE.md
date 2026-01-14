# PreClick – Architecture Overview

This document explains how PreClick is structured and why it is designed this way.
It is intentionally lightweight and practical, focusing on clarity over completeness.

---

## 1. High-level concept

PreClick is a **decision-simulation system**, not a quiz.

The core idea is:
- Present a realistic scenario
- Let the user make a decision under uncertainty
- Observe behavior patterns
- Adapt future scenarios based on those behaviors

There is no single “correct” answer.
Outcomes are probabilistic, reflecting how real-world decisions often work.

---

## 2. Core building blocks

The system is intentionally kept simple and explicit.

### 2.1 Scenarios (`scenario.ts`)

A scenario defines:
- context (what is happening)
- available decisions
- possible outcomes
- metadata (category, risk type, etc.)

Scenarios are **data-first**, not hardcoded UI flows.
This allows:
- easy addition of new scenarios
- future weighting or personalization
- potential external scenario authoring

---

### 2.2 Decisions & Outcomes

Each decision:
- represents a realistic user action (e.g. pay, delay, verify)
- maps to one or more outcomes
- outcomes are probabilistic, not deterministic

This avoids teaching users that:
> “doing the right thing always guarantees safety”

Instead, the system models **risk exposure**, not moral correctness.

---

### 2.3 Simulation logic (`simulate.ts`)

The simulation layer:
- resolves outcomes using controlled randomness
- ensures repeatability where needed
- acts as a boundary between data and UI

This layer is intentionally separated so that:
- decision logic is testable
- UI changes do not affect behavior modeling
- future analytics can hook into this layer

---

### 2.4 Application state (`App.tsx`)

The app tracks:
- current scenario
- user behavior signals (e.g. risk vs caution tendencies)
- recently observed decisions

State is kept minimal and explicit.
There is no global store yet, by design.

This makes the prototype:
- easier to reason about
- easier to refactor during workshop iterations

---

## 3. Adaptive behavior (current + planned)

Currently:
- user behavior is tracked at a basic level
- future scenarios can be selected based on previous actions

Planned direction:
- weight scenario categories dynamically
- expose patterns (not judgments) to the user
- keep adaptation subtle, not obvious or punitive

The goal is **reflection**, not gamification.

---

## 4. Design principles

PreClick is built around a few guiding principles:

- Humans are not careless — they are overloaded
- Learning happens through experience, not instruction
- Uncertainty should be modeled, not hidden
- The system should adapt quietly, not lecture

These principles influence both technical and UX decisions.

---

## 5. Current limitations

This is an early prototype.

Known limitations:
- no persistence between sessions
- no analytics dashboard yet
- minimal visual design
- limited scenario set

These are conscious trade-offs to keep the system flexible during exploration.

---

## 6. Why this architecture

The current structure favors:
- clarity over cleverness
- iteration over completeness
- understanding behavior before optimizing outcomes

The intention is to let the system evolve alongside real observations,
rather than locking assumptions too early.

---

## 7. Future directions (open)

Possible next steps include:
- richer behavior modeling
- scenario authoring tools
- feedback loops for reflection
- privacy-aware aggregation of patterns

All future decisions should preserve the core idea:
**help people pause before they click.**