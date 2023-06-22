import { TrainingSessionPerformedEvent, TrainingSessionPerformedEventData } from '@rovacc/training-events-types'

type Args = {
  trainingId: string,
  eventId?: string,
  emittedAt?: Date,
  override?: Partial<TrainingSessionPerformedEventData['payload']>
}

export const buildTrainingSessionPerformedEvent = (args: Args): TrainingSessionPerformedEvent => ({
  trainingId: args.trainingId,
  name: 'training-session-performed',
  eventId: args.eventId ?? 'event-id',
  emittedAt: args.emittedAt ?? new Date(),
  system: 'rovacc-system-id',
  correlationId: 'correlationId',
  payload: {
    sessionId: 'session-id',
    mentor: { id: 200000, name: 'Mentor Name' },
    report: {
      purpose: "cpt_ots",
      workload: "light",
      complexity: "routine",
      traffic: "light",
      comments: 'Session went well'
    },
    ...args.override
  }
})
