import { TrainingCptRequestedEvent } from '@rovacc/training-events-types'

type Args = {
  trainingId: string,
  eventId?: string,
  emittedAt?: Date,
  override?: Partial<TrainingCptRequestedEvent['payload']>
}

export const buildTrainingCptRequestedEvent = (args: Args): TrainingCptRequestedEvent => ({
  trainingId: args.trainingId,
  name: 'training-cpt-requested',
  eventId: args.eventId ?? 'event-id',
  emittedAt: args.emittedAt ?? new Date(),
  system: 'rovacc-system-id',
  correlationId: 'correlationId',
  payload: {
    requestedBy: { id: 123123, name: 'Requested By Name' },
    ...args.override
  }
})
