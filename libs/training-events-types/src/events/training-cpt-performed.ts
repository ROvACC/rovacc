
import { Member, TrainingEventMetadata, TrainingReport } from "../types";

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

