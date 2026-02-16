# Probes

## The Problem

Pods may become unhealthy or fail silently. Without checks, traffic might be routed to unresponsive containers, causing downtime.

## Solution

Kubernetes provides **liveness** and **readiness** probes:

- **Liveness Probe:** Detects when a container is dead or stuck; Kubernetes restarts it automatically.  
- **Readiness Probe:** Determines whether a Pod is ready to serve traffic; only ready Pods receive requests.

## Components

| Probe Type              | Role                                            |
| ----------------------- | ----------------------------------------------- |
| HTTP/Command/TCP probes | Mechanisms to check container health.           |
| Controller              | Uses probe results to restart or route traffic. |

## Check Your Knowledge

1. When would you use a liveness probe vs readiness probe?  
2. How do probes affect rolling updates?  
3. Can a Pod be alive but not ready?
