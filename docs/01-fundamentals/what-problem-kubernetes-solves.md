---
quiz:
  auto_number: true
  shuffle_answers: true
---

# What Problem Kubernetes Solves

Kubernetes exists to **solve the challenges of running containers at scale**.

Containers alone provide process isolation, but they **do not solve deployment, scaling, or networking problems**. Running containers manually quickly becomes complex as you add more applications and nodes.

## Problems Containers Have

- Containers are **ephemeral** — they can disappear at any time
- Containers have **dynamic IPs** and no built-in service discovery
- Containers do not **self-heal** — if a container crashes, nothing restarts it
- Containers have no **declarative desired state** — you must manually keep track of what should be running
- Scaling containers manually is error-prone and time-consuming

## How Kubernetes Solves These Problems

Kubernetes introduces **higher-level abstractions** that manage containers indirectly:

- **Pods** — group containers together and give them a shared network and storage
- **Controllers** — ensure the desired number of Pods are running
- **Services** — provide stable networking and service discovery
- **Deployments** — handle rolling updates and rollbacks
- **Ingress** — manage external HTTP/S access

Kubernetes lets you **declare the desired state**, and the system continuously works to match reality to that state.  

## Mental Model

Think of Kubernetes as a **control loop system**:

1. You declare *what you want* (desired state)
2. Kubernetes continuously checks the current state
3. It reconciles differences by creating, updating, or deleting resources

> “Kubernetes treats containers as cattle, not pets.”

## Check Your Knowledge

<quiz>
Which of the following are problems Kubernetes solves? (select all that apply)
- [x] Scaling containers automatically
- [x] Self-healing failed containers
- [x] Stable networking between ephemeral Pods
- [ ] Automatically building container images
- [ ] Writing application code
</quiz>

<quiz>
Containers are ephemeral. This means:
- [x] They can be replaced at any time
- [x] IP addresses may change
- [ ] They store persistent state by default
- [ ] They automatically restart on all failures
</quiz>

<quiz>
In Kubernetes, the desired state is:
- [x] A declaration of what should be running
- [ ] A log of what is currently running
- [ ] A single container instance
- [ ] A node configuration file
</quiz>

<quiz>
Fill the blank: Kubernetes treats containers as [[cattle]] not [[pets]].
</quiz>

<quiz>
Which abstraction provides stable networking and service discovery?
- [x] Service
- [ ] Pod
- [ ] ReplicaSet
- [ ] Deployment
</quiz>

## References

- [**The Kubernetes Book - Nigel Poulton**](https://www.amazon.com.br/Kubernetes-Book-Nigel-Poulton/dp/1916585000)
