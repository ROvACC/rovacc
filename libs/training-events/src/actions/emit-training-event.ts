import { v4 as uuidv4 } from "uuid";
import { Training, TrainingEvent, TrainingEventData } from "@rovacc/training-events-types";
import { SYSTEM_ID, TRAINING_COLLECTION, TRAINING_EVENTS_SUBCOLLECTION } from '../config'
import { getDatabaseCollection } from '@rovacc/clients'
import { isEmitted, reduceEvent } from "../events";
import { getDate } from "../helpers/get-date";


export const emitTrainingEvent = async (eventData: TrainingEventData, training: Training | null, correlationId: string): Promise<Training | null> => {

  const trainingId = eventData.trainingId
  const event: TrainingEvent = {
    eventId: uuidv4(),
    emittedAt: getDate(),
    system: SYSTEM_ID,
    correlationId,
    ...eventData,
  }

  if (isEmitted[event.name] && isEmitted[event.name](training, event)) {
    return training
  }

  const trainingCollection = getDatabaseCollection(TRAINING_COLLECTION)

  const trainingObj = await trainingCollection.doc(trainingId).get()
  if (!trainingObj.exists) {
    await trainingCollection
      .doc(trainingId)
      .set({ trainingId })
  }

  await trainingCollection
    .doc(trainingId)
    .collection(TRAINING_EVENTS_SUBCOLLECTION)
    .doc(event.eventId)
    .set(event)

  return reduceEvent(training, event)
}
