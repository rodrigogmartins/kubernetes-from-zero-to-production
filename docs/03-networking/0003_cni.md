---
quiz:
  auto_number: true
  shuffle_answers: true
---

# Container Network Interface (CNI)

## Problem

Kubernetes itself does not implement networking. Without an underlying network layer, Pods cannot communicate across nodes.

## Solution

CNI plugins provide networking for Pods: assigning IPs, enabling cross-node communication, and implementing network policies.

## Components / Key Concepts

- **IP allocation:** each Pod gets a unique IP
- **Cross-node networking:** enables Pods on different nodes to communicate
- **Network isolation:** CNI can enforce network policies
- **Popular plugins:** Calico, Flannel, Weave Net

## Check your knowledge

<quiz>
What does CNI stand for in Kubernetes?

- [x] Container Network Interface
- [ ] Cluster Network Integration
- [ ] Cluster Node Interface
- [ ] Container Namespace Isolation
</quiz>

<quiz>
Which tasks are typically handled by a CNI plugin? (Select all that apply)

- [x] Assign IP addresses to pods
- [x] Configure routing for pod traffic
- [x] Enforce network policies
- [ ] Schedule pods to nodes
</quiz>

<quiz>
Fill in the blank: A CNI plugin allows Kubernetes to implement a [[flat pod network]] where each pod receives a unique IP address.
</quiz>

<quiz>
You deploy Calico as your CNI plugin. Which of these statements are true? (Select all that apply)

- [x] Pods on different nodes can communicate directly
- [x] Network policies can restrict pod-to-pod communication
- [ ] kube-proxy is completely unnecessary
- [ ] Pod IP addresses are assigned manually
</quiz>

<quiz>
Scenario: A pod cannot reach another pod on a different node. What could be the cause?

- [x] The CNI plugin is misconfigured
- [x] Network policy blocks the traffic
- [ ] The pod is missing a PersistentVolumeClaim
- [ ] kubelet version mismatch
</quiz>

<quiz>
Fill in the blank: Overlay networks like [[Flannel]] or [[Calico VXLAN]] simplify multi-node pod networking by encapsulating packets.
</quiz>
