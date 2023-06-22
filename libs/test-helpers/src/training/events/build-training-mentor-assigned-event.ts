import { TrainingMentorAssignedEvent, TrainingMentorAssignedEventData } from '@rovacc/training-events-types'

type Args = {
  trainingId: string,
  eventId?: string,
  emittedAt?: Date,
  override?: Partial<TrainingMentorAssignedEventData['payload']>
}

export const buildTrainingMentorAssignedEvent = (args: Args): TrainingMentorAssignedEvent => ({
  trainingId: args.trainingId,
  name: 'training-mentor-assigned',
  eventId: args.eventId ?? 'event-id',
  emittedAt: args.emittedAt ?? new Date(),
  system: 'rovacc-system-id',
  correlationId: 'correlationId',
  payload: {
    mentor: { id: 200000, name: 'Mentor Name' },
    assignedBy: { id: 200200, name: 'Assigned By Name' },
    ...args.override
  }
})
