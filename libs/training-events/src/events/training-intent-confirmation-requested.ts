import {
  Reducer,
  Training,
  TrainingIntentConfirmationRequestedEvent,
} from '@rovacc/training-events-types';

const name = 'training-intent-confirmation-requested';

const reducer: Reducer<TrainingIntentConfirmationRequestedEvent> = (
  training: Training | null,
  event: TrainingIntentConfirmationRequestedEvent
): Training => ({
  ...training,
  status: 'QUEUED',
  trainingId: event.trainingId,
  intentConfirmation: {
    requestedAt: event.emittedAt,
  },
});

const isEmitted = (training: Training | null) =>
  training &&
  training?.intentConfirmation &&
  !!training.intentConfirmation.requestedAt;

export const trainingIntentConfirmationRequested = {
  name,
  reducer,
  isEmitted,
} as const;
