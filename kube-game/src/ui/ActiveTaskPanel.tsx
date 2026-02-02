import type { Task } from "../types"

type Props = {
  task?: Task
}

export function ActiveTaskPanel({ task }: Props) {
  if (!task) return null

  return (
    <div className="p-3 md:p-6 bg-card border-l-4 border-primary rounded-lg space-y-2 md:space-y-3">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-base md:text-xl font-bold text-primary flex-1">{task.title}</h3>
        <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary font-semibold whitespace-nowrap">
          Current
        </span>
      </div>
      <p className="text-xs md:text-base text-foreground/80">{task.description}</p>
    </div>
  )
}
