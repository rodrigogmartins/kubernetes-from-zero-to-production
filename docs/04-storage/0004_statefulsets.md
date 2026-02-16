---
quiz:
  auto_number: true
  shuffle_answers: true
---

# StatefulSets

## The Problem

Some applications (databases, queues) require:

- Stable network identities (DNS names).  
- Persistent storage that survives Pod rescheduling.  
- Ordered deployment and scaling.

A regular Deployment does not provide these guarantees.

## Solution

**StatefulSets** manage Pods with stable identifiers and persistent storage:

- Each Pod gets a stable **name** and **network ID**.  
- PVCs are provisioned per Pod automatically using StatefulSet templates.  
- Pods are created, scaled, or deleted in a **deterministic order**.

## Check Your Knowledge

1. How does StatefulSet maintain stable storage for Pods?  
2. When would you use a StatefulSet instead of a Deployment?

## Check your knowledge

<quiz>
What is a key difference between a Deployment and a StatefulSet?

- [x] StatefulSet provides stable network IDs and persistent storage
- [ ] Deployment guarantees pod IPs remain the same
- [ ] StatefulSet cannot scale
- [ ] Deployment uses PVs automatically
</quiz>

<quiz>
Scenario: You have a database pod that requires stable storage. Which resource should you use?

- [x] StatefulSet with PVC
- [ ] Deployment
- [ ] ReplicaSet
- [ ] DaemonSet
</quiz>

<quiz>
Fill in the blank: Pods in a StatefulSet are given [[stable, unique identifiers]] and are managed in a [[deterministic order]].
</quiz>

<quiz>
Which of these can be combined with a StatefulSet? (Select all that apply)

- [x] PersistentVolumeClaims
- [x] Headless Services
- [ ] NetworkPolicies
- [ ] ConfigMaps only
</quiz>

<quiz>
Scenario: A StatefulSet scales from 3 to 5 replicas. What happens to PVCs?

- [x] Two new PVCs are created for the new pods
- [ ] Existing PVCs are deleted
- [ ] PVCs are shared across pods
- [ ] No PVC is created automatically
</quiz>
