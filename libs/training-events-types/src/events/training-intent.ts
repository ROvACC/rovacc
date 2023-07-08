
import { TrainingEventMetadata, TrainingPurpose } from "../types";

const name = 'training-intent';

export type TrainingIntentEventData = {
  trainingId: string,
  name: typeof name
  payload: {
    student: number
    rating: number
    purpose: TrainingPurpose
  }
}

export type TrainingIntentEvent = TrainingEventMetadata & TrainingIntentEventData

