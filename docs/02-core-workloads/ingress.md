---
quiz:
  auto_number: true
  shuffle_answers: true
---

# Ingress

## The Problem

By default, Services are internal to the cluster.

Exposing applications externally using:

- NodePort
- LoadBalancer per Service

Does not scale well.

You end up with:

- Multiple external IPs
- No centralized routing
- No unified TLS handling
- Hard-to-manage configurations

You need a single entry point.

## The Solution

**Ingress** provides HTTP/HTTPS routing to Services.

It enables:

- Host-based routing (example.com, api.example.com)
- Path-based routing (/api, /web)
- TLS termination
- Centralized external access

Ingress defines the rules.

An Ingress Controller enforces them.

## Important Distinction

Ingress Resource:

- Declarative routing rules

Ingress Controller:

- Actual implementation of routing
- Reverse proxy + load balancer

Without a controller, Ingress does nothing.

Common controllers:

- NGINX
- Traefik
- HAProxy

## How It Works

Client → Ingress Controller → Service → Pods

The controller:

1. Receives external HTTP/HTTPS traffic
2. Matches host/path rules
3. Routes traffic to the correct Service
4. Optionally handles TLS termination

Ingress operates at Layer 7 (HTTP).

## Routing Types

Host-based routing:

- api.example.com → api-service
- web.example.com → web-service

Path-based routing:

- example.com/api → api-service
- example.com/web → web-service

This allows multiple services behind one domain.

## TLS Termination

Ingress can:

- Terminate HTTPS
- Manage certificates
- Redirect HTTP → HTTPS

Centralizing TLS simplifies security management.

Without Ingress, each Service would need its own TLS handling.

## When NOT to Use Ingress

- Non-HTTP protocols
- Internal-only communication
- Simple single-service exposure (LoadBalancer may be enough)

Ingress is for HTTP traffic management.

## Mental Model

Service = internal load balancing  
Ingress = external HTTP routing layer  

Service handles Pod distribution.  
Ingress handles external traffic direction.

They solve different layers of networking.

## Common Mistakes

- Creating Ingress without installing a controller
- Exposing sensitive services publicly
- Misconfiguring TLS secrets
- Forgetting DNS configuration

Ingress depends on DNS + controller + Service configuration.

## Check your knowledge

<quiz>
What is the main purpose of Ingress in Kubernetes?
- [x] Expose HTTP/HTTPS routes to Services
- [ ] Store persistent data
- [ ] Schedule Pods
- [ ] Manage ReplicaSets
</quiz>

<quiz>
Fill in the blank: An Ingress resource defines [[routing rules]] and [[TLS configuration]] for external traffic.
</quiz>

<quiz>
Scenario: You need to expose multiple services on the same domain with different paths. Which resource should you use?
- [x] Ingress
- [ ] NodePort
- [ ] Service
- [ ] Deployment
</quiz>

<quiz>
Which of the following require an Ingress Controller? (multiple correct)
- [x] NGINX
- [x] Traefik
- [x] HAProxy
- [ ] ClusterIP
- [ ] ReplicaSet
</quiz>

<quiz>
True or false: Ingress can handle SSL/TLS termination.
- [x] True
- [ ] False
</quiz>

<quiz>
Scenario: You have a Service running on `/api` and another on `/web`. You want both accessible via `example.com`. How do you configure?
- [x] Use an Ingress with path-based routing
- [ ] Expose each Service via NodePort
- [ ] Create two Deployments
- [ ] Use ClusterIP only
</quiz>

## References

- Kubernetes Documentation – Ingress  
- Kubernetes Networking Deep Dive – CNCF