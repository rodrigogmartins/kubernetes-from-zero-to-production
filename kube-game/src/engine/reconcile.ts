import type { ActualState } from '../types'

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

  // Phase 4: Scheduler-driven - controller creates pods on desired state increase
  // The scheduler moves pending pods to running pods based on node capacity
  // Pods are ONLY deleted by explicit user action, never by the controller
  if (newState.phase === 4 && newState.desiredPods !== undefined) {
    const currentRunningPods = newState.pods.filter(p => p.status === 'Running').length
    const currentPendingPods = newState.pods.filter(p => p.status === 'Pending').length
    const totalCurrentPods = currentRunningPods + currentPendingPods

    // ONLY create pods if desired > total (never auto-delete)
    if (totalCurrentPods < newState.desiredPods) {
      newState.pods.push({
        id: crypto.randomUUID(),
        status: 'Pending'
      })
      newState.lastPodCreatedAt = Date.now()
    }
    // If desired < total: DO NOTHING. Only the player can delete pods.
  }

  // Phase 3: Controller-driven reconciliation with bootstrap and reconcile modes
  if (newState.phase === 3 && newState.controllerActive && newState.desiredPods !== undefined) {
    const currentRunningPods = newState.pods.filter(p => p.status === 'Running').length
    const currentPendingPods = newState.pods.filter(p => p.status === 'Pending').length
    const totalCurrentPods = currentRunningPods + currentPendingPods

    // BOOTSTRAP MODE: Create pods until desired state is reached for the first time
    if (newState.controllerMode === 'bootstrap') {
      if (totalCurrentPods < newState.desiredPods) {
        // Create one pod per tick
        newState.pods.push({
          id: crypto.randomUUID(),
          status: 'Pending'
        })
        newState.lastPodCreatedAt = Date.now()
      } else if (totalCurrentPods === newState.desiredPods && currentRunningPods === newState.desiredPods) {
        // Transition to reconcile mode once all pods are running
        newState.controllerMode = 'reconcile'
      }
    }
    // RECONCILE MODE: React to drift (only after a user-induced failure)
    else if (newState.controllerMode === 'reconcile' && newState.podDeletedByUser) {
      if (totalCurrentPods < newState.desiredPods) {
        // Recreate missing pods
        newState.pods.push({
          id: crypto.randomUUID(),
          status: 'Pending'
        })
        newState.lastPodCreatedAt = Date.now()
      }
    }
  }

  // Phase 2: Handle desired state increase (only increase, never decrease)
  // NO automatic recovery on node failure - pods lost are lost permanently
  if (newState.phase === 2 && newState.desiredPods !== undefined) {
    const currentRunningPods = newState.pods.filter(p => p.status === 'Running').length
    const currentPendingPods = newState.pods.filter(p => p.status === 'Pending').length
    const currentFailedPods = newState.pods.filter(p => p.status === 'Failed').length
    const totalCurrentPods = currentRunningPods + currentPendingPods + currentFailedPods

    // ONLY create pods if desired > total
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

  // Phase 2: Handle nodes that are down - mark their pods as Failed, but DO NOT recreate them
  if (newState.phase === 2) {
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
  }

  // Phase 3: Handle nodes that are down - mark their pods as Failed
  // Failed pods will be replaced by the controller in reconcile mode
  if (newState.phase === 3) {
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
  }

  // Phase 4 & 5: Handle nodes that are down - mark their pods as Failed
  if ((newState.phase === 4 || newState.phase === 5) && newState.controllerActive) {
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
