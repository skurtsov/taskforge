export type JobStatus =
  | 'queued'
  | 'processing'
  | 'completed'
  | 'failed'

export interface Job {
  id: string
  type: string
  payload: unknown
  status: JobStatus

  attempts: number
  maxAttempts: number

  error?: string
  workerId?: string

  createdAt: string
  startedAt?: string
  completedAt?: string
}