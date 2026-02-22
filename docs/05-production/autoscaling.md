---
quiz:
  auto_number: true
  shuffle_answers: true
---

# Autoscaling

## What Problem Autoscaling Solves

Workloads are rarely constant.

Traffic can:

- Spike suddenly
- Drop during off-hours
- Grow gradually over time

Manual scaling is:

- Reactive
- Slow
- Error-prone

Too few replicas → performance issues  
Too many replicas → wasted resources  

Autoscaling makes scaling automatic and responsive.

## The Solution: Horizontal Pod Autoscaler (HPA)

The Horizontal Pod Autoscaler:

- Monitors metrics
- Adjusts replica count
- Scales up or down automatically

It works with:

- Deployments
- StatefulSets
- ReplicaSets

HPA changes the **desired replica count** of the target resource.

The workload controller then creates or deletes Pods to match that number.

## How HPA Works

1. Metrics are collected (via Metrics Server or custom metrics API)
2. HPA compares current usage to target utilization
3. It calculates required replicas
4. It updates the workload’s replica count

This loop runs continuously.

Scaling decisions are based on formulas, not guesses.

## Default Metric

By default, HPA uses:

- CPU utilization percentage

Example:

If target CPU is 60% and current usage averages 90%:

- HPA increases replicas

If usage drops below target:

- HPA scales down

## Custom & Advanced Metrics

HPA can also use:

- Memory utilization
- Requests per second
- Queue length
- External metrics (via adapters)

This enables scaling based on business metrics, not just CPU.

Production systems often use custom metrics.

## Metrics Server

HPA depends on:

- metrics-server

It provides:

- Pod CPU usage
- Pod memory usage

If metrics-server is missing:

- HPA cannot function properly

Always verify it's installed.

## Can HPA Scale to Zero?

By default:

- HPA does not scale below 1 replica

Scaling to zero requires:

- External metrics
- Specialized configurations (e.g., KEDA)

Do not assume zero scaling unless explicitly configured.

## Mental Model

HPA adjusts quantity.  
It does not:

- Change Pod resource limits
- Resize volumes
- Modify Services

It only changes:

- Replica count

More replicas = more capacity  
Fewer replicas = resource savings

## Common Failure Scenarios

- HPA not scaling → metrics-server missing
- Pods not scaling down → minReplicas too high
- Oscillating replicas → unstable metric targets
- High load but no scaling → resource requests misconfigured
- StatefulSet slow scaling → ordered startup behavior

Debug path:

1. Check `kubectl describe hpa`
2. Verify metrics-server
3. Confirm resource requests exist
4. Inspect scaling thresholds

## Check Your Knowledge

<quiz>
What happens when CPU usage exceeds the target defined in HPA?
- [x] Replica count increases
- [ ] Pods restart
- [ ] Service IP changes
- [ ] Nodes are added automatically
</quiz>

<quiz>
Why are resource requests important for HPA?
- [x] CPU utilization is calculated based on requests
- [ ] They determine Service routing
- [ ] They create PVCs
- [ ] They configure Ingress rules
</quiz>

<quiz>
Scenario: HPA is configured but replicas never change. What is a likely cause?
- [x] metrics-server is not installed
- [ ] kube-proxy is disabled
- [ ] PVC is not bound
- [ ] NetworkPolicy blocks scaling
</quiz>

<quiz>
If load drops significantly, what does HPA do?
- [x] Reduces replica count (respecting minReplicas)
- [ ] Deletes the Deployment
- [ ] Changes Pod IPs
- [ ] Resizes storage volumes
</quiz>

<quiz>
Which workloads can HPA scale? (Select all that apply)
- [x] Deployment
- [x] StatefulSet
- [ ] PersistentVolume
- [ ] Service
</quiz>

<quiz>
Fill in the blank: HPA modifies the [[replica count]] of a workload based on observed [[resource utilization]].
</quiz>

## References

- Kubernetes Documentation – Horizontal Pod Autoscaler  
- The Kubernetes Book – Nigel Poulton