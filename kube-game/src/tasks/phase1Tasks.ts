import type { Task } from './types'

export const phase1Tasks: Task[] = [
  {
    id: 'create-pods',
    title: 'Create Pods',
    description: 'Create at least 5 Pods.',
    isCompleted: state => state.pods.length >= 5,
    summary: `
Pods were created without specifying a Node.
Kubernetes uses a Scheduler to decide where Pods run,
based on available Node capacity.
`
  },
  {
    id: 'pending-pods',
    title: 'Capacity Limit',
    description: 'Create Pods until some remain Pending.',
    isCompleted: state =>
      state.pods.some(p => p.status === 'Pending'),
    summary: `
Nodes have limited resources.
When no Node can accept a Pod, it remains in Pending state.
Pods do not fail — they wait for capacity.
`
  },
  {
    id: 'node-failure',
    title: 'Node Failure',
    description: 'Kill a Node.',
    isCompleted: state =>
      state.nodes.some(n => n.status === 'Down'),
    summary: `
Pods are tightly coupled to Nodes.
When a Node goes down, all its Pods are lost.
At this level, Kubernetes does not restore them.
`
  },
  {
    id: 'post-failure-pods',
    title: 'Post-Failure Scheduling',
    description:
      'Try to create new Pods after a Node failure and observe the cluster behavior.',
    isCompleted: state =>
      state.nodes.some(n => n.status === 'Down') &&
      state.pods.some(p => p.status === 'Pending'),
    summary: `
Even after a Node failure, the Scheduler continues to work.
However, without available Node capacity, new Pods remain Pending.

Kubernetes does not revive Nodes or Pods automatically at this level.
This behavior highlights the limitations of managing Pods directly.
`
  }
]
