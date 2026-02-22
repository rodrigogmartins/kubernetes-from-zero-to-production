---
quiz:
  auto_number: true
  shuffle_answers: true
---

# Storage Classes

## What Problem StorageClasses Solve

Manually managing PersistentVolumes does not scale.

Problems with static provisioning:

- Admin must pre-create PVs
- Hard to predict storage demand
- Waste of unused capacity
- Tight coupling between apps and infrastructure

Teams need:

- Self-service storage
- Declarative provisioning
- Backend abstraction

StorageClasses solve this by enabling dynamic provisioning.

## The Solution

A StorageClass defines:

- The provisioner (who creates the volume)
- Backend-specific parameters
- Reclaim policy
- Volume binding behavior

When a PVC references a StorageClass:

- Kubernetes automatically provisions a PV
- The PV matches the defined rules
- No manual PV creation required

This is the standard production pattern.

## Core Components

### 1. Provisioner

Defines which storage system is used.

Examples:

- AWS EBS
- GCE Persistent Disk
- Azure Disk
- NFS provisioner
- CSI drivers

The provisioner is responsible for actually creating the volume.

---

### 2. Parameters

StorageClasses can define backend-specific settings:

- Disk type (SSD, HDD)
- IOPS
- Replication level
- Filesystem type
- Encryption options

This enables multiple performance tiers in one cluster.

Example tiers:

- `fast` → SSD
- `standard` → balanced disk
- `archive` → low-cost storage

---

### 3. Reclaim Policy

Determines what happens when a PVC is deleted.

Common values:

- Delete → Underlying storage is removed
- Retain → Volume remains for manual recovery

This is critical for data protection.

Be deliberate here. Mistakes are expensive.

---

### 4. Default StorageClass

A cluster can mark one StorageClass as:

- Default

If a PVC does not specify a class:

- The default StorageClass is used

Only one should be default.

## Volume Binding Mode

Some StorageClasses support:

- Immediate binding
- WaitForFirstConsumer

WaitForFirstConsumer delays provisioning until:

- A Pod using the PVC is scheduled

This ensures zone-aware storage allocation.

Important in multi-zone clusters.

## Mental Model

StorageClass = Storage blueprint  
PVC = Storage request  
PV = Actual storage resource  

Applications should not care about:

- Cloud provider
- Disk type
- Replication method

That belongs in the StorageClass.

## Common Failure Scenarios

- PVC stuck Pending → no matching StorageClass
- Wrong zone provisioned → scheduling conflict
- Incorrect reclaimPolicy → accidental data deletion
- Multiple defaults → unpredictable behavior
- Provisioner not installed → dynamic provisioning fails

Debug path:

1. Check PVC events
2. Verify StorageClass exists
3. Confirm provisioner is running
4. Validate default annotation

## Check Your Knowledge

<quiz>
Why are StorageClasses preferred over manually creating PVs?
- [x] They enable dynamic provisioning
- [x] They reduce manual administrative work
- [ ] They eliminate PVCs
- [ ] They replace StatefulSets
</quiz>

<quiz>
Can multiple StorageClasses exist in a cluster?
- [x] Yes, and PVC selects one using storageClassName
- [ ] No, only one is allowed
- [ ] Only in cloud environments
- [ ] Only for StatefulSets
</quiz>

<quiz>
Scenario: A PVC specifies `storageClassName: fast`. What happens?
- [x] Kubernetes provisions a PV using the fast StorageClass rules
- [ ] It binds to any available PV randomly
- [ ] It ignores the StorageClass
- [ ] It fails automatically
</quiz>

<quiz>
What happens if a PVC does not specify a StorageClass?
- [x] The default StorageClass is used
- [ ] The PVC fails immediately
- [ ] The largest PV is selected
- [ ] A manual PV must be created first
</quiz>

<quiz>
Scenario: A PVC is deleted and the underlying disk is automatically removed. What likely caused this?
- [x] The reclaimPolicy was set to Delete
- [ ] The provisioner crashed
- [ ] The Pod was rescheduled
- [ ] The StatefulSet scaled down
</quiz>

<quiz>
Fill in the blank: StorageClasses abstract the [[underlying storage backend]] and enable [[dynamic provisioning]] of volumes.
</quiz>

## References

- Kubernetes Documentation – Storage Classes  
- The Kubernetes Book – Nigel Poulton