import {
  FbDocRef,
  FbDoc,
  FbCollection,
  FbTimestamp,
  FbFirestoreDb,
} from './firebase.types'

export type ObjectIdMap<T> = {
  [key: string]: T
}

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

// TODO: try to find a way to pull properties here based on types, so we can have type protection here too
export function parseFbDoc<T>(doc: FbDoc, parseFn?: (arg: T) => T) {
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

export function singleToIdMap<T>(
  doc: FbDoc,
  parseFn?: (arg: any) => T,
): ObjectIdMap<T> {
  const parsed = parseFbDoc<T>(doc, parseFn)
  return {
    [parsed.id]: { ...parsed },
  } as ObjectIdMap<T>
}

export function collectionToIdMap<T>(
  collection: FbCollection,
  parseFn?: (arg: any) => T,
): ObjectIdMap<T> {
  if (!collection.docs) {
    return {} as ObjectIdMap<T>
  }

  return collection.docs.reduce(
    (acc, doc) => {
      const parsed = parseFbDoc<T>(doc, parseFn)
      return {
        ...acc,
        [parsed.id]: { ...parsed },
      }
    },
    {} as ObjectIdMap<T>,
  )
}
