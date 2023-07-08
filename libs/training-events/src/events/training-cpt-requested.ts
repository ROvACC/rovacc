
import { Reducer, Training, TrainingCptRequestedEvent } from "@rovacc/training-events-types";

const name = 'training-cpt-requested'

const reducer: Reducer<TrainingCptRequestedEvent> = (
  training: Training | null,
  event: TrainingCptRequestedEvent
): Training => ({
  ...training,
  trainingId: event.trainingId,
  status: 'AWAITING_CPT',
  cpt: {
    ...training?.cpt,
    ...event.payload,
    requestedAt: event.emittedAt,
  }
})

const isEmitted = (training: Training | null) => !!training?.cpt && !!training?.cpt.requestedAt

export const trainingCptRequested = { name, reducer, isEmitted } as const

