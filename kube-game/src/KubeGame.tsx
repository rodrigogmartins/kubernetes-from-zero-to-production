'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

import { createInitialState } from './state/initialState'
import type { Task } from './tasks/types'
import { reconcile } from './engine/reconcile'
import { phase1Tasks } from './tasks/phase1Tasks'
import { ClusterView } from './ui/ClusterView'
import { ActiveTaskPanel } from './ui/ActiveTaskPanel'
import { Controls } from './ui/Controls'
import { TaskPanel } from './ui/TaskPanel'

export default function KubeGame() {
  const [state, setState] = useState(createInitialState())
  const [lastCompletedTask, setLastCompletedTask] = useState<Task | null>(null)
  const [showTaskNotification, setShowTaskNotification] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const notifiedTasksRef = useRef(new Set<string>())
  const isModalOpenRef = useRef(false)

  const handleCloseModal = useCallback(() => {
    setShowTaskNotification(false)
    isModalOpenRef.current = false
  }, [])

  useEffect(() => {
    console.log('[v0] Modal visibility changed:', showTaskNotification, 'Task:', lastCompletedTask?.id)
    if (showTaskNotification) {
      isModalOpenRef.current = true
    }
  }, [showTaskNotification, lastCompletedTask])

  useEffect(() => {
    const interval = setInterval(() => {
      setState((prev) => {
        const next = reconcile(prev)

        // Only show next task if modal is not currently open
        if (!isModalOpenRef.current) {
          const nextTask = phase1Tasks.find((task) => !notifiedTasksRef.current.has(task.id) && task.isCompleted(next))

          if (nextTask) {
            notifiedTasksRef.current.add(nextTask.id)
            setLastCompletedTask(nextTask)
            setShowTaskNotification(true)
          }
        }

        return next
      })
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

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
      nodes: prev.nodes.map((n) => (n.id === nodeId ? { ...n, status: 'Down', pods: [] } : n))
    }))
  }

  const activeTask = phase1Tasks.find((task) => !notifiedTasksRef.current.has(task.id))

  return (
    <div className="w-full h-full flex flex-col lg:flex-row gap-0 bg-background">
      {/* Main Game Area */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Compact Header for Mobile */}
        <div className="p-2 md:p-6 border-b border-border bg-card/50">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <h1 className="text-xl md:text-3xl font-bold bg-linear-to-r from-primary to-accent bg-clip-text text-transparent truncate">
                Kube Game
              </h1>
              <p className="text-xs md:text-sm text-muted-foreground hidden md:block">Learn Kubernetes fundamentals through gameplay</p>
            </div>
            <div className="flex items-center gap-2 px-2 md:px-3 py-1 md:py-2 bg-accent/10 rounded-lg border border-accent/20 whitespace-nowrap">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-xs md:text-sm font-semibold text-accent">Playing</span>
            </div>
          </div>
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
                <Controls addPod={addPod} killNode={killNode} activeTaskId={activeTask?.id} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Task Completion Notification */}
      {showTaskNotification && lastCompletedTask && (
        <TaskPanel task={lastCompletedTask} onClose={handleCloseModal} />
      )}
    </div>
  )
}