export type Pod = {
  id: string
  nodeId?: string
  status: 'Pending' | 'Running'
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
}
