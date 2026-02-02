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
  controllerMode?: 'bootstrap' | 'reconcile'
  lastPodCreatedAt?: number
  podDeletedByUser?: boolean
  userDeletedRunningPod?: boolean
  previousPods?: Pod[]
  pendingPodWasScheduled?: boolean
}

export type Task = {
  id: string
  title: string
  description: string
  isCompleted: (state: ActualState, currentTime: number) => boolean
  summary: string
}
