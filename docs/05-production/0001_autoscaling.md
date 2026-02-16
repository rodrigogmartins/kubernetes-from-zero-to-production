---
quiz:
  auto_number: true
  shuffle_answers: true
---

# Autoscaling

## The Problem

Manual scaling of applications is slow and error-prone. Traffic spikes or sudden load can overwhelm Pods, leading to poor performance or outages.

## Solution

Kubernetes **Horizontal Pod Autoscaler (HPA)** automatically adjusts the number of replicas of a Deployment or StatefulSet based on observed metrics:

- CPU utilization (default)  
- Custom metrics (e.g., requests per second, memory usage)

The controller constantly monitors the metrics and increases or decreases replicas as needed.

## Components

| Component      | Role                                         |
| -------------- | -------------------------------------------- |
| HPA            | Watches metrics and scales target workloads. |
| Metrics Server | Provides metrics to HPA for decision making. |

## Check Your Knowledge

1. What metric does HPA use by default?  
2. Can HPA scale down to zero replicas?  
3. How does HPA interact with Deployments and StatefulSets?

## Check your knowledge

<quiz>
What does the Horizontal Pod Autoscaler (HPA) do in Kubernetes?

- [x] Automatically scales the number of pod replicas based on CPU/memory usage
- [ ] Assigns pods to nodes
- [ ] Manages persistent volumes
- [ ] Monitors service endpoints
</quiz>

<quiz>
Scenario: A web application experiences sudden traffic spikes. Which configuration will help maintain performance?

- [x] HPA with target CPU utilization
- [ ] Static Deployment with 3 replicas
- [ ] StatefulSet without PVC
- [ ] ConfigMap for environment variables
</quiz>

<quiz>
Fill in the blank: HPA adjusts the [[replica count]] of a deployment based on metrics from the [[metrics server]].
</quiz>

<quiz>
Which metrics can HPA use for scaling? (Select all that apply)

- [x] CPU utilization
- [x] Memory utilization
- [x] Custom metrics (e.g., request rate)
- [ ] Node labels
</quiz>

<quiz>
Scenario: A Deployment scales from 3 to 6 replicas due to HPA. Which of the following is true?

- [x] New pods are created to match the desired replica count
- [ ] Existing pods are deleted
- [ ] PVCs are automatically resized
- [ ] Service IP changes
</quiz>

<quiz>
Fill in the blank: HPA requires the [[metrics-server]] to be installed in the cluster to collect pod [[resource usage]].
</quiz>
