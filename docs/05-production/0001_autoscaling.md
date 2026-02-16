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
