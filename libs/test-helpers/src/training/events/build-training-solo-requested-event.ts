import { TrainingSoloRequestedEvent, TrainingSoloRequestedEventData } from '@rovacc/training-events-types'

type Args = {
  trainingId: string,
  eventId?: string,
  emittedAt?: Date,
  override?: Partial<TrainingSoloRequestedEventData['payload']>
}

export const buildTrainingSoloRequestedEvent = (args: Args): TrainingSoloRequestedEvent => ({
  trainingId: args.trainingId,
  name: 'training-solo-requested',
  eventId: args.eventId ?? 'event-id',
  emittedAt: args.emittedAt ?? new Date(),
  system: 'rovacc-system-id',
  correlationId: 'correlationId',
  payload: {
    requestedBy: { id: 200000, name: 'Requested By Name' },
    ...args.override
  }
})
