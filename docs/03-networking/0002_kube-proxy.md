# Kube-Proxy

## Problem

Pods are ephemeral. If a Service points to individual Pods by IP, the endpoints would constantly break as Pods are recreated.

## Solution

Kube-proxy maintains network rules on each node to route traffic from Services to the correct backend Pods, enabling stable access and load balancing.

## Components / Key Concepts

- **iptables mode:** routes traffic using Linux iptables
- **IPVS mode:** high-performance routing with IP Virtual Server
- **Cluster IPs:** kube-proxy ensures Service IPs always reach the right Pods
- **Load balancing:** automatically distributes traffic across healthy Pods
