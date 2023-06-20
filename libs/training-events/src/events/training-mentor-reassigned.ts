import { Member, Reducer, Training, TrainingEventMetadata } from "../types";

const name = 'training-mentor-reassigned'

export type TrainingMentorReassignedData = {
  name: typeof name
  trainingId: string
  payload: {
    mentor: Member
    assigned_by: Member
  }
}

export type TrainingMentorReassignedEvent = TrainingEventMetadata & TrainingMentorReassignedData

const reducer: Reducer<TrainingMentorReassignedEvent> = (
  training: Training | null,
  event: TrainingMentorReassignedEvent
): Training => ({
  ...training,
  trainingId: event.trainingId,
  status: 'IN_PROGRESS',
  mentor: {
    member: event.payload.mentor,
    assignedAt: event.emittedAt,
    assignedBy: event.payload.assigned_by,
  }
})

const isEmitted =
  (training: Training | null, event: TrainingMentorReassignedEvent) => training && training?.mentor?.member.id !== event.payload.mentor.id

export const trainingMentorReassigned = { name, reducer, isEmitted } as const

