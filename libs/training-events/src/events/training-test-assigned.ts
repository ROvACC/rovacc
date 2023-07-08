
import { Reducer, Training, TrainingTestAssignedEvent } from "@rovacc/training-events-types";

const name = 'training-test-assigned'

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

