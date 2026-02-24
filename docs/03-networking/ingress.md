---
quiz:
  auto_number: true
  shuffle_answers: true
---

# Ingress (Networking Perspective)

## Architecture

Ingress = declarative routing rules  
Ingress Controller = reverse proxy implementation  

Typical cloud flow:

Client → External LB → Ingress Controller → Service → Pod

Ingress handles:

- Host matching
- Path matching
- TLS termination

## Advanced Concepts

Ingress Class

- Determines which controller processes the resource

TLS termination

- Certificates stored as Secrets
- Decryption at cluster edge

Path types

- Prefix
- Exact

## Common Failure Modes

- Ingress class mismatch
- TLS secret missing
- DNS not pointing to LB
- No matching host rule → 404

## Check Your Knowledge

<quiz>
Traffic reaches the Ingress controller but returns HTTP 404. What is the MOST likely cause?

- [x] No matching host or path rule
- [ ] Pod memory limit exceeded
- [ ] PVC unbound
- [ ] CNI failure
</quiz>

<quiz>
Which component is responsible for interpreting and applying Ingress rules?

- [x] Ingress controller
- [ ] kube-proxy
- [ ] etcd
- [ ] kubelet
</quiz>

<quiz>
TLS termination at the Ingress layer means:

- [x] HTTPS is decrypted at the controller
- [ ] Pods must manage certificates individually
- [ ] kube-proxy performs encryption
- [ ] Services become stateful
</quiz>

## References

- Kubernetes Documentation – Ingress  
- Kubernetes Networking Deep Dive – CNCF
