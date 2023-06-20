
import { TrainingCompletedEvent } from "./events/training-completed"
import { TrainingCptPerformedEvent } from "./events/training-cpt-performed"
import { TrainingCptRequestedEvent } from "./events/training-cpt-requested"
import { TrainingCptScheduledEvent } from "./events/training-cpt-scheduled"
import { TrainingIntentEvent } from "./events/training-intent"
import { TrainingIntentConfirmationExpiredEvent } from "./events/training-intent-confirmation-expired"
import { TrainingIntentConfirmationRejectedEvent } from "./events/training-intent-confirmation-rejected"
import { TrainingIntentConfirmationRequestedEvent } from "./events/training-intent-confirmation-requested"
import { TrainingIntentConfirmationRespondedEvent } from "./events/training-intent-confirmation-responded"
import { TrainingMentorAssignedEvent } from "./events/training-mentor-assigned"
import { TrainingMentorReassignedEvent } from "./events/training-mentor-reassigned"
import { TrainingSessionPerformedEvent } from "./events/training-session-performed"
import { TrainingSessionScheduledEvent } from "./events/training-session-scheduled"
import { TrainingSoloPerformedEvent } from "./events/training-solo-performed"
import { TrainingSoloRequestedEvent } from "./events/training-solo-requested"
import { TrainingSoloScheduledEvent } from "./events/training-solo-scheduled"
import { TrainingTestAssignedEvent } from "./events/training-test-assigned"
import { TrainingTestCompletedEvent } from "./events/training-test-completed"

export type TrainingEvent =
  | TrainingCompletedEvent
  | TrainingCptPerformedEvent
  | TrainingCptScheduledEvent
  | TrainingIntentConfirmationExpiredEvent
  | TrainingIntentConfirmationRejectedEvent
  | TrainingIntentConfirmationRequestedEvent
  | TrainingIntentConfirmationRespondedEvent
  | TrainingIntentEvent
  | TrainingMentorAssignedEvent
  | TrainingMentorReassignedEvent
  | TrainingSessionPerformedEvent
  | TrainingSessionScheduledEvent
  | TrainingSoloPerformedEvent
  | TrainingSoloRequestedEvent
  | TrainingSoloScheduledEvent
  | TrainingTestAssignedEvent
  | TrainingTestCompletedEvent
  | TrainingCptRequestedEvent

export type Member = {
  id: number
  name: string
}

export type TrainingStatus =
  | "QUEUED"
  | "STARTED"
  | "AWAITING_TEST"
  | "IN_PROGRESS"
  | "AWAITING_SOLO"
  | "SOLO"
  | "AWAITING_CPT"
  | "COMPLETED"
  | "TERMINATED"



export type TrainingPurpose = "acquire_rating" | "revalidate_rating" | "visiting"
export type TestResult = "passed" | "failed"
export type TrainingReport = {
  purpose: "cpt_ots" | "revalidation" | "training" | "sim_session"
  workload: "light" | 'moderate' | 'heavy'
  complexity: "routine" | "occasionally_difficult" | "mostly_difficult" | "very_difficult"
  traffic: "light" | "medium" | "heavy"
  comments: string
}

export type TrainingSessions = {
  scheduledAt?: Date
  mentor?: Member,
  report?: TrainingReport
}

export type OutcomeReason =
  | "completed"
  | "terminated"

export type OutcomeReasonDetailed =
  | "rating_upgraded"
  | "student_did_not_confirm_intent"
  | "student_cancelled_training"
  | "atsimtest_expired"

export type Training = {
  trainingId: string
  status: TrainingStatus,
  requestedAt?: Date
  student?: number
  rating?: number
  purpose?: TrainingPurpose
  mentor?: {
    member: Member
    assignedBy: Member
    assignedAt: Date
  }
  intentConfirmation?: {
    requestedAt?: Date
    respondedAt?: Date
    rejectedAt?: Date
    expiredAt?: Date
  }
  test?: {
    assignedAt?: Date
    assignedBy?: Member
    completedAt?: Date
    result?: TestResult
    willExpireAt?: Date
    passed?: boolean
  }
  sessions?: Record<string, TrainingSessions>
  solo?: {
    requestedAt?: Date
    requestedBy?: Member
    scheduledAt?: Date
    performedBy?: Member
    report?: TrainingReport
    passed?: boolean
  }
  cpt?: {
    requestedAt?: Date
    scheduledAt?: Date
    assessedBy?: Member
    report?: TrainingReport
    passed?: boolean
  }
  completedAt?: Date
  outcome?: OutcomeReason
  outcomeDetailed?: OutcomeReasonDetailed
}

export type Reducer<T = unknown> = (training: Training | null, event: T) => Training
export type IsEmitted<T = unknown> = (training: Training | null, event: T) => boolean

export type TrainingEventMetadata = {
  id: string
  emittedAt: Date
  system: string
  correlationId: string
}

