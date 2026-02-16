# Pod Networking

## Problem

Containers are ephemeral and may move between nodes. How can they reliably communicate with each other without knowing each other's IPs?

## Solution

Kubernetes assigns a unique IP to each Pod, allowing direct Pod-to-Pod communication across nodes. Containers in the same Pod share networking, so they can communicate via localhost.

## Components / Key Concepts

- **Pod IPs:** ephemeral, unique per Pod
- **Shared Namespace:** containers in the same Pod share IP, ports, and network namespace
- **Flat Network Model:** no NAT between Pods
- **Cross-node communication:** handled by CNI plugins and routing rules
