import type { ActualState, Task } from '../../types'

export const phase4Tasks: Task[] = [
  {
    id: 'observe-scheduling',
    title: 'Observe Scheduling',
    description: 'Wait and observe the scheduler placing pods on nodes with available capacity.',
    summary: 'The scheduler assigned pods to nodes based on available capacity. This is automatic scheduling—the system decided where each pod should run.',
    isCompleted: (state: ActualState) => state.pods.filter(p => p.status === 'Running').length >= 2
  },
  {
    id: 'reach-capacity',
    title: 'Reach Node Capacity',
    description: 'Wait for more pods to be scheduled until all nodes are at capacity.',
    summary: 'Nodes A and B are at capacity (2 pods each). Node C has 1 pod. You have 5 pods scheduled across the 3 nodes.',
    isCompleted: (state: ActualState, _currentTime: number) => {
      const runningCount = state.pods.filter(p => p.status === 'Running').length
      return state.desiredPods === 5 && runningCount === 5
    }
  },
  {
    id: 'observe-pending',
    title: 'Observe Pending Pods',
    description: 'Increase desired state to 7. Observe pods remaining in Pending state with no available node capacity.',
    summary: 'You increased desired state to 7, but no more pods could be scheduled. 2 pods remain Pending because all nodes are at capacity. The scheduler is waiting for space.',
    isCompleted: (state: ActualState) => {
      const pendingCount = state.pods.filter(p => p.status === 'Pending').length
      return state.desiredPods === 7 && pendingCount === 2
    }
  },
  {
    id: 'delete-pod',
    title: 'Delete a Running Pod',
    description: 'Delete one running pod to free capacity on a node.',
    summary: 'You deleted a running pod. Capacity is now available on one of the nodes. The scheduler can now place pending pods.',
    isCompleted: (state: ActualState) => {
      const totalPods = state.pods.filter(p => p.status !== 'Failed').length
      return state.desiredPods === 7 && totalPods === 6
    }
  },
  {
    id: 'observe-rescheduling',
    title: 'Observe Pending Pod Scheduled',
    description: 'Watch the scheduler automatically place a pending pod on the newly available node.',
    summary: 'The scheduler automatically scheduled the pending pod to the freed node. This is the scheduler in action—continuously matching pending pods to available capacity. Kubernetes orchestration is seamless.',
    isCompleted: (state: ActualState) => {
      const runningCount = state.pods.filter(p => p.status === 'Running').length
      const pendingCount = state.pods.filter(p => p.status === 'Pending').length
      return state.desiredPods === 7 && runningCount === 5 && pendingCount === 2
    }
  }
]
