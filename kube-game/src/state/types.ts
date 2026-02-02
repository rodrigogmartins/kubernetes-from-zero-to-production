export type Pod = {
  id: string
  nodeId?: string
  status: 'Pending' | 'Running' | 'Failed'
}

export type Node = {
  id: string
  capacity: number
  pods: string[]
  status: 'Ready' | 'Down'
}

export type ActualState = {
  pods: Pod[]
  nodes: Node[]
  phase: 1 | 2 | 3 | 4 | 5
  desiredPods?: number
  lastFeedbackMessage?: string
  nodeKilledAt?: number
  controllerActive?: boolean
  lastPodCreatedAt?: number
}