export async function deleteCollection(collectionPath: string) {
  const endpoint = process.env['FIRESTORE_EMULATOR_HOST'] as string;
  const project = process.env['GCLOUD_PROJECT'] as string;

  console.log(
    `http://${endpoint}/emulator/v1/projects/${project}/databases/(default)/documents/${collectionPath}`
  );
  const response = await fetch(
    `http://${endpoint}/emulator/v1/projects/${project}/databases/(default)/documents/${collectionPath}`,
    {
      method: 'DELETE',
    }
  );
  if (response.status !== 200) {
    throw new Error('Trouble clearing Emulator: ' + (await response.text()));
  }
}
