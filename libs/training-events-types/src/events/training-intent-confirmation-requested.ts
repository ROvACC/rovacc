
import { TrainingEventMetadata } from "../types";

const name = 'training-intent-confirmation-requested';

export type TrainingIntentConfirmationRequestedEventData = {
  name: typeof name
  trainingId: string
  payload: Record<string, never>
}

export type TrainingIntentConfirmationRequestedEvent = TrainingEventMetadata & TrainingIntentConfirmationRequestedEventData

