---
quiz:
  auto_number: true
  shuffle_answers: true
---

# What Problem Kubernetes Solves

## The Problem

Containers revolutionized application packaging.

They provide:

- Process isolation
- Consistent runtime environments
- Lightweight deployment units

But containers alone do not solve distributed system challenges.

As you scale to multiple applications and nodes, problems emerge:

- Containers are ephemeral
- IP addresses change
- There is no built-in service discovery
- Failed containers are not automatically replaced
- Scaling must be done manually
- There is no central desired state management

Managing containers manually at scale becomes operationally complex and error-prone.

You need orchestration.

## The Solution

Kubernetes solves the challenges of running containers at scale by introducing higher-level abstractions.

Instead of managing containers directly, Kubernetes manages them indirectly through structured resources.

Key abstractions:

- **Pods** — group containers into schedulable units with shared networking and storage
- **Controllers** — ensure the desired number of Pods are running
- **Deployments** — manage rolling updates and rollbacks
- **Services** — provide stable networking and service discovery
- **Ingress** — manage external HTTP/S access

You declare the desired state.

Kubernetes continuously works to match reality to that declaration.

## Declarative Model

Traditional model:

- Manually start containers
- Manually monitor
- Manually restart
- Manually scale

Kubernetes model:

1. Declare what you want
2. The system observes the current state
3. Controllers reconcile differences automatically

This is the foundation of automation and reliability.

## Core Problems Kubernetes Addresses

### Ephemeral Workloads

Pods can disappear.
Kubernetes recreates them automatically.

---

### Dynamic Networking

Pod IPs change.
Services provide stable endpoints.

---

### Lack of Self-Healing

Containers crash.
Controllers create replacements.

---

### Manual Scaling

Operators previously scaled containers manually.
Deployments allow replica counts to be declared and enforced automatically.

## Mental Model

Containers = execution units  
Kubernetes = orchestration system  

Kubernetes treats containers as **cattle, not pets**.

- Replaceable
- Disposable
- Automatically managed

You manage intent.
Kubernetes manages execution.

## Common Misunderstandings

- Kubernetes does not build container images
- Kubernetes does not write application code
- Kubernetes does not eliminate the need for monitoring
- Kubernetes does not make applications inherently fault-tolerant

It provides orchestration, not magic.

## Check your knowledge

<quiz>
Which of the following problems does Kubernetes solve? (multiple correct)
- [x] Automatic scaling of containers
- [x] Self-healing failed workloads
- [x] Stable networking for ephemeral Pods
- [ ] Building container images automatically
- [ ] Writing application code
</quiz>

<quiz>
What does it mean that containers are ephemeral?
- [x] They can be replaced at any time
- [x] Their IP addresses may change
- [ ] They permanently store state by default
- [ ] They guarantee automatic restart without orchestration
</quiz>

<quiz>
In Kubernetes, the desired state represents:
- [x] A declaration of what should be running
- [ ] A snapshot of node CPU usage
- [ ] A running container instance
- [ ] A backup file
</quiz>

<quiz>
Fill in the blank: Kubernetes treats containers as [[cattle]] not [[pets]].
</quiz>

<quiz>
Which Kubernetes abstraction provides stable networking and service discovery?
- [x] Service
- [ ] Pod
- [ ] ReplicaSet
- [ ] Node
</quiz>

<quiz>
Which resource is responsible for managing rolling updates?
- [x] Deployment
- [ ] Pod
- [ ] Service
- [ ] Container runtime
</quiz>

<quiz>
Why is manual container scaling considered problematic at scale?
- [x] It is error-prone and time-consuming
- [ ] It improves resilience
- [ ] It eliminates the need for controllers
- [ ] It guarantees high availability
</quiz>