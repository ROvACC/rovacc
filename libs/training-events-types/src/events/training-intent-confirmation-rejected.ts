import { TrainingEventMetadata } from "../types";

const name = 'training-intent-confirmation-rejected';

export type TrainingIntentConfirmationRejectedEventData = {
  name: typeof name
  trainingId: string
  payload: Record<string, never>
}

export type TrainingIntentConfirmationRejectedEvent = TrainingEventMetadata & TrainingIntentConfirmationRejectedEventData

