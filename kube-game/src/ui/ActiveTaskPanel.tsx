import type { Task } from "../tasks/types"

type Props = {
  task?: Task
  phase?: 1 | 2 | 3 | 4 | 5
}

export function ActiveTaskPanel({ task, phase = 1 }: Props) {
  if (!task) {
    return (
      <div className="p-3 md:p-6 bg-card border-l-4 border-accent rounded-lg">
        <h3 className="text-base md:text-xl font-bold text-accent mb-2">
          {phase === 5 ? 'Phase 5 Complete! 🎉' : phase === 4 ? 'Phase 4 Complete!' : phase === 3 ? 'Phase 3 Complete!' : phase === 2 ? 'Phase 2 Complete!' : 'Phase 1 Complete!'}
        </h3>
        <p className="text-xs md:text-base text-foreground/80">
          {phase === 5 
            ? 'You mastered self-healing! When infrastructure fails, the controller automatically detects lost pods and reschedules them on healthy nodes. Kubernetes maintains resilience and recovery within system constraints.'
            : phase === 4 
            ? 'You mastered the scheduler! The scheduler intelligently assigns pods to nodes based on available capacity. When capacity is full, pods wait in Pending state until space becomes available. This is Kubernetes resource orchestration in action.'
            : phase === 3 
            ? 'You mastered the reconciliation loop! Controllers actively enforce desired state by continuously watching and reconciling actual state toward the desired goal. This is the foundation of Kubernetes orchestration.'
            : phase === 2 
            ? 'You finished Phase 2. You learned that Desired State expresses intent, but does not enforce reality. In the next phase, a controller will take responsibility.'
            : 'You have experienced the fundamental behavior of Pods and Nodes. You understand how Kubernetes schedules pods onto nodes and recovers from failures.'}
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
