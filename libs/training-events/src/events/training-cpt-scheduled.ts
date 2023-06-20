
import { Reducer, Training, TrainingEventMetadata } from "../types";

const name = 'training-cpt-scheduled'

export type TrainingCptScheduledEventData = {
  trainingId: string,
  name: typeof name
  payload: {
    scheduledAt: Date
  }
}

export type TrainingCptScheduledEvent = TrainingEventMetadata & TrainingCptScheduledEventData

const reducer: Reducer<TrainingCptScheduledEvent> = (
  training: Training | null,
  event: TrainingCptScheduledEvent
): Training => ({
  ...training,
  trainingId: event.trainingId,
  status: 'AWAITING_CPT',
  cpt: {
    ...training?.cpt,
    scheduledAt: event.payload.scheduledAt
  }
})

const isEmitted = (training: Training | null) => !!training?.cpt && !!training?.cpt.scheduledAt

export const trainingCptScheduled = { name, reducer, isEmitted } as const

