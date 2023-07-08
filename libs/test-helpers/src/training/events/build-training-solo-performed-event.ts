import { TrainingSoloPerformedEvent, TrainingSoloPerformedEventData } from '@rovacc/training-events-types'

type Args = {
  trainingId: string,
  eventId?: string,
  emittedAt?: Date,
  override?: Partial<TrainingSoloPerformedEventData['payload']>
}

export const buildTrainingSoloPerformedEvent = (args: Args): TrainingSoloPerformedEvent => ({
  trainingId: args.trainingId,
  name: 'training-solo-performed',
  eventId: args.eventId ?? 'event-id',
  emittedAt: args.emittedAt ?? new Date(),
  system: 'rovacc-system-id',
  correlationId: 'correlationId',
  payload: {
    requestedBy: { id: 200000, name: 'Requested By Name' },
    passed: true,
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
