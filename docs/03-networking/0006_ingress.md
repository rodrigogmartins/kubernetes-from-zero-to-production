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
