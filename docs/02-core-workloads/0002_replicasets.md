---
quiz:
  auto_number: true
  shuffle_answers: true
---

# ReplicaSets

A **ReplicaSet** ensures that a specified number of identical Pods are running at any given time.  
It solves the problem of **maintaining desired state** for Pods, automatically replacing Pods that fail or are deleted.

ReplicaSets are usually **not created directly**; Deployments manage them.  
They provide **self-healing and scaling**, making Pods **replaceable** without manual intervention.

ReplicaSets ensure a fixed number of Pod replicas are running, but they **do not automatically update Pods** with a new container image. Updates are handled by Deployments.

---

## Check your knowledge

<quiz>
What is the main function of a ReplicaSet?

- [x] Maintain a specified number of Pod replicas
- [ ] Manage persistent volumes
- [ ] Control service routing
- [ ] Schedule nodes
</quiz>

<quiz>
Scenario: A Pod managed by a ReplicaSet crashes. What happens?

- [x] The ReplicaSet creates a new Pod
- [ ] The existing Pod is repaired
- [ ] All Pods are terminated
- [ ] Nothing happens automatically
</quiz>

<quiz>
Fill in the blank: ReplicaSets define the [[number]] of Pod [[replicas]] to run.
</quiz>

<quiz>
Which of the following are valid ways to scale a ReplicaSet? (multiple correct)

- [x] Manually updating the replica count
- [x] Via a Deployment
- [ ] Changing the Pod's container image without updating ReplicaSet
- [ ] Directly deleting nodes
</quiz>

<quiz>
True or false: ReplicaSets can self-update Pods automatically.

- [ ] True
- [x] False
</quiz>

<quiz>
Scenario: You need to maintain exactly 3 identical Pods at all times. Which resource ensures this?

- [x] ReplicaSet
- [ ] Pod
- [ ] Deployment
- [ ] StatefulSet
</quiz>
