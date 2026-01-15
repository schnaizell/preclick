# PreClick

PreClick is an interactive decision-simulation tool designed to help people recognize manipulation, scams, and cognitive traps *before* they click, trust, or lose something important.

This project comes from a personal question.

I studied coding, spent a few years working in non-tech office environments, and later returned to programming with something that kept bothering me:

> Why do even capable, experienced people still make bad decisions online?

PreClick is my attempt to explore that question through code.

---

## The problem

Modern scams no longer target people who “don’t know better”.

They target:
- busy employees
- tired managers
- people who are competent at their jobs but overloaded with information

Fake invoices, urgent emails, HR requests, and legal notices are designed to blend into how people actually work under pressure.

They exploit **human psychology**, not technical ignorance.

Most security awareness tools explain what people *should* do.
PreClick focuses on how people *actually decide*.

---

## What PreClick does

PreClick places users inside short, realistic scenarios inspired by everyday working life.

Each scenario includes:
- a believable context
- subtle warning signals
- multiple possible decisions

Instead of a single correct answer, each decision leads to **probabilistic outcomes**, simulating real-world uncertainty.
Sometimes things go wrong. Sometimes people get lucky.

The system observes user behavior and adapts future scenarios accordingly.

Users who take higher risks tend to face more financially dangerous situations,
while more cautious users are challenged with subtler forms of manipulation.

Over time, PreClick becomes a **living decision simulator**, not a static quiz.

---

## Why this is different

Most fraud or cybersecurity tools are static and instructional.

PreClick is adaptive and experiential.

It does not assume users are careless or uninformed.
It assumes they are human.

By modeling hesitation, trust, urgency, and risk-taking behavior, PreClick explores how real decisions are made — and how people can learn to pause before costly mistakes.

Instead of scoring answers as right or wrong, PreClick models consequences and uncertainty.

---

## Why this project exists

This is not a startup pitch.

It is a personal project driven by curiosity, lived experience, and the belief that software can quietly help people make better decisions.

The code may not be perfect.
The language may not always be fluent.

But the intent is serious:

To build something useful, honest, and capable of creating real-world impact.

---

## How to run

This project is a simple React + TypeScript application built with Vite.

To run it locally:

1. Clone the repository
```bash
git clone https://github.com/schnaizell/preclick.git
```

2. Enter the project directory
```bash
cd preclick
```

3. Install dependencies
```bash
npm install
```

4. Start the development server
```bash
npm run dev
```

Open the local URL shown in the terminal (usually [http://localhost:5173](http://localhost:5173)).

---

## What we are testing

PreClick is not only a demo.
It is an experiment.

We are exploring how people make decisions when faced with:
- urgency
- authority
- financial pressure
- incomplete information
- uncertainty

By observing decision patterns, retries, and scenario exposure, we can begin to identify behaviors such as:
- risk tolerance
- impulsive action
- verification vs trust tendencies

The goal is not to judge users.
The goal is to understand how real people think in moments where mistakes are expensive.

---

## Current status

PreClick is an early prototype under active development.
The goal at this stage is learning and iteration, not feature completeness.

The current focus is on:

* scenario design
* decision modeling
* behavior-driven scenario weighting
* clarity and realism over visual polish

Future iterations may explore deeper analytics, personalization, and educational feedback loops.

---

## Tech stack

- React
- TypeScript
- Vite

The stack is intentionally kept lightweight to prioritize behavior modeling and scenario iteration over visual complexity.
