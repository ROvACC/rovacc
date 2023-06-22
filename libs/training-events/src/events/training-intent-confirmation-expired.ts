
import { Reducer, Training, TrainingIntentConfirmationExpiredEvent } from "@rovacc/training-events-types";

const name = 'training-intent-confirmation-expired';

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

