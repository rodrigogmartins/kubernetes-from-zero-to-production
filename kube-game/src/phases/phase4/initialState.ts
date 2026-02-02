import type { ActualState } from '../../types'

export function createPhase4InitialState(): ActualState {
  // Phase 4: Scheduler focus - 3 nodes with varied capacity, desired=5, controller ON
  return {
    pods: [],
    nodes: [
      {
        id: 'node-a',
        capacity: 2,
        pods: [],
        status: 'Ready'
      },
      {
        id: 'node-b',
        capacity: 2,
        pods: [],
        status: 'Ready'
      },
      {
        id: 'node-c',
        capacity: 1,
        pods: [],
        status: 'Ready'
      }
    ],
    phase: 4,
    desiredPods: 5,
    controllerActive: true,
    lastFeedbackMessage: 'Phase 4 started. 3 nodes with fixed capacity (A:2, B:2, C:1). Controller is ON. Desired state is 5 pods.'
  }
}
