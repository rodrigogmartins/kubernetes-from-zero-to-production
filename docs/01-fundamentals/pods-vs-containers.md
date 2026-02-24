---
quiz:
  auto_number: true
  shuffle_answers: true
---

# Pods vs Containers

## The Problem

Containers package applications and their dependencies.

But in a cluster environment, Kubernetes must decide:

- Where workloads run
- How containers share networking
- How tightly coupled processes operate together
- What unit should be scheduled onto nodes

Containers alone are not ideal scheduling boundaries.

You need a higher-level execution unit.

## The Solution

Kubernetes introduces **Pods**.

While a container is the smallest deployable artifact,  
a **Pod is the smallest schedulable unit**.

Pods wrap one or more containers and provide:

- Shared networking
- Shared storage
- Unified lifecycle
- A single scheduling boundary

Containers run.
Pods are scheduled.

## Key Differences

| Concept    | Container                     | Pod                                    |
| ---------- | ----------------------------- | -------------------------------------- |
| Scheduling | Not scheduled directly        | Scheduled onto nodes                   |
| Networking | Own network namespace (alone) | Shared among containers in the Pod     |
| Lifecycle  | Managed by container runtime  | Managed through Kubernetes controllers |
| Scaling    | Manual                        | Controlled via Deployments/ReplicaSets |

Kubernetes never schedules individual containers.
It schedules Pods.

## Single vs Multi-Container Pods

Most Pods run:

- A single container

Why?

- Simpler scaling
- Clear ownership
- Easier debugging

Multi-container Pods are used when containers are tightly coupled.

Common example:

- **Sidecar pattern**
  - Logging agent
  - Proxy
  - Metrics collector

If containers need independent scaling, they should not share a Pod.

## Shared Environment

Containers inside a Pod:

- Share the same IP address
- Communicate using `localhost`
- Can share volumes
- Start and stop together

This design enables close cooperation between containers.

It is intentional coupling.

## Mental Model

Container = process  
Pod = execution boundary  
Controller = lifecycle manager  

Pods define how containers live together in a cluster.

## Common Mistakes

- Thinking Kubernetes schedules containers directly
- Overusing multi-container Pods
- Trying to scale containers independently inside one Pod
- Treating Pods as persistent infrastructure

Pods are execution units, not independent infrastructure components.

## Check your knowledge

<quiz>
In Kubernetes, what is the smallest schedulable unit?
- [ ] Container
- [x] Pod
- [ ] Deployment
- [ ] Node
</quiz>

<quiz>
Why does Kubernetes use Pods instead of scheduling containers directly?
- [x] To provide a shared execution boundary
- [x] To group tightly coupled containers
- [ ] To eliminate container runtimes
- [ ] To assign multiple IPs per container
</quiz>

<quiz>
Fill in the blank: A Pod can contain [[one]] or more [[containers]] that share [[network]] and [[storage]].
</quiz>

<quiz>
Which of the following are valid reasons to use a multi-container Pod? (multiple correct)
- [x] Containers need to share localhost networking
- [x] Containers need to share storage volumes
- [ ] Containers must scale independently
- [ ] Containers are unrelated applications
</quiz>

<quiz>
Most Pods in production environments run:
- [x] A single container
- [ ] Multiple unrelated containers
</quiz>

<quiz>
True or false: Kubernetes schedules individual containers directly onto nodes.
- [ ] True
- [x] False
</quiz>

<quiz>
If two containers need independent scaling behavior, what should be done?
- [x] Place them in separate Pods
- [ ] Keep them in the same Pod
- [ ] Disable controllers
- [ ] Use a Service
</quiz>