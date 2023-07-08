import { v4 as uuidv4 } from 'uuid';
import { TrainingEvent, TrainingEventData } from '../types';
import {
  SYSTEM_ID,
  TRAINING_COLLECTION,
  TRAINING_EVENTS_SUBCOLLECTION,
} from '../config';
import { getFirestore } from 'firebase-admin/firestore';
import { FirestoreNotInitialzedException } from '../exception/firestore-not-initialized';

export const emitTrainingEvent = async (
  eventData: TrainingEventData,
  training: Training | null,
  correlationId: string
): Promise<Training | null> => {
  const trainingId = eventData.trainingId;
  const event: TrainingEvent = {
    eventId: uuidv4(),
    emittedAt: getDate(),
    system: SYSTEM_ID,
    correlationId,
    ...eventData,
  };

  if (isEmitted[event.name] && isEmitted[event.name](training, event)) {
    return training;
  }

  const db = getFirestore();
  if (!db) {
    throw new FirestoreNotInitialzedException();
  }
  const trainingCollection = db.collection(TRAINING_COLLECTION);

  const trainingObj = await trainingCollection.doc(trainingId).get();
  if (!trainingObj.exists) {
    await trainingCollection.doc(trainingId).set({ trainingId });
  }

  await trainingCollection
    .doc(trainingId)
    .collection(TRAINING_EVENTS_SUBCOLLECTION)
    .doc(event.eventId)
    .set(event);

  return reduceEvent(training, event);
};
