import { TrainingEventMetadata } from "../types";

const name = 'training-session-scheduled'

export type TrainingSessionScheduledEventData = {
  name: typeof name
  trainingId: string
  payload: {
    sessionId: string
    scheduledAt: Date
  }
}

export type TrainingSessionScheduledEvent = TrainingEventMetadata & TrainingSessionScheduledEventData

