---
quiz:
  auto_number: true
  shuffle_answers: true
---

# Failure Scenarios

## The Problem

Even well-configured clusters can experience failures: node crashes, network partitions, Pod evictions, or resource exhaustion. Developers must understand these to design resilient systems.

## Common Failures

| Failure Type        | Example / Mitigation                                                 |
| ------------------- | -------------------------------------------------------------------- |
| Node failure        | K8s reschedules Pods to healthy nodes automatically.                 |
| Pod crash           | Liveness probes and restartPolicy handle self-healing.               |
| Resource starvation | Requests and limits prevent one Pod from starving others.            |
| Network issues      | Services and DNS allow Pods to continue communicating after failure. |

## Solution

- Use **replicas** to increase availability.  
- Configure **probes** for self-healing.  
- Apply **resource requests/limits** to prevent starvation.  
- Consider **multi-zone deployments** for higher resilience.

## Check Your Knowledge

1. How does Kubernetes handle a Pod crash automatically?  
2. What is the role of replication in mitigating failures?  
3. How do resource limits reduce cascading failures in a cluster?

## Check your knowledge

<quiz>
Which of the following are common failure scenarios in Kubernetes? (Select all that apply)

- [x] Node crash
- [x] Pod crash
- [x] Container image corruption
- [x] Misconfigured service
</quiz>

<quiz>
Scenario: A node fails. What does Kubernetes do with the pods scheduled on that node?

- [x] Reschedules them to healthy nodes
- [ ] Deletes them permanently
- [ ] Leaves them pending indefinitely
- [ ] Automatically scales the node back up
</quiz>

<quiz>
Fill in the blank: Kubernetes ensures [[self-healing]] by automatically rescheduling pods when nodes or pods [[fail]].
</quiz>

<quiz>
Scenario: A deployment has replicas=3. One pod crashes due to memory exhaustion. How does Kubernetes respond?

- [x] Creates a new pod to maintain the desired replica count
- [ ] Deletes all other pods
- [ ] Triggers HPA to scale down
- [ ] Changes the service endpoint
</quiz>

<quiz>
Which of the following help minimize the impact of failures? (Select all that apply)

- [x] Readiness and liveness probes
- [x] Proper resource requests and limits
- [x] Pod anti-affinity rules
- [x] Ignoring failures
</quiz>

<quiz>
Fill in the blank: Using [[replica sets]] and [[self-healing]] mechanisms ensures high availability of critical workloads.
</quiz>

<quiz>
Scenario: A PersistentVolumeClaim becomes unavailable due to node failure. Which strategy helps prevent data loss?

- [x] Use [[ReadWriteMany]] volumes with distributed storage
- [ ] Use emptyDir volumes
- [ ] Ignore PV backup
- [ ] Rely solely on HPA
</quiz>
