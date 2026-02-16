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
