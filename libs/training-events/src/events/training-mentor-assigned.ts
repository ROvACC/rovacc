import { Member, Reducer, Training, TrainingEventMetadata } from "../types";

const name = 'training-mentor-assigned'

export type TrainingMentorAssignedData = {
  name: typeof name
  trainingId: string
  payload: {
    mentor: Member
    assigned_by: Member
  }
}

export type TrainingMentorAssignedEvent = TrainingEventMetadata & TrainingMentorAssignedData

const reducer: Reducer<TrainingMentorAssignedEvent> = (
  training: Training | null,
  event: TrainingMentorAssignedEvent
): Training => ({
  ...training,
  trainingId: event.trainingId,
  status: 'STARTED',
  mentor: {
    member: event.payload.mentor,
    assignedAt: event.emittedAt,
    assignedBy: event.payload.assigned_by,
  }
})

const isEmitted = (training: Training | null) => !!training?.mentor

export const trainingMentorAssigned = { name, reducer, isEmitted } as const

