---
quiz:
  auto_number: true
  shuffle_answers: true
---

# Services

**Services** provide a stable endpoint and load balancing for Pods.  
They solve the problem of **ephemeral Pod IPs**, allowing clients to reach the correct backend Pods reliably.

Service types include:

- ClusterIP: internal access only
- NodePort: exposes service on each Node's IP at a static port
- LoadBalancer: integrates with cloud provider to expose externally
- ExternalName: DNS alias to external service

Services decouple clients from Pods, enabling **scaling and rolling updates** without breaking connectivity.

---

## Check your knowledge

<quiz>
What problem do Kubernetes Services solve?

- [x] Pod IPs are ephemeral, so services provide stable endpoints
- [ ] Pods cannot communicate with containers
- [ ] Nodes are replaced automatically
- [ ] ReplicaSets manage DNS
</quiz>

<quiz>
Fill in the blank: ClusterIP, NodePort, LoadBalancer, and ExternalName are [[types]] of Services.
</quiz>

<quiz>
Scenario: You have multiple Pods behind a service and want traffic balanced automatically. Which resource handles this?

- [x] Service
- [ ] Deployment
- [ ] ReplicaSet
- [ ] StatefulSet
</quiz>

<quiz>
Which of these are valid Service types? (multiple correct)

- [x] ClusterIP
- [x] NodePort
- [x] LoadBalancer
- [x] ExternalName
- [ ] Sidecar
</quiz>

<quiz>
True or false: Services are required to reach Pods inside the cluster.

- [ ] True
- [x] False
</quiz>

<quiz>
Scenario: You delete a Pod behind a Service. What happens?

- [x] The Service redirects traffic to the remaining Pods
- [ ] The Service stops working
- [ ] The Service creates a new Pod
- [ ] The Deployment must be updated
</quiz>
