import { TrainingCptPerformedEvent, TrainingCptPerformedEventData } from '@rovacc/training-events-types'

type Args = {
  trainingId: string,
  eventId?: string,
  emittedAt?: Date,
  override?: Partial<TrainingCptPerformedEventData['payload']>
}

export const buildTrainingCptPerformedEvent = (args: Args): TrainingCptPerformedEvent => ({
  trainingId: args.trainingId,
  name: 'training-cpt-performed',
  eventId: args.eventId ?? 'event-id',
  emittedAt: args.emittedAt ?? new Date(),
  system: 'rovacc-system-id',
  correlationId: 'correlationId',
  payload: {
    assessedBy: {
      id: 200200,
      name: 'member-name'
    },
    report: {
      purpose: "cpt_ots",
      workload: "light",
      complexity: "routine",
      traffic: "light",
      comments: 'Session went well'
    },
    passed: true,
    ...args.override
  }
})
