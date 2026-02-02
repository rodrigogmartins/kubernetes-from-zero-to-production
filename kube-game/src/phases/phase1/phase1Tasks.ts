import type { ActualState, Task } from '../../types'

export const phase1Tasks: Task[] = [
  {
    id: 'first-pod',
    title: 'Create Your First Pod',
    description: 'Click "Create Pod" to add a pod to the cluster.',
    summary: 'You created your first pod! Pods are the smallest deployable units in Kubernetes.',
    isCompleted: (state: ActualState, _currentTime: number) => state.pods.length > 0
  },
  {
    id: 'pod-pending',
    title: 'Understand Pod States',
    description: 'Your pods will move from Pending to Running as nodes accept them.',
    summary: 'Your pods are now running! You understand pod lifecycle states.',
    isCompleted: (state: ActualState, _currentTime: number) => state.pods.some(p => p.status === 'Running')
  },
  {
    id: 'fill-node',
    title: 'Fill a Node',
    description: 'Keep creating pods until you fill one of your nodes to capacity.',
    summary: 'Node is now full! You understand node capacity constraints.',
    isCompleted: (state: ActualState, _currentTime: number) => state.nodes.some(n => n.pods.length >= n.capacity)
  },
  {
    id: 'node-failure',
    title: 'Handle Node Failure',
    description: 'Kill a node to simulate failure and see how pods are rescheduled.',
    summary: 'Great recovery! You learned how Kubernetes handles node failures through rescheduling.',
    isCompleted: (state: ActualState, _currentTime: number) => {
      const hadDownNode = state.nodes.some(n => n.status === 'Down')
      const hasRecovered = state.pods.some(p => p.status === 'Running')
      return hadDownNode && hasRecovered
    }
  }
]
