---
quiz:
  auto_number: true
  shuffle_answers: true
---

# StatefulSets

## What Problem StatefulSets Solve

Some workloads are not interchangeable.

Databases, distributed systems, and queues often require:

- Stable Pod identities
- Persistent storage per replica
- Ordered startup and shutdown
- Predictable scaling behavior

A Deployment treats Pods as identical and disposable.

Stateful applications cannot rely on that model.

## The Solution

StatefulSets provide:

- Stable Pod names (`app-0`, `app-1`, `app-2`)
- Stable DNS identities
- Dedicated PVC per Pod
- Ordered creation and termination

Each replica is unique and consistent over time.

## Core Guarantees

### 1. Stable Identity

Each Pod gets:

- A predictable name
- A stable hostname
- A stable DNS record (via Headless Service)

Even if rescheduled:

- The Pod keeps the same identity

---

### 2. Stable Storage

StatefulSets use:

- `volumeClaimTemplates`

For each replica:

- A unique PVC is automatically created
- The PVC sticks to that Pod identity

If the Pod is deleted:

- The PVC remains
- Data is preserved

When recreated:

- The Pod reattaches to the same volume

---

### 3. Ordered Deployment & Scaling

StatefulSets:

- Start Pods sequentially (`0 → 1 → 2`)
- Terminate Pods in reverse order
- Scale up and down deterministically

This is critical for:

- Leader election systems
- Distributed consensus clusters
- Databases requiring bootstrap ordering

## Headless Services

StatefulSets typically use:

- A Headless Service (`clusterIP: None`)

This enables:

- Direct DNS resolution per Pod
- Stable network identity

Example DNS pattern:

```md
pod-0.service-name.namespace.svc.cluster.local
```

Applications can address specific replicas directly.

## When to Use StatefulSet

Use StatefulSet when:

- You need stable network identity
- Each replica needs its own storage
- Order of startup/shutdown matters
- Replicas are not interchangeable

Do NOT use it for:

- Stateless APIs
- Web frontends
- Simple scalable workers

Use Deployments for those.

## Mental Model

Deployment = Cattle  
StatefulSet = Pets  

Deployments replace Pods freely.  
StatefulSets preserve identity and state.

Choose based on workload behavior, not habit.

## Common Failure Scenarios

- Forgetting Headless Service → DNS not stable
- PVC provisioning fails → Pods stuck Pending
- Scaling down deletes Pod but PVC remains (by design)
- Assuming replicas are identical (they are not)

Always check:

1. PVC status
2. StorageClass
3. DNS resolution
4. Pod ordering

## Check Your Knowledge

<quiz>
Why are Pods in a StatefulSet not interchangeable?
- [x] Each Pod has a stable identity and storage
- [ ] They share the same IP
- [ ] They cannot be rescheduled
- [ ] They do not use Services
</quiz>

<quiz>
What enables stable DNS for StatefulSet Pods?
- [x] A Headless Service
- [ ] NodePort
- [ ] LoadBalancer
- [ ] Ingress
</quiz>

<quiz>
Scenario: A StatefulSet Pod is deleted. What happens to its PVC?
- [x] It remains and is reused when the Pod is recreated
- [ ] It is deleted immediately
- [ ] It is shared with another Pod
- [ ] It is converted to emptyDir
</quiz>

<quiz>
In what order are StatefulSet Pods terminated when scaling down?
- [x] Reverse order (highest index first)
- [ ] Random order
- [ ] All at once
- [ ] Alphabetical order
</quiz>

<quiz>
Scenario: You are deploying a distributed database requiring node-0 to initialize before others join. Which resource is appropriate?
- [x] StatefulSet
- [ ] Deployment
- [ ] DaemonSet
- [ ] ReplicaSet
</quiz>

<quiz>
Fill in the blank: StatefulSets are ideal for [[stateful applications]] that require [[stable network identity]] and [[persistent storage]].
</quiz>

## References

- Kubernetes Documentation – StatefulSets  
- The Kubernetes Book – Nigel Poulton