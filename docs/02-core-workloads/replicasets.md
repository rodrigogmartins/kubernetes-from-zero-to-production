---
quiz:
  auto_number: true
  shuffle_answers: true
---

# ReplicaSets

## The Problem

Pods are ephemeral.

If a Pod:

- Crashes
- Is deleted
- Is evicted
- Node fails

Nothing guarantees it will come back.

Running a single Pod in production is fragile.

You need automated replacement.

## The Solution

A **ReplicaSet** ensures a defined number of identical Pods are always running.

You declare:

```yaml
replicas: 3
```

Kubernetes ensures:

Exactly 3 matching Pods exist.

If one disappears:

A new one is created automatically.

This is self-healing.

## What ReplicaSets Actually Do

ReplicaSets:

- Monitor matching Pods using label selectors
- Create new Pods if replicas < desired
- Delete excess Pods if replicas > desired

They maintain quantity.

They do not manage rollout strategy.

## Relationship with Deployments

In real production:

You rarely create ReplicaSets directly.

Deployments:

- Create ReplicaSets
- Manage updates between them
- Handle rolling updates and rollbacks

ReplicaSets handle stability.
Deployments handle evolution.

## What ReplicaSets Do NOT Do

ReplicaSets do not:

- Perform rolling updates
- Track revision history
- Automatically change container images
- Provide scaling policies

They only ensure replica count.

If you change the Pod template directly:

A new ReplicaSet must be created (usually by a Deployment).

## Scaling ReplicaSets

You can scale by:

- Updating `spec.replicas`
- Scaling via a Deployment
- Using Horizontal Pod Autoscaler (HPA)

ReplicaSets respond by adjusting Pod count.

## Label Selectors Matter

ReplicaSets use label selectors to match Pods.

If labels overlap incorrectly:

You can accidentally manage unintended Pods.

Careless label design causes production issues.

Be precise.

## Mental Model

Pod = single instance  
ReplicaSet = ensures count  
Deployment = manages change  

ReplicaSets provide redundancy.
They are the self-healing foundation.

## Common Mistakes

- Creating ReplicaSets directly in production
- Misconfiguring label selectors
- Assuming ReplicaSets handle updates
- Forgetting that Pods are replaced, not repaired

ReplicaSets enforce desired state.
They do not manage application lifecycle changes.

## Check your knowledge

<quiz>
What is the main function of a ReplicaSet?
- [x] Maintain a specified number of Pod replicas
- [ ] Manage persistent volumes
- [ ] Control service routing
- [ ] Schedule nodes
</quiz>

<quiz>
Scenario: A Pod managed by a ReplicaSet crashes. What happens?
- [x] The ReplicaSet creates a new Pod
- [ ] The existing Pod is repaired
- [ ] All Pods are terminated
- [ ] Nothing happens automatically
</quiz>

<quiz>
Fill in the blank: ReplicaSets define the [[number]] of Pod [[replicas]] to run.
</quiz>

<quiz>
Which of the following are valid ways to scale a ReplicaSet? (multiple correct)
- [x] Manually updating the replica count
- [x] Via a Deployment
- [ ] Changing the Pod's container image without updating ReplicaSet
- [ ] Directly deleting nodes
</quiz>

<quiz>
True or false: ReplicaSets can self-update Pods automatically.
- [ ] True
- [x] False
</quiz>

<quiz>
Scenario: You need to maintain exactly 3 identical Pods at all times. Which resource ensures this?
- [x] ReplicaSet
- [ ] Pod
- [ ] Deployment
- [ ] StatefulSet
</quiz>

## References

- Kubernetes Documentation – ReplicaSets  
- Kubernetes Up & Running – Burns, Beda, Hightower