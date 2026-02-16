---
quiz:
  auto_number: true
  shuffle_answers: true
---

# Pod Networking

## Problem

Containers are ephemeral and may move between nodes. How can they reliably communicate with each other without knowing each other's IPs?

## Solution

Kubernetes assigns a unique IP to each Pod, allowing direct Pod-to-Pod communication across nodes. Containers in the same Pod share networking, so they can communicate via localhost.

## Components / Key Concepts

- **Pod IPs:** ephemeral, unique per Pod
- **Shared Namespace:** containers in the same Pod share IP, ports, and network namespace
- **Flat Network Model:** no NAT between Pods
- **Cross-node communication:** handled by CNI plugins and routing rules

## Check your knowledge

<quiz>
    What is the main purpose of the Pod network in Kubernetes?

    - [x] Allow all pods to communicate with each other across nodes
    - [ ] Isolate pods from each other
    - [ ] Manage persistent storage
    - [ ] Load balance external traffic
</quiz>

<quiz>
    In Kubernetes, each Pod gets:

    - [ ] Shared IP with other pods on the same node
    - [x] A unique IP across the cluster
    - [ ] An IP only valid inside the node
    - [ ] No IP, only DNS name
</quiz>

<quiz>  
    What allows pods to communicate without NAT or port mapping?

    - [x] The flat pod network model
    - [ ] Ingress controllers
    - [ ] NodePort services
    - [ ] Persistent volumess
</quiz>

<quiz>
Which networking model does Kubernetes assume for pods by default?

- [ ] NAT per pod
- [x] Flat network where each pod has a unique IP
- [ ] Only node-local IPs
- [ ] DNS-based networking only
</quiz>

<quiz>
You notice pods on different nodes cannot reach each other. Which component is most likely misconfigured?

- [x] CNI plugin
- [ ] kubelet
- [ ] etcd
- [ ] kube-apiserver
</quiz>

<quiz>
In a multi-node cluster, pod A needs to send traffic to pod B. Which mechanism ensures this traffic is routed correctly?
- [x] CNI networking plugin
- [ ] kube-proxy in userspace mode
- [ ] NodePort service only
- [ ] Host networking
</quiz>

<quiz>
You deploy a network policy restricting ingress to certain pods. After deployment, some pods can't communicate even though they’re in the same namespace. What might be the cause?

- [x] The network plugin is enforcing policies at the pod level
- [ ] kube-proxy failed to create iptables rules
- [ ] The pods have duplicate IPs
- [ ] Service type ClusterIP is disabled
</quiz>

<quiz>
Why does Kubernetes not allow multiple pods to share the same IP address across nodes?

- [x] To ensure direct pod-to-pod communication without NAT or port mapping
- [ ] Because it requires external load balancers
- [ ] To simplify DNS resolution only
- [ ] Because CNI plugins don’t support it
</quiz>

<quiz>
    A pod is running with hostNetwork: true. What is the implication for network isolation?

    - [x] Pod shares the node’s network namespace and IP, bypassing the pod network
    - [ ] Pod is isolated and cannot communicate externally
    - [ ] Pod gets a unique cluster-wide IP like other pods
    - [ ] Pod cannot reach services on the same node
</quiz>
