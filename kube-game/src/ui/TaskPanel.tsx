'use client';

import { CheckCircle2, X } from 'lucide-react'
import type { Task } from '../tasks/types';

type Props = {
  task?: Task
  onClose?: () => void
}

export function TaskPanel({ task, onClose }: Props) {
  if (!task) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
      <div className="bg-card border-2 border-accent rounded-lg max-w-sm w-full p-6 md:p-8 space-y-4 animate-in scale-in-95 duration-300">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-6 h-6 md:w-7 md:h-7 text-accent flex-shrink-0 mt-0.5 animate-in zoom-in duration-500" />
          <div className="flex-1">
            <h2 className="text-lg md:text-xl font-bold text-accent">Task Complete!</h2>
            <h3 className="text-base md:text-lg font-semibold text-foreground mt-2">{task.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0 p-1"
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>
        <p className="text-sm md:text-base text-foreground/80">{task.summary}</p>
        <div className="pt-4 flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold text-sm transition-colors active:scale-95"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}
