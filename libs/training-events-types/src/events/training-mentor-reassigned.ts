import { Member, TrainingEventMetadata } from "../types";

const name = 'training-mentor-reassigned'

export type TrainingMentorReassignedEventData = {
  name: typeof name
  trainingId: string
  payload: {
    mentor: Member
    assignedBy: Member
  }
}

export type TrainingMentorReassignedEvent = TrainingEventMetadata & TrainingMentorReassignedEventData

