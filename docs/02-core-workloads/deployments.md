---
quiz:
  auto_number: true
  shuffle_answers: true
---

# Deployments

## The Problem

Managing Pods directly is fragile:

- Updating container images manually causes downtime
- Replacing Pods one by one is error-prone
- Rolling back after a failed release is complex
- Scaling safely requires coordination

You need controlled, repeatable workload management.

## The Solution

**Deployments** provide declarative management for stateless applications.

They:

- Manage ReplicaSets
- Orchestrate rolling updates
- Enable rollbacks
- Handle scaling

You declare the desired state.  
Kubernetes reconciles reality to match it.

## How Deployments Work

Deployment  
→ manages ReplicaSet  
→ which manages Pods  

When you update a Deployment:

1. A new ReplicaSet is created
2. Pods are gradually replaced
3. Traffic shifts safely
4. Old ReplicaSet is scaled down

This enables zero-downtime releases when configured properly.

## Core Capabilities

- Rolling updates
- Rollbacks to previous revisions
- Declarative scaling
- Revision history tracking
- Controlled rollout strategies

You never update Pods directly in production.

You update the Deployment.

## Rolling Update Strategy

Default strategy: `RollingUpdate`

Controls:

- `maxUnavailable`
- `maxSurge`

These parameters define how safe or aggressive the rollout is.

Bad configuration can cause downtime.

Good configuration enables seamless upgrades.

## Rollbacks

If a rollout fails:

- Deployment keeps revision history
- You can revert to a previous working version

This is operational safety built into the platform.

## Scaling

To scale an application:

- Update the replica count in the Deployment

The Deployment adjusts the ReplicaSet.
The ReplicaSet adjusts the Pods.

Do not manually create Pods for scaling.

That defeats the controller model.

## Mental Model

Pod = single instance  
ReplicaSet = ensures desired replica count  
Deployment = manages lifecycle and updates  

Deployment is the control layer for application evolution.

## Common Mistakes

- Editing Pods directly
- Deleting ReplicaSets manually
- Ignoring rollout status
- Not monitoring during updates
- Using Deployments for stateful workloads (use StatefulSets instead)

Deployments are powerful, but only when used correctly.

## Check your knowledge

<quiz>
What is the primary purpose of a Deployment?
- [x] Manage Pods and ReplicaSets, handling updates and rollbacks
- [ ] Store secrets
- [ ] Provide DNS for Pods
- [ ] Schedule nodes
</quiz>

<quiz>
Scenario: You want to upgrade a container image in production without downtime. Which resource should you use?
- [x] Deployment
- [ ] ReplicaSet
- [ ] Service
- [ ] Pod
</quiz>

<quiz>
Fill in the blank: Deployments solve the problem of [[controlled rollouts]] and [[rollback management]].
</quiz>

<quiz>
Which of the following are features of Deployments? (multiple correct)
- [x] Rolling updates
- [x] Rollbacks
- [x] Scaling Pods
- [ ] Managing nodes
</quiz>

<quiz>
True or false: A Deployment manages Pods directly without using ReplicaSets.
- [ ] True
- [x] False
</quiz>

<quiz>
Scenario: You need to scale an application from 3 to 10 Pods automatically. What is the recommended approach?
- [x] Update the Deployment replica count
- [ ] Manually create new Pods
- [ ] Modify each ReplicaSet individually
- [ ] Delete Pods to force recreation
</quiz>

## References

- Kubernetes Documentation – Deployments  
- Kubernetes Patterns – Bilgin Ibryam