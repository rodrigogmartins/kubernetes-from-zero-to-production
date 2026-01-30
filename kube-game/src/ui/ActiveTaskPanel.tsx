import type { Task } from '../tasks/types'

type Props = {
  task?: Task
}

export function ActiveTaskPanel({ task }: Props) {
  if (!task) {
    return (
      <div style={{ marginBottom: 20 }}>
        <strong>Phase 1 completed</strong>
        <p>
          You have experienced the fundamental behavior of Pods and Nodes.
        </p>
      </div>
    )
  }

  return (
    <div
      style={{
        border: '1px solid black',
        padding: 10,
        marginBottom: 20,
        color: '#0f0f0f',
        backgroundColor: '#afafe8'
      }}
    >
      <strong>Current Task</strong>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
    </div>
  )
}
