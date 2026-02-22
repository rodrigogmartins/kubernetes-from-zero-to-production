---
quiz:
  auto_number: true
  shuffle_answers: true
---

# DNS and Service Discovery

## What Problem DNS Solves

In Kubernetes, workloads are dynamic:

- Pods are ephemeral
- IP addresses change frequently
- Pods scale up and down
- Pods can move between nodes

If applications relied on static IP addresses, communication would constantly break.

Kubernetes solves this with **built-in DNS-based service discovery**, allowing workloads to locate each other using stable names instead of IP addresses.

## How Kubernetes Implements Service Discovery

Kubernetes deploys **CoreDNS** as the cluster DNS server.

When a Service is created:

- It receives a stable virtual IP (ClusterIP)
- CoreDNS automatically creates DNS records for it
- Pods can resolve the Service using its DNS name

Applications communicate using:

```md
service-name.namespace.svc.cluster.local
```

This decouples consumers from the lifecycle of Pods behind the Service.

## Core Concepts

### 1. Stable Service Names

Each Service receives:

- Short name (within same namespace): `my-service`
- Fully qualified domain name (FQDN):  
  `my-service.my-namespace.svc.cluster.local`

As Pods scale or are replaced:

- The DNS name remains stable
- The endpoints behind it update automatically

---

### 2. Automatic Endpoint Updates

CoreDNS integrates with the Kubernetes API.

When:

- Pods are added
- Pods are removed
- Pods are rescheduled

The Service’s endpoints are updated, and DNS continues resolving to the Service IP.

Clients never need to know individual Pod IPs.

---

### 3. DNS Record Types

CoreDNS typically provides:

- **A records** — resolve Service name to ClusterIP
- **SRV records** — provide port and protocol information
- Optional headless Service records — resolve directly to Pod IPs

Headless Services (`clusterIP: None`) allow direct Pod-level discovery.

---

### 4. DNS Resolution Flow

1. Pod sends DNS query.
2. Request goes to the cluster DNS Service.
3. CoreDNS resolves based on Service definitions.
4. The Pod receives the ClusterIP.
5. kube-proxy routes traffic to a backend Pod.

DNS provides discovery.  
Services provide stable access.  
kube-proxy provides routing.

---

### 5. Namespace Scoping

DNS resolution is namespace-aware.

From within the same namespace:

```md
my-service
```

From another namespace:

```md
my-service.other-namespace
```

Fully qualified domain names always work cluster-wide.

## Mental Model

Pods should **never depend on Pod IP addresses**.

Applications communicate using:

- Service names
- Stable DNS records
- Cluster-level abstractions

DNS enables a loosely coupled, dynamic architecture.

If Service discovery fails, the issue is typically:

- CoreDNS malfunction
- NetworkPolicy blocking DNS traffic
- Misconfigured Service
- Incorrect namespace usage

## Operational Considerations

Common DNS-related failure scenarios:

- CoreDNS Pods not running
- CoreDNS crash loops
- High latency from DNS caching issues
- Misconfigured stub domains or conditional forwarding
- NetworkPolicies blocking UDP/TCP 53

Production clusters often monitor:

- CoreDNS Pod health
- DNS latency
- Error rate in DNS queries

DNS is a critical control-plane dependency.

## Check Your Knowledge

<quiz>
What is the primary function of CoreDNS in Kubernetes?
- [x] Provide DNS-based service discovery
- [ ] Assign Pod IP addresses
- [ ] Perform traffic load balancing
- [ ] Enforce resource limits
</quiz>

<quiz>
Which DNS name format is fully qualified in Kubernetes?
- [x] service.namespace.svc.cluster.local
- [ ] service.cluster.local
- [ ] namespace.service.local
- [ ] pod.service.node.local
</quiz>

<quiz>
Scenario: A Service scales from 2 Pods to 5 Pods. What happens to the DNS name?
- [x] The DNS name remains the same
- [x] The Service endpoints update automatically
- [ ] A new DNS name is generated
- [ ] Clients must restart to resolve new Pods
</quiz>

<quiz>
Which DNS records are commonly provided for Kubernetes Services? (Select all that apply)
- [x] A records
- [x] SRV records
- [ ] MX records
- [ ] TXT records for Pod logs
</quiz>

<quiz>
Scenario: Pods cannot resolve any internal Service names. What should you investigate first?
- [x] CoreDNS Pods are running and healthy
- [x] NetworkPolicies blocking port 53
- [ ] Horizontal Pod Autoscaler settings
- [ ] Persistent Volume binding
</quiz>

<quiz>
Headless Services differ because:
- [x] They do not allocate a ClusterIP
- [x] DNS resolves directly to Pod IPs
- [ ] They bypass CoreDNS
- [ ] They automatically enable Ingress
</quiz>

<quiz>
Fill in the blank: Applications should reference [[Service names]] instead of [[Pod IP addresses]].
</quiz>

## References

- [**The Kubernetes Book - Nigel Poulton**](https://www.amazon.com.br/Kubernetes-Book-Nigel-Poulton/dp/1916585000)