# Phase 3 - Kubernetes Networking

Networking in Kubernetes is essential for communication between Pods, Services, and external clients. This chapter explains how Kubernetes handles networking challenges, solves service discovery, and enforces security between workloads.

## Topics Covered

- [Pod Networking](./0001_pod-networking.md) – Unique IPs per Pod, shared namespaces, cross-node communication.
- [Kube-Proxy](./0002_kube-proxy.md) – Traffic routing, service IPs, load balancing.
- [CNI Plugins](./0003_cni.md) – Underlying network implementation, IP allocation, cross-node communication, network isolation.
- [Services](./0004_services.md) – Stable endpoints, load balancing, decoupling consumers from Pods.
- [DNS and Service Discovery](./0005_dns.md) – CoreDNS, stable names, intra-cluster discovery.
- [Ingress](./0006_ingress.md) – HTTP(S) routing, host/path rules, TLS termination.
- [Network Policies](./0007_network_policies.md) – Traffic control, security, zero-trust policies.

## Check Your Knowledge

Answer these questions to ensure you understand Kubernetes networking concepts:

1. **Pod Communication:**  
   - What problem does assigning unique IPs to Pods solve?  
   - How can containers in the same Pod communicate with each other?

2. **Kube-Proxy & Services:**  
   - Why is kube-proxy necessary for Services to work reliably?  
   - What are the differences between ClusterIP, NodePort, and LoadBalancer Services?

3. **CNI Plugins:**  
   - Why does Kubernetes delegate networking to CNI plugins?  
   - Name two CNI plugins and describe a use-case for each.

4. **DNS & Service Discovery:**  
   - How does CoreDNS allow Pods to find Services?  
   - What happens to Service DNS entries when Pods are rescheduled?

5. **Ingress:**  
   - What problem does Ingress solve compared to NodePort or LoadBalancer Services?  
   - What components are required to implement Ingress in a cluster?

6. **Network Policies:**  
   - Why are Network Policies important in production clusters?  
   - How do they enforce a zero-trust model for Pods?

---

**Next Steps:**  
After reviewing this chapter, continue with hands-on labs to deploy Services, configure Ingress, and experiment with Network Policies to solidify your understanding.
