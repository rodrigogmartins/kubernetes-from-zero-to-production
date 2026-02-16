# Storage in Kubernetes

Persistent storage is a core challenge in containerized environments because containers are ephemeral. Without proper storage management, data can be lost whenever a Pod is restarted or rescheduled.

This chapter covers Kubernetes solutions for persistent storage: Volumes, Persistent Volumes (PV) and Persistent Volume Claims (PVC), Storage Classes, and dynamic provisioning.

## Topics Covered

- [**Volumes**](./0001_volumes.md) – Local and ephemeral storage inside Pods.
- [**Persistent Volumes (PV) & Persistent Volume Claims (PVC)**](./0002_pv-pvc.md) – Decoupling storage from Pods, providing durable storage.
- [**Storage Classes**](./0003_storage-classes.md) – Dynamic provisioning and declarative storage policies.
- [**StatefulSets**](./0004_statefulsets.md) – Pods that require stable network IDs and persistent storage.

---

## Check Your Knowledge

1. **Volumes:**  
   - What problem do Volumes solve in ephemeral containers?  
   - When should you use emptyDir vs hostPath vs configMap volumes?

2. **PV & PVC:**  
   - How do Persistent Volumes decouple storage from Pods?  
   - What happens if a Pod is deleted but the PVC is still bound?

3. **Storage Classes:**  
   - Why are Storage Classes important for dynamic provisioning?  
   - What parameters can be customized in a Storage Class?

4. **StatefulSets:**  
   - Why would you use a StatefulSet instead of a Deployment?  
   - How does a StatefulSet ensure stable storage and network identity?

---

**Next Steps:**  
After understanding the concepts in this chapter, apply them in labs by creating PVCs, using different volume types, and experimenting with dynamic provisioning to solidify your knowledge.
