import { TrainingSoloScheduledEvent, TrainingSoloScheduledEventData } from '@rovacc/training-events-types'

type Args = {
  trainingId: string,
  eventId?: string,
  emittedAt?: Date,
  override?: Partial<TrainingSoloScheduledEventData['payload']>
}

export const buildTrainingSoloScheduledEvent = (args: Args): TrainingSoloScheduledEvent => ({
  trainingId: args.trainingId,
  name: 'training-solo-scheduled',
  eventId: args.eventId ?? 'event-id',
  emittedAt: args.emittedAt ?? new Date(),
  system: 'rovacc-system-id',
  correlationId: 'correlationId',
  payload: {
    scheduledAt: new Date(),
    ...args.override
  }
})
