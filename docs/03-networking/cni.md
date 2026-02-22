---
quiz:
  auto_number: true
  shuffle_answers: true
---

# Container Network Interface (CNI)

## What Problem CNI Solves

Kubernetes defines **how networking should behave**, but it does not implement networking itself.

Without a networking layer:

- Pods on different nodes cannot communicate
- IP addresses cannot be assigned consistently
- Services cannot route traffic correctly
- Network Policies cannot be enforced

Kubernetes delegates networking implementation to the **Container Network Interface (CNI)** specification.

CNI enables Kubernetes to maintain a **flat, cluster-wide Pod network**.

## Why Kubernetes Delegates Networking

Networking is environment-specific:

- Cloud providers offer VPC-native routing
- On-prem clusters may require overlay networks
- Some environments require advanced network policy enforcement
- Performance requirements vary

Rather than embedding a single networking solution, Kubernetes uses a pluggable model.

The CNI plugin is responsible for:

- Assigning IP addresses to Pods
- Configuring routing rules
- Enabling cross-node Pod communication
- Enforcing Network Policies (if supported)

This separation keeps Kubernetes portable and infrastructure-agnostic.

## Core Concepts

### 1. Flat Pod Network

Kubernetes requires:

- Every Pod gets a unique IP address
- Pods can communicate across nodes without NAT
- Nodes can communicate with Pods

This is known as the **flat networking model**.

---

### 2. IP Allocation

When a Pod is created:

1. The kubelet calls the configured CNI plugin.
2. The CNI assigns an IP address.
3. Routing rules are configured.
4. The Pod joins the cluster network.

If IP allocation fails, the Pod will not reach a Running state.

---

### 3. Cross-Node Communication

CNI plugins implement one of the following strategies:

- **Overlay networks (VXLAN, IP-in-IP)**  
  Encapsulate packets between nodes.

- **Native cloud routing**  
  Use cloud VPC networking directly (e.g., AWS VPC CNI).

Overlay networks simplify setup but may introduce overhead.  
Native routing improves performance but depends on infrastructure support.

---

### 4. Network Isolation

Some CNI plugins (e.g., Calico) enforce **Network Policies**.

Without a policy-aware CNI:

- NetworkPolicy resources exist
- But traffic is not actually restricted

Network enforcement depends entirely on the CNI implementation.

---

### 5. Popular CNI Plugins

- **Calico** — Policy enforcement + routing (BGP or VXLAN)
- **Flannel** — Simple overlay networking
- **Weave Net** — Overlay with encryption
- **AWS VPC CNI** — Native AWS VPC integration

Each has trade-offs in performance, complexity, and policy support.

## Mental Model

Kubernetes defines **what networking must guarantee**.

CNI plugins implement **how those guarantees are achieved**.

Think of it this way:

- Kubernetes = Networking contract
- CNI = Networking implementation

If networking breaks in a cluster, the issue is often in the CNI layer.

## Failure Characteristics

Common CNI-related failure scenarios include:

- Pods stuck in `ContainerCreating`
- Pods without IP addresses
- Cross-node traffic failing
- Network Policies not being enforced
- Node-to-Pod traffic asymmetry

Operational debugging often involves:

- Inspecting CNI logs
- Checking routing tables
- Verifying encapsulation tunnels
- Validating NetworkPolicy enforcement

## Check Your Knowledge

<quiz>
What is the primary responsibility of a CNI plugin?
- [x] Implement Pod networking
- [ ] Schedule Pods to nodes
- [ ] Manage container images
- [ ] Perform rolling updates
</quiz>

<quiz>
Which are Kubernetes networking requirements? (Select all that apply)
- [x] Each Pod receives a unique IP
- [x] Pods can communicate across nodes without NAT
- [x] Nodes can reach Pods
- [ ] Pods must share the node IP
</quiz>

<quiz>
Scenario: You deploy NetworkPolicy resources but traffic is not restricted. What is the most likely cause?
- [x] The CNI plugin does not support policy enforcement
- [ ] kube-proxy is misconfigured
- [ ] The scheduler failed
- [ ] Pods lack resource limits
</quiz>

<quiz>
Which networking strategy typically introduces encapsulation overhead?
- [x] Overlay networking (VXLAN, IP-in-IP)
- [ ] Native cloud routing
- [ ] Host networking only
- [ ] NodePort Services
</quiz>

<quiz>
Scenario: Pods on Node A cannot reach Pods on Node B. However, Pods on the same node communicate successfully. Which component is most likely responsible?
- [x] The CNI plugin configuration
- [ ] Deployment controller
- [ ] Horizontal Pod Autoscaler
- [ ] CoreDNS
</quiz>

<quiz>
Fill in the blank: Kubernetes defines networking behavior, but the [[CNI plugin]] implements the underlying network configuration.
</quiz>

<quiz>
In a cloud-native environment using AWS VPC CNI, Pod IPs are typically:
- [x] Allocated from the VPC subnet
- [ ] Manually configured per Pod
- [ ] Assigned by kube-proxy
- [ ] Shared across multiple Pods
</quiz>

## References

- [**The Kubernetes Book - Nigel Poulton**](https://www.amazon.com.br/Kubernetes-Book-Nigel-Poulton/dp/1916585000)