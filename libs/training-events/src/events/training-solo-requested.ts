
import { Member, Reducer, Training, TrainingEventMetadata } from "../types";

const name = 'training-solo-requested'

export type TrainingSoloRequestedEventData = {
  trainingId: string,
  name: typeof name
  payload: {
    requestedBy: Member
  }
}

export type TrainingSoloRequestedEvent = TrainingEventMetadata & TrainingSoloRequestedEventData

const reducer: Reducer<TrainingSoloRequestedEvent> = (
  training: Training | null,
  event: TrainingSoloRequestedEvent
): Training => ({
  ...training,
  trainingId: event.trainingId,
  status: 'AWAITING_SOLO',
  solo: {
    ...training?.solo,
    requestedAt: event.emittedAt,
    requestedBy: event.payload.requestedBy
  }
})

const isEmitted = (training: Training | null) => !!training?.solo && !!training?.solo.requestedAt

export const trainingSoloRequested = { name, reducer, isEmitted } as const

