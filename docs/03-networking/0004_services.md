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
