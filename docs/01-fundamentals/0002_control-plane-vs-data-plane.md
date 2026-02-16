---
quiz:
  auto_number: true
  shuffle_answers: true
---

# Control Plane vs Data Plane

Kubernetes architecture is split into two main layers:

- **Control Plane** — responsible for cluster-wide decisions  
- **Data Plane** — responsible for running workloads

## Control Plane

Components:

- **kube-apiserver** — exposes Kubernetes API  
- **etcd** — stores cluster state  
- **kube-scheduler** — decides which node a Pod should run on  
- **kube-controller-manager** — enforces desired state

The control plane ensures the cluster matches the **desired state** you declare.

## Data Plane

Components:

- **kubelet** — runs Pods on each node  
- **kube-proxy** — handles networking for Pods  
- **Container runtime** — executes containers (Docker, containerd)

Data plane nodes **execute workloads** and report back to the control plane.

## Quiz

<quiz>
Which component of the control plane decides where Pods are scheduled?
- [x] kube-scheduler
- [ ] kubelet
- [ ] kube-proxy
- [ ] etcd
</quiz>

<quiz>
What is the role of kubelet?
- [x] Ensures Pods run on a node according to the specification
- [ ] Stores cluster state
- [ ] Manages rolling updates
- [ ] Routes external traffic
</quiz>

<quiz>
Fill the blank: The [[control plane]] manages the cluster, while the [[data plane]] runs workloads.
</quiz>

<quiz>
kube-proxy is part of:
- [x] Data Plane
- [ ] Control Plane
</quiz>

<quiz>
Which of these are control plane components? (select all that apply)
- [x] kube-apiserver
- [x] kube-controller-manager
- [x] kube-scheduler
- [ ] kubelet
</quiz>