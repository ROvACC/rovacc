import { getFirestore, Firestore, CollectionReference } from 'firebase-admin/firestore'

let databaseClient: Firestore

export const getDatabaseClient = (): Firestore => {
  if (!databaseClient) {
    databaseClient = getFirestore()
  }
  return databaseClient
}

export const getDatabaseCollection = (collection: string): CollectionReference => {
  const db = getDatabaseClient()
  return db.collection(collection)
}
