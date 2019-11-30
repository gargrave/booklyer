/* eslint-disable @typescript-eslint/no-explicit-any */
import { FbDoc, FbCollection } from './firebase.types'

export type ObjectIdMap<T> = {
  [key: string]: T
}

function parseFbDoc<T>(doc: FbDoc, parseFn?: (arg: T) => T) {
  let data = { id: doc.id, ...doc.data() }
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
  }
}

export function collectionToIdMap<T>(
  collection: FbCollection,
  parseFn?: (arg: any) => T,
): ObjectIdMap<T> {
  if (!collection.docs) {
    return {}
  }

  return collection.docs.reduce((acc, doc) => {
    const parsed = parseFbDoc<T>(doc, parseFn)
    return {
      ...acc,
      [parsed.id]: { ...parsed },
    }
  }, {})
}
