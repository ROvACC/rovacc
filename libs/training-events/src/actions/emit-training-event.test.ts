import { afterEach, beforeEach, describe, it, expect } from "vitest";
import { TrainingEventData } from "@rovacc/training-events-types";

import { emitTrainingEvent } from "./emit-training-event";
import { deleteCollection } from "@rovacc/test-helpers";
import { getDatabaseCollection } from "@rovacc/clients";
import { Timestamp } from "firebase-admin/firestore";


const TRAINING_ID = 'trainingId'
const EVENT_ID = 'eventId'
const DATE = new Date()

describe('emitTrainingEvent', () => {

  beforeEach(async () => {
    await deleteCollection('training')
    vi.mock('uuid', () => ({
      v4: () => EVENT_ID
    }))
    vi.mock('../helpers/get-date', () => ({
      getDate: () => DATE
    }))
  })

  afterEach(async () => {
    vi.restoreAllMocks()
  })

  it('should emit the event correctly and create the empty training object', async () => {
    const eventData: TrainingEventData = {
      trainingId: TRAINING_ID,
      name: 'training-intent',
      payload: {
        student: 1364858,
        rating: 5,
        purpose: 'acquire_rating'
      }
    }

    const reducedTraining = await emitTrainingEvent(eventData, null, 'correlationId')

    expect(reducedTraining).toEqual({
      trainingId: TRAINING_ID,
      status: 'QUEUED',
      purpose: 'acquire_rating',
      rating: 5,
      student: 1364858,
      requestedAt: DATE
    })
    const trainingCollection = getDatabaseCollection('training')
    const event = await trainingCollection.doc(TRAINING_ID).collection('events').doc(EVENT_ID).get()

    expect(event.data()).toEqual({
      eventId: EVENT_ID,
      emittedAt: Timestamp.fromDate(DATE),
      system: 'rovacc-system-id',
      trainingId: TRAINING_ID,
      payload: { student: 1364858, purpose: 'acquire_rating', rating: 5 },
      name: 'training-intent',
      correlationId: 'correlationId'
    })
  })

  it('should emit the event and not alter the training object', async () => {

    const trainingCollection = getDatabaseCollection('training')
    await trainingCollection.doc(TRAINING_ID).set({
      purpose: 'acquire_rating',
      rating: 5,
      student: 1364858,
      requestedAt: DATE
    })
    await trainingCollection.doc(TRAINING_ID).collection('events').doc('event-id').set({
      const eventData: TrainingEventData = {
        trainingId: TRAINING_ID,
        name: 'training-test-completed',
        payload: {
          passed: true,
          result: 'passed',
          willExpireAt: new Date()
        }
      }

    const reducedTraining = await emitTrainingEvent(eventData, null, 'correlationId')

    expect(reducedTraining).toEqual({
        trainingId: TRAINING_ID,
        status: 'QUEUED',
        purpose: 'acquire_rating',
        rating: 5,
        student: 1364858,
        requestedAt: DATE
      })
    const event = await trainingCollection.doc(TRAINING_ID).collection('events').doc(EVENT_ID).get()
    expect(event.data()).toEqual({
        eventId: EVENT_ID,
        emittedAt: Timestamp.fromDate(DATE),
        system: 'rovacc-system-id',
        trainingId: TRAINING_ID,
        payload: { student: 1364858, purpose: 'acquire_rating', rating: 5 },
        name: 'training-intent',
        correlationId: 'correlationId'
      })
  })
})
