---
quiz:
  auto_number: true
  shuffle_answers: true
---

# kube-proxy

## What Problem kube-proxy Solves

Pods are ephemeral:

- They are created and destroyed dynamically
- Their IP addresses change
- They scale up and down
- They may move across nodes

If a Service pointed directly to Pod IPs without an abstraction layer, traffic would constantly break.

kube-proxy ensures that **Service virtual IPs (ClusterIPs) reliably route traffic to healthy backend Pods**, even as Pods change.

## How kube-proxy Works

kube-proxy runs on **every worker node**.

It watches the Kubernetes API for:

- Service objects
- Endpoint updates

When changes occur, kube-proxy updates local networking rules so that traffic destined for a Service IP is forwarded to one of its backend Pods.

It does not proxy traffic at the application level.  
It programs the kernel’s networking stack.

## Core Concepts

### 1. ClusterIP Virtual IPs

Each Service receives a virtual IP address (ClusterIP).

This IP:

- Is stable
- Does not belong to a specific Pod
- Is implemented via node-level routing rules

kube-proxy ensures that traffic sent to the ClusterIP is distributed to the correct backend Pods.

---

### 2. Load Balancing

kube-proxy distributes traffic across healthy Pods.

Load balancing behavior depends on:

- The selected mode (iptables, IPVS, userspace)
- Session affinity settings
- Readiness probe status of Pods

If a Pod fails readiness checks, it is removed from the Service endpoints list.

---

### 3. Operating Modes

kube-proxy can operate in three modes:

- **iptables (default in many clusters)**
  - Uses Linux iptables rules
  - Simple and widely supported
  - Can become inefficient at very large scale

- **IPVS**
  - Uses Linux IP Virtual Server
  - More scalable and performant
  - Better for large clusters with many Services

- **userspace (legacy)**
  - Older, less efficient
  - Rarely used in modern clusters

IPVS is generally preferred for high-scale production environments.

---

### 4. Interaction with Other Components

kube-proxy:

- Depends on CNI for Pod networking
- Works with CoreDNS indirectly (DNS resolves Service → ClusterIP)
- Operates independently per cluster
- Does not perform cross-cluster routing

It is a data-plane component.

## Traffic Flow Mental Model

1. A Pod sends traffic to a Service DNS name.
2. CoreDNS resolves the name to a ClusterIP.
3. The packet reaches the node’s networking stack.
4. kube-proxy rules intercept the traffic.
5. Traffic is forwarded to one of the backend Pods.

kube-proxy maintains the translation layer between:

Stable virtual IP → Dynamic backend Pods

## Failure Characteristics

Common kube-proxy issues include:

- Services unreachable internally
- Traffic not balanced correctly
- High CPU usage at scale (iptables mode)
- Stale endpoint rules after rapid scaling events

If kube-proxy crashes:

- Existing rules may still function temporarily
- When restarted, it reconciles rules with the API state

It is part of Kubernetes’ reconciliation model.

## Check Your Knowledge

<quiz>
What is kube-proxy’s primary function?
- [x] Program node-level networking rules for Services
- [ ] Assign Pod IP addresses
- [ ] Schedule Pods to nodes
- [ ] Store cluster configuration
</quiz>

<quiz>
kube-proxy runs:
- [x] On every worker node
- [ ] Only on control plane nodes
- [ ] Only where Ingress is installed
- [ ] Inside CoreDNS Pods
</quiz>

<quiz>
Scenario: A Service ClusterIP is reachable on one node but not another. What is the most likely cause?
- [x] kube-proxy rules are not correctly applied on that node
- [ ] CoreDNS misconfiguration
- [ ] PersistentVolume binding failure
- [ ] Horizontal Pod Autoscaler misconfiguration
</quiz>

<quiz>
Which kube-proxy mode is typically more scalable for clusters with thousands of Services?
- [x] IPVS
- [ ] userspace
- [ ] iptables
- [ ] hostNetwork
</quiz>

<quiz>
When a Pod backing a Service fails readiness checks:
- [x] kube-proxy removes it from the Service endpoints
- [ ] The ClusterIP changes
- [ ] DNS deletes the Service record
- [ ] The node is cordoned
</quiz>

<quiz>
Scenario: kube-proxy crashes during operation. What ensures eventual recovery?
- [x] kube-proxy reconciles and reapplies rules when restarted
- [ ] Services regenerate new ClusterIPs
- [ ] Pods automatically switch to host networking
- [ ] The scheduler recreates all Services
</quiz>

<quiz>
kube-proxy does NOT:
- [x] Route traffic across clusters
- [ ] Implement Service load balancing
- [ ] Watch Service and Endpoint objects
- [ ] Update routing rules dynamically
</quiz>

<quiz>
Fill in the blank: kube-proxy maps a stable [[ClusterIP]] to dynamic [[backend Pods]].
</quiz>

## References

- [**The Kubernetes Book - Nigel Poulton**](https://www.amazon.com.br/Kubernetes-Book-Nigel-Poulton/dp/1916585000)