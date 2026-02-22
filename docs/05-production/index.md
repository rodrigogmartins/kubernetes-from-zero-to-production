---
quiz:
  auto_number: true
  shuffle_answers: true
---

# Phase 5 - Production & Operational Considerations in Kubernetes

This phase focuses on **what changes when Kubernetes moves from development to production**.

Running containers is only the beginning. In production environments, workloads must be:

- Reliable under failure
- Efficient with resource usage
- Able to scale automatically
- Protected from cascading instability

This phase introduces the operational mechanisms that make Kubernetes production-ready.

## What This Phase Covers

This phase introduces the core operational controls responsible for:

- Automatically scaling workloads based on demand
- Preventing resource starvation between applications
- Detecting unhealthy containers
- Reducing downtime during failures

The main concepts covered are:

- **Autoscaling** — automatic scaling based on workload demand
- **Resource Requests & Limits** — CPU and memory guarantees and caps
- **Probes** — liveness and readiness health checks
- **Failure Scenarios** — common production failures and mitigation strategies

These mechanisms ensure clusters remain stable under load and resilient during disruption.

## Why Operational Controls Exist

In production, workloads face real-world conditions:

- Traffic spikes
- Node failures
- Memory leaks
- Slow startups
- Partial outages

Without guardrails, this can cause:

- Resource contention
- Cascading failures
- Unpredictable scaling
- Downtime during updates

Kubernetes introduces operational primitives to enforce:

- Predictable resource allocation
- Automated scaling behavior
- Health-driven traffic routing
- Self-healing under failure

The goal is not just to run containers —  
the goal is to run them **safely and sustainably**.

## The Core Mental Model

Production Kubernetes is governed by three principles:

1. **Declarative Scaling**
   You define scaling rules. Kubernetes adjusts replicas automatically.

2. **Controlled Resource Allocation**
   Every Pod declares what it needs and its maximum usage.

3. **Health-Driven Traffic Flow**
   Only healthy Pods receive traffic.

Failures are expected.  
The system is designed to react automatically.

## How These Concepts Fit Together

At a high level:

- **Resource Requests** influence scheduling decisions.
- **Resource Limits** prevent a Pod from overwhelming a node.
- **Probes** determine whether a container is alive and ready.
- **Autoscalers** adjust replica counts based on metrics.
- During failures, controllers replace unhealthy Pods automatically.

Together, these mechanisms:

- Maintain cluster stability
- Enable horizontal scalability
- Reduce manual intervention
- Improve uptime

They transform Kubernetes from a deployment platform into an operational platform.

## Scope and Intent

Following the established structure:

- Emphasis is placed on operational reasoning before YAML syntax
- Failure behavior is explained conceptually
- Scaling and health are treated as system design concerns

Hands-on labs will reinforce how scaling, probes, and limits behave under real conditions.

## Check Your Knowledge

<quiz>
Horizontal Pod Autoscaler scales based on:
- [x] Observed metrics such as CPU usage
- [x] Desired target thresholds
- [ ] Manual replica count changes only
- [ ] Pod IP availability
</quiz>

<quiz>
Resource Requests are important because:
- [x] They influence Pod scheduling
- [x] They reserve minimum resources
- [ ] They automatically scale Pods
- [ ] They expose applications externally
</quiz>

<quiz>
What happens if a container exceeds its memory limit?
- [x] It can be terminated (OOMKilled)
- [ ] Kubernetes increases the limit automatically
- [ ] Traffic is automatically rerouted permanently
- [ ] The node is deleted
</quiz>

<quiz>
Readiness probes determine:
- [x] Whether a Pod should receive traffic
- [ ] Whether a container process is running
- [x] Whether a Pod is prepared to handle requests
- [ ] How many replicas should exist
</quiz>

<quiz>
Kubernetes self-healing includes:
- [x] Restarting failed containers
- [x] Recreating Pods when nodes fail
- [ ] Preventing all failures from occurring
- [ ] Automatically fixing application bugs
</quiz>

## References

- [**The Kubernetes Book - Nigel-Poulton**](https://www.amazon.com.br/Kubernetes-Book-Nigel-Poulton/dp/1916585000)