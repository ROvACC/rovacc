
import { Member, TrainingEventMetadata } from "../types";

const name = 'training-solo-requested'

export type TrainingSoloRequestedEventData = {
  trainingId: string,
  name: typeof name
  payload: {
    requestedBy: Member
  }
}

export type TrainingSoloRequestedEvent = TrainingEventMetadata & TrainingSoloRequestedEventData

