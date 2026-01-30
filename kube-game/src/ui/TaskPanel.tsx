import { CheckCircle2 } from 'lucide-react'

import type { Task } from '../tasks/types'

type Props = {
  task?: Task
}

export function TaskPanel({ task }: Props) {
  if (!task) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-in fade-in">
      <div className="bg-card border-2 border-accent rounded-lg max-w-sm w-full p-6 md:p-8 space-y-4 animate-in scale-in-95">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-6 h-6 md:w-7 md:h-7 text-accent shrink-0 mt-0.5" />
          <div className="flex-1">
            <h2 className="text-lg md:text-xl font-bold text-accent">Task Complete!</h2>
            <h3 className="text-base md:text-lg font-semibold text-foreground mt-2">{task.title}</h3>
          </div>
        </div>
        <p className="text-sm md:text-base text-foreground/80">{task.summary}</p>
        <div className="pt-2 text-center">
          <p className="text-xs text-muted-foreground">Next task will appear automatically</p>
        </div>
      </div>
    </div>
  )
}
