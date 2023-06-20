import {
  Reducer,
  Training,
  TrainingSessionPerformedEvent,
} from '@rovacc/training-events-types';

const name = 'training-session-performed';

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
    },
  },
});

const isEmitted = (
  training: Training | null,
  event: TrainingSessionPerformedEvent
) =>
  !!training?.sessions &&
  !!training.sessions[event.payload.sessionId] &&
  !!training.sessions[event.payload.sessionId].report;

export const trainingSessionPerformed = { name, reducer, isEmitted } as const;
