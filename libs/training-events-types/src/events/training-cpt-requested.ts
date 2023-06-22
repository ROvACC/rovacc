
import { Member, TrainingEventMetadata } from "../types";

const name = 'training-cpt-requested'

export type TrainingCptRequestedEventData = {
  trainingId: string,
  name: typeof name
  payload: {
    requestedBy: Member
  }
}

export type TrainingCptRequestedEvent = TrainingEventMetadata & TrainingCptRequestedEventData

