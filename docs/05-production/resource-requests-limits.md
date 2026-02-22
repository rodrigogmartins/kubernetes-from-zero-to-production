---
quiz:
  auto_number: true
  shuffle_answers: true
---

# Resource Requests & Limits

## Why This Matters

In a shared node:

- Containers compete for CPU
- Memory pressure can crash workloads
- One misbehaving Pod can destabilize everything

Production clusters fail more from poor resource configuration than from Kubernetes itself.

Resource management is not optional.

## The Core Concepts

Kubernetes defines two key values per container:

- Request
- Limit

They solve different problems.

Understand the difference or you will create instability.

## Requests

Definition:

Minimum guaranteed resources.

Used by:

- Scheduler to decide Pod placement.

If a node does not have enough available requested resources:

- The Pod will not be scheduled there.

Requests define:

“Can this node safely host this Pod?”

Without requests:

- Scheduler guesses
- Nodes get overpacked
- Performance becomes unpredictable

## Limits

Definition:

Maximum resources a container can use.

Enforced by:

- Kubelet at runtime.

Behavior:

- CPU: throttled if exceeded
- Memory: container is killed (OOMKilled)

Limits protect the node.

No limits means one container can consume everything.

## CPU vs Memory Behavior

CPU:

- Compressible resource
- Throttled when over limit

Memory:

- Not compressible
- Exceeding limit → container terminated

Memory misconfiguration is far more dangerous.

## Scheduling Logic

Scheduler uses:

Requests only.

It does NOT consider limits for placement.

If you set:

High limit + low request

You risk:

Node overcommit and runtime contention.

## Best Practice Pattern

For most workloads:

- Request = realistic baseline usage
- Limit = reasonable maximum

Avoid:

- Leaving both empty
- Setting request too low
- Setting limit unrealistically high

Measure first. Then tune.

## Common Failure Patterns

- No limits → node memory exhaustion
- No requests → noisy neighbor problem
- Requests too high → unschedulable Pods
- Limit lower than real usage → OOM crash loops

Resource configuration is capacity planning.

Treat it seriously.

## Mental Model

Request = reservation  
Limit = enforcement  

Scheduler trusts requests.  
Node enforces limits.

They serve different layers of control.

## Check Your Knowledge

<quiz>
Which component uses resource requests to schedule Pods?
- [x] Scheduler
- [ ] Kube-proxy
- [ ] CoreDNS
- [ ] Ingress Controller
</quiz>

<quiz>
What happens when a container exceeds its memory limit?
- [x] It is terminated with OOMKilled
- [ ] It is throttled temporarily
- [ ] It is rescheduled automatically
- [ ] It ignores the limit
</quiz>

<quiz>
If CPU limit is exceeded, what occurs?
- [x] The container is throttled
- [ ] The node reboots
- [ ] The Pod is deleted permanently
- [ ] The Deployment scales automatically
</quiz>

<quiz>
Why should requests not be set too low?
- [x] It can cause resource contention and unpredictable performance
- [ ] It increases cluster security
- [ ] It improves DNS resolution
- [ ] It enables autoscaling
</quiz>

<quiz>
Which resources are commonly configured with requests and limits?
- [x] CPU and memory
- [ ] Ingress rules
- [ ] Services
- [ ] ConfigMaps
</quiz>

<quiz>
Fill in the blank: Resource requests influence [[pod scheduling]], while limits enforce [[runtime resource control]].
</quiz>

## References

- Kubernetes Documentation – Resource Management  
- Kubernetes Best Practices – O’Reilly