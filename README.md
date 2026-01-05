# Kubernetes — From Fundamentals to Production Thinking

This repository is a **structured, opinionated learning path** to master Kubernetes at a **senior / interview-ready level**.

The goal is **not** to memorize YAML or commands, but to deeply understand:

- *why Kubernetes exists*
- *which problems it actually solves*
- *how its internal mechanisms work*
- *how to reason about trade-offs, failures, and architecture decisions*

This material is written **entirely in English**, targeting real-world usage, production scenarios, and complex interview cases.

## 🎯 Learning Objectives

By the end of this journey, you should be able to:

- Explain Kubernetes concepts **without relying on tooling buzzwords**
- Reason about Kubernetes as a **distributed system**
- Diagnose real production issues
- Make **architecture decisions** using Kubernetes primitives
- Confidently handle **senior-level interviews and system design cases**

## 🧠 Learning Philosophy

This repository follows a few core principles:

1. **Concepts before tools**  
   Every Kubernetes feature exists to solve a real operational problem.

2. **Write to learn**  
   Each topic is documented in your own words to enforce understanding.

3. **Trade-offs over recipes**  
   Knowing *when not to use something* is as important as knowing how.

4. **Production mindset**  
   Failures, limitations, and operational costs are first-class citizens.

## 📁 Repository Structure

The documentation lives under the `docs/` folder and is structured to be
**fully compatible with GitHub Pages** in the future.

Each phase is isolated, ordered, and readable independently.

```md
docs/
├── index.md
├── 01-fundamentals/
│ ├── index.md
│ ├── what-problem-kubernetes-solves.md
│ ├── control-plane-vs-data-plane.md
│ ├── reconciliation-loop.md
│ └── kubernetes-as-a-distributed-system.md
├── 02-core-objects/
│ └── index.md
├── 03-scheduling-and-resources/
│ └── index.md
├── 04-networking/
│ └── index.md
├── 05-storage/
│ └── index.md
├── 06-config-and-secrets/
│ └── index.md
├── 07-observability/
│ └── index.md
├── 08-security/
│ └── index.md
├── 09-deployment-strategies/
│ └── index.md
└── 10-architecture-cases/
└── index.md
```

> ⚠️ For now, **only Phase 1 is actively implemented**.  
> The other phases contain placeholder `index.md` files for future expansion.

## 🧩 Documentation Standard

Every topic document follows the same structure:

```md
## 1. The Problem This Solves
## 2. Core Concept
## 3. How Kubernetes Implements It
## 4. Key Components and Objects
## 5. Trade-offs and Costs
## 6. Common Failure Scenarios
## 7. How to Debug
## 8. When NOT to Use This
## 9. Interview-Level Questions
```

This format is intentionally designed to match:

- senior engineering reasoning
- system design interviews
- real production troubleshooting

## 🚀 Phase 1 — Fundamentals (Current Focus)

**Phase 1 builds the mental model of Kubernetes.**

Before touching deployments, services, or scaling, it answers:

- What problem does Kubernetes *really* solve?
- Why is Kubernetes not "just a container orchestrator"?
- How does the control loop model work?
- What does "desired state" actually mean?
- Why Kubernetes behaves differently from traditional systems?

📂 Location:

```md
docs/01-fundamentals/
```

📄 Entry point:

```md
docs/01-fundamentals/index.md
```

> You should be able to explain Kubernetes **without mentioning Docker** after finishing this phase.

## 📚 How to Use This Repository

Recommended study flow:

1. Read the `index.md` of the phase
2. Study each topic in order
3. Rewrite concepts in your own words if needed
4. Run small experiments locally (Kind or Minikube)
5. Revisit the **Interview-Level Questions** section

## 🛠️ Tooling (Later Phases)

Tooling is intentionally **de-emphasized early on**.

Later phases will include:

- Kind / Minikube
- kubectl deep dives
- real debugging scenarios
- failure simulations

## 🧠 Final Note

This repository is not meant to be fast.

It is meant to be **solid**.

If you truly understand what is written here, you will:

- stand out in interviews
- make better architectural decisions
- operate Kubernetes with confidence

## 📌 Status

🟢 Phase 1 — In Progress
⚪ Phase 2+ — Planned
