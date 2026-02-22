---
quiz:
  auto_number: true
  shuffle_answers: true
---

# Volumes

## What Problem Volumes Solve

Containers are ephemeral.

If a container:

- Crashes
- Restarts
- Is recreated

Its writable layer is lost.

Inside a Pod:

- Multiple containers may need shared data
- Applications may need temporary storage
- Configuration must be injected at runtime

Kubernetes Volumes solve this by attaching storage to the Pod itself.

Important distinction:

Volumes persist for the lifetime of the Pod —  
not beyond it (unless backed by a PVC).

## How Volumes Work

A Volume:

- Is defined in the Pod spec
- Is mounted into one or more containers
- Exists as long as the Pod exists

Containers in the same Pod:

- Share access to the Volume
- Can read/write depending on mount settings

If the Pod dies:

- The Volume is deleted (except persistent-backed volumes)

## Key Volume Types

### emptyDir

- Created when Pod is scheduled
- Lives as long as the Pod runs
- Deleted when Pod terminates
- Shared across containers in the Pod

Use cases:

- Temporary logs
- Scratch processing space
- Caching within a Pod

Not suitable for durable data.

---

### hostPath

- Mounts a directory from the node’s filesystem
- Breaks portability across nodes
- Tightly couples Pod to specific host

Use cases:

- Debugging
- Node-level agents
- Special workloads

Avoid for general application storage.

---

### configMap

- Injects configuration data as files
- Non-sensitive data only
- Managed independently from the Pod image

Good for:

- Application config files
- Feature flags
- Environment-specific settings

---

### secret

- Similar to configMap
- Designed for sensitive data
- Base64 encoded and stored securely in etcd

Used for:

- API keys
- Passwords
- TLS certificates

Never use configMap for secrets.

---

### persistentVolumeClaim

- Connects Pod to a PersistentVolume
- Enables storage beyond Pod lifecycle
- Required for durable data

Used for:

- Databases
- Stateful applications
- Long-term storage needs

## Mental Model

Volume = Pod-level storage  
PVC-backed volume = Durable storage  

emptyDir = Temporary scratchpad  
hostPath = Direct host access  
configMap/secret = Configuration injection  

Choose based on lifecycle requirements.

## Common Failure Scenarios

- Data lost after Pod restart → using emptyDir instead of PVC
- Pod fails on new node → hostPath dependency
- Sensitive data exposed → used configMap instead of secret
- Volume mount path conflicts inside container

Always ask:

Does this data need to survive Pod deletion?

If yes → use PVC.

If no → emptyDir may be enough.

## Check Your Knowledge

<quiz>
If a Pod restarts but remains on the same node, what happens to emptyDir data?
- [x] It remains available
- [ ] It is deleted immediately
- [ ] It is converted to a PVC
- [ ] It moves to another node
</quiz>

<quiz>
Which volume type is appropriate for injecting TLS certificates?
- [x] secret
- [ ] emptyDir
- [ ] hostPath
- [ ] downwardAPI
</quiz>

<quiz>
Scenario: Your application requires durable storage across Pod rescheduling. What should you use?
- [x] persistentVolumeClaim
- [ ] emptyDir
- [ ] configMap
- [ ] hostPath
</quiz>

<quiz>
Why is hostPath generally discouraged for application workloads?
- [x] It ties Pods to specific nodes
- [ ] It encrypts data automatically
- [ ] It scales automatically
- [ ] It creates dynamic PVs
</quiz>

<quiz>
Fill in the blank: Volumes exist for the lifetime of the [[Pod]], unless backed by a [[PersistentVolumeClaim]].
</quiz>

## References

- Kubernetes Documentation – Volumes  
- The Kubernetes Book – Nigel Poulton