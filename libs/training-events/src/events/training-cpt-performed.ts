
import { Reducer, Training, TrainingCptPerformedEvent } from "@rovacc/training-events-types";

const name = 'training-cpt-performed'

const reducer: Reducer<TrainingCptPerformedEvent> = (
  training: Training | null,
  event: TrainingCptPerformedEvent
): Training => ({
  ...training,
  trainingId: event.trainingId,
  status: event.payload.passed ? 'COMPLETED' : 'AWAITING_CPT',
  cpt: {
    ...training?.cpt,
    ...event.payload
  }
})

const isEmitted = (training: Training | null) => !!training?.cpt && !!training?.cpt.assessedBy

export const trainingCptPerformed = { name, reducer, isEmitted } as const

