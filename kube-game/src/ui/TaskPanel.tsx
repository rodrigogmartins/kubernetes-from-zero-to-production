'use client';

import { CheckCircle2, X } from 'lucide-react'
import type { Task } from '../types';

type Props = {
  task?: Task
  phase: 1 | 2 | 3 | 4 | 5
  isPhaseCompletion?: boolean
  onClose?: () => void
}

type EndPhaseTextContent = {
  title: string
  description: string
}

const EndPhaseTexts: Record<number, EndPhaseTextContent> = {
  1: {
    title: 'Phase 1 Complete! 🎉',
    description: 'You have experienced the fundamental behavior of Pods and Nodes. You understand how Kubernetes schedules pods onto nodes and recovers from failures.'
  },
  2: {
    title: 'Phase 2 Complete! 🎉',
    description: 'You finished Phase 2. You learned that Desired State expresses intent, but does not enforce reality. In the next phase, a controller will take responsibility.'
  },
  3: {
    title: 'Phase 3 Complete! 🎉',
    description: 'You mastered the reconciliation loop! Controllers actively enforce desired state by continuously watching and reconciling actual state toward the desired goal. This is the foundation of Kubernetes orchestration.'
  },
  4: {
    title: 'Phase 4 Complete! 🎉',
    description: 'You mastered the scheduler! The scheduler intelligently assigns pods to nodes based on available capacity. When capacity is full, pods wait in Pending state until space becomes available. This is Kubernetes resource orchestration in action.'
  },
  5: {
    title: 'Phase 5 Complete! 🎉',
    description: 'You mastered self-healing! When infrastructure fails, the controller automatically detects lost pods and reschedules them on healthy nodes. Kubernetes maintains resilience and recovery within system constraints.'
  }
}

export function TaskPanel({ task, phase, isPhaseCompletion, onClose }: Props) {
  if (!task) return null

  if (isPhaseCompletion) {
    const endPhaseText = EndPhaseTexts[phase]

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
        <div className="bg-card border-2 border-accent rounded-lg max-w-sm w-full p-6 md:p-8 space-y-4 animate-in scale-in-95 duration-300">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 md:w-7 md:h-7 text-accent flex-shrink-0 mt-0.5 animate-in zoom-in duration-500" />
            <div className="flex-1">
              <h2 className="text-lg md:text-xl font-bold text-accent">{ endPhaseText.title }</h2>
            </div>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0 p-1"
              aria-label="Close dialog"
            >
              <X size={20} />
            </button>
          </div>
          <p className="text-sm md:text-base text-foreground/80">{ endPhaseText.description }</p>
          <div className="pt-4 flex gap-2">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold text-sm transition-colors active:scale-95"
            >
              Next Phase
            </button>
          </div>
        </div>
      </div>
    )
    
  }

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
