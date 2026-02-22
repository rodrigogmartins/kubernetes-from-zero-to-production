---
quiz:
  auto_number: true
  shuffle_answers: true
---

# Phase 4 - Storage in Kubernetes

This phase focuses on **how Kubernetes handles persistent data in a world of ephemeral containers**.

While previous phases explained how workloads run and communicate, this phase explains **how data survives Pod restarts, rescheduling, and scaling events**.

Containers are disposable by design. Storage is not.  
This phase bridges that gap.

## What This Phase Covers

This phase introduces the primitives responsible for:

- Providing data persistence beyond container lifecycle
- Decoupling storage from individual Pods
- Dynamically provisioning storage resources
- Supporting stateful workloads with stable identities

The main primitives covered are:

- **Volumes** — storage attached directly to Pods
- **Persistent Volumes (PV)** — cluster-level storage resources
- **Persistent Volume Claims (PVC)** — requests for persistent storage
- **Storage Classes** — declarative dynamic provisioning policies
- **StatefulSets** — workload controller for stateful applications

These primitives enable Kubernetes to support databases, message queues, and other stateful systems reliably.

## Why Storage Primitives Exist

Containers are ephemeral:

- Files inside a container disappear when it restarts
- Pods can be rescheduled to different nodes
- Local disk is not portable across nodes

Without abstraction, this leads to:

- Data loss
- Tight coupling between compute and storage
- Manual infrastructure management
- Fragile stateful deployments

Kubernetes solves this by separating **compute lifecycle** from **storage lifecycle**.

Persistent storage becomes an independent resource that Pods can attach to, detach from, and reattach when rescheduled.

This preserves durability while maintaining Kubernetes’ declarative model.

## The Core Mental Model

Storage in Kubernetes follows a layered abstraction:

1. **Volumes** attach storage to a Pod.
2. **Persistent Volumes (PV)** represent real storage resources in the cluster.
3. **Persistent Volume Claims (PVC)** request and bind storage declaratively.
4. **Storage Classes** define how storage is dynamically provisioned.
5. **StatefulSets** coordinate stable identity and persistent storage for Pods.

The key principle is:

> Storage should outlive the Pod that uses it.

Compute is ephemeral.  
Storage is durable.  
Kubernetes ensures they interact safely.

## How These Primitives Fit Together

At a high level:

- A **PVC** declares a storage requirement
- Kubernetes binds the PVC to a **PV**
- A Pod mounts the PVC as a **Volume**
- If the Pod is rescheduled, it reattaches the same persistent storage
- A **Storage Class** can automatically provision new PVs
- A **StatefulSet** ensures each Pod gets its own stable volume and identity

These components cooperate to support stateful workloads without sacrificing declarative control.

## Scope and Intent

Following the same structured approach:

- Emphasis is placed on mental models over configuration syntax
- Storage behavior is explained before YAML details
- Dynamic provisioning is introduced conceptually before implementation

Hands-on labs will reinforce how storage binding, provisioning, and reattachment work in practice.

## Check Your Knowledge

<quiz>
Why are Volumes necessary?
- [x] Containers lose data when they restart
- [x] Pods are ephemeral
- [ ] Volumes schedule Pods to nodes
- [ ] Volumes replace Deployments
</quiz>

<quiz>
Persistent Volumes (PV) and Persistent Volume Claims (PVC) allow:
- [x] Decoupling storage from Pod lifecycle
- [x] Durable storage across restarts
- [ ] Automatic Pod scaling
- [ ] Service load balancing
</quiz>

<quiz>
What happens if a Pod using a PVC is deleted?
- [x] The PVC can remain bound to the PV
- [x] A new Pod can reattach to the same storage
- [ ] The data is automatically erased
- [ ] The PV is always deleted immediately
</quiz>

<quiz>
Storage Classes are important because:
- [x] They enable dynamic provisioning
- [x] They define storage policies declaratively
- [ ] They manage container networking
- [ ] They expose Pods externally
</quiz>

<quiz>
StatefulSets are used when:
- [x] Pods require stable network identity
- [x] Each replica needs persistent storage
- [ ] Stateless applications need scaling
- [ ] You only need rolling updates
</quiz>

## References

- [**The Kubernetes Book - Nigel-Poulton**](https://www.amazon.com.br/Kubernetes-Book-Nigel-Poulton/dp/1916585000)