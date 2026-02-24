---
quiz:
  auto_number: true
  shuffle_answers: true
---

# Control Plane vs Data Plane

## The Problem

In a distributed system, responsibilities must be clearly separated.

Kubernetes must:

- Decide where workloads should run
- Store cluster state reliably
- Enforce desired configuration
- Execute containers on nodes
- Maintain networking between workloads

If decision-making and workload execution were mixed together, the system would be unstable and hard to scale.

You need architectural separation.

## The Solution

Kubernetes separates responsibilities into two layers:

- **Control Plane** — makes decisions and manages cluster state
- **Data Plane** — runs workloads and handles execution

This separation enables scalability, reliability, and clear operational boundaries.

## Control Plane

The control plane is the brain of the cluster.

It:

- Receives API requests
- Stores desired and current state
- Schedules workloads
- Enforces declared configuration

### Core Components

- **kube-apiserver** — exposes the Kubernetes API
- **etcd** — persistent key-value store for cluster state
- **kube-scheduler** — assigns Pods to nodes
- **kube-controller-manager** — reconciles desired vs current state

The control plane ensures the cluster matches the declared desired state.

It does not run application containers.

## Data Plane

The data plane is responsible for execution.

It:

- Runs application workloads
- Maintains node-level networking
- Reports status back to the control plane

### Core Components

- **kubelet** — ensures Pods are running on a node
- **kube-proxy** — manages networking rules for Services
- **Container runtime** — executes containers (e.g., containerd)

Data plane nodes execute workloads but do not make cluster-wide decisions.

## How They Interact

1. A user submits a Pod definition.
2. The control plane stores it in etcd.
3. The scheduler assigns it to a node.
4. The kubelet on that node starts the container.
5. The node reports status back to the control plane.

Control plane decides.
Data plane executes.

## Mental Model

Control Plane = brain  
Data Plane = workers  

Control plane defines *what should happen*.  
Data plane performs *what is required*.

## What Each Layer Does NOT Do

Control Plane does not:

- Run application containers
- Handle node-level execution

Data Plane does not:

- Decide scheduling across cluster
- Store cluster-wide state

Clear separation prevents architectural confusion.

## Common Mistakes

- Thinking kubelet is part of the control plane
- Assuming scheduler runs containers
- Confusing kube-proxy with API server
- Believing etcd runs workloads

Understand the boundary between decision and execution.

## Check your knowledge

<quiz>
Which layer of Kubernetes is responsible for making cluster-wide scheduling decisions?
- [x] Control Plane
- [ ] Data Plane
</quiz>

<quiz>
Which component stores the cluster’s desired and current state?
- [x] etcd
- [ ] kubelet
- [ ] kube-proxy
- [ ] container runtime
</quiz>

<quiz>
Which component is responsible for assigning Pods to nodes?
- [x] kube-scheduler
- [ ] kube-controller-manager
- [ ] kubelet
- [ ] kube-proxy
</quiz>

<quiz>
The kubelet runs on:
- [x] Data plane nodes
- [ ] Only the control plane
- [ ] etcd servers
- [ ] External load balancers
</quiz>

<quiz>
Fill in the blank: The [[control plane]] manages desired state, while the [[data plane]] executes workloads.
</quiz>

<quiz>
Which of the following are data plane components? (multiple correct)
- [x] kubelet
- [x] kube-proxy
- [x] Container runtime
- [ ] kube-scheduler
</quiz>

<quiz>
True or false: The control plane directly runs application containers.
- [ ] True
- [x] False
</quiz>