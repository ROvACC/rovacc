import { TrainingIntentConfirmationRespondedEvent, TrainingIntentConfirmationRespondedEventData } from '@rovacc/training-events-types'

type Args = {
  trainingId: string,
  eventId?: string,
  emittedAt?: Date,
  override?: Partial<TrainingIntentConfirmationRespondedEventData['payload']>
}

export const buildTrainingIntentConfirmationRespondedEvent = (args: Args): TrainingIntentConfirmationRespondedEvent => ({
  trainingId: args.trainingId,
  name: 'training-intent-confirmation-responded',
  eventId: args.eventId ?? 'event-id',
  emittedAt: args.emittedAt ?? new Date(),
  system: 'rovacc-system-id',
  correlationId: 'correlationId',
  payload: {}
})
