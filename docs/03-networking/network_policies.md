---
quiz:
  auto_number: true
  shuffle_answers: true
---

# Network Policies

## What Problem NetworkPolicies Solve

By default, Kubernetes networking is **fully open**:

- Any Pod can communicate with any other Pod
- Pods can send traffic to external endpoints
- There is no built-in microsegmentation

In development environments this is convenient.

In production or multi-tenant clusters, it is a serious security risk.

Without restrictions:

- Compromised Pods can laterally move across the cluster
- Sensitive workloads can be accessed unintentionally
- Regulatory requirements may be violated

NetworkPolicies introduce **controlled traffic boundaries**.

## How NetworkPolicies Work

A NetworkPolicy defines **allowed traffic** to and/or from selected Pods.

Important behavior:

- When a Pod is selected by a NetworkPolicy, it becomes **isolated**
- Only traffic explicitly allowed by rules is permitted
- Everything else is denied (for the selected direction)

NetworkPolicies can define:

- Ingress rules (incoming traffic)
- Egress rules (outgoing traffic)
- Both

Enforcement is handled by the CNI plugin.  
If the CNI does not support policy enforcement, the rules will not apply.

## Core Concepts

### 1. Default Behavior

Pods are:

- **Non-isolated by default**
- Able to communicate freely

Once a Pod is selected by a NetworkPolicy:

- It becomes isolated for the specified direction (ingress/egress)
- Traffic must match an allow rule

There is no explicit "deny" rule.  
Policies are additive allow lists.

---

### 2. Pod and Namespace Selection

NetworkPolicies use selectors:

- `podSelector` — target Pods within a namespace
- `namespaceSelector` — target namespaces
- `ipBlock` — allow specific CIDR ranges

Selectors enable fine-grained segmentation between workloads.

---

### 3. Ingress vs Egress

- **Ingress rules** control who can talk *to* the Pod
- **Egress rules** control where the Pod can talk *to*

If only ingress is defined:

- Egress remains unrestricted

If egress is defined:

- Only specified outbound traffic is allowed

---

### 4. Zero-Trust Model

NetworkPolicies support a **deny-by-default model**:

1. Select sensitive workloads
2. Define explicit allow rules
3. Deny all other traffic implicitly

This reduces blast radius during compromise.

---

### 5. CNI Enforcement Requirement

NetworkPolicies require:

- A policy-aware CNI (e.g., Calico, Cilium)

If using a basic CNI without enforcement:

- Policies exist in the API
- But traffic is not restricted

Policy behavior depends entirely on the CNI data plane.

## Mental Model

Think in terms of **traffic whitelisting**.

When you apply a NetworkPolicy:

- You are not blocking traffic directly.
- You are defining what is allowed.
- Everything else becomes implicitly denied.

Segmentation is workload-driven, not network-device-driven.

## Common Failure Scenarios

- Pods lose external internet access after adding egress rules
- DNS traffic blocked (UDP/TCP 53 not allowed)
- Cross-namespace communication unexpectedly denied
- Monitoring agents cannot reach application Pods
- Policies applied but ineffective (CNI limitation)

Operational debugging requires:

- Verifying selectors
- Checking CNI enforcement
- Inspecting effective rules
- Testing both ingress and egress paths

## Check Your Knowledge

<quiz>
What happens when a Pod is selected by a NetworkPolicy with ingress rules defined?
- [x] Only allowed ingress traffic is permitted
- [ ] All ingress traffic is automatically allowed
- [ ] The Pod becomes inaccessible permanently
- [ ] kube-proxy disables routing
</quiz>

<quiz>
Which statement about default Pod communication is correct?
- [x] Pods are non-isolated by default
- [ ] Pods are isolated by default
- [ ] Pods require explicit allow rules to communicate
- [ ] DNS access is denied by default
</quiz>

<quiz>
Scenario: After applying a NetworkPolicy with only ingress rules, a Pod can still reach the internet. Why?
- [x] Egress traffic is not restricted
- [ ] kube-proxy bypasses the policy
- [ ] CoreDNS overrides the policy
- [ ] The scheduler disabled enforcement
</quiz>

<quiz>
Which selectors can be used in a NetworkPolicy? (Select all that apply)
- [x] podSelector
- [x] namespaceSelector
- [x] ipBlock
- [ ] storageClass
</quiz>

<quiz>
Scenario: You apply a NetworkPolicy allowing traffic from a specific namespace, but communication still fails. What is the most likely cause?
- [x] The CNI plugin does not support policy enforcement
- [x] The namespace labels do not match the selector
- [ ] The Service ClusterIP changed
- [ ] kubelet restarted
</quiz>

<quiz>
To implement a zero-trust model in Kubernetes, you should:
- [x] Select Pods with a NetworkPolicy
- [x] Explicitly allow only required traffic
- [ ] Remove kube-proxy
- [ ] Disable DNS resolution
</quiz>

<quiz>
Scenario: After implementing egress restrictions, Pods cannot resolve internal Service names. What rule is likely missing?
- [x] Allowing outbound traffic to CoreDNS (port 53)
- [ ] Allowing NodePort access
- [ ] Allowing PersistentVolume traffic
- [ ] Allowing kube-scheduler traffic
</quiz>

<quiz>
Fill in the blank: NetworkPolicies are enforced by the [[CNI plugin]] and operate on a [[deny-by-default]] model once applied.
</quiz>

## References

- [**The Kubernetes Book - Nigel Poulton**](https://www.amazon.com.br/Kubernetes-Book-Nigel-Poulton/dp/1916585000)