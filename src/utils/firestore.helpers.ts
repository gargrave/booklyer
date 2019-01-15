import {
  FbDocRef,
  FbDoc,
  FbCollection,
  FbTimestamp,
  FbFirestoreDb,
} from './firebase.types'

export async function getDocRef(
  db: FbFirestoreDb,
  tableName: string,
  id: string,
): Promise<FbDocRef> {
  return db.collection(tableName).doc(id)
}

function convertTimestamp(timestamp: FbTimestamp) {
  if (timestamp.toDate && typeof timestamp.toDate === 'function') {
    return timestamp.toDate()
  }
  return timestamp
}

export function parseFbDoc(doc: FbDoc, parseFn?: (arg: any) => any) {
  let data = { id: doc.id, ...doc.data() }
  if (data.created) {
    data.created = convertTimestamp(data.created)
  }
  if (data.updated) {
    data.updated = convertTimestamp(data.updated)
  }
  if (parseFn) {
    data = parseFn(data)
  }
  return data
}

export function parseCollection<T>(
  collection: FbCollection,
  parseFn?: (arg: any) => T,
): T[] {
  if (!collection.docs) {
    return []
  }
  return collection.docs.map((doc: FbDoc) => parseFbDoc(doc, parseFn))
}

export function collectionToIdMap<T>(
  collection: FbCollection,
  parseFn?: (arg: any) => T,
): object {
  if (!collection.docs) {
    return {}
  }

  return collection.docs.reduce((acc, doc) => {
    const parsed = parseFbDoc(doc, parseFn)
    return {
      ...acc,
      [parsed.id]: { ...parsed },
    }
  }, {})
}
