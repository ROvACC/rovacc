
import { Reducer, Training, TrainingEventMetadata } from "../types";

const name = 'training-intent-confirmation-requested';

export type TrainingIntentConfirmationRequestedData = {
  name: typeof name
  trainingId: string
  payload: Record<string, never>
}

export type TrainingIntentConfirmationRequestedEvent = TrainingEventMetadata & TrainingIntentConfirmationRequestedData

const reducer: Reducer<TrainingIntentConfirmationRequestedEvent> = (
  training: Training | null,
  event: TrainingIntentConfirmationRequestedEvent
): Training => ({
  ...training,
  status: 'QUEUED',
  trainingId: event.trainingId,
  intentConfirmation: {
    requestedAt: event.emittedAt,
  }
})

const isEmitted =
  (training: Training | null) =>
    training && training?.intentConfirmation && !!training.intentConfirmation.requestedAt

export const trainingIntentConfirmationRequested = { name, reducer, isEmitted } as const

