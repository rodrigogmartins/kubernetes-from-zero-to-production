---
quiz:
  auto_number: true
  shuffle_answers: true
---

# Ingress

## What Problem Ingress Solves

Exposing applications externally in Kubernetes can quickly become complex.

Using:

- **NodePort** exposes high ports on every node.
- **LoadBalancer Services** create one external load balancer per Service.

This does not scale well when:

- You have many applications
- You need host-based routing (e.g., api.example.com, app.example.com)
- You require centralized TLS termination
- You want a single entry point into the cluster

Ingress provides a **layer 7 (HTTP/S) routing abstraction** that consolidates external access.

---

## How Ingress Works

Ingress is composed of two parts:

1. **Ingress Resource**
   - A declarative YAML object
   - Defines routing rules (host, path, TLS)

2. **Ingress Controller**
   - A running component in the cluster
   - Watches Ingress resources
   - Configures a reverse proxy or load balancer

Important:

Creating an Ingress resource alone does nothing.  
Without a controller, routing will not function.

---

## Core Concepts

### 1. Host-Based Routing

Ingress can route traffic based on the HTTP Host header:

- api.example.com → api-service
- app.example.com → frontend-service

This allows multiple applications to share one external IP.

---

### 2. Path-Based Routing

Ingress can route based on URL paths:

- example.com/api → api-service
- example.com/web → frontend-service

This enables microservices to share a single domain.

---

### 3. TLS Termination

Ingress can terminate HTTPS traffic:

- TLS certificates are configured in the Ingress resource
- Decryption happens at the Ingress controller
- Traffic to backend Services may remain HTTP internally

This centralizes certificate management.

---

### 4. Controller Implementations

Common Ingress controllers include:

- NGINX Ingress Controller
- Traefik
- HAProxy
- Cloud-native controllers (e.g., AWS ALB Ingress Controller)

The controller determines:

- Performance characteristics
- Feature support
- Load balancing behavior

---

## Traffic Flow Mental Model

1. External client sends HTTPS request.
2. Request reaches external LoadBalancer.
3. LoadBalancer forwards traffic to Ingress controller Pods.
4. Controller evaluates host/path rules.
5. Request is forwarded to the matching Service.
6. kube-proxy routes to a backend Pod.

Ingress manages HTTP routing logic.  
Services handle internal load balancing.

---

## Operational Considerations

Common failure scenarios:

- Ingress controller not deployed
- Ingress class mismatch
- Service name mismatch
- TLS secret misconfiguration
- Incorrect path type
- DNS not pointing to LoadBalancer

Ingress is application-layer routing.  
It does not replace:

- kube-proxy
- CNI plugins
- Services

---

## Check Your Knowledge

<quiz>
What is required for an Ingress resource to function?
- [x] An Ingress controller must be running
- [ ] A PersistentVolumeClaim must exist
- [ ] kube-proxy must be disabled
- [ ] CoreDNS must be restarted
</quiz>

<quiz>
Which problem does Ingress primarily solve?
- [x] Consolidated HTTP/S routing to multiple Services
- [ ] Assigning Pod IP addresses
- [ ] Enforcing container CPU limits
- [ ] Providing cross-node networking
</quiz>

<quiz>
Scenario: You create an Ingress, but no external IP appears. What is the most likely cause?
- [x] No Ingress controller is installed
- [ ] Pods lack readiness probes
- [ ] NetworkPolicy blocks egress
- [ ] Resource limits are missing
</quiz>

<quiz>
Which routing features are supported by Ingress? (Select all that apply)
- [x] Host-based routing
- [x] Path-based routing
- [x] TLS termination
- [ ] Direct Pod-to-Pod routing
</quiz>

<quiz>
Scenario: Traffic reaches the Ingress controller but returns 404. Which is the most likely cause?
- [x] No matching host or path rule
- [ ] PVC is unbound
- [ ] kubelet misconfiguration
- [ ] CNI IP exhaustion
</quiz>

<quiz>
TLS termination at the Ingress layer means:
- [x] HTTPS is decrypted at the cluster edge
- [x] Backend Services can receive HTTP traffic internally
- [ ] Pods must handle certificates individually
- [ ] kube-proxy manages certificate rotation
</quiz>

<quiz>
Fill in the blank: An Ingress controller configures a [[reverse proxy]] or [[load balancer]] based on Ingress resources.
</quiz>

## References

- [**The Kubernetes Book - Nigel Poulton**](https://www.amazon.com.br/Kubernetes-Book-Nigel-Poulton/dp/1916585000)