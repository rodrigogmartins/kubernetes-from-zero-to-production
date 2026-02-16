# Failure Scenarios

## The Problem

Even well-configured clusters can experience failures: node crashes, network partitions, Pod evictions, or resource exhaustion. Developers must understand these to design resilient systems.

## Common Failures

| Failure Type        | Example / Mitigation                                                 |
| ------------------- | -------------------------------------------------------------------- |
| Node failure        | K8s reschedules Pods to healthy nodes automatically.                 |
| Pod crash           | Liveness probes and restartPolicy handle self-healing.               |
| Resource starvation | Requests and limits prevent one Pod from starving others.            |
| Network issues      | Services and DNS allow Pods to continue communicating after failure. |

## Solution

- Use **replicas** to increase availability.  
- Configure **probes** for self-healing.  
- Apply **resource requests/limits** to prevent starvation.  
- Consider **multi-zone deployments** for higher resilience.

## Check Your Knowledge

1. How does Kubernetes handle a Pod crash automatically?  
2. What is the role of replication in mitigating failures?  
3. How do resource limits reduce cascading failures in a cluster?
