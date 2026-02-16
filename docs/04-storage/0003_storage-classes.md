---
quiz:
  auto_number: true
  shuffle_answers: true
---

# Storage Classes

## The Problem

Manually creating PVs for each application is tedious and error-prone. Clusters may have different storage backends, and teams want declarative, dynamic provisioning.

## Solution

**Storage Classes** define a policy for dynamically provisioning PVs:

- Define the **provisioner** (e.g., AWS EBS, GCE PD, NFS).  
- Specify **parameters** like volume type, replication, or IOPS.  
- Allow Pods to request storage via PVC without knowing the backend details.  

Dynamic provisioning ensures new PVCs automatically get a PV created matching the StorageClass rules.

## Example Parameters

| Parameter   | Description                       |
| ----------- | --------------------------------- |
| type        | Disk type (SSD, HDD, gp2, etc.)   |
| fsType      | Filesystem type (ext4, xfs)       |
| replication | Number of replicas for the volume |

## Check Your Knowledge

1. Why are Storage Classes preferred over manually creating PVs?  
2. Can multiple StorageClasses coexist in a cluster? How would a PVC select one?

## Check your knowledge

<quiz>
What is the purpose of a StorageClass in Kubernetes?

- [x] Define how dynamic volumes are provisioned
- [ ] Set pod CPU and memory limits
- [ ] Control network policies
- [ ] Configure Ingress routing
</quiz>

<quiz>
Which of the following parameters can a StorageClass define? (Select all that apply)

- [x] provisioner
- [x] parameters (e.g., type of disk)
- [x] reclaimPolicy
- [ ] podSelector
</quiz>

<quiz>
Scenario: You want a dynamically provisioned PV using AWS EBS. What must you create first?

- [x] A StorageClass pointing to the EBS provisioner
- [ ] A Deployment
- [ ] A ConfigMap
- [ ] A NetworkPolicy
</quiz>

<quiz>
Fill in the blank: The [[reclaimPolicy]] in a StorageClass determines what happens to a PV after its [[PVC]] is deleted.
</quiz>

<quiz>
Scenario: You have multiple storage classes: `fast`, `standard`. A PVC does not specify a class. Which StorageClass is used?

- [x] The one marked as [[default]]
- [ ] The largest capacity one
- [ ] Randomly chosen
- [ ] The first created in the cluster
</quiz>
