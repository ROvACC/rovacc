import { TrainingIntentConfirmationRequestedEvent, TrainingIntentConfirmationRequestedEventData } from '@rovacc/training-events-types'

type Args = {
  trainingId: string,
  eventId?: string,
  emittedAt?: Date,
  override?: Partial<TrainingIntentConfirmationRequestedEventData['payload']>
}

export const buildTrainingIntentConfirmationRequestedEvent = (args: Args): TrainingIntentConfirmationRequestedEvent => ({
  trainingId: args.trainingId,
  name: 'training-intent-confirmation-requested',
  eventId: args.eventId ?? 'event-id',
  emittedAt: args.emittedAt ?? new Date(),
  system: 'rovacc-system-id',
  correlationId: 'correlationId',
  payload: {}
})
