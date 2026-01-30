import type { Task } from '../tasks/types'

type Props = {
  task?: Task
}

export function TaskPanel({ task }: Props) {
  if (!task) return null

  return (
    <div
      style={{
        border: '1px solid black',
        padding: 10,
        marginBottom: 20
      }}
    >
      <strong>Task Completed</strong>
      <h3>{task.title}</h3>
      <p>{task.summary}</p>
    </div>
  )
}
