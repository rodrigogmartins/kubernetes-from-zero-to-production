---
quiz:
  auto_number: true
  shuffle_answers: true
---

# Kubernetes Services

## Problem

Pod IPs are ephemeral. Without a stable endpoint, other Pods or external clients cannot reliably reach them.

## Solution

A Service provides a stable IP and DNS name that abstracts a set of Pods. Traffic is load-balanced automatically across available Pods.

## Components / Key Concepts

- **ClusterIP:** internal-only access
- **NodePort:** exposes Service on each node
- **LoadBalancer:** cloud-integrated external access
- **ExternalName:** maps to an external DNS
- **Service selector:** determines which Pods belong to the Service

## Check your knowledge

<quiz>
What is the main purpose of a Kubernetes Service?

- [x] Provide stable network access to a set of pods
- [ ] Assign persistent storage
- [ ] Schedule pods to nodes
- [ ] Store cluster state
</quiz>

<quiz>
Which Service types exist in Kubernetes? (Select all that apply)

- [x] ClusterIP
- [x] NodePort
- [x] LoadBalancer
- [ ] ExternalPod
</quiz>

<quiz>
Fill in the blank: A Service of type ClusterIP is reachable only from [[within the cluster]].
</quiz>

<quiz>
Scenario: You scale a Deployment from 3 to 6 pods. What happens to the Service behind it?

- [x] The ClusterIP stays the same
- [x] kube-proxy updates the backend endpoints
- [ ] You must update the DNS manually
- [ ] Pods retain the same IPs
</quiz>

<quiz>
Multiple choice: Which of these are valid Service selectors? (Select all that apply)

- [x] pod labels
- [x] namespace labels
- [ ] Node annotations
- [ ] PersistentVolume labels
</quiz>

<quiz>
Scenario: A NodePort service is not accessible from outside the cluster. What could be the reason?

- [x] Firewall blocking the port
- [x] kube-proxy not running
- [ ] Pod CPU limits too low
- [ ] Service type is ClusterIP
</quiz>
