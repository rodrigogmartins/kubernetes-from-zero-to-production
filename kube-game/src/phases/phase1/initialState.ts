import type { ActualState } from '../../types'

export function createPhase1InitialState(): ActualState {
  return {
    pods: [],
    nodes: [
      {
        id: 'node-1',
        capacity: 2,
        pods: [],
        status: 'Ready'
      },
      {
        id: 'node-2',
        capacity: 3,
        pods: [],
        status: 'Ready'
      }
    ],
    phase: 1
  }
}
