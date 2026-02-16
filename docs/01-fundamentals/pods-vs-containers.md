---
quiz:
  auto_number: true
  shuffle_answers: true
---

# Pods vs Containers

While containers are the smallest deployable unit, **Pods are the smallest schedulable unit** in Kubernetes.

## Key Differences

| Concept    | Container       | Pod                                       |
| ---------- | --------------- | ----------------------------------------- |
| Scheduling | Not schedulable | Schedulable unit                          |
| Networking | Own namespace   | Shared among containers in Pod            |
| Lifecycle  | Manual          | Managed by controllers                    |
| Scaling    | Manual          | Controlled via ReplicaSets or Deployments |

Pods **wrap one or more containers** to provide:

- Shared networking
- Shared storage
- Lifecycle management

Most Pods run a single container. Multi-container Pods use the **sidecar pattern** for closely coupled workloads.

## Quiz

<quiz>
Pods are the smallest:
- [ ] Container
- [x] Schedulable unit
- [ ] Deployment
- [ ] Service
</quiz>

<quiz>
Which of the following are reasons to use multi-container Pods? (select all that apply)
- [x] Share localhost networking
- [x] Share storage volumes
- [ ] Independent scaling of containers
- [ ] Reduce node count
</quiz>

<quiz>
Fill the blank: A Pod can contain [[one]] or more [[containers]] that share [[network]] and [[storage]].
</quiz>

<quiz>
Most Pods run:
- [x] A single container
- [ ] Multiple unrelated containers
</quiz>

<quiz>
Why do Pods exist in Kubernetes?
- [x] To group containers and provide a shared execution environment
- [x] To serve as the unit of scheduling
- [ ] To replace nodes
</quiz>