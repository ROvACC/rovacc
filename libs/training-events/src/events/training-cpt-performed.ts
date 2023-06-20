
import { Member, Reducer, Training, TrainingEventMetadata, TrainingReport } from "../types";

const name = 'training-cpt-performed'

export type TrainingCptPerformedEventData = {
  trainingId: string,
  name: typeof name
  payload: {
    assessedBy: Member
    report: TrainingReport
    passed: boolean
  }
}

export type TrainingCptPerformedEvent = TrainingEventMetadata & TrainingCptPerformedEventData

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

