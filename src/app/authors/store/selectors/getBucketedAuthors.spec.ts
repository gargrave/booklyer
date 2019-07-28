import { produce } from 'immer'

import { fullAuthorsState, fullState } from 'packages/mocks/src/redux'
import { getBucketedAuthors } from './getBucketedAuthors'

const state = fullState as any

const getChangedState = () => {
  return produce(state, draft => {
    draft.authors.data = { ...fullAuthorsState.data }
  }) as any
}

const findBucketKeys = () =>
  Object.keys(
    Object.values(fullAuthorsState.data).reduce((acc, author) => {
      const key = author.lastName[0]
      acc[key] = true
      return acc
    }, {}),
  )

describe('getBucketedAuthors', () => {
  describe('Basic Usage', () => {
    it("returns a bucket for each letter in an author's last name", () => {
      const buckets = getBucketedAuthors(state)
      const expectedBucketKeys = findBucketKeys()
      expect(Object.keys(buckets).length).toBe(expectedBucketKeys.length)
    })
  })

  describe('Memoization', () => {
    it('returns the memoized object reference if nothing pertinent is changed', () => {
      const firstResult = getBucketedAuthors(state)
      const secondResult = getBucketedAuthors(state)
      expect(secondResult).toBe(firstResult)
    })

    it('returns a new object if something pertinent is changed', () => {
      const firstResult = getBucketedAuthors(state)
      const secondResult = getBucketedAuthors(getChangedState())
      expect(secondResult).not.toBe(firstResult)
    })
  })
})
