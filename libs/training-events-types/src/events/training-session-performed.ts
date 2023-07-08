import { Member, TrainingEventMetadata, TrainingReport } from "../types";

const name = 'training-session-performed'

export type TrainingSessionPerformedEventData = {
  name: typeof name
  trainingId: string
  payload: {
    sessionId: string
    mentor: Member,
    report: TrainingReport
  }
}

export type TrainingSessionPerformedEvent = TrainingEventMetadata & TrainingSessionPerformedEventData

