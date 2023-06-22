import { IsEmitted, Reducer, Training, TrainingEvent } from "../types";
import { trainingCompleted } from "./training-completed";
import { trainingCptPerformed } from "./training-cpt-performed";
import { trainingCptRequested } from "./training-cpt-requested";
import { trainingCptScheduled } from "./training-cpt-scheduled";
import { trainingIntent } from "./training-intent";
import { trainingIntentConfirmationExpired } from "./training-intent-confirmation-expired";
import { trainingIntentConfirmationRejected } from "./training-intent-confirmation-rejected";
import { trainingIntentConfirmationRequested } from "./training-intent-confirmation-requested";
import { trainingIntentConfirmationResponded } from "./training-intent-confirmation-responded";
import { trainingMentorAssigned } from "./training-mentor-assigned";
import { trainingMentorReassigned } from "./training-mentor-reassigned";
import { trainingSessionPerformed } from "./training-session-performed";
import { trainingSessionScheduled } from "./training-session-scheduled";
import { trainingSoloPerformed } from "./training-solo-performed";
import { trainingSoloRequested } from "./training-solo-requested";
import { trainingSoloScheduled } from "./training-solo-scheduled";
import { trainingTestAssigned } from "./training-test-assigned";
import { trainingTestCompleted } from "./training-test-completed";

const events = [
  trainingCompleted,
  trainingCptPerformed,
  trainingCptRequested,
  trainingCptScheduled,
  trainingIntent,
  trainingIntentConfirmationExpired,
  trainingIntentConfirmationRejected,
  trainingIntentConfirmationRequested,
  trainingIntentConfirmationResponded,
  trainingMentorAssigned,
  trainingMentorReassigned,
  trainingSessionPerformed,
  trainingSessionScheduled,
  trainingSoloPerformed,
  trainingSoloRequested,
  trainingSoloScheduled,
  trainingTestAssigned,
  trainingTestCompleted,
] as const

type Names = typeof events[number]['name']

export const { reducer, isEmitted } = events.reduce(
  (acc, event) => ({
    reducer: { ...acc.reducer, [event.name]: event.reducer },
    isEmitted: { ...acc.isEmitted, [event.name]: event.isEmitted }
  }), { reducer: {} as Record<Names, Reducer>, isEmitted: {} as Record<Names, IsEmitted> })

export const reduceEvent = (training: Training | null, event: TrainingEvent): Training | null => {
  if (!reducer[event.name]) {
    console.log('Event not found', event)
    return training
  } else {
    return !isEmitted[event.name](training, event)
      ? reducer[event.name](training, event)
      : training
  }
}

