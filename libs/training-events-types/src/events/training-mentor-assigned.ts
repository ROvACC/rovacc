import { Member, TrainingEventMetadata } from "../types";

const name = 'training-mentor-assigned'

export type TrainingMentorAssignedEventData = {
  name: typeof name
  trainingId: string
  payload: {
    mentor: Member
    assignedBy: Member
  }
}

export type TrainingMentorAssignedEvent = TrainingEventMetadata & TrainingMentorAssignedEventData

