import type { ActualState, Pod } from './types'

export function createInitialState(): ActualState {
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
    phase: 1
  }
}

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
    lastFeedbackMessage: 'Phase 3 started. Controller is PAUSED. You have 0 pods, desired state is 3.'
  }
}

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