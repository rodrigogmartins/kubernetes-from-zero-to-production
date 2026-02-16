---
quiz:
  auto_number: true
  shuffle_answers: true
---

# Ingress

## Problem

Exposing multiple HTTP(S) Services externally can be complex. Hardcoding IPs or NodePorts doesn’t scale for many applications.

## Solution

Ingress provides HTTP(S) routing rules for multiple Services, including host-based and path-based routing, and optional TLS termination.

## Components / Key Concepts

- **Ingress resource:** defines routing rules in YAML
- **Ingress controller:** implements routing (e.g., Nginx, Traefik)
- **Host/path routing:** maps URLs to Services
- **TLS termination:** handles HTTPS at the cluster edge

## Check your knowledge

<quiz>
What is the main purpose of an Ingress resource?

- [x] Manage external HTTP/S traffic to services
- [ ] Assign pod IPs
- [ ] Schedule pods to nodes
- [ ] Enforce network policies
</quiz>

<quiz>
Fill in the blank: An Ingress controller watches Ingress resources and configures [[load balancers]] or [[reverse proxies]] accordingly.
</quiz>

<quiz>
Scenario: Traffic does not reach your service despite creating an Ingress. What could be the cause? (Select all that apply)

- [x] Ingress controller not deployed
- [x] Service name mismatch
- [ ] Pod resource limits too low
- [ ] ClusterIP changed
</quiz>

<quiz>
Which features can an Ingress resource configure? (Select all that apply)

- [x] Host-based routing
- [x] Path-based routing
- [x] TLS termination
- [ ] Persistent volume claims
</quiz>

<quiz>
Scenario: You have multiple Ingress rules for different hosts. Which component ensures correct routing?

- [x] Ingress controller
- [ ] kube-proxy
- [ ] CoreDNS
- [ ] CNI plugin
</quiz>
