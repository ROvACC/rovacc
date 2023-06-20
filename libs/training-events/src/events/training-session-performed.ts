import { Member, Reducer, Training, TrainingEventMetadata, TrainingReport } from "../types";

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

const reducer: Reducer<TrainingSessionPerformedEvent> = (
  training: Training | null,
  event: TrainingSessionPerformedEvent
): Training => ({
  ...training,
  trainingId: event.trainingId,
  status: 'IN_PROGRESS',
  sessions: {
    ...training?.sessions,
    [event.payload.sessionId]: {
      ...training?.sessions?.[event.payload.sessionId],
      mentor: event.payload.mentor,
      report: event.payload.report,
    }
  }
})

const isEmitted =
  (training: Training | null, event: TrainingSessionPerformedEvent) =>
    !!training?.sessions && !!training.sessions[event.payload.sessionId] && !!training.sessions[event.payload.sessionId].report

export const trainingSessionPerformed = { name, reducer, isEmitted } as const

