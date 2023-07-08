import { TrainingSessionScheduledEvent, TrainingSessionScheduledEventData } from '@rovacc/training-events-types'

type Args = {
  trainingId: string,
  eventId?: string,
  emittedAt?: Date,
  override?: Partial<TrainingSessionScheduledEventData['payload']>
}

export const buildTrainingSessionScheduledEvent = (args: Args): TrainingSessionScheduledEvent => ({
  trainingId: args.trainingId,
  name: 'training-session-scheduled',
  eventId: args.eventId ?? 'event-id',
  emittedAt: args.emittedAt ?? new Date(),
  system: 'rovacc-system-id',
  correlationId: 'correlationId',
  payload: {
    sessionId: 'session-id',
    scheduledAt: new Date(),
    ...args.override
  }
})
