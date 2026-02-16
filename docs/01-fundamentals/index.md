# Phase 1 - Kubernetes Fundamentals

This phase builds the **mental model of Kubernetes**, preparing you to understand how it deploys, scales, and connects workloads.

Before learning YAML, kubectl commands, or real deployments, it is critical to grasp:

- **Why Kubernetes exists**
- **What problems it solves**
- **How it thinks and reacts**

Skipping this step leads to misunderstandings later.

## What This Phase Covers

- **Desired State vs Current State**  
- **Reconciliation Loops**  
- **Control Plane vs Data Plane**  
- **Controllers and Control Theory**  
- **Kubernetes as a Distributed System**  
- **Why failures are expected, not exceptional**

## Why These Concepts Matter

Containers are ephemeral, dynamic, and stateless. Kubernetes introduces **abstractions** to:

- Ensure self-healing and high availability  
- Maintain the desired number of workloads  
- Provide stable networking  
- Automate scaling and updates

Kubernetes continuously reconciles reality to your **declared desired state**, rather than executing sequential commands.

## How to Use This Phase

1. Read each document in order  
2. Take notes and rephrase concepts in your own words  
3. Explain ideas aloud to solidify understanding  
4. Observe how Kubernetes behaves in labs  

The focus is **conceptual mastery**, not operational skills yet.

## Documents in This Phase

1. **What Problem Kubernetes Solves** — why traditional deployments fail  
2. **Control Plane vs Data Plane** — who decides vs who executes  
3. **Reconciliation Loop** — how the system self-corrects  
4. **Kubernetes as a Distributed System** — why failures, latency, and partial truths are normal  
5. **Pods vs Containers** — the smallest schedulable unit  
6. **Kubernetes Architecture Overview** — layered, modular design

## Outcome

After this phase, you should be able to:

- Explain Kubernetes **conceptually**, without mentioning Docker or YAML  
- Reason about failures and self-healing  
- Understand how controllers enforce desired state  
- Prepare for hands-on deployment and networking concepts in Phase 2
