---
quiz:
  auto_number: true
  shuffle_answers: true
---

# Reconciliation Loop

Kubernetes operates on a **declarative model**:

1. You declare **desired state**
2. Kubernetes continuously observes the **current state**
3. It reconciles differences by creating, updating, or deleting resources

This loop is the **heart of Kubernetes**, ensuring the system is self-healing and resilient.

## Why It Matters

- If a Pod crashes, the controller **creates a new one**  
- If you scale a Deployment, Kubernetes adjusts the number of Pods automatically  
- The loop enables **automation and reliability** at scale

## Quiz

<quiz>
The reconciliation loop ensures:
- [x] The current state matches the desired state
- [ ] The user manually adjusts every Pod
- [ ] Pods never fail
- [ ] Nodes are always static
</quiz>

<quiz>
If a Pod dies, Kubernetes:
- [x] Creates a replacement Pod
- [ ] Repairs the existing Pod
- [ ] Ignores it
- [ ] Restarts the entire node
</quiz>

<quiz>
Fill the blank: The [[controller]] continuously checks resources to reconcile them with the [[desired state]].
</quiz>

<quiz>
Which Kubernetes object typically participates in the reconciliation loop?
- [x] ReplicaSet
- [x] Deployment
- [ ] Docker container running locally
</quiz>

<quiz>
Why is the reconciliation loop important?
- [x] Enables self-healing and scaling
- [x] Maintains automation
- [ ] Provides a user interface
</quiz>