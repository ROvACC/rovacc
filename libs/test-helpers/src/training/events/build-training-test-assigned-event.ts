import { TrainingTestAssignedEvent, TrainingTestAssignedEventData } from '@rovacc/training-events-types'

type Args = {
  trainingId: string,
  eventId?: string,
  emittedAt?: Date,
  override?: Partial<TrainingTestAssignedEventData['payload']>
}

export const buildTrainingTestAssignedEvent = (args: Args): TrainingTestAssignedEvent => ({
  trainingId: args.trainingId,
  name: 'training-test-assigned',
  eventId: args.eventId ?? 'event-id',
  emittedAt: args.emittedAt ?? new Date(),
  system: 'rovacc-system-id',
  correlationId: 'correlationId',
  payload: {
    assignedBy: { id: 200200, name: 'Assigned By Name' },
    ...args.override
  }
})
