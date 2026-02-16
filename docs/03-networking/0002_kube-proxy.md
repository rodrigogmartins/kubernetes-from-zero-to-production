---
quiz:
  auto_number: true
  shuffle_answers: true
---

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

## Check your knowledge

<quiz>
What is the main responsibility of kube-proxy?

- [x] Handle network traffic to services and implement load balancing
- [ ] Store cluster state in etcd
- [ ] Schedule pods to nodes
- [ ] Monitor pod health
</quiz>

<quiz>
Kube-proxy runs on:

- [x] Every worker node
- [ ] Only the master node
- [ ] Only nodes with ingress enabled
- [ ] External load balancers
</quiz>

<quiz>
Which traffic does kube-proxy handle?

- [x] Pod-to-service traffic
- [ ] DNS resolution
- [ ] Persistent volume mounts
- [ ] API server requests
</quiz>

<quiz>
Which modes can kube-proxy run in?

- [x] iptables, ipvs, userspace
- [ ] NAT, bridge, overlay
- [ ] Calico, Flannel, Weave
- [ ] DNS, ingress, egress
</quiz>

<quiz>
You deploy a Service of type ClusterIP, but pods can't reach it. What should you check first?

- [x] kube-proxy rules
- [ ] PersistentVolumeClaim
- [ ] kube-scheduler
- [ ] ConfigMap
</quiz>

<quiz>
In iptables mode, what happens when a pod backing a Service dies?

- [x] kube-proxy updates iptables rules to remove the dead pod
- [ ] DNS records are deleted
- [ ] ClusterIP changes
- [ ] kubelet recreates the pod automatically
</quiz>

<quiz>
Your cluster has thousands of services and pods. You notice high CPU usage by kube-proxy. Which mode could improve performance?

- [x] ipvs
- [ ] userspace
- [ ] iptables
- [ ] hostNetwork
</quiz>

<quiz>
In a multi-cluster scenario, you notice a Service accessible within one cluster but not across clusters. What is the likely limitation?

- [x] kube-proxy operates per cluster and doesn’t handle cross-cluster routing
- [ ] CNI plugin doesn’t support multiple namespaces
- [ ] PersistentVolume is missing
- [ ] kube-scheduler misassigned pods
</quiz>

<quiz>
During an upgrade, kube-proxy crashes and pods temporarily lose access to services. What mechanism ensures traffic recovers automatically?

- [x] kube-proxy restarting and reapplying rules
- [ ] Services automatically change ClusterIP
- [ ] Pods switch to hostNetwork
- [ ] API server reroutes traffic
</quiz>
