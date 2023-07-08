
import { TrainingEventMetadata } from "../types";

const name = 'training-intent-confirmation-expired';

export type TrainingIntentConfirmationExpiredEventData = {
  name: typeof name
  trainingId: string
  payload: Record<string, never>
}

export type TrainingIntentConfirmationExpiredEvent = TrainingEventMetadata & TrainingIntentConfirmationExpiredEventData

