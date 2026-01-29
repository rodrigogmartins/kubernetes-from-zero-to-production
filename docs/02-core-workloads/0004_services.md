# Services

Services provide **stable networking for ephemeral Pods**.

In Kubernetes, Pods come and go, and their IP addresses change frequently. Services solve this problem by offering a **consistent access point** to a dynamic set of Pods.

According to *The Kubernetes Book*, Services are a core abstraction that decouples **how applications run** from **how they are reached**.

## What Is a Service

A Service is a **stable virtual endpoint** that:

- Selects Pods using labels
- Exposes them through a consistent IP and DNS name
- Distributes traffic across matching Pods

A Service does not represent a single Pod — it represents a **logical group** of Pods.

## Why Services Exist

Pods are disposable and unpredictable:

- They restart
- They are rescheduled
- Their IPs change

Without Services, applications would need to constantly track Pod IPs.

Services exist to provide:

- Stable networking
- Service discovery
- Loose coupling between components

## The Core Responsibility

A Service answers one question:

> “How can this application be reached reliably, even as Pods change?”

It hides Pod churn from consumers.

## How Services Work

Services operate using:

- **Label selectors** to identify target Pods
- **kube-proxy** to implement traffic routing
- **Cluster DNS** to provide name resolution

Traffic sent to a Service is transparently forwarded to one of the matching Pods.

## Service Types

Kubernetes provides different Service types for different use cases:

- **ClusterIP** — internal-only access (default)
- **NodePort** — exposes a port on each node
- **LoadBalancer** — integrates with cloud load balancers
- **ExternalName** — maps a Service to an external DNS name

Each type builds on the same core abstraction.

## Services Are Not Load Balancers

A common misconception is that Services are full-featured load balancers.

In reality:

- Services perform basic traffic distribution
- They do not provide advanced routing
- They do not terminate TLS
- They do not understand HTTP semantics

These responsibilities belong to higher-level components.

## Service Discovery

Services integrate with cluster DNS to enable discovery via names instead of IPs.

This allows applications to communicate using **logical identifiers**, not infrastructure details.

Service names are stable even when Pods are replaced.

## Failure Scenarios to Understand

- Services route traffic only to healthy Pods
- Misconfigured selectors can result in zero endpoints
- Pods without readiness do not receive traffic

Many connectivity issues are caused by selector mismatches.

## When to Reason About Services Explicitly

You reason about Services when:

- Designing application communication
- Debugging networking issues
- Investigating dropped or misrouted traffic
- Exposing workloads inside the cluster

Services are a foundational networking primitive.

## One-Sentence Mental Model

> “A Service provides a stable network identity that forwards traffic to a changing set of Pods.”

## References

- [**The Kubernetes Book - Nigel-Poulton**](https://www.amazon.com.br/Kubernetes-Book-Nigel-Poulton/dp/1916585000)
