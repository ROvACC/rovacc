import { Reducer, TestResult, Training, TrainingEventMetadata } from "../types";

const name = 'training-test-completed'

export type TrainingTestCompletedEventData = {
  trainingId: string,
  name: typeof name
  payload: {
    passed: boolean
    result: TestResult
    willExpireAt?: Date
  }
}

export type TrainingTestCompletedEvent = TrainingEventMetadata & TrainingTestCompletedEventData

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

