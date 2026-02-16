# Volumes

## The Problem

Containers are ephemeral by default: when a Pod is deleted or restarted, any data stored inside the container filesystem is lost.

## Solution

Kubernetes Volumes provide a way for containers in a Pod to persist data during the Pod's lifecycle. Volumes are created per Pod and can be shared among containers inside the Pod.

## Key Volume Types

| Type      | Use Case                                                                            |
| --------- | ----------------------------------------------------------------------------------- |
| emptyDir  | Temporary scratch space shared by all containers in the Pod. Deleted when Pod dies. |
| hostPath  | Access host machine filesystem. Useful for debugging or privileged workloads.       |
| configMap | Provide configuration data as files inside Pods.                                    |
| secret    | Store sensitive information as files inside Pods.                                   |

## Check Your Knowledge

1. Which volume type would you use for temporary logs inside a Pod?  
2. How does configMap volume differ from secret volume?
