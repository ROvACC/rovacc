import { getDatabaseCollection } from "@rovacc/clients";
import { Training, TrainingEvent } from "../types";
import { TRAINING_COLLECTION, TRAINING_EVENTS_SUBCOLLECTION } from "../config";
import { TrainingNotFound } from "../exception/training-not-found";

export const getTrainingEvents = async (trainingId: string): Promise<TrainingEvent[] | undefined> => {
  const trainingCollection = getDatabaseCollection(TRAINING_COLLECTION)

  const trainingEvents = await trainingCollection
    .doc(trainingId)
    .collection(TRAINING_EVENTS_SUBCOLLECTION)
    .get()

  if (!trainingEvents || !trainingEvents.docs || trainingEvents.docs.length === 0) {
    return undefined
  }

  return trainingEvents.docs.map(event => event.data() as TrainingEvent)
}

export const tryGetTrainingEvents = async (trainingId: string): Promise<TrainingEvent[]> => {
  const trainingEvents = await getTrainingEvents(trainingId)
  if (!trainingEvents) {
    throw new TrainingNotFound(trainingId)
  }
  return trainingEvents
}

export const getTraining = async (trainingId: string): Promise<Training | undefined> => {
  const trainingCollection = getDatabaseCollection(TRAINING_COLLECTION)

  const training = await trainingCollection
    .doc(trainingId)
    .get()

  if (!training.exists) {
    return undefined
  }

  return training.data() as Training
}


export const tryGetTraining = async (trainingId: string): Promise<Training> => {
  const training = await getTraining(trainingId)
  if (!training) {
    throw new TrainingNotFound(trainingId)
  }
  return training
}
