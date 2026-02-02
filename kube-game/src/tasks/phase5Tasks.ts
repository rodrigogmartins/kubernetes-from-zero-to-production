import type { ActualState } from '../state/types'
import type { Task } from './types'

export const phase5Tasks: Task[] = [
  {
    id: 'observe-stability',
    title: 'Observe Stability',
    description: 'Look at the cluster. All 4 pods are running across 3 nodes. Desired state matches actual state. This is a healthy, stable system.',
    summary: 'You observed a stable cluster in equilibrium. Desired = 4, Running = 4. Everything is working.',
    isCompleted: (state: ActualState) => {
      const runningPods = state.pods.filter(p => p.status === 'Running').length
      return state.desiredPods === 4 && runningPods === 4 && state.nodes.every(n => n.status === 'Ready')
    }
  },
  {
    id: 'kill-node',
    title: 'Simulate Failure',
    description: 'Click the "Kill Node" button below. Simulate an infrastructure failure by bringing down one healthy node.',
    summary: 'One node failed. All pods on that node were instantly lost. The infrastructure is now broken.',
    isCompleted: (state: ActualState) => state.nodes.some(n => n.status === 'Down')
  },
  {
    id: 'observe-pod-loss',
    title: 'Observe Pod Loss',
    description: 'Notice that pods on the failed node are gone. They did not survive. The actual state changed from what was desired.',
    summary: 'Failure is real. Pods cannot survive when their host node dies. But notice: Desired state is still 4. What will the controller do?',
    isCompleted: (state: ActualState) => {
      const failedPods = state.pods.filter(p => p.status === 'Failed').length
      const hasDownNode = state.nodes.some(n => n.status === 'Down')
      return failedPods > 0 && hasDownNode
    }
  },
  {
    id: 'observe-self-healing',
    title: 'Observe Self-Healing',
    description: 'Watch the controller. It detects that actual (2 running) does not match desired (4). The scheduler begins recreating lost pods on healthy nodes.',
    summary: 'Self-healing in action! The controller reconciles the gap between desired and actual by creating new pods. This is resilience.',
    isCompleted: (state: ActualState) => {
      const runningPods = state.pods.filter(p => p.status === 'Running').length
      const hasDownNode = state.nodes.some(n => n.status === 'Down')
      return hasDownNode && runningPods >= 3
    }
  },
  {
    id: 'observe-limits',
    title: 'Observe System Limits',
    description: 'With one node down, only 4 slots remain (2+2+0). Desired is 4. All remaining capacity is used, but desired state is still met.',
    summary: 'You mastered self-healing! The system automatically recovered from failure by rescheduling pods on healthy nodes. Kubernetes maintains resilience within its constraints.',
    isCompleted: (state: ActualState) => {
      const runningPods = state.pods.filter(p => p.status === 'Running').length
      const pendingPods = state.pods.filter(p => p.status === 'Pending').length
      const hasDownNode = state.nodes.some(n => n.status === 'Down')
      return hasDownNode && (runningPods + pendingPods) >= 4
    }
  }
]
