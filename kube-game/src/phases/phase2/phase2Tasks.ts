import type { ActualState, Task } from '../../types'

export const phase2Tasks: Task[] = [
  {
    id: 'declare-intent',
    title: 'Declare Intent',
    description: 'Observe that you start with Desired State = 5 and 5 running pods. This is the current state. Increase Desired State to 8.',
    summary: 'The system created new pods to reach your desired state.',
    isCompleted: (state: ActualState) => {
      const totalPods = state.pods.length
      return state.desiredPods === 8 && totalPods >= 8
    }
  },
  {
    id: 'break-cluster',
    title: 'Break the Cluster',
    description: 'Kill one node. Simulate an infrastructure failure.',
    summary: 'Nodes can fail at any time. Your pods on that node have failed. Desired State did nothing to fix the infrastructure.',
    isCompleted: (state: ActualState) => state.nodes.some(n => n.status === 'Down')
  },
  {
    id: 'observe-fragility',
    title: 'Try to Recover',
    description: 'Increase Desired State to 10. Try to recover by adding more pods. Watch if the failed pods are recreated.',
    summary: 'You increased Desired State, but the failed pods remain failed. Desired State is just data—it created new pods, but did nothing to fix the infrastructure or recreate lost pods. Without a controller enforcing reconciliation, failures are permanent.',
    isCompleted: (state: ActualState) => {
      const failedPods = state.pods.filter(p => p.status === 'Failed').length
      const hasDownNode = state.nodes.some(n => n.status === 'Down')
      return state.desiredPods === 10 && failedPods > 0 && hasDownNode
    }
  },
  {
    id: 'reduce-desired',
    title: 'Reduce Desired State',
    description: 'Reduce Desired State to 2. Observe what happens.',
    summary: 'Nothing happened. Desired State alone does not remove pods. Without a controller, intent is not enforced. This proves Desired State is passive.',
    isCompleted: (state: ActualState) => {
      const totalPods = state.pods.filter(p => p.status !== 'Failed').length
      return state.desiredPods === 2 && totalPods > 2
    }
  }
]
