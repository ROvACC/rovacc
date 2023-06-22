import { TrainingIntentConfirmationExpiredEvent, TrainingIntentConfirmationExpiredEventData } from '@rovacc/training-events-types'

type Args = {
  trainingId: string,
  eventId?: string,
  emittedAt?: Date,
  override?: Partial<TrainingIntentConfirmationExpiredEventData['payload']>
}

export const buildTrainingIntentConfirmationExpiredEvent =
  (args: Args): TrainingIntentConfirmationExpiredEvent => ({
    name: 'training-intent-confirmation-expired',
    trainingId: args.trainingId,
    eventId: args.eventId ?? 'event-id',
    emittedAt: args.emittedAt ?? new Date(),
    system: 'rovacc-system-id',
    correlationId: 'correlationId',
    payload: {},
  })
