import { TrainingTestCompletedEvent, TrainingTestCompletedEventData } from '@rovacc/training-events-types'

type Args = {
  trainingId: string,
  eventId?: string,
  emittedAt?: Date,
  override?: Partial<TrainingTestCompletedEventData['payload']>
}

export const buildTrainingTestCompletedEvent = (args: Args): TrainingTestCompletedEvent => ({
  trainingId: args.trainingId,
  name: 'training-test-completed',
  eventId: args.eventId ?? 'event-id',
  emittedAt: args.emittedAt ?? new Date(),
  system: 'rovacc-system-id',
  correlationId: 'correlationId',
  payload: {
    passed: true,
    report: {
      passed: true,
      result: 'passed',
      willExpireAt: new Date()
    },
    ...args.override
  }
})
