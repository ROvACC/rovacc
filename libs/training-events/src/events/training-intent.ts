
import { Reducer, Training, TrainingIntentEvent } from "@rovacc/training-events-types";

const name = 'training-intent';

const reducer: Reducer<TrainingIntentEvent> = (
  training: Training | null,
  event: TrainingIntentEvent
): Training => ({
  ...training,
  trainingId: event.trainingId,
  status: 'QUEUED',
  purpose: event.payload.purpose,
  rating: event.payload.rating,
  student: event.payload.student,
  requestedAt: event.emittedAt,
})

const isEmitted = (training: Training | null) => !!training?.student

export const trainingIntent = { name, reducer, isEmitted } as const

