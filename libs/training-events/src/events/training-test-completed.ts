import { Reducer, Training, TrainingTestCompletedEvent } from "@rovacc/training-events-types";

const name = 'training-test-completed'

const reducer: Reducer<TrainingTestCompletedEvent> = (
  training: Training | null,
  event: TrainingTestCompletedEvent
): Training => ({
  ...training,
  trainingId: event.trainingId,
  status: event.payload.passed ? "IN_PROGRESS" : "AWAITING_TEST",
  test: {
    ...training?.test,
    completedAt: event.emittedAt,
    result: event.payload.result,
    willExpireAt: event.payload.willExpireAt
  }
})

const isEmitted = (training: Training | null) => !!training?.test && !!training?.test?.completedAt

export const trainingTestCompleted = { name, reducer, isEmitted } as const

