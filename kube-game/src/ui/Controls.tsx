'use client';

import { useState, useEffect } from 'react'

type Props = {
  addPod: () => void
  killNode: (nodeId: string) => void
  setDesiredPods?: (count: number) => void
  toggleController?: () => void
  deletePod?: (podId: string) => void
  phase?: 1 | 2 | 3 | 4 | 5
  desiredPods?: number
  activeTaskId?: string
  controllerActive?: boolean
  pods?: Array<{ id: string; status: string; nodeId?: string }>
  nodes?: Array<{ id: string; capacity: number; pods: string[]; status: string }>
}

export function Controls({ addPod, killNode, setDesiredPods, toggleController, deletePod, phase = 1, desiredPods, activeTaskId, controllerActive, pods = [], nodes = [] }: Props) {
  const [inputValue, setInputValue] = useState(desiredPods?.toString() || '0')
  
  useEffect(() => {
    setInputValue(desiredPods?.toString() || '0')
  }, [desiredPods])

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
      ) : phase === 2 ? (
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
              <p className="text-xs text-accent">Desired: {desiredPods} pods</p>
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
      ) : phase === 3 ? (
        <>
          {/* Phase 3: Controller Toggle */}
          <div className="space-y-3">
            {/* Controller Status - More Visual */}
            <div className={`flex items-center justify-between p-3 rounded-lg border-2 transition-all ${
              controllerActive
                ? 'bg-accent/10 border-accent text-accent'
                : 'bg-destructive/10 border-destructive text-destructive'
            }`}>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider">
                  Controller: {controllerActive ? 'ACTIVE' : 'PAUSED'}
                </p>
                <p className="text-xs mt-1">
                  {controllerActive ? 'Reconciling continuously' : 'No automatic correction'}
                </p>
              </div>
              <button
                onClick={toggleController}
                className={`px-3 py-2 rounded-lg font-semibold text-xs transition-colors active:scale-95 ${
                  controllerActive
                    ? 'bg-accent hover:bg-accent/80 text-accent-foreground'
                    : 'bg-destructive hover:bg-destructive/80 text-destructive-foreground'
                }`}
              >
                {controllerActive ? 'Pause' : 'Start'}
              </button>
            </div>

            {/* Current vs Desired State Display */}
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-2 bg-muted/20 rounded border border-border">
                <p className="text-xs text-muted-foreground">Current</p>
                <p className="text-lg font-bold text-accent">{pods.filter(p => p.status === 'Running').length}</p>
              </div>
              <div className="p-2 bg-muted/20 rounded border border-border">
                <p className="text-xs text-muted-foreground">Desired</p>
                <p className="text-lg font-bold text-primary">{desiredPods}</p>
              </div>
            </div>

            {/* Delete Pod Control - Always Available */}
            {pods.length > 0 && (
              <button
                onClick={() => {
                  const runningPods = pods.filter(p => p.status === 'Running')
                  if (runningPods.length > 0) {
                    deletePod?.(runningPods[0].id)
                  }
                }}
                className="w-full px-3 py-2 bg-destructive/20 hover:bg-destructive/30 text-destructive rounded-lg font-semibold text-xs transition-colors active:scale-95"
              >
                Delete Pod
              </button>
            )}

            {/* Controller Information */}
            <div className="p-2 bg-muted/10 border border-border rounded text-xs text-muted-foreground">
              {controllerActive 
                ? 'Manual actions trigger automatic reconciliation. Current state converges to desired state.'
                : 'Manual actions are allowed. Pod deletion is enabled even though controller is paused.'}
            </div>
          </div>
        </>
      ) : phase === 4 ? (
        <>
          {/* Phase 4: Scheduler with Node Capacity Display */}
          <div className="space-y-3">
            {/* Node Capacity Display */}
            <div>
              <p className="text-xs text-muted-foreground font-semibold mb-2">Node Capacity</p>
              <div className="space-y-1.5">
                {nodes.map((node) => {
                  const used = node.pods.length
                  const total = node.capacity
                  const isFull = used >= total
                  const nodeLabel = node.id === 'node-a' ? 'A' : node.id === 'node-b' ? 'B' : 'C'
                  
                  return (
                    <div key={node.id} className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-semibold">Node {nodeLabel}</span>
                        <span className={`${isFull ? 'text-destructive' : 'text-accent'}`}>
                          {used}/{total}
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden border border-border">
                        <div
                          className={`h-full transition-all ${isFull ? 'bg-destructive' : 'bg-accent'}`}
                          style={{ width: `${(used / total) * 100}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Current vs Desired State */}
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-2 bg-muted/20 rounded border border-border">
                <p className="text-xs text-muted-foreground">Current</p>
                <p className="text-lg font-bold text-accent">{pods.filter(p => p.status === 'Running').length}</p>
              </div>
              <div className="p-2 bg-muted/20 rounded border border-border">
                <p className="text-xs text-muted-foreground">Desired</p>
                <p className="text-lg font-bold text-primary">{desiredPods}</p>
              </div>
            </div>

            {/* Pending Pods Indicator */}
            {pods.some(p => p.status === 'Pending') && (
              <div className="p-2 bg-amber-900/20 border border-amber-700 rounded text-xs text-amber-400">
                {pods.filter(p => p.status === 'Pending').length} pod{pods.filter(p => p.status === 'Pending').length !== 1 ? 's' : ''} waiting for node capacity
              </div>
            )}

            {/* Delete Pod Button */}
            {pods.length > 0 && (
              <button
                onClick={() => {
                  const runningPods = pods.filter(p => p.status === 'Running')
                  if (runningPods.length > 0) {
                    deletePod?.(runningPods[0].id)
                  }
                }}
                className="w-full px-3 py-2 bg-destructive/20 hover:bg-destructive/30 text-destructive rounded-lg font-semibold text-xs transition-colors active:scale-95"
              >
                Delete Pod
              </button>
            )}

            {/* Desired State Control */}
            <div className="space-y-2">
              <label className="block text-xs text-muted-foreground font-semibold">Adjust Desired State</label>
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
            </div>

            {/* Scheduler Information */}
            <div className="p-2 bg-muted/10 border border-border rounded text-xs text-muted-foreground">
              Scheduler automatically places pods on nodes with available capacity. Full nodes reject new assignments.
            </div>
          </div>
        </>
      ) : phase === 5 ? (
        <>
          {/* Phase 5: Self-Healing with Kill Node Control */}
          <div className="space-y-3">
            {/* Node Status Display */}
            <div>
              <p className="text-xs text-muted-foreground font-semibold mb-2">Cluster Status</p>
              <div className="space-y-1.5">
                {nodes.map((node) => {
                  const used = node.pods.length
                  const total = node.capacity
                  const isFull = used >= total && node.status === 'Ready'
                  const isDown = node.status === 'Down'
                  const nodeLabel = node.id === 'node-a' ? 'A' : node.id === 'node-b' ? 'B' : 'C'
                  
                  return (
                    <div key={node.id} className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-semibold">{nodeLabel}</span>
                        <span className={`font-bold ${
                          isDown ? 'text-gray-500' : isFull ? 'text-amber-500' : 'text-accent'
                        }`}>
                          {isDown ? 'DOWN' : isFull ? 'FULL' : 'Ready'}
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden border-2" style={{
                        borderColor: isDown ? '#6B7280' : isFull ? '#D97706' : '#00BCD4'
                      }}>
                        <div
                          className={`h-full transition-all ${
                            isDown ? 'bg-gray-500' : isFull ? 'bg-amber-500' : 'bg-accent'
                          }`}
                          style={{ width: isDown ? '0%' : `${(used / total) * 100}%` }}
                        />
                      </div>
                      {!isDown && <p className="text-xs text-muted-foreground">{used}/{total}</p>}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Current vs Desired State */}
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-2 bg-muted/20 rounded border border-border">
                <p className="text-xs text-muted-foreground">Running</p>
                <p className="text-lg font-bold text-accent">{pods.filter(p => p.status === 'Running').length}</p>
              </div>
              <div className="p-2 bg-muted/20 rounded border border-border">
                <p className="text-xs text-muted-foreground">Desired</p>
                <p className="text-lg font-bold text-primary">{desiredPods}</p>
              </div>
            </div>

            {/* Failed/Pending Pods Status */}
            {pods.some(p => p.status === 'Failed' || p.status === 'Pending') && (
              <div className="space-y-1.5">
                {pods.some(p => p.status === 'Failed') && (
                  <div className="p-2 bg-destructive/20 border border-destructive rounded text-xs text-destructive">
                    {pods.filter(p => p.status === 'Failed').length} pod{pods.filter(p => p.status === 'Failed').length !== 1 ? 's' : ''} lost from failed node
                  </div>
                )}
                {pods.some(p => p.status === 'Pending') && (
                  <div className="p-2 bg-amber-900/20 border border-amber-700 rounded text-xs text-amber-400">
                    {pods.filter(p => p.status === 'Pending').length} pod{pods.filter(p => p.status === 'Pending').length !== 1 ? 's' : ''} rescheduling on healthy nodes
                  </div>
                )}
              </div>
            )}

            {/* Kill Node Buttons */}
            <div>
              <p className="text-xs text-muted-foreground font-semibold mb-2">Simulate Failure</p>
              <div className="space-y-1.5">
                {nodes.filter(n => n.status === 'Ready').map((node) => {
                  const nodeLabel = node.id === 'node-a' ? 'Node A' : node.id === 'node-b' ? 'Node B' : 'Node C'
                  return (
                    <button
                      key={node.id}
                      onClick={() => killNode(node.id)}
                      className="w-full px-3 py-2 bg-destructive/20 hover:bg-destructive/30 text-destructive rounded-lg font-semibold text-xs transition-colors active:scale-95"
                    >
                      Kill {nodeLabel}
                    </button>
                  )
                })}
                {nodes.every(n => n.status === 'Down') && (
                  <div className="p-2 bg-muted/10 border border-border rounded text-xs text-muted-foreground text-center">
                    All nodes are down
                  </div>
                )}
              </div>
            </div>

            {/* Self-Healing Information */}
            <div className="p-2 bg-muted/10 border border-border rounded text-xs text-muted-foreground">
              When a node fails, the controller detects lost pods and reschedules them on healthy nodes if capacity allows.
            </div>
          </div>
        </>
      ) : null}
    </div>
  )
}
