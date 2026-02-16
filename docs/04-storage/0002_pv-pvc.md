# Persistent Volumes (PV) & Persistent Volume Claims (PVC)

## The Problem

Pods are ephemeral. If they are deleted or rescheduled, any data stored inside them is lost. Applications like databases require durable storage that survives Pod lifecycle events.

## Solution

Kubernetes introduces PVs and PVCs:

- **Persistent Volume (PV):** A piece of storage in the cluster provisioned manually or dynamically.  
- **Persistent Volume Claim (PVC):** A request for storage by a Pod. PVCs bind to matching PVs, allowing Pods to use durable storage without knowing the underlying storage details.

## Lifecycle

1. Admin creates PV or a StorageClass handles dynamic provisioning.  
2. User creates PVC requesting size, access mode, and storage class.  
3. Kubernetes binds PVC to a suitable PV.  
4. Pod mounts PVC to access persistent storage.  

## Key Access Modes

| Mode          | Meaning                                |
| ------------- | -------------------------------------- |
| ReadWriteOnce | Single node can mount as read-write    |
| ReadOnlyMany  | Multiple nodes can mount as read-only  |
| ReadWriteMany | Multiple nodes can mount as read-write |

## Check Your Knowledge

1. What happens to data if a Pod using a PVC is deleted?  
2. How does Kubernetes decide which PV to bind to a PVC?
