
import { Member, Reducer, Training, TrainingEventMetadata, TrainingReport } from "../types";

const name = 'training-solo-performed'

export type TrainingSoloPerformedEventData = {
  trainingId: string,
  name: typeof name
  payload: {
    requestedBy: Member
    passed: boolean
    report: TrainingReport
  }
}

export type TrainingSoloPerformedEvent = TrainingEventMetadata & TrainingSoloPerformedEventData

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

