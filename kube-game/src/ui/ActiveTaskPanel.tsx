import type { Task } from "../types"

type Props = {
  task?: Task
  phase?: 1 | 2 | 3 | 4 | 5
}

type EndPhaseTextContent = {
  title: string
  description: string
}

const EndPhaseTexts: Record<number, EndPhaseTextContent> = {
  1: {
    title: 'Phase 1 Complete!',
    description: 'You have experienced the fundamental behavior of Pods and Nodes. You understand how Kubernetes schedules pods onto nodes and recovers from failures.'
  },
  2: {
    title: 'Phase 2 Complete!',
    description: 'You finished Phase 2. You learned that Desired State expresses intent, but does not enforce reality. In the next phase, a controller will take responsibility.'
  },
  3: {
    title: 'Phase 3 Complete!',
    description: 'You mastered the reconciliation loop! Controllers actively enforce desired state by continuously watching and reconciling actual state toward the desired goal. This is the foundation of Kubernetes orchestration.'
  },
  4: {
    title: 'Phase 4 Complete!',
    description: 'You mastered the scheduler! The scheduler intelligently assigns pods to nodes based on available capacity. When capacity is full, pods wait in Pending state until space becomes available. This is Kubernetes resource orchestration in action.'
  },
  5: {
    title: 'Phase 5 Complete! 🎉',
    description: 'You mastered self-healing! When infrastructure fails, the controller automatically detects lost pods and reschedules them on healthy nodes. Kubernetes maintains resilience and recovery within system constraints.'
  }
}

export function ActiveTaskPanel({ task, phase = 1 }: Props) {
  if (!task) {
    const endPhaseText = EndPhaseTexts[phase]
    return (
      <div className="p-3 md:p-6 bg-card border-l-4 border-accent rounded-lg">
        <h3 className="text-base md:text-xl font-bold text-accent mb-2">
          { endPhaseText.title }
        </h3>
        <p className="text-xs md:text-base text-foreground/80">
          { endPhaseText.description }
        </p>
      </div>
    )
  }

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
