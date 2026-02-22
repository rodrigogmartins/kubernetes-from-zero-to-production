---
quiz:
  auto_number: true
  shuffle_answers: true
---

# Persistent Volumes (PV) & Persistent Volume Claims (PVC)

## What Problem Persistent Storage Solves

Pods are ephemeral:

- They can be deleted
- They can be rescheduled
- They can move to another node

When a Pod disappears:

- Its container filesystem disappears
- Any locally stored data is lost

Stateless apps are fine.

Stateful apps (databases, message brokers, file storage) are not.

Kubernetes separates:

- Compute (Pods)
- Storage (Volumes)

This decoupling ensures durability.

## The Solution

Kubernetes introduces two abstractions:

### PersistentVolume (PV)

- A cluster storage resource
- Provisioned manually or dynamically
- Backed by NFS, cloud disks, SAN, etc.
- Independent of Pods

### PersistentVolumeClaim (PVC)

- A request for storage
- Declares:
  - Size
  - Access mode
  - StorageClass
- Binds to a matching PV

Pods consume PVCs.
PVCs bind to PVs.
PVs represent real storage.

## Lifecycle

1. Admin creates a PV  
   OR a StorageClass enables dynamic provisioning  

2. User creates a PVC specifying:
   - Requested storage
   - Access mode
   - Storage class  

3. Kubernetes finds a matching PV  

4. PVC binds to that PV  

5. Pod mounts the PVC  

If the Pod is deleted:

- The PVC remains
- The PV remains
- The data persists

## Access Modes

| Mode          | Meaning                              |
| ------------- | ------------------------------------ |
| ReadWriteOnce | Mounted read-write by a single node  |
| ReadOnlyMany  | Mounted read-only by multiple nodes  |
| ReadWriteMany | Mounted read-write by multiple nodes |

Important:

Access mode depends on the storage backend.

Not all backends support RWX.

## StorageClass & Dynamic Provisioning

Modern clusters use StorageClasses:

- Define storage type
- Define provisioner
- Enable automatic PV creation

When a PVC references a StorageClass:

- Kubernetes automatically provisions storage
- No manual PV creation required

This is the standard production pattern.

## Mental Model

Think of it like this:

- Pod = Application process
- PVC = Storage contract
- PV = Actual disk

Pods are replaceable.
Storage must not be.

PVC decouples application from infrastructure.

## Common Failure Scenarios

- PVC stuck in Pending → no matching PV
- StorageClass misconfigured
- Access mode mismatch
- Pod scheduled to node that cannot mount the volume
- Underlying storage backend unavailable

Debug path:

1. Check PVC status
2. Check PV availability
3. Verify StorageClass
4. Inspect access mode compatibility

## Check Your Knowledge

<quiz>
If a Pod using a PVC is deleted, what happens to the data?
- [x] The data remains on the PV
- [ ] The data is deleted immediately
- [ ] The PVC is automatically removed
- [ ] The storage shrinks to zero
</quiz>

<quiz>
How does Kubernetes decide which PV binds to a PVC?
- [x] It matches size, access mode, and storage class
- [ ] It randomly assigns a PV
- [ ] It binds to the newest PV
- [ ] It binds to the smallest PV
</quiz>

<quiz>
Scenario: A PVC requests 10Gi storage but only a 5Gi PV exists. What happens?
- [x] The PVC remains Pending
- [ ] The PV resizes automatically
- [ ] The Pod still runs without storage
- [ ] kubelet ignores the size requirement
</quiz>

<quiz>
Which statement about dynamic provisioning is correct?
- [x] StorageClass can automatically create PVs
- [ ] PVC must always bind to a manually created PV
- [ ] kube-proxy provisions volumes
- [ ] Services manage persistent storage
</quiz>

<quiz>
Scenario: Two Pods use the same PVC with ReadWriteOnce mode. What determines if this works?
- [x] Whether both Pods are scheduled on the same node
- [ ] The number of replicas in the Deployment
- [ ] The Service type
- [ ] kube-scheduler configuration
</quiz>

<quiz>
Fill in the blank: Persistent storage allows applications to remain [[stateful]] even when Pods are recreated.
</quiz>

## References

- Kubernetes Documentation – Persistent Volumes  
- The Kubernetes Book – Nigel Poulton