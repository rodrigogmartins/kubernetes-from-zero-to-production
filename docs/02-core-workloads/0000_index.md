# Phase 2 — Core Workloads & Networking Primitives

This phase focuses on the **core Kubernetes primitives used to run applications and connect them to the network**.

According to *The Kubernetes Book*, Kubernetes is best understood by starting with a **small set of simple building blocks** and learning how they work together. This phase introduces those building blocks.

While Phase 1 explained *why Kubernetes exists* and *how it behaves as a system*, Phase 2 explains **how applications are actually deployed, kept alive, and reached by users**.

## What This Phase Covers

This phase introduces the fundamental objects responsible for:

- Running containers reliably
- Maintaining the desired number of application instances
- Performing safe updates and rollbacks
- Providing stable networking for ephemeral workloads
- Exposing applications inside and outside the cluster

The main primitives covered are:

- **Pods**
- **ReplicaSets**
- **Deployments**
- **Services**
- **Ingress**

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

Kubernetes solves these problems by introducing **higher-level abstractions** that manage containers indirectly, allowing the platform to replace, reschedule, and reconnect them automatically.

This aligns with a key idea from *The Kubernetes Book*:  
> You should treat containers as **cattle, not pets**.

## The Core Mental Model

Kubernetes works by **declaring desired state**, not by executing step-by-step instructions.

You describe *what you want* (for example, “three instances of this application”), and Kubernetes continuously works to make reality match that description.

These primitives form a **layered model**:

- Pods define *what runs*
- Controllers define *how many should run*
- Services define *how they are reached*
- Ingress defines *how external traffic enters*

Each layer builds on the one below it.

## How These Primitives Fit Together

At a high level:

- **Pods** run one or more containers
- **ReplicaSets** ensure a specific number of Pods exist
- **Deployments** manage ReplicaSets and application updates
- **Services** provide stable networking to Pods
- **Ingress** manages HTTP routing from outside the cluster

You rarely interact with these objects in isolation.  
Their value comes from **how they cooperate**.

## Scope and Intent

Following the approach of *The Kubernetes Book*, this phase prioritizes:

- Clear mental models
- Practical reasoning
- Conceptual understanding over syntax

Command-line usage and YAML definitions are intentionally secondary.  
Hands-on labs will reinforce these concepts after the fundamentals are clear.

## References

- [**The Kubernetes Book - Nigel-Poulton**](https://www.amazon.com.br/Kubernetes-Book-Nigel-Poulton/dp/1916585000)
