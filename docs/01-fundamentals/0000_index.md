# Phase 1 — Fundamentals: Building the Kubernetes Mental Model

## Purpose of This Phase

This phase exists to build a **correct mental model of Kubernetes**.

Before learning *how to deploy*, *how to scale*, or *how to expose services*, it is critical to understand **why Kubernetes exists**, **what problems it actually solves**, and **how it thinks**.

Most Kubernetes misunderstandings come from skipping this step.

## What This Phase Is (and Is Not)

### This phase **IS** about

- Understanding Kubernetes as a **distributed system**
- Learning the **control loop model**
- Internalizing the concept of **desired state**
- Distinguishing **control plane vs data plane**
- Reasoning about Kubernetes behavior, not memorizing commands

### This phase **IS NOT** about

- Writing YAML manifests
- Learning kubectl commands
- Deploying real applications
- Optimizing performance
- Using Helm, Argo, or cloud providers

Those come later — **after the foundation is solid**.

## The Core Question of Phase 1

> **What fundamental problem does Kubernetes solve that traditional deployment models cannot?**

Every document in this phase helps answer that question from a different angle.

If you finish Phase 1 and cannot clearly explain:

- *why Kubernetes is needed*
- *why it behaves the way it does*
- *why it sometimes feels “complex”*

then the foundation is not complete yet.

## Key Concepts You Must Master

By the end of this phase, you should deeply understand:

- **Desired State vs Current State**
- **Reconciliation loops**
- **Controllers and control theory**
- **Why Kubernetes is declarative**
- **Why Kubernetes does not guarantee immediate correctness**
- **Why failures are expected, not exceptional**

These concepts are reused everywhere in Kubernetes.

## How Kubernetes Thinks

Kubernetes does not:

- execute commands
- guarantee immediate outcomes
- manage containers directly

Instead, Kubernetes:

- continuously **observes reality**
- compares it to a **declared desired state**
- tries to **converge**, not enforce

This mindset shift is essential.

## Documents in This Phase

You should read these documents **in order**:

1. **What Problem Kubernetes Actually Solves**  
   Why Kubernetes exists and what breaks without it.

2. **Control Plane vs Data Plane**  
   Who decides vs who executes.

3. **The Reconciliation Loop**  
   How Kubernetes constantly corrects the system.

4. **Kubernetes as a Distributed System**  
   Why latency, failures, and partial truth are normal.

Each document builds on the previous one.

## Expected Outcome

After completing Phase 1, you should be able to:

- Explain Kubernetes **without mentioning Docker**
- Describe Kubernetes behavior using **system thinking**
- Predict how Kubernetes will react to failures
- Answer interview questions about Kubernetes **conceptually**, not operationally

A good self-test:

> *“Explain Kubernetes to a senior engineer without using the words container, pod, or YAML.”*

If you can do that — you are ready for Phase 2.

## How to Study This Phase

Recommended approach:

1. Read slowly
2. Take notes in your own words
3. Re-read after a few days
4. Explain concepts out loud
5. Challenge assumptions

Do not rush.

This phase defines how effective all future learning will be.

## Next Step

Start with:

```md
docs/01-fundamentals/what-problem-kubernetes-solves.md
```

Everything else builds on that understanding.
