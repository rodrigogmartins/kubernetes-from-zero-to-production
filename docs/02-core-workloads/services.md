---
quiz:
  auto_number: true
  shuffle_answers: true
---

# Services

## The Problem

Pods are ephemeral.

When a Pod:

- Is recreated
- Crashes
- Is rescheduled
- Moves to another node

Its IP address changes.

If clients connect directly to Pod IPs:

Your application breaks the moment a Pod is replaced.

You need stable service discovery.

## The Solution

A **Service** provides:

- A stable virtual IP
- DNS name
- Load balancing across matching Pods

Clients connect to the Service.
The Service routes traffic to healthy Pods.

Pods can come and go.
The Service endpoint remains stable.

## How It Works

Service:

- Uses label selectors to match Pods
- Maintains a list of endpoints
- Distributes traffic across them

Flow:

Client → Service → Pod

Service abstracts Pod lifecycle instability.

## Service Types

### ClusterIP (default)

- Internal access only
- Accessible inside the cluster
- Most common type

Use for internal microservices.

---

### NodePort

- Exposes the Service on each node
- Uses a static port
- Accessible externally via NodeIP:NodePort

Simple but not ideal for production-scale routing.

---

### LoadBalancer

- Integrates with cloud provider
- Creates external load balancer
- Assigns public IP

Production-ready for cloud environments.

---

### ExternalName

- Maps Service to external DNS name
- No proxying
- DNS-level alias

Used to connect to external systems.

## What Services Do NOT Do

Services do not:

- Create Pods
- Manage scaling
- Perform rolling updates
- Guarantee application health

They route traffic.

Controllers manage lifecycle.

## Services and Scaling

When Pods scale up or down:

- Service automatically updates endpoints
- Traffic continues flowing

Clients never need to know how many Pods exist.

This is decoupling in practice.

## Mental Model

Pod = execution unit  
ReplicaSet/Deployment = lifecycle  
Service = stable access + load balancing  

Services isolate clients from infrastructure churn.

## Common Mistakes

- Hardcoding Pod IPs
- Exposing everything as NodePort
- Confusing Service with Ingress
- Forgetting label selector alignment

A Service with incorrect selectors routes to nothing.

Labels must match.

## Check your knowledge

<quiz>
What problem do Kubernetes Services solve?
- [x] Pod IPs are ephemeral, so services provide stable endpoints
- [ ] Pods cannot communicate with containers
- [ ] Nodes are replaced automatically
- [ ] ReplicaSets manage DNS
</quiz>

<quiz>
Fill in the blank: ClusterIP, NodePort, LoadBalancer, and ExternalName are [[types]] of Services.
</quiz>

<quiz>
Scenario: You have multiple Pods behind a service and want traffic balanced automatically. Which resource handles this?
- [x] Service
- [ ] Deployment
- [ ] ReplicaSet
- [ ] StatefulSet
</quiz>

<quiz>
Which of these are valid Service types? (multiple correct)
- [x] ClusterIP
- [x] NodePort
- [x] LoadBalancer
- [x] ExternalName
- [ ] Sidecar
</quiz>

<quiz>
True or false: Services are required to reach Pods inside the cluster.
- [ ] True
- [x] False
</quiz>

<quiz>
Scenario: You delete a Pod behind a Service. What happens?
- [x] The Service redirects traffic to the remaining Pods
- [ ] The Service stops working
- [ ] The Service creates a new Pod
- [ ] The Deployment must be updated
</quiz>

## References

- Kubernetes Documentation – Services  
- Kubernetes Networking Deep Dive – CNCF