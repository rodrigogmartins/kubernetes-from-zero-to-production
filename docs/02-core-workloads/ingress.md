---
quiz:
  auto_number: true
  shuffle_answers: true
---

# Ingress

**Ingress** manages external access to Services, typically HTTP/HTTPS.  
It solves the problem of **exposing multiple services via a single entry point** with **routing, TLS termination, and host/path rules**.

Ingress resources define HTTP/HTTPS routing rules, but require an **Ingress Controller** (like NGINX, Traefik, or HAProxy) to implement the routing and load balancing.

---

## Check your knowledge

<quiz>
What is the main purpose of Ingress in Kubernetes?

- [x] Expose HTTP/HTTPS routes to Services
- [ ] Store persistent data
- [ ] Schedule Pods
- [ ] Manage ReplicaSets
</quiz>

<quiz>
Fill in the blank: An Ingress resource defines [[routing rules]] and [[TLS settings]] for external traffic.
</quiz>

<quiz>
Scenario: You need to expose multiple services on the same domain with different paths. Which resource should you use?

- [x] Ingress
- [ ] NodePort
- [ ] Service
- [ ] Deployment
</quiz>

<quiz>
Which of the following require an Ingress Controller? (multiple correct)

- [x] NGINX
- [x] Traefik
- [x] HAProxy
- [ ] ClusterIP
- [ ] ReplicaSet
</quiz>

<quiz>
True or false: Ingress can handle SSL/TLS termination.

- [x] True
- [ ] False
</quiz>

<quiz>
Scenario: You have a Service running on `/api` and another on `/web`. You want both accessible via `example.com`. How do you configure?

- [x] Use an Ingress with path-based routing
- [ ] Expose each Service via NodePort
- [ ] Create two Deployments
- [ ] Use ClusterIP only
</quiz>
