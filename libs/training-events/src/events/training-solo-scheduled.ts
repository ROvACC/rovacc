
import { Reducer, Training, TrainingEventMetadata } from "../types";

const name = 'training-solo-scheduled'

export type TrainingSoloScheduledEventData = {
  trainingId: string,
  name: typeof name
  payload: {
    scheduledAt: Date
  }
}

export type TrainingSoloScheduledEvent = TrainingEventMetadata & TrainingSoloScheduledEventData

const reducer: Reducer<TrainingSoloScheduledEvent> = (
  training: Training | null,
  event: TrainingSoloScheduledEvent
): Training => ({
  ...training,
  trainingId: event.trainingId,
  status: 'AWAITING_SOLO',
  solo: {
    ...training?.solo,
    scheduledAt: event.emittedAt,
  }
})

const isEmitted = (training: Training | null) => !!training?.solo && !!training?.solo.scheduledAt

export const trainingSoloScheduled = { name, reducer, isEmitted } as const

