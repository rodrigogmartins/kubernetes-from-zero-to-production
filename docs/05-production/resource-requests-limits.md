---
quiz:
  auto_number: true
  shuffle_answers: true
---

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

## Check your knowledge

<quiz>
Why are resource requests important in Kubernetes?

- [x] They define the minimum CPU/memory guaranteed to a container
- [ ] They schedule pods to specific nodes
- [ ] They configure network policies
- [ ] They automatically scale pods
</quiz>

<quiz>
What happens if a pod exceeds its resource limit?

- [x] It may be throttled (CPU) or killed (memory)
- [ ] It is automatically moved to another node
- [ ] It will scale horizontally
- [ ] Nothing; Kubernetes ignores limits
</quiz>

<quiz>
Scenario: You have a high-memory application. How should you configure resources?

- [x] Set request to minimum required and limit to max expected memory
- [ ] Set request equal to limit
- [ ] Leave requests and limits empty
- [ ] Use only CPU limits
</quiz>

<quiz>
Which of the following are valid Kubernetes resource types for requests and limits? (Select all that apply)

- [x] cpu
- [x] memory
- [ ] storageClass
- [ ] networkPolicy
</quiz>

<quiz>
Fill in the blank: Proper resource requests and limits prevent [[resource contention]] and improve [[cluster stability]].
</quiz>
