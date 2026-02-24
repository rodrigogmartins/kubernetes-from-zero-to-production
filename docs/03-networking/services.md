---
quiz:
  auto_number: true
  shuffle_answers: true
---

# Services – Networking Deep Dive

## Internal Architecture

A Service is implemented using:

- ClusterIP (virtual IP)
- Endpoints / EndpointSlices
- kube-proxy (data plane programming)
- iptables or IPVS rules

Service routing is not magic.
It is programmed network rules.

## Traffic Flow

Client → ClusterIP  
ClusterIP → kube-proxy rules  
kube-proxy → Pod IP  

kube-proxy watches the API server and:

- Updates routing rules when Pods scale
- Removes failed Pod endpoints
- Distributes traffic across healthy backends

## EndpointSlices

Modern Kubernetes uses:

- EndpointSlices instead of a single Endpoints object
- Improves scalability
- Reduces API server load

Critical in large clusters.

## Data Plane Implementation

kube-proxy modes:

- iptables
- IPVS

IPVS is more scalable and performant for large environments.

## NodePort Internals

NodePort:

- Allocates port (30000–32767 by default)
- Opens that port on every node
- Routes traffic to ClusterIP internally

LoadBalancer builds on NodePort.

## Common Failure Scenarios

1. Service has no endpoints  
   → Selector mismatch  

2. NodePort unreachable  
   → Firewall blocking  

3. Traffic not routing  
   → kube-proxy not running  

4. High latency  
   → iptables scaling issue  

## Debug Strategy

1. kubectl get svc  
2. kubectl get endpoints / endpointslices  
3. Check Pod labels  
4. Check kube-proxy logs  
5. Verify node firewall rules  

## Check Your Knowledge (AWS-style)

<quiz>
A Service is created but shows no endpoints. Pods are running successfully. What is the MOST likely cause?

- [x] The Service selector does not match Pod labels
- [ ] kube-proxy is running in IPVS mode
- [ ] The Pods are using host networking
- [ ] The cluster DNS is misconfigured
</quiz>

<quiz>
An organization runs a large cluster with thousands of Services and experiences performance issues in service routing. Which kube-proxy mode provides better scalability?

- [x] IPVS
- [ ] iptables
- [ ] hostNetwork
- [ ] bridge mode
</quiz>

<quiz>
A LoadBalancer Service is created in a cloud environment. Which underlying mechanism enables external traffic routing to Pods?

- [x] NodePort combined with a cloud provider load balancer
- [ ] Direct Pod IP exposure
- [ ] Ingress Controller
- [ ] StatefulSet routing
</quiz>

<quiz>
After scaling a Deployment, new Pods are not receiving traffic. kube-proxy is running. What should be checked first?

- [x] Whether the new Pods match the Service selector
- [ ] Whether etcd is healthy
- [ ] Whether the node OS is updated
- [ ] Whether CoreDNS restarted
</quiz>

<quiz>
Fill in the blank: kube-proxy programs the cluster data plane using [[iptables]] or [[IPVS]].
</quiz>