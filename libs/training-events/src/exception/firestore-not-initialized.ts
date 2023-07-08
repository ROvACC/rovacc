export class FirestoreNotInitialzedException extends Error {
  constructor() {
    super('Firestore is not initialized');
  }
}
