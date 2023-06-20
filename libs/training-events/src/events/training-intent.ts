
import { Reducer, Training, TrainingEventMetadata, TrainingPurpose } from "../types";

const name = 'training-intent';

export type TrainingIntentEventData = {
  trainingId: string,
  name: typeof name
  payload: {
    student: number
    rating: number
    purpose: TrainingPurpose
  }
}

export type TrainingIntentEvent = TrainingEventMetadata & TrainingIntentEventData

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

