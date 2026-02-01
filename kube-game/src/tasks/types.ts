import type { ActualState } from '../state/types'

export type Task = {
  id: string
  title: string
  description: string
  isCompleted: (state: ActualState, currentTime: number) => boolean
  summary: string
}
