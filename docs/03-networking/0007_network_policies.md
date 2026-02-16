# Network Policies

## Problem

By default, all Pods can communicate freely. In multi-tenant or production clusters, unrestricted communication is a security risk.

## Solution

Network Policies enforce rules about which Pods can communicate, restricting ingress and egress traffic.

## Components / Key Concepts

- **Policy scope:** can be applied per Pod or namespace
- **Rules:** define allowed traffic for ingress and egress
- **CNI enforcement:** policies are implemented by the network plugin
- **Zero-trust model:** deny-by-default unless explicitly allowed
