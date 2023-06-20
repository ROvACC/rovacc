import { Reducer, Training, TrainingEventMetadata } from "../types";

const name = 'training-session-scheduled'

export type TrainingSessionScheduledData = {
  name: typeof name
  trainingId: string
  payload: {
    sessionId: string
    scheduledAt: Date
  }
}

export type TrainingSessionScheduledEvent = TrainingEventMetadata & TrainingSessionScheduledData

const reducer: Reducer<TrainingSessionScheduledEvent> = (
  training: Training | null,
  event: TrainingSessionScheduledEvent
): Training => ({
  ...training,
  trainingId: event.trainingId,
  status: 'IN_PROGRESS',
  sessions: {
    ...training?.sessions,
    [event.payload.sessionId]: {
      ...training?.sessions?.[event.payload.sessionId],
      scheduledAt: event.payload.scheduledAt,
    }
  }
})

const isEmitted =
  (training: Training | null, event: TrainingSessionScheduledEvent) =>
    !!training?.sessions && !!training.sessions[event.payload.sessionId] && !!training.sessions[event.payload.sessionId].scheduledAt

export const trainingSessionScheduled = { name, reducer, isEmitted } as const

