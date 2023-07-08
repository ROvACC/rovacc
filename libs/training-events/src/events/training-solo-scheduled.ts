
import { Reducer, Training, TrainingSoloScheduledEvent } from "@rovacc/training-events-types";

const name = 'training-solo-scheduled'

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

