
import { Member, Reducer, Training, TrainingEventMetadata } from "../types";

const name = 'training-test-assigned'

export type TrainingTestAssignedEventData = {
  trainingId: string,
  name: typeof name
  payload: {
    assignedBy: Member
  }
}

export type TrainingTestAssignedEvent = TrainingEventMetadata & TrainingTestAssignedEventData

const reducer: Reducer<TrainingTestAssignedEvent> = (
  training: Training | null,
  event: TrainingTestAssignedEvent
): Training => ({
  ...training,
  trainingId: event.trainingId,
  status: "AWAITING_TEST",
  test: {
    assignedAt: event.emittedAt,
    assignedBy: event.payload.assignedBy,
  }
})

const isEmitted = (training: Training | null) => !!training?.test

export const trainingTestAssigned = { name, reducer, isEmitted } as const

