
import { TrainingCompletedEvent, Reducer, Training } from "@rovacc/training-events-types";

const name = 'training-completed'

const reducer: Reducer<TrainingCompletedEvent> = (
  training: Training | null,
  event: TrainingCompletedEvent
): Training => ({
  ...training,
  trainingId: event.trainingId,
  status: event.payload.reason === 'completed' ? 'COMPLETED' : 'TERMINATED',
  ...event.payload,
  completedAt: event.emittedAt,
})

const isEmitted = (training: Training | null) => !!training?.completedAt

export const trainingCompleted = { name, reducer, isEmitted } as const

