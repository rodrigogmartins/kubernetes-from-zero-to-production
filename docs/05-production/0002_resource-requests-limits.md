# Resource Requests & Limits

## The Problem

Pods competing for CPU and memory on a node can cause instability. Without proper limits, a single Pod can starve others or crash the node.

## Solution

Kubernetes allows setting **requests** and **limits** for CPU and memory:

- **Requests:** Guaranteed resources for scheduling the Pod on a node.  
- **Limits:** Maximum resources a Pod can use. Exceeding limits can throttle CPU or terminate the Pod if it exceeds memory.

## Components

| Component | Role                                              |
| --------- | ------------------------------------------------- |
| PodSpec   | Defines requests and limits in container spec.    |
| Scheduler | Uses requests to place Pods on appropriate nodes. |
| Kubelet   | Enforces resource limits at runtime.              |

## Check Your Knowledge

1. What is the difference between request and limit?  
2. What happens if a Pod exceeds its memory limit?  
3. How do requests influence the Kubernetes scheduler?
