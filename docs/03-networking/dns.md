---
quiz:
  auto_number: true
  shuffle_answers: true
---

# DNS and Service Discovery

## Problem

Pods and Services are dynamic; IPs change frequently. How can applications find and communicate with each other reliably?

## Solution

Kubernetes provides DNS via CoreDNS. Each Service receives a stable DNS name, so Pods can use it to locate endpoints regardless of changing IPs.

## Components / Key Concepts

- **CoreDNS:** cluster DNS server
- **Service names:** `my-service.my-namespace.svc.cluster.local`
- **Automatic updates:** DNS entries update as Pods scale or move
- **Decoupled architecture:** applications reference Services, not Pod IPs

## Check your knowledge

<quiz>
What is CoreDNS used for in Kubernetes?

- [x] Service discovery and DNS resolution
- [ ] Pod IP assignment
- [ ] Enforcing network policies
- [ ] Load balancing HTTP traffic
</quiz>

<quiz>
Fill in the blank: A pod can reach a service using [[service-name.namespace.svc.cluster.local]] instead of IP.
</quiz>

<quiz>
Scenario: You create a new Service but pods cannot resolve its DNS name. What should you check? (Select all that apply)

- [x] CoreDNS pods are running
- [x] CoreDNS configuration is correct
- [ ] kube-proxy version
- [ ] Node CPU usage
</quiz>

<quiz>
Which DNS records does CoreDNS provide for services? (Select all that apply)

- [x] A record for pod IP
- [x] SRV record for service ports
- [ ] PTR record for node memory
- [ ] MX record for external mail
</quiz>

<quiz>
Fill in the blank: CoreDNS supports plugins for [[caching]], [[logging]], and [[conditional routing]].
</quiz>

<quiz>
Scenario: Pods in different namespaces cannot resolve each other’s services. Likely cause?

- [x] NetworkPolicy or RBAC restricting DNS access
- [x] Node disk space low
- [ ] kube-proxy crashed
- [ ] Pod resource requests missing
</quiz>
