import { afterEach, beforeEach, describe, it, expect } from 'vitest';
import { buildTrainingIntentEvent } from '@rovacc/test-helpers';

import { emitTrainingEvent } from './emit-training-event';
import { deleteCollection } from '@rovacc/test-helpers';
import { getDatabaseCollection } from '@rovacc/clients';
import { Timestamp } from 'firebase-admin/firestore';

const TRAINING_ID = 'trainingId';
const EVENT_ID = 'eventId';
const DATE = new Date();

describe('emitTrainingEvent', () => {
  beforeEach(async () => {
    await deleteCollection('training');
    vi.mock('uuid', () => ({
      v4: () => EVENT_ID,
    }));
    vi.mock('../helpers/get-date', () => ({
      getDate: () => DATE,
    }));
  });

  afterEach(async () => {
    vi.restoreAllMocks();
  });

  it('should emit the event correctly and create the empty training object', async () => {
    const eventData = buildTrainingIntentEvent({
      trainingId: TRAINING_ID,
      emittedAt: DATE,
      eventId: EVENT_ID,
    });

    const reducedTraining = await emitTrainingEvent(
      eventData,
      null,
      'correlationId'
    );
    console.log({ reducedTraining });

    expect(reducedTraining).toEqual({
      trainingId: TRAINING_ID,
      status: 'QUEUED',
      purpose: 'acquire_rating',
      rating: 2,
      student: 123123123,
      requestedAt: DATE,
    });
    const trainingCollection = getDatabaseCollection('training');
    const event = await trainingCollection
      .doc(TRAINING_ID)
      .collection('events')
      .doc(EVENT_ID)
      .get();

    expect(event.data()).toEqual({
      eventId: EVENT_ID,
      emittedAt: Timestamp.fromDate(DATE),
      system: 'rovacc-system-id',
      trainingId: TRAINING_ID,
      payload: { student: 123123123, purpose: 'acquire_rating', rating: 2 },
      name: 'training-intent',
      correlationId: 'correlationId',
    });
  });

  it('should not emit the same event twice', async () => {
    const eventData1 = buildTrainingIntentEvent({
      trainingId: TRAINING_ID,
      emittedAt: DATE,
      eventId: EVENT_ID,
    });

    const reducedTraining1 = await emitTrainingEvent(
      eventData1,
      null,
      'correlationId'
    );

    expect(reducedTraining1).toEqual({
      trainingId: TRAINING_ID,
      status: 'QUEUED',
      purpose: 'acquire_rating',
      rating: 2,
      student: 123123123,
      requestedAt: DATE,
    });
    const trainingCollection = getDatabaseCollection('training');
    const event1 = await trainingCollection
      .doc(TRAINING_ID)
      .collection('events')
      .doc(EVENT_ID)
      .get();

    expect(event1.data()).toEqual({
      eventId: EVENT_ID,
      emittedAt: Timestamp.fromDate(DATE),
      system: 'rovacc-system-id',
      trainingId: TRAINING_ID,
      payload: { student: 123123123, purpose: 'acquire_rating', rating: 2 },
      name: 'training-intent',
      correlationId: 'correlationId',
    });

    const eventData2 = buildTrainingIntentEvent({
      trainingId: TRAINING_ID,
      emittedAt: DATE,
      eventId: 'eventId2',
    });
    await emitTrainingEvent(eventData2, reducedTraining1, 'correlationId2');
    const eventCount = await trainingCollection
      .doc(TRAINING_ID)
      .collection('events')
      .count()
      .get();

    expect(eventCount.data().count).toEqual(1);
  });
});
