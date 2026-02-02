'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

import { createInitialState, createPhase2InitialState, createPhase3InitialState, createPhase4InitialState, createPhase5InitialState } from './state/initialState'
import type { Task } from './tasks/types'
import { reconcile } from './engine/reconcile'
import { phase1Tasks } from './tasks/phase1Tasks'
import { ClusterView } from './ui/ClusterView'
import { ActiveTaskPanel } from './ui/ActiveTaskPanel'
import { Controls } from './ui/Controls'
import { TaskPanel } from './ui/TaskPanel'
import { phase2Tasks } from './tasks/phase2Tasks'
import { phase5Tasks } from './tasks/phase5Tasks'
import { phase3Tasks } from './tasks/phase3Tasks'
import { phase4Tasks } from './tasks/phase4Tasks'

export default function KubeGame() {
  const [state, setState] = useState(createInitialState())
  const [lastCompletedTask, setLastCompletedTask] = useState<Task | null>(null)
  const [showTaskNotification, setShowTaskNotification] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isGamePaused, setIsGamePaused] = useState(false)
  const [pendingPhaseTransition, setPendingPhaseTransition] = useState<1 | 2 | 3 | 4 | 5 | null>(null)
  const [showGameCompletion, setShowGameCompletion] = useState(false)
  const notifiedTasksRef = useRef(new Set<string>())
  const isModalOpenRef = useRef(false)

  const handleCloseModal = useCallback(() => {
    setShowTaskNotification(false)
    isModalOpenRef.current = false
    setIsGamePaused(false)
    
    // Check if this was the final Phase 5 task completion
    if (state.phase === 5 && phase5Tasks.every(t => notifiedTasksRef.current.has(t.id))) {
      // Schedule completion screen to show after a brief delay
      setTimeout(() => {
        setShowGameCompletion(true)
        setIsGamePaused(true)
      }, 300)
    }
    
    // If there's a pending phase transition, execute it after modal closes
    if (pendingPhaseTransition) {
      setState((prev) => {
        if (pendingPhaseTransition === 2) {
          return createPhase2InitialState()
        } else if (pendingPhaseTransition === 3) {
          return createPhase3InitialState()
        } else if (pendingPhaseTransition === 4) {
          return createPhase4InitialState()
        } else if (pendingPhaseTransition === 5) {
          return createPhase5InitialState()
        }
        return prev
      })
      setPendingPhaseTransition(null)
    }
  }, [pendingPhaseTransition, state.phase])

  useEffect(() => {
    if (showTaskNotification) {
      isModalOpenRef.current = true
      setIsGamePaused(true)
    }
  }, [showTaskNotification, lastCompletedTask])

  useEffect(() => {
    const interval = setInterval(() => {
      // If game is paused, don't run reconciliation or task checks
      if (isGamePaused) {
        return
      }

      setState((prev) => {
        const next = reconcile(prev)

        // Determine which tasks to use based on phase
        const currentTasks = next.phase === 2 ? phase2Tasks : next.phase === 3 ? phase3Tasks : next.phase === 4 ? phase4Tasks : next.phase === 5 ? phase5Tasks : phase1Tasks
        const currentTime = Date.now()

        // Only show next task if modal is not currently open
        if (!isModalOpenRef.current) {
          const nextTask = currentTasks.find((task: Task) => !notifiedTasksRef.current.has(task.id) && task.isCompleted(next, currentTime))

          if (nextTask) {
            notifiedTasksRef.current.add(nextTask.id)
            setLastCompletedTask(nextTask)
            setShowTaskNotification(true)
          }
        }

        // Check if all tasks for this phase are complete
        const allPhase1Complete = next.phase === 1 && phase1Tasks.every(t => notifiedTasksRef.current.has(t.id))
        const allPhase2Complete = next.phase === 2 && phase2Tasks.every(t => notifiedTasksRef.current.has(t.id))
        const allPhase3Complete = next.phase === 3 && phase3Tasks.every(t => notifiedTasksRef.current.has(t.id))
        const allPhase4Complete = next.phase === 4 && phase4Tasks.every(t => notifiedTasksRef.current.has(t.id))
        const allPhase5Complete = next.phase === 5 && phase5Tasks.every(t => notifiedTasksRef.current.has(t.id))

        // Queue phase transitions instead of executing immediately
        if (allPhase1Complete) {
          notifiedTasksRef.current.clear()
          setPendingPhaseTransition(2)
          return next
        }

        if (allPhase2Complete) {
          notifiedTasksRef.current.clear()
          setPendingPhaseTransition(3)
          return next
        }

        if (allPhase3Complete) {
          notifiedTasksRef.current.clear()
          setPendingPhaseTransition(4)
          return next
        }

        if (allPhase4Complete) {
          notifiedTasksRef.current.clear()
          setPendingPhaseTransition(5)
          return next
        }

        // Phase 5 is the final phase - just acknowledge completion
        if (allPhase5Complete) {
          // Phase 5 is complete but no further transition
          return next
        }

        return next
      })
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [isGamePaused])

  function addPod() {
    setState((prev) => ({
      ...prev,
      pods: [
        ...prev.pods,
        {
          id: crypto.randomUUID(),
          status: 'Pending'
        }
      ]
    }))
  }

  function killNode(nodeId: string) {
    setState((prev) => ({
      ...prev,
      nodes: prev.nodes.map((n) => (n.id === nodeId ? { ...n, status: 'Down' } : n)),
      nodeKilledAt: Date.now()
    }))
  }

  function setDesiredPods(count: number) {
    setState((prev) => ({
      ...prev,
      desiredPods: count,
      lastFeedbackMessage: count < (prev.desiredPods || 0) 
        ? 'Desired State decreased, but no controller exists to delete pods.' 
        : 'Desired State increased. New pods will be created if nodes have capacity.'
    }))
  }

  function toggleController() {
    setState((prev) => ({
      ...prev,
      controllerActive: !prev.controllerActive,
      lastFeedbackMessage: !prev.controllerActive 
        ? 'Controller ACTIVE. Reconciliation loop is running.'
        : 'Controller PAUSED. No reconciliation happening.'
    }))
  }

  function deletePod(podId: string) {
    setState((prev) => {
      const newState = {
        ...prev,
        pods: prev.pods.filter(p => p.id !== podId),
        nodes: prev.nodes.map(n => ({
          ...n,
          pods: n.pods.filter(id => id !== podId)
        }))
      }
      return newState
    })
  }

  const currentTasks = state.phase === 2 ? phase2Tasks : state.phase === 3 ? phase3Tasks : state.phase === 4 ? phase4Tasks : state.phase === 5 ? phase5Tasks : phase1Tasks
  const activeTask = currentTasks.find((task) => !notifiedTasksRef.current.has(task.id))

  return (
    <div className="w-full h-full flex flex-col lg:flex-row gap-0 bg-background">
      {/* Main Game Area */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Compact Header for Mobile */}
        <div className="p-2 md:p-6 border-b border-border bg-card/50">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <h1 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent truncate">
                Kube Game
              </h1>
              <p className="text-xs md:text-sm text-muted-foreground hidden md:block">
                {state.phase === 5 ? 'Phase 5 — Self-Healing & Resilience' : state.phase === 4 ? 'Phase 4 — Scheduler & Node Capacity' : state.phase === 3 ? 'Phase 3 — Controllers & Reconciliation' : state.phase === 2 ? 'Phase 2 — Desired State (No Controllers)' : 'Learn Kubernetes fundamentals through gameplay'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {/* Phase Badge */}
              <div className={`flex items-center gap-1.5 px-2.5 md:px-3 py-1 md:py-2 rounded-lg border whitespace-nowrap ${
                state.phase === 2 
                  ? 'bg-amber-900/20 border-amber-700 text-amber-400'
                  : 'bg-secondary/20 border-secondary text-secondary'
              }`}>
                <span className="text-xs md:text-sm font-semibold">Phase {state.phase}</span>
              </div>
              {/* Status Badge */}
              <div className="flex items-center gap-2 px-2 md:px-3 py-1 md:py-2 bg-accent/10 rounded-lg border border-accent/20 whitespace-nowrap">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                <span className="text-xs md:text-sm font-semibold text-accent">Playing</span>
              </div>
            </div>
          </div>
          {/* Feedback message for Phase 2 */}
          {state.phase === 2 && state.lastFeedbackMessage && (
            <div className="mt-3 p-2.5 bg-muted/30 border border-muted rounded text-xs text-muted-foreground">
              {state.lastFeedbackMessage}
            </div>
          )}
        </div>

        {/* Main Content - Mobile First */}
        <div className="flex-1 flex flex-col lg:flex-row gap-0 overflow-hidden">
          {/* Left: Cluster View (always visible, prioritized on mobile) */}
          <div className="flex-1 overflow-auto lg:border-r border-border min-h-0">
            <ClusterView state={state} />
          </div>

          {/* Right: Sidebar with Tasks and Controls (Collapsible on Mobile) */}
          <div className="w-full lg:w-80 flex flex-col border-t lg:border-t-0 lg:border-l border-border bg-background overflow-hidden">
            {/* Mobile Collapse Toggle */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden flex items-center justify-between px-4 py-2 bg-card/50 border-b border-border hover:bg-card/70 transition-colors"
            >
              <span className="text-sm font-semibold text-accent">Goals & Controls</span>
              {sidebarOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>

            {/* Sidebar Content (Hidden on mobile by default) */}
            <div className={`${sidebarOpen ? 'flex' : 'hidden'} lg:flex flex-col overflow-hidden flex-1`}>
              {/* Active Task */}
              <div className="p-3 md:p-6 border-b border-border overflow-auto">
                <ActiveTaskPanel task={activeTask} phase={state.phase} />
              </div>

              {/* Controls */}
              <div className="flex-1 overflow-auto">
                <Controls addPod={addPod} killNode={killNode} setDesiredPods={setDesiredPods} toggleController={toggleController} phase={state.phase} desiredPods={state.desiredPods} activeTaskId={activeTask?.id} controllerActive={state.controllerActive} deletePod={deletePod} pods={state.pods} nodes={state.nodes} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Task Completion Notification */}
      {showTaskNotification && lastCompletedTask && (
        <TaskPanel task={lastCompletedTask} onClose={handleCloseModal} />
      )}

      {/* Final Game Completion Screen */}
      {showGameCompletion && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg shadow-2xl max-w-2xl w-full mx-4 overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            {/* Header with celebration */}
            <div className="bg-gradient-to-r from-accent/20 to-primary/20 border-b border-accent/30 px-6 md:px-8 py-8 md:py-10 text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-accent mb-2">
                Congratulations!
              </h2>
              <p className="text-sm text-muted-foreground">You&apos;ve mastered Kubernetes</p>
            </div>

            {/* Main Content */}
            <div className="px-6 md:px-8 py-8 md:py-10">
              <p className="text-lg md:text-xl font-semibold text-foreground mb-6 text-balance">
                You&apos;ve completed Kube Game – From Zero to Production.
              </p>

              <div className="space-y-4 mb-8">
                <p className="text-sm md:text-base text-foreground/90">
                  You learned how Kubernetes:
                </p>
                <ul className="space-y-3 ml-4">
                  <li className="flex gap-3 text-sm md:text-base text-foreground/80">
                    <span className="text-accent font-bold">•</span>
                    <span>Translates desired state into reality</span>
                  </li>
                  <li className="flex gap-3 text-sm md:text-base text-foreground/80">
                    <span className="text-accent font-bold">•</span>
                    <span>Uses controllers and reconciliation loops</span>
                  </li>
                  <li className="flex gap-3 text-sm md:text-base text-foreground/80">
                    <span className="text-accent font-bold">•</span>
                    <span>Handles failures through self-healing</span>
                  </li>
                  <li className="flex gap-3 text-sm md:text-base text-foreground/80">
                    <span className="text-accent font-bold">•</span>
                    <span>Keeps workloads running despite node failures</span>
                  </li>
                </ul>
              </div>

              {/* Key insight */}
              <div className="bg-accent/10 border-l-4 border-accent rounded-r p-4 md:p-5 mb-8">
                <p className="text-sm md:text-base text-foreground/90 leading-relaxed">
                  <span className="font-semibold text-accent">Kubernetes doesn't prevent failures</span> — it embraces them.
                  <br />
                  Your job is to define what you want.
                  <br />
                  <span className="font-semibold text-accent">Kubernetes figures out how to keep it true.</span>
                </p>
              </div>

              {/* Footer emphasis */}
              <p className="text-center text-lg md:text-xl font-bold text-accent mb-8">
                You now think like Kubernetes.
              </p>

              {/* Action button */}
              <button
                onClick={() => setShowGameCompletion(false)}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-3 px-4 rounded-lg transition-colors active:scale-95"
              >
                Finish Game
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
