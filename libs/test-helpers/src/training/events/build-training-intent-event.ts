import { TrainingIntentEvent } from '@rovacc/training-events-types'

type Args = {
  trainingId: string,
  eventId?: string,
  emittedAt?: Date,
  override?: Partial<TrainingIntentEvent>
}

export const buildTrainingIntentEvent = (args: Args): TrainingIntentEvent => ({
  trainingId: args.trainingId,
  name: 'training-intent',
  eventId: args.eventId ?? 'event-id',
  emittedAt: args.emittedAt ?? new Date(),
  system: 'rovacc-system-id',
  correlationId: 'correlationId',
  payload: {
    student: 123123123,
    rating: 2,
    purpose: 'acquire_rating',
    ...args.override
  }
})
