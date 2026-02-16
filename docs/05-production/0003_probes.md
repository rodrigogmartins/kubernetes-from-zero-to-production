---
quiz:
  auto_number: true
  shuffle_answers: true
---

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

## Check your knowledge

<quiz>
What is the purpose of a liveness probe?

- [x] Determine if a container is still running; restart if necessary
- [ ] Determine if a node is healthy
- [ ] Monitor persistent volumes
- [ ] Load balance traffic
</quiz>

<quiz>
What is the purpose of a readiness probe?

- [x] Determine if a container is ready to receive traffic
- [ ] Scale pods automatically
- [ ] Monitor CPU usage
- [ ] Check network connectivity of nodes
</quiz>

<quiz>
Scenario: An application takes time to initialize. What probe helps prevent sending traffic before it’s ready?

- [x] Readiness probe
- [ ] Liveness probe
- [ ] Startup probe
- [ ] Node probe
</quiz>

<quiz>
Fill in the blank: Use a [[startup probe]] for containers that need a long [[initialization]] period before normal liveness/readiness checks.
</quiz>

<quiz>
Which types of probes are supported in Kubernetes? (Select all that apply)

- [x] HTTP GET
- [x] TCP socket
- [x] Exec command
- [ ] ICMP ping
</quiz>

<quiz>
Scenario: A pod fails liveness probe repeatedly. What happens?

- [x] Kubernetes kills the container and restarts it
- [ ] Kubernetes moves the pod to another node
- [ ] The pod remains running
- [ ] HPA scales the pod down
</quiz>
