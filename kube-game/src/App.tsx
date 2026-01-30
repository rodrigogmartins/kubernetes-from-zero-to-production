import { useEffect, useState } from 'react'
import { reconcile } from './engine/reconcile'
import { Controls } from './ui/Controls'
import { ClusterView } from './ui/ClusterView'
import { createInitialState } from './state/initialState'
import { phase1Tasks } from './tasks/phase1Tasks'
import { TaskPanel } from './ui/TaskPanel'

import type { Task } from './tasks/types'
import type { ActualState } from './state/types'
import { ActiveTaskPanel } from './ui/ActiveTaskPanel'

export default function App() {
  const [state, setState] = useState<ActualState>(
    createInitialState()
  )
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(
    new Set()
  )
  const [lastCompletedTask, setLastCompletedTask] = useState<Task | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setState(prev => {
        const next = reconcile(prev)

        const nextTask = phase1Tasks.find(
          task =>
            !completedTasks.has(task.id) &&
            task.isCompleted(next)
        )

        if (nextTask) {
          setCompletedTasks(prevSet => {
            const newSet = new Set(prevSet)
            newSet.add(nextTask.id)
            return newSet
          })

          setLastCompletedTask(nextTask)
        }

        return next
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [completedTasks])

  function addPod() {
    setState(prev => ({
      ...prev,
      pods: [
        ...prev.pods,
        {
          id: crypto.randomUUID(),
          status: 'Pending'
        }
      ]
    }))
  }

  function killNode(nodeId: string) {
    setState(prev => ({
      ...prev,
      nodes: prev.nodes.map(n =>
        n.id === nodeId
          ? { ...n, status: 'Down', pods: [] }
          : n
      )
    }))
  }

  const activeTask = phase1Tasks.find(
    task => !completedTasks.has(task.id)
  )

  return (
    <div style={{ padding: 20 }}>
      <h1>Primitive Cluster</h1>
      <ActiveTaskPanel task={activeTask} />
      <Controls
        addPod={addPod}
        killNode={killNode}
        activeTaskId={activeTask?.id}
      />
      {lastCompletedTask && (
        <TaskPanel task={lastCompletedTask} />
      )}
      <ClusterView state={state} />
    </div>
  )
}
