
import { Reducer, Training, TrainingEventMetadata } from "../types";

const name = 'training-intent-confirmation-responded';

export type TrainingIntentConfirmationRespondedEventData = {
  name: typeof name
  trainingId: string
  payload: Record<string, never>
}

export type TrainingIntentConfirmationRespondedEvent = TrainingEventMetadata & TrainingIntentConfirmationRespondedEventData

const reducer: Reducer<TrainingIntentConfirmationRespondedEvent> = (
  training: Training | null,
  event: TrainingIntentConfirmationRespondedEvent
): Training => ({
  ...training,
  status: 'QUEUED',
  trainingId: event.trainingId,
  intentConfirmation: {
    ...training?.intentConfirmation,
    respondedAt: event.emittedAt,

  }
})

const isEmitted =
  (training: Training | null) =>
    training && training?.intentConfirmation && training.intentConfirmation.respondedAt

export const trainingIntentConfirmationResponded = { name, reducer, isEmitted } as const

