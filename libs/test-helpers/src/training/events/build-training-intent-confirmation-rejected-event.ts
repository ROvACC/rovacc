import { TrainingIntentConfirmationRejectedEvent, TrainingIntentConfirmationRejectedEventData } from '@rovacc/training-events-types'

type Args = {
  trainingId: string,
  eventId?: string,
  emittedAt?: Date,
  override?: Partial<TrainingIntentConfirmationRejectedEventData['payload']>
}

export const buildTrainingIntentConfirmationRejectedEvent =
  (args: Args): TrainingIntentConfirmationRejectedEvent => ({
    name: 'training-intent-confirmation-rejected',
    trainingId: args.trainingId,
    eventId: args.eventId ?? 'event-id',
    emittedAt: args.emittedAt ?? new Date(),
    system: 'rovacc-system-id',
    correlationId: 'correlationId',
    payload: {},
  })
