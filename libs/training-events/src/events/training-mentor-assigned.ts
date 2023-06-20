import {
  Member,
  Reducer,
  Training,
  TrainingMentorAssignedEvent,
} from '@rovacc/training-events-types';

const name = 'training-mentor-assigned';

const reducer: Reducer<TrainingMentorAssignedEvent> = (
  training: Training | null,
  event: TrainingMentorAssignedEvent
): Training => ({
  ...training,
  trainingId: event.trainingId,
  status: 'STARTED',
  mentor: {
    member: event.payload.mentor,
    assignedAt: event.emittedAt,
    assignedBy: event.payload.assignedBy,
  },
});

const isEmitted = (training: Training | null) => !!training?.mentor;

export const trainingMentorAssigned = { name, reducer, isEmitted } as const;
