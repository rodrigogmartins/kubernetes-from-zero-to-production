# Deployments

Deployments are the **most common and recommended way to run stateless applications in Kubernetes**.

They sit above ReplicaSets and provide **declarative updates, rollbacks, and lifecycle management** for Pods.

In *The Kubernetes Book*, Deployments are presented as the object most users interact with on a daily basis.

## What Is a Deployment

A Deployment is a **higher-level controller** that:

- Describes the desired state of an application
- Manages ReplicaSets automatically
- Handles updates and rollbacks safely

You do not deploy Pods directly in production — you deploy **Deployments**.

## Why Deployments Exist

ReplicaSets ensure availability, but they lack:

- Update strategies
- Version tracking
- Rollback mechanisms

Deployments exist to solve these operational problems by **managing ReplicaSets over time**.

They allow applications to evolve without downtime.

## The Core Responsibility

A Deployment answers this question:

> “What version of this application should be running, and how should changes be applied?”

It continuously reconciles the cluster state to match that answer.

## How Deployments Work

A Deployment manages Pods indirectly:

1. You define a desired state (image, replicas, strategy)
2. Kubernetes creates a ReplicaSet
3. The ReplicaSet creates Pods
4. Changes create **new ReplicaSets**
5. Old ReplicaSets are scaled down gradually

The Deployment always controls which ReplicaSet is active.

## Rolling Updates

By default, Deployments use **rolling updates**:

- New Pods are created gradually
- Old Pods are terminated incrementally
- The application remains available during the update

Two key parameters control this behavior:

- `maxSurge`
- `maxUnavailable`

This allows fine-grained control over availability during upgrades.

## Rollbacks and Revision History

Deployments keep a **revision history** of ReplicaSets.

If a rollout fails:

- Traffic can be restored to a previous version
- Rollback is fast and deterministic
- No manual Pod recreation is required

This is a major operational advantage over managing ReplicaSets directly.

## Declarative State and Reconciliation

Deployments fully embrace Kubernetes’ declarative model:

- You declare *what should be running*
- Kubernetes decides *how to get there*

The reconciliation loop ensures that drift is corrected automatically.

## What Deployments Are Best Suited For

Deployments are ideal for:

- Stateless services
- APIs
- Web applications
- Background workers

They assume Pods are disposable and replaceable.

## What Deployments Are NOT Designed For

Deployments are not ideal for:

- Stateful workloads
- Stable network identities
- Ordered startup or shutdown

These use cases are handled by other controllers.

## Common Failure Scenarios

- Misconfigured update strategies causing reduced capacity
- Insufficient resources blocking rollouts
- Broken readiness probes stalling updates

Understanding rollout behavior is critical in production.

## When to Reason About Deployments Explicitly

You think about Deployments when:

- Designing update strategies
- Debugging stuck rollouts
- Investigating unexpected ReplicaSets
- Planning zero-downtime releases

Deployments are the primary interface between developers and Kubernetes.

## One-Sentence Mental Model

> “A Deployment manages application versions by orchestrating ReplicaSets to safely move the system toward a desired state.”

## References

- [**The Kubernetes Book - Nigel-Poulton**](https://www.amazon.com.br/Kubernetes-Book-Nigel-Poulton/dp/1916585000)
