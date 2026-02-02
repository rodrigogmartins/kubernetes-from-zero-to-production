import type { ActualState, Pod } from '../../types'

export function createPhase5InitialState(): ActualState {
  // Phase 5: Self-Healing focus - 3 nodes, 4 pods already running, controller ON, scheduler ON
  const pods: Pod[] = [
    { id: crypto.randomUUID(), status: 'Running', nodeId: 'node-a' },
    { id: crypto.randomUUID(), status: 'Running', nodeId: 'node-a' },
    { id: crypto.randomUUID(), status: 'Running', nodeId: 'node-b' },
    { id: crypto.randomUUID(), status: 'Running', nodeId: 'node-c' }
  ]

  return {
    pods,
    nodes: [
      {
        id: 'node-a',
        capacity: 2,
        pods: [pods[0].id, pods[1].id],
        status: 'Ready'
      },
      {
        id: 'node-b',
        capacity: 2,
        pods: [pods[2].id],
        status: 'Ready'
      },
      {
        id: 'node-c',
        capacity: 1,
        pods: [pods[3].id],
        status: 'Ready'
      }
    ],
    phase: 5,
    desiredPods: 4,
    controllerActive: true,
    lastFeedbackMessage: 'Phase 5 started. 3 nodes with 4 running pods. Controller and Scheduler are ON. Observe the stable cluster.'
  }
}