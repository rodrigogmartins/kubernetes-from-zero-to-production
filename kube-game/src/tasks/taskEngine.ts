import type { Task } from './types'
import type { ActualState } from '../state/types'

export function getActiveTask(
  tasks: Task[],
  state: ActualState,
  completed: Set<string>
) {
  return tasks.find(
    t =>
      !completed.has(t.id) &&
      t.isCompleted(state)
  )
}
