# Ingress

Ingress defines **how external HTTP and HTTPS traffic enters a Kubernetes cluster** and reaches Services.

In *The Kubernetes Book*, Ingress is presented as a **routing abstraction**, not a traffic handler itself. Understanding this distinction is essential.

## What Is an Ingress

An Ingress is a **set of rules** that:

- Describe how external traffic should be routed
- Map hosts and paths to Services
- Operate at the HTTP layer (L7)

Ingress does not expose applications by itself.  
It requires an **Ingress Controller** to function.

## Why Ingress Exists

Without Ingress, exposing applications requires:

- Multiple LoadBalancer Services
- Complex networking setups
- Higher operational and cloud costs

Ingress exists to provide:

- Centralized HTTP routing
- Path-based and host-based access
- A simpler external entry point to the cluster

## Ingress vs Ingress Controller

A critical distinction:

- **Ingress**: declarative routing rules
- **Ingress Controller**: the component that enforces those rules

Common Ingress Controllers include:

- NGINX
- Traefik
- HAProxy
- Cloud-provider-specific controllers

Without a controller, Ingress objects have no effect.

## The Core Responsibility

Ingress answers one question:

> “How should external HTTP traffic be routed to internal Services?”

It does not manage Pods, networking at L3/L4, or application lifecycles.

## How Ingress Works

At a high level:

1. A client sends an HTTP request
2. The Ingress Controller receives the request
3. Routing rules are evaluated
4. Traffic is forwarded to a Service
5. The Service routes traffic to a Pod

Ingress always sits **in front of Services**, never directly in front of Pods.

## Common Routing Patterns

Ingress supports:

- **Host-based routing** (e.g., api.example.com)
- **Path-based routing** (e.g., /api, /web)
- TLS termination (controller-dependent)

These features enable multiple applications to share a single external endpoint.

## What Ingress Is NOT

Ingress is not:

- A general-purpose load balancer
- A replacement for Services
- A networking solution for non-HTTP traffic

Ingress operates strictly at the HTTP/HTTPS layer.

## Failure and Misconfiguration Scenarios

Common issues include:

- Missing or misconfigured Ingress Controller
- Incorrect Service references
- TLS misconfiguration
- DNS pointing to the wrong endpoint

Most Ingress failures are configuration-related, not platform bugs.

## When to Use Ingress

Ingress is appropriate when:

- Exposing multiple HTTP services
- Managing routing rules centrally
- Reducing cloud load balancer usage
- Operating at Layer 7

For non-HTTP traffic, other mechanisms are required.

## One-Sentence Mental Model

> “Ingress defines HTTP routing rules, and the Ingress Controller enforces them by directing external traffic to Services.”

## References

- [**The Kubernetes Book - Nigel-Poulton**](https://www.amazon.com.br/Kubernetes-Book-Nigel-Poulton/dp/1916585000)
