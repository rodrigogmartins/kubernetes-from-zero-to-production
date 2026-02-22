---
quiz:
  auto_number: true
  shuffle_answers: true
---

# Phase 3 - Kubernetes Networking

This phase focuses on **how communication works inside and outside a Kubernetes cluster**.

While previous phases introduced how workloads are created and maintained, this phase explains **how those workloads talk to each other, how traffic flows, and how access is controlled**.

Networking in Kubernetes is not an afterthought — it is a foundational design principle. Every Pod, Service, and external request depends on a consistent and predictable networking model.

## What This Phase Covers

This phase introduces the mechanisms responsible for:

- Assigning network identities to Pods
- Enabling cross-node Pod communication
- Providing stable virtual IPs for dynamic workloads
- Implementing service discovery via DNS
- Routing external HTTP/S traffic into the cluster
- Enforcing security boundaries between workloads

The main concepts covered are:

- **Pod Networking** — every Pod receives a unique IP address
- **kube-proxy** — implements Service virtual IP routing
- **CNI Plugins** — provide the underlying networking implementation
- **Services** — stable access layer for ephemeral Pods
- **DNS (CoreDNS)** — service discovery inside the cluster
- **Ingress** — HTTP/S routing from outside the cluster
- **Network Policies** — traffic filtering and workload isolation

These components together form Kubernetes’ networking model.

## Why Kubernetes Networking Exists

Containers are dynamic and frequently replaced:

- Pods are ephemeral
- IP addresses can change
- Workloads may move between nodes

Without abstraction, this would create:

- Broken service-to-service communication
- Tight coupling between consumers and producers
- Fragile networking tied to infrastructure details

Kubernetes solves this by defining a **flat, cluster-wide networking model** with the following guarantees:

- Every Pod can reach every other Pod (unless restricted)
- Each Pod has a unique IP
- Services provide stable endpoints independent of Pod lifecycle
- DNS provides consistent naming
- Policies can restrict traffic when needed

This design eliminates manual networking configuration and enables portable workloads.

## The Core Mental Model

Kubernetes networking is built on three foundational ideas:

1. **Flat Pod Network**  
   Pods can communicate across nodes without NAT.

2. **Stable Virtual Access via Services**  
   Clients connect to Services, not directly to Pods.

3. **Policy-Driven Security**  
   Traffic is allowed by default but can be restricted explicitly.

The system is layered:

- CNI provides connectivity
- kube-proxy implements Service routing
- DNS enables discovery
- Ingress manages external HTTP/S traffic
- Network Policies enforce boundaries

Each layer solves a specific networking problem.

## How These Components Fit Together

At a high level:

- **Pods** receive unique IP addresses
- **CNI plugins** implement the actual routing and IP allocation
- **kube-proxy** programs node networking rules to support Services
- **Services** provide stable virtual IPs and load balancing
- **CoreDNS** resolves Service names to cluster IPs
- **Ingress** routes HTTP/S traffic into the cluster
- **Network Policies** restrict traffic between Pods

You rarely interact with these pieces independently.  
Their strength lies in how they cooperate to provide reliable, scalable networking.

## Scope and Intent

Following the same approach as earlier phases, this section prioritizes:

- Clear mental models
- Conceptual clarity over implementation detail
- Understanding traffic flow before configuration syntax

YAML definitions and command-line examples are intentionally secondary.  
Hands-on labs will reinforce how traffic moves through the system.

## Check Your Knowledge

<quiz>
What is a core guarantee of Kubernetes Pod networking?
- [x] Every Pod receives a unique IP address
- [x] Pods can communicate across nodes without NAT
- [ ] Pods share the same IP as their node
- [ ] Services assign IPs directly to containers
</quiz>

<quiz>
Why are Services necessary?
- [x] Pods are ephemeral and their IPs can change
- [x] Services provide stable virtual endpoints
- [ ] Services store application state
- [ ] Services replace failed containers
</quiz>

<quiz>
kube-proxy is responsible for:
- [x] Implementing Service virtual IP routing
- [x] Load balancing traffic to Pods
- [ ] Scheduling Pods to nodes
- [ ] Assigning IP addresses to Pods
</quiz>

<quiz>
CNI plugins exist because:
- [x] Kubernetes delegates network implementation details
- [x] Different environments require different networking solutions
- [ ] Pods configure networking themselves
- [ ] Services automatically handle cross-node routing
</quiz>

<quiz>
Ingress differs from a Service because:
- [x] It manages HTTP/S routing rules
- [x] It requires an Ingress Controller
- [ ] It assigns IPs to Pods
- [ ] It replaces kube-proxy
</quiz>

<quiz>
Network Policies are important because:
- [x] They restrict traffic between Pods
- [x] They enable zero-trust models
- [ ] They provide DNS resolution
- [ ] They automatically scale workloads
</quiz>

## References

- [**The Kubernetes Book - Nigel-Poulton**](https://www.amazon.com.br/Kubernetes-Book-Nigel-Poulton/dp/1916585000)