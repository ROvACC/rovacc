import { v4 as uuidv4 } from "uuid";
import { TrainingEvent, TrainingEventData } from "../types";
import { SYSTEM_ID, TRAINING_COLLECTION, TRAINING_EVENTS_SUBCOLLECTION } from '../config'
import { getFirestore } from "firebase-admin/firestore";
import { FirestoreNotInitialzedException } from "../exception/firestore-not-initialized";

export const emitTrainingEvent = async (eventData: TrainingEventData, correlationId: string): Promise<void> => {

  const trainingId = eventData.trainingId
  const event: TrainingEvent = {
    eventId: uuidv4(),
    emittedAt: new Date(),
    system: SYSTEM_ID,
    correlationId,
    ...eventData,
  }

  const db = getFirestore();
  if (!db) {
    throw new FirestoreNotInitialzedException()
  }
  const trainingCollection = db.collection(TRAINING_COLLECTION)

  const training = await trainingCollection.doc(trainingId).get()
  if (!training.exists) {
    await trainingCollection
      .doc(trainingId)
      .set({ trainingId })
  }

  await trainingCollection
    .doc(trainingId)
    .collection(TRAINING_EVENTS_SUBCOLLECTION)
    .doc(event.eventId)
    .set(event)

}
