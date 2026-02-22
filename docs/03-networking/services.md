---
quiz:
  auto_number: true
  shuffle_answers: true
---

# Kubernetes Services

## What Problem Services Solve

Pods are ephemeral:

- They are recreated
- Their IP addresses change
- They scale up and down

Directly connecting to Pod IPs is unreliable.

Applications need:

- A stable endpoint
- Automatic load balancing
- Service discovery

Kubernetes Services provide that abstraction.

## How Services Work

A Service:

- Gets a stable virtual IP (ClusterIP)
- Gets a DNS name
- Selects Pods via labels
- Load-balances traffic across matching Pods

Even if Pods are recreated:

- The Service IP does not change
- Endpoints are updated automatically
- Clients continue using the same DNS name

kube-proxy programs the data plane to route traffic correctly.

## Core Concepts

### 1. ClusterIP (Default)

- Internal-only access
- Reachable inside the cluster
- Most common type
- Foundation for other Service types

Used for internal microservices communication.

---

### 2. NodePort

- Exposes the Service on every node’s IP
- Allocates a port from a defined range
- Accessible externally via: `<NodeIP>:<NodePort>`

Useful for:

- Testing
- Simple external exposure
- On-prem environments

Requires firewall rules to allow traffic.

---

### 3. LoadBalancer

- Integrates with cloud providers
- Provisions an external load balancer
- Routes traffic to NodePorts internally

Common in:

- Cloud production deployments
- Public-facing applications

---

### 4. ExternalName

- Maps a Service to an external DNS name
- No proxying
- DNS-level alias only

Used for:

- External databases
- Third-party APIs

---

### 5. Service Selectors

A Service targets Pods using:

- Pod labels (primary mechanism)
- Namespace scoping

When scaling:

- New Pods matching labels are automatically included
- Removed Pods are automatically excluded

This makes Services dynamic and self-updating.

## Mental Model

Think of a Service as:

- A stable front door
- Behind it: rotating Pods
- Clients don’t care which Pod responds

Services provide:

- Stability
- Discovery
- Load balancing
- Decoupling between consumers and producers

## Common Failure Scenarios

- Service exists but no matching Pods → empty endpoints
- NodePort unreachable → firewall blocking
- kube-proxy not running → routing rules missing
- Selector mismatch → Service not targeting intended Pods
- Cloud LoadBalancer pending → provider integration issue

Debug path:

1. Check Service
2. Check Endpoints
3. Check Pod labels
4. Check kube-proxy
5. Check network/firewall

## Check Your Knowledge

<quiz>
Why does a Service remain reachable even when Pods are recreated?
- [x] The Service IP is stable
- [x] Endpoints update automatically
- [ ] Pod IPs never change
- [ ] DNS entries are static
</quiz>

<quiz>
Which Service type exposes an application externally using a cloud provider?
- [x] LoadBalancer
- [ ] ClusterIP
- [ ] ExternalPod
- [ ] PersistentService
</quiz>

<quiz>
Scenario: You create a Service but it has no endpoints. What is the most likely cause?
- [x] No Pods match the selector
- [ ] kube-scheduler failure
- [ ] etcd corruption
- [ ] DNS misconfiguration
</quiz>

<quiz>
Which statement about NodePort is correct?
- [x] It opens a port on every node
- [ ] It assigns a new Pod IP
- [ ] It works only inside the cluster
- [ ] It replaces kube-proxy
</quiz>

<quiz>
Fill in the blank: Services select backend Pods using [[labels]].
</quiz>

<quiz>
Scenario: After scaling a Deployment, traffic automatically distributes across new Pods. What enables this?
- [x] kube-proxy updating Service endpoints
- [ ] Manual DNS reconfiguration
- [ ] Static IP reassignment
- [ ] Node reboot
</quiz>

## References

- Kubernetes Documentation – Services  
- The Kubernetes Book – Nigel Poulton