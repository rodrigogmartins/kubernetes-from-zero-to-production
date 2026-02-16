---
quiz:
  auto_number: true
  shuffle_answers: true
---

# Phase 2 - Core Workloads & Networking Primitives

This phase focuses on the **core Kubernetes primitives used to run applications and connect them to the network**.

According to *The Kubernetes Book*, Kubernetes is best understood by starting with a **small set of simple building blocks** and learning how they work together. Phase 2 introduces those blocks in a practical context.

While Phase 1 explained *why Kubernetes exists* and *how it behaves as a system*, Phase 2 explains **how applications are actually deployed, kept alive, and reached by users**.

## What This Phase Covers

This phase introduces the fundamental objects responsible for:

- Running containers reliably
- Maintaining the desired number of application instances
- Performing safe updates and rollbacks
- Providing stable networking for ephemeral workloads
- Exposing applications inside and outside the cluster

The main primitives covered are:

- **Pods** — the basic unit that runs one or more containers
- **ReplicaSets** — ensure a specific number of Pods are running
- **Deployments** — manage ReplicaSets and perform updates safely
- **Services** — provide stable networking for ephemeral Pods
- **Ingress** — expose applications externally via HTTP/S

These objects appear in almost every Kubernetes cluster, regardless of size or environment.

## Why These Primitives Exist

Containers are lightweight and disposable by design:

- They can fail at any time
- They are frequently replaced
- Their IP addresses are not stable

On their own, containers lack:

- Self-healing
- High availability
- Stable networking
- Safe upgrade mechanisms

Kubernetes solves these problems by introducing **higher-level abstractions** that manage containers indirectly, allowing the platform to:

- Replace failed containers automatically
- Ensure a desired number of replicas exist
- Connect containers reliably with stable networking
- Perform updates without downtime

This aligns with a key idea from *The Kubernetes Book*:  
> You should treat containers as **cattle, not pets**.

## The Core Mental Model

Kubernetes works by **declaring desired state**, not by executing step-by-step instructions.

You describe *what you want* (for example, “three instances of this application”), and Kubernetes continuously works to make reality match that description.

These primitives form a **layered model**:

- Pods define *what runs* and *how it runs*
- Controllers (ReplicaSets, Deployments) define *how many should run* and *how updates happen*
- Services define *how Pods are reached*
- Ingress defines *how external traffic enters*

Each layer builds on the one below it, solving specific container challenges.

## How These Primitives Fit Together

At a high level:

- **Pods** run one or more containers on a node
- **ReplicaSets** ensure a specific number of Pods exist and restart them if needed
- **Deployments** manage ReplicaSets, rolling updates, and rollbacks
- **Services** provide stable networking endpoints for Pods
- **Ingress** manages HTTP/S routing from outside the cluster

You rarely interact with these objects in isolation. Their value comes from **how they cooperate** to make applications resilient and reachable.

## Scope and Intent

Following the approach of *The Kubernetes Book*, this phase prioritizes:

- Clear mental models
- Practical reasoning
- Conceptual understanding over syntax

Command-line usage and YAML definitions are intentionally secondary.  
Hands-on labs will reinforce these concepts after the fundamentals are clear.

## Check Your Knowledge

<quiz>
Which object ensures a specific number of Pods are running?
- [x] ReplicaSet
- [ ] Deployment
- [ ] Service
- [ ] Ingress
</quiz>

<quiz>
Pods are ephemeral. What does this mean?
- [x] Their IP addresses and instances can change
- [x] They can be terminated and replaced at any time
- [ ] They always keep internal state
- [ ] They manage other Pods automatically
</quiz>

<quiz>
Deployments solve which of the following problems?
- [x] Rolling updates with minimal downtime
- [x] Automatic rollback on failure
- [ ] Exposing Pods externally via HTTP
- [ ] Directly scheduling containers onto nodes
</quiz>

<quiz>
Services provide stable networking for Pods because:
- [x] Pods are ephemeral and can be replaced
- [x] Pod IP addresses are not stable
- [ ] They store application state
- [ ] They perform container updates
</quiz>

<quiz>
Ingress resources:
- [x] Define HTTP/S routing rules
- [x] Require an Ingress Controller to implement routing
- [ ] Automatically replicate Pods
- [ ] Replace failed containers
</quiz>

## References

- [**The Kubernetes Book - Nigel-Poulton**](https://www.amazon.com.br/Kubernetes-Book-Nigel-Poulton/dp/1916585000)
