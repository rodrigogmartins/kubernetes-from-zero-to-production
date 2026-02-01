'use client';

import { useState } from 'react'

type Props = {
  addPod: () => void
  killNode: (nodeId: string) => void
  setDesiredPods?: (count: number) => void
  phase?: 1 | 2
  desiredPods?: number
  activeTaskId?: string
}

export function Controls({ addPod, killNode, setDesiredPods, phase = 1, desiredPods, activeTaskId }: Props) {
  const [inputValue, setInputValue] = useState(desiredPods?.toString() || '5')

  const handleSetDesiredPods = () => {
    const count = Math.max(0, parseInt(inputValue, 10) || 0)
    setDesiredPods?.(count)
  }

  return (
    <div className="p-3 md:p-6 space-y-2 md:space-y-4 bg-card/50 overflow-auto">
      <h2 className="text-xs md:text-base font-semibold text-accent uppercase tracking-wide">Controls</h2>

      {phase === 1 ? (
        <>
          {/* Phase 1: Manual Pod Creation */}
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
        </>
      ) : (
        <>
          {/* Phase 2: Desired State (passive) */}
          <div className="space-y-2">
            <label className="block text-xs text-muted-foreground font-semibold">Set Desired Pod Count</label>
            <p className="text-xs text-muted-foreground">
              Change this value to see what happens. Remember: no controller enforces this desire.
            </p>
            <div className="flex gap-2">
              <input
                type="number"
                min="0"
                max="20"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <button
                onClick={handleSetDesiredPods}
                className="px-3 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold text-xs transition-colors active:scale-95"
              >
                Set
              </button>
            </div>
            {desiredPods !== undefined && (
              <p className="text-xs text-accent">Current desired: {desiredPods} pods</p>
            )}
          </div>

          {/* Node Failure for Phase 2 */}
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground font-semibold">Test Node Failure:</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => killNode('node-1')}
                className="px-2 py-2 md:py-2.5 bg-destructive/20 hover:bg-destructive/30 text-destructive rounded-lg font-semibold text-xs transition-colors active:scale-95"
              >
                Kill Node 1
              </button>
              <button
                onClick={() => killNode('node-2')}
                className="px-2 py-2 md:py-2.5 bg-destructive/20 hover:bg-destructive/30 text-destructive rounded-lg font-semibold text-xs transition-colors active:scale-95"
              >
                Kill Node 2
              </button>
            </div>
          </div>

          <div className="p-2 bg-amber-900/20 border border-amber-700 rounded text-xs text-amber-400">
            Notice: Killed nodes stay dead. No pods are recreated. Desired State is passive without a controller.
          </div>
        </>
      )}
    </div>
  )
}
