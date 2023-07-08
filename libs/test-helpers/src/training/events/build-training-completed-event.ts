import { TrainingCompletedEvent, TrainingCompletedEventData } from '@rovacc/training-events-types'

type Args = {
  trainingId: string,
  eventId?: string,
  emittedAt?: Date,
  override?: Partial<TrainingCompletedEventData['payload']>
}

export const buildTrainingCompletedEvent = (args: Args): TrainingCompletedEvent => ({
  trainingId: args.trainingId,
  name: 'training-completed',
  eventId: args.eventId ?? 'event-id',
  emittedAt: args.emittedAt ?? new Date(),
  system: 'rovacc-system-id',
  correlationId: 'correlationId',
  payload: {
    reason: 'completed',
    reasonDetailed: 'rating_upgraded',
    ...args.override
  }
})
