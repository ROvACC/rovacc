import { TrainingMentorReassignedEvent, TrainingMentorReassignedEventData } from '@rovacc/training-events-types'

type Args = {
  trainingId: string,
  eventId?: string,
  emittedAt?: Date,
  override?: Partial<TrainingMentorReassignedEventData['payload']>
}

export const buildTrainingMentorReassignedEvent = (args: Args): TrainingMentorReassignedEvent => ({
  trainingId: args.trainingId,
  name: 'training-mentor-reassigned',
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
