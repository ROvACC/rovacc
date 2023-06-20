
import { OutcomeReason, OutcomeReasonDetailed, Reducer, Training, TrainingEventMetadata } from "../types";

const name = 'training-completed'

export type TrainingCompletedEventData = {
  trainingId: string,
  name: typeof name
  payload: {
    reason: OutcomeReason
    reasonDetailed: OutcomeReasonDetailed
  }
}

export type TrainingCompletedEvent = TrainingEventMetadata & TrainingCompletedEventData

const reducer: Reducer<TrainingCompletedEvent> = (
  training: Training | null,
  event: TrainingCompletedEvent
): Training => ({
  ...training,
  trainingId: event.trainingId,
  status: event.payload.reason === 'completed' ? 'COMPLETED' : 'TERMINATED',
  ...event.payload,
  completedAt: event.emittedAt,
})

const isEmitted = (training: Training | null) => !!training?.completedAt

export const trainingCompleted = { name, reducer, isEmitted } as const

