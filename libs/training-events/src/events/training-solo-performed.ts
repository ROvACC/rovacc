
import { Reducer, Training, TrainingSoloPerformedEvent } from "@rovacc/training-events-types";

const name = 'training-solo-performed'

const reducer: Reducer<TrainingSoloPerformedEvent> = (
  training: Training | null,
  event: TrainingSoloPerformedEvent
): Training => ({
  ...training,
  trainingId: event.trainingId,
  status: event.payload.passed ? 'SOLO' : 'AWAITING_SOLO',
  solo: {
    ...training?.solo,
    ...event.payload,
  }
})

const isEmitted = (training: Training | null) => !!training?.solo && !!training?.solo.performedBy

export const trainingSoloPerformed = { name, reducer, isEmitted } as const

