---
quiz:
  auto_number: true
  shuffle_answers: true
---

# Failure Scenarios

## Why Failures Matter

Failures are not edge cases.

They are guaranteed.

Nodes crash.  
Containers leak memory.  
Networks partition.  
Storage fails.  

If you design assuming perfection, your system will break.

Resilience in Kubernetes comes from understanding failure patterns and designing for them.

## Common Failure Types

### 1. Node Failure

What happens:

- Node becomes NotReady
- Pods on that node stop responding

Kubernetes response:

- Controller marks Pods as failed
- Scheduler reschedules them to healthy nodes
- Replica count is restored

Mitigation:

- Use replicas
- Spread Pods across nodes
- Use anti-affinity rules

---

### 2. Pod Crash

Causes:

- Application bug
- OOMKill
- Misconfiguration

Kubernetes response:

- Restart container (based on restartPolicy)
- Liveness probes trigger restarts
- ReplicaSet ensures desired count

Mitigation:

- Liveness probes
- Readiness probes
- Proper resource limits

---

### 3. Resource Starvation

One Pod consumes:

- Excess CPU
- Excess memory

Impact:

- Other Pods slow down or crash
- Node instability

Mitigation:

- Define requests and limits
- Prevent noisy neighbor problems
- Use resource quotas at namespace level

Without limits, cascading failures happen.

---

### 4. Network Issues

Examples:

- DNS failure
- Service misconfiguration
- NetworkPolicy blocking traffic

Mitigation:

- Readiness probes to remove broken Pods from Service
- Replicas for redundancy
- Monitoring and alerting

---

### 5. Storage Failure

Examples:

- Node hosting volume fails
- Cloud disk detached
- PVC stuck Pending

Mitigation:

- Distributed storage
- Multi-zone deployment
- RWX-backed storage when appropriate
- Backups

Storage is often the weakest link in resilience.

## Core Resilience Mechanisms

### Replication

More replicas = higher availability.

If one fails:

- Others continue serving traffic

Single replica = single point of failure.

---

### Self-Healing

Controllers constantly reconcile desired state.

If something deviates:

- Kubernetes corrects it

This is automatic — but only if configured correctly.

---

### Probes

- Liveness → Restart unhealthy container
- Readiness → Remove Pod from Service endpoints
- Startup → Protect slow-start apps

Probes prevent broken Pods from serving traffic.

---

### Multi-Zone Strategy

Spread workloads across:

- Nodes
- Availability zones
- Failure domains

Failure should reduce capacity — not cause outage.

## Mental Model

Assume:

- Nodes will die
- Pods will crash
- Traffic will spike
- Storage will fail

Design for:

- Replacement
- Redundancy
- Isolation
- Recovery

Resilience is architecture, not luck.

## Common Design Mistakes

- Running single replica in production
- No resource limits
- No readiness probes
- All replicas on same node
- No backups for stateful workloads

These are not rare mistakes.
They are the most common causes of outages.

## Check Your Knowledge

<quiz>
Why is running only one replica risky in production?
- [x] It creates a single point of failure
- [ ] It prevents scaling
- [ ] It increases CPU usage
- [ ] It disables Services
</quiz>

<quiz>
What happens if a liveness probe continuously fails?
- [x] The container is restarted
- [ ] The Service IP changes
- [ ] The PVC is deleted
- [ ] The Deployment is removed
</quiz>

<quiz>
Scenario: A node crashes and all replicas were scheduled on it. What happens?
- [x] Pods are rescheduled, but downtime occurs until they start
- [ ] Nothing happens
- [ ] Services automatically change IP
- [ ] HPA scales to zero
</quiz>

<quiz>
How do resource limits prevent cascading failures?
- [x] They stop one Pod from consuming all node resources
- [ ] They increase replica count
- [ ] They encrypt traffic
- [ ] They create backups
</quiz>

<quiz>
Which strategies improve resilience? (Select all that apply)
- [x] Multiple replicas
- [x] Pod anti-affinity
- [x] Multi-zone deployment
- [ ] Ignoring readiness probes
</quiz>

<quiz>
Fill in the blank: High availability is achieved through [[replication]] and Kubernetes’ [[self-healing]] control loops.
</quiz>

<quiz>
Scenario: You need to prevent data loss during node failure for a database workload. What is critical?
- [x] Use distributed or replicated storage
- [ ] Use emptyDir
- [ ] Disable liveness probes
- [ ] Reduce replicas to one
</quiz>

## References

- Kubernetes Documentation – Cluster Resilience  
- The Kubernetes Book – Nigel Poulton