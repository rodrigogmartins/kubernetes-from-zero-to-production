---
quiz:
  auto_number: true
  shuffle_answers: true
---

# Services

## The Problem

Pods are ephemeral:

- They are recreated
- Their IPs change
- They scale dynamically

Directly connecting to Pod IPs creates fragile systems.

Applications need:

- A stable endpoint
- Built-in load balancing
- Decoupling from Pod lifecycle

## The Solution

A **Service** provides:

- A stable virtual IP (ClusterIP)
- A DNS name
- Load balancing across matching Pods

Clients communicate with the Service.
The Service routes traffic to healthy Pods.

Pods can change.
The Service endpoint does not.

## Service Types (When to Use Each)

### ClusterIP (Default)

- Internal-only access
- Used for microservice-to-microservice communication
- Most common type

Use when:
Internal services must communicate reliably.

---

### NodePort

- Exposes the Service on every node
- Accessible via `<NodeIP>:NodePort`

Use when:
- Testing
- Simple on-prem exposure
- No cloud load balancer available

---

### LoadBalancer

- Creates an external cloud load balancer
- Exposes Service publicly

Use when:
- Public production workloads
- Cloud environments

---

### ExternalName

- Maps Service to external DNS
- No proxying

Use when:
- Connecting to external systems
- Migrating legacy services

## What Services Do NOT Do

Services do not:

- Create Pods
- Perform scaling
- Manage rollouts
- Guarantee application health

They provide stable connectivity.

## Design Principle

Service = Stable access layer  
Deployment = Lifecycle management  
Pod = Execution unit  

## Check your knowledge

<quiz>
A company runs a Deployment with multiple Pods behind a Service. During rolling updates, Pod IPs change. Clients continue accessing the application without interruption. What ensures this behavior?

- [x] The Service provides a stable virtual IP and updates endpoints automatically
- [ ] The Pods retain their original IP addresses
- [ ] The Deployment rewrites DNS records
- [ ] kube-scheduler pins Pods to the same node
</quiz>

<quiz>
A startup deploys an internal API consumed only by other services inside the cluster. The API must not be exposed externally. Which Service type should be used?

- [x] ClusterIP
- [ ] NodePort
- [ ] LoadBalancer
- [ ] ExternalName
</quiz>

<quiz>
An application running in a cloud environment must be accessible from the public internet with minimal operational overhead. Which Service type is most appropriate?

- [x] LoadBalancer
- [ ] ClusterIP
- [ ] NodePort
- [ ] Headless Service
</quiz>

<quiz>
A team exposes a Service but traffic does not reach any Pods. What is the MOST likely cause?

- [x] The Service selector does not match Pod labels
- [ ] The Deployment replica count is too high
- [ ] The Pods are using localhost incorrectly
- [ ] The container image is outdated
</quiz>

<quiz>
After scaling a Deployment from 3 to 10 Pods, traffic automatically distributes across all Pods. What Kubernetes feature enables this?

- [x] Service endpoint updates
- [ ] Manual DNS modification
- [ ] Static IP assignment
- [ ] Node affinity rules
</quiz>