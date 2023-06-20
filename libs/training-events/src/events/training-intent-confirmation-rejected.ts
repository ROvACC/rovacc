import { Reducer, Training, TrainingEventMetadata } from "../types";

const name = 'training-intent-confirmation-rejected';

export type TrainingIntentConfirmationRejectedEventData = {
  name: typeof name
  trainingId: string
  payload: Record<string, never>
}

export type TrainingIntentConfirmationRejectedEvent = TrainingEventMetadata & TrainingIntentConfirmationRejectedEventData

const reducer: Reducer<TrainingIntentConfirmationRejectedEvent> = (
  training: Training | null,
  event: TrainingIntentConfirmationRejectedEvent
): Training => ({
  ...training,
  status: 'QUEUED',
  trainingId: event.trainingId,
  intentConfirmation: {
    ...training?.intentConfirmation,
    rejectedAt: event.emittedAt,
  }
})

const isEmitted =
  (training: Training | null) =>
    training && training?.intentConfirmation && training.intentConfirmation.rejectedAt

export const trainingIntentConfirmationRejected = { name, reducer, isEmitted } as const

