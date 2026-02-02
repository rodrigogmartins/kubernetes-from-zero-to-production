import type { ActualState, Task } from '../../types'

export const phase3Tasks: Task[] = [
  {
    id: 'observe-paused',
    title: 'Observe Paused State',
    description: 'Notice the controller is PAUSED. You have 0 pods running and Desired State is 3. Nothing is reconciling.',
    summary: 'You observed the starting state. The controller is paused, so nothing is enforcing your desired state. This is the key difference from Phase 2—you now have a responsible actor.',
    isCompleted: (state: ActualState) => state.controllerActive === false && state.desiredPods === 3 && state.phase === 3
  },
  {
    id: 'start-controller',
    title: 'Start the Controller',
    description: 'Click "Start Controller" to activate the reconciliation loop. Watch pods being created automatically.',
    summary: 'You started the controller. It immediately began creating pods to match your desired state. This is active reconciliation—the system is now responsible for maintaining your intent.',
    isCompleted: (state: ActualState) => state.controllerActive === true
  },
  {
    id: 'observe-auto-creation',
    title: 'Observe Automatic Creation',
    description: 'Watch the controller create pods incrementally. Each tick, one pod moves closer to Running. Wait until all 3 pods are Running.',
    summary: 'Perfect! The controller created all 3 pods and scheduled them to Running. This is the power of a controller: it actively maintains your desired state without manual intervention.',
    isCompleted: (state: ActualState, _currentTime: number) => {
      const runningPods = state.pods.filter(p => p.status === 'Running').length
      return state.controllerActive === true && runningPods === 3
    }
  },
  {
    id: 'delete-pod',
    title: 'Delete a Pod',
    description: 'Manually delete one of the running pods. Break the system intentionally.',
    summary: 'You deleted a pod, but the current state is now 2, while desired is still 3. What will happen next?',
    isCompleted: (state: ActualState, _currentTime: number) => {
      const runningPods = state.pods.filter(p => p.status === 'Running').length
      return state.controllerActive === true && runningPods === 3
    }
  },
  {
    id: 'observe-recovery',
    title: 'Observe Automatic Recovery',
    description: 'Watch the controller automatically recreate the missing pod. Your desired state is being enforced continuously.',
    summary: 'The controller restored your desired state! Even though you manually deleted a pod, the controller noticed the discrepancy and fixed it. This is the magic of controllers: continuous reconciliation toward desired state.',
    isCompleted: (state: ActualState, _currentTime: number) => {
      const runningPods = state.pods.filter(p => p.status === 'Running').length
      return state.controllerActive === true && runningPods === 3
    }
  }
]
