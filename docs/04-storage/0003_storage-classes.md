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
