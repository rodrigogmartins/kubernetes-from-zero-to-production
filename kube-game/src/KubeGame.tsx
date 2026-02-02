'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

import { reconcile } from './engine/reconcile'
import { ClusterView } from './ui/ClusterView'
import { ActiveTaskPanel } from './ui/ActiveTaskPanel'
import { Controls } from './ui/Controls'
import { TaskPanel } from './ui/TaskPanel'
import type { ActualState, Task } from './types'
import { phase5Tasks } from './phases/phase5/phase5Tasks'
import { phase2Tasks } from './phases/phase2/phase2Tasks'
import { phase3Tasks } from './phases/phase3/phase3Tasks'
import { phase4Tasks } from './phases/phase4/phase4Tasks'
import { phase1Tasks } from './phases/phase1/phase1Tasks'

import { createPhase1InitialState } from './phases/phase1/initialState'
import { createPhase2InitialState } from './phases/phase2/initialState'
import { createPhase3InitialState } from './phases/phase3/initialState'
import { createPhase4InitialState } from './phases/phase4/initialState'
import { createPhase5InitialState } from './phases/phase5/initialState'

export default function KubeGame() {
  const [state, setState] = useState(createPhase1InitialState())
  const [lastCompletedTask, setLastCompletedTask] = useState<Task | null>(null)
  const [showTaskNotification, setShowTaskNotification] = useState(false)
  const [showPhaseCompletion, setShowPhaseCompletion] = useState(false)
  const [phaseCompletionTask, setPhaseCompletionTask] = useState<Task | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isGamePaused, setIsGamePaused] = useState(false)
  const [pendingPhaseTransition, setPendingPhaseTransition] = useState<1 | 2 | 3 | 4 | 5 | null>(null)
  const [showGameCompletion, setShowGameCompletion] = useState(false)
  const notifiedTasksRef = useRef(new Set<string>())
  const isModalOpenRef = useRef(false)
  const currentlyShowingTaskRef = useRef<string | null>(null)

  const handleCloseModal = useCallback(() => {
    setShowTaskNotification(false)
    isModalOpenRef.current = false
    currentlyShowingTaskRef.current = null
    
    // Check if we just closed the final task of the phase
    const currentTasks = state.phase === 2 ? phase2Tasks : state.phase === 3 ? phase3Tasks : state.phase === 4 ? phase4Tasks : state.phase === 5 ? phase5Tasks : phase1Tasks
    
    if (lastCompletedTask && currentTasks[currentTasks.length - 1].id === lastCompletedTask.id) {
      // This was the final task - check if all tasks are complete
      if (currentTasks.every(t => notifiedTasksRef.current.has(t.id))) {
        // Show phase completion modal
        setPhaseCompletionTask(lastCompletedTask)
        setShowPhaseCompletion(true)
        
        // Set up the next phase transition
        if (state.phase === 1) {
          setPendingPhaseTransition(2)
        } else if (state.phase === 2) {
          setPendingPhaseTransition(3)
        } else if (state.phase === 3) {
          setPendingPhaseTransition(4)
        } else if (state.phase === 4) {
          setPendingPhaseTransition(5)
        } else if (state.phase === 5) {
          setShowGameCompletion(true)
        }
        
        return
      }
    }
    
    setIsGamePaused(false)
  }, [state.phase, lastCompletedTask])

  const handleClosePhaseCompletion = useCallback(() => {
    setShowPhaseCompletion(false)
    setPhaseCompletionTask(null)
    
    // Wait 500ms before transitioning
    setTimeout(() => {
      if (pendingPhaseTransition) {
        setState((prev: ActualState) => {
          let newState
          if (pendingPhaseTransition === 2) {
            newState = createPhase2InitialState()
          } else if (pendingPhaseTransition === 3) {
            newState = createPhase3InitialState()
          } else if (pendingPhaseTransition === 4) {
            newState = createPhase4InitialState()
          } else if (pendingPhaseTransition === 5) {
            newState = createPhase5InitialState()
          } else {
            return prev
          }
          // Clear notified tasks for new phase
          notifiedTasksRef.current.clear()
          return newState
        })
        setPendingPhaseTransition(null)
      }
    }, 800)
    
    setIsGamePaused(false)
  }, [pendingPhaseTransition])

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

      setState((prev: ActualState) => {
        const next = reconcile(prev)

        // Determine which tasks to use based on phase
        const currentTasks = next.phase === 2 ? phase2Tasks : next.phase === 3 ? phase3Tasks : next.phase === 4 ? phase4Tasks : next.phase === 5 ? phase5Tasks : phase1Tasks
        const currentTime = Date.now()

        // Only show next task if modal is not currently open
        if (!isModalOpenRef.current && !currentlyShowingTaskRef.current) {
          // Find the first task that hasn't been notified yet
          let nextTask = null
          for (const task of currentTasks) {
            if (!notifiedTasksRef.current.has(task.id)) {
              // Only show this task if it's completed
              if (task.isCompleted(next, currentTime)) {
                nextTask = task
              }
              // Stop looking after finding the first non-notified task
              break
            }
          }

          if (nextTask) {
            currentlyShowingTaskRef.current = nextTask.id
            notifiedTasksRef.current.add(nextTask.id)
            setLastCompletedTask(nextTask)
            setShowTaskNotification(true)
          }
        }

        const allPhase5Complete = next.phase === 5 && phase5Tasks.every(t => notifiedTasksRef.current.has(t.id))

        // Phase completion is now handled in handleCloseModal when the final task closes
        // Just acknowledge the completion state but don't trigger modals here
        if (allPhase5Complete && !showGameCompletion) {
          // Final phase complete - this will be handled by handleCloseModal
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
    setState((prev: ActualState) => {
      const newState = {
        ...prev,
        pods: prev.pods.filter(p => p.id !== podId),
        nodes: prev.nodes.map(n => ({
          ...n,
          pods: n.pods.filter(id => id !== podId)
        }))
      }
      // In Phase 3, mark that a user deleted a pod (triggers reconcile mode)
      if (prev.phase === 3 && prev.controllerActive) {
        newState.podDeletedByUser = true
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
                <ActiveTaskPanel task={activeTask} />
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
        <TaskPanel task={lastCompletedTask} phase={state.phase} onClose={handleCloseModal} />
      )}

      {/* Phase Completion Modal */}
      {showPhaseCompletion && phaseCompletionTask && (
        <TaskPanel task={phaseCompletionTask} phase={state.phase} onClose={handleClosePhaseCompletion} isPhaseCompletion={true} />
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