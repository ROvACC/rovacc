
import { TrainingEventMetadata } from "../types";

const name = 'training-solo-scheduled'

export type TrainingSoloScheduledEventData = {
  trainingId: string,
  name: typeof name
  payload: {
    scheduledAt: Date
  }
}

export type TrainingSoloScheduledEvent = TrainingEventMetadata & TrainingSoloScheduledEventData

