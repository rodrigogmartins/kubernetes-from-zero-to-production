---
quiz:
  auto_number: true
  shuffle_answers: true
---

# Kubernetes Architecture Overview

## The Problem

Orchestrating containers at scale is complex.

A system must:

- Accept user declarations
- Store cluster state reliably
- Decide where workloads run
- Maintain networking between components
- Recover automatically from failures
- Scale without breaking applications

Without structure and separation of responsibilities, orchestration becomes fragile and difficult to operate.

You need a layered architecture.

## The Solution

Kubernetes uses a **modular and layered architecture** designed for:

- Scalability
- Resilience
- Clear separation of concerns
- Automated reconciliation

The architecture is divided into:

- **Control Plane**
- **Data Plane (Nodes)**
- **Add-ons**

Each layer has a defined responsibility.

## Control Plane

The control plane manages the cluster.

It:

- Exposes the API
- Stores cluster state
- Schedules workloads
- Enforces desired configuration

Core components:

- kube-apiserver
- etcd
- kube-scheduler
- kube-controller-manager

The control plane runs the reconciliation loop.

It ensures actual state matches desired state.

## Data Plane (Nodes)

The data plane executes workloads.

Each node runs:

- kubelet
- kube-proxy
- Container runtime

Responsibilities:

- Run Pods
- Maintain node-level networking
- Report status back to control plane

Nodes execute.
They do not make global decisions.

## Add-ons

Add-ons extend cluster functionality.

Common examples:

- DNS (CoreDNS)
- Metrics server
- Ingress controllers

Add-ons are not core components but provide essential operational capabilities.

## Key Architectural Principles

Desired State Model  
Users declare what they want.

Reconciliation  
Controllers continuously compare:

- Desired state
- Actual state

If they differ, corrective action is taken.

Ephemeral Workloads  
Pods are replaceable.
Controllers maintain replica counts.

Stable Networking  
Services provide stable endpoints for Pods.

## Mental Model

API → Desired State  
Controllers → Reconciliation  
Nodes → Execution  
Services → Stability  

Kubernetes is a control loop system.

## Common Mistakes

- Confusing control plane with node components
- Thinking Pods are durable infrastructure
- Ignoring reconciliation behavior
- Assuming add-ons are part of the core control plane

Understanding the layering clarifies troubleshooting and scaling decisions.

## Check your knowledge

<quiz>
Which layer of Kubernetes is responsible for running the reconciliation loop?
- [x] Control Plane
- [ ] Data Plane
</quiz>

<quiz>
Which components run on every node? (multiple correct)
- [x] kubelet
- [x] kube-proxy
- [ ] kube-apiserver
- [ ] kube-controller-manager
</quiz>

<quiz>
Fill in the blank: [[Services]] provide stable networking for [[Pods]].
</quiz>

<quiz>
Which of the following are examples of Kubernetes add-ons? (multiple correct)
- [x] DNS
- [x] Metrics server
- [x] Ingress controller
- [ ] kube-scheduler
</quiz>

<quiz>
What is the primary purpose of controllers in Kubernetes?
- [x] To reconcile actual state with desired state
- [ ] To build container images
- [ ] To assign static IP addresses
- [ ] To replace kubelet
</quiz>

<quiz>
True or false: Nodes make cluster-wide scheduling decisions.
- [ ] True
- [x] False
</quiz>

<quiz>
Why is Kubernetes architecture layered?
- [x] To separate responsibilities between decision-making and execution
- [x] To improve scalability and resilience
- [ ] To eliminate the need for container runtimes
</quiz>