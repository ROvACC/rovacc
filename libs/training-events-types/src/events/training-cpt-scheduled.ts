
import { TrainingEventMetadata } from "../types";

const name = 'training-cpt-scheduled'

export type TrainingCptScheduledEventData = {
  trainingId: string,
  name: typeof name
  payload: {
    scheduledAt: Date
  }
}

export type TrainingCptScheduledEvent = TrainingEventMetadata & TrainingCptScheduledEventData

