import type { ActualState, Task } from '../../types'

export const phase4Tasks: Task[] = [
  {
    id: 'observe-scheduling',
    title: 'Observe Scheduling',
    description: 'All 5 pods are already running on the 3 nodes. The scheduler placed them based on available capacity.',
    summary: 'The scheduler assigned pods to nodes based on available capacity. This is automatic scheduling—the system decided where each pod should run.',
    isCompleted: (state: ActualState, _currentTime: number) => {
      const runningCount = state.pods.filter(p => p.status === 'Running').length
      return state.phase === 4 && runningCount === 5 && state.podDeletedByUser === false
    }
  },
  {
    id: 'reach-capacity',
    title: 'Reach Node Capacity',
    description: 'All nodes are at capacity. Nodes 1 and 2 have 2 pods each, Node 3 has 1 pod.',
    summary: 'All nodes are at capacity with 5 running pods. The scheduler has optimally distributed pods based on node capacity constraints.',
    isCompleted: (state: ActualState, _currentTime: number) => {
      const runningCount = state.pods.filter(p => p.status === 'Running').length
      return state.desiredPods === 5 && runningCount === 5 && state.podDeletedByUser === false
    }
  },
  {
    id: 'observe-pending',
    title: 'Observe Pending Pods',
    description: 'Increase desired state to 7. The scheduler cannot place more pods—all nodes are at capacity.',
    summary: 'You increased desired state to 7, but no more pods could be scheduled. 2 pods remain Pending because all nodes are at capacity. The scheduler cannot place pods where there is no space.',
    isCompleted: (state: ActualState, _currentTime: number) => {
      const pendingCount = state.pods.filter(p => p.status === 'Pending').length
      // Only complete when pending pods exist AND no user deletion has occurred
      return state.desiredPods === 7 && pendingCount === 2 && state.podDeletedByUser === false
    }
  },
  {
    id: 'delete-pod',
    title: 'Delete a Running Pod',
    description: 'You must manually delete one running pod to free capacity on a node.',
    summary: 'You deleted a running pod, freeing capacity on one of the nodes. Now the scheduler can place one of the pending pods.',
    isCompleted: (state: ActualState, _currentTime: number) => {
      // Task completes when the user explicitly deletes a running pod
      // The action itself is what matters, not the scheduler behavior afterward
      return state.userDeletedRunningPod === true
    }
  },
  {
    id: 'observe-rescheduling',
    title: 'Observe Scheduler Reschedule',
    description: 'Watch the scheduler automatically place a pending pod on the newly available node.',
    summary: 'The scheduler automatically scheduled a pending pod to the freed node. This is the scheduler in action—it continuously matches pending pods to available capacity. The scheduler reacted to freed capacity created by your deletion.',
    isCompleted: (state: ActualState, _currentTime: number) => {
      // Task completes when a pending pod was scheduled after user deletion
      // This is purely event-based, independent of final pod counts or timing
      return state.pendingPodWasScheduled === true
    }
  }
]
