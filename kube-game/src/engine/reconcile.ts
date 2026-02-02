import type { ActualState } from '../state/types'

export function reconcile(state: ActualState): ActualState {
  // Deep copy state properly
  const newState: ActualState = {
    ...state,
    nodes: state.nodes.map(n => ({ ...n, pods: [...n.pods] })),
    pods: state.pods.map(p => ({ ...p }))
  }

  // Phase 5: Self-healing with controller always active
  if (newState.phase === 5 && newState.controllerActive && newState.desiredPods !== undefined) {
    const currentRunningPods = newState.pods.filter(p => p.status === 'Running').length
    const currentPendingPods = newState.pods.filter(p => p.status === 'Pending').length
    const totalCurrentPods = currentRunningPods + currentPendingPods

    // Create ONE pod per tick if below desired (incremental)
    if (totalCurrentPods < newState.desiredPods) {
      newState.pods.push({
        id: crypto.randomUUID(),
        status: 'Pending'
      })
      newState.lastPodCreatedAt = Date.now()
    }
    // Delete pods if above desired (one at a time)
    else if (totalCurrentPods > newState.desiredPods) {
      const pendingPodIndex = newState.pods.findIndex(p => p.status === 'Pending')
      if (pendingPodIndex !== -1) {
        newState.pods.splice(pendingPodIndex, 1)
      } else {
        const runningPodIndex = newState.pods.findIndex(p => p.status === 'Running')
        if (runningPodIndex !== -1) {
          const pod = newState.pods[runningPodIndex]
          if (pod.nodeId) {
            const node = newState.nodes.find(n => n.id === pod.nodeId)
            if (node) {
              node.pods = node.pods.filter(id => id !== pod.id)
            }
          }
          newState.pods.splice(runningPodIndex, 1)
        }
      }
    }
  }

  // Phase 4: Scheduler-driven - controller always active, incremental pod creation
  if (newState.phase === 4 && newState.desiredPods !== undefined) {
    const currentRunningPods = newState.pods.filter(p => p.status === 'Running').length
    const currentPendingPods = newState.pods.filter(p => p.status === 'Pending').length
    const totalCurrentPods = currentRunningPods + currentPendingPods

    // Create ONE pod per tick if below desired (incremental)
    if (totalCurrentPods < newState.desiredPods) {
      newState.pods.push({
        id: crypto.randomUUID(),
        status: 'Pending'
      })
      newState.lastPodCreatedAt = Date.now()
    }
    // Delete pods if above desired (one at a time)
    else if (totalCurrentPods > newState.desiredPods) {
      // Remove one pending pod first, then running
      const pendingPodIndex = newState.pods.findIndex(p => p.status === 'Pending')
      if (pendingPodIndex !== -1) {
        newState.pods.splice(pendingPodIndex, 1)
      } else {
        const runningPodIndex = newState.pods.findIndex(p => p.status === 'Running')
        if (runningPodIndex !== -1) {
          const pod = newState.pods[runningPodIndex]
          if (pod.nodeId) {
            const node = newState.nodes.find(n => n.id === pod.nodeId)
            if (node) {
              node.pods = node.pods.filter(id => id !== pod.id)
            }
          }
          newState.pods.splice(runningPodIndex, 1)
        }
      }
    }
  }

  // Phase 3: Controller-driven reconciliation (only when active)
  if (newState.phase === 3 && newState.controllerActive && newState.desiredPods !== undefined) {
    const currentRunningPods = newState.pods.filter(p => p.status === 'Running').length
    const currentPendingPods = newState.pods.filter(p => p.status === 'Pending').length
    const totalCurrentPods = currentRunningPods + currentPendingPods

    // Create ONE pod per tick if below desired (incremental)
    if (totalCurrentPods < newState.desiredPods) {
      newState.pods.push({
        id: crypto.randomUUID(),
        status: 'Pending'
      })
      newState.lastPodCreatedAt = Date.now()
    }
    // Delete pods if above desired (one at a time)
    else if (totalCurrentPods > newState.desiredPods) {
      // Remove one pending pod first, then running
      const pendingPodIndex = newState.pods.findIndex(p => p.status === 'Pending')
      if (pendingPodIndex !== -1) {
        newState.pods.splice(pendingPodIndex, 1)
      } else {
        const runningPodIndex = newState.pods.findIndex(p => p.status === 'Running')
        if (runningPodIndex !== -1) {
          const pod = newState.pods[runningPodIndex]
          if (pod.nodeId) {
            const node = newState.nodes.find(n => n.id === pod.nodeId)
            if (node) {
              node.pods = node.pods.filter(id => id !== pod.id)
            }
          }
          newState.pods.splice(runningPodIndex, 1)
        }
      }
    }
  }

  // Phase 2: Handle desired state increase (only increase, never decrease)
  if (newState.phase === 2 && newState.desiredPods !== undefined) {
    const currentRunningPods = newState.pods.filter(p => p.status === 'Running').length
    const currentPendingPods = newState.pods.filter(p => p.status === 'Pending').length
    const totalCurrentPods = currentRunningPods + currentPendingPods

    // ONLY create pods if desired > current
    if (newState.desiredPods > totalCurrentPods) {
      const podsToCreate = newState.desiredPods - totalCurrentPods
      for (let i = 0; i < podsToCreate; i++) {
        newState.pods.push({
          id: crypto.randomUUID(),
          status: 'Pending'
        })
      }
    }
    // If desired < current: DO NOTHING. No controller exists to delete pods.
  }

  // Handle nodes that are down - mark their pods as Failed
  for (const node of newState.nodes) {
    if (node.status === 'Down') {
      for (const podId of node.pods) {
        const pod = newState.pods.find(p => p.id === podId)
        if (pod && pod.status === 'Running') {
          pod.status = 'Failed'
          pod.nodeId = undefined
        }
      }
      node.pods = []
    }
  }

  // Move pending pods to running nodes
  const runningNodes = newState.nodes.filter(n => n.status === 'Ready' && n.pods.length < n.capacity)
  const pendingPods = newState.pods.filter(p => p.status === 'Pending' && !p.nodeId)

  for (const pod of pendingPods) {
    if (runningNodes.length === 0) break

    // Find the node with the least pods
    runningNodes.sort((a, b) => a.pods.length - b.pods.length)
    const targetNode = runningNodes[0]

    pod.nodeId = targetNode.id
    pod.status = 'Running'
    targetNode.pods.push(pod.id)

    if (targetNode.pods.length >= targetNode.capacity) {
      runningNodes.shift()
    }
  }

  return newState
}
