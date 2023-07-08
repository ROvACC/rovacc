
import { Member, TrainingEventMetadata } from "../types";

const name = 'training-test-assigned'

export type TrainingTestAssignedEventData = {
  trainingId: string,
  name: typeof name
  payload: {
    assignedBy: Member
  }
}

export type TrainingTestAssignedEvent = TrainingEventMetadata & TrainingTestAssignedEventData

