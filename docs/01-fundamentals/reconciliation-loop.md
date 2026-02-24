---
quiz:
  auto_number: true
  shuffle_answers: true
---

# Reconciliation Loop

## The Problem

In a distributed system:

- Pods can crash
- Nodes can fail
- Network issues can occur
- Manual intervention does not scale

If operators had to monitor and fix every issue manually, the system would be unreliable and slow.

You need continuous automated correction.

## The Solution

Kubernetes operates on a **declarative model**.

Instead of telling the system *how* to do something, you declare *what you want*.

The reconciliation loop works like this:

1. You declare the **desired state**
2. Kubernetes observes the **current state**
3. Controllers compare both states
4. If there is a difference, corrective action is taken

This loop runs continuously.

It is the heart of Kubernetes.

## How Reconciliation Works

Example: Deployment with 3 replicas.

Desired state:

- 3 Pods running

Current state:

- 2 Pods running (one crashed)

Controller action:

- Create 1 new Pod

The system restores the declared state automatically.

Kubernetes does not repair the failed Pod.
It replaces it.

## Controllers and Reconciliation

Controllers are responsible for:

- Watching resources
- Comparing desired vs actual state
- Taking corrective action

Common objects that participate in reconciliation:

- ReplicaSet
- Deployment
- StatefulSet

They ensure the system converges toward the declared configuration.

## Why It Matters

The reconciliation loop enables:

- Self-healing
- Automatic scaling
- Reliability at scale
- Reduced operational overhead

Without it, Kubernetes would be reactive and manual.

With it, Kubernetes is proactive and automated.

## Mental Model

Desired state → Declared in YAML  
Actual state → Observed in cluster  
Controller → Closes the gap  

Kubernetes is a continuous control loop system.

## Common Misunderstandings

- Thinking Kubernetes fixes containers internally (it replaces them)
- Assuming reconciliation runs once (it runs continuously)
- Believing manual correction is required after every failure
- Confusing reconciliation with scheduling

Reconciliation is about state convergence.

## Check your knowledge

<quiz>
What is the primary goal of the reconciliation loop?
- [x] Ensure the current state matches the desired state
- [ ] Prevent Pods from ever failing
- [ ] Restart all nodes periodically
- [ ] Eliminate the need for controllers
</quiz>

<quiz>
If a Pod managed by a Deployment crashes, Kubernetes will:
- [x] Create a replacement Pod
- [ ] Repair the same Pod instance
- [ ] Ignore the failure
- [ ] Restart the entire cluster
</quiz>

<quiz>
Fill in the blank: The [[controller]] continuously compares the current state with the [[desired state]].
</quiz>

<quiz>
Which Kubernetes objects typically participate in reconciliation? (multiple correct)
- [x] ReplicaSet
- [x] Deployment
- [x] StatefulSet
- [ ] Standalone Docker container
</quiz>

<quiz>
Why is the reconciliation loop critical in distributed systems?
- [x] It enables self-healing
- [x] It maintains automation at scale
- [ ] It prevents hardware failures
- [ ] It replaces container runtimes
</quiz>

<quiz>
True or false: Reconciliation runs only once when a resource is created.
- [ ] True
- [x] False
</quiz>

<quiz>
When scaling a Deployment from 2 to 5 replicas, what performs the adjustment?
- [x] The controller through reconciliation
- [ ] The kubelet manually
- [ ] The container runtime
- [ ] The node operating system
</quiz>