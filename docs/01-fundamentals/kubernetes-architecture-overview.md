---
quiz:
  auto_number: true
  shuffle_answers: true
---

# Kubernetes Architecture Overview

Kubernetes architecture is **modular and layered**, designed for scalability and resilience.

## Components

- **Control Plane**: kube-apiserver, etcd, scheduler, controller-manager  
- **Node / Data Plane**: kubelet, kube-proxy, container runtime  
- **Add-ons**: DNS, metrics, ingress controllers

## Key Ideas

- Desired state declared by the user  
- Controllers reconcile actual vs desired state  
- Pods are ephemeral; controllers maintain replicas  
- Services provide stable networking  

## Quiz

<quiz>
Which layer manages the reconciliation loop?
- [x] Control Plane
- [ ] Data Plane
</quiz>

<quiz>
Which Kubernetes component runs on each node?
- [x] kubelet
- [x] kube-proxy
- [ ] kube-apiserver
- [ ] controller-manager
</quiz>

<quiz>
Fill the blank: [[Services]] provide stable networking for [[Pods]].
</quiz>

<quiz>
What is an example of an add-on in Kubernetes?
- [x] DNS
- [x] Metrics server
- [ ] kube-scheduler
- [ ] ReplicaSet
</quiz>

<quiz>
Why is Kubernetes layered architecture important?
- [x] Supports scalability and resilience
- [x] Separates concerns between control and data planes
- [ ] Simplifies container images
</quiz>