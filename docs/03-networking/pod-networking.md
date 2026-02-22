---
quiz:
  auto_number: true
  shuffle_answers: true
---

# Pod Networking

## What Problem Pod Networking Solves

Containers are ephemeral.

Pods:

- Get recreated
- Move between nodes
- Receive new IPs

Yet applications must communicate reliably.

Kubernetes solves this by enforcing a **cluster-wide networking model** where:

- Every Pod gets its own IP
- All Pods can communicate directly
- No NAT is required between Pods

This removes the need for service discovery via IP tracking.

## How Pod Networking Works

Kubernetes assumes a **flat network model**:

1. Every Pod receives a unique IP
2. All Pods can reach each other directly
3. Containers inside the same Pod share networking

Networking is implemented by a **CNI plugin**, which configures:

- Interfaces
- Routes
- Overlay or underlay networking
- Cross-node connectivity

## Core Concepts

### 1. Unique Pod IP

Each Pod gets:

- A unique IP across the cluster
- Ephemeral assignment
- No port mapping required

Pod-to-Pod communication uses direct IP routing.

If a Pod is recreated:

- Its IP changes
- Higher-level abstractions (like Services) provide stability

---

### 2. Shared Network Namespace

Containers in the same Pod:

- Share the same IP
- Share the same port space
- Communicate via `localhost`

This enables sidecar patterns and tightly coupled containers.

Within a Pod:

- Two containers cannot bind to the same port
- Loopback communication is native

---

### 3. Flat Network Model

Kubernetes requires:

- No NAT between Pods
- No port translation
- No node-local IP isolation

This ensures:

- Simpler service discovery
- Predictable communication
- Reduced complexity

---

### 4. Cross-Node Communication

When Pods are on different nodes:

- The CNI plugin configures routing
- Overlay or routing rules forward traffic
- The network remains logically flat

If cross-node traffic fails:

- CNI configuration is the first suspect
- Routing tables or encapsulation may be broken

---

### 5. hostNetwork Mode

If a Pod runs with:

`hostNetwork: true`

It:

- Shares the node’s IP
- Bypasses the Pod network
- Uses the host network namespace

Implications:

- No isolation from node ports
- Possible port conflicts
- Higher security risk

Use only when required.

## Mental Model

Think of the cluster as:

- One big flat LAN
- Every Pod behaves like a machine on that LAN
- CNI is the invisible network engineer wiring everything together

Services provide stability.
Networking provides reachability.

## Common Failure Scenarios

- Pods on different nodes cannot communicate → CNI misconfiguration
- Duplicate IP conflicts → IPAM issue
- hostNetwork pods causing port conflicts
- NetworkPolicies unintentionally blocking traffic
- Overlay network MTU mismatch causing packet drops

Always debug from:

1. Pod IP reachability
2. Routing
3. CNI logs
4. Policy enforcement

## Check Your Knowledge

<quiz>
What guarantees pod-to-pod communication across nodes?
- [x] A flat cluster-wide networking model
- [ ] NodePort services
- [ ] Ingress controllers
- [ ] Persistent volumes
</quiz>

<quiz>
Why can containers in the same Pod communicate via localhost?
- [x] They share the same network namespace
- [ ] They use the same DNS entry
- [ ] kube-proxy forwards traffic internally
- [ ] Services redirect traffic
</quiz>

<quiz>
Scenario: Pods on different nodes cannot reach each other. What is the most likely cause?
- [x] CNI plugin misconfiguration
- [ ] etcd corruption
- [ ] Scheduler failure
- [ ] Service account misconfiguration
</quiz>

<quiz>
Which statement about Pod IPs is correct?
- [x] They are unique across the cluster
- [ ] They are shared between Pods on the same node
- [ ] They are static and never change
- [ ] They require NAT for cross-node traffic
</quiz>

<quiz>
Why does Kubernetes avoid NAT between Pods?
- [x] To allow direct communication without port mapping
- [ ] To simplify storage management
- [ ] To reduce DNS queries
- [ ] To eliminate Services
</quiz>

<quiz>
Scenario: A Pod using hostNetwork fails to start due to a port conflict. Why?
- [x] It shares the node’s port space
- [ ] It gets multiple IP addresses
- [ ] It bypasses kubelet
- [ ] It disables CNI
</quiz>

<quiz>
Fill in the blank: Containers inside a Pod share the same [[network namespace]] and communicate via [[localhost]].
</quiz>

<quiz>
In Kubernetes, reliable service access despite Pod IP changes is typically handled by:
- [x] Services
- [ ] Direct Pod IP references
- [ ] Manual route configuration
- [ ] Static IP assignment
</quiz>

## References

- Kubernetes Networking Documentation  
- The Kubernetes Book – Nigel Poulton