
import { Member, TrainingEventMetadata, TrainingReport } from "../types";

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

