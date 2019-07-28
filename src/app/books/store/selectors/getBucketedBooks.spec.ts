import { produce } from 'immer'
import flatMap from 'lodash/flatMap'

import {
  fullAuthorsState,
  fullBooksState,
  fullState,
} from 'packages/mocks/src/redux'
import { getBucketedBooks } from './getBucketedBooks'

const state = fullState as any

const getChangedState = () => {
  return produce(state, draft => {
    draft.books.data = { ...fullBooksState.data }
  }) as any
}

const findAuthorBucketKeys = () =>
  Object.values(fullAuthorsState.data)
    .map(author => `${author.firstName} ${author.lastName}`)
    .sort()

describe('getBucketedBooks', () => {
  describe('Basic Usage', () => {
    it('returns the fully-populated data from the store', () => {
      const buckets = getBucketedBooks(state as any)
      const flatBooks = flatMap(buckets, bucket => bucket.values)
      const expectedKeys = findAuthorBucketKeys()
      const actualKeys = buckets.map(({ key }) => key).sort()

      expect(actualKeys).toEqual(expectedKeys)
      expect(flatBooks).toHaveLength(Object.values(fullBooksState.data).length)
    })
  })

  describe('Memoization', () => {
    it('returns the memoized object reference if nothing pertinent is changed', () => {
      const firstResult = getBucketedBooks(state)
      const secondResult = getBucketedBooks(state)
      expect(secondResult).toBe(firstResult)
    })

    it('returns a new object if something pertinent is changed', () => {
      const firstResult = getBucketedBooks(state)
      const secondResult = getBucketedBooks(getChangedState())
      expect(secondResult).not.toBe(firstResult)
    })
  })
})
