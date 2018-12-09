import { FbDocRef, FbDoc, FbCollection, FbTimestamp } from './firebase.types'

export async function getDocRef(
  db: any,
  table: string,
  id?: string,
): Promise<FbDocRef> {
  return db.collection(table).doc(id)
}

function convertTimestamp(timestamp: FbTimestamp) {
  if (timestamp.toDate && typeof timestamp.toDate === 'function') {
    return timestamp.toDate()
  }
  return timestamp
}

export function parseFbDoc(doc: FbDoc, parseFn?: (arg?: any) => any) {
  let data: any = { id: doc.id, ...doc.data() }
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

export function parseCollection(
  coll: FbCollection,
  parseFn?: (arg?: any) => any,
): object[] {
  if (!coll.docs) {
    return []
  }
  return coll.docs.map((doc: FbDoc) => parseFbDoc(doc, parseFn))
}
