---
quiz:
  auto_number: true
  shuffle_answers: true
---

# Pods

Pods are the **smallest deployable units in Kubernetes**.  
They act as a **logical wrapper** around one or more containers that:

- Are scheduled together
- Run on the same node
- Share networking and optionally storage
- Start and stop together

Pods solve the problem of **grouping containers** that must always run together, providing a consistent **execution environment** and making containers **replaceable and schedulable** without treating each container as a first-class object.

Most Pods run a **single container**, which simplifies lifecycle, scaling, and debugging. Multi-container Pods are used only when containers are **tightly coupled**, such as in the **sidecar pattern** for logging, metrics, or proxies.

Pods are **ephemeral**: they can be terminated at any time, and are replaced rather than repaired. Pod IPs are not stable, so higher-level objects (ReplicaSets, Deployments) handle scaling and self-healing.

---

## Check your knowledge

<quiz>
What is the primary purpose of a Pod in Kubernetes?

- [x] To group one or more containers that share resources and a network namespace
- [ ] To provide persistent storage
- [ ] To schedule nodes
- [ ] To handle cluster-wide load balancing
</quiz>

<quiz>
Which of the following are true about Pods? (multiple correct)

- [x] Pods are ephemeral
- [x] Pods share networking and optionally storage between containers
- [ ] Pods are responsible for self-scaling
- [ ] Pods provide DNS for services
</quiz>

<quiz>
Fill in the blank: Containers in the same Pod communicate using [[localhost]] and share [[volumes]].
</quiz>

<quiz>
Scenario: You need a container that logs metrics for another container running in the same Pod. Which pattern should you use?

- [x] Sidecar pattern
- [ ] Singleton pattern
- [ ] ReplicaSet pattern
- [ ] NodePort pattern
</quiz>

<quiz>
Most Pods run a [[single]] container. Why?

- [x] Simplifies lifecycle and scaling
- [ ] Reduces network usage
- [ ] Avoids using volumes
- [ ] Enables multiple IPs per container
</quiz>

<quiz>
Scenario: A Pod fails. What happens?

- [x] Kubernetes creates a new Pod
- [ ] The container inside the Pod is repaired
- [ ] The node is automatically replaced
- [ ] The IP address of the Pod remains the same
</quiz>

<quiz>
Pods are not intended to be manually managed in production. True or false?

- [x] True
- [ ] False
</quiz>

<quiz>
Which of these are valid use cases for creating Pods directly? (multiple correct)

- [x] Debugging
- [x] Learning Kubernetes concepts
- [x] One-off jobs
- [ ] Production deployments
</quiz>

<quiz>
Fill in the blank: Pods are **the unit of [[scheduling]]** in Kubernetes, not [[replication]].
</quiz>
