
import { TrainingEventMetadata } from "../types";

const name = 'training-intent-confirmation-responded';

export type TrainingIntentConfirmationRespondedEventData = {
  name: typeof name
  trainingId: string
  payload: Record<string, never>
}

export type TrainingIntentConfirmationRespondedEvent = TrainingEventMetadata & TrainingIntentConfirmationRespondedEventData

