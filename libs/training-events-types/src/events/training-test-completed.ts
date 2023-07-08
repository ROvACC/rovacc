import { TestResult, TrainingEventMetadata } from "../types";

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

