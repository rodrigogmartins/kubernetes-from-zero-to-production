import type { ActualState, Pod } from '../../types'

export function createPhase2InitialState(): ActualState {
  // Phase 2 starts with explicit scenario: 2 healthy nodes, 5 running pods, desired=5
  const pods: Pod[] = [
    { id: crypto.randomUUID(), status: 'Running', nodeId: 'node-1' },
    { id: crypto.randomUUID(), status: 'Running', nodeId: 'node-1' },
    { id: crypto.randomUUID(), status: 'Running', nodeId: 'node-1' },
    { id: crypto.randomUUID(), status: 'Running', nodeId: 'node-2' },
    { id: crypto.randomUUID(), status: 'Running', nodeId: 'node-2' }
  ]

  return {
    pods,
    nodes: [
      {
        id: 'node-1',
        capacity: 5,
        pods: [pods[0].id, pods[1].id, pods[2].id],
        status: 'Ready'
      },
      {
        id: 'node-2',
        capacity: 5,
        pods: [pods[3].id, pods[4].id],
        status: 'Ready'
      }
    ],
    phase: 2,
    desiredPods: 5,
    lastFeedbackMessage: 'Phase 2 started. You have 5 pods on 2 healthy nodes. Desired State = 5.'
  }
}
