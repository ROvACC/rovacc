export class TrainingNotFound extends Error {
  constructor(trainingId: string) {
    super(`Training ${trainingId} not found`);
  }
}
