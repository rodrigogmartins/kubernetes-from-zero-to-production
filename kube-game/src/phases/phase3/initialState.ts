import type { ActualState } from '../../types'

export function createPhase3InitialState(): ActualState {
  // Phase 3 starts with: 2 healthy nodes, 0 pods, desired=3, controller paused
  return {
    pods: [],
    nodes: [
      {
        id: 'node-1',
        capacity: 5,
        pods: [],
        status: 'Ready'
      },
      {
        id: 'node-2',
        capacity: 5,
        pods: [],
        status: 'Ready'
      }
    ],
    phase: 3,
    desiredPods: 3,
    controllerActive: false,
    controllerMode: 'bootstrap',
    podDeletedByUser: false,
    lastFeedbackMessage: 'Phase 3 started. Controller is PAUSED. You have 0 pods, desired state is 3.'
  }
}
