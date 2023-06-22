import { Member, Reducer, Training, TrainingMentorReassignedEvent } from "@rovacc/training-events-types";

const name = 'training-mentor-reassigned'

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
    assignedBy: event.payload.assignedBy,
  }
})

const isEmitted =
  (training: Training | null, event: TrainingMentorReassignedEvent) => training && training?.mentor?.member.id !== event.payload.mentor.id

export const trainingMentorReassigned = { name, reducer, isEmitted } as const

