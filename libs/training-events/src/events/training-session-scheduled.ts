import {
  Reducer,
  Training,
  TrainingSessionScheduledEvent,
} from '@rovacc/training-events-types';

const name = 'training-session-scheduled';

const reducer: Reducer<TrainingSessionScheduledEvent> = (
  training: Training | null,
  event: TrainingSessionScheduledEvent
): Training => ({
  ...training,
  trainingId: event.trainingId,
  status: 'IN_PROGRESS',
  sessions: {
    ...training?.sessions,
    [event.payload.sessionId]: {
      ...training?.sessions?.[event.payload.sessionId],
      scheduledAt: event.payload.scheduledAt,
    },
  },
});

const isEmitted = (
  training: Training | null,
  event: TrainingSessionScheduledEvent
) =>
  !!training?.sessions &&
  !!training.sessions[event.payload.sessionId] &&
  !!training.sessions[event.payload.sessionId].scheduledAt;

export const trainingSessionScheduled = { name, reducer, isEmitted } as const;
