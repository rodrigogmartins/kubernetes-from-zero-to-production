import type { ActualState } from '../state/types'

export function reconcile(state: ActualState): ActualState {
  const nodes = state.nodes.map(n => ({
    ...n,
    pods: [...n.pods]
  }))

  let pods = state.pods.map(p => ({ ...p }))

  // 1. Remove pods from down nodes
  for (const node of nodes) {
    if (node.status === 'Down') {
      pods = pods.filter(p => p.nodeId !== node.id)
      node.pods = []
    }
  }

  // 2. Schedule pending pods
  for (const pod of pods) {
    if (pod.status === 'Pending') {
      const node = nodes.find(
        n =>
          n.status === 'Ready' &&
          n.pods.length < n.capacity
      )

      if (node) {
        pod.status = 'Running'
        pod.nodeId = node.id
        node.pods.push(pod.id)
      }
    }
  }

  return { nodes, pods }
}
