
import { Reducer, Training, TrainingEventMetadata } from "../types";

const name = 'training-intent-confirmation-expired';

export type TrainingIntentConfirmationExpiredEventData = {
  name: typeof name
  trainingId: string
  payload: Record<string, never>
}

export type TrainingIntentConfirmationExpiredEvent = TrainingEventMetadata & TrainingIntentConfirmationExpiredEventData

const reducer: Reducer<TrainingIntentConfirmationExpiredEvent> = (
  training: Training | null,
  event: TrainingIntentConfirmationExpiredEvent
): Training => ({
  ...training,
  status: 'QUEUED',
  trainingId: event.trainingId,
  intentConfirmation: {
    ...training?.intentConfirmation,
    expiredAt: event.emittedAt,
  }
})

const isEmitted =
  (training: Training | null) =>
    training && training?.intentConfirmation && !!training.intentConfirmation.expiredAt

export const trainingIntentConfirmationExpired = { name, reducer, isEmitted } as const

