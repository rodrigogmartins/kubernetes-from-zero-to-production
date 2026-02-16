# Phase 5 - Production & Operational Considerations in Kubernetes

Running applications in Kubernetes in production introduces new challenges: reliability, scaling, and resource management. This chapter covers the essential operational practices for production-grade clusters.

## Topics Covered

- [**Autoscaling**](./autoscaling.md) – Scaling Pods automatically based on workload.  
- [**Resource Requests & Limits**](./resource-requests-limits.md) – Ensuring fair and safe allocation of CPU and memory.  
- [**Probes**](./probes.md) – Liveness and readiness checks to maintain healthy applications.  
- [**Failure Scenarios**](./failure-scenarios.md) – Understanding common failures and strategies to mitigate them.

---

## Check Your Knowledge

1. **Autoscaling:**  
   - How does Horizontal Pod Autoscaler decide to scale up or down?  
   - What metrics can you use for autoscaling?

2. **Resource Requests & Limits:**  
   - Why are requests and limits important for Pod scheduling and stability?  
   - What happens if a Pod exceeds its CPU or memory limits?

3. **Probes:**  
   - Difference between liveness and readiness probes.  
   - How probes influence rolling updates and traffic routing.

4. **Failure Scenarios:**  
   - Name two common cluster-level failure scenarios.  
   - How can Kubernetes self-healing minimize downtime?

---

**Next Steps:**  
Apply these concepts in labs by creating resource-limited Pods, configuring probes, and testing autoscaling behaviors to reinforce your operational knowledge.
