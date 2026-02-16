---
quiz:
  auto_number: true
  shuffle_answers: true
---

# Deployments

**Deployments** provide declarative updates to Pods and ReplicaSets.  
They solve the problem of **managing changes to workloads safely** and automatically handling **rolling updates, rollbacks, and scaling**.

Deployments manage ReplicaSets, which in turn manage Pods. This allows declarative updates, rolling updates, and rollbacks, without directly touching individual Pods.

---

## Check your knowledge

<quiz>
What is the primary purpose of a Deployment?

- [x] Manage Pods and ReplicaSets, handling updates and rollbacks
- [ ] Store secrets
- [ ] Provide DNS for Pods
- [ ] Schedule nodes
</quiz>

<quiz>
Scenario: You want to upgrade a container image in production without downtime. Which resource should you use?

- [x] Deployment
- [ ] ReplicaSet
- [ ] Service
- [ ] Pod
</quiz>

<quiz>
Fill in the blank: Deployments solve the problem of [[rolling updates]] and [[rollback]] management.
</quiz>

<quiz>
Which of the following are features of Deployments? (multiple correct)

- [x] Rolling updates
- [x] Rollbacks
- [x] Scaling Pods
- [ ] Managing nodes
</quiz>

<quiz>
True or false: A Deployment manages Pods directly without using ReplicaSets.

- [ ] True
- [x] False
</quiz>

<quiz>
Scenario: You need to scale an application from 3 to 10 Pods automatically. What is the recommended approach?

- [x] Update the Deployment replica count
- [ ] Manually create new Pods
- [ ] Modify each ReplicaSet individually
- [ ] Delete Pods to force recreation
</quiz>
