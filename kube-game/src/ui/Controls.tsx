'use client';

type Props = {
  addPod: () => void
  killNode: (nodeId: string) => void
  activeTaskId?: string
}

export function Controls({ addPod, killNode, activeTaskId }: Props) {
  return (
    <div className="p-3 md:p-6 space-y-2 md:space-y-4 bg-card/50 overflow-auto">
      <h2 className="text-xs md:text-base font-semibold text-accent uppercase tracking-wide">Controls</h2>

      {/* Main Action Buttons */}
      <button
        onClick={addPod}
        className="w-full px-3 py-2 md:py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold text-xs md:text-base transition-colors active:scale-95"
      >
        Create Pod
      </button>

      {/* Node Failure Buttons */}
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">Simulate node failure:</p>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => killNode('node-1')}
            disabled={activeTaskId !== 'node-failure'}
            className="px-2 py-2 md:py-2.5 bg-destructive/20 hover:bg-destructive/30 disabled:opacity-50 disabled:cursor-not-allowed text-destructive rounded-lg font-semibold text-xs transition-colors active:scale-95"
          >
            Kill Node 1
          </button>
          <button
            onClick={() => killNode('node-2')}
            disabled={activeTaskId !== 'node-failure'}
            className="px-2 py-2 md:py-2.5 bg-destructive/20 hover:bg-destructive/30 disabled:opacity-50 disabled:cursor-not-allowed text-destructive rounded-lg font-semibold text-xs transition-colors active:scale-95"
          >
            Kill Node 2
          </button>
        </div>
      </div>

      <p className="text-xs text-muted-foreground italic">
        {activeTaskId === 'node-failure' ? 'Node failure controls are enabled' : 'Complete earlier tasks to unlock node failure'}
      </p>
    </div>
  )
}
