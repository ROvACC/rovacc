
import { OutcomeReason, OutcomeReasonDetailed, TrainingEventMetadata } from "../types";

const name = 'training-completed'

export type TrainingCompletedEventData = {
  trainingId: string,
  name: typeof name
  payload: {
    reason: OutcomeReason
    reasonDetailed: OutcomeReasonDetailed
  }
}

export type TrainingCompletedEvent = TrainingEventMetadata & TrainingCompletedEventData

