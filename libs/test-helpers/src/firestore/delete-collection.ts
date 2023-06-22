import { getDatabaseCollection, getDatabaseClient } from '@rovacc/clients'

export const deleteCollection1 = async (collection: string): Promise<void> => {
  const collectionRef = getDatabaseCollection(collection)
  const docs = await collectionRef.listDocuments()
  const deletePromises = docs.map(async (doc) => await doc.delete())
  console.log(deletePromises[0].then(console.log).catch(console.error));
  await Promise.all(deletePromises)
  console.log('=============')
}


export async function deleteCollection(collectionPath: string) {
  const db = getDatabaseClient()
  const collectionRef = getDatabaseCollection(collectionPath)
  const query = collectionRef.orderBy('__name__').limit(100);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, query, resolve).catch(reject);
  });
}

async function deleteQueryBatch(db, query, resolve) {
  const snapshot = await query.get();

  const batchSize = snapshot.size;
  if (batchSize === 0) {
    resolve();
    return;
  }

  // Delete documents in a batch
  const batch = db.batch();
  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });
  await batch.commit();

  // Recurse on the next process tick, to avoid
  // exploding the stack.
  process.nextTick(() => {
    deleteQueryBatch(db, query, resolve);
  });
}
