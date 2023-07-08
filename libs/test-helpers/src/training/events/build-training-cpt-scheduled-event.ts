import { TrainingCptScheduledEvent } from '@rovacc/training-events-types'

type Args = {
  trainingId: string,
  eventId?: string,
  emittedAt?: Date,
  override?: Partial<TrainingCptScheduledEvent['payload']>
}

export const buildTrainingCptScheduledEvent = (args: Args): TrainingCptScheduledEvent => ({
  trainingId: args.trainingId,
  name: 'training-cpt-scheduled',
  eventId: args.eventId ?? 'event-id',
  emittedAt: args.emittedAt ?? new Date(),
  system: 'rovacc-system-id',
  correlationId: 'correlationId',
  payload: {
    scheduledAt: new Date(),
    ...args.override
  }
})
