---
quiz:
  auto_number: true
  shuffle_answers: true
---

# Network Policies

## Problem

By default, all Pods can communicate freely. In multi-tenant or production clusters, unrestricted communication is a security risk.

## Solution

Network Policies enforce rules about which Pods can communicate, restricting ingress and egress traffic.

## Components / Key Concepts

- **Policy scope:** can be applied per Pod or namespace
- **Rules:** define allowed traffic for ingress and egress
- **CNI enforcement:** policies are implemented by the network plugin
- **Zero-trust model:** deny-by-default unless explicitly allowed

## Check your knowledge

<quiz>
What is the main function of a NetworkPolicy?

- [x] Restrict traffic to/from pods
- [ ] Assign static IPs
- [ ] Load balance services
- [ ] Monitor pod health
</quiz>

<quiz>
Fill in the blank: By default, pods are [[non-isolated]] and can communicate with all other pods in the namespace.
</quiz>

<quiz>
Scenario: You create a NetworkPolicy allowing only specific pod selectors. Other pods still cannot reach it. Why?

- [x] CNI plugin enforces policy
- [ ] kube-proxy blocks traffic
- [ ] DNS failed
- [ ] NodePort service missing
</quiz>

<quiz>
Which fields can you define in a NetworkPolicy? (Select all that apply)

- [x] podSelector
- [x] namespaceSelector
- [x] ingress rules
- [x] egress rules
- [ ] storageClass
</quiz>

<quiz>
Scenario: After applying a NetworkPolicy, some pods lose connectivity to external endpoints. Why?

- [x] Egress rules block traffic
- [x] CNI plugin configuration restricts outgoing traffic
- [ ] Service type NodePort changed
- [ ] Pod CPU limits too low
</quiz>

<quiz>
Fill in the blank: NetworkPolicies only work if the CNI plugin supports [[policy enforcement]] (e.g., Calico, Cilium).
</quiz>
