import type { ActualState, Pod } from '../../types'

export function createPhase4InitialState(): ActualState {
  // Phase 4 starts with: 3 nodes at capacity (5 pods total), desired=5, scheduler active
  const pods: Pod[] = [
    { id: crypto.randomUUID(), status: 'Running', nodeId: 'node-1' },
    { id: crypto.randomUUID(), status: 'Running', nodeId: 'node-1' },
    { id: crypto.randomUUID(), status: 'Running', nodeId: 'node-2' },
    { id: crypto.randomUUID(), status: 'Running', nodeId: 'node-2' },
    { id: crypto.randomUUID(), status: 'Running', nodeId: 'node-3' }
  ]

  return {
    pods,
    nodes: [
      {
        id: 'node-1',
        capacity: 2,
        pods: [pods[0].id, pods[1].id],
        status: 'Ready'
      },
      {
        id: 'node-2',
        capacity: 2,
        pods: [pods[2].id, pods[3].id],
        status: 'Ready'
      },
      {
        id: 'node-3',
        capacity: 1,
        pods: [pods[4].id],
        status: 'Ready'
      }
    ],
    phase: 4,
    desiredPods: 5,
    controllerActive: true,
    podDeletedByUser: false,
    userDeletedRunningPod: false,
    previousPods: pods.map(p => ({ ...p })),
    pendingPodWasScheduled: false,
    lastFeedbackMessage: 'Phase 4 started. 3 nodes with fixed capacity (A:2, B:2, C:1). Controller is ON. Desired state is 5 pods.'
  }
}