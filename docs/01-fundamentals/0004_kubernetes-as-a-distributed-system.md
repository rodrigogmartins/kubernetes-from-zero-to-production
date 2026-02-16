---
quiz:
  auto_number: true
  shuffle_answers: true
---

# Kubernetes as a Distributed System

Kubernetes is designed as a **distributed system**:

- Multiple nodes coordinate to run workloads
- State is stored in **etcd**, a highly available key-value store
- The system is resilient to node failures

## Key Principles

- **Replication** — workloads run on multiple nodes  
- **Decentralization** — control plane components may be distributed  
- **Resilience** — self-healing mechanisms automatically replace failed resources  
- **Scalability** — cluster can grow or shrink by adding/removing nodes

## Quiz

<quiz>
What is the main data store of Kubernetes?
- [x] etcd
- [ ] MySQL
- [ ] kubelet
- [ ] Docker registry
</quiz>

<quiz>
Distributed systems principles applied by Kubernetes include: (select all that apply)
- [x] Replication
- [x] Resilience
- [x] Scalability
- [ ] Synchronous I/O
</quiz>

<quiz>
Fill the blank: Kubernetes stores cluster state in [[etcd]] to ensure [[high availability]].
</quiz>

<quiz>
Which of these are true about Kubernetes nodes?
- [x] Nodes execute workloads
- [x] Nodes report status to the control plane
- [ ] Nodes store the desired state
- [ ] Nodes manage the API server
</quiz>

<quiz>
Why is Kubernetes considered a distributed system?
- [x] Workloads are spread across multiple nodes
- [x] System remains operational despite node failures
- [ ] All Pods run on a single master
</quiz>