import type { ActualState, Task } from '../../types'

export const phase3Tasks: Task[] = [
  {
    id: 'observe-paused',
    title: 'Observe Paused State',
    description: 'Notice the controller is PAUSED. You have 0 pods running and Desired State is 3. Nothing is reconciling.',
    summary: 'You observed the starting state. The controller is paused, so nothing is enforcing your desired state. This is the key difference from Phase 2—you now have a responsible actor.',
    isCompleted: (state: ActualState, _currentTime: number) => {
      return state.controllerActive === false && state.desiredPods === 3 && state.phase === 3
    }
  },
  {
    id: 'start-controller',
    title: 'Start the Controller',
    description: 'Click "Start Controller" to activate the reconciliation loop. Watch pods being created automatically.',
    summary: 'You started the controller. It immediately began creating pods to match your desired state. The controller is now in bootstrap mode, creating pods until the desired state is reached.',
    isCompleted: (state: ActualState, _currentTime: number) => state.controllerActive === true
  },
  {
    id: 'observe-bootstrap',
    title: 'Observe Bootstrap Mode',
    description: 'Watch the controller create pods incrementally in bootstrap mode. Each tick, one pod moves closer to Running. Wait until all 3 pods are Running.',
    summary: 'Perfect! The controller created all 3 pods and they are all running. Bootstrap mode is complete. Now the controller switches to reconcile mode, waiting for failures to react to.',
    isCompleted: (state: ActualState, _currentTime: number) => {
      const runningPods = state.pods.filter(p => p.status === 'Running').length
      return state.controllerActive === true && state.controllerMode === 'reconcile' && runningPods === 3
    }
  },
  {
    id: 'delete-pod',
    title: 'Delete a Pod (Simulate Failure)',
    description: 'Now simulate a failure by manually deleting one of the running pods. This is the moment the controller will react.',
    summary: 'You deleted a pod, simulating a failure. The current state is now 2 pods, while desired is still 3. The controller is now in reconcile mode and has detected the drift. Watch it react.',
    isCompleted: (state: ActualState, _currentTime: number) => {
      // Task completes as soon as the user manually deletes a pod
      // The action itself is what matters, not the resulting pod count
      return state.podDeletedByUser === true
    }
  },
  {
    id: 'observe-recovery',
    title: 'Observe Automatic Recovery',
    description: 'Watch the controller automatically recreate the missing pod. Your desired state is being enforced through active reconciliation.',
    summary: 'The controller restored your desired state! It detected the failure, reacted by creating a new pod, and the system returned to 3 running pods. This is the power of controllers—they continuously enforce desired state by reacting to failures.',
    isCompleted: (state: ActualState, _currentTime: number) => {
      const runningPods = state.pods.filter(p => p.status === 'Running').length
      return state.controllerActive === true && state.controllerMode === 'reconcile' && state.podDeletedByUser === true && runningPods === 3 && state.desiredPods === 3
    }
  }
]
