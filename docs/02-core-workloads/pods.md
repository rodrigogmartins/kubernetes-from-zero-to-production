---
quiz:
  auto_number: true
  shuffle_answers: true
---

# Pods

## The Problem

Containers alone are not enough in a distributed system.

Kubernetes must decide:

- Where workloads run
- How they share networking
- How tightly coupled containers operate together
- How to replace failed instances

Treating individual containers as first-class scheduling units would make orchestration fragile.

You need a stable execution boundary.

## The Solution

**Pods** are the smallest deployable units in Kubernetes.

They:

- Wrap one or more containers
- Are scheduled as a single unit
- Share networking (same IP, same port space)
- Can share storage volumes
- Start and stop together

Pods provide a consistent runtime environment.

They are the atomic scheduling unit.

## Single-Container vs Multi-Container Pods

Most Pods run:

- One container

Why?

- Simpler lifecycle
- Cleaner scaling
- Easier debugging
- Clear responsibility boundaries

Multi-container Pods are used only when containers are tightly coupled.

Common case:

- Sidecar pattern (logging, metrics, proxies)

If containers can scale independently, they should not share a Pod.

## Shared Environment

Containers inside a Pod:

- Share the same IP address
- Communicate via `localhost`
- Can share mounted volumes
- Share the same lifecycle

They are co-located by design.

This is intentional coupling.

## Ephemeral Nature

Pods are:

- Replaceable
- Disposable
- Not repaired

If a Pod fails:

- It is recreated
- It receives a new IP
- Higher-level controllers restore desired state

Do not rely on Pod identity.

Rely on controllers.

## What Pods Do NOT Handle

Pods do not:

- Self-scale
- Provide rolling updates
- Maintain replica counts
- Guarantee high availability

That is the job of:

- ReplicaSets
- Deployments
- StatefulSets

Pods are execution units, not lifecycle managers.

## When to Create Pods Directly

Valid cases:

- Learning Kubernetes
- Debugging
- One-off testing
- Temporary jobs

In production:

Use controllers.

Manual Pod management does not scale operationally.

## Mental Model

Container = process  
Pod = execution environment  
Controller = lifecycle management  

Pods are the boundary between application runtime and orchestration logic.

## Common Mistakes

- Scaling Pods manually
- Assuming Pod IP is stable
- Overusing multi-container Pods
- Treating Pods as durable infrastructure

Pods are meant to be disposable.

Design for replacement, not repair.

## Check your knowledge

<quiz>
What is the primary purpose of a Pod in Kubernetes?
- [x] To group one or more containers that share resources and a network namespace
- [ ] To provide persistent storage
- [ ] To schedule nodes
- [ ] To handle cluster-wide load balancing
</quiz>

<quiz>
Which of the following are true about Pods? (multiple correct)
- [x] Pods are ephemeral
- [x] Pods share networking and optionally storage between containers
- [ ] Pods are responsible for self-scaling
- [ ] Pods provide DNS for services
</quiz>

<quiz>
Fill in the blank: Containers in the same Pod communicate using [[localhost]] and share [[volumes]].
</quiz>

<quiz>
Scenario: You need a container that logs metrics for another container running in the same Pod. Which pattern should you use?
- [x] Sidecar pattern
- [ ] Singleton pattern
- [ ] ReplicaSet pattern
- [ ] NodePort pattern
</quiz>

<quiz>
Most Pods run a single container. Why?
- [x] Simplifies lifecycle and scaling
- [ ] Reduces network usage
- [ ] Avoids using volumes
- [ ] Enables multiple IPs per container
</quiz>

<quiz>
Scenario: A Pod fails. What happens?
- [x] Kubernetes recreates it through its controller
- [ ] The container inside the Pod is repaired
- [ ] The node is automatically replaced
- [ ] The IP address of the Pod remains the same
</quiz>

<quiz>
Pods are not intended to be manually managed in production. True or false?
- [x] True
- [ ] False
</quiz>

<quiz>
Which of these are valid use cases for creating Pods directly? (multiple correct)
- [x] Debugging
- [x] Learning Kubernetes concepts
- [x] One-off jobs
- [ ] Production deployments
</quiz>

<quiz>
Fill in the blank: Pods are the unit of [[scheduling]] in Kubernetes, not [[replication]].
</quiz>

## References

- Kubernetes Documentation – Pods  
- Kubernetes Up & Running – Burns, Beda, Hightower