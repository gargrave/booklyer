import { produce } from 'immer'

import { fullAuthorsState, fullState } from 'packages/mocks/src/redux'
import { getAuthorsSortedByLastName } from './getAuthorsSortedByLastName'

const state = fullState as any

const getChangedState = () => {
  return produce(state, draft => {
    draft.authors.data = { ...fullAuthorsState.data }
  }) as any
}

describe('getAuthorsSortedByLastName', () => {
  describe('Basic Usage', () => {
    it('returns the fully-populated data from the store', () => {
      const authors = getAuthorsSortedByLastName(state as any)
      expect(authors.length).toBe(Object.keys(fullAuthorsState.data).length)

      let prevLastName
      authors.forEach(author => {
        if (prevLastName) {
          expect(author.lastName >= prevLastName).toBe(true)
        }
        prevLastName = author.lastName
      })
    })
  })

  describe('Memoization', () => {
    it('returns the memoized object reference if nothing pertinent is changed', () => {
      const firstResult = getAuthorsSortedByLastName(state)
      const secondResult = getAuthorsSortedByLastName(state)
      expect(secondResult).toBe(firstResult)
    })

    it('returns a new object if something pertinent is changed', () => {
      const firstResult = getAuthorsSortedByLastName(state)
      const secondResult = getAuthorsSortedByLastName(getChangedState())
      expect(secondResult).not.toBe(firstResult)
    })
  })
})
