---
quiz:
  auto_number: true
  shuffle_answers: true
---

# Kubernetes as a Distributed System

## The Problem

Running applications on a single machine creates limitations:

- Single point of failure
- Limited scalability
- No fault tolerance
- Manual recovery when failures occur

Modern systems require:

- High availability
- Automatic recovery
- Horizontal scalability
- Coordinated state management

You need a distributed architecture.

## The Solution

Kubernetes is designed as a **distributed system**.

It:

- Runs workloads across multiple nodes
- Stores cluster state in a consistent data store
- Automatically replaces failed resources
- Scales horizontally by adding nodes

Instead of one machine doing everything, responsibilities are spread across the cluster.

## Core Distributed Components

### etcd — Cluster State Store

- Distributed key-value store
- Stores desired and current cluster state
- Designed for high availability

If etcd is unavailable, the control plane cannot function correctly.

---

### Nodes

Nodes:

- Execute workloads (Pods)
- Run kubelet and kube-proxy
- Report status to the control plane

Nodes do not store the desired state.
They follow instructions from the control plane.

## Distributed System Principles in Kubernetes

### Replication

- Workloads can run on multiple nodes
- Controllers maintain replica counts
- Improves availability

---

### Decentralization

- Multiple nodes share execution responsibilities
- Control plane components can be replicated
- No single worker node controls the cluster

---

### Resilience

- Failed Pods are recreated
- Failed nodes are detected
- Controllers restore desired state

The system self-heals.

---

### Scalability

- Nodes can be added to increase capacity
- Nodes can be removed to reduce capacity
- Workloads are redistributed as needed

Scaling is horizontal.

## Mental Model

etcd = source of truth  
Control plane = coordination layer  
Nodes = distributed execution layer  

Kubernetes is not a single machine.
It is a coordinated system of machines.

## Common Mistakes

- Thinking a single node runs everything
- Confusing nodes with control plane components
- Assuming Pods are permanent
- Ignoring the role of etcd in availability

Understanding distributed principles makes troubleshooting clearer.

## Check your knowledge

<quiz>
What is the primary data store used by Kubernetes?
- [x] etcd
- [ ] MySQL
- [ ] kubelet
- [ ] Container runtime
</quiz>

<quiz>
Which distributed system principle ensures workloads run on multiple nodes?
- [x] Replication
- [ ] Serialization
- [ ] Virtualization
- [ ] Static allocation
</quiz>

<quiz>
Fill in the blank: Kubernetes stores cluster state in [[etcd]] to ensure [[high availability]].
</quiz>

<quiz>
Which statements about Kubernetes nodes are true? (multiple correct)
- [x] Nodes execute workloads
- [x] Nodes report status to the control plane
- [ ] Nodes store the desired cluster state
- [ ] Nodes manage the API server
</quiz>

<quiz>
How does Kubernetes demonstrate resilience?
- [x] It recreates failed Pods automatically
- [x] It redistributes workloads when nodes fail
- [ ] It prevents all hardware failures
- [ ] It eliminates the need for backups
</quiz>

<quiz>
What enables Kubernetes to scale horizontally?
- [x] Adding or removing nodes from the cluster
- [ ] Increasing container image size
- [ ] Restarting the API server
- [ ] Disabling replication
</quiz>

<quiz>
True or false: In Kubernetes, all workloads run on a single master node.
- [ ] True
- [x] False
</quiz>